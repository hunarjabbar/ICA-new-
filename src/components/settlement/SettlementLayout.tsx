import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Building2, 
  Globe2, 
  CreditCard, 
  Calculator, 
  Compass, 
  FileText, 
  PhoneCall, 
  HelpCircle,
  ExternalLink,
  Lock
} from 'lucide-react';
import { Locale } from '../../types';
import { IcaLogo } from '../IcaLogo';
import { LiveFxStrip } from './LiveFxStrip';
import { getSettlementTranslation } from '../../locales/settlementTranslations';
import { BottomNav } from '../mobile/BottomNav';
import { Footer } from '../Footer';
import { HeaderGlobalSearchBar } from '../search/HeaderGlobalSearchBar';

interface Props {
  lang: Locale;
  children: React.ReactNode;
}

export function SettlementLayout({ lang, children }: Props) {
  const location = useLocation();
  const t = (key: string) => getSettlementTranslation(lang, key);
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';
  const isRtl = isAr || isCkb;

  const isCise = location.pathname.includes('/institute/settlement');
  const basePath = isCise ? `/${lang}/institute/settlement` : `/${lang}/settlement`;

  const navLinks = [
    { to: `${basePath}`, label: t('settlement.nav.overview'), exact: true },
    { to: `${basePath}/calculator`, label: t('settlement.nav.calculator') },
    { to: `${basePath}/tracker`, label: t('settlement.nav.tracker') },
    { to: `${basePath}/gateway`, label: t('settlement.nav.gateway') },
    { to: `${basePath}/inquiry`, label: t('settlement.nav.inquiry') },
    { to: `${basePath}/card`, label: t('settlement.nav.card') },
    { to: `${basePath}/how-it-works`, label: t('settlement.nav.howItWorks') },
    { to: `${basePath}/compliance`, label: t('settlement.nav.compliance') },
    { to: `${basePath}/fees`, label: t('settlement.nav.fees') },
    { to: `${basePath}/about`, label: t('settlement.nav.about') },
    { to: `${basePath}/faq`, label: t('settlement.nav.faq') },
    { to: `${basePath}/contact`, label: t('settlement.nav.contact') },
    { to: `${basePath}/legal`, label: t('settlement.nav.legal') }
  ];

  const switchLang = (newLang: Locale) => {
    const currentPath = location.pathname;
    // Replace leading /:lang/ with newLang
    const regex = /^\/(en|ar|zh|ckb|ck)\b/;
    if (regex.test(currentPath)) {
      return currentPath.replace(regex, `/${newLang}`);
    }
    return `/${newLang}${currentPath}`;
  };

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="pay-portal flex flex-col min-h-screen">
      
      {/* Top Sovereign Regulatory Notice Bar */}
      <div className="w-full bg-red-800 text-red-100 text-[11px] py-2 px-4 border-b border-red-700">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-start">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-brand-400 shrink-0" />
            <span className="text-neutral-300">
              <strong className="text-white font-bold">Central Bank of Iraq (CBI) & PBoC Accredited:</strong> Direct IQD ⇄ RMB Bilateral Settlement & Clearing Facility
            </span>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <Link to={`/${lang}/institute`} className="hover:text-white transition-colors flex items-center gap-1 font-bold">
              <span>{lang === 'ar' ? 'المعهد الصيني (CISE)' : lang === 'zh' ? '中伊战略研究所' : lang === 'ckb' ? 'پەیمانگای چینی' : 'CISE Institute'}</span>
              <span className="cta-arrow">→</span>
            </Link>
            <Link to={`/${lang}`} className="hover:text-white transition-colors flex items-center gap-1 font-bold">
              <span>{t('settlement.nav.home')}</span>
              <span className="cta-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="w-full bg-red-600 text-white sticky top-0 z-40 shadow-lg transition-colors border-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          {/* Logo & Portal Identity */}
          <Link to={basePath} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white text-red-600 flex items-center justify-center font-black text-sm shadow-md group-hover:scale-105 transition-transform shrink-0">
              ICA
            </div>
            <div>
              <div className="text-sm sm:text-base font-black text-white tracking-tight flex items-center gap-2">
                <span>{t('settlement.title')}</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-white/20 text-white font-bold border border-white/30">
                  Sovereign Parity
                </span>
              </div>
              <div className="text-[10px] text-red-100 font-medium">
                Iraqi-Chinese Agency • FinTech & Settlement Directorate
              </div>
            </div>
          </Link>

          {/* Unified Global Search in Settlement Header */}
          <div className="flex-1 max-w-sm lg:max-w-md mx-2 hidden md:block">
            <HeaderGlobalSearchBar 
              lang={lang} 
              variant="bar" 
              placeholder={
                isAr ? 'ابحث في مقاصة الدينار واليوان، حاسبة العملات، والتتبع...' :
                isZh ? '搜索第纳尔/人民币清算、汇率计算器、流水追踪...' :
                isCkb ? 'گەڕان لە یەکلاکردنەوەی دارایی، حیساباتی دراو...' :
                'Search IQD/RMB clearing, FX calculators, ledger tracking...'
              }
            />
          </div>

          {/* Language Switcher & Quick Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Trigger Button */}
            <div className="md:hidden">
              <HeaderGlobalSearchBar lang={lang} variant="trigger" />
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 text-xs font-bold border border-white/20 rounded-lg p-1 bg-white/10">
              {(['en', 'ar', 'zh', 'ckb'] as Locale[]).map((l) => (
                <Link 
                  key={l}
                  to={switchLang(l)} 
                  className={`px-2 py-1 rounded transition-colors uppercase ${lang === l ? 'bg-white text-red-600 shadow-sm' : 'text-red-100 hover:text-white hover:bg-white/10'}`}
                >
                  {l === 'ar' ? 'عربي' : l === 'zh' ? '中文' : l === 'ckb' ? 'کوردی' : 'EN'}
                </Link>
              ))}
            </div>

            {/* Inquiry CTA */}
            <Link
              to={`/${lang}/settlement/inquiry`}
              className="hidden sm:inline-flex px-3.5 py-2 rounded-xl text-xs font-bold shadow-md bg-white text-red-600 hover:bg-red-50 transition-colors whitespace-nowrap"
            >
              <span>{isAr ? 'تقديم طلب' : isZh ? '申请结算' : isCkb ? 'داواکاری' : 'Open Inquiry'}</span>
            </Link>

          </div>

        </div>

        {/* Secondary Navigation Ribbon */}
        <nav className="border-t border-white/10 bg-red-700/30 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 sm:gap-2 py-1.5 whitespace-nowrap text-xs font-bold">
            {navLinks.map((item, idx) => {
              const isActive = item.exact 
                ? location.pathname === item.to || location.pathname === `${item.to}/`
                : location.pathname.startsWith(item.to);

              return (
                <Link
                  key={idx}
                  to={item.to}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-white text-red-600 shadow-md font-black border border-white' 
                      : 'text-red-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

      </header>

      {/* Live Foreign Exchange Ticker Ribbon */}
      <LiveFxStrip lang={lang} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        {children}
      </main>

      {/* Compliance & Regulatory Disclaimer (Part 8.5) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="p-4 rounded-xl bg-red-50 border border-red-100 space-y-2 text-[11px] text-brand-900 leading-relaxed">
          <div className="font-black uppercase tracking-wider text-brand-900 flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-red-600" />
            <span>{t('settlement.disclaimer.title')}</span>
          </div>
          <p>
            {t('settlement.disclaimer')}
          </p>
        </div>
      </div>

      {/* Canonical Global Footer */}
      <Footer currentLocale={lang} />

      {/* Modern Fixed Bottom Navigation Bar for Mobile and Tablet */}
      <BottomNav lang={lang} />
    </div>
  );
}
