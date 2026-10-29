import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Link, useParams } from "react-router-dom";
import { Tags, Plus, Trash2, Edit, X, Hash } from "lucide-react";
import { PortalLocale } from "../../../types/portals";

export function NewsroomTagsCrud() {
  const { lang = "en" } = useParams<{ lang: string }>();
  const currentLang = (lang === "ck" ? "ckb" : lang) as PortalLocale;
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const fetchTags = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/hub/newsroom/tags", { headers: { "x-role": "ADMIN" } });
      const data = await res.json();
      setTags(data.tags || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/hub/newsroom/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-role": "ADMIN" },
        body: JSON.stringify({ name })
      });
      setName("");
      setIsModalOpen(false);
      setStatusMsg("Keyword tag created");
      setTimeout(() => setStatusMsg(null), 3000);
      fetchTags();
    } catch {
      setStatusMsg("Error creating tag");
    }
  };

  const handleDelete = async (id: string) => {
    toast.warning("Remove this taxonomy tag?", {
      action: {
        label: "Remove",
        onClick: async () => {
          try {
            await fetch(`/api/hub/newsroom/tags/${id}`, {
              method: "DELETE",
              headers: { "x-role": "ADMIN" }
            });
            toast.success("Tag deleted");
            fetchTags();
          } catch {
            toast.error("Error deleting tag");
          }
        }
      }
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
        <div>
          <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider block">
            CISE Command Hub • Newsroom Taxonomy
          </span>
          <h1 className="text-2xl font-black text-neutral-900">
            Keywords & Bilateral Subject Tags
          </h1>
          <p className="text-xs text-neutral-500">
            Taxonomy indices tagging diplomatic communiqués, bilateral projects, and treaties.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-md flex items-center gap-2 self-start sm:self-auto min-h-[44px] cursor-pointer"
        >
          <Plus size={16} />
          <span>New Subject Tag</span>
        </button>
      </div>

      {statusMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-mono">
          [{statusMsg}]
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {tags.map(tag => (
          <div
            key={tag.id}
            className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-between hover:border-red-600 transition-colors"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <Hash size={14} className="text-red-600 shrink-0" />
              <div>
                <Link
                  to={`/${currentLang}/newsroom/tag/${encodeURIComponent(tag.name)}`}
                  target="_blank"
                  className="font-bold text-xs text-neutral-900 hover:text-red-600 block truncate"
                >
                  {tag.name}
                </Link>
                <span className="text-[10px] font-mono text-neutral-400 block">
                  {tag.articleCount || 1} mentions
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleDelete(tag.id)}
              className="p-1.5 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-600 cursor-pointer"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-[#E5E7EB]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <h3 className="text-base font-black text-neutral-900">Add Taxonomy Tag</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500">
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-neutral-700 block mb-1">Tag Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Belt & Road, Grand Faw, Sinosure"
                  className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-red-600"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E5E7EB] font-bold text-neutral-600 min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 font-bold text-white shadow-md min-h-[44px]"
                >
                  Create Tag
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
