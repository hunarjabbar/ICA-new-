import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Globe, FileText, Layers, Video, ShieldCheck } from "lucide-react";
import { portalStore } from "../../data/portalData";
import { getPortalTranslation } from "../../locales/portalTranslations";
import { PortalLocale } from "../../types/portals";

export function NewsroomSitemapPage() {
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

  const initiatives = portalStore.getInitiatives();
  const media = portalStore.getMediaItems().filter(m => m.status === "published");

  return (
    <div className="bg-white min-h-screen py-12 font-sans selection:bg-red-600 selection:text-white" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          to={`/${currentLang}/newsroom`}
          className="inline-flex items-center gap-2 text-xs font-mono text-red-600 font-bold uppercase tracking-wider hover:underline min-h-[44px]"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          <span>{t("newsroom.backToAll")}</span>
        </Link>

        {/* Header */}
        <div className="p-8 rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-600 uppercase tracking-wider">
            <Globe size={14} />
            <span>Authenticated Site Hierarchy</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-neutral-950">
            {t("newsroom.sitemapTitle")}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl">
            {t("newsroom.sitemapDesc")}
          </p>
        </div>

        {/* 3 Columns: Newsroom, CISE Institute & Secretariat, Live & Public */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Section 1: ICA Newsroom */}
          <div className="p-6 rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] shadow-xs space-y-4">
            <div className="flex items-center gap-2 font-bold text-sm text-neutral-950 border-b border-[#E5E7EB] pb-3">
              <FileText size={16} className="text-red-600" />
              <span>ICA Newsroom ({articles.length} dispatches)</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to={`/${currentLang}/newsroom`} className="font-bold text-neutral-900 hover:text-red-600 block">
                  • Newsroom Desk Root
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/newsroom/archive`} className="text-neutral-600 hover:text-red-600 block">
                  • Chronological Archive
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/newsroom/search`} className="text-neutral-600 hover:text-red-600 block">
                  • Full-Text Dispatch Search
                </Link>
              </li>
              {articles.map((a: any) => (
                <li key={a.id}>
                  <Link to={`/${currentLang}/newsroom/${a.slug}`} className="text-neutral-600 hover:text-red-600 block truncate">
                    • {typeof a.title === "object" ? (a.title[currentLang] || a.title.en) : a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2: CISE Institute & Secretariat */}
          <div className="p-6 rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] shadow-xs space-y-4">
            <div className="flex items-center gap-2 font-bold text-sm text-neutral-950 border-b border-[#E5E7EB] pb-3">
              <Layers size={16} className="text-red-600" />
              <span>CISE Command Hub & Secretariat</span>
            </div>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>
                <Link to={`/${currentLang}/hub/management`} className="font-bold text-neutral-900 hover:text-red-600 block">
                  • CISE Command Hub
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/secretariat`} className="text-neutral-600 hover:text-red-600 block">
                  • ICA Secretariat Hub
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/institute`} className="text-neutral-600 hover:text-red-600 block">
                  • CISE Institute Portal
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/institute/research`} className="text-neutral-600 hover:text-red-600 block">
                  • Research Pillars
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/institute/publications`} className="text-neutral-600 hover:text-red-600 block">
                  • Academic Publications
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/institute/data-hub`} className="text-neutral-600 hover:text-red-600 block">
                  • Bilateral Data Hub
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/institute/visa-centre`} className="text-neutral-600 hover:text-red-600 block">
                  • Consular Visa Centre
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Live Media & Strategic Initiatives */}
          <div className="p-6 rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] shadow-xs space-y-4">
            <div className="flex items-center gap-2 font-bold text-sm text-neutral-950 border-b border-[#E5E7EB] pb-3">
              <Video size={16} className="text-red-600" />
              <span>Strategic Bilateral Corridors</span>
            </div>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>
                <Link to={`/${currentLang}/live`} className="font-bold text-neutral-900 hover:text-red-600 block">
                  • Live Media & Video Hub
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/summit`} className="text-neutral-600 hover:text-red-600 block">
                  • Sulaymaniyah Summit 2026
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/settlement`} className="text-neutral-600 hover:text-red-600 block">
                  • RMB-IQD Currency Clearing
                </Link>
              </li>
              {initiatives.map((init: any) => (
                <li key={init.id}>
                  <Link to={`/${currentLang}/initiatives/${init.slug}`} className="text-neutral-600 hover:text-red-600 block truncate">
                    • {typeof init.title === "object" ? (init.title[currentLang] || init.title.en) : init.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
