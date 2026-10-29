import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Locale } from '../../../types';
import { ccTranslations } from './translations';
import { ArrowRight, UserCheck, Languages, GraduationCap } from 'lucide-react';
import { useCollection } from '../../../hooks/useFirestore';
import { orderBy } from 'firebase/firestore';

interface InstructorsPreviewProps {
  lang: Locale;
}

interface Instructor {
  id: string;
  nameEn: string;
  nameAr: string;
  nameZh: string;
  nameCkb: string;
  titleEn: string;
  titleAr: string;
  titleZh: string;
  titleCkb: string;
  languagesEn?: string;
  languagesAr?: string;
  languagesZh?: string;
  languagesCkb?: string;
  levelsTaught: string;
  initials?: string;
  imageUrl?: string;
}

const STATIC_INSTRUCTORS: Instructor[] = [
  {
    id: 'chen-lin',
    nameEn: 'Prof. Chen Lin',
    nameAr: 'أ.د. تشن لين',
    nameZh: '陈林 教授',
    nameCkb: 'پ.د. چێن لین',
    titleEn: 'Pedagogical Director & Senior Linguist',
    titleAr: 'المدير التربوي وكبير اللغويين',
    titleZh: '教学督导兼资深语言学专家',
    titleCkb: 'بەڕێوەبەری پەروەردەیی و زمانزانی باڵا',
    languagesEn: 'Chinese (Native), English, Arabic',
    languagesAr: 'الصينية (الأم)، الإنجليزية، العربية',
    languagesZh: '中文（母语）、英语、阿拉伯语',
    languagesCkb: 'چینی (ڕەسەن)، ئینگلیزی، عەرەبی',
    levelsTaught: 'HSK 4–6, Business Chinese',
    initials: 'CL'
  },
  {
    id: 'zhang-ming',
    nameEn: 'Zhang Ming',
    nameAr: 'تشانغ مينغ',
    nameZh: '张明 讲师',
    nameCkb: 'ژانگ مینگ',
    titleEn: 'Lead Examiner & Oral Fluency Specialist',
    titleAr: 'كبير الممتحنين ومتخصص الطلاقة الشفوية',
    titleZh: '主考官兼口语考评专家',
    titleCkb: 'سەرپەرشتیاری تاقیکردنەوە و پسپۆڕی قسەکردن',
    languagesEn: 'Chinese (Native), Kurdish, English',
    languagesAr: 'الصينية (الأم)، الكردية، الإنجليزية',
    languagesZh: '中文（母语）、库尔德语、英语',
    languagesCkb: 'چینی (ڕەسەن)، کوردی، ئینگلیزی',
    levelsTaught: 'HSK 1–3, HSKK Speaking',
    initials: 'ZM'
  },
  {
    id: 'li-wei',
    nameEn: 'Li Wei',
    nameAr: 'لي وي',
    nameZh: '李伟 导师',
    nameCkb: 'لی وێی',
    titleEn: 'Youth Curriculum & Cultural Specialist',
    titleAr: 'أخصائي مناهج الناشئين والتبادل الثقافي',
    titleZh: '少儿教育与跨文化交流主管',
    titleCkb: 'پسپۆڕی پرۆگرامی لاوان و ئاڵوگۆڕی کولتووری',
    languagesEn: 'Chinese (Native), English, Arabic',
    languagesAr: 'الصينية (الأم)، الإنجليزية، العربية',
    languagesZh: '中文（母语）、英语、阿拉伯语',
    languagesCkb: 'چینی (ڕەسەن)، ئینگلیزی، عەرەبی',
    levelsTaught: 'YCT 1–4, HSK 1–2',
    initials: 'LW'
  }
];

export function InstructorsPreview({ lang }: InstructorsPreviewProps) {
  const t = ccTranslations[lang] || ccTranslations.en;
  const isRtl = lang === 'ar' || lang === 'ckb';
  const location = useLocation();

  // Dynamic basePath to support both /chinese-centre and /chinese-center
  const basePath = location.pathname.includes('/chinese-centre')
    ? `/${lang}/institute/chinese-centre`
    : `/${lang}/institute/chinese-center`;

  const { data: instructors = [] } = useCollection<Instructor>('chinese_instructors', [orderBy('order', 'asc')]);

  const displayInstructors = instructors.length > 0 ? instructors : STATIC_INSTRUCTORS;

  return (
    <section id="instructors" className="py-24 bg-white border-b border-slate-100" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-950 uppercase tracking-tighter mb-6">
            {t.instructorsHeading}
          </h2>
          <p className="text-slate-600 text-lg font-medium leading-relaxed">
            {t.instructorsSubheading}
          </p>
        </div>

        {/* 3-Instructor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {displayInstructors.map((ins) => {
            const name = lang === 'ar' ? ins.nameAr : lang === 'ckb' ? ins.nameCkb : lang === 'zh' ? ins.nameZh : ins.nameEn;
            const title = lang === 'ar' ? ins.titleAr : lang === 'ckb' ? ins.titleCkb : lang === 'zh' ? ins.titleZh : ins.titleEn;
            const langs = lang === 'ar' ? ins.languagesAr : lang === 'ckb' ? ins.languagesCkb : lang === 'zh' ? ins.languagesZh : ins.languagesEn;
            const initials = ins.initials || name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

            return (
              <div
                key={ins.id}
                className="bg-white border border-slate-100 p-8 flex flex-col justify-between hover:border-red-100 transition-all duration-300 shadow-sm"
              >
                <div>
                  {/* Avatar / Silhouette */}
                  <div className="flex items-start gap-5 mb-8">
                    <div className="w-16 h-16 rounded-full bg-red-700 text-white flex items-center justify-center font-black text-xl shadow-lg shrink-0 overflow-hidden">
                      {ins.imageUrl ? (
                        <img src={ins.imageUrl} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        initials
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-950 leading-tight uppercase tracking-tight">
                        {name}
                      </h3>
                      <p className="text-[10px] font-black text-red-700 uppercase tracking-[0.2em] mt-2">
                        {title}
                      </p>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="space-y-4 py-6 border-t border-slate-50 text-xs">
                    <div className="flex items-start gap-3">
                      <Languages size={15} className="text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-400 uppercase tracking-wider me-2">
                          {t.instructorsLanguagesLabel}:
                        </span>
                        <span className="text-slate-900 font-medium">
                          {langs}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <GraduationCap size={15} className="text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-400 uppercase tracking-wider me-2">
                          {t.instructorsLevelsLabel}:
                        </span>
                        <span className="font-black text-slate-900">
                          {ins.levelsTaught}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50">
                  <Link
                    to={`${basePath}/instructors/${ins.id}`}
                    className="group inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 hover:text-red-700 transition-colors"
                  >
                    <span>{t.instructorsViewProfile}</span>
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
