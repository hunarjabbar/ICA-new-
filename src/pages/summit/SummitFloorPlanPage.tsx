import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { SummitLayout } from '../../components/summit/SummitLayout';
import { SummitFloorPlan3D, BoothItem } from '../../components/summit/SummitFloorPlan3D';
import { SECTOR_PAVILIONS } from '../../data/summitData';
import { 
  Layers, MapPin, CheckCircle2, ShieldCheck, 
  ArrowRight, Download, Calculator, Sparkles, Building, AlertCircle,
  Coins, FileText, Check, PhoneCall
} from 'lucide-react';

export function SummitFloorPlanPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';

  const [selectedBooth, setSelectedBooth] = useState<BoothItem | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<{ [key: string]: boolean }>({
    sinosure: true,
    bilingualAide: false,
    freightLiaison: true,
    b2bPriority: true
  });

  const toggleAddon = (key: string) => {
    setSelectedAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateTotal = () => {
    const base = selectedBooth ? selectedBooth.price : 3600;
    let extra = 0;
    if (selectedAddons.sinosure) extra += 450;
    if (selectedAddons.bilingualAide) extra += 300;
    if (selectedAddons.freightLiaison) extra += 250;
    if (selectedAddons.b2bPriority) extra += 200;
    return base + extra;
  };

  const totalUSD = calculateTotal();
  const totalRMB = Math.round(totalUSD * 7.2);
  const totalIQD = Math.round(totalUSD * 1310);

  return (
    <SummitLayout lang={lang} activeNav="floorplan">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
        
        {/* Header Hero: Pure Red and White Diplomatic Stature */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
            <span className="text-xs font-black uppercase tracking-widest text-red-600">
              {lang === 'ar' ? 'المخطط التفاعلي للأجنحة' : lang === 'zh' ? '展馆平面图与展位选位系统' : lang === 'ckb' ? 'نەخشەی هۆڵەکان و دیاریکردنی شوێن' : 'Interactive 3D Floor Plan & Fairground Pavilions'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {lang === 'ar' ? 'مخطط قاعات معرض السليمانية وحجز الأجنحة' : lang === 'zh' ? '苏莱曼尼亚国际展馆立体平面图与即时选位报价' : lang === 'ckb' ? 'نەخشەی پێشانگای سلێمانی و حجزکردنی شوێن' : 'Sulaymaniyah Fairground 3D Floor Plan & Booth Selection'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            {lang === 'ar'
              ? 'تجوّل في قاعات المعرض بتقنية الأبعاد الثلاثية، وحدد موقع جناحك عبر الضغط المباشر مع احتساب تكاليف الحزمة والخدمات اللوجستية وتأمين الصادرات (Sinosure).'
              : 'Inspect the Sulaymaniyah Fairground in high-precision 3D space, select corner or island flagship pavilions, and calculate turnkey exhibition fees with instant bilateral currency conversion.'}
          </p>
        </div>

        {/* 3D WebGL Spatial Floorplan Engine */}
        <section className="space-y-4">
          <SummitFloorPlan3D 
            lang={lang} 
            selectedBoothId="A-108"
            onBoothSelect={(b) => setSelectedBooth(b)}
          />
        </section>

        {/* Dynamic Package Calculator & Turnkey Services */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Selected Specifications */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-red-600">
                  {lang === 'ar' ? 'مواصفات الجناح المحدد' : lang === 'zh' ? '选中展位技术规格' : 'Active Booth Specification'}
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  {selectedBooth ? `Booth ${selectedBooth.id} · ${selectedBooth.size}` : 'Booth A-108 · 18 m²'}
                </h3>
              </div>
              <div className="text-end">
                <span className="text-xs text-slate-500 block">Hall Location</span>
                <span className="text-xs font-bold text-slate-800">
                  {selectedBooth ? selectedBooth.hallName : 'Hall A (Energy & Heavy)'}
                </span>
              </div>
            </div>

            {/* Inclusions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="font-black text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  <span>Physical Booth Fit-Out Included</span>
                </span>
                <p className="text-slate-600 leading-relaxed">
                  High-grade aluminum shell scheme or island boundary, 1x fascia banner with bilingual typography, 1x lockable information desk, 3x chairs, 3x 100W spotlights, and 1x 220V power outlet.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="font-black text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-red-600" />
                  <span>Diplomatic & Media Privileges</span>
                </span>
                <p className="text-slate-600 leading-relaxed">
                  2x Full VIP Summit Passes, listing in the Official Bilateral Directory, invitation to the Strategic Gala Dinner, and press kit distribution at the Media Hub.
                </p>
              </div>
            </div>

            {/* Turnkey Add-on Services Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-700">
                Optional Turnkey Bilateral Services
              </h4>
              <div className="space-y-2">
                {[
                  { id: 'sinosure', name: 'Sinosure Export Credit Underwriting Assistance', fee: '$450 USD', desc: 'Pre-clearance and buyer assessment for commercial deals signed at the Summit.' },
                  { id: 'bilingualAide', name: 'Dedicated Chinese-Arabic Bilingual Executive Aide', fee: '$300 USD', desc: 'Full-time simultaneous interpreter present at your booth for all 3 days.' },
                  { id: 'freightLiaison', name: 'Customs & Port Freight Direct Handling', fee: '$250 USD', desc: 'Direct transport coordination from Basra/Umm Qasr or Erbil Cargo to your booth.' },
                  { id: 'b2bPriority', name: 'Pre-Scheduled 1-on-1 Ministerial & Buyer Salons', fee: '$200 USD', desc: 'Guaranteed 4 curated business matchmaking meetings with vetted distributors.' },
                ].map(item => (
                  <label
                    key={item.id}
                    onClick={() => toggleAddon(item.id)}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedAddons[item.id]
                        ? 'bg-red-50/60 border-red-300 text-slate-900'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={!!selectedAddons[item.id]}
                      onChange={() => {}}
                      className="mt-0.5 accent-red-600 w-4 h-4"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{item.name}</span>
                        <span className="font-black text-red-600 tabular-nums">{item.fee}</span>
                      </div>
                      <p className="text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Investment & Currency Ledger Summary */}
          <div className="bg-red-600 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-red-200" />
                <span className="text-xs font-black uppercase tracking-widest text-red-200">
                  Turnkey Fee Estimation
                </span>
              </div>

              <div>
                <span className="text-xs text-red-100 block">Total Package Investment</span>
                <div className="text-4xl sm:text-5xl font-black tracking-tight tabular-nums mt-1">
                  ${totalUSD.toLocaleString()}
                  <span className="text-sm font-bold text-red-200 ml-2">USD</span>
                </div>
              </div>

              <div className="pt-4 border-t border-red-500/50 space-y-2 text-xs">
                <div className="flex justify-between items-center text-red-100">
                  <span>Equivalent in Chinese Yuan:</span>
                  <span className="font-black text-white tabular-nums">¥ {totalRMB.toLocaleString()} CNY</span>
                </div>
                <div className="flex justify-between items-center text-red-100">
                  <span>Equivalent in Iraqi Dinar:</span>
                  <span className="font-black text-white tabular-nums">د.ع {totalIQD.toLocaleString()} IQD</span>
                </div>
                <div className="flex justify-between items-center text-red-200 text-[11px] pt-1">
                  <span>Clearing Window:</span>
                  <span>Direct IQD⇄RMB (No USD conversion drag)</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-red-500/50">
              <Link
                to={`/${lang}/summit/register/exhibitor`}
                className="w-full py-3.5 rounded-xl bg-white text-red-600 hover:bg-red-50 font-black text-xs uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Proceed with Official Contract</span>
                <ArrowRight size={15} className={isRtl ? 'rotate-180' : ''} />
              </Link>
              <div className="flex items-center justify-center gap-2 text-[11px] text-red-200">
                <ShieldCheck size={14} />
                <span>Protected under Bilateral Trade Agreement Protocols</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </SummitLayout>
  );
}
