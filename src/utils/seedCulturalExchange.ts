import { firestoreService } from '../hooks/useFirestore';

export const seedCulturalExchangeData = async () => {
  const categories = [
    {
      slug: 'educational-exchange',
      nameEn: 'Educational & Academic Exchange',
      nameAr: 'التبادل التعليمي والأكاديمي',
      nameZh: '学术与教育交流',
      nameCkb: 'ئاڵوگۆڕی فێركاری و ئەکادیمی',
      descriptionEn: 'University MOUs, dual-degree tracks, and faculty sabbaticals.'
    },
    {
      slug: 'heritage-archaeology',
      nameEn: 'Heritage & Archaeology',
      nameAr: 'التراث والآثار',
      nameZh: '文化遗产与考古',
      nameCkb: 'کەلتوور و شوێنەوار',
      descriptionEn: 'Joint excavations, museum restoration, and ancient civilization studies.'
    },
    {
      slug: 'youth-leadership',
      nameEn: 'Youth & Leadership',
      nameAr: 'الشباب والقيادة',
      nameZh: '青年与领导力',
      nameCkb: 'لاوان و سەرکردایەتی',
      descriptionEn: 'Immersion camps, innovation summits, and sports diplomacy.'
    }
  ];

  const partners = [
    {
      nameEn: 'Tsinghua University',
      nameAr: 'جامعة تسينغ-هوا',
      nameZh: '清华大学',
      nameCkb: 'زانکۆی تسینگ-هوا',
      locationEn: 'Beijing, China',
      locationAr: 'بكين، الصين',
      locationZh: '中国北京',
      locationCkb: 'بەکین، چین',
      specialtyEn: 'Engineering, Technology, & Global Affairs',
      specialtyAr: 'الهندسة، التكنولوجيا، والشؤون العالمية',
      specialtyZh: '工程、科技与全球事务',
      specialtyCkb: 'ئەندازیاری، تەکنەلۆژیا و کاروباری جیهانی',
      mouScopeEn: 'Dual-PhD tracks in AI and bilateral research labs.',
      mouScopeAr: 'مسارات دكتوراه مزدوجة في الذكاء الاصطناعي ومختبرات بحثية.',
      mouScopeZh: '人工智能双博士培养计划及双边研究实验室。',
      mouScopeCkb: 'دکتۆرای دوولایەنە لە ژیری دەستکرد و تاقیگەی لێکۆڵینەوە.',
      tierBadge: 'Elite Partner'
    },
    {
      nameEn: 'University of Baghdad',
      nameAr: 'جامعة بغداد',
      nameZh: '巴格达大学',
      nameCkb: 'زانکۆی بەغدا',
      locationEn: 'Baghdad, Iraq',
      locationAr: 'بغداد، العراق',
      locationZh: '伊拉克巴格达',
      locationCkb: 'بەغدا، عێراق',
      specialtyEn: 'Arts, Archaeology, & Strategic Studies',
      specialtyAr: 'الآداب، الآثار، والدراسات الاستراتيجية',
      specialtyZh: '人文、考古与战略研究',
      specialtyCkb: 'هونەر، شوێنەوار و لێکۆڵینەوەی ستراتیژی',
      mouScopeEn: 'Joint archaeological surveys in the Ur & Babylon regions.',
      mouScopeAr: 'مسوحات أثرية مشتركة في مناطق أور وبابل.',
      mouScopeZh: '乌尔与巴比伦遗址联合考古调查。',
      mouScopeCkb: 'لێکۆڵینەوەی شوێنەوار لە ناوچەکانی ئور و بابل.',
      tierBadge: 'Founding Partner'
    }
  ];

  const programs = [
    {
      titleEn: 'Sino-Iraqi AI Immersion Fellowship',
      titleAr: 'زمالة الانغماس في الذكاء الاصطناعي الصينية-العراقية',
      titleZh: '中伊人工智能沉浸式研修奖学金',
      titleCkb: 'زەمالەی چینی-عێراقی بۆ ژیری دەستکرد',
      descriptionEn: 'A 6-month intensive residency at Tsinghua University for Iraqi software engineers.',
      descriptionAr: 'إقامة مكثفة لمدة 6 أشهر في جامعة تسينغ-هوا لمهندسي البرمجيات العراقيين.',
      descriptionZh: '为期6个月的清华大学针对伊拉克软件工程师的强化研修项目。',
      descriptionCkb: 'خولی ٦ مانگی چڕوپڕ لە زانکۆی تسینگ-هوا بۆ ئەندازیارانی عێراقی.',
      institutionName: 'Tsinghua University',
      coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200',
      categorySlug: 'educational-exchange',
      applicationDeadline: '2026-03-15',
      eventDate: 'Sept 2026 – Feb 2027',
      eligibility: 'BSc in CS or Engineering, proficiency in English, under 30 years old.'
    },
    {
      titleEn: 'Silk Road Archaeology Masterclass',
      titleAr: 'ماستر كلاس آثار طريق الحرير',
      titleZh: '丝绸之路考古大师班',
      titleCkb: 'ماستەر کلاسی شوێنەواری ڕێگای ئاوریشم',
      descriptionEn: 'Joint field study covering ancient Mesopotamian and Yellow River civilizations.',
      descriptionAr: 'دراسة ميدانية مشتركة تغطي حضارات بلاد الرافدين القديمة والنهر الأصفر.',
      descriptionZh: '涵盖古美索不达米亚与黄河文明的联合实地调研。',
      descriptionCkb: 'لێکۆڵینەوەی مەیدانی لەسەر شارستانیەتەکانی مێزۆپۆتامیا و زەردە ڕووبار.',
      institutionName: 'Nanjing University / Univ of Baghdad',
      coverImage: 'https://images.unsplash.com/photo-1523050853064-8457224bc575?auto=format&fit=crop&q=80&w=1200',
      categorySlug: 'heritage-archaeology',
      applicationDeadline: '2026-05-01',
      eventDate: 'Summer 2026',
      eligibility: 'Open to current Archaeology postgraduates and faculty.'
    }
  ];

  // Seed categories
  for (const cat of categories) {
    await firestoreService.addDocument('cultural_categories', cat);
  }

  // Seed partners
  for (const partner of partners) {
    await firestoreService.addDocument('cultural_partners', partner);
  }

  // Seed programs
  for (const prog of programs) {
    await firestoreService.addDocument('cultural_programs', prog);
  }
};
