import React, { useMemo } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { 
  Layers, 
  ArrowRight, 
  Coins, 
  GraduationCap, 
  FileCheck, 
  Ship, 
  Award, 
  Cpu, 
  Building2
} from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

interface StrategicServiceMeta {
  serviceCode: string;
  badge: Record<string, string>;
  targetPortalPath: string;
  portalLabel: Record<string, string>;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const STRATEGIC_SERVICES_CONFIG: Record<string, StrategicServiceMeta> = {
  'energy-infrastructure': {
    serviceCode: 'SVC-01',
    badge: {
      en: 'BRI Projects Registry',
      ar: 'سجل مشاريع الحزام والطريق',
      zh: '一带一路重大工程库',
      ckb: 'تۆماری پڕۆژەکانی ژێرخان'
    },
    targetPortalPath: '/institute/data-hub/projects',
    portalLabel: {
      en: 'Projects Tracker',
      ar: 'مرصد المشاريع',
      zh: '重大工程大屏',
      ckb: 'چاودێری پڕۆژەکان'
    },
    icon: Building2
  },
  'sovereign-settlement': {
    serviceCode: 'SVC-02',
    badge: {
      en: 'Sovereign Currency Clearing',
      ar: 'مسار المقاصة السيادي',
      zh: '主权本币结算直通',
      ckb: 'هێڵی پاکتاوی سەروەری'
    },
    targetPortalPath: '/institute/settlement',
    portalLabel: {
      en: 'Settlement Rail',
      ar: 'مسار المقاصة',
      zh: '本币清算网关',
      ckb: 'هێڵی پاکتاو'
    },
    icon: Coins
  },
  'academic-exchange': {
    serviceCode: 'SVC-03',
    badge: {
      en: 'Chinese Language & HSK',
      ar: 'مركز اللغة الصينية وHSK',
      zh: '国际中文教育与 HSK 认证',
      ckb: 'ناوەندی زمانی چینی و HSK'
    },
    targetPortalPath: '/institute/chinese-center',
    portalLabel: {
      en: 'Language Centre',
      ar: 'مركز اللغة الصينية',
      zh: '国际中文教学中心',
      ckb: 'ناوەندی زمانی چینی'
    },
    icon: GraduationCap
  },
  'visa-consular': {
    serviceCode: 'SVC-04',
    badge: {
      en: 'Fast-Track Visa Centre',
      ar: 'مركز التأشيرات السريع',
      zh: '双向加急签证大厅',
      ckb: 'ناوەندی خێرای ڤیزا'
    },
    targetPortalPath: '/institute/visa-centre',
    portalLabel: {
      en: 'Visa Centre',
      ar: 'مركز التأشيرات',
      zh: '双向签证中心',
      ckb: 'ناوەندی ڤیزا'
    },
    icon: FileCheck
  },
  'trade-corridor': {
    serviceCode: 'SVC-05',
    badge: {
      en: 'Maritime Logistics Corridor',
      ar: 'ممر الملاحة واللوجستيات',
      zh: '海运物流与陆海新通道',
      ckb: 'ڕێڕەوی لۆجستی کەشتیوانی'
    },
    targetPortalPath: '/institute/data-hub/corridor',
    portalLabel: {
      en: 'Freight Corridor',
      ar: 'ممر الشحن البحري',
      zh: '物流走廊大屏',
      ckb: 'ڕێڕەوی گواستنەوە'
    },
    icon: Ship
  },
  'women-diplomacy': {
    serviceCode: 'SVC-06',
    badge: {
      en: 'Institutional Partnerships & Advisory',
      ar: 'الشراكات المؤسسية والاستشارات',
      zh: '智库战略同盟与投资顾问',
      ckb: 'هاوبەشی دامەزراوەیی و ڕاوێژکاری'
    },
    targetPortalPath: '/institute/partnerships',
    portalLabel: {
      en: 'Partnerships & Advisory',
      ar: 'الشراكات والاستشارات',
      zh: '战略伙伴与顾问总台',
      ckb: 'هاوبەشی و ڕاوێژکاری'
    },
    icon: Award
  },
  'tech-ai-innovation': {
    serviceCode: 'SVC-07',
    badge: {
      en: 'Macroeconomic Data Hub',
      ar: 'مركز بيانات الاقتصاد الكلي',
      zh: '宏观经贸数据中枢',
      ckb: 'ناوەندی داتای ئابووری گشتی'
    },
    targetPortalPath: '/institute/data-hub',
    portalLabel: {
      en: 'Strategic Data Hub',
      ar: 'منصة البيانات الاستراتيجية',
      zh: '宏观智能数据中枢',
      ckb: 'ناوەندی داتای ستراتیژی'
    },
    icon: Cpu
  }
};

export function IcaInitiativesPage() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const location = useLocation();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  // Derive dialect parity for Chinese Center/Centre
  const currentDialect = useMemo(() => {
    return location.pathname.includes('chinese-centre') ? 'chinese-centre' : 'chinese-center';
  }, [location.pathname]);

  const initiatives = portalStore.getInitiatives();

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-neutral-950 min-h-screen py-8 sm:py-12 transition-colors">
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: Page Header */}
        <div className="mb-8 sm:mb-10 pb-5 sm:pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="ica-kicker flex items-center gap-2 mb-2">
            <Layers size={14} className="shrink-0" />
            <span>{t('nav.initiatives')}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-950 dark:text-white tracking-tight">
            {t('publicPortal.initiativesHeading')}
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 max-w-3xl leading-relaxed">
            {t('publicPortal.initiativesSubtitle')}
          </p>
        </div>

        {/* Section 2: Synchronized CISE Portal Banner */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/90 border border-neutral-200/90 dark:border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-800 dark:text-red-400 flex items-center justify-center shrink-0 border border-brand-100 dark:border-brand-900/60">
              <Building2 size={22} />
            </div>
            <div>
              <div className="ica-kicker mb-1">
                {currentLang === 'ar' ? 'البوابة الأكاديمية والبحثية الموحدة' : currentLang === 'zh' ? '统一智库与学术总台' : currentLang === 'ckb' ? 'دەروازەی ئەکادیمی و توێژینەوە' : 'Unified Academic & Research Portal'}
              </div>
              <div className="text-sm sm:text-base font-serif font-black text-neutral-900 dark:text-neutral-100">
                {currentLang === 'ar' ? 'المعهد الصيني للدراسات الاستراتيجية والاقتصادية (CISE)' : currentLang === 'zh' ? '中国战略与经济研究所 (CISE)' : currentLang === 'ckb' ? 'پەیمانگای چینی بۆ لێکۆڵینەوەی ستراتیژی و ئابووری (CISE)' : 'Chinese Institute for Strategic and Economic Studies (CISE)'}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to={`/${currentLang}/institute/services`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-brand-800 text-xs font-bold text-neutral-900 dark:text-neutral-100 hover:text-brand-800 dark:hover:text-red-400 transition-colors shadow-2xs"
            >
              <span>{currentLang === 'ar' ? 'دليل خدمات معهد CISE' : currentLang === 'zh' ? 'CISE 服务总览' : currentLang === 'ckb' ? 'ڕێبەری خزمەتگوزاری CISE' : 'CISE Services Directory'}</span>
              <ArrowRight size={14} className="rtl:rotate-180" />
            </Link>
            <Link
              to={`/${currentLang}/institute/research`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-800 hover:bg-brand-900 text-xs font-bold text-white transition-colors shadow-2xs"
            >
              <span>{currentLang === 'ar' ? 'ركائز البحث' : currentLang === 'zh' ? '智库研究支柱' : currentLang === 'ckb' ? 'بنەماکانی توێژینەوە' : 'Research Pillars'}</span>
              <ArrowRight size={14} className="rtl:rotate-180" />
            </Link>
          </div>
        </div>

        {/* Section 3: Strategic Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {initiatives.map((init, idx) => {
            const meta = STRATEGIC_SERVICES_CONFIG[init.slug] || {
              serviceCode: `SVC-0${idx + 1}`,
              badge: { en: 'Strategic Service', ar: 'خدمة استراتيجية', zh: '战略服务', ckb: 'خزمەتگوزاری ستراتیژی' },
              targetPortalPath: `/institute/services`,
              portalLabel: { en: 'Open Portal', ar: 'دخول البوابة', zh: '进入专区', ckb: 'دەروازە' },
              icon: Layers
            };
            const IconComponent = meta.icon;

            // Apply Dialect Correction to targetPortalPath
            let finalPortalPath = meta.targetPortalPath;
            if (finalPortalPath.includes('/chinese-center')) {
              finalPortalPath = finalPortalPath.replace('chinese-center', currentDialect);
            }

            return (
              <Link
                key={init.id}
                to={`/${currentLang}/initiatives/${init.slug}`}
                className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 p-7 sm:p-8 shadow-xs hover:shadow-xl hover:border-brand-800 dark:hover:border-neutral-700 transition-all duration-300 overflow-hidden text-start focus:outline-hidden focus:ring-2 focus:ring-brand-800"
              >
                {/* Clean Top Accent Highlight on Hover */}
                <div className="absolute top-0 inset-x-0 h-1 bg-brand-800 dark:bg-brand-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Card Body */}
                <div>
                  {/* Clean Icon Container */}
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-brand-800 dark:text-brand-400 flex items-center justify-center mb-6 group-hover:bg-brand-800 group-hover:text-white dark:group-hover:bg-brand-700 transition-colors duration-300">
                    <IconComponent size={22} />
                  </div>

                  {/* Strategic Domain Kicker (Harmonized Sovereign Editorial Eyebrow) */}
                  <div className="ica-kicker mb-2.5">
                    {meta.badge[currentLang] || meta.badge.en}
                  </div>

                  {/* Strategic Service Title */}
                  <h2 className="font-serif text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-100 group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors leading-snug mb-3">
                    {init.title[currentLang] || init.title.en}
                  </h2>

                  {/* Strategic Service Scope Description */}
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3 mb-6">
                    {init.shortDesc[currentLang] || init.shortDesc.en}
                  </p>
                </div>

                {/* Clean Footer Link */}
                <div className="pt-5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors">
                  <span>
                    {currentLang === 'ar' ? 'دخول الخدمة الاستراتيجية' : currentLang === 'zh' ? '进入战略服务大厅' : currentLang === 'ckb' ? 'چوونە ناو خزمەتگوزاری' : 'Access Strategic Service'}
                  </span>
                  <ArrowRight size={16} className="rtl:rotate-180 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 transition-transform duration-200" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default IcaInitiativesPage;
