import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Link, useParams } from "react-router-dom";
import { FolderTree, Plus, Trash2, Edit, X, Check, Globe } from "lucide-react";
import { getPortalTranslation } from "../../../locales/portalTranslations";
import { PortalLocale } from "../../../types/portals";

export function NewsroomCategoriesCrud() {
  const { lang = "en" } = useParams<{ lang: string }>();
  const currentLang = (lang === "ck" ? "ckb" : lang) as PortalLocale;
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<any | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const [form, setForm] = useState({
    slug: "",
    nameEn: "",
    nameAr: "",
    nameZh: "",
    nameCkb: "",
    descriptionEn: "",
    color: "#DC2626"
  });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/hub/newsroom/categories", { headers: { "x-role": "ADMIN" } });
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreate = () => {
    setEditingCat(null);
    setForm({
      slug: `desk-${Date.now()}`,
      nameEn: "",
      nameAr: "",
      nameZh: "",
      nameCkb: "",
      descriptionEn: "",
      color: "#DC2626"
    });
    setIsModalOpen(true);
  };

  const openEdit = (cat: any) => {
    setEditingCat(cat);
    setForm({
      slug: cat.slug,
      nameEn: cat.name?.en || "",
      nameAr: cat.name?.ar || "",
      nameZh: cat.name?.zh || "",
      nameCkb: cat.name?.ckb || "",
      descriptionEn: cat.description?.en || "",
      color: cat.color || "#DC2626"
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCat) {
        await fetch(`/api/hub/newsroom/categories/${editingCat.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", "x-role": "ADMIN" },
          body: JSON.stringify(form)
        });
        setStatusMsg("Bilateral category desk updated");
      } else {
        await fetch("/api/hub/newsroom/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-role": "ADMIN" },
          body: JSON.stringify(form)
        });
        setStatusMsg("New bilateral category desk created");
      }
      setIsModalOpen(false);
      setTimeout(() => setStatusMsg(null), 3000);
      fetchCategories();
    } catch {
      setStatusMsg("Error saving category desk");
    }
  };

  const handleDelete = async (id: string) => {
    toast.warning("Delete this category desk from the CISE Command Hub?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await fetch(`/api/hub/newsroom/categories/${id}`, {
              method: "DELETE",
              headers: { "x-role": "ADMIN" }
            });
            toast.success("Category desk removed");
            fetchCategories();
          } catch {
            toast.error("Error deleting category desk");
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
            CISE Command Hub • Newsroom Architecture
          </span>
          <h1 className="text-2xl font-black text-neutral-900">
            Bilateral Editorial Desks & Categories
          </h1>
          <p className="text-xs text-neutral-500">
            Structure newsroom reporting into thematic bilateral desks with quadlingual metadata.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-md flex items-center gap-2 self-start sm:self-auto min-h-[44px] cursor-pointer"
        >
          <Plus size={16} />
          <span>Add Bilateral Desk</span>
        </button>
      </div>

      {statusMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-mono">
          [{statusMsg}]
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(cat => (
          <div
            key={cat.id}
            className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs flex flex-col justify-between space-y-4 hover:border-red-600 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className="px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold text-white uppercase"
                  style={{ backgroundColor: cat.color || "#DC2626" }}
                >
                  {cat.slug}
                </span>
                <span className="text-xs font-mono text-neutral-400 font-bold">
                  {cat.articleCount || 0} Stories
                </span>
              </div>
              <h3 className="font-serif text-lg font-black text-neutral-900">
                {cat.name?.[currentLang] || cat.name?.en || cat.slug}
              </h3>
              <p className="text-xs text-neutral-600 line-clamp-2">
                {cat.description?.[currentLang] || cat.description?.en}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB] text-xs">
              <Link
                to={`/${currentLang}/newsroom/category/${cat.slug}`}
                target="_blank"
                className="font-bold text-red-600 hover:underline"
              >
                View Public Desk →
              </Link>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(cat)}
                  className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
                >
                  <Edit size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(cat.id)}
                  className="p-2 rounded-lg hover:bg-red-50 text-red-600 min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-[#E5E7EB]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <h3 className="text-base font-black text-neutral-900">
                {editingCat ? "Edit Category Desk" : "Create Bilateral Category Desk"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-neutral-700 block mb-1">Slug</label>
                <input
                  type="text"
                  required
                  value={form.slug}
                  onChange={e => setForm({ ...form, slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">English Title</label>
                <input
                  type="text"
                  required
                  value={form.nameEn}
                  onChange={e => setForm({ ...form, nameEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Arabic Title (العربية)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={form.nameAr}
                  onChange={e => setForm({ ...form, nameAr: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Chinese Title (中文)</label>
                <input
                  type="text"
                  value={form.nameZh}
                  onChange={e => setForm({ ...form, nameZh: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Description (English)</label>
                <textarea
                  rows={2}
                  value={form.descriptionEn}
                  onChange={e => setForm({ ...form, descriptionEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E5E7EB] font-bold text-neutral-600 hover:bg-neutral-100 min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 font-bold text-white shadow-md min-h-[44px]"
                >
                  Save Desk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
