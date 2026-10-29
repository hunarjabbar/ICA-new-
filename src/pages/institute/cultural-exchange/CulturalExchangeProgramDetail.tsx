import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CulturalExchangeProgram, Locale } from '../../../types';
import {
  GraduationCap, Building2, Clock, ArrowLeft, ArrowRight,
  Share2, CheckCircle2, Award, Send, ShieldCheck
} from 'lucide-react';
import { useDocument } from '../../../hooks/useFirestore';

export function CulturalExchangeProgramDetail() {
  const { lang = 'en', slug } = useParams<{ lang: Locale; slug: string }>();
  const isRtl = lang === 'ar' || lang === 'ckb';
  const [copiedLink, setCopiedLink] = React.useState(false);

  const { data: program, loading: isLoading, error: isError } = useDocument<CulturalExchangeProgram>('cultural_programs', slug || '');

  const getProgramTitle = (p?: CulturalExchangeProgram) => {
    if (!p) return '';
    if (lang === 'ar' && p.titleAr) return p.titleAr;
    if (lang === 'zh' && p.titleZh) return p.titleZh;
    if (lang === 'ckb' && p.titleCkb) return p.titleCkb;
    return p.titleEn;
  };

  const getProgramDesc = (p?: CulturalExchangeProgram) => {
    if (!p) return '';
    if (lang === 'ar' && p.descriptionAr) return p.descriptionAr;
    if (lang === 'zh' && p.descriptionZh) return p.descriptionZh;
    if (lang === 'ckb' && p.descriptionCkb) return p.descriptionCkb;
    return p.descriptionEn;
  };

  const getProgramDetails = (p?: CulturalExchangeProgram) => {
    if (!p) return '';
    if (lang === 'ar' && p.detailsAr) return p.detailsAr;
    if (lang === 'zh' && p.detailsZh) return p.detailsZh;
    if (lang === 'ckb' && p.detailsCkb) return p.detailsCkb;
    return p.detailsEn || p.descriptionEn;
  };

  const t = {
    backToPrograms: lang === 'ar' ? 'العودة لدليل البرامج' : lang === 'zh' ? '返回全部交流项目' : lang === 'ckb' ? 'گەڕانەوە بۆ بەرنامەکان' : 'Back to Programs',
    applyForProgram: lang === 'ar' ? 'تقديم طلب الالتحاق' : lang === 'zh' ? '立即申请此项目' : lang === 'ckb' ? 'پێشکەشکردنی داواکاری' : 'Apply for this Program',
    share: lang === 'ar' ? 'مشاركة الرابط' : lang === 'zh' ? '分享项目' : lang === 'ckb' ? 'هاوبەشکردن' : 'Share Dossier',
    copied: lang === 'ar' ? 'تم النسخ!' : lang === 'zh' ? '已复制！' : lang === 'ckb' ? 'کۆپی کرا!' : 'Copied!',
    dossierHeading: lang === 'ar' ? 'الملف الأكاديمي والمحتوى التفصيلي' : lang === 'zh' ? '项目学术培养大纲与实施方案' : lang === 'ckb' ? 'وردەکارییە ئەکادیمییەکان' : 'Academic Curriculum & Dossier',
    eligibilityHeading: lang === 'ar' ? 'معايير القبول والفئات المستهدفة' : lang === 'zh' ? '申报资格与遴选要求' : lang === 'ckb' ? 'مەرجەکانی وەرگرتن' : 'Target Audience & Eligibility Criteria',
    timelineHeading: lang === 'ar' ? 'الجدول الزمني والمواعيد' : lang === 'zh' ? '时间节点与关键日期' : lang === 'ckb' ? 'خشتەی کات' : 'Timeline & Critical Deadlines',
    credentialsHeading: lang === 'ar' ? 'الشهادات والاعتماد' : lang === 'zh' ? '学分认证与结业证书' : lang === 'ckb' ? 'بڕوانامەی دانپێدانراو' : 'Accreditation & Joint Certification',
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 space-y-8 bg-white min-h-screen">
        <div className="h-8 bg-neutral-100 rounded w-1/4 animate-pulse" />
        <div className="h-96 bg-neutral-100 rounded-2xl animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-64 bg-neutral-100 rounded-2xl animate-pulse" />
          <div className="h-64 bg-neutral-100 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (isError || !program) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center space-y-6 bg-white min-h-screen">
        <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
          <GraduationCap className="w-10 h-10" />
        </div>
        <h1 className="text-3xl ica-heading text-neutral-900 uppercase">Program Dossier Not Found</h1>
        <p className="text-base text-neutral-600 max-w-md mx-auto">The requested exchange program dossier may have been updated or moved. Please contact the academic desk if you believe this is an error.</p>
        <Link
          to={`/${lang}/institute/services/cultural-exchange/programs`}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-lg ica-btn-primary text-xs font-black uppercase tracking-widest"
        >
          <span>{t.backToPrograms}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col font-sans pb-20 bg-white">
      {/* Header Banner */}
      <div className="relative bg-neutral-50 text-neutral-900 pt-12 pb-20 overflow-hidden border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-8">
            <Link
              to={`/${lang}/institute/services/cultural-exchange/programs`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-red-600 transition"
            >
              {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span>{t.backToPrograms}</span>
            </Link>
          </div>

          <div className="space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-50 border border-red-100 text-red-700 text-[10px] font-black uppercase tracking-widest">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{program.category?.nameEn || 'Bilateral Program'}</span>
              <span className="opacity-40">•</span>
              <span>CISE Certified</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl ica-heading text-neutral-900 uppercase leading-tight">
              {getProgramTitle(program)}
            </h1>

            <div className="w-24 h-1.5 bg-red-600"></div>

            <p className="text-lg text-neutral-600 leading-relaxed font-medium">
              {getProgramDesc(program)}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white border border-neutral-200 text-sm font-bold text-neutral-800 shadow-sm">
                <Building2 className="w-4 h-4 text-red-600" />
                <span>{program.institutionName}</span>
              </div>
              {program.applicationDeadline && (
                <div className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-red-50 border border-red-100 text-sm font-bold text-red-700 shadow-sm">
                  <Clock className="w-4 h-4" />
                  <span>Deadline: {program.applicationDeadline}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-red-50/30 -skew-x-12 translate-x-1/2 -z-10" />
      </div>

      {/* Main Content Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-neutral-200 shadow-xl shadow-neutral-200/40 space-y-10">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                <img
                  src={program.coverImage}
                  alt={getProgramTitle(program)}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-red-600" />
                  <h2 className="text-2xl ica-heading text-neutral-900 uppercase tracking-tight">
                    {t.dossierHeading}
                  </h2>
                </div>
                <div className="text-base text-neutral-600 leading-relaxed space-y-4 whitespace-pre-line font-medium">
                  {getProgramDetails(program)}
                </div>
              </div>

              {program.eligibility && (
                <div className="p-8 rounded-xl bg-neutral-50 border border-neutral-200 space-y-4 shadow-sm">
                  <h3 className="text-base ica-subheading text-neutral-900 uppercase tracking-wider flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-red-600" />
                    <span>{t.eligibilityHeading}</span>
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-medium">
                    {program.eligibility}
                  </p>
                </div>
              )}

              <div className="p-8 rounded-xl bg-red-50/30 border border-red-100 space-y-4">
                <h3 className="text-base ica-subheading text-neutral-900 uppercase tracking-wider flex items-center gap-3">
                  <Award className="w-5 h-5 text-red-600" />
                  <span>{t.credentialsHeading}</span>
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                  Participants successfully concluding this bilateral track receive dual-signed institutional transcripts and digital verification badges validated under the Chinese Institute for Strategic and Economic Studies (CISE) academic registry.
                </p>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="space-y-6">
            <div className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-xl shadow-neutral-200/40 space-y-8 sticky top-32">
              <div className="space-y-2">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
                  Application Action Desk
                </h3>
                <div className="w-8 h-1 bg-neutral-200" />
              </div>

              <div className="space-y-4">
                <div className="flex flex-col py-3 border-b border-neutral-100">
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Institution</span>
                  <span className="text-sm font-bold text-neutral-900">{program.institutionName}</span>
                </div>
                <div className="flex flex-col py-3 border-b border-neutral-100">
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Cycle Duration</span>
                  <span className="text-sm font-bold text-neutral-900">{program.eventDate || 'Full Semester'}</span>
                </div>
                <div className="flex flex-col py-3 border-b border-neutral-100">
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Admission Deadline</span>
                  <span className="text-sm font-bold text-red-600">{program.applicationDeadline || 'Rolling Admissions'}</span>
                </div>
                <div className="flex flex-col py-3 border-b border-neutral-100">
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Visa Protocol</span>
                  <span className="text-sm font-bold text-green-600 uppercase tracking-wide">Bilateral Fast-Track</span>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Link
                  to={`/${lang}/institute/services/cultural-exchange/apply?program=${program.id}`}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-lg ica-btn-primary font-black text-xs uppercase tracking-widest shadow-lg shadow-red-900/10"
                >
                  <span>{t.applyForProgram}</span>
                  <Send className="w-4 h-4" />
                </Link>

                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-center gap-3 py-3.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-900 text-xs font-black uppercase tracking-widest transition-all shadow-sm"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedLink ? t.copied : t.share}</span>
                </button>
              </div>

              <div className="pt-6 border-t border-neutral-100 text-[11px] text-neutral-500 space-y-3">
                <div className="flex items-center gap-2 text-neutral-900 font-black uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-red-600" />
                  <span>CISE Governance</span>
                </div>
                <p className="font-medium leading-relaxed">
                  Questions about this bilateral program? Inquire with the academic desk at <span className="font-bold text-red-600">exchange@cises.org.iq</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CulturalExchangeProgramDetail;

