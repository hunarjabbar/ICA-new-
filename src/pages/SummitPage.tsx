import React, { useState } from 'react';
import { Locale, translations } from '../locales';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Building, 
  Award, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';

interface SummitPageProps {
  currentLocale: Locale;
}

export const SummitPage: React.FC<SummitPageProps> = ({ currentLocale }) => {
  const t = translations[currentLocale];
  const [activeTab, setActiveTab] = useState<'overview' | 'pavilions' | 'agenda' | 'register'>('overview');
  const [registered, setRegistered] = useState(false);
  const [delegateName, setDelegateName] = useState('');
  const [delegateEmail, setDelegateEmail] = useState('');
  const [delegationType, setDelegationType] = useState('OFFICIAL_DELEGATE');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!delegateName || !delegateEmail) return;
    setRegistered(true);
  };

  const pavilions = [
    {
      title: 'Infrastructure & Port Logistics Pavilion',
      orgs: 'China State Construction, PowerChina, Iraq Ministry of Transport',
      focus: 'Grand Faw container berths, high-speed rail transit, and heavy civil works.',
    },
    {
      title: 'Energy Transition & Gas Recovery Pavilion',
      orgs: 'Sinopec, PetroChina, Basra Oil Company, Missan Oil',
      focus: 'Zero-flaring capture systems, solar farm EPC, and advanced petrochemical cracking.',
    },
    {
      title: 'Monetary & Bilateral Finance Pavilion',
      orgs: 'People’s Bank of China, Central Bank of Iraq, Trade Bank of Iraq (TBI)',
      focus: 'Direct IQD-CNY bilateral clearing, credit facilities, and sovereign insurance.',
    },
    {
      title: 'Advanced Industrial & EV Pavilion',
      orgs: 'BYD, SANY Group, XCMG, Kurdistan Board of Investment',
      focus: 'Electric transport assembly, mining logistics, and autonomous port cranes.',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Summit Hero Banner */}
      <section className="bg-white border-2 border-brand-800 rounded-xl p-6 sm:p-10 space-y-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-50 rounded-full blur-3xl -mr-48 -mt-48 opacity-60"></div>
        
        <div className="flex flex-wrap items-center gap-3 text-xs relative z-10">
          <span className="bg-brand-800 text-white font-bold px-2.5 py-1 rounded uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            <Calendar className="w-3.5 h-3.5" />
            October 14–17, 2026
          </span>
          <span className="text-neutral-600 font-bold flex items-center gap-1 uppercase tracking-tight">
            <MapPin className="w-3.5 h-3.5 text-brand-800" />
            Sulaymaniyah International Expo Center, Kurdistan Region, Iraq
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-neutral-900 leading-tight relative z-10">
          {t.summit.title}
        </h1>

        <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-4xl relative z-10 font-medium">
          {t.summit.subtitle}
        </p>

        <div className="pt-2 flex flex-wrap gap-4 relative z-10">
          <button
            onClick={() => setActiveTab('register')}
            className="bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <span>{t.summit.registerDelegate}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab('pavilions')}
            className="bg-white hover:bg-neutral-50 text-neutral-800 font-bold text-xs sm:text-sm px-5 py-3 rounded transition-all border border-neutral-300 shadow-sm"
          >
            Explore 50+ Pavilions
          </button>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-2 overflow-x-auto text-xs font-bold uppercase tracking-tight">
        {(['overview', 'pavilions', 'agenda', 'register'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded transition-all ${
              activeTab === tab
                ? 'bg-brand-800 text-white shadow-md'
                : 'text-neutral-500 hover:text-brand-800 hover:bg-neutral-50'
            }`}
          >
            {tab === 'overview' && 'Plenary Overview'}
            {tab === 'pavilions' && 'Featured Pavilions'}
            {tab === 'agenda' && 'Summit Agenda'}
            {tab === 'register' && 'Delegate Registration'}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-neutral-200 p-5 rounded-lg space-y-2 shadow-sm">
              <div className="text-2xl font-mono font-black text-neutral-900">2,500+</div>
              <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Accredited Sovereign & Corporate Delegates</div>
            </div>
            <div className="bg-white border border-neutral-200 p-5 rounded-lg space-y-2 shadow-sm">
              <div className="text-2xl font-mono font-black text-brand-800">$18.5B</div>
              <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Target Value of Bilateral MoU Ratifications</div>
            </div>
            <div className="bg-white border border-neutral-200 p-5 rounded-lg space-y-2 shadow-sm">
              <div className="text-2xl font-mono font-black text-emerald-600">40,000 m²</div>
              <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Indoor & Outdoor Industrial Exhibition Space</div>
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">Sulaymaniyah Bilateral Host City Announcement</h3>
            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-medium">
              Under the joint auspices of the Iraqi Federal Government in Baghdad and the Kurdistan Regional Government in Erbil, the Sulaymaniyah International Expo Center will host high-level delegations from Chinese central state-owned enterprises, private industrial conglomerates, sovereign wealth funds, and regional chambers of commerce.
            </p>
          </div>
        </section>
      )}

      {/* Tab 2: Pavilions */}
      {activeTab === 'pavilions' && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pavilions.map((pav, idx) => (
            <div key={idx} className="bg-white border border-neutral-200 p-6 rounded-xl space-y-3 shadow-sm hover:border-brand-800/20 transition-all">
              <div className="text-[11px] font-mono text-brand-800 uppercase font-black">Pavilion Area #{idx + 1}</div>
              <h4 className="text-base font-bold text-neutral-900">{pav.title}</h4>
              <div className="text-xs text-neutral-500 font-medium"><strong className="text-neutral-900 font-bold">Key Exhibitors:</strong> {pav.orgs}</div>
              <p className="text-xs text-neutral-600 leading-relaxed font-medium">{pav.focus}</p>
            </div>
          ))}
        </section>
      )}

      {/* Tab 3: Agenda */}
      {activeTab === 'agenda' && (
        <section className="space-y-4">
          {[
            { day: 'Day 1 · Oct 14', title: 'Grand Plenary Opening & Sovereign Infrastructure Keynotes', desc: 'Ministerial addresses from Baghdad, Beijing, and Erbil on the Development Road and maritime transit.' },
            { day: 'Day 2 · Oct 15', title: 'Monetary Integration & IQD-CNY Banking Roundtables', desc: 'Executive sessions with central bankers, commercial treasuries, and sovereign bond issuers.' },
            { day: 'Day 3 · Oct 16', title: 'Energy Transition, Gas Capture & Clean Power EPC', desc: 'Industrial symposium on zero-emission petroleum engineering and mega-scale solar utility parks.' },
            { day: 'Day 4 · Oct 17', title: 'Bilateral Deal Ratification & B2B Matchmaking Forum', desc: 'Formal treaty and commercial contract signing ceremonies with international media broadcast.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-neutral-200 p-5 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:bg-neutral-50 transition-colors">
              <div className="space-y-1">
                <span className="text-xs font-mono font-black text-brand-800 uppercase">{item.day}</span>
                <h4 className="text-sm font-bold text-neutral-900">{item.title}</h4>
                <p className="text-xs text-neutral-500 font-medium">{item.desc}</p>
              </div>
              <span className="text-xs text-emerald-600 shrink-0 font-mono font-bold uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Live Broadcast</span>
            </div>
          ))}
        </section>
      )}

      {/* Tab 4: Register */}
      {activeTab === 'register' && (
        <section className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 max-w-2xl mx-auto space-y-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">Delegate & Pavilion Registration</h3>
            <p className="text-xs text-neutral-500 font-medium">
              Submit credential details for diplomatic, commercial, or press badge clearance.
            </p>
          </div>

          {registered ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center space-y-3 animate-in zoom-in-95 duration-300">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-base font-bold text-neutral-900">Registration Application Logged</h4>
              <p className="text-xs text-neutral-600 font-medium">
                Official accreditation pass dispatched to {delegateEmail}. Present your registration QR code at the Sulaymaniyah Expo VIP gate.
              </p>
              <button
                onClick={() => setRegistered(false)}
                className="text-xs text-neutral-400 hover:text-brand-800 underline pt-2 font-bold uppercase tracking-wider"
              >
                Register Another Attendee
              </button>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-neutral-600 font-bold uppercase tracking-tight">Full Name *</label>
                <input
                  type="text"
                  required
                  value={delegateName}
                  onChange={(e) => setDelegateName(e.target.value)}
                  placeholder="Delegation Leader / Executive Name"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded p-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-brand-800 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-600 font-bold uppercase tracking-tight">Official Business Email *</label>
                <input
                  type="email"
                  required
                  value={delegateEmail}
                  onChange={(e) => setDelegateEmail(e.target.value)}
                  placeholder="delegate@ministry.gov.iq or corporate@enterprise.cn"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded p-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-brand-800 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-600 font-bold uppercase tracking-tight">Accreditation Category</label>
                <select
                  value={delegationType}
                  onChange={(e) => setDelegationType(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded p-2.5 text-xs text-neutral-900 font-bold focus:outline-none focus:border-brand-800 transition-colors"
                >
                  <option value="OFFICIAL_DELEGATE">Official Government Delegate</option>
                  <option value="EXHIBITOR">Commercial Pavilion Exhibitor</option>
                  <option value="PRESS">International Accredited Press</option>
                  <option value="OBSERVER">Academic & Economic Observer</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs py-3 rounded transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Submit Badge Application</span>
              </button>
            </form>
          )}
        </section>
      )}
    </div>
  );
};
