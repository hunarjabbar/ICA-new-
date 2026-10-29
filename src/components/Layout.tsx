import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { IntelligenceWireTicker } from './IntelligenceWireTicker';
import { Locale } from '../types';
import { SocialFooterShowcase, FloatingSocialDock } from './SocialLinks';
import { NewsletterSignup } from './NewsletterSignup';
import { useI18n } from '../hooks/useI18n';
import { useSiteStore } from '../store/useSiteStore';
import { 
  HeartHandshake, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Lock, 
  ShieldCheck, 
  Mail, 
  Phone, 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Globe, 
  Building2, 
  Landmark, 
  FileCheck,
  Radio,
  FileText
} from 'lucide-react';
import { IcaLogo } from './IcaLogo';
import { LegalModal } from './LegalModal';
import { Footer } from './Footer';
import { TalentRegistrationModal, TalentRegistrationType } from './TalentRegistrationModal';
import { InstitutePortalCTA } from './InstitutePortalCTA';
import { NotificationToast } from './NotificationToast';
import { BottomNav } from './mobile/BottomNav';
import { GlazedLanguageModal } from './GlazedLanguageModal';

export function Layout({ lang, children }: { lang: Locale; children: ReactNode }) {
  const { t } = useI18n(lang);
  const { siteName, systemMaintenance, contactEmail } = useSiteStore();
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms'>('privacy');
  const [talentModalOpen, setTalentModalOpen] = useState(false);
  const [talentType, setTalentType] = useState<TalentRegistrationType>('volunteer');

  const openLegalModal = (tab: 'privacy' | 'terms') => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  const openTalentModal = (type: TalentRegistrationType) => {
    setTalentType(type);
    setTalentModalOpen(true);
  };
  
  useEffect(() => {
    document.title = t('pageTitle') || siteName;
  }, [t, siteName]);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col transition-colors duration-300 overflow-x-hidden pb-[calc(4.75rem+env(safe-area-inset-bottom))] sm:pb-[calc(5.5rem+env(safe-area-inset-bottom))] xl:pb-0">
      <Header lang={lang} />
      <IntelligenceWireTicker lang={lang} />
      <main id="main-content" tabIndex={-1} className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto flex flex-col items-stretch flex-grow focus:outline-hidden">
        {children}
      </main>
      {/* Bilateral Talent & Fellowship Gateway */}
      <section className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 py-6">
        <div className="bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-900/90 rounded-2xl p-5 sm:p-8 border border-neutral-200 dark:border-neutral-700/80 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xs hover:shadow-md transition-shadow">
          <div className="space-y-2 max-w-2xl text-left rtl:text-right">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-800 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-800"></span>
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest text-brand-800 dark:text-rose-400">
                {t('talentGatewayTitle')}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-800 dark:text-rose-300 text-[10px] font-black uppercase tracking-wider">
                {lang === 'ar' ? 'دفعة 2026 الرسمية' : lang === 'zh' ? '2026官方使团通道' : lang === 'ckb' ? 'دەستەی فەرمی 2026' : 'Official 2026 Intake'}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-brand-800 dark:text-neutral-100 tracking-tight">
              {t('talentGatewayJoin')}
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
              {t('talentGatewayDesc')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3.5 w-full lg:w-auto">
            <button
              id="btn-career-announcement"
              type="button"
              onClick={() => openTalentModal('career')}
              className="relative group flex items-center justify-center gap-2.5 px-4 sm:px-5 py-3 bg-brand-800 hover:bg-brand-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-brand-800/25 active:scale-98 cursor-pointer border border-brand-700 overflow-hidden w-full sm:w-auto min-h-[44px]"
            >
              <Briefcase className="w-4 h-4 text-white relative z-10 group-hover:scale-110 transition-transform shrink-0" />
              <span className="relative z-10 whitespace-nowrap">
                {t('careerAnnouncement')}
              </span>
            </button>

            <button
              id="btn-volunteer-register"
              type="button"
              onClick={() => openTalentModal('volunteer')}
              className="relative group flex items-center justify-center gap-2.5 px-4 sm:px-5 py-3 bg-brand-800 hover:bg-brand-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-brand-800/25 active:scale-98 cursor-pointer border border-brand-700 overflow-hidden w-full sm:w-auto min-h-[44px]"
            >
              <HeartHandshake className="w-4 h-4 text-white relative z-10 group-hover:scale-110 transition-transform shrink-0" />
              <span className="relative z-10 whitespace-nowrap">
                {t('becomeVolunteer')}
              </span>
            </button>

            <button
              id="btn-intern-register"
              type="button"
              onClick={() => openTalentModal('intern')}
              className="relative group flex items-center justify-center gap-2.5 px-4 sm:px-5 py-3 bg-brand-800 hover:bg-brand-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-brand-800/25 active:scale-98 cursor-pointer border border-brand-700 overflow-hidden w-full sm:w-auto min-h-[44px]"
            >
              <GraduationCap className="w-4 h-4 text-white relative z-10 group-hover:scale-110 transition-transform shrink-0" />
              <span className="relative z-10 whitespace-nowrap">
                {t('becomeIntern')}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Canonical Global Footer */}
      <Footer currentLocale={lang} />

      {/* Floating Speed-Dial Social Media Hub */}
      <FloatingSocialDock lang={lang} />

      {/* Comprehensive Legal & Privacy Policy Modal Hub */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalTab}
        lang={lang}
      />

      {/* Volunteer & Intern Registration Sovereign Modal with Synchronized PDF Download */}
      <TalentRegistrationModal
        isOpen={talentModalOpen}
        onClose={() => setTalentModalOpen(false)}
        initialType={talentType}
        lang={lang}
      />

      {/* Centralized Notification Floating Toast */}
      <NotificationToast currentLocale={lang} />

      {/* Modern Fixed Bottom Navigation Bar for Mobile and Tablet */}
      <BottomNav lang={lang} />

      {/* Sovereign Global Language Selection Card Modal */}
      <GlazedLanguageModal lang={lang} triggerOnly={true} />
    </div>
  );
}
