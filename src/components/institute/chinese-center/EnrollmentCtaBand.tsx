import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Locale } from '../../../types';
import { ccTranslations } from './translations';
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';

interface EnrollmentCtaBandProps {
  lang: Locale;
}

export function EnrollmentCtaBand({ lang }: EnrollmentCtaBandProps) {
  const t = ccTranslations[lang] || ccTranslations.en;
  const isRtl = lang === 'ar' || lang === 'ckb';
  const location = useLocation();

  // Dynamic basePath to support both /chinese-centre and /chinese-center
  const basePath = location.pathname.includes('/chinese-centre')
    ? `/${lang}/institute/chinese-centre`
    : `/${lang}/institute/chinese-center`;

  return (
    <section 
      className="py-24 bg-red-700 text-white relative overflow-hidden" 
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 end-0 w-[500px] h-[500px] bg-red-800 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        <div className="absolute bottom-0 start-0 w-[400px] h-[400px] bg-red-600 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-start">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <Sparkles size={14} />
              <span>{lang === 'ar' ? 'التسجيل مفتوح' : lang === 'ckb' ? 'تۆمارکردن کراوەیە' : lang === 'zh' ? '现正招生' : 'Admissions Open'}</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white mb-6 leading-tight">
              {t.ctaBandHeadline}
            </h2>

            <p className="text-lg sm:text-xl text-white/80 font-medium leading-relaxed">
              {t.ctaBandSubheadline}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 shrink-0">
            <Link
              to={`${basePath}/enroll`}
              className="inline-flex items-center justify-center px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-red-700 bg-white hover:bg-red-50 transition-all shadow-xl"
            >
              <span>{t.ctaBandPrimary}</span>
              <ArrowRight size={14} className="ms-2 rtl:rotate-180" />
            </Link>

            <Link
              to={`${basePath}/contact`}
              className="inline-flex items-center justify-center px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white border border-white/20 hover:bg-white/10 transition-all"
            >
              <PhoneCall size={14} className="me-2" />
              <span>{t.ctaBandSecondary}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
