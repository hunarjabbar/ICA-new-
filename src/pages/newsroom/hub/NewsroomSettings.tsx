import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Settings, Save, CheckCircle, Shield } from "lucide-react";
import { PortalLocale } from "../../../types/portals";

export function NewsroomSettings() {
  const { lang = "en" } = useParams<{ lang: string }>();
  const [settings, setSettings] = useState<any>({
    editorialCharter: "Official Sovereign Editorial Charter of the Iraqi-Chinese Agency (ICA)",
    syndicationFeedsEnabled: true,
    rssTtlMinutes: 15,
    defaultLanguage: "en",
    quadlingualMandate: true,
    breakingBannerAutoExpireHours: 48,
    watermarkImages: true,
    publicSubmissionReviewQueue: true
  });
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/hub/newsroom/settings")
      .then(r => r.json())
      .then(d => setSettings(d))
      .catch(console.error);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/hub/newsroom/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-role": "ADMIN" },
        body: JSON.stringify(settings)
      });
      setStatusMsg("Editorial policies and syndicate configurations saved");
      setTimeout(() => setStatusMsg(null), 3000);
    } catch {
      setStatusMsg("Error saving settings");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="pb-4 border-b border-[#E5E7EB]">
        <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider block">
          CISE Command Hub • Governance
        </span>
        <h1 className="text-2xl font-black text-neutral-900">
          Newsroom Editorial Settings & Policy Directives
        </h1>
        <p className="text-xs text-neutral-500">
          Configure syndicate refresh rates, breaking news duration, watermarks, and quadlingual mandates.
        </p>
      </div>

      {statusMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-mono">
          [{statusMsg}]
        </div>
      )}

      <form onSubmit={handleSave} className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-6 text-xs">
        <div>
          <label className="font-bold text-neutral-800 block mb-1">Editorial Sovereign Charter Title</label>
          <input
            type="text"
            value={settings.editorialCharter || ""}
            onChange={e => setSettings({ ...settings, editorialCharter: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-red-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-neutral-800 block mb-1">RSS/Atom Feed TTL (Minutes)</label>
            <input
              type="number"
              value={settings.rssTtlMinutes || 15}
              onChange={e => setSettings({ ...settings, rssTtlMinutes: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-red-600"
            />
          </div>

          <div>
            <label className="font-bold text-neutral-800 block mb-1">Breaking Banner Auto-Expiry (Hours)</label>
            <input
              type="number"
              value={settings.breakingBannerAutoExpireHours || 48}
              onChange={e => setSettings({ ...settings, breakingBannerAutoExpireHours: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-red-600"
            />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(settings.syndicationFeedsEnabled)}
              onChange={e => setSettings({ ...settings, syndicationFeedsEnabled: e.target.checked })}
              className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
            />
            <span className="font-bold text-neutral-800">
              Enable Public RSS 2.0 / Atom 1.0 / JSON Feed 1.1 Syndication
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(settings.quadlingualMandate)}
              onChange={e => setSettings({ ...settings, quadlingualMandate: e.target.checked })}
              className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
            />
            <span className="font-bold text-neutral-800">
              Strict Quadlingual Mandate (en, ar, zh, ck) on all dispatches
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(settings.watermarkImages)}
              onChange={e => setSettings({ ...settings, watermarkImages: e.target.checked })}
              className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
            />
            <span className="font-bold text-neutral-800">
              Apply Official Sovereign Watermark on bilateral dispatch imagery
            </span>
          </label>
        </div>

        <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-md flex items-center gap-2 min-h-[44px] cursor-pointer"
          >
            <Save size={14} />
            <span>Save Directives</span>
          </button>
        </div>
      </form>
    </div>
  );
}
