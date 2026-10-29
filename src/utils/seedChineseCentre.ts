import { collection, doc, writeBatch, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export async function seedChineseCentreData() {
  const batch = writeBatch(db);

  // 1. Seed Courses
  const courses = [
    {
      id: 'hsk-1',
      slug: 'hsk-1',
      level: 'HSK 1',
      type: 'CORE',
      titleEn: 'HSK 1 Foundation',
      titleAr: 'دورة HSK 1 التأسيسية',
      titleZh: 'HSK 1级零基础班',
      titleCkb: 'خولی بنەڕەتی HSK 1',
      descriptionEn: 'Introduction to Pinyin, tones, and basic character strokes.',
      durationEn: '60–80 Hours',
      priceEn: '$250',
      imageUrl: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&w=800&q=80',
      isFeatured: true,
      order: 10
    },
    {
      id: 'hsk-2',
      slug: 'hsk-2',
      level: 'HSK 2',
      type: 'CORE',
      titleEn: 'HSK 2 Elementary',
      titleAr: 'دورة HSK 2 للمبتدئين',
      titleZh: 'HSK 2级初级班',
      titleCkb: 'خولی HSK 2 بۆ سەرەتایی',
      descriptionEn: 'Building daily conversational confidence and basic grammar.',
      durationEn: '60–80 Hours',
      priceEn: '$275',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      isFeatured: false,
      order: 20
    },
    {
      id: 'business-chinese',
      slug: 'business-chinese',
      level: 'Business',
      type: 'BUSINESS',
      titleEn: 'Executive Business Chinese',
      titleAr: 'الصينية للأعمال التنفيذية',
      titleZh: '高端商务中文',
      titleCkb: 'چینی بۆ بازرگانی جێبەجێکار',
      descriptionEn: 'Specialized vocabulary for trade, logistics, and contracts.',
      durationEn: '40 Hours',
      priceEn: '$450',
      imageUrl: 'https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&w=800&q=80',
      isFeatured: true,
      order: 100
    }
  ];

  courses.forEach(course => {
    const ref = doc(collection(db, 'chinese_courses'), course.id);
    batch.set(ref, {
      ...course,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  });

  // 2. Seed Instructors
  const instructors = [
    {
      id: 'chen-lin',
      slug: 'chen-lin',
      nameEn: 'Prof. Chen Lin',
      nameAr: 'أ.د. تشن لين',
      nameZh: '陈林 教授',
      nameCkb: 'پ.د. چێن لین',
      titleEn: 'Pedagogical Director',
      titleAr: 'المدير التربوي',
      titleZh: '教学督导',
      titleCkb: 'بەڕێوەبەری پەروەردەیی',
      bioEn: 'Certified senior faculty member with over 12 years of experience.',
      imageUrl: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&w=400&h=400&q=80',
      isFeatured: true,
      order: 10
    },
    {
      id: 'zhang-ming',
      slug: 'zhang-ming',
      nameEn: 'Zhang Ming',
      nameAr: 'تشانغ مينغ',
      nameZh: '张明',
      nameCkb: 'ژانگ مینگ',
      titleEn: 'Lead Examiner',
      titleAr: 'كبير الممتحنين',
      titleZh: '主考官',
      titleCkb: 'سەرپەرشتیاری تاقیکردنەوە',
      bioEn: 'Specialist in oral fluency and HSKK assessment.',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80',
      isFeatured: true,
      order: 20
    }
  ];

  instructors.forEach(ins => {
    const ref = doc(collection(db, 'chinese_instructors'), ins.id);
    batch.set(ref, {
      ...ins,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  });

  // 3. Seed Testing Sessions
  const sessions = [
    {
      id: 'hsk-session-nov-2026',
      testType: 'HSK',
      level: '1–6',
      testDate: '2026-11-15',
      registrationDeadline: '2026-10-15',
      locationEn: 'Sulaymaniyah Campus',
      feeEn: '$35–$120',
      status: 'OPEN'
    },
    {
      id: 'hskk-session-dec-2026',
      testType: 'HSKK',
      level: 'All Levels',
      testDate: '2026-12-05',
      registrationDeadline: '2026-11-05',
      locationEn: 'Sulaymaniyah Campus',
      feeEn: '$40–$60',
      status: 'OPEN'
    }
  ];

  sessions.forEach(session => {
    const ref = doc(collection(db, 'chinese_testing_sessions'), session.id);
    batch.set(ref, {
      ...session,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  });

  // 3.5 Seed Upcoming Class Sessions
  const classSessions = [
    {
      id: 'hsk-1-fall',
      courseEn: 'HSK 1 Foundation Cohort (Evening)',
      courseAr: 'دورة HSK 1 التأسيسية (مسائي)',
      courseZh: 'HSK 1级零基础晚间班',
      courseCkb: 'خولی بنەڕەتی HSK 1 (ئێواران)',
      startDateEn: 'Oct 12, 2026',
      startDateAr: '12 تشرين الأول 2026',
      startDateZh: '2026年10月12日',
      startDateCkb: '12ی تشرینی یەکەمی 2026',
      scheduleEn: 'Mon / Wed · 18:00 – 20:00',
      scheduleAr: 'الإثنين / الأربعاء · 18:00 – 20:00',
      scheduleZh: '周一/周三 · 18:00 – 20:00',
      scheduleCkb: 'دووشەممە / چوارشەممە · 18:00 – 20:00',
      locationEn: 'Sulaymaniyah Campus (Room 402)',
      locationAr: 'مقر السليمانية (قاعة 402)',
      locationZh: '苏莱曼尼亚校区（402教室）',
      locationCkb: 'کەمپی سلێمانی (هۆڵی 402)',
      totalCapacity: 16,
      spotsRemaining: 4
    },
    {
      id: 'hsk-2-fast',
      courseEn: 'HSK 2 Accelerated Intermediate Track',
      courseAr: 'المسار المكثف السريع HSK 2',
      courseZh: 'HSK 2级强化进阶班',
      courseCkb: 'ڕێڕەوی خێرای پێشکەوتووی HSK 2',
      startDateEn: 'Oct 18, 2026',
      startDateAr: '18 تشرين الأول 2026',
      startDateZh: '2026年10月18日',
      startDateCkb: '18ی تشرینی یەکەمی 2026',
      scheduleEn: 'Tue / Thu · 18:30 – 20:30',
      scheduleAr: 'الثلاثاء / الخميس · 18:30 – 20:30',
      scheduleZh: '周二/周四 · 18:30 – 20:30',
      scheduleCkb: 'سێشەممە / پێنجشەممە · 18:30 – 20:30',
      locationEn: 'In-Person / Interactive Hybrid',
      locationAr: 'حضوري / نظام تفاعلي مدمج',
      locationZh: '线下授课 / 交互式混合教学',
      locationCkb: 'ئامادەبوون / سیستەمی تێکەڵ',
      totalCapacity: 14,
      spotsRemaining: 6
    },
    {
      id: 'business-exec',
      courseEn: 'Executive Business Chinese & Trade Protocol',
      courseAr: 'الصينية للأعمال التنفيذية وبروتوكول التجارة',
      courseZh: '高端商务中文与双边经贸谈判实务班',
      courseCkb: 'چینی بۆ بازرگانی جێبەجێکار و پرۆتۆکۆڵ',
      startDateEn: 'Nov 02, 2026',
      startDateAr: '02 تشرين الثاني 2026',
      startDateZh: '2026年11月02日',
      startDateCkb: '02ی تشرینی دووەمی 2026',
      scheduleEn: 'Fri / Sat · 10:00 – 13:00',
      scheduleAr: 'الجمعة / السبت · 10:00 – 13:00',
      scheduleZh: '周五/周六 · 10:00 – 13:00',
      scheduleCkb: 'هەینی / شەممە · 10:00 – 13:00',
      locationEn: 'Sulaymaniyah Executive Suite',
      locationAr: 'جناح رجال الأعمال بالسليمانية',
      locationZh: '苏莱曼尼亚行政会议厅',
      locationCkb: 'هۆڵی بازرگانی لە سلێمانی',
      totalCapacity: 12,
      spotsRemaining: 3
    }
  ];

  classSessions.forEach(session => {
    const ref = doc(collection(db, 'chinese_sessions'), session.id);
    batch.set(ref, {
      ...session,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  });

  // 4. Seed HSK Levels
  const levels = [
    { id: 'hsk-1', level: 'HSK 1', slug: 'hsk-1', bandKey: 'hskBandElementary', words: '500', hours: '60–80', prereq: 'none', order: 10 },
    { id: 'hsk-2', level: 'HSK 2', slug: 'hsk-2', bandKey: 'hskBandElementary', words: '772', hours: '60–80', prereq: 'HSK 1', order: 20 },
    { id: 'hsk-3', level: 'HSK 3', slug: 'hsk-3', bandKey: 'hskBandIntermediate', words: '973', hours: '80–100', prereq: 'HSK 2', order: 30 },
    { id: 'hsk-4', level: 'HSK 4', slug: 'hsk-4', bandKey: 'hskBandIntermediate', words: '1,000', hours: '100–120', prereq: 'HSK 3', order: 40 },
    { id: 'hsk-5', level: 'HSK 5', slug: 'hsk-5', bandKey: 'hskBandAdvanced', words: '1,071', hours: '120–140', prereq: 'HSK 4', order: 50 },
    { id: 'hsk-6', level: 'HSK 6', slug: 'hsk-6', bandKey: 'hskBandAdvanced', words: '1,140', hours: '140–160', prereq: 'HSK 5', order: 60 },
    { id: 'hsk-7-9', level: 'HSK 7–9', slug: 'hsk-7-9', bandKey: 'hskBandAdvanced', words: '5,636', hours: '200+', prereq: 'HSK 6', order: 70 }
  ];

  levels.forEach(lvl => {
    const ref = doc(collection(db, 'chinese_levels'), lvl.id);
    batch.set(ref, { ...lvl, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  });

  // 5. Seed Specialized Tracks
  const tracks = [
    { id: 'hskk-elem', slug: 'hskk-elementary', name: 'HSKK Elementary', icon: 'Mic', descKey: 'suppHskkElemDesc', order: 10 },
    { id: 'hskk-inter', slug: 'hskk-intermediate', name: 'HSKK Intermediate', icon: 'MessageSquare', descKey: 'suppHskkInterDesc', order: 20 },
    { id: 'hskk-adv', slug: 'hskk-advanced', name: 'HSKK Advanced', icon: 'Sparkles', descKey: 'suppHskkAdvDesc', order: 30 },
    { id: 'yct', slug: 'yct-1-4', name: 'YCT 1–4', icon: 'Compass', descKey: 'suppYctDesc', order: 40 },
    { id: 'business', slug: 'business-chinese', name: 'Business Chinese', icon: 'Briefcase', descKey: 'suppBusinessDesc', order: 50 }
  ];

  tracks.forEach(track => {
    const ref = doc(collection(db, 'chinese_tracks'), track.id);
    batch.set(ref, { ...track, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  });

  await batch.commit();
}
