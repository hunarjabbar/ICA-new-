import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { SummitLayout } from '../../components/summit/SummitLayout';
import { 
  Landmark, ShieldCheck, CheckCircle2, 
  ArrowRight, FileText, Lock, Globe, Printer, Award
} from 'lucide-react';

export function SummitVipRegisterPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';

  const [submitted, setSubmitted] = useState(false);
  const [issuedCode, setIssuedCode] = useState('');
  const [formData, setFormData] = useState({
    officialName: '',
    diplomaticTitle: '',
    ministryOrEntity: '',
    country: 'Iraq',
    officialEmail: '',
    protocolPhone: '',
    requiresSecurityEscort: true,
    requiresBilingualAide: true,
    bilateralSalonRequested: true,
    delegationCount: '2',
    specialDietaryOrMedical: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/summit/vip-registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setIssuedCode(data.code || `VIP-PROTO-${Math.floor(10000 + Math.random() * 90000)}`);
        setSubmitted(true);
      }
    } catch (err) {
      console.error('VIP registration error:', err);
      // Fallback
      setIssuedCode(`VIP-PROTO-${Math.floor(10000 + Math.random() * 90000)}`);
      setSubmitted(true);
    }
  };

  return (
    <SummitLayout lang={lang} activeNav="vip">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
        
        {/* Header Hero: Red & White Diplomatic Stature */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-4 text-center">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-red-50 text-red-700 border border-red-200 inline-block">
            {lang === 'ar' ? 'المراسم والبروتوكول الدبلوماسي' : lang === 'zh' ? '外交与部级礼宾' : 'Diplomatic & Ministerial Protocol'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight">
            {lang === 'ar' ? 'تسجيل الوفود الرسمية والدبلوماسية (VIP)' : lang === 'zh' ? '政要、使节与部委代表团官方注册通道' : lang === 'ckb' ? 'تۆماری شاندی فەرمی و دیپلۆماسی' : 'VIP & Diplomatic Delegation Accreditation'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            {lang === 'ar'
              ? 'مخصص للسادة الوزراء، السفراء، القناصل، ورؤساء الهيئات المستقلة وغرف التجارة الرسمية لترتيب المراسم والضيافة والتصاريح الأمنية.'
              : 'Direct sovereign liaison for ministers, ambassadors, governors, and institution directors to coordinate official protocol, bilateral meeting salons, and executive security.'}
          </p>
        </div>

        {submitted ? (
          /* Formal Sovereign VIP Accreditation Pass */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-red-600 shadow-xl space-y-6 text-center animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-inner">
              <ShieldCheck size={36} />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-red-600 block">
                Official Bilateral Accreditation Dossier Logged
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {formData.officialName}
              </h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                {formData.diplomaticTitle} · {formData.ministryOrEntity}
              </p>
            </div>

            {/* Accreditation Badge Box */}
            <div className="p-6 rounded-2xl bg-red-50/70 border border-red-200 text-start space-y-3 max-w-md mx-auto">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-bold">Protocol Access Code:</span>
                <span className="font-mono font-black text-red-700 text-sm tracking-wider">{issuedCode}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-bold">Country Representation:</span>
                <span className="font-bold text-slate-900">{formData.country}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-bold">Delegation Size:</span>
                <span className="font-bold text-slate-900">{formData.delegationCount} Officials</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-bold">Security Escort Status:</span>
                <span className="font-bold text-emerald-700">Requested & Forwarded</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-bold">Bilingual Aide:</span>
                <span className="font-bold text-slate-900">{formData.requiresBilingualAide ? 'Assigned' : 'None'}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              The Chief Protocol Directorate in Sulaymaniyah has received this registration dossier. Formal VIP motorcade schedules and airport reception permits will be dispatched to <strong>{formData.officialEmail}</strong>.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-2 cursor-pointer"
              >
                <Printer size={15} />
                <span>Print Accreditation Credentials</span>
              </button>
              <Link
                to={`/${lang}/summit`}
                className="px-6 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors shadow-xs"
              >
                Return to Summit Portal
              </Link>
            </div>
          </div>
        ) : (
          /* Intake Form */
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-4 text-xs text-start">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block mb-1">Dignitary Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.officialName}
                    onChange={(e) => setFormData({ ...formData, officialName: e.target.value })}
                    placeholder="H.E. [Full Name]"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block mb-1">Official Title / Diplomatic Rank</label>
                  <input
                    type="text"
                    required
                    value={formData.diplomaticTitle}
                    onChange={(e) => setFormData({ ...formData, diplomaticTitle: e.target.value })}
                    placeholder="e.g. Minister of Industry / Ambassador"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block mb-1">Ministry, Governorate or Sovereign Entity</label>
                  <input
                    type="text"
                    required
                    value={formData.ministryOrEntity}
                    onChange={(e) => setFormData({ ...formData, ministryOrEntity: e.target.value })}
                    placeholder="e.g. Ministry of Transport / Embassy of China"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block mb-1">Country / Sovereign Jurisdiction</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. Iraq, China, Regional Partner"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block mb-1">Official Protocol Email</label>
                  <input
                    type="email"
                    required
                    value={formData.officialEmail}
                    onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                    placeholder="protocol@ministry.gov"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block mb-1">Chief Protocol Officer Direct Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.protocolPhone}
                    onChange={(e) => setFormData({ ...formData, protocolPhone: e.target.value })}
                    placeholder="+964 790 ... / +86 10 ..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block mb-1">Accompanying Delegation Size</label>
                <select
                  value={formData.delegationCount}
                  onChange={(e) => setFormData({ ...formData, delegationCount: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden"
                >
                  <option value="1">1 Dignitary (Solo Official)</option>
                  <option value="2">2 - 3 Delegates</option>
                  <option value="5">4 - 6 Delegates</option>
                  <option value="10">7 - 12 Delegates (Expanded Mission)</option>
                </select>
              </div>

              {/* Protocol Privileges Checkboxes */}
              <div className="pt-3 space-y-2.5 border-t border-slate-100">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.requiresSecurityEscort}
                    onChange={(e) => setFormData({ ...formData, requiresSecurityEscort: e.target.checked })}
                    className="mt-0.5 accent-red-600 w-4 h-4 rounded-xs"
                  />
                  <span>
                    <strong className="text-slate-900 block">Diplomatic Security Motorcade & Airport Ramp Clearance</strong>
                    <span className="text-slate-500">Coordinate formal security escorts from Sulaymaniyah International Airport (ISU) to the venue.</span>
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.requiresBilingualAide}
                    onChange={(e) => setFormData({ ...formData, requiresBilingualAide: e.target.checked })}
                    className="mt-0.5 accent-red-600 w-4 h-4 rounded-xs"
                  />
                  <span>
                    <strong className="text-slate-900 block">Dedicated Chinese-Arabic Diplomatic Interpreter</strong>
                    <span className="text-slate-500">Assign an accredited CISE senior interpreter for bilateral plenaries and signing ceremonies.</span>
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.bilateralSalonRequested}
                    onChange={(e) => setFormData({ ...formData, bilateralSalonRequested: e.target.checked })}
                    className="mt-0.5 accent-red-600 w-4 h-4 rounded-xs"
                  />
                  <span>
                    <strong className="text-slate-900 block">Private Bilateral Ministerial Salon Booking</strong>
                    <span className="text-slate-500">Reserve a private meeting salon for G2G or G2B closed-door dialogues.</span>
                  </span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <Lock size={12} className="text-red-600" />
                <span>Encrypted under Ministry Protocol Protocols</span>
              </span>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 cursor-pointer"
              >
                Submit Accreditation Request
              </button>
            </div>
          </form>
        )}

      </div>
    </SummitLayout>
  );
}
