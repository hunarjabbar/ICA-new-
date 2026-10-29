import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { SummitLayout } from '../../components/summit/SummitLayout';
import { SUMMIT_AGENDA } from '../../data/summitData';
import { 
  Calendar, Clock, MapPin, Download, Filter, 
  Sparkles, BookOpen, User, CheckCircle2, ArrowRight, Search, X
} from 'lucide-react';

export function SummitAgendaPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';
  
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSessionModal, setSelectedSessionModal] = useState<any | null>(null);

  const tracks = [
    { id: 'all', label: { en: 'All Tracks', ar: 'كافة المسارات', zh: '全部平行论坛', ckb: 'هەموو بەشەکان' } },
    { id: 'Plenary', label: { en: 'Strategic Plenary', ar: 'الجلسة العامة', zh: '大会主旨峰会', ckb: 'کۆبوونەوەی گشتی' } },
    { id: 'Sector Forum', label: { en: 'Sector Forums', ar: 'المنتديات القطاعية', zh: '产业专题论坛', ckb: 'کۆڕبەندی کەرتەکان' } },
    { id: 'Workshop', label: { en: 'Clearing & Risk Masterclass', ar: 'ورش العمل والخدمات', zh: '实战工坊与清算专题', ckb: 'وۆرکشۆپەکان' } },
    { id: 'B2B', label: { en: 'B2B Deal Rooms', ar: 'التوفيق وتوقيع الصفقات', zh: 'B2B对接与签约', ckb: 'ڕێککەوتننامەکان' } },
  ];

  const filteredSessions = SUMMIT_AGENDA.filter(s => {
    if (s.day !== activeDay) return false;
    if (selectedTrack !== 'all' && s.track !== selectedTrack) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const title = (s.title?.[lang] || s.title?.en || '').toLowerCase();
      const desc = (s.description?.[lang] || s.description?.en || '').toLowerCase();
      const loc = (s.location?.[lang] || s.location?.en || '').toLowerCase();
      if (!title.includes(q) && !desc.includes(q) && !loc.includes(q)) return false;
    }
    return true;
  });

  const downloadIcs = (session: any) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ICA//Summit 2026//EN
BEGIN:VEVENT
SUMMARY:${session.title.en}
DESCRIPTION:${session.description.en} - Knowledge Partner: Chinese Institute for Strategic and Economic Studies
LOCATION:${session.location.en}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `summit-session-${session.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <SummitLayout lang={lang} activeNav="agenda">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
        
        {/* Header Hero: Red and White Diplomatic Style */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
            <span className="text-xs font-black uppercase tracking-widest text-red-600">
              {lang === 'ar' ? 'الجدول الزمني الرسمي' : lang === 'zh' ? '官方全景议程' : lang === 'ckb' ? 'بەرنامەی فەرمی کارەکان' : 'Official Full Programme'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {lang === 'ar' ? 'برنامج قمة ومعرض السليمانية (٣ أيام)' : lang === 'zh' ? '伊拉克—中国经济峰会暨双边博览会三日全景日程' : lang === 'ckb' ? 'بەرنامەی ٣ ڕۆژەی لووتکە و پێشانگای ئابووری' : '3-Day Summit & Bilateral Expo Agenda'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            {lang === 'ar'
              ? 'تتوزع الجلسات على ٤ مسارات متوازية تشمل الجلسات الوزارية الدبلوماسية، والمنتديات القطاعية التخصصية، ومصادقات الصفقات التجارية، وورش العمل التنفيذية بإشراف المعهد الصيني للدراسات.'
              : 'Spanning ministerial plenaries, sector roundtables, bilateral B2B deal rooms, and Institute-led currency clearing & Sinosure risk masterclasses.'}
          </p>
        </div>

        {/* Day Selector & Track Filter Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          {/* Day Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[1, 2, 3].map((d) => (
              <button
                key={d}
                onClick={() => setActiveDay(d as 1 | 2 | 3)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeDay === d
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {lang === 'ar' ? `اليوم ${d}` : lang === 'zh' ? `第${d}天` : `Day ${d}`}
              </button>
            ))}
          </div>

          {/* Search Filter */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search sessions, topics..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden"
            />
          </div>
        </div>

        {/* Track Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {tracks.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTrack(t.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedTrack === t.id
                  ? 'bg-red-50 text-red-700 border border-red-300 font-black'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {t.label[lang] || t.label.en}
            </button>
          ))}
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {filteredSessions.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-600">No sessions match your active track and search filters.</p>
              <button
                onClick={() => { setSelectedTrack('all'); setSearchQuery(''); }}
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredSessions.map((s) => (
              <div
                key={s.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-red-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2.5 max-w-3xl">
                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
                    <span className="text-red-600">{s.track}</span>
                    <span className="text-slate-300" aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 text-slate-700 font-bold">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{s.time}</span>
                    </span>
                    <span className="text-slate-300" aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{s.location?.[lang] || s.location?.en || 'Main Auditorium'}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900">
                    {s.title?.[lang] || s.title?.en}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.description?.[lang] || s.description?.en}
                  </p>

                  {s.instituteResearchTitle && (
                    <div className="pt-1 flex items-center gap-1.5 text-xs font-bold text-red-600">
                      <BookOpen size={13} />
                      <span>{lang === 'ar' ? 'المرجع البحثي للمعهد:' : 'Institute Research:'}</span>
                      <Link to={`/${lang}/institute/publications`} className="underline hover:text-red-800">
                        {s.instituteResearchTitle?.[lang] || s.instituteResearchTitle?.en}
                      </Link>
                    </div>
                  )}
                </div>

                {/* Session Actions */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => setSelectedSessionModal(s)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 hover:border-red-600 text-slate-800 hover:text-red-600 text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => downloadIcs(s)}
                    className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                    title="Export to Calendar (.ICS)"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detailed Session Modal */}
        {selectedSessionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-red-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 relative">
              <button
                onClick={() => setSelectedSessionModal(null)}
                className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-b border-slate-100 pb-4 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-red-600 block">
                  {selectedSessionModal.track} · Day {selectedSessionModal.day}
                </span>
                <h3 className="text-xl font-black text-slate-900 leading-snug">
                  {selectedSessionModal.title?.[lang] || selectedSessionModal.title?.en}
                </h3>
              </div>

              <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <Clock className="w-4 h-4 text-red-600" />
                    <span>{selectedSessionModal.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span>{selectedSessionModal.location?.[lang] || selectedSessionModal.location?.en}</span>
                  </div>
                </div>

                <p>{selectedSessionModal.description?.[lang] || selectedSessionModal.description?.en}</p>

                {selectedSessionModal.instituteResearchTitle && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 space-y-1">
                    <span className="font-black text-red-700 block">Strategic Paper Reference</span>
                    <p className="text-red-900 font-medium">
                      {selectedSessionModal.instituteResearchTitle?.[lang] || selectedSessionModal.instituteResearchTitle?.en}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <button
                  onClick={() => downloadIcs(selectedSessionModal)}
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .ICS Calendar Event</span>
                </button>
                <button
                  onClick={() => setSelectedSessionModal(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </SummitLayout>
  );
}
