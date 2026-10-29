import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FileText, Tag, FolderTree, Users, Rss, BarChart3, Plus, ExternalLink, 
  RefreshCw, Zap, Settings, Trash2, Edit, CheckCircle, Hash, ShieldCheck 
} from "lucide-react";
import { Locale } from "../../types";
import { toast } from 'sonner';

interface NewsroomCiseCommandHubSectionProps {
  initialSubSection?: string;
  lang?: Locale;
}

export function NewsroomCiseCommandHubSection({
  initialSubSection,
  lang = "en"
}: NewsroomCiseCommandHubSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(initialSubSection || "dispatches");
  const [revalidateMsg, setRevalidateMsg] = useState<string | null>(null);
  const [revalidating, setRevalidating] = useState(false);

  // Data states
  const [articles, setArticles] = useState<any[]>([]);
  const [ticker, setTicker] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSectionData = async () => {
    try {
      setLoading(true);
      const [artRes, tickRes, catRes, authRes, tagRes] = await Promise.all([
        fetch("/api/hub/newsroom/articles", { headers: { "x-role": "ADMIN" } }),
        fetch("/api/hub/newsroom/ticker", { headers: { "x-role": "ADMIN" } }),
        fetch("/api/hub/newsroom/categories", { headers: { "x-role": "ADMIN" } }),
        fetch("/api/hub/newsroom/authors", { headers: { "x-role": "ADMIN" } }),
        fetch("/api/hub/newsroom/tags", { headers: { "x-role": "ADMIN" } })
      ]);
      const art = await artRes.json();
      const tick = await tickRes.json();
      const cat = await catRes.json();
      const auth = await authRes.json();
      const tg = await tagRes.json();

      setArticles(art.articles || []);
      setTicker(tick.ticker || []);
      setCategories(cat.categories || []);
      setAuthors(auth.authors || []);
      setTags(tg.tags || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSectionData();
  }, []);

  const triggerRevalidate = async () => {
    setRevalidating(true);
    try {
      const res = await fetch("/api/hub/newsroom/revalidate", {
        method: "POST",
        headers: { "x-role": "ADMIN" }
      });
      if (res.ok) {
        toast.success("Newsroom Feeds & XML Sitemaps Revalidated Successfully");
        setRevalidateMsg("[Newsroom Feeds & XML Sitemaps Revalidated Successfully]");
        setTimeout(() => setRevalidateMsg(null), 3000);
        fetchSectionData();
      } else {
        toast.error("Revalidation failed");
      }
    } catch {
      toast.error("Revalidation connection error");
      setRevalidateMsg("[Revalidation queued in background]");
      setTimeout(() => setRevalidateMsg(null), 3000);
    } finally {
      setRevalidating(false);
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      const res = await fetch(`/api/hub/newsroom/articles/${id}`, {
        method: "DELETE",
        headers: { "x-role": "ADMIN" }
      });
      if (res.ok) {
        toast.success("Dispatch removed from ledger");
        setRevalidateMsg("Dispatch removed from ledger");
        setTimeout(() => setRevalidateMsg(null), 3000);
        fetchSectionData();
      } else {
        toast.error("Failed to delete dispatch");
      }
    } catch {
      toast.error("Deletion connection error");
      setRevalidateMsg("Failed deleting dispatch");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-1">
            <FileText size={14} />
            <span>CISE Command Hub • ICA Newsroom Editorial Control</span>
          </div>
          <h2 className="text-xl font-black uppercase text-white">Newsroom Editorial Desk</h2>
          <p className="text-xs text-neutral-400">
            Publish diplomatic dispatches, manage accredited bureau correspondents, and control RSS/Atom syndication.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={triggerRevalidate}
            disabled={revalidating}
            className="px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-600 text-xs font-bold text-white flex items-center gap-1.5 transition-colors cursor-pointer min-h-[38px]"
          >
            <RefreshCw size={13} className={revalidating ? "animate-spin text-red-500" : ""} />
            <span>{revalidating ? "Regenerating..." : "Regenerate Feeds"}</span>
          </button>

          <Link
            to={`/${lang}/newsroom/hub`}
            className="px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs font-bold text-white flex items-center gap-1.5 transition-colors min-h-[38px]"
          >
            <span>Full Hub View</span>
          </Link>

          <Link
            to={`/${lang}/newsroom`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white flex items-center gap-1.5 shadow-md transition-colors min-h-[38px]"
          >
            <span>Public Newsroom</span>
            <ExternalLink size={13} />
          </Link>
        </div>
      </div>

      {revalidateMsg && (
        <div className="p-3 bg-emerald-950 border border-emerald-500 rounded-xl text-emerald-300 text-xs font-mono">
          {revalidateMsg}
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-800 scrollbar-none">
        {[
          { id: "dispatches", name: "Editorial Dispatches", icon: FileText, count: articles.length },
          { id: "ticker", name: "Intelligence Wire Ticker", icon: Zap, count: ticker.length },
          { id: "categories", name: "Categories & Desks", icon: FolderTree, count: categories.length },
          { id: "authors", name: "Bureau Correspondents", icon: Users, count: authors.length },
          { id: "tags", name: "Keywords & Tags", icon: Hash, count: tags.length },
          { id: "feeds", name: "Syndication Feeds", icon: Rss, count: 3 }
        ].map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer min-h-[38px] ${
                active
                  ? "bg-red-600 text-white shadow-md"
                  : "bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <Icon size={13} />
              <span>{tab.name}</span>
              {tab.count !== undefined && (
                <span className="ms-1 px-1.5 py-0.2 rounded-md bg-black/30 text-[10px] font-mono">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Editorial Dispatches */}
      {activeTab === "dispatches" && (
        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div>
              <h3 className="text-sm font-black uppercase text-white">Published Sovereign Dispatches</h3>
              <p className="text-xs text-neutral-400">Total {articles.length} dispatches live in the CISE database.</p>
            </div>
            <Link
              to={`/${lang}/newsroom/hub/articles`}
              className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white flex items-center gap-1.5"
            >
              <Plus size={13} />
              <span>New Dispatch</span>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs text-neutral-300">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-500 font-mono text-[10px] uppercase">
                  <th className="pb-2 text-start">Headline</th>
                  <th className="pb-2 text-start">Desk</th>
                  <th className="pb-2 text-start">Correspondent</th>
                  <th className="pb-2 text-start">Breaking</th>
                  <th className="pb-2 text-start">Status</th>
                  <th className="pb-2 text-end">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {articles.map(art => (
                  <tr key={art.id} className="hover:bg-neutral-800/50">
                    <td className="py-2.5 pe-3 max-w-xs truncate font-bold text-white">
                      {art.title?.[lang] || art.title?.en}
                    </td>
                    <td className="py-2.5 pe-3">
                      <span className="px-2 py-0.5 rounded bg-neutral-800 font-mono text-[10px] text-neutral-300 uppercase">
                        {art.category}
                      </span>
                    </td>
                    <td className="py-2.5 pe-3 text-neutral-400">
                      {art.author?.name || "Correspondent"}
                    </td>
                    <td className="py-2.5 pe-3">
                      {art.isBreaking ? (
                        <span className="px-1.5 py-0.5 rounded bg-red-950 text-red-400 text-[10px] font-mono font-bold">
                          BREAKING
                        </span>
                      ) : (
                        <span className="text-neutral-500 text-[10px] font-mono">NORMAL</span>
                      )}
                    </td>
                    <td className="py-2.5 pe-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-mono font-bold">
                        {art.status}
                      </span>
                    </td>
                    <td className="py-2.5 text-end space-x-2">
                      <Link
                        to={`/${lang}/newsroom/${art.slug}`}
                        target="_blank"
                        className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white inline-block"
                      >
                        <ExternalLink size={13} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => deleteArticle(art.id)}
                        className="p-1 rounded hover:bg-red-950 text-neutral-400 hover:text-red-400 inline-block cursor-pointer"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Intelligence Wire Ticker */}
      {activeTab === "ticker" && (
        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div>
              <h3 className="text-sm font-black uppercase text-white">Active Wire Ticker Communiqués</h3>
              <p className="text-xs text-neutral-400">Live flash notices cycling across the top ticker banner.</p>
            </div>
          </div>
          <div className="space-y-3">
            {ticker.map(t => (
              <div key={t.id} className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 font-mono font-bold text-[10px]">
                    {t.priority}
                  </span>
                  <span className="text-neutral-200">{t.text?.[lang] || t.text?.en}</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold shrink-0">
                  ● ACTIVE
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Categories & Desks */}
      {activeTab === "categories" && (
        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div>
              <h3 className="text-sm font-black uppercase text-white">Bilateral Category Desks</h3>
              <p className="text-xs text-neutral-400">Thematic taxonomy dividing ministerial and bilateral reporting.</p>
            </div>
            <Link
              to={`/${lang}/newsroom/hub/categories`}
              className="text-xs font-bold text-red-500 hover:underline"
            >
              Manage in Hub →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map(c => (
              <div key={c.id} className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
                <span className="text-[10px] font-mono font-bold text-red-500 uppercase">{c.slug}</span>
                <h4 className="font-bold text-sm text-white">{c.name?.[lang] || c.name?.en}</h4>
                <p className="text-xs text-neutral-400 line-clamp-2">{c.description?.[lang] || c.description?.en}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Bureau Correspondents */}
      {activeTab === "authors" && (
        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div>
              <h3 className="text-sm font-black uppercase text-white">Accredited Correspondents</h3>
              <p className="text-xs text-neutral-400">Official journalists and economic analysts.</p>
            </div>
            <Link
              to={`/${lang}/newsroom/hub/authors`}
              className="text-xs font-bold text-red-500 hover:underline"
            >
              Manage in Hub →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {authors.map(a => (
              <div key={a.id} className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center gap-3">
                <img src={a.avatar} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                <div className="overflow-hidden">
                  <h4 className="font-bold text-xs text-white truncate">{a.name}</h4>
                  <span className="text-[10px] font-mono text-red-400 block truncate">{a.bureau?.[lang] || a.bureau?.en}</span>
                  <span className="text-[10px] text-neutral-500 block truncate">{a.credentials}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Tags */}
      {activeTab === "tags" && (
        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div>
              <h3 className="text-sm font-black uppercase text-white">Diplomatic Subject Tags</h3>
              <p className="text-xs text-neutral-400">Cross-portal keywords linking articles to initiatives and research.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map(t => (
              <span key={t.id} className="px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-bold text-neutral-200 flex items-center gap-1.5">
                <span className="text-red-500">#</span>
                <span>{t.name}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Feeds */}
      {activeTab === "feeds" && (
        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div>
              <h3 className="text-sm font-black uppercase text-white">Syndication Endpoints</h3>
              <p className="text-xs text-neutral-400">Public syndicated XML and JSON streams.</p>
            </div>
            <Link
              to={`/${lang}/newsroom/hub/feeds`}
              className="text-xs font-bold text-red-500 hover:underline"
            >
              Full Feed Inspector →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
              <span className="font-bold text-white block">RSS 2.0 Feed</span>
              <span className="font-mono text-[10px] text-neutral-400 block truncate">/{lang}/newsroom/feed/rss</span>
              <a href={`/${lang}/newsroom/feed/rss`} target="_blank" rel="noopener noreferrer" className="text-red-400 font-bold hover:underline block pt-1">Inspect XML →</a>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
              <span className="font-bold text-white block">Atom 1.0 Feed</span>
              <span className="font-mono text-[10px] text-neutral-400 block truncate">/{lang}/newsroom/feed/atom</span>
              <a href={`/${lang}/newsroom/feed/atom`} target="_blank" rel="noopener noreferrer" className="text-red-400 font-bold hover:underline block pt-1">Inspect XML →</a>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
              <span className="font-bold text-white block">JSON Feed 1.1</span>
              <span className="font-mono text-[10px] text-neutral-400 block truncate">/{lang}/newsroom/feed/json</span>
              <a href={`/${lang}/newsroom/feed/json`} target="_blank" rel="noopener noreferrer" className="text-red-400 font-bold hover:underline block pt-1">Inspect JSON →</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
