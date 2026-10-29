import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit,
  ExternalLink,
  CheckCircle,
  X,
  Zap,
  Star,
  Globe,
  ArrowLeft
} from "lucide-react";
import { toast } from "sonner";
import { getPortalTranslation } from "../../../locales/portalTranslations";
import { PortalLocale } from "../../../types/portals";

export function NewsroomArticlesCrud() {
  const { lang = "en" } = useParams<{ lang: string }>();
  const currentLang = (lang === "ck" ? "ckb" : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Form State
  const [form, setForm] = useState({
    titleEn: "",
    titleAr: "",
    titleZh: "",
    titleCkb: "",
    excerptEn: "",
    excerptAr: "",
    excerptZh: "",
    excerptCkb: "",
    contentEn: "",
    contentAr: "",
    contentZh: "",
    contentCkb: "",
    slug: "",
    category: "infrastructure",
    authorName: "Tariq Al-Hashemi",
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop",
    tags: "Grand Faw, Infrastructure, Belt & Road",
    isBreaking: false,
    isFeatured: false,
    status: "PUBLISHED"
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [artRes, catRes, authRes] = await Promise.all([
        fetch("/api/hub/newsroom/articles", { headers: { "x-role": "ADMIN" } }),
        fetch("/api/hub/newsroom/categories", { headers: { "x-role": "ADMIN" } }),
        fetch("/api/hub/newsroom/authors", { headers: { "x-role": "ADMIN" } })
      ]);
      const artData = await artRes.json();
      const catData = await catRes.json();
      const authData = await authRes.json();

      setArticles(artData.articles || []);
      setCategories(catData.categories || []);
      setAuthors(authData.authors || []);
    } catch (err) {
      console.error("Error loading articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreateModal = () => {
    setEditingArticle(null);
    setForm({
      titleEn: "",
      titleAr: "",
      titleZh: "",
      titleCkb: "",
      excerptEn: "",
      excerptAr: "",
      excerptZh: "",
      excerptCkb: "",
      contentEn: "",
      contentAr: "",
      contentZh: "",
      contentCkb: "",
      slug: `dispatch-${Date.now()}`,
      category: categories[0]?.slug || "infrastructure",
      authorName: authors[0]?.name || "Tariq Al-Hashemi",
      imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop",
      tags: "Diplomatic Dispatch, Bilateral Trade",
      isBreaking: false,
      isFeatured: false,
      status: "PUBLISHED"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (art: any) => {
    setEditingArticle(art);
    setForm({
      titleEn: art.title?.en || "",
      titleAr: art.title?.ar || "",
      titleZh: art.title?.zh || "",
      titleCkb: art.title?.ckb || "",
      excerptEn: art.excerpt?.en || "",
      excerptAr: art.excerpt?.ar || "",
      excerptZh: art.excerpt?.zh || "",
      excerptCkb: art.excerpt?.ckb || "",
      contentEn: art.content?.en || "",
      contentAr: art.content?.ar || "",
      contentZh: art.content?.zh || "",
      contentCkb: art.content?.ckb || "",
      slug: art.slug,
      category: art.category,
      authorName: art.author?.name || "Tariq Al-Hashemi",
      imageUrl: art.imageUrl || "",
      tags: Array.isArray(art.tags) ? art.tags.join(", ") : "",
      isBreaking: Boolean(art.isBreaking),
      isFeatured: Boolean(art.isFeatured),
      status: art.status || "PUBLISHED"
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        tags: form.tags.split(",").map(t => t.trim()).filter(Boolean)
      };

      if (editingArticle) {
        await fetch(`/api/hub/newsroom/articles/${editingArticle.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", "x-role": "ADMIN" },
          body: JSON.stringify(payload)
        });
        setStatusMsg("Dispatch updated successfully");
      } else {
        await fetch("/api/hub/newsroom/articles", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-role": "ADMIN" },
          body: JSON.stringify(payload)
        });
        setStatusMsg("New dispatch published to CISE Command Hub");
      }

      setIsModalOpen(false);
      setTimeout(() => setStatusMsg(null), 3000);
      fetchData();
    } catch (err) {
      setStatusMsg("Failed saving dispatch");
    }
  };

  const handleDelete = async (id: string) => {
    toast.warning("Delete this dispatch from the CISE Command Hub?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await fetch(`/api/hub/newsroom/articles/${id}`, {
              method: "DELETE",
              headers: { "x-role": "ADMIN" }
            });
            setStatusMsg("Dispatch deleted successfully");
            setTimeout(() => setStatusMsg(null), 3000);
            fetchData();
          } catch {
            setStatusMsg("Failed deleting dispatch");
          }
        }
      }
    });
  };

  const filtered = articles.filter(a => {
    const matchCat = filterCategory === "all" || a.category === filterCategory;
    const matchStat = filterStatus === "all" || a.status === filterStatus;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      (a.title?.en && a.title.en.toLowerCase().includes(q)) ||
      (a.title?.ar && a.title.ar.includes(q)) ||
      (a.slug && a.slug.toLowerCase().includes(q));
    return matchCat && matchStat && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
        <div>
          <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider block">
            CISE Command Hub • Newsroom Editorial Section
          </span>
          <h1 className="text-2xl font-black text-neutral-900">
            Editorial Dispatches & Dossiers CRUD
          </h1>
          <p className="text-xs text-neutral-500">
            Publish, edit, and translate accredited sovereign reports in English, Arabic, Chinese, and Central Kurdish.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-md flex items-center gap-2 transition-colors self-start sm:self-auto min-h-[44px] cursor-pointer"
        >
          <Plus size={16} />
          <span>New Bilateral Dispatch</span>
        </button>
      </div>

      {statusMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-mono">
          [{statusMsg}]
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search size={14} className="absolute start-3 top-3 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search dispatches by headline or slug..."
            className="w-full ps-9 pe-3 py-2 rounded-xl border border-[#E5E7EB] text-xs focus:outline-none focus:border-red-600 min-h-[40px]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs font-medium text-neutral-700 bg-white focus:outline-none focus:border-red-600 min-h-[40px]"
          >
            <option value="all">All Category Desks</option>
            {categories.map(c => (
              <option key={c.id} value={c.slug}>{c.name?.en || c.slug}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs font-medium text-neutral-700 bg-white focus:outline-none focus:border-red-600 min-h-[40px]"
          >
            <option value="all">All Statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>
      </div>

      {/* Dispatches Table */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-neutral-500 font-mono text-[10px] uppercase">
                <th className="pb-3 text-start">Image</th>
                <th className="pb-3 text-start">Headline & Slug</th>
                <th className="pb-3 text-start">Desk</th>
                <th className="pb-3 text-start">Correspondent</th>
                <th className="pb-3 text-start">Flags</th>
                <th className="pb-3 text-start">Status</th>
                <th className="pb-3 text-end">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filtered.map(art => (
                <tr key={art.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="py-3 pe-3">
                    <img
                      src={art.imageUrl}
                      alt=""
                      className="w-12 h-10 object-cover rounded-lg border border-[#E5E7EB]"
                    />
                  </td>
                  <td className="py-3 pe-4 max-w-sm">
                    <span className="font-bold text-neutral-900 block truncate">
                      {art.title?.[currentLang] || art.title?.en}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 block truncate">
                      /{art.slug}
                    </span>
                  </td>
                  <td className="py-3 pe-4">
                    <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-mono text-[10px] uppercase font-bold">
                      {art.category}
                    </span>
                  </td>
                  <td className="py-3 pe-4 text-neutral-600 font-medium">
                    {art.author?.name || "Correspondent"}
                  </td>
                  <td className="py-3 pe-4">
                    <div className="flex items-center gap-1">
                      {art.isBreaking && (
                        <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-800 text-[9px] font-bold font-mono">
                          BREAKING
                        </span>
                      )}
                      {art.isFeatured && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-bold font-mono">
                          FEATURED
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 pe-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-100 text-emerald-800">
                      {art.status}
                    </span>
                  </td>
                  <td className="py-3 text-end space-x-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(art)}
                      className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-600 inline-block cursor-pointer"
                      title="Edit Dispatch"
                    >
                      <Edit size={14} />
                    </button>
                    <Link
                      to={`/${currentLang}/newsroom/${art.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-600 inline-block"
                      title="View Public Page"
                    >
                      <ExternalLink size={14} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(art.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 inline-block cursor-pointer"
                      title="Delete Dispatch"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto border border-[#E5E7EB]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
              <div>
                <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider block">
                  CISE Command Hub • Dispatch Editor
                </span>
                <h3 className="text-lg font-black text-neutral-900">
                  {editingArticle ? "Edit Sovereign Dispatch" : "Create Accredited Dispatch"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl hover:bg-neutral-100 text-neutral-500 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Slug and Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Slug (URL Segment)</label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={e => setForm({ ...form, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Category Desk</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-red-600 bg-white"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.slug}>{c.name?.en || c.slug}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quadlingual Headlines */}
              <div className="space-y-3 p-4 rounded-2xl bg-neutral-50 border border-[#E5E7EB]">
                <span className="text-[11px] font-mono font-bold text-neutral-600 uppercase block">
                  Quadlingual Headlines
                </span>
                <div>
                  <label className="font-medium text-neutral-600 block mb-1">English Headline (Mandatory)</label>
                  <input
                    type="text"
                    required
                    value={form.titleEn}
                    onChange={e => setForm({ ...form, titleEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] bg-white focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="font-medium text-neutral-600 block mb-1">Arabic Headline (العربية)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={form.titleAr}
                    onChange={e => setForm({ ...form, titleAr: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] bg-white focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="font-medium text-neutral-600 block mb-1">Chinese Headline (中文)</label>
                  <input
                    type="text"
                    value={form.titleZh}
                    onChange={e => setForm({ ...form, titleZh: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] bg-white focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="font-medium text-neutral-600 block mb-1">Central Kurdish Headline (کوردی)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={form.titleCkb}
                    onChange={e => setForm({ ...form, titleCkb: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] bg-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              {/* Excerpts */}
              <div className="space-y-3 p-4 rounded-2xl bg-neutral-50 border border-[#E5E7EB]">
                <span className="text-[11px] font-mono font-bold text-neutral-600 uppercase block">
                  Lead Excerpts
                </span>
                <div>
                  <label className="font-medium text-neutral-600 block mb-1">English Excerpt</label>
                  <textarea
                    rows={2}
                    value={form.excerptEn}
                    onChange={e => setForm({ ...form, excerptEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] bg-white focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="font-medium text-neutral-600 block mb-1">Arabic Excerpt</label>
                  <textarea
                    rows={2}
                    dir="rtl"
                    value={form.excerptAr}
                    onChange={e => setForm({ ...form, excerptAr: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] bg-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              {/* Tags, Author, Image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Image URL</label>
                  <input
                    type="text"
                    value={form.imageUrl}
                    onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Keywords / Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={e => setForm({ ...form, tags: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isBreaking}
                    onChange={e => setForm({ ...form, isBreaking: e.target.checked })}
                    className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                  />
                  <span className="font-bold text-neutral-800">Breaking Wire Communiqué</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={e => setForm({ ...form, isFeatured: e.target.checked })}
                    className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                  />
                  <span className="font-bold text-neutral-800">Featured Editorial Story</span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E5E7EB] font-bold text-neutral-600 hover:bg-neutral-100 min-h-[44px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 font-bold text-white shadow-md min-h-[44px] cursor-pointer"
                >
                  {editingArticle ? "Save Changes" : "Publish Dispatch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
