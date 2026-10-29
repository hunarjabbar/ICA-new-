import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Rss, RefreshCw, CheckCircle, ExternalLink, Code2, Copy, Check } from "lucide-react";
import { PortalLocale } from "../../../types/portals";

export function NewsroomFeedsCrud() {
  const { lang = "en" } = useParams<{ lang: string }>();
  const currentLang = (lang === "ck" ? "ckb" : lang) as PortalLocale;
  const [data, setData] = useState<any>(null);
  const [revalidating, setRevalidating] = useState(false);
  const [revalidateStatus, setRevalidateStatus] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const fetchFeeds = async () => {
    try {
      const res = await fetch("/api/hub/newsroom/feeds");
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  const triggerRevalidate = async () => {
    setRevalidating(true);
    try {
      const res = await fetch("/api/hub/newsroom/revalidate", {
        method: "POST",
        headers: { "x-role": "ADMIN" }
      });
      const json = await res.json();
      setRevalidateStatus("Static XML / JSON Feeds and Sitemap Cache Revalidated");
      setTimeout(() => setRevalidateStatus(null), 4000);
      fetchFeeds();
    } catch {
      setRevalidateStatus("Error triggering feed revalidation");
    } finally {
      setRevalidating(false);
    }
  };

  const copyFeed = (url: string) => {
    const full = window.location.origin + url;
    navigator.clipboard?.writeText(full);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
        <div>
          <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider block">
            CISE Command Hub • Syndication Engine
          </span>
          <h1 className="text-2xl font-black text-neutral-900">
            Syndication Feeds & XML Cache Revalidation
          </h1>
          <p className="text-xs text-neutral-500">
            Manage real-time RSS 2.0, Atom 1.0, JSON Feed 1.1, and XML Sitemaps for global wire syndication.
          </p>
        </div>

        <button
          type="button"
          onClick={triggerRevalidate}
          disabled={revalidating}
          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-md flex items-center gap-2 self-start sm:self-auto min-h-[44px] cursor-pointer"
        >
          <RefreshCw size={14} className={revalidating ? "animate-spin" : ""} />
          <span>{revalidating ? "Regenerating..." : "Regenerate Feeds & Sitemaps"}</span>
        </button>
      </div>

      {revalidateStatus && (
        <div className="p-3.5 rounded-2xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-mono">
          [{revalidateStatus}]
        </div>
      )}

      {/* Feed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "RSS 2.0 Bilateral Feed",
            desc: "Standard XML feed consumable by all international press aggregators and newsreaders.",
            type: "rss",
            path: `/${currentLang}/newsroom/feed/rss`,
            mime: "application/rss+xml"
          },
          {
            title: "Atom 1.0 Syndication Feed",
            desc: "IETF RFC 4287 standard syndication with precise entry timestamps and cryptographic UUIDs.",
            type: "atom",
            path: `/${currentLang}/newsroom/feed/atom`,
            mime: "application/atom+xml"
          },
          {
            title: "JSON Feed 1.1 Endpoint",
            desc: "Modern RESTful JSON syndication for automated ingestion into diplomatic and financial terminals.",
            type: "json",
            path: `/${currentLang}/newsroom/feed/json`,
            mime: "application/feed+json"
          }
        ].map((f, i) => (
          <div
            key={i}
            className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs flex flex-col justify-between space-y-4 hover:border-red-600 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-red-50 text-red-600 text-[10px] font-mono font-bold uppercase">
                  {f.mime}
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-600">● 200 OK</span>
              </div>
              <h3 className="font-serif text-lg font-black text-neutral-900">{f.title}</h3>
              <p className="text-xs text-neutral-600">{f.desc}</p>
            </div>

            <div className="space-y-2 pt-3 border-t border-[#E5E7EB]">
              <span className="text-[10px] font-mono text-neutral-400 block truncate">
                {f.path}
              </span>
              <div className="flex items-center gap-2">
                <Link
                  to={f.path}
                  target="_blank"
                  className="flex-1 py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors min-h-[38px]"
                >
                  <span>Inspect Endpoint</span>
                  <ExternalLink size={12} />
                </Link>
                <button
                  type="button"
                  onClick={() => copyFeed(f.path)}
                  className="p-2 rounded-xl border border-[#E5E7EB] hover:bg-neutral-100 text-neutral-600 min-h-[38px] min-w-[38px] flex items-center justify-center cursor-pointer"
                  title="Copy URL"
                >
                  {copiedUrl === f.path ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sitemap Card */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider block">
            Ecosystem Sitemap
          </span>
          <h3 className="text-base font-black text-neutral-900">
            Canonical 4-Portal XML Sitemap Index
          </h3>
          <p className="text-xs text-neutral-500">
            Comprehensive authenticated URL map encompassing Public Portal, CISE Portal, ICA Newsroom, and Live Media.
          </p>
        </div>
        <Link
          to={`/${currentLang}/newsroom/sitemap`}
          target="_blank"
          className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-bold text-white flex items-center gap-2 self-start sm:self-auto min-h-[44px]"
        >
          <span>View Public Sitemap</span>
          <ExternalLink size={14} />
        </Link>
      </div>
    </div>
  );
}
