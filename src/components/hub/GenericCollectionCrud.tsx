import React, { useState } from 'react';
import { 
  Plus, Edit, Trash2, Search, SlidersHorizontal, 
  CheckCircle, Save, X, ExternalLink, Globe, Palette, Clock, AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';
import { useCollection, firestoreService } from '../../hooks/useFirestore';
import { useAuthStore } from '../../store/useAuthStore';
import { Locale } from '../../types';

interface GenericCollectionCrudProps {
  collectionPath: string;
  sectionTitle: string;
  sectionDescription?: string;
  lang?: Locale;
  fields: {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'select' | 'image' | 'localized';
    options?: { value: string; label: string }[];
    required?: boolean;
  }[];
}

export function GenericCollectionCrud({
  collectionPath,
  sectionTitle,
  sectionDescription,
  lang = 'en',
  fields
}: GenericCollectionCrudProps) {
  const { user } = useAuthStore();
  const { data: items = [], loading: isLoading } = useCollection<any>(collectionPath);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingCard] = useState<any | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userRole = (user?.role || 'SUPERADMIN').toUpperCase();
  const canEdit = ['SUPERADMIN', 'ADMIN', 'EDITOR'].includes(userRole);

  const filteredItems = items.filter(item => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return Object.values(item).some(val => 
      typeof val === 'string' && val.toLowerCase().includes(q)
    );
  });

  const handleOpenCreate = () => {
    setEditingCard(null);
    const initialData: Record<string, any> = {};
    fields.forEach(f => {
      if (f.type === 'localized') {
        initialData[f.name + 'En'] = '';
        initialData[f.name + 'Ar'] = '';
        initialData[f.name + 'Zh'] = '';
        initialData[f.name + 'Ckb'] = '';
      } else {
        initialData[f.name] = f.type === 'select' ? f.options?.[0]?.value || '' : '';
      }
    });
    setFormData(initialData);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingCard(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingItem) {
        await firestoreService.updateDocument(collectionPath, editingItem.id, formData);
        toast.success('Record updated successfully');
      } else {
        await firestoreService.addDocument(collectionPath, formData);
        toast.success('Record created successfully');
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Save failed:', err);
      toast.error('Failed to save record');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this record permanently?')) return;
    try {
      await firestoreService.deleteDocument(collectionPath, id);
      toast.success('Record deleted');
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black uppercase text-neutral-900 tracking-tight">{sectionTitle}</h2>
          <p className="text-sm text-neutral-500 mt-1">{sectionDescription}</p>
        </div>
        {canEdit && (
          <button
            onClick={handleOpenCreate}
            className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-black text-xs uppercase tracking-widest rounded-xl transition shadow-lg shadow-red-900/10 flex items-center gap-2"
          >
            <Plus size={16} />
            <span>Create New</span>
          </button>
        )}
      </div>

      <div className="relative">
        <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search records..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition"
        />
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-neutral-50 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredItems.map(item => (
            <div key={item.id} className="p-6 bg-white border border-neutral-200 rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition">
              <div className="space-y-1">
                <h4 className="font-bold text-neutral-900">
                  {item.titleEn || item.nameEn || item.id}
                </h4>
                <div className="text-xs text-neutral-500 font-mono flex items-center gap-2">
                  <span>ID: {item.id}</span>
                  {item.institutionName && (
                    <>
                      <span>•</span>
                      <span>{item.institutionName}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-600 transition"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 bg-neutral-900 text-white flex items-center justify-between">
              <h3 className="text-lg font-black uppercase tracking-tight">
                {editingItem ? 'Edit Record' : 'Create New Record'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:opacity-70 transition">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map(field => {
                  if (field.type === 'localized') {
                    return (
                      <div key={field.name} className="md:col-span-2 space-y-4">
                        <label className="text-[10px] font-black uppercase text-neutral-400 tracking-widest block">{field.label}</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <span className="text-[9px] font-bold text-neutral-400 uppercase">English</span>
                            <input
                              type="text"
                              value={formData[field.name + 'En'] || ''}
                              onChange={e => setFormData({ ...formData, [field.name + 'En']: e.target.value })}
                              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <span className="text-[9px] font-bold text-emerald-600 uppercase">Arabic</span>
                            <input
                              type="text"
                              dir="rtl"
                              value={formData[field.name + 'Ar'] || ''}
                              onChange={e => setFormData({ ...formData, [field.name + 'Ar']: e.target.value })}
                              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <span className="text-[9px] font-bold text-red-600 uppercase">Chinese</span>
                            <input
                              type="text"
                              value={formData[field.name + 'Zh'] || ''}
                              onChange={e => setFormData({ ...formData, [field.name + 'Zh']: e.target.value })}
                              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <span className="text-[9px] font-bold text-amber-600 uppercase">Kurdish</span>
                            <input
                              type="text"
                              dir="rtl"
                              value={formData[field.name + 'Ckb'] || ''}
                              onChange={e => setFormData({ ...formData, [field.name + 'Ckb']: e.target.value })}
                              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                      <label className="text-[10px] font-black uppercase text-neutral-400 tracking-widest block mb-2">{field.label}</label>
                      {field.type === 'textarea' ? (
                        <textarea
                          rows={4}
                          value={formData[field.name] || ''}
                          onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                          className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm"
                        />
                      ) : field.type === 'select' ? (
                        <select
                          value={formData[field.name] || ''}
                          onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                          className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm"
                        >
                          {field.options?.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={formData[field.name] || ''}
                          onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                          className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-8 border-t border-neutral-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-xl text-xs font-bold text-neutral-500 hover:bg-neutral-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-red-700 hover:bg-red-800 text-white font-black text-xs uppercase tracking-widest rounded-xl transition shadow-lg shadow-red-900/10 disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
