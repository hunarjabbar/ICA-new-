import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Award, MapPin, Mail } from "lucide-react";
import { portalStore } from "../../data/portalData";
import { getPortalTranslation } from "../../locales/portalTranslations";
import { PortalLocale } from "../../types/portals";

export function NewsroomAuthorPage() {
  const { lang = "en", author } = useParams<{ lang: string; author: string }>();
  const currentLang = (lang === "ck" ? "ckb" : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);
  const isRtl = currentLang === "ar" || currentLang === "ckb";

  const [authors, setAuthors] = useState<any[]>(portalStore.getNewsAuthors());
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/hub/newsroom/authors")
      .then(r => r.json())
      .then(d => {
        if (d.authors) setAuthors(d.authors);
      })
      .catch(() => {});

    fetch("/api/hub/newsroom/articles")
      .then(r => r.json())
      .then(d => {
        const all = d.articles || portalStore.getNewsArticles();
        const safeAuthor = (author || "").toLowerCase();
        setArticles(all.filter((a: any) =>
          a.status === "PUBLISHED" &&
          (a.author?.slug === author || (safeAuthor && a.author?.name?.toLowerCase().includes(safeAuthor.replace(/-/g, " "))))
        ));
      })
      .catch(() => {
        setArticles(portalStore.getNewsArticles().filter(a => a.author.slug === author));
      });
  }, [author]);

  const currentAuthor = authors.find(a => a.slug === author) || authors[0];
  const bureau = typeof currentAuthor?.bureau === "object"
    ? (currentAuthor.bureau[currentLang] || currentAuthor.bureau.en)
    : (currentAuthor?.bureau || "Baghdad Bureau");

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

        {/* Author Bio Header Card */}
        {currentAuthor && (
          <div className="p-8 rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={currentAuthor.avatar}
              alt={currentAuthor.name}
              className="w-24 h-24 rounded-2xl object-cover shrink-0 shadow-md border border-[#E5E7EB]"
            />
            <div className="space-y-2 text-center sm:text-start flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-mono font-bold text-red-600 uppercase">
                  {bureau}
                </span>
                <span className="text-neutral-300">•</span>
                <span className="text-xs text-neutral-600 font-mono">
                  {currentAuthor.credentials}
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-black text-neutral-950">
                {currentAuthor.name}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
                Accredited diplomatic correspondent representing the Iraqi-Chinese Agency editorial desk.
              </p>
            </div>
          </div>
        )}

        {/* Articles Ledger */}
        <div className="space-y-4">
          <div className="pb-3 border-b border-[#E5E7EB]">
            <h2 className="font-serif text-xl sm:text-2xl font-black text-neutral-950">
              Published Dispatches by {currentAuthor?.name}
            </h2>
          </div>

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
                    <div className="overflow-hidden rounded-2xl">
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
                      {art.readTime || "4 min read"}
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
        </div>
      </div>
    </div>
  );
}
