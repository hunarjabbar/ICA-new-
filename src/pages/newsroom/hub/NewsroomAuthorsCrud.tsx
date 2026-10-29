import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Link, useParams } from "react-router-dom";
import { Users, Plus, Trash2, Edit, X, Award, MapPin, Mail } from "lucide-react";
import { PortalLocale } from "../../../types/portals";

export function NewsroomAuthorsCrud() {
  const { lang = "en" } = useParams<{ lang: string }>();
  const currentLang = (lang === "ck" ? "ckb" : lang) as PortalLocale;
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    credentials: "Chief Bureau Diplomatic Correspondent",
    email: "",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    bureauEn: "Baghdad Bureau",
    location: "Baghdad, Iraq"
  });

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/hub/newsroom/authors", { headers: { "x-role": "ADMIN" } });
      const data = await res.json();
      setAuthors(data.authors || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/hub/newsroom/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-role": "ADMIN" },
        body: JSON.stringify(form)
      });
      setIsModalOpen(false);
      setStatusMsg("Accredited bureau correspondent registered");
      setTimeout(() => setStatusMsg(null), 3000);
      fetchAuthors();
    } catch {
      setStatusMsg("Error registering correspondent");
    }
  };

  const handleDelete = async (id: string) => {
    toast.warning("Remove this correspondent accreditation?", {
      action: {
        label: "Remove",
        onClick: async () => {
          try {
            await fetch(`/api/hub/newsroom/authors/${id}`, {
              method: "DELETE",
              headers: { "x-role": "ADMIN" }
            });
            toast.success("Correspondent accreditation removed");
            fetchAuthors();
          } catch {
            toast.error("Error removing correspondent");
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
            CISE Command Hub • Newsroom Bureau Accreditation
          </span>
          <h1 className="text-2xl font-black text-neutral-900">
            Accredited Correspondents & Analysts
          </h1>
          <p className="text-xs text-neutral-500">
            Manage journalists and analysts stationed across Baghdad, Beijing, Erbil, Shanghai, and Basra.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-md flex items-center gap-2 self-start sm:self-auto min-h-[44px] cursor-pointer"
        >
          <Plus size={16} />
          <span>Accredit Correspondent</span>
        </button>
      </div>

      {statusMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-mono">
          [{statusMsg}]
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {authors.map(auth => (
          <div
            key={auth.id}
            className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs flex flex-col justify-between space-y-4 hover:border-red-600 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <img
                  src={auth.avatar}
                  alt=""
                  className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-[#E5E7EB]"
                />
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                  {auth.status || "ACCREDITED"}
                </span>
              </div>
              <div>
                <h3 className="font-serif text-lg font-black text-neutral-900">
                  {auth.name}
                </h3>
                <span className="text-xs font-mono font-bold text-red-600 block">
                  {auth.bureau?.[currentLang] || auth.bureau?.en}
                </span>
                <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                  {auth.credentials}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB] text-xs">
              <Link
                to={`/${currentLang}/newsroom/author/${auth.slug}`}
                target="_blank"
                className="font-bold text-red-600 hover:underline"
              >
                Profile Dossier →
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(auth.id)}
                className="p-1.5 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-600 cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-[#E5E7EB]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <h3 className="text-base font-black text-neutral-900">Accredit New Correspondent</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-neutral-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Dr. Haider Al-Maliki"
                  className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Bureau Desk</label>
                <select
                  value={form.bureauEn}
                  onChange={e => setForm({ ...form, bureauEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-red-600 bg-white"
                >
                  <option value="Baghdad Bureau">Baghdad Bureau (مكتب بغداد)</option>
                  <option value="Beijing Bureau">Beijing Bureau (北京分社)</option>
                  <option value="Erbil Bureau">Erbil Bureau (نووسینگەی هەولێر)</option>
                  <option value="Shanghai Logistics Desk">Shanghai Logistics Desk (上海物流分社)</option>
                  <option value="Basra Maritime Desk">Basra Maritime Desk (مكتب موانئ البصرة)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Credentials / Beat</label>
                <input
                  type="text"
                  value={form.credentials}
                  onChange={e => setForm({ ...form, credentials: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="correspondent@iraq-china.agency"
                  className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5E7EB]">
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
                  Accredit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
