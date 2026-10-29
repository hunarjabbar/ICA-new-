import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../types';
import { toast } from 'sonner';
import {
  BookOpen,
  Users,
  FileText,
  Calendar,
  Building2,
  GraduationCap,
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Mail,
  Phone,
  Layers,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CiseCommandHubInstitute() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';
  const queryClient = useQueryClient();

  // Active top tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'pillars' | 'experts' | 'publications' | 'events' | 'projects' | 'courses' | 'inquiries'
  >('overview');

  const [inquirySubTab, setInquirySubTab] = useState<'insurance' | 'consultancy' | 'media'>('insurance');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Multi-lingual Tab state for modals
  const [localeModalTab, setLocaleModalTab] = useState<'en' | 'ar' | 'zh' | 'ckb'>('en');

  // Modals state
  const [isPillarModalOpen, setIsPillarModalOpen] = useState(false);
  const [editingPillar, setEditingPillar] = useState<any>(null);
  const [pillarForm, setPillarForm] = useState({
    slug: '',
    titleEn: '',
    titleAr: '',
    titleZh: '',
    titleCkb: '',
    descriptionEn: '',
    descriptionAr: '',
    descriptionZh: '',
    descriptionCkb: '',
    leadFellowEn: '',
    leadFellowAr: '',
    leadFellowZh: '',
    leadFellowCkb: '',
    metricLabelEn: '',
    metricLabelAr: '',
    metricLabelZh: '',
    metricLabelCkb: '',
    metricValue: '',
    topics: '',
    displayOrder: 0,
    status: 'PUBLISHED'
  });

  const [isExpertModalOpen, setIsExpertModalOpen] = useState(false);
  const [editingExpert, setEditingExpert] = useState<any>(null);
  const [expertForm, setExpertForm] = useState({
    slug: '',
    nameEn: '',
    nameAr: '',
    nameZh: '',
    nameCkb: '',
    titleEn: '',
    titleAr: '',
    titleZh: '',
    titleCkb: '',
    bioEn: '',
    bioAr: '',
    bioZh: '',
    bioCkb: '',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400',
    pillars: '["energy-bri"]',
    languages: '["Chinese", "English", "Arabic"]',
    email: '',
    phone: '',
    displayOrder: 0,
    status: 'PUBLISHED'
  });

  const [isPubModalOpen, setIsPubModalOpen] = useState(false);
  const [editingPub, setEditingPub] = useState<any>(null);
  const [pubForm, setPubForm] = useState({
    slug: '',
    type: 'WHITE_PAPER',
    publicationType: 'White Paper',
    titleEn: '',
    titleAr: '',
    titleZh: '',
    titleCkb: '',
    excerptEn: '',
    excerptAr: '',
    excerptZh: '',
    excerptCkb: '',
    contentEn: '',
    contentAr: '',
    contentZh: '',
    contentCkb: '',
    imageUrl: 'https://images.unsplash.com/photo-1521295121812-af46571d9ec6?auto=format&fit=crop&q=80&w=1200',
    authorName: 'Dr. Wang Wei',
    topics: '["Energy", "Infrastructure"]',
    region: 'BILATERAL',
    doi: '10.5281/zenodo.cise.2026.01',
    pdfUrl: '',
    wordCount: 3500,
    status: 'PUBLISHED'
  });

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [eventForm, setEventForm] = useState({
    slug: '',
    titleEn: '',
    titleAr: '',
    titleZh: '',
    titleCkb: '',
    descriptionEn: '',
    descriptionAr: '',
    descriptionZh: '',
    descriptionCkb: '',
    locationEn: '',
    locationAr: '',
    locationZh: '',
    locationCkb: '',
    eventDate: '2026-11-12',
    eventType: 'SYMPOSIUM',
    registrationUrl: '',
    displayOrder: 0,
    status: 'PUBLISHED'
  });

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [projectForm, setProjectForm] = useState({
    slug: '',
    nameEn: '',
    nameAr: '',
    nameZh: '',
    nameCkb: '',
    sectorEn: 'Energy & Infrastructure',
    sectorAr: '',
    sectorZh: '',
    sectorCkb: '',
    status: 'IN_PROGRESS',
    valueUsd: '$2.4B',
    contractor: 'China Harbor Engineering Co.',
    locationEn: 'Basra, Grand Faw Port',
    locationAr: '',
    locationZh: '',
    locationCkb: '',
    verifiedSources: '["Ministry of Transport Iraq", "Sinotrans Logistics Desk"]',
    displayOrder: 0
  });

  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [courseForm, setCourseForm] = useState({
    slug: '',
    level: 'HSK-1',
    titleEn: '',
    titleAr: '',
    titleZh: '',
    titleCkb: '',
    descriptionEn: '',
    descriptionAr: '',
    descriptionZh: '',
    descriptionCkb: '',
    duration: '12 Weeks (48 Hours)',
    schedule: 'Mon / Wed · 18:00 – 20:00',
    fee: 'Sovereign Scholarship (Free)',
    displayOrder: 0,
    status: 'ACTIVE'
  });

  // Queries
  const { data: overview, isLoading: overviewLoading, refetch: refetchOverview } = useQuery({
    queryKey: ['cise-hub-overview'],
    queryFn: async () => {
      const res = await apiFetch('/api/hub/institute/overview');
      if (!res.ok) throw new Error('Failed to load overview');
      return res.json();
    }
  });

  const { data: pillars = [], isLoading: pillarsLoading } = useQuery<any[]>({
    queryKey: ['cise-hub-pillars'],
    queryFn: async () => {
      const res = await apiFetch('/api/hub/institute/pillars');
      if (!res.ok) return [];
      return res.json();
    },
    enabled: activeTab === 'pillars' || activeTab === 'overview'
  });

  const { data: experts = [], isLoading: expertsLoading } = useQuery<any[]>({
    queryKey: ['cise-hub-experts'],
    queryFn: async () => {
      const res = await apiFetch('/api/hub/institute/experts');
      if (!res.ok) return [];
      return res.json();
    },
    enabled: activeTab === 'experts' || activeTab === 'overview'
  });

  const { data: publications = [], isLoading: pubsLoading } = useQuery<any[]>({
    queryKey: ['cise-hub-publications'],
    queryFn: async () => {
      const res = await apiFetch('/api/hub/institute/publications');
      if (!res.ok) return [];
      return res.json();
    },
    enabled: activeTab === 'publications' || activeTab === 'overview'
  });

  const { data: events = [], isLoading: eventsLoading } = useQuery<any[]>({
    queryKey: ['cise-hub-events'],
    queryFn: async () => {
      const res = await apiFetch('/api/hub/institute/events');
      if (!res.ok) return [];
      return res.json();
    },
    enabled: activeTab === 'events' || activeTab === 'overview'
  });

  const { data: projects = [], isLoading: projectsLoading } = useQuery<any[]>({
    queryKey: ['cise-hub-projects'],
    queryFn: async () => {
      const res = await apiFetch('/api/hub/institute/projects');
      if (!res.ok) return [];
      return res.json();
    },
    enabled: activeTab === 'projects' || activeTab === 'overview'
  });

  const { data: courses = [], isLoading: coursesLoading } = useQuery<any[]>({
    queryKey: ['cise-hub-courses'],
    queryFn: async () => {
      const res = await apiFetch('/api/hub/institute/courses');
      if (!res.ok) return [];
      return res.json();
    },
    enabled: activeTab === 'courses' || activeTab === 'overview'
  });

  const { data: insuranceApps = [], isLoading: insuranceLoading } = useQuery<any[]>({
    queryKey: ['cise-hub-insurance'],
    queryFn: async () => {
      const res = await apiFetch('/api/hub/institute/insurance-applications');
      if (!res.ok) return [];
      return res.json();
    },
    enabled: activeTab === 'inquiries' && inquirySubTab === 'insurance'
  });

  const { data: consultInqs = [], isLoading: consultLoading } = useQuery<any[]>({
    queryKey: ['cise-hub-consultancy'],
    queryFn: async () => {
      const res = await apiFetch('/api/hub/institute/consultancy-inquiries');
      if (!res.ok) return [];
      return res.json();
    },
    enabled: activeTab === 'inquiries' && inquirySubTab === 'consultancy'
  });

  const { data: mediaRequests = [], isLoading: mediaLoading } = useQuery<any[]>({
    queryKey: ['cise-hub-media'],
    queryFn: async () => {
      const res = await apiFetch('/api/hub/institute/media-requests');
      if (!res.ok) return [];
      return res.json();
    },
    enabled: activeTab === 'inquiries' && inquirySubTab === 'media'
  });

  // Reseed Mutation
  const reseedMutation = useMutation({
    mutationFn: async () => {
      const res = await apiFetch('/api/hub/institute/reseed', { method: 'POST' });
      if (!res.ok) throw new Error('Reseed failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cise-hub-overview'] });
      queryClient.invalidateQueries({ queryKey: ['cise-hub-pillars'] });
      queryClient.invalidateQueries({ queryKey: ['cise-hub-experts'] });
      queryClient.invalidateQueries({ queryKey: ['cise-hub-publications'] });
      queryClient.invalidateQueries({ queryKey: ['cise-hub-events'] });
      queryClient.invalidateQueries({ queryKey: ['cise-hub-projects'] });
      queryClient.invalidateQueries({ queryKey: ['cise-hub-courses'] });
      toast.success('CISE Institute database successfully reseeded with official baseline records.');
    }
  });

  // Pillar CRUD Mutations
  const savePillarMutation = useMutation({
    mutationFn: async (payload: any) => {
      const url = editingPillar
        ? `/api/hub/institute/pillars/${editingPillar.id}`
        : '/api/hub/institute/pillars';
      const method = editingPillar ? 'PUT' : 'POST';
      const res = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save pillar');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cise-hub-pillars'] });
      queryClient.invalidateQueries({ queryKey: ['cise-hub-overview'] });
      setIsPillarModalOpen(false);
      setEditingPillar(null);
    }
  });

  const deletePillarMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/hub/institute/pillars/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete pillar');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cise-hub-pillars'] });
      queryClient.invalidateQueries({ queryKey: ['cise-hub-overview'] });
    }
  });

  // Expert CRUD Mutations
  const saveExpertMutation = useMutation({
    mutationFn: async (payload: any) => {
      const url = editingExpert
        ? `/api/hub/institute/experts/${editingExpert.id}`
        : '/api/hub/institute/experts';
      const method = editingExpert ? 'PUT' : 'POST';
      const res = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save expert');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cise-hub-experts'] });
      queryClient.invalidateQueries({ queryKey: ['cise-hub-overview'] });
      setIsExpertModalOpen(false);
      setEditingExpert(null);
    }
  });

  const deleteExpertMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/hub/institute/experts/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete expert');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cise-hub-experts'] });
      queryClient.invalidateQueries({ queryKey: ['cise-hub-overview'] });
    }
  });

  // Publication CRUD Mutations
  const savePubMutation = useMutation({
    mutationFn: async (payload: any) => {
      const url = editingPub
        ? `/api/hub/institute/publications/${editingPub.id}`
        : '/api/hub/institute/publications';
      const method = editingPub ? 'PUT' : 'POST';
      const res = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save publication');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cise-hub-publications'] });
      queryClient.invalidateQueries({ queryKey: ['cise-hub-overview'] });
      setIsPubModalOpen(false);
      setEditingPub(null);
    }
  });

  const deletePubMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/hub/institute/publications/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete publication');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cise-hub-publications'] });
      queryClient.invalidateQueries({ queryKey: ['cise-hub-overview'] });
    }
  });

  // Event CRUD Mutations
  const saveEventMutation = useMutation({
    mutationFn: async (payload: any) => {
      const url = editingEvent
        ? `/api/hub/institute/events/${editingEvent.id}`
        : '/api/hub/institute/events';
      const method = editingEvent ? 'PUT' : 'POST';
      const res = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save event');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cise-hub-events'] });
      queryClient.invalidateQueries({ queryKey: ['cise-hub-overview'] });
      setIsEventModalOpen(false);
      setEditingEvent(null);
    }
  });

  const deleteEventMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/hub/institute/events/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete event');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cise-hub-events'] });
      queryClient.invalidateQueries({ queryKey: ['cise-hub-overview'] });
    }
  });

  // Project CRUD Mutations
  const saveProjectMutation = useMutation({
    mutationFn: async (payload: any) => {
      const url = editingProject
        ? `/api/hub/institute/projects/${editingProject.id}`
        : '/api/hub/institute/projects';
      const method = editingProject ? 'PUT' : 'POST';
      const res = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save project');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cise-hub-projects'] });
      queryClient.invalidateQueries({ queryKey: ['cise-hub-overview'] });
      setIsProjectModalOpen(false);
      setEditingProject(null);
    }
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/hub/institute/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete project');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cise-hub-projects'] });
      queryClient.invalidateQueries({ queryKey: ['cise-hub-overview'] });
    }
  });

  // Course CRUD Mutations
  const saveCourseMutation = useMutation({
    mutationFn: async (payload: any) => {
      const url = editingCourse
        ? `/api/hub/institute/courses/${editingCourse.id}`
        : '/api/hub/institute/courses';
      const method = editingCourse ? 'PUT' : 'POST';
      const res = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save course');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cise-hub-courses'] });
      queryClient.invalidateQueries({ queryKey: ['cise-hub-overview'] });
      setIsCourseModalOpen(false);
      setEditingCourse(null);
    }
  });

  const deleteCourseMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/hub/institute/courses/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete course');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cise-hub-courses'] });
      queryClient.invalidateQueries({ queryKey: ['cise-hub-overview'] });
    }
  });

  // Status updates for Inquiries
  const updateStatusMutation = useMutation({
    mutationFn: async ({ endpoint, id, status }: { endpoint: string; id: string; status: string }) => {
      const res = await apiFetch(`${endpoint}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Failed to update status');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cise-hub-insurance'] });
      queryClient.invalidateQueries({ queryKey: ['cise-hub-consultancy'] });
    }
  });

  // Handlers for Opening Modals
  const handleOpenPillarModal = (pillar?: any) => {
    if (pillar) {
      setEditingPillar(pillar);
      setPillarForm({
        slug: pillar.slug || '',
        titleEn: pillar.titleEn || '',
        titleAr: pillar.titleAr || '',
        titleZh: pillar.titleZh || '',
        titleCkb: pillar.titleCkb || '',
        descriptionEn: pillar.descriptionEn || '',
        descriptionAr: pillar.descriptionAr || '',
        descriptionZh: pillar.descriptionZh || '',
        descriptionCkb: pillar.descriptionCkb || '',
        leadFellowEn: pillar.leadFellowEn || '',
        leadFellowAr: pillar.leadFellowAr || '',
        leadFellowZh: pillar.leadFellowZh || '',
        leadFellowCkb: pillar.leadFellowCkb || '',
        metricLabelEn: pillar.metricLabelEn || '',
        metricLabelAr: pillar.metricLabelAr || '',
        metricLabelZh: pillar.metricLabelZh || '',
        metricLabelCkb: pillar.metricLabelCkb || '',
        metricValue: pillar.metricValue || '',
        topics: pillar.topics || '',
        displayOrder: pillar.displayOrder || 0,
        status: pillar.status || 'PUBLISHED'
      });
    } else {
      setEditingPillar(null);
      setPillarForm({
        slug: `pillar-${Date.now()}`,
        titleEn: '',
        titleAr: '',
        titleZh: '',
        titleCkb: '',
        descriptionEn: '',
        descriptionAr: '',
        descriptionZh: '',
        descriptionCkb: '',
        leadFellowEn: '',
        leadFellowAr: '',
        leadFellowZh: '',
        leadFellowCkb: '',
        metricLabelEn: '',
        metricLabelAr: '',
        metricLabelZh: '',
        metricLabelCkb: '',
        metricValue: '',
        topics: '["Macroeconomics", "Corridor Strategy"]',
        displayOrder: pillars.length + 1,
        status: 'PUBLISHED'
      });
    }
    setLocaleModalTab('en');
    setIsPillarModalOpen(true);
  };

  const handleOpenExpertModal = (expert?: any) => {
    if (expert) {
      setEditingExpert(expert);
      setExpertForm({
        slug: expert.slug || '',
        nameEn: expert.nameEn || '',
        nameAr: expert.nameAr || '',
        nameZh: expert.nameZh || '',
        nameCkb: expert.nameCkb || '',
        titleEn: expert.titleEn || '',
        titleAr: expert.titleAr || '',
        titleZh: expert.titleZh || '',
        titleCkb: expert.titleCkb || '',
        bioEn: expert.bioEn || '',
        bioAr: expert.bioAr || '',
        bioZh: expert.bioZh || '',
        bioCkb: expert.bioCkb || '',
        imageUrl: expert.imageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400',
        pillars: expert.pillars || '["energy-bri"]',
        languages: expert.languages || '["Chinese", "English", "Arabic"]',
        email: expert.email || '',
        phone: expert.phone || '',
        displayOrder: expert.displayOrder || 0,
        status: expert.status || 'PUBLISHED'
      });
    } else {
      setEditingExpert(null);
      setExpertForm({
        slug: `fellow-${Date.now()}`,
        nameEn: '',
        nameAr: '',
        nameZh: '',
        nameCkb: '',
        titleEn: '',
        titleAr: '',
        titleZh: '',
        titleCkb: '',
        bioEn: '',
        bioAr: '',
        bioZh: '',
        bioCkb: '',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400',
        pillars: '["energy-bri", "geo-economics"]',
        languages: '["Chinese", "English", "Arabic"]',
        email: '',
        phone: '',
        displayOrder: experts.length + 1,
        status: 'PUBLISHED'
      });
    }
    setLocaleModalTab('en');
    setIsExpertModalOpen(true);
  };

  const handleOpenPubModal = (pub?: any) => {
    if (pub) {
      setEditingPub(pub);
      setPubForm({
        slug: pub.slug || '',
        type: pub.type || 'WHITE_PAPER',
        publicationType: pub.publicationType || 'White Paper',
        titleEn: pub.titleEn || '',
        titleAr: pub.titleAr || '',
        titleZh: pub.titleZh || '',
        titleCkb: pub.titleCkb || '',
        excerptEn: pub.excerptEn || '',
        excerptAr: pub.excerptAr || '',
        excerptZh: pub.excerptZh || '',
        excerptCkb: pub.excerptCkb || '',
        contentEn: pub.contentEn || '',
        contentAr: pub.contentAr || '',
        contentZh: pub.contentZh || '',
        contentCkb: pub.contentCkb || '',
        imageUrl: pub.imageUrl || 'https://images.unsplash.com/photo-1521295121812-af46571d9ec6?auto=format&fit=crop&q=80&w=1200',
        authorName: pub.authorName || 'Dr. Wang Wei',
        topics: pub.topics || '["Energy", "Infrastructure"]',
        region: pub.region || 'BILATERAL',
        doi: pub.doi || '10.5281/zenodo.cise.2026.01',
        pdfUrl: pub.pdfUrl || '',
        wordCount: pub.wordCount || 3500,
        status: pub.status || 'PUBLISHED'
      });
    } else {
      setEditingPub(null);
      setPubForm({
        slug: `pub-${Date.now()}`,
        type: 'WHITE_PAPER',
        publicationType: 'White Paper',
        titleEn: '',
        titleAr: '',
        titleZh: '',
        titleCkb: '',
        excerptEn: '',
        excerptAr: '',
        excerptZh: '',
        excerptCkb: '',
        contentEn: '',
        contentAr: '',
        contentZh: '',
        contentCkb: '',
        imageUrl: 'https://images.unsplash.com/photo-1521295121812-af46571d9ec6?auto=format&fit=crop&q=80&w=1200',
        authorName: 'Dr. Wang Wei',
        topics: '["Energy", "Infrastructure"]',
        region: 'BILATERAL',
        doi: '10.5281/zenodo.cise.2026.01',
        pdfUrl: '',
        wordCount: 3500,
        status: 'PUBLISHED'
      });
    }
    setLocaleModalTab('en');
    setIsPubModalOpen(true);
  };

  const handleOpenEventModal = (event?: any) => {
    if (event) {
      setEditingEvent(event);
      setEventForm({
        slug: event.slug || '',
        titleEn: event.titleEn || '',
        titleAr: event.titleAr || '',
        titleZh: event.titleZh || '',
        titleCkb: event.titleCkb || '',
        descriptionEn: event.descriptionEn || '',
        descriptionAr: event.descriptionAr || '',
        descriptionZh: event.descriptionZh || '',
        descriptionCkb: event.descriptionCkb || '',
        locationEn: event.locationEn || '',
        locationAr: event.locationAr || '',
        locationZh: event.locationZh || '',
        locationCkb: event.locationCkb || '',
        eventDate: event.eventDate || '2026-11-12',
        eventType: event.eventType || 'SYMPOSIUM',
        registrationUrl: event.registrationUrl || '',
        displayOrder: event.displayOrder || 0,
        status: event.status || 'PUBLISHED'
      });
    } else {
      setEditingEvent(null);
      setEventForm({
        slug: `event-${Date.now()}`,
        titleEn: '',
        titleAr: '',
        titleZh: '',
        titleCkb: '',
        descriptionEn: '',
        descriptionAr: '',
        descriptionZh: '',
        descriptionCkb: '',
        locationEn: 'Sulaymaniyah Convention Center',
        locationAr: '',
        locationZh: '',
        locationCkb: '',
        eventDate: '2026-11-12',
        eventType: 'SYMPOSIUM',
        registrationUrl: '',
        displayOrder: events.length + 1,
        status: 'PUBLISHED'
      });
    }
    setLocaleModalTab('en');
    setIsEventModalOpen(true);
  };

  const handleOpenProjectModal = (project?: any) => {
    if (project) {
      setEditingProject(project);
      setProjectForm({
        slug: project.slug || '',
        nameEn: project.nameEn || '',
        nameAr: project.nameAr || '',
        nameZh: project.nameZh || '',
        nameCkb: project.nameCkb || '',
        sectorEn: project.sectorEn || 'Energy & Infrastructure',
        sectorAr: project.sectorAr || '',
        sectorZh: project.sectorZh || '',
        sectorCkb: project.sectorCkb || '',
        status: project.status || 'IN_PROGRESS',
        valueUsd: project.valueUsd || '$2.4B',
        contractor: project.contractor || '',
        locationEn: project.locationEn || '',
        locationAr: project.locationAr || '',
        locationZh: project.locationZh || '',
        locationCkb: project.locationCkb || '',
        verifiedSources: project.verifiedSources || '["Ministry of Transport Iraq"]',
        displayOrder: project.displayOrder || 0
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        slug: `project-${Date.now()}`,
        nameEn: '',
        nameAr: '',
        nameZh: '',
        nameCkb: '',
        sectorEn: 'Energy & Infrastructure',
        sectorAr: '',
        sectorZh: '',
        sectorCkb: '',
        status: 'IN_PROGRESS',
        valueUsd: '$1.5B',
        contractor: 'China National Petroleum Corp',
        locationEn: 'Basra, Iraq',
        locationAr: '',
        locationZh: '',
        locationCkb: '',
        verifiedSources: '["CBI Trade Registry", "OPEC+ Monitoring"]',
        displayOrder: projects.length + 1
      });
    }
    setLocaleModalTab('en');
    setIsProjectModalOpen(true);
  };

  const handleOpenCourseModal = (course?: any) => {
    if (course) {
      setEditingCourse(course);
      setCourseForm({
        slug: course.slug || '',
        level: course.level || 'HSK-1',
        titleEn: course.titleEn || '',
        titleAr: course.titleAr || '',
        titleZh: course.titleZh || '',
        titleCkb: course.titleCkb || '',
        descriptionEn: course.descriptionEn || '',
        descriptionAr: course.descriptionAr || '',
        descriptionZh: course.descriptionZh || '',
        descriptionCkb: course.descriptionCkb || '',
        duration: course.duration || '12 Weeks',
        schedule: course.schedule || 'Mon / Wed · 18:00 – 20:00',
        fee: course.fee || 'Free Sovereign Sponsorship',
        displayOrder: course.displayOrder || 0,
        status: course.status || 'ACTIVE'
      });
    } else {
      setEditingCourse(null);
      setCourseForm({
        slug: `course-${Date.now()}`,
        level: 'HSK-1',
        titleEn: '',
        titleAr: '',
        titleZh: '',
        titleCkb: '',
        descriptionEn: '',
        descriptionAr: '',
        descriptionZh: '',
        descriptionCkb: '',
        duration: '12 Weeks (48 Hours)',
        schedule: 'Tue / Thu · 18:00 – 20:00',
        fee: 'Free Sovereign Sponsorship',
        displayOrder: courses.length + 1,
        status: 'ACTIVE'
      });
    }
    setLocaleModalTab('en');
    setIsCourseModalOpen(true);
  };

  return (
    <div className="space-y-8" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Page Header with Strict Binding Terminology: CISE Command Hub */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--color-brand-800)]">
            <span>CISE Command Hub</span>
            <ChevronRight size={14} className="rtl:rotate-180" />
            <span>Institute & Research</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight mt-1">
            CISE Command Hub — Institute & Research Management
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl font-medium">
            Centralized administrative control surface for the Chinese Institute for Strategic and Economic Studies (CISE). Full CRUD governance over research pillars, fellows, publications, BRI corridor data, language courses, and sovereign dossiers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={`/${lang}/institute`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 shadow-sm transition-all"
          >
            <ExternalLink size={14} />
            <span>View Public CISE Portal</span>
          </Link>
          <button
            onClick={() => {
              toast.warning('Reseed CISE Institute database with verified canonical baseline records?', {
                action: {
                  label: 'Reseed',
                  onClick: () => reseedMutation.mutate()
                }
              });
            }}
            disabled={reseedMutation.isPending}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold shadow-sm transition-all disabled:opacity-50"
          >
            <RefreshCw size={14} className={reseedMutation.isPending ? 'animate-spin' : ''} />
            <span>Reseed Canonical Data</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto pb-2 scrollbar-none gap-2 border-b border-neutral-200 dark:border-neutral-800">
        {[
          { id: 'overview', label: 'Overview & Metrics', icon: Layers, count: null },
          { id: 'pillars', label: 'Research Pillars', icon: BookOpen, count: pillars.length },
          { id: 'experts', label: 'Fellows & Scholars', icon: Users, count: experts.length },
          { id: 'publications', label: 'Publications', icon: FileText, count: publications.length },
          { id: 'events', label: 'Events & Symposia', icon: Calendar, count: events.length },
          { id: 'projects', label: 'BRI Projects', icon: Building2, count: projects.length },
          { id: 'courses', label: 'Language Courses', icon: GraduationCap, count: courses.length },
          { id: 'inquiries', label: 'Sovereign Dossiers', icon: ShieldCheck, count: null },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[var(--color-brand-800)] text-neutral-900 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  isActive ? 'bg-neutral-900/15 text-neutral-900' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <div className="flex items-center justify-between text-neutral-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Research Pillars</span>
                <BookOpen size={18} className="text-[var(--color-brand-800)]" />
              </div>
              <div className="text-3xl font-black text-neutral-900 dark:text-white">{overview?.pillarsCount ?? pillars.length}</div>
              <div className="text-[11px] text-emerald-600 font-bold mt-1">4 Canonical Domains Active</div>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <div className="flex items-center justify-between text-neutral-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Academic Fellows</span>
                <Users size={18} className="text-[var(--color-brand-800)]" />
              </div>
              <div className="text-3xl font-black text-neutral-900 dark:text-white">{overview?.expertsCount ?? experts.length}</div>
              <div className="text-[11px] text-neutral-500 font-bold mt-1">Senior Scholars & Advisors</div>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <div className="flex items-center justify-between text-neutral-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Publications</span>
                <FileText size={18} className="text-[var(--color-brand-800)]" />
              </div>
              <div className="text-3xl font-black text-neutral-900 dark:text-white">{overview?.pubsCount ?? publications.length}</div>
              <div className="text-[11px] text-neutral-500 font-bold mt-1">White Papers & Briefs</div>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <div className="flex items-center justify-between text-neutral-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">BRI Projects</span>
                <Building2 size={18} className="text-[var(--color-brand-800)]" />
              </div>
              <div className="text-3xl font-black text-neutral-900 dark:text-white">{overview?.projectsCount ?? projects.length}</div>
              <div className="text-[11px] text-emerald-600 font-bold mt-1">Corridor Observatory Active</div>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <div className="flex items-center justify-between text-neutral-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Language Courses</span>
                <GraduationCap size={18} className="text-[var(--color-brand-800)]" />
              </div>
              <div className="text-3xl font-black text-neutral-900 dark:text-white">{overview?.coursesCount ?? courses.length}</div>
              <div className="text-[11px] text-neutral-500 font-bold mt-1">HSK 1-6 Tracks</div>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <div className="flex items-center justify-between text-neutral-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Sinosure Applications</span>
                <ShieldCheck size={18} className="text-[var(--color-brand-800)]" />
              </div>
              <div className="text-3xl font-black text-neutral-900 dark:text-white">{overview?.insuranceCount ?? 0}</div>
              <div className="text-[11px] text-neutral-500 font-bold mt-1">Credit & Risk Facilitation</div>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <div className="flex items-center justify-between text-neutral-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Consultancies</span>
                <TrendingUp size={18} className="text-[var(--color-brand-800)]" />
              </div>
              <div className="text-3xl font-black text-neutral-900 dark:text-white">{overview?.consultancyCount ?? 0}</div>
              <div className="text-[11px] text-neutral-500 font-bold mt-1">Strategic Legal & Trade</div>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <div className="flex items-center justify-between text-neutral-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">System State</span>
                <CheckCircle2 size={18} className="text-emerald-500" />
              </div>
              <div className="text-xl font-black text-emerald-600">ONLINE & SYNCED</div>
              <div className="text-[11px] text-neutral-500 font-bold mt-1">Prisma PostgreSQL Verified</div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-wider text-neutral-900 dark:text-white mb-4">
              Quick Governance Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => { setActiveTab('pillars'); handleOpenPillarModal(); }}
                className="flex items-center gap-2 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-[var(--color-brand-800)] hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200 transition-all text-start"
              >
                <Plus size={16} className="text-[var(--color-brand-800)]" />
                <span>Add Research Pillar</span>
              </button>
              <button
                onClick={() => { setActiveTab('experts'); handleOpenExpertModal(); }}
                className="flex items-center gap-2 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-[var(--color-brand-800)] hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200 transition-all text-start"
              >
                <Plus size={16} className="text-[var(--color-brand-800)]" />
                <span>Add Academic Fellow</span>
              </button>
              <button
                onClick={() => { setActiveTab('publications'); handleOpenPubModal(); }}
                className="flex items-center gap-2 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-[var(--color-brand-800)] hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200 transition-all text-start"
              >
                <Plus size={16} className="text-[var(--color-brand-800)]" />
                <span>Publish White Paper</span>
              </button>
              <button
                onClick={() => { setActiveTab('projects'); handleOpenProjectModal(); }}
                className="flex items-center gap-2 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-[var(--color-brand-800)] hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200 transition-all text-start"
              >
                <Plus size={16} className="text-[var(--color-brand-800)]" />
                <span>Log BRI Corridor Project</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PILLARS TAB */}
      {activeTab === 'pillars' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-neutral-900 dark:text-white">Research Pillars ({pillars.length})</h2>
              <p className="text-xs text-neutral-500">Core strategic research domains powering CISE intelligence reports.</p>
            </div>
            <button
              onClick={() => handleOpenPillarModal()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-brand-800)] text-neutral-900 text-xs font-black shadow-sm transition-transform hover:scale-105"
            >
              <Plus size={16} />
              <span>Create New Pillar</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pillars.map((pillar: any) => (
              <div
                key={pillar.id}
                className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                      {pillar.slug}
                    </span>
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase ${
                      pillar.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {pillar.status}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-neutral-900 dark:text-white">{pillar.titleEn}</h3>
                  <div className="text-xs font-bold text-neutral-500 mt-0.5">{pillar.titleAr} · {pillar.titleZh}</div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 line-clamp-3">
                    {pillar.descriptionEn}
                  </p>

                  <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-bold">
                    <div>
                      <span className="text-neutral-400">Lead Fellow: </span>
                      <span className="text-neutral-800 dark:text-neutral-200">{pillar.leadFellowEn || 'Unassigned'}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400">{pillar.metricLabelEn || 'Metric'}: </span>
                      <span className="text-[var(--color-brand-800)] font-black">{pillar.metricValue}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    onClick={() => handleOpenPillarModal(pillar)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  >
                    <Edit2 size={13} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      toast.warning(`Delete research pillar "${pillar.titleEn}"?`, {
                        action: {
                          label: 'Delete',
                          onClick: () => deletePillarMutation.mutate(pillar.id)
                        }
                      });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EXPERTS TAB */}
      {activeTab === 'experts' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-neutral-900 dark:text-white">Academic Fellows & Experts ({experts.length})</h2>
              <p className="text-xs text-neutral-500">Bilateral senior research fellows, macroeconomic advisors, and diplomatic scholars.</p>
            </div>
            <button
              onClick={() => handleOpenExpertModal()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-brand-800)] text-neutral-900 text-xs font-black shadow-sm transition-transform hover:scale-105"
            >
              <Plus size={16} />
              <span>Add Fellow</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {experts.map((exp: any) => (
              <div
                key={exp.id}
                className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4">
                    <img
                      src={exp.imageUrl}
                      alt={exp.nameEn}
                      className="w-16 h-16 rounded-xl object-cover border border-neutral-200 dark:border-neutral-700"
                    />
                    <div>
                      <h3 className="text-sm font-black text-neutral-900 dark:text-white">{exp.nameEn}</h3>
                      <div className="text-xs font-bold text-neutral-500">{exp.nameAr} · {exp.nameZh}</div>
                      <div className="text-[11px] font-bold text-[var(--color-brand-800)] mt-1">{exp.titleEn}</div>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-4 line-clamp-2">
                    {exp.bioEn}
                  </p>

                  <div className="mt-3 text-[11px] text-neutral-500 space-y-1">
                    {exp.email && (
                      <div className="flex items-center gap-1.5">
                        <Mail size={12} />
                        <span>{exp.email}</span>
                      </div>
                    )}
                    {exp.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone size={12} />
                        <span>{exp.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    onClick={() => handleOpenExpertModal(exp)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  >
                    <Edit2 size={13} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      toast.warning(`Delete expert "${exp.nameEn}"?`, {
                        action: {
                          label: 'Delete',
                          onClick: () => deleteExpertMutation.mutate(exp.id)
                        }
                      });
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-200 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PUBLICATIONS TAB */}
      {activeTab === 'publications' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-neutral-900 dark:text-white">Publications Archive ({publications.length})</h2>
              <p className="text-xs text-neutral-500">Peer-reviewed policy briefs, white papers, and macroeconomic assessments.</p>
            </div>
            <button
              onClick={() => handleOpenPubModal()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-brand-800)] text-neutral-900 text-xs font-black shadow-sm transition-transform hover:scale-105"
            >
              <Plus size={16} />
              <span>New Publication</span>
            </button>
          </div>

          <div className="space-y-3">
            {publications.map((pub: any) => (
              <div
                key={pub.id}
                className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[var(--color-brand-800)] text-neutral-900">
                      {pub.type}
                    </span>
                    <span className="text-xs text-neutral-400 font-bold">
                      {new Date(pub.publishedAt || Date.now()).toLocaleDateString()}
                    </span>
                    <span className="text-xs text-neutral-400 font-bold">· DOI: {pub.doi || 'N/A'}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-neutral-900 dark:text-white truncate">
                    {pub.titleEn}
                  </h3>
                  <div className="text-xs text-neutral-500 font-bold mt-0.5 truncate">
                    {pub.titleAr} · {pub.titleZh}
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-1">
                    {pub.excerptEn}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleOpenPubModal(pub)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  >
                    <Edit2 size={13} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      toast.warning(`Delete publication "${pub.titleEn}"?`, {
                        action: {
                          label: 'Delete',
                          onClick: () => deletePubMutation.mutate(pub.id)
                        }
                      });
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-200 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EVENTS TAB */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-neutral-900 dark:text-white">Bilateral Events & Symposia ({events.length})</h2>
              <p className="text-xs text-neutral-500">Diplomatic forums, academic roundtables, and BRI summits.</p>
            </div>
            <button
              onClick={() => handleOpenEventModal()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-brand-800)] text-neutral-900 text-xs font-black shadow-sm transition-transform hover:scale-105"
            >
              <Plus size={16} />
              <span>Create Event</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((ev: any) => (
              <div
                key={ev.id}
                className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                      {ev.eventType}
                    </span>
                    <span className="text-xs font-bold text-[var(--color-brand-800)]">
                      {ev.eventDate}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-neutral-900 dark:text-white">{ev.titleEn}</h3>
                  <div className="text-xs text-neutral-500 font-bold">{ev.titleAr} · {ev.titleZh}</div>
                  <div className="text-xs text-neutral-500 mt-2 font-medium">{ev.locationEn}</div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    onClick={() => handleOpenEventModal(ev)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  >
                    <Edit2 size={13} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      toast.warning(`Delete event "${ev.titleEn}"?`, {
                        action: {
                          label: 'Delete',
                          onClick: () => deleteEventMutation.mutate(ev.id)
                        }
                      });
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-200 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BRI PROJECTS TAB */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-neutral-900 dark:text-white">BRI Infrastructure Observatory ({projects.length})</h2>
              <p className="text-xs text-neutral-500">Tracking sovereign oil-for-projects EPC contracts and corridor logistics nodes.</p>
            </div>
            <button
              onClick={() => handleOpenProjectModal()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-brand-800)] text-neutral-900 text-xs font-black shadow-sm transition-transform hover:scale-105"
            >
              <Plus size={16} />
              <span>Add Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((proj: any) => (
              <div
                key={proj.id}
                className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400">
                      {proj.status}
                    </span>
                    <span className="text-sm font-black text-[var(--color-brand-800)]">{proj.valueUsd}</span>
                  </div>
                  <h3 className="text-sm font-black text-neutral-900 dark:text-white">{proj.nameEn}</h3>
                  <div className="text-xs text-neutral-500 font-bold">{proj.nameAr} · {proj.nameZh}</div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
                    Contractor: <span className="font-bold text-neutral-800 dark:text-neutral-200">{proj.contractor}</span>
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">
                    Location: <span className="font-bold text-neutral-800 dark:text-neutral-200">{proj.locationEn}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    onClick={() => handleOpenProjectModal(proj)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  >
                    <Edit2 size={13} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      toast.warning(`Delete project "${proj.nameEn}"?`, {
                        action: {
                          label: 'Delete',
                          onClick: () => deleteProjectMutation.mutate(proj.id)
                        }
                      });
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-200 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COURSES TAB */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-neutral-900 dark:text-white">Chinese Language Courses ({courses.length})</h2>
              <p className="text-xs text-neutral-500">Official HSK 1-6 cohorts, Business Chinese, and diplomatic language curricula.</p>
            </div>
            <button
              onClick={() => handleOpenCourseModal()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-brand-800)] text-neutral-900 text-xs font-black shadow-sm transition-transform hover:scale-105"
            >
              <Plus size={16} />
              <span>Add Course</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course: any) => (
              <div
                key={course.id}
                className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[var(--color-brand-800)] text-neutral-900">
                      {course.level}
                    </span>
                    <span className="text-xs font-bold text-emerald-600">{course.fee}</span>
                  </div>
                  <h3 className="text-sm font-black text-neutral-900 dark:text-white">{course.titleEn}</h3>
                  <div className="text-xs text-neutral-500 font-bold">{course.titleAr} · {course.titleZh}</div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
                    Schedule: <span className="font-bold">{course.schedule}</span>
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">
                    Duration: <span className="font-bold">{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    onClick={() => handleOpenCourseModal(course)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  >
                    <Edit2 size={13} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      toast.warning(`Delete course "${course.titleEn}"?`, {
                        action: {
                          label: 'Delete',
                          onClick: () => deleteCourseMutation.mutate(course.id)
                        }
                      });
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-200 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* INQUIRIES TAB */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          <div className="flex border-b border-neutral-200 dark:border-neutral-800 gap-4">
            <button
              onClick={() => setInquirySubTab('insurance')}
              className={`pb-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                inquirySubTab === 'insurance'
                  ? 'border-[var(--color-brand-800)] text-[var(--color-brand-800)]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              Sinosure Insurance Facilitation ({insuranceApps.length})
            </button>
            <button
              onClick={() => setInquirySubTab('consultancy')}
              className={`pb-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                inquirySubTab === 'consultancy'
                  ? 'border-[var(--color-brand-800)] text-[var(--color-brand-800)]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              Strategic Consultancy ({consultInqs.length})
            </button>
            <button
              onClick={() => setInquirySubTab('media')}
              className={`pb-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                inquirySubTab === 'media'
                  ? 'border-[var(--color-brand-800)] text-[var(--color-brand-800)]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              Media Interviews & Syndication ({mediaRequests.length})
            </button>
          </div>

          {/* Sub-tab 1: Insurance */}
          {inquirySubTab === 'insurance' && (
            <div className="space-y-3">
              {insuranceApps.length === 0 ? (
                <div className="p-8 text-center bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500">
                  No sovereign insurance facilitation applications logged yet.
                </div>
              ) : (
                insuranceApps.map((app: any) => (
                  <div
                    key={app.id}
                    className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-[var(--color-brand-800)]">{app.ticketId}</span>
                        <span className="text-xs text-neutral-400 font-medium">
                          {new Date(app.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <h3 className="text-sm font-black text-neutral-900 dark:text-white">
                        {app.fullName} · {app.company}
                      </h3>
                      <div className="text-xs text-neutral-500 mt-1">
                        Email: {app.email} · Phone: {app.phone || 'N/A'} · Sector: {app.sector}
                      </div>
                      {app.message && (
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 bg-neutral-50 dark:bg-neutral-800/50 p-2.5 rounded-lg">
                          "{app.message}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={app.status}
                        onChange={(e) =>
                          updateStatusMutation.mutate({
                            endpoint: '/api/hub/institute/insurance-applications',
                            id: app.id,
                            status: e.target.value
                          })
                        }
                        className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold rounded-lg px-3 py-1.5 outline-none"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="REVIEWING">UNDER REVIEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Sub-tab 2: Consultancy */}
          {inquirySubTab === 'consultancy' && (
            <div className="space-y-3">
              {consultInqs.length === 0 ? (
                <div className="p-8 text-center bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500">
                  No strategic consultancy inquiries logged yet.
                </div>
              ) : (
                consultInqs.map((inq: any) => (
                  <div
                    key={inq.id}
                    className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-[var(--color-brand-800)]">{inq.ticketId}</span>
                        <span className="text-xs text-neutral-400 font-medium">
                          {new Date(inq.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <h3 className="text-sm font-black text-neutral-900 dark:text-white">
                        {inq.fullName} · {inq.entityName}
                      </h3>
                      <div className="text-xs text-neutral-500 mt-1">
                        Email: {inq.email} · Phone: {inq.phone || 'N/A'} · Type: {inq.serviceType} ({inq.jurisdiction})
                      </div>
                      {inq.inquiryText && (
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 bg-neutral-50 dark:bg-neutral-800/50 p-2.5 rounded-lg">
                          "{inq.inquiryText}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={inq.status}
                        onChange={(e) =>
                          updateStatusMutation.mutate({
                            endpoint: '/api/hub/institute/consultancy-inquiries',
                            id: inq.id,
                            status: e.target.value
                          })
                        }
                        className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold rounded-lg px-3 py-1.5 outline-none"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="REVIEWING">UNDER REVIEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="ENGAGED">ENGAGED</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Sub-tab 3: Media */}
          {inquirySubTab === 'media' && (
            <div className="space-y-3">
              {mediaRequests.length === 0 ? (
                <div className="p-8 text-center bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500">
                  No media interview or research syndication requests logged yet.
                </div>
              ) : (
                mediaRequests.map((req: any) => (
                  <div
                    key={req.id}
                    className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-[var(--color-brand-800)]">{req.hash}</span>
                      <span className="text-xs text-neutral-400 font-medium">
                        {new Date(req.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <h3 className="text-sm font-black text-neutral-900 dark:text-white">
                      {req.fullName} · {req.company}
                    </h3>
                    <div className="text-xs text-neutral-500 mt-1">
                      Email: {req.email} · Bureau: {req.bureau}
                    </div>
                    {req.bio && (
                      <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800/50 p-3 rounded-lg font-mono">
                        {req.bio}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* --- MODAL DIALOGS --- */}

      {/* Pillar Modal */}
      {isPillarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-900 w-full max-w-2xl rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <h3 className="text-base font-black text-neutral-900 dark:text-white">
                {editingPillar ? 'Edit Research Pillar' : 'Create New Research Pillar'}
              </h3>
              <button onClick={() => setIsPillarModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <X size={18} />
              </button>
            </div>

            {/* Locale Tabs */}
            <div className="flex gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-2">
              {(['en', 'ar', 'zh', 'ckb'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocaleModalTab(l)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                    localeModalTab === l
                      ? 'bg-[var(--color-brand-800)] text-neutral-900'
                      : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  {l === 'en' ? 'English' : l === 'ar' ? 'العربية' : l === 'zh' ? '中文' : 'کوردی'}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Pillar Slug (unique)</label>
                <input
                  type="text"
                  value={pillarForm.slug}
                  onChange={(e) => setPillarForm({ ...pillarForm, slug: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                />
              </div>

              {localeModalTab === 'en' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Title (English)</label>
                    <input
                      type="text"
                      value={pillarForm.titleEn}
                      onChange={(e) => setPillarForm({ ...pillarForm, titleEn: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Description (English)</label>
                    <textarea
                      rows={3}
                      value={pillarForm.descriptionEn}
                      onChange={(e) => setPillarForm({ ...pillarForm, descriptionEn: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Lead Fellow (English)</label>
                    <input
                      type="text"
                      value={pillarForm.leadFellowEn}
                      onChange={(e) => setPillarForm({ ...pillarForm, leadFellowEn: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                    />
                  </div>
                </>
              )}

              {localeModalTab === 'ar' && (
                <div dir="rtl" className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">العنوان (العربية)</label>
                    <input
                      type="text"
                      value={pillarForm.titleAr}
                      onChange={(e) => setPillarForm({ ...pillarForm, titleAr: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">الوصف (العربية)</label>
                    <textarea
                      rows={3}
                      value={pillarForm.descriptionAr}
                      onChange={(e) => setPillarForm({ ...pillarForm, descriptionAr: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">الباحث الرئيسي (العربية)</label>
                    <input
                      type="text"
                      value={pillarForm.leadFellowAr}
                      onChange={(e) => setPillarForm({ ...pillarForm, leadFellowAr: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                    />
                  </div>
                </div>
              )}

              {localeModalTab === 'zh' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">标题 (中文)</label>
                    <input
                      type="text"
                      value={pillarForm.titleZh}
                      onChange={(e) => setPillarForm({ ...pillarForm, titleZh: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">描述 (中文)</label>
                    <textarea
                      rows={3}
                      value={pillarForm.descriptionZh}
                      onChange={(e) => setPillarForm({ ...pillarForm, descriptionZh: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">首席研究员 (中文)</label>
                    <input
                      type="text"
                      value={pillarForm.leadFellowZh}
                      onChange={(e) => setPillarForm({ ...pillarForm, leadFellowZh: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                    />
                  </div>
                </div>
              )}

              {localeModalTab === 'ckb' && (
                <div dir="rtl" className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">ناونیشان (کوردی)</label>
                    <input
                      type="text"
                      value={pillarForm.titleCkb}
                      onChange={(e) => setPillarForm({ ...pillarForm, titleCkb: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">وەسف (کوردی)</label>
                    <textarea
                      rows={3}
                      value={pillarForm.descriptionCkb}
                      onChange={(e) => setPillarForm({ ...pillarForm, descriptionCkb: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Metric Value</label>
                  <input
                    type="text"
                    value={pillarForm.metricValue}
                    onChange={(e) => setPillarForm({ ...pillarForm, metricValue: e.target.value })}
                    placeholder="e.g. 34.2%"
                    className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Status</label>
                  <select
                    value={pillarForm.status}
                    onChange={(e) => setPillarForm({ ...pillarForm, status: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                  >
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="DRAFT">DRAFT</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => setIsPillarModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-600 dark:text-neutral-400"
              >
                Cancel
              </button>
              <button
                onClick={() => savePillarMutation.mutate(pillarForm)}
                disabled={savePillarMutation.isPending}
                className="px-5 py-2 rounded-xl bg-[var(--color-brand-800)] text-neutral-900 text-xs font-black"
              >
                {savePillarMutation.isPending ? 'Saving...' : 'Save Pillar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expert Modal */}
      {isExpertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-900 w-full max-w-2xl rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <h3 className="text-base font-black text-neutral-900 dark:text-white">
                {editingExpert ? 'Edit Academic Fellow' : 'Add New Academic Fellow'}
              </h3>
              <button onClick={() => setIsExpertModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <X size={18} />
              </button>
            </div>

            {/* Locale Tabs */}
            <div className="flex gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-2">
              {(['en', 'ar', 'zh', 'ckb'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocaleModalTab(l)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                    localeModalTab === l
                      ? 'bg-[var(--color-brand-800)] text-neutral-900'
                      : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  {l === 'en' ? 'English' : l === 'ar' ? 'العربية' : l === 'zh' ? '中文' : 'کوردی'}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Scholar Slug</label>
                <input
                  type="text"
                  value={expertForm.slug}
                  onChange={(e) => setExpertForm({ ...expertForm, slug: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                />
              </div>

              {localeModalTab === 'en' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Name (English)</label>
                    <input
                      type="text"
                      value={expertForm.nameEn}
                      onChange={(e) => setExpertForm({ ...expertForm, nameEn: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Academic Title (English)</label>
                    <input
                      type="text"
                      value={expertForm.titleEn}
                      onChange={(e) => setExpertForm({ ...expertForm, titleEn: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Biography (English)</label>
                    <textarea
                      rows={3}
                      value={expertForm.bioEn}
                      onChange={(e) => setExpertForm({ ...expertForm, bioEn: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium outline-none"
                    />
                  </div>
                </>
              )}

              {localeModalTab === 'ar' && (
                <div dir="rtl" className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">الاسم (العربية)</label>
                    <input
                      type="text"
                      value={expertForm.nameAr}
                      onChange={(e) => setExpertForm({ ...expertForm, nameAr: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">اللقب الأكاديمي (العربية)</label>
                    <input
                      type="text"
                      value={expertForm.titleAr}
                      onChange={(e) => setExpertForm({ ...expertForm, titleAr: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">السيرة الذاتية (العربية)</label>
                    <textarea
                      rows={3}
                      value={expertForm.bioAr}
                      onChange={(e) => setExpertForm({ ...expertForm, bioAr: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium outline-none"
                    />
                  </div>
                </div>
              )}

              {localeModalTab === 'zh' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">姓名 (中文)</label>
                    <input
                      type="text"
                      value={expertForm.nameZh}
                      onChange={(e) => setExpertForm({ ...expertForm, nameZh: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">职位/头衔 (中文)</label>
                    <input
                      type="text"
                      value={expertForm.titleZh}
                      onChange={(e) => setExpertForm({ ...expertForm, titleZh: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">个人简介 (中文)</label>
                    <textarea
                      rows={3}
                      value={expertForm.bioZh}
                      onChange={(e) => setExpertForm({ ...expertForm, bioZh: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium outline-none"
                    />
                  </div>
                </div>
              )}

              {localeModalTab === 'ckb' && (
                <div dir="rtl" className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">ناو (کوردی)</label>
                    <input
                      type="text"
                      value={expertForm.nameCkb}
                      onChange={(e) => setExpertForm({ ...expertForm, nameCkb: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">ناونیشانی ئەکادیمی (کوردی)</label>
                    <input
                      type="text"
                      value={expertForm.titleCkb}
                      onChange={(e) => setExpertForm({ ...expertForm, titleCkb: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Photo URL</label>
                  <input
                    type="text"
                    value={expertForm.imageUrl}
                    onChange={(e) => setExpertForm({ ...expertForm, imageUrl: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Email</label>
                  <input
                    type="email"
                    value={expertForm.email}
                    onChange={(e) => setExpertForm({ ...expertForm, email: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => setIsExpertModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-600 dark:text-neutral-400"
              >
                Cancel
              </button>
              <button
                onClick={() => saveExpertMutation.mutate(expertForm)}
                disabled={saveExpertMutation.isPending}
                className="px-5 py-2 rounded-xl bg-[var(--color-brand-800)] text-neutral-900 text-xs font-black"
              >
                {saveExpertMutation.isPending ? 'Saving...' : 'Save Fellow'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Publication Modal */}
      {isPubModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-900 w-full max-w-2xl rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <h3 className="text-base font-black text-neutral-900 dark:text-white">
                {editingPub ? 'Edit Strategic Publication' : 'Add Strategic Publication'}
              </h3>
              <button onClick={() => setIsPubModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <X size={18} />
              </button>
            </div>

            {/* Locale Tabs */}
            <div className="flex gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-2">
              {(['en', 'ar', 'zh', 'ckb'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocaleModalTab(l)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                    localeModalTab === l
                      ? 'bg-[var(--color-brand-800)] text-neutral-900'
                      : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  {l === 'en' ? 'English' : l === 'ar' ? 'العربية' : l === 'zh' ? '中文' : 'کوردی'}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Publication Slug</label>
                  <input
                    type="text"
                    value={pubForm.slug}
                    onChange={(e) => setPubForm({ ...pubForm, slug: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Type</label>
                  <select
                    value={pubForm.type}
                    onChange={(e) => setPubForm({ ...pubForm, type: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                  >
                    <option value="WHITE_PAPER">White Paper</option>
                    <option value="POLICY_BRIEF">Policy Brief</option>
                    <option value="WORKING_PAPER">Working Paper</option>
                    <option value="ANNUAL_REPORT">Annual Report</option>
                    <option value="DATA_NOTE">Data Note</option>
                  </select>
                </div>
              </div>

              {localeModalTab === 'en' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Title (English)</label>
                    <input
                      type="text"
                      value={pubForm.titleEn}
                      onChange={(e) => setPubForm({ ...pubForm, titleEn: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Executive Excerpt (English)</label>
                    <textarea
                      rows={3}
                      value={pubForm.excerptEn}
                      onChange={(e) => setPubForm({ ...pubForm, excerptEn: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium outline-none"
                    />
                  </div>
                </>
              )}

              {localeModalTab === 'ar' && (
                <div dir="rtl" className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">العنوان (العربية)</label>
                    <input
                      type="text"
                      value={pubForm.titleAr}
                      onChange={(e) => setPubForm({ ...pubForm, titleAr: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">الموجز التنفيذي (العربية)</label>
                    <textarea
                      rows={3}
                      value={pubForm.excerptAr}
                      onChange={(e) => setPubForm({ ...pubForm, excerptAr: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium outline-none"
                    />
                  </div>
                </div>
              )}

              {localeModalTab === 'zh' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">报告标题 (中文)</label>
                    <input
                      type="text"
                      value={pubForm.titleZh}
                      onChange={(e) => setPubForm({ ...pubForm, titleZh: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">执行摘要 (中文)</label>
                    <textarea
                      rows={3}
                      value={pubForm.excerptZh}
                      onChange={(e) => setPubForm({ ...pubForm, excerptZh: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium outline-none"
                    />
                  </div>
                </div>
              )}

              {localeModalTab === 'ckb' && (
                <div dir="rtl" className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">ناونیشان (کوردی)</label>
                    <input
                      type="text"
                      value={pubForm.titleCkb}
                      onChange={(e) => setPubForm({ ...pubForm, titleCkb: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Lead Author</label>
                  <input
                    type="text"
                    value={pubForm.authorName}
                    onChange={(e) => setPubForm({ ...pubForm, authorName: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">DOI / Identifier</label>
                  <input
                    type="text"
                    value={pubForm.doi}
                    onChange={(e) => setPubForm({ ...pubForm, doi: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => setIsPubModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-600 dark:text-neutral-400"
              >
                Cancel
              </button>
              <button
                onClick={() => savePubMutation.mutate(pubForm)}
                disabled={savePubMutation.isPending}
                className="px-5 py-2 rounded-xl bg-[var(--color-brand-800)] text-neutral-900 text-xs font-black"
              >
                {savePubMutation.isPending ? 'Saving...' : 'Save Publication'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-900 w-full max-w-xl rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <h3 className="text-base font-black text-neutral-900 dark:text-white">
                {editingEvent ? 'Edit Event' : 'Create Bilateral Event'}
              </h3>
              <button onClick={() => setIsEventModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Event Title (English)</label>
                <input
                  type="text"
                  value={eventForm.titleEn}
                  onChange={(e) => setEventForm({ ...eventForm, titleEn: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Date</label>
                  <input
                    type="date"
                    value={eventForm.eventDate}
                    onChange={(e) => setEventForm({ ...eventForm, eventDate: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Location</label>
                  <input
                    type="text"
                    value={eventForm.locationEn}
                    onChange={(e) => setEventForm({ ...eventForm, locationEn: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => setIsEventModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-600 dark:text-neutral-400"
              >
                Cancel
              </button>
              <button
                onClick={() => saveEventMutation.mutate(eventForm)}
                disabled={saveEventMutation.isPending}
                className="px-5 py-2 rounded-xl bg-[var(--color-brand-800)] text-neutral-900 text-xs font-black"
              >
                {saveEventMutation.isPending ? 'Saving...' : 'Save Event'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-900 w-full max-w-xl rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <h3 className="text-base font-black text-neutral-900 dark:text-white">
                {editingProject ? 'Edit BRI Project' : 'Log BRI Corridor Project'}
              </h3>
              <button onClick={() => setIsProjectModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Project Name (English)</label>
                <input
                  type="text"
                  value={projectForm.nameEn}
                  onChange={(e) => setProjectForm({ ...projectForm, nameEn: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Contractor</label>
                  <input
                    type="text"
                    value={projectForm.contractor}
                    onChange={(e) => setProjectForm({ ...projectForm, contractor: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Value (USD)</label>
                  <input
                    type="text"
                    value={projectForm.valueUsd}
                    onChange={(e) => setProjectForm({ ...projectForm, valueUsd: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Location</label>
                  <input
                    type="text"
                    value={projectForm.locationEn}
                    onChange={(e) => setProjectForm({ ...projectForm, locationEn: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Status</label>
                  <select
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                  >
                    <option value="OPERATIONAL">OPERATIONAL</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="COMMISSIONING">COMMISSIONING</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-600 dark:text-neutral-400"
              >
                Cancel
              </button>
              <button
                onClick={() => saveProjectMutation.mutate(projectForm)}
                disabled={saveProjectMutation.isPending}
                className="px-5 py-2 rounded-xl bg-[var(--color-brand-800)] text-neutral-900 text-xs font-black"
              >
                {saveProjectMutation.isPending ? 'Saving...' : 'Save Project'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Course Modal */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-900 w-full max-w-xl rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <h3 className="text-base font-black text-neutral-900 dark:text-white">
                {editingCourse ? 'Edit Chinese Course' : 'Add Chinese Course'}
              </h3>
              <button onClick={() => setIsCourseModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Course Title (English)</label>
                <input
                  type="text"
                  value={courseForm.titleEn}
                  onChange={(e) => setCourseForm({ ...courseForm, titleEn: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Level</label>
                  <select
                    value={courseForm.level}
                    onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                  >
                    <option value="HSK-1">HSK-1</option>
                    <option value="HSK-2">HSK-2</option>
                    <option value="HSK-3">HSK-3</option>
                    <option value="HSK-4">HSK-4</option>
                    <option value="HSK-5">HSK-5</option>
                    <option value="HSK-6">HSK-6</option>
                    <option value="BUSINESS">Business Chinese</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Duration</label>
                  <input
                    type="text"
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Schedule</label>
                <input
                  type="text"
                  value={courseForm.schedule}
                  onChange={(e) => setCourseForm({ ...courseForm, schedule: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => setIsCourseModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-600 dark:text-neutral-400"
              >
                Cancel
              </button>
              <button
                onClick={() => saveCourseMutation.mutate(courseForm)}
                disabled={saveCourseMutation.isPending}
                className="px-5 py-2 rounded-xl bg-[var(--color-brand-800)] text-neutral-900 text-xs font-black"
              >
                {saveCourseMutation.isPending ? 'Saving...' : 'Save Course'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default CiseCommandHubInstitute;
