import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock, Filter, Archive } from "lucide-react";
import { portalStore } from "../../data/portalData";
import { getPortalTranslation } from "../../locales/portalTranslations";
import { PortalLocale } from "../../types/portals";

export function NewsroomArchivePage() {
  const { lang = "en" } = useParams<{ lang: string }>();
  const currentLang = (lang === "ck" ? "ckb" : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);
  const isRtl = currentLang === "ar" || currentLang === "ckb";

  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/hub/newsroom/articles")
      .then(r => r.json())
      .then(d => {
        const list = d.articles || portalStore.getNewsArticles();
        setArticles(list.filter((a: any) => a.status === "PUBLISHED"));
      })
      .catch(() => {
        setArticles(portalStore.getNewsArticles().filter(a => a.status === "published"));
      });
  }, []);

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

        {/* Archive Header */}
        <div className="p-8 rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-600 uppercase tracking-wider">
            <Archive size={14} />
            <span>Official Bilateral Records</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-neutral-950">
            {t("newsroom.archive")}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl">
            Complete indexed chronological record of accredited diplomatic dispatches, accords, and ministerial statements.
          </p>
        </div>

        {/* Chronological List */}
        <div className="space-y-4">
          {articles.map((art: any) => {
            const headline = typeof art.title === "object" ? (art.title[currentLang] || art.title.en) : art.title;
            const excerpt = typeof art.excerpt === "object" ? (art.excerpt[currentLang] || art.excerpt.en) : art.excerpt;

            return (
              <div
                key={art.id}
                className="ica-card-interactive group p-6 rounded-3xl bg-white border border-[#E5E7EB] hover:border-red-600 transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                    <span className="text-red-600 font-bold">{art.publishDate || "2026-04-10"}</span>
                    <span>•</span>
                    <span className="font-semibold text-neutral-700">{art.author?.name || "Correspondent"}</span>
                    <span>•</span>
                    <span className="px-2 py-0.5 rounded bg-neutral-100 font-bold uppercase text-[10px]">
                      {art.category}
                    </span>
                  </div>
                  <Link to={`/${currentLang}/newsroom/${art.slug}`}>
                    <h3 className="font-serif text-lg font-black text-neutral-900 group-hover:text-red-600 transition-colors">
                      {headline}
                    </h3>
                  </Link>
                  <p className="text-xs text-neutral-600 line-clamp-1">
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
      </div>
    </div>
  );
}
