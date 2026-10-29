import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { useParams, Link } from 'react-router-dom';
import { 
  Upload, Search, Trash2, Calendar, FileText, Check, Copy, Plus, 
  Edit3, Radio, Video, Mic, Film, Eye, RefreshCw, Filter, ExternalLink,
  Layers, CheckCircle2, AlertCircle
} from 'lucide-react';
import { apiFetch } from '../lib/api';

interface MediaHubItem {
  id: string;
  slug: string;
  title: Record<string, string>;
  type: 'video' | 'podcast' | 'infographic' | 'documentary';
  category: string;
  url: string;
  duration: string;
  publishDate: string;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  sourceVertical: string;
}

interface MediaAsset {
  id: string;
  filename: string;
  url: string;
  category: string;
  size: string;
  uploadedAt: string;
}

const INITIAL_ASSETS: MediaAsset[] = [
  {
    id: 'm1',
    filename: 'baghdad_trade_center.jpg',
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400',
    category: 'Economy',
    size: '1.2 MB',
    uploadedAt: '2026-07-16'
  },
  {
    id: 'm2',
    filename: 'china_oil_refinery.jpg',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400',
    category: 'Energy',
    size: '2.4 MB',
    uploadedAt: '2026-07-15'
  },
  {
    id: 'm3',
    filename: 'silk_road_corridor_map.jpg',
    url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400',
    category: 'Geopolitics',
    size: '850 KB',
    uploadedAt: '2026-07-14'
  },
  {
    id: 'm4',
    filename: 'beijing_summit_hall.jpg',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400',
    category: 'Politics',
    size: '3.1 MB',
    uploadedAt: '2026-07-12'
  }
];

export function CiseCommandHubMedia() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  
  // Section Navigation Tabs
  const [activeHubTab, setActiveHubTab] = useState<'catalog' | 'live' | 'assets'>('catalog');

  // Media Items CRUD state
  const [items, setItems] = useState<MediaHubItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [itemSearchQuery, setItemSearchQuery] = useState('');
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaHubItem | null>(null);

  // Item Form state
  const [formData, setFormData] = useState<{
    slug: string;
    titleEn: string;
    titleAr: string;
    titleZh: string;
    titleCkb: string;
    type: 'video' | 'podcast' | 'infographic' | 'documentary';
    category: string;
    url: string;
    duration: string;
    status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
    sourceVertical: string;
  }>({
    slug: '',
    titleEn: '',
    titleAr: '',
    titleZh: '',
    titleCkb: '',
    type: 'video',
    category: 'infrastructure',
    url: '',
    duration: '5:00',
    status: 'PUBLISHED',
    sourceVertical: 'Media Hub'
  });

  // Assets Library state
  const [assetsList, setAssetsList] = useState<MediaAsset[]>(INITIAL_ASSETS);
  const [assetSearchQuery, setAssetSearchQuery] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Notification state
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchMediaItems = async () => {
    setLoadingItems(true);
    try {
      const res = await apiFetch('/api/hub/media-hub/items');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (err) {
      console.error('Error fetching media hub items:', err);
    } finally {
      setLoadingItems(false);
    }
  };

  useEffect(() => {
    fetchMediaItems();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      slug: `media-${Date.now()}`,
      titleEn: '',
      titleAr: '',
      titleZh: '',
      titleCkb: '',
      type: 'video',
      category: 'infrastructure',
      url: '',
      duration: '5:00',
      status: 'PUBLISHED',
      sourceVertical: 'Media Hub'
    });
    setIsItemModalOpen(true);
  };

  const openEditModal = (item: MediaHubItem) => {
    setEditingItem(item);
    setFormData({
      slug: item.slug,
      titleEn: item.title?.en || '',
      titleAr: item.title?.ar || '',
      titleZh: item.title?.zh || '',
      titleCkb: item.title?.ckb || '',
      type: item.type,
      category: item.category,
      url: item.url,
      duration: item.duration,
      status: item.status,
      sourceVertical: item.sourceVertical || 'Media Hub'
    });
    setIsItemModalOpen(true);
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      slug: formData.slug,
      title: {
        en: formData.titleEn,
        ar: formData.titleAr || formData.titleEn,
        zh: formData.titleZh || formData.titleEn,
        ckb: formData.titleCkb || formData.titleEn
      },
      type: formData.type,
      category: formData.category,
      url: formData.url,
      duration: formData.duration,
      status: formData.status,
      sourceVertical: formData.sourceVertical
    };

    try {
      if (editingItem) {
        const res = await apiFetch(`/api/hub/media-hub/items/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'x-role': 'ADMIN' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          showNotification('success', 'Media Hub item updated successfully.');
          fetchMediaItems();
          setIsItemModalOpen(false);
        } else {
          showNotification('error', 'Failed to update Media Hub item.');
        }
      } else {
        const res = await apiFetch('/api/hub/media-hub/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-role': 'ADMIN' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          showNotification('success', 'New Media Hub item created successfully.');
          fetchMediaItems();
          setIsItemModalOpen(false);
        } else {
          showNotification('error', 'Failed to create Media Hub item.');
        }
      }
    } catch (err) {
      console.error('Save error:', err);
      showNotification('error', 'Connection error while saving item.');
    }
  };

  const handleDeleteItem = async (id: string) => {
    toast.warning('Are you sure you want to delete this Media Hub item?', {
      action: {
        label: 'Delete',
        onClick: async () => {
          try {
            const res = await apiFetch(`/api/hub/media-hub/items/${id}`, {
              method: 'DELETE',
              headers: { 'x-role': 'ADMIN' }
            });
            if (res.ok) {
              toast.success('Media Hub item removed.');
              fetchMediaItems();
            } else {
              toast.error('Failed to delete Media Hub item.');
            }
          } catch (err) {
            console.error('Delete error:', err);
            toast.error('Connection error during deletion.');
          }
        }
      }
    });
  };

  // Asset helpers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const processFile = (file: File) => {
    const localUrl = URL.createObjectURL(file);
    const newMedia: MediaAsset = {
      id: `m-${Date.now()}`,
      filename: file.name,
      url: localUrl,
      category: 'Uploads',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    setAssetsList(prev => [newMedia, ...prev]);
    showNotification('success', `File "${file.name}" uploaded to asset library.`);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredItems = items.filter(item => {
    const matchesType = selectedTypeFilter === 'all' || item.type === selectedTypeFilter;
    const matchesQuery = !itemSearchQuery || 
      (item.title?.en || '').toLowerCase().includes(itemSearchQuery.toLowerCase()) ||
      (item.slug || '').toLowerCase().includes(itemSearchQuery.toLowerCase()) ||
      (item.category || '').toLowerCase().includes(itemSearchQuery.toLowerCase());
    return matchesType && matchesQuery;
  });

  const filteredAssets = assetsList.filter(m => 
    m.filename.toLowerCase().includes(assetSearchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(assetSearchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-start">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--color-brand-800)] uppercase tracking-widest mb-1">
            <Layers size={14} />
            <span>CISE Command Hub • Media Hub Control Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Media Hub Administration & CRUD
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-3xl">
            Plenipotentiary control surface for all Media Hub video reels, podcasts, infographics, documentaries, and live broadcast uplinks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link
            to={`/${lang}/media`}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-4 py-2 bg-white border border-gray-300 hover:border-[var(--color-brand-800)] rounded-xl text-xs font-bold text-gray-700 flex items-center gap-2 transition-colors shadow-xs"
          >
            <Eye size={16} />
            <span>Preview Public Media Hub</span>
            <ExternalLink size={12} />
          </Link>

          <button
            type="button"
            onClick={openCreateModal}
            className="min-h-[44px] px-5 py-2 bg-[var(--color-brand-800)] hover:bg-[#b80016] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
          >
            <Plus size={16} />
            <span>New Media Hub Item</span>
          </button>
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

      {/* Primary Sub-Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-2">
        {[
          { id: 'catalog', label: 'Media Hub Catalog', icon: Film, count: items.length },
          { id: 'live', label: 'Broadcast Feeds & Live Uplink', icon: Radio },
          { id: 'assets', label: 'Digital Assets & Media Library', icon: Upload, count: assetsList.length }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveHubTab(tab.id as any)}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${
                activeHubTab === tab.id
                  ? 'bg-[var(--color-brand-800)] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] tabular-nums ${activeHubTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Media Hub Catalog CRUD */}
      {activeHubTab === 'catalog' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row gap-4 justify-between items-center shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search Media Hub items..."
                value={itemSearchQuery}
                onChange={(e) => setItemSearchQuery(e.target.value)}
                className="w-full ps-9 pe-4 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-mono text-gray-500 flex items-center gap-1">
                <Filter size={12} />
                <span>Type:</span>
              </span>
              {['all', 'video', 'podcast', 'infographic', 'documentary'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedTypeFilter(type)}
                  className={`min-h-[36px] px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    selectedTypeFilter === type
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
              <button
                type="button"
                onClick={fetchMediaItems}
                aria-label="Refresh Media Hub Items"
                className="min-h-[36px] min-w-[36px] flex items-center justify-center p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
              >
                <RefreshCw size={14} className={loadingItems ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="ica-card-interactive bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[var(--color-brand-800)] transition-all shadow-xs flex flex-col justify-between"
              >
                {/* Media Aspect Preview */}
                <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title?.en || item.slug}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-3 inset-inline-start-3 flex items-center gap-1.5">
                    <span className="bg-[var(--color-brand-800)] text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                    <span className="bg-black/70 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 inset-inline-end-3 bg-black/80 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded tabular-nums">
                    {item.duration}
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono text-gray-500">
                      <span>{item.sourceVertical}</span>
                      <span>{item.publishDate}</span>
                    </div>
                    <h3 className="font-bold text-sm text-gray-900 line-clamp-2" title={item.title?.en}>
                      {item.title?.en || item.slug}
                    </h3>
                    {item.title?.ar && (
                      <p className="text-xs text-gray-500 line-clamp-1 rtl:text-right font-serif">
                        {item.title.ar}
                      </p>
                    )}
                  </div>

                  {/* Actions Base */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      item.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.status}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        aria-label="Edit Item"
                        className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-black transition-colors cursor-pointer"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id)}
                        aria-label="Delete Item"
                        className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg border border-gray-200 hover:border-red-500 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredItems.length === 0 && !loadingItems && (
              <div className="col-span-full py-16 text-center text-gray-500 bg-white rounded-2xl border border-gray-200">
                No Media Hub items found matching the selected filter criteria.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Live Stream Feeds */}
      {activeHubTab === 'live' && (
        <div className="bg-[#0a0a0a] text-white rounded-2xl p-6 sm:p-8 border border-neutral-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-800)] text-white text-[10px] font-mono font-bold tracking-widest uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                <span>BROADCAST MATRIX • 4K TELEMETRY</span>
              </div>
              <h2 className="text-xl font-bold">Live Stream Channels & Diplomatic Press Feeds</h2>
              <p className="text-xs text-neutral-400 mt-1">
                Configure primary RTMP uplinks, backup failover streams, and multi-lingual audio channels.
              </p>
            </div>
            <Link
              to={`/${lang}/live`}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-4 py-2 bg-[var(--color-brand-800)] hover:bg-[#b80016] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-sm transition-colors"
            >
              <span>View Public Live Stream</span>
              <ExternalLink size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <Radio size={16} className="text-[var(--color-brand-800)]" />
                  <span>Channel 1: Baghdad Central Summit Feed</span>
                </h4>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  ONLINE 60 FPS
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Primary bilateral broadcast corridor. Real-time translation feeds in Arabic, Mandarin, English, and Kurdish.
              </p>
              <div className="text-[11px] font-mono text-neutral-500 space-y-1 bg-black p-3 rounded-lg border border-neutral-800">
                <div>RTMP: rtmp://live.iraqi-chineseagency.com/summit/live_4k</div>
                <div>Bitrate: 8,500 kbps (H.265 / AAC 320k)</div>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <Video size={16} className="text-[var(--color-brand-800)]" />
                  <span>Channel 2: Beijing Secretariat Briefing Room</span>
                </h4>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  STANDBY
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Diplomatic press conference feed and economic policy briefing podium.
              </p>
              <div className="text-[11px] font-mono text-neutral-500 space-y-1 bg-black p-3 rounded-lg border border-neutral-800">
                <div>RTMP: rtmp://live.iraqi-chineseagency.com/beijing/podium_feed</div>
                <div>Bitrate: 6,000 kbps (H.264 / AAC 256k)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Digital Asset Library */}
      {activeHubTab === 'assets' && (
        <div className="space-y-6">
          {/* Drag and Drop Zone */}
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 relative ${
              dragActive 
                ? 'border-[var(--color-brand-800)] bg-red-50/50' 
                : 'border-gray-300 hover:border-[var(--color-brand-800)] bg-white hover:bg-gray-50/40'
            }`}
          >
            <input 
              ref={fileInputRef}
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleFileInput}
            />
            <div className="p-4 bg-red-50 text-[var(--color-brand-800)] rounded-full">
              <Upload size={28} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">
                Drag and drop your high-resolution asset here, or <span className="text-[var(--color-brand-800)] hover:underline">browse files</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">Supports PNG, JPG, WEBP, SVG up to 15MB.</p>
            </div>
          </div>

          {/* Search Assets */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Filter assets by filename or category..."
                value={assetSearchQuery}
                onChange={(e) => setAssetSearchQuery(e.target.value)}
                className="w-full ps-9 pe-4 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none"
              />
            </div>
          </div>

          {/* Assets Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAssets.map((media) => (
              <div key={media.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between">
                <div className="h-44 bg-gray-100 overflow-hidden relative">
                  <img 
                    src={media.url} 
                    alt={media.filename}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <span className="absolute top-2 start-2 bg-black/80 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    {media.category}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between gap-3 text-start">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-900 truncate" title={media.filename}>
                      {media.filename}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-gray-500 tabular-nums">
                      <FileText size={12} />
                      <span>{media.size}</span>
                      <span>·</span>
                      <Calendar size={12} />
                      <span>{media.uploadedAt}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(media.url, media.id)}
                      className="min-h-[36px] flex-1 inline-flex justify-center items-center gap-1.5 px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      {copiedId === media.id ? (
                        <>
                          <Check size={12} className="text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        toast.warning('Delete this asset?', {
                          action: {
                            label: 'Delete',
                            onClick: () => setAssetsList(prev => prev.filter(m => m.id !== media.id))
                          }
                        });
                      }}
                      className="min-h-[36px] min-w-[36px] flex items-center justify-center p-1.5 text-gray-400 hover:text-red-600 border border-gray-200 hover:border-red-500 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isItemModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">
                {editingItem ? 'Edit Media Hub Item' : 'Create New Media Hub Item'}
              </h3>
              <button
                type="button"
                onClick={() => setIsItemModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-sm font-bold min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block text-xs font-bold text-gray-700">
                  Slug (Unique Identifier)
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="mt-1 w-full p-2.5 border border-gray-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none"
                  />
                </label>

                <label className="block text-xs font-bold text-gray-700">
                  Media Type
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="mt-1 w-full p-2.5 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none"
                  >
                    <option value="video">Video Report</option>
                    <option value="podcast">Podcast Episode</option>
                    <option value="infographic">Infographic Intelligence</option>
                    <option value="documentary">Corridor Documentary</option>
                  </select>
                </label>
              </div>

              {/* Multi-locale Titles */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">Multi-Locale Titles</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Title (English)"
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    className="p-2.5 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Title (Arabic)"
                    value={formData.titleAr}
                    onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                    className="p-2.5 border border-gray-300 rounded-xl text-xs rtl:text-right focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none font-serif"
                  />
                  <input
                    type="text"
                    placeholder="Title (Chinese)"
                    value={formData.titleZh}
                    onChange={(e) => setFormData({ ...formData, titleZh: e.target.value })}
                    className="p-2.5 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Title (Kurdish Central)"
                    value={formData.titleCkb}
                    onChange={(e) => setFormData({ ...formData, titleCkb: e.target.value })}
                    className="p-2.5 border border-gray-300 rounded-xl text-xs rtl:text-right focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none font-serif"
                  />
                </div>
              </div>

              {/* URL & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700">
                    Media / Poster URL
                    <input
                      type="url"
                      required
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="https://..."
                      className="mt-1 w-full p-2.5 border border-gray-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none"
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700">
                    Duration / Length
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g. 15:30"
                      className="mt-1 w-full p-2.5 border border-gray-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none"
                    />
                  </label>
                </div>
              </div>

              {/* Category, Status & Vertical */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700">
                    Category
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="mt-1 w-full p-2.5 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none"
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700">
                    Publication Status
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="mt-1 w-full p-2.5 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none"
                    >
                      <option value="PUBLISHED">PUBLISHED</option>
                      <option value="DRAFT">DRAFT</option>
                      <option value="ARCHIVED">ARCHIVED</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700">
                    Source Vertical
                    <select
                      value={formData.sourceVertical}
                      onChange={(e) => setFormData({ ...formData, sourceVertical: e.target.value })}
                      className="mt-1 w-full p-2.5 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[var(--color-brand-800)] outline-none"
                    >
                      <option value="Media Hub">Media Hub</option>
                      <option value="ICA+">ICA+</option>
                      <option value="Public Portal">Public Portal</option>
                      <option value="Live Portal">Live Portal</option>
                    </select>
                  </label>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsItemModalOpen(false)}
                  className="min-h-[44px] px-5 py-2 border border-gray-300 hover:bg-gray-50 rounded-xl text-xs font-bold text-gray-700 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] px-6 py-2 bg-[var(--color-brand-800)] hover:bg-[#b80016] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  {editingItem ? 'Save Changes' : 'Create Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CiseCommandHubMedia;
