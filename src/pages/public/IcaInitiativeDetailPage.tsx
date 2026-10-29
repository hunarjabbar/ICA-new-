import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  Building2, 
  Globe, 
  BookOpen, 
  Database, 
  Coins, 
  FileCheck 
} from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

interface SynchronizedCiseLink {
  badge: Record<string, string>;
  title: Record<string, string>;
  description: Record<string, string>;
  href: string;
  ctaText: Record<string, string>;
}

const synchronizedCiseLinks: Record<string, SynchronizedCiseLink> = {
  'energy-infrastructure': {
    badge: {
      en: 'CISE BRI PROJECTS',
      ar: 'مشاريع الحزام والطريق CISE',
      zh: 'CISE 一带一路重点项目',
      ckb: 'پڕۆژەکانی پشتێن و ڕێگای CISE'
    },
    title: {
      en: 'CISE Belt & Road Infrastructure Tracker & Project Registry',
      ar: 'مرصد وسجل مشاريع البنية التحتية لمبادرة الحزام والطريق بمعهد CISE',
      zh: 'CISE 一带一路基础设施工程跟踪与重点项目数据库',
      ckb: 'چاودێری و تۆماری پڕۆژەکانی ژێرخانی پشتێن و ڕێگا لە پەیمانگای CISE'
    },
    description: {
      en: 'Audited sovereign infrastructure dossier tracking power generation, oil & gas modernizations, solar megaplexes, and Chinese EPC contractor guarantees.',
      ar: 'ملف بنية تحتية سيادي موثق يرصد توليد الطاقة، وتحديثات النفط والغاز، ومجمعات الطاقة الشمسية، وضمانات المقاولين الصينيين.',
      zh: '经主权双重核验的重点基础设施工程档案，全面覆盖电力扩容、油气现代工程、大型光伏电站与中资承包商履约担保。',
      ckb: 'دۆسیەی ژێرخانی سەروەری بۆ چاودێری پڕۆژەکانی بەرهەمهێنانی وزە، نەوت و گاز و وزەی خۆر بە گەرەنتی کۆمپانیاکانی چین.'
    },
    href: '/institute/data-hub/projects',
    ctaText: {
      en: 'Access CISE Projects Registry',
      ar: 'دخول سجل مشاريع معهد CISE',
      zh: '查阅 CISE 重点工程项目库',
      ckb: 'چوونەژوورەوەی تۆماری پڕۆژەکانی CISE'
    }
  },
  'sovereign-settlement': {
    badge: {
      en: 'SETTLEMENT GATEWAY',
      ar: 'بوابة التسوية السيادية',
      zh: '主权本币结算网关',
      ckb: 'دەروازەی پاکتاوی سەروەری'
    },
    title: {
      en: 'Bilateral Dinar-eCNY Currency Settlement & Clearing Platform',
      ar: 'منصة تسوية ومقاصة العملات الثنائية (الدينار العراقي واليوان الرقمي)',
      zh: '中伊第纳尔与数字人民币双边本币清算与结算服务总台',
      ckb: 'پلاتفۆرمی پاکتاو و یەکلاکردنەوەی دراوی دوولایەنە (دینار و یوان)'
    },
    description: {
      en: 'Direct inter-bank liquidity channels, real-time FX currency calculator, and trade compliance clearance operated under Central Bank oversight.',
      ar: 'قنوات سيولة مصرفية مباشرة، وحاسبة فورية لأسعار الصرف، ومقاصة امتثال تجاري تحت إشراف البنك المركزي.',
      zh: '直连央行监管的双边银行间流动性走廊、实时本币汇率计算器与大宗贸易合规结算专用通道。',
      ckb: 'کەناڵی ڕاستەوخۆی نەختینەی بانکی، هەژمارکەری کاتی ڕاستەقینەی دراو، و پاکتاوی بازرگانی لەژێر چاودێری بانکی ناوەندی.'
    },
    href: '/institute/settlement',
    ctaText: {
      en: 'Launch Settlement Gateway',
      ar: 'تشغيل بوابة التسوية والمقاصة',
      zh: '进入本币清算服务网关',
      ckb: 'دەستپێکردنی دەروازەی پاکتاو'
    }
  },
  'academic-exchange': {
    badge: {
      en: 'CHINESE CENTRE',
      ar: 'مركز اللغة الصينية بمعهد CISE',
      zh: 'CISE 中国语言学习中心',
      ckb: 'ناوەندی زمانی چینی CISE'
    },
    title: {
      en: 'CISE Chinese Language Learning & Testing Centre',
      ar: 'مركز تعليم واختبارات اللغة الصينية المعتمد بمعهد CISE',
      zh: 'CISE 汉语言教学研究中心与国际标准化 HSK 考级认证处',
      ckb: 'ناوەندی فێربوون و تاقیکردنەوەی زمانی چینی لە پەیمانگای CISE'
    },
    description: {
      en: 'Accredited HSK 1–6 language tracks, executive business cohorts, certified instructor directories, and full academic scholarship pathways.',
      ar: 'مسارات HSK 1-6 المعتمدة، ودورات لغة الأعمال التنفيذية، ودليل الأساتذة المعتمدين، ومنح التبادل الأكاديمي الشاملة.',
      zh: '覆盖 HSK 1-6 级官方课程体系、商务汉语研修班、资深母语师资名录与全额公派留学奖学金申请渠道。',
      ckb: 'پڕۆگرامی باوەڕپێکراوی HSK، خولی چینی بازرگانی، ڕێبەری مامۆستایان، و دەرفەتی خوێندنی باڵا لە چین.'
    },
    href: '/institute/chinese-center',
    ctaText: {
      en: 'Explore Chinese Language Centre',
      ar: 'استكشاف مركز اللغة الصينية',
      zh: '访问中国语言文化中心',
      ckb: 'گەڕان لە ناوەندی زمانی چینی'
    }
  },
  'visa-consular': {
    badge: {
      en: 'VISA CENTRE',
      ar: 'مركز التأشيرات الثنائي CISE',
      zh: 'CISE 双向签证与领事中心',
      ckb: 'ناوەندی ڤیزای دوولایەنەی CISE'
    },
    title: {
      en: 'CISE Bilateral Visa Facilitation & Consular Centre',
      ar: 'مركز التيسير القنصلي والتأشيرات الثنائية بمعهد CISE',
      zh: 'CISE 中伊双向签证便利化服务中心与领事业务协办总台',
      ckb: 'ناوەندی ئاسانکاری ڤیزا و کاروباری کونسوڵی لە پەیمانگای CISE'
    },
    description: {
      en: 'Expedited commercial, diplomatic, student, and tourist entry visas with biometrics processing, fee schedules, and real-time status tracker.',
      ar: 'تأشيرات تجارية ودبلوماسية ودراسية وسياحية سريعة مع معالجة البصمات، وجداول الرسوم، وتتبع المعاملات الفوري.',
      zh: '支持商务考察、外交礼遇、留学深造与文化旅游签证快速审理，配备生物识别预约与全流程办证进度查询。',
      ckb: 'پێدانی ڤیزای بازرگانی، دیپلۆماسی، خوێندن و گەشتیاری بە سیستەمی بایۆمەتری و چاودێری خێرای دۆسیە.'
    },
    href: '/institute/visa-centre',
    ctaText: {
      en: 'Access Bilateral Visa Centre',
      ar: 'دخول مركز التأشيرات الثنائي',
      zh: '前往签证服务便利大厅',
      ckb: 'چوونە ناوەندی ڤیزای دوولایەنە'
    }
  },
  'trade-corridor': {
    badge: {
      en: 'TRADE CORRIDOR',
      ar: 'ممر التجارة الدولي',
      zh: '中伊战略贸易走廊',
      ckb: 'ڕێڕەوی بازرگانی نێودەوڵەتی'
    },
    title: {
      en: 'CISE Trade Corridor Tracker & Faw Port Maritime Explorer',
      ar: 'مرصد ممر التجارة ومستكشف الملاحة لميناء الفاو الكبير بمعهد CISE',
      zh: 'CISE 贸易走廊跟踪系统与大法奥港海陆联运调度大屏',
      ckb: 'چاودێری ڕێڕەوی بازرگانی و کەشتیوانی بەندەری فاو لە CISE'
    },
    description: {
      en: 'Intermodal freight transit monitoring linking the Persian Gulf through dry canal railways, customs bonded zones, and real-time tariff analytics.',
      ar: 'متابعة الشحن متعدد الوسائط الرابط بين الخليج العربي وسكك القناة الجافة والمناطق الحرة مع تحليلات التعرفة الجمركية.',
      zh: '实时监控连接波斯湾海运、干线旱港铁路通道与保税物流园的多式联运走廊，提供进出口关税宏观分析。',
      ckb: 'چاودێری گواستنەوەی کەلوپەل لە کەنداوەوە بە هێڵی ئاسن و ناوچەی ئازادی گومرگی بە شیکاری وردی باج.'
    },
    href: '/institute/data-hub/corridor',
    ctaText: {
      en: 'Open Trade Corridor Tracker',
      ar: 'فتح مرصد ممر التجارة',
      zh: '启动贸易走廊监测系统',
      ckb: 'کردنەوەی چاودێری ڕێڕەوی بازرگانی'
    }
  },
  'women-diplomacy': {
    badge: {
      en: 'CISE PARTNERSHIPS',
      ar: 'شراكات معهد CISE',
      zh: 'CISE 智库全球伙伴网络',
      ckb: 'هاوبەشییەکانی پەیمانگای CISE'
    },
    title: {
      en: 'CISE Strategic Partnerships & Bilateral Fellowship Directory',
      ar: 'دليل الشراكات الاستراتيجية وزمالات البحث الثنائي بمعهد CISE',
      zh: 'CISE 智库战略合作网络与特聘访问学者名录',
      ckb: 'تۆڕی هاوبەشییە ستراتیژییەکان و ڕێبەری توێژەرانی پەیمانگای CISE'
    },
    description: {
      en: 'Official bilateral working groups, academic fellowships, corporate partnerships, and diplomatic syndication dossiers across Beijing and Baghdad.',
      ar: 'مجموعات عمل ثنائية رسمية، وزمالات أكاديمية، وشراكات مؤسسية، وملفات تمثيل دبلوماسي مشترك بين بغداد وبكين.',
      zh: '常设双边专业工作组、联合客座研究员机制、企业级战略同盟与涵盖京巴两地的高端外交协同网络。',
      ckb: 'گرووپی کاری هاوبەشی فەرمی، هاوبەشی ئەکادیمی، و دۆسیەی دیپلۆماسی لەنێوان بەغدا و پەکین.'
    },
    href: '/institute/partnerships',
    ctaText: {
      en: 'Explore CISE Partnerships',
      ar: 'استكشاف شراكات معهد CISE',
      zh: '查看智库合作伙伴名录',
      ckb: 'گەڕان لە هاوبەشییەکانی CISE'
    }
  },
  'tech-ai-innovation': {
    badge: {
      en: 'CISE DATA HUB',
      ar: 'مركز بيانات CISE الاستراتيجي',
      zh: 'CISE 宏观战略智能数据中枢',
      ckb: 'ناوەندی داتای زیرەکی CISE'
    },
    title: {
      en: 'CISE Strategic Data Hub & Macroeconomic Intelligence Desk',
      ar: 'مركز بيانات معهد CISE ومكتب الاستخبارات الاقتصادية الكلية',
      zh: 'CISE 宏观经济与战略态势数据中心',
      ckb: 'ناوەندی داتای ستراتیژی و ژیری ئابووری لە CISE'
    },
    description: {
      en: 'High-frequency bilateral economic indicators, trade flow matrices, commodities series, and verifiable intelligence data feeds.',
      ar: 'مؤشرات اقتصادية ثنائية عالية التردد، ومصفوفات تدفق التجارة، وسلاسل أسعار السلع، وموجزات البيانات الموثقة.',
      zh: '高频双边宏观经济景气指数、进出口商品结构图谱与全口径主权经贸数据开放端口。',
      ckb: 'نیشاندەرە ئابوورییە باڵاکان، نەخشەی جوڵەی بازرگانی و داتای پشتڕاستکراوی ئابووری.'
    },
    href: '/institute/data-hub',
    ctaText: {
      en: 'Launch CISE Data Hub',
      ar: 'تشغيل مركز بيانات CISE',
      zh: '进入 CISE 数据大屏',
      ckb: 'دەستپێکردنی ناوەندی داتای CISE'
    }
  }
};

export function IcaInitiativeDetailPage() {
  const { lang = 'en', slug, id } = useParams<{ lang: string; slug?: string; id?: string }>();
  const location = useLocation();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const targetIdentifier = slug || id;
  const initiative = portalStore.getInitiatives().find(
    i => i.slug === targetIdentifier || i.id === targetIdentifier
  );

  if (!initiative) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Initiative Not Found</h2>
        <Link to={`/${currentLang}/initiatives`} className="text-[var(--color-brand-800)] font-bold underline">
          Return to Initiatives
        </Link>
      </div>
    );
  }

  const ciseLink = synchronizedCiseLinks[initiative.slug];
  let ciseLinkHref = ciseLink?.href;
  if (ciseLinkHref && (ciseLinkHref.includes('/chinese-center') || ciseLinkHref.includes('/chinese-centre'))) {
    const currentDialect = location.pathname.includes('chinese-center') ? 'chinese-center' : 'chinese-centre';
    ciseLinkHref = ciseLinkHref.replace(/chinese-cent(er|re)/, currentDialect);
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={`/${currentLang}/initiatives`}
          className="ica-kicker inline-flex items-center gap-2 mb-6 hover:underline"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          <span>Back to All Initiatives</span>
        </Link>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-black text-white mb-12 shadow-2xl border border-neutral-800">
          <div className="aspect-[21/9] w-full relative">
            <img
              src={initiative.imageUrl}
              alt={initiative.title[currentLang] || initiative.title.en}
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0"></div>
          </div>

          <div className="absolute bottom-0 inset-inline-0 p-6 sm:p-10">
            <div className="ica-kicker inline-block px-3 py-1 rounded bg-[var(--color-brand-800)] text-white mb-3">
              SOVEREIGN STRATEGIC PILLAR
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-black text-white leading-tight">
              {initiative.title[currentLang] || initiative.title.en}
            </h1>
          </div>
        </div>

        {/* Body Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#000000] mb-4">
                Mandate & Strategic Scope
              </h2>
              <p className="text-base text-[#4B5563] leading-relaxed">
                {initiative.fullDesc[currentLang] || initiative.fullDesc.en}
              </p>
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold text-[#000000] mb-3">
                Key Performance Indicators & Allocations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {initiative.kpis.map((kpi, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                    <div className="text-xl font-mono font-black text-[var(--color-brand-800)] mb-1">
                      {kpi.metric}
                    </div>
                    <div className="text-xs text-[#4B5563] font-medium">
                      {kpi.label[currentLang] || kpi.label.en}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Synchronized CISE Institute Pillar Cross-Link */}
            {ciseLink && (
              <div className="ica-card-interactive p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[var(--color-brand-800)] transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FEE2E2] text-[var(--color-brand-800)] flex items-center justify-center shrink-0">
                    <Building2 size={16} />
                  </div>
                  <span className="text-[10px] font-mono font-black text-[var(--color-brand-800)] uppercase tracking-widest">
                    {ciseLink.badge[currentLang] || ciseLink.badge.en}
                  </span>
                </div>
                <h4 className="font-serif text-lg font-black text-[#000000] mb-2">
                  {ciseLink.title[currentLang] || ciseLink.title.en}
                </h4>
                <p className="text-xs text-[#4B5563] leading-relaxed mb-5">
                  {ciseLink.description[currentLang] || ciseLink.description.en}
                </p>
                <Link
                  to={`/${currentLang}${ciseLinkHref}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-brand-800)] hover:bg-[#991B1B] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                >
                  <span>{ciseLink.ctaText[currentLang] || ciseLink.ctaText.en}</span>
                  <ArrowRight size={14} className="rtl:rotate-180 cta-arrow transition-transform" />
                </Link>
              </div>
            )}

            <div className="p-6 rounded-2xl bg-[#FEE2E2] border border-[var(--color-brand-800)]/20 text-[#991B1B]">
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                <ShieldCheck size={18} />
                <span>Inter-Governmental Regulatory Oversight</span>
              </div>
              <p className="text-xs text-[#991B1B]/80 leading-relaxed">
                This initiative operates under official bilateral instruments ratified by the Iraqi General Secretariat and the Ministry of Commerce of the PRC. All contracts adhere to sovereign clearing standards.
              </p>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-4 text-xs">
              <h4 className="font-black text-sm uppercase tracking-wider text-[#000000] border-b border-[#E5E7EB] pb-3">
                Initiative Dossier
              </h4>
              <div>
                <span className="text-[#4B5563] block">Status:</span>
                <span className="font-mono font-bold text-[var(--color-brand-800)] uppercase">
                  {initiative.status}
                </span>
              </div>
              <div>
                <span className="text-[#4B5563] block">Primary Stakeholders:</span>
                <span className="font-medium text-[#000000] leading-snug block mt-1">
                  {initiative.targetAudience[currentLang] || initiative.targetAudience.en}
                </span>
              </div>

              {ciseLink && (
                <div className="pt-2 border-t border-[#E5E7EB]">
                  <span className="text-[#4B5563] block mb-1">CISE Governance Arm:</span>
                  <Link
                    to={`/${currentLang}${ciseLinkHref}`}
                    className="text-xs font-bold text-[var(--color-brand-800)] hover:underline inline-flex items-center gap-1"
                  >
                    <span>{ciseLink.badge[currentLang] || ciseLink.badge.en}</span>
                    <ExternalLink size={12} />
                  </Link>
                </div>
              )}

              <div className="pt-2">
                <Link
                  to={`/${currentLang}/contact`}
                  className="w-full block text-center py-3 rounded-xl bg-[var(--color-brand-800)] text-white font-bold uppercase tracking-wider hover:bg-[#A00D26] transition-colors"
                >
                  Contact Initiative Desk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IcaInitiativeDetailPage;
