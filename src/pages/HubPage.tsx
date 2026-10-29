import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Locale, translations } from '../locales';
import { 
  ShieldAlert, 
  Users, 
  FileText, 
  Activity, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  CheckCircle, 
  AlertTriangle,
  Radio,
  Search,
  Key
} from 'lucide-react';

interface HubPageProps {
  currentLocale: Locale;
}

export const HubPage: React.FC<HubPageProps> = ({ currentLocale }) => {
  const t = translations[currentLocale];
  const [activeTab, setActiveTab] = useState<'overview' | 'articles' | 'users' | 'audit'>('overview');
  const [currentRole, setCurrentRole] = useState<'SUPER_ADMIN' | 'STRATEGIC_ANALYST' | 'AUTHOR'>('SUPER_ADMIN');
  
  // Article CRUD state
  const [articles, setArticles] = useState<any[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newCategory, setNewCategory] = useState('Monetary & Banking');
  const [isCreating, setIsCreating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Audit Logs state
  const [auditLogs, setAuditLogs] = useState<any[]>([
    { id: 'log-1', action: 'CLEARANCE_VERIFIED', user: 'Director General Chen', ip: '10.240.12.4', time: '10 mins ago', status: 'SUCCESS' },
    { id: 'log-2', action: 'DISPATCH_PUBLISHED', user: 'Analyst Al-Bayati', ip: '10.240.14.88', time: '25 mins ago', status: 'SUCCESS' },
    { id: 'log-3', action: 'SETTLEMENT_ORDER_VALIDATED', user: 'Central Clearing Gateway', ip: '192.168.1.10', time: '1 hour ago', status: 'SUCCESS' },
    { id: 'log-4', action: 'CREDENTIAL_RENEWAL', user: 'Secretary Qadir', ip: '10.240.16.2', time: '2 hours ago', status: 'SUCCESS' },
  ]);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setArticles(data);
      })
      .catch(() => {});
  }, []);

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newArt = {
      id: `art-${Date.now()}`,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      title: newTitle,
      excerpt: newExcerpt || 'Sovereign intelligence analysis.',
      category: { name: newCategory },
      createdAt: new Date().toISOString(),
      translations: [{ lang: currentLocale, title: newTitle, excerpt: newExcerpt }],
    };

    setArticles([newArt, ...articles]);
    setNewTitle('');
    setNewExcerpt('');
    setIsCreating(false);
    setStatusMessage('Analysis dispatch committed to CISE publication ledger.');
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(articles.filter((a) => a.id !== id));
    setStatusMessage('Analysis record removed.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Hub Top Bar with Role Simulator */}
      <section className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-800 tracking-widest uppercase">
            <Radio className="w-4 h-4" />
            <span>CENTRAL COMMAND & SURVEILLANCE DESK</span>
          </div>
          <h1 className="text-2xl font-black text-neutral-900">{t.hub.title}</h1>
          <p className="text-xs text-neutral-500 max-w-xl">{t.hub.subtitle}</p>
        </div>

        {/* RBAC Role Selector */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 space-y-1.5 shrink-0 text-xs shadow-sm">
          <div className="text-[11px] text-neutral-500 font-bold flex items-center gap-1.5 uppercase">
            <Key className="w-3.5 h-3.5 text-brand-800" />
            <span>Active Clearance Identity:</span>
          </div>
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value as any)}
            className="bg-white border border-neutral-200 text-neutral-900 rounded p-1.5 text-xs font-mono font-bold focus:outline-none focus:border-brand-800"
          >
            <option value="SUPER_ADMIN">Level 4: SUPER_ADMIN (Full Sovereignty)</option>
            <option value="STRATEGIC_ANALYST">Level 3: STRATEGIC_ANALYST (Policy Review)</option>
            <option value="AUTHOR">Level 2: AUTHOR (Editorial Drafting)</option>
          </select>
        </div>
      </section>

      {/* Status banner */}
      {statusMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs p-3 rounded-lg flex items-center gap-2 font-bold animate-in slide-in-from-top duration-300">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-2 overflow-x-auto text-xs font-bold">
        {(['overview', 'articles', 'users', 'audit'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded transition-all ${
              activeTab === tab
                ? 'bg-brand-800 text-white shadow-md'
                : 'text-neutral-500 hover:text-brand-800 hover:bg-neutral-50'
            }`}
          >
            {tab === 'overview' && t.hub.overview}
            {tab === 'articles' && t.hub.articlesTab}
            {tab === 'users' && t.hub.usersTab}
            {tab === 'audit' && t.hub.auditLogsTab}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-neutral-200 p-4 rounded-lg space-y-1 shadow-sm">
              <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Total Published Dispatches</div>
              <div className="text-2xl font-mono font-bold text-neutral-900">{articles.length || 42}</div>
              <div className="text-[10px] text-emerald-600 font-bold">Trilingual Synchronized</div>
            </div>
            <div className="bg-white border border-neutral-200 p-4 rounded-lg space-y-1 shadow-sm">
              <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Sovereign Analysts</div>
              <div className="text-2xl font-mono font-bold text-neutral-900">28</div>
              <div className="text-[10px] text-neutral-400 font-bold">Baghdad · Beijing · Erbil</div>
            </div>
            <div className="bg-white border border-neutral-200 p-4 rounded-lg space-y-1 shadow-sm">
              <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Settlement Orders Cleared</div>
              <div className="text-2xl font-mono font-bold text-brand-800">1,409</div>
              <div className="text-[10px] text-emerald-600 font-bold">100% Success Ratio</div>
            </div>
            <div className="bg-white border border-neutral-200 p-4 rounded-lg space-y-1 shadow-sm">
              <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider">System Gateway Security</div>
              <div className="text-2xl font-mono font-bold text-emerald-600">ACTIVE</div>
              <div className="text-[10px] text-neutral-400 font-bold">TLS 1.3 · HMAC SHA-256</div>
            </div>
          </div>
        </section>
      )}

      {/* Tab: Articles CRUD */}
      {activeTab === 'articles' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-800" />
              {t.hub.articlesTab} Management
            </h3>

            <button
              onClick={() => setIsCreating(!isCreating)}
              className="bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs px-3.5 py-2 rounded transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{t.hub.createArticle}</span>
            </button>
          </div>

          {/* Creation Drawer */}
          {isCreating && (
            <form onSubmit={handleCreateArticle} className="bg-white border border-neutral-200 rounded-xl p-6 space-y-4 shadow-lg animate-in fade-in duration-200">
              <h4 className="text-sm font-bold text-neutral-900">Compose New Intelligence Analysis</h4>
              
              <div className="space-y-1">
                <label className="text-xs text-neutral-600 font-bold uppercase">Article Headline *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter strategic headline..."
                  className="w-full bg-neutral-50 border border-neutral-200 rounded p-2 text-xs text-neutral-900 focus:outline-none focus:border-brand-800 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-600 font-bold uppercase">Executive Summary *</label>
                <textarea
                  rows={3}
                  required
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder="Enter core analytical briefing..."
                  className="w-full bg-neutral-50 border border-neutral-200 rounded p-2 text-xs text-neutral-900 focus:outline-none focus:border-brand-800 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-600 font-bold uppercase">Strategic Focus Area</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded p-2 text-xs text-neutral-900 focus:outline-none focus:border-brand-800 transition-colors"
                >
                  <option value="Monetary & Banking">Monetary & Banking</option>
                  <option value="Development Road">Development Road</option>
                  <option value="Energy Transition">Energy Transition</option>
                  <option value="Bilateral Trade">Bilateral Trade</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-brand-800 hover:bg-brand-700 text-white font-bold rounded text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Publish to Network</span>
                </button>
              </div>
            </form>
          )}

          {/* Articles list */}
          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden text-xs shadow-sm">
            <div className="bg-neutral-50 px-4 py-3 border-b border-neutral-200 font-bold text-neutral-500 grid grid-cols-12 gap-2 uppercase tracking-wider">
              <div className="col-span-6">Title / Briefing</div>
              <div className="col-span-3">Category</div>
              <div className="col-span-3 text-end">Actions</div>
            </div>

            <div className="divide-y divide-neutral-100 font-sans">
              {articles.map((art) => {
                const tr = art.translations?.[0] || {};
                const title = tr.title || art.title || art.slug;
                const cat = art.category?.name || 'Analysis';

                return (
                  <div key={art.id || art.slug} className="px-4 py-3 grid grid-cols-12 gap-2 items-center hover:bg-neutral-50 transition-colors">
                    <div className="col-span-6 space-y-0.5">
                      <div className="font-bold text-neutral-900 truncate">{title}</div>
                      <div className="text-[11px] text-neutral-400 font-mono truncate">{art.slug}</div>
                    </div>

                    <div className="col-span-3">
                      <span className="bg-brand-50 text-brand-800 border border-brand-100 px-2 py-0.5 rounded text-[11px] font-bold">
                        {cat}
                      </span>
                    </div>

                    <div className="col-span-3 flex items-center justify-end gap-2">
                      <button
                        onClick={() => toast.info(`Reviewing dossier: ${title}`)}
                        className="p-1 hover:text-brand-800 text-neutral-400 transition-colors"
                        title="Edit Article"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {currentRole === 'SUPER_ADMIN' && (
                        <button
                          onClick={() => handleDeleteArticle(art.id)}
                          className="p-1 hover:text-red-600 text-neutral-400 transition-colors"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Tab: Users / Personnel */}
      {activeTab === 'users' && (
        <section className="bg-white border border-neutral-200 rounded-xl p-6 space-y-4 text-xs shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-800" />
              Accredited Personnel & Intelligence Officers
            </h3>
            <span className="text-xs text-neutral-500 font-bold uppercase tracking-widest">28 Authorized Keys</span>
          </div>

          <div className="divide-y divide-neutral-100 border border-neutral-200 rounded-lg overflow-hidden">
            {[
              { name: 'Dr. Chen Weidong', title: 'Director General of Energy Research', bureau: 'Beijing Bureau', role: 'SUPER_ADMIN' },
              { name: 'Eng. Mohammed Baqir Al-Hakim', title: 'Chief Infrastructure Analyst', bureau: 'Baghdad HQ', role: 'STRATEGIC_ANALYST' },
              { name: 'Prof. Lin Xiaomin', title: 'Lead Maritime Freight Coordinator', bureau: 'Basra Logistics Wing', role: 'STRATEGIC_ANALYST' },
              { name: 'Soran H. Qadir', title: 'Director of Northern Trade Corridors', bureau: 'Erbil Secretariat', role: 'AUTHOR' },
            ].map((u, idx) => (
              <div key={idx} className="p-3 bg-white hover:bg-neutral-50 flex items-center justify-between transition-colors">
                <div>
                  <div className="text-neutral-900 font-bold">{u.name}</div>
                  <div className="text-neutral-500 text-[11px] font-medium">{u.title} · {u.bureau}</div>
                </div>
                <span className="bg-neutral-100 text-neutral-700 font-mono text-[10px] px-2 py-0.5 rounded border border-neutral-200 font-bold uppercase">
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab: Audit Logs */}
      {activeTab === 'audit' && (
        <section className="bg-white border border-neutral-200 rounded-xl p-6 space-y-4 text-xs shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-800" />
              Immutable Security & Audit Ledger
            </h3>
            <span className="text-[11px] text-emerald-600 font-bold uppercase tracking-widest">Real-Time Verification</span>
          </div>

          <div className="space-y-2 font-mono text-[11px]">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 bg-neutral-50 border border-neutral-200 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 hover:border-brand-800/20 transition-colors shadow-xs">
                <div className="space-y-0.5">
                  <div className="text-neutral-900 font-bold flex items-center gap-2">
                    <span className="text-emerald-600">[{log.status}]</span>
                    <span>{log.action}</span>
                  </div>
                  <div className="text-neutral-500 text-[10px] font-medium uppercase tracking-tight">Actor: {log.user} · Host: {log.ip}</div>
                </div>
                <span className="text-neutral-400 shrink-0 font-bold uppercase">{log.time}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
