import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SectionRenderer } from '../composition/SectionRenderer';
import { Locale } from '../../types';
import { useAuthStore } from '../../store/useAuthStore';
import { RefreshCw, Edit3 } from 'lucide-react';
import { resolveLocaleFromEnvironment } from '../../routes/languageSetup';

export function CompositionPage({
  page: _page,
  sections,
  onSync,
}: {
  page: any;
  sections: any[];
  onSync?: () => void;
}) {
  const { lang } = useParams<{ lang?: string }>();
  const [activeLang, setActiveLang] = useState<Locale>(() => {
    if (lang) {
      const clean = lang.toLowerCase().trim();
      return (clean === 'ck' || clean === 'ku' ? 'ckb' : clean) as Locale;
    }
    return resolveLocaleFromEnvironment() as Locale;
  });

  useEffect(() => {
    if (lang) {
      const clean = lang.toLowerCase().trim();
      setActiveLang((clean === 'ck' || clean === 'ku' ? 'ckb' : clean) as Locale);
    } else {
      setActiveLang(resolveLocaleFromEnvironment() as Locale);
    }
  }, [lang]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = activeLang;
      document.documentElement.dir = (activeLang === 'ar' || activeLang === 'ckb') ? 'rtl' : 'ltr';
    }
  }, [activeLang]);
  const { user } = useAuthStore();
  const [isSyncing, setIsSyncing] = useState(false);
  const lastActivityRef = useRef<number>(Date.now());

  const isAdmin = user && ['ADMIN', 'SUPER_ADMIN', 'EDITOR'].includes((user.role || '').toUpperCase());

  const visibleSections = (sections || [])
    .filter((s: any) => s.status === 'published')
    .filter((s: any) => s.visibility === 'visible')
    .sort((a: any, b: any) => a.displayOrder - b.displayOrder);

  const handleManualSync = async () => {
    setIsSyncing(true);
    window.dispatchEvent(new CustomEvent('composition-updated'));
    if (onSync) onSync();
    setTimeout(() => setIsSyncing(false), 800);
  };

  // Lightweight auto-polling mechanism checking for section updates every 60 seconds when idle
  useEffect(() => {
    const handleActivity = () => {
      lastActivityRef.current = Date.now();
    };

    window.addEventListener('mousemove', handleActivity, { passive: true });
    window.addEventListener('keydown', handleActivity, { passive: true });
    window.addEventListener('scroll', handleActivity, { passive: true });
    window.addEventListener('touchstart', handleActivity, { passive: true });

    const intervalId = setInterval(() => {
      if (document.hidden) return;
      const isIdle = Date.now() - lastActivityRef.current >= 30000;
      if (isIdle && onSync) {
        onSync();
      }
    }, 60000);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      clearInterval(intervalId);
    };
  }, [onSync]);

  return (
    <>
      {/* Sovereign Admin Synchronized Status Floating Ribbon (Only when Admin is viewing) */}
      {isAdmin && (
        <div className="sticky top-20 z-30 w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 py-2 pointer-events-none flex justify-end">
          <div className="pointer-events-auto bg-neutral-900/95 backdrop-blur-md text-white border border-neutral-700/80 rounded-2xl px-3.5 py-1.5 shadow-xl flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-bold text-[11px] tracking-wide">
                CRUD SYNCED ({visibleSections.length} ACTIVE)
              </span>
            </div>
            <div className="h-3 w-px bg-neutral-700"></div>
            <button
              type="button"
              onClick={handleManualSync}
              disabled={isSyncing}
              className="hover:text-red-300 transition-colors flex items-center gap-1 cursor-pointer text-[11px]"
              title="Force sync latest database changes"
            >
              <RefreshCw size={11} className={isSyncing ? 'animate-spin text-red-400' : ''} />
              <span>SYNC</span>
            </button>
            <div className="h-3 w-px bg-neutral-700"></div>
            <Link
              to={`/${activeLang}/hub/management?tab=sections`}
              className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1 text-[11px]"
              title="Manage Canonical Sections in CISE Command Hub"
            >
              <Edit3 size={11} />
              <span>EDIT HUB</span>
            </Link>
          </div>
        </div>
      )}

      <div 
        id="composition-sections-container"
        data-component="composition-page-container"
        className="w-full flex flex-col items-stretch focus:outline-hidden relative min-h-[50vh] transition-all duration-300 divide-y-0 pointer-events-auto"
      >
        {/* Render all active canonical sections */}
        {visibleSections.map((section: any) => (
          <SectionRenderer key={section.id} section={section} lang={activeLang} />
        ))}
      </div>
    </>
  );
}
