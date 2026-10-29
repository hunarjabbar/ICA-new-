import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Locale } from '../../../types';
import { ccTranslations } from './translations';
import { ArrowRight, Calendar, Clock, MapPin, Users2, AlertCircle } from 'lucide-react';
import { useCollection } from '../../../hooks/useFirestore';
import { orderBy } from 'firebase/firestore';

interface UpcomingSessionsProps {
  lang: Locale;
}

interface Session {
  id: string;
  courseEn: string;
  courseAr: string;
  courseZh: string;
  courseCkb: string;
  startDateEn: string;
  startDateAr: string;
  startDateZh: string;
  startDateCkb: string;
  scheduleEn: string;
  scheduleAr: string;
  scheduleZh: string;
  scheduleCkb: string;
  locationEn: string;
  locationAr: string;
  locationZh: string;
  locationCkb: string;
  totalCapacity: number;
  spotsRemaining: number;
}

const STATIC_SESSIONS: Session[] = [
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

export function UpcomingSessions({ lang }: UpcomingSessionsProps) {
  const t = ccTranslations[lang] || ccTranslations.en;
  const isRtl = lang === 'ar' || lang === 'ckb';
  const location = useLocation();

  // Dynamic basePath to support both /chinese-centre and /chinese-center
  const basePath = location.pathname.includes('/chinese-centre')
    ? `/${lang}/institute/chinese-centre`
    : `/${lang}/institute/chinese-center`;

  const { data: sessions = [] } = useCollection<Session>('chinese_sessions', [orderBy('startDateEn', 'asc')]);

  const displaySessions = sessions.length > 0 ? sessions : STATIC_SESSIONS;

  return (
    <section id="upcoming-sessions" className="py-24 bg-white border-b border-slate-100" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-950 uppercase tracking-tighter mb-6">
            {t.sessionsHeading}
          </h2>
          <p className="text-slate-600 text-lg font-medium leading-relaxed">
            {t.sessionsSubheading}
          </p>
        </div>

        {/* Sessions List */}
        <div className="space-y-6">
          {displaySessions.map((session) => {
            const course = lang === 'ar' ? session.courseAr : lang === 'ckb' ? session.courseCkb : lang === 'zh' ? session.courseZh : session.courseEn;
            const startDate = lang === 'ar' ? session.startDateAr : lang === 'ckb' ? session.startDateCkb : lang === 'zh' ? session.startDateZh : session.startDateEn;
            const schedule = lang === 'ar' ? session.scheduleAr : lang === 'ckb' ? session.scheduleCkb : lang === 'zh' ? session.scheduleZh : session.scheduleEn;
            const locationVal = lang === 'ar' ? session.locationAr : lang === 'ckb' ? session.locationCkb : lang === 'zh' ? session.locationZh : session.locationEn;

            return (
              <div
                key={session.id}
                className="bg-white border border-slate-100 p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 hover:border-red-100 transition-all duration-300 shadow-sm"
              >
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap items-center gap-4">
                    <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">
                      {course}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-red-50 text-[10px] font-black uppercase tracking-widest text-red-700">
                      <AlertCircle size={12} />
                      <span>{session.spotsRemaining} {t.sessionsSpotsRemaining}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-red-700 shrink-0" />
                      <span>{t.sessionsStartDate}: <span className="text-slate-900">{startDate}</span></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-red-700 shrink-0" />
                      <span>{t.sessionsSchedule}: <span className="text-slate-900">{schedule}</span></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-red-700 shrink-0" />
                      <span>{t.sessionsLocation}: <span className="text-slate-900">{locationVal}</span></span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 w-full sm:w-auto">
                  <Link
                    to={`${basePath}/enroll?session=${session.id}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white bg-red-700 hover:bg-red-800 transition-all shadow-sm"
                  >
                    <span>{t.sessionsEnrollCta}</span>
                    <ArrowRight size={14} className="ms-2 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
