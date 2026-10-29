import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Locale } from '../../../types';
import { ccTranslations } from './translations';
import { ArrowRight, BookMarked, Clock, CheckCircle2, Award } from 'lucide-react';
import { useCollection } from '../../../hooks/useFirestore';
import { ChineseLevel } from '../../../types';
import { orderBy } from 'firebase/firestore';

interface HskLevelsGridProps {
  lang: Locale;
}

interface HskLevelData {
  id: string;
  level: string;
  slug: string;
  bandKey: 'hskBandElementary' | 'hskBandIntermediate' | 'hskBandAdvanced';
  words: string;
  hours: string;
  prereq: string; // 'none' or 'HSK 1', etc.
}

const HSK_LEVELS: HskLevelData[] = [
  {
    id: 'hsk-1',
    level: 'HSK 1',
    slug: 'hsk-1',
    bandKey: 'hskBandElementary',
    words: '500',
    hours: '60–80',
    prereq: 'none'
  },
  {
    id: 'hsk-2',
    level: 'HSK 2',
    slug: 'hsk-2',
    bandKey: 'hskBandElementary',
    words: '772',
    hours: '60–80',
    prereq: 'HSK 1'
  },
  {
    id: 'hsk-3',
    level: 'HSK 3',
    slug: 'hsk-3',
    bandKey: 'hskBandIntermediate',
    words: '973',
    hours: '80–100',
    prereq: 'HSK 2'
  },
  {
    id: 'hsk-4',
    level: 'HSK 4',
    slug: 'hsk-4',
    bandKey: 'hskBandIntermediate',
    words: '1,000',
    hours: '100–120',
    prereq: 'HSK 3'
  },
  {
    id: 'hsk-5',
    level: 'HSK 5',
    slug: 'hsk-5',
    bandKey: 'hskBandAdvanced',
    words: '1,071',
    hours: '120–140',
    prereq: 'HSK 4'
  },
  {
    id: 'hsk-6',
    level: 'HSK 6',
    slug: 'hsk-6',
    bandKey: 'hskBandAdvanced',
    words: '1,140',
    hours: '140–160',
    prereq: 'HSK 5'
  },
  {
    id: 'hsk-7-9',
    level: 'HSK 7–9',
    slug: 'hsk-7-9',
    bandKey: 'hskBandAdvanced',
    words: '5,636',
    hours: '200+',
    prereq: 'HSK 6'
  }
];

export function HskLevelsGrid({ lang }: HskLevelsGridProps) {
  const t = ccTranslations[lang] || ccTranslations.en;
  const isRtl = lang === 'ar' || lang === 'ckb';
  const location = useLocation();
  
  // Dynamic basePath to support both /chinese-centre and /chinese-center
  const basePath = location.pathname.includes('/chinese-centre')
    ? `/${lang}/institute/chinese-centre`
    : `/${lang}/institute/chinese-center`;

  const { data: dbLevels, loading } = useCollection<ChineseLevel>('chinese_levels', [
    orderBy('order', 'asc')
  ]);

  const levels = dbLevels.length > 0 ? dbLevels : HSK_LEVELS;

  if (loading && dbLevels.length === 0) {
    return (
      <div className="py-24 bg-white text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-48 bg-slate-100 rounded mb-4"></div>
          <div className="h-4 w-64 bg-slate-50 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <section id="hsk-levels" className="py-24 bg-white border-b border-slate-100" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-700 mb-4 bg-red-50 px-3 py-1 rounded">
            <Award size={14} />
            <span>{t.heroPillStandard}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-950 uppercase tracking-tighter mb-6">
            {t.hskHeading}
          </h2>
          <p className="text-slate-600 text-lg font-medium leading-relaxed">
            {t.hskSubheading}
          </p>
        </div>

        {/* 7-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {levels.map((item) => {
            const bandLabel = t[item.bandKey];
            const prereqLabel = item.prereq === 'none' ? t.hskPrereqNone : item.prereq;

            return (
              <div
                key={item.id}
                className="bg-white border border-slate-100 p-8 flex flex-col justify-between hover:border-red-100 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div>
                  {/* Top Row: Level & Band */}
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-red-700 block mb-1">
                        {bandLabel}
                      </span>
                      <span className="text-3xl font-black text-slate-950 tracking-tighter">
                        {item.level}
                      </span>
                    </div>
                  </div>

                  {/* Metrics Table */}
                  <div className="space-y-4 py-6 border-y border-slate-50 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
                        <BookMarked size={14} className="text-red-700 shrink-0" />
                        {t.hskCumulativeWords}
                      </span>
                      <span className="font-black text-slate-900 tabular-nums">
                        {item.words}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
                        <Clock size={14} className="text-red-700 shrink-0" />
                        {t.hskTargetHours}
                      </span>
                      <span className="font-black text-slate-900 tabular-nums">
                        {item.hours}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-red-700 shrink-0" />
                        {t.hskPrerequisite}
                      </span>
                      <span className="font-black text-slate-900">
                        {prereqLabel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-8">
                  <Link
                    to={`${basePath}/courses?level=${item.slug}`}
                    className="group inline-flex items-center justify-between w-full text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 hover:text-red-700 transition-colors"
                  >
                    <span>{t.hskViewCourse}</span>
                    <ArrowRight size={14} className="ms-1.5 rtl:rotate-180 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
