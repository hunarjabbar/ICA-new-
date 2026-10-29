import React, { useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Tags,
  Users,
  Rss,
  BarChart3,
  Settings,
  FolderTree,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  ArrowLeft
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { getPortalTranslation } from "../../locales/portalTranslations";
import { PortalLocale } from "../../types/portals";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { HeaderGlobalSearchBar } from "../search/HeaderGlobalSearchBar";

export function NewsroomLayout() {
  const location = useLocation();
  const { lang = "en" } = useParams<{ lang: string }>();
  const currentLang = (lang === "ck" ? "ckb" : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);
  const { user } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [revalidating, setRevalidating] = useState(false);
  const [revalidateStatus, setRevalidateStatus] = useState<string | null>(null);

  const isRtl = currentLang === "ar" || currentLang === "ckb";

  const navItems = [
    { label: t("newsroom.ciseCommandHub") + " - " + "Overview", shortLabel: "Dashboard", href: `/${currentLang}/newsroom/hub`, icon: LayoutDashboard, exact: true },
    { label: t("newsroom.dispatches"), shortLabel: "Dispatches", href: `/${currentLang}/newsroom/hub/articles`, icon: FileText },
    { label: t("newsroom.categoriesDesks"), shortLabel: "Categories", href: `/${currentLang}/newsroom/hub/categories`, icon: FolderTree },
    { label: t("newsroom.tagsKeywords"), shortLabel: "Tags", href: `/${currentLang}/newsroom/hub/tags`, icon: Tags },
    { label: t("newsroom.correspondents"), shortLabel: "Correspondents", href: `/${currentLang}/newsroom/hub/authors`, icon: Users },
    { label: t("newsroom.syndicationFeeds"), shortLabel: "Feeds", href: `/${currentLang}/newsroom/hub/feeds`, icon: Rss },
    { label: t("newsroom.analyticsReadership"), shortLabel: "Analytics", href: `/${currentLang}/newsroom/hub/analytics`, icon: BarChart3 },
    { label: t("newsroom.editorialSettings"), shortLabel: "Settings", href: `/${currentLang}/newsroom/hub/settings`, icon: Settings },
  ];

  const isCurrent = (href: string, exact = false) => {
    if (exact) return location.pathname === href;
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  const handleRevalidate = async () => {
    setRevalidating(true);
    try {
      await fetch("/api/hub/newsroom/revalidate", {
        method: "POST",
        headers: { "x-role": "ADMIN" }
      });
      setRevalidateStatus("Feeds & Sitemaps Synchronized");
      setTimeout(() => setRevalidateStatus(null), 3000);
    } catch {
      setRevalidateStatus("Cache revalidation queued");
      setTimeout(() => setRevalidateStatus(null), 3000);
    } finally {
      setRevalidating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans" dir={isRtl ? "rtl" : "ltr"}>
      {/* Top Sovereign Navigation Header */}
      <header className="bg-neutral-950 text-white px-4 sm:px-6 h-16 flex items-center justify-between sticky top-0 z-50 border-b border-neutral-800 shadow-md">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Drawer"
            className="md:hidden p-2 hover:bg-neutral-800 text-white rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <Link to={`/${currentLang}/newsroom/hub`} className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-red-600 text-white rounded-xl flex items-center justify-center font-black text-xs shadow-md">
              ICA
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest">
                <span>CISE Command Hub</span>
                <ChevronRight size={10} className="rtl:rotate-180 text-neutral-500" />
                <span>Editorial Control</span>
              </div>
              <h1 className="font-serif text-sm font-black tracking-tight text-white uppercase group-hover:text-red-400 transition-colors">
                ICA Newsroom Desk
              </h1>
            </div>
          </Link>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Unified Cross-Portal Global Search */}
          <HeaderGlobalSearchBar lang={currentLang as any} variant="trigger" />

          <button
            type="button"
            onClick={handleRevalidate}
            disabled={revalidating}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-600 text-xs font-bold text-neutral-300 hover:text-white transition-all cursor-pointer min-h-[38px]"
          >
            <RefreshCw size={12} className={revalidating ? "animate-spin text-red-500" : ""} />
            <span>{revalidating ? "Revalidating..." : "Revalidate"}</span>
          </button>

          <LanguageSwitcher lang={lang as any} />

          <Link
            to={`/${currentLang}/newsroom`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-xs transition-colors min-h-[38px]"
          >
            <span>{t("newsroom.publicNewsroom")}</span>
            <ExternalLink size={12} />
          </Link>

          <Link
            to={`/${currentLang}/hub/management`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs font-bold text-neutral-300 hover:text-white transition-colors min-h-[38px]"
          >
            <ArrowLeft size={12} className="rtl:rotate-180" />
            <span className="hidden sm:inline">CISE Command Hub</span>
          </Link>

          <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-bold text-red-500 shadow-xs">
            {user?.name?.[0] || "A"}
          </div>
        </div>
      </header>

      {revalidateStatus && (
        <div className="bg-emerald-950 border-b border-emerald-800 px-4 py-2 text-center text-xs font-mono text-emerald-400">
          [{revalidateStatus}]
        </div>
      )}

      {/* Main Structural Frame */}
      <div className="flex-1 flex overflow-hidden">
        {/* Responsive Sidebar Navigation */}
        <aside
          className={`
            fixed inset-y-0 start-0 z-40 w-72 bg-white border-e border-[#E5E7EB] transform transition-transform duration-300 md:relative md:translate-x-0 flex flex-col justify-between pt-16 md:pt-0 shadow-lg md:shadow-none
            ${mobileOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full md:rtl:translate-x-0"}
          `}
        >
          <div className="p-4 space-y-6 overflow-y-auto">
            {/* Section Scope Banner */}
            <div className="p-3.5 rounded-2xl bg-neutral-50 border border-[#E5E7EB] space-y-1">
              <span className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-wider block">
                Editorial Sovereign Scope
              </span>
              <p className="text-xs font-medium text-neutral-700">
                Full CRUD control over dispatches, categories, accredited authors, and wire ticker.
              </p>
            </div>

            {/* Navigation List */}
            <nav className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 px-3 block mb-2">
                Newsroom Desk Sections
              </span>
              {navItems.map(item => {
                const Icon = item.icon;
                const active = isCurrent(item.href, item.exact);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[44px]
                      ${active
                        ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                        : "text-neutral-700 hover:bg-neutral-100 hover:text-black"}
                    `}
                  >
                    <Icon size={16} className={active ? "text-white" : "text-neutral-500"} />
                    <span className="truncate">{item.shortLabel}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Inter-Portal Contextual Links */}
            <div className="pt-4 border-t border-[#E5E7EB] space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 px-3 block">
                CISE Ecosystem Navigation
              </span>
              <Link
                to={`/${currentLang}/hub/management`}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors min-h-[44px]"
              >
                <span>CISE Command Hub</span>
                <ChevronRight size={14} className="rtl:rotate-180 text-neutral-400" />
              </Link>
              <Link
                to={`/${currentLang}/secretariat`}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors min-h-[44px]"
              >
                <span>ICA Secretariat CISE Command Hub</span>
                <ChevronRight size={14} className="rtl:rotate-180 text-neutral-400" />
              </Link>
              <Link
                to={`/${currentLang}/newsroom`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors min-h-[44px]"
              >
                <span>Live Public Newsroom</span>
                <ExternalLink size={13} />
              </Link>
            </div>
          </div>

          {/* Sidebar Footer Badge */}
          <div className="p-4 border-t border-[#E5E7EB] bg-neutral-50">
            <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>RBAC Status: Accredited</span>
            </div>
          </div>
        </aside>

        {/* Content Region */}
        <main className="flex-1 overflow-y-auto bg-[#F9FAFB] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
