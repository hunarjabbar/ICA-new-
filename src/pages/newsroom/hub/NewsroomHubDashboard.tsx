import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FileText,
  FolderTree,
  Tags,
  Users,
  Rss,
  TrendingUp,
  Plus,
  RefreshCw,
  ExternalLink,
  Zap,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { toast } from "sonner";
import { getPortalTranslation } from "../../../locales/portalTranslations";
import { PortalLocale } from "../../../types/portals";

export function NewsroomHubDashboard() {
  const { lang = "en" } = useParams<{ lang: string }>();
  const currentLang = (lang === "ck" ? "ckb" : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const [overview, setOverview] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [ticker, setTicker] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ovRes, artRes, tickRes] = await Promise.all([
        fetch("/api/hub/newsroom/overview", { headers: { "x-role": "ADMIN" } }),
        fetch("/api/hub/newsroom/articles", { headers: { "x-role": "ADMIN" } }),
        fetch("/api/hub/newsroom/ticker", { headers: { "x-role": "ADMIN" } })
      ]);
      const ovData = await ovRes.json();
      const artData = await artRes.json();
      const tickData = await tickRes.json();

      setOverview(ovData);
      setArticles(artData.articles || []);
      setTicker(tickData.ticker || []);
    } catch (e: any) {
      console.error("Failed loading newsroom dashboard data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleBreaking = async (id: string, current: boolean) => {
    try {
      await fetch(`/api/hub/newsroom/articles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-role": "ADMIN" },
        body: JSON.stringify({ isBreaking: !current })
      });
      setStatusMsg("Breaking dispatch flag updated successfully");
      setTimeout(() => setStatusMsg(null), 3000);
      fetchData();
    } catch {
      setStatusMsg("Failed to update breaking flag");
    }
  };

  const deleteArticle = async (id: string) => {
    toast.warning("Confirm deletion of this editorial dispatch from the CISE Command Hub?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await fetch(`/api/hub/newsroom/articles/${id}`, {
              method: "DELETE",
              headers: { "x-role": "ADMIN" }
            });
            setStatusMsg("Editorial dispatch deleted");
            setTimeout(() => setStatusMsg(null), 3000);
            fetchData();
          } catch {
            setStatusMsg("Error deleting dispatch");
          }
        }
      }
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-neutral-950 text-white border border-neutral-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
            <ShieldCheck size={14} />
            <span>CISE Command Hub • ICA Newsroom Executive Telemetry</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-white">
            Editorial Command & Syndication Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl">
            Sovereign editorial ledger for diplomatic dispatches, accredited correspondent bureaus, and RSS/Atom/JSON feeds.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={`/${currentLang}/newsroom/hub/articles`}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-md flex items-center gap-2 transition-colors min-h-[44px]"
          >
            <Plus size={15} />
            <span>New Dispatch</span>
          </Link>
          <Link
            to={`/${currentLang}/newsroom`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs font-bold text-white flex items-center gap-2 transition-colors min-h-[44px]"
          >
            <span>Public Newsroom</span>
            <ExternalLink size={14} />
          </Link>
        </div>
      </div>

      {statusMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-mono">
          [{statusMsg}]
        </div>
      )}

      {/* KPI Metric Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          {
            label: "Published Dispatches",
            val: overview?.totalArticles || articles.length,
            icon: FileText,
            color: "text-red-600",
            bg: "bg-red-50"
          },
          {
            label: "Breaking Communiqués",
            val: overview?.breakingCount || 1,
            icon: Zap,
            color: "text-amber-600",
            bg: "bg-amber-50"
          },
          {
            label: "Bilateral Desks",
            val: overview?.categoriesCount || 5,
            icon: FolderTree,
            color: "text-blue-600",
            bg: "bg-blue-50"
          },
          {
            label: "Correspondents",
            val: overview?.authorsCount || 4,
            icon: Users,
            color: "text-emerald-600",
            bg: "bg-emerald-50"
          },
          {
            label: "Syndicated Feeds",
            val: "3 Active",
            icon: Rss,
            color: "text-purple-600",
            bg: "bg-purple-50"
          },
          {
            label: "Monthly Readership",
            val: "284.5K",
            icon: TrendingUp,
            color: "text-indigo-600",
            bg: "bg-indigo-50"
          }
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs flex flex-col justify-between space-y-2 hover:border-red-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${kpi.bg} ${kpi.color}`}>
                  <Icon size={16} />
                </div>
                <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase">LIVE</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-neutral-900 block tracking-tight">
                  {kpi.val}
                </span>
                <span className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider block">
                  {kpi.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Wire Ticker Quick Control Bar */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider block">
              High-Velocity Wire
            </span>
            <h2 className="text-lg font-black text-neutral-900">
              Active Intelligence Ticker Communiqués
            </h2>
          </div>
          <Link
            to={`/${currentLang}/newsroom/hub/articles`}
            className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
          >
            <span>Manage All Items</span>
            <ArrowRight size={13} className="rtl:rotate-180" />
          </Link>
        </div>

        <div className="space-y-3">
          {ticker.map(item => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-neutral-50 border border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-mono font-black text-[10px] uppercase">
                  {item.priority}
                </span>
                <span className="font-medium text-neutral-800">
                  {item.text[currentLang] || item.text.en}
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-600 font-bold self-end sm:self-auto">
                ● BROADCASTING
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Dispatches Full CRUD Table */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
          <div>
            <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider block">
              Editorial Dispatches Ledger
            </span>
            <h2 className="text-lg font-black text-neutral-900">
              Accredited Bilateral Dispatches
            </h2>
          </div>
          <Link
            to={`/${currentLang}/newsroom/hub/articles`}
            className="px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-bold text-white transition-colors self-start sm:self-auto min-h-[38px] flex items-center"
          >
            Full Articles CRUD
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-neutral-500 font-mono text-[10px] uppercase">
                <th className="pb-3 text-start">Title & Slug</th>
                <th className="pb-3 text-start">Category Desk</th>
                <th className="pb-3 text-start">Correspondent</th>
                <th className="pb-3 text-start">Breaking</th>
                <th className="pb-3 text-start">Status</th>
                <th className="pb-3 text-end">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {articles.map(art => (
                <tr key={art.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="py-3 pe-4 max-w-xs">
                    <span className="font-bold text-neutral-900 block truncate">
                      {art.title[currentLang] || art.title.en}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 block truncate">
                      /{art.slug}
                    </span>
                  </td>
                  <td className="py-3 pe-4">
                    <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 font-mono text-[10px] uppercase font-bold">
                      {art.category}
                    </span>
                  </td>
                  <td className="py-3 pe-4 text-neutral-600 font-medium">
                    {art.author?.name || "Bureau Correspondent"}
                  </td>
                  <td className="py-3 pe-4">
                    <button
                      type="button"
                      onClick={() => toggleBreaking(art.id, art.isBreaking)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono transition-colors cursor-pointer ${
                        art.isBreaking
                          ? "bg-red-600 text-white"
                          : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                      }`}
                    >
                      {art.isBreaking ? "BREAKING" : "STANDARD"}
                    </button>
                  </td>
                  <td className="py-3 pe-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                      {art.status}
                    </span>
                  </td>
                  <td className="py-3 text-end space-x-2">
                    <Link
                      to={`/${currentLang}/newsroom/${art.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-600 inline-block"
                      title="View Public Article"
                    >
                      <ExternalLink size={13} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => deleteArticle(art.id)}
                      className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 inline-block cursor-pointer"
                      title="Delete Dispatch"
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
    </div>
  );
}
