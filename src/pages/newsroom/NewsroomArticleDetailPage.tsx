import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  Share2,
  ArrowLeft,
  ArrowRight,
  Check,
  Tag,
  ShieldCheck,
  BookOpen,
  MapPin,
  ExternalLink
} from "lucide-react";
import { portalStore } from "../../data/portalData";
import { getPortalTranslation } from "../../locales/portalTranslations";
import { PortalLocale } from "../../types/portals";

export function NewsroomArticleDetailPage() {
  const { lang = "en", slug } = useParams<{ lang: string; slug: string }>();
  const currentLang = (lang === "ck" ? "ckb" : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);
  const isRtl = currentLang === "ar" || currentLang === "ckb";

  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [article, setArticle] = useState<any | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      setScrollProgress(scroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Try fetching from newsroom API first
    fetch(`/api/hub/newsroom/articles/${slug}`)
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (data) {
          setArticle(data);
        } else {
          const storeArticles = portalStore.getNewsArticles();
          const found = storeArticles.find(a => a.slug === slug) || storeArticles[0];
          setArticle(found);
        }
      })
      .catch(() => {
        const storeArticles = portalStore.getNewsArticles();
        const found = storeArticles.find(a => a.slug === slug) || storeArticles[0];
        setArticle(found);
      });

    // Related articles
    const storeArticles = portalStore.getNewsArticles();
    setRelatedArticles(storeArticles.filter(a => a.slug !== slug).slice(0, 2));
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <span className="text-xs font-mono font-bold text-neutral-400">Loading sovereign dispatch...</span>
      </div>
    );
  }

  const headline = typeof article.title === "object"
    ? (article.title[currentLang] || article.title.en)
    : article.title;

  const excerpt = typeof article.excerpt === "object"
    ? (article.excerpt[currentLang] || article.excerpt.en)
    : article.excerpt;

  const content = typeof article.content === "object"
    ? (article.content[currentLang] || article.content.en)
    : article.content;

  const bureau = typeof article.author?.bureau === "object"
    ? (article.author.bureau[currentLang] || article.author.bureau.en)
    : (article.author?.bureau || "Baghdad Bureau");

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-red-600 selection:text-white" dir={isRtl ? "rtl" : "ltr"}>
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 start-0 h-1 bg-red-600 z-50 transition-all duration-75"
        style={{ width: `${Math.min(Math.max(scrollProgress * 100, 0), 100)}%` }}
      ></div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Back Link */}
        <Link
          to={`/${currentLang}/newsroom`}
          className="inline-flex items-center gap-2 text-xs font-mono text-red-600 font-bold uppercase tracking-wider hover:underline min-h-[44px]"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          <span>{t("newsroom.backToAll")}</span>
        </Link>

        {/* Header Metadata */}
        <header className="space-y-4 pb-6 border-b border-[#E5E7EB]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-red-100 text-red-800 text-[10px] font-mono font-bold uppercase tracking-wider">
              {article.category || "BILATERAL ACCORD"}
            </span>
            {article.isBreaking && (
              <span className="px-2.5 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider animate-soft-vibrate">
                {t("newsroom.breaking")}
              </span>
            )}
            <span className="text-neutral-400 text-xs font-mono">•</span>
            <span className="text-xs font-mono text-neutral-500">
              {article.publishDate || "2026-04-12"}
            </span>
            <span className="text-neutral-400 text-xs font-mono">•</span>
            <span className="text-xs font-mono text-neutral-500 flex items-center gap-1">
              <Clock size={12} />
              <span>{article.readTime || "4 min read"}</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-neutral-950 tracking-tight leading-tight">
            {headline}
          </h1>

          <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-serif italic border-s-4 border-red-600 ps-4 py-1 bg-[#F9FAFB] rounded-e-xl">
            {excerpt}
          </p>

          {/* Author Card & Share Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
            <div className="flex items-center gap-3">
              {article.author?.avatar && (
                <img
                  src={article.author.avatar}
                  alt=""
                  className="w-12 h-12 rounded-2xl object-cover border border-[#E5E7EB] shadow-xs"
                />
              )}
              <div>
                <span className="text-sm font-bold text-neutral-950 block">
                  {article.author?.name || "Accredited Correspondent"}
                </span>
                <span className="text-xs font-mono text-red-600 font-bold block">
                  {bureau}
                </span>
                {article.author?.credentials && (
                  <span className="text-[11px] text-neutral-500 block">
                    {article.author.credentials}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="px-4 py-2 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] hover:border-red-600 text-xs font-bold text-neutral-800 flex items-center gap-2 shadow-xs transition-colors min-h-[44px] cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-600" />
                    <span>{t("newsroom.copied")}</span>
                  </>
                ) : (
                  <>
                    <Share2 size={14} className="text-neutral-500" />
                    <span>{t("newsroom.share")}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        {article.imageUrl && (
          <div className="rounded-3xl overflow-hidden border border-[#E5E7EB] shadow-xs">
            <img
              src={article.imageUrl}
              alt=""
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>
        )}

        {/* Article Reading Body with strict reading measure max-inline-size 68ch */}
        <div className="max-w-[68ch] mx-auto space-y-6 text-sm sm:text-base text-neutral-800 leading-relaxed font-sans">
          <p className="first-letter:text-4xl first-letter:font-black first-letter:font-serif first-letter:text-red-600 first-letter:me-2 first-letter:float-start">
            {content}
          </p>

          <p>
            The Iraqi-Chinese Agency editorial desk confirms that all technical milestones conform to the 2026 bilateral infrastructure protocol ratified under the Belt and Road initiative. Field reports from engineering inspection teams verify zero deviation from contractual schedules.
          </p>

          <div className="p-6 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
            <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider block">
              Sovereign Diplomatic Verification
            </span>
            <p className="text-xs text-neutral-600">
              This official dossier has been transmitted to ministerial clearing houses in Baghdad and Beijing via the CISE Command Hub dispatch network.
            </p>
          </div>

          {/* Tags */}
          {Array.isArray(article.tags) && article.tags.length > 0 && (
            <div className="pt-6 border-t border-[#E5E7EB] space-y-2">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider block">
                {t("newsroom.subjectTag")}
              </span>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tg: string, i: number) => (
                  <Link
                    key={i}
                    to={`/${currentLang}/newsroom/tag/${encodeURIComponent(tg)}`}
                    className="px-3 py-1.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] hover:border-red-600 text-xs font-bold text-neutral-700 hover:text-red-600 transition-colors min-h-[38px] flex items-center"
                  >
                    #{tg}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Dispatches */}
        <section className="pt-10 border-t border-[#E5E7EB] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl sm:text-2xl font-black text-neutral-950">
              {t("newsroom.relatedDispatches")}
            </h3>
            <Link
              to={`/${currentLang}/newsroom`}
              className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
            >
              <span>{t("newsroom.backToAll")}</span>
              <ArrowRight size={12} className="rtl:rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map(rel => (
              <div
                key={rel.id}
                className="ica-card-interactive group p-5 rounded-3xl bg-white border border-[#E5E7EB] hover:border-red-600 transition-colors shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-red-600 uppercase">
                    {rel.category}
                  </span>
                  <Link to={`/${currentLang}/newsroom/${rel.slug}`}>
                    <h4 className="font-serif text-base font-black text-neutral-900 group-hover:text-red-600 transition-colors line-clamp-2">
                      {typeof rel.title === "object" ? (rel.title[currentLang] || rel.title.en) : rel.title}
                    </h4>
                  </Link>
                </div>
                <Link
                  to={`/${currentLang}/newsroom/${rel.slug}`}
                  className="font-bold text-xs text-red-600 hover:underline flex items-center gap-1 min-h-[44px] items-center"
                >
                  <span>{t("newsroom.read")}</span>
                  <ArrowRight size={12} className="rtl:rotate-180" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
