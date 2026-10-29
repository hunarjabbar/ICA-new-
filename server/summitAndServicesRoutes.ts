import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "server", "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const BOOTHS_FILE = path.join(DATA_DIR, "summit_booths.json");
const VIP_FILE = path.join(DATA_DIR, "summit_vip.json");
const AGENDA_FILE = path.join(DATA_DIR, "summit_agenda.json");
const DOSSIERS_FILE = path.join(DATA_DIR, "cise_dossiers.json");

function readJsonFile<T>(filePath: string, defaultData: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content);
    }
  } catch (e) {
    console.error(`Error reading ${filePath}:`, e);
  }
  try {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  } catch (err) {
    console.error(`Error writing default to ${filePath}:`, err);
  }
  return defaultData;
}

function writeJsonFile(filePath: string, data: any) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(`Error writing ${filePath}:`, e);
  }
}

// Initial Booths across Fairground Halls
const INITIAL_BOOTHS = [
  // Hall A: Strategic Energy, Petrochemicals & Heavy Infrastructure
  { id: 'A-101', hall: 'A', hallName: 'Hall A: Strategic Energy & Petrochem', sector: 'energy-petrochemicals', sectorName: 'Energy & Petrochemicals', size: '36 m²', type: 'Island Flagship Pavilion', price: 7200, status: 'reserved', exhibitor: 'Sinopec Middle East EPC Corp', x: -6, z: -5, width: 4, depth: 3 },
  { id: 'A-102', hall: 'A', hallName: 'Hall A: Strategic Energy & Petrochem', sector: 'energy-petrochemicals', sectorName: 'Energy & Petrochemicals', size: '18 m²', type: 'Corner Shell Scheme', price: 3600, status: 'available', x: -1, z: -5, width: 2.5, depth: 2 },
  { id: 'A-103', hall: 'A', hallName: 'Hall A: Strategic Energy & Petrochem', sector: 'construction-infra', sectorName: 'Construction & Civil Infra', size: '18 m²', type: 'Corner Shell Scheme', price: 3600, status: 'available', x: 2.5, z: -5, width: 2.5, depth: 2 },
  { id: 'A-104', hall: 'A', hallName: 'Hall A: Strategic Energy & Petrochem', sector: 'construction-infra', sectorName: 'Construction & Civil Infra', size: '9 m²', type: 'Standard Shell Scheme', price: 1800, status: 'available', x: 6, z: -5, width: 2, depth: 1.5 },
  { id: 'A-105', hall: 'A', hallName: 'Hall A: Strategic Energy & Petrochem', sector: 'industrial-machinery', sectorName: 'Heavy Machinery & EPC', size: '36 m²', type: 'Island Flagship Pavilion', price: 7200, status: 'available', x: -5, z: 0, width: 4, depth: 3 },
  { id: 'A-106', hall: 'A', hallName: 'Hall A: Strategic Energy & Petrochem', sector: 'industrial-machinery', sectorName: 'Heavy Machinery & EPC', size: '9 m²', type: 'Standard Shell Scheme', price: 1800, status: 'available', x: 0, z: 0, width: 2, depth: 1.5 },
  { id: 'A-107', hall: 'A', hallName: 'Hall A: Strategic Energy & Petrochem', sector: 'automotive-ev', sectorName: 'Automotive & EV Logistics', size: '18 m²', type: 'Corner Shell Scheme', price: 3600, status: 'available', x: 3.5, z: 0, width: 2.5, depth: 2 },
  { id: 'A-108', hall: 'A', hallName: 'Hall A: Strategic Energy & Petrochem', sector: 'automotive-ev', sectorName: 'Automotive & EV Logistics', size: '18 m²', type: 'Corner Shell Scheme', price: 3600, status: 'selected', x: 6.5, z: 0, width: 2.5, depth: 2 },

  // Hall B: Digital Tech, Telecom, Healthcare & Agritech
  { id: 'B-201', hall: 'B', hallName: 'Hall B: Digital Tech & Life Sciences', sector: 'telecom-it', sectorName: '5G, Cloud & AI Systems', size: '36 m²', type: 'Island Flagship Pavilion', price: 7200, status: 'available', x: -6, z: -4, width: 4, depth: 3 },
  { id: 'B-202', hall: 'B', hallName: 'Hall B: Digital Tech & Life Sciences', sector: 'telecom-it', sectorName: '5G, Cloud & AI Systems', size: '18 m²', type: 'Corner Shell Scheme', price: 3600, status: 'available', x: -1, z: -4, width: 2.5, depth: 2 },
  { id: 'B-203', hall: 'B', hallName: 'Hall B: Digital Tech & Life Sciences', sector: 'medical-pharma', sectorName: 'Medical Devices & Pharma', size: '9 m²', type: 'Standard Shell Scheme', price: 1800, status: 'available', x: 3, z: -4, width: 2, depth: 1.5 },
  { id: 'B-204', hall: 'B', hallName: 'Hall B: Digital Tech & Life Sciences', sector: 'medical-pharma', sectorName: 'Medical Devices & Pharma', size: '18 m²', type: 'Corner Shell Scheme', price: 3600, status: 'reserved', exhibitor: 'Sinopharm International Iraq JV', x: 6.5, z: -4, width: 2.5, depth: 2 },
  { id: 'B-205', hall: 'B', hallName: 'Hall B: Digital Tech & Life Sciences', sector: 'agriculture-food', sectorName: 'Modern Agritech & Cold Chain', size: '9 m²', type: 'Standard Shell Scheme', price: 1800, status: 'available', x: -3, z: 2, width: 2, depth: 1.5 },
  { id: 'B-206', hall: 'B', hallName: 'Hall B: Digital Tech & Life Sciences', sector: 'agriculture-food', sectorName: 'Modern Agritech & Cold Chain', size: '18 m²', type: 'Corner Shell Scheme', price: 3600, status: 'available', x: 3, z: 2, width: 2.5, depth: 2 },

  // Hall C: Consumer Goods, Bilateral Clearing & Trade Logistics
  { id: 'C-301', hall: 'C', hallName: 'Hall C: Bilateral Finance & Logistics', sector: 'consumer-electronics', sectorName: 'Smart Appliances & Consumer', size: '18 m²', type: 'Corner Shell Scheme', price: 3600, status: 'available', x: -5, z: -3, width: 2.5, depth: 2 },
  { id: 'C-302', hall: 'C', hallName: 'Hall C: Bilateral Finance & Logistics', sector: 'consumer-electronics', sectorName: 'Smart Appliances & Consumer', size: '9 m²', type: 'Standard Shell Scheme', price: 1800, status: 'available', x: -1.5, z: -3, width: 2, depth: 1.5 },
  { id: 'C-303', hall: 'C', hallName: 'Hall C: Bilateral Finance & Logistics', sector: 'textiles-goods', sectorName: 'Industrial Textiles & Materials', size: '9 m²', type: 'Standard Shell Scheme', price: 1800, status: 'available', x: 2, z: -3, width: 2, depth: 1.5 },
  { id: 'C-304', hall: 'C', hallName: 'Hall C: Bilateral Finance & Logistics', sector: 'logistics-freight', sectorName: 'BRI Multimodal Corridors', size: '18 m²', type: 'Corner Shell Scheme', price: 3600, status: 'available', x: 5.5, z: -3, width: 2.5, depth: 2 },
  { id: 'C-305', hall: 'C', hallName: 'Hall C: Bilateral Finance & Logistics', sector: 'financial-clearing', sectorName: 'CIPS & IQD-RMB Clearing Hub', size: '36 m²', type: 'Island Flagship Pavilion', price: 7200, status: 'reserved', exhibitor: 'Bank of China & CBI Bilateral Desk', x: 0, z: 2.5, width: 4.5, depth: 3 },

  // Outdoor Pavilion: Heavy Mining, Cranes & Wind Power Towers
  { id: 'OUT-401', hall: 'OUTDOOR', hallName: 'Outdoor Arena: Heavy Mach & Energy', sector: 'industrial-machinery', sectorName: 'Excavators, Cranes & Mining', size: '72 m²', type: 'Open-Air Mega Pavilion', price: 12000, status: 'available', x: -4, z: -2, width: 5, depth: 4 },
  { id: 'OUT-402', hall: 'OUTDOOR', hallName: 'Outdoor Arena: Heavy Mach & Energy', sector: 'automotive-ev', sectorName: 'Commercial EV Fleets & Trucks', size: '72 m²', type: 'Open-Air Mega Pavilion', price: 12000, status: 'available', x: 4, z: -2, width: 5, depth: 4 }
];

// Initial VIP Registrations
const INITIAL_VIP = [
  {
    id: "vip-1",
    code: "VIP-PROTO-84920",
    officialName: "H.E. Dr. Tariq Al-Hashemi",
    diplomaticTitle: "Deputy Minister of Industry & Minerals",
    ministryOrEntity: "Ministry of Industry & Minerals, Baghdad",
    country: "Iraq",
    officialEmail: "protocol.deputy@industry.gov.iq",
    protocolPhone: "+964 790 112 4433",
    delegationCount: 4,
    requiresSecurityEscort: true,
    requiresBilingualAide: true,
    bilateralSalonRequested: true,
    status: "APPROVED",
    registeredAt: "2026-04-10T09:30:00Z",
    assignedOfficer: "Counselor Z. Wang (Consular Liaison)"
  },
  {
    id: "vip-2",
    code: "VIP-PROTO-61842",
    officialName: "Minister Counselor Chen Weimin",
    diplomaticTitle: "Chief Economic & Commercial Counselor",
    ministryOrEntity: "Embassy of the People's Republic of China",
    country: "China",
    officialEmail: "weimin.chen@mofcom.gov.cn",
    protocolPhone: "+964 771 890 2211",
    delegationCount: 6,
    requiresSecurityEscort: true,
    requiresBilingualAide: true,
    bilateralSalonRequested: true,
    status: "APPROVED",
    registeredAt: "2026-04-11T14:15:00Z",
    assignedOfficer: "Director K. Qadir (Sulaymaniyah Protocol)"
  },
  {
    id: "vip-3",
    code: "VIP-PROTO-29471",
    officialName: "Governor Azad Barzanji",
    diplomaticTitle: "Provincial Governor & Council President",
    ministryOrEntity: "Sulaymaniyah Governorate Administration",
    country: "Kurdistan Region / Iraq",
    officialEmail: "governor.office@sulaymaniyah.gov.krd",
    protocolPhone: "+964 750 445 9900",
    delegationCount: 5,
    requiresSecurityEscort: true,
    requiresBilingualAide: false,
    bilateralSalonRequested: true,
    status: "PENDING",
    registeredAt: "2026-04-14T11:20:00Z",
    assignedOfficer: "Unassigned (Pending Directorate Approval)"
  }
];

// Initial CISE Universal Dossiers
const INITIAL_DOSSIERS = [
  {
    code: "CISE-DOS-2026-1049",
    serviceId: "clearing-rail",
    serviceName: {
      en: "Sovereign Bilateral Clearing Rail (IQD ⇄ RMB)",
      ar: "مسار المقاصة الثنائية السيادية (دينار عراقي ⇄ يوان صيني)",
      zh: "中伊双边本币清算直通通道 (IQD ⇄ RMB)",
      ckb: "هێڵی پاکتاوی دوولایەنەی دراو (دینار ⇄ یوان)"
    },
    clientName: "Al-Mansour Heavy Industrial Equipment Ltd.",
    applicantEmail: "trade@almansour-machinery.iq",
    companyEntity: "Al-Mansour Group LLC",
    jurisdiction: "Baghdad / Shanghai",
    estimatedFeeUSD: 3850,
    estimatedFeeIQD: 5043500,
    estimatedFeeRMB: 27720,
    tier: "Priority Sovereign Clearing",
    slaDays: 2,
    stage: "INTERBANK_VERIFIED",
    stages: [
      { name: "Submission & Dossier Verification", date: "2026-04-08", done: true, note: "Documentary proof and trade contract validated." },
      { name: "Compliance & Anti-Money Laundering Screening", date: "2026-04-09", done: true, note: "Cleared international sanction screening and CIPS checks." },
      { name: "Interbank Liquidity & Pool Allocation", date: "2026-04-11", done: true, note: "Allocated 14.5M RMB liquidity pool at CBI-PBOC swap window." },
      { name: "Sovereign Clearing Authorization", date: "Pending", done: false, note: "Awaiting final settlement release from Central Clearing Bureau." },
      { name: "Settlement Dispatched & Credited", date: "Pending", done: false, note: "SWIFT/mBridge dispatch receipt issuance." }
    ],
    submittedAt: "2026-04-08T10:00:00Z",
    assignedOfficer: "Dr. Liu Jin (Senior Bilateral Economist)"
  },
  {
    code: "CISE-DOS-2026-2184",
    serviceId: "sinosure-coverage",
    serviceName: {
      en: "Sinosure Strategic Risk Mitigation & Underwriting",
      ar: "تأمين ودرء المخاطر الاستراتيجية مع سينوشور",
      zh: "中国信保买方信贷与主权信用保险对接",
      ckb: "بیمەی مەترسی ستراتیژی لەگەڵ سینۆشۆر"
    },
    clientName: "Zagros Petrochemical Logistics Consortium",
    applicantEmail: "corporate@zagros-logistics.krd",
    companyEntity: "Zagros Infrastructure Holdings",
    jurisdiction: "Erbil / Beijing",
    estimatedFeeUSD: 6200,
    estimatedFeeIQD: 8122000,
    estimatedFeeRMB: 44640,
    tier: "Full Sovereign Underwriting",
    slaDays: 5,
    stage: "COMPLIANCE_REVIEW",
    stages: [
      { name: "Submission & Dossier Verification", date: "2026-04-12", done: true, note: "Balance sheet, audit report and bill of lading registered." },
      { name: "Compliance & Anti-Money Laundering Screening", date: "2026-04-14", done: true, note: "Underwriter review of project financial projections." },
      { name: "Interbank Liquidity & Pool Allocation", date: "Pending", done: false, note: "Risk scoring and premium index generation." },
      { name: "Sovereign Clearing Authorization", date: "Pending", done: false, note: "Sinosure Head Office policy endorsement." },
      { name: "Settlement Dispatched & Credited", date: "Pending", done: false, note: "Issuance of Bilateral Indemnity Certificate." }
    ],
    submittedAt: "2026-04-12T15:30:00Z",
    assignedOfficer: "Counselor H. Barzanji (Risk Director)"
  },
  {
    code: "CISE-DOS-2026-3902",
    serviceId: "visa-consular",
    serviceName: {
      en: "Bilateral Diplomatic & Business Fast-Track Visa Centre",
      ar: "مركز التأشيرات الدبلوماسية والتجارية السريعة",
      zh: "中伊商贸与外交代表团加急签证服务中心",
      ckb: "ناوەندی ڤیزای دیپلۆماسی و بازرگانی خێرا"
    },
    clientName: "Shaanxi Electric Power Delegation (8 Engineers)",
    applicantEmail: "delegation@sep-global.cn",
    companyEntity: "Shaanxi Electric Power Construction Co.",
    jurisdiction: "Xi'an / Basra",
    estimatedFeeUSD: 1440,
    estimatedFeeIQD: 1886400,
    estimatedFeeRMB: 10368,
    tier: "Fast-Track Consular Courier",
    slaDays: 3,
    stage: "SOVEREIGN_APPROVED",
    stages: [
      { name: "Submission & Dossier Verification", date: "2026-04-13", done: true, note: "Passport biometrics and ministry invitation letters validated." },
      { name: "Compliance & Anti-Money Laundering Screening", date: "2026-04-14", done: true, note: "Security vetting completed by Iraqi Consular Affairs Bureau." },
      { name: "Interbank Liquidity & Pool Allocation", date: "2026-04-15", done: true, note: "Consular statutory fees disbursed." },
      { name: "Sovereign Clearing Authorization", date: "2026-04-16", done: true, note: "Biometric Diplomatic E-Visas stamped and approved." },
      { name: "Settlement Dispatched & Credited", date: "Pending", done: false, note: "Courier dispatching to Baghdad International Airport Protocol." }
    ],
    submittedAt: "2026-04-13T08:15:00Z",
    assignedOfficer: "Attaché Tariq Nadir (Consular Fast-Track)"
  }
];

// Initial Summit Agenda Sessions
const INITIAL_AGENDA = [
  {
    id: "session-1",
    day: 1,
    date: "2026-10-18",
    timeStart: "09:00",
    timeEnd: "11:30",
    hall: "Grand Plenary Hall (Fairground)",
    track: "Diplomatic & Strategic Plenary",
    titleEn: "Opening Plenary: Decade of the Comprehensive Strategic Partnership (2015–2025+)",
    titleAr: "الجلسة الافتتاحية العامة: عقد من الشراكة الاستراتيجية الشاملة بين العراق والصين",
    titleZh: "开幕全会：中伊建立战略伙伴关系十周年（2015-2025+）",
    titleCkb: "دانیشتنی دەستپێکی گشتی: دە ساڵ لە هاوبەشیی ستراتیژی گشتگیر",
    speakers: ["H.E. Prime Minister of Iraq (Representative)", "H.E. Ambassador of the People's Republic of China", "President of Kurdistan Region"],
    moderator: "Dr. Hunar Jabbar (CISE Institute Director)",
    status: "CONFIRMED"
  },
  {
    id: "session-2",
    day: 1,
    date: "2026-10-18",
    timeStart: "13:30",
    timeEnd: "15:45",
    hall: "Hall A: Strategic Energy & Petrochem",
    track: "Energy & Infrastructure",
    titleEn: "Belt & Road Infrastructure: Energy Transition, Upstream EPC & Modern Refineries",
    titleAr: "بنية الحزام والطريق التحتية: تحول الطاقة، عقود الهندسة والتوريد، وتطوير المصافي",
    titleZh: "“一带一路”基础设施：能源转型、上游工程EPC总承包与炼厂升级",
    titleCkb: "ژێرخانی یەک پشتێن یەک ڕێگە: گۆڕانی وزە، پڕۆژەکانی ئەندازیاری و پاڵاوگەکان",
    speakers: ["Sinopec Middle East Vice President", "Iraqi Ministry of Oil Director General", "PetroChina Middle East Exploration Head"],
    moderator: "Prof. Zhang Wei (Tsinghua University)",
    status: "CONFIRMED"
  },
  {
    id: "session-3",
    day: 2,
    date: "2026-10-19",
    timeStart: "10:00",
    timeEnd: "12:30",
    hall: "Hall C: Bilateral Finance & Logistics",
    track: "Finance & Clearing",
    titleEn: "Direct Currency Settlement: CIPS, mBridge Multi-CBDC & Direct IQD ⇄ RMB Rails",
    titleAr: "التسوية المباشرة بالعملات الوطنية: أنظمة CIPS وmBridge ومسار الدينار واليوان المباشر",
    titleZh: "双边本币清算直通：CIPS系统、mBridge央行数字货币与伊第纳尔/人民币直联",
    titleCkb: "پاکتاوی ڕاستەوخۆی دراوی نیشتمانی: سیستەمی CIPS و مBridge و دینار-یوان",
    speakers: ["Central Bank of Iraq (CBI) Deputy Governor", "Bank of China Middle East Chief Executive", "PBOC Clearing House Delegate"],
    moderator: "Counselor H. Barzanji (CISE Financial Desk)",
    status: "CONFIRMED"
  },
  {
    id: "session-4",
    day: 2,
    date: "2026-10-19",
    timeStart: "14:00",
    timeEnd: "16:30",
    hall: "Hall B: Digital Tech & Life Sciences",
    track: "Digital & Sourcing",
    titleEn: "Digital Economy & Smart Industry: 5G Industrial Parks & Smart Cities in Iraq",
    titleAr: "الاقتصاد الرقمي والصناعة الذكية: مجمعات الجيل الخامس والمدن الذكية في العراق",
    titleZh: "数字经济与智能工业：5G智慧工业园与伊拉克未来智慧城市建设",
    titleCkb: "ئابووری دیجیتاڵی و پیشەسازی زیرەک: کۆمەڵگەکانی 5G و شارە زیرەکەکان",
    speakers: ["Huawei Middle East Enterprise Director", "Iraqi Communications & Media Commission Head", "ZTE Infrastructure Solutions Lead"],
    moderator: "Dr. Karwan Ali (Sulaymaniyah Polytech)",
    status: "CONFIRMED"
  },
  {
    id: "session-5",
    day: 3,
    date: "2026-10-20",
    timeStart: "10:00",
    timeEnd: "16:00",
    hall: "B2B Bilateral Matchmaking Salon",
    track: "Trade & Contracts",
    titleEn: "High-Level B2B Deal-Making & Commercial Protocol Signings (84 Reserved Delegations)",
    titleAr: "لقاءات الأعمال الثنائية وتوقيع البروتوكولات التجارية (84 وفداً مسجلاً)",
    titleZh: "中伊高层B2B经贸撮合与重大商业协议签署专场（84个已核准代表团）",
    titleCkb: "دیداری بازرگانی دوولایەنەی B2B و واژۆکردنی گرێبەستەکان",
    speakers: ["President of Federation of Iraqi Chambers of Commerce", "CCPIT Middle East Representative", "Kurdistan Federation of Chambers"],
    moderator: "Protocol Directorate Team",
    status: "CONFIRMED"
  },
  {
    id: "session-6",
    day: 4,
    date: "2026-10-21",
    timeStart: "10:30",
    timeEnd: "13:00",
    hall: "Grand Plenary Hall (Fairground)",
    track: "Closing Ceremony",
    titleEn: "Summit Communiqué, Sulaymaniyah Bilateral Declaration & Final Press Conference",
    titleAr: "البيان الختامي للقمة، إعلان السليمانية الثنائي، والمؤتمر الصحفي الرسمي",
    titleZh: "闭幕典礼：峰会联合公报发布、《苏莱曼尼亚双边宣言》签署与官方记者会",
    titleCkb: "کۆنگرەی ڕۆژنامەوانی کۆتایی، ڕاگەیەنراوی لووتکە و جاڕنامەی دوولایەنەی سلێمانی",
    speakers: ["All Plenipotentiary Delegations", "Joint Secretariat Leads"],
    moderator: "ICA Secretariat Plenipotentiary Desk",
    status: "CONFIRMED"
  }
];

export function registerSummitAndServicesRoutes(app: express.Express, editorOrAdminMiddleware: any, adminMiddleware: any) {
  const authOrAdmin = adminMiddleware || editorOrAdminMiddleware || ((_req: any, _res: any, next: any) => next());

  // --- 0. SUMMIT OVERVIEW TELEMETRY ---
  app.get("/api/summit/overview", (_req: Request, res: Response) => {
    const booths = readJsonFile(BOOTHS_FILE, INITIAL_BOOTHS);
    const vips = readJsonFile(VIP_FILE, INITIAL_VIP);
    const agenda = readJsonFile(AGENDA_FILE, INITIAL_AGENDA);
    const dossiers = readJsonFile(DOSSIERS_FILE, INITIAL_DOSSIERS);
    const reservedBooths = booths.filter((b: any) => b.status === 'reserved' || b.status === 'selected');
    const availableBooths = booths.filter((b: any) => b.status === 'available');

    res.json({
      success: true,
      eventName: "Iraq-China Economic Summit & Bilateral Expo 2026",
      edition: "Inaugural Sovereign Edition",
      venue: "Sulaymaniyah International Fairground, Kurdistan Region, Iraq",
      dates: "2026-10-18 to 2026-10-21",
      systemStatus: "ACTIVE",
      totalBooths: booths.length,
      reservedBooths: reservedBooths.length,
      availableBooths: availableBooths.length,
      halls: [
        "Hall A: Strategic Energy & Petrochem",
        "Hall B: Digital Tech & Life Sciences",
        "Hall C: Bilateral Finance & Logistics",
        "Outdoor Arena: Heavy Mach & Energy"
      ],
      sectorsCount: 11,
      registeredVipsCount: vips.length,
      agendaSessionsCount: agenda.length,
      activeDossiersCount: dossiers.length,
      b2bMatchmakingSessionsBooked: 84,
      lastUpdated: new Date().toISOString()
    });
  });

  // --- 1. SUMMIT 3D FLOORPLAN BOOTHS CRUD ---
  app.get("/api/summit/floorplan/booths", (_req: Request, res: Response) => {
    const booths = readJsonFile(BOOTHS_FILE, INITIAL_BOOTHS);
    res.json({ success: true, count: booths.length, booths });
  });

  app.get("/api/hub/summit/booths", authOrAdmin, (_req: Request, res: Response) => {
    const booths = readJsonFile(BOOTHS_FILE, INITIAL_BOOTHS);
    res.json({ success: true, count: booths.length, booths });
  });

  app.post("/api/summit/floorplan/booths/:id/reserve", (req: Request, res: Response) => {
    const { id } = req.params;
    const { companyName, contactName, email, phone, sector, notes } = req.body;
    if (!companyName || !email) {
      return res.status(400).json({ error: "Company name and contact email are required." });
    }
    const booths = readJsonFile(BOOTHS_FILE, INITIAL_BOOTHS);
    const boothIndex = booths.findIndex((b: any) => b.id === id);
    if (boothIndex === -1) {
      return res.status(404).json({ error: `Booth ${id} not found.` });
    }
    booths[boothIndex].status = "reserved";
    booths[boothIndex].exhibitor = companyName;
    booths[boothIndex].reservation = {
      companyName,
      contactName,
      email,
      phone,
      sector,
      notes,
      reservedAt: new Date().toISOString()
    };
    writeJsonFile(BOOTHS_FILE, booths);
    res.json({
      success: true,
      message: `Booth ${id} has been reserved successfully for ${companyName}.`,
      booth: booths[boothIndex]
    });
  });

  // Create new booth (Admin CRUD)
  app.post("/api/hub/summit/booths", authOrAdmin, (req: Request, res: Response) => {
    try {
      const body = req.body;
      const booths = readJsonFile(BOOTHS_FILE, INITIAL_BOOTHS);
      const id = body.id || `PAV-${Date.now().toString().slice(-4)}`;

      if (booths.some((b: any) => b.id === id)) {
        return res.status(400).json({ error: `Booth with ID ${id} already exists.` });
      }

      const newBooth = {
        id,
        hall: body.hall || 'A',
        hallName: body.hallName || 'Hall A: Strategic Energy & Petrochem',
        sector: body.sector || 'energy-petrochemicals',
        sectorName: body.sectorName || 'Energy & Petrochemicals',
        size: body.size || '18 m²',
        type: body.type || 'Standard Shell Scheme',
        price: Number(body.price) || 3600,
        status: body.status || 'available',
        exhibitor: body.exhibitor || null,
        x: Number(body.x) || 0,
        z: Number(body.z) || 0,
        width: Number(body.width) || 2.5,
        depth: Number(body.depth) || 2
      };

      booths.push(newBooth);
      writeJsonFile(BOOTHS_FILE, booths);
      res.status(201).json({ success: true, booth: newBooth });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to create booth" });
    }
  });

  // Update booth (Admin CRUD)
  app.put("/api/hub/summit/booths/:id", authOrAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, exhibitor, price, hall, sector, size, type } = req.body;
    const booths = readJsonFile(BOOTHS_FILE, INITIAL_BOOTHS);
    const boothIndex = booths.findIndex((b: any) => b.id === id);
    if (boothIndex === -1) {
      return res.status(404).json({ error: `Booth ${id} not found.` });
    }
    if (status !== undefined) booths[boothIndex].status = status;
    if (exhibitor !== undefined) booths[boothIndex].exhibitor = exhibitor;
    if (price !== undefined) booths[boothIndex].price = Number(price);
    if (hall !== undefined) booths[boothIndex].hall = hall;
    if (sector !== undefined) booths[boothIndex].sector = sector;
    if (size !== undefined) booths[boothIndex].size = size;
    if (type !== undefined) booths[boothIndex].type = type;
    writeJsonFile(BOOTHS_FILE, booths);
    res.json({ success: true, booth: booths[boothIndex] });
  });

  // Delete booth (Admin CRUD)
  app.delete("/api/hub/summit/booths/:id", authOrAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    const booths = readJsonFile(BOOTHS_FILE, INITIAL_BOOTHS);
    const filtered = booths.filter((b: any) => b.id !== id);
    if (filtered.length === booths.length) {
      return res.status(404).json({ error: `Booth ${id} not found.` });
    }
    writeJsonFile(BOOTHS_FILE, filtered);
    res.json({ success: true, message: `Booth ${id} deleted.` });
  });

  // Reset booths to default
  app.post("/api/hub/summit/booths/reset", authOrAdmin, (_req: Request, res: Response) => {
    writeJsonFile(BOOTHS_FILE, INITIAL_BOOTHS);
    res.json({ success: true, count: INITIAL_BOOTHS.length, booths: INITIAL_BOOTHS });
  });

  // --- 2. SUMMIT VIP PROTOCOL ACCREDITATION CRUD ---
  app.get("/api/summit/vip-registrations", (_req: Request, res: Response) => {
    const vips = readJsonFile(VIP_FILE, INITIAL_VIP);
    res.json({ success: true, count: vips.length, registrations: vips });
  });

  app.get("/api/hub/summit/vip-registrations", authOrAdmin, (_req: Request, res: Response) => {
    const vips = readJsonFile(VIP_FILE, INITIAL_VIP);
    res.json({ success: true, count: vips.length, registrations: vips });
  });

  app.post("/api/summit/vip-registrations", (req: Request, res: Response) => {
    const {
      officialName,
      diplomaticTitle,
      ministryOrEntity,
      country,
      officialEmail,
      protocolPhone,
      delegationCount,
      requiresSecurityEscort,
      requiresBilingualAide,
      bilateralSalonRequested,
      specialDietaryOrMedical
    } = req.body;

    if (!officialName || !diplomaticTitle || !officialEmail) {
      return res.status(400).json({ error: "Official name, diplomatic title, and verified email are required." });
    }

    const vips = readJsonFile(VIP_FILE, INITIAL_VIP);
    const code = `VIP-PROTO-${Math.floor(10000 + Math.random() * 90000)}`;
    const newVip = {
      id: `vip-${Date.now()}`,
      code,
      officialName,
      diplomaticTitle,
      ministryOrEntity: ministryOrEntity || "Governmental / Diplomatic Mission",
      country: country || "Republic of Iraq",
      officialEmail,
      protocolPhone: protocolPhone || "",
      delegationCount: Number(delegationCount) || 1,
      requiresSecurityEscort: !!requiresSecurityEscort,
      requiresBilingualAide: !!requiresBilingualAide,
      bilateralSalonRequested: !!bilateralSalonRequested,
      specialDietaryOrMedical: specialDietaryOrMedical || "None specified",
      status: "PENDING",
      registeredAt: new Date().toISOString(),
      assignedOfficer: "Executive Protocol Directorate (Pending Review)"
    };

    vips.unshift(newVip);
    writeJsonFile(VIP_FILE, vips);

    res.json({
      success: true,
      message: "Diplomatic accreditation request registered.",
      code,
      registration: newVip
    });
  });

  app.post("/api/hub/summit/vip-registrations", authOrAdmin, (req: Request, res: Response) => {
    const {
      officialName,
      diplomaticTitle,
      ministryOrEntity,
      country,
      officialEmail,
      protocolPhone,
      delegationCount,
      requiresSecurityEscort,
      requiresBilingualAide,
      bilateralSalonRequested,
      status,
      assignedOfficer
    } = req.body;

    if (!officialName || !diplomaticTitle) {
      return res.status(400).json({ error: "Official name and diplomatic title are required." });
    }

    const vips = readJsonFile(VIP_FILE, INITIAL_VIP);
    const code = `VIP-PROTO-${Math.floor(10000 + Math.random() * 90000)}`;
    const newVip = {
      id: `vip-${Date.now()}`,
      code,
      officialName,
      diplomaticTitle,
      ministryOrEntity: ministryOrEntity || "Governmental / Diplomatic Mission",
      country: country || "Republic of Iraq",
      officialEmail: officialEmail || "protocol@delegation.gov",
      protocolPhone: protocolPhone || "",
      delegationCount: Number(delegationCount) || 1,
      requiresSecurityEscort: !!requiresSecurityEscort,
      requiresBilingualAide: !!requiresBilingualAide,
      bilateralSalonRequested: !!bilateralSalonRequested,
      status: status || "APPROVED",
      registeredAt: new Date().toISOString(),
      assignedOfficer: assignedOfficer || "Executive Protocol Directorate"
    };

    vips.unshift(newVip);
    writeJsonFile(VIP_FILE, vips);

    res.status(201).json({ success: true, registration: newVip });
  });

  app.put("/api/hub/summit/vip-registrations/:id/status", authOrAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, assignedOfficer } = req.body;
    const vips = readJsonFile(VIP_FILE, INITIAL_VIP);
    const vipIndex = vips.findIndex((v: any) => v.id === id || v.code === id);
    if (vipIndex === -1) {
      return res.status(404).json({ error: `VIP Record ${id} not found.` });
    }
    if (status) vips[vipIndex].status = status;
    if (assignedOfficer) vips[vipIndex].assignedOfficer = assignedOfficer;
    writeJsonFile(VIP_FILE, vips);
    res.json({ success: true, registration: vips[vipIndex] });
  });

  app.put("/api/hub/summit/vip-registrations/:id", authOrAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    const vips = readJsonFile(VIP_FILE, INITIAL_VIP);
    const index = vips.findIndex((v: any) => v.id === id || v.code === id);
    if (index === -1) {
      return res.status(404).json({ error: `VIP Record ${id} not found.` });
    }
    vips[index] = { ...vips[index], ...req.body };
    writeJsonFile(VIP_FILE, vips);
    res.json({ success: true, registration: vips[index] });
  });

  app.delete("/api/hub/summit/vip-registrations/:id", authOrAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    const vips = readJsonFile(VIP_FILE, INITIAL_VIP);
    const filtered = vips.filter((v: any) => v.id !== id && v.code !== id);
    if (filtered.length === vips.length) {
      return res.status(404).json({ error: `VIP Record ${id} not found.` });
    }
    writeJsonFile(VIP_FILE, filtered);
    res.json({ success: true, message: `VIP Record ${id} deleted successfully.` });
  });

  // --- 3. SUMMIT AGENDA & SESSIONS CRUD ---
  app.get("/api/summit/agenda", (_req: Request, res: Response) => {
    const agenda = readJsonFile(AGENDA_FILE, INITIAL_AGENDA);
    res.json({ success: true, count: agenda.length, sessions: agenda });
  });

  app.get("/api/hub/summit/agenda", authOrAdmin, (_req: Request, res: Response) => {
    const agenda = readJsonFile(AGENDA_FILE, INITIAL_AGENDA);
    res.json({ success: true, count: agenda.length, sessions: agenda });
  });

  app.post("/api/hub/summit/agenda", authOrAdmin, (req: Request, res: Response) => {
    try {
      const body = req.body;
      const agenda = readJsonFile(AGENDA_FILE, INITIAL_AGENDA);
      const newSession = {
        id: body.id || `session-${Date.now()}`,
        day: Number(body.day) || 1,
        date: body.date || "2026-10-18",
        timeStart: body.timeStart || "10:00",
        timeEnd: body.timeEnd || "11:30",
        hall: body.hall || "Grand Plenary Hall",
        track: body.track || "General Track",
        titleEn: body.titleEn || "New Summit Session",
        titleAr: body.titleAr || body.titleEn || "",
        titleZh: body.titleZh || body.titleEn || "",
        titleCkb: body.titleCkb || body.titleEn || "",
        speakers: Array.isArray(body.speakers) ? body.speakers : (body.speakers ? [body.speakers] : []),
        moderator: body.moderator || "",
        status: body.status || "CONFIRMED"
      };

      agenda.push(newSession);
      writeJsonFile(AGENDA_FILE, agenda);
      res.status(201).json({ success: true, session: newSession });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to create agenda session" });
    }
  });

  app.put("/api/hub/summit/agenda/:id", authOrAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    const agenda = readJsonFile(AGENDA_FILE, INITIAL_AGENDA);
    const index = agenda.findIndex((s: any) => s.id === id);
    if (index === -1) {
      return res.status(404).json({ error: `Session ${id} not found.` });
    }
    agenda[index] = { ...agenda[index], ...req.body };
    writeJsonFile(AGENDA_FILE, agenda);
    res.json({ success: true, session: agenda[index] });
  });

  app.delete("/api/hub/summit/agenda/:id", authOrAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    const agenda = readJsonFile(AGENDA_FILE, INITIAL_AGENDA);
    const filtered = agenda.filter((s: any) => s.id !== id);
    if (filtered.length === agenda.length) {
      return res.status(404).json({ error: `Session ${id} not found.` });
    }
    writeJsonFile(AGENDA_FILE, filtered);
    res.json({ success: true, message: `Session ${id} deleted.` });
  });

  // --- 4. CISE SERVICES UNIVERSAL DOSSIERS & TRACKER CRUD ---
  app.get("/api/services/dossiers", (_req: Request, res: Response) => {
    const dossiers = readJsonFile(DOSSIERS_FILE, INITIAL_DOSSIERS);
    res.json({ success: true, count: dossiers.length, dossiers });
  });

  app.post("/api/services/dossiers", (req: Request, res: Response) => {
    const {
      serviceId,
      serviceName,
      clientName,
      applicantEmail,
      companyEntity,
      jurisdiction,
      tier,
      slaDays,
      transactionValueUSD,
      contractDetails
    } = req.body;

    if (!clientName || !applicantEmail || !serviceId) {
      return res.status(400).json({ error: "Client name, applicant email, and target service are required." });
    }

    const valueUSD = Number(transactionValueUSD) || 100000;
    const baseFee = Math.max(850, Math.round(valueUSD * 0.0085));
    const feeIQD = Math.round(baseFee * 1310);
    const feeRMB = Math.round(baseFee * 7.2);

    const dossiers = readJsonFile(DOSSIERS_FILE, INITIAL_DOSSIERS);
    const code = `CISE-DOS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newDossier = {
      code,
      serviceId,
      serviceName: typeof serviceName === 'object' ? serviceName : { en: serviceId, ar: serviceId, zh: serviceId, ckb: serviceId },
      clientName,
      applicantEmail,
      companyEntity: companyEntity || clientName,
      jurisdiction: jurisdiction || "Iraq / China Bilateral",
      estimatedFeeUSD: baseFee,
      estimatedFeeIQD: feeIQD,
      estimatedFeeRMB: feeRMB,
      tier: tier || "Institutional Priority",
      slaDays: Number(slaDays) || 3,
      stage: "COMPLIANCE_REVIEW",
      stages: [
        { name: "Submission & Dossier Verification", date: new Date().toISOString().split("T")[0], done: true, note: "Dossier credentials and trade references recorded." },
        { name: "Compliance & Anti-Money Laundering Screening", date: "In Progress", done: false, note: "Conducting regulatory and bilateral bank clearance." },
        { name: "Interbank Liquidity & Pool Allocation", date: "Pending", done: false, note: "Awaiting compliance greenlight for liquidity routing." },
        { name: "Sovereign Clearing Authorization", date: "Pending", done: false, note: "Awaiting final bilateral signatory seal." },
        { name: "Settlement Dispatched & Credited", date: "Pending", done: false, note: "Dispatch and cryptographic ledger receipt." }
      ],
      submittedAt: new Date().toISOString(),
      assignedOfficer: "Directorate of Bilateral Services (Active Review)"
    };

    dossiers.unshift(newDossier);
    writeJsonFile(DOSSIERS_FILE, dossiers);

    res.status(201).json({
      success: true,
      message: `Dossier ${code} submitted successfully.`,
      code,
      dossier: newDossier
    });
  });

  app.get("/api/services/dossiers/:code", (req: Request, res: Response) => {
    const { code } = req.params;
    const dossiers = readJsonFile(DOSSIERS_FILE, INITIAL_DOSSIERS);
    const match = dossiers.find((d: any) => d.code.toUpperCase() === code.trim().toUpperCase());
    if (!match) {
      return res.status(404).json({ error: `Dossier ${code} was not found in the sovereign registry.` });
    }
    res.json({ success: true, dossier: match });
  });

  app.get("/api/hub/services/dossiers", authOrAdmin, (_req: Request, res: Response) => {
    const dossiers = readJsonFile(DOSSIERS_FILE, INITIAL_DOSSIERS);
    res.json({ success: true, count: dossiers.length, dossiers });
  });

  app.post("/api/hub/services/dossiers", authOrAdmin, (req: Request, res: Response) => {
    try {
      const body = req.body;
      const dossiers = readJsonFile(DOSSIERS_FILE, INITIAL_DOSSIERS);
      const code = body.code || `CISE-DOS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      const newDossier = {
        code,
        serviceId: body.serviceId || 'clearing-rail',
        serviceName: body.serviceName || { en: 'Sovereign Service', ar: 'خدمة سيادية', zh: '主权服务', ckb: 'خزمەتگوزاری سەروەری' },
        clientName: body.clientName || 'Institutional Client',
        applicantEmail: body.applicantEmail || 'client@cise-desk.org',
        companyEntity: body.companyEntity || body.clientName || 'Entity',
        jurisdiction: body.jurisdiction || 'Iraq / China Bilateral',
        estimatedFeeUSD: Number(body.estimatedFeeUSD) || 2500,
        estimatedFeeIQD: Number(body.estimatedFeeIQD) || 3275000,
        estimatedFeeRMB: Number(body.estimatedFeeRMB) || 18000,
        tier: body.tier || 'Priority Sovereign Clearing',
        slaDays: Number(body.slaDays) || 3,
        stage: body.stage || 'COMPLIANCE_REVIEW',
        stages: body.stages || [
          { name: "Submission & Dossier Verification", date: new Date().toISOString().split("T")[0], done: true, note: "Documentary verification." },
          { name: "Compliance & Anti-Money Laundering Screening", date: "In Progress", done: false, note: "Under review." },
          { name: "Interbank Liquidity & Pool Allocation", date: "Pending", done: false, note: "Pending pool check." },
          { name: "Sovereign Clearing Authorization", date: "Pending", done: false, note: "Pending approval." },
          { name: "Settlement Dispatched & Credited", date: "Pending", done: false, note: "Pending dispatch." }
        ],
        submittedAt: new Date().toISOString(),
        assignedOfficer: body.assignedOfficer || "Directorate of Bilateral Services"
      };

      dossiers.unshift(newDossier);
      writeJsonFile(DOSSIERS_FILE, dossiers);
      res.status(201).json({ success: true, dossier: newDossier });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to create service dossier" });
    }
  });

  app.put("/api/hub/services/dossiers/:code/status", authOrAdmin, (req: Request, res: Response) => {
    const { code } = req.params;
    const { stage, assignedOfficer, note } = req.body;
    const dossiers = readJsonFile(DOSSIERS_FILE, INITIAL_DOSSIERS);
    const index = dossiers.findIndex((d: any) => d.code.toUpperCase() === code.trim().toUpperCase());
    if (index === -1) {
      return res.status(404).json({ error: `Dossier ${code} not found.` });
    }
    if (stage) {
      dossiers[index].stage = stage;
      const stageOrder = ["SUBMITTED", "COMPLIANCE_REVIEW", "INTERBANK_VERIFIED", "SOVEREIGN_APPROVED", "DISPATCHED"];
      const targetIndex = stageOrder.indexOf(stage);
      if (targetIndex >= 0 && dossiers[index].stages) {
        dossiers[index].stages.forEach((st: any, i: number) => {
          if (i <= targetIndex) {
            st.done = true;
            if (st.date === "Pending" || st.date === "In Progress") {
              st.date = new Date().toISOString().split("T")[0];
            }
          } else {
            st.done = false;
          }
        });
      }
    }
    if (assignedOfficer) dossiers[index].assignedOfficer = assignedOfficer;
    if (note && dossiers[index].stages && dossiers[index].stages.length > 0) {
      dossiers[index].stages[dossiers[index].stages.length - 1].note = note;
    }
    writeJsonFile(DOSSIERS_FILE, dossiers);
    res.json({ success: true, dossier: dossiers[index] });
  });

  app.delete("/api/hub/services/dossiers/:code", authOrAdmin, (req: Request, res: Response) => {
    const { code } = req.params;
    const dossiers = readJsonFile(DOSSIERS_FILE, INITIAL_DOSSIERS);
    const filtered = dossiers.filter((d: any) => d.code.toUpperCase() !== code.trim().toUpperCase());
    if (filtered.length === dossiers.length) {
      return res.status(404).json({ error: `Dossier ${code} not found.` });
    }
    writeJsonFile(DOSSIERS_FILE, filtered);
    res.json({ success: true, message: `Dossier ${code} deleted successfully.` });
  });

  // --- 5. FEE ESTIMATION STRUCTURE ---
  app.get("/api/services/fee-structure", (_req: Request, res: Response) => {
    res.json({
      success: true,
      rates: {
        USD_TO_IQD: 1310.0,
        USD_TO_RMB: 7.20,
        RMB_TO_IQD: 181.94
      },
      services: [
        {
          id: "clearing-rail",
          name: "Sovereign Clearing Rail (IQD ⇄ RMB)",
          baseFeeUSD: 850,
          percentageRate: 0.0035,
          turnaroundDays: 2
        },
        {
          id: "sinosure-coverage",
          name: "Sinosure Strategic Risk Mitigation",
          baseFeeUSD: 1500,
          percentageRate: 0.0065,
          turnaroundDays: 5
        },
        {
          id: "sourcing-verification",
          name: "Bilateral Sourcing & Factory Inspection",
          baseFeeUSD: 1200,
          flatFeePerDayUSD: 450,
          turnaroundDays: 4
        },
        {
          id: "visa-consular",
          name: "Diplomatic & Business Fast-Track Visa",
          baseFeeUSD: 180,
          expressSurchargeUSD: 95,
          turnaroundDays: 3
        },
        {
          id: "academic-fellowship",
          name: "HSK Academy & Diplomatic Fellowship",
          baseFeeUSD: 650,
          certificationFeeUSD: 120,
          turnaroundDays: 7
        },
        {
          id: "sovereign-consultancy",
          name: "Strategic Bilateral Advisory & Regulatory Desk",
          baseFeeUSD: 2400,
          percentageRate: 0.005,
          turnaroundDays: 7
        }
      ]
    });
  });
}
