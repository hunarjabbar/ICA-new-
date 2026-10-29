import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Locale } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  BookOpen, 
  Database, 
  Users, 
  Handshake, 
  Calendar, 
  ShieldCheck, 
  FileText,
  Search,
  Globe,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Landmark
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useI18n } from '../../hooks/useI18n';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { Footer } from '../Footer';
import { BottomNav } from '../mobile/BottomNav';
import { GlazedLanguageModal } from '../GlazedLanguageModal';

import { HeaderGlobalSearchBar } from '../search/HeaderGlobalSearchBar';

interface InstituteLayoutProps {
  children: React.ReactNode;
  lang: Locale;
}

const localizedBrandNames: Record<Locale, string> = {
  en: 'Chinese Institute for Strategic and Economic Studies',
  ar: 'المعهد الصيني للدراسات الاستراتيجية والاقتصادية',
  zh: '中国战略与经济研究所',
  ckb: 'پەیمانگای چینی بۆ لێکۆڵینەوەی ستراتیژی و ئابووری'
};

export function InstituteLayout({ children, lang }: InstituteLayoutProps) {
  const isRtl = lang === 'ar' || lang === 'ckb';
  const location = useLocation();
  const { t } = useI18n(lang);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { 
      id: '', 
      label: { en: 'Overview', ar: 'نظرة عامة', zh: '研究所首页', ckb: 'تێڕوانین' }, 
      shortLabel: { en: 'Overview', ar: 'نظرة عامة', zh: '首页', ckb: 'تێڕوانین' },
      icon: Building2 
    },
    { 
      id: 'about', 
      label: { en: 'About & Charter', ar: 'عن المعهد والميثاق', zh: '关于与章程', ckb: 'دەربارەی پەیمانگا' }, 
      shortLabel: { en: 'About', ar: 'عن المعهد', zh: '关于', ckb: 'دەربارە' },
      icon: ShieldCheck 
    },
    { 
      id: 'research', 
      label: { en: 'Research Pillars', ar: 'ركائز البحث', zh: '研究支柱', ckb: 'بنەماکانی توێژینەوە' }, 
      shortLabel: { en: 'Research', ar: 'الأبحاث', zh: '研究', ckb: 'توێژینەوە' },
      icon: BookOpen 
    },
    { 
      id: 'services', 
      label: { en: 'Services & Initiatives', ar: 'الخدمات والمبادرات', zh: '机构服务与倡议', ckb: 'خزمەتگوزاری و دەستپێشخەرییەکان' }, 
      shortLabel: { en: 'Services', ar: 'الخدمات', zh: '服务', ckb: 'خزمەتگوزاری' },
      icon: Landmark,
      hasDropdown: true
    },
    { 
      id: 'publications', 
      label: { en: 'Publications', ar: 'الأبحاث والمنشورات', zh: '研究文库', ckb: 'بڵاوکراوەکان' }, 
      shortLabel: { en: 'Publications', ar: 'المنشورات', zh: '文库', ckb: 'بڵاوکراوەکان' },
      icon: FileText 
    },
    { 
      id: 'data-hub', 
      label: { en: 'Data Hub', ar: 'مركز البيانات', zh: '数据中心', ckb: 'ناوەندی زانیاری' }, 
      shortLabel: { en: 'Data Hub', ar: 'البيانات', zh: '数据', ckb: 'داتا' },
      icon: Database 
    },
    { 
      id: 'experts', 
      label: { en: 'Experts', ar: 'الخبراء والزملاء', zh: '智库专家', ckb: 'شارەزایان' }, 
      shortLabel: { en: 'Experts', ar: 'الخبراء', zh: '专家', ckb: 'شارەزایان' },
      icon: Users 
    },
    { 
      id: 'partnerships', 
      label: { en: 'Partnerships', ar: 'الشراكات', zh: '战略伙伴', ckb: 'هاوبەشییەکان' }, 
      shortLabel: { en: 'Partnerships', ar: 'الشراكات', zh: '伙伴', ckb: 'هاوبەشی' },
      icon: Handshake 
    },
    { 
      id: 'events', 
      label: { en: 'Events', ar: 'الفعاليات', zh: '政策峰会', ckb: 'چالاکییەکان' }, 
      shortLabel: { en: 'Events', ar: 'الفعاليات', zh: '峰会', ckb: 'چالاکی' },
      icon: Calendar 
    },
  ];

  const serviceSubItems = [
    { 
      id: 'summit', 
      label: { en: 'Iraq-China Economic Summit & Expo', ar: 'القمة الاقتصادية والمعرض الثنائي', zh: '伊拉克-中国经济峰会暨博览会', ckb: 'لووتکەی ئابووری و پێشانگای دوولایەنە' }, 
      tag: { en: 'Sulaymaniyah', ar: 'السليمانية', zh: '苏莱曼尼亚', ckb: 'سلێمانی' },
      path: `/${lang}/summit` 
    },
    { 
      id: 'settlement', 
      label: { en: 'Direct IQD ⇄ RMB Clearing Rail', ar: 'تسوية المدفوعات المباشرة (دينار/يوان)', zh: '第纳尔/人民币主权清算通道', ckb: 'پاکتاوی دراوەکان (دینار/یوان)' }, 
      tag: { en: '0% USD Drag', ar: 'بدون احتكاك بالدولار', zh: '零美元敞口', ckb: 'بێ دۆلار' },
      path: `/${lang}/settlement` 
    },
    { 
      id: 'insurance-facilitation', 
      label: { en: 'Sovereign Insurance Facilitation', ar: 'تسهيل التأمين السيادي (سينوشور)', zh: '主权保险与中信保对接服务', ckb: 'ئاسانکاری بیمەی سەروەری' }, 
      tag: { en: 'Sinosure', ar: 'سينوشور', zh: '中信保', ckb: 'سینۆشوور' },
      path: `/${lang}/institute/insurance-facilitation` 
    },
    { 
      id: 'cultural-exchange', 
      label: { en: 'Cultural Exchange', ar: 'التبادل الثقافي', zh: '文化交流', ckb: 'ئاڵوگۆڕی کولتووری' }, 
      tag: { en: 'Academic MOUs', ar: 'مذكرات تفاهم', zh: '学术交流', ckb: 'لێکتێگەیشتنی زانکۆیی' },
      path: `/${lang}/institute/services/cultural-exchange` 
    },
    { 
      id: 'visa-centre', 
      label: { en: 'Bilateral Visa Advisory Centre', ar: 'مركز الاستشارات والفيزا الثنائية', zh: '双边签证咨询与代办服务中心', ckb: 'ناوەندی ڕاوێژکاری ڤیزا' }, 
      tag: { en: 'Bilateral', ar: 'ثنائي', zh: '双向代办', ckb: 'دوولایەنە' },
      path: `/${lang}/institute/visa-centre` 
    },
    { 
      id: 'chinese-center', 
      label: { en: 'Chinese Language Tutoring Centre', ar: 'مركز تعليم اللغة الصينية المعتمد', zh: '汉语言教学与 HSK 认证考点', ckb: 'ناوەندی فێرکاری زمانی چینی' }, 
      tag: { en: 'HSK 1–9', ar: 'HSK 1–9', zh: 'HSK考点', ckb: 'HSK 1–9' },
      path: `/${lang}/institute/${location.pathname.includes('chinese-center') ? 'chinese-center' : 'chinese-centre'}` 
    },
    { 
      id: 'consultancy', 
      label: { en: 'Strategic Financial & Legal Advisory', ar: 'الاستشارات المالية والقانونية', zh: '跨境财税与战略法律咨询', ckb: 'ڕاوێژکاری دارایی و یاسایی' }, 
      tag: { en: 'Advisory', ar: 'استشارات', zh: '财税法律', ckb: 'ڕاوێژکاری' },
      path: `/${lang}/institute/consultancy` 
    },
  ];

  const isHome = location.pathname === `/${lang}/institute` || location.pathname === `/${lang}/institute/`;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] pb-16 sm:pb-20 xl:pb-0" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Institute Specialized Two-Row Header */}
      <header className="sticky top-0 z-50 shadow-xl site-header" id="cise-header">
        {/* ROW 1: Brand & Global Actions Band */}
        <div className="bg-red-600 text-white border-b border-white/10">
          <div className="site-header__inner">
            <div className="flex items-center justify-between h-14 sm:h-16 lg:h-[72px]">
              {/* Brand Wordmark */}
              <Link 
                to={`/${lang}/institute`} 
                aria-label={localizedBrandNames[lang] || localizedBrandNames.en}
                className="flex items-center gap-3 sm:gap-3.5 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-xl min-h-[44px]"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 bg-white rounded-xl flex items-center justify-center text-red-600 font-black text-lg sm:text-xl shadow-lg shadow-white/10 group-hover:scale-105 group-hover:shadow-white/25 transition-all shrink-0">
                  CI
                </div>
                <div className="flex flex-col text-left rtl:text-right">
                  <div className="text-xs sm:text-base lg:text-lg font-black tracking-tight uppercase leading-tight text-white group-hover:text-white transition-colors whitespace-nowrap">
                    Chinese Institute
                  </div>
                  <div className="hidden sm:block text-[9px] sm:text-[10px] lg:text-[11px] font-bold text-red-100 uppercase tracking-widest leading-none mt-0.5 whitespace-nowrap opacity-95">
                    For Strategic and Economic Studies
                  </div>
                </div>
              </Link>

              {/* Right Action Cluster */}
              <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                {/* Back to ICA button */}
                <Link 
                  to={`/${lang}`}
                  className="h-8 sm:h-10 px-2 sm:px-4 rounded-xl border border-white/20 hover:border-white/40 text-[10px] sm:text-xs font-black uppercase tracking-wider text-red-100 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-white"
                >
                  {isRtl ? <ArrowRight size={13} /> : <ArrowLeft size={13} />}
                  <span className="hidden sm:inline">{t('backToIca')}</span>
                  <span className="sm:hidden text-[10px]">ICA</span>
                </Link>

                {/* ICA Newsroom Button - WHITE ON RED */}
                <a 
                  href={`/${lang}/newsroom`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex h-9 sm:h-10 px-3 sm:px-4 rounded-xl bg-white text-red-600 hover:bg-red-50 text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all items-center gap-2 shadow-sm hover:shadow-md whitespace-nowrap focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>{t('footerIcaNewsroom')}</span>
                  <ArrowUpRight size={14} className="shrink-0" />
                </a>

                {/* Unified Cross-Portal Global Search */}
                <HeaderGlobalSearchBar 
                  lang={lang} 
                  variant="trigger" 
                  buttonLabel={lang === 'ar' ? 'بحث CISE' : lang === 'zh' ? '研究所检索' : lang === 'ckb' ? 'گەڕانی پەیمانگا' : 'Search CISE'} 
                />

                {/* Integrated Language Switcher */}
                <div className="hidden lg:block">
                  <LanguageSwitcher lang={lang} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: Primary Institute Navigation Band */}
        <div className="bg-red-700 text-white border-b border-white/10 shadow-inner w-full max-w-full overflow-x-auto lg:overflow-visible scrollbar-none">
          <div className="site-header__inner w-full overflow-x-auto lg:overflow-visible scrollbar-none">
            <nav className="flex items-center gap-1 sm:gap-2 h-11 lg:h-12 w-max min-w-full lg:min-w-0" aria-label="Institute Main Navigation">
              {navItems.map((item) => {
                const path = item.id ? `/${lang}/institute/${item.id}` : `/${lang}/institute`;
                const active = item.id === '' 
                  ? isHome 
                  : (item.id === 'services' 
                      ? location.pathname.startsWith(`/${lang}/institute/services`) ||
                        location.pathname.startsWith(`/${lang}/institute/summit`) ||
                        location.pathname.startsWith(`/${lang}/institute/settlement`) ||
                        location.pathname.startsWith(`/${lang}/institute/insurance-facilitation`) ||
                        location.pathname.startsWith(`/${lang}/institute/visa-centre`) ||
                        location.pathname.includes('/institute/chinese-center') ||
                        location.pathname.includes('/institute/chinese-centre') ||
                        location.pathname.startsWith(`/${lang}/institute/consultancy`) ||
                        location.pathname.startsWith(`/${lang}/institute/cultural-exchange`)
                      : location.pathname.startsWith(path));

                if (item.id === 'services') {
                  return (
                    <div key={item.id} className="relative group h-full flex items-center shrink-0">
                      <Link
                        to={path}
                        className={cn(
                          "relative h-full flex items-center gap-1.5 px-3 sm:px-4 text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all focus-visible:outline-none focus-visible:text-white",
                          active 
                            ? "text-white font-black drop-shadow-sm" 
                            : "text-red-100 hover:text-white"
                        )}
                      >
                        <span className="text-white">
                          <span className="hidden 2xl:inline">{item.label[lang] || item.label.en}</span>
                          <span className="2xl:hidden">{item.shortLabel[lang] || item.shortLabel.en}</span>
                        </span>
                        <ChevronDown size={12} className="transition-transform group-hover:rotate-180 opacity-70 text-white" />

                        {active && (
                          <motion.div 
                            layoutId="activeTabUnderline"
                            className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white rounded-t-sm shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                          />
                        )}
                      </Link>

                      {/* Dropdown Menu for First-Class Services */}
                      <div className="absolute top-full left-0 rtl:left-auto rtl:right-0 bg-red-800 border border-white/10 shadow-2xl rounded-2xl w-80 py-3 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="px-4 pb-2 mb-2 border-b border-white/10 flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-widest text-red-200">
                            {lang === 'ar' ? 'المبادرات والخدمات التشغيلية' : lang === 'zh' ? '智库六大直属服务' : lang === 'ckb' ? 'خزمەتگوزارییە سەرەکییەکان' : 'CISE Operational Initiatives'}
                          </span>
                        </div>
                        <div className="space-y-1 px-2">
                          {serviceSubItems.map((sub) => {
                            const isSubActive = location.pathname.startsWith(sub.path);
                            return (
                              <Link
                                key={sub.id}
                                to={sub.path}
                                className={cn(
                                  "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all",
                                  isSubActive 
                                    ? "bg-white text-red-600 shadow-md" 
                                    : "text-red-100 hover:text-white hover:bg-white/10"
                                )}
                              >
                                <span className="truncate pr-2">{sub.label[lang] || sub.label.en}</span>
                                <span className={cn("text-[9px] font-black uppercase tracking-wider shrink-0", isSubActive ? "text-red-500" : "text-red-200 opacity-60")}>
                                  {sub.tag[lang] || sub.tag.en}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                        <div className="pt-2 mt-2 border-t border-white/10 px-2">
                          <Link
                            to={`/${lang}/institute/services`}
                            className="flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
                          >
                            <span>{lang === 'ar' ? 'دليل الخدمات الكامل' : lang === 'zh' ? '查看全部服务目录' : lang === 'ckb' ? 'هەموو خزمەتگوزارییەکان' : 'View Full Services Directory'}</span>
                            <ArrowRight size={13} className={isRtl ? 'rotate-180' : ''} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }
                
                return (
                  <Link
                    key={item.id}
                    to={path}
                    className={cn(
                      "relative h-full flex items-center px-3 sm:px-4 text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all shrink-0 focus-visible:outline-none focus-visible:text-white",
                      active 
                        ? "text-white font-black drop-shadow-sm" 
                        : "text-red-100 hover:text-white"
                    )}
                  >
                    <span className={active ? "text-white" : "text-red-100 group-hover:text-white"}>
                      <span className="hidden 2xl:inline">{item.label[lang] || item.label.en}</span>
                      <span className="2xl:hidden">{item.shortLabel[lang] || item.shortLabel.en}</span>
                    </span>

                    {/* White Underline Tab Highlight */}
                    {active && (
                      <motion.div 
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white rounded-t-sm shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

      </header>

      {/* Main Content Area */}
      <main className="pb-20">
        {children}
      </main>

      {/* Canonical Global Footer */}
      <Footer currentLocale={lang} />

      {/* Modern Fixed Bottom Navigation Bar for Mobile and Tablet */}
      <BottomNav lang={lang} />

      {/* Global Language Selection Card Modal */}
      <GlazedLanguageModal lang={lang} triggerOnly={true} />
    </div>
  );
}

