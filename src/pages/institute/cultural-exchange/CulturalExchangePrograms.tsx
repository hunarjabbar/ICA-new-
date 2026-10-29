import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  GraduationCap, Building2, Calendar, Clock, Search, 
  ExternalLink, ArrowLeft, ArrowRight, BookOpen, X, Share2, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCollection } from '../../../hooks/useFirestore';
import { CulturalExchangeCategory, CulturalExchangeProgram, Locale } from '../../../types';

export function CulturalExchangePrograms() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProgram, setActiveModalProgram] = useState<CulturalExchangeProgram | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Firestore Queries
  const { data: categories = [] } = useCollection<CulturalExchangeCategory>('cultural_categories');
  const { data: allPrograms = [], loading } = useCollection<CulturalExchangeProgram>('cultural_programs');

  // Client-side filtering
  const programs = allPrograms.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category?.slug === selectedCategory || p.categorySlug === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;
    
    const matchesSearch = 
      p.titleEn.toLowerCase().includes(q) || 
      (p.titleAr && p.titleAr.includes(q)) ||
      (p.titleZh && p.titleZh.includes(q)) ||
      (p.titleCkb && p.titleCkb.includes(q)) ||
      p.institutionName.toLowerCase().includes(q) ||
      (p.descriptionEn && p.descriptionEn.toLowerCase().includes(q));
    
    return matchesCategory && matchesSearch;
  });

  const getProgramTitle = (p: CulturalExchangeProgram) => {
    if (lang === 'ar' && p.titleAr) return p.titleAr;
    if (lang === 'zh' && p.titleZh) return p.titleZh;
    if (lang === 'ckb' && p.titleCkb) return p.titleCkb;
    return p.titleEn;
  };

  const getProgramDesc = (p: CulturalExchangeProgram) => {
    if (lang === 'ar' && p.descriptionAr) return p.descriptionAr;
    if (lang === 'zh' && p.descriptionZh) return p.descriptionZh;
    if (lang === 'ckb' && p.descriptionCkb) return p.descriptionCkb;
    return p.descriptionEn;
  };

  const getProgramDetails = (p: CulturalExchangeProgram) => {
    if (lang === 'ar' && p.detailsAr) return p.detailsAr;
    if (lang === 'zh' && p.detailsZh) return p.detailsZh;
    if (lang === 'ckb' && p.detailsCkb) return p.detailsCkb;
    return p.detailsEn || p.descriptionEn;
  };

  const getCategoryName = (c: CulturalExchangeCategory) => {
    if (lang === 'ar' && c.nameAr) return c.nameAr;
    if (lang === 'zh' && c.nameZh) return c.nameZh;
    if (lang === 'ckb' && c.nameCkb) return c.nameCkb;
    return c.nameEn;
  };

  const t = {
    title: lang === 'ar' ? 'دليل برامج التبادل الثقافي والأكاديمي الكامل' : lang === 'zh' ? '中伊人文交流与奖学金项目全景目录' : lang === 'ckb' ? 'تەواوی بەرنامەکانی ئاڵوگۆڕی کولتووری و ئەکادیمی' : 'All Cultural & Educational Exchange Programs',
    subtitle: lang === 'ar' ? 'استعرض كافة المنح الجامعية، زمالات الدراسات العليا، برامج انغماس الشباب، والاتفاقيات المدرسية المشتركة.' : lang === 'zh' ? '全景检索双边高校联合培养、学术驻留交流、青年研学以及两河流域古文明对话重点项目。' : lang === 'ckb' ? 'گەڕان بەدوای هەموو زەمالەی زانکۆیی، ڕاهێنانی لاوان و هاوبەشییە فەرمییەکان.' : 'Comprehensive registry of all university MOUs, student immersion fellowships, arts residencies, and civilizational dialogues.',
    backToLanding: lang === 'ar' ? 'العودة للتبادل الثقافي' : lang === 'zh' ? '返回文化交流主页' : lang === 'ckb' ? 'گەڕانەوە بۆ ئاڵوگۆڕی کولتووری' : 'Back to Cultural Exchange',
    allCategories: lang === 'ar' ? 'جميع المسارات' : lang === 'zh' ? '全部项目分类' : lang === 'ckb' ? 'هەموو جۆرەکان' : 'All Categories',
    searchPlaceholder: lang === 'ar' ? 'ابحث عن اسم البرنامج، الجامعة أو الشروط...' : lang === 'zh' ? '搜索合作高校、学科计划或申请条件...' : lang === 'ckb' ? 'گەڕان بەدوای زانکۆ یان بەرنامە...' : 'Search programs, universities, or keywords...',
    deadline: lang === 'ar' ? 'آخر موعد:' : lang === 'zh' ? '申请截止：' : lang === 'ckb' ? 'کۆتا وادە:' : 'Deadline:',
    learnMore: lang === 'ar' ? 'ملف البرنامج والمنهاج' : lang === 'zh' ? '查看项目简章' : lang === 'ckb' ? 'وردەکارییەکان' : 'Program Dossier',
    applyNow: lang === 'ar' ? 'التقديم والمراسلة' : lang === 'zh' ? '立即报名/联系' : lang === 'ckb' ? 'پێشکەشکردن' : 'Apply / Inquire',
    close: lang === 'ar' ? 'إغلاق' : lang === 'zh' ? '关闭' : lang === 'ckb' ? 'داخستن' : 'Close',
    share: lang === 'ar' ? 'نسخ رابط البرنامج' : lang === 'zh' ? '复制项目链接' : lang === 'ckb' ? 'کۆپیکردنی بەستەر' : 'Copy Link',
    copied: lang === 'ar' ? 'تم النسخ!' : lang === 'zh' ? '已复制！' : lang === 'ckb' ? 'کۆپی کرا!' : 'Copied!',
    navPartners: lang === 'ar' ? 'الجامعات الشريكة' : lang === 'zh' ? '合作院校' : lang === 'ckb' ? 'زانکۆ هاوبەشەکان' : 'Partner Universities',
    navApply: lang === 'ar' ? 'طلب التقديم' : lang === 'zh' ? '在线申请' : lang === 'ckb' ? 'داواکاری' : 'Apply / Inquire',
    navFaq: lang === 'ar' ? 'الأسئلة الشائعة' : lang === 'zh' ? '常见问题' : lang === 'ckb' ? 'پرسیارە باوەکان' : 'FAQ',
    navContact: lang === 'ar' ? 'مكتب الاتصال' : lang === 'zh' ? '学术联络' : lang === 'ckb' ? 'پەیوەندی' : 'Academic Contact',
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full flex flex-col font-sans bg-white">
      {/* SUBNAV STRIP */}
      <div className="bg-red-700 border-b border-red-800 sticky top-[92px] sm:top-[104px] lg:top-[120px] z-30 overflow-x-auto scrollbar-none text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 h-12">
          <div className="flex items-center gap-1 sm:gap-2 text-[11px] font-bold whitespace-nowrap">
            <Link to={`/${lang}/institute/services/cultural-exchange`} className="px-3 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition">
              {lang === 'ar' ? 'نظرة عامة' : lang === 'zh' ? '概览' : lang === 'ckb' ? 'پوختە' : 'Overview'}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/programs`} className="px-3 py-1.5 rounded-lg bg-white/20 text-white">
              {lang === 'ar' ? 'دليل البرامج' : lang === 'zh' ? '全部项目' : lang === 'ckb' ? 'بەرنامەکان' : 'All Programs'}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/partners`} className="px-3 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition">
              {t.navPartners}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/apply`} className="px-3 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition">
              {t.navApply}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/faq`} className="px-3 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition">
              {t.navFaq}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/contact`} className="px-3 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition">
              {t.navContact}
            </Link>
          </div>
          <Link
            to={`/${lang}/institute/services/cultural-exchange`}
            className="hidden sm:inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-white/80 hover:text-white transition"
          >
            <span>{t.backToLanding}</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <Link
            to={`/${lang}/institute/services/cultural-exchange`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-red-700 transition"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{t.backToLanding}</span>
          </Link>
        </div>

        <div className="space-y-4 mb-12">
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-neutral-900 uppercase tracking-tight">
            {t.title}
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
            {t.subtitle}
          </p>
          <div className="h-1 w-20 bg-red-700 mt-4" />
        </div>

        {/* Filter controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 pb-8 border-b border-neutral-200">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 rtl:pl-3 rtl:pr-10 pr-3 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-1 md:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition border ${
                selectedCategory === 'all'
                  ? 'bg-red-700 text-white border-red-700 shadow-md'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-red-400'
              }`}
            >
              {t.allCategories}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition border ${
                  selectedCategory === cat.slug
                    ? 'bg-red-700 text-white border-red-700 shadow-md'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-red-400'
                }`}
              >
                {getCategoryName(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-[420px] rounded-2xl bg-neutral-100 animate-pulse" />
              ))}
            </div>
          ) : programs.length === 0 ? (
            <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-20 text-center max-w-md mx-auto">
              <GraduationCap className="w-16 h-16 mx-auto text-neutral-300 mb-4" />
              <h3 className="text-xl font-black text-neutral-900 uppercase">No Programs Found</h3>
              <p className="text-sm text-neutral-500 mt-2">Try adjusting your filter or search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((prog, idx) => (
                <motion.div
                  key={prog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border-b-4 hover:border-b-red-700"
                >
                  <div>
                    <div className="relative h-56 w-full bg-neutral-100 overflow-hidden">
                      <img
                        src={prog.coverImage}
                        alt={getProgramTitle(prog)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-red-950/40 via-transparent to-transparent opacity-40" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white drop-shadow-md">
                        <Building2 className="w-4 h-4 text-red-400" />
                        <span className="text-[11px] font-black uppercase tracking-wider truncate">{prog.institutionName}</span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-neutral-500">{prog.eventDate || '2026 Academic Year'}</span>
                        {prog.applicationDeadline && (
                          <span className="text-red-700 bg-red-50 px-2 py-1 rounded-md border border-red-100">
                            {t.deadline} {prog.applicationDeadline}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-serif font-black text-neutral-900 leading-tight group-hover:text-red-700 transition">
                        {getProgramTitle(prog)}
                      </h3>

                      <p className="text-sm text-neutral-600 line-clamp-3 leading-relaxed">
                        {getProgramDesc(prog)}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 mt-auto flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalProgram(prog)}
                      className="flex-1 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest bg-neutral-100 text-neutral-900 hover:bg-neutral-200 transition flex items-center justify-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{t.learnMore}</span>
                    </button>

                    <Link
                      to={`/${lang}/institute/services/cultural-exchange/programs/${prog.slug || prog.id}`}
                      className="px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest border border-neutral-200 hover:border-red-400 hover:text-red-700 transition flex items-center justify-center"
                    >
                      <span>Dossier</span>
                    </Link>

                    <Link
                      to={`/${lang}/institute/services/cultural-exchange/apply?program=${prog.id}`}
                      className="px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest bg-red-700 text-white hover:bg-red-800 transition shadow-md shadow-red-900/10 flex items-center justify-center"
                    >
                      <span>Apply</span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal Dossier */}
      <AnimatePresence>
        {activeModalProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-white/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-[32px] shadow-2xl overflow-hidden my-8 border border-neutral-200"
            >
              <div className="relative h-72 w-full bg-neutral-100">
                <img
                  src={activeModalProgram.coverImage}
                  alt={getProgramTitle(activeModalProgram)}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-950/60 via-transparent to-transparent" />

                <button
                  onClick={() => setActiveModalProgram(null)}
                  className="absolute top-6 right-6 rtl:right-auto rtl:left-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition border border-white/30"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-6 left-8 right-8 text-white">
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-red-700 text-white border border-red-600 inline-block mb-3">
                    {activeModalProgram.category ? getCategoryName(activeModalProgram.category) : 'General'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-black drop-shadow-lg leading-tight">
                    {getProgramTitle(activeModalProgram)}
                  </h2>
                  <div className="mt-2 flex items-center gap-2 text-red-200 font-bold text-xs">
                    <Building2 className="w-4 h-4" />
                    <span className="uppercase tracking-wider">{activeModalProgram.institutionName}</span>
                  </div>
                </div>
              </div>

              <div className="p-8 sm:p-10 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 gap-6 p-6 rounded-2xl bg-neutral-50 border border-neutral-100">
                  <div>
                    <span className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Duration Cycle</span>
                    <span className="text-sm font-bold text-neutral-900">{activeModalProgram.eventDate || 'Flexible Batch'}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Deadline</span>
                    <span className="text-sm font-bold text-red-700">{activeModalProgram.applicationDeadline || 'Rolling Admissions'}</span>
                  </div>
                </div>

                <div className="prose prose-sm max-w-none text-neutral-600 leading-relaxed">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-neutral-900 mb-3 border-l-4 border-red-700 pl-3">
                    Program Overview & Syllabus
                  </h4>
                  <p className="whitespace-pre-line text-sm">
                    {getProgramDetails(activeModalProgram)}
                  </p>
                </div>

                {activeModalProgram.eligibility && (
                  <div className="p-6 rounded-2xl bg-red-50 border border-red-100">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-red-800 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Academic Eligibility Criteria</span>
                    </h4>
                    <p className="text-sm text-neutral-700 leading-relaxed">
                      {activeModalProgram.eligibility}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-neutral-100 flex items-center justify-between gap-4 bg-neutral-50/50">
                <button
                  onClick={handleCopyLink}
                  className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-900 transition flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedLink ? t.copied : t.share}</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveModalProgram(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-neutral-500 hover:bg-neutral-100 transition"
                  >
                    {t.close}
                  </button>
                  <Link
                    to={`/${lang}/institute/services/cultural-exchange/apply?program=${activeModalProgram.id}`}
                    onClick={() => setActiveModalProgram(null)}
                    className="px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest bg-red-700 hover:bg-red-800 text-white transition shadow-lg shadow-red-900/10 flex items-center gap-2"
                  >
                    <span>{t.applyNow}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CulturalExchangePrograms;
