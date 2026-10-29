import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Radio,
  Briefcase,
  Calendar,
  Menu,
  X,
  CreditCard,
  ShieldCheck,
  GraduationCap,
  Command,
  ChevronRight,
  ChevronLeft,
  Languages,
  Newspaper,
  Film,
  Building2,
  Sparkles,
  Landmark
} from 'lucide-react';
import { Locale } from '../../types';

export interface BottomNavProps {
  lang?: Locale;
}

type TabId = 'home' | 'broadcast' | 'services' | 'summit' | 'more';
type SheetCategory = 'services' | 'broadcast' | 'more';

export function BottomNav({ lang }: BottomNavProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Detect active locale from prop or URL pathname
  const pathParts = location.pathname.split('/').filter(Boolean);
  const detectedLocale = (pathParts[0] === 'ar' || pathParts[0] === 'zh' || pathParts[0] === 'ckb' || pathParts[0] === 'en')
    ? (pathParts[0] as Locale)
    : 'en';
  const activeLocale = lang || detectedLocale;

  const isAr = activeLocale === 'ar';
  const isZh = activeLocale === 'zh';
  const isCkb = activeLocale === 'ckb';
  const isRtl = isAr || isCkb;

  // Active tab state
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [activeSheet, setActiveSheet] = useState<SheetCategory | null>(null);

  // Sync active tab with current route
  useEffect(() => {
    const pathname = location.pathname;
    if (
      pathname.includes('/live') ||
      pathname.includes('/newsroom') ||
      pathname.includes('/media')
    ) {
      setActiveTab('broadcast');
    } else if (
      pathname.includes('/settlement') ||
      pathname.includes('/visa') ||
      pathname.includes('/chinese-center') ||
      pathname.includes('/chinese-centre') ||
      pathname.includes('/data-hub') ||
      pathname.includes('/institute')
    ) {
      setActiveTab('services');
    } else if (pathname.includes('/summit')) {
      setActiveTab('summit');
    } else if (
      pathname.includes('/consultancy') ||
      pathname.includes('/hub') ||
      pathname.includes('/portal') ||
      pathname.includes('/admin') ||
      pathname.includes('/settings') ||
      pathname.includes('/profile')
    ) {
      setActiveTab('more');
    } else {
      setActiveTab('home');
    }
  }, [location.pathname]);

  // Lock body scroll when bottom sheet is open
  useEffect(() => {
    if (activeSheet) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeSheet]);

  // Close sheet on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveSheet(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle tab click
  const handleTabClick = (tabId: TabId) => {
    if (tabId === 'home') {
      setActiveTab('home');
      setActiveSheet(null);
      navigate(`/${activeLocale}`);
    } else if (tabId === 'summit') {
      setActiveTab('summit');
      setActiveSheet(null);
      navigate(`/${activeLocale}/summit`);
    } else if (tabId === 'broadcast') {
      setActiveTab('broadcast');
      setActiveSheet(activeSheet === 'broadcast' ? null : 'broadcast');
    } else if (tabId === 'services') {
      setActiveTab('services');
      setActiveSheet(activeSheet === 'services' ? null : 'services');
    } else if (tabId === 'more') {
      setActiveTab('more');
      setActiveSheet(activeSheet === 'more' ? null : 'more');
    }
  };

  const handleLinkClick = () => {
    setActiveSheet(null);
  };

  const handleLanguageChange = (newLocale: Locale) => {
    setActiveSheet(null);
    try {
      document.cookie = `ica_lang=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      localStorage.setItem('ica_lang', newLocale);
      document.documentElement.lang = newLocale;
      document.documentElement.dir = newLocale === 'ar' || newLocale === 'ckb' ? 'rtl' : 'ltr';
    } catch {}

    const currentPath = location.pathname;
    const localeRegex = /^\/(en|ar|zh|ckb)(\/.*)?$/;
    const match = currentPath.match(localeRegex);
    if (match) {
      const rest = match[2] || '';
      navigate(`/${newLocale}${rest}${location.search}${location.hash}`);
    } else {
      navigate(`/${newLocale}${currentPath}${location.search}${location.hash}`);
    }
  };

  // Tab definitions
  const tabs = [
    {
      id: 'home' as TabId,
      label: isAr ? 'الرئيسية' : isZh ? '首页' : isCkb ? 'سەرەکی' : 'Home',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'broadcast' as TabId,
      label: isAr ? 'البث' : isZh ? '直播' : isCkb ? 'پەخش' : 'Broadcast',
      icon: Radio,
      badge: 'LIVE',
    },
    {
      id: 'services' as TabId,
      label: isAr ? 'الخدمات' : isZh ? '服务' : isCkb ? 'خزمەت' : 'Services',
      icon: Briefcase,
      badge: null,
    },
    {
      id: 'summit' as TabId,
      label: isAr ? 'القمة' : isZh ? '峰会' : isCkb ? 'لووتکە' : 'Summit',
      icon: Calendar,
      badge: '2026',
    },
    {
      id: 'more' as TabId,
      label: isAr ? 'المزيد' : isZh ? '更多' : isCkb ? 'زیاتر' : 'More',
      icon: Menu,
      badge: null,
    },
  ];

  return (
    <>
      {/* ======================================================== */}
      {/* SLIDE-UP BOTTOM SHEET (SUB-MENUS) - MINIMALIST LIGHT DESIGN */}
      {/* ======================================================== */}
      <AnimatePresence mode="wait">
        {activeSheet && (
          <div
            className="fixed inset-0 z-[60] xl:hidden overflow-hidden flex flex-col justify-end"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveSheet(null)}
              className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm cursor-pointer"
              aria-hidden="true"
            />

            {/* Slide-Up Drawer Container */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{
                type: 'spring',
                damping: 28,
                stiffness: 240,
              }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                if (info.offset.y > 70 || info.velocity.y > 350) {
                  setActiveSheet(null);
                }
              }}
              className="relative w-full max-w-2xl sm:max-w-3xl mx-auto max-h-[85vh] flex flex-col bg-white text-neutral-900 rounded-t-[32px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] pb-[calc(1.5rem+env(safe-area-inset-bottom))] z-10 overflow-hidden border-t border-neutral-200"
              role="dialog"
              aria-modal="true"
            >
              {/* Sheet Header */}
              <div className="w-full bg-neutral-50 px-5 py-4 flex flex-col items-center shrink-0 border-b border-neutral-100">
                {/* Drag Handle Indicator */}
                <div className="w-10 h-1 rounded-full bg-neutral-300 mb-3" />
                
                <div className="w-full flex items-center justify-between px-1">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.14em] flex items-center gap-2 text-neutral-900">
                    <span className="w-1.5 h-3 bg-red-600 rounded-full inline-block" />
                    <span>
                      {activeSheet === 'broadcast' && (
                        isAr ? 'مركز البث والأنباء السيادي' :
                        isZh ? '中伊主权融媒与直播矩阵' :
                        isCkb ? 'ناوەندی پەخش و هەواڵی سەروەری' :
                        'Sovereign Broadcast & News Center'
                      )}
                      {activeSheet === 'services' && (
                        isAr ? 'الخدمات الثنائية الاستراتيجية' :
                        isZh ? '双边战略与主权服务' :
                        isCkb ? 'خزمەتگوزارییە ستراتیژییەکان' :
                        'Strategic Bilateral Services'
                      )}
                      {activeSheet === 'more' && (
                        isAr ? 'بوابة العمليات المتكاملة' :
                        isZh ? '综合运营与快速导航' :
                        isCkb ? 'دەروازەی کارپێکردنی گشتی' :
                        'Integrated Operations Portal'
                      )}
                    </span>
                  </h3>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setActiveSheet(null)}
                    className="w-8 h-8 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center hover:bg-neutral-300 active:scale-95 transition-all cursor-pointer min-h-[36px] min-w-[36px]"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Scrollable Sub-Menu Content */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4">
                {/* 1. SERVICES SUB-MENU */}
                {activeSheet === 'services' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        to: '/settlement',
                        icon: CreditCard,
                        label: isAr ? 'تسوية المدفوعات السيادية' : isZh ? 'IQD / RMB 双边结算通道' : isCkb ? 'پاکتاوی دراوە سەروەرییەکان' : 'Payment Settlement Rail',
                        tag: 'IQD / e-CNY'
                      },
                      {
                        to: '/settlement/card',
                        icon: CreditCard,
                        label: isAr ? 'بطاقة كي وICA الدبلوماسية' : isZh ? 'Qi & ICA 联名双币借记卡' : isCkb ? 'کارتی دیپلۆماسی کی و ICA' : 'Qi & ICA Dual-FX Card',
                        tag: 'Dual-FX VIP'
                      },
                      {
                        to: '/institute/visa-centre',
                        icon: ShieldCheck,
                        label: isAr ? 'مركز التأشيرات والاستشارات' : isZh ? '双边公务与经贸签证中心' : isCkb ? 'ناوەندی فەرمی ڤیزا' : 'Bilateral Visa Processing',
                        tag: 'Accredited'
                      },
                      {
                        to: `/institute/${location.pathname.includes('chinese-center') ? 'chinese-center' : 'chinese-centre'}`,
                        icon: GraduationCap,
                        label: isAr ? 'تعليم اللغة واختبارات HSK' : isZh ? '商务汉语及 HSK 官方考点' : isCkb ? 'فێربوونی چینی و HSK' : 'Mandarin & HSK Examination',
                        tag: 'HSK 1-9'
                      },
                      {
                        to: '/institute/services',
                        icon: Landmark,
                        label: isAr ? 'دليل خدمات معهد CISE' : isZh ? '中伊战略研究所（CISE）主权服务' : isCkb ? 'ڕێبەری خزمەتگوزاری CISE' : 'CISE Sovereign Pillars',
                        tag: 'Core'
                      },
                      {
                        to: '/consultancy',
                        icon: Briefcase,
                        label: isAr ? 'الاستشارات الاستراتيجية والقانونية' : isZh ? '中伊法务合规与战略咨询' : isCkb ? 'ڕاوێژکاری یاسایی و ستراتیژی' : 'Strategic & Legal Advisory',
                        tag: 'Bilateral'
                      }
                    ].map((link, idx) => (
                      <Link
                        key={idx}
                        to={`/${activeLocale}${link.to}`}
                        onClick={handleLinkClick}
                        className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 hover:border-red-400/50 transition-all shadow-xs active:scale-[0.98] group min-h-[48px]"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                            <link.icon size={19} />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-bold text-neutral-900 truncate">{link.label}</div>
                            {link.tag && <div className="text-[10px] text-red-600 font-semibold uppercase tracking-wider mt-0.5">{link.tag}</div>}
                          </div>
                        </div>
                        {isRtl ? <ChevronLeft size={16} className="text-neutral-400 shrink-0 ms-2" /> : <ChevronRight size={16} className="text-neutral-400 shrink-0 ms-2" />}
                      </Link>
                    ))}
                  </div>
                )}

                {/* 2. BROADCAST SUB-MENU */}
                {activeSheet === 'broadcast' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        to: '/newsroom',
                        icon: Newspaper,
                        label: isAr ? 'غرفة أخبار وكالة ICA' : isZh ? '即时新闻中心与特快专线' : isCkb ? 'ژووری هەواڵەکانی ICA' : 'ICA Wire Newsroom',
                        tag: 'Dispatches'
                      },
                      {
                        to: '/live',
                        icon: Radio,
                        label: isAr ? 'البث المباشر بدقة 4K' : isZh ? '24/7 全天候四语高清直播' : isCkb ? 'پەخشی زیندوو 4K' : '4K Quad-Lingual Live',
                        tag: 'ON AIR'
                      },
                      {
                        to: '/media',
                        icon: Film,
                        label: isAr ? 'المركز والمكتبة المرئية' : isZh ? '官方纪录片与融媒音影库' : isCkb ? 'ناوەندی میدیا و دۆکیۆمێنتاری' : 'Media Hub & Documentaries',
                        tag: 'Reels'
                      },
                      {
                        to: '/media/ica-plus',
                        icon: Sparkles,
                        label: isAr ? 'منصة الدبلوماسيين ICA+' : isZh ? 'ICA+ 官方会员智库专享' : isCkb ? 'پلاتفۆرمی دیپلۆماسی ICA+' : 'ICA+ Sovereign VIP',
                        tag: 'VIP'
                      }
                    ].map((link, idx) => (
                      <Link
                        key={idx}
                        to={`/${activeLocale}${link.to}`}
                        onClick={handleLinkClick}
                        className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 hover:border-red-400/50 transition-all shadow-xs active:scale-[0.98] group min-h-[48px]"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                            <link.icon size={19} />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-bold text-neutral-900 truncate">{link.label}</div>
                            {link.tag && <div className="text-[10px] text-red-600 font-bold uppercase tracking-wider mt-0.5">{link.tag}</div>}
                          </div>
                        </div>
                        {isRtl ? <ChevronLeft size={16} className="text-neutral-400 shrink-0 ms-2" /> : <ChevronRight size={16} className="text-neutral-400 shrink-0 ms-2" />}
                      </Link>
                    ))}
                  </div>
                )}

                {/* 3. MORE SUB-MENU */}
                {activeSheet === 'more' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        {
                          to: '/consultancy',
                          icon: Briefcase,
                          label: isAr ? 'الاستشارات الاستراتيجية والقانونية' : isZh ? '中伊法务与战略咨询' : isCkb ? 'ڕاوێژکاری ستراتیژی و یاسایی' : 'Strategic & Legal Consultancy'
                        },
                        {
                          to: '/institute/about',
                          icon: Building2,
                          label: isAr ? 'الميثاق التأسيسي للمعهد' : isZh ? '中伊战略研究所主权宪章' : isCkb ? 'پەیڕەوی دامەزراندن' : 'Sovereign Charter & Pillars'
                        },
                        {
                          to: '/settings',
                          icon: Command,
                          label: isAr ? 'إعدادات المنصة والتفضيلات' : isZh ? '系统偏好设置与安全' : isCkb ? 'ڕێکخستنەکان' : 'Platform Settings'
                        },
                        {
                          to: '/profile',
                          icon: GraduationCap,
                          label: isAr ? 'الملف الشخصي والاعتماد' : isZh ? '授权代表个人档案' : isCkb ? 'پڕۆفایلی کەسی' : 'Delegate Profile & Credentials'
                        }
                      ].map((link, idx) => (
                        <Link
                          key={idx}
                          to={`/${activeLocale}${link.to}`}
                          onClick={handleLinkClick}
                          className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 hover:border-red-400/50 transition-all shadow-xs active:scale-[0.98] group min-h-[48px]"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-neutral-200 text-neutral-800 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                              <link.icon size={19} />
                            </div>
                            <span className="text-xs sm:text-sm font-bold text-neutral-900 truncate">{link.label}</span>
                          </div>
                          {isRtl ? <ChevronLeft size={16} className="text-neutral-400 shrink-0 ms-2" /> : <ChevronRight size={16} className="text-neutral-400 shrink-0 ms-2" />}
                        </Link>
                      ))}
                    </div>

                    {/* Language Switcher */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-600">
                        <Languages size={15} />
                        <span>
                          {isAr ? 'اختر لغة البوابة الرسمية' :
                           isZh ? '选择官方工作语言' :
                           isCkb ? 'زمانی فەرمی هەڵبژێرە' :
                           'Select Official Portal Language'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { l: 'en', n: 'English', sub: 'EN' },
                          { l: 'ar', n: 'العربية', sub: 'AR' },
                          { l: 'zh', n: '简体中文', sub: 'ZH' },
                          { l: 'ckb', n: 'کوردی', sub: 'CKB' }
                        ].map(({ l, n, sub }) => (
                          <button
                            key={l}
                            type="button"
                            onClick={() => handleLanguageChange(l as Locale)}
                            className={`py-3 px-3 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-0.5 shadow-xs cursor-pointer min-h-[48px] justify-center ${
                              activeLocale === l
                                ? 'bg-red-600 text-white shadow-sm'
                                : 'bg-white text-neutral-800 hover:bg-neutral-100 border border-neutral-200'
                            }`}
                          >
                            <span className={`text-[9px] font-mono uppercase tracking-widest ${activeLocale === l ? 'text-red-100' : 'text-neutral-400'}`}>
                              {sub}
                            </span>
                            <span className="text-xs leading-none font-bold">{n}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* FIXED BOTTOM NAVIGATION BAR - MINIMALIST LIGHT DESIGN      */}
      {/* ======================================================== */}
      <nav
        id="mobile-bottom-nav"
        data-component="mobile-bottom-nav"
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 inset-x-0 w-full left-0 right-0 z-50 xl:hidden bg-transparent backdrop-blur-none border-0 shadow-none pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-1.5 px-2 select-none"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div 
          className="h-[46px] w-full max-w-[calc(100%-1.5rem)] sm:max-w-2xl mx-auto px-1.5 flex items-center justify-around bg-white backdrop-blur-2xl border border-neutral-200 shadow-xl rounded-2xl relative overflow-hidden"
          role="tablist"
          aria-orientation="horizontal"
        >
          {/* Subtle Ambient Interior Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-red-500/5 pointer-events-none" />
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab.id)}
                className="relative flex-1 flex flex-col items-center justify-center h-full min-h-[44px] py-0.5 transition-all group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-xl active:scale-95 duration-150"
                aria-label={tab.label}
                aria-selected={isActive}
                role="tab"
              >
                {/* Active Top Indicator Glow Bar */}
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute top-0 inset-x-4 sm:inset-x-8 h-0.5 bg-red-600 rounded-full shadow-[0_1px_8px_rgba(220,38,38,0.3)]"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}

                {/* Icon Wrapper with Light Red Pill for Active State */}
                <div
                  className={`relative flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? 'w-10 h-7 rounded-full bg-red-50 text-red-600 shadow-xs scale-105'
                      : 'w-10 h-7 text-neutral-500 group-hover:text-neutral-900'
                  }`}
                >
                  <Icon
                    size={20}
                    className={`transition-colors shrink-0 ${isActive ? 'text-red-600 stroke-[2.5]' : 'text-neutral-500'}`}
                  />

                  {/* Pulsing Live Beacon */}
                  {tab.badge === 'LIVE' && (
                    <span className="absolute -top-0.5 -end-0.5 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600 border border-white" />
                    </span>
                  )}

                  {/* Summit 2026 Micro-Badge */}
                  {tab.badge === '2026' && (
                    <span className="absolute -top-1 -end-1 px-1 py-0.2 bg-red-600 text-white text-[8px] font-bold rounded-full font-mono shadow-xs border border-white/20 leading-none">
                      26
                    </span>
                  )}
                </div>

                {/* Typography Label */}
                <span
                  className={`text-[10px] sm:text-[11px] tracking-tight mt-0.5 text-center truncate max-w-full px-0.5 transition-all duration-200 ${
                    isActive
                      ? 'text-neutral-900 font-bold scale-[1.02]'
                      : 'text-neutral-500 font-medium group-hover:text-neutral-900'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}

export default BottomNav;
