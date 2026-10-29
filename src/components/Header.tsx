import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Locale } from '../locales';
import { NotificationBell } from './NotificationBell';
import { IcaLogo } from './IcaLogo';
import { HeaderGlobalSearchBar } from './search/HeaderGlobalSearchBar';
import { UnifiedMobileDrawer } from './UnifiedMobileDrawer';
import { useNavigationStore } from '../store/useNavigationStore';
import { openGlobalLanguageModal } from './GlazedLanguageModal';
import { 
  Building2, 
  CreditCard, 
  CalendarDays, 
  Radio,
  Newspaper,
  Film,
  Sparkles,
  ChevronRight,
  Globe2,
  Command,
  Menu
} from 'lucide-react';

interface HeaderProps {
  lang?: Locale;
  currentLocale?: Locale;
  setLocale?: (locale: Locale) => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, currentLocale, setLocale }) => {
  const activeLocale = lang || currentLocale || 'en';
  const location = useLocation();
  const navigate = useNavigate();
  const isAr = activeLocale === 'ar';
  const isZh = activeLocale === 'zh';
  const isCkb = activeLocale === 'ckb';
  const isRtl = isAr || isCkb;

  // Mobile Drawer State
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Read dynamically from Navigation Model
  const { getHeaderItems, syncWithServer } = useNavigationStore();
  const dynamicNavItems = getHeaderItems();

  useEffect(() => {
    syncWithServer();
  }, [syncWithServer]);

  const handleLanguageChange = (newLoc: Locale) => {
    if (typeof setLocale === 'function') {
      try {
        setLocale(newLoc);
      } catch (e) {
        console.warn('setLocale callback error:', e);
      }
    }

    try {
      document.cookie = `ica_lang=${newLoc}; path=/; max-age=31536000; SameSite=Lax`;
      localStorage.setItem('ica_lang', newLoc);
      document.documentElement.lang = newLoc;
      document.documentElement.dir = newLoc === 'ar' || newLoc === 'ckb' ? 'rtl' : 'ltr';
    } catch {}

    const currentPath = location.pathname;
    const localeRegex = /^\/(en|ar|zh|ckb)(\/.*)?$/;
    const match = currentPath.match(localeRegex);
    if (match) {
      const rest = match[2] || '';
      navigate(`/${newLoc}${rest}${location.search}${location.hash}`);
    } else {
      const rest = currentPath === '/' ? '' : currentPath;
      navigate(`/${newLoc}${rest}${location.search}${location.hash}`);
    }
  };

  const getIconForSlug = (slug: string) => {
    switch (slug) {
      case 'newsroom': return Newspaper;
      case 'live': return Radio;
      case 'media': return Film;
      case 'settlement': return CreditCard;
      case 'institute': return Building2;
      case 'summit': return CalendarDays;
      case 'hub': return Sparkles;
      default: return Globe2;
    }
  };

  const isLinkActive = (targetTo: string) => {
    const fullPath = targetTo.startsWith('/') ? targetTo : `/${activeLocale}/${targetTo}`;
    if (fullPath === `/${activeLocale}`) {
      return location.pathname === '/' || location.pathname === `/${activeLocale}` || location.pathname === `/${activeLocale}/`;
    }
    return location.pathname === fullPath || location.pathname.startsWith(`${fullPath}/`);
  };

  return (
    <>
      {/* Skip to Content */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:z-50 bg-brand-800 text-white px-4 py-2 rounded-xl shadow-2xl font-black text-xs uppercase"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 w-full bg-white transition-colors border-b border-neutral-100" dir={isRtl ? 'rtl' : 'ltr'} role="banner">
        
        {/* TIER 1: Sovereign Top Diplomatic Band - Unified Red Branding */}
        <div className="w-full bg-red-950 text-red-100 border-b border-red-900 text-[11px] py-1 sm:py-1.5 px-3 sm:px-6">
          <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto flex items-center justify-between gap-2 sm:gap-3">
            
            {/* Diplomatic Corridor Label */}
            <div className="flex items-center gap-1.5 text-red-100/90 min-w-0 overflow-hidden font-bold">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0"></span>
              <span className="font-black tracking-wider uppercase text-[9px] sm:text-[11px] truncate">
                {isAr
                  ? 'الممر الاستراتيجي الثنائي • بغداد – بكين • البوابة الرسمية'
                  : isZh
                  ? '中伊双边战略走廊 • 巴格达 – 北京 • 官方门户'
                  : isCkb
                  ? 'ڕێڕەوی ستراتیژی دووقۆڵی • بەغداد – پەکین'
                  : 'Bilateral Strategic Corridor • Baghdad – Beijing'}
              </span>
            </div>

            {/* Quick Portals Access */}
            <div className="hidden lg:flex items-center gap-2 font-bold text-[10px]">
              <Link
                to={`/${activeLocale}/live`}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-800 text-white transition-colors shadow-xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                <span>LIVE PORTAL</span>
              </Link>

              <Link
                to={`/${activeLocale}/newsroom`}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-900 hover:bg-red-800 text-red-100 transition-colors"
              >
                <Newspaper size={11} />
                <span>NEWSROOM</span>
              </Link>

              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-header-search'))}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-900 hover:bg-red-800 text-red-100 font-mono text-[9px] transition-colors cursor-pointer"
              >
                <Command size={10} />
                <span>⌘K HUB</span>
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 shrink-0 font-bold text-[10px]">
              <button
                type="button"
                onClick={() => openGlobalLanguageModal()}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-800 text-white border border-red-700 hover:bg-red-700 transition-all cursor-pointer shadow-xs"
              >
                <Globe2 size={11} />
                <span>GLOBAL</span>
              </button>

              {(['en', 'ar', 'zh', 'ckb'] as Locale[]).map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLanguageChange(loc)}
                  className={`hidden sm:inline-flex px-2 py-0.5 rounded transition-all uppercase cursor-pointer font-black ${
                    activeLocale === loc
                      ? 'bg-white text-red-900 shadow-sm'
                      : 'text-red-300 hover:text-white hover:bg-red-800'
                  }`}
                >
                  {loc === 'ar' ? 'عربي' : loc === 'zh' ? '中文' : loc === 'ckb' ? 'کوردی' : 'EN'}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* TIER 2: Main Brand Masthead Bar */}
        <div className="w-full bg-red-700 text-white transition-colors relative z-30">
          <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4 bg-red-700 text-white">
            
            {/* Brand Identity - Enhanced Alignment Fix */}
            <Link 
              to={`/${activeLocale}`} 
              className="flex items-center gap-3 sm:gap-4 group shrink-0 select-none py-1 min-w-0 h-full"
            >
              <div className="shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 py-1.5 sm:py-2">
                <IcaLogo size={activeLocale === 'zh' ? 48 : 44} variant="mark" theme="white" className="w-auto flex items-center" />
              </div>

              <div className="flex flex-col justify-center text-start leading-tight min-w-0 border-s border-white/20 ps-3 sm:ps-4 h-full py-2">
                <span className="text-base sm:text-xl lg:text-2xl font-black uppercase tracking-tight text-white group-hover:text-red-100 transition-colors truncate">
                  {isAr ? 'الوكالة العراقية الصينية' : isZh ? '伊中通讯社' : isCkb ? 'ئاژانسی عێراقی-چینی' : 'IRAQI-CHINESE AGENCY'}
                </span>
                <div className="hidden sm:flex items-center gap-2 mt-1 opacity-90">
                  <span className="text-[10px] sm:text-[11px] font-black tracking-[0.2em] uppercase text-red-100 group-hover:text-white transition-colors truncate">
                    {isAr ? 'المقر السيادي العام للإعلام' : isZh ? '双边国家级综合传媒' : isCkb ? 'دەروازەی فەرمی ڕاگەیاندن' : 'SOVEREIGN MEDIA & BILATERAL WIRE'}
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1.5 font-bold" aria-label="Primary Navigation">
              {dynamicNavItems.map((link) => {
                let linkHref = link.href;
                if (link.slug === 'chinese-center' || link.href.includes('/chinese-center') || link.href.includes('/chinese-centre')) {
                  const currentDialect = location.pathname.includes('chinese-center') ? 'chinese-center' : 'chinese-centre';
                  linkHref = link.href.replace(/chinese-cent(er|re)/, currentDialect);
                }
                const targetTo = linkHref.startsWith('/') ? `/${activeLocale}${linkHref}` : linkHref;
                const isActive = isLinkActive(link.href);
                const IconComponent = getIconForSlug(link.slug);
                const localizedLabel = link.label[activeLocale] || link.label.en || link.slug;

                return (
                  <Link
                    key={link.id}
                    to={targetTo}
                    className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 relative ${
                      isActive
                        ? 'bg-white text-red-700 shadow-md'
                        : 'text-white/90 hover:text-white hover:bg-red-800'
                    }`}
                  >
                    <IconComponent size={14} />
                    <span>{localizedLabel}</span>
                    {link.isLive && (
                      <span className={`w-2 h-2 rounded-full animate-pulse ${isActive ? 'bg-red-700' : 'bg-white'}`}></span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Header Actions */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <NotificationBell currentLocale={activeLocale} variant="header" />

              <Link
                to={`/${activeLocale}/newsroom`}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-red-700 font-black text-xs transition-all shadow-md hover:bg-red-50 min-h-[40px]"
              >
                <span>{isAr ? 'غرفة الأخبار' : isZh ? '即时新闻' : isCkb ? 'هەواڵەکان' : 'News Desk'}</span>
                <ChevronRight size={14} className="cta-arrow rtl:rotate-180" />
              </Link>

              <button
                type="button"
                onClick={() => setMobileDrawerOpen(true)}
                className="xl:hidden p-2 sm:p-2.5 rounded-xl bg-red-800 text-white hover:bg-red-900 transition-colors shadow-sm cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center border border-red-600"
              >
                <Menu size={22} />
              </button>
            </div>

          </div>
        </div>

        {/* TIER 3: Clean Search Bar */}
        <div className="w-full bg-red-800 border-t border-red-900 px-3 sm:px-6 py-2 transition-all relative z-20 text-white">
          <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 bg-red-800 text-white">
            <div className="w-full sm:flex-1 sm:max-w-2xl">
              <HeaderGlobalSearchBar lang={activeLocale} />
            </div>

            {/* Trending Tags */}
            <div className="hidden md:flex items-center gap-2 text-xs text-neutral-400 shrink-0 select-none">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-black">
                {isAr ? 'شائع:' : isZh ? '热点:' : isCkb ? 'باو:' : 'HOT:'}
              </span>
              {[
                { to: `/settlement`, label: isAr ? 'تسوية الدينار/اليوان' : isZh ? '第纳尔/人民币清算' : 'IQD/e-CNY Rail' },
                { to: `/summit`, label: isAr ? 'قمة 2026' : isZh ? '2026峰会' : 'Summit 2026' },
                { to: `/newsroom?tag=DevelopmentRoad`, label: isAr ? 'طريق التنمية' : isZh ? '发展之路' : 'Development Road' }
              ].map((tag, i) => (
                <Link
                  key={i}
                  to={`/${activeLocale}${tag.to}`}
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-600 transition-colors shadow-xs"
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      <UnifiedMobileDrawer 
        isOpen={mobileDrawerOpen} 
        onClose={() => setMobileDrawerOpen(false)} 
        lang={activeLocale} 
      />
    </>
  );
};

export default Header;
