import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FileText,
  Search,
  Filter,
  ArrowRight,
  Calendar,
  Clock,
  Rss,
  Share2,
  Mail,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Zap,
  Tag,
  Users,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Card } from "../../components/Card";
import { portalStore } from "../../data/portalData";
import { getPortalTranslation } from "../../locales/portalTranslations";
import { PortalLocale } from "../../types/portals";

export function NewsroomLandingPage() {
  const { lang = "en" } = useParams<{ lang: string }>();
  const currentLang = (lang === "ck" ? "ckb" : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);
  const isRtl = currentLang === "ar" || currentLang === "ckb";

  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [ticker, setTicker] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial fetch from API with fallback to portalStore
    const loadData = async () => {
      try {
        const [artRes, catRes, tickRes] = await Promise.all([
          fetch("/api/hub/newsroom/articles").catch(() => null),
          fetch("/api/hub/newsroom/categories").catch(() => null),
          fetch("/api/hub/newsroom/ticker").catch(() => null)
        ]);

        if (artRes && artRes.ok) {
          const data = await artRes.json();
          if (data.articles && data.articles.length > 0) {
            setArticles(data.articles.filter((a: any) => a.status === "PUBLISHED"));
          } else {
            setArticles(portalStore.getNewsArticles().filter(a => a.status === "published"));
          }
        } else {
          setArticles(portalStore.getNewsArticles().filter(a => a.status === "published"));
        }

        if (catRes && catRes.ok) {
          const cdata = await catRes.json();
          setCategories(cdata.categories || portalStore.getNewsCategories());
        } else {
          setCategories(portalStore.getNewsCategories());
        }

        if (tickRes && tickRes.ok) {
          const tdata = await tickRes.json();
          setTicker(tdata.ticker || []);
        }
      } catch {
        setArticles(portalStore.getNewsArticles().filter(a => a.status === "published"));
        setCategories(portalStore.getNewsCategories());
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const leadArticle = articles.find(a => a.isFeatured) || articles[0];
  const breakingArticle = articles.find(a => a.isBreaking) || leadArticle;

  const filteredArticles = articles.filter(a => {
    const matchesCat = selectedCategory === "all" || a.category === selectedCategory;
    const titleStr = typeof a.title === "object" ? (a.title[currentLang] || a.title.en || "") : (a.title || "");
    const excerptStr = typeof a.excerpt === "object" ? (a.excerpt[currentLang] || a.excerpt.en || "") : (a.excerpt || "");
    const matchesQuery = !searchQuery.trim() ||
      titleStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excerptStr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      portalStore.addSubscriber(newsletterEmail, currentLang, "Newsroom");
      setSubscribed(true);
      setNewsletterEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <div className="bg-white text-neutral-900 min-h-screen font-sans selection:bg-red-600 selection:text-white" dir={isRtl ? "rtl" : "ltr"}>
      {/* Breaking Communiqué Banner Strip */}
      {breakingArticle && (
        <div className="bg-neutral-950 text-white border-b border-neutral-800 py-3 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="px-2.5 py-0.5 rounded-md bg-red-600 text-white font-mono font-black text-[10px] uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Zap size={11} />
                <span>{t("newsroom.breaking")}</span>
              </span>
              <Link
                to={`/${currentLang}/newsroom/${breakingArticle.slug}`}
                className="hover:text-red-400 transition-colors truncate font-medium text-neutral-200"
              >
                {typeof breakingArticle.title === "object"
                  ? (breakingArticle.title[currentLang] || breakingArticle.title.en)
                  : breakingArticle.title}
              </Link>
            </div>
            <Link
              to={`/${currentLang}/newsroom/${breakingArticle.slug}`}
              className="text-red-400 font-bold shrink-0 hover:underline inline-flex items-center gap-1 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0"
            >
              <span>{t("newsroom.read")}</span>
              <ArrowRight size={13} className="rtl:rotate-180" />
            </Link>
          </div>
        </div>
      )}

      {/* Top Hero Bar */}
      <div className="bg-[#F9FAFB] border-b border-[#E5E7EB] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-red-600 font-bold uppercase tracking-wider">
                <FileText size={16} />
                <span>{t("newsroom.title")}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-black text-neutral-950 tracking-tight">
                {t("newsroom.title")}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-xl leading-relaxed">
                {t("newsroom.subtitle")}
              </p>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={`/${currentLang}/newsroom/search`}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-red-600 text-xs font-bold text-neutral-900 flex items-center gap-2 shadow-xs transition-colors min-h-[44px]"
              >
                <Search size={14} className="text-red-600" />
                <span>{t("newsroom.searchArchive")}</span>
              </Link>
              <Link
                to={`/${currentLang}/newsroom/archive`}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-red-600 text-xs font-bold text-neutral-900 shadow-xs transition-colors min-h-[44px] flex items-center"
              >
                <span>{t("newsroom.archive")}</span>
              </Link>
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E5E7EB] text-xs">
                <Link
                  to={`/${currentLang}/newsroom/feed/rss`}
                  className="px-3 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-600 text-neutral-600 font-mono text-[11px] font-bold transition-colors min-h-[36px] flex items-center"
                >
                  RSS
                </Link>
                <Link
                  to={`/${currentLang}/newsroom/feed/atom`}
                  className="px-3 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-600 text-neutral-600 font-mono text-[11px] font-bold transition-colors min-h-[36px] flex items-center"
                >
                  Atom
                </Link>
                <Link
                  to={`/${currentLang}/newsroom/feed/json`}
                  className="px-3 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-600 text-neutral-600 font-mono text-[11px] font-bold transition-colors min-h-[36px] flex items-center"
                >
                  JSON
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Lead Feature Story Card */}
        {leadArticle && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] hover:border-red-600 transition-colors shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-red-100 text-red-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                    {leadArticle.category || "BILATERAL STRATEGY"}
                  </span>
                  {leadArticle.isBreaking && (
                    <span className="px-2.5 py-0.5 rounded bg-red-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider animate-soft-vibrate">
                      {t("newsroom.breaking")}
                    </span>
                  )}
                  <span className="text-neutral-400 text-xs font-mono">•</span>
                  <span className="text-xs font-mono text-neutral-500">
                    {leadArticle.publishDate || "2026-04-12"}
                  </span>
                </div>

                <Link to={`/${currentLang}/newsroom/${leadArticle.slug}`} className="group block space-y-3">
                  <h2 className="font-serif text-2xl sm:text-4xl font-black text-neutral-950 group-hover:text-red-600 transition-colors leading-tight">
                    {typeof leadArticle.title === "object"
                      ? (leadArticle.title[currentLang] || leadArticle.title.en)
                      : leadArticle.title}
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed line-clamp-3">
                    {typeof leadArticle.excerpt === "object"
                      ? (leadArticle.excerpt[currentLang] || leadArticle.excerpt.en)
                      : leadArticle.excerpt}
                  </p>
                </Link>

                <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                  <div className="flex items-center gap-3">
                    {leadArticle.author?.avatar && (
                      <img
                        src={leadArticle.author.avatar}
                        alt=""
                        className="w-10 h-10 rounded-xl object-cover border border-[#E5E7EB]"
                      />
                    )}
                    <div>
                      <span className="text-xs font-bold text-neutral-900 block">
                        {leadArticle.author?.name || "Bureau Correspondent"}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-500 block">
                        {typeof leadArticle.author?.bureau === "object"
                          ? (leadArticle.author.bureau[currentLang] || leadArticle.author.bureau.en)
                          : (leadArticle.author?.bureau || "Baghdad Bureau")}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/${currentLang}/newsroom/${leadArticle.slug}`}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-xs inline-flex items-center gap-2 transition-colors min-h-[44px]"
                  >
                    <span>{t("newsroom.read")}</span>
                    <ArrowRight size={14} className="rtl:rotate-180" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <Link to={`/${currentLang}/newsroom/${leadArticle.slug}`} className="block overflow-hidden rounded-2xl group">
                  <img
                    src={leadArticle.imageUrl}
                    alt=""
                    className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl border border-[#E5E7EB]"
                  />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Bilateral Category Filter Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#E5E7EB]">
            <div>
              <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider block">
                Thematic Coverage
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-black text-neutral-950">
                Accredited Bilateral Desks
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              Showing {filteredArticles.length} published dispatches
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all shrink-0 cursor-pointer min-h-[44px] ${
                selectedCategory === "all"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                  : "bg-[#F9FAFB] text-neutral-600 hover:bg-neutral-100 border border-[#E5E7EB]"
              }`}
            >
              {t("newsroom.allCategories")}
            </button>
            {categories.map((cat: any) => {
              const active = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id || cat.slug}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all shrink-0 cursor-pointer min-h-[44px] ${
                    active
                      ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                      : "bg-[#F9FAFB] text-neutral-600 hover:bg-neutral-100 border border-[#E5E7EB]"
                  }`}
                >
                  {typeof cat.name === "object" ? (cat.name[currentLang] || cat.name.en) : cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((art: any) => {
            const headline = typeof art.title === "object" ? (art.title[currentLang] || art.title.en) : art.title;
            const excerpt = typeof art.excerpt === "object" ? (art.excerpt[currentLang] || art.excerpt.en) : art.excerpt;
            const desk = art.category || "DISPATCH";
            const dateStr = art.publishDate || "2026-04-10";

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
                    <div className="absolute top-3 start-3 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-neutral-950/80 backdrop-blur-xs text-white text-[10px] font-mono font-bold uppercase">
                        {desk}
                      </span>
                      {art.isBreaking && (
                        <span className="px-2 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-mono font-bold uppercase">
                          BREAKING
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-neutral-400 block">
                      {dateStr} • {art.readTime || "4 min read"}
                    </span>
                    <Link to={`/${currentLang}/newsroom/${art.slug}`}>
                      <h4 className="font-serif text-lg font-black text-neutral-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                        {headline}
                      </h4>
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

        {/* Newsletter Subscription Strip */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 text-white border border-neutral-800 shadow-xl space-y-4">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest block">
              Sovereign Wire Syndication
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">
              Receive Direct Diplomatic Dispatches
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Daily briefings covering Sino-Iraqi macroeconomic intelligence, bilateral trade manifests, and consular accords.
            </p>
          </div>

          {subscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-mono">
              [Subscription registered under official sovereign diplomatic ledger]
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder="diplomat@consular.iq or trade@mofcom.gov.cn"
                className="flex-1 px-4 py-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-red-600 min-h-[44px]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-md transition-colors min-h-[44px] cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
