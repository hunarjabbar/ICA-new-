import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  ShieldCheck, Lock, ArrowUp, Globe, Smartphone, CheckCircle, 
  ExternalLink, Mail, Radio, Landmark, Building2, ChevronRight,
  Scale, FileText, Sparkles, Send, Shield, Download, X, Laptop,
  Layers, Compass
} from 'lucide-react';
import { Locale } from '../types';
import { useI18n } from '../hooks/useI18n';
import { useNavigationStore } from '../store/useNavigationStore';
import { NewsletterSignup } from './NewsletterSignup';
import { LegalModal } from './LegalModal';
import { SocialFooterShowcase } from './SocialLinks';
import { getDeferredPrompt, clearDeferredPrompt, onBeforeInstallPrompt } from '../lib/pwaInstall';

export interface FooterProps {
  currentLocale?: Locale | string;
  lang?: Locale | string;
  variant?: 'default' | 'admin' | 'compact';
  hideNewsletter?: boolean;
  hideMarquee?: boolean;
  hideSocialShowcase?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ 
  currentLocale, 
  lang, 
  variant = 'default',
  hideNewsletter = false,
  hideMarquee = false,
  hideSocialShowcase = false
}) => {
  const location = useLocation();

  // Normalize locale to one of 'en' | 'ar' | 'zh' | 'ckb'
  const rawLang = (currentLocale || lang || 'en').toString();
  const safeLang: Locale = (rawLang === 'ck' || rawLang === 'ckb') 
    ? 'ckb' 
    : (['ar', 'zh'].includes(rawLang) ? rawLang as Locale : 'en');
  
  const isRtl = safeLang === 'ar' || safeLang === 'ckb';
  const { t } = useI18n(safeLang);
  const { getFooterItems } = useNavigationStore();

  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms'>('privacy');
  const [pwaModalOpen, setPwaModalOpen] = useState(false);
  const [canDirectInstall, setCanDirectInstall] = useState(false);

  useEffect(() => {
    const unsubscribe = onBeforeInstallPrompt((prompt) => {
      setCanDirectInstall(!!prompt);
    });
    return unsubscribe;
  }, []);

  // Fetch dynamic footer configuration from API with local fallback
  const { data: footerConfig } = useQuery({
    queryKey: ['public-footer'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/public/footer');
        if (!res.ok) return null;
        return await res.json();
      } catch {
        return null;
      }
    },
    staleTime: 60000,
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLegal = (tab: 'privacy' | 'terms') => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  const handleFocusNewsletter = (e: React.MouseEvent) => {
    e.preventDefault();
    const container = document.getElementById('newsletter');
    const input = document.getElementById('newsletter-email-input') as HTMLInputElement | null;
    container?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => input?.focus(), 450);
  };

  const handleScrollToSocial = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('footer-social-showcase');
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleInstallPwa = async () => {
    const prompt = getDeferredPrompt();
    if (prompt) {
      try {
        await prompt.prompt();
        const choice = await prompt.userChoice;
        if (choice.outcome === 'accepted') {
          clearDeferredPrompt();
          setCanDirectInstall(false);
        }
      } catch {
        setPwaModalOpen(true);
      }
    } else {
      setPwaModalOpen(true);
    }
  };

  // Build localized path preserving current subroute
  const getLocalizedPath = (targetLang: string) => {
    const cleanPath = location.pathname.replace(/^\/(en|ar|zh|ckb|ck)/, '') || '';
    return `/${targetLang}${cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath}${location.search}${location.hash}`;
  };

  // Localized Tagline
  const getTagline = () => {
    if (footerConfig) {
      if (safeLang === 'ar' && footerConfig.taglineAr) return footerConfig.taglineAr;
      if (safeLang === 'zh' && footerConfig.taglineZh) return footerConfig.taglineZh;
      if (safeLang === 'ckb' && footerConfig.taglineCkb) return footerConfig.taglineCkb;
      if (footerConfig.tagline) return footerConfig.tagline;
    }
    if (safeLang === 'ar') return 'مدونة الاستخبارات الاستراتيجية والتكامل الاقتصادي الثنائي بين جمهورية العراق وجمهورية الصين الشعبية';
    if (safeLang === 'zh') return '伊拉克共和国与中华人民共和国双边战略情报与经贸一体化主权法典';
    if (safeLang === 'ckb') return 'پەیڕەوی هەواڵگری ستراتیژی و یەکگرتنی ئابووری دوولایەنەی نێوان عێراق و کۆماری گەلی چین';
    return 'Bilateral Strategic Intelligence & Economic Integration Codex';
  };

  // Localized column heading
  const getColumnHeading = (col: any, fallbackKey: string) => {
    if (safeLang === 'ar' && col.headingAr) return col.headingAr;
    if (safeLang === 'zh' && col.headingZh) return col.headingZh;
    if (safeLang === 'ckb' && col.headingCkb) return col.headingCkb;
    if (col.heading) return col.heading;
    return fallbackKey;
  };

  // Localized link label
  const getLinkLabel = (link: any) => {
    if (safeLang === 'ar' && link.labelAr) return link.labelAr;
    if (safeLang === 'zh' && link.labelZh) return link.labelZh;
    if (safeLang === 'ckb' && link.labelCkb) return link.labelCkb;
    return link.label;
  };

  // -------------------------------------------------------------
  // ADMIN VARIANT: Rendered inside CISE Command Hub
  // -------------------------------------------------------------
  if (variant === 'admin') {
    return (
      <footer 
        dir={isRtl ? 'rtl' : 'ltr'} 
        className="w-full bg-white text-neutral-500 border-t border-neutral-200 text-xs py-5 px-4 sm:px-6 mt-auto"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-900 font-bold">
              CISE COMMAND HUB CONTROL SURFACE · ALL NODES SECURE
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold">
            <Link to={`/${safeLang}/hub/management/footer`} className="text-brand-800 hover:text-brand-700 transition-colors uppercase">
              {safeLang === 'ar' ? 'إدارة التذييل الموحد' : safeLang === 'zh' ? '全局页脚管理' : safeLang === 'ckb' ? 'بەڕێوەبردنی پێ پەڕە' : 'Manage Global Footer'}
            </Link>
            <span>·</span>
            <Link to={`/${safeLang}/hub/management/audit-logs`} className="hover:text-neutral-900 transition-colors uppercase">
              {safeLang === 'ar' ? 'سجل التدقيق' : safeLang === 'zh' ? '审计日志' : safeLang === 'ckb' ? 'تۆماری وردبینی' : 'Audit Logs'}
            </Link>
            <span>·</span>
            <Link to={`/${safeLang}`} className="hover:text-neutral-900 transition-colors uppercase">
              {safeLang === 'ar' ? 'الموقع العام' : safeLang === 'zh' ? '公开门户' : safeLang === 'ckb' ? 'ماڵپەڕی گشتی' : 'Public Site'}
            </Link>
            <span>·</span>
            <span className="text-neutral-400 font-medium">© 2026 ICA Secretariat</span>
          </div>
        </div>
      </footer>
    );
  }

  // -------------------------------------------------------------
  // DEFAULT VARIANT: The Canonical 6-Section Global Footer
  // -------------------------------------------------------------
  return (
    <>
      <footer 
        id="global-footer"
        dir={isRtl ? 'rtl' : 'ltr'}
        className="w-full bg-white text-neutral-600 border-t border-neutral-200 font-sans text-xs selection:bg-brand-800 selection:text-white"
      >
        {/* ================= SECTION 6: ACCREDITED PARTNERS MARQUEE ================= */}
        {!hideMarquee && (
          <div className="w-full bg-neutral-50 border-b border-neutral-200 py-3.5 overflow-hidden relative">
            <div className="flex w-max animate-marquee hover:pause-animation items-center gap-12 text-[11px] font-bold uppercase tracking-widest text-neutral-500">
              {[
                { name: 'Ministry of Trade (Iraq)', path: `/${safeLang}/institute/partnerships` },
                { name: 'Central Bank of Iraq (CBI)', path: `/${safeLang}/settlement` },
                { name: 'Sinosure (SINOSURE)', path: `/${safeLang}/initiatives/energy-infrastructure` },
                { name: 'Qi Card Financial Tech', path: `/${safeLang}/settlement/card` },
                { name: 'Grand Faw Logistics Zone', path: `/${safeLang}/initiatives/trade-corridor` },
                { name: 'Chinese Institute (CISE)', path: `/${safeLang}/institute` },
                { name: 'Ministry of Trade (Iraq)', path: `/${safeLang}/institute/partnerships` },
                { name: 'Central Bank of Iraq (CBI)', path: `/${safeLang}/settlement` },
                { name: 'Sinosure (SINOSURE)', path: `/${safeLang}/initiatives/energy-infrastructure` },
                { name: 'Qi Card Financial Tech', path: `/${safeLang}/settlement/card` },
                { name: 'Grand Faw Logistics Zone', path: `/${safeLang}/initiatives/trade-corridor` },
                { name: 'Chinese Institute (CISE)', path: `/${safeLang}/institute` },
              ].map((partner, idx) => (
                <Link
                  key={idx}
                  to={partner.path}
                  className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white border border-neutral-200 hover:border-brand-800 hover:text-brand-800 transition-all duration-300 shrink-0 group shadow-xs"
                >
                  <Landmark size={13} className="text-brand-800 group-hover:scale-110 transition-transform" />
                  <span>{partner.name}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
          
          {/* ================= SECTION 1: BRAND ROW ================= */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-10 border-b border-neutral-200">
            <div className="space-y-3 max-w-2xl text-start">
              <Link to={`/${safeLang}`} className="inline-flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-brand-800 text-white flex items-center justify-center font-black text-base shadow-lg shadow-brand-800/20 shrink-0 group-hover:bg-brand-700 transition-colors">
                  ICA
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-neutral-900 uppercase tracking-tight leading-none group-hover:text-brand-800 transition-colors">
                    {safeLang === 'ar' ? 'الوكالة العراقية الصينية' : 
                     safeLang === 'zh' ? '伊中通讯社与经贸战略智库' : 
                     safeLang === 'ckb' ? 'ئاژانسی عێراقی-چینی' : 
                     'Iraqi-Chinese Agency (ICA)'}
                  </h3>
                  <span className="text-[10px] text-brand-800 uppercase tracking-widest font-black mt-1 block">
                    Sino-Iraqi Sovereign Media & Research Network
                  </span>
                </div>
              </Link>
              <p className="text-xs text-neutral-500 leading-relaxed font-bold uppercase tracking-tight">
                {getTagline()}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <Link 
                to={`/${safeLang}/settlement/compliance`}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-[11px] font-mono text-neutral-600 hover:border-brand-800/40 hover:text-brand-800 transition-colors shadow-xs font-bold"
                title={safeLang === 'ar' ? 'معايير التشفير والامتثال السيادي' : safeLang === 'zh' ? '主权合规与传输加密标准' : safeLang === 'ckb' ? 'ستانداردە پارێزراوەکانی شەفەرەکردن' : 'View Sovereign Compliance & Encryption Standards'}
              >
                <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                <span>
                  {safeLang === 'ar' ? 'شبكة مشفرة ببروتوكول TLS/SSL' :
                   safeLang === 'zh' ? 'TLS/SSL 主权加密专网' :
                   safeLang === 'ckb' ? 'تۆڕی پارێزراوی TLS/SSL' :
                   'TLS/SSL ENCRYPTED NETWORK'}
                </span>
              </Link>
              <button 
                type="button"
                onClick={handleFocusNewsletter}
                className="px-4 py-2 bg-brand-800 hover:bg-brand-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg hover:shadow-brand-800/20 active:scale-95 text-center shrink-0 cursor-pointer"
              >
                {footerConfig?.ctaLabel || (
                  safeLang === 'ar' ? 'الاشتراك في النشرة الرسمية' :
                  safeLang === 'zh' ? '订阅官方智库快讯' :
                  safeLang === 'ckb' ? 'بەشداریکردن لە نامەی فەرمی' :
                  'Subscribe to Official Wire'
                )}
              </button>
            </div>
          </div>

          {/* ================= SECTION 2: COLUMNS ROW ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6 text-start">
            {footerConfig?.columns && footerConfig.columns.length > 0 ? (
              footerConfig.columns.map((col: any, colIdx: number) => (
                <div key={col.id || `col-${colIdx}`} className="space-y-3.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 border-b border-brand-800 pb-1.5 flex items-center justify-between">
                    <span>{getColumnHeading(col, col.heading)}</span>
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {col.links && col.links.map((link: any, linkIdx: number) => (
                      <li key={link.id || `link-${linkIdx}`}>
                        {link.href.startsWith('#') ? (
                          <a 
                            href={link.href} 
                            onClick={link.href === '#newsletter' ? handleFocusNewsletter : link.href === '#footer-social-showcase' ? handleScrollToSocial : undefined}
                            className="text-neutral-500 hover:text-brand-800 font-bold transition-colors block py-0.5"
                          >
                            {getLinkLabel(link)}
                          </a>
                        ) : link.external ? (
                          <a 
                            href={link.href} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-neutral-500 hover:text-brand-800 font-bold transition-colors flex items-center gap-1 py-0.5"
                          >
                            <span>{getLinkLabel(link)}</span>
                            <ExternalLink size={10} className="shrink-0 opacity-70" />
                          </a>
                        ) : (
                          (() => {
                            let linkHref = link.href;
                            if (link.href.includes('/chinese-center') || link.href.includes('/chinese-centre')) {
                              const currentDialect = location.pathname.includes('chinese-center') ? 'chinese-center' : 'chinese-centre';
                              linkHref = link.href.replace(/chinese-cent(er|re)/, currentDialect);
                            }
                            const targetTo = linkHref.startsWith(`/${safeLang}`) ? linkHref : `/${safeLang}${linkHref.startsWith('/') ? linkHref : '/' + linkHref}`;
                            return (
                              <Link 
                                to={targetTo}
                                className="text-neutral-500 hover:text-brand-800 font-bold transition-colors block py-0.5"
                              >
                                {getLinkLabel(link)}
                              </Link>
                            );
                          })()
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              // Fallback Canonical 6 Columns
              <>
                {/* Column 1: About */}
                <div className="space-y-3.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 border-b border-brand-800 pb-1.5">
                    {safeLang === 'ar' ? 'حول الوكالة' : safeLang === 'zh' ? '关于机构' : safeLang === 'ckb' ? 'دەربارەی ئاژانس' : 'About ICA'}
                  </h4>
                  <ul className="space-y-2 text-xs text-neutral-500 font-bold">
                    <li><Link to={`/${safeLang}/about`} className="hover:text-brand-800 transition-colors block">{safeLang === 'ar' ? 'حول الوكالة' : safeLang === 'zh' ? '关于我们' : safeLang === 'ckb' ? 'دەربارەی ئێمە' : 'About Agency'}</Link></li>
                    <li><Link to={`/${safeLang}/institute/about`} className="hover:text-brand-800 transition-colors block">{safeLang === 'ar' ? 'الميثاق التأسيسي' : safeLang === 'zh' ? '主权宪章' : safeLang === 'ckb' ? 'پەیڕەوی دامەزراندن' : 'Sovereign Charter'}</Link></li>
                    <li><Link to={`/${safeLang}/institute/partnerships`} className="hover:text-brand-800 transition-colors block">{safeLang === 'ar' ? 'الشركاء الاستراتيجيون' : safeLang === 'zh' ? '战略伙伴' : safeLang === 'ckb' ? 'هاوبەشە ستراتیژییەکان' : 'Strategic Partners'}</Link></li>
                    <li><Link to={`/${safeLang}/contact`} className="hover:text-brand-800 transition-colors block">{safeLang === 'ar' ? 'الاتصال والمقرات' : safeLang === 'zh' ? '联络方式' : safeLang === 'ckb' ? 'پەیوەندی' : 'Diplomatic Contact'}</Link></li>
                    <li><Link to={`/${safeLang}/initiatives`} className="hover:text-brand-800 transition-colors block text-brand-800 font-black">{safeLang === 'ar' ? 'سجل المبادرات (٧)' : safeLang === 'zh' ? '战略服务大厅 (7大)' : safeLang === 'ckb' ? 'تۆماری خزمەتگوزارییەکان' : 'Strategic Initiatives (7)'}</Link></li>
                  </ul>
                </div>

                {/* Column 2: Initiatives & CISE Strategic Services */}
                <div className="space-y-3.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 border-b border-brand-800 pb-1.5">
                    {safeLang === 'ar' ? 'المبادرات (خدمات CISE)' : safeLang === 'zh' ? '核心倡议 (CISE服务)' : safeLang === 'ckb' ? 'دەستپێشخەرییەکان (خزمەتگوزارییەکانی CISE)' : 'Initiatives (CISE Services)'}
                  </h4>
                  <ul className="space-y-2 text-xs text-neutral-500 font-bold">
                    <li><Link to={`/${safeLang}/settlement`} className="hover:text-brand-800 transition-colors block">{safeLang === 'ar' ? 'تسوية المدفوعات (IQD/RMB)' : safeLang === 'zh' ? '双边本币结算' : safeLang === 'ckb' ? 'پاکتاوی دراوەکان' : 'Payment Settlement'}</Link></li>
                    <li><Link to={`/${safeLang}/settlement/card`} className="hover:text-brand-800 transition-colors block">{safeLang === 'ar' ? 'بطاقة كي وICA' : safeLang === 'zh' ? 'Qi & ICA 联名卡' : safeLang === 'ckb' ? 'کارتی کی و ICA' : 'Qi & ICA VIP Card'}</Link></li>
                    <li><Link to={`/${safeLang}/summit`} className="hover:text-brand-800 transition-colors block">{safeLang === 'ar' ? 'القمة والمعرض الاقتصادي' : safeLang === 'zh' ? '双边经贸峰会' : safeLang === 'ckb' ? 'لووتکە و پێشانگا' : 'Summit & Expo'}</Link></li>
                    {(() => {
                      const currentDialect = location.pathname.includes('chinese-center') ? 'chinese-center' : 'chinese-centre';
                      return (
                        <li>
                          <Link to={`/${safeLang}/institute/${currentDialect}`} className="hover:text-brand-800 transition-colors block">
                            {safeLang === 'ar' ? 'المركز الصيني HSK' : safeLang === 'zh' ? '国际中文教育中心' : safeLang === 'ckb' ? 'ناوەندی زمانی چینی' : 'Chinese Centre (HSK)'}
                          </Link>
                        </li>
                      );
                    })()}
                    <li><Link to={`/${safeLang}/institute/visa-centre`} className="hover:text-brand-800 transition-colors block">{safeLang === 'ar' ? 'مركز التأشيرات السريع' : safeLang === 'zh' ? '双向快速签证大厅' : safeLang === 'ckb' ? 'ناوەندی ڤیزا' : 'Visa Facilitation Desk'}</Link></li>
                    <li><Link to={`/${safeLang}/institute/consultancy`} className="hover:text-brand-800 transition-colors block">{safeLang === 'ar' ? 'الاستشارات الاستراتيجية' : safeLang === 'zh' ? '双边战略顾问' : safeLang === 'ckb' ? 'ڕاوێژکاری ستراتیژی' : 'Strategic Advisory'}</Link></li>
                  </ul>
                </div>

                {/* Column 3: Research & Intelligence */}
                <div className="space-y-3.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 border-b border-brand-800 pb-1.5">
                    {safeLang === 'ar' ? 'الأبحاث والذكاء' : safeLang === 'zh' ? '学术研究与智库' : safeLang === 'ckb' ? 'توێژینەوە' : 'Research & Intel'}
                  </h4>
                  <ul className="space-y-2 text-xs text-neutral-500 font-bold">
                    <li><Link to={`/${safeLang}/institute/research`} className="hover:text-brand-800 transition-colors block">{safeLang === 'ar' ? 'المحاور البحثية الأربعة' : safeLang === 'zh' ? '四大研究支柱' : safeLang === 'ckb' ? 'تەوەرەکانی توێژینەوە' : 'Research Pillars'}</Link></li>
                    <li><Link to={`/${safeLang}/institute/publications`} className="hover:text-brand-800 transition-colors block">{safeLang === 'ar' ? 'الأبحاث والتقارير' : safeLang === 'zh' ? '智库白皮书' : safeLang === 'ckb' ? 'ڕاپۆرت و توێژینەوە' : 'Publications Archive'}</Link></li>
                    <li><Link to={`/${safeLang}/institute/data-hub`} className="hover:text-brand-800 transition-colors block">{safeLang === 'ar' ? 'مركز بيانات الاقتصاد الكلي' : safeLang === 'zh' ? '宏观智能数据中枢' : safeLang === 'ckb' ? 'ناوەندی داتای ئابووری' : 'Macro Data Hub'}</Link></li>
                    <li><Link to={`/${safeLang}/institute/data-hub/projects`} className="hover:text-brand-800 transition-colors block">{safeLang === 'ar' ? 'سجل مشاريع الحزام والطريق' : safeLang === 'zh' ? '一带一路重点工程库' : safeLang === 'ckb' ? 'پڕۆژەکانی پشتێن و ڕێگا' : 'BRI Projects Registry'}</Link></li>
                    <li><Link to={`/${safeLang}/institute/experts`} className="hover:text-brand-800 transition-colors block">{safeLang === 'ar' ? 'دليل الخبراء والزملاء' : safeLang === 'zh' ? '特聘学者与智库名录' : safeLang === 'ckb' ? 'پسپۆڕان و توێژەران' : 'Fellows & Faculty'}</Link></li>
                  </ul>
                </div>

                {/* Column 4: Media & Broadcast */}
                <div className="space-y-3.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 border-b border-brand-800 pb-1.5">
                    {safeLang === 'ar' ? 'الإعلام والأخبار' : safeLang === 'zh' ? '融媒中心与电讯' : safeLang === 'ckb' ? 'میدیا و هەواڵ' : 'Media Hub'}
                  </h4>
                  <ul className="space-y-2 text-xs text-neutral-500 font-bold">
                    <li><Link to={`/${safeLang}/newsroom`} className="hover:text-brand-800 transition-colors block">{safeLang === 'ar' ? 'غرفة الأخبار والتحليلات' : safeLang === 'zh' ? '新闻与时事专栏' : safeLang === 'ckb' ? 'ژووری هەواڵ' : 'Newsroom Wire'}</Link></li>
                    <li><Link to={`/${safeLang}/live`} className="hover:text-brand-800 transition-colors block">{safeLang === 'ar' ? 'البث الفضائي المباشر' : safeLang === 'zh' ? '卫星在线直播' : safeLang === 'ckb' ? 'پەخشی زیندوو' : 'Live Satellite Feed'}</Link></li>
                    <li><Link to={`/${safeLang}/media/ica-plus`} className="hover:text-brand-800 transition-colors block font-black text-brand-800">{safeLang === 'ar' ? 'منصة ICA+ السيادية' : safeLang === 'zh' ? 'ICA+ 专享内参' : safeLang === 'ckb' ? 'ICA+ تایبەت' : 'ICA+ Sovereign VIP'}</Link></li>
                    <li><Link to={`/${safeLang}/media`} className="hover:text-brand-800 transition-colors block">{safeLang === 'ar' ? 'الأرشيف المرئي والوثائقي' : safeLang === 'zh' ? '音影纪录档案' : safeLang === 'ckb' ? 'ئەرشیڤی دەنگ و رەنگ' : 'Media Library'}</Link></li>
                    <li><Link to={`/${safeLang}/podcasts`} className="hover:text-brand-800 transition-colors block">{safeLang === 'ar' ? 'بودكاست الاستخبارات' : safeLang === 'zh' ? '双边电台播客' : safeLang === 'ckb' ? 'پۆدکاست' : 'Bilateral Podcasts'}</Link></li>
                  </ul>
                </div>

                {/* Column 5: Legal & Sovereignty */}
                <div className="space-y-3.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 border-b border-brand-800 pb-1.5">
                    {safeLang === 'ar' ? 'الشؤون القانونية والسيادة' : safeLang === 'zh' ? '合规、法律与主权' : safeLang === 'ckb' ? 'یاسایی و پابەندبوون' : 'Legal & Compliance'}
                  </h4>
                  <ul className="space-y-2 text-xs text-neutral-500 font-bold">
                    <li>
                      <button type="button" onClick={() => openLegal('privacy')} className="hover:text-brand-800 transition-colors text-start block py-0.5 cursor-pointer uppercase tracking-tighter">
                        {safeLang === 'ar' ? 'ميثاق حقوق الخصوصية' : safeLang === 'zh' ? '隐私权利公约' : safeLang === 'ckb' ? 'بەڵگەنامەی مافی تایبەتمەندی' : 'Privacy Rights Charter'}
                      </button>
                    </li>
                    <li>
                      <button type="button" onClick={() => openLegal('terms')} className="hover:text-brand-800 transition-colors text-start block py-0.5 cursor-pointer uppercase tracking-tighter">
                        {safeLang === 'ar' ? 'شروط الالتزام والخدمة' : safeLang === 'zh' ? '服务与履约条款' : safeLang === 'ckb' ? 'مەرجەکانی بەشداربوون' : 'Terms of Engagement'}
                      </button>
                    </li>
                    <li>
                      <Link to={`/${safeLang}/settlement/compliance`} className="hover:text-brand-800 transition-colors block uppercase tracking-tighter">
                        {safeLang === 'ar' ? 'إطار الامتثال ومكافحة غسل الأموال' : safeLang === 'zh' ? '反洗钱与反恐合规框架' : safeLang === 'ckb' ? 'چوارچێوەی دژە سپیکردنەوەی پارە' : 'AML/KYC Framework'}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${safeLang}/institute/about`} className="hover:text-brand-800 transition-colors block uppercase tracking-tighter">
                        {safeLang === 'ar' ? 'النقابة الدبلوماسية والشراكات' : safeLang === 'zh' ? '外交协作与主权联合' : safeLang === 'ckb' ? 'هاوپەیمانی دیپلۆماسی' : 'Diplomatic Syndication'}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${safeLang}/settlement/legal`} className="hover:text-brand-800 transition-colors block uppercase tracking-tighter">
                        {safeLang === 'ar' ? 'إخلاء المسؤولية التنظيمية' : safeLang === 'zh' ? '监管与免责声明' : safeLang === 'ckb' ? 'بەرپرسیارییەتی یاسایی' : 'Regulatory Disclaimer'}
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Column 6: Connect & Network */}
                <div className="space-y-3.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 border-b border-brand-800 pb-1.5">
                    {safeLang === 'ar' ? 'التواصل والاشتراك' : safeLang === 'zh' ? '联络与渠道' : safeLang === 'ckb' ? 'پەیوەندی' : 'Connect & Wire'}
                  </h4>
                  <ul className="space-y-2 text-xs text-neutral-500 font-bold">
                    <li>
                      <button type="button" onClick={handleFocusNewsletter} className="hover:text-brand-800 transition-colors text-start block py-0.5 cursor-pointer">
                        {safeLang === 'ar' ? 'النشرة الدبلوماسية الرسمية' : safeLang === 'zh' ? '官方机要电讯内参' : safeLang === 'ckb' ? 'نامەی هەواڵی دیپلۆماسی' : 'Official Wire Newsletter'}
                      </button>
                    </li>
                    <li>
                      <button type="button" onClick={handleScrollToSocial} className="hover:text-brand-800 transition-colors text-start block py-0.5 cursor-pointer">
                        {safeLang === 'ar' ? 'الشبكات والمنصات الرسمية' : safeLang === 'zh' ? '官方社交媒体方阵' : safeLang === 'ckb' ? 'تۆڕە کۆمەڵایەتییەکان' : 'Social Syndicate'}
                      </button>
                    </li>
                    <li>
                      <Link to={`/${safeLang}/newsroom/feed`} className="hover:text-brand-800 transition-colors block uppercase tracking-tighter">
                        {safeLang === 'ar' ? 'خلاصات الأخبار (RSS)' : safeLang === 'zh' ? 'RSS 订阅源' : safeLang === 'ckb' ? 'خۆراکەکانی RSS' : 'RSS Feeds'}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${safeLang}/hub/management`} className="hover:text-brand-800 transition-colors block font-black text-brand-800 flex items-center gap-1.5 uppercase tracking-tighter">
                        <Compass size={12} />
                        <span>{safeLang === 'ar' ? 'مركز قيادة CISE' : safeLang === 'zh' ? 'CISE 决策中枢' : safeLang === 'ckb' ? 'ناوەندی بڕیاردانی CISE' : 'Command Hub'}</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>

          {/* ================= SECTION 3: SOCIAL SYNDICATE SHOWCASE ================= */}
          {!hideSocialShowcase && (
            <div className="w-full pt-8 border-t border-neutral-200">
              <SocialFooterShowcase lang={safeLang} />
            </div>
          )}

          {/* ================= SECTION 4: NEWSLETTER SIGNUP BAND ================= */}
          {!hideNewsletter && (
            <div id="newsletter" className="w-full pt-8 pb-4 border-t border-neutral-200">
              <NewsletterSignup lang={safeLang} />
            </div>
          )}

          {/* ================= SECTION 5: SUPPORTING STRIP ================= */}
          <div className="w-full py-6 px-5 sm:px-8 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-neutral-600 font-black uppercase tracking-widest text-[10px]">
                <Globe size={15} className="text-brand-800" />
                <span>{safeLang === 'ar' ? 'لغة المنصة:' : safeLang === 'zh' ? '门户语言:' : safeLang === 'ckb' ? 'زمانی دەروازە:' : 'Portal Language:'}</span>
              </div>
              <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 bg-white p-1 rounded-xl border border-neutral-200 shadow-inner">
                {[
                  { code: 'en', label: 'English' },
                  { code: 'ar', label: 'العربية' },
                  { code: 'zh', label: '中文' },
                  { code: 'ckb', label: 'کوردی' },
                ].map(loc => {
                  const isActive = safeLang === loc.code;
                  return (
                    <Link
                      key={loc.code}
                      to={getLocalizedPath(loc.code)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                        isActive 
                          ? 'bg-brand-800 text-white shadow-xs' 
                          : 'text-neutral-500 hover:bg-neutral-50 hover:text-brand-800'
                      }`}
                    >
                      {loc.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={handleInstallPwa}
              className="group flex items-center gap-3.5 text-start p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-white border border-neutral-200 hover:border-brand-800 transition-all cursor-pointer shadow-sm active:scale-98"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-50 group-hover:bg-brand-50 text-brand-800 flex items-center justify-center border border-neutral-100 shrink-0 transition-colors">
                <Smartphone size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-neutral-900 uppercase tracking-tight group-hover:text-brand-800 transition-colors">
                    {safeLang === 'ar' ? 'تطبيق ICA السيادي للهاتف' : safeLang === 'zh' ? 'ICA 主权移动客户端' : safeLang === 'ckb' ? 'ئەپی سەروەری ICA بۆ مۆبایل' : 'ICA Sovereign Mobile App'}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-50 text-brand-800 font-bold border border-brand-100 uppercase tracking-tighter">
                    {canDirectInstall 
                      ? (safeLang === 'ar' ? 'تثبيت' : safeLang === 'zh' ? '安装' : safeLang === 'ckb' ? 'دامەزراندن' : 'Install') 
                      : 'PWA'}
                  </span>
                </div>
                <div className="text-[11px] text-neutral-500 font-medium group-hover:text-neutral-700 transition-colors">
                  {safeLang === 'ar' ? 'انقر للتثبيت المباشر دون متجر التطبيقات' : safeLang === 'zh' ? '无需应用商店，一键即时离线安装' : safeLang === 'ckb' ? 'کلیک بکە بۆ دامەزراندنی ڕاستەوخۆ' : 'Click to install without App Store'}
                </div>
              </div>
            </button>

          </div>

          {/* ================= SECTION 6: LEGAL & COPYRIGHT ROW ================= */}
          <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-bold uppercase tracking-tight">
            <div className="text-center sm:text-start">
              {footerConfig?.copyrightText || (
                safeLang === 'ar' 
                  ? `© ${new Date().getFullYear()} الوكالة العراقية الصينية (ICA) ومعهد CISE. جميع الحقوق الدبلوماسية محفوظة.`
                  : safeLang === 'zh'
                  ? `© ${new Date().getFullYear()} 伊拉克中国通讯社 (ICA) 与 CISE 智库。保留所有主权外交与经贸权利。`
                  : safeLang === 'ckb'
                  ? `© ${new Date().getFullYear()} ئاژانسی عێراقی-چینی (ICA) و پەیمانگای CISE. هەموو مافەکان پارێزراون.`
                  : `© ${new Date().getFullYear()} Iraqi-Chinese Agency (ICA) & CISE. All Diplomatic Rights Reserved.`
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button type="button" onClick={() => openLegal('privacy')} className="hover:text-brand-800 transition-colors cursor-pointer">
                {safeLang === 'ar' ? 'إطار الخصوصية' : safeLang === 'zh' ? '隐私保护架构' : safeLang === 'ckb' ? 'چوارچێوەی تایبەتمەندی' : 'Privacy Framework'}
              </button>
              <span>·</span>
              <button type="button" onClick={() => openLegal('terms')} className="hover:text-brand-800 transition-colors cursor-pointer">
                {safeLang === 'ar' ? 'مدونة الامتثال' : safeLang === 'zh' ? '合规主权法典' : safeLang === 'ckb' ? 'پەیڕەوی پابەندبوون' : 'Compliance Codex'}
              </button>
              <span>·</span>
              <Link to={`/${safeLang}/hub/management`} className="hover:text-brand-800 transition-colors font-black text-brand-800">
                {safeLang === 'ar' ? 'منصة الأمانة العامة' : safeLang === 'zh' ? '常设秘书处中枢' : safeLang === 'ckb' ? 'ناوەندی بەڕێوەبەری' : 'SECRETARIAT HUB'}
              </Link>
              <span>·</span>
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-50 text-neutral-600 hover:text-brand-800 transition-all border border-neutral-200 cursor-pointer shadow-xs"
              >
                <ArrowUp size={12} />
                <span className="font-black text-[10px]">
                  {safeLang === 'ar' ? 'للأعلى' : safeLang === 'zh' ? '返回顶部' : safeLang === 'ckb' ? 'سەرەوە' : 'TOP'}
                </span>
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Global Legal Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalTab}
        lang={safeLang}
      />

      {/* PWA Installation Guidance Modal */}
      {pwaModalOpen && (
        <div 
          role="dialog" 
          aria-modal="true"
          className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPwaModalOpen(false)}
        >
          <div 
            className="w-full max-w-md bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xl text-start space-y-5"
            onClick={(e) => e.stopPropagation()}
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-800 flex items-center justify-center">
                  <Smartphone size={18} />
                </div>
                <h4 className="font-black text-sm text-neutral-900 uppercase tracking-tight">Install ICA Sovereign App</h4>
              </div>
              <button 
                type="button" 
                onClick={() => setPwaModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-900 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              The ICA application runs as an installable Progressive Web App (PWA) with instant offline dispatches, full-screen mode, and zero friction.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 space-y-1">
                <div className="font-black text-neutral-900 flex items-center gap-2 uppercase tracking-tight">
                  <Smartphone size={14} className="text-brand-800" />
                  <span>Apple iOS (Safari):</span>
                </div>
                <p className="text-neutral-500 text-[11px] leading-relaxed font-medium">
                  Tap the Share button at the bottom of Safari, then choose "Add to Home Screen".
                </p>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 space-y-1">
                <div className="font-black text-neutral-900 flex items-center gap-2 uppercase tracking-tight">
                  <Download size={14} className="text-emerald-600" />
                  <span>Android & Chrome:</span>
                </div>
                <p className="text-neutral-500 text-[11px] leading-relaxed font-medium">
                  Tap the browser menu (⋮) at top-right, then select "Install app".
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setPwaModalOpen(false)}
                className="w-full py-3 bg-brand-800 hover:bg-brand-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-lg hover:shadow-brand-800/20 cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
