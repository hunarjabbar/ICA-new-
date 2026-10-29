import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarChart3, TrendingUp, Globe2, Users2, Eye, Share2, BookOpen } from "lucide-react";
import { PortalLocale } from "../../../types/portals";

export function NewsroomAnalytics() {
  const { lang = "en" } = useParams<{ lang: string }>();
  const currentLang = (lang === "ck" ? "ckb" : lang) as PortalLocale;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/hub/newsroom/analytics")
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="pb-4 border-b border-[#E5E7EB]">
        <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider block">
          CISE Command Hub • Editorial Intelligence
        </span>
        <h1 className="text-2xl font-black text-neutral-900">
          Newsroom Readership & Bureau Analytics
        </h1>
        <p className="text-xs text-neutral-500">
          Real-time reader engagement, quadlingual breakdown, and regional bureau throughput metrics.
        </p>
      </div>

      {/* Top 4 Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Impressions", val: "489,200", icon: Eye, color: "text-red-600", bg: "bg-red-50" },
          { label: "Unique Readers", val: "178,400", icon: Users2, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Avg Read Time", val: "4.8 mins", icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Syndicated Hits", val: "42,100", icon: Share2, color: "text-purple-600", bg: "bg-purple-50" }
        ].map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-2">
              <div className={`w-8 h-8 rounded-xl ${m.bg} ${m.color} flex items-center justify-center`}>
                <Icon size={16} />
              </div>
              <div>
                <span className="text-2xl font-black text-neutral-900 block">{m.val}</span>
                <span className="text-[11px] font-bold text-neutral-500 uppercase">{m.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid: Locale Distribution & Bureau Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Language Breakdown */}
        <div className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-black text-neutral-900">
            Readership by Official Language
          </h3>
          <div className="space-y-3">
            {data?.localeDistribution?.map((loc: any, i: number) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-700">
                  <span>{loc.name} ({loc.locale.toUpperCase()})</span>
                  <span>{loc.percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                  <div
                    className="h-full bg-red-600 rounded-full"
                    style={{ width: `${loc.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Bureaus */}
        <div className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-black text-neutral-900">
            Bilateral Bureau Editorial Output
          </h3>
          <div className="divide-y divide-[#E5E7EB]">
            {data?.bureauOutput?.map((b: any, i: number) => (
              <div key={i} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-neutral-900 block">{b.bureau}</span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {b.activeCorrespondents} accredited correspondents
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-neutral-100 font-mono font-bold text-neutral-800">
                  {b.storiesPublished} dispatches
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
