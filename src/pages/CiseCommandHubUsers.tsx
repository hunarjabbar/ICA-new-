import { apiFetch } from '../lib/api';
import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Plus, Search, Shield, User, Mail, Trash2, Edit, Activity, Award, Key, RefreshCw, QrCode, Phone, Calendar, Globe, AlertCircle, CheckCircle2, Download } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import { toast } from 'sonner';

export function CiseCommandHubUsersContent() {
  const { lang } = useParams<{ lang: string }>();
  const queryClient = useQueryClient();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [clearanceFilter, setClearanceFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [credentialCardUser, setCredentialCardUser] = useState<any>(null);
  const [editingUser, setEditingUser] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'AUTHOR',
    department: 'Editorial & Information',
    title: 'Strategic Analyst',
    clearanceLevel: 'LEVEL-2',
    badgeStatus: 'ACTIVE',
    digitalId: '',
    memberCode: '',
    nationality: 'Iraqi / Chinese',
    passportOrIdNumber: '',
    asaishCode: '',
    iraqiInfoCard: '',
    addressHouseNo: '',
    addressStreetNo: '',
    addressDistrictName: '',
    addressDistrictNumber: '',
    phoneNumber: '',
    dateOfBirth: '',
    emergencyContact: '',
    credentialExpiryDate: '',
    subscriptionStatus: 'INACTIVE',
    subscriptionPlan: 'PREMIUM'
  });

  const generateUniqueIdentifiers = () => {
    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setFormData(prev => ({
      ...prev,
      digitalId: `ICA-DID-2026-${randomSuffix}`,
      memberCode: `ICA-M-${randomCode}`
    }));
  };

  const badgeRef = useRef<HTMLDivElement>(null);

  const generateCanvasFallback = (user: any) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 900;
      canvas.height = 540;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Card Background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 900, 540);

      // Card Outline
      ctx.strokeStyle = '#D1D5DB';
      ctx.lineWidth = 3;
      ctx.strokeRect(6, 6, 888, 528);

      // Top Red Header Banner
      ctx.fillStyle = 'var(--color-brand-800)';
      ctx.fillRect(6, 6, 888, 90);

      // Header Text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 22px serif';
      ctx.fillText('IRAQI-CHINESE AGENCY (ICA) • SECRETARIAT', 30, 42);
      ctx.font = 'bold 12px monospace';
      ctx.fillText('OFFICIAL DIPLOMATIC & SOVEREIGN PRESS CREDENTIAL', 30, 68);

      // Clearance Pill in Header
      ctx.fillStyle = '#FAF0E6';
      ctx.fillRect(720, 26, 150, 40);
      ctx.fillStyle = 'var(--color-brand-800)';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(user.clearanceLevel || 'LEVEL-2', 745, 52);

      // Avatar Initial Box
      ctx.fillStyle = '#b30000';
      ctx.fillRect(35, 120, 110, 125);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 64px sans-serif';
      ctx.fillText(user.name ? user.name.charAt(0).toUpperCase() : 'I', 70, 205);

      // Name & Title
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 26px serif';
      ctx.fillText(user.name || 'Member', 170, 155);
      ctx.fillStyle = '#374151';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(user.title || 'Strategic Analyst', 170, 185);
      ctx.fillStyle = '#6B7280';
      ctx.font = '14px sans-serif';
      ctx.fillText(user.department || 'Editorial & Intelligence Directorate', 170, 212);

      // Detail Records Box
      ctx.fillStyle = '#F9FAFB';
      ctx.fillRect(35, 265, 830, 195);
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(35, 265, 830, 195);

      const drawField = (label: string, value: string, x: number, y: number) => {
        ctx.fillStyle = '#9CA3AF';
        ctx.font = 'bold 10px monospace';
        ctx.fillText(label.toUpperCase(), x, y);
        ctx.fillStyle = '#111827';
        ctx.font = 'bold 14px monospace';
        ctx.fillText(value || '—', x, y + 18);
      };

      drawField('Member Code', user.memberCode || 'ICA-M-1001', 55, 295);
      drawField('Unique Digital ID', user.digitalId || 'ICA-DID-2026-HQ01', 320, 295);
      drawField('Status', user.badgeStatus || 'ACTIVE', 630, 295);

      drawField('Passport / ID', user.passportOrIdNumber || 'Verified', 55, 345);
      drawField('Asaish Security Code', user.asaishCode || 'ICA-SEC-APPROVED', 320, 345);
      drawField('Clearance', user.clearanceLevel || 'LEVEL-2', 630, 345);

      const expiryStr = user.credentialExpiryDate ? new Date(user.credentialExpiryDate).toLocaleDateString() : 'Active Sovereign';
      drawField('Nationality', user.nationality || 'Iraqi / Chinese', 55, 395);
      drawField('Validity Expiry', expiryStr, 320, 395);
      drawField('Renewals Count', String(user.renewalCount || 0), 630, 395);

      // Bottom Footer Bar
      ctx.fillStyle = 'var(--color-brand-800)';
      ctx.fillRect(6, 480, 888, 54);
      ctx.fillStyle = '#FAF0E6';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('VERIFIED BILATERAL PROTOCOL • BAGHDAD - BEIJING INTER-MINISTERIAL NETWORK', 30, 512);

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `ICA-Badge-${user.memberCode || user.digitalId || 'Credential'}.png`;
      link.click();
    } catch (e) {
      console.error('Direct canvas render error', e);
    }
  };

  const handleDownloadBadge = async () => {
    if (!credentialCardUser) return;
    try {
      if (badgeRef.current) {
        const canvas = await html2canvas(badgeRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
          windowWidth: 800
        });
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `ICA-Badge-${credentialCardUser?.memberCode || 'Card'}.png`;
        link.click();
        return;
      }
    } catch (err) {
      console.warn('html2canvas encountered error (e.g. CSS color function), falling back to pure 2D Canvas engine:', err);
    }
    // High-fidelity fallback that never fails on unsupported CSS color functions
    generateCanvasFallback(credentialCardUser);
  };

  const { data: users = [], isLoading } = useQuery<any[]>({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await apiFetch('/api/hub/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    }
  });

  const createMutation = useMutation({
    mutationFn: async (newUser: any) => {
      const res = await apiFetch('/api/hub/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      if (!res.ok) throw new Error('Failed to provision credentials');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setIsModalOpen(false);
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedUser: any) => {
      const res = await apiFetch(`/api/hub/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      });
      if (!res.ok) throw new Error('Failed to update credentials');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setIsModalOpen(false);
      resetForm();
    }
  });

  const renewMutation = useMutation({
    mutationFn: async (userId: string) => {
      const res = await apiFetch(`/api/hub/users/${userId}/renew`, {
        method: 'POST'
      });
      if (!res.ok) throw new Error('Failed to renew credentials');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (userId: string) => {
      const res = await apiFetch(`/api/hub/users/${userId}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to revoke credentials');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('Member credentials revoked successfully');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to revoke credentials');
    }
  });

  const resetForm = () => {
    const oneYearLater = new Date();
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

    setFormData({ 
      name: '', 
      email: '', 
      password: '', 
      role: 'AUTHOR', 
      department: 'Editorial & Information',
      title: 'Strategic Analyst',
      clearanceLevel: 'LEVEL-2',
      badgeStatus: 'ACTIVE',
      digitalId: '',
      memberCode: '',
      nationality: 'Iraqi / Chinese',
      passportOrIdNumber: '',
      asaishCode: '',
      iraqiInfoCard: '',
      addressHouseNo: '',
      addressStreetNo: '',
      addressDistrictName: '',
      addressDistrictNumber: '',
      phoneNumber: '',
      dateOfBirth: '',
      emergencyContact: '',
      credentialExpiryDate: oneYearLater.toISOString().split('T')[0],
      subscriptionStatus: 'INACTIVE', 
      subscriptionPlan: 'PREMIUM' 
    });
    setEditingUser(null);
  };

  const openCreateModal = () => {
    resetForm();
    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const oneYearLater = new Date();
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

    setFormData(prev => ({
      ...prev,
      digitalId: `ICA-DID-2026-${randomSuffix}`,
      memberCode: `ICA-M-${randomCode}`,
      credentialExpiryDate: oneYearLater.toISOString().split('T')[0]
    }));
    setIsModalOpen(true);
  };

  const openEditModal = (user: any) => {
    setEditingUser(user);
    const expiryStr = user.credentialExpiryDate ? new Date(user.credentialExpiryDate).toISOString().split('T')[0] : '';
    setFormData({
      name: user.name || '',
      email: user.email || '',
      password: '',
      role: user.role || 'AUTHOR',
      department: user.department || 'Editorial & Information',
      title: user.title || 'Strategic Analyst',
      clearanceLevel: user.clearanceLevel || 'LEVEL-2',
      badgeStatus: user.badgeStatus || 'ACTIVE',
      digitalId: user.digitalId || `ICA-DID-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      memberCode: user.memberCode || `ICA-M-${Math.floor(1000 + Math.random() * 9000)}`,
      nationality: user.nationality || 'Iraqi / Chinese',
      passportOrIdNumber: user.passportOrIdNumber || '',
      asaishCode: user.asaishCode || '',
      iraqiInfoCard: user.iraqiInfoCard || '',
      addressHouseNo: user.addressHouseNo || '',
      addressStreetNo: user.addressStreetNo || '',
      addressDistrictName: user.addressDistrictName || '',
      addressDistrictNumber: user.addressDistrictNumber || '',
      phoneNumber: user.phoneNumber || '',
      dateOfBirth: user.dateOfBirth || '',
      emergencyContact: user.emergencyContact || '',
      credentialExpiryDate: expiryStr,
      subscriptionStatus: user.subscriptionStatus || 'INACTIVE',
      subscriptionPlan: user.subscriptionPlan || 'PREMIUM'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      updateMutation.mutate({ id: editingUser.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const filteredUsers = users.filter((u: any) => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.digitalId && u.digitalId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.memberCode && u.memberCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.passportOrIdNumber && u.passportOrIdNumber.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesClearance = clearanceFilter === 'ALL' || u.clearanceLevel === clearanceFilter;

    return matchesSearch && matchesRole && matchesClearance;
  });

  return (
    <div className="space-y-6 text-start w-full min-w-0 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-brand-800 uppercase">Institutional Credentials & Member Database</h1>
          <p className="text-xs sm:text-sm text-gray-500 font-bold uppercase tracking-wider mt-1">Complete Sovereign Member Database • Credential Issuance, Personal Records & Annual Renewal Lifecycle.</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="w-full sm:w-auto min-h-[44px] bg-brand-800 hover:bg-brand-700 text-white px-5 py-2.5 rounded-sm font-bold text-xs uppercase tracking-widest transition-colors shadow-sm flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span>Provision New Credential</span>
        </button>
      </div>

      {/* Filters and Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="col-span-1 sm:col-span-2">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, email, digital ID, passport/ID, or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-h-[44px] ps-10 pe-4 py-2 bg-white border border-gray-300 rounded-sm focus:ring-2 focus:ring-brand-800 focus:border-brand-800 text-base sm:text-sm"
            />
          </div>
        </div>
        
        <div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full min-h-[44px] px-3 py-2 bg-white border border-gray-300 rounded-sm text-base sm:text-xs font-bold uppercase tracking-wider"
          >
            <option value="ALL">All Roles</option>
            <option value="AUTHOR">Author</option>
            <option value="EDITOR">Editor</option>
            <option value="ADMIN">CiseCommandHub</option>
            <option value="VOLUNTEER">Volunteer</option>
            <option value="INTERN">Intern</option>
          </select>
        </div>

        <div>
          <select
            value={clearanceFilter}
            onChange={(e) => setClearanceFilter(e.target.value)}
            className="w-full min-h-[44px] px-3 py-2 bg-white border border-gray-300 rounded-sm text-base sm:text-xs font-bold uppercase tracking-wider"
          >
            <option value="ALL">All Clearances</option>
            <option value="LEVEL-1">Level 1 - Restricted</option>
            <option value="LEVEL-2">Level 2 - Confidential</option>
            <option value="LEVEL-3">Level 3 - Secret</option>
            <option value="LEVEL-4">Level 4 - Sovereign</option>
          </select>
        </div>
      </div>

      {/* Stats summary bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white border border-gray-200 p-3.5 sm:p-4 rounded-sm flex items-center gap-3.5 shadow-xs">
          <div className="p-2.5 bg-brand-50 text-brand-800 rounded-sm shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider truncate">Total Registered Members</div>
            <div className="text-base sm:text-lg font-black text-brand-800 truncate">{users.length} Database Records</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-3.5 sm:p-4 rounded-sm flex items-center gap-3.5 shadow-xs">
          <div className="p-2.5 bg-green-50 text-green-700 rounded-sm shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider truncate">Active Credentials</div>
            <div className="text-base sm:text-lg font-black text-green-800 truncate">{users.filter((u:any) => u.badgeStatus === 'ACTIVE').length} Valid</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-3.5 sm:p-4 rounded-sm flex items-center gap-3.5 shadow-xs sm:col-span-2 lg:col-span-1">
          <div className="p-2.5 bg-yellow-50 text-yellow-700 rounded-sm shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider truncate">Level 4 Sovereign Clearance</div>
            <div className="text-base sm:text-lg font-black text-brand-800 truncate">{users.filter((u:any) => u.clearanceLevel === 'LEVEL-4' || u.role === 'ADMIN').length} Personnel</div>
          </div>
        </div>
      </div>

      {/* Adaptive Mobile Card List (Visible on Mobile Viewports < 768px) */}
      <div className="block md:hidden space-y-3.5">
        {isLoading ? (
          <div className="bg-white p-8 rounded-sm text-center text-gray-500 text-xs font-bold uppercase tracking-widest border border-gray-200">
            <div className="flex justify-center mb-2"><Activity className="w-5 h-5 animate-pulse text-brand-800" /></div>
            Querying Sovereign Member Database...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="bg-white p-8 rounded-sm text-center text-gray-500 text-xs font-bold uppercase tracking-widest border border-gray-200">
            No registered members found matching criteria
          </div>
        ) : (
          filteredUsers.map((user: any) => {
            const expiryDate = user.credentialExpiryDate ? new Date(user.credentialExpiryDate) : null;
            const isExpired = expiryDate && expiryDate < new Date();
            return (
              <div key={user.id} className="bg-white border border-gray-200 rounded-sm p-4 shadow-xs space-y-3">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-11 w-11 rounded-sm bg-brand-800 flex items-center justify-center text-white font-black text-base uppercase shadow-xs shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-gray-900 truncate">{user.name}</div>
                      <div className="text-xs text-gray-500 font-medium truncate mt-0.5">{user.email}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setCredentialCardUser(user)}
                    title="View Secure Digital ID Card"
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center text-brand-800 bg-brand-50 hover:bg-brand-100 rounded-sm border border-brand-200 shrink-0 cursor-pointer"
                    aria-label="View Digital ID"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                </div>

                {/* Identifiers & Badges */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-[11px] font-bold text-gray-700">{user.memberCode || 'ICA-M-0000'}</span>
                  <span className="text-brand-800 font-bold text-[11px] bg-brand-50 px-2 py-0.5 rounded">{user.digitalId || 'ICA-DID-2026-XXXX'}</span>
                  <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-sm ${
                    user.role === 'VOLUNTEER' ? 'bg-rose-100 text-brand-800 border border-rose-300' :
                    user.role === 'INTERN' ? 'bg-purple-100 text-purple-900 border border-purple-300' :
                    user.clearanceLevel === 'LEVEL-4' ? 'bg-brand-800 text-white' : 
                    user.clearanceLevel === 'LEVEL-3' ? 'bg-blue-800 text-white' : 
                    user.clearanceLevel === 'LEVEL-2' ? 'bg-blue-100 text-blue-900' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.clearanceLevel || user.role}
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm ${
                    user.badgeStatus === 'ACTIVE' && !isExpired ? 'bg-green-100 text-green-800' : 
                    isExpired ? 'bg-brand-100 text-brand-800 font-black' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {isExpired ? 'EXPIRED' : (user.badgeStatus || 'ACTIVE')}
                  </span>
                </div>

                {/* Metadata Details Grid */}
                <div className="grid grid-cols-2 gap-2 bg-gray-50/70 p-2.5 rounded-sm border border-gray-100 text-xs text-gray-700">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Department</span>
                    <span className="font-semibold truncate block">{user.department || 'Editorial'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Title</span>
                    <span className="font-semibold truncate block">{user.title || 'Strategic Analyst'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Passport / ID</span>
                    <span className="font-semibold truncate block">{user.passportOrIdNumber || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Credential Expiry</span>
                    <span className="font-semibold truncate block">{expiryDate ? expiryDate.toLocaleDateString() : 'No Expiry'}</span>
                  </div>
                </div>

                {/* Touch-Target Compliant Action Row */}
                <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                  <button
                    onClick={() => renewMutation.mutate(user.id)}
                    disabled={renewMutation.isPending}
                    className="min-h-[44px] flex-1 bg-brand-50 hover:bg-brand-100 text-brand-800 px-3 py-2 rounded-sm text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-brand-200 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 shrink-0" />
                    <span>Renew (1 Year)</span>
                  </button>
                  <button 
                    onClick={() => openEditModal(user)}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-gray-200 text-gray-600 hover:text-blue-600 rounded-sm transition-colors cursor-pointer"
                    aria-label="Edit Member"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => deleteMutation.mutate(user.id)}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-gray-200 text-gray-600 hover:text-brand-600 rounded-sm transition-colors cursor-pointer"
                    aria-label="Revoke and Delete Member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop / Tablet Member Database Table (Visible on md: >= 768px) */}
      <div className="hidden md:block bg-white rounded-sm shadow-sm border border-gray-200 overflow-hidden min-w-0">
        <div className="overflow-x-auto min-w-0 w-full">
          <table className="min-w-full divide-y divide-gray-200 text-start">
            <thead className="bg-paper-50 sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-6 py-4 text-start text-xs font-black text-gray-500 uppercase tracking-widest border-b border-brand-800">Member Identity & ID</th>
                <th scope="col" className="px-6 py-4 text-start text-xs font-black text-gray-500 uppercase tracking-widest border-b border-brand-800">Personal & Passport Info</th>
                <th scope="col" className="px-6 py-4 text-start text-xs font-black text-gray-500 uppercase tracking-widest border-b border-brand-800">Department & Title</th>
                <th scope="col" className="px-6 py-4 text-start text-xs font-black text-gray-500 uppercase tracking-widest border-b border-brand-800">Clearance & Status</th>
                <th scope="col" className="px-6 py-4 text-start text-xs font-black text-gray-500 uppercase tracking-widest border-b border-brand-800">Renewal Status</th>
                <th scope="col" className="px-6 py-4 text-end text-xs font-black text-gray-500 uppercase tracking-widest border-b border-brand-800">Actions & Renewal</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-gray-500 text-xs font-bold uppercase tracking-widest">
                    <div className="flex justify-center mb-2"><Activity className="w-5 h-5 animate-pulse text-brand-800" /></div>
                    Querying Sovereign Member Database...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-gray-500 text-xs font-bold uppercase tracking-widest">
                    No registered members found matching criteria
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user: any) => {
                  const expiryDate = user.credentialExpiryDate ? new Date(user.credentialExpiryDate) : null;
                  const isExpired = expiryDate && expiryDate < new Date();
                  return (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-sm bg-brand-800 flex items-center justify-center text-white font-black text-sm uppercase shadow-xs shrink-0">
                            {user.name.charAt(0)}
                          </div>
                          <div className="ms-4 min-w-0">
                            <div className="text-sm font-bold text-gray-900 flex items-center gap-2">
                              <span className="truncate">{user.name}</span>
                              <button 
                                onClick={() => setCredentialCardUser(user)}
                                title="View Secure Digital ID Card"
                                className="text-brand-800 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 p-1.5 rounded-sm transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center shrink-0 cursor-pointer"
                              >
                                <QrCode className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="text-xs text-gray-500 font-medium flex items-center gap-2 mt-0.5">
                              <span className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-bold text-gray-700">{user.memberCode || 'ICA-M-0000'}</span>
                              <span className="text-brand-800 font-bold">{user.digitalId || 'ICA-DID-2026-XXXX'}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-gray-400" /> {user.nationality || 'Iraqi / Chinese'}
                        </div>
                        <div className="text-[11px] text-gray-600 font-medium mt-0.5">
                          ID: <span className="font-bold text-ink-900">{user.passportOrIdNumber || 'Not Specified'}</span>
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-gray-400" /> {user.phoneNumber || 'No phone'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-xs font-bold text-gray-900">{user.department || 'Editorial & Information'}</div>
                        <div className="text-[11px] text-gray-500 font-medium">{user.title || 'Strategic Analyst'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <span className={`px-2.5 py-0.5 inline-flex text-xs leading-4 font-black uppercase tracking-widest rounded-sm ${
                            user.role === 'VOLUNTEER' ? 'bg-rose-100 text-brand-800 border border-rose-300' :
                            user.role === 'INTERN' ? 'bg-purple-100 text-purple-900 border border-purple-300' :
                            user.clearanceLevel === 'LEVEL-4' ? 'bg-brand-800 text-white' : 
                            user.clearanceLevel === 'LEVEL-3' ? 'bg-blue-800 text-white' : 
                            user.clearanceLevel === 'LEVEL-2' ? 'bg-blue-100 text-blue-900' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role === 'VOLUNTEER' ? 'VOLUNTEER' : user.role === 'INTERN' ? 'INTERN' : (user.clearanceLevel || user.role)}
                          </span>
                          <div>
                            <span className={`px-2 py-0.5 inline-flex text-[9px] font-bold uppercase tracking-wider rounded-sm ${
                              user.badgeStatus === 'ACTIVE' && !isExpired ? 'bg-green-100 text-green-800' : 
                              isExpired ? 'bg-brand-100 text-brand-800 font-black' : 
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {isExpired ? 'EXPIRED' : (user.badgeStatus || 'ACTIVE')}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-xs font-medium font-bold text-gray-900 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-brand-800" />
                          {expiryDate ? expiryDate.toLocaleDateString() : 'No Expiry'}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                          <span>Renewals: <strong className="text-brand-800">{user.renewalCount || 0}</strong></span>
                          {user.lastRenewedAt && (
                            <span>({new Date(user.lastRenewedAt).toLocaleDateString()})</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => renewMutation.mutate(user.id)}
                            disabled={renewMutation.isPending}
                            className="bg-brand-50 hover:bg-brand-100 text-brand-800 px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider flex items-center gap-1 transition-colors border border-brand-200 min-h-[36px] cursor-pointer"
                            title="Renew Credential for 1 Year"
                          >
                            <RefreshCw className="w-3 h-3 animate-spin-hover" />
                            Renew
                          </button>
                          <button 
                            onClick={() => openEditModal(user)}
                            className="text-gray-400 hover:text-blue-600 p-2 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
                            title="Edit Full Member Profile"
                            aria-label="Edit Member"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteMutation.mutate(user.id)}
                            className="text-gray-400 hover:text-brand-600 p-2 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
                            title="Revoke & Delete"
                            aria-label="Revoke Member"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

        {/* Digital ID Credential Card Modal */}
        {credentialCardUser && (
          <div className="fixed inset-0 bg-brand-800/80 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4 z-50">
            <div className="bg-white rounded-md shadow-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto border-2 border-brand-800 text-start flex flex-col">
              <div className="bg-brand-800 text-white px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <Shield className="w-5 h-5 text-brand-300 shrink-0" />
                  <span className="font-bold font-black uppercase tracking-wider text-xs sm:text-sm truncate">Institutional Digital Credential Card</span>
                </div>
                <button 
                  onClick={() => setCredentialCardUser(null)} 
                  className="text-white hover:text-gray-300 text-2xl font-bold min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer shrink-0"
                  aria-label="Close Digital ID Card"
                >
                  &times;
                </button>
              </div>
              <div className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 bg-paper-50 flex-1 overflow-y-auto">
                <div ref={badgeRef} className="bg-white p-4 sm:p-6 rounded-sm shadow-sm border border-gray-200 relative overflow-hidden">
                  <div className="absolute top-0 end-0 w-32 h-32 bg-brand-800/5 rounded-full -me-16 -mt-16 pointer-events-none" />
                  
                  <div className="flex justify-between items-start border-b border-gray-200 pb-3 sm:pb-4 mb-3 sm:mb-4 gap-2">
                    <div className="min-w-0">
                      <div className="text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] text-brand-800 truncate">Iraqi-Chinese Agency (ICA)</div>
                      <div className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest truncate">Sovereign Press Credentials</div>
                    </div>
                    <div className="bg-brand-800 text-white text-[10px] sm:text-xs font-black uppercase px-2.5 py-1 rounded-sm shrink-0">
                      {credentialCardUser.clearanceLevel || 'LEVEL-2'}
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 sm:gap-5 my-3 sm:my-4">
                    <div className="h-14 w-14 sm:h-16 sm:w-16 bg-brand-800 text-white flex items-center justify-center font-black text-xl sm:text-2xl uppercase rounded-sm shadow-sm shrink-0">
                      {credentialCardUser.name.charAt(0)}
                    </div>
                    <div className="space-y-0.5 sm:space-y-1 min-w-0">
                      <h4 className="text-base sm:text-lg font-bold font-black text-brand-800 truncate">{credentialCardUser.name}</h4>
                      <p className="text-xs font-bold text-gray-700 truncate">{credentialCardUser.title || 'Strategic Analyst'}</p>
                      <p className="text-[11px] text-gray-500 font-medium truncate">{credentialCardUser.department || 'Editorial & Information'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 bg-gray-50 p-3 rounded-sm border border-gray-200 text-xs font-medium">
                    <div>
                      <span className="text-[10px] sm:text-xs text-gray-400 block uppercase font-bold tracking-wider">Member Code</span>
                      <span className="font-black text-brand-800 break-all">{credentialCardUser.memberCode || 'ICA-M-1001'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs text-gray-400 block uppercase font-bold tracking-wider">Unique Digital ID</span>
                      <span className="font-black text-brand-800 break-all">{credentialCardUser.digitalId || 'ICA-DID-2026-XXXX'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs text-gray-400 block uppercase font-bold tracking-wider">Passport / National ID</span>
                      <span className="font-bold text-gray-800 break-all">{credentialCardUser.passportOrIdNumber || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs text-gray-400 block uppercase font-bold tracking-wider">Asaish Code</span>
                      <span className="font-bold text-brand-800 break-all">{credentialCardUser.asaishCode || 'Not Assigned'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs text-gray-400 block uppercase font-bold tracking-wider">Iraqi Info Card (بطاقة المعلومات)</span>
                      <span className="font-bold text-gray-800 break-all">{credentialCardUser.iraqiInfoCard || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs text-gray-400 block uppercase font-bold tracking-wider">Credential Expiry</span>
                      <span className="font-bold text-gray-800">{credentialCardUser.credentialExpiryDate ? new Date(credentialCardUser.credentialExpiryDate).toLocaleDateString() : 'Active'}</span>
                    </div>
                    <div className="sm:col-span-2 pt-1 border-t border-gray-200">
                      <span className="text-[10px] sm:text-xs text-gray-400 block uppercase font-bold tracking-wider">Full Address</span>
                      <span className="font-bold text-gray-800 text-[11px] break-words">
                        House {credentialCardUser.addressHouseNo || '—'}, Street {credentialCardUser.addressStreetNo || '—'}, {credentialCardUser.addressDistrictName || '—'} (Dist. {credentialCardUser.addressDistrictNumber || '—'})
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 border-t border-gray-200 pt-2.5 sm:pt-3 gap-1">
                    <div>Nationality: <strong className="text-gray-800">{credentialCardUser.nationality || 'Iraqi / Chinese'}</strong></div>
                    <div>Renewals: <strong className="text-brand-800">{credentialCardUser.renewalCount || 0}</strong></div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <button
                    onClick={handleDownloadBadge}
                    className="min-h-[44px] px-4 py-2 bg-green-800 text-white rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Download className="w-4 h-4 shrink-0" />
                    <span>Download Badge (PNG)</span>
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        window.print();
                      }}
                      className="min-h-[44px] flex-1 sm:flex-none px-4 py-2 bg-brand-800 text-white rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-brand-700 transition-colors cursor-pointer"
                    >
                      Print
                    </button>
                    <button
                      onClick={() => setCredentialCardUser(null)}
                      className="min-h-[44px] flex-1 sm:flex-none px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create / Edit Full Member Registration Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-brand-800/80 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4 z-50">
            <div className="bg-white rounded-sm shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto text-start flex flex-col">
              <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-200 bg-paper-50 flex items-center justify-between gap-3">
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-brand-800 flex items-center gap-2 min-w-0">
                  <Shield className="w-4 h-4 text-brand-800 shrink-0" />
                  <span className="truncate">{editingUser ? 'Modify Member Profile & Institutional Credentials' : 'Provision Member Credentials & Full Registration'}</span>
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer shrink-0"
                  aria-label="Close Member Registration Modal"
                >
                  &times;
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
                {/* Section 1: Personal Information */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-brand-800 border-b border-brand-200 pb-1 mb-3">
                    1. Personal Information & Identity Requirements
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Full Legal Name *</label>
                      <div className="relative">
                        <User className="absolute start-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full ps-10 pe-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm"
                          placeholder="Dr. Tariq Al-Hashimi"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Corporate Email *</label>
                      <div className="relative">
                        <Mail className="absolute start-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full ps-10 pe-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm"
                          placeholder="tariq@iraqi-chineseagency.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Nationality</label>
                      <input
                        type="text"
                        value={formData.nationality}
                        onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm"
                        placeholder="Iraqi / Chinese"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Passport / National ID Number</label>
                      <input
                        type="text"
                        value={formData.passportOrIdNumber}
                        onChange={(e) => setFormData({...formData, passportOrIdNumber: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm font-medium"
                        placeholder="IQ-9821849 or CN-49281"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Asaish Code Number</label>
                      <input
                        type="text"
                        value={formData.asaishCode}
                        onChange={(e) => setFormData({...formData, asaishCode: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm font-medium uppercase"
                        placeholder="AS-2026-XXXX"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Iraqi Information Card Number (بطاقة المعلومات)</label>
                      <input
                        type="text"
                        value={formData.iraqiInfoCard}
                        onChange={(e) => setFormData({...formData, iraqiInfoCard: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm font-medium"
                        placeholder="Info Card No / Tamween"
                      />
                    </div>

                    <div className="sm:col-span-2 bg-paper-50 p-3 sm:p-4 rounded-sm border border-gray-200 space-y-3">
                      <label className="block text-xs font-black text-gray-800 uppercase tracking-widest">Full Address Information</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">House No.</label>
                          <input
                            type="text"
                            value={formData.addressHouseNo}
                            onChange={(e) => setFormData({...formData, addressHouseNo: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs bg-white min-h-[40px]"
                            placeholder="House 14"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Street No.</label>
                          <input
                            type="text"
                            value={formData.addressStreetNo}
                            onChange={(e) => setFormData({...formData, addressStreetNo: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs bg-white min-h-[40px]"
                            placeholder="Street 62"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">District Name</label>
                          <input
                            type="text"
                            value={formData.addressDistrictName}
                            onChange={(e) => setFormData({...formData, addressDistrictName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs bg-white min-h-[40px]"
                            placeholder="Al-Karrada"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">District Number</label>
                          <input
                            type="text"
                            value={formData.addressDistrictNumber}
                            onChange={(e) => setFormData({...formData, addressDistrictNumber: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs bg-white min-h-[40px]"
                            placeholder="District 902"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm font-medium min-h-[44px]"
                        placeholder="+964 780 123 4567"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm min-h-[44px]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Emergency Contact Information</label>
                      <input
                        type="text"
                        value={formData.emergencyContact}
                        onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm min-h-[44px]"
                        placeholder="Name, Relationship & Phone Number"
                      />
                    </div>
                  </div>
                </div>

                {!editingUser && (
                  <div>
                    <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Initial Secure Passkey *</label>
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm min-h-[44px]"
                      placeholder="••••••••"
                    />
                  </div>
                )}

                {/* Section 2: Institutional Identifiers & Renewal */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-brand-800 border-b border-brand-200 pb-1 mb-3">
                    2. Institutional Identifiers & Renewal Lifecycle
                  </h4>
                  <div className="bg-paper-50 p-3 sm:p-4 rounded-sm border border-gray-200 space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <span className="text-xs font-black text-gray-700 uppercase tracking-widest">Unique Digital ID & Member Code</span>
                      <button
                        type="button"
                        onClick={generateUniqueIdentifiers}
                        className="text-xs font-bold text-brand-800 hover:text-brand-700 flex items-center gap-1.5 uppercase tracking-wider bg-white px-3 py-1.5 border border-brand-200 rounded-sm shadow-xs min-h-[36px] cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5 shrink-0" /> Regenerate IDs
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Digital ID (Unique)</label>
                        <input
                          type="text"
                          required
                          value={formData.digitalId}
                          onChange={(e) => setFormData({...formData, digitalId: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-sm font-medium text-xs bg-white uppercase font-bold text-brand-800 min-h-[40px]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Member Code</label>
                        <input
                          type="text"
                          required
                          value={formData.memberCode}
                          onChange={(e) => setFormData({...formData, memberCode: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-sm font-medium text-xs bg-white uppercase font-bold text-brand-800 min-h-[40px]"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Credential Expiry / Renewal Date</label>
                      <input
                        type="date"
                        required
                        value={formData.credentialExpiryDate}
                        onChange={(e) => setFormData({...formData, credentialExpiryDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs bg-white font-medium font-bold min-h-[40px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Department & Clearance */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-brand-800 border-b border-brand-200 pb-1 mb-3">
                    3. Department & Clearance Levels
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Department / Bureau</label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm min-h-[44px]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Official Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm min-h-[44px]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Institutional Role</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm bg-white uppercase font-bold min-h-[44px]"
                      >
                        <option value="AUTHOR">Author / Fellow</option>
                        <option value="EDITOR">Editor</option>
                        <option value="ADMIN">CiseCommandHub</option>
                        <option value="VOLUNTEER">Volunteering Corps</option>
                        <option value="INTERN">Research & Diplomatic Intern</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Security Clearance Level</label>
                      <select
                        value={formData.clearanceLevel}
                        onChange={(e) => setFormData({...formData, clearanceLevel: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm bg-white uppercase font-bold min-h-[44px]"
                      >
                        <option value="LEVEL-1">Level 1 - Restricted</option>
                        <option value="LEVEL-2">Level 2 - Confidential</option>
                        <option value="LEVEL-3">Level 3 - Secret / Editorial</option>
                        <option value="LEVEL-4">Level 4 - Sovereign / CiseCommandHub</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Badge Status</label>
                      <select
                        value={formData.badgeStatus}
                        onChange={(e) => setFormData({...formData, badgeStatus: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm bg-white uppercase font-bold min-h-[44px]"
                      >
                        <option value="ACTIVE">Active</option>
                        <option value="SUSPENDED">Suspended</option>
                        <option value="REVOKED">Revoked</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col-reverse sm:flex-row justify-end gap-2.5 sm:gap-3 border-t border-gray-100 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="min-h-[44px] px-5 py-2.5 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    className="min-h-[44px] px-5 py-2.5 bg-brand-800 text-white rounded-sm hover:bg-brand-700 transition-colors text-xs font-bold uppercase tracking-widest disabled:opacity-50 cursor-pointer"
                  >
                    {editingUser ? 'Update Member Profile' : 'Provision Credential & Register'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
  );
}

export function CiseCommandHubUsers() {
  return (
    <>
      <CiseCommandHubUsersContent />
    </>
  );
}
