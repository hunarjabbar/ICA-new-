import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { SummitLayout } from '../../components/summit/SummitLayout';
import { CompactTradeExplorer } from '../../components/summit/CompactTradeExplorer';
import { ResearchBehindSummit } from '../../components/summit/ResearchBehindSummit';
import { 
  SUMMIT_CANONICAL, SECTOR_PAVILIONS, ICA_SERVICES, 
  SUMMIT_AGENDA, SUMMIT_SPEAKERS 
} from '../../data/summitData';
import { 
  Building2, Calendar, MapPin, Users, Award, ArrowRight, 
  CheckCircle2, ShieldCheck, Sparkles, Globe, Download, 
  Landmark, ArrowUpRight, Flame, Layers, PackageSearch, Plane, Scale, HelpCircle,
  Compass
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';

export function SummitLandingPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';
  const [selectedDay, setSelectedDay] = useState<1 | 2 | 3>(1);

  // Live Summit Stats from Database
  const { data: summitStats } = useQuery<any>({
    queryKey: ['summit-overview'],
    queryFn: async () => {
      const res = await apiFetch('/api/summit/overview');
      if (!res.ok) return null;
      return res.json();
    }
  });

  const exhibitorCount = summitStats?.exhibitors?.total || 240;
  const sectorCount = summitStats?.sectors?.total || 11;
  const targetDealVolume = summitStats?.telemetry?.targetDealVolume || '$3.5B+';


  return (
    <SummitLayout lang={lang} activeNav="overview">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16 lg:space-y-20">
        
        {/* Summit Hero Section: Sovereign Red & White Diplomatic Stature (No Black Gradients) */}
        <section className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white rounded-3xl p-6 sm:p-10 lg:p-14 shadow-xl relative overflow-hidden border border-red-500/40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-900/30 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl space-y-6">
            {/* Clean Unboxed Metadata Eyebrow */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-red-100 font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5 text-white font-black bg-white/15 px-3 py-1 rounded-full">
                <Award size={15} className="text-white" />
                <span>{lang === 'ar' ? 'الحدث الدبلوماسي الاقتصادي الأبرز' : lang === 'zh' ? '年度旗舰外交与经贸盛会' : lang === 'ckb' ? 'بەرچاوترین رووداوی دیپلۆماسی و ئابووری' : 'Flagship Bilateral Summit & Expo'}</span>
              </span>
              <span className="text-white/40" aria-hidden="true">·</span>
              <span className="text-white font-semibold">{sectorCount} Sectors</span>
              <span className="text-white/40" aria-hidden="true">·</span>
              <span className="text-white font-semibold">{exhibitorCount}+ Exhibitors</span>
              <span className="text-white/40" aria-hidden="true">·</span>
              <span className="text-white font-semibold">{targetDealVolume} Target Deals</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-100 block">
                {lang === 'ar' ? 'السليمانية — بوابة طريق الحرير في العراق' : lang === 'zh' ? '伊拉克苏莱曼尼亚 · 丝路枢纽' : lang === 'ckb' ? 'سلێمانی — دەروازەی ڕێگای ئاوریشم' : 'Sulaymaniyah — Iraq’s Silk Road Gateway'}
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                {SUMMIT_CANONICAL.formalTitle[lang]}
              </h1>
            </div>

            <p className="text-base sm:text-lg text-red-50 font-medium leading-relaxed max-w-3xl">
              {SUMMIT_CANONICAL.subtitle[lang]}
            </p>

            {/* Date and Venue Strip */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs sm:text-sm font-bold text-white">
              <div className="flex items-center gap-2.5 bg-black/15 backdrop-blur-xs px-4 py-2.5 rounded-xl border border-white/20">
                <Calendar className="w-4 h-4 text-white shrink-0" />
                <span>{SUMMIT_CANONICAL.dates[lang]}</span>
              </div>
              <div className="flex items-center gap-2.5 bg-black/15 backdrop-blur-xs px-4 py-2.5 rounded-xl border border-white/20">
                <MapPin className="w-4 h-4 text-white shrink-0" />
                <span>{SUMMIT_CANONICAL.venue.name[lang]}</span>
              </div>
            </div>

            {/* Primary Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-4">
              <Link
                to={`/${lang}/summit/floor-plan`}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-red-50 text-red-600 font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-red-600" />
                <span>{lang === 'ar' ? 'المخطط التفاعلي 3D وحجز الأجنحة' : lang === 'zh' ? '3D立体平面图选位' : '3D Floorplan & Booths'}</span>
                <ArrowRight size={15} className={isRtl ? 'rotate-180' : ''} />
              </Link>
              <Link
                to={`/${lang}/summit/register/vip`}
                className="px-5 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 font-black text-xs uppercase tracking-wider transition-all active:scale-98 flex items-center gap-2"
              >
                <Landmark size={15} />
                <span>{lang === 'ar' ? 'تسجيل الوفود الرسمية (VIP)' : lang === 'zh' ? '政要与使节VIP注册' : 'VIP Diplomatic Pass'}</span>
              </Link>
              <Link
                to={`/${lang}/summit/agenda`}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-all"
              >
                {lang === 'ar' ? 'جدول الأعمال (٣ أيام)' : lang === 'zh' ? '三日全景日程' : '3-Day Full Agenda'}
              </Link>
            </div>
          </div>
        </section>

        {/* 3D Floorplan Feature Spotlight */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-widest">
              <Compass className="w-4 h-4" />
              <span>{lang === 'ar' ? 'تقنية الأبعاد الثلاثية للمعارض' : lang === 'zh' ? '3D立体空间漫游' : 'Three.js 3D Fairground Experience'}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {lang === 'ar' ? 'استكشف أجنحة القاعات الرئيسية في بيئة ثلاثية الأبعاد' : lang === 'zh' ? '苏莱曼尼亚展馆全景立体漫游与实时选位' : 'Explore Pavilion Halls & Lock Prime Corner Booths in 3D'}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'ar'
                ? 'فحص مباشر لقاعات المعرض (أ، ب، ج، والساحة الخارجية)، ومعرفة الأجنحة الشاغرة واحتساب التكاليف مع تسهيلات تأمين الصادرات.'
                : 'Navigate through Hall A (Energy & Heavy), Hall B (Tech & Pharma), Hall C (Finance & Consumer), and the Outdoor Arena with instant pricing and Sinosure export underwriting.'}
            </p>
          </div>

          <Link
            to={`/${lang}/summit/floor-plan`}
            className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider transition-all shadow-sm shrink-0 flex items-center gap-2"
          >
            <span>{lang === 'ar' ? 'فتح المخطط التفاعلي' : lang === 'zh' ? '进入3D平面图' : 'Launch 3D Floor Plan'}</span>
            <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
          </Link>
        </section>

        {/* 11 Sector Pavilions Showcase: Clean White Cards with Red Hairline Borders */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-red-600">
                {lang === 'ar' ? 'المعرض التجاري والصناعي الشامل' : lang === 'zh' ? '双边博览会11大核心展区' : lang === 'ckb' ? '١١ کەرتی سەرەکی لە پێشانگا' : 'Bilateral Expo Pavilions'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-1">
                {lang === 'ar' ? '١١ جناحاً قطاعياً تغطي كامل مفاصل الاقتصاد' : lang === 'zh' ? '覆盖中伊经贸全产业链的11大产业展区' : lang === 'ckb' ? '١١ کەرتی سەرەکی بۆ هەموو بوارەکانی ئابووری' : '11 Sector Pavilions Facilitating Every Industry'}
              </h2>
            </div>
            <Link
              to={`/${lang}/summit/expo`}
              className="text-xs font-black text-red-600 hover:underline flex items-center gap-1"
            >
              <span>{lang === 'ar' ? 'استعراض كل الأجنحة والمشاركين' : lang === 'zh' ? '查看全部展区与展商' : lang === 'ckb' ? 'هەموو کەرتەکان و عارزان' : 'Explore All Pavilions'}</span>
              <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {SECTOR_PAVILIONS.map((sector) => (
              <Link
                key={sector.id}
                to={`/${lang}/summit/expo/sectors/${sector.slug}`}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-red-600 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between space-y-4 min-w-0"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Layers size={20} />
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500">
                      <span>{sector.boothCount}</span>
                      <span aria-hidden="true">·</span>
                      <span>Booths</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-black text-slate-900 group-hover:text-red-600 transition-colors leading-snug">
                    {sector.name[lang]}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {sector.description[lang]}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-bold text-red-600">
                    {sector.researchPillarTitle[lang]}
                  </span>
                  <ArrowRight size={14} className={`text-slate-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Embedded Institute Trade Explorer Widget */}
        <CompactTradeExplorer lang={lang} />

        {/* ICA 5 Service Verticals Integration */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-red-600">
                {lang === 'ar' ? 'التمكين التنفيذي والتجاري' : lang === 'zh' ? '落地支撑 · ICA五大核心赋能' : lang === 'ckb' ? 'پشتگیری جێبەجێکردن لە ICA' : 'Operational Trade Facilitation'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-1">
                {lang === 'ar' ? '٥ خدمات متكاملة تضمن إبرام وتنفيذ الصفقات' : lang === 'zh' ? '贯穿采购、清算、信保、签证与合规的全流程服务' : lang === 'ckb' ? '٥ خزمەتگوزاری بۆ سەرکەوتنی مامەڵە بازرگانییەکان' : '5 First-Class ICA Service Verticals'}
              </h2>
            </div>
            <Link
              to={`/${lang}/summit/services`}
              className="text-xs font-black text-red-600 hover:underline flex items-center gap-1"
            >
              <span>{lang === 'ar' ? 'عرض تفاصيل الخدمات والمكاتب' : lang === 'zh' ? '了解全部服务流程' : lang === 'ckb' ? 'وردەکاری خزمەتگوزارییەکان' : 'All Service Verticals'}</span>
              <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {ICA_SERVICES.map((srv) => (
              <Link
                key={srv.id}
                to={`/${lang}/summit/services/${srv.slug}`}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-red-600 transition-all shadow-xs hover:shadow-md flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                    <PackageSearch size={20} />
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-red-600">
                    <span>{srv.badge[lang]}</span>
                  </div>
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-red-600 transition-colors">
                    {srv.title[lang]}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {srv.tagline[lang]}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs font-bold text-red-600 flex items-center gap-1">
                  <span>{lang === 'ar' ? 'التفاصيل والاشتراطات' : lang === 'zh' ? '了解服务详情' : lang === 'ckb' ? 'زیاتر بزانە' : 'Learn More'}</span>
                  <ArrowRight size={13} className={isRtl ? 'rotate-180' : ''} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Research Behind the Summit */}
        <ResearchBehindSummit lang={lang} />

        {/* 3-Day Agenda Interactive Preview */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-red-600">
                {lang === 'ar' ? 'الجدول الزمني للفعاليات' : lang === 'zh' ? '峰会全景日程' : lang === 'ckb' ? 'بەرنامەی فەرمی' : 'Event Schedule'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-1">
                {lang === 'ar' ? 'برنامج القمة والمعرض على مدار ٣ أيام' : lang === 'zh' ? '为期三天的峰会、论坛与博览会日程' : lang === 'ckb' ? 'بەرنامەی ٣ ڕۆژەی لووتکە و پێشانگا' : '3-Day Summit & Expo Programme'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {[1, 2, 3].map((dayNum) => {
                const dayLabel = lang === 'ar' 
                  ? `اليوم ${dayNum} (${dayNum === 1 ? '١٨ تشرين الثاني' : dayNum === 2 ? '١٩ تشرين الثاني' : '٢٠ تشرين الثاني'})`
                  : lang === 'zh'
                  ? `第${dayNum}天（${dayNum === 1 ? '11月18日' : dayNum === 2 ? '11月19日' : '11月20日'}）`
                  : lang === 'ckb'
                  ? `ڕۆژی ${dayNum} (${dayNum === 1 ? '١٨ی تشرینی دووەم' : dayNum === 2 ? '١٩ی تشرینی دووەم' : '٢٠ی تشرینی دووەم'})`
                  : `Day ${dayNum} (${dayNum === 1 ? 'Nov 18' : dayNum === 2 ? 'Nov 19' : 'Nov 20'})`;

                return (
                  <button
                    key={dayNum}
                    onClick={() => setSelectedDay(dayNum as 1 | 2 | 3)}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      selectedDay === dayNum
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {dayLabel}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            {SUMMIT_AGENDA.filter(s => s.day === selectedDay).map((session) => (
              <div
                key={session.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-red-300 transition-all"
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2.5 text-[10px] font-black uppercase tracking-wider">
                    <span className="text-red-600">
                      {session.track}
                    </span>
                    <span className="text-slate-300" aria-hidden="true">·</span>
                    <span className="text-slate-600 font-bold">
                      {session.time}
                    </span>
                    <span className="text-slate-300" aria-hidden="true">·</span>
                    <span className="text-slate-500 font-medium">
                      {session.location?.[lang] || 'Main Venue'}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900">
                    {session.title?.[lang] || 'Session Title'}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {session.description?.[lang] || 'Detailed agenda information available on-site.'}
                  </p>
                </div>

                <Link
                  to={`/${lang}/summit/agenda`}
                  className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border border-slate-300 hover:border-red-600 text-slate-800 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0 text-center"
                >
                  {lang === 'ar' ? 'البرنامج الكامل و .ICS ←' : lang === 'zh' ? '全景议程与日历订阅 →' : lang === 'ckb' ? 'بەرنامەی تەواو و .ICS ←' : 'Full Agenda & .ICS →'}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Distinguished Speakers & Fellows */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-red-600">
                {lang === 'ar' ? 'القيادات والشخصيات البارزة' : lang === 'zh' ? '政要、领袖与学者' : lang === 'ckb' ? 'بەرپرسان و پسپۆڕان' : 'Eminent Faculty & Speakers'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-1">
                {lang === 'ar' ? 'نخبة المتحدثين والوزراء وباحثي المعهد' : lang === 'zh' ? '中伊政商领袖与研究院资深学者阵容' : lang === 'ckb' ? 'وتاربێژان، وەزیران و توێژەرانی پەیمانگا' : 'Distinguished Speakers & Institute Fellows'}
              </h2>
            </div>
            <Link
              to={`/${lang}/summit/speakers`}
              className="text-xs font-black text-red-600 hover:underline flex items-center gap-1"
            >
              <span>{lang === 'ar' ? 'عرض دليل المتحدثين الكامل' : lang === 'zh' ? '查看全部演讲嘉宾' : lang === 'ckb' ? 'هەموو وتاربێژان' : 'View All Speakers'}</span>
              <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SUMMIT_SPEAKERS.slice(0, 4).map((spk) => (
              <div
                key={spk.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 hover:border-red-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-black text-base shadow-xs">
                    {spk.name?.[lang]?.slice(0, 2) || '??'}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{spk.name?.[lang] || 'Speaker'}</h3>
                    <div className="text-[11px] font-bold text-red-600 mt-0.5">{spk.title?.[lang] || 'Senior Fellow'}</div>
                    <div className="text-[11px] text-slate-500">{spk.organization?.[lang] || 'Partner Institution'}</div>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
                    {spk.bio?.[lang] || 'Biography pending official release.'}
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                  <ShieldCheck size={14} className="text-red-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                    {lang === 'ar' ? 'باحث معتمد في المعهد' : lang === 'zh' ? '研究院常驻学者' : 'Institute Research Fellow'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </SummitLayout>
  );
}
