import express, { Request, Response } from "express";
import { prisma } from "./db.js";
import { recordAudit } from "./hubRoutes.js";

function safeRecordAudit(req: Request, action: string, resource: string, itemId?: string, details?: string) {
  try {
    recordAudit(req, action, resource, itemId, undefined, undefined, details);
  } catch (err) {
    console.warn("[InstituteRoutes] Audit recording suppressed:", err);
  }
}

// =========================================================================
// 1. DEFAULT INITIAL DATASETS FOR CISE PORTAL
// =========================================================================

export const DEFAULT_CISE_PILLARS = [
  {
    slug: "energy-bri",
    titleEn: "Energy & Belt and Road",
    titleAr: "الطاقة ومبادرة الحزام والطريق",
    titleZh: "能源与“一带一路”",
    titleCkb: "وزە و ڕێگەی ئاوریشم",
    descriptionEn: "Multi-decadal energy cooperation between the PRC and Iraq, oil-for-projects mechanisms, and infrastructure development at Grand Faw Port.",
    descriptionAr: "تحليل التعاون الاستراتيجي بين الصين والعراق في قطاع الطاقة، واتفاقية النفط مقابل المشاريع وتطوير ميناء الفاو الكبير.",
    descriptionZh: "分析中伊在能源领域的战略合作，重点关注“油换项目”协议及大福港基础设施建设。",
    descriptionCkb: "شیکاری هاوکاری ستراتیژی نێوان چین و عێراق لە کەرتی وزە و ڕێککەوتنی نەوت بەرامبەر پڕۆژەکان.",
    leadFellowEn: "Dr. Wang Wei",
    leadFellowAr: "د. وانغ وي",
    leadFellowZh: "王伟 博士",
    leadFellowCkb: "د. وانگ وێی",
    metricLabelEn: "Crude Export Share",
    metricLabelAr: "حصة صادرات النفط",
    metricLabelZh: "原油出口份额",
    metricLabelCkb: "پشکی هەناردەی نەوت",
    metricValue: "34.2%",
    topics: JSON.stringify(["Crude Export Security", "EPC Infrastructure Contracts", "Refinery Technology Transfer", "Logistics Node Efficiency"]),
    displayOrder: 1,
    status: "PUBLISHED"
  },
  {
    slug: "geo-economics",
    titleEn: "Geo-Economics & Currency Settlement",
    titleAr: "الجيواقتصاد والتسوية المالية",
    titleZh: "地缘经济与金融结算",
    titleCkb: "جیۆ-ئابووری و یەکلاییکردنەوەی دارایی",
    descriptionEn: "Internationalization of the Renminbi (CNY) within the Iraqi financial architecture, bilateral trade balance, and direct IQD/CNY settlement mechanisms.",
    descriptionAr: "مركز الأبحاث المتخصص في تدويل الرنمينبي داخل النظام المالي العراقي، والتأثيرات الكلية لتسوية التجارة المباشرة بالدينار واليوان.",
    descriptionZh: "专注于人民币国际化及伊拉克金融体系内直接本币结算的宏观影响研究中心。",
    descriptionCkb: "ناوەندی توێژینەوەی تایبەت بۆ بەکارهێنانی یوان لە سیستمی دارایی عێراق و پاکتاوی ڕاستەوخۆ.",
    leadFellowEn: "Ziyad Al-Husseini",
    leadFellowAr: "زياد الحسيني",
    leadFellowZh: "齐亚德·侯赛尼",
    leadFellowCkb: "زیاد ئەلحوسەینی",
    metricLabelEn: "Direct Clearing Share",
    metricLabelAr: "نسبة المقاصة المباشرة",
    metricLabelZh: "直接清算比重",
    metricLabelCkb: "ڕێژەی پاکتاوی ڕاستەوخۆ",
    metricValue: "22.4%",
    topics: JSON.stringify(["Currency Internationalization", "Bilateral Trade Balance", "Banking Interconnectivity", "Digital Currency (e-CNY)"]),
    displayOrder: 2,
    status: "PUBLISHED"
  },
  {
    slug: "diplomacy",
    titleEn: "Bilateral Diplomacy & Governance",
    titleAr: "الدبلوماسية الثنائية والحوكمة",
    titleZh: "双边外交与治理",
    titleCkb: "دبلوماسییەتی دوولایەنە و حوکمڕانی",
    descriptionEn: "High-level diplomatic engagements, sovereign summits, non-partisan governance reviews, and evolving legal frameworks.",
    descriptionAr: "تتبع اللقاءات الدبلوماسية رفيعة المستوى، والقمم السيادية، ومراجعات الحوكمة المستقلة غير المنحازة.",
    descriptionZh: "追踪高层外交接触、主权峰会及规范中伊关系的演进法律框架。",
    descriptionCkb: "چاودێریکردنی پەیوەندییە دیپلۆماسییە ئاست بەرزەکان و لووتکە سەروەرییەکان بە بێلایەنی.",
    leadFellowEn: "Amb. (Ret.) Liu Zhenmin",
    leadFellowAr: "السفير (متقاعد) ليو تشن مين",
    leadFellowZh: "刘振民 资深外交官",
    leadFellowCkb: "باڵیۆز لیو ژێنمین",
    metricLabelEn: "Active Bilateral Pacts",
    metricLabelAr: "الاتفاقيات الثنائية الفعالة",
    metricLabelZh: "生效双边协定",
    metricLabelCkb: "ڕێککەوتننامە کاراکان",
    metricValue: "18 Treaties",
    topics: JSON.stringify(["Sovereign Summitry", "Legal Frameworks", "Regional Security Architecture", "Cultural & Academic Exchange"]),
    displayOrder: 3,
    status: "PUBLISHED"
  },
  {
    slug: "digital-silk-road",
    titleEn: "Digital Silk Road & Tech Transfer",
    titleAr: "طريق الحرير الرقمي ونقل التكنولوجيا",
    titleZh: "数字丝绸之路与技术转让",
    titleCkb: "ڕێگەی ئاوریشمی دیجیتاڵی و گواستنەوەی تەکنەلۆجیا",
    descriptionEn: "Telecommunications infrastructure, 5G deployments, fiber-optic corridors, smart port digitization, and applied technology transfer.",
    descriptionAr: "التركيز على تصدير البنية التحتية الرقمية، ونشر شبكات الجيل الخامس، وهندسة الموانئ الذكية ونقل التكنولوجيا المطبقة.",
    descriptionZh: "聚焦中国数字基础设施出口、5G部署及智慧港口智能化技术转让。",
    descriptionCkb: "تەرکیز لەسەر ژێرخانی دیجیتاڵی، تۆڕەکانی 5G، بەدیجیتاڵکردنی بەندەرەکان و گواستنەوەی تەکنەلۆجیا.",
    leadFellowEn: "Eng. Farouk Al-Khafaji",
    leadFellowAr: "م. فاروق الخفاجي",
    leadFellowZh: "法鲁克·哈法吉 工程师",
    leadFellowCkb: "ئەندازیار فارووق ئەلخەفاجی",
    metricLabelEn: "Corridor Digitization",
    metricLabelAr: "رقمنة الممر",
    metricLabelZh: "走廊数字化率",
    metricLabelCkb: "بەدیجیتاڵکردنی ڕێڕەو",
    metricValue: "68%",
    topics: JSON.stringify(["5G & Infrastructure", "E-Government Platforms", "Data Sovereignty", "Smart Logistics"]),
    displayOrder: 4,
    status: "PUBLISHED"
  }
];

export const DEFAULT_CISE_EXPERTS = [
  {
    slug: "dr-wang-wei",
    nameEn: "Dr. Wang Wei",
    nameAr: "د. وانغ وي",
    nameZh: "王伟 博士",
    nameCkb: "د. وانگ وێی",
    titleEn: "Senior Research Fellow & Director of Energy Policy",
    titleAr: "زميل أول للبحوث ومدير سياسات الطاقة",
    titleZh: "高级研究员兼能源政策主任",
    titleCkb: "توێژەری باڵا و بەڕێوەبەری سیاسەتی وزە",
    bioEn: "Specialist in West Asian oil-for-projects financing frameworks, cross-border energy grids, and Sino-Iraqi long-term concessions.",
    bioAr: "متخصص في أطر تمويل النفط مقابل المشاريع في غرب آسيا، وشبكات الطاقة عبر الحدود، والامتيازات طويلة الأجل بين العراق والصين.",
    bioZh: "长期专注西亚“油换项目”融资架构、跨国能源管网与中伊长期特许开发权研究。",
    bioCkb: "شارەزا لە چوارچێوەی دارایی نەوت بەرامبەر پڕۆژە لە ڕۆژئاوای ئاسیا و تۆڕەکانی وزە.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
    pillars: JSON.stringify(["energy-bri", "geo-economics"]),
    languages: JSON.stringify(["Chinese", "English", "Arabic"]),
    email: "wang.wei@iraq-china-agency.com",
    phone: "+964 (0) 770 123 4501",
    displayOrder: 1,
    status: "PUBLISHED"
  },
  {
    slug: "ziyad-al-husseini",
    nameEn: "Ziyad Al-Husseini",
    nameAr: "زياد الحسيني",
    nameZh: "齐亚德·侯赛尼",
    nameCkb: "زیاد ئەلحوسەینی",
    titleEn: "Senior Macroeconomic Advisor & Clearing Specialist",
    titleAr: "مستشار اقتصادي كلي وخبير المقاصة والتسوية",
    titleZh: "宏观经济资深顾问兼清算结算专家",
    titleCkb: "ڕاوێژکاری باڵای ئابووری و پسپۆڕی پاکتاوکردن",
    bioEn: "Leading expert on central bank digital currency (CBDC) corridors, mBridge implementation, and non-USD bilateral trade facilitation.",
    bioAr: "خبير رائد في ممرات العملات الرقمية للبنوك المركزية (mBridge)، وتسهيل التجارة البينية بغير الدولار.",
    bioZh: "多边央行数字货币桥（mBridge）通道架构、去美元化双边贸易结算机制资深专家。",
    bioCkb: "شارەزای سەرەکی لە دراوی دیجیتاڵی بانکە ناوەندییەکان و ئاسانکاری بازرگانی بەبێ دۆلار.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
    pillars: JSON.stringify(["geo-economics"]),
    languages: JSON.stringify(["Arabic", "English", "Kurdish"]),
    email: "ziyad.husseini@iraq-china-agency.com",
    phone: "+964 (0) 770 123 4502",
    displayOrder: 2,
    status: "PUBLISHED"
  },
  {
    slug: "amb-liu-zhenmin",
    nameEn: "Amb. (Ret.) Liu Zhenmin",
    nameAr: "السفير (متقاعد) ليو تشن مين",
    nameZh: "刘振民 资深外交官",
    nameCkb: "باڵیۆز لیو ژێنمین",
    titleEn: "Chair of Bilateral Governance & Strategic Diplomacy",
    titleAr: "رئيس أبحاث الحوكمة الثنائية والدبلوماسية الاستراتيجية",
    titleZh: "双边治理与战略外交首席顾问",
    titleCkb: "سەرۆکی حوکمڕانی دوولایەنە و دیپلۆماسی ستراتیژی",
    bioEn: "Four decades of diplomatic service across the Middle East; authoritative voice on treaty architecture and regional multilateral neutrality.",
    bioAr: "أربعة عقود من الخدمة الدبلوماسية في الشرق الأوسط؛ صوت موثوق في هندسة المعاهدات والحياد المتعدد الأطراف.",
    bioZh: "深耕中东外交一线四十载，精通国际条约架构与中东多边平衡机制。",
    bioCkb: "چوار دەیە لە خزمەتی دیپلۆماسی لە ڕۆژهەڵاتی ناوەڕاست و شارەزا لە پەیماننامە نێودەوڵەتییەکان.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400",
    pillars: JSON.stringify(["diplomacy"]),
    languages: JSON.stringify(["Chinese", "Arabic", "English"]),
    email: "liu.zhenmin@iraq-china-agency.com",
    phone: "+964 (0) 770 123 4503",
    displayOrder: 3,
    status: "PUBLISHED"
  },
  {
    slug: "farouk-al-khafaji",
    nameEn: "Eng. Farouk Al-Khafaji",
    nameAr: "م. فاروق الخفاجي",
    nameZh: "法鲁克·哈法吉 工程师",
    nameCkb: "ئەندازیار فارووق ئەلخەفاجی",
    titleEn: "Director of Digital Infrastructure & Smart Logistics",
    titleAr: "مدير البنية التحتية الرقمية واللوجستيات الذكية",
    titleZh: "数字基础设施与智慧物流总监",
    titleCkb: "بەڕێوەبەری ژێرخانی دیجیتاڵی و لۆجستی زیرەک",
    bioEn: "Architect of bilateral telemetry systems, port automation at Grand Faw, and fiber-optic cross-border transit.",
    bioAr: "مهندس نظم الاتصال عن بعد الثنائية، وأتمتة الموانئ في الفاو الكبير، والعبور القاري للألياف الضوئية.",
    bioZh: "主导大福深水港智慧集装箱中枢调度系统及中伊跨境光缆走廊工程。",
    bioCkb: "ئەندازیاری سیستەمی دیجیتاڵی بەندەری فاو و ڕێڕەوی فایبەر ئۆپتیک.",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400",
    pillars: JSON.stringify(["digital-silk-road"]),
    languages: JSON.stringify(["Arabic", "English"]),
    email: "farouk.khafaji@iraq-china-agency.com",
    phone: "+964 (0) 770 123 4504",
    displayOrder: 4,
    status: "PUBLISHED"
  }
];

export const DEFAULT_CISE_PUBLICATIONS = [
  {
    slug: "mapping-iraq-china-development-corridor",
    type: "WHITE_PAPER",
    publicationType: "White Paper",
    titleEn: "Mapping the Iraq–China Development Corridor: Infrastructure, Energy, & Sovereign Debt",
    titleAr: "تخطيط ممر التنمية العراقي الصيني: البنية التحتية، الطاقة، والديون السيادية",
    titleZh: "伊拉克—中国发展走廊：基础设施、能源与主权债务分析",
    titleCkb: "نەخشەی ڕێڕەوی گەشەپێدانی عێراق-چین: ژێرخان، وزە و قەرزە سەروەرییەکان",
    excerptEn: "An exhaustive multi-node econometric analysis of bilateral infrastructure interconnectivity, oil-backed sovereign financing mechanisms, and northern vs. southern transport route optimization across 18 Iraqi provinces.",
    excerptAr: "تحليل قياسي شامل متعدد العقد للترابط البنيوي الثنائي، وآليات التمويل السيادي المدعومة بالنفط، وتحسين مسارات النقل الشمالية والجنوبية عبر المحافظات العراقية.",
    excerptZh: "对跨越伊拉克18省的双边基础设施互联互通、石油主权融资机制以及南北运输走廊优化的深度全景经济学模型报告。",
    excerptCkb: "شیکردنەوەیەکی هەمەلایەنەی ئابووری بۆ بەستنەوەی ژێرخانی دوولایەنە، میکانیزمەکانی دارایی سەروەری نەوت، و چاککردنی ڕێڕەوەکانی گواستنەوە.",
    contentEn: "Full monograph detailing the convergence between the 1,200 km Iraqi Development Road and Chinese BRI infrastructure logistics...",
    contentAr: "دراسة تفصيلية كاملة حول التكامل الاستراتيجي بين طريق التنمية العراقي ومشاريع الحزام والطريق الصينية...",
    contentZh: "详尽专著阐明1200公里伊拉克发展之路与中国一带一路物流网络的战略衔接...",
    contentCkb: "توێژینەوەی دەقی تەواو دەربارەی بەیەکگەیشتنی ڕێگەی گەشەپێدانی عێراق و پڕۆژەکانی ڕێگەی ئاوریشمی چین...",
    imageUrl: "https://images.unsplash.com/photo-1521295121812-af46571d9ec6?auto=format&fit=crop&q=80&w=1200",
    authorName: "Dr. Wang Wei & Ziyad Al-Husseini",
    topics: JSON.stringify(["energy-bri", "geo-economics"]),
    region: "BILATERAL",
    doi: "10.5281/cise.2026.09.wp01",
    pdfUrl: "/assets/publications/mapping-corridor.pdf",
    downloadCount: 1420,
    dataCitationEligible: true,
    wordCount: 8450,
    status: "PUBLISHED"
  },
  {
    slug: "iqd-cny-settlement-macroeconomic-impacts",
    type: "POLICY_BRIEF",
    publicationType: "Policy Brief",
    titleEn: "Direct IQD/CNY Settlement: Macroeconomic Impacts on Bilateral Trade",
    titleAr: "التسوية المباشرة بالدينار العراقي واليوان الصيني: الآثار الاقتصادية الكلية على التجارة الثنائية",
    titleZh: "第纳尔—人民币直接结算：对双边贸易的宏观经济影响",
    titleCkb: "پاکتاوکردنی ڕاستەوخۆی دینار-یوان: کاریگەرییە ماکرۆئابوورییەکان لەسەر بازرگانی دوولایەنە",
    excerptEn: "Evaluating the transition toward local currency settlement in energy transactions, mBridge CBDC corridor integration, and balance of payments insulation.",
    excerptAr: "تقييم التحول نحو تسوية المعاملات بالعملة المحلية في قطاع الطاقة، وتكامل ممر العملات الرقمية mBridge، وتحصين ميزان المدفوعات.",
    excerptZh: "评估能源大宗交易中转向本币结算机制、数字货币桥（mBridge）走廊对接以及对外汇储备抗压性的战略简报。",
    excerptCkb: "هەڵسەنگاندنی گواستنەوە بەرەو پاکتاوکردن بە دراوی ناوخۆیی لە مامەڵەکانی وزە و کاریگەری لەسەر هاوسەنگی دراو.",
    contentEn: "Policy evaluation of non-USD financial clearance frameworks ratified between the Central Bank of Iraq and PBOC...",
    contentAr: "تقييم السياسات النقدية للتسوية بدون الدولار بين البنك المركزي العراقي وبنك الشعب الصيني...",
    contentZh: "伊拉克央行与中国人民银行批准的非美元金融清算框架政策评估报告...",
    contentCkb: "هەڵسەنگاندنی سیاسەتەکانی پاکتاوی دارایی بێ دۆلار لە نێوان بانکی ناوەندی عێراق و بانکی گەلی چین...",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bbbda5366a7a?auto=format&fit=crop&q=80&w=1200",
    authorName: "Ahmed Kareem & Li Na",
    topics: JSON.stringify(["geo-economics"]),
    region: "BILATERAL",
    doi: "10.5281/cise.2026.01.pb02",
    pdfUrl: "/assets/publications/settlement-brief.pdf",
    downloadCount: 980,
    dataCitationEligible: true,
    wordCount: 2200,
    status: "PUBLISHED"
  },
  {
    slug: "grand-faw-port-digital-silk-road",
    type: "WORKING_PAPER",
    publicationType: "Working Paper",
    titleEn: "Grand Faw Port as a Multimodal Node in the Digital Silk Road",
    titleAr: "ميناء الفاو الكبير كعقدة متعددة الوسائط في طريق الحرير الرقمي",
    titleZh: "大福港作为数字丝绸之路多式联运枢纽的战略研究",
    titleCkb: "بەندەری گەورەی فاو وەک گرێکوێرەیەکی فرەجۆر لە ڕێگەی ئاوریشمی دیجیتاڵی",
    excerptEn: "Technical assessment of port automation, 5G maritime telemetry, and integration with the Basra-Turkey railway dry corridor.",
    excerptAr: "تقييم فني لأتمتة الموانئ، والقياس عن بعد للملاحة البحرية بشبكات 5G، والتكامل مع القناة الجافة للسكك الحديدية بين البصرة وتركيا.",
    excerptZh: "针对港口全自动化集装箱作业、5G智慧海运调度及连接巴士拉至土耳其干线铁路的多式联运技术论证。",
    excerptCkb: "هەڵسەنگاندنی تەکنیکی بۆ ئۆتۆماتیککردنی بەندەر، تۆڕەکانی 5G و بەستنەوەی هێڵی شەمەندەفەری بەسرە-تورکیا.",
    contentEn: "Comprehensive logistics study of the Grand Faw Deepwater Terminal Phase 1 berths...",
    contentAr: "دراسة لوجستية شاملة لأرصفة المرحلة الأولى من ميناء الفاو الكبير للمياه العميقة...",
    contentZh: "大福深水港一期泊位全面综合物流论证与规划...",
    contentCkb: "توێژینەوەی گشتگیری لۆجستی لەسەر قۆناغی یەکەمی بەندەری قووڵی فاو...",
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200",
    authorName: "Eng. Farouk Al-Khafaji & Dr. Chen Bo",
    topics: JSON.stringify(["energy-bri", "digital-silk-road"]),
    region: "IRAQ",
    doi: "10.5281/cise.2025.11.wp03",
    pdfUrl: "/assets/publications/faw-port.pdf",
    downloadCount: 750,
    dataCitationEligible: true,
    wordCount: 5600,
    status: "PUBLISHED"
  }
];

export const DEFAULT_CISE_EVENTS = [
  {
    slug: "iraq-china-strategic-summit-2026",
    titleEn: "Iraq–China Strategic Economic Summit & Expo 2026",
    titleAr: "القمة والمعرض الاقتصادي الاستراتيجي العراقي الصيني 2026",
    titleZh: "2026年中伊战略经济峰会暨博览会",
    titleCkb: "لووتکە و پێشانگای ئابووری ستراتیژی عێراق-چین ٢٠٢٦",
    descriptionEn: "Flagship sovereign conference convening government plenipotentiaries, sovereign wealth executives, EPC consortiums, and technology transfer directors.",
    descriptionAr: "المؤتمر السيادي الرائد الذي يجمع ممثلي الحكومات، ومديري الصناديق السيادية، والشركات الهندسية الكبرى، وقادة نقل التكنولوجيا.",
    descriptionZh: "汇聚两国政府全权代表、主权基金高管、特级EPC总承包商与技术转让负责人的年度最高规格双边经贸峰会。",
    descriptionCkb: "کۆنفرانسی سەرەکی سەروەری بۆ کۆکردنەوەی نوێنەرانی حکومەت، سندوقە سەروەرییەکان و کۆمپانیاکانی ئەندازیاری.",
    locationEn: "Sulaymaniyah International Congress Centre, KRI, Iraq",
    locationAr: "مركز السليمانية الدولي للمؤتمرات، إقليم كردستان، العراق",
    locationZh: "伊拉克库尔德地区苏莱曼尼亚国际会议中心",
    locationCkb: "ناوەندی نێودەوڵەتی کۆنگرەکانی سلێمانی، هەرێمی کوردستان، عێراق",
    eventDate: "2026-11-15",
    eventType: "SUMMIT",
    registrationUrl: "/en/institute/summit",
    displayOrder: 1,
    status: "PUBLISHED"
  },
  {
    slug: "bilateral-currency-symposium",
    titleEn: "Sino-Iraqi Sovereign Currency & Trade Settlement Symposium",
    titleAr: "ندوة العملات السيادية والتسوية التجارية بين الصين والعراق",
    titleZh: "中伊主权货币与贸易直接结算学术研讨会",
    titleCkb: "سیمپۆزیۆمی دراوە سەروەرییەکان و پاکتاوی بازرگانی نێوان چین و عێراق",
    descriptionEn: "Executive symposium assessing the practical deployment of digital dinar / digital yuan settlement rails across bilateral commercial banks.",
    descriptionAr: "ندوة تنفيذية لتقييم التطبيق العملي لمسارات تسوية الدينار الرقمي واليوان الرقمي عبر المصارف التجارية الثنائية.",
    descriptionZh: "评估数字第纳尔与数字人民币在两国商业银行间实际清算部署的闭门高级研讨会。",
    descriptionCkb: "سیمپۆزیۆمی جێبەجێکردن بۆ هەڵسەنگاندنی پاکتاوکردنی دیناری دیجیتاڵی و یوانی دیجیتاڵی لە بانکە بازرگانییەکاندا.",
    locationEn: "Central Bank Auditorium, Baghdad, Iraq",
    locationAr: "قاعة البنك المركزي العراقي، بغداد، العراق",
    locationZh: "伊拉克中央银行大礼堂，巴格达",
    locationCkb: "هۆڵی بانکی ناوەندی، بەغدا، عێراق",
    eventDate: "2026-12-02",
    eventType: "SYMPOSIUM",
    registrationUrl: "/en/institute/settlement",
    displayOrder: 2,
    status: "PUBLISHED"
  }
];

export const DEFAULT_CISE_PROJECTS = [
  {
    slug: "bri-01",
    nameEn: "Al-Faw Grand Port Phase 1 Berths & Dredging",
    nameAr: "أرصفة وتعميق المرحلة الأولى لميناء الفاو الكبير",
    nameZh: "大福深水港一期泊位疏浚与码头工程",
    nameCkb: "لەنگەرگە و قۆناغی یەکەمی بەندەری گەورەی فاو",
    sectorEn: "Maritime Infrastructure",
    sectorAr: "البنية التحتية البحرية",
    sectorZh: "港口航运基础设施",
    sectorCkb: "ژێرخانی دەریایی",
    status: "COMMISSIONING",
    valueUsd: "$2.6B",
    contractor: "Daewoo E&C / China Harbor Engineering Consortium",
    locationEn: "Basra Governorate",
    locationAr: "محافظة البصرة",
    locationZh: "巴士拉省",
    locationCkb: "پارێزگای بەسرە",
    verifiedSources: JSON.stringify(["Ministry of Transport Iraq", "EPC Contract Gazette"]),
    displayOrder: 1
  },
  {
    slug: "bri-02",
    nameEn: "Wasit Thermal Power Plant Units 5 & 6 Modernization",
    nameAr: "تحديث الوحدتين 5 و6 لمحطة واسط الحرارية لتوليد الكهرباء",
    nameZh: "瓦西特火电站5、6号机组扩建升级工程",
    nameCkb: "نوێکردنەوەی یەکەکانی ٥ و ٦ی وێستگەی گەرمیی واست",
    sectorEn: "Energy & Utilities",
    sectorAr: "الطاقة والمرافق",
    sectorZh: "能源电力设施",
    sectorCkb: "وزە و خزمەتگوزارییەکان",
    status: "OPERATIONAL",
    valueUsd: "$3.5B",
    contractor: "Shanghai Electric",
    locationEn: "Wasit Governorate",
    locationAr: "محافظة واسط",
    locationZh: "瓦西特省",
    locationCkb: "پارێزگای واست",
    verifiedSources: JSON.stringify(["Ministry of Electricity Iraq", "Shanghai Electric Disclosures"]),
    displayOrder: 2
  },
  {
    slug: "bri-03",
    nameEn: "Nationwide 1,000 Model Schools Construction",
    nameAr: "مشروع إنشاء 1000 مدرسة نموذجية في عموم المحافظات",
    nameZh: "伊拉克全境1000所示范示范学校EPC总承包项目",
    nameCkb: "پڕۆژەی دروستکردنی ١٠٠٠ قوتابخانەی نموونەیی لە عێراق",
    sectorEn: "Social Infrastructure & Education",
    sectorAr: "البنية الاجتماعية والتعليم",
    sectorZh: "社会民生与教育设施",
    sectorCkb: "ژێرخانی کۆمەڵایەتی و پەروەردە",
    status: "IN_PROGRESS",
    valueUsd: "$1.8B",
    contractor: "PowerChina & Sinotech",
    locationEn: "Nationwide (15 Governorates)",
    locationAr: "عموم المحافظات (15 محافظة)",
    locationZh: "全境15省",
    locationCkb: "سەرانسەری عێراق (١٥ پارێزگا)",
    verifiedSources: JSON.stringify(["Iraqi Council of Ministers Secretariat (GSCOM)"]),
    displayOrder: 3
  }
];

export const DEFAULT_CISE_COURSES = [
  {
    slug: "hsk-1-elementary",
    level: "HSK-1",
    titleEn: "Elementary Mandarin & Business Etiquette (HSK 1)",
    titleAr: "مبادئ اللغة الصينية وآداب الأعمال (HSK 1)",
    titleZh: "初级基础汉语与双边商务礼仪（HSK 1级）",
    titleCkb: "بنەماکانی زمانی چینی و ڕێوڕەسمی بازرگانی (HSK 1)",
    descriptionEn: "Comprehensive beginner track focusing on pronunciation (Pinyin), daily conversational vocabulary, and trade greetings.",
    descriptionAr: "مسار شامل للمبتدئين يركز على النطق (بينيين)، والمفردات اليومية، وتحيات التجارة الثنائية.",
    descriptionZh: "面向零基础经贸人员的系统课程，涵盖拼音、日常交流核心高频词汇与双边商贸礼节。",
    descriptionCkb: "خولێکی هەمەلایەنە بۆ سەرەتاییەکان بە تەرکیز لەسەر دەربڕین و دەستەواژەکانی بازرگانی.",
    duration: "8 Weeks (48 Hours)",
    schedule: "Mon / Wed 18:00 – 20:00",
    fee: "Free Sovereign Sponsorship",
    displayOrder: 1,
    status: "ACTIVE"
  },
  {
    slug: "hsk-2-foundations",
    level: "HSK-2",
    titleEn: "Mandarin Language Foundations (HSK 2)",
    titleAr: "أسس اللغة الصينية المتقدمة للمبتدئين (HSK 2)",
    titleZh: "初中级汉语强化与实用阅读（HSK 2级）",
    titleCkb: "بنەماکانی زمانی چینی (HSK 2)",
    descriptionEn: "Sentence structure, written characters, basic commercial logistics terms, and travel dialogue.",
    descriptionAr: "تراكيب الجمل، والرموز الكتابية، والمصطلحات اللوجستية التجارية الأساسية، وحوارات السفر.",
    descriptionZh: "聚焦语法结构、汉字笔画、常用物流商贸术语及涉华公务差旅场景对话。",
    descriptionCkb: "ڕستەسازی، پیتەکان، دەستەواژە لۆجستییەکان و گفتوگۆی گەشتکردن.",
    duration: "10 Weeks (60 Hours)",
    schedule: "Tue / Thu 18:00 – 20:00",
    fee: "Free Sovereign Sponsorship",
    displayOrder: 2,
    status: "ACTIVE"
  },
  {
    slug: "hsk-3-intermediate",
    level: "HSK-3",
    titleEn: "Intermediate Practical Mandarin (HSK 3)",
    titleAr: "اللغة الصينية المتوسطة التطبيقية (HSK 3)",
    titleZh: "中级实用经贸汉语与实务写作（HSK 3级）",
    titleCkb: "چینی ناوەندی کرداری (HSK 3)",
    descriptionEn: "Full fluency in bilateral communications, invoice processing, supply chain negotiations, and HSK 3 certification.",
    descriptionAr: "الطلاقة في الاتصالات الثنائية، ومعالجة الفواتير، ومفاوضات سلاسل الإمداد، واجتياز اختبار HSK 3.",
    descriptionZh: "掌握经贸邮件往来、合同条款初审、供应链商洽话术并直通 HSK 3 级认证。",
    descriptionCkb: "شارەزابوون لە پەیوەندییە دوولایەنەکان، دانوستانی بازرگانی و بڕوانامەی HSK 3.",
    duration: "12 Weeks (72 Hours)",
    schedule: "Mon / Wed 17:00 – 19:30",
    fee: "Free Sovereign Sponsorship",
    displayOrder: 3,
    status: "ACTIVE"
  }
];

// =========================================================================
// 2. SEEDER FUNCTION
// =========================================================================

export async function seedInstituteData() {
  try {
    const pillarsCount = await prisma.cisePillar.count();
    if (pillarsCount === 0) {
      console.log("[InstituteSeeder] Seeding CISE Research Pillars...");
      for (const pillar of DEFAULT_CISE_PILLARS) {
        await prisma.cisePillar.upsert({
          where: { slug: pillar.slug },
          update: pillar,
          create: pillar
        });
      }
    }

    const expertsCount = await prisma.ciseExpert.count();
    if (expertsCount === 0) {
      console.log("[InstituteSeeder] Seeding CISE Experts...");
      for (const expert of DEFAULT_CISE_EXPERTS) {
        await prisma.ciseExpert.upsert({
          where: { slug: expert.slug },
          update: expert,
          create: expert
        });
      }
    }

    const pubsCount = await prisma.cisePublication.count();
    if (pubsCount === 0) {
      console.log("[InstituteSeeder] Seeding CISE Publications...");
      for (const pub of DEFAULT_CISE_PUBLICATIONS) {
        await prisma.cisePublication.upsert({
          where: { slug: pub.slug },
          update: pub,
          create: pub
        });
      }
    }

    const eventsCount = await prisma.ciseEvent.count();
    if (eventsCount === 0) {
      console.log("[InstituteSeeder] Seeding CISE Events...");
      for (const evt of DEFAULT_CISE_EVENTS) {
        await prisma.ciseEvent.upsert({
          where: { slug: evt.slug },
          update: evt,
          create: evt
        });
      }
    }

    const projectsCount = await prisma.ciseProject.count();
    if (projectsCount === 0) {
      console.log("[InstituteSeeder] Seeding CISE BRI Projects...");
      for (const proj of DEFAULT_CISE_PROJECTS) {
        await prisma.ciseProject.upsert({
          where: { slug: proj.slug },
          update: proj,
          create: proj
        });
      }
    }

    const coursesCount = await prisma.ciseCourse.count();
    if (coursesCount === 0) {
      console.log("[InstituteSeeder] Seeding CISE Chinese Courses...");
      for (const course of DEFAULT_CISE_COURSES) {
        await prisma.ciseCourse.upsert({
          where: { slug: course.slug },
          update: course,
          create: course
        });
      }
    }

    console.log("[InstituteSeeder] CISE Institute database verified and ready.");
  } catch (err) {
    console.error("[InstituteSeeder] Seeding error:", err);
  }
}

// =========================================================================
// 3. ROUTE REGISTRATION FUNCTION
// =========================================================================

export function registerInstituteRoutes(
  app: express.Application,
  editorOrAdminMiddleware?: express.RequestHandler,
  adminMiddleware?: express.RequestHandler,
  rateLimiter?: express.RequestHandler
) {
  const optionalLimiter = rateLimiter || ((_req, _res, next) => next());

  // Helper for CISE Command Hub RBAC validation
  const checkHubRole = (req: Request, res: Response): boolean => {
    const userRole = ((req as any).user?.role || req.headers["x-role"] || "VIEWER").toString().toUpperCase();
    if (!["SUPERADMIN", "ADMIN", "EDITOR"].includes(userRole)) {
      res.status(403).json({ error: "Forbidden: Insufficient permissions for CISE Command Hub" });
      return false;
    }
    return true;
  };

  // -----------------------------------------------------------------------
  // PUBLIC GET ENDPOINTS
  // -----------------------------------------------------------------------

  // GET /api/public/institute/overview (Public Telemetry & Aggregate Counters)
  app.get("/api/public/institute/overview", async (_req: Request, res: Response) => {
    try {
      const [pillarsCount, expertsCount, pubsCount, eventsCount, projectsCount, coursesCount] = await Promise.all([
        prisma.cisePillar.count({ where: { status: "PUBLISHED" } }),
        prisma.ciseExpert.count({ where: { status: "PUBLISHED" } }),
        prisma.cisePublication.count({ where: { status: "PUBLISHED" } }),
        prisma.ciseEvent.count({ where: { status: "PUBLISHED" } }),
        prisma.ciseProject.count({ where: { status: "PUBLISHED" } }),
        prisma.ciseCourse.count({ where: { status: "PUBLISHED" } })
      ]);

      res.json({
        pillarsCount: pillarsCount || DEFAULT_CISE_PILLARS.length,
        expertsCount: expertsCount || DEFAULT_CISE_EXPERTS.length,
        pubsCount: pubsCount || DEFAULT_CISE_PUBLICATIONS.length,
        eventsCount: eventsCount || DEFAULT_CISE_EVENTS.length,
        projectsCount: projectsCount || DEFAULT_CISE_PROJECTS.length,
        coursesCount: coursesCount || DEFAULT_CISE_COURSES.length,
        systemStatus: "ONLINE",
        provenance: "Official CISE Intelligence Desk",
        annualDataPoints: "142,500+",
        bilateralTreatiesTracked: 18,
        lastSync: new Date().toISOString()
      });
    } catch (e: any) {
      console.error("Error fetching public institute overview:", e);
      res.json({
        pillarsCount: DEFAULT_CISE_PILLARS.length,
        expertsCount: DEFAULT_CISE_EXPERTS.length,
        pubsCount: DEFAULT_CISE_PUBLICATIONS.length,
        eventsCount: DEFAULT_CISE_EVENTS.length,
        projectsCount: DEFAULT_CISE_PROJECTS.length,
        coursesCount: DEFAULT_CISE_COURSES.length,
        systemStatus: "ONLINE",
        provenance: "Official CISE Intelligence Desk",
        annualDataPoints: "142,500+",
        bilateralTreatiesTracked: 18,
        lastSync: new Date().toISOString()
      });
    }
  });

  // GET /api/public/institute/pillars
  app.get("/api/public/institute/pillars", async (_req: Request, res: Response) => {
    try {
      let pillars = await prisma.cisePillar.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { displayOrder: "asc" }
      });
      if (pillars.length === 0) {
        await seedInstituteData();
        pillars = await prisma.cisePillar.findMany({
          where: { status: "PUBLISHED" },
          orderBy: { displayOrder: "asc" }
        });
      }
      res.json(pillars);
    } catch (e: any) {
      console.error("Error fetching pillars:", e);
      res.json(DEFAULT_CISE_PILLARS);
    }
  });

  // GET /api/public/institute/pillars/:slug
  app.get("/api/public/institute/pillars/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const pillar = await prisma.cisePillar.findUnique({ where: { slug } });
      if (!pillar) {
        const fallback = DEFAULT_CISE_PILLARS.find(p => p.slug === slug);
        if (fallback) return res.json(fallback);
        return res.status(404).json({ error: "Pillar not found" });
      }
      res.json(pillar);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch pillar" });
    }
  });

  // GET /api/public/institute/experts
  app.get("/api/public/institute/experts", async (_req: Request, res: Response) => {
    try {
      let experts = await prisma.ciseExpert.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { displayOrder: "asc" }
      });
      if (experts.length === 0) {
        await seedInstituteData();
        experts = await prisma.ciseExpert.findMany({
          where: { status: "PUBLISHED" },
          orderBy: { displayOrder: "asc" }
        });
      }
      res.json(experts);
    } catch (e: any) {
      console.error("Error fetching experts:", e);
      res.json(DEFAULT_CISE_EXPERTS);
    }
  });

  // GET /api/public/institute/experts/:slug
  app.get("/api/public/institute/experts/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const expert = await prisma.ciseExpert.findUnique({ where: { slug } });
      if (!expert) {
        const fallback = DEFAULT_CISE_EXPERTS.find(e => e.slug === slug);
        if (fallback) return res.json(fallback);
        return res.status(404).json({ error: "Expert not found" });
      }
      res.json(expert);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch expert" });
    }
  });

  // GET /api/public/institute/publications
  app.get("/api/public/institute/publications", async (req: Request, res: Response) => {
    try {
      const { topic, type, q, limit } = req.query;
      let publications = await prisma.cisePublication.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" }
      });

      if (publications.length === 0) {
        await seedInstituteData();
        publications = await prisma.cisePublication.findMany({
          where: { status: "PUBLISHED" },
          orderBy: { publishedAt: "desc" }
        });
      }

      let results = publications;
      if (topic && topic !== "all") {
        results = results.filter(p => p.topics.includes(topic as string));
      }
      if (type && type !== "all") {
        results = results.filter(p => p.type === type || p.publicationType.toLowerCase().replace(/\s+/g, "_") === (type as string).toLowerCase());
      }
      if (q && typeof q === "string" && q.trim()) {
        const query = q.toLowerCase();
        results = results.filter(p =>
          p.titleEn.toLowerCase().includes(query) ||
          p.titleAr.includes(query) ||
          p.titleZh.includes(query) ||
          p.titleCkb.includes(query) ||
          p.excerptEn.toLowerCase().includes(query) ||
          p.authorName.toLowerCase().includes(query)
        );
      }
      if (limit) {
        results = results.slice(0, parseInt(limit as string, 10));
      }

      res.json(results);
    } catch (e: any) {
      console.error("Error fetching publications:", e);
      res.json(DEFAULT_CISE_PUBLICATIONS);
    }
  });

  // GET /api/public/institute/publications/:slug
  app.get("/api/public/institute/publications/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const pub = await prisma.cisePublication.findUnique({ where: { slug } });
      if (!pub) {
        const fallback = DEFAULT_CISE_PUBLICATIONS.find(p => p.slug === slug);
        if (fallback) return res.json(fallback);
        return res.status(404).json({ error: "Publication not found" });
      }
      res.json(pub);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch publication" });
    }
  });

  // GET /api/public/institute/events
  app.get("/api/public/institute/events", async (_req: Request, res: Response) => {
    try {
      let events = await prisma.ciseEvent.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { displayOrder: "asc" }
      });
      if (events.length === 0) {
        await seedInstituteData();
        events = await prisma.ciseEvent.findMany({
          where: { status: "PUBLISHED" },
          orderBy: { displayOrder: "asc" }
        });
      }
      res.json(events);
    } catch (e: any) {
      res.json(DEFAULT_CISE_EVENTS);
    }
  });

  // GET /api/public/institute/data-hub/projects
  app.get("/api/public/institute/data-hub/projects", async (_req: Request, res: Response) => {
    try {
      let projects = await prisma.ciseProject.findMany({
        orderBy: { displayOrder: "asc" }
      });
      if (projects.length === 0) {
        await seedInstituteData();
        projects = await prisma.ciseProject.findMany({
          orderBy: { displayOrder: "asc" }
        });
      }
      res.json({
        provenance: {
          status: "FOUNDER_MAINTAINED",
          label: "Founder-maintained BRI Infrastructure Registry",
          criteria: "Two-source verified against official tenders and EPC contracts where available.",
          lastReviewed: "2026-03-15"
        },
        projects
      });
    } catch (e: any) {
      res.json({
        provenance: { status: "FOUNDER_MAINTAINED", label: "Fallback Registry" },
        projects: DEFAULT_CISE_PROJECTS
      });
    }
  });

  // GET /api/public/institute/courses
  app.get("/api/public/institute/courses", async (_req: Request, res: Response) => {
    try {
      let courses = await prisma.ciseCourse.findMany({
        where: { status: "ACTIVE" },
        orderBy: { displayOrder: "asc" }
      });
      if (courses.length === 0) {
        await seedInstituteData();
        courses = await prisma.ciseCourse.findMany({
          where: { status: "ACTIVE" },
          orderBy: { displayOrder: "asc" }
        });
      }
      res.json(courses);
    } catch (e: any) {
      res.json(DEFAULT_CISE_COURSES);
    }
  });

  // GET /api/public/institute/data-hub/trade
  app.get("/api/public/institute/data-hub/trade", async (_req: Request, res: Response) => {
    res.json({
      provenance: {
        status: "FOUNDER_MAINTAINED",
        label: "Founder-maintained & Verified Dataset",
        methodologyNote: "Curated by CISE Intelligence Desk using official General Administration of Customs (PRC) and CBI trade aggregate reporting.",
        updateCadence: "Monthly",
        lastVerified: "2026-03-01",
        divergenceVariant: "Variant A (Exporter Source CIF/FOB Adjusted)"
      },
      annualTotals: [
        { year: "2020", volumeBillionUsd: 30.12, iraqExportsToChina: 22.45, chinaExportsToIraq: 7.67 },
        { year: "2021", volumeBillionUsd: 39.31, iraqExportsToChina: 28.52, chinaExportsToIraq: 10.79 },
        { year: "2022", volumeBillionUsd: 53.71, iraqExportsToChina: 39.73, chinaExportsToIraq: 13.98 },
        { year: "2023", volumeBillionUsd: 49.88, iraqExportsToChina: 35.66, chinaExportsToIraq: 14.22 },
        { year: "2024", volumeBillionUsd: 52.41, iraqExportsToChina: 36.98, chinaExportsToIraq: 15.43 },
        { year: "2025", volumeBillionUsd: 51.17, iraqExportsToChina: 35.80, chinaExportsToIraq: 15.37 }
      ],
      hs2Categories: [
        { code: "HS-27", nameEn: "Mineral Fuels & Oils", percent: 84.6, valueBillion: 43.29 },
        { code: "HS-84", nameEn: "Machinery & Nuclear Reactors", percent: 5.8, valueBillion: 2.97 },
        { code: "HS-85", nameEn: "Electrical Equipment & Telecomm", percent: 4.1, valueBillion: 2.10 },
        { code: "HS-87", nameEn: "Vehicles & Transit Rolling Stock", percent: 2.7, valueBillion: 1.38 },
        { code: "HS-72", nameEn: "Iron & Structural Steel", percent: 1.6, valueBillion: 0.82 },
        { code: "HS-OTH", nameEn: "Other Bilateral Commodities", percent: 1.2, valueBillion: 0.61 }
      ]
    });
  });

  // GET /api/public/institute/data-hub/corridor
  app.get("/api/public/institute/data-hub/corridor", async (_req: Request, res: Response) => {
    res.json({
      provenance: {
        status: "FOUNDER_MAINTAINED",
        label: "Founder-maintained Logistics Corridor Observatory",
        lastVerified: "2026-03-12"
      },
      nodes: [
        {
          id: "node-yiwu",
          nameEn: "Yiwu International Freight Terminal",
          nameAr: "محطة شحن ييوو الدولية",
          nameZh: "义乌国际陆港枢纽",
          nameCkb: "وێستگەی باری نێودەوڵەتی ییوو",
          nodeType: "Origin Hub",
          country: "China",
          status: "OPERATIONAL",
          weeklyContainerCapacity: 4500,
          logisticsProviders: ["COSCO", "Sinotrans", "Silk Road Rail Express"]
        },
        {
          id: "node-sulaymaniyah",
          nameEn: "Sulaymaniyah Logistics & Dry Hub (Bashmakh Transit)",
          nameAr: "مركز السليمانية اللوجستي ومحطة باشماخ",
          nameZh: "苏莱曼尼亚物流陆港（巴什马克口岸中转）",
          nameCkb: "ناوەندی لۆجستی سلێمانی و دەروازەی باشماخ",
          nodeType: "Inland Northern Distribution",
          country: "Iraq (Kurdistan Region)",
          status: "EXPANDING",
          weeklyContainerCapacity: 1800,
          logisticsProviders: ["Kurdish-Chinese Sourcing Consortium", "Iraq Landway Logistics"]
        },
        {
          id: "node-basra",
          nameEn: "Grand Faw Deepwater Terminal",
          nameAr: "محطة ميناء الفاو الكبير للمياه العميقة",
          nameZh: "大福深水港码头",
          nameCkb: "بەندەری قووڵی فاو",
          nodeType: "Southern Maritime Gateway",
          country: "Iraq (Basra)",
          status: "COMMISSIONING",
          weeklyContainerCapacity: 9200,
          logisticsProviders: ["General Company for Ports of Iraq", "China Harbor Engineering Co."]
        },
        {
          id: "node-baghdad",
          nameEn: "Baghdad Central Rail & Cargo Marshalling Hub",
          nameAr: "محطة بغداد المركزية لقطارات الشحن",
          nameZh: "巴格达中央铁路货运调度中心",
          nameCkb: "وێستگەی ناوەندی هێڵی ئاسنی بەغدا",
          nodeType: "Metropolitan Transfer Spoke",
          country: "Iraq (Baghdad)",
          status: "OPERATIONAL",
          weeklyContainerCapacity: 3100,
          logisticsProviders: ["Iraqi Republic Railways", "Bilateral Freight Lines"]
        }
      ]
    });
  });

  // GET /api/public/institute/feed.json
  app.get("/api/public/institute/feed.json", async (_req: Request, res: Response) => {
    try {
      const pubs = await prisma.cisePublication.findMany({
        where: { status: "PUBLISHED" },
        take: 10,
        orderBy: { publishedAt: "desc" }
      });
      res.json({
        version: "https://jsonfeed.org/version/1.1",
        title: "Chinese Institute for Strategic and Economic Studies (CISE) Research Feed",
        home_page_url: "https://iraq-china-agency.com/en/institute",
        feed_url: "https://iraq-china-agency.com/api/public/institute/feed.json",
        description: "Official publication and research syndication feed of the Chinese Institute for Strategic and Economic Studies (Iraqi-Chinese Agency).",
        items: pubs.map(p => ({
          id: p.slug,
          url: `https://iraq-china-agency.com/en/institute/publications/${p.slug}`,
          title: p.titleEn,
          summary: p.excerptEn,
          date_published: p.publishedAt.toISOString(),
          authors: [{ name: p.authorName }]
        }))
      });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to generate syndication feed" });
    }
  });

  // -----------------------------------------------------------------------
  // PUBLIC INQUIRY & APPLICATION POST ENDPOINTS
  // -----------------------------------------------------------------------

  // POST /api/public/institute/insurance-applications
  app.post("/api/public/institute/insurance-applications", optionalLimiter, async (req: Request, res: Response) => {
    try {
      const { fullName, email, phone, company, projectValue, sector, message } = req.body;
      if (!fullName || !email || !company) {
        return res.status(400).json({ error: "Missing required fields (fullName, email, company)" });
      }
      const ticketId = `SINOSURE-REQ-${Math.floor(100000 + Math.random() * 900000)}`;
      const saved = await prisma.ciseInsuranceApplication.create({
        data: {
          ticketId,
          fullName: fullName.trim(),
          email: email.trim(),
          phone: (phone || "").trim(),
          company: company.trim(),
          projectValue: (projectValue || "").trim(),
          sector: (sector || "").trim(),
          message: (message || "").trim(),
          status: "PENDING"
        }
      });
      res.status(201).json({
        success: true,
        ticketId,
        applicationId: saved.id,
        message: "Sovereign insurance facilitation dossier submitted successfully. CISE Sinosure Desk will reach out within 24 hours."
      });
    } catch (e: any) {
      console.error("Error submitting insurance application:", e);
      res.status(500).json({ error: "Failed to submit insurance application" });
    }
  });

  // POST /api/public/institute/consultancy-inquiries
  app.post("/api/public/institute/consultancy-inquiries", optionalLimiter, async (req: Request, res: Response) => {
    try {
      const { fullName, email, phone, entityName, serviceType, jurisdiction, inquiryText } = req.body;
      if (!fullName || !email || !entityName) {
        return res.status(400).json({ error: "Missing required fields (fullName, email, entityName)" });
      }
      const ticketId = `CONSULT-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
      const saved = await prisma.ciseConsultancyApplication.create({
        data: {
          ticketId,
          fullName: fullName.trim(),
          email: email.trim(),
          phone: (phone || "").trim(),
          entityName: entityName.trim(),
          serviceType: (serviceType || "BILATERAL").trim(),
          jurisdiction: (jurisdiction || "IRAQ_CHINA").trim(),
          inquiryText: (inquiryText || "").trim(),
          status: "PENDING"
        }
      });
      res.status(201).json({
        success: true,
        ticketId,
        inquiryId: saved.id,
        message: "Strategic financial & legal consultancy inquiry logged. A CISE Senior Advisor will respond under diplomatic confidentiality."
      });
    } catch (e: any) {
      console.error("Error submitting consultancy inquiry:", e);
      res.status(500).json({ error: "Failed to submit consultancy inquiry" });
    }
  });

  // POST /api/public/institute/media-requests
  app.post("/api/public/institute/media-requests", optionalLimiter, async (req: Request, res: Response) => {
    try {
      const { organization, fullName, email, phone, expertId, expertName, requestType, topic, deadline, syndicationIntent, preferredLanguage, message } = req.body;
      if (!organization || !fullName || !email) {
        return res.status(400).json({ error: "Missing required fields (organization, fullName, email)" });
      }
      const ticketRef = `CISE-MR-${Math.floor(100000 + Math.random() * 900000)}`;
      const bioPayload = JSON.stringify({
        type: "MEDIA_INTERVIEW_REQUEST",
        organization,
        phone: phone || "Not provided",
        expertId: expertId || "General",
        expertName: expertName || "Any Fellow",
        requestType: requestType || "INTERVIEW",
        topic: topic || "Bilateral Research",
        deadline: deadline || "Flexible",
        syndicationIntent: syndicationIntent || false,
        preferredLanguage: preferredLanguage || "en",
        notes: message || ""
      });
      const saved = await prisma.partnershipApplication.create({
        data: {
          fullName,
          email,
          company: organization,
          role: "Journalist / Media Partner",
          bio: bioPayload,
          bureau: "CISE Media & Communications Directorate",
          hash: ticketRef,
          status: "PENDING"
        }
      });
      res.status(201).json({
        success: true,
        ticketId: ticketRef,
        applicationId: saved.id,
        message: "Institutional interview & media request logged successfully. CISE Media Office will respond promptly."
      });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to process media request" });
    }
  });

  // POST /api/public/institute/syndication-applications
  app.post("/api/public/institute/syndication-applications", optionalLimiter, async (req: Request, res: Response) => {
    try {
      const { organizationName, country, mediaType, audienceSize, contactName, email, phone, notes } = req.body;
      const company = organizationName || req.body.company;
      const applicantName = contactName || req.body.fullName;
      const applicantEmail = email;
      if (!company || !applicantEmail) {
        return res.status(400).json({ error: "Missing required fields (organizationName, email)" });
      }
      const ticketRef = `CISE-SYND-${Math.floor(100000 + Math.random() * 900000)}`;
      const payload = JSON.stringify({
        type: "SYNDICATION_AGREEMENT_APPLICATION",
        country: country || "International",
        mediaType: mediaType || "News Agency / Digital Publication",
        audienceSize: audienceSize || "Tier 1 National",
        phone: phone || "",
        notes: notes || ""
      });
      const saved = await prisma.partnershipApplication.create({
        data: {
          fullName: applicantName || company,
          email: applicantEmail,
          company,
          role: mediaType || "Syndication Applicant",
          bio: payload,
          bureau: "CISE Research Syndication Desk",
          hash: ticketRef,
          status: "PENDING"
        }
      });
      res.status(201).json({
        success: true,
        ticketId: ticketRef,
        applicationId: saved.id,
        message: "Syndication & co-publishing agreement submitted. A CISE Institutional Partnerships Officer will review."
      });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to process syndication application" });
    }
  });

  // -----------------------------------------------------------------------
  // CISE COMMAND HUB MANAGEMENT & CRUD ENDPOINTS
  // -----------------------------------------------------------------------

  // GET /api/hub/institute/overview
  app.get("/api/hub/institute/overview", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const [pillarsCount, expertsCount, pubsCount, eventsCount, projectsCount, coursesCount, insuranceCount, consultancyCount, mediaCount] = await Promise.all([
        prisma.cisePillar.count(),
        prisma.ciseExpert.count(),
        prisma.cisePublication.count(),
        prisma.ciseEvent.count(),
        prisma.ciseProject.count(),
        prisma.ciseCourse.count(),
        prisma.ciseInsuranceApplication.count(),
        prisma.ciseConsultancyApplication.count(),
        prisma.partnershipApplication.count({ where: { bureau: "CISE Media & Communications Directorate" } })
      ]);
      res.json({
        pillarsCount,
        expertsCount,
        pubsCount,
        eventsCount,
        projectsCount,
        coursesCount,
        insuranceCount,
        consultancyCount,
        mediaCount,
        systemStatus: "ONLINE",
        lastSync: new Date().toISOString()
      });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to load CISE overview" });
    }
  });

  // --- PILLARS CRUD ---
  app.get("/api/hub/institute/pillars", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const pillars = await prisma.cisePillar.findMany({ orderBy: { displayOrder: "asc" } });
      res.json(pillars);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch pillars" });
    }
  });

  app.post("/api/hub/institute/pillars", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const { slug, titleEn, titleAr, titleZh, titleCkb, descriptionEn, descriptionAr, descriptionZh, descriptionCkb, leadFellowEn, leadFellowAr, leadFellowZh, leadFellowCkb, metricLabelEn, metricLabelAr, metricLabelZh, metricLabelCkb, metricValue, topics, displayOrder, status } = req.body;
      const created = await prisma.cisePillar.create({
        data: {
          slug: slug || `pillar-${Date.now()}`,
          titleEn: titleEn || "New Research Pillar",
          titleAr: titleAr || "",
          titleZh: titleZh || "",
          titleCkb: titleCkb || "",
          descriptionEn: descriptionEn || "",
          descriptionAr: descriptionAr || "",
          descriptionZh: descriptionZh || "",
          descriptionCkb: descriptionCkb || "",
          leadFellowEn: leadFellowEn || "",
          leadFellowAr: leadFellowAr || "",
          leadFellowZh: leadFellowZh || "",
          leadFellowCkb: leadFellowCkb || "",
          metricLabelEn: metricLabelEn || "",
          metricLabelAr: metricLabelAr || "",
          metricLabelZh: metricLabelZh || "",
          metricLabelCkb: metricLabelCkb || "",
          metricValue: metricValue || "",
          topics: typeof topics === "string" ? topics : JSON.stringify(topics || []),
          displayOrder: parseInt(displayOrder, 10) || 0,
          status: status || "PUBLISHED"
        }
      });
      safeRecordAudit(req, "CREATE_CISE_PILLAR", "INSTITUTE", undefined, `Created CISE Research Pillar: ${created.titleEn} (${created.slug})`);
      res.status(201).json(created);
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to create pillar" });
    }
  });

  app.put("/api/hub/institute/pillars/:id", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const { id } = req.params;
      const data = { ...req.body };
      delete data.id;
      delete data.createdAt;
      delete data.updatedAt;
      if (data.topics && typeof data.topics !== "string") {
        data.topics = JSON.stringify(data.topics);
      }
      if (data.displayOrder !== undefined) {
        data.displayOrder = parseInt(data.displayOrder, 10);
      }
      const updated = await prisma.cisePillar.update({ where: { id }, data });
      safeRecordAudit(req, "UPDATE_CISE_PILLAR", "INSTITUTE", undefined, `Updated CISE Research Pillar: ${updated.titleEn}`);
      res.json(updated);
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to update pillar" });
    }
  });

  app.delete("/api/hub/institute/pillars/:id", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const { id } = req.params;
      const deleted = await prisma.cisePillar.delete({ where: { id } });
      safeRecordAudit(req, "DELETE_CISE_PILLAR", "INSTITUTE", undefined, `Deleted CISE Research Pillar: ${deleted.titleEn}`);
      res.json({ success: true, deleted });
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to delete pillar" });
    }
  });

  // --- EXPERTS CRUD ---
  app.get("/api/hub/institute/experts", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const experts = await prisma.ciseExpert.findMany({ orderBy: { displayOrder: "asc" } });
      res.json(experts);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch experts" });
    }
  });

  app.post("/api/hub/institute/experts", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const { slug, nameEn, nameAr, nameZh, nameCkb, titleEn, titleAr, titleZh, titleCkb, bioEn, bioAr, bioZh, bioCkb, imageUrl, pillars, languages, email, phone, displayOrder, status } = req.body;
      const created = await prisma.ciseExpert.create({
        data: {
          slug: slug || `expert-${Date.now()}`,
          nameEn: nameEn || "New Scholar",
          nameAr: nameAr || "",
          nameZh: nameZh || "",
          nameCkb: nameCkb || "",
          titleEn: titleEn || "",
          titleAr: titleAr || "",
          titleZh: titleZh || "",
          titleCkb: titleCkb || "",
          bioEn: bioEn || "",
          bioAr: bioAr || "",
          bioZh: bioZh || "",
          bioCkb: bioCkb || "",
          imageUrl: imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
          pillars: typeof pillars === "string" ? pillars : JSON.stringify(pillars || []),
          languages: typeof languages === "string" ? languages : JSON.stringify(languages || []),
          email: email || "",
          phone: phone || "",
          displayOrder: parseInt(displayOrder, 10) || 0,
          status: status || "PUBLISHED"
        }
      });
      safeRecordAudit(req, "CREATE_CISE_EXPERT", "INSTITUTE", undefined, `Created CISE Expert: ${created.nameEn} (${created.slug})`);
      res.status(201).json(created);
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to create expert" });
    }
  });

  app.put("/api/hub/institute/experts/:id", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const { id } = req.params;
      const data = { ...req.body };
      delete data.id;
      delete data.createdAt;
      delete data.updatedAt;
      if (data.pillars && typeof data.pillars !== "string") data.pillars = JSON.stringify(data.pillars);
      if (data.languages && typeof data.languages !== "string") data.languages = JSON.stringify(data.languages);
      if (data.displayOrder !== undefined) data.displayOrder = parseInt(data.displayOrder, 10);
      const updated = await prisma.ciseExpert.update({ where: { id }, data });
      safeRecordAudit(req, "UPDATE_CISE_EXPERT", "INSTITUTE", undefined, `Updated CISE Expert: ${updated.nameEn}`);
      res.json(updated);
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to update expert" });
    }
  });

  app.delete("/api/hub/institute/experts/:id", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const { id } = req.params;
      const deleted = await prisma.ciseExpert.delete({ where: { id } });
      safeRecordAudit(req, "DELETE_CISE_EXPERT", "INSTITUTE", undefined, `Deleted CISE Expert: ${deleted.nameEn}`);
      res.json({ success: true, deleted });
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to delete expert" });
    }
  });

  // --- PUBLICATIONS CRUD ---
  app.get("/api/hub/institute/publications", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const pubs = await prisma.cisePublication.findMany({ orderBy: { publishedAt: "desc" } });
      res.json(pubs);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch publications" });
    }
  });

  app.post("/api/hub/institute/publications", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const { slug, type, publicationType, titleEn, titleAr, titleZh, titleCkb, excerptEn, excerptAr, excerptZh, excerptCkb, contentEn, contentAr, contentZh, contentCkb, imageUrl, authorName, topics, region, doi, pdfUrl, wordCount, status } = req.body;
      const created = await prisma.cisePublication.create({
        data: {
          slug: slug || `pub-${Date.now()}`,
          type: type || "POLICY_BRIEF",
          publicationType: publicationType || "Policy Brief",
          titleEn: titleEn || "New Publication",
          titleAr: titleAr || "",
          titleZh: titleZh || "",
          titleCkb: titleCkb || "",
          excerptEn: excerptEn || "",
          excerptAr: excerptAr || "",
          excerptZh: excerptZh || "",
          excerptCkb: excerptCkb || "",
          contentEn: contentEn || "",
          contentAr: contentAr || "",
          contentZh: contentZh || "",
          contentCkb: contentCkb || "",
          imageUrl: imageUrl || "https://images.unsplash.com/photo-1521295121812-af46571d9ec6?auto=format&fit=crop&q=80&w=1200",
          authorName: authorName || "CISE Fellow",
          topics: typeof topics === "string" ? topics : JSON.stringify(topics || []),
          region: region || "BILATERAL",
          doi: doi || "",
          pdfUrl: pdfUrl || "",
          wordCount: parseInt(wordCount, 10) || 2500,
          status: status || "PUBLISHED"
        }
      });
      safeRecordAudit(req, "CREATE_CISE_PUBLICATION", "INSTITUTE", undefined, `Created CISE Publication: ${created.titleEn} (${created.slug})`);
      res.status(201).json(created);
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to create publication" });
    }
  });

  app.put("/api/hub/institute/publications/:id", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const { id } = req.params;
      const data = { ...req.body };
      delete data.id;
      delete data.createdAt;
      delete data.updatedAt;
      if (data.topics && typeof data.topics !== "string") data.topics = JSON.stringify(data.topics);
      if (data.wordCount !== undefined) data.wordCount = parseInt(data.wordCount, 10);
      const updated = await prisma.cisePublication.update({ where: { id }, data });
      safeRecordAudit(req, "UPDATE_CISE_PUBLICATION", "INSTITUTE", undefined, `Updated CISE Publication: ${updated.titleEn}`);
      res.json(updated);
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to update publication" });
    }
  });

  app.delete("/api/hub/institute/publications/:id", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const { id } = req.params;
      const deleted = await prisma.cisePublication.delete({ where: { id } });
      safeRecordAudit(req, "DELETE_CISE_PUBLICATION", "INSTITUTE", undefined, `Deleted CISE Publication: ${deleted.titleEn}`);
      res.json({ success: true, deleted });
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to delete publication" });
    }
  });

  // --- EVENTS CRUD ---
  app.get("/api/hub/institute/events", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const events = await prisma.ciseEvent.findMany({ orderBy: { displayOrder: "asc" } });
      res.json(events);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  app.post("/api/hub/institute/events", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const { slug, titleEn, titleAr, titleZh, titleCkb, descriptionEn, descriptionAr, descriptionZh, descriptionCkb, locationEn, locationAr, locationZh, locationCkb, eventDate, eventType, registrationUrl, displayOrder, status } = req.body;
      const created = await prisma.ciseEvent.create({
        data: {
          slug: slug || `event-${Date.now()}`,
          titleEn: titleEn || "New Event",
          titleAr: titleAr || "",
          titleZh: titleZh || "",
          titleCkb: titleCkb || "",
          descriptionEn: descriptionEn || "",
          descriptionAr: descriptionAr || "",
          descriptionZh: descriptionZh || "",
          descriptionCkb: descriptionCkb || "",
          locationEn: locationEn || "",
          locationAr: locationAr || "",
          locationZh: locationZh || "",
          locationCkb: locationCkb || "",
          eventDate: eventDate || new Date().toISOString().slice(0, 10),
          eventType: eventType || "SYMPOSIUM",
          registrationUrl: registrationUrl || "",
          displayOrder: parseInt(displayOrder, 10) || 0,
          status: status || "PUBLISHED"
        }
      });
      safeRecordAudit(req, "CREATE_CISE_EVENT", "INSTITUTE", undefined, `Created CISE Event: ${created.titleEn}`);
      res.status(201).json(created);
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to create event" });
    }
  });

  app.put("/api/hub/institute/events/:id", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const { id } = req.params;
      const data = { ...req.body };
      delete data.id;
      delete data.createdAt;
      delete data.updatedAt;
      if (data.displayOrder !== undefined) data.displayOrder = parseInt(data.displayOrder, 10);
      const updated = await prisma.ciseEvent.update({ where: { id }, data });
      safeRecordAudit(req, "UPDATE_CISE_EVENT", "INSTITUTE", undefined, `Updated CISE Event: ${updated.titleEn}`);
      res.json(updated);
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to update event" });
    }
  });

  app.delete("/api/hub/institute/events/:id", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const { id } = req.params;
      const deleted = await prisma.ciseEvent.delete({ where: { id } });
      safeRecordAudit(req, "DELETE_CISE_EVENT", "INSTITUTE", undefined, `Deleted CISE Event: ${deleted.titleEn}`);
      res.json({ success: true, deleted });
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to delete event" });
    }
  });

  // --- PROJECTS CRUD ---
  app.get("/api/hub/institute/projects", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const projects = await prisma.ciseProject.findMany({ orderBy: { displayOrder: "asc" } });
      res.json(projects);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.post("/api/hub/institute/projects", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const { slug, nameEn, nameAr, nameZh, nameCkb, sectorEn, sectorAr, sectorZh, sectorCkb, status, valueUsd, contractor, locationEn, locationAr, locationZh, locationCkb, verifiedSources, displayOrder } = req.body;
      const created = await prisma.ciseProject.create({
        data: {
          slug: slug || `project-${Date.now()}`,
          nameEn: nameEn || "New BRI Project",
          nameAr: nameAr || "",
          nameZh: nameZh || "",
          nameCkb: nameCkb || "",
          sectorEn: sectorEn || "",
          sectorAr: sectorAr || "",
          sectorZh: sectorZh || "",
          sectorCkb: sectorCkb || "",
          status: status || "IN_PROGRESS",
          valueUsd: valueUsd || "",
          contractor: contractor || "",
          locationEn: locationEn || "",
          locationAr: locationAr || "",
          locationZh: locationZh || "",
          locationCkb: locationCkb || "",
          verifiedSources: typeof verifiedSources === "string" ? verifiedSources : JSON.stringify(verifiedSources || []),
          displayOrder: parseInt(displayOrder, 10) || 0
        }
      });
      safeRecordAudit(req, "CREATE_CISE_PROJECT", "INSTITUTE", undefined, `Created CISE BRI Project: ${created.nameEn}`);
      res.status(201).json(created);
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to create project" });
    }
  });

  app.put("/api/hub/institute/projects/:id", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const { id } = req.params;
      const data = { ...req.body };
      delete data.id;
      delete data.createdAt;
      delete data.updatedAt;
      if (data.verifiedSources && typeof data.verifiedSources !== "string") data.verifiedSources = JSON.stringify(data.verifiedSources);
      if (data.displayOrder !== undefined) data.displayOrder = parseInt(data.displayOrder, 10);
      const updated = await prisma.ciseProject.update({ where: { id }, data });
      safeRecordAudit(req, "UPDATE_CISE_PROJECT", "INSTITUTE", undefined, `Updated CISE BRI Project: ${updated.nameEn}`);
      res.json(updated);
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to update project" });
    }
  });

  app.delete("/api/hub/institute/projects/:id", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const { id } = req.params;
      const deleted = await prisma.ciseProject.delete({ where: { id } });
      safeRecordAudit(req, "DELETE_CISE_PROJECT", "INSTITUTE", undefined, `Deleted CISE BRI Project: ${deleted.nameEn}`);
      res.json({ success: true, deleted });
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to delete project" });
    }
  });

  // --- COURSES CRUD ---
  app.get("/api/hub/institute/courses", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const courses = await prisma.ciseCourse.findMany({ orderBy: { displayOrder: "asc" } });
      res.json(courses);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });

  app.post("/api/hub/institute/courses", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const { slug, level, titleEn, titleAr, titleZh, titleCkb, descriptionEn, descriptionAr, descriptionZh, descriptionCkb, duration, schedule, fee, displayOrder, status } = req.body;
      const created = await prisma.ciseCourse.create({
        data: {
          slug: slug || `course-${Date.now()}`,
          level: level || "HSK-1",
          titleEn: titleEn || "New Course",
          titleAr: titleAr || "",
          titleZh: titleZh || "",
          titleCkb: titleCkb || "",
          descriptionEn: descriptionEn || "",
          descriptionAr: descriptionAr || "",
          descriptionZh: descriptionZh || "",
          descriptionCkb: descriptionCkb || "",
          duration: duration || "",
          schedule: schedule || "",
          fee: fee || "Free Sovereign Sponsorship",
          displayOrder: parseInt(displayOrder, 10) || 0,
          status: status || "ACTIVE"
        }
      });
      safeRecordAudit(req, "CREATE_CISE_COURSE", "INSTITUTE", undefined, `Created Chinese Language Course: ${created.titleEn}`);
      res.status(201).json(created);
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to create course" });
    }
  });

  app.put("/api/hub/institute/courses/:id", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const { id } = req.params;
      const data = { ...req.body };
      delete data.id;
      delete data.createdAt;
      delete data.updatedAt;
      if (data.displayOrder !== undefined) data.displayOrder = parseInt(data.displayOrder, 10);
      const updated = await prisma.ciseCourse.update({ where: { id }, data });
      safeRecordAudit(req, "UPDATE_CISE_COURSE", "INSTITUTE", undefined, `Updated Chinese Language Course: ${updated.titleEn}`);
      res.json(updated);
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to update course" });
    }
  });

  app.delete("/api/hub/institute/courses/:id", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const { id } = req.params;
      const deleted = await prisma.ciseCourse.delete({ where: { id } });
      safeRecordAudit(req, "DELETE_CISE_COURSE", "INSTITUTE", undefined, `Deleted Chinese Language Course: ${deleted.titleEn}`);
      res.json({ success: true, deleted });
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to delete course" });
    }
  });

  // --- INQUIRIES & APPLICATIONS MANAGEMENT ---
  app.get("/api/hub/institute/insurance-applications", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const apps = await prisma.ciseInsuranceApplication.findMany({ orderBy: { createdAt: "desc" } });
      res.json(apps);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch insurance applications" });
    }
  });

  app.patch("/api/hub/institute/insurance-applications/:id", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = await prisma.ciseInsuranceApplication.update({ where: { id }, data: { status } });
      res.json(updated);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to update status" });
    }
  });

  app.get("/api/hub/institute/consultancy-inquiries", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const inqs = await prisma.ciseConsultancyApplication.findMany({ orderBy: { createdAt: "desc" } });
      res.json(inqs);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch consultancy inquiries" });
    }
  });

  app.patch("/api/hub/institute/consultancy-inquiries/:id", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = await prisma.ciseConsultancyApplication.update({ where: { id }, data: { status } });
      res.json(updated);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to update status" });
    }
  });

  app.get("/api/hub/institute/media-requests", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const records = await prisma.partnershipApplication.findMany({
        where: { bureau: "CISE Media & Communications Directorate" },
        orderBy: { createdAt: "desc" }
      });
      res.json(records);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch media requests" });
    }
  });

  app.get("/api/hub/institute/syndication-applications", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      const records = await prisma.partnershipApplication.findMany({
        where: { bureau: "CISE Research Syndication Desk" },
        orderBy: { createdAt: "desc" }
      });
      res.json(records);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch syndication applications" });
    }
  });

  // POST /api/hub/institute/reseed
  app.post("/api/hub/institute/reseed", async (req: Request, res: Response) => {
    if (!checkHubRole(req, res)) return;
    try {
      await seedInstituteData();
      res.json({ success: true, message: "CISE Institute database successfully reseeded." });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to reseed database" });
    }
  });
}
