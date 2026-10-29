import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../types';
import { apiFetch } from '../lib/api';
import { toast } from 'sonner';
import {
  CalendarDays,
  Building2,
  Users,
  FileText,
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  X,
  CheckCircle2,
  Clock,
  Shield,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  MapPin,
  DollarSign,
  Tag,
  Radio,
  Check,
  Layers
} from 'lucide-react';
import { ErrorBoundary } from '../components/ErrorBoundary';

interface BoothModel {
  id: string;
  hall: string;
  hallName: string;
  sector: string;
  sectorName: string;
  size: string;
  type: string;
  price: number;
  status: 'available' | 'reserved' | 'selected';
  exhibitor?: string | null;
  x?: number;
  z?: number;
  width?: number;
  depth?: number;
  reservation?: any;
}

interface VipRegistrationModel {
  id: string;
  code: string;
  officialName: string;
  diplomaticTitle: string;
  ministryOrEntity: string;
  country: string;
  officialEmail: string;
  protocolPhone?: string;
  delegationCount: number;
  requiresSecurityEscort: boolean;
  requiresBilingualAide: boolean;
  bilateralSalonRequested: boolean;
  specialDietaryOrMedical?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  registeredAt: string;
  assignedOfficer: string;
}

interface ServiceDossierModel {
  code: string;
  serviceId: string;
  serviceName: { en: string; ar: string; zh: string; ckb: string } | string;
  clientName: string;
  applicantEmail: string;
  companyEntity: string;
  jurisdiction: string;
  estimatedFeeUSD: number;
  estimatedFeeIQD: number;
  estimatedFeeRMB: number;
  tier: string;
  slaDays: number;
  stage: string;
  stages: Array<{ name: string; date: string; done: boolean; note?: string }>;
  submittedAt: string;
  assignedOfficer: string;
}

interface AgendaSessionModel {
  id: string;
  day: number;
  date: string;
  timeStart: string;
  timeEnd: string;
  hall: string;
  track: string;
  titleEn: string;
  titleAr?: string;
  titleZh?: string;
  titleCkb?: string;
  speakers: string[];
  moderator: string;
  status: string;
}

export function CiseCommandHubSummit() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'BOOTHS' | 'VIPS' | 'DOSSIERS' | 'AGENDA'>('OVERVIEW');
  const [searchTerm, setSearchTerm] = useState('');
  const [hallFilter, setHallFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals state
  const [isBoothModalOpen, setIsBoothModalOpen] = useState(false);
  const [editingBooth, setEditingBooth] = useState<BoothModel | null>(null);
  const [boothFormData, setBoothFormData] = useState({
    id: '',
    hall: 'A',
    hallName: 'Hall A: Strategic Energy & Petrochem',
    sector: 'energy-petrochemicals',
    sectorName: 'Energy & Petrochemicals',
    size: '18 m²',
    type: 'Corner Shell Scheme',
    price: 3600,
    status: 'available' as 'available' | 'reserved' | 'selected',
    exhibitor: ''
  });

  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [editingVip, setEditingVip] = useState<VipRegistrationModel | null>(null);
  const [vipFormData, setVipFormData] = useState({
    officialName: '',
    diplomaticTitle: '',
    ministryOrEntity: '',
    country: 'Iraq',
    officialEmail: '',
    protocolPhone: '',
    delegationCount: 2,
    requiresSecurityEscort: true,
    requiresBilingualAide: true,
    bilateralSalonRequested: true,
    status: 'APPROVED' as 'PENDING' | 'APPROVED' | 'REJECTED',
    assignedOfficer: 'Sulaymaniyah Protocol Liaison'
  });

  const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false);
  const [editingAgenda, setEditingAgenda] = useState<AgendaSessionModel | null>(null);
  const [agendaFormData, setAgendaFormData] = useState({
    day: 1,
    date: '2026-10-18',
    timeStart: '10:00',
    timeEnd: '11:30',
    hall: 'Grand Plenary Hall',
    track: 'Strategic Plenary',
    titleEn: '',
    titleAr: '',
    titleZh: '',
    titleCkb: '',
    speakers: '',
    moderator: '',
    status: 'CONFIRMED'
  });

  const [selectedDossier, setSelectedDossier] = useState<ServiceDossierModel | null>(null);
  const [isDossierModalOpen, setIsDossierModalOpen] = useState(false);
  const [dossierActionStage, setDossierActionStage] = useState('INTERBANK_VERIFIED');
  const [dossierOfficer, setDossierOfficer] = useState('');
  const [dossierNote, setDossierNote] = useState('');

  // -------------------------------------------------------------
  // DATA FETCHING
  // -------------------------------------------------------------
  const { data: overviewData, refetch: refetchOverview } = useQuery({
    queryKey: ['summit-overview'],
    queryFn: async () => {
      const res = await apiFetch('/api/summit/overview');
      if (!res.ok) throw new Error('Failed to fetch summit overview');
      return res.json();
    }
  });

  const { data: boothsData, refetch: refetchBooths, isLoading: isLoadingBooths } = useQuery<{ success: boolean; booths: BoothModel[] }>({
    queryKey: ['summit-booths'],
    queryFn: async () => {
      const res = await apiFetch('/api/hub/summit/booths');
      if (!res.ok) throw new Error('Failed to fetch summit booths');
      return res.json();
    }
  });

  const { data: vipsData, refetch: refetchVips, isLoading: isLoadingVips } = useQuery<{ success: boolean; registrations: VipRegistrationModel[] }>({
    queryKey: ['summit-vips'],
    queryFn: async () => {
      const res = await apiFetch('/api/hub/summit/vip-registrations');
      if (!res.ok) throw new Error('Failed to fetch VIP registrations');
      return res.json();
    }
  });

  const { data: dossiersData, refetch: refetchDossiers, isLoading: isLoadingDossiers } = useQuery<{ success: boolean; dossiers: ServiceDossierModel[] }>({
    queryKey: ['summit-dossiers'],
    queryFn: async () => {
      const res = await apiFetch('/api/hub/services/dossiers');
      if (!res.ok) throw new Error('Failed to fetch service dossiers');
      return res.json();
    }
  });

  const { data: agendaData, refetch: refetchAgenda, isLoading: isLoadingAgenda } = useQuery<{ success: boolean; sessions: AgendaSessionModel[] }>({
    queryKey: ['summit-agenda'],
    queryFn: async () => {
      const res = await apiFetch('/api/hub/summit/agenda');
      if (!res.ok) throw new Error('Failed to fetch agenda sessions');
      return res.json();
    }
  });

  const booths = boothsData?.booths || [];
  const vips = vipsData?.registrations || [];
  const dossiers = dossiersData?.dossiers || [];
  const sessions = agendaData?.sessions || [];

  // -------------------------------------------------------------
  // MUTATIONS
  // -------------------------------------------------------------
  const saveBoothMutation = useMutation({
    mutationFn: async (payload: any) => {
      const url = editingBooth ? `/api/hub/summit/booths/${editingBooth.id}` : '/api/hub/summit/booths';
      const method = editingBooth ? 'PUT' : 'POST';
      const res = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to save booth');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['summit-booths'] });
      queryClient.invalidateQueries({ queryKey: ['summit-overview'] });
      toast.success(editingBooth ? 'Pavilion updated successfully' : 'New pavilion created');
      setIsBoothModalOpen(false);
      setEditingBooth(null);
    },
    onError: (err: any) => toast.error(err.message)
  });

  const deleteBoothMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/hub/summit/booths/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete booth');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['summit-booths'] });
      queryClient.invalidateQueries({ queryKey: ['summit-overview'] });
      toast.success('Booth deleted successfully');
    },
    onError: (err: any) => toast.error(err.message)
  });

  const resetBoothsMutation = useMutation({
    mutationFn: async () => {
      const res = await apiFetch('/api/hub/summit/booths/reset', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to reset booths');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['summit-booths'] });
      queryClient.invalidateQueries({ queryKey: ['summit-overview'] });
      toast.success('Fairground booths restored to canonical defaults');
    }
  });

  const saveVipMutation = useMutation({
    mutationFn: async (payload: any) => {
      const url = editingVip ? `/api/hub/summit/vip-registrations/${editingVip.id}` : '/api/hub/summit/vip-registrations';
      const method = editingVip ? 'PUT' : 'POST';
      const res = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save VIP registration');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['summit-vips'] });
      queryClient.invalidateQueries({ queryKey: ['summit-overview'] });
      toast.success('Dignitary protocol record updated');
      setIsVipModalOpen(false);
      setEditingVip(null);
    },
    onError: (err: any) => toast.error(err.message)
  });

  const updateVipStatusMutation = useMutation({
    mutationFn: async ({ id, status, assignedOfficer }: { id: string; status: string; assignedOfficer?: string }) => {
      const res = await apiFetch(`/api/hub/summit/vip-registrations/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, assignedOfficer })
      });
      if (!res.ok) throw new Error('Failed to update VIP status');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['summit-vips'] });
      toast.success('Protocol accreditation status updated');
    }
  });

  const deleteVipMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/hub/summit/vip-registrations/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete VIP record');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['summit-vips'] });
      toast.success('Diplomatic record deleted');
    }
  });

  const saveAgendaMutation = useMutation({
    mutationFn: async (payload: any) => {
      const url = editingAgenda ? `/api/hub/summit/agenda/${editingAgenda.id}` : '/api/hub/summit/agenda';
      const method = editingAgenda ? 'PUT' : 'POST';
      const res = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save session');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['summit-agenda'] });
      toast.success('Summit session synchronized');
      setIsAgendaModalOpen(false);
      setEditingAgenda(null);
    },
    onError: (err: any) => toast.error(err.message)
  });

  const deleteAgendaMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/hub/summit/agenda/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete session');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['summit-agenda'] });
      toast.success('Summit session removed');
    }
  });

  const updateDossierStageMutation = useMutation({
    mutationFn: async ({ code, stage, assignedOfficer, note }: { code: string; stage: string; assignedOfficer?: string; note?: string }) => {
      const res = await apiFetch(`/api/hub/services/dossiers/${code}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage, assignedOfficer, note })
      });
      if (!res.ok) throw new Error('Failed to update dossier status');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['summit-dossiers'] });
      toast.success('Sovereign clearing dossier stage advanced');
      setIsDossierModalOpen(false);
      setSelectedDossier(null);
    }
  });

  // Filtered Booths
  const filteredBooths = booths.filter(b => {
    if (hallFilter !== 'ALL' && b.hall !== hallFilter) return false;
    if (statusFilter !== 'ALL' && b.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        b.id.toLowerCase().includes(q) ||
        (b.exhibitor && b.exhibitor.toLowerCase().includes(q)) ||
        b.sectorName.toLowerCase().includes(q) ||
        b.hallName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const refreshAll = () => {
    refetchOverview();
    refetchBooths();
    refetchVips();
    refetchDossiers();
    refetchAgenda();
    toast.success('All summit & service registries synchronized');
  };

  return (
    <ErrorBoundary lang={lang}>
      <div className="space-y-8 font-sans text-start">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-800 dark:text-brand-400 uppercase tracking-wider">
              <CalendarDays size={14} />
              <span>Sino-Iraqi Bilateral Fairground & Summit Command</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
              Summit & Expo 2026 Sovereign Hub
            </h1>
            <p className="text-xs text-neutral-500 max-w-2xl">
              Centralized orchestration for fairground pavilions, diplomatic VIP accreditation, bilateral trade dossiers, and official summit agenda.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to={`/${lang}/summit`}
              target="_blank"
              className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <ExternalLink size={13} />
              <span>View Public Portal</span>
            </Link>
            <button
              onClick={refreshAll}
              className="px-3.5 py-2 bg-brand-800 hover:bg-brand-900 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <RefreshCw size={13} />
              <span>Sync All</span>
            </button>
          </div>
        </div>

        {/* Top KPI Telemetry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs">
            <span className="text-[11px] font-medium uppercase text-neutral-400 block mb-1">
              Total Pavilions
            </span>
            <span className="text-2xl font-black text-neutral-900 dark:text-white font-mono">
              {booths.length}
            </span>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs">
            <span className="text-[11px] font-medium uppercase text-emerald-600 dark:text-emerald-400 block mb-1">
              Reserved / Booked
            </span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {booths.filter(b => b.status === 'reserved' || b.status === 'selected').length}
            </span>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs">
            <span className="text-[11px] font-medium uppercase text-blue-500 block mb-1">
              Available Booths
            </span>
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">
              {booths.filter(b => b.status === 'available').length}
            </span>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs">
            <span className="text-[11px] font-medium uppercase text-amber-500 block mb-1">
              VIP Dignitaries
            </span>
            <span className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">
              {vips.length}
            </span>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs">
            <span className="text-[11px] font-medium uppercase text-purple-500 block mb-1">
              Trade Dossiers
            </span>
            <span className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">
              {dossiers.length}
            </span>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs">
            <span className="text-[11px] font-medium uppercase text-neutral-500 block mb-1">
              Agenda Sessions
            </span>
            <span className="text-2xl font-black text-neutral-800 dark:text-neutral-200 font-mono">
              {sessions.length}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 border-b border-neutral-200 dark:border-neutral-800 overflow-x-auto pb-px">
          {[
            { id: 'OVERVIEW', label: 'Summit Overview', icon: CalendarDays },
            { id: 'BOOTHS', label: `Fairground Pavilions (${booths.length})`, icon: Building2 },
            { id: 'VIPS', label: `VIP Protocol Accreditation (${vips.length})`, icon: ShieldCheck },
            { id: 'DOSSIERS', label: `Universal Service Dossiers (${dossiers.length})`, icon: FileText },
            { id: 'AGENDA', label: `Symposia & Sessions (${sessions.length})`, icon: Layers },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-bold rounded-t-xl transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? 'border-b-2 border-brand-800 text-brand-800 dark:text-brand-400 bg-brand-50/50 dark:bg-brand-950/20'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-6">
            <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Iraq-China Economic Summit & Bilateral Expo 2026
                  </h2>
                  <p className="text-xs text-neutral-500">
                    October 18–21, 2026 · Sulaymaniyah International Fairground, Kurdistan Region
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    SYSTEM ACTIVE · CIPS & SULAY FAIRGROUNDS
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 space-y-2 border border-neutral-200 dark:border-neutral-800">
                  <h3 className="text-xs font-bold uppercase text-neutral-500">Fairground Halls</h3>
                  <ul className="text-xs space-y-1 text-neutral-700 dark:text-neutral-300">
                    <li>· Hall A: Energy & Heavy Petrochemical</li>
                    <li>· Hall B: 5G Tech & Life Sciences</li>
                    <li>· Hall C: Currency Clearing & Logistics</li>
                    <li>· Outdoor: Mega Machinery & EV Pavilions</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 space-y-2 border border-neutral-200 dark:border-neutral-800">
                  <h3 className="text-xs font-bold uppercase text-neutral-500">B2B Matchmaking</h3>
                  <div className="space-y-1 text-xs text-neutral-700 dark:text-neutral-300">
                    <p className="text-lg font-bold font-mono text-brand-800 dark:text-brand-400">84 Sessions</p>
                    <p className="text-neutral-500">Pre-scheduled bilateral salons for energy, agriculture, and construction contracts.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 space-y-2 border border-neutral-200 dark:border-neutral-800">
                  <h3 className="text-xs font-bold uppercase text-neutral-500">Diplomatic Protocol</h3>
                  <div className="space-y-1 text-xs text-neutral-700 dark:text-neutral-300">
                    <p className="text-lg font-bold font-mono text-amber-600 dark:text-amber-400">
                      {vips.filter(v => v.status === 'APPROVED').length} / {vips.length} Accredited
                    </p>
                    <p className="text-neutral-500">Security escorts, bilingual liaison officers, and diplomatic lounge access.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 space-y-2 border border-neutral-200 dark:border-neutral-800">
                  <h3 className="text-xs font-bold uppercase text-neutral-500">Sovereign Rail</h3>
                  <div className="space-y-1 text-xs text-neutral-700 dark:text-neutral-300">
                    <p className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">Direct IQD ⇄ RMB</p>
                    <p className="text-neutral-500">CIPS & mBridge Clearing Hub operating directly inside Hall C.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Registers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent VIP Accredited */}
              <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck size={16} className="text-amber-500" />
                    <span>Recent Diplomatic Accreditations</span>
                  </h3>
                  <button onClick={() => setActiveTab('VIPS')} className="text-xs text-brand-800 dark:text-brand-400 font-bold hover:underline">
                    Manage All
                  </button>
                </div>

                <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {vips.slice(0, 4).map(v => (
                    <div key={v.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="font-bold text-neutral-900 dark:text-white">{v.officialName}</div>
                        <div className="text-neutral-500 text-[11px]">{v.diplomaticTitle} · {v.country}</div>
                      </div>
                      <div className="text-end">
                        <span className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded ${
                          v.status === 'APPROVED' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600' : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600'
                        }`}>
                          {v.status}
                        </span>
                        <div className="text-[10px] text-neutral-400 font-mono mt-0.5">{v.code}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Bilateral Dossiers */}
              <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <FileText size={16} className="text-purple-500" />
                    <span>Active Bilateral Service Dossiers</span>
                  </h3>
                  <button onClick={() => setActiveTab('DOSSIERS')} className="text-xs text-brand-800 dark:text-brand-400 font-bold hover:underline">
                    Manage All
                  </button>
                </div>

                <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {dossiers.slice(0, 4).map(d => (
                    <div key={d.code} className="py-3 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="font-bold text-neutral-900 dark:text-white">{d.clientName}</div>
                        <div className="text-neutral-500 text-[11px]">
                          {typeof d.serviceName === 'object' ? d.serviceName.en : d.serviceName}
                        </div>
                      </div>
                      <div className="text-end">
                        <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/40 text-purple-600">
                          {d.stage}
                        </span>
                        <div className="text-[10px] text-neutral-400 font-mono mt-0.5">${d.estimatedFeeUSD.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FAIRGROUND BOOTHS */}
        {activeTab === 'BOOTHS' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-2.5 text-neutral-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search pavilion, exhibitor, sector..."
                    className="pl-9 pr-4 py-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-800 w-64"
                  />
                </div>

                <select
                  value={hallFilter}
                  onChange={(e) => setHallFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl"
                >
                  <option value="ALL">All Halls</option>
                  <option value="A">Hall A: Energy & Petrochem</option>
                  <option value="B">Hall B: Tech & Healthcare</option>
                  <option value="C">Hall C: Finance & Trade</option>
                  <option value="OUTDOOR">Outdoor Mega Arena</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="selected">Selected</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => resetBoothsMutation.mutate()}
                  className="px-3 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-bold rounded-xl hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Reset Defaults
                </button>
                <button
                  onClick={() => {
                    setEditingBooth(null);
                    setBoothFormData({
                      id: `PAV-${Date.now().toString().slice(-4)}`,
                      hall: 'A',
                      hallName: 'Hall A: Strategic Energy & Petrochem',
                      sector: 'energy-petrochemicals',
                      sectorName: 'Energy & Petrochemicals',
                      size: '18 m²',
                      type: 'Corner Shell Scheme',
                      price: 3600,
                      status: 'available',
                      exhibitor: ''
                    });
                    setIsBoothModalOpen(true);
                  }}
                  className="px-3.5 py-2 bg-brand-800 hover:bg-brand-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add Pavilion</span>
                </button>
              </div>
            </div>

            {/* Booths Table */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-start text-xs">
                  <thead className="bg-neutral-50 dark:bg-neutral-800/60 text-neutral-500 font-bold uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-800">
                    <tr>
                      <th className="py-3 px-4">Booth Code</th>
                      <th className="py-3 px-4">Hall & Location</th>
                      <th className="py-3 px-4">Sector Focus</th>
                      <th className="py-3 px-4">Type & Size</th>
                      <th className="py-3 px-4 text-end">Rate (USD)</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Exhibitor Entity</th>
                      <th className="py-3 px-4 text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {isLoadingBooths ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-neutral-400">Loading fairground floorplan...</td>
                      </tr>
                    ) : filteredBooths.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-neutral-400">No pavilions match current filter criteria.</td>
                      </tr>
                    ) : (
                      filteredBooths.map(booth => (
                        <tr key={booth.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-neutral-900 dark:text-white">
                            {booth.id}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-neutral-900 dark:text-white">Hall {booth.hall}</div>
                            <div className="text-[11px] text-neutral-400">{booth.hallName}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-medium text-neutral-700 dark:text-neutral-300">
                              {booth.sectorName}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-neutral-800 dark:text-neutral-200">{booth.type}</div>
                            <div className="text-[11px] text-neutral-400 font-mono">{booth.size}</div>
                          </td>
                          <td className="py-3.5 px-4 text-end font-mono font-bold text-neutral-900 dark:text-white">
                            ${booth.price.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase font-mono ${
                              booth.status === 'reserved'
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600'
                                : booth.status === 'selected'
                                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600'
                                : 'bg-blue-50 dark:bg-blue-950/40 text-blue-600'
                            }`}>
                              {booth.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            {booth.exhibitor ? (
                              <div className="font-bold text-neutral-900 dark:text-white">{booth.exhibitor}</div>
                            ) : (
                              <span className="text-neutral-400 italic">Unassigned</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-end space-x-1">
                            <button
                              onClick={() => {
                                setEditingBooth(booth);
                                setBoothFormData({
                                  id: booth.id,
                                  hall: booth.hall,
                                  hallName: booth.hallName,
                                  sector: booth.sector,
                                  sectorName: booth.sectorName,
                                  size: booth.size,
                                  type: booth.type,
                                  price: booth.price,
                                  status: booth.status,
                                  exhibitor: booth.exhibitor || ''
                                });
                                setIsBoothModalOpen(true);
                              }}
                              className="p-1.5 text-neutral-500 hover:text-brand-800 dark:hover:text-brand-400 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                              title="Edit Pavilion"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              onClick={() => {
                              toast.warning(`Delete pavilion ${booth.id}?`, {
                                action: {
                                  label: 'Delete',
                                  onClick: () => deleteBoothMutation.mutate(booth.id)
                                }
                              });
                            }}
                              className="p-1.5 text-neutral-500 hover:text-red-600 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                              title="Delete Pavilion"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: VIP ACCREDITATION */}
        {activeTab === 'VIPS' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-2.5 text-neutral-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search VIP name, country, ministry..."
                    className="pl-9 pr-4 py-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-800 w-64"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingVip(null);
                    setVipFormData({
                      officialName: '',
                      diplomaticTitle: '',
                      ministryOrEntity: '',
                      country: 'Iraq',
                      officialEmail: '',
                      protocolPhone: '',
                      delegationCount: 2,
                      requiresSecurityEscort: true,
                      requiresBilingualAide: true,
                      bilateralSalonRequested: true,
                      status: 'APPROVED',
                      assignedOfficer: 'Sulaymaniyah Protocol Liaison'
                    });
                    setIsVipModalOpen(true);
                  }}
                  className="px-3.5 py-2 bg-brand-800 hover:bg-brand-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Accredit Dignitary</span>
                </button>
              </div>
            </div>

            {/* VIP Table */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-start text-xs">
                  <thead className="bg-neutral-50 dark:bg-neutral-800/60 text-neutral-500 font-bold uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-800">
                    <tr>
                      <th className="py-3 px-4">Protocol ID</th>
                      <th className="py-3 px-4">Dignitary & Title</th>
                      <th className="py-3 px-4">Government / Ministry</th>
                      <th className="py-3 px-4">Delegation</th>
                      <th className="py-3 px-4">Protocol Services</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Liaison Officer</th>
                      <th className="py-3 px-4 text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {isLoadingVips ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-neutral-400">Loading VIP registrations...</td>
                      </tr>
                    ) : vips.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-neutral-400">No VIP accreditation records recorded.</td>
                      </tr>
                    ) : (
                      vips.map(vip => (
                        <tr key={vip.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-neutral-900 dark:text-white">
                            {vip.code}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-neutral-900 dark:text-white">{vip.officialName}</div>
                            <div className="text-[11px] text-neutral-400">{vip.diplomaticTitle}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-neutral-800 dark:text-neutral-200">{vip.ministryOrEntity}</div>
                            <div className="text-[11px] text-neutral-400">{vip.country}</div>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-neutral-900 dark:text-white">
                            {vip.delegationCount} Members
                          </td>
                          <td className="py-3.5 px-4 space-y-1">
                            {vip.requiresSecurityEscort && (
                              <div className="text-[10px] text-amber-600 flex items-center gap-1 font-bold">
                                <span>Security Escort</span>
                              </div>
                            )}
                            {vip.requiresBilingualAide && (
                              <div className="text-[10px] text-blue-600 flex items-center gap-1">
                                <span>Bilingual Aide</span>
                              </div>
                            )}
                            {vip.bilateralSalonRequested && (
                              <div className="text-[10px] text-purple-600 flex items-center gap-1">
                                <span>Bilateral Salon</span>
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={vip.status}
                              onChange={(e) => updateVipStatusMutation.mutate({ id: vip.id, status: e.target.value })}
                              className={`text-[11px] font-bold font-mono px-2 py-1 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 ${
                                vip.status === 'APPROVED' ? 'text-emerald-600' : 'text-amber-600'
                              }`}
                            >
                              <option value="PENDING">PENDING</option>
                              <option value="APPROVED">APPROVED</option>
                              <option value="REJECTED">REJECTED</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-300 text-[11px]">
                            {vip.assignedOfficer}
                          </td>
                          <td className="py-3.5 px-4 text-end space-x-1">
                            <button
                              onClick={() => {
                                setEditingVip(vip);
                                setVipFormData({
                                  officialName: vip.officialName,
                                  diplomaticTitle: vip.diplomaticTitle,
                                  ministryOrEntity: vip.ministryOrEntity,
                                  country: vip.country,
                                  officialEmail: vip.officialEmail,
                                  protocolPhone: vip.protocolPhone || '',
                                  delegationCount: vip.delegationCount,
                                  requiresSecurityEscort: vip.requiresSecurityEscort,
                                  requiresBilingualAide: vip.requiresBilingualAide,
                                  bilateralSalonRequested: vip.bilateralSalonRequested,
                                  status: vip.status,
                                  assignedOfficer: vip.assignedOfficer
                                });
                                setIsVipModalOpen(true);
                              }}
                              className="p-1.5 text-neutral-500 hover:text-brand-800 dark:hover:text-brand-400 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                              title="Edit VIP"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              onClick={() => {
                              toast.warning(`Remove accreditation for ${vip.officialName}?`, {
                                action: {
                                  label: 'Remove',
                                  onClick: () => deleteVipMutation.mutate(vip.id)
                                }
                              });
                            }}
                              className="p-1.5 text-neutral-500 hover:text-red-600 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                              title="Delete VIP"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: UNIVERSAL SERVICE DOSSIERS */}
        {activeTab === 'DOSSIERS' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Bilateral Strategic Services & Clearance Dossiers
                </h3>
                <p className="text-xs text-neutral-500">
                  Track clearing rail liquidity allocations, Sinosure underwritings, and diplomatic fast-track visas.
                </p>
              </div>

              <Link
                to={`/${lang}/services/request`}
                target="_blank"
                className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Plus size={14} />
                <span>Submit New Public Dossier</span>
              </Link>
            </div>

            {/* Dossiers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoadingDossiers ? (
                <div className="col-span-3 py-8 text-center text-neutral-400">Loading dossiers...</div>
              ) : dossiers.length === 0 ? (
                <div className="col-span-3 py-8 text-center text-neutral-400">No dossiers registered.</div>
              ) : (
                dossiers.map(dossier => (
                  <div
                    key={dossier.code}
                    className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs space-y-4 text-start hover:border-neutral-400 dark:hover:border-neutral-700 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-brand-800 dark:text-brand-400">
                        {dossier.code}
                      </span>
                      <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/40 text-purple-600">
                        {dossier.stage}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white">{dossier.clientName}</h4>
                      <div className="text-xs text-neutral-500">{dossier.companyEntity}</div>
                      <div className="text-[11px] text-neutral-400 mt-0.5 font-medium">
                        {typeof dossier.serviceName === 'object' ? dossier.serviceName.en : dossier.serviceName}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/40">
                        <span className="text-[10px] text-neutral-400 uppercase block">USD</span>
                        <span className="text-xs font-bold font-mono text-neutral-900 dark:text-white">${dossier.estimatedFeeUSD.toLocaleString()}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/40">
                        <span className="text-[10px] text-neutral-400 uppercase block">IQD</span>
                        <span className="text-xs font-bold font-mono text-emerald-600">{(dossier.estimatedFeeIQD / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/40">
                        <span className="text-[10px] text-neutral-400 uppercase block">RMB</span>
                        <span className="text-xs font-bold font-mono text-amber-500">¥{dossier.estimatedFeeRMB.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-neutral-400">Sovereign Protocol Stages:</span>
                      <div className="space-y-1">
                        {dossier.stages.map((st, i) => (
                          <div key={i} className="flex items-center gap-2 text-[11px]">
                            {st.done ? (
                              <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                            ) : (
                              <Clock size={12} className="text-neutral-400 shrink-0" />
                            )}
                            <span className={st.done ? 'text-neutral-900 dark:text-white font-medium' : 'text-neutral-400'}>
                              {st.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                      <div className="text-[11px] text-neutral-400">
                        Officer: <span className="text-neutral-700 dark:text-neutral-300">{dossier.assignedOfficer}</span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedDossier(dossier);
                          setDossierActionStage(dossier.stage);
                          setDossierOfficer(dossier.assignedOfficer);
                          setDossierNote('');
                          setIsDossierModalOpen(true);
                        }}
                        className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Update Stage
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 5: AGENDA & SESSIONS */}
        {activeTab === 'AGENDA' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Official Summit Symposia & Keynote Schedule
                </h3>
                <p className="text-xs text-neutral-500">
                  Four days of high-level bilateral policy dialogues, plenary sessions, and B2B contract signings.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingAgenda(null);
                  setAgendaFormData({
                    day: 1,
                    date: '2026-10-18',
                    timeStart: '10:00',
                    timeEnd: '11:30',
                    hall: 'Grand Plenary Hall',
                    track: 'Strategic Plenary',
                    titleEn: '',
                    titleAr: '',
                    titleZh: '',
                    titleCkb: '',
                    speakers: '',
                    moderator: '',
                    status: 'CONFIRMED'
                  });
                  setIsAgendaModalOpen(true);
                }}
                className="px-3.5 py-2 bg-brand-800 hover:bg-brand-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus size={14} />
                <span>Add Summit Session</span>
              </button>
            </div>

            {/* Sessions List */}
            <div className="space-y-3">
              {isLoadingAgenda ? (
                <div className="p-8 text-center text-neutral-400">Loading agenda sessions...</div>
              ) : sessions.length === 0 ? (
                <div className="p-8 text-center text-neutral-400">No agenda sessions registered.</div>
              ) : (
                sessions.map(session => (
                  <div
                    key={session.id}
                    className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase font-mono px-2.5 py-0.5 rounded bg-brand-50 dark:bg-brand-950/40 text-brand-800 dark:text-brand-400">
                          Day {session.day} · {session.date}
                        </span>
                        <span className="text-xs font-mono font-bold text-neutral-500">
                          {session.timeStart} – {session.timeEnd}
                        </span>
                        <span className="text-neutral-300 dark:text-neutral-700">·</span>
                        <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                          {session.hall}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingAgenda(session);
                            setAgendaFormData({
                              day: session.day,
                              date: session.date,
                              timeStart: session.timeStart,
                              timeEnd: session.timeEnd,
                              hall: session.hall,
                              track: session.track,
                              titleEn: session.titleEn,
                              titleAr: session.titleAr || '',
                              titleZh: session.titleZh || '',
                              titleCkb: session.titleCkb || '',
                              speakers: session.speakers.join(', '),
                              moderator: session.moderator,
                              status: session.status
                            });
                            setIsAgendaModalOpen(true);
                          }}
                          className="p-1.5 text-neutral-500 hover:text-brand-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => {
                            toast.warning(`Remove session "${session.titleEn}"?`, {
                              action: {
                                label: 'Remove',
                                onClick: () => deleteAgendaMutation.mutate(session.id)
                              }
                            });
                          }}
                          className="p-1.5 text-neutral-500 hover:text-red-600 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                        {session.titleEn}
                      </h4>
                      {session.titleAr && (
                        <p className="text-xs text-neutral-500 font-arabic" dir="rtl">
                          {session.titleAr}
                        </p>
                      )}
                      {session.titleZh && (
                        <p className="text-xs text-neutral-500">
                          {session.titleZh}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-neutral-500">
                      <div>
                        Speakers: <span className="font-bold text-neutral-700 dark:text-neutral-300">{session.speakers.join(' · ')}</span>
                      </div>
                      {session.moderator && (
                        <div>
                          Moderator: <span className="font-bold text-neutral-700 dark:text-neutral-300">{session.moderator}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* MODAL: BOOTH CREATE / EDIT */}
        {isBoothModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  {editingBooth ? `Edit Pavilion: ${editingBooth.id}` : 'Create Fairground Pavilion'}
                </h3>
                <button onClick={() => setIsBoothModalOpen(false)} className="text-neutral-400 hover:text-neutral-800 dark:hover:text-white">
                  <X size={16} />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveBoothMutation.mutate(boothFormData);
                }}
                className="p-6 space-y-4 text-xs"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-500 font-medium mb-1">Booth ID</label>
                    <input
                      type="text"
                      disabled={!!editingBooth}
                      value={boothFormData.id}
                      onChange={(e) => setBoothFormData({ ...boothFormData, id: e.target.value })}
                      className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-500 font-medium mb-1">Hall Location</label>
                    <select
                      value={boothFormData.hall}
                      onChange={(e) => {
                        const hall = e.target.value;
                        const hallNames: Record<string, string> = {
                          'A': 'Hall A: Strategic Energy & Petrochem',
                          'B': 'Hall B: Digital Tech & Life Sciences',
                          'C': 'Hall C: Bilateral Finance & Logistics',
                          'OUTDOOR': 'Outdoor Arena: Heavy Mach & Energy'
                        };
                        setBoothFormData({ ...boothFormData, hall, hallName: hallNames[hall] || hall });
                      }}
                      className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800"
                    >
                      <option value="A">Hall A: Energy & Petrochem</option>
                      <option value="B">Hall B: Tech & Healthcare</option>
                      <option value="C">Hall C: Finance & Trade</option>
                      <option value="OUTDOOR">Outdoor Arena</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-500 font-medium mb-1">Pavilion Type</label>
                    <input
                      type="text"
                      value={boothFormData.type}
                      onChange={(e) => setBoothFormData({ ...boothFormData, type: e.target.value })}
                      className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-500 font-medium mb-1">Size (e.g. 18 m²)</label>
                    <input
                      type="text"
                      value={boothFormData.size}
                      onChange={(e) => setBoothFormData({ ...boothFormData, size: e.target.value })}
                      className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-500 font-medium mb-1">Price (USD)</label>
                    <input
                      type="number"
                      value={boothFormData.price}
                      onChange={(e) => setBoothFormData({ ...boothFormData, price: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-500 font-medium mb-1">Status</label>
                    <select
                      value={boothFormData.status}
                      onChange={(e) => setBoothFormData({ ...boothFormData, status: e.target.value as any })}
                      className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 font-mono"
                    >
                      <option value="available">available</option>
                      <option value="reserved">reserved</option>
                      <option value="selected">selected</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-500 font-medium mb-1">Exhibitor Entity (Company Name)</label>
                  <input
                    type="text"
                    value={boothFormData.exhibitor}
                    onChange={(e) => setBoothFormData({ ...boothFormData, exhibitor: e.target.value })}
                    placeholder="e.g. Sinopec International Middle East"
                    className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800"
                  />
                </div>

                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsBoothModalOpen(false)}
                    className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saveBoothMutation.isPending}
                    className="px-4 py-2 bg-brand-800 hover:bg-brand-900 text-white font-bold rounded-xl"
                  >
                    {saveBoothMutation.isPending ? 'Saving...' : 'Save Pavilion'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: VIP CREATE / EDIT */}
        {isVipModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  {editingVip ? `Edit Accreditation: ${editingVip.code}` : 'Accredit Diplomatic Dignitary'}
                </h3>
                <button onClick={() => setIsVipModalOpen(false)} className="text-neutral-400 hover:text-neutral-800 dark:hover:text-white">
                  <X size={16} />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveVipMutation.mutate(vipFormData);
                }}
                className="p-6 space-y-4 text-xs"
              >
                <div>
                  <label className="block text-neutral-500 font-medium mb-1">Official Name</label>
                  <input
                    type="text"
                    value={vipFormData.officialName}
                    onChange={(e) => setVipFormData({ ...vipFormData, officialName: e.target.value })}
                    placeholder="e.g. H.E. Dr. Tariq Al-Hashemi"
                    className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-500 font-medium mb-1">Diplomatic Title</label>
                    <input
                      type="text"
                      value={vipFormData.diplomaticTitle}
                      onChange={(e) => setVipFormData({ ...vipFormData, diplomaticTitle: e.target.value })}
                      placeholder="e.g. Deputy Minister"
                      className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-500 font-medium mb-1">Country / Entity</label>
                    <input
                      type="text"
                      value={vipFormData.country}
                      onChange={(e) => setVipFormData({ ...vipFormData, country: e.target.value })}
                      className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-500 font-medium mb-1">Ministry or Mission</label>
                  <input
                    type="text"
                    value={vipFormData.ministryOrEntity}
                    onChange={(e) => setVipFormData({ ...vipFormData, ministryOrEntity: e.target.value })}
                    className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-500 font-medium mb-1">Official Email</label>
                    <input
                      type="email"
                      value={vipFormData.officialEmail}
                      onChange={(e) => setVipFormData({ ...vipFormData, officialEmail: e.target.value })}
                      className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-500 font-medium mb-1">Delegation Count</label>
                    <input
                      type="number"
                      value={vipFormData.delegationCount}
                      onChange={(e) => setVipFormData({ ...vipFormData, delegationCount: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={vipFormData.requiresSecurityEscort}
                      onChange={(e) => setVipFormData({ ...vipFormData, requiresSecurityEscort: e.target.checked })}
                      className="rounded"
                    />
                    <span>Requires Armed Security Escort</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={vipFormData.requiresBilingualAide}
                      onChange={(e) => setVipFormData({ ...vipFormData, requiresBilingualAide: e.target.checked })}
                      className="rounded"
                    />
                    <span>Requires Bilateral Chinese-Arabic Liaison Aide</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={vipFormData.bilateralSalonRequested}
                      onChange={(e) => setVipFormData({ ...vipFormData, bilateralSalonRequested: e.target.checked })}
                      className="rounded"
                    />
                    <span>Reserved Bilateral Diplomatic Salon Access</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsVipModalOpen(false)}
                    className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saveVipMutation.isPending}
                    className="px-4 py-2 bg-brand-800 hover:bg-brand-900 text-white font-bold rounded-xl"
                  >
                    {saveVipMutation.isPending ? 'Saving...' : 'Save Dignitary'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: AGENDA SESSION CREATE / EDIT */}
        {isAgendaModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  {editingAgenda ? 'Edit Summit Session' : 'Create Summit Session'}
                </h3>
                <button onClick={() => setIsAgendaModalOpen(false)} className="text-neutral-400 hover:text-neutral-800 dark:hover:text-white">
                  <X size={16} />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveAgendaMutation.mutate({
                    ...agendaFormData,
                    speakers: agendaFormData.speakers.split(',').map(s => s.trim()).filter(Boolean)
                  });
                }}
                className="p-6 space-y-4 text-xs"
              >
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-neutral-500 font-medium mb-1">Summit Day</label>
                    <select
                      value={agendaFormData.day}
                      onChange={(e) => {
                        const day = Number(e.target.value);
                        const dates: Record<number, string> = {
                          1: '2026-10-18',
                          2: '2026-10-19',
                          3: '2026-10-20',
                          4: '2026-10-21'
                        };
                        setAgendaFormData({ ...agendaFormData, day, date: dates[day] || '2026-10-18' });
                      }}
                      className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800"
                    >
                      <option value={1}>Day 1 (Oct 18)</option>
                      <option value={2}>Day 2 (Oct 19)</option>
                      <option value={3}>Day 3 (Oct 20)</option>
                      <option value={4}>Day 4 (Oct 21)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-neutral-500 font-medium mb-1">Start Time</label>
                    <input
                      type="text"
                      value={agendaFormData.timeStart}
                      onChange={(e) => setAgendaFormData({ ...agendaFormData, timeStart: e.target.value })}
                      placeholder="10:00"
                      className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-500 font-medium mb-1">End Time</label>
                    <input
                      type="text"
                      value={agendaFormData.timeEnd}
                      onChange={(e) => setAgendaFormData({ ...agendaFormData, timeEnd: e.target.value })}
                      placeholder="11:30"
                      className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-500 font-medium mb-1">Session Title (English)</label>
                  <input
                    type="text"
                    value={agendaFormData.titleEn}
                    onChange={(e) => setAgendaFormData({ ...agendaFormData, titleEn: e.target.value })}
                    className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-neutral-500 font-medium mb-1">Session Title (Arabic)</label>
                  <input
                    type="text"
                    value={agendaFormData.titleAr}
                    onChange={(e) => setAgendaFormData({ ...agendaFormData, titleAr: e.target.value })}
                    className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 font-arabic text-end"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-neutral-500 font-medium mb-1">Speakers (comma-separated)</label>
                  <input
                    type="text"
                    value={agendaFormData.speakers}
                    onChange={(e) => setAgendaFormData({ ...agendaFormData, speakers: e.target.value })}
                    placeholder="Sinopec VP, Iraqi Oil Minister, Tsinghua Fellow"
                    className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-500 font-medium mb-1">Hall Location</label>
                    <input
                      type="text"
                      value={agendaFormData.hall}
                      onChange={(e) => setAgendaFormData({ ...agendaFormData, hall: e.target.value })}
                      className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-500 font-medium mb-1">Moderator</label>
                    <input
                      type="text"
                      value={agendaFormData.moderator}
                      onChange={(e) => setAgendaFormData({ ...agendaFormData, moderator: e.target.value })}
                      className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAgendaModalOpen(false)}
                    className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saveAgendaMutation.isPending}
                    className="px-4 py-2 bg-brand-800 hover:bg-brand-900 text-white font-bold rounded-xl"
                  >
                    {saveAgendaMutation.isPending ? 'Saving...' : 'Save Session'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: DOSSIER STAGE ADVANCEMENT */}
        {isDossierModalOpen && selectedDossier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Advance Dossier: {selectedDossier.code}
                </h3>
                <button onClick={() => setIsDossierModalOpen(false)} className="text-neutral-400 hover:text-neutral-800 dark:hover:text-white">
                  <X size={16} />
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-500 font-medium mb-1">Target Sovereign Stage</label>
                  <select
                    value={dossierActionStage}
                    onChange={(e) => setDossierActionStage(e.target.value)}
                    className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 font-mono font-bold"
                  >
                    <option value="SUBMITTED">1. SUBMITTED</option>
                    <option value="COMPLIANCE_REVIEW">2. COMPLIANCE_REVIEW</option>
                    <option value="INTERBANK_VERIFIED">3. INTERBANK_VERIFIED</option>
                    <option value="SOVEREIGN_APPROVED">4. SOVEREIGN_APPROVED</option>
                    <option value="DISPATCHED">5. DISPATCHED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-500 font-medium mb-1">Assigned Protocol Officer</label>
                  <input
                    type="text"
                    value={dossierOfficer}
                    onChange={(e) => setDossierOfficer(e.target.value)}
                    placeholder="e.g. Directorate of Bilateral Services"
                    className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800"
                  />
                </div>

                <div>
                  <label className="block text-neutral-500 font-medium mb-1">Stage Note / Audit Clearance Reference</label>
                  <textarea
                    value={dossierNote}
                    onChange={(e) => setDossierNote(e.target.value)}
                    placeholder="Provide compliance or liquidity allocation details..."
                    rows={3}
                    className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800"
                  />
                </div>

                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setIsDossierModalOpen(false)}
                    className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => updateDossierStageMutation.mutate({
                      code: selectedDossier.code,
                      stage: dossierActionStage,
                      assignedOfficer: dossierOfficer,
                      note: dossierNote
                    })}
                    disabled={updateDossierStageMutation.isPending}
                    className="px-4 py-2 bg-brand-800 hover:bg-brand-900 text-white font-bold rounded-xl"
                  >
                    {updateDossierStageMutation.isPending ? 'Advancing...' : 'Advance Stage'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default CiseCommandHubSummit;
