import fs from 'fs';
import path from 'path';

const SEED_DIR = path.join(process.cwd(), 'server', 'seeds', 'test30');

if (!fs.existsSync(SEED_DIR)) {
  fs.mkdirSync(SEED_DIR, { recursive: true });
}

function writeSeed(filename: string, data: any) {
  const filePath = path.join(SEED_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`[SeedGenerator] Created: ${filename} (${Array.isArray(data) ? data.length : Object.keys(data).length} root entities)`);
}

// 01_newsroom_articles.json
const articles = [
  {
    slug: "test-baghdad-beijing-currency-swap-expansion-2026",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200",
    categorySlug: "macro-economy",
    tags: ["e-CNY", "Bilateral Trade", "CIPS", "PBOC", "CBI"],
    translations: [
      {
        lang: "en",
        title: "Central Bank of Iraq and PBOC Formalize Enhanced 2026 Currency Settlement Protocol",
        excerpt: "Bilateral trade transactions transition smoothly to local currencies, bypassing third-party clearing bottlenecks.",
        content: "<p>The Central Bank of Iraq (CBI) and the People's Bank of China (PBOC) announced the formal activation of their expanded cross-border financial clearing mechanism. Under this treaty, energy exports and heavy infrastructure procurement will settle seamlessly through direct dinar-yuan bilateral conduits and mBridge CBDC channels.</p>",
        seoTitle: "CBI-PBOC Bilateral Currency Settlement Protocol 2026",
        seoDesc: "Direct cross-border financial clearing between Iraq and China formalizes in Baghdad."
      },
      {
        lang: "ar",
        title: "البنك المركزي العراقي وبنك الشعب الصيني يقرّان بروتوكول تسوية العملات المعزز لعام 2026",
        excerpt: "التبادل التجاري الثنائي يتحول بسلاسة إلى العملات المحلية متجاوزاً اختناقات المقاصة الدولية.",
        content: "<p>أعلن البنك المركزي العراقي وبنك الشعب الصيني عن التفعيل الرسمي لآلية المقاصة المالية العابرة للحدود الموسعة. بموجب هذه المعاهدة، ستتم تسوية صادرات الطاقة ومشتريات البنية التحتية الثقيلة عبر قنوات ثنائية مباشرة بالدينار واليوان وقنوات العملة الرقمية mBridge.</p>",
        seoTitle: "بروتوكول تسوية العملات بين العراق والصين 2026",
        seoDesc: "المقاصة المالية المباشرة بين العراق والصين تدخل حيز التنفيذ في بغداد."
      },
      {
        lang: "zh",
        title: "伊拉克中央银行与中国人民银行正式签署2026年本币结算升级议定书",
        excerpt: "双边经贸往来平稳过渡至本币直接结算，有效规避第三方清算通道瓶颈与汇兑摩擦。",
        content: "<p>伊拉克中央银行与中国人民银行联合宣布，正式启动全面升级的跨境金融清算通道。根据议定书，双方在大型能源出口与基建设备采购领域将全面采用人民币与第纳尔直接结算，并加速推进多边央行数字货币桥（mBridge）的实际应用。</p>",
        seoTitle: "中伊2026年本币直接结算协议",
        seoDesc: "中伊双边跨境金融直接结算通道在巴格达全面正式启动。"
      },
      {
        lang: "ck",
        title: "بانکی ناوەندی عێراق و بانکی گەلی چین ڕێککەوتنی فراوانکردنی ئاڵوگۆڕی دراو بۆ ٢٠٢٦ واژۆ دەکەن",
        excerpt: "مامەڵە بازرگانییە دووقۆڵییەکان دەگوازرێنەوە بۆ دراوی ناوخۆیی و کێشەی نێوەندگیری دارایی چارەسەر دەکرێت.",
        content: "<p>بانکی ناوەندی عێراق و بانکی گەلی چین بە فەرمی کاراکردنی میکانیزمی پاکتاوی دارایی سنووربەزێنیان ڕاگەیاند بۆ ئاسانکاری لە بازرگانی نەوت و ژێرخانی سەرەکی بە دینار و یوان.</p>",
        seoTitle: "پڕۆتۆکۆلی ئاڵوگۆڕی دراوی عێراق و چین",
        seoDesc: "پاکتاوی دارایی ڕاستەوخۆ لە نێوان عێراق و چین دەچێتە بواری جێبەجێکردنەوە."
      }
    ]
  },
  {
    slug: "test-grand-faw-berth-5-automation-milestone",
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200",
    categorySlug: "infrastructure",
    tags: ["Grand Faw", "Maritime Silk Road", "Ports", "Logistics"],
    translations: [
      {
        lang: "en",
        title: "Grand Faw Port Terminal 5 Deploys Fully Automated Gantry Crane Fleet",
        excerpt: "Sino-Iraqi engineering consortia complete automated calibration on Basra's flagship deep-water container terminal.",
        content: "<p>The General Company for Ports of Iraq and Shanghai Zhenhua Heavy Industries (ZPMC) have finalized integration of 16 autonomous ship-to-shore gantry cranes at Terminal 5 of the Grand Faw Port, cutting vessel turnaround durations by 42%.</p>",
        seoTitle: "Grand Faw Terminal 5 Automated Operations Activated",
        seoDesc: "Autonomous gantry cranes commissioned at Al-Faw deep-water port."
      },
      {
        lang: "ar",
        title: "محطة ميناء الفاو الكبير رقم 5 تنشر أسطول رافعات جسرية مؤتمتة بالكامل",
        excerpt: "الائتلاف الهندسي العراقي-الصيني يكمل المعايرة الآلية لأكبر محطة حاويات في المياه العميقة بالبصرة.",
        content: "<p>أنجزت الشركة العامة لموانئ العراق وشركة شنغهاي تشنهوا للصناعات الثقيلة (ZPMC) تشغيل 16 رافعة جسرية آلية من السفينة إلى الرصيف في المحطة رقم 5 بميناء الفاو، مما يقلص فترات تفريغ الحاويات بنسبة 42%.</p>",
        seoTitle: "تشغيل الرافعات الذكية في ميناء الفاو الكبير",
        seoDesc: "دخول الرافعات المؤتمتة حيز الخدمة في ميناء الفاو بالبصرة."
      },
      {
        lang: "zh",
        title: "法奥深水港5号集装箱码头全自动化岸桥机队正式投产运营",
        excerpt: "中伊工程联合体圆满完成巴士拉旗舰深水码头的智能化岸桥联调与试运行。",
        content: "<p>伊拉克国家港务总局与上海振华重工（ZPMC）共同宣布，法奥大港5号泊位的16台自动化双箱岸桥已通过全负荷验收，将靠港船舶装卸作业综合周转时效提高42%。</p>",
        seoTitle: "法奥大港5号自动化码头投产",
        seoDesc: "振华重工自主研发的智能化大型码头岸桥在巴士拉法奥港全面投用。"
      },
      {
        lang: "ck",
        title: "وێستگەی ژمارە ٥ی بەندەری فاو بە تەواوی بە سیستمێکی ئەلیکترۆنی دەست بەکار دەبێت",
        excerpt: "هاوپەیمانی ئەندازیاری عێراقی-چینی کارەکانی بەستنەوەی ڕافیعە زیرەکەکان لە بەسرە تەواو دەکەن.",
        content: "<p>کۆمپانیای گشتی بەندەرەکانی عێراق بە هەماهەنگی لەگەڵ کۆمپانیای شەنگەهای چینی ١٦ ڕافیعەی زەبەلاحی زیرەکی لە بەندەری فاو خستە کار کە دەبێتە هۆی خێراکردنی کارەکان بە ڕێژەی ٤٢٪.</p>",
        seoTitle: "سیستەمی نوێی بەندەری فاو",
        seoDesc: "دەستپێکردنی کار بە سیستەمی ئەلیکترۆنی لە بەندەری گەورەی فاو."
      }
    ]
  }
];
writeSeed('01_newsroom_articles.json', articles);

// 02_categories_tags.json
const categoriesTags = {
  categories: [
    { slug: "macro-economy", name: "Macro Economy", nameEn: "Macro Economy", nameAr: "الاقتصاد الكلي", nameZh: "宏观经济" },
    { slug: "infrastructure", name: "Strategic Infrastructure", nameEn: "Strategic Infrastructure", nameAr: "البنية التحتية الاستراتيجية", nameZh: "重大基础设施" },
    { slug: "sovereign-diplomacy", name: "Sovereign Diplomacy", nameEn: "Sovereign Diplomacy", nameAr: "الدبلوماسية السيادية", nameZh: "主权外交" },
    { slug: "energy-petroleum", name: "Energy & Petrochemicals", nameEn: "Energy & Petrochemicals", nameAr: "الطاقة والبتروكيماويات", nameZh: "能源化工" },
    { slug: "cultural-exchanges", name: "Civilizational & Cultural", nameEn: "Civilizational & Cultural", nameAr: "التبادل الحضاري والثقافي", nameZh: "文明对话与人文" }
  ],
  tags: [
    { name: "e-CNY" },
    { name: "mBridge" },
    { name: "Grand Faw" },
    { name: "Maritime Silk Road" },
    { name: "Basrah Heavy" },
    { name: "CIPS" },
    { name: "BRI Logistics" },
    { name: "Solar Megawatt" }
  ]
};
writeSeed('02_categories_tags.json', categoriesTags);

// 03_live_events.json
const liveEvents = [
  {
    slug: "test-live-beijing-baghdad-trade-summit-2026",
    isActive: true,
    titleEn: "Baghdad-Beijing Plenipotentiary Economic Forum 2026 (Live Broadcast)",
    titleAr: "منتدى بغداد-بكين الاقتصادي المفوض 2026 (بث مباشر)",
    titleZh: "2026年巴格达-北京全权经贸高层论坛（全程实时直播）",
    titleCkb: "کۆڕبەندی ئابووریی باڵای بەغدا-پەکین ٢٠٢٦ (پەخشی ڕاستەوخۆ)",
    summaryEn: "Live bilateral transmission of ministerial deliberations and bilateral investment agreements signing.",
    summaryAr: "تغطية مباشرة للمباحثات الوزارية وتوقيع اتفاقيات الاستثمار الثنائية المشتركة.",
    summaryZh: "全程实时转播两国各部委双边高层闭门谈判及一揽子战略投资协议签署仪式。",
    summaryCkb: "پەخشی ڕاستەوخۆی کۆبوونەوەی وەزیرەکان و واژۆکردنی گرێبەستە هاوبەشەکان.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    region: "BILATERAL",
    category: "ECONOMY",
    updates: [
      {
        contentEn: "Minister of Trade confirms $4.8B bilateral industrial park in Basra special zone.",
        contentAr: "وزير التجارة يؤكد تخصيص 4.8 مليار دولار للمدينة الصناعية في البصرة.",
        contentZh: "伊拉克贸易部长在讲话中确认，双方将在巴士拉特区联合建设价值48亿美元的中伊现代产业园。",
        contentCkb: "وەزیری بازرگانی تەرخانکردنی ٤.٨ ملیار دۆلاری بۆ شاری پیشەسازی لە بەسرە ڕاگەیاند.",
        isImportant: true,
        authorName: "Live Diplomatic Desk"
      }
    ]
  }
];
writeSeed('03_live_events.json', liveEvents);

// 04_studies_intelligence.json
const studies = [
  {
    slug: "test-study-cips-mbridge-integration-2026",
    titleEn: "Strategic Integration of CIPS and mBridge in Iraqi Sovereign Foreign Reserves",
    titleAr: "التكامل الاستراتيجي لنظام المقاصة CIPS وشبكة mBridge في الاحتياطيات السيادية العراقية",
    titleZh: "CIPS清算系统与数字货币桥（mBridge）在伊拉克主权外汇储备配置中的战略整合",
    titleCkb: "پەیوەستکردنی سیستەمی CIPS و تۆڕی mBridge لە یەدەگی دراوی عێراقدا",
    excerptEn: "Comprehensive quantitative study analyzing reserve risk mitigation and digital yuan clearing corridors.",
    excerptAr: "دراسة استراتيجية كمية تحلل تقليل مخاطر الاحتياطي السيادي وممرات المقاصة باليوان الرقمي.",
    excerptZh: "深度量化评估主权储备多元化、汇率对冲与人民币直接跨境支付通道的系统效益。",
    excerptCkb: "توێژینەوەیەکی وردی دارایی لەسەر کەمکردنەوەی مەترسییەکان و بەکارهێنانی یوان.",
    contentEn: "<p>This research paper authored by CISE Senior Fellows outlines the empirical mechanics of routing bilateral oil receipts directly through the Cross-Border Interbank Payment System (CIPS) paired with multilateral central bank digital currency (mBridge) liquidity pools.</p>",
    contentAr: "<p>توضح هذه الورقة البحثية الصادرة عن كبار باحثي معهد CISE الآليات التطبيقية لتحويل عائدات النفط الثنائية عبر نظام المقاصة المصرفي CIPS بالتكامل مع شبكة mBridge.</p>",
    contentZh: "<p>本篇由中伊战略研究所（CISE）高级研究员执笔的深度白皮书，系统剖析了伊拉克向中国出口石油结算中全面接入人民币跨境支付系统（CIPS）与多边央行数字货币桥（mBridge）的实施路径。</p>",
    contentCkb: "<p>ئەم لێکۆڵینەوەیە لەلایەن پسپۆڕانی پەیمانگای CISE ئامادەکراوە بۆ خستنەڕووی ڕێگاکانی ئاڵوگۆڕی نەوت بە دراوی ناوخۆیی لە ڕێگەی CIPS و mBridge.</p>",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200",
    isPrivate: false
  }
];
writeSeed('04_studies_intelligence.json', studies);

// 05_media_hub_items.json
const mediaHubItems = [
  {
    id: "test-media-basra-deepwater-terminal-drone",
    slug: "test-media-basra-deepwater-terminal-drone",
    title: {
      en: "Basra Deep-Water Terminal 4K Drone Engineering Survey",
      ar: "مسح هندسي جوي بدقة 4K لأرصفة مياه البصرة العميقة",
      zh: "巴士拉深水码头4K高清无人机工程纪实航拍",
      ckb: "وێنەگرتنی ئاسمانی بە کوالیتی 4K بۆ بەندەری قووڵی بەسرە"
    },
    type: "video",
    category: "infrastructure",
    url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200",
    duration: "6:14",
    publishDate: "2026-05-01",
    status: "PUBLISHED",
    sourceVertical: "Media Hub"
  },
  {
    id: "test-media-yuan-dinar-podcast-ep12",
    slug: "test-media-yuan-dinar-podcast-ep12",
    title: {
      en: "Podcast Ep. 12: Structuring Non-Dollar Trade Finance for Mesopotamian Imports",
      ar: "بودكاست حلقة 12: هيكلة التمويل التجاري غير الدولاري للواردات العراقية",
      zh: "双边播客第12期：美索不达米亚进口非美元贸易融资架构解析",
      ckb: "پۆدکاست ئەڵقەی ١٢: دارایی بازرگانی دەرەوەی دۆلار بۆ هاوردەی عێراق"
    },
    type: "podcast",
    category: "finance",
    url: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200",
    duration: "34:20",
    publishDate: "2026-05-03",
    status: "PUBLISHED",
    sourceVertical: "Media Hub"
  }
];
writeSeed('05_media_hub_items.json', mediaHubItems);

// 06_videos_broadcasts.json
const videos = [
  {
    slug: "test-video-al-faw-breakwater-engineering",
    titleEn: "Engineering the World's Longest Breakwater at Al-Faw",
    titleAr: "هندسة أطول كاسر أمواج في العالم في ميناء الفاو",
    titleZh: "世界最长防波堤建设纪实：法奥深水港外海屏障工程",
    titleCkb: "ئەندازیاری درێژترین بەربەستی شەپۆلەکان لە جیهاندا لە فاو",
    descriptionEn: "A high-definition documentary examining the underwater stabilization and tetrapod deployment executed by Sino-Iraqi marine teams.",
    descriptionAr: "وثائقي عالي الدقة يستعرض تقنيات التثبيت البحري تحت الماء ونشر الكتل الخرسانية بأيدي الفرق البحرية المشتركة.",
    descriptionZh: "超高清实景纪录中伊联合水下工程队在法奥外海完成世界最长防波堤稳固与万吨级扭王字块投放的壮举。",
    descriptionCkb: "بەڵگەفیلمێکی ناوازە لەسەر جێبەجێکردنی درێژترین بەربەستی شەپۆل لە فاو بە هاوکاری تیمە هاوبەشەکان.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    coverUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200",
    category: "INFRASTRUCTURE",
    region: "BASRA",
    duration: "18:45",
    isFeatured: true,
    isTrending: true
  }
];
writeSeed('06_videos_broadcasts.json', videos);

// 07_podcasts_audio.json
const podcasts = [
  {
    slug: "test-podcast-sovereign-wealth-roundtable-2026",
    titleEn: "Sovereign Wealth Roundtable: Bilateral Infrastructure Bonds & Guarantees",
    titleAr: "طاولة مستديرة للثروة السيادية: سندات وضمانات البنية التحتية الثنائية",
    titleZh: "主权财富高端圆桌：中伊双边基建专项债券与多边履约担保机制",
    titleCkb: "مێزگردی سامانی سیادی: قەواڵە و گرەنتییەکانی ژێرخانی دووقۆڵی",
    descriptionEn: "Strategic dialogue with sovereign asset managers on underwriting 15-year industrial growth bonds in Beijing and Baghdad.",
    descriptionAr: "حوار استراتيجي مع مديري الأصول السيادية حول تغطية سندات النمو الصناعي لمدة 15 عاماً في بكين وبغداد.",
    descriptionZh: "邀请两国主权财富基金高管深度探讨在巴格达和北京两地发行15年期产业基建主权信用债券的操作实务。",
    descriptionCkb: "گفتوگۆی ستراتیژی لەگەڵ بەڕێوەبەرانی سامانی گشتی لەسەر دەرکردنی قەواڵەی دارایی درێژخایەن.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    coverUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1200",
    host: "Iraq-China Strategic Network",
    guestName: "Dr. Haidar Al-Lami & Chen Jining",
    guestRole: "Senior Financial Sovereign Advisors",
    category: "MACROECONOMICS",
    region: "BILATERAL",
    duration: "41:15",
    isFeatured: true,
    isTrending: true
  }
];
writeSeed('07_podcasts_audio.json', podcasts);

// 08_documentaries.json
const documentaries = [
  {
    slug: "test-doc-two-rivers-yellow-river-codex",
    titleEn: "Between Two Rivers and the Yellow River: Civilizational Exchange",
    titleAr: "بين بلاد الرافدين والنهر الأصفر: حوار الحضارات الأصيلة",
    titleZh: "两河与黄河的千年回响：古老文明交流互鉴启示录",
    titleCkb: "لە نێوان دوو ڕووبار و ڕووباری زەرد: دیالۆگی شارستانییەتە دێرینەکان",
    descriptionEn: "A four-part cinematic exploration uncovering 2,000 years of silk route maritime contact, diplomatic seals, and astronomical cooperation.",
    descriptionAr: "استكشاف سينمائي من أربعة أجزاء يوثق 2000 عام من الاتصال البحري لطريق الحرير والأختام الدبلوماسية والتعاون الفلكي.",
    descriptionZh: "四集高清大型历史文献纪录片，全景展现横跨两千年的海上丝路通商印信、天文学联合观测与古籍文献互译实录。",
    descriptionCkb: "بەڵگەفیلمێکی چوار بەشی لەسەر پەیوەندی دوو هەزار ساڵەی بازرگانی و کەلتووری نێوان میزۆپۆتامیا و چین.",
    synopsisEn: "From ancient Ctesiphon to Chang'an, archaeological findings demonstrate sustained bilateral affinity.",
    synopsisAr: "من طيسفون القديمة إلى تشانغآن، تشهد المكتشفات الأثرية على الروابط الدبلوماسية المستمرة.",
    synopsisZh: "从泰西封遗址出土的唐代三彩瓷器，到西安大秦景教流行中国碑，见证两国绵延千年的文脉共鸣。",
    synopsisCkb: "لە تەیسەفۆنەوە تا شیئان، دۆزینەوە شوێنەوارییەکان بەڵگەی پەیوەندی بەهێزن.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    coverUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1200",
    director: "Liang Keming & Zaid Al-Husseini",
    category: "CIVILIZATIONAL",
    region: "MESOPOTAMIA_CHINA",
    duration: "58:30",
    isFeatured: true,
    isTrending: true
  }
];
writeSeed('08_documentaries.json', documentaries);

// 09_academic_books.json
const books = [
  {
    slug: "test-book-mesopotamian-silk-road-codex-2026",
    titleEn: "The Mesopotamian Silk Road Codex: Bilateral Treaties and Legal Frameworks",
    titleAr: "مدونة طريق الحرير الرافديني: المعاهدات الثنائية والأطر القانونية",
    titleZh: "美索不达米亚丝路法典：中伊双边商事条约与主权法律架构集",
    titleCkb: "پەیڕەوی ڕێگای ئاوریشمی میزۆپۆتامیا: یاسا و ڕێککەوتننامە دووقۆڵییەکان",
    authorEn: "Dr. Faris Al-Bayati & Prof. Wu Jianxun",
    authorAr: "د. فارس البياتي وأ.د. وو جيان شيون",
    authorZh: "法里斯·巴亚蒂 博士 & 吴建勋 教授",
    authorCkb: "د. فارس ئەلبەیاتی و پرۆفیسۆر وو جیانشون",
    descriptionEn: "Authoritative 600-page treatise compiling all bilateral sovereign treaties, investment protection pacts, and maritime law precedents.",
    descriptionAr: "مؤلف مرجعي في 600 صفحة يجمع كافة المعاهدات السيادية الثنائية واتفاقيات حماية الاستثمار وسوابق القانون البحري.",
    descriptionZh: "全书600页权威专著，完整收录两国历年缔结的主权保护协定、双边海商事争端仲裁先例与外资准入负面清单法规。",
    descriptionCkb: "پەرتووکێکی زانستی لە ٦٠٠ لاپەڕەدا کە سەرجەم ڕێککەوتننامە بازرگانی و یاساییەکان دەگرێتەوە.",
    coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200",
    category: "LAW_AND_DIPLOMACY",
    region: "BILATERAL",
    rating: 4.95,
    pages: 620,
    year: 2026,
    publisher: "CISE Academic Press & Peking University Law Press",
    isbn: "978-7-301-20260-1",
    isFeatured: true,
    isTrending: true
  }
];
writeSeed('09_academic_books.json', books);

// 10_tourism_spots.json
const tourismSpots = [
  {
    slug: "test-tourism-ziggurat-of-ur-sanctuary",
    titleEn: "The Great Ziggurat of Ur: Cradle of Written Law",
    titleAr: "زقورة أور العظيمة: مهد القوانين المكتوبة",
    titleZh: "乌尔大泥塔神庙：人类成文法典的文明摇篮",
    titleCkb: "زیگوراتی گەورەی ئوور: لانکەی یاسا نووسراوەکان",
    city: "Nasiriyah (Dhi Qar)",
    region: "SOUTHERN_IRAQ",
    category: "ARCHAEOLOGY",
    descriptionEn: "Dating back to 2100 BCE, this monument features dedicated bilingual diplomatic signage and expedited consular visas for visiting scholars.",
    descriptionAr: "يعود تاريخه إلى 2100 قبل الميلاد، ويضم لوحات إرشادية دبلوماسية ثنائية اللغة وتسهيلات قنصلية سريعة للباحثين والزوار.",
    descriptionZh: "始建于公元前2100年的乌尔第三王朝核心遗址，已全面开通中伊双语智能导览系统与学者团队落地免签证绿色通道。",
    descriptionCkb: "مێژووەکەی دەگەڕێتەوە بۆ ساڵی ٢١٠٠ی پێش زایین و خاوەنی تابلۆی ڕێبەری دووزمانەیە بۆ گەشتیاران.",
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200",
    galleryUrls: "[]",
    bestTimeToVisit: "November to March",
    visaPolicy: "Visa on Arrival / Consular eVisa",
    flightInfo: "Direct flights Beijing to Baghdad / Basra with high-speed rail transfer",
    rating: 4.98,
    estimatedCost: "$450 - $900 (3-day fully escorted academic pass)",
    isFeatured: true,
    isTrending: true
  }
];
writeSeed('10_tourism_spots.json', tourismSpots);

// 11_women_empowerment.json
const womenFeatures = [
  {
    slug: "test-leader-dr-amira-al-rawi-robotics",
    nameEn: "Dr. Amira Al-Rawi",
    nameAr: "د. أميرة الراوي",
    nameZh: "阿米拉·拉维 博士",
    nameCkb: "د. ئەمیرە ئەلڕاوی",
    titleEn: "Director of Autonomous Maritime Systems, Basra Marine Institute",
    titleAr: "مديرة أنظمة الملاحة البحرية الذكية، معهد البصرة البحري",
    titleZh: "巴士拉海洋工程研究院自主航行与水下机器人研究中心主任",
    titleCkb: "بەڕێوەبەری سیستەمی کەشتیوانی زیرەک لە پەیمانگای دەریایی بەسرە",
    region: "BASRA_SHANGHAI",
    category: "INNOVATION_AND_TECH",
    summaryEn: "Pioneering the deployment of unmanned subsea inspection vehicles across the Grand Faw breakwater channels in partnership with Harbin Engineering University.",
    summaryAr: "رائدة نشر مركبات التفتيش البحرية المسيرة تحت الماء في قنوات ميناء الفاو الكبير بالشراكة مع جامعة هاربين للهندسة.",
    summaryZh: "联合哈尔滨工程大学国家重点实验室，主导研制法奥深水港航道深水自动化多波束扫测与水下清障机器人系统。",
    summaryCkb: "پێشەنگ لە بەکارهێنانی رۆبۆتی ژێر دەریایی بۆ پشکنینی کەناڵەکانی بەندەری فاو بە هاوکاری زانکۆی هاربینی چینی.",
    bioEn: "Educated in Baghdad and Shanghai Jiao Tong University, Dr. Al-Rawi champions bilateral STEM fellowships for Iraqi women engineers.",
    bioAr: "تخرجت في بغداد وجامعة شنغهاي جياو تونغ، وترعى المنح الهندسية الثنائية للمهندسات العراقيات في مجالات الذكاء الاصطناعي البحري.",
    bioZh: "先后毕业于巴格达大学与上海交通大学船舶与海洋工程学院，发起设立中伊女性青年科学家科创卓越奖学金基金。",
    bioCkb: "دەرچووی زانکۆی بەغدا و شەنگەهایە و سەرپەرشتی کۆمەکی خوێندن دەکات بۆ ئەندازیارانی ژن.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200",
    organization: "Sino-Iraqi Maritime Engineering Consortium",
    isFeatured: true,
    isTrending: true
  }
];
writeSeed('11_women_empowerment.json', womenFeatures);

// 12_visa_flights.json
const visaFlights = [
  {
    slug: "test-flight-beijing-baghdad-ca945-express",
    titleEn: "Direct Air Corridor: Air China CA945 / Iraqi Airways IA471 (Beijing - Baghdad)",
    titleAr: "الممر الجوي المباشر: طيران الصين CA945 / الخطوط الجوية العراقية IA471 (بكين - بغداد)",
    titleZh: "中伊直飞空中干线：国航CA945 / 伊拉克航空IA471（北京首都-巴格达国际）",
    titleCkb: "هێڵی ئاسمانی ڕاستەوخۆ: پەکین - بەغدا (کۆمپانیای فڕۆکەوانی عێراق و چین)",
    serviceType: "COMMERCIAL_AVIATION",
    originRegion: "BEIJING_PEK",
    destinationRegion: "BAGHDAD_BGW",
    summaryEn: "Daily scheduled direct widebody passenger and cargo flights connecting the two capitals with VIP consular customs clearance.",
    summaryAr: "رحلات ركاب وشحن جوي يومية مباشرة على متن طائرات عريضة البدن تربط العاصمتين مع تخليص جمركي ودبلوماسي ميسر.",
    summaryZh: "每周七班直达宽体客货运双向直飞航线，提供双边外交礼遇与商务要客一站式高效通关。",
    summaryCkb: "گەشتی ڕۆژانەی ڕاستەوخۆ بۆ گواستنەوەی سەرنشین و کەلوپەل لە نێوان هەردوو پایتەختدا.",
    detailsEn: "Operated with Boeing 787-9 Dreamliners with dedicated cargo compartments for temperature-controlled high-tech bilateral trade goods.",
    detailsAr: "تشغّل بواسطة طائرات بوينغ 787-9 دريملاينر مع مقصورات شحن مخصصة للبضائع التكنولوجية الثنائية عالية الحساسية.",
    detailsZh: "由波音787-9客机执飞，配备恒温生物医药与高端精密机械专属货舱，直飞飞行时间约8.5小时。",
    detailsCkb: "بە بەکارهێنانی فڕۆکەی نوێ بەڕێوەدەچێت بە تەواوی ئاسانکارییە بازرگانییەکانەوە.",
    airlineOrAuthority: "Civil Aviation Authority of Iraq & CAAC",
    processingTime: "8h 35m Nonstop",
    feeOrCost: "Standard Diplomatic / Commercial Tariff",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200",
    isFeatured: true,
    isTrending: true
  }
];
writeSeed('12_visa_flights.json', visaFlights);

// 13_visa_inquiries.json
const visaInquiries = [
  {
    ticketId: "VISA-2026-TEST-90412",
    fullName: "Li Wei (Chief Project Engineer)",
    email: "wei.li@crrc-middleeast.com",
    passportNumber: "E88491024",
    nationality: "Chinese",
    origin: "Beijing Capital International (PEK)",
    destination: "Basra International Airport (BSR)",
    travelDate: "2026-06-15",
    serviceType: "EXECUTIVE_COMMERCIAL_VISA",
    notes: "Expedited consular processing for railway traction substation calibration in Umm Qasr corridor.",
    status: "APPROVED",
    priority: "HIGH",
    contactPhone: "+86 139 1022 8844",
    assignedOfficer: "Baghdad Consular Special Desk"
  }
];
writeSeed('13_visa_inquiries.json', visaInquiries);

// 14_business_opportunities.json
const businessOpportunities = [
  {
    slug: "test-biz-al-faw-free-zone-light-machinery",
    titleEn: "Al-Faw Port Free Trade Zone: High-Precision Industrial Machinery Assembly Hub",
    titleAr: "المنطقة الحرة بميناء الفاو: مجمع تجميع الآلات الصناعية عالية الدقة",
    titleZh: "法奥深水港保税自贸区：高端精密工业母机与成套智能设备组装基地",
    titleCkb: "ناوچەی ئازادی بەندەری فاو: پڕۆژەی کۆکردنەوەی ئامێرە پیشەسازییە پێشکەوتووەکان",
    summaryEn: "120-hectare sovereign lease concession with 0% corporate tax for 25 years and direct berth rail connection.",
    summaryAr: "امتياز إيجار سيادي على مساحة 120 هكتاراً مع إعفاء ضريبي بنسبة 0% لمدة 25 عاماً وربط سككي مباشر بالأرصفة.",
    summaryZh: "规划占地120公顷的主权级产业招商地块，享受25年企业所得税与关税全免政策，配套直通集装箱深水码头的专用货运铁路线。",
    summaryCkb: "زەوییەکی بەرفراوانی پیشەسازی بە بێ باج بۆ ماوەی ٢٥ ساڵ بۆ کۆمپانیا بیانییەکان.",
    contentEn: "<p>The National Investment Commission (NIC) invites qualifying tier-1 engineering firms to establish joint assembly lines for heavy pumps, turbine valves, and automation panels catering to the Gulf and Levantine markets.</p>",
    contentAr: "<p>تدعو الهيئة الوطنية للاستثمار الشركات الهندسية المؤهلة لتأسيس خطوط تجميع مشتركة للمضخات الثقيلة وصمامات التوربينات وألواح الأتمتة للأسواق الإقليمية.</p>",
    contentZh: "<p>伊拉克国家投资委员会（NIC）面向中国高端装备制造龙头企业开放投资准入，设立面向海湾地区与中东市场的电力设备、工程机械及水泵组装合资总装厂。</p>",
    contentCkb: "<p>دەستەی نیشتمانی وەبەرهێنان داوا لە کۆمپانیا پسپۆڕەکان دەکات بۆ وەبەرهێنان لە بواری پیشەسازی قورسدا.</p>",
    category: "INVESTMENT",
    sector: "HEAVY_INDUSTRY",
    investmentValue: "$480,000,000",
    location: "Al-Faw Logistics Free Zone, Basra Governorate",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200",
    featured: true,
    status: "OPEN"
  }
];
writeSeed('14_business_opportunities.json', businessOpportunities);

// 15_chinese_products.json
const chineseProducts = [
  {
    titleEn: "CRRC High-Power Heavy-Haul Diesel Freight Locomotive (Class IQ-FXD3)",
    titleAr: "قاطرة ديزل لشحن البضائع الثقيلة عالية القدرة من CRRC (طراز IQ-FXD3)",
    titleZh: "中车大功率交流传动重载内燃干线货运机车（IQ-FXD3型伊拉克专属定制版）",
    titleCkb: "شەمەندەفەری بارهەڵگری بەهێزی دیزڵ لە لایەن کۆمپانیای CRRC (مۆدێلی تایبەت)",
    descriptionEn: "4,400 kW heavy freight locomotive engineered for desert sandstorm environments and continuous 55°C ambient temperatures connecting Basra to Turkey border.",
    descriptionAr: "قاطرة شحن بقدرة 4400 كيلوواط مصممة خصيصاً لتحمل العواصف الرملية الصحراوية ودرجات حرارة حتى 55 مئوية لربط البصرة بالحدود التركية.",
    descriptionZh: "装车功率达4400千瓦的高性能货运机车，专为中东高温高沙尘恶劣工况定制设计，已正式服务于伊拉克'发展之路'铁路干线示范段。",
    descriptionCkb: "شەمەندەفەرێکی ٤٤٠٠ کیلۆواتی زۆر بەهێز کە بەرگەی گەرما و تۆزی بیابان دەگرێت بۆ هێڵی ئاسنی بەسرە.",
    imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1200",
    category: "RAILWAY_AND_TRANSPORT",
    isFeatured: true,
    order: 1
  }
];
writeSeed('15_chinese_products.json', chineseProducts);

// 16_sourcing_pillars.json
const sourcingPillars = [
  {
    slug: "test-sourcing-heavy-industrial-equipment-verification",
    serviceCode: "HEAVY_MACHINERY_QA",
    iconName: "ShieldCheck",
    isActive: true,
    titleEn: "Heavy Industrial Machinery & Equipment Factory Verification",
    titleAr: "التحقق من مصانع الآلات والمعدات الصناعية الثقيلة",
    titleZh: "大型重工业机械设备源头制造工厂准入审核与品质验厂",
    titleCkb: "پشکنین و دڵنیابوونەوە لە کارگەکانی ئامێری پیشەسازی قورس لە چین",
    descEn: "End-to-end metallurgical testing, ISO/CE compliance audits, and pre-shipment container sealing by accredited inspectors in Yangtze & Pearl River deltas.",
    descAr: "فحوصات ميتالورجية شاملة وتدقيق مطابقة ISO/CE وختم الحاويات قبل الشحن بواسطة مفتشين معتمدين في دلتا اليانغتسي ونهر اللؤلؤ.",
    descZh: "在长三角与珠三角产业带，由驻华特派主权质检专员提供原材料金相分析、出厂满负荷动平衡测试及装箱封签全程监理服务。",
    descCkb: "پشکنینی وردی کوالیتی و دڵنیایی پێش بارکردن لە ڕێگەی پشکنەرە نێودەوڵەتییەکانەوە لە چین.",
    leadSummaryEn: "Eliminate supply-chain risks for public works infrastructure projects in Iraq.",
    leadSummaryAr: "القضاء على مخاطر سلاسل التوريد لمشاريع البنية التحتية العامة في العراق.",
    leadSummaryZh: "彻底杜绝伊拉克国家重大公共基础设施工程物资供应链采购中的不合格品与伪劣备件风险。",
    leadSummaryCkb: "نەهێشتنی هەموو جۆرە کێشەیەک لە هاوردەکردنی ئامێر بۆ پڕۆژە فەرمییەکانی عێراق.",
    wordCount: 420,
    readTimeEn: "3 Min Read",
    readTimeAr: "قراءة في 3 دقائق",
    readTimeZh: "3 分钟速读",
    readTimeCkb: "٣ خولەک خوێندنەوە",
    metricsJson: JSON.stringify([{ label: "Factories Audited", value: "850+" }, { label: "Pass Rate", value: "99.4%" }]),
    standardsJson: JSON.stringify(["ISO 9001:2026", "GB/T 19001", "Iraqi Central Organization for Standardization (COQC)"])
  }
];
writeSeed('16_sourcing_pillars.json', sourcingPillars);

// 17_sourcing_inquiries.json
const sourcingInquiries = [
  {
    ticketId: "SRC-2026-TEST-8812",
    fullName: "Karim Al-Hassani (Procurement Director)",
    email: "procurement@iraq-national-grid.gov.iq",
    company: "Ministry of Electricity, Southern Transmission Directorate",
    inquiryType: "SUBSTATION_TRANSFORMERS",
    targetMarket: "CHINA",
    budget: "$18,500,000",
    message: "Requesting factory inspection and technical compliance verification for 12 units of 132/33kV power transformers in Jiangsu province.",
    status: "PROCESSING",
    assignedOfficer: "Shanghai Sourcing Plenipotentiary Desk"
  }
];
writeSeed('17_sourcing_inquiries.json', sourcingInquiries);

// 18_payment_orders.json
const paymentOrders = [
  {
    reference: "PAY-2026-TEST-MBRIDGE-9921",
    orderType: "BUSINESS",
    direction: "IQD_TO_ECNY",
    sourceCurrency: "IQD",
    targetCurrency: "E_CNY",
    sourceAmount: 1885000000.0,
    targetAmount: 10000000.0,
    exchangeRate: 188.50,
    feeAmount: 6597500.0,
    feePercent: 0.35,
    status: "COMPLETED",
    senderName: "Al-Mansour Heavy Construction Contracting Ltd.",
    senderEmail: "finance@almansour-iraq.com",
    recipientName: "China State Construction Engineering Corp (CSCEC)",
    recipientIdentifier: "CN-MBRIDGE-WALLET-8849-1029",
    purpose: "COMMERCIAL_TRADE",
    settlementMethod: "MBRIDGE_CBDC",
    settlementTxHash: "0x8fa1b209c4819dfaa8201948bc9281a0398492048592819385928194859281a9"
  }
];
writeSeed('18_payment_orders.json', paymentOrders);

// 19_exchange_rates.json
const exchangeRates = [
  {
    pair: "IQD_ECNY",
    baseRate: 188.50,
    bidRate: 187.80,
    askRate: 189.20,
    retailFeePercent: 0.75,
    businessFeePercent: 0.35,
    minimumRetailIqd: 25000.0,
    minimumBusinessIqd: 1000000.0,
    change24h: 0.42,
    high24h: 189.85,
    low24h: 187.10,
    volume24h: "¥ 42.8M / د.ع 8.06B",
    ecnyReservePool: 150000000.0,
    iqdReservePool: 28275000000.0,
    mbridgeStatus: "ACTIVE",
    cipsGatewayStatus: "ONLINE",
    cbiClearingStatus: "SYNCHRONIZED"
  }
];
writeSeed('19_exchange_rates.json', exchangeRates);

// 20_brics_corridors.json
const bricsCorridors = [
  {
    slug: "test-brics-iraq-accession-and-ndb-cooperation",
    titleEn: "Iraq's Roadmap with BRICS+ and New Development Bank Sovereign Financing",
    titleAr: "خارطة طريق انضمام العراق إلى بريكس+ والتمويل السيادي لبنك التنمية الجديد",
    titleZh: "伊拉克与金砖国家（BRICS+）扩员合作及新开发银行主权基建投融资路线图",
    titleCkb: "نەخشەڕێگای پەیوەستبوونی عێراق بە بریکس و دەستکەوتنی دارایی لە بانکی گەشەپێدان",
    summaryEn: "Strategic convergence on local-currency trade corridors and multi-billion-dollar sovereign infrastructure funding packages.",
    summaryAr: "تقارب استراتيجي حول ممرات التجارة بالعملات المحلية وحزم تمويل البنية التحتية السيادية بمليارات الدولارات.",
    summaryZh: "深入阐述伊拉克作为海湾与黎凡特枢纽全面融入金砖经贸清算大循环与新开发银行优惠贷款体系的战略价值。",
    summaryCkb: "ڕێڕەوی دارایی بە دراوی خۆجێیی و وەبەرهێنانی ملیاران دۆلار لە پڕۆژە ستراتیژییەکانی عێراق.",
    contentEn: "<p>The economic alignment of Iraq with the expanded BRICS bloc presents historic de-dollarization avenues and sovereign guarantee syndication for high-speed rail and trans-desert logistics arteries.</p>",
    contentAr: "<p>يمثل التوافق الاقتصادي للعراق مع كتلة بريكس الموسعة مسارات تاريخية للحد من الهيمنة الدولارية وتوفير الضمانات السيادية لشبكات السكك الحديدية اللوجستية.</p>",
    contentZh: "<p>随着金砖国家合作机制的持续深化，伊拉克参与金砖大宗商品清算网与新开发银行（NDB）主权贷款合作，将为法奥港集疏运网络与贯穿全境的高速客货运铁路提供强有力的中长期低成本本币资金支持。</p>",
    contentCkb: "<p>پەیوەستبوون بە بریکس دەبێتە هۆی دروستکردنی هێڵی ئاسنی خێرا و گەشەپێدانی ئابووری سەربەخۆ بۆ عێراق.</p>",
    category: "GEOPOLITICS_AND_TRADE",
    isFeatured: true
  }
];
writeSeed('20_brics_corridors.json', bricsCorridors);

// 21_cultural_exchange.json
const culturalExchange = {
  category: {
    slug: "diplomatic-youth-fellowships",
    nameEn: "Bilateral Diplomatic Fellowships",
    nameAr: "الزمالات الدبلوماسية الثنائية",
    nameZh: "双边青年外交官高级访学研修项目",
    nameCkb: "بورس و مەشقی دیپلۆماسی هاوبەش"
  },
  programs: [
    {
      slug: "test-prog-baghdad-beijing-youth-diplomacy-2026",
      titleEn: "Baghdad-Beijing Bilateral Youth Diplomatic Leadership Fellowship (Cohort 4)",
      titleAr: "زمالة القيادات الدبلوماسية الشبابية الثنائية بغداد-بكين (الدفعة الرابعة)",
      titleZh: "第四届巴格达-北京青年外交领袖与经贸谈判高级学者访学奖学金项目",
      titleCkb: "خولی چوارەمی پێگەیاندنی سەرکردە دیپلۆماتکارە گەنجەکانی بەغدا و پەکین",
      descriptionEn: "A 6-month fully funded sovereign residency split between Foreign Affairs University in Beijing and Al-Mustansiriya Institute in Baghdad.",
      descriptionAr: "إقامة سيادية ممولة بالكامل لمدة 6 أشهر مقسمة بين جامعة الشؤون الخارجية في بكين والمعهد المستنصرية في بغداد.",
      descriptionZh: "由两国教育部与外交智库联合全额资助，分别在北京外交学院与巴格达穆斯坦西里亚学术中心开展为期6个月的浸润式实战外交研修。",
      descriptionCkb: "بۆ ماوەی ٦ مانگ بە تەواوی خەرجییەوە لە نێوان پەکین و بەغدا بۆ فێربوونی یاسای نێودەوڵەتی و دیپلۆماسی.",
      institutionName: "Diplomatic Institute of the Foreign Ministry & China Foreign Affairs University",
      coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200",
      eligibility: "Mid-career diplomats, trade negotiators, and academic researchers aged 25-40.",
      featured: true
    }
  ]
};
writeSeed('21_cultural_exchange.json', culturalExchange);

// 22_market_indices.json
const marketIndices = [
  {
    symbol: "BASRAH_HEAVY_FOB",
    name: "Basrah Heavy Crude FOB Khor Al-Zubair",
    nameZh: "巴士拉重质原油离岸现货指数",
    nameAr: "خام البصرة الثقيل فوب خور الزبير",
    category: "ENERGY_COMMODITIES",
    price: 78.45,
    change: 1.12,
    changePercent: 1.45,
    volume: "1,450,000 bpd",
    high: 79.10,
    low: 77.20,
    open: 77.33,
    currency: "USD / RMB Equivalent"
  },
  {
    symbol: "INE_SC_CRUDE_CNY",
    name: "Shanghai International Energy Exchange Crude Oil (INE SC)",
    nameZh: "上海国际能源交易中心原油期货主力合约",
    nameAr: "بورصة شنغهاي الدولية للطاقة - عقود النفط الآجلة",
    category: "COMMODITY_FUTURES",
    price: 588.60,
    change: 6.40,
    changePercent: 1.10,
    volume: "182,400 Lots",
    high: 592.00,
    low: 581.20,
    open: 582.50,
    currency: "CNY / Barrel"
  }
];
writeSeed('22_market_indices.json', marketIndices);

// 23_partners_network.json
const partners = [
  {
    name: "China National Offshore Oil Corporation (CNOOC Middle East)",
    logoUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=600",
    websiteUrl: "https://www.cnoocltd.com",
    descriptionEn: "Long-term upstream petroleum partner developing the Missan oilfields and Maysan technical vocational centers.",
    descriptionAr: "شريك نفطي استراتيجي في تطوير حقول ميسان النفطية ومراكز التدريب المهني والتقني.",
    descriptionZh: "中国海洋石油集团中东有限公司，负责米桑油田群的绿色高效开发与本地化石化专业人才技术技能实训基地建设。",
    descriptionCkb: "هاوبەشی دێرین لە گەشەپێدانی کێڵگەکانی نەوتی میسان و مەشقی تەکنیکی بۆ کارمەندانی ناوخۆ.",
    isActive: true,
    order: 1
  }
];
writeSeed('23_partners_network.json', partners);

// 24_cise_pillars.json
const cisePillars = [
  {
    slug: "test-pillar-bilateral-macroeconomics-sovereign-finance",
    titleEn: "Macroeconomics, CIPS Integration & Sovereign Finance",
    titleAr: "الاقتصاد الكلي وتكامل CIPS والتمويل السيادي",
    titleZh: "宏观经济、CIPS系统接入与双边主权金融创新",
    titleCkb: "ئابووری گەورە، سیستەمی CIPS و دارایی سیادی",
    descriptionEn: "Focusing on local-currency settlement corridors, reserve risk hedging, and central bank digital currency infrastructure across the Silk Road.",
    descriptionAr: "التركيز على ممرات التسوية بالعملات المحلية والتحوط لمخاطر الاحتياطيات والبنية التحتية للعملات الرقمية للبنوك المركزية.",
    descriptionZh: "专注文明丝路沿线本币直接清算通道构建、主权外汇储备对冲防范机制及央行数字货币（CBDC）金融基础设施研发应用。",
    descriptionCkb: "تەرکیز لەسەر ئاڵوگۆڕی دارایی بە دراوی خۆجێیی و سیستەمە داراییە پێشکەوتووەکان دەکات.",
    leadFellowEn: "Dr. Haidar Al-Lami (Visiting Distinguished Fellow)",
    leadFellowAr: "د. حيدر اللامي (زميل متميز زائر)",
    leadFellowZh: "海德尔·拉米 博士（特聘客座高级研究员）",
    leadFellowCkb: "د. حەیدەر ئەللامی (توێژەری باڵای میوان)",
    metricLabelEn: "Published Sovereign Briefs",
    metricLabelAr: "أوراق سيادية منشورة",
    metricLabelZh: "已向两国政府提交主权内参白皮书",
    metricLabelCkb: "توێژینەوەی بڵاوکراوە",
    metricValue: "48 Monographs",
    topics: JSON.stringify(["CIPS", "mBridge", "Sovereign Debt", "e-CNY", "Bilateral Reserves"]),
    status: "PUBLISHED"
  }
];
writeSeed('24_cise_pillars.json', cisePillars);

// 25_cise_experts.json
const ciseExperts = [
  {
    slug: "test-expert-dr-tariq-al-saadi",
    nameEn: "Dr. Tariq Al-Saadi",
    nameAr: "د. طارق السعدي",
    nameZh: "塔里克·萨阿迪 博士",
    nameCkb: "د. تاریق ئەلسەعدی",
    titleEn: "Senior Fellow in Trans-Eurasian Logistics & Maritime Law",
    titleAr: "كبير باحثين في اللوجستيات الأوراسية والقانون البحري",
    titleZh: "欧亚干线物流与国际海商法高级研究员兼法律咨询顾问",
    titleCkb: "توێژەری باڵا لە بواری لۆجستی نێودەوڵەتی و یاسای دەریاوانی",
    bioEn: "Specializes in multi-modal corridor treaties connecting the Persian Gulf with Anatolia and Central Asia through Chinese rail partnerships.",
    bioAr: "متخصص في معاهدات الممرات متعددة الوسائط التي تربط الخليج العربي بالأناضول وآسيا الوسطى عبر شراكات السكك الحديدية مع الصين.",
    bioZh: "长期从事连接波斯湾、安纳托利亚与中亚腹地多式联运走廊法务条约谈判研究，曾为法奥港集疏运干线提供全程法务辅导。",
    bioCkb: "پسپۆڕە لە ڕێککەوتننامەکانی گواستنەوەی نێودەوڵەتی لە نێوان عێراق و وڵاتانی تر لە ڕێگەی چینەوە.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600",
    pillars: JSON.stringify(["Strategic Infrastructure", "International Treaties"]),
    languages: JSON.stringify(["Arabic", "English", "Mandarin Chinese"]),
    email: "t.alsaadi@cise-institute.org",
    status: "PUBLISHED"
  }
];
writeSeed('25_cise_experts.json', ciseExperts);

// 26_cise_publications.json
const cisePublications = [
  {
    slug: "test-pub-dedollarization-mesopotamian-crude-2026",
    type: "POLICY_BRIEF",
    publicationType: "Policy Brief",
    titleEn: "Mechanisms for Pricing Iraqi Crude in Petroyuan: Feasibility and Risk Hedging",
    titleAr: "آليات تسعير النفط الخام العراقي بالبترويوان: الجدوى والتحوط من المخاطر",
    titleZh: "伊拉克原油采用石油人民币直接挂牌定价结算的机制设计与风险对冲策略研究",
    titleCkb: "میکانیزمی دیاریکردنی نرخی نەوتی عێراق بە پترۆیوان و ئەگەری سەرکەوتنی",
    excerptEn: "Monograph detailing how pricing 30% of Basrah Heavy in digital RMB establishes sustainable capital purchasing parity.",
    excerptAr: "دراسة استراتيجية تفصل كيفية تسعير 30% من خام البصرة الثقيل باليوان الرقمي لتحقيق تكافؤ شرائي مستدام.",
    excerptZh: "深入论证将首期30%巴士拉重质原油对华出口采用数字人民币挂牌结算，对平抑中东汇率震荡与锁定基建采购成本的显著实效。",
    excerptCkb: "شیکارییەکی زانستی لەسەر فرۆشتنی ٣٠٪ی نەوتی بەسرە بە دراوی یوان بۆ بەدەستهێنانی کەرەستەی پیشەسازی بە بێ کێشە.",
    contentEn: "<p>The integration of the Shanghai International Energy Exchange (INE) contracts with Iraq's State Oil Marketing Organization (SOMO) auction mechanism offers hedge security against US dollar liquidity cycles.</p>",
    contentAr: "<p>يوفر تكامل عقود بورصة شنغهاي الدولية للطاقة مع آلية مزادات شركة تسويق النفط العراقية (سومو) حماية وتحوطاً ضد تقلبات السيولة الدولارية.</p>",
    contentZh: "<p>通过将上海国际能源交易中心（INE）原油期货标准仓单体系与伊拉克国家石油营销组织（SOMO）现货招标机制相衔接，双方能够有效规避离岸美元流动性收缩周期引发的被动贬值压力。</p>",
    contentCkb: "<p>بەستنەوەی بۆرسەی وزەی شەنگەهای لەگەڵ کۆمپانیای سۆمۆ سوودێکی زۆری دەبێت بۆ پاراستنی بەهای نەوتی عێراق لە گۆڕانکارییەکانی بازاڕ.</p>",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
    authorName: "Dr. Haidar Al-Lami & Chen Jining",
    topics: JSON.stringify(["Petroyuan", "SOMO", "INE Shanghai", "Basrah Heavy"]),
    region: "BILATERAL",
    doi: "10.2026/cise.pb.0841",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    status: "PUBLISHED"
  }
];
writeSeed('26_cise_publications.json', cisePublications);

// 27_cise_events.json
const ciseEvents = [
  {
    slug: "test-event-baghdad-beijing-symposium-2026",
    titleEn: "2026 International Academic Forum on Mesopotamian-Chinese Connectivity",
    titleAr: "المنتدى الأكاديمي الدولي 2026 حول الترابط الرافديني-الصيني",
    titleZh: "2026年美索不达米亚-中国互联互通与新丝绸之路国际学术研讨会",
    titleCkb: "کۆنفرانسی ئەکادیمی نێودەوڵەتی ٢٠٢٦ بۆ پەیوەندی نێوان میزۆپۆتامیا و چین",
    descriptionEn: "Bringing together 140 university rectors, infrastructure planners, and sovereign bankers at the Al-Rashid Convention Palace in Baghdad.",
    descriptionAr: "يجمع 140 من رؤساء الجامعات ومخططي البنية التحتية والمصرفيين السياديين في قصر الرشيد للمؤتمرات ببغداد.",
    descriptionZh: "汇聚两国140位顶尖大学校长、交通规划专家与主权金融智库代表，在巴格达拉希德国际会议中心共商跨世纪全方位战略协作蓝图。",
    descriptionCkb: "کۆکردنەوەی ١٤٠ سەرۆک زانکۆ و پسپۆڕی ئابووری لە هۆڵی کۆنگرەکانی ڕەشید لە بەغدا.",
    locationEn: "Al-Rashid Convention Palace, Diplomatic Zone, Baghdad",
    locationAr: "قصر الرشيد للمؤتمرات، المنطقة الدبلوماسية، بغداد",
    locationZh: "伊拉克巴格达绿区拉希德国际会议中心主会场",
    locationCkb: "کۆشکی کۆنگرەکانی ڕەشید لە ناوچەی دیپلۆماسی لە بەغدا",
    eventDate: "2026-09-18",
    eventType: "SYMPOSIUM",
    registrationUrl: "https://iraq-china-agency.com/institute/events/register",
    status: "PUBLISHED"
  }
];
writeSeed('27_cise_events.json', ciseEvents);

// 28_cise_projects.json
const ciseProjects = [
  {
    slug: "test-project-al-faw-dry-canal-railway",
    nameEn: "Al-Faw to Fishkhabur High-Capacity Electrified Freight Railway Corridor",
    nameAr: "ممر السكك الحديدية المكهربة للشحن عالي السعة من الفاو إلى فيشخابور",
    nameZh: "法奥港至菲什哈布尔国家级双线电气化重载货运铁路大通道工程",
    nameCkb: "هێڵی ئاسنی کارەبایی بارهەڵگری خێرا لە فاوەوە بۆ فیشخابوور",
    sectorEn: "Railway Transport & Transit Corridor",
    sectorAr: "النقل بالسكك الحديدية وممرات العبور",
    sectorZh: "干线铁路基础设施与欧亚陆桥物流走廊",
    sectorCkb: "هێڵی ئاسن و گواستنەوەی نێودەوڵەتی",
    status: "UNDER_CONSTRUCTION",
    valueUsd: "$10,500,000,000",
    contractor: "China Railway Construction Corporation (CRCC) & Ministry of Transport",
    locationEn: "Basra - Nasiriyah - Najaf - Karbala - Baghdad - Mosul - Fishkhabur",
    locationAr: "البصرة - الناصرية - النجف - كربلاء - بغداد - الموصل - فيشخابور",
    locationZh: "巴士拉-纳西里耶-纳杰夫-卡尔巴拉-巴格达-摩苏尔-菲什哈布尔贯通全境主干线",
    locationCkb: "بەسرە - ناسریە - نەجەف - کەربەلا - بەغدا - مووسڵ - فیشخابوور",
    verifiedSources: JSON.stringify(["Ministry of Transport Official Gazette", "CRCC International Annual Review 2026"])
  }
];
writeSeed('28_cise_projects.json', ciseProjects);

// 29_cise_courses.json
const ciseCourses = [
  {
    slug: "test-course-diplomatic-mandarin-for-negotiators",
    level: "HSK-4 & DIPLOMATIC_MANDARIN",
    titleEn: "Diplomatic & Legal Mandarin for Bilateral Trade Negotiators",
    titleAr: "اللغة الصينية الدبلوماسية والقانونية لمفاوضي التجارة الثنائية",
    titleZh: "双边经贸与条约谈判专用外交汉语精通研修班（HSK-4至HSK-5进阶）",
    titleCkb: "زمانی چینی دیپلۆماسی و یاسایی بۆ دانوستانکارانی بازرگانی",
    descriptionEn: "Intensive 16-week executive curriculum focused on official diplomatic terminology, treaty drafting, and technical Chinese commercial contract law.",
    descriptionAr: "منهاج تنفيذي مكثف لمدة 16 أسبوعاً يركز على المصطلحات الدبلوماسية الرسمية وصياغة المعاهدات وقانون العقود التجارية الصيني.",
    descriptionZh: "由北京语言大学与中国外交学院专家联合执教，为期16周的封闭式高管培训班，精准讲授主权商事合约草拟、海商法术语与高层礼宾规范。",
    descriptionCkb: "خولێکی ١٦ هەفتەیی تایبەت بۆ فێربوونی زاراوە دیپلۆماسی و بازرگانییەکانی زمانی چینی.",
    duration: "16 Weeks (120 Contact Hours)",
    schedule: "Tuesdays & Thursdays 17:00 - 20:00 (Baghdad Time)",
    fee: "Full Government Sovereign Scholarship / Sponsored",
    status: "ACTIVE"
  }
];
writeSeed('29_cise_courses.json', ciseCourses);

// 30_ica_plus_tiers.json
const icaPlusTiers = [
  {
    id: "test-tier-diplomatic-fellow",
    name: {
      en: "Diplomatic Scholar & Analyst",
      ar: "باحث ومحلل دبلوماسي معتمد",
      zh: "特聘外交学者与战略分析师",
      ckb: "توێژەری دیپلۆماسی و شیکارکەری باوەڕپێکراو"
    },
    priceMonthly: "$59",
    priceAnnual: "$590",
    features: {
      en: [
        "Unrestricted access to CIPS & Bilateral Clearing quantitative econometric models",
        "Weekly intelligence briefs from Baghdad and Beijing Resident Bureaus",
        "Encrypted Diplomatic Stream Live Chat participation"
      ],
      ar: [
        "وصول غير محدود لنماذج الاقتصاد القياسي الخاصة بالمقاصة الثنائية ونظام CIPS",
        "موجزات استخباراتية أسبوعية من مكتبي بغداد وبكين الدائمين",
        "مشاركة فورية في دردشة البث المباشر الدبلوماسي المشفر"
      ],
      zh: [
        "无限制查阅中伊双边本币清算与CIPS系统量化经济计量宏观模型库",
        "获取巴格达与北京常驻分社独家定制的每周闭门战略情报要情",
        "受邀进入端到端加密的高级别外交直播智库互动研讨室"
      ],
      ckb: [
        "دەستگەیشتنی تەواو بە مۆدێلە ئابوورییەکان و سیستەمی CIPS",
        "ڕاپۆرتی هەفتانەی تایبەت لە نووسینگەکانی بەغدا و پەکینەوە",
        "بەشداری لە چاتی پارێزراوی دیپلۆماسی بە شێوەی ڕاستەوخۆ"
      ]
    },
    isRecommended: false
  },
  {
    id: "test-tier-sovereign-executive",
    name: {
      en: "Sovereign Executive & Plenipotentiary",
      ar: "تنفيذي سيادي ومفوض استراتيجي",
      zh: "主权机构全权代表与跨国总裁会员",
      ckb: "بەڕێوەبەری باڵای سیادی و نوێنەری یاسایی"
    },
    priceMonthly: "$249",
    priceAnnual: "$2,400",
    features: {
      en: [
        "All Diplomatic Scholar tier privileges included",
        "Direct bilateral advisory hotlines to Baghdad & Beijing Consular Desks",
        "Unlimited raw CSV/JSON export of BRI corridor project trackers and trade flows",
        "Dedicated personal bilateral concierge officer and sovereign tax invoicing"
      ],
      ar: [
        "تشمل كافة امتيازات رتبة الباحث الدبلوماسي",
        "خطوط استشارية ثنائية مباشرة مع المكاتب القنصلية في بغداد وبكين",
        "تصدير غير محدود لبيانات مشاريع طريق الحرير والتبادل التجاري بصيغتي CSV/JSON",
        "مسؤول كونسيرج ثنائي شخصي وفواتير ضريبية سيادية معتمدة"
      ],
      zh: [
        "全权尊享外交学者会员层级的全部高端权限",
        "直通巴格达与北京总领事馆级涉外法律与政策咨询极速专属通道",
        "无限制批量导出'一带一路'中伊走廊全部重大项目底层原始数据与关税模型",
        "一对一配备双语政企联络官与全套中伊增值税专用发票入账服务"
      ],
      ckb: [
        "هەموو سوودەکانی توێژەری دیپلۆماسی بەردەست دەبێت",
        "هێڵی ڕاستەوخۆ لەگەڵ کونسوڵگەرییەکانی بەغدا و پەکین",
        "داگرتنی بێسنووری هەموو داتاکانی بازرگانی و ژێرخان بە فایلی تایبەت",
        "خزمەتگوزاری تایبەتی ڕاوێژکاری و هاوکاری دارایی"
      ]
    },
    isRecommended: true
  }
];
writeSeed('30_ica_plus_tiers.json', icaPlusTiers);

console.log('[SeedGenerator] Successfully generated all 30 test seed files in server/seeds/test30/');
