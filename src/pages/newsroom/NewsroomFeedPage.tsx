import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Copy, Check, Rss, Download, ExternalLink, Code2 } from "lucide-react";
import { portalStore } from "../../data/portalData";
import { getPortalTranslation } from "../../locales/portalTranslations";
import { PortalLocale } from "../../types/portals";

export function NewsroomFeedPage() {
  const { lang = "en", feedType = "rss" } = useParams<{ lang: string; feedType: string }>();
  const currentLang = (lang === "ck" ? "ckb" : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);
  const isRtl = currentLang === "ar" || currentLang === "ckb";

  const [copied, setCopied] = useState(false);
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

  const generateFeedContent = () => {
    if (feedType === "json") {
      return JSON.stringify(
        {
          version: "https://jsonfeed.org/version/1.1",
          title: "Iraqi-Chinese Agency (ICA) Official Newsroom Feed",
          home_page_url: `https://iraq-china.agency/${currentLang}/newsroom`,
          feed_url: `https://iraq-china.agency/${currentLang}/newsroom/feed/json`,
          description: "Accredited sovereign dispatches and macroeconomic intelligence.",
          items: articles.map(a => ({
            id: a.id,
            url: `https://iraq-china.agency/${currentLang}/newsroom/${a.slug}`,
            title: typeof a.title === "object" ? (a.title[currentLang] || a.title.en) : a.title,
            content_text: typeof a.excerpt === "object" ? (a.excerpt[currentLang] || a.excerpt.en) : a.excerpt,
            date_published: new Date(a.publishDate || "2026-04-10").toISOString(),
            author: { name: a.author?.name || "Bureau Correspondent" }
          }))
        },
        null,
        2
      );
    }

    if (feedType === "atom") {
      return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Iraqi-Chinese Agency (ICA) Official Atom Syndication</title>
  <link href="https://iraq-china.agency/${currentLang}/newsroom"/>
  <updated>${new Date().toISOString()}</updated>
  <id>urn:uuid:iraq-china-newsroom-${currentLang}</id>
  ${articles
    .map(
      a => `  <entry>
    <title>${typeof a.title === "object" ? (a.title[currentLang] || a.title.en) : a.title}</title>
    <link href="https://iraq-china.agency/${currentLang}/newsroom/${a.slug}"/>
    <id>urn:uuid:${a.id}</id>
    <updated>${new Date(a.publishDate || "2026-04-10").toISOString()}</updated>
    <summary>${typeof a.excerpt === "object" ? (a.excerpt[currentLang] || a.excerpt.en) : a.excerpt}</summary>
    <author><name>${a.author?.name || "Bureau Correspondent"}</name></author>
  </entry>`
    )
    .join("\n")}
</feed>`;
    }

    // Default RSS 2.0
    return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Iraqi-Chinese Agency (ICA) Official Newsroom Wire</title>
  <link>https://iraq-china.agency/${currentLang}/newsroom</link>
  <description>Accredited sovereign dispatches and macroeconomic intelligence.</description>
  <language>${currentLang}</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  ${articles
    .map(
      a => `  <item>
    <title>${typeof a.title === "object" ? (a.title[currentLang] || a.title.en) : a.title}</title>
    <link>https://iraq-china.agency/${currentLang}/newsroom/${a.slug}</link>
    <description>${typeof a.excerpt === "object" ? (a.excerpt[currentLang] || a.excerpt.en) : a.excerpt}</description>
    <pubDate>${new Date(a.publishDate || "2026-04-10").toUTCString()}</pubDate>
    <guid>https://iraq-china.agency/${currentLang}/newsroom/${a.slug}</guid>
  </item>`
    )
    .join("\n")}
</channel>
</rss>`;
  };

  const feedContent = generateFeedContent();

  const handleCopy = () => {
    navigator.clipboard?.writeText(feedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

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

        {/* Feed Header */}
        <div className="p-8 rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider block">
                {t("newsroom.syndicationFeeds")}
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-black text-neutral-950 uppercase">
                {feedType.toUpperCase()} Syndication
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                Authenticated syndicated feed endpoint generated by the CISE Command Hub dispatch ledger.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-2 rounded-xl bg-white border border-[#E5E7EB] hover:border-red-600 text-xs font-bold text-neutral-800 flex items-center gap-2 shadow-xs transition-colors min-h-[44px] cursor-pointer"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copied ? t("newsroom.copied") : "Copy Feed Payload"}</span>
              </button>
            </div>
          </div>

          {/* Feed Switcher Tabs */}
          <div className="flex items-center gap-2 pt-2 border-t border-[#E5E7EB]">
            {["rss", "atom", "json"].map(ft => {
              const active = feedType === ft;
              return (
                <Link
                  key={ft}
                  to={`/${currentLang}/newsroom/feed/${ft}`}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-colors min-h-[40px] flex items-center ${
                    active
                      ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                      : "bg-white text-neutral-600 hover:bg-neutral-100 border border-[#E5E7EB]"
                  }`}
                >
                  {ft.toUpperCase()} Feed
                </Link>
              );
            })}
          </div>
        </div>

        {/* Code Preview Box */}
        <div className="rounded-3xl bg-neutral-950 text-neutral-200 border border-neutral-800 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-800 bg-neutral-900/60 text-xs font-mono">
            <span className="text-red-400 font-bold">
              feed.{feedType === "json" ? "json" : "xml"}
            </span>
            <span className="text-neutral-500">{feedContent.length} bytes</span>
          </div>
          <pre className="p-6 text-xs font-mono overflow-x-auto max-h-[500px] leading-relaxed text-neutral-300">
            {feedContent}
          </pre>
        </div>
      </div>
    </div>
  );
}
