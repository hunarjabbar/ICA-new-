import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Search, ArrowLeft, ArrowRight, Tag, X } from "lucide-react";
import { portalStore } from "../../data/portalData";
import { getPortalTranslation } from "../../locales/portalTranslations";
import { PortalLocale } from "../../types/portals";

export function NewsroomSearchPage() {
  const { lang = "en" } = useParams<{ lang: string }>();
  const currentLang = (lang === "ck" ? "ckb" : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);
  const isRtl = currentLang === "ar" || currentLang === "ckb";

  const [query, setQuery] = useState("");
  const [allArticles, setAllArticles] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/hub/newsroom/articles")
      .then(r => r.json())
      .then(d => {
        const list = d.articles || portalStore.getNewsArticles();
        setAllArticles(list.filter((a: any) => a.status === "PUBLISHED"));
      })
      .catch(() => {
        setAllArticles(portalStore.getNewsArticles().filter(a => a.status === "published"));
      });
  }, []);

  const results = query.trim()
    ? allArticles.filter(a => {
        const q = query.toLowerCase();
        const titleEn = typeof a.title === "object" ? (a.title.en || "").toLowerCase() : (a.title || "").toLowerCase();
        const titleLoc = typeof a.title === "object" ? (a.title[currentLang] || "").toLowerCase() : "";
        const excerptEn = typeof a.excerpt === "object" ? (a.excerpt.en || "").toLowerCase() : (a.excerpt || "").toLowerCase();
        const excerptLoc = typeof a.excerpt === "object" ? (a.excerpt[currentLang] || "").toLowerCase() : "";
        const author = (a.author?.name || "").toLowerCase();
        const tags = Array.isArray(a.tags) ? a.tags.join(" ").toLowerCase() : "";
        return titleEn.includes(q) || titleLoc.includes(q) || excerptEn.includes(q) || excerptLoc.includes(q) || author.includes(q) || tags.includes(q);
      })
    : [];

  const suggestedQueries = ["Grand Faw", "CIPS", "Solar", "Basra", "Trade Accord", "Sinosure"];

  return (
    <div className="bg-white min-h-screen py-12 font-sans selection:bg-red-600 selection:text-white" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          to={`/${currentLang}/newsroom`}
          className="inline-flex items-center gap-2 text-xs font-mono text-red-600 font-bold uppercase tracking-wider hover:underline min-h-[44px]"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          <span>{t("newsroom.backToAll")}</span>
        </Link>

        {/* Search Header */}
        <div className="p-8 rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] shadow-xs space-y-4">
          <div>
            <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider block">
              Direct Bilateral Intelligence Search
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-black text-neutral-950">
              {t("newsroom.searchArchive")}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Full-text real-time search across accredited dispatches, bilateral accords, and ministerial statements.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search size={18} className="absolute start-4 top-3.5 text-neutral-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t("newsroom.searchPlaceholder")}
              className="w-full ps-11 pe-10 py-3 rounded-2xl bg-white border border-[#E5E7EB] text-sm text-neutral-900 focus:outline-none focus:border-red-600 shadow-xs min-h-[48px]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute end-4 top-3.5 text-neutral-400 hover:text-neutral-700 p-1 cursor-pointer"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Suggested Queries */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-mono font-bold text-neutral-500 uppercase">Suggested:</span>
            {suggestedQueries.map(sq => (
              <button
                key={sq}
                type="button"
                onClick={() => setQuery(sq)}
                className="px-3 py-1 rounded-xl bg-white border border-[#E5E7EB] hover:border-red-600 text-xs font-bold text-neutral-700 hover:text-red-600 transition-colors min-h-[36px] cursor-pointer"
              >
                #{sq}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {query.trim() && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase">
                {results.length} Dispatches Found
              </span>
            </div>

            {results.length === 0 ? (
              <div className="p-16 text-center rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] text-neutral-500 text-xs font-mono">
                {t("newsroom.noResults")}
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((art: any) => {
                  const headline = typeof art.title === "object" ? (art.title[currentLang] || art.title.en) : art.title;
                  const excerpt = typeof art.excerpt === "object" ? (art.excerpt[currentLang] || art.excerpt.en) : art.excerpt;

                  return (
                    <div
                      key={art.id}
                      className="ica-card-interactive group p-6 rounded-3xl bg-white border border-[#E5E7EB] hover:border-red-600 transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                          <span className="text-red-600 font-bold">{art.publishDate || "2026-04-10"}</span>
                          <span>•</span>
                          <span className="px-2 py-0.5 rounded bg-neutral-100 font-bold text-[10px] uppercase">
                            {art.category}
                          </span>
                        </div>
                        <Link to={`/${currentLang}/newsroom/${art.slug}`}>
                          <h3 className="font-serif text-lg font-black text-neutral-900 group-hover:text-red-600 transition-colors">
                            {headline}
                          </h3>
                        </Link>
                        <p className="text-xs text-neutral-600 line-clamp-2">
                          {excerpt}
                        </p>
                      </div>

                      <Link
                        to={`/${currentLang}/newsroom/${art.slug}`}
                        className="px-4 py-2 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] hover:border-red-600 text-xs font-bold text-red-600 flex items-center gap-1.5 transition-colors shrink-0 self-start sm:self-center min-h-[44px]"
                      >
                        <span>{t("newsroom.read")}</span>
                        <ArrowRight size={13} className="rtl:rotate-180" />
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
