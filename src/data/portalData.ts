import {
  PublicHeroStory,
  PublicWorldStory,
  PublicTrendingItem,
  PublicInitiative,
  PublicFeaturedItem,
  NewsletterSubscriber,
  SecretariatContentItem,
  SecretariatFormSubmission,
  NewsroomArticle,
  NewsroomCategory,
  NewsroomAuthor,
  LiveStreamSession,
  MediaItem,
  BroadcastScheduleItem,
  LiveChatMessage
} from '../types/portals';

// =========================================================================
// 1. PUBLIC PORTAL INITIAL DATA
// =========================================================================

export const initialHeroStory: PublicHeroStory = {
  id: 'hero-bilateral-strategic-accord',
  tag: 'SOVEREIGN ACCORD',
  title: {
    en: 'Baghdad and Beijing Ratify Comprehensive 2026-2035 Strategic Economic & Energy Framework',
    ar: 'بغداد وبكين تصادقان على الإطار الاقتصادي واستراتيجية الطاقة الشاملة 2026-2035',
    zh: '巴格达与北京正式批准2026-2035年中伊全面战略经济与能源合作框架',
    ckb: 'بەغدا و پەکین چوارچێوەی گشتگیری ئابووری و وزەی ستراتیژی 2026-2035 پەسەند دەکەن'
  },
  excerpt: {
    en: 'High-level plenipotentiaries conclude landmark bilateral treaties securing $18.4B in dry canal railway networks, digital dinar-eCNY settlement clearance, and photovoltaic installations across central and southern provinces.',
    ar: 'ممثلو البلدين يختتمون معاهدات تاريخية تؤمن 18.4 مليار دولار لشبكات سكك حديد القناة الجافة، ومقاصة التسوية الرقمية، ومحطات الطاقة الشمسية.',
    zh: '双边全权代表签署总额达184亿美元的里程碑协定，覆盖伊拉克旱港干线铁路走廊、数字第纳尔与数字人民币直接清算机制及南部光伏电站群。',
    ckb: 'شاندە باڵاکان ڕێککەوتننامەی مێژوویی بە بەهای ١٨.٤ ملیار دۆلار بۆ تۆڕی هێڵی ئاسنی کەناڵی وشکانی و یەکلاکردنەوەی دارایی واژۆ دەکەن.'
  },
  category: {
    en: 'Strategic Accord',
    ar: 'اتفاق سيادي',
    zh: '战略协定',
    ckb: 'ڕێککەوتنی ستراتیژی'
  },
  imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1600&q=80',
  href: '/newsroom/bilateral-strategic-accord-2026',
  readTime: '6 min read',
  publishDate: '2026-09-28'
};

export const initialWorldStories: PublicWorldStory[] = [
  {
    id: 'world-faw-corridor-connectivity',
    slug: 'faw-corridor-connectivity',
    title: {
      en: 'Grand Faw Maritime Terminal Achieves Milestone Berth Clearance on BRI Persian Gulf Corridor',
      ar: 'ميناء الفاو الكبير يسجل إنجازاً تاريخياً في رسو السفن على ممر الحزام والطريق في الخليج',
      zh: '大法奥深水港枢纽完成首期深水泊位联调，全面接入“一带一路”海湾航运干线',
      ckb: 'بەندەری گەورەی فاو قۆناغێکی مێژوویی لە لەنگەرگرتنی کەشتییەکان لەسەر ڕێڕەوی کەنداو تۆمار دەکات'
    },
    excerpt: {
      en: 'Ultra-large container vessels deploy synchronized smart logistics automated by Shanghai engineering teams, shortening Eurasian shipping times by 11 days.',
      ar: 'سفن الحاويات العملاقة تفعّل اللوجستيات الذكية المؤتمتة عبر فرق هندسية مشتركة، مما يقلص مدة الشحن بين آسيا وأوروبا بمقدار 11 يوماً.',
      zh: '超大型集装箱货轮试航成功，采用上海工程团队研制的智能化港口调度系统，使亚欧陆海联运时间缩短11天。',
      ckb: 'کەشتییە گەورەکان سیستەمی لۆجستی زیرەک بەکاردەهێنن و ماوەی گواستنەوە بە ١١ ڕۆژ کەم دەکەنەوە.'
    },
    category: { en: 'Maritime Logistics', ar: 'اللوجستيات البحرية', zh: '航运枢纽', ckb: 'لۆجستی دەریایی' },
    region: 'Basra / Shanghai',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    publishDate: '2026-09-27',
    readTime: '4 min',
    views: 14200
  },
  {
    id: 'world-solar-grid-nineveh',
    slug: 'solar-grid-nineveh',
    title: {
      en: 'Nineveh Photovoltaic Megaplex: First Gigawatt Connected to Northern Iraq Grid',
      ar: 'مجمع نينوى للطاقة الشمسية: ربط أول غيغاوات بالشبكة الكهربائية لشمال العراق',
      zh: '尼尼微千兆瓦级光伏综合体：首期1吉瓦电网正式并网供电',
      ckb: 'پڕۆژەی فرە مێگاواتی وزەی خۆری نەینەوا: یەکەم گیگاوات دەبەسترێتەوە بە تۆڕی کارەبا'
    },
    excerpt: {
      en: 'Constructed by China State Construction Engineering, the bilateral solar park delivers sustainable baseload power to 450,000 households and agricultural cooperatives.',
      ar: 'أنشأته الشركة الصينية لهندسة البناء، ليوفر طاقة متجددة مستقرة لأكثر من 450,000 منزل وتعاونية زراعية.',
      zh: '由中国建筑工程总公司总承包的这一示范光伏园区正式投产，为45万户家庭及农业灌溉合作社提供零碳电力。',
      ckb: 'لەلایەن کۆمپانیای ئەندازیاری بیناسازی چینەوە دروستکراوە و کارەبا بۆ ٤٥٠ هەزار خێزان دابین دەکات.'
    },
    category: { en: 'Clean Energy', ar: 'الطاقة النظيفة', zh: '清洁能源', ckb: 'وزەی پاک' },
    region: 'Nineveh / Beijing',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=800&q=80',
    publishDate: '2026-09-26',
    readTime: '5 min',
    views: 11850
  },
  {
    id: 'world-currency-settlement-gateway',
    slug: 'currency-settlement-gateway',
    title: {
      en: 'Central Bank of Iraq and PBOC Expand Digital Settlement Quota for Private Enterprise',
      ar: 'البنك المركزي العراقي وبنك الشعب الصيني يوسعان حصة التسوية الرقمية للقطاع الخاص',
      zh: '伊拉克央行与中国人民银行扩大私营企业跨境数字清算额度',
      ckb: 'بانکی ناوەندی عێراق و بانکی گەلی چین پشکی یەکلاکردنەوەی دارایی بۆ کەرتی تایبەت فراوان دەکەن'
    },
    excerpt: {
      en: 'The sovereign currency settlement gateway handles $420M in monthly invoices without foreign-intermediary correspondent exposure or exchange friction.',
      ar: 'بوابة التسوية السيادية تسجل 420 مليون دولار من الفواتير الشهرية المباشرة دون الحاجة إلى وساطة مصرفية أجنبية.',
      zh: '主权货币清算网关实现月度直接结算规模4.2亿美元，免除第三方中转摩擦与高额汇率兑换损耗。',
      ckb: 'دەروازەی دارایی بڕی ٤٢٠ ملیۆن دۆلار لە پسوولەی مانگانە بە شێوەیەکی ڕاستەوخۆ یەکلا دەکاتەوە.'
    },
    category: { en: 'Sovereign Finance', ar: 'المالية السيادية', zh: '主权金融', ckb: 'دارایی سەروەری' },
    region: 'Baghdad / Beijing',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    publishDate: '2026-09-25',
    readTime: '7 min',
    views: 18900
  }
];

export const initialTrendingItems: PublicTrendingItem[] = [
  {
    id: 'trend-1',
    rank: 1,
    slug: 'digital-settlement-guidelines-2026',
    title: {
      en: 'Sovereign Clearing Protocols: How Iraqi Merchants Settle Directly in e-CNY & IQD',
      ar: 'بروتوكولات المقاصة السيادية: كيف يسوي التجار العراقيون فواتيرهم مباشرة بالدينار واليوان',
      zh: '主权清算规程：伊拉克商户如何通过数字人民币与第纳尔进行点对点经贸结算',
      ckb: 'پڕۆتۆکۆلی دارایی: چۆن بازرگانانی عێراق مامەڵە بە دینار و یوان ئەنجام دەدەن'
    },
    category: { en: 'Finance', ar: 'المالية', zh: '金融清算', ckb: 'دارایی' },
    views: 34200,
    shares: 1840,
    trendDirection: 'hot',
    publishDate: '2026-09-27'
  },
  {
    id: 'trend-2',
    rank: 2,
    slug: 'erbil-beijing-consular-fast-track',
    title: {
      en: 'Consular Fast-Track: Business & Commercial M-Visas Approved in Under 48 Hours',
      ar: 'المسار القنصلي السريع: الموافقة على تأشيرات الأعمال M في أقل من 48 ساعة',
      zh: '领事便利快线：中伊双向商务M字签证48小时内审签规程落地',
      ckb: 'ڕێڕەوی خێرای کونسوڵی: پەسەندکردنی ڤیزای بازرگانی لە ماوەی ٤٨ کاتژمێردا'
    },
    category: { en: 'Consular Desk', ar: 'القنصلية', zh: '领事通告', ckb: 'کونسوڵگەری' },
    views: 29800,
    shares: 1420,
    trendDirection: 'up',
    publishDate: '2026-09-26'
  },
  {
    id: 'trend-3',
    rank: 3,
    slug: 'sulaymaniyah-tech-summit-roundtable',
    title: {
      en: 'Sulaymaniyah Bilateral Tech Forum: 12 Joint AI & Telematics Ventures Inked',
      ar: 'منتدى السليمانية للتكنولوجيا: توقيع 12 مشروعاً مشتركاً للذكاء الاصطناعي والاتصالات',
      zh: '苏莱曼尼亚双边科技峰会圆桌会：12项人工智能与车联网合资项目现场签约',
      ckb: 'کۆڕبەندی تەکنەلۆژیای سلێمانی: واژۆکردنی ١٢ پڕۆژەی هاوبەشی زیرەکی دەستکرد'
    },
    category: { en: 'Innovation', ar: 'الابتكار', zh: '双边科技', ckb: 'داهێنان' },
    views: 22100,
    shares: 980,
    trendDirection: 'up',
    publishDate: '2026-09-25'
  },
  {
    id: 'trend-4',
    rank: 4,
    slug: 'basra-petrochemical-refining-expansion',
    title: {
      en: 'Basra Petrochemical Complex: Sinopec Initiates 300,000-BPD Polymer Expansion',
      ar: 'مجمع البصرة للبتروكيماويات: سينوبك تبدأ توسعة البوليمر بطاقة 300 ألف برميل يومياً',
      zh: '巴斯拉石化综合体扩建：中石化启动日处理30万桶高标号聚合物项目',
      ckb: 'کۆمەڵگەی پێترۆکیمیایی بەسڕە: فراوانکردنی بەرهەمهێنان بە توانای ٣٠٠ هەزار بەرمیل'
    },
    category: { en: 'Energy', ar: 'الطاقة', zh: '能源基建', ckb: 'وزە' },
    views: 18400,
    shares: 720,
    trendDirection: 'stable',
    publishDate: '2026-09-24'
  },
  {
    id: 'trend-5',
    rank: 5,
    slug: 'mesopotamian-heritage-exhibition-beijing',
    title: {
      en: 'National Museum of China to Host Landmark Sumerian & Babylonian Antiquities Exhibition',
      ar: 'المتحف الوطني الصيني يستضيف معرضاً تاريخياً للآثار السومرية والبابلية',
      zh: '中国国家博物馆将举办“美索不达米亚文明辉煌：苏美尔与巴比伦国宝展”',
      ckb: 'مۆزەخانەی نیشتمانی چین میوانداری پێشانگەیەکی دێرینی شوێنەواری سۆمەری دەکات'
    },
    category: { en: 'Cultural Heritage', ar: 'التراث الثقافي', zh: '人文交流', ckb: 'کەلەپوور' },
    views: 15300,
    shares: 610,
    trendDirection: 'up',
    publishDate: '2026-09-23'
  }
];

export const initialInitiatives: PublicInitiative[] = [
  {
    id: 'init-energy-infrastructure',
    slug: 'energy-infrastructure',
    title: {
      en: 'Belt & Road Infrastructure & Projects Registry',
      ar: 'سجل ومشاريع البنية التحتية لمبادرة الحزام والطريق',
      zh: '一带一路重大基建工程与重点项目库',
      ckb: 'تۆماری پڕۆژەکانی ژێرخانی پشتێن و ڕێگا'
    },
    shortDesc: {
      en: 'Audited sovereign tracker monitoring power plants, petrochemical complexes, Grand Faw Port rail spine, and EPC guarantees.',
      ar: 'مرصد سيادي موثق يرصد محطات الكهرباء، مجمعات البتروكيماويات، خط سكك ميناء الفاو الكبير، وضمانات المقاولين.',
      zh: '经主权核验的国家级工程档案，全面覆盖电网扩容、石化基建、大法奥港陆海铁路与中资保函。',
      ckb: 'چاودێری پڕۆژەکانی بەرهەمهێنانی وزە، پترۆکیمیایی، هێڵی ئاسنی بەندەری فاو بە گەرەنتی کۆمپانیاکان.'
    },
    fullDesc: {
      en: 'The foundational pillar uniting the Grand Faw Port, national railway modernization, and Sino-Iraqi joint petrochemical ventures under sovereign regulatory standards.',
      ar: 'الركيزة الأساسية التي تجمع ميناء الفاو الكبير وتحديث السكك الحديدية والمشاريع البتروكيماوية المشتركة وفق أعلى المعايير.',
      zh: '以大法奥港、旱港铁路通道与中伊联合石化项目为支柱的国家级主权能源与基建协作战略。',
      ckb: 'کۆڵەکەی سەرەکی بەستنەوەی بەندەری فاو و نوێکردنەوەی هێڵی ئاسن و پرۆژە هاوبەشەکان.'
    },
    pillar: 'ENERGY_INFRA',
    iconName: 'Zap',
    imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    kpis: [
      { metric: '18.4B USD', label: { en: 'Capital Allocation', ar: 'رأس المال المخصص', zh: '规划投资总额', ckb: 'سەرمایەی تەرخانکراو' } },
      { metric: '1,450 km', label: { en: 'Corridor Trackage', ar: 'طول مسارات الممر', zh: '走廊铁路线路', ckb: 'درێژایی ڕێگاکان' } },
      { metric: '4.8 GW', label: { en: 'Solar Capacity', ar: 'طاقة التوليد الشمسي', zh: '光伏并网容量', ckb: 'توانای وزەی خۆر' } }
    ],
    status: 'strategic',
    targetAudience: {
      en: 'Ministries of Transport, Oil, Electricity, and bilateral EPC contractors',
      ar: 'وزارات النقل والنفط والكهرباء والشركات الهندسية الثنائية',
      zh: '两国交通部、石油部、电力部与总承包商联合体',
      ckb: 'وەزارەتەکانی گواستنەوە، نەوت، کارەبا و بەڵێندەرانی هاوبەش'
    }
  },
  {
    id: 'init-sovereign-settlement',
    slug: 'sovereign-settlement',
    title: {
      en: 'Bilateral Currency Settlement & Clearing Rail (IQD ⇄ RMB)',
      ar: 'مسار مقاصة وتسوية العملات الثنائية (الدينار ⇄ اليوان)',
      zh: '中伊双边本币清算与贸易结算直通通道 (IQD ⇄ RMB)',
      ckb: 'هێڵی پاکتاو و یەکلاکردنەوەی دراوی دوولایەنە (دینار ⇄ یوان)'
    },
    shortDesc: {
      en: 'Direct interbank clearing in IQD and RMB through Central Bank and CIPS/mBridge rails without third-currency drag.',
      ar: 'مقاصة مصرفية مباشرة بالدينار واليوان عبر البنك المركزي وشبكات CIPS/mBridge دون رسوم وساطة بالدولار.',
      zh: '数字人民币与第纳尔点对点直接清算，直连两国央行流动性池与 CIPS/mBridge 网关。',
      ckb: 'مامەڵەی ڕاستەوخۆ بە دراوە نیشتمانییەکان بەبێ پەنابردن بۆ دۆلار و خەرجی زیادە.'
    },
    fullDesc: {
      en: 'Facilitating commercial invoices, letters of credit, and automated merchant settlements backed by sovereign Central Bank liquidity channels.',
      ar: 'تسهيل الفواتير التجارية وخطابات الاعتماد والتسويات الآلية المدعومة بقنوات السيولة للبنوك المركزية.',
      zh: '由两国央行主权信用与流动性池支撑的企业级信用证结算、提单即时清算与商户数字卡服务。',
      ckb: 'ئاسانکاری لە مامەڵەی بازرگانی و دابینکردنی پارە بە پشتیوانی بانکی ناوەندی.'
    },
    pillar: 'FINANCE_GATEWAY',
    iconName: 'Coins',
    imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80',
    kpis: [
      { metric: '$420M+', label: { en: 'Monthly Cleared', ar: 'المقاصة الشهرية', zh: '月度清算规模', ckb: 'مامەڵەی مانگانە' } },
      { metric: '0.12%', label: { en: 'Settlement Friction', ar: 'رسوم المعالجة', zh: '综合结算损耗', ckb: 'کرێی خزمەتگوزاری' } },
      { metric: '24/7', label: { en: 'Real-time Clearing', ar: 'تسوية آنية فورية', zh: '即时清算通道', ckb: 'کارکردنی بەردەوام' } }
    ],
    status: 'active',
    targetAudience: {
      en: 'Accredited commercial banks, importers, state-owned enterprises',
      ar: 'المصارف التجارية المعتمدة، المستوردون، والشركات العامة',
      zh: '定点清算商业银行、进出口企业与跨国采购商',
      ckb: 'بانکە بازرگانییەکان، هاوردەکاران و کۆمپانیاکان'
    }
  },
  {
    id: 'init-academic-exchange',
    slug: 'academic-exchange',
    title: {
      en: 'Chinese Language Centre & HSK Testing Authority',
      ar: 'مركز تعليم واختبارات اللغة الصينية المعتمد (HSK 1-9)',
      zh: '国际中文教育教学中心与标准化 HSK 考点',
      ckb: 'ناوەندی فێرکاری زمانی چینی و تاقیکردنەوەی باوەڕپێکراوی HSK'
    },
    shortDesc: {
      en: 'Accredited standard HSK 1–9 curricula, corporate executive cohorts, certified faculty directory, and government fellowship placement.',
      ar: 'منهاج HSK 1-9 المعتمد، دورات لغة الأعمال التنفيذية، كادر تدريسي معتمد، وبرامج المنح الدبلوماسية الشاملة.',
      zh: '国际标准化 HSK 1-9 级课程、商务汉语高级研讨班、资深母语师资名录与公派留学奖学金直通通道。',
      ckb: 'پرۆگرامی باوەڕپێکراوی HSK، خولی چینی بازرگانی بۆ بەڕێوەبەران، و دابینکردنی کورسی خوێندن لە چین.'
    },
    fullDesc: {
      en: 'Fostering deep mutual understanding between Tsinghua, Peking University, Baghdad University, and Salahaddin University.',
      ar: 'تعزيز الفهم العميق المتبادل بين جامعات تسينغهوا وبكين وبغداد وصلاح الدين.',
      zh: '连接清华大学、北京大学、巴格达大学与萨拉赫丁大学的千人联合培养高层机制。',
      ckb: 'پتەوکردنی پەیوەندی نێوان زانکۆ بەناوبانگەکانی چین، بەغدا و هەولێر.'
    },
    pillar: 'ACADEMIC_FELLOWSHIP',
    iconName: 'GraduationCap',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    kpis: [
      { metric: '1,200+', label: { en: 'Annual Scholars', ar: 'باحث سنوياً', zh: '年度公派学者', ckb: 'خوێندکاری ساڵانە' } },
      { metric: '4 Centers', label: { en: 'Confucius Institutes', ar: 'معاهد كونفوشيوس', zh: '中国文化研究中心', ckb: 'ناوەندی کولتووری' } },
      { metric: '14 Hubs', label: { en: 'Joint Labs', ar: 'مختبرات بحثية', zh: '联合前沿实验室', ckb: 'تاقیگەی هاوبەش' } }
    ],
    status: 'expanding',
    targetAudience: {
      en: 'Universities, academic researchers, graduate scholars, linguists',
      ar: 'الجامعات، الباحثون الأكاديميون، طلاب الدراسات العليا، واللغويون',
      zh: '双边顶尖高校、科研机构博士后、汉学专家与留学生',
      ckb: 'زانکۆکان، توێژەرانی ئەکادیمی، خوێندکارانی باڵا و زمانزانان'
    }
  },
  {
    id: 'init-visa-consular',
    slug: 'visa-consular',
    title: {
      en: 'Bilateral Fast-Track Visa & Consular Desk',
      ar: 'مركز التأشيرات السريعة والتيسير القنصلي الثنائي',
      zh: '中伊双向加急签证与驻地领事服务总台',
      ckb: 'مێزی خێرای ڤیزای بازرگانی و کاروباری کونسوڵی'
    },
    shortDesc: {
      en: 'Expedited commercial, diplomatic, and student visa processing with official biometrics scheduling and live status tracking.',
      ar: 'تأشيرات تجارية ودبلوماسية ودراسية سريعة مع معالجة البصمات، جداول الرسوم، وتتبع المعاملات الفوري.',
      zh: '中伊全类型商务考察、外事礼遇与留学签证快速审理通道，提供生物识别预约与办证进度即时查询。',
      ckb: 'پێدانی ڤیزای بازرگانی، دیپلۆماسی، و خوێندن بە سیستەمی بایۆمەتری و چاودێری خێرای دۆسیە.'
    },
    fullDesc: {
      en: 'A premier consular facilitation network operated across Beijing, Baghdad, Basra, and Erbil for guaranteed compliance and verified credentialing.',
      ar: 'شبكة تيسير قنصلي متميزة تعمل في بكين وبغداد والبصرة وأربيل لضمان الامتثال والتحقق الرقمي.',
      zh: '覆盖北京、巴格达、巴士拉与埃尔比勒的标准化领事服务网络，提供一站式查验与快速出签。',
      ckb: 'تۆڕێکی کونسوڵی پێشکەوتوو لە پەکین، بەغدا، بەسڕە و هەولێر بۆ ئاسانکاری ڤیزا.'
    },
    pillar: 'CONSULAR_SERVICES',
    iconName: 'Passport',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    kpis: [
      { metric: '< 48h', label: { en: 'Commercial Visa SLA', ar: 'سرعة إنجاز فيزا التجارة', zh: '商务签证处理时效', ckb: 'ماوەی دەرچوونی ڤیزا' } },
      { metric: '99.4%', label: { en: 'Verification Accuracy', ar: 'دقة المطابقة والتوثيق', zh: '资质复核通过率', ckb: 'ڕێژەی دروستی' } },
      { metric: '4 Desks', label: { en: 'Consular Locations', ar: 'مكاتب قنصلية', zh: '常设领事协调点', ckb: 'نوسینگەی کونسوڵی' } }
    ],
    status: 'active',
    targetAudience: {
      en: 'Trade delegations, corporate executives, exchange delegations',
      ar: 'الوفود التجارية، التنفيذيون، والوفود الثقافية',
      zh: '双边经贸考察团、企业高级管理人员与访问交流学者',
      ckb: 'شاندە بازرگانییەکان، بەڕێوەبەران و شاندە کولتوورییەکان'
    }
  },
  {
    id: 'init-trade-corridor',
    slug: 'trade-corridor',
    title: {
      en: 'Intermodal Trade Corridor & Maritime Logistics Tracker',
      ar: 'مرصد ممر التجارة الدولي واللوجستيات متعددة الوسائط',
      zh: '多式联运大宗贸易走廊与海运调度系统',
      ckb: 'چاودێری ڕێڕەوی بازرگانی نێودەوڵەتی و لۆجستی کەشتیوانی'
    },
    shortDesc: {
      en: 'Real-time monitoring of the maritime corridor from China ports through Grand Faw Port and Dry Canal rail link.',
      ar: 'متابعة الشحن متعدد الوسائط الرابط بين الموانئ الصينية وميناء الفاو وسكك القناة الجافة والمناطق الحرة.',
      zh: '实时监控连接波斯湾海运、干线旱港铁路通道与保税物流园的多式联运走廊，提供关税与调度分析。',
      ckb: 'چاودێری گواستنەوەی کەلوپەل لە بەندەرەکانی چینەوە بۆ بەندەری فاو و هێڵی ئاسنی وشکانی.'
    },
    fullDesc: {
      en: 'Developing customs-bonded zones, inland container depots, and smart customs tariffs to maximize Eurasian cargo throughput.',
      ar: 'تطوير مناطق حرة ومستودعات جمركية ذكية لمضاعفة حجم التبادل التجاري الأوراسي.',
      zh: '建立沿线保税物流园区、智慧通关口岸与一单制多式联运大宗商品集散基地。',
      ckb: 'دروستکردنی ناوچەی ئازادی گومرگی و کۆگای زیرەک بۆ زیاترکردنی قەبارەی بازرگانی.'
    },
    pillar: 'TRADE_CORRIDOR',
    iconName: 'Ship',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    kpis: [
      { metric: '14.2M Tons', label: { en: 'Annual Freight', ar: 'الشحن السنوي', zh: '年度货物吞吐量', ckb: 'باری ساڵانە' } },
      { metric: '8 Free Zones', label: { en: 'Bonded Logistics Parks', ar: 'مناطق لوجستية حرة', zh: '走廊保税产业园', ckb: 'ناوچەی ئازاد' } },
      { metric: '-35%', label: { en: 'Transit Cost Reduction', ar: 'تخفيض تكلفة العبور', zh: '综合物流成本降幅', ckb: 'کەمبوونەوەی تێچوو' } }
    ],
    status: 'strategic',
    targetAudience: {
      en: 'Logistics operators, shipping lines, customs authorities',
      ar: 'مشغلو اللوجستيات، خطوط الملاحة، وهيئات الجمارك',
      zh: '国际物流集团、集装箱航运公司与海关关税部门',
      ckb: 'کۆمپانیاکانی گواستنەوە، کەشتیوانی و دەسەڵاتی گومرگ'
    }
  },
  {
    id: 'init-women-diplomacy',
    slug: 'women-diplomacy',
    title: {
      en: 'Strategic Institutional Partnerships & Bilateral Advisory',
      ar: 'الشراكات المؤسسية الاستراتيجية والاستشارات الثنائية',
      zh: '主权机构战略合作网络与外商投资准入顾问',
      ckb: 'هاوبەشییە دامەزراوەییە ستراتیژییەکان و ڕاوێژکاری دوولایەنە'
    },
    shortDesc: {
      en: 'Government-to-government bilateral working groups, institutional partner dossiers, JV investment structuring, and regulatory clearance.',
      ar: 'مجموعات عمل ثنائية رسمية، ملفات تمثيل وشراكات مؤسسية، هيكلة الاستثمارات المشتركة، والتخليص التنظيمي.',
      zh: '常设双边专业工作组、联合客座研究员机制、外资准入政策顾问与两地高端投资法律架构支撑。',
      ckb: 'گرووپی کاری هاوبەشی فەرمی، هاوبەشی دامەزراوەیی، ڕێکخستنی وەبەرهێنان و مۆڵەتی یاسایی.'
    },
    fullDesc: {
      en: 'Official bilateral working groups, academic fellowships, corporate partnerships, and diplomatic syndication dossiers across Beijing and Baghdad.',
      ar: 'مجموعات عمل ثنائية رسمية، وزمالات أكاديمية، وشراكات مؤسسية، وملفات تمثيل دبلوماسي مشترك بين بغداد وبكين.',
      zh: '常设双边专业工作组、联合客座研究员机制、企业级战略同盟与涵盖京巴两地的高端外交协同网络。',
      ckb: 'گرووپی کاری هاوبەشی فەرمی، هاوبەشی ئەکادیمی، و دۆسیەی دیپلۆماسی لەنێوان بەغدا و پەکین.'
    },
    pillar: 'STRATEGIC_ADVISORY',
    iconName: 'Award',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    kpis: [
      { metric: 'G2G / B2B', label: { en: 'Working Groups', ar: 'مجموعات عمل رسمية', zh: '双边常设工作组', ckb: 'گرووپی فەرمی' } },
      { metric: '$3.5B+', label: { en: 'JV Advisory Pipeline', ar: 'مشاريع قيد الاستشارة', zh: '在研联合投资标的', ckb: 'پڕۆژەی ڕاوێژکاری' } },
      { metric: '100%', label: { en: 'Regulatory Compliance', ar: 'امتثال تشريعي كامل', zh: '监管合规准入率', ckb: 'پابەندبوونی یاسایی' } }
    ],
    status: 'active',
    targetAudience: {
      en: 'Diplomats, corporate directors, academic leaders, innovators',
      ar: 'الدبلوماسيون، مديرو الشركات، القيادات الأكاديمية، والمستثمرون',
      zh: '双边政府代表、跨国企业董事、金融投资机构与战略顾问专家',
      ckb: 'دیپلۆماتکاران، بەڕێوەبەران، مامۆستایانی زانکۆ و وەبەرهێنەران'
    }
  },
  {
    id: 'init-tech-ai-innovation',
    slug: 'tech-ai-innovation',
    title: {
      en: 'Macroeconomic Intelligence & Strategic Data Hub',
      ar: 'مركز البيانات الاستراتيجية واستخبارات الاقتصاد الكلي',
      zh: '中伊宏观经济态势与前沿经贸数据中心',
      ckb: 'ناوەندی داتای ستراتیژی و زانیاری ئابووری گشتی'
    },
    shortDesc: {
      en: 'Definitive repository of bilateral customs manifests, trade volume metrics, macro indices, and real-time economic telemetry.',
      ar: 'المستودع المرجعي للبيانات الجمركية، مقاييس حجم التبادل التجاري، مؤشرات الاقتصاد الكلي، والبيانات الآنية.',
      zh: '汇集双边海关提单、进出口商品量化图谱、高频宏观景气指数与主权经贸遥测分析大屏。',
      ckb: 'سەرچاوەی سەرەکی داتای گومرگی، قەبارەی بازرگانی دوولایەنە، و نیشاندەرە ئابوورییە کاتییەکان.'
    },
    fullDesc: {
      en: 'High-frequency bilateral economic indicators, trade flow matrices, commodities series, and verifiable intelligence data feeds.',
      ar: 'مؤشرات اقتصادية ثنائية عالية التردد، ومصفوفات تدفق التجارة، وسلاسل أسعار السلع، وموجزات البيانات الموثقة.',
      zh: '高频双边宏观经济景气指数、进出口商品结构图谱与全口径主权经贸数据开放端口。',
      ckb: 'نیشاندەرە ئابوورییە باڵاکان، نەخشەی جوڵەی بازرگانی و داتای پشتڕاستکراوی ئابووری.'
    },
    pillar: 'MACRO_INTELLIGENCE',
    iconName: 'Cpu',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    kpis: [
      { metric: '$51.17B', label: { en: 'Trade Monitored', ar: 'حجم التجارة المرصود', zh: '年度监测经贸体量', ckb: 'قەبارەی بازرگانی' } },
      { metric: 'HS2-98', label: { en: 'Customs Granularity', ar: 'دقة التصنيف الجمركي', zh: '海关编码解析深度', ckb: 'پۆلێنبەندی گومرگ' } },
      { metric: 'Real-Time', label: { en: 'Economic Telemetry', ar: 'بيانات لحظية مباشرة', zh: '宏观数据流实时接入', ckb: 'داتای کاتی ڕاستەقینە' } }
    ],
    status: 'strategic',
    targetAudience: {
      en: 'Macroeconomists, trade analysts, customs executives, finance ministries',
      ar: 'اقتصاديون، محللو تجارة، مسؤولو جمارك، ووزارات مالية',
      zh: '宏观经济学家、国际贸易分析师、海关官员与金融监管部门',
      ckb: 'ئابووریناسان، شیکارانی بازرگانی، بەرپرسانی گومرگ و وەزارەتی دارایی'
    }
  }
];

export const initialFeaturedDispatches: PublicFeaturedItem[] = [
  {
    id: 'feat-1',
    slug: 'mesopotamian-water-desalination-chongqing',
    title: {
      en: 'Basra Estuary Desalination: Chongqing Engineering Consortium Deploys Reverse Osmosis Array',
      ar: 'تحلية مصب شط العرب: تحالف هندسي من تشونغتشينغ يركب منظومة التناضح العكسي',
      zh: '巴斯拉出海口大型海水淡化工程：重庆工程联合体交付首套高通量反渗透水处理阵列',
      ckb: 'شیرینکردنی ئاوی بەسڕە: هاوپەیمانی ئەندازیاری چین سیستەمی نوێی ئاو دادەمەزرێنێت'
    },
    excerpt: {
      en: 'Providing 500,000 cubic meters of potable water daily, addressing southern water security while utilizing energy generated from integrated solar canopies.',
      ar: 'توفير 500 ألف متر مكعب من المياه الصالحة للشرب يومياً لمعالجة أزمة المياه بالاعتماد على الطاقة الشمسية.',
      zh: '日产淡水达50万立方米，配套光伏遮阳发电系统，从根本上解决伊拉克南部工业生活用水安全保障。',
      ckb: 'دابینکردنی ٥٠٠ هەزار مەتری سێجا لە ئاوی خاوێن ڕۆژانە بە وزەی خۆر.'
    },
    author: {
      en: 'Bureau of Bilateral Municipal Infrastructure (Basra Desk)',
      ar: 'مكتب البنية التحتية البلدية الثنائية (مكتب البصرة)',
      zh: '双边市政与水务工程局（巴斯拉分局）',
      ckb: 'نوسینگەی ژێرخانی هاوبەش (بەشی بەسڕە)'
    },
    category: { en: 'Environment & Water', ar: 'البيئة والمياه', zh: '环境与水务', ckb: 'ژینگە و ئاو' },
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    publishDate: '2026-09-27'
  },
  {
    id: 'feat-2',
    slug: 'silk-road-scholars-diplomatic-fellowship',
    title: {
      en: '2026 Sovereign Diplomatic Fellowship: 180 Iraqi Fellows Enrolled Across Tsinghua & PKU',
      ar: 'زمالة الدبلوماسية السيادية 2026: التحاق 180 باحثاً عراقياً بجامعتي تسينغهوا وبكين',
      zh: '2026年度“丝路之光”主权外交奖学金：180名伊拉克青年菁英正式入读清华与北大',
      ckb: 'سکۆلەرشیپی دیپلۆماسی ٢٠٢٦: ١٨٠ توێژەری عێراقی دەست بە خوێندن لە زانکۆکانی پەکین دەکەن'
    },
    excerpt: {
      en: 'Selected fellows embark on full scholarships in International Trade Law, Geopolitics of Energy, and AI Governance with accredited diplomatic credentialing.',
      ar: 'الباحثون المقبولون يبدأون دراستهم في قانون التجارة الدولية، جيوسياسية الطاقة، وحوكمة الذكاء الاصطناعي.',
      zh: '入选学者将在国际经贸法、能源地缘政治与人工智能治理等核心方向完成全额公派研究生深造。',
      ckb: 'خوێندکاران لە یاسای بازرگانی نێودەوڵەتی و وزە بە بڕوانامەی فەرمی درێژە بە خوێندن دەدەن.'
    },
    author: {
      en: 'Joint Academic Secretariat (Beijing / Erbil)',
      ar: 'الأمانة الأكاديمية المشتركة (بكين / أربيل)',
      zh: '中伊联合高等教育秘书处（北京/埃尔比勒）',
      ckb: 'سکرتاریەتی ئەکادیمی هاوبەش (پەکین / هەولێر)'
    },
    category: { en: 'Academic Affairs', ar: 'الشؤون الأكاديمية', zh: '高等教育', ckb: 'کاروباری ئەکادیمی' },
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    publishDate: '2026-09-26'
  }
];

// =========================================================================
// 2. NEWSROOM AUTHORS, CATEGORIES & ARTICLES
// =========================================================================

export const initialNewsAuthors: NewsroomAuthor[] = [
  {
    id: 'auth-haidar-alzubaidi',
    slug: 'haidar-alzubaidi',
    name: 'Dr. Haidar Al-Zubaidi',
    title: {
      en: 'Chief Strategic Analyst & Senior Fellow',
      ar: 'كبير محللي الشؤون الاستراتيجية وزميل أول',
      zh: '首席战略分析师兼资深研究员',
      ckb: 'شیکەرەوەی باڵای ستراتیژی'
    },
    bureau: {
      en: 'Baghdad Bureau',
      ar: 'مكتب بغداد',
      zh: '巴格达总分社',
      ckb: 'نوسینگەی بەغدا'
    },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    bio: {
      en: 'Former advisor to the Council of Ministers on Eurasian infrastructure corridors and sovereign debt structuring.',
      ar: 'مستشار سابق لرئاسة الوزراء لشؤون الممرات الأوراسية وهيكلة الديون السيادية.',
      zh: '曾任伊拉克内阁欧亚大通道与主权经贸顾问，长期专注一带一路中东走廊。',
      ckb: 'ڕاوێژکاری پێشووی ئەنجوومەنی وەزیران بۆ ڕێڕەوەکانی گواستنەوە و ئابووری.'
    },
    credentials: 'PhD Economics (Sorbonne), Sovereign Diplomatic Medal'
  },
  {
    id: 'auth-chen-wei',
    slug: 'chen-wei',
    name: 'Prof. Chen Wei',
    title: {
      en: 'Director of Middle East Energy & Commerce',
      ar: 'مدير شؤون الطاقة والتجارة في الشرق الأوسط',
      zh: '中东能源与经贸研究所所长',
      ckb: 'بەڕێوەبەری کاروباری وزە و بازرگانی'
    },
    bureau: {
      en: 'Beijing Bureau',
      ar: 'مكتب بكين',
      zh: '北京本部',
      ckb: 'نوسینگەی پەکین'
    },
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    bio: {
      en: 'Senior fellow at the Institute of West Asian and African Studies (CASS), specializing in Sino-Arab joint ventures.',
      ar: 'زميل أول في معهد دراسات غرب آسيا، متخصص في المشاريع الصينية العربية المشتركة.',
      zh: '中国社科院西亚非洲研究所资深学者，深度参与中伊双边油气与产能合作规划。',
      ckb: 'توێژەری باڵا لە پەیمانگای ڕۆژئاوای ئاسیا، تایبەتمەند لە پڕۆژە هاوبەشەکان.'
    },
    credentials: 'PhD International Relations (Peking University)'
  },
  {
    id: 'auth-dunya-barzani',
    slug: 'dunya-barzani',
    name: 'Dunya Barzani',
    title: {
      en: 'Senior Correspondent for Trade & Consular Affairs',
      ar: 'كبيرة مراسلي الشؤون التجارية والقنصلية',
      zh: '经贸与领事事务资深特派记者',
      ckb: 'پەیامنێری باڵا بۆ کاروباری بازرگانی و کونسوڵی'
    },
    bureau: {
      en: 'Erbil Bureau',
      ar: 'مكتب أربيل',
      zh: '埃尔比勒分社',
      ckb: 'نوسینگەی هەولێر'
    },
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    bio: {
      en: 'Investigative correspondent covering cross-border settlement, technology transfers, and diplomatic protocols across Kurdistan and Iraq.',
      ar: 'مراسلة استقصائية تغطي التسويات المالية ونقل التكنولوجيا في كردستان والعراق.',
      zh: '常驻伊拉克库尔德地区，深耕双边金融清算、数字丝绸之路落地与领事政策一线报道。',
      ckb: 'پەیامنێری لێکۆڵینەوە لەسەر دارایی و ئاڵوگۆڕی تەکنەلۆژیا لە کوردستان و عێراق.'
    },
    credentials: 'MA International Journalism (Columbia University)'
  }
];

export const initialNewsCategories: NewsroomCategory[] = [
  {
    id: 'cat-strategic',
    slug: 'strategic-alliances',
    name: { en: 'Strategic Alliances', ar: 'التحالفات الاستراتيجية', zh: '战略伙伴关系', ckb: 'هاوپەیمانییە ستراتیژییەکان' },
    description: { en: 'Government accords, ministerial meetings, and sovereign treaties.', ar: 'الاتفاقيات الحكومية والاجتماعات الوزارية.', zh: '政府间协议、部长级首脑会晤与主权条约。', ckb: 'ڕێککەوتنە حکومییەکان و کۆبوونەوە وەزارییەکان.' },
    articleCount: 14
  },
  {
    id: 'cat-energy',
    slug: 'energy-corridors',
    name: { en: 'Energy & Corridors', ar: 'الطاقة والممرات', zh: '能源与走廊基建', ckb: 'وزە و ڕێڕەوەکان' },
    description: { en: 'Refining, pipelines, dry canals, and renewable installations.', ar: 'التكرير والأنابيب والقنوات الجافة ومشاريع الطاقة المتجددة.', zh: '油气炼化管道、旱地港务干线与大型清洁电站。', ckb: 'پاڵاوتن، بۆری نەوت، کەناڵی وشکانی و وزەی نوێ.' },
    articleCount: 22
  },
  {
    id: 'cat-finance',
    slug: 'sovereign-finance',
    name: { en: 'Sovereign Finance', ar: 'المالية السيادية', zh: '货币与跨境金融', ckb: 'دارایی سەروەری' },
    description: { en: 'Direct currency settlements, digital assets, and sovereign trade guarantees.', ar: 'تسويات العملات المباشرة والأصول الرقمية والضمانات التجارية.', zh: '双边本币直接互换、数字结算工具与主权担保机制。', ckb: 'مامەڵەی ڕاستەوخۆ بە دراو، ئاسایشی دارایی و گەرەنتی بازرگانی.' },
    articleCount: 18
  },
  {
    id: 'cat-culture',
    slug: 'culture-exchange',
    name: { en: 'Culture & Education', ar: 'الثقافة والتعليم', zh: '人文与高等教育', ckb: 'کولتوور و پەروەردە' },
    description: { en: 'University partnerships, film festivals, and bilingual fellowships.', ar: 'الشراكات الجامعية، المهرجانات السينمائية، والمنح الثنائية.', zh: '高校智库联盟、中伊电影展播与双语学者交流。', ckb: 'هاوبەشی زانکۆکان، فێستیڤاڵی فیلم و سکۆلەرشیپی دوولایەنە.' },
    articleCount: 16
  }
];

export const initialNewsArticles: NewsroomArticle[] = [
  {
    id: 'art-1-bilateral-accord-2026',
    slug: 'bilateral-strategic-accord-2026',
    title: {
      en: 'Baghdad and Beijing Ratify Comprehensive 2026-2035 Strategic Economic & Energy Framework',
      ar: 'بغداد وبكين تصادقان على الإطار الاقتصادي واستراتيجية الطاقة الشاملة 2026-2035',
      zh: '巴格达与北京正式批准2026-2035年中伊全面战略经济与能源合作框架',
      ckb: 'بەغدا و پەکین چوارچێوەی گشتگیری ئابووری و وزەی ستراتیژی 2026-2035 پەسەند دەکەن'
    },
    excerpt: {
      en: 'High-level plenipotentiaries conclude landmark bilateral treaties securing $18.4B in dry canal railway networks, digital dinar-eCNY settlement clearance, and photovoltaic installations across central and southern provinces.',
      ar: 'ممثلو البلدين يختتمون معاهدات تاريخية تؤمن 18.4 مليار دولار لشبكات سكك حديد القناة الجافة، ومقاصة التسوية الرقمية، ومحطات الطاقة الشمسية.',
      zh: '双边全权代表签署总额达184亿美元的里程碑协定，覆盖伊拉克旱港干线铁路走廊、数字第纳尔与数字人民币直接清算机制及南部光伏电站群。',
      ckb: 'شاندە باڵاکان ڕێککەوتننامەی مێژوویی بە بەهای ١٨.٤ ملیار دۆلار بۆ تۆڕی هێڵی ئاسنی کەناڵی وشکانی و یەکلاکردنەوەی دارایی واژۆ دەکەن.'
    },
    content: {
      en: `
        <h2>Executive Treaty Ratification in the Great Hall of the People</h2>
        <p>In a historic formal plenary ceremony held simultaneously across Beijing and Baghdad, plenipotentiary delegates from the Republic of Iraq and the People's Republic of China signed the definitive ratification instruments for the 2026–2035 Strategic Partnership.</p>
        <p>The accord establishes a permanent bilateral inter-ministerial council with dedicated bureaus in Baghdad, Beijing, and Erbil, tasked with overseeing three foundational pillars: Sovereign Logistics & Transport Corridors, Direct Currency Settlement Integration, and Academic High-Tech Transfer.</p>
        <h2>The Dry Canal Railway & Maritime Logistics</h2>
        <p>Under Title II of the treaty, Chinese state enterprises alongside Iraqi engineering battalions will initiate Phase 1 construction of the 1,450-kilometer dual-track electrified freight railway connecting the Grand Faw Port directly to Turkey's trans-European rail network.</p>
        <p>The project represents a transformative evolution in Eurasian trade corridors, offering guaranteed transit times of under 8 days from Basra to Mediterranean ports.</p>
        <h2>Direct Financial Settlement Framework</h2>
        <p>Addressing international dollar-clearing constraints, Title IV formalizes the joint sovereign settlement protocol between the Central Bank of Iraq and the People's Bank of China, setting up an initial liquidity clearance pool equivalent to $4.5B annually in digital dinar (IQD) and e-CNY.</p>
      `,
      ar: `
        <h2>المصادقة الرسمية على المعاهدة في قاعة الشعب الكبرى</h2>
        <p>في مراسم تاريخية رفيعة المستوى أقيمت بالتزامن في بكين وبغداد، وقع ممثلو جمهورية العراق وجمهورية الصين الشعبية وثائق المصادقة النهائية على الشراكة الاستراتيجية 2026-2035.</p>
        <p>تؤسس المعاهدة لمجلس وزاري ثنائي دائم بمكاتب في بغداد وبكين وأربيل، للإشراف على ثلاثة مسارات: الممرات اللوجستية، التسوية المالية المباشرة، ونقل التكنولوجيا المتقدمة.</p>
        <h2>القناة الجافة والربط السككي</h2>
        <p>بموجب الباب الثاني من المعاهدة، ستبدأ الشركات الصينية بالتعاون مع الكوادر العراقية المرحلة الأولى من سكة حديد الشحن الكهربائية بطول 1,450 كم الرابطة بين ميناء الفاو وتركيا وصولاً إلى أوروبا.</p>
      `,
      zh: `
        <h2>人民大会堂隆重举行正式换文与批准仪式</h2>
        <p>在中伊两国高层外交及经贸代表团的共同见证下，全面深化2026-2035年中伊战略伙伴关系正式批准书在北京与巴格达两地完成同步签署与文本交换。</p>
        <p>该条约设立常设双边部长协调委员会并在北京、巴格达和埃尔比勒常设秘书处，全面统筹陆海大通道建设、本币结算规程及高新技术联合孵化。</p>
        <h2>大法奥港旱海大动脉全线启动</h2>
        <p>条约第二款明确，由中国基建央企牵头的联合体将全面开工全长1450公里的双线重载电气化铁路，从巴士拉大法奥深水港直抵土耳其边界，无缝对接欧洲铁路网。</p>
      `,
      ckb: `
        <h2>پەسەندکردنی فەرمی پەیماننامەکە</h2>
        <p>لە مەراسیمێکی مێژوویدا لە نێوان پەکین و بەغدا، نوێنەرانی باڵای هەردوو وڵات پەسەندکردنی کۆتایی هاوبەشی ستراتیژی ٢٠٢٦-٢٠٣٥یان واژۆ کرد.</p>
        <p>ڕێککەوتننامەکە ئەنجوومەنێکی هاوبەش پێکدەهێنێت بە نوسینگەی فەرمی لە بەغدا، پەکین و هەولێر بۆ سەرپەرشتیکردنی پڕۆژە ستراتیژییەکان.</p>
      `
    },
    category: 'strategic-alliances',
    tags: ['Strategic Accord', 'Grand Faw', 'e-CNY', 'Belt & Road'],
    author: initialNewsAuthors[0],
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80',
    publishDate: '2026-09-28',
    readingTimeMinutes: 6,
    isFeatured: true,
    isBreaking: true,
    isEditorPick: true,
    views: 45200,
    status: 'published',
    relatedSlugs: ['digital-currency-settlement-gateway', 'grand-faw-logistics-berths']
  },
  {
    id: 'art-2-digital-currency-gateway',
    slug: 'digital-currency-settlement-gateway',
    title: {
      en: 'The Digital Sovereign Clearing Architecture: Bypassing Correspondent Bottlenecks',
      ar: 'هندسة المقاصة الرقمية السيادية: تجاوز اختناقات البنوك المراسلة',
      zh: '双边主权数字清算架构解析：彻底破除第三方外汇中转瓶颈',
      ckb: 'شیکاری سیستەمی دارایی سەروەری: تێپەڕاندنی بەربەستەکانی گواستنەوەی پارە'
    },
    excerpt: {
      en: 'An in-depth analysis into the cryptographic settlement engine operated by the Central Bank of Iraq and PBOC, allowing private traders instant, low-friction settlements.',
      ar: 'تحليل معمق في محرك التسوية المشفر الذي يديره البنك المركزي العراقي وبنك الشعب الصيني، والذي يتيح تسويات فورية للتجار دون رسوم تحويل باهظة.',
      zh: '深度解析由伊拉克央行与中国人民银行联合部署的加密主权清算引擎，如何让民营企业实现秒级到账与超低手续费。',
      ckb: 'شیکاری قووڵ لەسەر سیستەمی دارایی بانکی ناوەندی عێراق و چین کە مامەڵەی خێرا و کەم تێچوو بۆ بازرگانان دابین دەکات.'
    },
    content: {
      en: `
        <h2>Algorithmic Currency Clearance Without Intermediaries</h2>
        <p>For decades, bilateral trade between Iraq and East Asia suffered from circuitous correspondent banking pathways, incurring clearing delays of 7 to 14 days and exchange losses averaging 3.8%.</p>
        <p>The sovereign settlement gateway deployed under the bilateral treaty couples authorized Iraqi commercial settlement banks directly to China's Cross-Border Interbank Payment System (CIPS) and digital currency smart contracts.</p>
        <h2>Real-Time Invoice Reconciliation</h2>
        <p>Importers generate verified bill-of-lading tokens that unlock funds upon customs clearance at Umm Qasr, Erbil Dry Port, or Shanghai Maritime Hub.</p>
      `,
      ar: `
        <h2>مقاصة خوارزمية دون وسطاء</h2>
        <p>عانت التجارة الثنائية لعقود من مسارات البنوك المراسلة المعقدة، مع تأخيرات تتراوح بين 7 إلى 14 يوماً وخسائر تحويل عملة تصل إلى 3.8%.</p>
        <p>تربط بوابة التسوية السيادية المصارف العراقية المعتمدة مباشرة بنظام CIPS الصيني وعقود العملات الرقمية الذكية.</p>
      `,
      zh: `
        <h2>规避中间行的点对点主权算法清算</h2>
        <p>长期以来，伊拉克与东亚的贸易受制于层层中转的传统外币清算网络，通常需要7到14天的漫长结算周期并承担平均3.8%的汇率点差剥蚀。</p>
        <p>本次上线的主权网关将伊拉克定点商业清算银行直连人民币跨境支付系统（CIPS）与数字货币智能合约层。</p>
      `,
      ckb: `
        <h2>مامەڵەی ڕاستەوخۆ بەبێ نێوەندگیر</h2>
        <p>بۆ ماوەیەکی زۆر بازرگانی نێوان عێراق و ڕۆژهەڵاتی ئاسیا تووشی دواکەوتن و باجی زۆری ئاڵوگۆڕ دەبوو، ئەم سیستەمە ڕاستەوخۆ چارەسەری دەکات.</p>
      `
    },
    category: 'sovereign-finance',
    tags: ['Finance', 'CIPS', 'e-CNY', 'Central Bank'],
    author: initialNewsAuthors[1],
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    publishDate: '2026-09-27',
    readingTimeMinutes: 5,
    isFeatured: true,
    isBreaking: false,
    isEditorPick: true,
    views: 38400,
    status: 'published',
    relatedSlugs: ['bilateral-strategic-accord-2026']
  },
  {
    id: 'art-3-consular-reforms-erbil',
    slug: 'consular-fast-track-reforms',
    title: {
      en: 'Consular Modernization: Erbil and Beijing Streamline Commercial Visas in Under 48 Hours',
      ar: 'التحديث القنصلي: أربيل وبكين تبسطان إصدار التأشيرات التجارية خلال أقل من 48 ساعة',
      zh: '领事便利化重大突破：埃尔比勒与北京双向商务签证缩短至48小时审发',
      ckb: 'نوێکردنەوەی کونسوڵی: هەولێر و پەکین ڤیزای بازرگانی بۆ کەمتر لە ٤٨ کاتژمێر کەم دەکەنەوە'
    },
    excerpt: {
      en: 'The Joint Consular Secretariat operationalizes a paperless digital attestation portal with biometric verification and direct protocol appointments.',
      ar: 'الأمانة القنصلية المشتركة تفعل بوابة المصادقة الرقمية اللاورقية مع التحقق البايومتري والمواعيد البروتوكولية المباشرة.',
      zh: '联合领事秘书处正式上线无纸化数字认证平台，引入生物识别互认并为两国商协会提供专属预约绿道。',
      ckb: 'سکرتاریەتی کونسوڵی هاوبەش سیستەمی دیجیتاڵی بەبێ کاغەز بۆ خێرایی لە پێدانی ڤیزا کارا دەکات.'
    },
    content: {
      en: `
        <h2>Unified Digital Visa Verification</h2>
        <p>Following high-level consultations between the Iraqi Ministry of Foreign Affairs, the KRG Department of Foreign Relations, and China's Ministry of Foreign Affairs, the bilateral consular desk has integrated real-time digital background verification.</p>
        <p>Delegations holding sovereign Chamber of Commerce endorsements can now receive valid multi-entry business visas within two business days.</p>
      `,
      ar: `
        <h2>نظام تدقيق التأشيرات الرقمي الموحد</h2>
        <p>عقب مشاورات رفيعة بين وزارتي الخارجية العراقية ودائرة العلاقات الخارجية في الإقليم ووزارة الخارجية الصينية، تم دمج التحقق الرقمي الفوري للتأشيرات.</p>
      `,
      zh: `
        <h2>统一样式数字签证与身份查验机制</h2>
        <p>经伊拉克外交部、库区对外关系部与中国外交部多轮磋商，双边领事服务台全面打通两国商务数据库，实现实时无纸化核验与出具电子准签证凭据。</p>
      `,
      ckb: `
        <h2>سیستەمی یەکگرتووی دیجیتاڵی ڤیزا</h2>
        <p>دوای کۆبوونەوە باڵاکانی نێوان هەردوو وڵات، ئێستا شاندە بازرگانییەکان لە ماوەی دوو ڕۆژدا ڤیزا وەردەگرن.</p>
      `
    },
    category: 'culture-exchange',
    tags: ['Consular Desk', 'Visas', 'Trade Delegation'],
    author: initialNewsAuthors[2],
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    publishDate: '2026-09-26',
    readingTimeMinutes: 4,
    isFeatured: false,
    isBreaking: false,
    isEditorPick: false,
    views: 29100,
    status: 'published',
    relatedSlugs: ['bilateral-strategic-accord-2026']
  }
];

// =========================================================================
// 3. LIVE PORTAL (MEDIA HUB) INITIAL DATA
// =========================================================================

export const initialLiveStream: LiveStreamSession = {
  id: 'stream-live-bilateral-plenary',
  slug: 'live-bilateral-plenary-2026',
  title: {
    en: '24/7 Sovereign Bilateral Intelligence Broadcast & Ministerial Briefings',
    ar: 'البث الإخباري السيادي الثنائي المستمر والإحاطات الوزارية الرسمية',
    zh: '中伊24小时全天候主权经贸外交实况卫星与网络直播',
    ckb: 'پەخشی ڕاستەوخۆی ٢٤ کاتژمێری ئاژانس و کۆنفرانسە وەزارییەکان'
  },
  description: {
    en: 'Live ultra-low latency continuous transmission connecting state press centers, diplomatic conferences, and trade summits in Beijing, Baghdad, and Erbil.',
    ar: 'بث مباشر عالي الدقة دون تأخير يربط المراكز الصحفية والمؤتمرات الدبلوماسية في بكين وبغداد وأربيل.',
    zh: '低延迟超高清直播连线，直击北京、巴格达与埃尔比勒三地经贸峰会、记者招待会与重大签约现场。',
    ckb: 'پەخشی ڕاستەوخۆ بە کوالیتی بەرز بۆ گواستنەوەی ڕووداو و کۆنگرە ڕۆژنامەوانییەکان.'
  },
  streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  viewerCount: 8420,
  status: 'live',
  streamHealth: 'excellent',
  startedAt: '2026-09-28T08:00:00Z',
  resolution: '4K 60fps Ultra-HD',
  latencyMs: 140,
  audioTrack: 'Original Trilingual / AI Simultaneous Translation'
};

export const initialMediaItems: MediaItem[] = [
  // --- MOVIES ---
  {
    id: 'media-movie-1',
    slug: 'silk-road-from-basra-to-beijing',
    title: {
      en: 'The Silk Road: From Basra to Beijing',
      ar: 'طريق الحرير: من البصرة إلى بكين',
      zh: '丝路新旅：从巴士拉到北京',
      ckb: 'ڕێگای ئاوریشم: لە بەسڕەوە بۆ پەکین'
    },
    description: {
      en: 'A sweeping cinematic feature dramatizing the centuries-old maritime and overland trade ties connecting Mesopotamian port merchants to the imperial courts of Chang’an.',
      ar: 'فيلم سينمائي ملحمي يجسد الروابط التجارية البحرية والبرية التي ربطت تجار موانئ بلاد الرافدين ببلاط تشانغآن الإمبراطوري.',
      zh: '全景史诗级合拍故事片，生动再现两河流域古港海商远渡重洋、与古长安商埠相濡以沫的千年跨国经贸传奇。',
      ckb: 'فیلمێکی سینەمایی مێژوویی سەرنجڕاکێش لەسەر پەیوەندی بازرگانی نێوان عێراق و چین لە دێرزەمانەوە.'
    },
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    duration: '2h 14m',
    durationMinutes: 134,
    category: 'movies',
    tags: ['Feature Film', 'History', 'Bilateral Cinema', 'Basra'],
    director: 'Karim Al-Hassani & Zhang Yimou Studio',
    producer: 'Sovereign Cultural Media Fund',
    year: 2025,
    originLanguage: 'Arabic & Mandarin',
    subtitles: ['English', 'Arabic', 'Chinese', 'Kurdish'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    publishDate: '2025-11-12',
    rating: 4.9,
    status: 'published'
  },
  {
    id: 'media-movie-2',
    slug: 'mesopotamia-yellow-river',
    title: {
      en: 'Echoes of Ancient Waterways: Mesopotamia to the Yellow River',
      ar: 'أصداء الممرات المائية القديمة: من بلاد الرافدين إلى النهر الأصفر',
      zh: '古水回响：从美索不达米亚到黄河',
      ckb: 'دەنگی ڕووبارە دێرینەکان: لە میزۆپۆتامیاوە بۆ ڕووباری زەرد'
    },
    description: {
      en: 'A critically acclaimed historical drama following two families of astronomers and irrigation engineers exchanging knowledge in the 8th century.',
      ar: 'دراما تاريخية ملهمة تتبع عائلتين من علماء الفلك وهندسة الري يتبادلون المعارف والاكتشافات في القرن الثامن.',
      zh: '备受国际影评界赞誉的古装合拍大片，讲述八世纪两河流域天文学家与中原水利匠人跨越万里交流智慧的动人故事。',
      ckb: 'درامایەکی مێژوویی سەرکەوتوو لەسەر زانایانی فەلەکناسی و ئاودێری لە سەدەی هەشتەمدا.'
    },
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    duration: '1h 58m',
    durationMinutes: 118,
    category: 'movies',
    tags: ['Cinematic Drama', 'Astronomy', 'Silk Road'],
    director: 'Lu Chuan & Farhad Kardozi',
    producer: 'Bilateral Heritage Cinema Lab',
    year: 2026,
    originLanguage: 'Mandarin & Arabic',
    subtitles: ['English', 'Arabic', 'Chinese', 'Kurdish'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    publishDate: '2026-02-18',
    rating: 4.8,
    status: 'published'
  },

  // --- DRAMA SERIES ---
  {
    id: 'media-drama-1',
    slug: 'erbil-consular-chronicles',
    title: {
      en: 'The Diplomat’s Ledger (Season 1)',
      ar: 'سجل الدبلوماسي (الموسم الأول)',
      zh: '外交使者备忘录（第一季全集）',
      ckb: 'دەفتەری دیپلۆماتکار (وەرزی یەکەم)'
    },
    description: {
      en: 'A gripping political drama series detailing the high-stakes negotiations behind the historic 2026 economic corridor accord and energy pacts.',
      ar: 'مسلسل سياسي تشويقي يروي كواليس المفاوضات المعقدة خلف اتفاقية الممر الاقتصادي ومعاهدات الطاقة الكبرى لعام 2026.',
      zh: '扣人心弦的双边政经谍战电视剧集，深度展现2026大通道战略谈判幕后无名外交官与技术专家克服重重阻力的英勇历程。',
      ckb: 'زنجیرەیەکی درامای سیاسی سەرنجڕاکێش لەسەر گفتوگۆ ئاڵۆزەکانی پشت ڕێککەوتنە گەورەکانی وزە.'
    },
    posterUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    duration: '10 Episodes · ~45m each',
    durationMinutes: 450,
    category: 'drama',
    tags: ['Drama Series', 'Diplomacy', 'Bilateral Accords'],
    director: 'Samir Tariq & Zhao Baogang',
    producer: 'ICA Television Studios',
    year: 2026,
    originLanguage: 'Arabic, Kurdish & Mandarin',
    subtitles: ['English', 'Arabic', 'Chinese', 'Kurdish'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    publishDate: '2026-03-01',
    rating: 4.95,
    status: 'published',
    episodesCount: 10
  },
  {
    id: 'media-drama-2',
    slug: 'silk-and-euphrates',
    title: {
      en: 'Silk & Euphrates: The Merchants of Baghdad',
      ar: 'الحرير والفرات: تجار بغداد',
      zh: '丝绸与幼发拉底：巴格达商人传奇',
      ckb: 'ئاوریشم و فورات: بازرگانانی بەغدا'
    },
    description: {
      en: 'A multi-generational drama series tracing a family of textile and ceramic merchants establishing bilateral logistics houses across Guangzhou and Baghdad.',
      ar: 'مسلسل درامي يمتد عبر أجيال يروي قصة عائلة من تجار المنسوجات والخزف أنشأت بيوت تجارة ولوجستيات بين قوانغتشو وبغداد.',
      zh: '横跨三代商界先贤的传奇电视剧，描绘中伊丝绸与陶瓷世家在广州十三行与巴格达古商圈守望相助的发展长卷。',
      ckb: 'زنجیرەیەکی درامی لەسەر بازرگانانی قوماش و سیرامیک کە پەیوەندی بەهێز لە نێوان چین و بەغدا دروست دەکەن.'
    },
    posterUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    duration: '12 Episodes · ~50m each',
    durationMinutes: 600,
    category: 'drama',
    tags: ['Drama', 'Generational Saga', 'Guangzhou', 'Baghdad'],
    director: 'Layla Al-Amiri & Feng Xiaogang',
    producer: 'Bilateral Heritage Media',
    year: 2025,
    originLanguage: 'Arabic & Mandarin',
    subtitles: ['English', 'Arabic', 'Chinese', 'Kurdish'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    publishDate: '2025-10-15',
    rating: 4.87,
    status: 'published',
    episodesCount: 12
  },

  // --- DOCUMENTARY ---
  {
    id: 'media-doc-1',
    slug: 'grand-faw-dry-canal-engineering',
    title: {
      en: 'Engineering Destiny: The Grand Faw & Dry Canal Megaproject',
      ar: 'هندسة المستقبل: ميناء الفاو الكبير ومشروع القناة الجافة',
      zh: '筑梦大通道：大法奥深水港与伊拉克旱港干线纪实',
      ckb: 'ئەندازیاری داهاتوو: بەندەری گەورەی فاو و کەناڵی وشکانی'
    },
    description: {
      en: 'Exclusive documentary cameras follow civil engineers from Basra and Shanghai blasting foundations and laying high-speed electrified railway ties through southern marshes.',
      ar: 'كاميرات وثائقية حصرية ترافق المهندسين المدنيين من البصرة وشنغهاي أثناء تشييد الأساسات ووضع خطوط السكك الحديدية السريعة.',
      zh: '国家地理级高清纪录长片，独家镜头深入大沼泽区与深海打桩现场，全景揭秘亚欧第三大洲际贸易走廊的诞生过程。',
      ckb: 'بەڵگەنامەییەکی تایبەت لەسەر کارکردنی ئەندازیارانی عێراق و چین لە دروستکردنی هێڵی شەمەندەفەر.'
    },
    posterUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    duration: '1h 24m',
    durationMinutes: 84,
    category: 'documentary',
    tags: ['Documentary', 'Grand Faw', 'Engineering', 'Basra'],
    director: 'Dr. Ziad Al-Khafaji & CCTV Documentary Unit',
    producer: 'Ministry of Transport Joint Media Group',
    year: 2026,
    originLanguage: 'Trilingual (Ar/En/Zh/Ckb)',
    subtitles: ['English', 'Arabic', 'Chinese', 'Kurdish'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    publishDate: '2026-08-10',
    rating: 4.98,
    status: 'published'
  },
  {
    id: 'media-doc-2',
    slug: 'digital-dinar-ecny-experiment',
    title: {
      en: 'Sovereign Clearing: The Digital Dinar & e-CNY Architecture',
      ar: 'المقاصة السيادية: بنية الدينار الرقمي واليوان الصيني',
      zh: '货币主权新篇：数字第纳尔与数字人民币跨境互通纪实',
      ckb: 'سەروەری دارایی: سیستەمی دیناری دیجیتاڵی و یوانی چینی'
    },
    description: {
      en: 'Central bankers, algorithmic cryptographers, and corporate treasurers explain how bilateral sovereign clearing is transforming post-dollar Eurasian finance.',
      ar: 'محافظو البنوك المركزية وخبراء التشفير يوضحون كيف تعيد التسوية السيادية الثنائية صياغة النظام المالي الإقليمي.',
      zh: '中央银行行长、密码学家与跨国贸易商现场解构无第三方干预的主权外汇清算模型与安全防线。',
      ckb: 'شارەزایانی دارایی و بانکی ڕوونی دەکەنەوە کە چۆن ئەم سیستەمە مامەڵە داراییەکان دەگۆڕێت.'
    },
    posterUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1200&q=80',
    duration: '58m',
    durationMinutes: 58,
    category: 'documentary',
    tags: ['Documentary', 'Finance', 'e-CNY', 'Central Bank'],
    director: 'Dr. Tariq Al-Bahrani',
    producer: 'Sovereign Finance Media Desk',
    year: 2026,
    originLanguage: 'English & Arabic',
    subtitles: ['English', 'Arabic', 'Chinese', 'Kurdish'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    publishDate: '2026-09-02',
    rating: 4.91,
    status: 'published'
  },

  // --- EXCHANGE-PROMOTING VIDEOS ---
  {
    id: 'media-exchange-1',
    slug: 'baghdad-students-in-shenzhen',
    title: {
      en: 'Voices of Tomorrow: Baghdad Tech Scholars in Shenzhen',
      ar: 'أصوات الغد: طلاب التكنولوجيا العراقيون في شنجن',
      zh: '未来之声：巴格达青年科技学者在深圳的创新探索',
      ckb: 'دەنگی بەیانی: خوێندکارانی تەکنەلۆژیای بەغدا لە شینژێن'
    },
    description: {
      en: 'An inspiring short film profiling Iraqi engineering fellows learning autonomous robotics, AI vision models, and solar manufacturing in Guangdong research labs.',
      ar: 'فيلم قصير ملهم يوثق رحلة باحثين عراقيين يتدربون على روبوتات الذكاء الاصطناعي وتقنيات تصنيع الطاقة الشمسية في مقاطعة غوانغدونغ.',
      zh: '生动记录来自巴格达大学与巴士拉大学的青年工程学者在深圳高新区参与智能机器人与光伏研发的研学经历。',
      ckb: 'کورتە فیلمێکی بەپێز لەسەر خوێندکارانی ئەندازیاری عێراقی لە تاقیگەکانی تەکنەلۆژیای چین.'
    },
    posterUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    duration: '26m',
    durationMinutes: 26,
    category: 'exchange',
    tags: ['Cultural Exchange', 'Youth', 'AI Scholars', 'Shenzhen'],
    director: 'Zaidan Al-Dulaimi & Lin Dan',
    producer: 'Sino-Iraqi Youth Foundation',
    year: 2026,
    originLanguage: 'Arabic, Mandarin & English',
    subtitles: ['English', 'Arabic', 'Chinese', 'Kurdish'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    publishDate: '2026-09-15',
    rating: 4.96,
    status: 'published'
  },
  {
    id: 'media-exchange-2',
    slug: 'sinology-in-sulaymaniyah',
    title: {
      en: 'Bridges of Ink: Teaching Mandarin & Arabic in Kurdistan',
      ar: 'جسور الحبر: تعليم الماندرين والعربية في كردستان',
      zh: '水墨连心：中国语言文化在伊拉克库尔德斯坦的传播新旅',
      ckb: 'پردی زانست: وانەوتنەوەی زمانی چینی و عەرەبی لە کوردستان'
    },
    description: {
      en: 'A heartfelt journey through university classrooms in Sulaymaniyah and Erbil where Kurdish, Arab, and Chinese youth cultivate linguistic mastery and bilateral friendships.',
      ar: 'رحلة إنسانية دافئة في القاعات الجامعية في السليمانية وأربيل حيث يتقن الشباب الكردي والعربي والصيني اللغات ويبنون جسور الصداقة.',
      zh: '镜头深入苏莱曼尼亚大学与萨拉赫丁大学汉语角，倾听库尔德、阿拉伯与中国青年跨越语际障碍、结下深厚友谊的心声。',
      ckb: 'گەشتێکی سەرنجڕاکێش لەناو زانکۆکانی سلێمانی و هەولێر بۆ فێربوونی زمانی چینی و دروستکردنی هاوڕێیەتی.'
    },
    posterUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    duration: '32m',
    durationMinutes: 32,
    category: 'exchange',
    tags: ['Linguistics', 'Sulaymaniyah', 'Erbil', 'Confucius Institute'],
    director: 'Rezhwan Ahmad & Sun Xia',
    producer: 'CISE Academic Bureau',
    year: 2026,
    originLanguage: 'Kurdish, Mandarin & Arabic',
    subtitles: ['English', 'Arabic', 'Chinese', 'Kurdish'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    publishDate: '2026-08-28',
    rating: 4.94,
    status: 'published'
  }
];

export const initialScheduleItems: BroadcastScheduleItem[] = [
  {
    id: 'sched-1',
    timeSlot: '08:00 - 10:00 GMT',
    isLive: true,
    date: '2026-09-28',
    title: {
      en: 'Morning Sovereign Macroeconomic Briefing & CIPS Market Open',
      ar: 'الإحاطة الاقتصادية الكلية الصباحية وافتتاح سوق المقاصة CIPS',
      zh: '早间双边宏观经济全景速递与人民币跨境结算开盘快报',
      ckb: 'هەواڵی ئابووری بەیانیان و دەستپێکی بازاڕی دارایی'
    },
    category: { en: 'Economic Intelligence', ar: 'الاستخبارات الاقتصادية', zh: '宏观金融', ckb: 'زانیاری ئابووری' },
    description: {
      en: 'Real-time telemetry on oil flows, dry canal construction milestones, and currency clearing rates.',
      ar: 'تغطية حية لتدفقات النفط ومراحل بناء القناة الجافة وأسعار المقاصة.',
      zh: '实时连线原油海运仓单、干线铁路铺轨里程及本币直接清算牌价走势。',
      ckb: 'زانیاری ڕاستەوخۆ لەسەر نەوت و ڕێژەی ئاڵوگۆڕی دراو.'
    }
  },
  {
    id: 'sched-2',
    timeSlot: '12:00 - 13:30 GMT',
    isLive: false,
    date: '2026-09-28',
    title: {
      en: 'Joint Diplomatic Press Conference: Baghdad Secretariat Desk',
      ar: 'المؤتمر الصحفي الدبلوماسي المشترك: مكتب أمانة بغداد',
      zh: '两国联合外交例行记者会：巴格达总秘书处专属发布大厅',
      ckb: 'کۆنگرەی ڕۆژنامەوانی هاوبەشی دیپلۆماسی لە بەغدا'
    },
    category: { en: 'Diplomatic Affairs', ar: 'الشؤون الدبلوماسية', zh: '外交发布', ckb: 'کاروباری دیپلۆماسی' },
    description: {
      en: 'Official bilateral spokesperson answers questions regarding consular transit and visa policy.',
      ar: 'المتحدث الرسمي المشترك يجيب على أسئلة حول العبور القنصلي وسياسة التأشيرات.',
      zh: '双边联合发言人就商务签证便利化新规及跨境人员交流答记者问。',
      ckb: 'وتەبێژی فەرمی وەڵامی پرسیارەکان دەداتەوە لەسەر کاروباری کونسوڵی.'
    }
  },
  {
    id: 'sched-3',
    timeSlot: '17:00 - 19:15 GMT',
    isLive: false,
    date: '2026-09-28',
    title: {
      en: 'Cinematic Premiere: The Silk Road: From Basra to Beijing',
      ar: 'العرض السينمائي الأول: طريق الحرير: من البصرة إلى بكين',
      zh: '电影黄金首播：故事片《丝路新旅：从巴士拉到北京》高清巨幕连播',
      ckb: 'پەخشی سەرەتایی فیلمی مێژوویی: لە بەسڕەوە بۆ پەکین'
    },
    category: { en: 'Bilateral Cinema', ar: 'السينما الثنائية', zh: '影视展播', ckb: 'سینەمای هاوبەش' },
    description: {
      en: 'Special uninterrupted feature presentation with trilingual subtitling and director commentary.',
      ar: 'عرض سينمائي خاص دون انقطاع مع ترجمات متعددة وتعليق المخرج.',
      zh: '4K超清双语原声大片展映，伴有主创导演深度创作访谈。',
      ckb: 'پێشکەشکردنی تایبەتی فیلمەکە بە کوالیتی بەرز و ژێرنووس.'
    }
  }
];

export const initialChatMessages: LiveChatMessage[] = [
  { id: 'c1', user: 'ConsulGeneral_Erbil', text: 'Official signal authenticated. 4K broadcast stream is crisp in Erbil.', timestamp: '10:02', locale: 'en', badge: 'Diplomat' },
  { id: 'c2', user: 'مستشار_التجارة_بغداد', text: 'تحية للمشاهدين، نتابع معاهدة الطاقة باهتمام بالغ.', timestamp: '10:04', locale: 'ar', badge: 'Official' },
  { id: 'c3', user: 'ShanghaiTradeDesk', text: '上海经贸代表团在线，结算网关响应正常，延迟极低。', timestamp: '10:06', locale: 'zh', badge: 'Finance' },
  { id: 'c4', user: 'Kardo_Sulaymaniyah', text: 'سڵاو لە تەواوی ستافی ئاژانس، پەخشەکە زۆر ڕوون و خێرایە.', timestamp: '10:08', locale: 'ckb', badge: 'Fellow' }
];

export const initialSubscribers: NewsletterSubscriber[] = [
  { id: 'sub-1', email: 'director@iraqi-chineseagency.com', subscribedAt: '2026-09-01T10:00:00Z', locale: 'en', bureauInterest: 'All Bureaus', status: 'active' },
  { id: 'sub-2', email: 'trade.delegation@gov.iq', subscribedAt: '2026-09-12T14:30:00Z', locale: 'ar', bureauInterest: 'Baghdad', status: 'active' },
  { id: 'sub-3', email: 'beijing.bureau@cass.org.cn', subscribedAt: '2026-09-18T09:15:00Z', locale: 'zh', bureauInterest: 'Beijing', status: 'active' },
  { id: 'sub-4', email: 'erbil.chamber@kurdistan-trade.org', subscribedAt: '2026-09-22T16:45:00Z', locale: 'ckb', bureauInterest: 'Erbil', status: 'active' }
];

export const initialInquiries: SecretariatFormSubmission[] = [
  {
    id: 'inq-901',
    name: 'Ambassador Tariq Al-Janabi',
    organization: 'Ministry of Foreign Affairs (Bilateral Protocol Wing)',
    email: 'tariq.janabi@mofa.gov.iq',
    subject: 'Coordination for High-Level Energy Delegation (October 2026)',
    department: 'diplomatic',
    message: 'Requesting accredited Secretariat facilitation and fast-track consular clearances for 24 ministerial delegates traveling to Beijing for the BRI Energy Summit.',
    status: 'received',
    submittedAt: '2026-09-27T11:20:00Z',
    assignedDesk: 'Baghdad Diplomatic Secretariat'
  },
  {
    id: 'inq-902',
    name: 'Sinopec International Middle East LLC',
    organization: 'China Petrochemical Corporation',
    email: 'consular.inquiries@sinopec-iraq.cn',
    subject: 'Direct e-CNY Settlement Integration for Basra Engineering Supplies',
    department: 'investment',
    message: 'Seeking official Secretariat clearance to onboard 14 accredited sub-suppliers onto the Sovereign Currency Settlement Gateway before Q4 operations.',
    status: 'in_review',
    submittedAt: '2026-09-26T15:45:00Z',
    assignedDesk: 'Sovereign Settlement Gateway Desk'
  }
];

// =========================================================================
// REACTIVE IN-MEMORY AND LOCALSTORAGE STORE MANAGER
// =========================================================================

class PortalDataManager {
  private static instance: PortalDataManager;

  private heroStory: PublicHeroStory = initialHeroStory;
  private worldStories: PublicWorldStory[] = initialWorldStories;
  private trendingItems: PublicTrendingItem[] = initialTrendingItems;
  private initiatives: PublicInitiative[] = initialInitiatives;
  private featuredItems: PublicFeaturedItem[] = initialFeaturedDispatches;
  private newsArticles: NewsroomArticle[] = initialNewsArticles;
  private newsCategories: NewsroomCategory[] = initialNewsCategories;
  private newsAuthors: NewsroomAuthor[] = initialNewsAuthors;
  private liveStream: LiveStreamSession = initialLiveStream;
  private mediaItems: MediaItem[] = initialMediaItems;
  private scheduleItems: BroadcastScheduleItem[] = initialScheduleItems;
  private chatMessages: LiveChatMessage[] = initialChatMessages;
  private subscribers: NewsletterSubscriber[] = initialSubscribers;
  private inquiries: SecretariatFormSubmission[] = initialInquiries;
  private listeners: Set<() => void> = new Set();

  private constructor() {
    this.loadFromStorage();
  }

  public static getInstance(): PortalDataManager {
    if (!PortalDataManager.instance) {
      PortalDataManager.instance = new PortalDataManager();
    }
    return PortalDataManager.instance;
  }

  private loadFromStorage() {
    if (typeof window === 'undefined') return;
    try {
      const storedArticles = localStorage.getItem('ica_news_articles');
      if (storedArticles) this.newsArticles = JSON.parse(storedArticles);

      const initiativesVer = localStorage.getItem('ica_initiatives_ver');
      if (initiativesVer === '2026.04') {
        const storedInitiatives = localStorage.getItem('ica_initiatives');
        if (storedInitiatives) this.initiatives = JSON.parse(storedInitiatives);
      } else {
        this.initiatives = initialInitiatives;
        localStorage.setItem('ica_initiatives', JSON.stringify(initialInitiatives));
        localStorage.setItem('ica_initiatives_ver', '2026.04');
      }

      const storedMedia = localStorage.getItem('ica_media_items');
      if (storedMedia) this.mediaItems = JSON.parse(storedMedia);

      const storedSubscribers = localStorage.getItem('ica_subscribers');
      if (storedSubscribers) this.subscribers = JSON.parse(storedSubscribers);

      const storedInquiries = localStorage.getItem('ica_inquiries');
      if (storedInquiries) this.inquiries = JSON.parse(storedInquiries);
    } catch (e) {
      console.warn('Could not parse localStorage portal data', e);
    }
  }

  private saveToStorage() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('ica_news_articles', JSON.stringify(this.newsArticles));
      localStorage.setItem('ica_initiatives', JSON.stringify(this.initiatives));
      localStorage.setItem('ica_media_items', JSON.stringify(this.mediaItems));
      localStorage.setItem('ica_subscribers', JSON.stringify(this.subscribers));
      localStorage.setItem('ica_inquiries', JSON.stringify(this.inquiries));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
    this.notify();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  // --- GETTERS ---
  public getHeroStory() { return this.heroStory; }
  public getWorldStories() { return this.worldStories; }
  public getTrendingItems() { return this.trendingItems; }
  public getInitiatives() { return this.initiatives; }
  public getFeaturedItems() { return this.featuredItems; }
  public getNewsArticles() { return this.newsArticles; }
  public getNewsCategories() { return this.newsCategories; }
  public getNewsAuthors() { return this.newsAuthors; }
  public getLiveStream() { return this.liveStream; }
  public getMediaItems(category?: string) {
    if (category) {
      return this.mediaItems.filter(m => m.category === category && m.status === 'published');
    }
    return this.mediaItems;
  }
  public getScheduleItems() { return this.scheduleItems; }
  public getChatMessages() { return this.chatMessages; }
  public getSubscribers() { return this.subscribers; }
  public getInquiries() { return this.inquiries; }

  // --- CRUD: NEWSROOM ARTICLES ---
  public saveArticle(article: NewsroomArticle) {
    const idx = this.newsArticles.findIndex(a => a.id === article.id);
    if (idx >= 0) {
      this.newsArticles[idx] = article;
    } else {
      this.newsArticles.unshift(article);
    }
    this.saveToStorage();
  }

  public softDeleteArticle(id: string) {
    const article = this.newsArticles.find(a => a.id === id);
    if (article) {
      article.status = 'archived';
      this.saveToStorage();
    }
  }

  public restoreArticle(id: string) {
    const article = this.newsArticles.find(a => a.id === id);
    if (article) {
      article.status = 'published';
      this.saveToStorage();
    }
  }

  public permanentDeleteArticle(id: string) {
    this.newsArticles = this.newsArticles.filter(a => a.id !== id);
    this.saveToStorage();
  }

  // --- CRUD: INITIATIVES ---
  public saveInitiative(init: PublicInitiative) {
    const idx = this.initiatives.findIndex(i => i.id === init.id);
    if (idx >= 0) {
      this.initiatives[idx] = init;
    } else {
      this.initiatives.push(init);
    }
    this.saveToStorage();
  }

  public deleteInitiative(id: string) {
    this.initiatives = this.initiatives.filter(i => i.id !== id);
    this.saveToStorage();
  }

  // --- CRUD: MEDIA ITEMS ---
  public saveMediaItem(item: MediaItem) {
    const idx = this.mediaItems.findIndex(m => m.id === item.id);
    if (idx >= 0) {
      this.mediaItems[idx] = item;
    } else {
      this.mediaItems.unshift(item);
    }
    this.saveToStorage();
  }

  public softDeleteMediaItem(id: string) {
    const item = this.mediaItems.find(m => m.id === id);
    if (item) {
      item.status = 'draft';
      this.saveToStorage();
    }
  }

  public restoreMediaItem(id: string) {
    const item = this.mediaItems.find(m => m.id === id);
    if (item) {
      item.status = 'published';
      this.saveToStorage();
    }
  }

  public permanentDeleteMediaItem(id: string) {
    this.mediaItems = this.mediaItems.filter(m => m.id !== id);
    this.saveToStorage();
  }

  // --- NEWSLETTER SUBSCRIPTION ---
  public addSubscriber(email: string, locale: string = 'en', bureauInterest: string = 'General'): boolean {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) return false;
    const exists = this.subscribers.some(s => s.email.toLowerCase() === cleanEmail && s.status === 'active');
    if (!exists) {
      this.subscribers.unshift({
        id: `sub-${Date.now()}`,
        email: cleanEmail,
        subscribedAt: new Date().toISOString(),
        locale,
        bureauInterest,
        status: 'active'
      });
      this.saveToStorage();
    }
    return true;
  }

  public deleteSubscriber(id: string) {
    this.subscribers = this.subscribers.filter(s => s.id !== id);
    this.saveToStorage();
  }

  // --- INQUIRIES ---
  public addInquiry(inquiry: Omit<SecretariatFormSubmission, 'id' | 'submittedAt' | 'status'>) {
    const newInquiry: SecretariatFormSubmission = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      status: 'received',
      submittedAt: new Date().toISOString()
    };
    this.inquiries.unshift(newInquiry);
    this.saveToStorage();
    return newInquiry;
  }

  public updateInquiryStatus(id: string, status: SecretariatFormSubmission['status']) {
    const inq = this.inquiries.find(i => i.id === id);
    if (inq) {
      inq.status = status;
      this.saveToStorage();
    }
  }

  // --- LIVE CHAT ---
  public addChatMessage(user: string, text: string, locale: string = 'en') {
    const msg: LiveChatMessage = {
      id: `msg-${Date.now()}`,
      user,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      locale,
      badge: 'Participant'
    };
    this.chatMessages.push(msg);
    if (this.chatMessages.length > 50) this.chatMessages.shift();
    this.notify();
    return msg;
  }
}

export const portalStore = PortalDataManager.getInstance();
