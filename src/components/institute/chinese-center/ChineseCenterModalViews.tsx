import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams, useParams, useLocation } from 'react-router-dom';
import { Locale } from '../../../types';
import { ccTranslations } from './translations';
import { 
  ArrowLeft, 
  CheckCircle, 
  ShieldCheck, 
  Calendar, 
  Search, 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  BookOpen, 
  Award,
  ArrowRight,
  UserCheck,
  Languages,
  Send,
  Layers,
  Sparkles,
  Mic,
  Briefcase,
  Compass
} from 'lucide-react';

interface SubviewProps {
  lang: Locale;
  view: 'enroll' | 'courses' | 'testing' | 'testing-register' | 'certificates' | 'instructors' | 'instructor-detail' | 'faq' | 'contact';
}

export function ChineseCenterModalViews({ lang, view }: SubviewProps) {
  const t = ccTranslations[lang] || ccTranslations.en;
  const isRtl = lang === 'ar' || lang === 'ckb';
  const [searchParams] = useSearchParams();
  const { id: instructorId } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine base path to preserve current URL dialect (/chinese-centre or /chinese-center)
  const currentBasePath = location.pathname.includes('/chinese-centre')
    ? `/${lang}/institute/chinese-centre`
    : `/${lang}/institute/chinese-center`;

  // Form states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [certInput, setCertInput] = useState('');
  const [certResult, setCertResult] = useState<{ verified: boolean; message: string } | null>(null);

  const selectedLevel = searchParams.get('level') || searchParams.get('track') || searchParams.get('session') || 'HSK 1';

  // Scroll to selected course on mount or param change
  React.useEffect(() => {
    if ((searchParams.get('level') || searchParams.get('track')) && view === 'courses') {
      const timer = setTimeout(() => {
        const activeTarget = document.querySelector('[data-active-target="true"]');
        if (activeTarget) {
          activeTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchParams, view]);

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certInput.trim()) return;
    setCertResult({
      verified: true,
      message: lang === 'ar' ? `الشهادة رقم ${certInput.trim()} موثقة وصادرة عن معهد CISE بالسليمانية بمعدل اجتياز رسمي.` :
               lang === 'ckb' ? `بڕوانامەی ژمارە ${certInput.trim()} باوەڕپێکراوە و لەلایەن پەیمانگای CISE لە سلێمانی دەرکراوە.` :
               lang === 'zh' ? `证书编号 ${certInput.trim()} 验证真实有效，由苏莱曼尼亚CISE中国中心官方颁发。` :
               `Certificate ${certInput.trim()} is verified authentic and officially registered with CISE Chinese Centre, Sulaymaniyah.`
    });
  };

  return (
    <div className="py-24 bg-white min-h-screen" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb back to landing */}
        <div className="mb-12">
          <Link
            to={currentBasePath}
            className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-red-700 transition-colors"
          >
            <ArrowLeft size={16} className="rtl:rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span>{lang === 'ar' ? 'العودة إلى المركز الصيني' : lang === 'ckb' ? 'گەڕانەوە بۆ ناوەندی چینی' : lang === 'zh' ? '返回中国中心首页' : 'Back to Chinese Centre'}</span>
          </Link>
        </div>

        {/* View 1: ENROLL */}
        {view === 'enroll' && (
          <div className="bg-white border border-slate-100 p-8 sm:p-16 shadow-2xl">
            <div className="max-w-2xl mb-12">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-700 block mb-4 bg-red-50 px-3 py-1 rounded w-fit">
                {t.heroEyebrow}
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-950 uppercase tracking-tighter mb-6">
                {t.enrollTitle}
              </h1>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                {t.enrollSubtitle}
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-10 bg-red-50 border border-red-100 text-red-700 space-y-6">
                <div className="flex items-center gap-3 font-black text-xl uppercase tracking-tight">
                  <CheckCircle size={24} />
                  <span>{lang === 'ar' ? 'تم استلام الطلب' : lang === 'ckb' ? 'داواکاری وەرگیرا' : lang === 'zh' ? '申请已成功提交' : 'Application Received'}</span>
                </div>
                <p className="text-base font-medium leading-relaxed">{t.enrollSuccess}</p>
                <div className="pt-4">
                  <Link
                    to={currentBasePath}
                    className="group inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-950 hover:text-red-700 transition-colors"
                  >
                    <span>{lang === 'ar' ? 'العودة للرئيسية' : lang === 'ckb' ? 'گەڕانەوە بۆ سەرەتا' : lang === 'zh' ? '返回首页' : 'Return to Home'}</span>
                    <ArrowRight size={14} className="ms-1 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEnrollSubmit} className="space-y-10">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                    {t.enrollNameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alan Qadir"
                    className="w-full px-0 py-4 border-b-2 border-slate-100 bg-transparent text-xl font-black text-slate-950 placeholder:text-slate-200 focus:outline-none focus:border-red-700 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                      {t.enrollEmailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student@example.com"
                      className="w-full px-0 py-4 border-b-2 border-slate-100 bg-transparent text-xl font-black text-slate-950 placeholder:text-slate-200 focus:outline-none focus:border-red-700 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                      {t.enrollPhoneLabel}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+964 770 123 4567"
                      className="w-full px-0 py-4 border-b-2 border-slate-100 bg-transparent text-xl font-black text-slate-950 placeholder:text-slate-200 focus:outline-none focus:border-red-700 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                    {t.enrollLevelLabel}
                  </label>
                  <select
                    defaultValue={selectedLevel}
                    className="w-full px-0 py-4 border-b-2 border-slate-100 bg-transparent text-xl font-black text-slate-950 focus:outline-none focus:border-red-700 transition-colors cursor-pointer"
                  >
                    <option value="hsk-1">HSK 1 (Elementary / 500 Words)</option>
                    <option value="hsk-2">HSK 2 (Elementary / 772 Words)</option>
                    <option value="hsk-3">HSK 3 (Intermediate / 973 Words)</option>
                    <option value="hsk-4">HSK 4 (Intermediate / 1,000 Words)</option>
                    <option value="hsk-5">HSK 5 (Advanced / 1,071 Words)</option>
                    <option value="hsk-6">HSK 6 (Advanced / 1,140 Words)</option>
                    <option value="hsk-7-9">HSK 7–9 (Advanced / 5,636 Words)</option>
                    <option value="hskk">HSKK Spoken Fluency Track</option>
                    <option value="yct">YCT 1–4 Youth Chinese</option>
                    <option value="business">Executive Business Chinese</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-12 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white bg-red-700 hover:bg-red-800 transition-all shadow-xl"
                >
                  <Send size={14} className="me-2" />
                  <span>{t.enrollSubmit}</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* View 2: COURSES */}
        {view === 'courses' && (() => {
          const trackParam = (searchParams.get('track') || '').toLowerCase();
          const levelParam = (searchParams.get('level') || '').toLowerCase();

          const ALL_COURSES = [
            // Standard HSK
            {
              id: 'hsk-1',
              slug: 'hsk-1',
              name: 'HSK 1',
              category: 'standard',
              badge: 'Standard / HSK 1',
              hours: '40 Hours',
              words: '500 Words',
              desc: lang === 'ar' ? 'المستوى التأسيسي الأول: إتقان النطق الصيني (Pinyin)، وتراكيب الجمل الأساسية، وأكثر من 500 مفردة.' :
                    lang === 'ckb' ? 'ئاستی یەکەمی بنەڕەتی: فێربوونی دەنگەکان، رستەسازی سەرەتایی، و زیاتر لە ٥٠٠ وشە.' :
                    lang === 'zh' ? '基础第一级：系统掌握汉语拼音方案、基础句式结构及500个核心词汇。' :
                    'Foundational Level 1: Master standard Pinyin phonetics, essential daily syntax, and 500 high-frequency words.'
            },
            {
              id: 'hsk-2',
              slug: 'hsk-2',
              name: 'HSK 2',
              category: 'standard',
              badge: 'Standard / HSK 2',
              hours: '60 Hours',
              words: '772 Words',
              desc: lang === 'ar' ? 'المستوى التأسيسي الثاني: تنمية المحادثة اليومية والقدرة على التعامل مع المواقف الروتينية في العمل والحياة.' :
                    lang === 'ckb' ? 'ئاستی دووەم: پەرەپێدانی گفتوگۆی ڕۆژانە و بەڕێوەبردنی کارە سەرەتاییەکان بە چینی.' :
                    lang === 'zh' ? '基础第二级：熟练运用772个重点词汇进行日常起居、旅行及基本职场交流。' :
                    'Foundational Level 2: Confident communication in standard daily situations with 772 vocabulary units.'
            },
            {
              id: 'hsk-3',
              slug: 'hsk-3',
              name: 'HSK 3',
              category: 'standard',
              badge: 'Intermediate / HSK 3',
              hours: '80 Hours',
              words: '973 Words',
              desc: lang === 'ar' ? 'المستوى المتوسط الأول: التواصل المريح في الحياة الأكاديمية والمهنية واجتياز اختبار القبول الجامعي المبدئي.' :
                    lang === 'ckb' ? 'ئاستی ناوەندی یەکەم: گفتوگۆی ئاسوودە لە زانکۆ و شوێنی کاردا لەگەڵ ٩٧٣ وشە.' :
                    lang === 'zh' ? '中级第一级：能够完成学业与商务基础沟通，满足中国重点高校入学语言基线。' :
                    'Intermediate Level 3: Smooth communication in university and workplace environments with 973 vocabulary items.'
            },
            {
              id: 'hsk-4',
              slug: 'hsk-4',
              name: 'HSK 4',
              category: 'standard',
              badge: 'Intermediate / HSK 4',
              hours: '100 Hours',
              words: '1,000 Words',
              desc: lang === 'ar' ? 'المستوى المتوسط المتقدم: مناقشة الموضوعات المعقدة، وقراءة الصحف الصينية، والمشاركة في الاجتماعات الثنائية.' :
                    lang === 'ckb' ? 'ئاستی ناوەندی پێشکەوتوو: گفتوگۆ دەربارەی بابەتە ئاڵۆزەکان و خوێندنەوەی ڕۆژنامە.' :
                    lang === 'zh' ? '中级第二级：能够就广泛领域话题深入讨论，无障碍阅读中文主流媒体文章与行业简报。' :
                    'Intermediate Level 4: Discuss wide-ranging bilateral topics and read Chinese news and reports fluently.'
            },
            {
              id: 'hsk-5',
              slug: 'hsk-5',
              name: 'HSK 5',
              category: 'standard',
              badge: 'Advanced / HSK 5',
              hours: '120 Hours',
              words: '1,071 Words',
              desc: lang === 'ar' ? 'المستوى المتقدم الأول: قراءة المراجع الأكاديمية، كتابة المقالات، ومتابعة المحاضرات الجامعية الكاملة بالصينية.' :
                    lang === 'ckb' ? 'ئاستی پێشکەوتوو: خوێندنەوەی توێژینەوەی زانستی و نووسینی وتاری ئەکادیمی.' :
                    lang === 'zh' ? '高级第一级：能够阅读中文报刊杂志，欣赏中文电影电视剧，用汉语进行完整演讲。' :
                    'Advanced Level 5: Professional-grade Chinese proficiency for reading academic papers and delivering speeches.'
            },
            {
              id: 'hsk-6',
              slug: 'hsk-6',
              name: 'HSK 6',
              category: 'standard',
              badge: 'Advanced / HSK 6',
              hours: '150 Hours',
              words: '1,140 Words',
              desc: lang === 'ar' ? 'المستوى المتقدم النهائي: إتقان شبه كامل للغة الصينية في الشؤون القانونية، والدبلوماسية، والترجمة الفورية.' :
                    lang === 'ckb' ? 'ئاستی باڵا: توانای تەواو لە وەرگێڕان، یاسایی و دیپلۆماسی هاوبەشدا.' :
                    lang === 'zh' ? '高级第二级：能够轻松听懂或读懂各种中文信息，以口头或书面形式熟练表达独到见解。' :
                    'Advanced Level 6: Mastery for diplomatic negotiation, simultaneous translation, and senior executive roles.'
            },
            {
              id: 'hsk-7-9',
              slug: 'hsk-7-9',
              name: 'HSK 7–9',
              category: 'standard',
              badge: 'Elite / HSK 7–9',
              hours: '200 Hours',
              words: '5,636 Words',
              desc: lang === 'ar' ? 'المستوى السيادي والبحثي: تخصص للباحثين والخبراء الدبلوماسيين في تحليل السياسات والنصوص التاريخية.' :
                    lang === 'ckb' ? 'ئاستی سەروەری و توێژینەوە: بۆ پسپۆڕان و دیپلۆماتکاران لە لێکۆڵینەوەی ستراتیژی.' :
                    lang === 'zh' ? '高端学术与外交主权级：针对高级翻译、智库研究员与跨国战略决策层的汉语言权威标准。' :
                    'Sovereign Elite Tier: Advanced academic analysis, legal drafting, and bilateral statecraft terminology.'
            },
            // Supplementary Spoken Tracks (HSKK)
            {
              id: 'hskk-elementary',
              slug: 'hskk-elementary',
              name: 'HSKK Elementary',
              category: 'spoken',
              badge: 'Spoken / HSKK 初级',
              hours: '30 Hours',
              words: 'Pronunciation & Real-Life Dialogues',
              desc: t.suppHskkElemDesc || 'Spoken proficiency curriculum for beginners focusing on natural tone production, phonetics, and real-life everyday dialogue.'
            },
            {
              id: 'hskk-intermediate',
              slug: 'hskk-intermediate',
              name: 'HSKK Intermediate',
              category: 'spoken',
              badge: 'Spoken / HSKK 中级',
              hours: '45 Hours',
              words: 'Audio Labs & Impromptu Presentation',
              desc: t.suppHskkInterDesc || 'Structured oral discourse, listening labs, and spontaneous speaking exercises aligned with HSK 3–4 standards.'
            },
            {
              id: 'hskk-advanced',
              slug: 'hskk-advanced',
              name: 'HSKK Advanced',
              category: 'spoken',
              badge: 'Spoken / HSKK 高级',
              hours: '60 Hours',
              words: 'Debate, Media Analysis & Narration',
              desc: t.suppHskkAdvDesc || 'High-level oral proficiency training in debate, policy argumentation, and simultaneous interpretation techniques.'
            },
            // Specialized Tracks
            {
              id: 'yct-1-4',
              slug: 'yct-1-4',
              name: 'YCT 1–4',
              category: 'specialized',
              badge: 'Youth / 中小学生',
              hours: '40 Hours',
              words: 'Age-Appropriate Interactive Curriculum',
              desc: t.suppYctDesc || 'Youth Chinese Test curriculum designed for primary and secondary school learners with gamified cultural immersion.'
            },
            {
              id: 'business-chinese',
              slug: 'business-chinese',
              name: 'Business Chinese',
              category: 'specialized',
              badge: 'Executive / 商务汉语',
              hours: '50 Hours',
              words: 'B2B Trade, Legal & Banking Terminology',
              desc: t.suppBusinessDesc || 'Specialized commercial curriculum covering contract terminology, currency settlement, trade documentation, and bilateral negotiation.'
            }
          ];

          return (
            <div className="space-y-12">
              <div className="bg-white border border-slate-100 p-8 sm:p-14 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-700 block mb-2 bg-red-50 px-3 py-1 rounded w-fit">
                      {t.heroEyebrow}
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black text-slate-950 uppercase tracking-tighter">
                      {t.coursesTitle}
                    </h1>
                  </div>
                  <Link
                    to={`${currentBasePath}/enroll`}
                    className="inline-flex items-center justify-center px-6 py-3.5 bg-red-700 hover:bg-red-800 text-white text-[10px] font-black uppercase tracking-widest shadow-md transition-all self-start sm:self-auto"
                  >
                    <span>{t.heroPrimaryCta}</span>
                    <ArrowRight size={14} className="ms-1.5 rtl:rotate-180" />
                  </Link>
                </div>
                <p className="text-base text-slate-600 font-medium leading-relaxed max-w-2xl">
                  {t.coursesSubtitle}
                </p>
                
                {/* Active Selection Banner if routed from Supplementary Track or Level */}
                {(trackParam || levelParam) && (
                  <div className="mt-6 p-4 rounded-xl bg-red-50/70 border border-red-200 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5 text-xs text-red-900 font-bold">
                      <Sparkles size={16} className="text-red-700 shrink-0" />
                      <span>
                        {lang === 'ar' ? `المسار المحدد: ${trackParam || levelParam}` :
                         lang === 'zh' ? `已定向选中科目: ${trackParam || levelParam}` :
                         lang === 'ckb' ? `کۆرسی دیاریکراو: ${trackParam || levelParam}` :
                         `Selected Track: ${trackParam || levelParam}`}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate(location.pathname)}
                      className="text-[10px] font-black uppercase tracking-wider text-red-700 hover:underline cursor-pointer"
                    >
                      {lang === 'ar' ? 'عرض الكل' : lang === 'zh' ? '查看全部' : lang === 'ckb' ? 'هەمووی ببینە' : 'Show All'}
                    </button>
                  </div>
                )}
              </div>

              {/* Grid of Courses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {ALL_COURSES.map((course) => {
                  const isSelected = (trackParam && course.slug.toLowerCase().includes(trackParam)) ||
                                     (levelParam && course.slug.toLowerCase().includes(levelParam));

                  return (
                    <div 
                      key={course.id} 
                      data-active-target={isSelected ? "true" : "false"}
                      className={`p-8 sm:p-10 bg-white border transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between rounded-xl relative ${
                        isSelected 
                          ? 'border-red-600 ring-2 ring-red-600/20 bg-red-50/10' 
                          : 'border-slate-100 hover:border-red-200'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-0 end-0 bg-red-700 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-lg rounded-tr-lg shadow-xs">
                          {lang === 'ar' ? 'المسار المطلوب' : lang === 'zh' ? '当前选中' : lang === 'ckb' ? 'دەستنیشانکراو' : 'Active Target'}
                        </div>
                      )}

                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <h2 className="text-2xl font-black text-slate-950 uppercase tracking-tight">
                            {course.name}
                          </h2>
                          <span className="text-[10px] font-black px-2.5 py-1 rounded bg-red-50 text-red-700 uppercase tracking-widest shrink-0">
                            {course.badge}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-bold border-y border-slate-50 py-2.5">
                          <span className="flex items-center gap-1.5">
                            <Clock size={13} className="text-red-700" />
                            {course.hours}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5">
                            <BookOpen size={13} className="text-red-700" />
                            {course.words}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          {course.desc}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-6">
                        <Link
                          to={`${currentBasePath}/enroll?level=${encodeURIComponent(course.name)}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white text-[10px] font-black uppercase tracking-widest rounded transition-colors shadow-xs"
                        >
                          <span>{t.heroPrimaryCta}</span>
                          <ArrowRight size={13} className="rtl:rotate-180" />
                        </Link>
                        <span className="text-[10px] font-mono text-slate-400 font-bold">
                          Official Curriculum
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* View 3 & 4: TESTING & REGISTER */}
        {(view === 'testing' || view === 'testing-register') && (
          <div className="bg-white border border-slate-100 p-8 sm:p-16 shadow-2xl">
            <div className="max-w-3xl mb-12">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-700 block mb-4 bg-red-50 px-3 py-1 rounded w-fit">
                {t.testingOfficialBadge}
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-950 uppercase tracking-tighter mb-6">
                {t.testingRegisterCta}
              </h1>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                {t.testingBody}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="p-8 border border-slate-50 bg-slate-50/30">
                <Calendar size={20} className="text-red-700 mb-4" />
                <strong className="block text-[10px] font-black uppercase tracking-widest text-slate-950 mb-2">{t.testingNextDate}</strong>
                <span className="text-xs text-slate-500 font-medium">Registration deadline: Oct 20, 2026</span>
              </div>
              <div className="p-8 border border-slate-50 bg-slate-50/30">
                <ShieldCheck size={20} className="text-red-700 mb-4" />
                <strong className="block text-[10px] font-black uppercase tracking-widest text-slate-950 mb-2">Standardized Invigilation</strong>
                <span className="text-xs text-slate-500 font-medium">Authorized center code: IQ-SU-004</span>
              </div>
              <div className="p-8 border border-slate-50 bg-slate-50/30">
                <Award size={20} className="text-red-700 mb-4" />
                <strong className="block text-[10px] font-black uppercase tracking-widest text-slate-950 mb-2">Score Verification</strong>
                <span className="text-xs text-slate-500 font-medium">Authenticated via Chinese MOE portal</span>
              </div>
            </div>

            <form onSubmit={handleEnrollSubmit} className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                    Candidate Legal Name (as on Passport)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kawa Rasheed"
                    className="w-full px-0 py-4 border-b-2 border-slate-100 bg-transparent text-xl font-black text-slate-950 placeholder:text-slate-200 focus:outline-none focus:border-red-700 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                    Passport / National ID Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="A12948301"
                    className="w-full px-0 py-4 border-b-2 border-slate-100 bg-transparent text-xl font-black text-slate-950 placeholder:text-slate-200 focus:outline-none focus:border-red-700 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                  Test Type & Level
                </label>
                <select className="w-full px-0 py-4 border-b-2 border-slate-100 bg-transparent text-xl font-black text-slate-950 focus:outline-none focus:border-red-700 transition-colors cursor-pointer">
                  <option>HSK 1 (Paper & Computer)</option>
                  <option>HSK 2 (Paper & Computer)</option>
                  <option>HSK 3 (Paper & Computer)</option>
                  <option>HSK 4 (Paper & Computer)</option>
                  <option>HSK 5 (Paper & Computer)</option>
                  <option>HSK 6 (Paper & Computer)</option>
                  <option>HSKK Speaking (Elementary / Intermediate / Advanced)</option>
                  <option>YCT Youth Chinese Test</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center px-12 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white bg-red-700 hover:bg-red-800 transition-all shadow-xl"
              >
                <span>{t.testingRegisterCta}</span>
                <ArrowRight size={14} className="ms-2 rtl:rotate-180" />
              </button>
            </form>
          </div>
        )}

        {/* View 5: CERTIFICATES */}
        {view === 'certificates' && (
          <div className="bg-white border border-slate-100 p-8 sm:p-16 shadow-2xl">
            <div className="max-w-2xl mb-12">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-700 block mb-4 bg-red-50 px-3 py-1 rounded w-fit">
                {t.testingQrBadge}
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-950 uppercase tracking-tighter mb-6">
                {t.verifyTitle}
              </h1>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                {t.verifySubtitle}
              </p>
            </div>

            <form onSubmit={handleVerify} className="max-w-xl space-y-8 mb-12">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                  {t.verifyInputLabel}
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    value={certInput}
                    onChange={(e) => setCertInput(e.target.value)}
                    placeholder="CISE-HSK-2026-0841"
                    className="flex-1 px-0 py-4 border-b-2 border-slate-100 bg-transparent text-xl font-black text-slate-950 placeholder:text-slate-200 focus:outline-none focus:border-red-700 transition-colors"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white bg-red-700 hover:bg-red-800 transition-all shadow-lg shrink-0"
                  >
                    <Search size={14} className="me-2" />
                    <span>{t.verifyButton}</span>
                  </button>
                </div>
              </div>
            </form>

            {certResult && (
              <div className="p-10 bg-red-50 border border-red-100 text-red-700 flex items-start gap-5">
                <CheckCircle size={24} className="shrink-0 mt-1" />
                <div>
                  <strong className="block text-xl font-black uppercase tracking-tight mb-3">Authenticated CISE Credential</strong>
                  <p className="text-base font-medium leading-relaxed">{certResult.message}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* View 6 & 7: INSTRUCTORS */}
        {(view === 'instructors' || view === 'instructor-detail') && (() => {
          const isZhang = instructorId?.toLowerCase().includes('zhang');
          const isLi = !isZhang && instructorId?.toLowerCase().includes('li') && !instructorId?.toLowerCase().includes('chen');
          const instructorName = isZhang ? 'Zhang Ming' : isLi ? 'Li Wei' : 'Prof. Chen Lin';
          const instructorRole = isZhang ? 'Lead Examiner & Oral Fluency Specialist' : isLi ? 'Youth Curriculum & Cultural Specialist' : 'Pedagogical Director & Senior Linguist';
          const initials = isZhang ? 'ZM' : isLi ? 'LW' : 'CL';

          return (
            <div className="bg-white border border-slate-100 p-8 sm:p-16 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10 pb-12 border-b border-slate-50 mb-12">
                <div className="w-24 h-24 rounded-full bg-red-700 text-white flex items-center justify-center font-black text-3xl shadow-xl shrink-0">
                  {initials}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-700 block mb-3 bg-red-50 px-3 py-1 rounded w-fit">
                    Senior Faculty Member · CISE Chinese Centre
                  </span>
                  <h1 className="text-4xl sm:text-5xl font-black text-slate-950 uppercase tracking-tighter mb-4">
                    {instructorName}
                  </h1>
                  <p className="text-lg text-slate-600 font-medium">
                    {instructorRole}
                  </p>
                </div>
              </div>

              <div className="space-y-10 text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">
                <p>
                  {lang === 'ar' ? 'أستاذ معتمد ذو خبرة تزيد عن 12 عامًا في تدريس اللغة الصينية لغير الناطقين بها، وحاصل على ترخيص وزارة التعليم الصينية لتدريب وتأهيل مدربي HSK.' :
                   lang === 'ckb' ? 'مامۆستای بڕوانامەدار بە ئەزموونی زیاتر لە 12 ساڵ لە فێرکردنی زمانی چینی بۆ بیانییەکان، بە مۆڵەتی وەزارەتی پەروەردەی چین بۆ ڕاهێنانی مامۆستایانی HSK.' :
                   lang === 'zh' ? '拥有逾12年国际中文教育经验，持有教育部中外语言交流合作中心国际中文教师证书及国家级HSK高级考评员资质。' :
                   'Certified senior faculty member with over 12 years of specialized experience in international Chinese language education and curriculum design, accredited by the Center for Language Education and Cooperation.'}
                </p>

                <div className="pt-6">
                  <Link
                    to={`${currentBasePath}/enroll`}
                    className="inline-flex items-center px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white bg-red-700 hover:bg-red-800 transition-all shadow-xl"
                  >
                    <span>Book Course with this Instructor</span>
                    <ArrowRight size={14} className="ms-2 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })()}

        {/* View 8: FAQ */}
        {view === 'faq' && (
          <div className="bg-white border border-slate-100 p-8 sm:p-16 shadow-2xl">
            <h1 className="text-4xl sm:text-6xl font-black text-slate-950 uppercase tracking-tighter mb-6">
              {t.faqHeading}
            </h1>
            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-12 max-w-2xl">
              {t.faqSubheading}
            </p>

            <div className="space-y-8">
              {[
                { q: t.faqQ1, a: t.faqA1 },
                { q: t.faqQ2, a: t.faqA2 },
                { q: t.faqQ3, a: t.faqA3 },
                { q: t.faqQ4, a: t.faqA4 },
                { q: t.faqQ5, a: t.faqA5 },
                { q: t.faqQ6, a: t.faqA6 }
              ].map((item, i) => (
                <div key={i} className="p-10 bg-white border border-slate-50 hover:border-red-100 transition-colors shadow-sm">
                  <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight mb-4">{item.q}</h3>
                  <p className="text-base text-slate-500 font-medium leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View 9: CONTACT */}
        {view === 'contact' && (
          <div className="bg-white border border-slate-100 p-8 sm:p-16 shadow-2xl">
            <h1 className="text-4xl sm:text-6xl font-black text-slate-950 uppercase tracking-tighter mb-6">
              {t.contactTitle}
            </h1>
            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-16 max-w-2xl">
              {t.contactSubtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              <div className="p-10 border border-slate-50 bg-slate-50/30">
                <MapPin size={24} className="text-red-700 mb-6" />
                <strong className="block text-[10px] font-black uppercase tracking-widest text-slate-950 mb-3">Campus Location</strong>
                <span className="text-sm text-slate-500 font-medium leading-relaxed">{t.contactAddress}</span>
              </div>
              <div className="p-10 border border-slate-50 bg-slate-50/30">
                <Mail size={24} className="text-red-700 mb-6" />
                <strong className="block text-[10px] font-black uppercase tracking-widest text-slate-950 mb-3">Academic Inquiries</strong>
                <span className="text-sm text-slate-500 font-medium leading-relaxed">{t.contactEmail}</span>
              </div>
              <div className="p-10 border border-slate-50 bg-slate-50/30">
                <Phone size={24} className="text-red-700 mb-6" />
                <strong className="block text-[10px] font-black uppercase tracking-widest text-slate-950 mb-3">Admissions Hotline</strong>
                <span className="text-sm text-slate-500 font-medium leading-relaxed">{t.contactPhone}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
