import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  X, 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  Smartphone,
  Globe2,
  Building2,
  Landmark,
  CreditCard,
  Radio,
  Newspaper,
  ShieldCheck
} from 'lucide-react';

import { Locale } from '../types';
import { useNavigationStore } from '../store/useNavigationStore';
import { IcaLogo } from './IcaLogo';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: Locale;
  onOpenDownloadApp?: () => void;
}

export function UnifiedMobileDrawer({ isOpen, onClose, lang, onOpenDownloadApp }: Props) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { getHeaderItems, getFooterItems } = useNavigationStore();
  const [expandedSection, setExpandedSection] = useState<string | null>('portals');

  const headerItems = getHeaderItems();
  const initiativeItems = getFooterItems('initiatives');
  const researchItems = getFooterItems('research');

  const isRtl = lang === 'ar' || lang === 'ckb';

  // Derive dialect parity for Chinese Center/Centre
  const currentDialect = useMemo(() => {
    return location.pathname.includes('chinese-centre') ? 'chinese-centre' : 'chinese-center';
  }, [location.pathname]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleSection = (sec: string) => {
    setExpandedSection(prev => prev === sec ? null : sec);
  };

  const getLabel = (item: any) => {
    if (!item?.label) return '';
    return item.label[lang] || item.label.en || item.slug || '';
  };

  const getDialectAwarePath = (href: string) => {
    let finalHref = href;
    if (finalHref.includes('/chinese-center') || finalHref.includes('/chinese-centre')) {
      finalHref = finalHref.replace(/chinese-cent(er|re)/, currentDialect);
    }
    return finalHref.startsWith('/') ? `/${lang}${finalHref}` : finalHref;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity duration-300 select-none"
      onClick={onClose}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div 
        ref={drawerRef}
        className="w-full max-w-sm sm:max-w-md h-full bg-white text-neutral-900 border-s border-neutral-200 flex flex-col shadow-2xl transition-transform transform duration-300 overflow-hidden"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Unified Mobile Navigation"
      >
        {/* Drawer Header - Sovereign Diplomatic Red */}
        <div className="flex items-center justify-between p-4 sm:p-5 bg-red-600 text-white shrink-0 shadow-sm">
          <Link to={`/${lang}`} onClick={onClose} className="flex items-center gap-2.5">
            <IcaLogo size={36} variant="mark" theme="white" className="rounded-xl shadow-md" />
            <div className="leading-tight">
              <span className="text-sm font-black uppercase text-white tracking-wider block">ICA Agency</span>
              <span className="text-[10px] text-red-100 font-mono block">Sovereign Embassy Wire</span>
            </div>
          </Link>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close mobile navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Quick Shortcuts Grid on Mobile */}
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-neutral-100">
            <Link
              to={`/${lang}/summit`}
              onClick={onClose}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 font-bold text-xs transition-colors min-h-[44px]"
            >
              <Landmark size={15} className="text-red-600 shrink-0" />
              <span className="truncate">{lang === 'ar' ? 'القمة ٢٠٢٦' : lang === 'zh' ? '2026峰会' : lang === 'ckb' ? 'لووتکە ٢٠٢٦' : 'Summit 2026'}</span>
            </Link>
            <Link
              to={`/${lang}/settlement`}
              onClick={onClose}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 font-bold text-xs transition-colors min-h-[44px]"
            >
              <CreditCard size={15} className="text-red-600 shrink-0" />
              <span className="truncate">{lang === 'ar' ? 'المقاصة المالية' : lang === 'zh' ? '主权清算' : lang === 'ckb' ? 'پاکتاو' : 'Settlement'}</span>
            </Link>
          </div>

          {/* Main Top-Level Portals */}
          <div className="space-y-1">
            <button 
              type="button"
              onClick={() => toggleSection('portals')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-100 text-xs font-black uppercase tracking-wider text-neutral-800 cursor-pointer min-h-[44px]"
            >
              <span>{lang === 'ar' ? 'البوابات والمنصات الرئيسية' : lang === 'zh' ? '主权与融媒核心门户' : lang === 'ckb' ? 'دەروازە و پلاتفۆرمەکان' : 'Primary Portals'}</span>
              <ChevronDown className={`w-4 h-4 text-neutral-600 transition-transform ${expandedSection === 'portals' ? 'rotate-180' : ''}`} />
            </button>
            {expandedSection === 'portals' && (
              <div className="ps-2 space-y-1 pt-1">
                {headerItems.map(item => {
                  const targetHref = getDialectAwarePath(item.href);
                  return (
                    <Link
                      key={item.id}
                      to={targetHref}
                      onClick={onClose}
                      className="flex items-center justify-between p-3 rounded-xl text-xs font-bold text-neutral-700 hover:text-red-600 hover:bg-red-50/60 transition-colors min-h-[44px]"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
                        <span className="truncate">{getLabel(item)}</span>
                      </div>
                      {item.isLive && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-red-600 text-white font-mono animate-pulse font-black shrink-0">LIVE</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Strategic Initiatives */}
          <div className="space-y-1">
            <button 
              type="button"
              onClick={() => toggleSection('initiatives')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-100 text-xs font-black uppercase tracking-wider text-neutral-800 cursor-pointer min-h-[44px]"
            >
              <span>{lang === 'ar' ? 'المبادرات والخدمات الثنائية' : lang === 'zh' ? '双边重点倡议与专属服务' : lang === 'ckb' ? 'دەستپێشخەری و خزمەتگوزارییەکان' : 'Bilateral Initiatives'}</span>
              <ChevronDown className={`w-4 h-4 text-neutral-600 transition-transform ${expandedSection === 'initiatives' ? 'rotate-180' : ''}`} />
            </button>
            {expandedSection === 'initiatives' && (
              <div className="ps-2 space-y-1 pt-1">
                {initiativeItems.map(item => {
                  const targetHref = getDialectAwarePath(item.href);
                  return (
                    <Link
                      key={item.id}
                      to={targetHref}
                      onClick={onClose}
                      className="flex items-center justify-between p-3 rounded-xl text-xs font-bold text-neutral-600 hover:text-red-600 hover:bg-red-50/60 transition-colors min-h-[44px]"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-1 h-1 rounded-full bg-neutral-400 shrink-0"></span>
                        <span className="truncate">{getLabel(item)}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-400 rtl:rotate-180 shrink-0" />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Academic & Strategic Research */}
          <div className="space-y-1">
            <button 
              type="button"
              onClick={() => toggleSection('research')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-100 text-xs font-black uppercase tracking-wider text-neutral-800 cursor-pointer min-h-[44px]"
            >
              <span>{lang === 'ar' ? 'أبحاث المعهد ومراكز البيانات' : lang === 'zh' ? '智库研究与经贸数据中心' : lang === 'ckb' ? 'توێژینەوەی پەیمانگا و داتاکان' : 'Research & Data'}</span>
              <ChevronDown className={`w-4 h-4 text-neutral-600 transition-transform ${expandedSection === 'research' ? 'rotate-180' : ''}`} />
            </button>
            {expandedSection === 'research' && (
              <div className="ps-2 space-y-1 pt-1">
                {researchItems.map(item => {
                  const targetHref = getDialectAwarePath(item.href);
                  return (
                    <Link
                      key={item.id}
                      to={targetHref}
                      onClick={onClose}
                      className="flex items-center justify-between p-3 rounded-xl text-xs font-bold text-neutral-600 hover:text-red-600 hover:bg-red-50/60 transition-colors min-h-[44px]"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-1 h-1 rounded-full bg-neutral-400 shrink-0"></span>
                        <span className="truncate">{getLabel(item)}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-400 rtl:rotate-180 shrink-0" />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Direct Link to Centralized CISE Command Hub */}
          <div className="pt-2">
            <Link
              to={`/${lang}/hub`}
              onClick={onClose}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-md hover:bg-red-700 transition-all min-h-[48px]"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-white" />
                <span>{lang === 'ar' ? 'مركز القيادة الموحد CISE' : lang === 'zh' ? 'CISE 综合指挥管控中枢' : lang === 'ckb' ? 'ناوەندی کۆنتڕۆڵی باڵای CISE' : 'CISE Command Hub'}</span>
              </div>
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50 space-y-2 shrink-0">
          <button
            onClick={() => {
              onClose();
              if (onOpenDownloadApp) onOpenDownloadApp();
            }}
            className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl bg-neutral-900 text-white font-black text-xs uppercase tracking-wider hover:bg-black transition-colors shadow-sm min-h-[44px] cursor-pointer"
          >
            <Smartphone className="w-4 h-4" />
            <span>{lang === 'ar' ? 'تثبيت تطبيق الوكالة (PWA)' : lang === 'zh' ? '安装移动端官方应用 (PWA)' : lang === 'ckb' ? 'داگرتنی بەرنامە (PWA)' : 'Download Sovereign App'}</span>
          </button>
          <div className="text-center text-[10px] text-neutral-400 font-mono">
            &copy; {new Date().getFullYear()} Iraqi-Chinese Agency. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnifiedMobileDrawer;
