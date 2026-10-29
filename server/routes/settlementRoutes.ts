import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const settlementRouter = Router();

const DATA_DIR = path.join(process.cwd(), 'server', 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const ORDERS_FILE = path.join(DATA_DIR, 'payment_orders.json');
const RATES_FILE = path.join(DATA_DIR, 'payment_rates.json');

function readJsonFile<T>(filePath: string, defaultData: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
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

// Canonical baseline rates for CBI / PBOC bilateral parity
const INITIAL_PAYMENT_RATES = {
  id: 'rate_cbi_pboc_cny_iqd',
  pair: 'IQD/CNY',
  baseRate: 181.09,
  bidRate: 180.85,
  askRate: 181.33,
  retailFeePercent: 0.25,
  businessFeePercent: 0.12,
  minimumRetailIqd: 50000,
  minimumBusinessIqd: 1000000,
  change24h: 0.14,
  high24h: 181.45,
  low24h: 180.72,
  volume24h: '¥48,250,000',
  ecnyReservePool: 350000000,
  iqdReservePool: 63500000000,
  mbridgeStatus: 'ACTIVE',
  cipsGatewayStatus: 'ONLINE',
  cbiClearingStatus: 'SYNCHRONIZED',
  updatedAt: new Date().toISOString(),
  trendHistory: [
    { time: '06:00', rate: 180.82, volume: 4200000 },
    { time: '08:00', rate: 180.95, volume: 7500000 },
    { time: '10:00', rate: 181.12, volume: 12300000 },
    { time: '12:00', rate: 181.05, volume: 9800000 },
    { time: '14:00', rate: 181.18, volume: 11400000 },
    { time: '16:00', rate: 181.09, volume: 8200000 }
  ]
};

// Canonical baseline payment orders
const INITIAL_PAYMENT_ORDERS = [
  {
    id: 'ord-cips-8849',
    reference: 'CIPS-2026-IQCN-8849',
    orderType: 'BUSINESS',
    direction: 'IQD_TO_ECNY',
    sourceCurrency: 'IQD',
    targetCurrency: 'CNY',
    sourceAmount: 2500000000,
    targetAmount: 13805290.18,
    exchangeRate: 181.09,
    feeAmount: 3000000,
    feePercent: 0.12,
    status: 'COMPLETED',
    senderName: 'Tariq Al-Mansoor',
    senderEmail: 'tariq@mesopotamia-petro.iq',
    senderPhone: '+964 790 123 4567',
    senderCompany: 'Mesopotamia Petroleum Logistics Corp',
    recipientName: 'Sinopec Heavy Equipment Engineering Ltd',
    recipientIdentifier: 'CIPS-SH-992100824',
    recipientEntity: 'Sinopec Heavy Equipment Co.',
    recipientBankOrBureau: 'Bank of China (Shanghai Interbank)',
    purpose: 'Crude Pipeline Compression Units & Valves Procurements',
    settlementMethod: 'CIPS Direct Clearing Rail (Baghdad - Shanghai)',
    commercialInvoiceRef: 'INV-2026-SNPC-0941',
    billOfLading: 'BL-BASRA-SHA-2026-03',
    customsDeclarationNo: 'IRQ-CUS-BAS-88219',
    contractValueUsd: 1910000,
    settlementTxHash: '0x94fbc2818a7c29381e4b882190ccde9837a2819e918237d82192cb9182aa182b',
    verificationCode: 'AUTH-CBI-8849-VALID',
    adminNotes: 'Cleared through PBOC swap facility with statutory approval from CBI window.',
    complianceNotes: 'AML Level 3 verification passed. Sanctions check cleared.',
    settledAt: new Date(Date.now() - 3600000 * 3.5).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 3.5).toISOString(),
    timeline: [
      { stage: 'SUBMISSION', title: 'Order Submitted via ICA Settlement Gateway', timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), completed: true, details: 'Order submitted with commercial invoice and customs declaration.' },
      { stage: 'COMPLIANCE', title: 'CBI Liquidity Verification & AML Compliance', timestamp: new Date(Date.now() - 3600000 * 4.5).toISOString(), completed: true, details: 'KYC verified and sanctions check completed.' },
      { stage: 'CLEARING', title: 'CIPS Direct Transmit to Shanghai Clearing House', timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), completed: true, details: 'Dispatched through bilateral CIPS gateway.' },
      { stage: 'SETTLED', title: 'Final e-CNY Credit to Beneficiary Custody', timestamp: new Date(Date.now() - 3600000 * 3.5).toISOString(), completed: true, details: 'e-CNY credited to recipient account in Shanghai.' }
    ]
  },
  {
    id: 'ord-cips-9012',
    reference: 'CIPS-2026-IQCN-9012',
    orderType: 'BUSINESS',
    direction: 'IQD_TO_ECNY',
    sourceCurrency: 'IQD',
    targetCurrency: 'CNY',
    sourceAmount: 750000000,
    targetAmount: 4141587.05,
    exchangeRate: 181.09,
    feeAmount: 900000,
    feePercent: 0.12,
    status: 'PROCESSING',
    senderName: 'Haidar Kadhim',
    senderEmail: 'kadhim@tigris-agro.iq',
    senderPhone: '+964 780 234 5678',
    senderCompany: 'Tigris Modern Agritech Consortium',
    recipientName: 'Zoomlion Heavy Industry Agricultural Machinery',
    recipientIdentifier: 'CIPS-CS-441092831',
    recipientEntity: 'Zoomlion International',
    recipientBankOrBureau: 'Agricultural Bank of China (Changsha)',
    purpose: 'Combine Harvesters & Solar Irrigation Pumps',
    settlementMethod: 'mBridge Wholesale CBDC Rail',
    commercialInvoiceRef: 'INV-ZL-2026-081',
    contractValueUsd: 572000,
    settlementTxHash: '0x18a93bcde82910fa4819ca92830182910ab381920ceba1829371629abde19283',
    verificationCode: 'AUTH-MBRIDGE-9012-PENDING',
    adminNotes: 'Awaiting final multi-party signature on mBridge consensus nodes.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    timeline: [
      { stage: 'SUBMISSION', title: 'Order Submitted via ICA Settlement Gateway', timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), completed: true, details: 'Wholesale CBDC transfer requested.' },
      { stage: 'COMPLIANCE', title: 'CBI Liquidity Verification', timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString(), completed: true, details: 'Compliance officer verified trade documents.' },
      { stage: 'CLEARING', title: 'mBridge Consensus Processing', timestamp: new Date(Date.now() - 3600000 * 1).toISOString(), completed: false, details: 'Multi-CBDC node consensus round 3 of 4.' }
    ]
  },
  {
    id: 'ord-cips-9104',
    reference: 'CIPS-2026-IQCN-9104',
    orderType: 'RETAIL',
    direction: 'IQD_TO_ECNY',
    sourceCurrency: 'IQD',
    targetCurrency: 'CNY',
    sourceAmount: 3620000,
    targetAmount: 19990.06,
    exchangeRate: 181.09,
    feeAmount: 9050,
    feePercent: 0.25,
    status: 'PENDING_SETTLEMENT',
    senderName: 'Soran Faraj',
    senderEmail: 'soran.faraj@sulay-trade.krd',
    senderPhone: '+964 770 345 6789',
    recipientName: 'Shenzhen Yida Electronic Components Ltd',
    recipientIdentifier: 'UNIONPAY-SZ-62284819',
    purpose: 'Electronic Sensors and Microcontroller Sample Batch',
    settlementMethod: 'Qi Card / Bilateral Retail Gateway',
    contractValueUsd: 2760,
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
    timeline: [
      { stage: 'SUBMISSION', title: 'Retail Payment Initiated', timestamp: new Date(Date.now() - 1800000).toISOString(), completed: true, details: 'Pending merchant settlement batch.' }
    ]
  },
  {
    id: 'ord-cips-8630',
    reference: 'CIPS-2026-IQCN-8630',
    orderType: 'BUSINESS',
    direction: 'IQD_TO_ECNY',
    sourceCurrency: 'IQD',
    targetCurrency: 'CNY',
    sourceAmount: 1200000000,
    targetAmount: 6626539.29,
    exchangeRate: 181.09,
    feeAmount: 1440000,
    feePercent: 0.12,
    status: 'COMPLIANCE_HOLD',
    senderName: 'Mustafa Al-Bayati',
    senderEmail: 'bayati@al-zawraa-import.iq',
    senderCompany: 'Al-Zawraa Industrial Trading LLC',
    recipientName: 'Hebei Iron & Steel Group Trading Corp',
    recipientIdentifier: 'CIPS-HB-3301928',
    purpose: 'Reinforced Rebar & Structural Steel Sections',
    settlementMethod: 'CIPS Direct Clearing Rail',
    complianceNotes: 'Awaiting supplementary Certificate of Origin endorsement from Iraqi Ministry of Trade.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 72000000).toISOString(),
    timeline: [
      { stage: 'SUBMISSION', title: 'Invoice Registered', timestamp: new Date(Date.now() - 86400000).toISOString(), completed: true, details: 'Invoice registered.' },
      { stage: 'HOLD', title: 'Compliance Hold Triggered', timestamp: new Date(Date.now() - 72000000).toISOString(), completed: true, details: 'Pending Certificate of Origin.' }
    ]
  }
];

function calculateTelemetry(orders: any[]) {
  let totalEcnyVolume = 0;
  let totalIqdVolume = 0;
  let pendingCount = 0;
  let holdCount = 0;
  let completedCount = 0;

  for (const o of orders) {
    if (o.status === 'COMPLETED' || o.status === 'PROCESSING') {
      if (o.targetCurrency === 'CNY') totalEcnyVolume += (o.targetAmount || 0);
      if (o.sourceCurrency === 'IQD') totalIqdVolume += (o.sourceAmount || 0);
    }
    if (o.status === 'PENDING_SETTLEMENT' || o.status === 'PROCESSING') {
      pendingCount++;
    } else if (o.status === 'COMPLIANCE_HOLD') {
      holdCount++;
    } else if (o.status === 'COMPLETED') {
      completedCount++;
    }
  }

  return {
    totalOrders: orders.length,
    totalEcnyVolume: Math.round(totalEcnyVolume),
    totalIqdVolume: Math.round(totalIqdVolume),
    pendingCount,
    holdCount,
    completedCount
  };
}

// ----------------------------------------------------------------------
// 1. PUBLIC SETTLEMENT RAIL & OVERVIEW ENDPOINTS
// ----------------------------------------------------------------------

settlementRouter.get('/overview', async (_req: Request, res: Response) => {
  try {
    const orders = readJsonFile(ORDERS_FILE, INITIAL_PAYMENT_ORDERS);
    return res.json({
      success: true,
      clearingRail: "Direct IQD ⇄ RMB Bilateral Sovereign Clearing Rail",
      status: "ONLINE",
      cbiRegulated: true,
      pbocParityProtocol: "CFETS-PARITY-ENABLED",
      directSpreadPercent: 0.0,
      thirdCurrencySpreadPercent: 5.64,
      settlementTimeWindowHours: "24-48",
      activePairs: ["CNY/IQD", "IQD/USD", "CNY/USD"],
      supportedChannels: ["CIPS Direct Clearing Rail", "CBI mBridge Multi-CBDC", "Qi Card Bilateral Gateway"],
      mBridgeNetworkStatus: "ACTIVE",
      totalOrdersProcessed: orders.length,
      cumulativeSavingsUsd: "$124,500,000+",
      lastUpdated: new Date().toISOString()
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch settlement overview' });
  }
});

settlementRouter.get('/rates', async (_req: Request, res: Response) => {
  try {
    const currentRates = readJsonFile(RATES_FILE, INITIAL_PAYMENT_RATES);
    const ratesResponse = {
      base: 'USD',
      timestamp: new Date().toISOString(),
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'CBI-PBOC Bilateral Financial Clearing Rail',
      iqdPerRmb: currentRates.baseRate,
      rmbPerIqd: +(1 / currentRates.baseRate).toFixed(6),
      traditionalIqdPerRmb: 192.80,
      traditionalRmbPerIqd: 0.005186,
      directSpreadPercent: 0.0,
      thirdCurrencySpreadPercent: 5.64,
      cbiReferenceCode: 'CBI-FX-2026-RMB',
      pbocProtocolCode: 'PBOC-CFETS-PARITY',
      rates: {
        IQD_USD: 1310.0,
        CNY_USD: 7.234,
        IQD_CNY: currentRates.baseRate,
        CNY_IQD: +(1 / currentRates.baseRate).toFixed(6),
        EUR_USD: 1.085,
        AED_USD: 3.6725,
        SAR_USD: 3.75
      },
      bilateralPairs: [
        {
          pair: 'CNY/IQD',
          rate: currentRates.baseRate,
          change24h: `+${currentRates.change24h}%`,
          spreadBps: 12,
          cbiBenchmark: currentRates.bidRate,
          pbocBenchmark: 7.234,
          clearingChannel: 'Direct Bilateral CIPS / CBI mBridge',
          liquidityStatus: 'OPTIMAL'
        },
        {
          pair: 'IQD/USD',
          rate: 1310.0,
          change24h: '0.00%',
          spreadBps: 25,
          cbiBenchmark: 1310.0,
          pbocBenchmark: 7.234,
          clearingChannel: 'CBI Window',
          liquidityStatus: 'STABLE'
        },
        {
          pair: 'CNY/USD',
          rate: 7.234,
          change24h: '-0.08%',
          spreadBps: 8,
          cbiBenchmark: 1310.0,
          pbocBenchmark: 7.234,
          clearingChannel: 'CFETS Shanghai Interbank',
          liquidityStatus: 'HIGH'
        }
      ],
      mBridgeStatus: {
        active: currentRates.mbridgeStatus === 'ACTIVE',
        networkLatencyMs: 142,
        throughputTps: 3400,
        supportedAssets: ['e-CNY', 'Digital IQD Conduit', 'CBDC Settlement Units']
      }
    };
    return res.json(ratesResponse);
  } catch (error: any) {
    console.error('Error fetching settlement rates:', error);
    return res.status(500).json({ error: 'Failed to fetch bilateral rates' });
  }
});

// Settlement Inquiries
settlementRouter.post('/inquiry', async (req: Request, res: Response) => {
  try {
    const { companyName, contactPerson, email, phone, tradeVolume, preferredRail, notes } = req.body;
    if (!companyName || !email) {
      return res.status(400).json({ error: 'Company name and email are required.' });
    }

    const refNumber = `INQ-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    const inquiryRecord = {
      refNumber,
      companyName,
      contactPerson: contactPerson || 'Authorized Representative',
      email,
      phone: phone || '',
      tradeVolume: tradeVolume || '1,000,000+ USD Equiv',
      preferredRail: preferredRail || 'CIPS / Direct IQD-CNY',
      notes: notes || '',
      status: 'UNDER_REVIEW',
      createdAt: new Date().toISOString()
    };

    return res.status(201).json({
      success: true,
      message: 'Settlement inquiry registered successfully with bilateral clearing desk.',
      inquiry: inquiryRecord
    });
  } catch (error: any) {
    console.error('Error handling settlement inquiry:', error);
    return res.status(500).json({ error: 'Failed to submit inquiry' });
  }
});

// Settlement Card Registration
settlementRouter.post('/card/register', async (req: Request, res: Response) => {
  try {
    const { cardholderName, companyRegistrationNo, currency, dailyLimitUSD } = req.body;
    if (!cardholderName || !companyRegistrationNo) {
      return res.status(400).json({ error: 'Cardholder name and registration number required.' });
    }

    const cardId = `ICA-CARD-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const virtualCard = {
      cardId,
      cardholderName,
      companyRegistrationNo,
      currency: currency || 'CNY/IQD Dual',
      dailyLimitUSD: dailyLimitUSD || 250000,
      status: 'ACTIVATED',
      chipProtocol: 'UnionPay International / CIPS Direct Interlink',
      issuedAt: new Date().toISOString()
    };

    return res.status(201).json({
      success: true,
      message: 'Bilateral Trade Settlement Card provisioned successfully.',
      card: virtualCard
    });
  } catch (error: any) {
    console.error('Error registering settlement card:', error);
    return res.status(500).json({ error: 'Failed to register card' });
  }
});

// Settlement Checkout & Instant Order Execution
settlementRouter.post('/gateway/checkout', async (req: Request, res: Response) => {
  try {
    const { sourceCurrency, targetCurrency, amount, originator, beneficiary, notes, orderType } = req.body;
    const parsedAmount = parseFloat(amount);

    if (!parsedAmount || parsedAmount <= 0) {
      return res.status(400).json({ error: 'Valid transaction amount is required.' });
    }

    const currentRates = readJsonFile(RATES_FILE, INITIAL_PAYMENT_RATES);
    const rate = sourceCurrency === 'IQD' ? +(1 / currentRates.baseRate).toFixed(6) : currentRates.baseRate;
    const calculatedTarget = sourceCurrency === 'IQD' ? (parsedAmount * rate) : (parsedAmount * rate);
    const feeSavedUSD = (parsedAmount * 0.0268);

    const refNumber = `CIPS-2026-IQCN-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderId = `ord-${Date.now()}`;

    const newOrder = {
      id: orderId,
      reference: refNumber,
      orderType: (orderType || 'BUSINESS').toUpperCase(),
      direction: sourceCurrency === 'IQD' ? 'IQD_TO_ECNY' : 'ECNY_TO_IQD',
      sourceCurrency: sourceCurrency || 'IQD',
      targetCurrency: targetCurrency || 'CNY',
      sourceAmount: parsedAmount,
      targetAmount: Math.round(calculatedTarget * 100) / 100,
      exchangeRate: currentRates.baseRate,
      feeAmount: Math.round(parsedAmount * (orderType === 'RETAIL' ? (currentRates.retailFeePercent / 100) : (currentRates.businessFeePercent / 100))),
      feePercent: orderType === 'RETAIL' ? currentRates.retailFeePercent : currentRates.businessFeePercent,
      status: 'COMPLETED',
      senderName: originator || 'Registered Trading Entity',
      senderEmail: 'client@sovereign-desk.iq',
      senderCompany: originator || 'Registered Trading Entity',
      recipientName: beneficiary || 'Chinese Industrial Counterparty',
      recipientIdentifier: `CIPS-SH-${Math.floor(100000 + Math.random() * 900000)}`,
      purpose: notes || 'Direct bilateral settlement invoice',
      settlementMethod: 'CIPS Direct Bilateral Clearing Conduit',
      settlementTxHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      verificationCode: `AUTH-CBI-${Math.floor(1000 + Math.random() * 9000)}-VALID`,
      settledAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        { stage: 'SUBMISSION', title: 'Order Submitted via ICA Settlement Gateway', timestamp: new Date().toLocaleTimeString(), completed: true, details: 'Invoice submitted.' },
        { stage: 'FX_PARITY', title: 'FX Rate Guaranteed by PBOC-CBI Swap Facility', timestamp: new Date().toLocaleTimeString(), completed: true, details: 'Parity protocol active.' },
        { stage: 'SETTLED', title: 'CIPS Dual Settlement Confirmed', timestamp: new Date().toLocaleTimeString(), completed: true, details: 'Cryptographic receipt generated.' }
      ]
    };

    const orders = readJsonFile(ORDERS_FILE, INITIAL_PAYMENT_ORDERS);
    orders.unshift(newOrder);
    writeJsonFile(ORDERS_FILE, orders);

    return res.status(201).json({
      success: true,
      message: 'Settlement executed successfully through sovereign clearing rail.',
      order: newOrder
    });
  } catch (error: any) {
    console.error('Error in settlement checkout:', error);
    return res.status(500).json({ error: 'Settlement execution failed' });
  }
});

const DEFAULT_TRACKER_STAGES = [
  { id: 1, name: { en: 'Inquiry Received', ar: 'تم استلام طلب التسوية', zh: '已接收结算申请', ckb: 'داواکاری وەرگیراوە' }, description: { en: 'Trade contract recorded on sovereign ledger.', ar: 'تسجيل العقد التجاري في السجل السيادي.', zh: '贸易合同录入双边主权清算系统。', ckb: 'گرێبەستی بازرگانی تۆمارکرا.' }, status: 'completed' },
  { id: 2, name: { en: 'KYC & Compliance Review', ar: 'فحص الامتثال واعرف عميلك', zh: 'KYC与合规双向核验', ckb: 'وردبینی پابەندبوون و KYC' }, description: { en: 'Dual AML screening under Iraqi Law 39 and PBoC regulations.', ar: 'فحص الحظر وغسل الأموال والقوانين المصرفية.', zh: '双向反洗钱与监管名单核验完毕。', ckb: 'پشکنینی دژە سپیکردنەوەی پارە.' }, status: 'completed' },
  { id: 3, name: { en: 'Documentation Verification', ar: 'تدقيق الوثائق والفواتير', zh: '单证审核与报关批文比对', ckb: 'پشکنینی بەڵگەنامەکان' }, description: { en: 'Commercial invoice, Bill of Lading, and customs declarations validated.', ar: 'تدقيق الفاتورة وبوليصة الشحن الجمركية.', zh: '发票与报关原产地单证比对完毕。', ckb: 'فاکتۆر و بەیاننامە پشتڕاستکرانەوە.' }, status: 'completed' },
  { id: 4, name: { en: 'Banking Instruction Prepared', ar: 'إعداد التعليمات المصرفية', zh: '开立双边本币清算指令', ckb: 'ئامادەکردنی فەرمانی بانکی' }, description: { en: 'Cryptographic settlement ticket generated with locked exchange rate.', ar: 'توليد أمر التحويل وتثبيت سعر الصرف.', zh: '锁定双边参考汇率并生成ISO 20022指令。', ckb: 'تۆمارکردنی فەرمانی پارەدان.' }, status: 'in_progress' },
  { id: 5, name: { en: 'Transmitted to Banking Partner', ar: 'الإرسال للمصرف الشريك', zh: '指令报文传输至清算行', ckb: 'نێردرا بۆ بانکی هاوبەش' }, description: { en: 'Dispatched via host-to-host channel to CBI designated settlement bank.', ar: 'إرسال التعليمات للمصرف العراقي المعتمد.', zh: '通过直连专线划转至央行指定清算行。', ckb: 'ناردنی فەرمان بۆ بانکی دەستنیشانکراو.' }, status: 'pending' },
  { id: 6, name: { en: 'Settlement in Progress', ar: 'التسوية قيد التنفيذ', zh: '银行间直接清算执行中', ckb: 'پاکتاوی بانکی لە کاردایە' }, description: { en: 'Interbank ledger matching and direct IQD ⇄ RMB conversion without USD intermediary.', ar: 'مطابقة القيود ومقاصة الدينار واليوان المباشرة.', zh: '第纳尔借记与人民币贷记对账执行。', ckb: 'ئاڵوگۆڕی ڕاستەوخۆی باڵانسەکان.' }, status: 'pending' },
  { id: 7, name: { en: 'Settlement Executed', ar: 'تم تنفيذ التسوية بنجاح', zh: '本币清算资金划转交割', ckb: 'پاکتاو بە سەرکەوتوویی جێبەجێ کرا' }, description: { en: 'Beneficiary account credited in China with full net parity value.', ar: 'تم قيد المبلغ في حساب المستفيد بكامل القيمة.', zh: '受款企业中国境内账户全额到账。', ckb: 'پارەکە چووە سەر هەژماری وەرگر لە چین.' }, status: 'pending' },
  { id: 8, name: { en: 'Confirmed & Closed', ar: 'المعاملة مؤكدة ومغلقة', zh: '归档并颁发双边清算凭证', ckb: 'مامەڵە تەواو و ئەرشیف کرا' }, description: { en: 'Cryptographic proof issued and filed with Central Bank oversight portal.', ar: 'إصدار شهادة التسوية المشفرة الرسمية.', zh: '生成主权级电子结汇核销凭证，全流程闭环。', ckb: 'دەرکردنی بڕوانامەی ئەلیکترۆنی کۆتایی.' }, status: 'pending' }
];

function buildTrackerData(refId: string) {
  const orders = readJsonFile(ORDERS_FILE, INITIAL_PAYMENT_ORDERS);
  const normalized = (refId || '').trim().toUpperCase();
  const order = orders.find((o: any) => 
    (o.reference && o.reference.toUpperCase() === normalized) || 
    (o.id && o.id.toUpperCase() === normalized) || 
    (o.verificationCode && o.verificationCode.toUpperCase() === normalized)
  );

  if (order) {
    let currentStage = 4;
    if (order.status === 'PENDING_SETTLEMENT') currentStage = 2;
    else if (order.status === 'PROCESSING') currentStage = 4;
    else if (order.status === 'CLEARING') currentStage = 6;
    else if (order.status === 'COMPLETED') currentStage = 8;
    else if (order.status === 'REJECTED') currentStage = 2;

    const stages = DEFAULT_TRACKER_STAGES.map((st: any) => {
      if (st.id < currentStage) {
        return { ...st, status: 'completed', timestamp: order.createdAt };
      } else if (st.id === currentStage) {
        return { ...st, status: currentStage === 8 ? 'completed' : 'in_progress', timestamp: order.updatedAt };
      } else {
        return { ...st, status: 'pending' };
      }
    });

    const record = {
      referenceId: order.reference,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      direction: order.direction || 'IQD_TO_RMB',
      settlementType: order.orderType || 'BUSINESS',
      sourceAmount: order.sourceAmount,
      sourceCurrency: order.sourceCurrency,
      targetAmount: order.targetAmount,
      targetCurrency: order.targetCurrency,
      exchangeRate: order.exchangeRate,
      avoidedFees: {
        usdSpreadAmount: Math.round((order.sourceAmount || 1000000) * 0.0028),
        intermediaryFee: 8500,
        correspondentFee: 6200,
        totalSaved: Math.round((order.sourceAmount || 1000000) * 0.0042) + 14700,
        savingsPercent: 7.2
      },
      payer: {
        organizationName: order.senderCompany || order.senderName || 'Authorized Clearing Client',
        contactPerson: order.senderName || 'Representative',
        email: order.senderEmail || 'client@trade-desk.iq',
        phone: order.senderPhone || '+964 780 000 0000',
        country: 'Iraq',
        taxRegNumber: 'IQ-TIN-889021'
      },
      beneficiary: {
        name: order.recipientEntity || order.recipientName || 'Chinese Industrial Counterparty',
        country: 'China',
        bankName: order.recipientBankOrBureau || 'Bank of China (Direct Clearing Node)',
        swiftBic: 'BKCHCNBJ400',
        accountNumber: order.recipientIdentifier || '6217 •••• •••• 4490'
      },
      compliance: {
        kycStatus: order.status === 'REJECTED' ? 'rejected' : 'verified',
        cbiApproved: true,
        pbocApproved: true,
        cipsTracked: true,
        sanctionsScreened: true
      },
      currentStage,
      stages,
      estimatedSettlementDate: order.settledAt || '2026-10-18 16:00 UTC',
      executingBank: order.settlementMethod || 'Trade Bank of Iraq (TBI) • Direct Yuan Clearing Unit',
      txHash: order.settlementTxHash || '0x9d4a82c16e78b90124cfa7b301d9e4a8c2019487'
    };

    return { success: true, currentStage, stages, record };
  }

  // Cross-check CISE Dossiers
  const dossiersFile = path.join(DATA_DIR, 'cise_dossiers.json');
  if (fs.existsSync(dossiersFile)) {
    try {
      const dossiers = JSON.parse(fs.readFileSync(dossiersFile, 'utf-8'));
      const dos = dossiers.find((d: any) => d.code && d.code.toUpperCase() === normalized);
      if (dos) {
        let currentStage = 4;
        if (dos.stage === 'COMPLIANCE_REVIEW') currentStage = 2;
        else if (dos.stage === 'INTERBANK_VERIFIED') currentStage = 5;
        else if (dos.stage === 'DISPATCHED_SETTLED') currentStage = 8;

        const stages = DEFAULT_TRACKER_STAGES.map((st: any) => {
          if (st.id < currentStage) {
            return { ...st, status: 'completed', timestamp: dos.submittedAt };
          } else if (st.id === currentStage) {
            return { ...st, status: currentStage === 8 ? 'completed' : 'in_progress', timestamp: new Date().toISOString() };
          } else {
            return { ...st, status: 'pending' };
          }
        });

        const record = {
          referenceId: dos.code,
          createdAt: dos.submittedAt,
          updatedAt: dos.submittedAt,
          direction: 'IQD_TO_RMB',
          settlementType: dos.tier || 'SERVICE_DOSSIER',
          sourceAmount: dos.estimatedFeeIQD || 5043500,
          sourceCurrency: 'IQD',
          targetAmount: dos.estimatedFeeRMB || 27720,
          targetCurrency: 'RMB',
          exchangeRate: 181.09,
          avoidedFees: {
            usdSpreadAmount: 1400,
            intermediaryFee: 2500,
            correspondentFee: 1800,
            totalSaved: 5700,
            savingsPercent: 8.5
          },
          payer: {
            organizationName: dos.companyEntity || dos.clientName,
            contactPerson: dos.clientName,
            email: dos.applicantEmail,
            phone: '+964 780 000 0000',
            country: dos.jurisdiction || 'Iraq',
            taxRegNumber: 'IQ-DOSSIER-TIN'
          },
          beneficiary: {
            name: 'China-Iraq Strategic Economic (CISE) Directorate',
            country: 'China / Iraq',
            bankName: 'Sovereign Bilateral Clearing Rail',
            swiftBic: 'CIPS-HQ-CLEAR',
            accountNumber: 'CIPS •••• •••• 2026'
          },
          compliance: {
            kycStatus: 'verified',
            cbiApproved: true,
            pbocApproved: true,
            cipsTracked: true,
            sanctionsScreened: true
          },
          currentStage,
          stages,
          estimatedSettlementDate: '2026-10-18 12:00 UTC',
          executingBank: (dos.serviceName && dos.serviceName.en) || 'Bilateral Clearing Directorate',
          txHash: `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
        };

        return { success: true, currentStage, stages, record };
      }
    } catch (e) {
      console.error('Error cross-checking dossiers in tracker:', e);
    }
  }

  return null;
}

// Public Tracker Lookup by Reference or Order ID
settlementRouter.get('/tracker/:referenceId', (req: Request, res: Response) => {
  const { referenceId } = req.params;
  const data = buildTrackerData(referenceId);
  if (data) {
    return res.json(data);
  }
  return res.status(404).json({
    success: false,
    message: `Reference ${referenceId} not found on sovereign settlement registry.`
  });
});

// Admin list of recent settlement orders
settlementRouter.get('/orders', async (_req: Request, res: Response) => {
  const orders = readJsonFile(ORDERS_FILE, INITIAL_PAYMENT_ORDERS);
  return res.json({
    success: true,
    count: orders.length,
    orders
  });
});

// ----------------------------------------------------------------------
// 2. CENTRALIZED CISE COMMAND HUB PAYMENT CRUD & SYNC REGISTRATION
// ----------------------------------------------------------------------

export function registerSettlementRoutes(app: any, editorOrAdminMiddleware?: any, adminMiddleware?: any) {
  // Mount base settlement routes under /api/settlement
  app.use('/api/settlement', settlementRouter);

  // Mount public payment rates endpoint (consumed by both public cards and hub)
  app.get('/api/public/payments/rates', (_req: Request, res: Response) => {
    try {
      const data = readJsonFile(RATES_FILE, INITIAL_PAYMENT_RATES);
      return res.json({ success: true, data });
    } catch (e: any) {
      return res.status(500).json({ error: 'Failed to read payment rates' });
    }
  });

  // Public quote calculator endpoint
  app.post('/api/public/payments/quote', (req: Request, res: Response) => {
    try {
      const { direction = 'IQD_TO_ECNY', orderType = 'BUSINESS', sourceAmount = 1000000 } = req.body;
      const rates = readJsonFile(RATES_FILE, INITIAL_PAYMENT_RATES);
      const isRetail = orderType === 'RETAIL';
      const feePercent = isRetail ? rates.retailFeePercent : rates.businessFeePercent;
      const baseRate = rates.baseRate;
      
      const effectiveRate = direction === 'IQD_TO_ECNY' ? +(1 / baseRate).toFixed(6) : baseRate;
      const feeAmount = Math.round(Number(sourceAmount) * (feePercent / 100));
      const netSource = Math.max(0, Number(sourceAmount) - feeAmount);
      const targetAmount = +(netSource * effectiveRate).toFixed(2);

      return res.json({
        success: true,
        direction,
        orderType,
        sourceCurrency: direction === 'IQD_TO_ECNY' ? 'IQD' : 'CNY',
        targetCurrency: direction === 'IQD_TO_ECNY' ? 'CNY' : 'IQD',
        sourceAmount: Number(sourceAmount),
        effectiveRate,
        feePercent,
        feeAmount,
        targetAmount,
        quoteExpiresInSeconds: 300,
        quoteHash: `QUOTE-${Date.now()}-${Math.floor(Math.random() * 10000)}`
      });
    } catch (e: any) {
      return res.status(500).json({ error: 'Failed to calculate quote' });
    }
  });

  // Public Order & Tracker lookup by reference or order ID
  app.get('/api/public/payments/orders/:referenceId', (req: Request, res: Response) => {
    const { referenceId } = req.params;
    const data = buildTrackerData(referenceId);
    if (data) {
      return res.json(data);
    }
    return res.status(404).json({ success: false, message: `Order ${referenceId} not found.` });
  });

  // CISE Command Hub Orders List with full telemetry
  const authOrAdmin = adminMiddleware || editorOrAdminMiddleware || ((_req: any, _res: any, next: any) => next());

  app.get('/api/hub/payments/orders', authOrAdmin, (_req: Request, res: Response) => {
    try {
      const orders = readJsonFile(ORDERS_FILE, INITIAL_PAYMENT_ORDERS);
      const telemetry = calculateTelemetry(orders);
      return res.json({
        success: true,
        orders,
        telemetry
      });
    } catch (e: any) {
      return res.status(500).json({ error: 'Failed to fetch hub payment orders' });
    }
  });

  // Alias for backward compatibility
  app.get('/api/hub/settlement/orders', authOrAdmin, (_req: Request, res: Response) => {
    try {
      const orders = readJsonFile(ORDERS_FILE, INITIAL_PAYMENT_ORDERS);
      return res.json({
        success: true,
        count: orders.length,
        orders
      });
    } catch (e: any) {
      return res.status(500).json({ error: 'Failed to fetch settlement orders' });
    }
  });

  // Single Order Detail
  app.get('/api/hub/payments/orders/:id', authOrAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    const orders = readJsonFile(ORDERS_FILE, INITIAL_PAYMENT_ORDERS);
    const order = orders.find((o: any) => o.id === id || o.reference === id);
    if (!order) {
      return res.status(404).json({ error: `Order ${id} not found.` });
    }
    return res.json({ success: true, order });
  });

  // Create new order from Hub
  app.post('/api/hub/payments/orders', authOrAdmin, (req: Request, res: Response) => {
    try {
      const body = req.body;
      const orders = readJsonFile(ORDERS_FILE, INITIAL_PAYMENT_ORDERS);
      const id = body.id || `ord-${Date.now()}`;
      const reference = body.reference || `CIPS-2026-IQCN-${Math.floor(1000 + Math.random() * 9000)}`;

      const newOrder = {
        id,
        reference,
        orderType: body.orderType || 'BUSINESS',
        direction: body.direction || 'IQD_TO_ECNY',
        sourceCurrency: body.sourceCurrency || 'IQD',
        targetCurrency: body.targetCurrency || 'CNY',
        sourceAmount: Number(body.sourceAmount) || 0,
        targetAmount: Number(body.targetAmount) || 0,
        exchangeRate: Number(body.exchangeRate) || 181.09,
        feeAmount: Number(body.feeAmount) || 0,
        feePercent: Number(body.feePercent) || 0.12,
        status: body.status || 'PENDING_SETTLEMENT',
        senderName: body.senderName || 'Anonymous',
        senderEmail: body.senderEmail || '',
        senderPhone: body.senderPhone || '',
        senderCompany: body.senderCompany || '',
        recipientName: body.recipientName || '',
        recipientIdentifier: body.recipientIdentifier || '',
        recipientEntity: body.recipientEntity || '',
        recipientBankOrBureau: body.recipientBankOrBureau || 'CIPS Clearing Node',
        purpose: body.purpose || 'Trade invoice settlement',
        settlementMethod: body.settlementMethod || 'CIPS Direct Bilateral Clearing Conduit',
        commercialInvoiceRef: body.commercialInvoiceRef || '',
        contractValueUsd: body.contractValueUsd || 0,
        adminNotes: body.adminNotes || '',
        complianceNotes: body.complianceNotes || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        timeline: [
          { stage: 'CREATED', title: 'Order Registered via Hub Console', timestamp: new Date().toISOString(), completed: true, details: 'Order manually recorded by administrator.' }
        ]
      };

      orders.unshift(newOrder);
      writeJsonFile(ORDERS_FILE, orders);

      return res.status(201).json({ success: true, order: newOrder });
    } catch (e: any) {
      return res.status(500).json({ error: 'Failed to create payment order' });
    }
  });

  // Update order status & compliance notes (CRUD Update)
  app.put('/api/hub/payments/orders/:orderId/status', authOrAdmin, (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const { status, adminNotes, complianceNotes, rejectionReason } = req.body;
      const orders = readJsonFile(ORDERS_FILE, INITIAL_PAYMENT_ORDERS);
      const index = orders.findIndex((o: any) => o.id === orderId || o.reference === orderId);

      if (index === -1) {
        return res.status(404).json({ error: `Order ${orderId} not found.` });
      }

      if (status) orders[index].status = status;
      if (adminNotes !== undefined) orders[index].adminNotes = adminNotes;
      if (complianceNotes !== undefined) orders[index].complianceNotes = complianceNotes;
      if (rejectionReason !== undefined) orders[index].rejectionReason = rejectionReason;
      orders[index].updatedAt = new Date().toISOString();

      if (status === 'COMPLETED' && !orders[index].settledAt) {
        orders[index].settledAt = new Date().toISOString();
      }

      if (orders[index].timeline) {
        orders[index].timeline.push({
          stage: status,
          title: `Status Changed to ${status}`,
          timestamp: new Date().toISOString(),
          completed: true,
          details: adminNotes || complianceNotes || rejectionReason || 'Status updated in CISE Command Hub'
        });
      }

      writeJsonFile(ORDERS_FILE, orders);
      return res.json({ success: true, order: orders[index] });
    } catch (e: any) {
      return res.status(500).json({ error: 'Failed to update order status' });
    }
  });

  // Delete payment order (CRUD Delete)
  app.delete('/api/hub/payments/orders/:orderId', authOrAdmin, (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const orders = readJsonFile(ORDERS_FILE, INITIAL_PAYMENT_ORDERS);
      const filtered = orders.filter((o: any) => o.id !== orderId && o.reference !== orderId);

      if (filtered.length === orders.length) {
        return res.status(404).json({ error: `Order ${orderId} not found.` });
      }

      writeJsonFile(ORDERS_FILE, filtered);
      return res.json({ success: true, message: `Order ${orderId} deleted successfully.` });
    } catch (e: any) {
      return res.status(500).json({ error: 'Failed to delete order' });
    }
  });

  // Rates management in CISE Command Hub
  app.get('/api/hub/payments/rates', authOrAdmin, (_req: Request, res: Response) => {
    try {
      const data = readJsonFile(RATES_FILE, INITIAL_PAYMENT_RATES);
      return res.json({ success: true, data });
    } catch (e: any) {
      return res.status(500).json({ error: 'Failed to read payment rates' });
    }
  });

  app.patch('/api/hub/payments/rates', authOrAdmin, (req: Request, res: Response) => {
    try {
      const currentRates = readJsonFile(RATES_FILE, INITIAL_PAYMENT_RATES);
      const body = req.body;

      const updated = {
        ...currentRates,
        ...body,
        updatedAt: new Date().toISOString()
      };

      writeJsonFile(RATES_FILE, updated);
      return res.json({ success: true, data: updated });
    } catch (e: any) {
      return res.status(500).json({ error: 'Failed to update exchange rates' });
    }
  });

  // Simulate tick for live volatility testing
  app.post('/api/hub/payments/rates/tick', authOrAdmin, (_req: Request, res: Response) => {
    try {
      const currentRates = readJsonFile(RATES_FILE, INITIAL_PAYMENT_RATES);
      // Realistic micro-volatility (+/- 0.05 IQD)
      const delta = (Math.random() - 0.48) * 0.08;
      const newBase = Math.round((currentRates.baseRate + delta) * 100) / 100;
      const newBid = Math.round((newBase - 0.24) * 100) / 100;
      const newAsk = Math.round((newBase + 0.24) * 100) / 100;

      const history = currentRates.trendHistory || [];
      history.push({
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        rate: newBase,
        volume: Math.floor(5000000 + Math.random() * 8000000)
      });
      if (history.length > 15) history.shift();

      const updated = {
        ...currentRates,
        baseRate: newBase,
        bidRate: newBid,
        askRate: newAsk,
        trendHistory: history,
        updatedAt: new Date().toISOString()
      };

      writeJsonFile(RATES_FILE, updated);
      return res.json({ success: true, rate: updated });
    } catch (e: any) {
      return res.status(500).json({ error: 'Failed to tick exchange rates' });
    }
  });
}
