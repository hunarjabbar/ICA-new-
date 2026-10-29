import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Locale } from '../../../types';
import { ccTranslations } from './translations';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';

interface FaqPreviewProps {
  lang: Locale;
}

export function FaqPreview({ lang }: FaqPreviewProps) {
  const t = ccTranslations[lang] || ccTranslations.en;
  const isRtl = lang === 'ar' || lang === 'ckb';
  const location = useLocation();

  // Dynamic basePath to support both /chinese-centre and /chinese-center
  const basePath = location.pathname.includes('/chinese-centre')
    ? `/${lang}/institute/chinese-centre`
    : `/${lang}/institute/chinese-center`;

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  const faqItems = [
    { q: t.faqQ1, a: t.faqA1 },
    { q: t.faqQ2, a: t.faqA2 },
    { q: t.faqQ3, a: t.faqA3 },
    { q: t.faqQ4, a: t.faqA4 },
    { q: t.faqQ5, a: t.faqA5 },
    { q: t.faqQ6, a: t.faqA6 }
  ];

  return (
    <section id="faq-preview" className="py-24 bg-white border-b border-slate-100" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-700 mb-4 bg-red-50 px-3 py-1 rounded">
            <HelpCircle size={14} />
            <span>CISE Student Advisory</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-950 uppercase tracking-tighter mb-6">
            {t.faqHeading}
          </h2>
          <p className="text-slate-600 text-lg font-medium leading-relaxed">
            {t.faqSubheading}
          </p>
        </div>

        {/* Collapsible FAQ List */}
        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            const faqId = `faq-item-${idx}`;

            return (
              <div
                key={idx}
                className="bg-white border border-slate-100 overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  id={`btn-${faqId}`}
                  aria-expanded={isOpen}
                  aria-controls={faqId}
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-8 py-6 flex items-center justify-between text-start text-base font-black text-slate-950 uppercase tracking-tight hover:bg-slate-50 transition-colors focus:outline-none"
                >
                  <span className="pe-8 leading-tight">{item.q}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-slate-300 transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-700' : ''}`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={faqId}
                    role="region"
                    aria-labelledby={`btn-${faqId}`}
                    className="px-8 pb-8 text-base text-slate-600 font-medium leading-relaxed border-t border-slate-50 pt-6 bg-slate-50/30"
                  >
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View All FAQs Link */}
        <div className="text-center mt-12">
          <Link
            to={`${basePath}/faq`}
            className="group inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 hover:text-red-700 transition-colors"
          >
            <span>{t.faqViewAll}</span>
            <ArrowRight size={14} className="ms-1.5 rtl:rotate-180 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
