import { useEffect } from 'react';

export function resolveLocaleFromEnvironment(): 'en' | 'ar' | 'zh' | 'ckb' {
  if (typeof window === 'undefined') return 'en';
  try {
    // 1. Query parameter ?lang= or ?locale=
    const params = new URLSearchParams(window.location.search);
    const qLang = params.get('lang') || params.get('locale');
    if (qLang) {
      const clean = qLang.toLowerCase().trim();
      if (clean === 'ck' || clean === 'ckb' || clean === 'ku' || clean === 'kurdish') return 'ckb';
      if (['en', 'ar', 'zh'].includes(clean)) return clean as any;
    }

    // 2. Cookie `ica_lang`
    const cookieMatch = document.cookie.match(/(?:^|;\s*)ica_lang=([^;]+)/);
    if (cookieMatch && cookieMatch[1]) {
      const cLang = decodeURIComponent(cookieMatch[1]).toLowerCase().trim();
      if (cLang === 'ck' || cLang === 'ckb' || cLang === 'ku') return 'ckb';
      if (['en', 'ar', 'zh'].includes(cLang)) return cLang as any;
    }

    // 3. LocalStorage `ica_lang`
    const stored = localStorage.getItem('ica_lang');
    if (stored) {
      const sLang = stored.toLowerCase().trim();
      if (sLang === 'ck' || sLang === 'ckb' || sLang === 'ku') return 'ckb';
      if (['en', 'ar', 'zh'].includes(sLang)) return sLang as any;
    }

    // 4. Referrer detection
    if (document.referrer) {
      try {
        const refUrl = new URL(document.referrer);
        const refPath = refUrl.pathname;
        if (refPath.startsWith('/ckb') || refPath.startsWith('/ck')) return 'ckb';
        if (refPath.startsWith('/ar')) return 'ar';
        if (refPath.startsWith('/zh')) return 'zh';
        if (refPath.startsWith('/en')) return 'en';
      } catch {}
    }

    // 5. Browser navigator.language
    const browserLang = (navigator.language || '').toLowerCase();
    if (browserLang.startsWith('ar')) return 'ar';
    if (browserLang.startsWith('zh')) return 'zh';
    if (browserLang.startsWith('ckb') || browserLang.startsWith('ku')) return 'ckb';
  } catch {}

  return 'en';
}

export function useLanguageSetup(lang?: string) {
  const cleanLang = (lang || '').toLowerCase().trim();
  const isCkbAlias = cleanLang === 'ck' || cleanLang === 'ku';
  const normalizedLang = isCkbAlias ? 'ckb' : cleanLang;
  const isExplicitValidLang = ['en', 'ar', 'zh', 'ckb'].includes(normalizedLang);
  const safeLang = (isExplicitValidLang ? normalizedLang : resolveLocaleFromEnvironment()) as 'en' | 'ar' | 'zh' | 'ckb';
  // If lang is omitted (root route), it's valid as the default portal entry!
  const isValidLang = !lang || isExplicitValidLang;

  useEffect(() => {
    try {
      document.documentElement.lang = safeLang;
      if (safeLang === 'ar' || safeLang === 'ckb') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
      document.cookie = `ica_lang=${safeLang}; path=/; max-age=31536000; SameSite=Lax`;
      localStorage.setItem('ica_lang', safeLang);
    } catch {}
  }, [safeLang]);

  return { isValidLang, safeLang, isCkbAlias };
}

