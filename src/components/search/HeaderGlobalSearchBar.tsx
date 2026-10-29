import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, X, ChevronRight, Newspaper, Radio, CreditCard, 
  Calendar, Briefcase, Building2, Flame, Globe2, Sparkles, 
  ArrowRight, Landmark, ShieldCheck, FileCheck, Layers, 
  GraduationCap, BookOpen, Database, Calculator, Compass,
  SlidersHorizontal, Check
} from 'lucide-react';
import { Locale } from '../../types';
import { portalStore } from '../../data/portalData';

export type SearchCategory = 'all' | 'services' | 'summit' | 'settlement' | 'news' | 'portals';

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: SearchCategory;
  categoryLabel: string;
  url: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  tag?: string;
  badge?: string;
}

export interface HeaderGlobalSearchBarProps {
  lang: Locale;
  className?: string;
  variant?: 'bar' | 'trigger';
  placeholder?: string;
  buttonLabel?: string;
  onSelectResult?: (item: SearchResultItem) => void;
}

export function HeaderGlobalSearchBar({ 
  lang, 
  className = '', 
  variant = 'bar',
  placeholder,
  buttonLabel,
  onSelectResult
}: HeaderGlobalSearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const currentDialect = location.pathname.includes('chinese-center') ? 'chinese-center' : 'chinese-centre';

  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';
  const isRtl = isAr || isCkb;

  // Global event listener for Cmd+K / Ctrl+K and open-header-search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is actively typing in a form input/textarea outside search
      const target = e.target as HTMLElement | null;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      const isSearchInput = target === inputRef.current || target === modalInputRef.current;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('close-header-notifications'));
        setIsOpen(true);
      } else if (e.key === '/' && !isInput) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
        inputRef.current?.blur();
        modalInputRef.current?.blur();
      }
    };

    const handleOpenSearch = () => {
      setIsOpen(true);
    };

    const handleCloseSearch = () => {
      setIsOpen(false);
    };

    window.addEventListener('open-header-search', handleOpenSearch);
    window.addEventListener('close-header-search', handleCloseSearch);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('open-header-search', handleOpenSearch);
      window.removeEventListener('close-header-search', handleCloseSearch);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (variant === 'trigger') {
          modalInputRef.current?.focus();
        } else {
          inputRef.current?.focus();
        }
      }, 50);
    }
  }, [isOpen, variant]);

  // Close dropdown when clicking outside (in bar variant)
  useEffect(() => {
    if (variant === 'trigger') return; // Modal handles its own backdrop click

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [variant]);

  // Static Portals & Projects Index (Authoritative Unified Directory)
  const staticIndex: SearchResultItem[] = useMemo(() => [
    // --- CISE SOVEREIGN SERVICES ---
    {
      id: 'cise-services-directory',
      title: isAr ? 'دليل خدمات معهد CISE السيادي' : isZh ? '中伊战略研究所（CISE）主权服务总览' : isCkb ? 'ڕێبەری خزمەتگوزارییەکانی پەیمانگای CISE' : 'CISE Sovereign Services Directory',
      subtitle: isAr ? 'المحاور الستة للخدمات الثنائية والفيزا والتأمين والتسوية' : isZh ? '六大核心支柱：签证中心、汉语教学、中信保对接、双边货币清算' : isCkb ? 'شەش کۆڵەکەی سەرەکی خزمەتگوزارییەکان' : 'Six Sovereign Bilateral Service Pillars, Dossier Submissions & Fee Calculators',
      category: 'services',
      categoryLabel: isAr ? 'خدمات CISE' : isZh ? '主权服务' : isCkb ? 'خزمەتگوزاری' : 'Services',
      url: `/${lang}/institute/services`,
      icon: Landmark,
      tag: 'CISE Pillars',
      badge: 'Core'
    },
    {
      id: 'cise-visa-centre',
      title: isAr ? 'مركز الاستشارات والفيزا الثنائية المعتمد' : isZh ? '双边签证咨询与代办服务中心' : isCkb ? 'ناوەندی ڕاوێژکاری ڤیزای دوولایەنە' : 'Bilateral Visa Advisory & Processing Centre',
      subtitle: isAr ? 'إجراءات التأشيرة التجارية والدبلوماسية وحجز المواعيد وتتبع المعاملات' : isZh ? '商务与公务签证一站式代办、极速预约核销与进度查询' : isCkb ? 'کاروباری ڤیزا، چاوپێکەوتن و بەدواداچوونی مامەڵە' : 'Trade & Diplomatic Visas, Fast-Track Appointments & Dossier Tracker',
      category: 'services',
      categoryLabel: isAr ? 'تأشيرات' : isZh ? '签证' : isCkb ? 'ڤیزا' : 'Visa',
      url: `/${lang}/institute/visa-centre`,
      icon: FileCheck,
      tag: 'Bilateral Visa',
      badge: 'Certified'
    },
    {
      id: 'cise-chinese-tutoring',
      title: isAr ? 'مركز تعليم اللغة الصينية المعتمد واختبارات HSK' : isZh ? '汉语言教学与 HSK 官方等级认证考点' : isCkb ? 'ناوەندی فێرکاری زمانی چینی و تاقیکردنەوەی HSK' : 'Chinese Language Tutoring & HSK Testing Centre',
      subtitle: isAr ? 'دورات لغة الأعمال والدبلوماسية والتحضير لاختبارات HSK 1-9' : isZh ? '经贸商务汉语、政要集训与 HSK 1-9 权威等级认证' : isCkb ? 'فێربوونی زمانی بازرگانی و تاقیکردنەوەی فەرمی' : 'Executive Business Mandarin & Official HSK 1-9 Sovereign Examination',
      category: 'services',
      categoryLabel: isAr ? 'تعليم' : isZh ? '语言教学' : isCkb ? 'فێرکاری' : 'Language',
      url: `/${lang}/institute/${currentDialect}`,
      icon: GraduationCap,
      tag: 'HSK 1–9'
    },
    {
      id: 'cise-sinosure-insurance',
      title: isAr ? 'تسهيل التأمين السيادي وضمان الصادرات (سينوشور)' : isZh ? '中信保（Sinosure）主权保险与保理对接' : isCkb ? 'ئاسانکاری بیمەی نێودەوڵەتی سینۆشوور' : 'Sovereign Sinosure Insurance Facilitation Rail',
      subtitle: isAr ? 'تأمين ائتمان الصادرات وحماية استثمارات مشاريع البنية التحتية' : isZh ? '大型经贸工程出海承保、主权买方信贷与信用风险评级' : isCkb ? 'بیمەی هەناردە و پاراستنی وەبەرهێنان' : 'Export Credit Underwriting & Strategic Project Risk Mitigation',
      category: 'services',
      categoryLabel: isAr ? 'تأمين' : isZh ? '主权保险' : isCkb ? 'بیمە' : 'Insurance',
      url: `/${lang}/institute/insurance-facilitation`,
      icon: ShieldCheck,
      tag: 'Sinosure',
      badge: 'Guaranteed'
    },
    {
      id: 'cise-cultural-exchange',
      title: isAr ? 'برامج التبادل الثقافي والأكاديمي الثنائي' : isZh ? '中伊双边人文与高校战略学术交流' : isCkb ? 'ئاڵوگۆڕی کولتووری و ئەکادیمی' : 'Bilateral Cultural & Academic Exchange Program',
      subtitle: isAr ? 'شراكات الجامعات، المنح الدراسية، وترجمة التراث الأدبي' : isZh ? '智库合作、双向留学生全额奖学金与跨文明互译' : isCkb ? 'هاوبەشی زانکۆکان و دەرماڵەی خوێندن' : 'Joint University Research, Diplomatic Scholarships & Heritage Translation',
      category: 'services',
      categoryLabel: isAr ? 'تبادل ثقافي' : isZh ? '人文交流' : isCkb ? 'کولتووری' : 'Culture',
      url: `/${lang}/institute/services/cultural-exchange`,
      icon: BookOpen,
      tag: 'Academic MOUs'
    },
    {
      id: 'cise-consultancy',
      title: isAr ? 'الاستشارات المؤسسية والقانونية والمالية' : isZh ? '主权战略法务、跨境财税与准入咨询' : isCkb ? 'ڕاوێژکاری ستراتیژی، یاسایی و دارایی' : 'Strategic & Legal Institutional Consultancy',
      subtitle: isAr ? 'تأسيس الشركات، الامتثال التجاري، والتمثيل القانوني' : isZh ? '伊中双向合规出海、境外直接投资（ODI）与企业注册' : isCkb ? 'تۆمارکردنی کۆمپانیا و ڕێکارە یاساییەکان' : 'Cross-Border ODI Advisory, Tax Compliance & Direct Commercial Registration',
      category: 'services',
      categoryLabel: isAr ? 'استشارات' : isZh ? '智库咨询' : isCkb ? 'ڕاوێژ' : 'Advisory',
      url: `/${lang}/institute/consultancy`,
      icon: Briefcase,
      tag: 'Consultancy'
    },
    {
      id: 'cise-research-data',
      title: isAr ? 'مركز البيانات والأبحاث الاقتصادية السيادية' : isZh ? '中伊双边宏观经济与一带一路数据库' : isCkb ? 'ناوەندی داتای ئابووری و توێژینەوە' : 'Bilateral Macroeconomic Data Hub & BRI Monitor',
      subtitle: isAr ? 'مؤشرات التجارة والنفط وسلاسل الإمداد ومذكرات التفاهم' : isZh ? '实时双边贸易额、走廊基建投资大盘与官方智库公报' : isCkb ? 'داتای بازرگانی، نەوت و ڕێگای ئاوریشم' : 'Real-time Bilateral Trade Flow Indices, Corridor Maps & Academic Briefings',
      category: 'services',
      categoryLabel: isAr ? 'بيانات' : isZh ? '宏观数据' : isCkb ? 'داتا' : 'Data',
      url: `/${lang}/institute/data-hub`,
      icon: Database,
      tag: 'Macro Hub'
    },

    // --- SUMMIT 2026 ---
    {
      id: 'summit-home',
      title: isAr ? 'قمة السليمانية للشراكة الثنائية 2026' : isZh ? '2026 苏莱曼尼亚中伊经贸投资峰会' : isCkb ? 'لووتکەی هاوبەشی سلێمانی ٢٠٢٦' : 'Sulaymaniyah Bilateral Partnership Summit 2026',
      subtitle: isAr ? 'أكبر تجمع استثماري ودبلوماسي بين العراق والصين' : isZh ? '伊拉克与中国最高规格经贸投资与政企合作盛会' : isCkb ? 'گەورەترین کۆبوونەوەی ئابووری و دیپلۆماسی' : 'Premier Convening Platform for Sovereign Infrastructure & B2B Accords',
      category: 'summit',
      categoryLabel: isAr ? 'القمة' : isZh ? '双边峰会' : isCkb ? 'لووتکە' : 'Summit',
      url: `/${lang}/summit`,
      icon: Calendar,
      tag: 'Summit 2026',
      badge: 'Official'
    },
    {
      id: 'summit-3d-floorplan',
      title: isAr ? 'المخطط التفاعلي ثلاثي الأبعاد 3D لأجنحة المعرض' : isZh ? '3D 互动立体展馆全景与展位即时预约' : isCkb ? 'نەخشەی سێ ڕەهەندی ٣D پێشانگاکە' : 'Interactive 3D Fairgrounds Floorplan & Booth Inspector',
      subtitle: isAr ? 'استكشف أجنحة المعرض بتقنية 3D وحساب كلفة الأجنحة بالدينار واليوان والدولار' : isZh ? '基于 Three.js 的实时展位选位、规格核验与多币种造价计算器' : isCkb ? 'پێشانگای سێ ڕەهەندی و حیساباتی تێچووی باڵیۆزخانە و کۆمپانیاکان' : 'Three.js Spatial Raycasting, Turnkey Booth Specifications & Real-time FX Rates',
      category: 'summit',
      categoryLabel: isAr ? 'معرض 3D' : isZh ? '3D展馆' : isCkb ? 'پێشانگا' : '3D Expo',
      url: `/${lang}/summit/floor-plan`,
      icon: Building2,
      tag: 'Three.js 3D',
      badge: 'Interactive'
    },
    {
      id: 'summit-vip-register',
      title: isAr ? 'تسجيل الوفود الرسمية والبروتوكول الدبلوماسي VIP' : isZh ? 'VIP 贵宾与政要代表团专属礼宾注册通道' : isCkb ? 'تۆماری شاندە دیپلۆماسی و کەسایەتییە گرنگەکان VIP' : 'VIP & Diplomatic Delegation Protocol Registration',
      subtitle: isAr ? 'اعتماد الوزراء والسفراء والرؤساء التنفيذيين والمرافقين الأمنيين' : isZh ? '部级要员、驻华驻伊外交官与领军企业高管官方登记通道' : isCkb ? 'تۆماری تایبەت بە وەزیران و باڵیۆزان و بازرگانان' : 'Cabinet Dignitaries, Protocol Security, Bilingual Aides & Sovereign Badges',
      category: 'summit',
      categoryLabel: isAr ? 'اعتماد VIP' : isZh ? 'VIP通道' : isCkb ? 'شاندی فەرمی' : 'VIP Access',
      url: `/${lang}/summit/register/vip`,
      icon: ShieldCheck,
      tag: 'VIP Protocol',
      badge: 'Fast Track'
    },
    {
      id: 'summit-agenda',
      title: isAr ? 'جدول أعمال القمة والجلسات العامة' : isZh ? '峰会三天官方全日程与主旨论坛' : isCkb ? 'ئەجێندای لووتکە و کۆڕبەندەکان' : 'Official 3-Day Summit Agenda & Keynote Sessions',
      subtitle: isAr ? 'الجلسات الافتتاحية، ملتقى الطاقة، وحوارات طريق التنمية وتصدير الرزنامة' : isZh ? '开幕式国宴、一带一路走廊论坛、闭门圆桌与日程导出' : isCkb ? 'دانیشتنەکانی وزە، ژێرخان و هەناردەکردنی ئەجێندا' : 'Plenary Sessions, Energy Transition Roundtables & iCal Calendar Export',
      category: 'summit',
      categoryLabel: isAr ? 'الأجندة' : isZh ? '日程' : isCkb ? 'ئەجێندا' : 'Agenda',
      url: `/${lang}/summit/agenda`,
      icon: Calendar,
      tag: 'Sessions'
    },
    {
      id: 'summit-b2b',
      title: isAr ? 'التوفيق التجاري والشراكات الثنائية B2B' : isZh ? 'B2B 经贸投资精准对接与项目路演' : isCkb ? 'کۆبوونەوەی بازرگانی دوولایەنە B2B' : 'Bilateral B2B Enterprise Matchmaking Facility',
      subtitle: isAr ? 'جدولة الاجتماعات المغلقة بين الشركات العراقية والصينية' : isZh ? '伊拉克与中国骨干企业闭门撮合与投资协议签署' : isCkb ? 'دیداری تایبەتی کۆمپانیا عێراقی و چینییەکان' : 'Private Matchmaking Rooms & Bilateral Investment Agreements',
      category: 'summit',
      categoryLabel: isAr ? 'شراكات B2B' : isZh ? 'B2B撮合' : isCkb ? 'بازرگانی' : 'B2B Match',
      url: `/${lang}/summit/b2b`,
      icon: Briefcase,
      tag: 'Deal Flow'
    },

    // --- FINANCIAL SETTLEMENT & CLEARING ---
    {
      id: 'settlement-home',
      title: isAr ? 'مقاصة التسوية المالية المباشرة (دينار ⇄ يوان)' : isZh ? '中伊双边直接货币清算轨道 (IQD ⇄ RMB)' : isCkb ? 'سیستەمی یەکلاکردنەوەی دارایی ڕاستەوخۆ' : 'Direct IQD ⇄ RMB Sovereign Financial Settlement Rail',
      subtitle: isAr ? 'نظام التسوية المعتمد من البنك المركزي العراقي وبنك الشعب الصيني' : isZh ? '伊拉克央行与中国人民银行双边本币直接互换与清算平台' : isCkb ? 'پاکتاوی دراوەکان بەبێ دۆلاری ئەمریکی' : 'Zero USD Exposure Bilateral Settlement Protocol & Direct Commercial Invoicing',
      category: 'settlement',
      categoryLabel: isAr ? 'تسوية' : isZh ? '金融清算' : isCkb ? 'یەکلاکردنەوە' : 'Settlement',
      url: `/${lang}/settlement`,
      icon: CreditCard,
      tag: '0% USD Drag',
      badge: 'CBI / PBOC'
    },
    {
      id: 'settlement-calculator',
      title: isAr ? 'حاسبة أسعار الصرف وتحويل العملات السيادية' : isZh ? '第纳尔/人民币实时汇率与清算手续费计算器' : isCkb ? 'حیساباتی دراو و خەرجی بازرگانی' : 'Live IQD/RMB FX Calculator & Transaction Fee Estimator',
      subtitle: isAr ? 'حساب فروق العملة ومقارنة رسوم البنوك المراسلة مع المقاصة المباشرة' : isZh ? '实时主权基准中间价核算、节省成本对比与大额跨境测算' : isCkb ? 'بەراوردکردنی تێچووی حەواڵە و گۆڕینەوە' : 'Real-time PBOC/CBI Benchmark Rates & Interbank Spread Comparison',
      category: 'settlement',
      categoryLabel: isAr ? 'حاسبة FX' : isZh ? '汇率计算' : isCkb ? 'حیسابات' : 'FX Tool',
      url: `/${lang}/settlement/calculator`,
      icon: Calculator,
      tag: 'FX Engine'
    },
    {
      id: 'settlement-tracker',
      title: isAr ? 'تتبع مسار الحوالات والمدفوعات التجارية المباشرة' : isZh ? '跨境经贸清算交易实时状态追踪系统' : isCkb ? 'بەدواداچوونی حەواڵە و مامەڵە داراییەکان' : 'Real-time Sovereign Remittance & Clearing Tracker',
      subtitle: isAr ? 'تتبع فوري لمراحل التحويل عبر كود المعاملة المصرفية' : isZh ? '输入报文结算流水号即时获取央行清算节点与到账状态' : isCkb ? 'بینینی بارودۆخی پارەدان و حەواڵەکان' : 'Instant Audit Trail, Clearance Verification & Digital Timestamp Ledger',
      category: 'settlement',
      categoryLabel: isAr ? 'تتبع' : isZh ? '交易追踪' : isCkb ? 'بەدواداچوون' : 'Tracker',
      url: `/${lang}/settlement/tracker`,
      icon: Compass,
      tag: 'Live Ledger'
    },
    {
      id: 'settlement-card',
      title: isAr ? 'بطاقة كي والوكالة التجارية لكبار المستثمرين VIP' : isZh ? 'Qi & ICA 联名商务结算卡与专属商旅账户' : isCkb ? 'کارتی بازرگانی VIP بۆ وەبەرهێنەران' : 'Qi & ICA Co-Branded Commercial VIP Settlement Card',
      subtitle: isAr ? 'بطاقة ائتمان تجارية بفروق عملة صفرية للمستثمرين العراقيين في الصين' : isZh ? '零汇损、银联全球通道免审核大额授信卡' : isCkb ? 'کارتی فەرمی بازرگانان بۆ خەرجی لە چین' : 'Executive Commercial Debit & Trade Card with Zero FX Spread in Mainland China',
      category: 'settlement',
      categoryLabel: isAr ? 'بطاقة VIP' : isZh ? '联名卡' : isCkb ? 'کارت' : 'VIP Card',
      url: `/${lang}/settlement/card`,
      icon: CreditCard,
      tag: 'UnionPay / Qi'
    },

    // --- NEWSROOM & DIPLOMATIC DISPATCHES ---
    {
      id: 'portal-newsroom',
      title: isAr ? 'غرفة الأخبار والدبلوماسية الرسمية لـ ICA' : isZh ? 'ICA 全球新闻与融媒体中心' : isCkb ? 'ژووری هەواڵی فەرمی ICA' : 'ICA Official Diplomatic Newsroom & Dispatch Wire',
      subtitle: isAr ? 'النشرات الإخبارية الاستراتيجية والبيانات المشتركة' : isZh ? '两国官方双边外交电讯、重大经贸通报与主权深度研判' : isCkb ? 'هەواڵ و شیکردنەوەی ستراتیژی و دیپلۆماسی' : 'Sovereign Dispatches, Bilateral Accords & Strategic Media Briefings',
      category: 'news',
      categoryLabel: isAr ? 'أخبار' : isZh ? '新闻中心' : isCkb ? 'هەواڵ' : 'Newsroom',
      url: `/${lang}/newsroom`,
      icon: Newspaper,
      tag: 'Dispatches'
    },
    {
      id: 'portal-newsroom-archive',
      title: isAr ? 'أرشيف الوثائق والبيانات الدبلوماسية' : isZh ? '双边历史外交文件与通电全文档案库' : isCkb ? 'ئەرشیفی بەڵگەنامە دیپلۆماسییەکان' : 'Historical Diplomatic Archive & Accord Depository',
      subtitle: isAr ? 'أرشيف كامل لكافة البيانات المشتركة منذ عام 1958' : isZh ? '1958年建交以来全部条约、合资公报与备忘录检索' : isCkb ? 'هەموو بەڵگەنامە هاوبەشەکانی مێژوو' : 'Permanent Diplomatic Archive of Treaties, Joint Communiqués & Accords',
      category: 'news',
      categoryLabel: isAr ? 'أرشيف' : isZh ? '历史档案' : isCkb ? 'ئەرشیف' : 'Archive',
      url: `/${lang}/newsroom/archive`,
      icon: BookOpen,
      tag: 'Full Archive'
    },
    {
      id: 'portal-live',
      title: isAr ? 'البوابة الحية والبث المباشر 24/7' : isZh ? '24小时实时双边视讯与峰会高清直播' : isCkb ? 'دەروازەی پەخشی ڕاستەوخۆ' : 'Live Broadcast Transmission & Video Desk',
      subtitle: isAr ? 'تغطية الفعاليات والمؤتمرات الاقتصادية والوثائقيات' : isZh ? '高清双语峰会全天候实况转播与丝路文化纪录片' : isCkb ? 'پەخشی ڕاستەوخۆی کۆنفرانس و فیستیڤاڵەکان' : 'High-Definition Summit Streams & Silk Road Documentary Broadcasts',
      category: 'portals',
      categoryLabel: isAr ? 'بث مباشر' : isZh ? '视讯直播' : isCkb ? 'ڕاستەوخۆ' : 'Live',
      url: `/${lang}/live`,
      icon: Radio,
      tag: 'Broadcast'
    },

    // --- MEGAPROJECTS & CORRIDORS ---
    {
      id: 'project-faw',
      title: isAr ? 'مشروع ميناء الفاو الكبير الاستراتيجي' : isZh ? '法奥大港综合枢纽深水港工程' : isCkb ? 'پڕۆژەی بەندەری فاو' : 'Al Faw Grand Port Strategic Deepwater Project',
      subtitle: isAr ? 'المحطة البحرية الأكبر في الخليج وشريان التجارة البحرية' : isZh ? '连接海湾与欧亚大陆的战略级干线深水港口' : isCkb ? 'گەورەترین بەندەری کەنداو و ڕێگای ئاوریشم' : 'Key Gulf Maritime Terminal Linking Silk Road Corridor',
      category: 'portals',
      categoryLabel: isAr ? 'مشروع سيادي' : isZh ? '战略项目' : isCkb ? 'پڕۆژە' : 'Project',
      url: `/${lang}/newsroom?tag=Faw`,
      icon: Building2,
      tag: '$2.6B Port'
    },
    {
      id: 'project-development-road',
      title: isAr ? 'طريق التنمية والقناة الجافة الدولية' : isZh ? '发展之路与中欧干线陆桥铁路网' : isCkb ? 'پڕۆژەی ڕێگای گەشەپێدان' : 'Development Road & Dry Canal International Corridor',
      subtitle: isAr ? 'شبكة القطارات السريعة والطرق الدولية التي تربط البصرة بأوروبا' : isZh ? '贯穿伊拉克全境并直达土耳其与欧洲腹地的铁公路大动脉' : isCkb ? 'هێڵی ئاسنینی نێودەوڵەتی خێرا' : 'Multi-modal High-Speed Rail & Highway Linking Basra to Europe',
      category: 'portals',
      categoryLabel: isAr ? 'بنية تحتية' : isZh ? '基建走廊' : isCkb ? 'ژێرخان' : 'Corridor',
      url: `/${lang}/newsroom?tag=DevelopmentRoad`,
      icon: Globe2,
      tag: '$17B Corridor'
    },

    // --- SECRETARIAT & COMMAND HUB ---
    {
      id: 'portal-command-hub',
      title: isAr ? 'مركز قيادة CISE وإدارة المنظومة' : isZh ? 'CISE Command Hub 综合指挥中枢' : isCkb ? 'ناوەندی فەرماندەیی CISE' : 'CISE Command Hub Management Console',
      subtitle: isAr ? 'إدارة أقسام البوابات الـ 30 والمستخدمين والملفات والمقالات' : isZh ? '30大主权版块调度、多语言AI播种引擎与审批流' : isCkb ? 'بەڕێوەبردنی بەشەکان و زانیارییەکان' : 'Unified Executive Console, 30 Section Controllers & Seed Engine',
      category: 'portals',
      categoryLabel: isAr ? 'مركز القيادة' : isZh ? '控制中枢' : isCkb ? 'فەرماندەیی' : 'Command Hub',
      url: `/${lang}/hub/management`,
      icon: SlidersHorizontal,
      tag: 'Management'
    },
    {
      id: 'portal-secretariat',
      title: isAr ? 'الأمانة العامة للوكالة العراقية الصينية' : isZh ? 'ICA 总秘书处常设机构' : isCkb ? 'سکرتاریەتی گشتی ICA' : 'ICA General Secretariat Directorate',
      subtitle: isAr ? 'التنسيق الحكومي الثنائي والمراسلات المشفرة والبروتوكول' : isZh ? '双边政府高层联络、加密电报交换与主权事务总协调' : isCkb ? 'کاروباری دیپلۆماسی و هاوبەشی فەرمی' : 'Sovereign Diplomatic Coordination & Encrypted Telex Dispatch',
      category: 'portals',
      categoryLabel: isAr ? 'الأمانة العامة' : isZh ? '总秘书处' : isCkb ? 'سکرتاریەت' : 'Secretariat',
      url: `/${lang}/secretariat`,
      icon: ShieldCheck,
      tag: 'Secretariat'
    }
  ], [lang, isAr, isZh, isCkb]);

  // Dynamic news articles from portal store
  const articleIndex: SearchResultItem[] = useMemo(() => {
    try {
      const articles = portalStore.getNewsArticles().filter(a => a.status === 'published');
      return articles.slice(0, 20).map(a => {
        const title = a.title[lang as keyof typeof a.title] || a.title.en;
        const excerpt = a.excerpt[lang as keyof typeof a.excerpt] || a.excerpt.en;
        return {
          id: `article-${a.id}`,
          title,
          subtitle: excerpt,
          category: 'news' as SearchCategory,
          categoryLabel: isAr ? 'تقرير صحفي' : isZh ? '即时电讯' : isCkb ? 'ڕاپۆرت' : 'Dispatch',
          url: `/${lang}/newsroom/${a.slug}`,
          icon: Newspaper,
          tag: typeof a.category === 'string' ? a.category : (a.category as any)?.name || 'News'
        };
      });
    } catch {
      return [];
    }
  }, [lang, isAr, isZh, isCkb]);

  // Combined searchable dataset
  const allItems = useMemo(() => [...staticIndex, ...articleIndex], [staticIndex, articleIndex]);

  // Filtered results
  const filteredResults = useMemo(() => {
    let items = allItems;
    if (activeCategory !== 'all') {
      items = items.filter(item => item.category === activeCategory);
    }

    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return items.slice(0, 8);
    }

    return items.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(trimmed);
      const matchSubtitle = item.subtitle.toLowerCase().includes(trimmed);
      const matchTag = item.tag ? item.tag.toLowerCase().includes(trimmed) : false;
      const matchBadge = item.badge ? item.badge.toLowerCase().includes(trimmed) : false;
      return matchTitle || matchSubtitle || matchTag || matchBadge;
    }).slice(0, 10);
  }, [allItems, activeCategory, query]);

  // Trending Suggestions
  const trendingQueries = useMemo(() => [
    { label: isAr ? 'معرض 3D' : isZh ? '3D 展位' : isCkb ? 'پێشانگای ٣D' : '3D Expo Floorplan', q: 'Floorplan' },
    { label: isAr ? 'مركز الفيزا' : isZh ? '签证中心' : isCkb ? 'ناوەندی ڤیزا' : 'Visa Centre', q: 'Visa' },
    { label: isAr ? 'تسوية اليوان' : isZh ? '人民币直接清算' : isCkb ? 'یەکلاکردنەوەی یوان' : 'Direct Settlement', q: 'Settlement' },
    { label: isAr ? 'تأمين سينوشور' : isZh ? '中信保 Sinosure' : isCkb ? 'بیمەی سینۆشوور' : 'Sinosure Insurance', q: 'Sinosure' },
    { label: isAr ? 'اعتماد VIP' : isZh ? 'VIP 贵宾通道' : isCkb ? 'شاندی VIP' : 'VIP Protocol', q: 'VIP' },
    { label: isAr ? 'طريق التنمية' : isZh ? '发展之路' : isCkb ? 'ڕێگای گەشەپێدان' : 'Development Road', q: 'Development' },
  ], [isAr, isZh, isCkb]);

  const handleSelectResult = (item: SearchResultItem) => {
    setIsOpen(false);
    if (onSelectResult) {
      onSelectResult(item);
    } else {
      navigate(item.url);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (filteredResults.length > 0 && selectedIndex < filteredResults.length) {
      handleSelectResult(filteredResults[selectedIndex]);
    } else {
      setIsOpen(false);
      navigate(`/${lang}/newsroom/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredResults.length - 1));
    }
  };

  const categoriesList: { id: SearchCategory; label: string }[] = useMemo(() => [
    { id: 'all', label: isAr ? 'الكل' : isZh ? '全部' : isCkb ? 'هەموو' : 'All' },
    { id: 'services', label: isAr ? 'خدمات CISE' : isZh ? '主权服务' : isCkb ? 'خزمەتگوزاری' : 'CISE Services' },
    { id: 'summit', label: isAr ? 'القمة والمعرض' : isZh ? '峰会与3D展馆' : isCkb ? 'لووتکە و پێشانگا' : 'Summit 2026' },
    { id: 'settlement', label: isAr ? 'التسوية والعملات' : isZh ? '货币直接清算' : isCkb ? 'پاکتاوی دراو' : 'Settlement & FX' },
    { id: 'news', label: isAr ? 'غرفة الأخبار' : isZh ? '官方电讯' : isCkb ? 'هەواڵ' : 'Newsroom' },
    { id: 'portals', label: isAr ? 'البوابات والمشاريع' : isZh ? '重点项目' : isCkb ? 'پڕۆژەکان' : 'Corridors' },
  ], [isAr, isZh, isCkb]);

  const defaultPlaceholder = isAr
    ? 'ابحث في كافة البوابات: خدمات CISE، القمة، أجنحة 3D، مقاصة العملات، والأخبار...'
    : isZh
    ? '全域统一检索：CISE主权服务、峰会3D展区、货币直接清算、重大工程...'
    : isCkb
    ? 'گەڕانی سەرتاسەری: خزمەتگوزارییەکانی CISE، لووتکە، پێشانگای ٣D، دارایی...'
    : 'Search across all portals: CISE services, Summit, 3D booths, FX clearing & news...';

  // --- RENDER VARIANT: TRIGGER BUTTON (Compact for Dense Admin/Toolbar Headers) ---
  if (variant === 'trigger') {
    return (
      <div className={`relative ${className}`} dir={isRtl ? 'rtl' : 'ltr'}>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 h-9 sm:h-9.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs transition-all shadow-xs cursor-pointer group"
          title={isAr ? 'بحث عالمي (⌘K)' : isZh ? '全域搜索 (⌘K)' : isCkb ? 'گەڕانی گشتی (⌘K)' : 'Global Search (⌘K)'}
          aria-label="Open Global Search"
        >
          <Search size={14} className="text-white/80 group-hover:text-white shrink-0" />
          <span className="hidden sm:inline text-white/90 truncate max-w-[140px] text-xs">
            {buttonLabel || (isAr ? 'بحث موحد...' : isZh ? '全域检索...' : isCkb ? 'گەڕان...' : 'Search...')}
          </span>
          <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-white/15 border border-white/25 text-white/80">
            ⌘K
          </kbd>
        </button>

        {/* MODAL SEARCH DIALOG */}
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-8 sm:pt-20 px-3 sm:px-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-150">
            {/* Backdrop Dismiss Button */}
            <div 
              className="fixed inset-0"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Dialog Card */}
            <div 
              ref={containerRef}
              className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-red-100 overflow-hidden z-10 animate-in zoom-in-95 duration-150"
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              {/* Modal Input Row */}
              <div className="p-3 sm:p-4 bg-red-600 text-white flex items-center gap-2.5 sm:gap-3">
                <Search size={18} className="text-white shrink-0" />
                <input
                  ref={modalInputRef}
                  type="text"
                  value={query}
                  onChange={e => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder || defaultPlaceholder}
                  className="flex-1 bg-transparent text-sm sm:text-base font-semibold text-white placeholder-red-100/70 focus:outline-none min-w-0"
                  autoComplete="off"
                  spellCheck="false"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      modalInputRef.current?.focus();
                    }}
                    className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  ESC
                </button>
              </div>

              {/* Scopes Filter Tabs */}
              <div className="flex items-center gap-1.5 p-2 sm:p-2.5 bg-slate-50 border-b border-slate-100 overflow-x-auto scrollbar-none text-xs font-bold">
                {categoriesList.map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-3 py-1.5 rounded-lg transition-all shrink-0 cursor-pointer text-xs font-bold ${
                      activeCategory === tab.id
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/80'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Results Container */}
              <div className="max-h-[55vh] sm:max-h-[380px] overflow-y-auto p-2 space-y-1">
                {filteredResults.length > 0 ? (
                  filteredResults.map((item, idx) => {
                    const Icon = item.icon;
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectResult(item)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-red-50 text-red-950 ring-1 ring-red-200'
                            : 'hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0 flex-1">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-red-100 text-red-600 shrink-0 shadow-xs">
                            <Icon size={18} />
                          </div>
                          <div className="min-w-0 flex-1 text-start">
                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm font-black truncate">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-red-600 text-white shrink-0">
                                  {item.badge}
                                </span>
                              )}
                              {item.tag && (
                                <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 shrink-0">
                                  {item.tag}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] sm:text-xs text-slate-500 truncate mt-0.5">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 shrink-0 ms-2">
                          <span className="hidden sm:inline text-[11px] font-mono opacity-70">
                            {item.categoryLabel}
                          </span>
                          <ArrowRight size={14} className="rtl:rotate-180" />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-slate-400 text-xs sm:text-sm">
                    {isAr
                      ? 'لم يتم العثور على نتائج مباشرة. اضغط Enter للبحث في الأرشيف الدبلوماسي الكامل.'
                      : isZh
                      ? '未找到精准匹配项。请按回车键在档案库中进行全文检索。'
                      : isCkb
                      ? 'هیچ ئەنجامێک نەدۆزرایەوە. ئینتەر دابگرە بۆ گەڕانی تەواو.'
                      : 'No exact matches found. Press Enter to search full diplomatic archive.'}
                  </div>
                )}
              </div>

              {/* Trending Strip Footer */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-400 font-bold flex items-center gap-1 text-[11px] uppercase">
                    <Flame size={13} className="text-amber-500" />
                    <span>{isAr ? 'شائع:' : isZh ? '热门:' : isCkb ? 'باو:' : 'HOT:'}</span>
                  </span>
                  {trendingQueries.map((trend, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setQuery(trend.q);
                        modalInputRef.current?.focus();
                      }}
                      className="px-2.5 py-1 rounded-md bg-white hover:bg-red-50 text-slate-700 hover:text-red-700 text-[11px] font-bold border border-slate-200 transition-colors cursor-pointer"
                    >
                      {trend.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleFormSubmit}
                  className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
                >
                  <span>{isAr ? 'عرض كافة النتائج' : isZh ? '查看全部结果' : isCkb ? 'بینینی هەموو ئەنجامەکان' : 'View full archive'}</span>
                  <ChevronRight size={13} className="rtl:rotate-180" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- RENDER VARIANT: INLINE BAR (Primary for Public, Summit, Institute & Settlement Headers) ---
  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* INLINE GLASS SEARCH BAR */}
      <form onSubmit={handleFormSubmit} className="relative w-full">
        <div
          className={`group relative flex items-center h-9 sm:h-9.5 rounded-full px-3.5 transition-all duration-200 backdrop-blur-md border ${
            isOpen
              ? 'bg-white/25 border-white/60 shadow-lg ring-2 ring-white/30 text-white'
              : 'bg-white/15 hover:bg-white/20 border-white/25 text-white/95 hover:border-white/40 shadow-xs'
          }`}
        >
          {/* Search Icon */}
          <Search
            size={15}
            className={`shrink-0 transition-colors ${
              isOpen ? 'text-white' : 'text-white/80 group-hover:text-white'
            }`}
          />

          {/* Search Text Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onFocus={() => {
              window.dispatchEvent(new CustomEvent('close-header-notifications'));
              setIsOpen(true);
            }}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
              if (!isOpen) {
                window.dispatchEvent(new CustomEvent('close-header-notifications'));
                setIsOpen(true);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || defaultPlaceholder}
            className="flex-1 bg-transparent px-2.5 text-xs sm:text-[13px] font-medium text-white placeholder-white/70 focus:outline-none w-full"
            autoComplete="off"
            spellCheck="false"
          />

          {/* Action Tools / Clear / Shortcut Chip */}
          <div className="flex items-center gap-1.5 shrink-0 ms-1">
            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="w-5 h-5 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                title="Clear query"
              >
                <X size={12} />
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-white/15 border border-white/25 text-white/80 select-none pointer-events-none">
                ⌘K
              </kbd>
            )}
          </div>
        </div>
      </form>

      {/* FLOATING GLASS DROPDOWN (Interactive Live Suggestions & Scopes) */}
      {isOpen && (
        <div
          className="absolute top-full mt-2 inset-x-0 w-full bg-white backdrop-blur-2xl border border-slate-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* Top Filter Chips Row */}
          <div className="flex items-center gap-1.5 p-2.5 border-b border-slate-100 overflow-x-auto text-xs font-bold scrollbar-none bg-slate-50/60">
            {categoriesList.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-2.5 py-1 rounded-lg transition-all shrink-0 cursor-pointer text-xs font-bold ${
                  activeCategory === tab.id
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Results List */}
          <div className="max-h-[50vh] sm:max-h-[350px] overflow-y-auto p-1.5 space-y-1">
            {filteredResults.length > 0 ? (
              filteredResults.map((item, idx) => {
                const Icon = item.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectResult(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-red-50 text-red-950 ring-1 ring-red-200'
                        : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-100 text-red-600 shrink-0">
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0 flex-1 text-start">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold truncate">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-red-600 text-white shrink-0">
                              {item.badge}
                            </span>
                          )}
                          {item.tag && (
                            <span className="text-[9px] font-mono font-medium px-1.5 py-0.2 rounded bg-slate-100 text-slate-500 shrink-0">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-red-600 shrink-0 ms-2">
                      <span className="hidden sm:inline text-[10px] font-mono opacity-60">
                        {item.categoryLabel}
                      </span>
                      <ArrowRight size={13} className="rtl:rotate-180 opacity-70" />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-6 text-center text-slate-400 text-xs">
                {isAr
                  ? 'لم يتم العثور على نتائج مباشرة. اضغط Enter للبحث في الأرشيف الدبلوماسي الكامل.'
                  : isZh
                  ? '未找到精准匹配项。请按回车键在档案库中进行全文检索。'
                  : isCkb
                  ? 'هیچ دەرئەنجامێک نەدۆزرایەوە. ئینتەر دابگرە بۆ گەڕانی تەواو.'
                  : 'No exact matches found. Press Enter to search full diplomatic archive.'}
              </div>
            )}
          </div>

          {/* Bottom Trending Suggestions & Actions Footer */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-slate-400 font-bold flex items-center gap-1 text-[10px] uppercase">
                <Flame size={12} className="text-amber-500" />
                <span>{isAr ? 'شائع:' : isZh ? '热门:' : isCkb ? 'باو:' : 'HOT:'}</span>
              </span>
              {trendingQueries.map((trend, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setQuery(trend.q);
                    inputRef.current?.focus();
                  }}
                  className="px-2 py-0.5 rounded-md bg-white hover:bg-red-50 text-slate-600 hover:text-red-700 text-[10px] font-bold border border-slate-200 transition-colors cursor-pointer"
                >
                  {trend.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleFormSubmit}
              className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
            >
              <span>{isAr ? 'عرض كافة النتائج' : isZh ? '查看全部结果' : isCkb ? 'بینینی هەموو ئەنجامەکان' : 'View full archive'}</span>
              <ChevronRight size={11} className="rtl:rotate-180" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderGlobalSearchBar;
