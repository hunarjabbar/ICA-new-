import { apiFetch } from '../lib/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Locale } from '../types';
import { useI18n } from '../hooks/useI18n';
import { toast } from 'sonner';

export function CiseCommandHubArticles() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const { user } = useAuthStore();
  const { t } = useI18n(lang as Locale);
  
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/hub/articles/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['article'] });
      toast.success('Article removed successfully');
    }
  });

  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/hub/articles/${id}/approve`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to approve article');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['article'] });
      toast.success('Article approved and published successfully.');
    }
  });

  const handleDelete = (id: string, title: string) => {
    toast.warning(`Are you sure you want to delete "${title}"?`, {
      action: {
        label: 'Delete',
        onClick: () => deleteMutation.mutate(id)
      }
    });
  };

  const { data: articles = [], isLoading } = useQuery<any[]>({
    queryKey: ['admin-articles'],
    queryFn: async () => {
      const res = await apiFetch(`/api/hub/articles?t=${new Date().getTime()}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch articles');
      return res.json();
    }
  });

  return (
    <>
      <div className="space-y-6 text-start">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-brand-800">{t('articles')}</h1>
            <p className="text-sm text-gray-500">Manage trilingual editorial content, drafts, and publications.</p>
          </div>
          <Link
            to={`/${lang}/hub-admin/articles/new`}
            className="inline-flex items-center gap-2 bg-brand-800 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-brand-700 transition-colors shadow-sm"
          >
            <Plus size={16} /> {t('createArticle')}
          </Link>
        </div>

        {/* Toolbar */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row gap-4 justify-between items-center shadow-sm text-start">
          <div className="relative w-full sm:w-96">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              className="w-full ps-10 pe-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-brand-800 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="border border-gray-300 rounded-md text-sm py-2 px-3 focus:ring-2 focus:ring-brand-800 outline-none bg-white">
              <option>{t('allStatuses')}</option>
              <option>{t('published')}</option>
              <option>{t('draft')}</option>
            </select>
          </div>
        </div>

        {/* Adaptive Mobile Cards (Visible < 768px) */}
        <div className="block md:hidden space-y-3.5 min-w-0">
          {isLoading ? (
            <div className="bg-white border border-neutral-200 rounded-xl p-8 text-center text-neutral-400 italic font-bold">
              Synchronizing article ledger...
            </div>
          ) : articles.length === 0 ? (
            <div className="bg-white border border-neutral-200 rounded-xl p-8 text-center text-neutral-400 italic font-bold">
              No active dispatches found in registry.
            </div>
          ) : (
            articles.map((article) => {
              const title = article.translations?.[0]?.title || 'Untitled Draft';
              return (
                <div key={article.id} className="bg-white border border-neutral-200 rounded-xl p-4 shadow-xs space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-ink-900 text-sm leading-snug line-clamp-2">{title}</h3>
                      <div className="text-[11px] text-neutral-400 font-mono mt-0.5">UID: {article.id.substring(0, 8)}</div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shrink-0 ${
                      article.status === 'PUBLISHED' 
                        ? 'bg-green-50 text-green-700 border border-green-100' 
                        : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${article.status === 'PUBLISHED' ? 'bg-green-600' : 'bg-amber-600'}`} />
                      {article.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600">
                    <span className="inline-flex items-center px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded text-[10px] font-black uppercase tracking-wider">
                      {article.category?.name || 'Uncategorized'}
                    </span>
                    <span className="text-neutral-400">•</span>
                    <span>{article.author?.name || 'Unknown Author'}</span>
                    <span className="text-neutral-400">•</span>
                    <span className="text-neutral-400">{new Date(article.updatedAt).toLocaleDateString()}</span>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-end gap-2">
                    {user?.role === 'ADMIN' && article.status === 'PENDING' && (
                      <button 
                        onClick={() => approveMutation.mutate(article.id)} 
                        title="Approve & Publish Article"
                        className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                      >
                        <CheckCircle2 size={14} /> {t('approve')}
                      </button>
                    )}
                    <Link 
                      to={`/${lang}/hub-admin/articles/${article.id}`} 
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-neutral-600 hover:text-brand-800 bg-neutral-50 border border-neutral-200 rounded-lg hover:shadow-sm transition-all" 
                      title="Edit Article"
                      aria-label="Edit Article"
                    >
                      <Edit size={16} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(article.id, title)} 
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-neutral-600 hover:text-brand-800 bg-neutral-50 border border-neutral-200 rounded-lg hover:shadow-sm transition-all cursor-pointer" 
                      title="Delete Article"
                      aria-label="Delete Article"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Data Table (Visible >= 768px) */}
        <div className="hidden md:block bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden text-start min-w-0">
          <div className="overflow-x-auto min-w-0 w-full">
            <table className="w-full text-sm text-start border-collapse">
              <thead className="bg-neutral-50/50 text-xs font-black uppercase tracking-[0.2em] text-neutral-500 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-4 text-start">{t('headlineDispatch')}</th>
                  <th className="px-6 py-4 text-start">{t('bilateralCategory')}</th>
                  <th className="px-6 py-4 text-start">{t('sovereignAuthor')}</th>
                  <th className="px-6 py-4 text-start">{t('approvalStatus')}</th>
                  <th className="px-6 py-4 text-start">{t('lastSynchronized')}</th>
                  <th className="px-6 py-4 text-end">{t('operationalActions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-neutral-400 italic font-bold">
                      Synchronizing article ledger...
                    </td>
                  </tr>
                ) : articles.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-neutral-400 italic font-bold">
                      No active dispatches found in registry.
                    </td>
                  </tr>
                ) : (
                  articles.map((article) => {
                    const title = article.translations?.[0]?.title || 'Untitled Draft';
                    return (
                      <tr key={article.id} className="hover:bg-neutral-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex flex-col text-start">
                            <span className="font-bold text-ink-900 line-clamp-1">{title}</span>
                            <span className="text-xs text-neutral-400 font-medium mt-0.5">UID: {article.id.substring(0, 8)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-start">
                          <span className="inline-flex items-center px-2.5 py-1 bg-neutral-100 text-neutral-600 rounded text-xs font-black uppercase tracking-widest">{article.category?.name || 'Uncategorized'}</span>
                        </td>
                        <td className="px-6 py-4 text-neutral-600 font-medium text-start">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-black text-neutral-400">
                              {article.author?.name?.[0] || '?'}
                            </div>
                            <span className="truncate">{article.author?.name || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-start whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                            article.status === 'PUBLISHED' 
                              ? 'bg-green-50 text-green-700 border border-green-100' 
                              : 'bg-amber-50 text-amber-700 border border-amber-100'
                          }`}>
                            <div className={`w-1 h-1 rounded-full ${article.status === 'PUBLISHED' ? 'bg-green-600' : 'bg-amber-600'}`} />
                            {article.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-neutral-500 font-medium text-xs font-bold text-start whitespace-nowrap">
                          {new Date(article.updatedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-end whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            {user?.role === 'ADMIN' && article.status === 'PENDING' && (
                              <button 
                                onClick={() => approveMutation.mutate(article.id)} 
                                title="Approve & Publish Article"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer min-h-[36px]"
                              >
                                <CheckCircle2 size={14} /> {t('approve')}
                              </button>
                            )}
                            <Link to={`/${lang}/hub-admin/articles/${article.id}`} className="p-2 text-neutral-500 hover:text-brand-800 bg-white border border-neutral-200 rounded-lg hover:shadow-sm transition-all min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer" title="Edit Article" aria-label="Edit Article">
                              <Edit size={14} />
                            </Link>
                            <button onClick={() => handleDelete(article.id, title)} className="p-2 text-neutral-500 hover:text-brand-800 bg-white border border-neutral-200 rounded-lg hover:shadow-sm transition-all min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer" title="Delete Article" aria-label="Delete Article">
                              <Trash2 size={14} />
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
      </div>
    </>
  );
}
