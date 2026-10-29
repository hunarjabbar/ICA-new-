import * as fs from 'fs';

const useI18nPath = 'src/hooks/useI18n.ts';
let code = fs.readFileSync(useI18nPath, 'utf8');

const dictMatch = code.match(/const dict\s*=\s*(\{[\s\S]*?\n\};)/);
if (!dictMatch) {
  throw new Error("Could not find dict in useI18n.ts");
}

const dict = eval('(' + dictMatch[1].replace(/;$/, '') + ')');

const arMissing = {
  'nav.initiatives': 'المبادرات',
  'nav.summit': 'القمة والمعرض',
  'nav.chineseCenter': 'المركز الصيني',
  'nav.visaCentre': 'مركز التأشيرات',
  'footer.initiativesHeading': 'المبادرات والتعاون الثنائي',
  'initiatives.card.consultancy.tag.legal': 'قانوني',
  'initiatives.card.consultancy.tag.financial': 'مالي',
  'initiatives.card.consultancy.tag.investment': 'استثماري',
  'consultancy.nav.label': 'استشارات',
  'consultancy.hero.eyebrow': 'استشارات ثنائية سيادية',
  'consultancy.hero.headline': 'الاستشارات المالية والقانونية عبر الحدود بين العراق والصين.',
  'consultancy.hero.subheadline': 'إرشاد مؤسسي وقانوني استراتيجي للشركات والمستثمرين لضمان الامتثال التام.',
  'consultancy.hero.cta.primary': 'طلب استشارة استراتيجية',
  'consultancy.hero.cta.secondary': 'استكشاف القطاعات',
  'consultancy.pillars.iraqBound.title': 'الاستثمار في العراق',
  'consultancy.pillars.iraqBound.body': 'الأطر التنظيمية والقانونية لدخول السوق العراقي وإقليم كردستان.',
  'consultancy.pillars.chinaBound.title': 'الاستثمار في الصين',
  'consultancy.pillars.chinaBound.body': 'الوصول إلى الأسواق المالية الصينية وترتيبات الشراكة التجارية.',
  'consultancy.pillars.bilateral.title': 'التسوية والامتثال الثنائي',
  'consultancy.pillars.bilateral.body': 'هيكلة المدفوعات والامتثال المالي المشترك وفق المعايير الدولية.',
  'consultancy.badges.nic': 'الهيئة الوطنية للاستثمار (NIC)',
  'consultancy.badges.kboi': 'هيئة استثمار إقليم كردستان (KBOI)',
  'consultancy.badges.mofcom': 'وزارة التجارة الصينية (MOFCOM)',
  'consultancy.badges.pboc': 'بنك الشعب الصيني (PBoC)',
  'consultancy.badges.isc': 'هيئة الأوراق المالية العراقية (ISC)',
  'consultancy.badges.csrc': 'لجنة تنظيم الأوراق المالية الصينية (CSRC)',
  'consultancy.badges.fatf': 'الامتثال المالي الدولي (FATF)',
  'consultancy.badges.iso37001': 'شهادة ISO 37001 الدولية',
  'consultancy.iraqBound.heading': 'دخول السوق العراقي وقوانين الاستثمار',
  'consultancy.iraqBound.body': 'المرشد الشامل لقانون الاستثمار العراقي وقانون استثمار كردستان.',
  'consultancy.iraqBound.law.federal.title': 'قانون الاستثمار الاتحادي رقم 13',
  'consultancy.iraqBound.law.federal.body': 'حوافز الإعفاء الضريبي وحرية تحويل رأس المال والأرباح للمستثمرين.',
  'consultancy.iraqBound.law.kurdistan.title': 'قانون استثمار إقليم كردستان رقم 4',
  'consultancy.iraqBound.law.kurdistan.body': 'تسهيلات الإقامة والتملك وتخصيص الأراضي للمشاريع الصناعية.',
  'consultancy.iraqBound.sectors.energy.title': 'قطاعات الطاقة والبنية التحتية',
  'consultancy.iraqBound.sectors.energy.body': 'استشارات المشاريع الكبرى وعقود النفط والغاز والطاقة المتجددة.',
  'consultancy.iraqBound.comparison.heading': 'مقارنة الأطر القانونية الاستثمارية',
  'consultancy.chinaBound.heading': 'الاستثمار والتعامل المؤسسي في الصين',
  'consultancy.chinaBound.body': 'المتطلبات القانونية والتنظيمية لتأسيس الشركات والوصول لأسواق الصين.',
  'consultancy.chinaBound.law.title': 'قانون الاستثمار الأجنبي الصيني',
  'consultancy.chinaBound.law.body': 'المعاملة الوطنية وحماية حقوق الملكية الفكرية وتسهيل التحويلات.',
  'consultancy.chinaBound.negativeList.title': 'القائمة السلبية للاستثمار الأجنبي',
  'consultancy.chinaBound.negativeList.body': 'التحقق من القطاعات المفتوحة والقيود التنظيمية والتصاريح الخاصة.',
  'consultancy.chinaBound.capitalMarket.title': 'الأسواق المالية الصينية',
  'consultancy.chinaBound.capitalMarket.body': 'برامج QFII وRQFII والاستثمار المؤسسي في بورصتي شنغهاي وشنتشن.',
  'consultancy.chinaBound.taxTreaty.title': 'اتفاقية تجنب الازدواج الضريبي',
  'consultancy.chinaBound.taxTreaty.body': 'الاستفادة من المعاهدات الثنائية لتخفيض الاقتطاعات الضريبية.',
  'consultancy.chinaBound.investorTypes.corporate.title': 'الكيانات المؤسسية والشركات',
  'consultancy.chinaBound.investorTypes.corporate.body': 'تأسيس الفروع والمشاريع المشتركة والشركات ذات المسؤولية المحدودة.',
  'consultancy.chinaBound.sectors.tech.title': 'قطاعات التكنولوجيا والصناعة المتقدمة',
  'consultancy.chinaBound.sectors.tech.body': 'التعاون في مجالات الذكاء الاصطناعي والإلكترونيات والتصنيع الذكي.',
  'consultancy.bilateral.heading': 'الأطر الثنائية والتسوية المالية',
  'consultancy.bilateral.body': 'تيسير التداول والاستثمار المالي عبر القنوات المصرفية الرسمية والعملات الوطنية.',
  'consultancy.bilateral.isx.title': 'سوق العراق للأوراق المالية (ISX)',
  'consultancy.bilateral.isx.body': 'فرص الاستثمار الأجنبي والتداول المباشر في الأسهم والسندات العراقية.',
  'consultancy.bilateral.chinaAccess.title': 'الوصول إلى أدوات التمويل الصينية',
  'consultancy.bilateral.chinaAccess.body': 'سندات الباندا وخطوط الائتمان المقومة باليوان الصيني (RMB).',
  'consultancy.bilateral.services.entry.title': 'خدمات دخول السوق والتأسيس',
  'consultancy.bilateral.services.entry.body': 'إجراءات التراخيص والتسجيل الضريبي والمطابقة المؤسسية الشاملة.',
  'consultancy.bilateral.flowDiagram.heading': 'مخطط تدفق العمليات الاستشارية الثنائية',
  'consultancy.process.heading': 'مراحل تقديم الاستشارة والتدقيق',
  'consultancy.process.stage.1.title': 'المرحلة 1: التدقيق والتقييم الأولي',
  'consultancy.process.stage.1.body': 'فحص الوثائق والتأكد من مطابقة المتطلبات التنظيمية والمصرفية.',
  'consultancy.inquiry.heading': 'طلب استشارة استراتيجية متخصصة',
  'consultancy.inquiry.body': 'فريق المستشارين القانونيين والماليين جاهز لدراسة ملفكم المؤسسي.',
  'consultancy.inquiry.form.orgName': 'اسم المؤسسة أو الشركة الطالبة',
  'consultancy.inquiry.pdf.download': 'تحميل تقرير الاستشارة المعتمد (PDF)',
  'consultancy.inquiry.confirmation.heading': 'تم استلام طلب الاستشارة بنجاح',
  'consultancy.inquiry.confirmation.reference': 'الرقم المرجعي للاستشارة المؤسسية',
  'consultancy.faq.heading': 'الأسئلة الشائعة حول الاستشارات الثنائية',
  'consultancy.contact.heading': 'التواصل مع إدارة الاستشارات الاستراتيجية',
  'consultancy.legal.heading': 'الإشعار القانوني والسيادي',
  'consultancy.legal.body': 'جميع المعلومات والاستشارات مقدمة وفق الأطر الرسمية والقوانين السارية في البلدين.',
  'consultancy.disclosure.learnMore': 'معرفة المزيد من التفاصيل',
  'consultancy.disclosure.showLess': 'عرض أقل',
  'consultancy.returnToIca': 'العودة إلى وكالة ICA'
};

const zhMissing = {
  'nav.initiatives': '倡议与合作',
  'nav.summit': '峰会与博览会',
  'nav.chineseCenter': '中国中心',
  'nav.visaCentre': '签证中心',
  'footer.initiativesHeading': '倡议与双边合作',
  'initiatives.card.consultancy.tag.legal': '法律事务',
  'initiatives.card.consultancy.tag.financial': '金融合规',
  'initiatives.card.consultancy.tag.investment': '跨境投资'
};

const ckbMissing = {
  'nav.initiatives': 'دەستپێشخەرییەکان',
  'nav.summit': 'لووتکە و پێشانگا',
  'nav.chineseCenter': 'سەنتەری چینی',
  'nav.visaCentre': 'سەنتەری ڤیزا',
  'footer.initiativesHeading': 'دەستپێشخەری و هاوکاری دووقۆڵی',
  'initiatives.card.consultancy.tag.legal': 'یاسایی',
  'initiatives.card.consultancy.tag.financial': 'دارایی',
  'initiatives.card.consultancy.tag.investment': 'وەبەرهێنان'
};

Object.assign(dict.ar, arMissing);
Object.assign(dict.zh, zhMissing);
Object.assign(dict.ckb, ckbMissing);

// Ensure sorted keys in each
const keys = Object.keys(dict.en).sort();

const enJson = {};
const arJson = {};
const zhJson = {};
const ckJson = {};

for (const k of keys) {
  enJson[k] = dict.en[k];
  arJson[k] = dict.ar[k] || dict.en[k];
  zhJson[k] = dict.zh[k] || dict.en[k];
  ckJson[k] = dict.ckb[k] || dict.en[k];
}

fs.writeFileSync('locales/en.json', JSON.stringify(enJson, null, 2) + '\n');
fs.writeFileSync('locales/ar.json', JSON.stringify(arJson, null, 2) + '\n');
fs.writeFileSync('locales/zh.json', JSON.stringify(zhJson, null, 2) + '\n');
fs.writeFileSync('locales/ck.json', JSON.stringify(ckJson, null, 2) + '\n');

console.log('Successfully wrote locales/en.json, locales/ar.json, locales/zh.json, locales/ck.json');
console.log('en keys:', Object.keys(enJson).length);
console.log('ar keys:', Object.keys(arJson).length);
console.log('zh keys:', Object.keys(zhJson).length);
console.log('ck keys:', Object.keys(ckJson).length);
