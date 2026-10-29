import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale, CulturalPartner } from '../../../types';
import {
  Building2, Globe, ArrowLeft, ArrowRight, Award, ChevronRight
} from 'lucide-react';
import { useCollection } from '../../../hooks/useFirestore';

export function CulturalExchangePartners() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';

  const { data: partners, loading: isLoading } = useCollection<CulturalPartner>('cultural_partners');

  const t = {
    title: lang === 'ar' ? 'شبكة الجامعات والمراكز الأكاديمية الشريكة' : lang === 'zh' ? '中伊双边顶尖合作院校与学术同盟' : lang === 'ckb' ? 'تۆڕی زانکۆ و ناوەندە ئەکادیمییە هاوبەشەکان' : 'Partner Universities & Academic Alliances',
    subtitle: lang === 'ar' ? 'مذكرات تفاهم رسمية وشراكات استراتيجية تجمع أرقى جامعات العراق والصين تحت إشراف معهد CISE.' : lang === 'zh' ? '在中伊智库 (CISE) 统一协调下，汇聚两国顶尖高校、联合实验室与国际学术联合体。' : lang === 'ckb' ? 'یاداشتنامەی فەرمی و هاوبەشی ستراتیژی نێوان زانکۆ سەرەکییەکانی عێراق و چین لەژێر چاودێری CISE.' : 'Official institutional accords and research consortia linking leading Iraqi and Chinese universities under CISE governance.',
    backToLanding: lang === 'ar' ? 'العودة للتبادل الثقافي' : lang === 'zh' ? '返回文化交流主页' : lang === 'ckb' ? 'گەڕانەوە بۆ ئاڵوگۆڕی کولتووری' : 'Back to Cultural Exchange',
    mouScope: lang === 'ar' ? 'نطاق مذكرة التفاهم والبرامج المشتركة:' : lang === 'zh' ? '谅解备忘录核心合作范畴：' : lang === 'ckb' ? 'بواری لێکتێگەیشتن و هاوکاری:' : 'MOU Scope & Bilateral Tracks:',
    inquireMOU: lang === 'ar' ? 'طلب تنسيق شراكة جامعية' : lang === 'zh' ? '申请对接校际合作' : lang === 'ckb' ? 'داواکاری هاوبەشی زانکۆیی' : 'Inquire for University MOU',
    navApply: lang === 'ar' ? 'طلب التقديم' : lang === 'zh' ? '在线申请' : lang === 'ckb' ? 'داواکاری' : 'Apply / Inquire',
    navFaq: lang === 'ar' ? 'الأسئلة الشائعة' : lang === 'zh' ? '常见问题' : lang === 'ckb' ? 'پرسیارە باوەکان' : 'FAQ',
    navContact: lang === 'ar' ? 'مكتب الاتصال' : lang === 'zh' ? '学术联络' : lang === 'ckb' ? 'پەیوەندی' : 'Academic Contact',
    loading: lang === 'ar' ? 'جاري التحميل...' : lang === 'zh' ? '加载中...' : lang === 'ckb' ? 'باردەکرێت...' : 'Loading partners...',
  };

  return (
    <div className="w-full flex flex-col font-sans bg-white pb-24">
      {/* SUBNAV STRIP */}
      <div className="bg-neutral-50 border-b border-neutral-200 sticky top-[92px] sm:top-[104px] lg:top-[120px] z-30 overflow-x-auto scrollbar-none shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 h-12">
          <div className="flex items-center gap-1 sm:gap-2 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
            <Link to={`/${lang}/institute/services/cultural-exchange`} className="px-3 py-1.5 rounded text-neutral-500 hover:text-red-600 transition">
              {lang === 'ar' ? 'نظرة عامة' : lang === 'zh' ? '概览' : lang === 'ckb' ? 'پوختە' : 'Overview'}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/programs`} className="px-3 py-1.5 rounded text-neutral-500 hover:text-red-600 transition">
              {lang === 'ar' ? 'دليل البرامج' : lang === 'zh' ? '全部项目' : lang === 'ckb' ? 'بەرنامەکان' : 'All Programs'}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/partners`} className="px-3 py-1.5 rounded bg-red-600 text-white font-black">
              {lang === 'ar' ? 'الجامعات الشريكة' : lang === 'zh' ? '合作院校' : lang === 'ckb' ? 'زانکۆ هاوبەشەکان' : 'Partner Universities'}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/apply`} className="px-3 py-1.5 rounded text-neutral-500 hover:text-red-600 transition">
              {t.navApply}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/faq`} className="px-3 py-1.5 rounded text-neutral-500 hover:text-red-600 transition">
              {t.navFaq}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/contact`} className="px-3 py-1.5 rounded text-neutral-500 hover:text-red-600 transition">
              {t.navContact}
            </Link>
          </div>
          <Link
            to={`/${lang}/institute/services/cultural-exchange`}
            className="hidden sm:inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-red-600 hover:underline"
          >
            <span>{t.backToLanding}</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-10">
          <Link
            to={`/${lang}/institute/services/cultural-exchange`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-red-600 transition"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{t.backToLanding}</span>
          </Link>
        </div>

        <div className="space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-50 border border-red-100 text-red-700 text-[10px] font-black uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>Academic Consortia & MOUs</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl ica-heading text-neutral-900 uppercase">
            {t.title}
          </h1>
          <div className="w-24 h-1.5 bg-red-600 mt-6" />
          <p className="text-lg text-neutral-600 max-w-3xl leading-relaxed mt-6 font-medium">
            {t.subtitle}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-96 bg-neutral-50 rounded-2xl animate-pulse border border-neutral-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner) => {
              const name = lang === 'ar' ? partner.nameAr : lang === 'zh' ? partner.nameZh : lang === 'ckb' ? partner.nameCkb : partner.nameEn;
              const location = lang === 'ar' ? partner.locationAr : lang === 'zh' ? partner.locationZh : lang === 'ckb' ? partner.locationCkb : partner.locationEn;
              const specialty = lang === 'ar' ? partner.specialtyAr : lang === 'zh' ? partner.specialtyZh : lang === 'ckb' ? partner.specialtyCkb : partner.specialtyEn;
              const mouScope = lang === 'ar' ? partner.mouScopeAr : lang === 'zh' ? partner.mouScopeZh : lang === 'ckb' ? partner.mouScopeCkb : partner.mouScopeEn;

              return (
                <div
                  key={partner.id}
                  className="ica-card-interactive p-8 flex flex-col justify-between group"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-red-700 bg-red-50 px-3 py-1.5 rounded border border-red-100">
                        {partner.tierBadge || 'Official Partner'}
                      </span>
                      <Building2 className="w-6 h-6 text-neutral-300 group-hover:text-red-600 transition-colors" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl ica-card-title text-neutral-900 group-hover:text-red-600 transition-colors leading-tight uppercase">
                        {name}
                      </h3>
                      <div className="flex items-center gap-2 text-neutral-400">
                        <Globe className="w-4 h-4 text-red-600/50" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{location}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-100 text-[11px] font-black uppercase tracking-widest text-neutral-600 leading-relaxed group-hover:bg-red-50 group-hover:border-red-100 group-hover:text-red-900 transition-all">
                      {specialty}
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-black tracking-widest text-neutral-400 block">
                        {t.mouScope}
                      </span>
                      <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                        {mouScope}
                      </p>
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-neutral-100 flex items-center justify-between">
                    <Link
                      to={`/${lang}/institute/services/cultural-exchange/programs`}
                      className="text-[10px] font-black uppercase tracking-widest text-red-600 hover:underline flex items-center gap-2"
                    >
                      <span>View Programs</span>
                      <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''} cta-arrow transition-transform`} />
                    </Link>

                    <Link
                      to={`/${lang}/institute/services/cultural-exchange/apply?partner=${partner.id}`}
                      className="px-5 py-2.5 rounded-lg bg-red-700 hover:bg-red-800 text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-red-900/10 active:scale-95"
                    >
                      Apply Track
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Institutional MOU Inquiry Block */}
        <div className="mt-24 p-10 sm:p-16 rounded-2xl bg-neutral-50 border border-neutral-200 relative overflow-hidden shadow-sm">
          {/* Background Accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[80px] rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/5 blur-[80px] rounded-full -ml-32 -mb-32" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="space-y-6 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-600 text-white text-[10px] font-black uppercase tracking-widest">
                Official Institutional Access
              </div>
              <h3 className="text-3xl sm:text-4xl ica-heading uppercase tracking-tight text-neutral-900">
                {lang === 'ar' ? 'هل تمثل جامعة أو معهداً أكاديمياً؟' : lang === 'zh' ? '高校或科研机构申请加入双边学术联盟' : lang === 'ckb' ? 'نوێنەرایەتی زانکۆ یان ناوەندی ئەکادیمی دەکەیت؟' : 'Represent a University or Research Institute?'}
              </h3>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-medium">
                {lang === 'ar' ? 'يقدم معهد CISE التنسيق السيادي لتوقيع مذكرات التفاهم واعتماد الساعات المتبادلة وبرامج المنح الممولة.' : lang === 'zh' ? 'CISE 智库为中伊高校提供备忘录起草、学分认证与双边联合实验室共建的主权级统筹通道。' : lang === 'ckb' ? 'پەیمانگای CISE ئاسانکاری دەکات بۆ واژۆکردنی یاداشتنامەی هاوبەش و زەمالەی خوێندن.' : 'CISE provides sovereign coordination for bilateral academic MOUs, credit transfers, and funded research labs.'}
              </p>
            </div>
            <Link
              to={`/${lang}/institute/services/cultural-exchange/apply?type=mou`}
              className="px-10 py-5 rounded-lg ica-btn-primary font-black text-xs uppercase tracking-[0.2em] transition-all whitespace-nowrap shadow-xl shadow-red-900/10 active:scale-95"
            >
              {t.inquireMOU}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CulturalExchangePartners;

