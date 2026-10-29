import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useAuthStore } from '../store/useAuthStore';
import { Locale } from '../types';
import { useI18n } from '../hooks/useI18n';
import { 
  Radio, 
  Sparkles, 
  Users, 
  Terminal, 
  BookOpen, 
  Mail, 
  LayoutDashboard,
  FileText,
  Megaphone
} from 'lucide-react';

// Modular Components
import { CiseCommandHubOverview } from '../components/hub/CiseCommandHubOverview';
import { CiseCommandHubArticleEditor } from '../components/hub/CiseCommandHubArticleEditor';
import { CiseCommandHubAIImport } from '../components/hub/CiseCommandHubAIImport';
import { CiseCommandHubPartnerships } from '../components/hub/CiseCommandHubPartnerships';
import { CiseCommandHubTelex } from '../components/hub/CiseCommandHubTelex';
import { CiseCommandHubStudies } from '../components/hub/CiseCommandHubStudies';
import { CiseCommandHubSubscribers } from '../components/hub/CiseCommandHubSubscribers';
import { CiseCommandHubAnnouncements } from '../components/hub/CiseCommandHubAnnouncements';
import { CiseCommandHubAuditLogs } from '../components/hub/CiseCommandHubAuditLogs';
import { CiseCommandHubReviewQueue } from '../components/hub/CiseCommandHubReviewQueue';
import { CiseCommandHubTestSeeds } from '../components/hub/CiseCommandHubTestSeeds';
import CiseCommandHubLiveEvents from './CiseCommandHubLiveEvents';
import { CiseCommandHubUsersContent } from './CiseCommandHubUsers';
import { CiseCommandHubMedia } from './CiseCommandHubMedia';
import CiseCommandHubIcaPlus from './CiseCommandHubIcaPlus';
import { CiseCommandHubSummitServices } from '../components/hub/CiseCommandHubSummitServices';
import { CiseCommandHubHealthInspector } from '../components/hub/CiseCommandHubHealthInspector';
import { Clock, Database, Film, Crown, Landmark, ShieldCheck } from 'lucide-react';

type TabType = 'overview' | 'systemHealth' | 'summitServices' | 'testSeeds' | 'media' | 'icaplus' | 'users' | 'article' | 'review' | 'live' | 'search' | 'applications' | 'telexes' | 'studies' | 'subscribers' | 'announcements' | 'audit';

export function CiseCommandHubDashboard() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { t } = useI18n(lang as Locale);
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Synchronize activeTab with URL tab parameters (supports both camelCase and kebab-case)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    let tabParam = params.get('tab');
    if (tabParam === 'system-health') tabParam = 'systemHealth';
    if (tabParam === 'summit-services') tabParam = 'summitServices';
    if (tabParam === 'test-seeds') tabParam = 'testSeeds';
    if (tabParam && ['overview', 'systemHealth', 'summitServices', 'testSeeds', 'media', 'icaplus', 'users', 'article', 'review', 'live', 'search', 'applications', 'telexes', 'studies', 'subscribers', 'announcements', 'audit'].includes(tabParam)) {
      setActiveTab(tabParam as TabType);
    }
  }, [location.search]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    navigate(`?tab=${tab}`, { replace: true });
  };

  const { data: categories = [] } = useQuery<any[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await apiFetch('/api/categories');
      return res.json();
    }
  });

  const { data: events = [] } = useQuery<any[]>({
    queryKey: ['live-events'],
    queryFn: async () => {
      const res = await apiFetch('/api/events');
      if (!res.ok) return [];
      return res.json();
    }
  });

  const { data: applications = [] } = useQuery<any[]>({
    queryKey: ['admin-applications'],
    queryFn: async () => {
      const res = await apiFetch('/api/hub/applications');
      if (!res.ok) return [];
      return res.json();
    }
  });

  const { data: telexes = [] } = useQuery<any[]>({
    queryKey: ['admin-telexes'],
    queryFn: async () => {
      const res = await apiFetch('/api/hub/telexes');
      if (!res.ok) return [];
      return res.json();
    }
  });

  const { data: adminUsers = [] } = useQuery<any[]>({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await apiFetch('/api/hub/users');
      if (!res.ok) return [];
      return res.json();
    }
  });

  const { data: adminArticles = [] } = useQuery<any[]>({
    queryKey: ['admin-articles'],
    queryFn: async () => {
      const res = await apiFetch('/api/hub/articles');
      if (!res.ok) return [];
      return res.json();
    }
  });

  const pendingDossiers = applications.filter((a: any) => a.status === 'PENDING').length;
  const unreadTelex = telexes.filter((t: any) => t.status === 'UNREAD').length;
  const pendingArticlesCount = adminArticles.filter((a: any) => a.status === 'PENDING').length;

  if (user && user.role !== 'ADMIN') {
    return (
      <>
        <div className="space-y-6 text-start max-w-5xl mx-auto py-6">
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl text-amber-900 text-sm">
            <span className="font-black uppercase tracking-widest block mb-1">Restricted Secretarial Clearance</span>
            As an editorial contributor (<span className="font-medium font-bold">{user.role}</span>), all administrative governance modules, user management, and executive sections have vanished. You are authorized exclusively for Article Registry and Draft Dispatch.
          </div>
          <CiseCommandHubArticleEditor />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="space-y-10 text-start animate-in fade-in duration-700">
        {/* Sovereign Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b-2 border-brand-800 pb-6 sm:pb-8">
          <div className="space-y-2.5 sm:space-y-3 min-w-0">
            <div className="flex items-center gap-3 text-brand-800">
              <div className="p-2 bg-brand-50 rounded-lg shrink-0">
                <LayoutDashboard size={20} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-800 truncate">{t('governancePlatform')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-800 leading-tight tracking-tight break-words">{t('enterpriseCommand')}</h1>
            <p className="text-xs sm:text-sm md:text-base text-neutral-500 font-medium max-w-xl">
              {t('enterpriseCommandSubtitle')}
            </p>
          </div>
          <div className="flex items-center gap-4 sm:gap-8 bg-white p-3.5 sm:p-4 rounded-xl border border-neutral-100 shadow-sm self-stretch sm:self-auto justify-between sm:justify-start shrink-0">
            <div className="flex flex-col items-end rtl:items-start">
              <span className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">{t('latticeSynchronized')}</span>
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                  <div className="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-xs font-bold text-ink-900 uppercase tracking-wider">{t('statusNominal')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Navigation */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5 p-1.5 bg-neutral-50 rounded-xl border border-neutral-100 shadow-inner overflow-x-auto min-w-0">
          {[
            { id: 'overview', label: t('overview'), icon: LayoutDashboard },
            { id: 'systemHealth', label: 'System Health & Audit', icon: ShieldCheck },
            { id: 'summitServices', label: 'Summit & Services', icon: Landmark },
            { id: 'testSeeds', label: '30 Seed Test Suite', icon: Database },
            { id: 'media', label: 'Media Hub', icon: Film },
            { id: 'icaplus', label: 'ICA+', icon: Crown },
            { id: 'users', label: t('userManagement'), icon: Users, badge: adminUsers.length },
            { id: 'article', label: t('draftDispatch'), icon: FileText },
            { id: 'review', label: t('reviewQueue'), icon: Clock, badge: pendingArticlesCount },
            { id: 'search', label: t('aiInformation'), icon: Sparkles },
            { id: 'live', label: t('liveSignals'), icon: Radio },
            { id: 'announcements', label: t('globalBroadcast'), icon: Megaphone },
            { id: 'applications', label: t('partnerships'), icon: Users, badge: pendingDossiers },
            { id: 'telexes', label: t('telexLedger'), icon: Terminal, badge: unreadTelex },
            { id: 'studies', label: t('sovereignStudies'), icon: BookOpen },
            { id: 'subscribers', label: t('subscriberList'), icon: Mail },
            { id: 'audit', label: t('auditLogs'), icon: Terminal },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as TabType)}
              className={`flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest transition-all cursor-pointer relative min-h-[44px] shrink-0 sm:shrink ${
                activeTab === tab.id 
                  ? 'bg-brand-800 text-white shadow-md shadow-brand-800/20 z-10' 
                  : 'bg-white text-neutral-500 hover:text-brand-800 border border-neutral-200 hover:border-brand-300'
              }`}
            >
              <tab.icon size={14} className={activeTab === tab.id ? 'text-brand-500 shrink-0' : 'shrink-0'} />
              <span className="truncate">{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="absolute -top-1.5 end-0 sm:-top-2 sm:end-0 bg-brand-700 text-white text-[8px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm font-medium shrink-0">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content Matrix */}
        <div className="min-h-[600px]">
          <ErrorBoundary>
            {activeTab === 'overview' && <CiseCommandHubOverview onSelectTab={(tab) => handleTabChange(tab as TabType)} />}
            {activeTab === 'systemHealth' && <CiseCommandHubHealthInspector />}
            {activeTab === 'summitServices' && <CiseCommandHubSummitServices />}
            {activeTab === 'testSeeds' && <CiseCommandHubTestSeeds />}
            {activeTab === 'media' && <CiseCommandHubMedia />}
            {activeTab === 'icaplus' && <CiseCommandHubIcaPlus />}
            {activeTab === 'users' && <CiseCommandHubUsersContent />}
            {activeTab === 'article' && <CiseCommandHubArticleEditor />}
            {activeTab === 'review' && <CiseCommandHubReviewQueue />}
            {activeTab === 'search' && <CiseCommandHubAIImport categories={categories} />}
            {activeTab === 'live' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <CiseCommandHubLiveEvents />
              </div>
            )}
            {activeTab === 'announcements' && <CiseCommandHubAnnouncements />}
            {activeTab === 'applications' && <CiseCommandHubPartnerships />}
            {activeTab === 'telexes' && <CiseCommandHubTelex />}
            {activeTab === 'studies' && <CiseCommandHubStudies />}
            {activeTab === 'subscribers' && <CiseCommandHubSubscribers />}
            {activeTab === 'audit' && <CiseCommandHubAuditLogs />}
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}
