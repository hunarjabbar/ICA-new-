import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Locale } from '../../types';
import { SUMMIT_CANONICAL } from '../../data/summitData';
import { useI18n } from '../../hooks/useI18n';
import { 
  Building2, Calendar, MapPin, Sparkles, BookOpen, Layers, 
  Users, Handshake, ShieldCheck, FileText, ArrowRight, ExternalLink,
  PhoneCall, HelpCircle, Newspaper, Globe, Landmark
} from 'lucide-react';
import { BottomNav } from '../mobile/BottomNav';
import { Footer } from '../Footer';
import { HeaderGlobalSearchBar } from '../search/HeaderGlobalSearchBar';

interface SummitLayoutProps {
  children: React.ReactNode;
  lang: Locale;
  activeNav?: string;
}

export function SummitLayout({ children, lang, activeNav }: SummitLayoutProps) {
  const { t } = useI18n(lang);
  const isRtl = lang === 'ar' || lang === 'ckb';
  const location = useLocation();

  const isCise = location.pathname.includes('/institute/summit');
  const basePath = isCise ? `/${lang}/institute/summit` : `/${lang}/summit`;

  const navItems = [
    { label: { en: 'Overview', ar: 'نظرة عامة', zh: '峰会总览', ckb: 'پوختە' }, path: `${basePath}` },
    { label: { en: 'Expo & 11 Pavilions', ar: 'المعرض و١١ جناحاً', zh: '双边博览会与11展区', ckb: 'پێشانگا و ١١ کەرت' }, path: `${basePath}/expo` },
    { label: { en: 'Floor Plan & Booths', ar: 'المخطط وحجز الأجنحة', zh: '展位平面图与预订', ckb: 'نەخشەی هۆڵ و شوێنەکان' }, path: `${basePath}/floor-plan` },
    { label: { en: '3-Day Agenda', ar: 'برنامج الـ٣ أيام', zh: '三日全景日程', ckb: 'بەرنامەی ٣ ڕۆژە' }, path: `${basePath}/agenda` },
    { label: { en: 'Speakers & Fellows', ar: 'المتحدثون والباحثون', zh: '演讲嘉宾与学者', ckb: 'وتاربێژان و توێژەران' }, path: `${basePath}/speakers` },
    { label: { en: 'ICA 5 Services', ar: 'خدمات ICA الـ٥', zh: 'ICA五大直采服务', ckb: '٥ خزمەتگوزاری سەرەکی' }, path: `${basePath}/services` },
    { label: { en: 'B2B Matchmaking', ar: 'التوفيق التجاري B2B', zh: 'B2B精准商贸配对', ckb: 'کۆبوونەوەی بازرگانی B2B' }, path: `${basePath}/b2b` },
    { label: { en: 'Why Sulaymaniyah', ar: 'لماذا السليمانية', zh: '为何选择苏莱曼尼亚', ckb: 'بۆچی سلێمانی' }, path: `${basePath}/about-sulaymaniyah` },
    { label: { en: 'Sponsorship', ar: 'الرعاية والاستثمار', zh: '赞助与权益', ckb: 'سپۆنسەری' }, path: `${basePath}/sponsors` },
    { label: { en: 'VIP Access', ar: 'تسجيل الوفود الرسمية', zh: '贵宾与政要通道', ckb: 'تۆماری شاندی فەرمی' }, path: `${basePath}/register/vip` },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans transition-colors pb-16 sm:pb-20 xl:pb-0" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Knowledge Partner Sovereign Top Banner */}
      <aside aria-label="Knowledge Partner Bar" className="bg-red-800 border-b border-red-700 text-red-100 text-xs py-2 px-3 sm:px-8 min-w-0">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-wrap">
            <Link 
              to={`/${lang}`}
              className="text-[10px] sm:text-[11px] font-bold text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors shrink-0 group"
              title="Return to Iraqi-Chinese Agency Portal"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 group-hover:scale-125 transition-transform"></span>
              <span>{lang === 'ar' ? 'الوكالة العراقية الصينية' : lang === 'zh' ? '伊拉克中国机构 (ICA)' : lang === 'ckb' ? 'ئاژانسی عێراق-چین' : 'Iraqi-Chinese Agency (ICA)'}</span>
            </Link>
            <span className="text-neutral-600 hidden sm:inline" aria-hidden="true">|</span>
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-neutral-400 shrink-0">
                {t('footerKnowledgePartner')}:
              </span>
              <Link 
                to={`/${lang}/institute`}
                className="text-[10px] sm:text-[11px] font-black tracking-wide text-brand-300 hover:text-white underline decoration-brand-500/50 underline-offset-2 flex items-center gap-1 transition-colors truncate max-w-[200px] sm:max-w-none"
              >
                <span className="truncate">Chinese Institute for Strategic and Economic Studies</span>
                <ExternalLink size={11} className="shrink-0" />
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-[11px] font-semibold text-neutral-400 min-w-0 flex-wrap">
            <span className="shrink-0 font-bold text-neutral-300">{SUMMIT_CANONICAL.dates[lang]}</span>
            <span className="shrink-0 opacity-50">•</span>
            <span className="truncate max-w-[180px] sm:max-w-none">{SUMMIT_CANONICAL.venue.name[lang]}</span>
          </div>
        </div>
      </aside>

      {/* Main Summit Navigation Bar */}
      <header className="sticky top-0 z-40 bg-red-600 text-white shadow-lg w-full max-w-full overflow-hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Summit Brand / Logo */}
            <Link to={basePath} className="flex items-center gap-3 shrink-0 group">
              <div className="w-11 h-11 rounded-xl bg-white text-red-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform ring-1 ring-red-500/50">
                <Landmark className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-widest text-red-100">
                  {lang === 'ar' ? 'السليمانية ٢٠٢٦' : lang === 'zh' ? '苏莱曼尼亚 2026' : lang === 'ckb' ? 'سلێمانی ٢٠٢٦' : 'Sulaymaniyah 2026'}
                </span>
                <span className="text-sm sm:text-base font-black tracking-tight text-white leading-tight">
                  {SUMMIT_CANONICAL.name[lang]}
                </span>
              </div>
            </Link>

            {/* Unified Global Search in Summit Header */}
            <div className="flex-1 max-w-sm lg:max-w-md mx-2 hidden md:block">
              <HeaderGlobalSearchBar 
                lang={lang} 
                variant="bar" 
                placeholder={
                  lang === 'ar' ? 'ابحث في القمة، أجنحة 3D، الجداول، والدبلوماسية...' :
                  lang === 'zh' ? '搜索峰会、3D立体展区、大会日程与政企对接...' :
                  lang === 'ckb' ? 'گەڕان لە لووتکە، پێشانگای ٣D و ئەجێندا...' :
                  'Search Summit 2026, 3D booths, agenda & protocol...'
                }
              />
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile Search Trigger Button */}
              <div className="md:hidden">
                <HeaderGlobalSearchBar lang={lang} variant="trigger" />
              </div>

              <Link
                to={`/${lang}/summit/register/exhibitor`}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-white text-red-600 shadow-sm transition-all hover:bg-red-50 hover:shadow-md cursor-pointer"
              >
                <span>{lang === 'ar' ? 'حجز جناح كعارض' : lang === 'zh' ? '申请参展展位' : lang === 'ckb' ? 'تۆماری وەک عارز' : 'Exhibitor Booth'}</span>
                <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
              </Link>
              <Link
                to={`/${lang}/summit/register/visitor`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-red-700/40 hover:bg-red-700/60 text-white border border-red-500/30 transition-all cursor-pointer"
              >
                <span>{lang === 'ar' ? 'تسجيل الزوار والمشترين' : lang === 'zh' ? '买家/观众免费注册' : lang === 'ckb' ? 'تۆماری سەردانکەران' : 'Visitor Pass'}</span>
              </Link>
            </div>
          </div>

          {/* Scrolling Sub-navigation bar */}
          <div className="w-full overflow-x-auto no-scrollbar min-w-0 border-t border-red-500/30">
            <nav className="flex items-center gap-1 py-2.5 text-xs font-bold whitespace-nowrap min-w-max">
              {navItems.map((item, idx) => {
                const isActive = item.path === basePath ? location.pathname === basePath : location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={idx}
                    to={item.path}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-white text-red-600 shadow-sm font-black ring-1 ring-white' 
                        : 'text-red-100 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label[lang]}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full">
        {children}
      </main>

      {/* Canonical Global Footer */}
      <Footer currentLocale={lang} />

      {/* Modern Fixed Bottom Navigation Bar for Mobile and Tablet */}
      <BottomNav lang={lang} />
    </div>
  );
}
