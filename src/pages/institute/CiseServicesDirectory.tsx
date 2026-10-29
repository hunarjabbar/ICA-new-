import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { useI18n } from '../../hooks/useI18n';
import { 
  Building2, 
  ShieldCheck, 
  Landmark, 
  CreditCard, 
  Scale, 
  Compass, 
  GraduationCap, 
  FileCheck, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  ExternalLink,
  Coins,
  Globe2,
  Calendar,
  Sparkles,
  Search,
  BookOpen,
  Calculator,
  Clock,
  Download,
  X,
  FileText,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function CiseServicesDirectory() {
  const { lang: urlLang } = useParams<{ lang: string }>();
  const normalizedLang = (urlLang === 'ck' || urlLang === 'ku') ? 'ckb' : (urlLang || 'en');
  const lang = (['en', 'ar', 'zh', 'ckb'].includes(normalizedLang) ? normalizedLang : 'en') as Locale;
  const { t } = useI18n(lang);
  const isRtl = lang === 'ar' || lang === 'ckb';

  const [activeCategory, setActiveCategory] = useState<'all' | 'clearing' | 'convening' | 'mobility'>('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Interactive Fee Calculator State
  const [calcService, setCalcService] = useState('clearing');
  const [calcValueUSD, setCalcValueUSD] = useState(250000);
  const [calcCurrency, setCalcCurrency] = useState<'USD' | 'IQD' | 'RMB'>('USD');
  const [calcTier, setCalcTier] = useState<'STANDARD' | 'PRIORITY' | 'SOVEREIGN'>('PRIORITY');

  // Interactive Dossier Tracker State
  const [trackerCode, setTrackerCode] = useState('CISE-DOS-2026-1049');
  const [trackedDossier, setTrackedDossier] = useState<any | null>(null);
  const [trackerLoading, setTrackerLoading] = useState(false);
  const [trackerError, setTrackerError] = useState<string | null>(null);

  // Universal Intake Modal State
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [intakeSubmitted, setIntakeSubmitted] = useState<any | null>(null);
  const [intakeForm, setIntakeForm] = useState({
    serviceId: 'clearing-rail',
    clientName: '',
    applicantEmail: '',
    companyEntity: '',
    jurisdiction: 'Iraq / China Bilateral',
    tier: 'Institutional Priority',
    slaDays: '3',
    transactionValueUSD: '150000',
    contractDetails: ''
  });

  const localizedContent = {
    en: {
      eyebrow: 'Chinese Institute for Strategic and Economic Studies (CISE)',
      title: 'Institutional Services & Bilateral Initiatives',
      subtitle: 'Sovereign clearing rails, institutional risk mitigation, bilateral convening, and specialized academic infrastructure anchored by CISE.',
      filterAll: 'All Initiatives (6)',
      filterClearing: 'Clearing & Risk Coverage (2)',
      filterConvening: 'Convening & Strategic Advisory (2)',
      filterMobility: 'Mobility & Language Instruction (2)',
      searchPlaceholder: 'Filter services by name, sector, or keyword...',
      governanceNote: 'Sovereign Integrity: Every operational service is managed under official bilateral frameworks and regulatory alignment with Iraqi and Chinese authorities.',
      statSovereignClearing: 'Sovereign Clearing Rail',
      statSovereignClearingSub: 'Direct IQD ⇄ RMB (0% USD Drag)',
      statRiskCoverage: 'Sinosure Aligned',
      statRiskCoverageSub: 'Comprehensive Bilateral Coverage',
      statAccredited: 'Accredited Faculty',
      statAccreditedSub: 'Standard HSK 1–9 Curriculum',
      statConvene: 'Annual Convening',
      statConveneSub: '11 Sector Pavilions in Sulaymaniyah'
    },
    ar: {
      eyebrow: 'المعهد الصيني للدراسات الاستراتيجية والاقتصادية (CISE)',
      title: 'الخدمات المؤسسية والمبادرات الثنائية',
      subtitle: 'مسارات المقاصة السيادية، والحد من المخاطر المؤسسية، والملتقيات الثنائية، والبنية التحتية الأكاديمية المتخصصة برعاية المعهد.',
      filterAll: 'جميع المبادرات (٦)',
      filterClearing: 'المقاصة وتغطية المخاطر (٢)',
      filterConvening: 'الملتقيات والاستشارات الاستراتيجية (٢)',
      filterMobility: 'التنقل وتعليم اللغة (٢)',
      searchPlaceholder: 'تصفية الخدمات بالاسم أو القطاع أو الكلمات المفتاحية...',
      governanceNote: 'النزاهة السيادية: تتم إدارة كل خدمة تشغيلية بموجب أطر ثنائية رسمية وتوافق تنظيمي مع السلطات العراقية والصينية.',
      statSovereignClearing: 'مسار مقاصة سيادي',
      statSovereignClearingSub: 'مباشر بالدينار واليوان (بدون احتكاك بالدولار)',
      statRiskCoverage: 'متوافق مع سينوشور',
      statRiskCoverageSub: 'تغطية مخاطر شاملة',
      statAccredited: 'كادر تدريسي معتمد',
      statAccreditedSub: 'منهاج HSK 1–9 القياسي',
      statConvene: 'ملتقى سنوي',
      statConveneSub: '١١ جناحاً قطاعياً في السليمانية'
    },
    zh: {
      eyebrow: '中国战略与经济研究所 (CISE)',
      title: '智库机构服务与双边战略举措',
      subtitle: '由中伊战略研究所（CISE）主导运营的主权清算通道、机构风险对冲、双边高规格峰会与专业语言学术基础设施。',
      filterAll: '全部服务倡议 (6)',
      filterClearing: '清算结算与风险兜底 (2)',
      filterConvening: '双边峰会与战略顾问 (2)',
      filterMobility: '人员流动与语言教学 (2)',
      searchPlaceholder: '输入名称、业务领域或关键词检索服务...',
      governanceNote: '主权权威保障：所有运营服务均在中伊两国官方监管框架及多边协议下合规开展。',
      statSovereignClearing: '主权本币结算通道',
      statSovereignClearingSub: '第纳尔/人民币直通（零美元敞口）',
      statRiskCoverage: '深度对接中国信保',
      statRiskCoverageSub: '买方信贷与主权政治险全覆盖',
      statAccredited: '认证汉语言师资',
      statAccreditedSub: '国际标准化 HSK 1-9 权威考点',
      statConvene: '苏莱曼尼亚年度峰会',
      statConveneSub: '11大国民经济支柱产业展区'
    },
    ckb: {
      eyebrow: 'پەیمانگای چینی بۆ لێکۆڵینەوەی ستراتیژی و ئابووری (CISE)',
      title: 'خزمەتگوزارییە دامەزراوەییەکان و دەستپێشخەرییە دوولایەنەکان',
      subtitle: 'هێڵی پاکتاوی سەروەری دراو، کەمکردنەوەی مەترسی، کۆبوونەوەی دوولایەنە و ژێرخانی ئەکادیمی تایبەتمەند لەژێر چاودێری پەیمانگا.',
      filterAll: 'تەواوی دەستپێشخەرییەکان (٦)',
      filterClearing: 'پاکتاو و داپۆشینی مەترسی (٢)',
      filterConvening: 'کۆبوونەوە و ڕاوێژکاری ستراتیژی (٢)',
      filterMobility: 'هاتوچۆ و فێرکاری زمان (٢)',
      searchPlaceholder: 'فلتەرکردنی خزمەتگوزاری بەپێی ناو، کەرت یان وشەی سەرەکی...',
      governanceNote: 'دەسەڵاتی سەروەری: هەموو خزمەتگوزارییەکان بەپێی ڕێکارە فەرمییەکانی نێوان دەسەڵاتدارانی عێراق و چین بەڕێوەدەبرێن.',
      statSovereignClearing: 'هێڵی پاکتاوی سەروەری',
      statSovereignClearingSub: 'ڕاستەوخۆ دینار ⇄ یوان (بەبێ دۆلار)',
      statRiskCoverage: 'هەماهەنگ لەگەڵ سینۆشوور',
      statRiskCoverageSub: 'داپۆشینی گشتگیری مەترسی بازرگانی',
      statAccredited: 'دەستەی مامۆستایانی باوەڕپێکراو',
      statAccreditedSub: 'پرۆگرامی ستانداردی HSK 1–9',
      statConvene: 'لووتکەی ساڵانە',
      statConveneSub: '١١ باڵیۆزخانەی کەرتی لە سلێمانی'
    }
  };

  const currentCopy = localizedContent[lang] || localizedContent.en;

  const services = [
    {
      id: 'settlement',
      category: 'clearing',
      badge: lang === 'ar' ? 'مسار المقاصة السيادي' : lang === 'zh' ? '主权清算通道' : 'Sovereign Clearing Rail',
      title: lang === 'ar' ? 'مقاصة العملات الثنائية (الدينار العراقي ⇄ اليوان الصيني)' : lang === 'zh' ? '中伊双边本币清算直通通道 (IQD ⇄ RMB)' : 'Bilateral Currency Clearing Rail (IQD ⇄ RMB)',
      description: lang === 'ar' ? 'تحويلات مالية فورية بين المصارف المعتمدة في بغداد وبكين دون الاعتماد على الدولار.' : 'Zero-drag interbank direct settlement linking the Central Bank of Iraq and PBOC/CIPS.',
      route: `/${lang}/institute/settlement`,
      icon: Coins,
      features: ['Direct IQD ⇄ RMB', '0% USD Drag', 'mBridge & CIPS Gateways', 'Instant Qi Card Settlement'],
      deepLinks: [
        { label: 'Settlement Calculator', path: `/${lang}/institute/settlement/calculator` },
        { label: 'Qi Card Issuance', path: `/${lang}/institute/settlement/card` }
      ]
    },
    {
      id: 'insurance',
      category: 'clearing',
      badge: lang === 'ar' ? 'تسهيل التأمين السيادي' : lang === 'zh' ? '主权保险促进' : 'Sovereign Insurance Facilitation',
      title: lang === 'ar' ? 'تغطية ودرء المخاطر مع سينوشور (Sinosure)' : lang === 'zh' ? '中国出口信用保险（信保）对接服务' : 'Sinosure Risk Mitigation & Export Underwriting',
      description: lang === 'ar' ? 'تأمين عقود التجارة الخارجية والاستثمارات الاستراتيجية والمشاريع الصناعية الكبرى.' : 'Export credit insurance, political risk guarantees, and sovereign buyer financing coordination.',
      route: `/${lang}/institute/insurance-facilitation`,
      icon: ShieldCheck,
      features: ['Sinosure Direct Desk', 'Cargo Marine Coverage', 'Buyer Credit Underwriting', 'Sovereign Dispute Escrow'],
      deepLinks: [
        { label: 'Sinosure Desk Details', path: `/${lang}/institute/insurance-facilitation` }
      ]
    },
    {
      id: 'summit',
      category: 'convening',
      badge: lang === 'ar' ? 'الحدث الدبلوماسي الأبرز' : lang === 'zh' ? '旗舰年度峰会' : 'Flagship Annual Summit',
      title: lang === 'ar' ? 'قمة العراق والصين الاقتصادية ومعرض السليمانية' : lang === 'zh' ? '伊拉克—中国经济峰会与苏莱曼尼亚博览会' : 'Iraq-China Economic Summit & Bilateral Expo',
      description: lang === 'ar' ? 'ملتقى سنوي استراتيجي يجمع الوزراء ورجال الأعمال في ١١ جناحاً قطاعياً.' : 'The premier G2G and B2B bilateral platform featuring 11 industry pavilions and deal rooms.',
      route: `/${lang}/summit`,
      icon: Landmark,
      features: ['11 Sector Pavilions', '3D Interactive Floorplan', 'VIP Protocol Accreditations', '$3.5B+ Target Deals'],
      deepLinks: [
        { label: '3D Floor Plan', path: `/${lang}/summit/floor-plan` },
        { label: '3-Day Agenda', path: `/${lang}/summit/agenda` },
        { label: 'VIP Registration', path: `/${lang}/summit/register/vip` }
      ]
    },
    {
      id: 'advisory',
      category: 'convening',
      badge: lang === 'ar' ? 'الاستشارات السيادية' : lang === 'zh' ? '主权战略咨询' : 'Sovereign Advisory',
      title: lang === 'ar' ? 'المكتب الاستشاري للاستثمار والامتثال التنظيمي' : lang === 'zh' ? '双边投资准入与监管合规咨询' : 'Strategic Bilateral Investment & Regulatory Advisory',
      description: lang === 'ar' ? 'دراسات جدوى استراتيجية، صياغة اتفاقيات الشراكة، وتيسير الموافقات السيادية.' : 'Feasibility assessments, legal escrow, and regulatory compliance for major BRI projects.',
      route: `/${lang}/institute/partnerships`,
      icon: Compass,
      features: ['Regulatory Pre-Clearance', 'Feasibility Studies', 'Bilateral Tax Guidance', 'JV Drafting Support'],
      deepLinks: [
        { label: 'Consultancy Inquiries', path: `/${lang}/consultancy/inquiry` }
      ]
    },
    {
      id: 'visas',
      category: 'mobility',
      badge: lang === 'ar' ? 'التنقل والدبلوماسية' : lang === 'zh' ? '快速签证服务' : 'Fast-Track Mobility',
      title: lang === 'ar' ? 'مركز التأشيرات الدبلوماسية والتجارية السريعة' : lang === 'zh' ? '中伊外交与商务代表团加急签证服务中心' : 'Diplomatic & Business Fast-Track Visa Centre',
      description: lang === 'ar' ? 'تنسيق التأشيرات الرسمية والرحلات الجوية المباشرة بين المدن العراقية والصينية.' : 'Direct consular dispatch, express business visas, and direct flight corridor booking.',
      route: `/${lang}/institute/services/visa-centre`,
      icon: CreditCard,
      features: ['Express E-Visa Courier', 'Airport Protocol Escorts', 'Direct Aviation Corridors', 'Consular Tracking'],
      deepLinks: [
        { label: 'Visa Centre Portal', path: `/${lang}/institute/services/visa-centre` }
      ]
    },
    {
      id: 'academy',
      category: 'mobility',
      badge: lang === 'ar' ? 'التبادل الأكاديمي واللغوي' : lang === 'zh' ? '语言学术桥梁' : 'Academic Academy',
      title: lang === 'ar' ? 'أكاديمية تعليم اللغة الصينية (HSK) والتبادل الثقافي' : lang === 'zh' ? '国际汉语言教学中心与中伊文化交流项目' : 'Chinese Language Academy (HSK 1-9) & Cultural Exchange',
      description: lang === 'ar' ? 'برامج أكاديمية معتمدة لدراسة اللغة الصينية وإعداد الكوادر الدبلوماسية والتجارية.' : 'Standardized HSK courses, diplomatic fellowship exchanges, and certified translation.',
      route: `/${lang}/institute/services/cultural-exchange`,
      icon: GraduationCap,
      features: ['HSK 1-9 Authorized Tests', 'Diplomatic Language Training', 'Scholarship Placements', 'Corporate Cohorts'],
      deepLinks: [
        { label: 'Language Center', path: `/${lang}/institute/services/cultural-exchange` }
      ]
    }
  ];

  // Dynamic Fee Calculation
  const calculateEstimatedFee = () => {
    let rate = 0.0035; // base 0.35%
    let base = 850;
    if (calcService === 'insurance') { rate = 0.0065; base = 1500; }
    if (calcService === 'advisory') { rate = 0.0050; base = 2400; }
    if (calcService === 'visas') { rate = 0.0010; base = 350; }
    if (calcService === 'academy') { rate = 0.0005; base = 650; }

    let tierMultiplier = calcTier === 'STANDARD' ? 1.0 : calcTier === 'PRIORITY' ? 1.25 : 1.6;
    let feeUSD = Math.round((base + calcValueUSD * rate) * tierMultiplier);

    if (calcCurrency === 'IQD') return Math.round(feeUSD * 1310);
    if (calcCurrency === 'RMB') return Math.round(feeUSD * 7.2);
    return feeUSD;
  };

  const handleTrackDossier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackerCode.trim()) return;
    setTrackerLoading(true);
    setTrackerError(null);
    try {
      const res = await fetch(`/api/services/dossiers/${encodeURIComponent(trackerCode.trim())}`);
      const data = await res.json();
      if (res.ok && data.dossier) {
        setTrackedDossier(data.dossier);
      } else {
        setTrackerError(data.error || 'Dossier not found in the sovereign registry.');
        setTrackedDossier(null);
      }
    } catch (err: any) {
      setTrackerError(err.message || 'Network error looking up dossier.');
    } finally {
      setTrackerLoading(false);
    }
  };

  const handleIntakeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/services/dossiers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(intakeForm)
      });
      const data = await res.json();
      if (data.success) {
        setIntakeSubmitted(data.dossier);
        setTrackedDossier(data.dossier);
        setTrackerCode(data.dossier.code);
      }
    } catch (err) {
      console.error('Intake submission error:', err);
    }
  };

  const filteredServices = services.filter(srv => {
    if (activeCategory !== 'all' && srv.category !== activeCategory) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return srv.title.toLowerCase().includes(q) || srv.description.toLowerCase().includes(q) || srv.badge.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Sovereign Red & White Header Hero */}
      <section className="bg-red-600 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-red-700 shadow-md">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-100">
            <span className="bg-white/20 px-3 py-1 rounded-full text-white font-black">{currentCopy.eyebrow}</span>
            <span>·</span>
            <span>6 Sovereign Bilateral Pillars</span>
          </div>

          <div className="space-y-2 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
              {currentCopy.title}
            </h1>
            <p className="text-base sm:text-lg text-red-100 leading-relaxed max-w-3xl">
              {currentCopy.subtitle}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-red-500/50">
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/20">
              <span className="text-xs text-red-200 block font-bold">{currentCopy.statSovereignClearing}</span>
              <span className="text-sm font-black text-white mt-1 block">{currentCopy.statSovereignClearingSub}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/20">
              <span className="text-xs text-red-200 block font-bold">{currentCopy.statRiskCoverage}</span>
              <span className="text-sm font-black text-white mt-1 block">{currentCopy.statRiskCoverageSub}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/20">
              <span className="text-xs text-red-200 block font-bold">{currentCopy.statAccredited}</span>
              <span className="text-sm font-black text-white mt-1 block">{currentCopy.statAccreditedSub}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/20">
              <span className="text-xs text-red-200 block font-bold">{currentCopy.statConvene}</span>
              <span className="text-sm font-black text-white mt-1 block">{currentCopy.statConveneSub}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* SECTION 1: INTERACTIVE SERVICES MATRIX */}
        <section className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar">
              {[
                { id: 'all', label: currentCopy.filterAll },
                { id: 'clearing', label: currentCopy.filterClearing },
                { id: 'convening', label: currentCopy.filterConvening },
                { id: 'mobility', label: currentCopy.filterMobility },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-red-600 text-white shadow-xs font-black'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input & Action Button */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={e => setSearchFilter(e.target.value)}
                  placeholder={currentCopy.searchPlaceholder}
                  className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden"
                />
              </div>

              <button
                onClick={() => setIsIntakeOpen(true)}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider shrink-0 transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>Submit Intake</span>
              </button>
            </div>
          </div>

          {/* Service Cards Grid: Clean White Cards with Red Accents */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(srv => (
              <div
                key={srv.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-red-600 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <srv.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-50 px-2.5 py-1 rounded-md">
                      {srv.badge}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-red-600 transition-colors leading-snug">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>

                  {/* Feature Checkpoints */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                    {srv.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link
                    to={srv.route}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <span>Explore Pillar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {srv.deepLinks && srv.deepLinks.length > 0 && (
                    <Link
                      to={srv.deepLinks[0].path}
                      className="text-xs font-bold text-red-600 hover:underline"
                    >
                      {srv.deepLinks[0].label}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: DYNAMIC MULTI-CURRENCY FEE CALCULATOR & LIVE DOSSIER TRACKER */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Dynamic Fee Calculator */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-50 text-red-600">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-red-600 block">
                  Transparency Ledger Engine
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Dynamic Statutory Fee Estimator
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              {/* Select Service */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Target CISE Service</label>
                <select
                  value={calcService}
                  onChange={e => setCalcService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden font-medium"
                >
                  <option value="clearing">Sovereign Clearing Rail (IQD ⇄ RMB)</option>
                  <option value="insurance">Sinosure Strategic Risk Mitigation</option>
                  <option value="advisory">Bilateral Investment & Regulatory Advisory</option>
                  <option value="visas">Diplomatic Fast-Track Consular Courier</option>
                  <option value="academy">Chinese Language Academy (HSK 1-9 Cohort)</option>
                </select>
              </div>

              {/* Slider for Transaction / Project Value */}
              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>Contract or Transaction Value:</span>
                  <span className="text-red-600 font-mono font-black">${calcValueUSD.toLocaleString()} USD</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="5000000"
                  step="20000"
                  value={calcValueUSD}
                  onChange={e => setCalcValueUSD(Number(e.target.value))}
                  className="w-full accent-red-600"
                />
              </div>

              {/* Currency & Tier Toggles */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Display Currency</label>
                  <div className="flex rounded-xl bg-slate-100 p-1">
                    {(['USD', 'IQD', 'RMB'] as const).map(curr => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => setCalcCurrency(curr)}
                        className={`flex-1 py-1.5 rounded-lg font-black text-xs transition-all ${
                          calcCurrency === curr
                            ? 'bg-white text-red-600 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Processing SLA Tier</label>
                  <select
                    value={calcTier}
                    onChange={e => setCalcTier(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden font-medium"
                  >
                    <option value="STANDARD">Standard Protocol (5-7 Days)</option>
                    <option value="PRIORITY">Priority Clearance (2-3 Days)</option>
                    <option value="SOVEREIGN">Sovereign Direct (24 Hours)</option>
                  </select>
                </div>
              </div>

              {/* Calculation Output Box */}
              <div className="p-5 rounded-2xl bg-red-50 border border-red-200 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-red-700 block">
                  Estimated Statutory Fee ({calcTier})
                </span>
                <div className="text-3xl font-black text-red-600 tabular-nums">
                  {calcCurrency === 'USD' && `$${calculateEstimatedFee().toLocaleString()}`}
                  {calcCurrency === 'IQD' && `د.ع ${calculateEstimatedFee().toLocaleString()}`}
                  {calcCurrency === 'RMB' && `¥ ${calculateEstimatedFee().toLocaleString()}`}
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Includes regulatory interbank clearance, consular filing, and Sinosure pre-underwriting audit. No hidden brokerage drag.
                </p>
              </div>

              <button
                onClick={() => {
                  setIntakeForm(prev => ({
                    ...prev,
                    serviceId: calcService,
                    transactionValueUSD: String(calcValueUSD),
                    tier: calcTier
                  }));
                  setIsIntakeOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
              >
                Lock Quote & Submit Formal Application
              </button>
            </div>
          </div>

          {/* Live Dossier Tracker Engine */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-50 text-red-600">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-600 block">
                    Public Sovereign Ledger
                  </span>
                  <h3 className="text-xl font-black text-slate-900">
                    Live Service Dossier Tracker
                  </h3>
                </div>
              </div>

              {/* Search Form */}
              <form onSubmit={handleTrackDossier} className="flex items-center gap-2">
                <input
                  type="text"
                  value={trackerCode}
                  onChange={e => setTrackerCode(e.target.value)}
                  placeholder="Enter Dossier Code (e.g. CISE-DOS-2026-1049)"
                  className="flex-1 px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden font-mono"
                />
                <button
                  type="submit"
                  disabled={trackerLoading}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-all shadow-xs cursor-pointer"
                >
                  {trackerLoading ? 'Checking...' : 'Track'}
                </button>
              </form>

              {trackerError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{trackerError}</span>
                </div>
              )}

              {/* Tracked Dossier Lifecycle Card */}
              {trackedDossier && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                    <div>
                      <span className="font-mono font-black text-red-600 text-sm block">
                        {trackedDossier.code}
                      </span>
                      <span className="font-bold text-slate-900 text-xs block mt-0.5">
                        {trackedDossier.clientName}
                      </span>
                    </div>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-red-100 text-red-800">
                      {trackedDossier.stage}
                    </span>
                  </div>

                  {/* 5-Stage Visual Progress Bar */}
                  <div className="space-y-3">
                    {trackedDossier.stages && trackedDossier.stages.map((st: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 text-xs">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          st.done 
                            ? 'bg-red-600 text-white' 
                            : 'bg-slate-200 text-slate-400'
                        }`}>
                          {st.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className={`font-bold ${st.done ? 'text-slate-900' : 'text-slate-500'}`}>
                              {st.name}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">{st.date}</span>
                          </div>
                          <p className="text-[11px] text-slate-500">{st.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-[11px] text-slate-500">
                    <span>Assigned Officer: <strong className="text-slate-800">{trackedDossier.assignedOfficer}</strong></span>
                    <button
                      onClick={() => window.print()}
                      className="text-red-600 font-bold hover:underline flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Export Summary</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-red-600 shrink-0" />
              <span>Dossiers are immutably logged on the CISE Command Hub ledger.</span>
            </div>
          </div>
        </section>

      </div>

      {/* UNIVERSAL INTAKE MODAL */}
      {isIntakeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-red-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => { setIsIntakeOpen(false); setIntakeSubmitted(null); }}
              className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {intakeSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Official Dossier Registered</h3>
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 max-w-sm mx-auto text-xs space-y-1">
                  <span className="text-slate-500 font-bold block">Your Tracking Code:</span>
                  <span className="font-mono text-base font-black text-red-600 block">{intakeSubmitted.code}</span>
                  <span className="text-slate-500 text-[11px]">Forwarded to CISE Directorate for immediate review.</span>
                </div>
                <button
                  onClick={() => { setIsIntakeOpen(false); setIntakeSubmitted(null); }}
                  className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-red-700"
                >
                  Close & View in Tracker
                </button>
              </div>
            ) : (
              <form onSubmit={handleIntakeSubmit} className="space-y-4 text-xs">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-600 block">
                    Bilateral Institutional Intake
                  </span>
                  <h3 className="text-xl font-black text-slate-900">
                    Submit CISE Service Dossier
                  </h3>
                  <p className="text-slate-500 text-xs">
                    Direct filing with the Chinese Institute for Strategic and Economic Studies.
                  </p>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Service</label>
                  <select
                    value={intakeForm.serviceId}
                    onChange={e => setIntakeForm({ ...intakeForm, serviceId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden font-medium"
                  >
                    <option value="clearing-rail">Sovereign Bilateral Clearing Rail (IQD ⇄ RMB)</option>
                    <option value="sinosure-coverage">Sinosure Strategic Risk Mitigation</option>
                    <option value="sourcing-verification">Bilateral Sourcing & Factory Inspection</option>
                    <option value="visa-consular">Diplomatic & Business Fast-Track Visa Centre</option>
                    <option value="academic-fellowship">Chinese Language Academy (HSK) & Fellowships</option>
                    <option value="sovereign-consultancy">Strategic Bilateral Advisory & Regulatory Desk</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Applicant / Officer Full Name</label>
                    <input
                      type="text"
                      required
                      value={intakeForm.clientName}
                      onChange={e => setIntakeForm({ ...intakeForm, clientName: e.target.value })}
                      placeholder="e.g. Tariq Al-Hashemi"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Official Corporate Email</label>
                    <input
                      type="email"
                      required
                      value={intakeForm.applicantEmail}
                      onChange={e => setIntakeForm({ ...intakeForm, applicantEmail: e.target.value })}
                      placeholder="trade@enterprise.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Entity / Company Name</label>
                    <input
                      type="text"
                      value={intakeForm.companyEntity}
                      onChange={e => setIntakeForm({ ...intakeForm, companyEntity: e.target.value })}
                      placeholder="e.g. Al-Mansour Machinery Ltd."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Estimated Value (USD)</label>
                    <input
                      type="number"
                      value={intakeForm.transactionValueUSD}
                      onChange={e => setIntakeForm({ ...intakeForm, transactionValueUSD: e.target.value })}
                      placeholder="100000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Scope & Contract Details</label>
                  <textarea
                    rows={3}
                    value={intakeForm.contractDetails}
                    onChange={e => setIntakeForm({ ...intakeForm, contractDetails: e.target.value })}
                    placeholder="Provide contract references, port of entry, or requested SLA..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsIntakeOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all"
                  >
                    Submit Official Dossier
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
