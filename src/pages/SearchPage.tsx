import React, { useState, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  Search, X, ExternalLink, ArrowRight, Building2, CreditCard, 
  Calendar, Briefcase, Landmark, FileText, Globe2, ShieldCheck,
  CheckCircle2, Flame, Layers, Radio, Sparkles
} from 'lucide-react';
import { Locale } from '../types';
import { portalStore } from '../data/portalData';

interface SearchItem {
  id: string;
  name: string;
  category: 'projects' | 'services' | 'summit' | 'settlement' | 'newsroom' | 'enterprises';
  typeLabel: string;
  desc: string;
  valueOrTag?: string;
  url: string;
  status?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export default function SearchPage({ lang }: { lang: Locale }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';
  
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const navigate = useNavigate();

  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';
  const isRtl = isAr || isCkb;

  // Master cross-portal entity database
  const entities: SearchItem[] = useMemo(() => [
    // Major Bilateral Projects
    {
      id: 'faw-port',
      name: isZh ? '法奥大港一期工程' : isAr ? 'مشروع ميناء الفاو الكبير' : isCkb ? 'پڕۆژەی بەندەری گەورەی فاو' : 'Al Faw Grand Port Mega-Terminal',
      category: 'projects',
      typeLabel: isZh ? '战略基建' : isAr ? 'بنية تحتية كبرى' : isCkb ? 'ژێرخانی ستراتیژی' : 'Strategic Infrastructure',
      desc: isZh ? '波斯湾最深人工航道与集装箱码头，伊拉克连接全球海洋贸易的主动脉。' : isAr ? 'أكبر مجمع موانئ على الخليج العربي، نقطة انطلاق طريق التنمية الرابط بين آسيا وأوروبا.' : isCkb ? 'گەورەترین بەندەری کەنداوی عەرەبی و سەرەتای ڕێگای گەشەپێدان بۆ ئەوروپا.' : 'Deep-water logistics hub connecting the Gulf with the Silk Road & Development Road network.',
      valueOrTag: '$2.6B Capital',
      status: isZh ? '建设中 (85%)' : isAr ? 'قيد التنفيذ (٨٥٪)' : 'Under Construction (85%)',
      url: `/${lang}/projects`,
      icon: Building2
    },
    {
      id: 'development-road',
      name: isZh ? '伊拉克发展路倡议 (铁路+高速)' : isAr ? 'طريق التنمية العراقي (سكك حديد وطريق سريع)' : isCkb ? 'ڕێگای گەشەپێدانی عێراق' : 'Iraq Development Road Rail & Freight Corridor',
      category: 'projects',
      typeLabel: isZh ? '国家走廊' : isAr ? 'ممر وطني' : isCkb ? 'ڕێڕەوی نیشتمانی' : 'National Transit Corridor',
      desc: isZh ? '自法奥大港延伸至土耳其边境的 1,200 公里电气化铁路与高速公路网络。' : isAr ? 'شبكة سكك حديد فائقة السرعة وطريق بري بطول ١٢٠٠ كم لربط الخليج بأوروبا عبر تركيا.' : isCkb ? 'هێڵی شەمەندەفەری خێرا و ڕێگای وشکانی بە درێژایی ١٢٠٠ کم بەرەو تورکیا.' : '1,200 km high-speed dual rail and highway transit network linking Persian Gulf to Europe.',
      valueOrTag: '$17B Sovereign',
      status: isZh ? '规划动工' : isAr ? 'مرحلة التصاميم والتنفيذ' : 'Active Survey & Phasing',
      url: `/${lang}/projects`,
      icon: Flame
    },
    {
      id: 'basra-solar',
      name: isZh ? '巴士拉 1,000MW 光伏综合能源电站' : isAr ? 'محطة البصرة الكهروضوئية للطاقة الشمسية (١٠٠٠ ميغاواط)' : isCkb ? 'وێستگەی وزەی خۆری بەسڕە' : 'Basra 1,000MW Solar Photovoltaic Grid',
      category: 'projects',
      typeLabel: isZh ? '绿色能源' : isAr ? 'طاقة متجددة' : isCkb ? 'وزەی نوێبووەوە' : 'Clean Energy',
      desc: isZh ? '中国电建与伊拉克电力部合作建设，缓解南部电网负荷的大规模清洁能源示范工程。' : isAr ? 'مشروع مشترك بين باور تشاينا ووزارة الكهرباء لتوليد الطاقة النظيفة وتغذية الشبكة الوطنية.' : isCkb ? 'پڕۆژەی هاوبەشی پاوەرچاینا بۆ دابینکردنی وزەی پاک بۆ تۆڕی نیشتمانی.' : 'Sovereign green transition initiative with PowerChina to power southern governorates.',
      valueOrTag: '$880M Grid Allocation',
      status: isZh ? '施工中' : isAr ? 'قيد الإنشاء' : 'In Progress',
      url: `/${lang}/projects`,
      icon: Sparkles
    },

    // CISE Institute Services
    {
      id: 'cise-visa',
      name: isZh ? '中伊双边签证咨询与代办中心' : isAr ? 'مركز الاستشارات والفيزا الثنائية المعتمد' : isCkb ? 'ناوەندی ڕاوێژکاری ڤیزای دوولایەنە' : 'Bilateral Visa Advisory & Diplomatic Fast-Track',
      category: 'services',
      typeLabel: isZh ? '领事服务' : isAr ? 'خدمات قنصلية' : isCkb ? 'خزمەتگوزاری قونسوڵی' : 'Consular & Diplomatic',
      desc: isZh ? '商务考察、政府访华及外籍专家来伊签证绿色通道，提供全套公证与政策指引。' : isAr ? 'المسار الدبلوماسي والتجاري السريع للتأشيرات، تصديق الوثائق والخدمات القنصلية.' : isCkb ? 'ڕێڕەوی خێرای بازرگانی و دیپلۆماسی بۆ ڤیزا و پەسەندکردنی بەڵگەنامەکان.' : 'Expedited commercial, state delegation, and engineering visa processing protocols.',
      valueOrTag: isZh ? '双向代办' : 'Bilateral Fast-Track',
      url: `/${lang}/institute/visa-centre`,
      icon: Globe2
    },
    {
      id: 'cise-chinese',
      name: isZh ? '汉语言教学中心与 HSK 官方认证考点' : isAr ? 'مركز تعليم اللغة الصينية المعتمد وامتحانات HSK' : isCkb ? 'ناوەندی فێرکاری زمانی چینی و تاقیکردنەوەی HSK' : 'Chinese Language Tutoring & Certified HSK Test Center',
      category: 'services',
      typeLabel: isZh ? '教育与考试' : isAr ? 'تعليم معتمد' : isCkb ? 'پەروەردەی باوەڕپێکراو' : 'Language & Certification',
      desc: isZh ? '面向商务代表与工程团队的标准汉语课程，提供 HSK 1–9 级考前培训与官考服务。' : isAr ? 'دورات لغة صينية تخصصية للمهندسين ورجال الأعمال مع اعتماد رسمي لامتحانات HSK.' : isCkb ? 'خولەکانی زمانی چینی بۆ ئەندازیاران و بازرگانان لەگەڵ تاقیکردنەوەی باوەڕپێکراوی HSK.' : 'Official curriculum and standardized testing center for Iraqi scholars and corporate delegates.',
      valueOrTag: 'HSK Levels 1–9',
      url: `/${lang}/institute/chinese-center`,
      icon: Landmark
    },
    {
      id: 'cise-insurance',
      name: isZh ? '中国信保 (Sinosure) 主权承保与贸易对接' : isAr ? 'تسهيل التأمين السيادي والائتماني (سينوشور)' : isCkb ? 'ئاسانکاری بیمەی نیشتمانی و دەستەبەری سینۆشوور' : 'Sinosure Sovereign Credit & Risk Underwriting',
      category: 'services',
      typeLabel: isZh ? '出口信贷' : isAr ? 'ائتمان سيادي' : isCkb ? 'قەرز و بیمەی سەروەری' : 'Export Credit Underwriting',
      desc: isZh ? '为伊拉克重大工程承包商与中国采购方提供主权买方信贷咨询与风险对冲服务。' : isAr ? 'تغطية المخاطر الائتمانية والتمويلية للمشاريع الكبرى بين الشركات الصينية والعراقية.' : isCkb ? 'دڵنیادانی دارایی بۆ پڕۆژە هاوبەشەکان لە ڕێگەی دەزگای سینۆشوورەوە.' : 'Bilateral underwriting portal for infrastructure financing and supplier risk mitigation.',
      valueOrTag: 'Zero Default Escort',
      url: `/${lang}/institute/insurance-facilitation`,
      icon: ShieldCheck
    },

    // Summit Expo 2026
    {
      id: 'summit-sulaymaniyah',
      name: isZh ? '2026 苏莱曼尼亚中伊经贸与基础设施峰会' : isAr ? 'قمة ومعرض العراق والصين الاقتصادي ٢٠٢٦ (السليمانية)' : isCkb ? 'لووتکە و پێشانگای ئابووری عێراق-چین ٢٠٢٦ لە سلێمانی' : 'Iraq-China Economic Summit & Expo 2026 (Sulaymaniyah)',
      category: 'summit',
      typeLabel: isZh ? '国事经贸博览会' : isAr ? 'قمة ومعرض دولي' : isCkb ? 'لووتکەی نێودەوڵەتی' : 'State Economic Summit',
      desc: isZh ? '汇聚 200+ 家中资央企与伊拉克各省政企代表，设有 3D 虚拟展区、VIP 洽谈室与签约中心。' : isAr ? 'ملتقى رفيع المستوى يضم ٢٠٠+ شركة صينية وممثلي المحافظات مع جولات تفاعلية ثلاثية الأبعاد.' : isCkb ? 'کۆبوونەوەی گەورەی ئابووری بە بەشداری ٢٠٠+ کۆمپانیای چینی و پێشانگای ٣D.' : 'Flagship bilateral assembly featuring 3D virtual floorplans, B2B matchmaking, and high-level protocol.',
      valueOrTag: '22 Pavilions / 3D Raycasting',
      status: isZh ? '开放展位预订' : isAr ? 'التسجيل مفتوح' : 'Registration Active',
      url: `/${lang}/summit`,
      icon: Calendar
    },
    {
      id: 'summit-vip-accreditation',
      name: isZh ? 'VIP 外交贵宾与政府代表团认证通道' : isAr ? 'اعتماد كبار الشخصيات والوفود الوزارية (VIP)' : isCkb ? 'تۆماری شاندە فەرمییەکان و کەسایەتییە دیارەکان' : 'Diplomatic VIP & Ministerial Delegation Accreditation',
      category: 'summit',
      typeLabel: isZh ? '外事礼宾' : isAr ? 'بروتوكول دبلوماسي' : isCkb ? 'پرۆتۆکۆلی فەرمی' : 'Protocol Clearance',
      desc: isZh ? '提供机场专车礼宾接送、安保车队、双语随行翻译及国宴闭门沙龙预约。' : isAr ? 'خدمات الاستقبال الدبلوماسي، المرافقين اللغويين، والتنسيق الأمني للوزراء والسفراء.' : isCkb ? 'پێشوازی دیپلۆماسی، وەرگێڕی یاوەر و پاراستنی فەرمی بۆ شاندە وزارییەکان.' : 'Secure protocol credential issuance, motorcade escorts, and bilateral ministerial salons.',
      valueOrTag: 'VIP-PROTO Standard',
      url: `/${lang}/summit/register/visitor`,
      icon: Landmark
    },

    // Financial Settlement & Clearing
    {
      id: 'settlement-rail',
      name: isZh ? 'IQD ⇄ RMB 主权双边直接结算清算轨道' : isAr ? 'منظومة التسوية المباشرة دينار عراقي ⇄ يوان صيني' : isCkb ? 'سیستەمی پاکتاوی دارایی ڕاستەوخۆ دینار ⇄ یوان' : 'Direct IQD ⇄ RMB Bilateral Sovereign Clearing Rail',
      category: 'settlement',
      typeLabel: isZh ? '金融清算' : isAr ? 'مقاصة سيادية' : isCkb ? 'پاکتاوی دراوەکان' : 'FinTech Settlement',
      desc: isZh ? '基于伊拉克央行 (CBI) 与中国人民银行 (PBOC) 协议，消除第三方货币汇兑损耗。' : isAr ? 'قناة دفع مباشرة بين المصارف العراقية المعتمدة والمصارف الصينية دون المرور بالدولار.' : isCkb ? 'قەناڵی پارەدانی ڕاستەوخۆ بە یوان و دینار بێ پێویستی بە دۆلار.' : 'Direct interbank FX exchange, 0% USD drag calculation, and ledger clearing telemetry.',
      valueOrTag: '0% USD Friction',
      status: isZh ? '运行中' : isAr ? 'فعال' : 'Operational',
      url: `/${lang}/settlement`,
      icon: CreditCard
    },

    // Verified Enterprises
    {
      id: 'powerchina',
      name: isZh ? '中国电力建设集团 (PowerChina) 伊拉克代表处' : 'PowerChina International Group - Iraq Branch',
      category: 'enterprises',
      typeLabel: isZh ? '能源与基建' : 'Energy & Infrastructure',
      desc: isZh ? '承建萨拉赫丁电站、示范学校建设及南部省份多处电网现代化项目。' : 'Major EPC contractor constructing Salah Al-Din thermal plant and national school infrastructure.',
      valueOrTag: 'Tier-1 Certified',
      url: `/${lang}/search?q=PowerChina`,
      icon: Briefcase
    },
    {
      id: 'cscec',
      name: isZh ? '中国建筑集团 (CSCEC) 中东公司' : 'China State Construction Engineering Corp (CSCEC)',
      category: 'enterprises',
      typeLabel: isZh ? '交通与大型工程' : 'Transportation & Civil EPC',
      desc: isZh ? '承建纳西里耶国际机场、政府行政园区及全国千所示范学校主体工程。' : 'Contractor for Nasiriyah International Airport and key municipal development landmarks.',
      valueOrTag: 'Tier-1 Certified',
      url: `/${lang}/search?q=CSCEC`,
      icon: Briefcase
    },
    {
      id: 'huawei',
      name: isZh ? '华为伊拉克代表处 (Huawei Technologies)' : 'Huawei Technologies Iraq Co. Ltd',
      category: 'enterprises',
      typeLabel: isZh ? '数字经济与ICT' : 'Telecommunications & Cloud',
      desc: isZh ? '为伊拉克主要电信运营商提供 4G/5G 核心网络、国家数据中心及智慧教育解决方案。' : 'Prime telecommunication infrastructure, cloud computing, and fiber-optic backbone provider.',
      valueOrTag: 'Strategic Partner',
      url: `/${lang}/search?q=Huawei`,
      icon: Briefcase
    }
  ], [lang, isAr, isZh, isCkb]);

  // Real-time filtering
  const filtered = useMemo(() => {
    let list = entities;
    if (selectedCategory !== 'all') {
      list = list.filter(item => item.category === selectedCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter(item => 
        item.name.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.typeLabel.toLowerCase().includes(q) ||
        (item.valueOrTag && item.valueOrTag.toLowerCase().includes(q))
      );
    }
    return list;
  }, [entities, query, selectedCategory]);

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      newParams.set('q', val.trim());
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  const categoriesList = [
    { id: 'all', label: isZh ? '全部领域' : isAr ? 'جميع القطاعات' : isCkb ? 'هەموو بوارەکان' : 'All Domains' },
    { id: 'projects', label: isZh ? '战略基建与走廊' : isAr ? 'المشاريع والممرات' : isCkb ? 'پڕۆژە و ڕێڕەوەکان' : 'Strategic Projects' },
    { id: 'services', label: isZh ? '研究所官方服务' : isAr ? 'خدمات معهد CISE' : isCkb ? 'خزمەتگوزاری پەیمانگا' : 'CISE Services' },
    { id: 'summit', label: isZh ? '2026 经贸峰会' : isAr ? 'قمة السليمانية ٢٠٢٦' : isCkb ? 'لووتکەی ٢٠٢٦' : 'Summit & Expo' },
    { id: 'settlement', label: isZh ? '双边货币清算' : isAr ? 'المقاصة المالية' : isCkb ? 'پاکتاوی دراوەکان' : 'Direct Clearing' },
    { id: 'enterprises', label: isZh ? '央企与认证企业' : isAr ? 'الشركات المعتمدة' : isCkb ? 'کۆمپانیا باوەڕپێکراوەکان' : 'Enterprises' },
  ];

  return (
    <div className="w-full min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] py-8 sm:py-12" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Authoritative Header Band */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 start-0 w-2 h-full bg-red-600"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-black uppercase tracking-widest text-red-600 mb-2">
                <Globe2 size={16} />
                <span>{isZh ? '中伊官方权威检索中枢' : isAr ? 'المحرك السيادي الشامل للبحث' : 'State Global Search Index'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
                {isZh ? '全领域中伊战略检索中心' : isAr ? 'مركز البحث الاستراتيجي الموحد' : isCkb ? 'ناوەندی گەڕانی ستراتیژی هاوبەش' : 'Unified Cross-Portal Search Engine'}
              </h1>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 max-w-2xl">
                {isZh ? '跨机构检索重大基建工程、中信保主权担保、2026 经贸峰会展位、第纳尔/人民币清算轨道及官方公报。' : 
                 isAr ? 'ابحث عبر كافة البوابات في المشاريع الاستراتيجية، خدمات سينوشور، أجنحة القمة، مقاصة العملات، والبيانات الرسمية.' :
                 'Instant indexing across bilateral infrastructure, CISE advisory pillars, 3D fairgrounds, direct currency clearing, and sovereign dispatches.'}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 text-xs font-mono font-bold border border-red-200 dark:border-red-900">
                {filtered.length} {isZh ? '条索引结果' : isAr ? 'سجل مطابق' : 'Entities Indexed'}
              </span>
            </div>
          </div>

          {/* Interactive Search Bar in Page */}
          <div className="mt-8 relative">
            <div className="relative flex items-center">
              <div className="absolute start-4 pointer-events-none text-neutral-400">
                <Search size={22} className="text-red-600" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder={
                  isZh ? '键入关键词（如：法奥大港、签证、中信保、汇率计算、3D展位...）' :
                  isAr ? 'أدخل كلمات البحث (مثل: ميناء الفاو، فيزا، سينوشور، مقاصة، أجنحة...)' :
                  isCkb ? 'وشەی گەڕان بنووسە (بۆ نموونە: بەندەری فاو، ڤیزا، ڕێگای گەشەپێدان...)' :
                  'Search keywords (e.g., Faw Port, Visa, Sinosure, Clearing, 3D Booths)...'
                }
                className="w-full h-14 ps-13 pe-12 bg-neutral-50 dark:bg-neutral-800/60 border-2 border-neutral-200 dark:border-neutral-700 focus:border-red-600 focus:bg-white dark:focus:bg-neutral-900 rounded-xl text-neutral-900 dark:text-white placeholder-neutral-400 text-base font-medium transition-all shadow-inner outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => handleQueryChange('')}
                  className="absolute end-4 p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-white transition-colors cursor-pointer"
                  title="Clear query"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="mt-6 flex flex-wrap gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
            {categoriesList.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Matrix */}
        {filtered.length === 0 ? (
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-12 text-center border border-neutral-200 dark:border-neutral-800 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <Search size={26} />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              {isZh ? '未找到符合条件的索引结果' : isAr ? 'لم يتم العثور على نتائج مطابقة' : 'No matching entities discovered'}
            </h3>
            <p className="text-sm text-neutral-500 max-w-md mx-auto">
              {isZh ? '请尝试使用更广泛的关键词，或选择“全部领域”查看全网资源。' :
               isAr ? 'يرجى تجربة كلمات بحث أخرى أو اختيار "جميع القطاعات" للاطلاع على كافة السجلات.' :
               'Try broadening your query keywords or selecting "All Domains" to inspect the full sovereign directory.'}
            </p>
            <button
              onClick={() => { setQuery(''); setSelectedCategory('all'); }}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-700 transition-colors cursor-pointer"
            >
              <span>{isZh ? '重置搜索条件' : isAr ? 'إعادة ضبط البحث' : 'Reset Search Filters'}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => navigate(item.url)}
                  className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-neutral-200 dark:border-neutral-800 hover:border-red-600 dark:hover:border-red-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer relative"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <IconComp size={20} />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                          {item.typeLabel}
                        </span>
                        {item.status && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {item.status}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-black text-neutral-900 dark:text-white group-hover:text-red-600 transition-colors leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 line-clamp-3 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                    {item.valueOrTag ? (
                      <span className="font-mono font-bold text-neutral-700 dark:text-neutral-300">
                        {item.valueOrTag}
                      </span>
                    ) : <span></span>}

                    <div className="flex items-center gap-1 text-red-600 font-bold group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                      <span>{isZh ? '进入专区' : isAr ? 'الانتقال للقسم' : 'Inspect Portal'}</span>
                      <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
