import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Compass, Plus, Trash2, Edit, Save, RotateCcw, Eye, ArrowUp, ArrowDown, 
  ExternalLink, CheckCircle, AlertCircle, Layers, Link as LinkIcon, 
  Shield, Globe, Sparkles, Sliders, Check, X
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Locale } from '../types';
import { Footer } from '../components/Footer';
import { toast } from 'sonner';

export function CiseCommandHubFooter({ lang = 'en' }: { lang?: Locale }) {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const userRole = (user?.role || 'VIEWER').toUpperCase();
  const canEdit = ['SUPERADMIN', 'ADMIN', 'EDITOR'].includes(userRole);
  const isSuperAdmin = userRole === 'SUPERADMIN';

  const [activeTab, setActiveTab] = useState<'config' | 'columns' | 'preview'>('columns');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Column modal state
  const [columnModalOpen, setColumnModalOpen] = useState(false);
  const [editingColumn, setEditingColumn] = useState<any | null>(null);
  const [columnForm, setColumnForm] = useState({
    heading: '',
    headingAr: '',
    headingZh: '',
    headingCkb: '',
    displayOrder: 1,
    status: 'PUBLISHED'
  });

  // Link modal state
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState<string>('');
  const [editingLink, setEditingLink] = useState<any | null>(null);
  const [linkForm, setLinkForm] = useState({
    label: '',
    labelAr: '',
    labelZh: '',
    labelCkb: '',
    href: '',
    external: false,
    displayOrder: 1,
    status: 'PUBLISHED'
  });

  // Fetch footer data
  const { data: footerData, isLoading, refetch } = useQuery({
    queryKey: ['hub-footer-config'],
    queryFn: async () => {
      const res = await fetch('/api/hub/footer', {
        headers: { 'x-role': userRole }
      });
      if (!res.ok) throw new Error('Failed to fetch footer data');
      return await res.json();
    }
  });

  const showNotice = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ type, message });
    if (type === 'error') {
      toast.error(message);
    } else {
      toast.success(message);
    }
    setTimeout(() => setNotification(null), 4000);
  };

  // 1. Update Config Mutation
  const updateConfigMutation = useMutation({
    mutationFn: async (updated: any) => {
      const res = await fetch('/api/hub/footer', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-role': userRole
        },
        body: JSON.stringify(updated)
      });
      if (!res.ok) throw new Error('Failed to update footer config');
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hub-footer-config'] });
      queryClient.invalidateQueries({ queryKey: ['public-footer'] });
      showNotice('Footer configuration saved and synchronized successfully.');
    },
    onError: (err: any) => {
      showNotice(err.message || 'Error saving footer config', 'error');
    }
  });

  // 2. Save Column Mutation
  const saveColumnMutation = useMutation({
    mutationFn: async ({ id, data }: { id?: string; data: any }) => {
      const endpoint = id ? `/api/hub/footer/columns/${id}` : '/api/hub/footer/columns';
      const method = id ? 'PUT' : 'POST';
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-role': userRole
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to save column');
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hub-footer-config'] });
      queryClient.invalidateQueries({ queryKey: ['public-footer'] });
      setColumnModalOpen(false);
      setEditingColumn(null);
      showNotice('Footer column saved successfully.');
    },
    onError: (err: any) => {
      showNotice(err.message, 'error');
    }
  });

  // 3. Delete Column Mutation
  const deleteColumnMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/hub/footer/columns/${id}`, {
        method: 'DELETE',
        headers: { 'x-role': userRole }
      });
      if (!res.ok) throw new Error('Failed to delete column');
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hub-footer-config'] });
      queryClient.invalidateQueries({ queryKey: ['public-footer'] });
      showNotice('Column deleted successfully.');
    },
    onError: (err: any) => {
      showNotice(err.message, 'error');
    }
  });

  // 4. Save Link Mutation
  const saveLinkMutation = useMutation({
    mutationFn: async ({ id, data }: { id?: string; data: any }) => {
      const endpoint = id ? `/api/hub/footer/links/${id}` : '/api/hub/footer/links';
      const method = id ? 'PUT' : 'POST';
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-role': userRole
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to save link');
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hub-footer-config'] });
      queryClient.invalidateQueries({ queryKey: ['public-footer'] });
      setLinkModalOpen(false);
      setEditingLink(null);
      showNotice('Footer link saved successfully.');
    },
    onError: (err: any) => {
      showNotice(err.message, 'error');
    }
  });

  // 5. Delete Link Mutation
  const deleteLinkMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/hub/footer/links/${id}`, {
        method: 'DELETE',
        headers: { 'x-role': userRole }
      });
      if (!res.ok) throw new Error('Failed to delete link');
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hub-footer-config'] });
      queryClient.invalidateQueries({ queryKey: ['public-footer'] });
      showNotice('Link deleted successfully.');
    },
    onError: (err: any) => {
      showNotice(err.message, 'error');
    }
  });

  // 6. Reset Canonical Mutation
  const resetCanonicalMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/hub/footer/reset', {
        method: 'POST',
        headers: { 'x-role': userRole }
      });
      if (!res.ok) throw new Error('Failed to reset footer');
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hub-footer-config'] });
      queryClient.invalidateQueries({ queryKey: ['public-footer'] });
      showNotice('Footer successfully reset to canonical 6-column specification.');
    },
    onError: (err: any) => {
      showNotice(err.message, 'error');
    }
  });

  // Open Column Modal
  const openColumnCreate = () => {
    setEditingColumn(null);
    setColumnForm({
      heading: '',
      headingAr: '',
      headingZh: '',
      headingCkb: '',
      displayOrder: (footerData?.columns?.length || 0) + 1,
      status: 'PUBLISHED'
    });
    setColumnModalOpen(true);
  };

  const openColumnEdit = (col: any) => {
    setEditingColumn(col);
    setColumnForm({
      heading: col.heading || '',
      headingAr: col.headingAr || '',
      headingZh: col.headingZh || '',
      headingCkb: col.headingCkb || '',
      displayOrder: col.displayOrder || 1,
      status: col.status || 'PUBLISHED'
    });
    setColumnModalOpen(true);
  };

  // Open Link Modal
  const openLinkCreate = (columnId: string) => {
    setSelectedColumnId(columnId);
    setEditingLink(null);
    setLinkForm({
      label: '',
      labelAr: '',
      labelZh: '',
      labelCkb: '',
      href: '',
      external: false,
      displayOrder: 1,
      status: 'PUBLISHED'
    });
    setLinkModalOpen(true);
  };

  const openLinkEdit = (columnId: string, link: any) => {
    setSelectedColumnId(columnId);
    setEditingLink(link);
    setLinkForm({
      label: link.label || '',
      labelAr: link.labelAr || '',
      labelZh: link.labelZh || '',
      labelCkb: link.labelCkb || '',
      href: link.href || '',
      external: !!link.external,
      displayOrder: link.displayOrder || 1,
      status: link.status || 'PUBLISHED'
    });
    setLinkModalOpen(true);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-red-600 font-bold mb-1">
            <span>CISE Command Hub</span>
            <span>/</span>
            <span>Global Control Surface</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <Compass className="w-7 h-7 text-red-600" />
            <span>Global Footer Management</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Centrally manage canonical footer columns, links, multi-lingual translations, sovereign dispatches, and partner syndication.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isSuperAdmin && (
            <button
              onClick={() => resetCanonicalMutation.mutate()}
              disabled={resetCanonicalMutation.isPending}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <RotateCcw size={14} className={resetCanonicalMutation.isPending ? 'animate-spin' : ''} />
              <span>Reset Canonical</span>
            </button>
          )}

          {canEdit && activeTab === 'columns' && (
            <button
              onClick={openColumnCreate}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-red-600/20 active:scale-95 cursor-pointer"
            >
              <Plus size={16} />
              <span>Add Column</span>
            </button>
          )}
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-3 ${
          notification.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {notification.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-200 gap-2">
        <button
          onClick={() => setActiveTab('columns')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'columns'
              ? 'border-red-600 text-red-600'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Layers size={14} />
          <span>Columns & Links ({footerData?.columns?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('config')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'config'
              ? 'border-red-600 text-red-600'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Sliders size={14} />
          <span>Global Settings & Features</span>
        </button>

        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'preview'
              ? 'border-red-600 text-red-600'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Eye size={14} />
          <span>Live Preview</span>
        </button>
      </div>

      {/* TAB 1: COLUMNS & LINKS */}
      {activeTab === 'columns' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {footerData?.columns?.map((col: any) => (
              <div 
                key={col.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 flex flex-col justify-between hover:border-gray-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 text-[10px] font-black flex items-center justify-center">
                        {col.displayOrder}
                      </span>
                      <h3 className="font-bold text-sm text-gray-900 truncate">
                        {col.heading}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {canEdit && (
                        <>
                          <button
                            onClick={() => openColumnEdit(col)}
                            className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit Column Heading"
                          >
                            <Edit size={14} />
                          </button>
                          {isSuperAdmin && (
                            <button
                              onClick={() => deleteColumnMutation.mutate(col.id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Column"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-600 mb-4">
                    <div className="text-[11px] text-gray-400 font-mono">
                      AR: {col.headingAr || '—'} · ZH: {col.headingZh || '—'} · CKB: {col.headingCkb || '—'}
                    </div>
                  </div>

                  {/* Links List */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2">
                      Links ({col.links?.length || 0})
                    </div>
                    {col.links && col.links.length > 0 ? (
                      col.links.map((link: any) => (
                        <div 
                          key={link.id}
                          className="flex items-center justify-between p-2 rounded-xl bg-gray-50 hover:bg-gray-100/80 transition-colors text-xs group"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
                            <span className="font-medium text-gray-900 truncate">{link.label}</span>
                            <span className="text-[10px] font-mono text-gray-400 truncate">({link.href})</span>
                          </div>
                          {canEdit && (
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => openLinkEdit(col.id, link)}
                                className="p-1 hover:text-gray-900 rounded cursor-pointer"
                              >
                                <Edit size={12} />
                              </button>
                              <button
                                onClick={() => deleteLinkMutation.mutate(link.id)}
                                className="p-1 hover:text-red-600 rounded cursor-pointer"
                                title="Delete Link"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-gray-400 italic py-2 text-center">
                        No links in this column.
                      </div>
                    )}
                  </div>
                </div>

                {canEdit && (
                  <button
                    onClick={() => openLinkCreate(col.id)}
                    className="mt-4 w-full py-2 border border-dashed border-gray-300 hover:border-red-600 text-gray-600 hover:text-red-600 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>Add Link</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CONFIG & GLOBAL SETTINGS */}
      {activeTab === 'config' && footerData && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 sm:p-8 space-y-6">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              updateConfigMutation.mutate({
                tagline: fd.get('tagline'),
                taglineAr: fd.get('taglineAr'),
                taglineZh: fd.get('taglineZh'),
                taglineCkb: fd.get('taglineCkb'),
                ctaLabel: fd.get('ctaLabel'),
                ctaHref: fd.get('ctaHref'),
                copyrightText: fd.get('copyrightText'),
                newsletterHeading: fd.get('newsletterHeading'),
                newsletterEnabled: fd.get('newsletterEnabled') === 'on',
                marqueeEnabled: fd.get('marqueeEnabled') === 'on',
                showLanguageSwitcher: fd.get('showLanguageSwitcher') === 'on',
                showDownloadApp: fd.get('showDownloadApp') === 'on',
                showBackToTop: fd.get('showBackToTop') === 'on',
              });
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Tagline (English)
                </label>
                <input
                  name="tagline"
                  defaultValue={footerData.tagline}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Tagline (Arabic)
                </label>
                <input
                  name="taglineAr"
                  dir="rtl"
                  defaultValue={footerData.taglineAr}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Tagline (Chinese)
                </label>
                <input
                  name="taglineZh"
                  defaultValue={footerData.taglineZh}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Tagline (Kurdish Sorani)
                </label>
                <input
                  name="taglineCkb"
                  dir="rtl"
                  defaultValue={footerData.taglineCkb}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Primary CTA Label
                </label>
                <input
                  name="ctaLabel"
                  defaultValue={footerData.ctaLabel}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Primary CTA Href
                </label>
                <input
                  name="ctaHref"
                  defaultValue={footerData.ctaHref}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Copyright Notice
                </label>
                <input
                  name="copyrightText"
                  defaultValue={footerData.copyrightText}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium"
                />
              </div>
            </div>

            {/* Feature Toggles */}
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 mb-3">
                Feature Band Toggles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    name="newsletterEnabled"
                    defaultChecked={footerData.newsletterEnabled}
                    className="rounded text-red-600 focus:ring-red-600"
                  />
                  <span className="text-xs font-bold text-gray-800">Newsletter Band</span>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    name="marqueeEnabled"
                    defaultChecked={footerData.marqueeEnabled}
                    className="rounded text-red-600 focus:ring-red-600"
                  />
                  <span className="text-xs font-bold text-gray-800">Partners Marquee</span>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    name="showLanguageSwitcher"
                    defaultChecked={footerData.showLanguageSwitcher}
                    className="rounded text-red-600 focus:ring-red-600"
                  />
                  <span className="text-xs font-bold text-gray-800">Language Switcher</span>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    name="showDownloadApp"
                    defaultChecked={footerData.showDownloadApp}
                    className="rounded text-red-600 focus:ring-red-600"
                  />
                  <span className="text-xs font-bold text-gray-800">PWA Download Card</span>
                </label>
              </div>
            </div>

            {canEdit && (
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={updateConfigMutation.isPending}
                  className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md hover:shadow-red-600/25 transition-all cursor-pointer"
                >
                  <Save size={15} />
                  <span>Save Configuration</span>
                </button>
              </div>
            )}
          </form>
        </div>
      )}

      {/* TAB 3: LIVE PREVIEW */}
      {activeTab === 'preview' && (
        <div className="space-y-4">
          <div className="p-4 bg-gray-900 rounded-2xl text-xs text-neutral-300 flex items-center justify-between">
            <span className="font-mono text-[11px] font-bold text-red-400">
              LIVE PREVIEW SURROUND: Canonical Global Footer Component
            </span>
            <span className="text-neutral-400 text-[10px]">
              Active Locale: {lang}
            </span>
          </div>

          <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-xl">
            <Footer currentLocale={lang} />
          </div>
        </div>
      )}

      {/* COLUMN MODAL */}
      {columnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-black text-base text-gray-900">
                {editingColumn ? 'Edit Footer Column' : 'Add Footer Column'}
              </h3>
              <button 
                onClick={() => setColumnModalOpen(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveColumnMutation.mutate({
                  id: editingColumn?.id,
                  data: columnForm
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Heading (EN)</label>
                <input
                  required
                  value={columnForm.heading}
                  onChange={(e) => setColumnForm({ ...columnForm, heading: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Heading (AR)</label>
                <input
                  dir="rtl"
                  value={columnForm.headingAr}
                  onChange={(e) => setColumnForm({ ...columnForm, headingAr: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Heading (ZH)</label>
                <input
                  value={columnForm.headingZh}
                  onChange={(e) => setColumnForm({ ...columnForm, headingZh: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Heading (CKB)</label>
                <input
                  dir="rtl"
                  value={columnForm.headingCkb}
                  onChange={(e) => setColumnForm({ ...columnForm, headingCkb: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setColumnModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveColumnMutation.isPending}
                  className="px-5 py-2 bg-red-600 text-white rounded-xl text-xs font-bold uppercase"
                >
                  Save Column
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LINK MODAL */}
      {linkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-black text-base text-gray-900">
                {editingLink ? 'Edit Footer Link' : 'Add Footer Link'}
              </h3>
              <button 
                onClick={() => setLinkModalOpen(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveLinkMutation.mutate({
                  id: editingLink?.id,
                  data: {
                    columnId: selectedColumnId,
                    ...linkForm
                  }
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Label (EN)</label>
                <input
                  required
                  value={linkForm.label}
                  onChange={(e) => setLinkForm({ ...linkForm, label: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Label (AR)</label>
                <input
                  dir="rtl"
                  value={linkForm.labelAr}
                  onChange={(e) => setLinkForm({ ...linkForm, labelAr: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Label (ZH)</label>
                <input
                  value={linkForm.labelZh}
                  onChange={(e) => setLinkForm({ ...linkForm, labelZh: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Label (CKB)</label>
                <input
                  dir="rtl"
                  value={linkForm.labelCkb}
                  onChange={(e) => setLinkForm({ ...linkForm, labelCkb: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Target Href (URL or #anchor)</label>
                <input
                  required
                  value={linkForm.href}
                  onChange={(e) => setLinkForm({ ...linkForm, href: e.target.value })}
                  placeholder="/newsroom or #newsletter"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="linkExternal"
                  checked={linkForm.external}
                  onChange={(e) => setLinkForm({ ...linkForm, external: e.target.checked })}
                  className="rounded text-red-600"
                />
                <label htmlFor="linkExternal" className="text-xs font-bold text-gray-700">Open in external tab</label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setLinkModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveLinkMutation.isPending}
                  className="px-5 py-2 bg-red-600 text-white rounded-xl text-xs font-bold uppercase"
                >
                  Save Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CiseCommandHubFooter;
