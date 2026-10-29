import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Locale } from '../../../types';
import { ccTranslations } from './translations';
import { ArrowRight, BookOpen, GraduationCap, ShieldCheck, ChevronRight } from 'lucide-react';

interface ChineseCenterHeroProps {
  lang: Locale;
}

export function ChineseCenterHero({ lang }: ChineseCenterHeroProps) {
  const t = ccTranslations[lang] || ccTranslations.en;
  const isRtl = lang === 'ar' || lang === 'ckb';
  const location = useLocation();

  // Dynamic basePath to support both /chinese-centre and /chinese-center
  const isCentre = location.pathname.includes('/chinese-centre');
  const basePath = isCentre
    ? `/${lang}/institute/chinese-centre`
    : `/${lang}/institute/chinese-center`;

  return (
    <section 
      className="relative overflow-hidden bg-white text-slate-900 py-16 md:py-24 border-b border-slate-100"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 end-0 w-[600px] h-[600px] bg-red-50/50 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute -bottom-24 -start-24 w-96 h-96 border-[1px] border-red-100 rounded-full opacity-50"></div>
        <div className="absolute top-1/2 start-1/2 w-[800px] h-[800px] border-[1px] border-slate-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <li>
              <Link to={`/${lang}`} className="hover:text-red-700 transition-colors">
                {t.breadcrumbIca}
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li>
              <Link to={`/${lang}/institute`} className="hover:text-red-700 transition-colors">
                {t.breadcrumbInstitute}
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li className="text-red-700" aria-current="page">
              {isCentre ? t.breadcrumbChineseCentre : t.breadcrumbChineseCenter || t.breadcrumbChineseCentre}
            </li>
          </ol>
        </nav>

        {/* Hero Content */}
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-700 bg-red-50 px-3 py-1 rounded">
              {t.heroEyebrow}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-950 mb-6 leading-[0.95]">
            {t.heroHeadline}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed mb-10 max-w-2xl">
            {t.heroSubheadline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <Link
              to={`${basePath}/enroll`}
              className="inline-flex items-center justify-center px-8 py-4 text-xs font-black uppercase tracking-widest text-white bg-red-700 hover:bg-red-800 transition-all shadow-sm"
            >
              <span>{t.heroPrimaryCta}</span>
              <ArrowRight size={14} className="ms-2 rtl:rotate-180" />
            </Link>

            <Link
              to={`${basePath}/courses`}
              className="inline-flex items-center justify-center px-8 py-4 text-xs font-black uppercase tracking-widest text-red-700 bg-white border border-red-100 hover:bg-red-50 transition-all"
            >
              <span>{t.heroSecondaryCta}</span>
              <ArrowRight size={14} className="ms-2 rtl:rotate-180" />
            </Link>
          </div>

          {/* Value Props Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-slate-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <GraduationCap size={20} className="text-red-700" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Curriculum</p>
                <p className="text-sm font-bold text-slate-900 leading-tight">{t.heroPillStandard}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <BookOpen size={20} className="text-red-700" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Authorization</p>
                <p className="text-sm font-bold text-slate-900 leading-tight">{t.heroPillTesting}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} className="text-red-700" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Certification</p>
                <p className="text-sm font-bold text-slate-900 leading-tight">{t.heroPillCert}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
