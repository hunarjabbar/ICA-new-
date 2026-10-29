import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { 
  Plus, Edit2, Trash2, Mic, Video as VideoIcon, Film, Clock, CheckCircle, 
  XCircle, Crown, DollarSign, Users, ExternalLink, ShieldCheck, Sparkles,
  Layers, CheckCircle2, AlertCircle, RefreshCw, Eye
} from 'lucide-react';
import { apiFetch } from "../lib/api";
import { useAuthStore } from '../store/useAuthStore';

type ContentType = 'podcasts' | 'videos' | 'documentaries' | 'tiers';

interface IcaTier {
  id: string;
  name: Record<string, string>;
  priceMonthly: string;
  priceAnnual: string;
  features: Record<string, string[]>;
  isRecommended: boolean;
}

export default function CiseCommandHubIcaPlus() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<ContentType>('podcasts');

  // Media items state
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  // Tiers state
  const [tiers, setTiers] = useState<IcaTier[]>([]);
  const [loadingTiers, setLoadingTiers] = useState(false);
  const [isEditingTier, setIsEditingTier] = useState(false);
  const [editingTier, setEditingTier] = useState<IcaTier | null>(null);

  // Overview stats state
  const [overview, setOverview] = useState<{
    activeSubscribers: number;
    monthlyRecurringRevenue: string;
    tiersCount: number;
    systemStatus: string;
  }>({
    activeSubscribers: 1420,
    monthlyRecurringRevenue: "$114,800",
    tiersCount: 2,
    systemStatus: "ONLINE"
  });

  // Media Form data
  const [formData, setFormData] = useState<any>({
    titleEn: '', titleAr: '', titleZh: '', titleCkb: '',
    descriptionEn: '', descriptionAr: '', descriptionZh: '', descriptionCkb: '',
    audioUrl: '', videoUrl: '', coverUrl: '',
    category: '', region: '', guestName: '', director: '', duration: '',
    synopsisEn: '', synopsisAr: '', synopsisZh: '', synopsisCkb: '',
    isFeatured: true, isTrending: false
  });

  // Tier Form data
  const [tierFormData, setTierFormData] = useState<{
    id: string;
    nameEn: string;
    nameAr: string;
    nameZh: string;
    nameCkb: string;
    priceMonthly: string;
    priceAnnual: string;
    featuresEn: string;
    isRecommended: boolean;
  }>({
    id: '',
    nameEn: '',
    nameAr: '',
    nameZh: '',
    nameCkb: '',
    priceMonthly: '$99',
    priceAnnual: '$990',
    featuresEn: 'Full Access to CIPS Models\nPriority White Papers\nDiplomatic Stream Access',
    isRecommended: false
  });

  // Notification
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchOverview = async () => {
    try {
      const res = await apiFetch('/api/hub/ica-plus/overview');
      if (res.ok) {
        const data = await res.json();
        setOverview(data);
      }
    } catch (e) {
      console.error('Error fetching overview', e);
    }
  };

  const fetchTiers = async () => {
    setLoadingTiers(true);
    try {
      const res = await apiFetch('/api/hub/ica-plus/tiers');
      if (res.ok) {
        const data = await res.json();
        setTiers(data);
      }
    } catch (e) {
      console.error('Error fetching tiers', e);
    } finally {
      setLoadingTiers(false);
    }
  };

  const fetchMediaItems = async (type: ContentType) => {
    if (type === 'tiers') {
      fetchTiers();
      return;
    }
    setLoading(true);
    try {
      const res = await apiFetch(`/api/${type}`);
      if (res.ok) setItems(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  useEffect(() => {
    fetchMediaItems(activeTab);
  }, [activeTab]);

  const handleEditMedia = (item: any) => {
    setEditingItem(item);
    setFormData({
      titleEn: item.titleEn || item.title || '',
      titleAr: item.titleAr || '',
      titleZh: item.titleZh || '',
      titleCkb: item.titleCkb || '',
      descriptionEn: item.descriptionEn || item.description || '',
      descriptionAr: item.descriptionAr || '',
      descriptionZh: item.descriptionZh || '',
      descriptionCkb: item.descriptionCkb || '',
      audioUrl: item.audioUrl || '',
      videoUrl: item.videoUrl || '',
      coverUrl: item.coverUrl || '',
      category: item.category || '',
      region: item.region || '',
      guestName: item.guestName || '',
      director: item.director || '',
      duration: item.duration || '',
      synopsisEn: item.synopsisEn || '',
      synopsisAr: item.synopsisAr || '',
      synopsisZh: item.synopsisZh || '',
      synopsisCkb: item.synopsisCkb || '',
      isFeatured: item.isFeatured ?? true,
      isTrending: item.isTrending ?? false
    });
    setIsEditing(true);
  };

  const handleDeleteMedia = async (id: string) => {
    toast.warning('Are you sure you want to delete this exclusive ICA+ media item?', {
      action: {
        label: 'Delete',
        onClick: async () => {
          try {
            const res = await apiFetch(`/api/${activeTab}/${id}`, { 
              method: 'DELETE',
              headers: { 'x-role': 'ADMIN' }
            });
            if (res.ok) {
              toast.success('Item deleted from ICA+ catalogue.');
              fetchMediaItems(activeTab);
              queryClient.invalidateQueries({ queryKey: [activeTab] });
            } else {
              toast.error('Failed to delete item.');
            }
          } catch (e) {
            console.error(e);
            toast.error('Error deleting item.');
          }
        }
      }
    });
  };

  const handleSaveMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingItem ? `/api/${activeTab}/${editingItem.id}` : `/api/${activeTab}`;
      const method = editingItem ? 'PUT' : 'POST';
      const res = await apiFetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-role': 'ADMIN'
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        showNotification('success', editingItem ? 'ICA+ Item updated.' : 'New ICA+ Item published.');
        setIsEditing(false);
        setEditingItem(null);
        fetchMediaItems(activeTab);
        queryClient.invalidateQueries({ queryKey: [activeTab] });
      } else {
        showNotification('error', 'Failed to save item.');
      }
    } catch (e) {
      console.error(e);
      showNotification('error', 'Error saving item.');
    }
  };

  // Tier operations
  const openNewTierModal = () => {
    setEditingTier(null);
    setTierFormData({
      id: `tier-${Date.now()}`,
      nameEn: '',
      nameAr: '',
      nameZh: '',
      nameCkb: '',
      priceMonthly: '$99',
      priceAnnual: '$990',
      featuresEn: 'Full Access to CIPS Models\nPriority White Papers\nDiplomatic Stream Access',
      isRecommended: false
    });
    setIsEditingTier(true);
  };

  const handleEditTier = (tier: IcaTier) => {
    setEditingTier(tier);
    setTierFormData({
      id: tier.id,
      nameEn: tier.name?.en || '',
      nameAr: tier.name?.ar || '',
      nameZh: tier.name?.zh || '',
      nameCkb: tier.name?.ckb || '',
      priceMonthly: tier.priceMonthly,
      priceAnnual: tier.priceAnnual,
      featuresEn: (tier.features?.en || []).join('\n'),
      isRecommended: tier.isRecommended
    });
    setIsEditingTier(true);
  };

  const handleSaveTier = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: {
        en: tierFormData.nameEn,
        ar: tierFormData.nameAr || tierFormData.nameEn,
        zh: tierFormData.nameZh || tierFormData.nameEn,
        ckb: tierFormData.nameCkb || tierFormData.nameEn
      },
      priceMonthly: tierFormData.priceMonthly,
      priceAnnual: tierFormData.priceAnnual,
      features: {
        en: tierFormData.featuresEn.split('\n').filter(Boolean),
        ar: tierFormData.featuresEn.split('\n').filter(Boolean),
        zh: tierFormData.featuresEn.split('\n').filter(Boolean),
        ckb: tierFormData.featuresEn.split('\n').filter(Boolean)
      },
      isRecommended: tierFormData.isRecommended
    };

    try {
      const url = editingTier ? `/api/hub/ica-plus/tiers/${editingTier.id}` : `/api/hub/ica-plus/tiers`;
      const method = editingTier ? 'PUT' : 'POST';
      const res = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'x-role': 'ADMIN' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showNotification('success', editingTier ? 'Tier updated successfully.' : 'New ICA+ Tier created.');
        setIsEditingTier(false);
        fetchTiers();
        fetchOverview();
      } else {
        showNotification('error', 'Failed to save tier.');
      }
    } catch (e) {
      console.error(e);
      showNotification('error', 'Error saving tier.');
    }
  };

  const handleDeleteTier = async (id: string) => {
    toast.warning('Are you sure you want to delete this membership tier?', {
      action: {
        label: 'Delete',
        onClick: async () => {
          try {
            const res = await apiFetch(`/api/hub/ica-plus/tiers/${id}`, {
              method: 'DELETE',
              headers: { 'x-role': 'ADMIN' }
            });
            if (res.ok) {
              toast.success('Tier deleted.');
              fetchTiers();
              fetchOverview();
            } else {
              toast.error('Failed to delete tier.');
            }
          } catch (e) {
            console.error(e);
            toast.error('Error deleting tier.');
          }
        }
      }
    });
  };

  return (
    <div className="space-y-6 text-start">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--color-brand-800)] uppercase tracking-widest mb-1">
            <Crown size={14} className="text-amber-500" />
            <span>CISE Command Hub • ICA+ Administrative Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            ICA+ Membership & Premium Media Hub Management
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-3xl">
            Sovereign membership tiers, exclusive podcast episodes, intelligence videos, and paywall access control.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link
            to={`/${lang}/media/ica-plus`}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-4 py-2 bg-white border border-gray-300 hover:border-[var(--color-brand-800)] rounded-xl text-xs font-bold text-gray-700 flex items-center gap-2 transition-colors shadow-xs"
          >
            <Eye size={16} />
            <span>Preview Public ICA+</span>
            <ExternalLink size={12} />
          </Link>

          {activeTab === 'tiers' ? (
            <button 
              type="button"
              onClick={openNewTierModal} 
              className="min-h-[44px] px-5 py-2 bg-[var(--color-brand-800)] hover:bg-[#b80016] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <Plus size={16} /> New Membership Tier
            </button>
          ) : (
            <button 
              type="button"
              onClick={() => { setEditingItem(null); setFormData({}); setIsEditing(true); }} 
              className="min-h-[44px] px-5 py-2 bg-[var(--color-brand-800)] hover:bg-[#b80016] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <Plus size={16} /> New Exclusive {activeTab.slice(0, -1)}
            </button>
          )}
        </div>
      </div>

      {notification && (
        <div className={`p-4 rounded-xl flex items-center gap-3 text-xs font-bold ${
          notification.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-1">
            <span>ACTIVE SUBSCRIBERS</span>
            <Users size={14} className="text-[var(--color-brand-800)]" />
          </div>
          <div className="text-2xl font-black text-gray-900 tabular-nums">
            {overview.activeSubscribers.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-600 font-bold mt-1">
            +14% Month over Month
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-1">
            <span>MONTHLY RECURRING</span>
            <DollarSign size={14} className="text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-gray-900 tabular-nums">
            {overview.monthlyRecurringRevenue}
          </div>
          <div className="text-[10px] text-gray-500 font-mono mt-1">
            USD Settlement / IQD Equivalent
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-1">
            <span>MEMBERSHIP TIERS</span>
            <Crown size={14} className="text-amber-500" />
          </div>
          <div className="text-2xl font-black text-gray-900 tabular-nums">
            {tiers.length || overview.tiersCount}
          </div>
          <div className="text-[10px] text-gray-500 font-mono mt-1">
            Diplomatic & Sovereign Active
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-1">
            <span>SYSTEM ENFORCEMENT</span>
            <ShieldCheck size={14} className="text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600">
            {overview.systemStatus}
          </div>
          <div className="text-[10px] text-gray-500 font-mono mt-1">
            Paywall RBAC Enforced
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
        {[
          { id: 'podcasts', label: 'ICA+ Podcasts', icon: Mic },
          { id: 'videos', label: 'Exclusive Videos', icon: VideoIcon },
          { id: 'documentaries', label: 'Corridor Documentaries', icon: Film },
          { id: 'tiers', label: 'Membership Tiers & Perks', icon: Crown, count: tiers.length }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as ContentType)}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
                activeTab === tab.id
                  ? 'bg-[var(--color-brand-800)] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] tabular-nums ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* MEDIA TAB CONTENT */}
      {activeTab !== 'tiers' && (
        <>
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <RefreshCw className="animate-spin text-[var(--color-brand-800)]" size={32} />
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xs border border-gray-200 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 font-mono uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Title & Details</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4">ICA+ Gate</th>
                    <th className="p-4 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {item.coverUrl && (
                            <img src={item.coverUrl} alt="" className="w-12 h-12 rounded-lg object-cover bg-neutral-100 shrink-0" />
                          )}
                          <div className="min-w-0">
                            <p className="font-bold text-gray-900 truncate max-w-md">
                              {item.titleEn || item.title || 'Untitled'}
                            </p>
                            {item.titleAr && (
                              <p className="text-gray-500 text-[11px] font-serif truncate max-w-md rtl:text-right">
                                {item.titleAr}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase">
                          {item.category || 'Corridor'}
                        </span>
                      </td>
                      <td className="p-4 font-mono tabular-nums text-gray-500">
                        {item.duration || '00:00'}
                      </td>
                      <td className="p-4">
                        {item.isFeatured ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            <Crown size={12} />
                            <span>EXCLUSIVE</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-gray-400">PUBLIC</span>
                        )}
                      </td>
                      <td className="p-4 text-end">
                        <div className="inline-flex items-center gap-1.5">
                          <button 
                            type="button"
                            onClick={() => handleEditMedia(item)} 
                            aria-label="Edit item"
                            className="min-h-[36px] min-w-[36px] flex items-center justify-center p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleDeleteMedia(item.id)} 
                            aria-label="Delete item"
                            className="min-h-[36px] min-w-[36px] flex items-center justify-center p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-gray-400 font-mono">
                        No {activeTab} available in the ICA+ catalog.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* TIERS TAB CONTENT */}
      {activeTab === 'tiers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tiers.map(tier => (
              <div 
                key={tier.id}
                className={`ica-card-interactive bg-white rounded-3xl p-6 sm:p-8 border ${
                  tier.isRecommended ? 'border-2 border-[var(--color-brand-800)] shadow-lg' : 'border-gray-200 shadow-xs'
                } flex flex-col justify-between relative`}
              >
                {tier.isRecommended && (
                  <div className="absolute -top-3 inset-inline-end-6 bg-[var(--color-brand-800)] text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    RECOMMENDED TIER
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {tier.name?.en || tier.id}
                      </h3>
                      {tier.name?.ar && (
                        <p className="text-xs text-gray-500 font-serif rtl:text-right mt-0.5">
                          {tier.name.ar}
                        </p>
                      )}
                    </div>
                    <div className="text-end">
                      <div className="text-2xl font-black text-gray-900 tabular-nums">
                        {tier.priceMonthly}
                      </div>
                      <div className="text-[10px] font-mono text-gray-500">
                        {tier.priceAnnual} / year
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <p className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                      Included Diplomatic Privileges:
                    </p>
                    <ul className="space-y-2">
                      {(tier.features?.en || []).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditTier(tier)}
                    className="min-h-[40px] px-4 py-1.5 border border-gray-300 hover:bg-gray-50 rounded-xl text-xs font-bold text-gray-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit2 size={13} />
                    <span>Edit Tier</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteTier(tier.id)}
                    className="min-h-[40px] px-3 py-1.5 border border-gray-200 hover:border-red-500 hover:bg-red-50 rounded-xl text-xs font-bold text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDIT MEDIA MODAL */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto backdrop-blur-xs">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-3xl my-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">
                {editingItem ? 'Edit ICA+ Exclusive' : 'Publish New ICA+ Exclusive'} {activeTab.slice(0, -1)}
              </h2>
              <button 
                type="button"
                onClick={() => setIsEditing(false)} 
                className="text-gray-400 hover:text-gray-600 min-h-[44px] min-w-[44px] flex items-center justify-center font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMedia} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block text-xs font-bold text-gray-700">
                  Title (English)
                  <input required type="text" value={formData.titleEn || ''} onChange={e => setFormData({...formData, titleEn: e.target.value})} className="mt-1 w-full p-2.5 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none" />
                </label>
                <label className="block text-xs font-bold text-gray-700">
                  Title (Arabic)
                  <input type="text" value={formData.titleAr || ''} onChange={e => setFormData({...formData, titleAr: e.target.value})} className="mt-1 w-full p-2.5 border border-gray-300 rounded-xl text-xs rtl:text-right font-serif focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none" />
                </label>
                <label className="block text-xs font-bold text-gray-700">
                  Title (Chinese)
                  <input type="text" value={formData.titleZh || ''} onChange={e => setFormData({...formData, titleZh: e.target.value})} className="mt-1 w-full p-2.5 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none" />
                </label>
                <label className="block text-xs font-bold text-gray-700">
                  Title (Kurdish Central)
                  <input type="text" value={formData.titleCkb || ''} onChange={e => setFormData({...formData, titleCkb: e.target.value})} className="mt-1 w-full p-2.5 border border-gray-300 rounded-xl text-xs rtl:text-right font-serif focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none" />
                </label>
              </div>

              {activeTab === 'podcasts' ? (
                <label className="block text-xs font-bold text-gray-700">
                  Audio Stream URL
                  <input type="url" value={formData.audioUrl || ''} onChange={e => setFormData({...formData, audioUrl: e.target.value})} placeholder="https://..." className="mt-1 w-full p-2.5 border border-gray-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none" />
                </label>
              ) : (
                <label className="block text-xs font-bold text-gray-700">
                  Video Stream URL
                  <input type="url" value={formData.videoUrl || ''} onChange={e => setFormData({...formData, videoUrl: e.target.value})} placeholder="https://..." className="mt-1 w-full p-2.5 border border-gray-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none" />
                </label>
              )}
              
              <label className="block text-xs font-bold text-gray-700">
                High-Resolution Cover Poster URL
                <input type="url" value={formData.coverUrl || ''} onChange={e => setFormData({...formData, coverUrl: e.target.value})} placeholder="https://images.unsplash.com/..." className="mt-1 w-full p-2.5 border border-gray-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none" />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="block text-xs font-bold text-gray-700">
                  Category
                  <input type="text" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} className="mt-1 w-full p-2.5 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none" />
                </label>
                <label className="block text-xs font-bold text-gray-700">
                  Duration (e.g. 28:10)
                  <input type="text" value={formData.duration || ''} onChange={e => setFormData({...formData, duration: e.target.value})} className="mt-1 w-full p-2.5 border border-gray-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none" />
                </label>
                <label className="block text-xs font-bold text-gray-700">
                  Guest / Host / Director
                  <input type="text" value={formData.guestName || formData.director || ''} onChange={e => setFormData({...formData, guestName: e.target.value, director: e.target.value})} className="mt-1 w-full p-2.5 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none" />
                </label>
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Multi-Locale Descriptions</p>
                <textarea rows={2} placeholder="Description (English)" value={formData.descriptionEn || ''} onChange={e => setFormData({...formData, descriptionEn: e.target.value})} className="w-full p-2.5 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none" />
                <textarea rows={2} placeholder="Description (Arabic)" value={formData.descriptionAr || ''} onChange={e => setFormData({...formData, descriptionAr: e.target.value})} className="w-full p-2.5 border border-gray-300 rounded-xl text-xs rtl:text-right font-serif focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none" />
              </div>

              <div className="flex gap-6 border-t border-gray-200 pt-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700">
                  <input type="checkbox" checked={formData.isFeatured ?? true} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} className="rounded text-[var(--color-brand-800)]" />
                  <span>Lock behind ICA+ Sovereign Paywall</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700">
                  <input type="checkbox" checked={formData.isTrending ?? false} onChange={e => setFormData({...formData, isTrending: e.target.checked})} className="rounded text-[var(--color-brand-800)]" />
                  <span>Mark as Trending Briefing</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button type="button" onClick={() => setIsEditing(false)} className="min-h-[44px] px-5 py-2 border border-gray-300 hover:bg-gray-50 rounded-xl text-xs font-bold text-gray-700 transition-colors cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="min-h-[44px] px-6 py-2 bg-[var(--color-brand-800)] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#b80016] transition-colors shadow-sm cursor-pointer">
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT TIER MODAL */}
      {isEditingTier && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto backdrop-blur-xs">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-xl my-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">
                {editingTier ? 'Edit ICA+ Tier' : 'Create New ICA+ Tier'}
              </h2>
              <button 
                type="button"
                onClick={() => setIsEditingTier(false)} 
                className="text-gray-400 hover:text-gray-600 min-h-[44px] min-w-[44px] flex items-center justify-center font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTier} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block text-xs font-bold text-gray-700">
                  Tier Name (EN)
                  <input required type="text" value={tierFormData.nameEn} onChange={e => setTierFormData({...tierFormData, nameEn: e.target.value})} className="mt-1 w-full p-2.5 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none" />
                </label>
                <label className="block text-xs font-bold text-gray-700">
                  Tier Name (AR)
                  <input type="text" value={tierFormData.nameAr} onChange={e => setTierFormData({...tierFormData, nameAr: e.target.value})} className="mt-1 w-full p-2.5 border border-gray-300 rounded-xl text-xs rtl:text-right font-serif focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none" />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="block text-xs font-bold text-gray-700">
                  Monthly Price
                  <input required type="text" value={tierFormData.priceMonthly} onChange={e => setTierFormData({...tierFormData, priceMonthly: e.target.value})} placeholder="$49" className="mt-1 w-full p-2.5 border border-gray-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none" />
                </label>
                <label className="block text-xs font-bold text-gray-700">
                  Annual Price
                  <input required type="text" value={tierFormData.priceAnnual} onChange={e => setTierFormData({...tierFormData, priceAnnual: e.target.value})} placeholder="$470" className="mt-1 w-full p-2.5 border border-gray-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none" />
                </label>
              </div>

              <label className="block text-xs font-bold text-gray-700">
                Features & Diplomatic Privileges (One per line)
                <textarea rows={4} value={tierFormData.featuresEn} onChange={e => setTierFormData({...tierFormData, featuresEn: e.target.value})} className="mt-1 w-full p-2.5 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none font-mono" />
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700 pt-2">
                <input type="checkbox" checked={tierFormData.isRecommended} onChange={e => setTierFormData({...tierFormData, isRecommended: e.target.checked})} className="rounded text-[var(--color-brand-800)]" />
                <span>Set as Recommended Highlight Tier</span>
              </label>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button type="button" onClick={() => setIsEditingTier(false)} className="min-h-[44px] px-5 py-2 border border-gray-300 hover:bg-gray-50 rounded-xl text-xs font-bold text-gray-700 transition-colors cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="min-h-[44px] px-6 py-2 bg-[var(--color-brand-800)] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#b80016] transition-colors shadow-sm cursor-pointer">
                  Save Tier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
