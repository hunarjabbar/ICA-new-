import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FileText,
  Layers,
  Video,
  Mail,
  Inbox,
  Users,
  ShieldCheck,
  TrendingUp,
  Plus,
  ExternalLink,
  ArrowRight,
  Radio,
  CheckCircle2,
  Clock,
  Shield,
  Activity
} from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function SecretariatDashboard() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const isRtl = currentLang === 'ar' || currentLang === 'ckb';
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const [dataVersion, setDataVersion] = useState(0);
  const [telemetry, setTelemetry] = useState<{
    articlesCount?: number;
    initiativesCount?: number;
    mediaCount?: number;
    subscribersCount?: number;
    inquiriesCount?: number;
  }>({});

  useEffect(() => {
    // 1. Subscribe to portalStore
    const unsub = portalStore.subscribe(() => setDataVersion(v => v + 1));

    // 2. Fetch live telemetry from CISE Command Hub Secretariat API
    fetch('/api/hub/secretariat/overview')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setTelemetry(data);
      })
      .catch(() => {});

    return unsub;
  }, []);

  const articles = portalStore.getNewsArticles();
  const initiatives = portalStore.getInitiatives();
  const media = portalStore.getMediaItems();
  const subscribers = portalStore.getSubscribers();
  const inquiries = portalStore.getInquiries();

  const publishedCount = telemetry.articlesCount ?? articles.filter(a => a.status === 'published').length;
  const initiativesCount = telemetry.initiativesCount ?? initiatives.length;
  const mediaCount = telemetry.mediaCount ?? media.length;
  const subscribersCount = telemetry.subscribersCount ?? subscribers.length;
  const inquiriesCount = telemetry.inquiriesCount ?? inquiries.length;

  return (
    <div className="space-y-8 w-full max-w-7xl mx-auto" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB]">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs font-mono font-bold text-[var(--color-brand-800)] uppercase tracking-wider">
              General Secretariat Plenary
            </span>
            <span className="text-[10px] font-mono text-neutral-500 bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded">
              CISE Command Hub Section
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-[#000000]">
            {t('secretariat.title')}
          </h1>
          <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
            {t('secretariat.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Link
            to={`/${currentLang}`}
            className="px-4 py-2.5 rounded-xl border border-[#E5E7EB] hover:border-[var(--color-brand-800)] bg-white text-xs font-bold text-[#000000] flex items-center gap-2 shadow-xs transition-colors min-h-[44px]"
          >
            <span>{t('secretariat.openPublic')}</span>
            <ExternalLink size={14} />
          </Link>

          <Link
            to={`/${currentLang}/secretariat/content`}
            className="px-4 py-2.5 rounded-xl bg-[var(--color-brand-800)] hover:bg-[#A00D26] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 min-h-[44px]"
          >
            <Plus size={14} />
            <span>{t('secretariat.createItem')}</span>
          </Link>
        </div>
      </div>

      {/* KPI Metrics Grid - Fully responsive on portrait and landscape */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs hover:border-red-600 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#4B5563] uppercase">Published Articles</span>
            <FileText size={18} className="text-[var(--color-brand-800)]" />
          </div>
          <div className="text-3xl font-serif font-black text-[#000000]">{publishedCount}</div>
          <div className="mt-2 text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 size={12} />
            <span>Sovereign Directives Active</span>
          </div>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs hover:border-red-600 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#4B5563] uppercase">Bilateral Initiatives</span>
            <Layers size={18} className="text-[var(--color-brand-800)]" />
          </div>
          <div className="text-3xl font-serif font-black text-[#000000]">{initiativesCount}</div>
          <div className="mt-2 text-[11px] text-blue-600 font-bold flex items-center gap-1">
            <Activity size={12} />
            <span>8 Flagship Corridors</span>
          </div>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs hover:border-red-600 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#4B5563] uppercase">Media Assets</span>
            <Video size={18} className="text-[var(--color-brand-800)]" />
          </div>
          <div className="text-3xl font-serif font-black text-[#000000]">{mediaCount}</div>
          <div className="mt-2 text-[11px] text-purple-600 font-bold flex items-center gap-1">
            <Radio size={12} />
            <span>Broadcasts & Documentaries</span>
          </div>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs hover:border-red-600 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#4B5563] uppercase">Active Inquiries</span>
            <Inbox size={18} className="text-[var(--color-brand-800)]" />
          </div>
          <div className="text-3xl font-serif font-black text-[#000000]">{inquiriesCount}</div>
          <div className="mt-2 text-[11px] text-amber-600 font-bold flex items-center gap-1">
            <Clock size={12} />
            <span>Pending Secretariat Review</span>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          to={`/${currentLang}/secretariat/content`}
          className="p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[var(--color-brand-800)] shadow-xs transition-all group block min-h-[140px]"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-xl bg-red-50 text-[var(--color-brand-800)]">
              <FileText size={20} />
            </div>
            <ArrowRight size={16} className="text-neutral-400 group-hover:text-[var(--color-brand-800)] transition-colors rtl:rotate-180" />
          </div>
          <h3 className="font-bold text-base text-[#000000] group-hover:text-[var(--color-brand-800)] transition-colors">
            Content & Directives CRUD
          </h3>
          <p className="text-xs text-[#4B5563] mt-1">
            Publish, edit, and archive plenipotentiary articles, official communiqués, and press dispatches.
          </p>
        </Link>

        <Link
          to={`/${currentLang}/secretariat/initiatives`}
          className="p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[var(--color-brand-800)] shadow-xs transition-all group block min-h-[140px]"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-xl bg-red-50 text-[var(--color-brand-800)]">
              <Layers size={20} />
            </div>
            <ArrowRight size={16} className="text-neutral-400 group-hover:text-[var(--color-brand-800)] transition-colors rtl:rotate-180" />
          </div>
          <h3 className="font-bold text-base text-[#000000] group-hover:text-[var(--color-brand-800)] transition-colors">
            Eight Flagship Initiatives
          </h3>
          <p className="text-xs text-[#4B5563] mt-1">
            Manage bilateral flagship programs across trade, currency clearing, consular services, and summits.
          </p>
        </Link>

        <Link
          to={`/${currentLang}/secretariat/forms`}
          className="p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[var(--color-brand-800)] shadow-xs transition-all group block min-h-[140px]"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-xl bg-red-50 text-[var(--color-brand-800)]">
              <Inbox size={20} />
            </div>
            <ArrowRight size={16} className="text-neutral-400 group-hover:text-[var(--color-brand-800)] transition-colors rtl:rotate-180" />
          </div>
          <h3 className="font-bold text-base text-[#000000] group-hover:text-[var(--color-brand-800)] transition-colors">
            Institutional Inquiries Ledger
          </h3>
          <p className="text-xs text-[#4B5563] mt-1">
            Review and adjudicate corporate partnership applications, consular requests, and summit dossiers.
          </p>
        </Link>
      </div>

      {/* Security and RBAC Status Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[var(--color-brand-800)] shrink-0">
            <Shield size={20} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#000000]">
              CISE Command Hub • Plenipotentiary Cryptographic Governance
            </h4>
            <p className="text-xs text-[#4B5563]">
              All Secretariat actions are logged to the cryptographic audit trail and synchronized across the ecosystem.
            </p>
          </div>
        </div>

        <Link
          to={`/${currentLang}/secretariat/audit`}
          className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-bold flex items-center gap-2 self-start sm:self-auto min-h-[44px]"
        >
          <ShieldCheck size={14} className="text-red-500" />
          <span>View Audit Ledger</span>
        </Link>
      </div>
    </div>
  );
}

export default SecretariatDashboard;
