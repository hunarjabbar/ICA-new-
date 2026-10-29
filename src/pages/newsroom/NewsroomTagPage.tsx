import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Hash } from "lucide-react";
import { portalStore } from "../../data/portalData";
import { getPortalTranslation } from "../../locales/portalTranslations";
import { PortalLocale } from "../../types/portals";

export function NewsroomTagPage() {
  const { lang = "en", tag } = useParams<{ lang: string; tag: string }>();
  const currentLang = (lang === "ck" ? "ckb" : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);
  const isRtl = currentLang === "ar" || currentLang === "ckb";

  const decodedTag = decodeURIComponent(tag || "");
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/hub/newsroom/articles")
      .then(r => r.json())
      .then(d => {
        const list = d.articles || portalStore.getNewsArticles();
        setArticles(list.filter((a: any) =>
          a.status === "PUBLISHED" &&
          Array.isArray(a.tags) &&
          a.tags.some((t: string) => t.toLowerCase() === decodedTag.toLowerCase())
        ));
      })
      .catch(() => {
        setArticles(portalStore.getNewsArticles().filter(a =>
          a.status === "published" &&
          a.tags.some(t => t.toLowerCase() === decodedTag.toLowerCase())
        ));
      });
  }, [decodedTag]);

  return (
    <div className="bg-white min-h-screen py-12 font-sans selection:bg-red-600 selection:text-white" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          to={`/${currentLang}/newsroom`}
          className="inline-flex items-center gap-2 text-xs font-mono text-red-600 font-bold uppercase tracking-wider hover:underline min-h-[44px]"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          <span>{t("newsroom.backToAll")}</span>
        </Link>

        {/* Tag Header Banner */}
        <div className="p-8 rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] shadow-xs space-y-2">
          <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider block">
            {t("newsroom.subjectTag")}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-neutral-950 flex items-center gap-2">
            <span className="text-red-600">#</span>
            <span>{decodedTag}</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600">
            Showing {articles.length} dispatches indexed under this subject tag.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="p-16 text-center rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] text-neutral-500 text-xs font-mono">
            {t("newsroom.noResults")}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {articles.map((art: any) => {
              const headline = typeof art.title === "object" ? (art.title[currentLang] || art.title.en) : art.title;
              const excerpt = typeof art.excerpt === "object" ? (art.excerpt[currentLang] || art.excerpt.en) : art.excerpt;

              return (
                <div
                  key={art.id}
                  className="ica-card-interactive group rounded-3xl bg-white border border-[#E5E7EB] hover:border-red-600 transition-all p-5 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="overflow-hidden rounded-2xl relative">
                      <img
                        src={art.imageUrl}
                        alt=""
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[11px] font-mono text-neutral-400 block">
                        {art.publishDate || "2026-04-10"} • {art.category}
                      </span>
                      <Link to={`/${currentLang}/newsroom/${art.slug}`}>
                        <h3 className="font-serif text-lg font-black text-neutral-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                          {headline}
                        </h3>
                      </Link>
                      <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2">
                        {excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB] text-xs">
                    <span className="font-mono text-neutral-500 font-medium">
                      {art.author?.name || "Correspondent"}
                    </span>
                    <Link
                      to={`/${currentLang}/newsroom/${art.slug}`}
                      className="font-bold text-red-600 hover:underline flex items-center gap-1 min-h-[44px] min-w-[44px] justify-end"
                    >
                      <span>{t("newsroom.read")}</span>
                      <ArrowRight size={13} className="rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
