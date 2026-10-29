import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Locale } from '../../../types';
import { ccTranslations } from './translations';
import { ArrowRight, ShieldCheck, QrCode, Calendar, FileText, CheckCircle2, RotateCcw } from 'lucide-react';

interface TestingCertificationBlockProps {
  lang: Locale;
}

export function TestingCertificationBlock({ lang }: TestingCertificationBlockProps) {
  const t = ccTranslations[lang] || ccTranslations.en;
  const isRtl = lang === 'ar' || lang === 'ckb';
  const location = useLocation();

  // Dynamic basePath to support both /chinese-centre and /chinese-center
  const basePath = location.pathname.includes('/chinese-centre')
    ? `/${lang}/institute/chinese-centre`
    : `/${lang}/institute/chinese-center`;

  return (
    <section id="testing-certification" className="py-24 bg-white border-b border-slate-100" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column (8 cols): Description, Process, Retake */}
          <div className="lg:col-span-8 space-y-8">
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-700 bg-red-50 px-3 py-1 rounded">
              <ShieldCheck size={14} />
              <span>{t.testingOfficialBadge}</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-slate-950 uppercase tracking-tighter mb-6">
              {t.testingHeading}
            </h2>

            <p className="text-slate-600 text-lg font-medium leading-relaxed">
              {t.testingBody}
            </p>

            {/* Feature Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div className="p-8 border border-slate-100 bg-white hover:border-red-100 transition-colors shadow-sm">
                <div className="flex items-center gap-2 text-[10px] font-black text-red-700 uppercase tracking-[0.2em] mb-4">
                  <Calendar size={14} />
                  <span>{t.testingNextDate}</span>
                </div>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {lang === 'ar' ? 'جلسات ورقية وإلكترونية فصليًا في مقر السليمانية.' :
                   lang === 'ckb' ? 'دانیشتنی ئەلیکترۆنی و سەر کاغەز لە کەمپی سلێمانی.' :
                   lang === 'zh' ? '每季度于苏莱曼尼亚校区举行官方统一机考与纸笔考试。' :
                   'Quarterly computer and paper testing sessions held at Sulaymaniyah campus.'}
                </p>
              </div>

              <div className="p-8 border border-slate-100 bg-white hover:border-red-100 transition-colors shadow-sm">
                <div className="flex items-center gap-2 text-[10px] font-black text-red-700 uppercase tracking-[0.2em] mb-4">
                  <RotateCcw size={14} />
                  <span>{t.testingRetakeTitle}</span>
                </div>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {t.testingRetakeDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Action Card with CTAs */}
          <div className="lg:col-span-4">
            <div className="bg-red-700 text-white p-10 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center mb-8">
                  <QrCode size={32} />
                </div>

                <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.2em] block mb-3">
                  {t.testingQrBadge}
                </span>

                <h3 className="text-2xl font-black uppercase tracking-tight mb-6 leading-none">
                  {lang === 'ar' ? 'البوابة الرسمية للاختبار والتوثيق' :
                   lang === 'ckb' ? 'دەروازەی فەرمی تاقیکردنەوە و پشتڕاستکردنەوە' :
                   lang === 'zh' ? '官方考务与资质查验中心' :
                   'Official Examination & Verification'}
                </h3>

                <p className="text-sm text-white/80 font-medium leading-relaxed mb-10">
                  {lang === 'ar' ? 'سجّل في الاختبار القادم أو تحقق رقميًا من صحة الشهادات الصادرة عبر الرمز التعريفي الفريد.' :
                   lang === 'ckb' ? 'ناوت تۆمار بکە لە تاقیکردنەوەی داهاتوو یان بڕوانامەکان بە شێوەی دیجیتاڵی پشتڕاست بکەرەوە.' :
                   lang === 'zh' ? '在线办理当期考试报名、查验已颁发中英文证书防伪凭证及补办成绩报告。' :
                   'Register for the upcoming examination session or verify any CISE credential via digital identifier.'}
                </p>
              </div>

              <div className="space-y-4">
                <Link
                  to={`${basePath}/testing/register`}
                  className="w-full inline-flex items-center justify-center px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-red-700 bg-white hover:bg-red-50 transition-all"
                >
                  <span>{t.testingRegisterCta}</span>
                  <ArrowRight size={14} className="ms-2 rtl:rotate-180" />
                </Link>

                <Link
                  to={`${basePath}/certificates`}
                  className="w-full inline-flex items-center justify-center px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white border border-white/20 hover:bg-white/10 transition-all"
                >
                  <span>{t.testingVerifyCta}</span>
                  <ArrowRight size={14} className="ms-2 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
