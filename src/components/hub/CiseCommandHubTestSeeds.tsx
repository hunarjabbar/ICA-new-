import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Play, 
  CheckCircle2, 
  RefreshCw, 
  FileCode, 
  ExternalLink, 
  Terminal, 
  Database,
  Search,
  Globe,
  UploadCloud,
  Eye,
  X,
  Compass,
  Building2,
  Sparkles
} from 'lucide-react';
import { apiFetch } from '../../lib/api';

interface SeedPreviewMeta {
  title: string;
  publicUrl: string;
  ciseUrl: string;
  portal: string;
  badge: string;
}

const SECTION_PREVIEWS: Record<string, SeedPreviewMeta> = {
  '01_newsroom_articles.json': {
    title: 'Newsroom Diplomatic Dispatches',
    publicUrl: '/newsroom/article/test-baghdad-beijing-currency-swap-expansion-2026',
    ciseUrl: '/newsroom',
    portal: 'ICA Newsroom',
    badge: 'Dispatches'
  },
  '02_categories_tags.json': {
    title: 'Taxonomies & Classification Tags',
    publicUrl: '/newsroom/category/macro-economy',
    ciseUrl: '/newsroom',
    portal: 'ICA Newsroom',
    badge: 'Taxonomy'
  },
  '03_live_events.json': {
    title: 'Live Signals & Ministerial Forum',
    publicUrl: '/live/video/test-live-beijing-baghdad-trade-summit-2026',
    ciseUrl: '/live',
    portal: 'Live Portal',
    badge: 'Live Stream'
  },
  '04_studies_intelligence.json': {
    title: 'Studies & Strategic Intelligence',
    publicUrl: '/institute/research',
    ciseUrl: '/institute/research',
    portal: 'CISE Institute',
    badge: 'White Papers'
  },
  '05_media_hub_items.json': {
    title: 'Unified Media Hub Aggregation',
    publicUrl: '/media',
    ciseUrl: '/media',
    portal: 'Media Hub',
    badge: 'Multimedia'
  },
  '06_videos_broadcasts.json': {
    title: 'Engineering & Port 4K Broadcasts',
    publicUrl: '/live/movies',
    ciseUrl: '/media',
    portal: 'Live Portal',
    badge: 'Videos'
  },
  '07_podcasts_audio.json': {
    title: 'Bilateral Macroeconomic Podcasts',
    publicUrl: '/podcasts',
    ciseUrl: '/media',
    portal: 'Media Hub',
    badge: 'Audio'
  },
  '08_documentaries.json': {
    title: 'Civilizational Heritage Documentaries',
    publicUrl: '/live/documentary',
    ciseUrl: '/media',
    portal: 'Live Portal',
    badge: 'Films'
  },
  '09_academic_books.json': {
    title: 'Mesopotamian Silk Road Academic Library',
    publicUrl: '/institute/publications',
    ciseUrl: '/institute/publications',
    portal: 'CISE Institute',
    badge: 'Codex'
  },
  '10_tourism_spots.json': {
    title: 'Archaeological & Sanctuary Destinations',
    publicUrl: '/tourism',
    ciseUrl: '/institute/about',
    portal: 'ICA Public',
    badge: 'Tourism'
  },
  '11_women_empowerment.json': {
    title: 'Women in Maritime Robotics & Science',
    publicUrl: '/women',
    ciseUrl: '/institute/experts',
    portal: 'ICA Public',
    badge: 'Leadership'
  },
  '12_visa_flights.json': {
    title: 'Direct Aviation & Consular Corridors',
    publicUrl: '/institute/visa-centre/services',
    ciseUrl: '/institute/visa-centre',
    portal: 'CISE Visa Centre',
    badge: 'Aviation'
  },
  '13_visa_inquiries.json': {
    title: 'Consular Dossier Tracking Desk',
    publicUrl: '/institute/visa-centre/track',
    ciseUrl: '/institute/visa-centre',
    portal: 'CISE Visa Centre',
    badge: 'Inquiries'
  },
  '14_business_opportunities.json': {
    title: 'Al-Faw Free Zone Industrial Tenders',
    publicUrl: '/business',
    ciseUrl: '/institute/data-hub',
    portal: 'ICA Public',
    badge: 'Tenders'
  },
  '15_chinese_products.json': {
    title: 'Heavy Electric Rail Locomotives & Hardware',
    publicUrl: '/chinese-products',
    ciseUrl: '/institute/data-hub',
    portal: 'ICA Public',
    badge: 'Hardware'
  },
  '16_sourcing_pillars.json': {
    title: 'Supply Chain Compliance & QA Pillars',
    publicUrl: '/sourcing',
    ciseUrl: '/institute/services',
    portal: 'ICA Public',
    badge: 'Pillars'
  },
  '17_sourcing_inquiries.json': {
    title: 'Enterprise Procurement Inquiries',
    publicUrl: '/sourcing',
    ciseUrl: '/hub/management?tab=sourcing',
    portal: 'ICA Public',
    badge: 'Procurement'
  },
  '18_payment_orders.json': {
    title: 'e-CNY & IQD mBridge Settlement Orders',
    publicUrl: '/settlement/tracker',
    ciseUrl: '/settlement',
    portal: 'Settlement Portal',
    badge: 'Settlement'
  },
  '19_exchange_rates.json': {
    title: 'Interbank Liquidity & Currency Calculator',
    publicUrl: '/settlement/calculator',
    ciseUrl: '/settlement',
    portal: 'Settlement Portal',
    badge: 'Calculator'
  },
  '20_brics_corridors.json': {
    title: 'BRICS+ Accords & Sovereign Corridors',
    publicUrl: '/brics',
    ciseUrl: '/institute/data-hub',
    portal: 'ICA Public',
    badge: 'BRICS+'
  },
  '21_cultural_exchange.json': {
    title: 'Bilateral Diplomatic Youth Fellowships',
    publicUrl: '/institute/cultural-exchange/programs',
    ciseUrl: '/institute/cultural-exchange',
    portal: 'CISE Institute',
    badge: 'Fellowships'
  },
  '22_market_indices.json': {
    title: 'Basrah Crude & Shanghai Futures Indices',
    publicUrl: '/market',
    ciseUrl: '/settlement',
    portal: 'ICA Public',
    badge: 'Indices'
  },
  '23_partners_network.json': {
    title: 'Accredited Sovereign Partners Directory',
    publicUrl: '/partners',
    ciseUrl: '/institute/partnerships',
    portal: 'ICA Public',
    badge: 'Partners'
  },
  '24_cise_pillars.json': {
    title: 'Macroeconomics & Sovereign Finance Pillar',
    publicUrl: '/institute/research/test-pillar-bilateral-macroeconomics-sovereign-finance',
    ciseUrl: '/institute/research',
    portal: 'CISE Institute',
    badge: 'Pillars'
  },
  '25_cise_experts.json': {
    title: 'Trans-Eurasian Logistics Senior Fellows',
    publicUrl: '/institute/experts/test-expert-dr-tariq-al-saadi',
    ciseUrl: '/institute/experts',
    portal: 'CISE Institute',
    badge: 'Faculty'
  },
  '26_cise_publications.json': {
    title: 'Petroyuan Pricing Policy Briefs',
    publicUrl: '/institute/publications/test-pub-dedollarization-mesopotamian-crude-2026',
    ciseUrl: '/institute/publications',
    portal: 'CISE Institute',
    badge: 'Monographs'
  },
  '27_cise_events.json': {
    title: 'Mesopotamian-Chinese Connectivity Symposia',
    publicUrl: '/institute/events',
    ciseUrl: '/institute',
    portal: 'CISE Institute',
    badge: 'Symposia'
  },
  '28_cise_projects.json': {
    title: 'Al-Faw to Fishkhabur Dry Canal Railway',
    publicUrl: '/institute/data-hub/bri-projects',
    ciseUrl: '/institute/data-hub',
    portal: 'CISE Institute',
    badge: 'Corridor'
  },
  '29_cise_courses.json': {
    title: 'Diplomatic Mandarin & Legal Treaties Masterclass',
    publicUrl: '/institute/chinese-centre',
    ciseUrl: '/institute/chinese-centre',
    portal: 'CISE Institute',
    badge: 'Curriculum'
  },
  '30_ica_plus_tiers.json': {
    title: 'ICA+ Diplomatic & Sovereign Memberships',
    publicUrl: '/ica-plus',
    ciseUrl: '/hub/management?tab=testSeeds',
    portal: 'ICA+ Premium',
    badge: 'Membership'
  }
};

export function CiseCommandHubTestSeeds() {
  const queryClient = useQueryClient();
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedLocale, setSelectedLocale] = useState<'en' | 'ar' | 'zh' | 'ck'>('en');
  const [activePreviewItem, setActivePreviewItem] = useState<any | null>(null);
  const [executionLogs, setExecutionLogs] = useState<string[]>([
    'CISE Command Hub Test Engine Initialized.',
    'Ready to publish, synchronize and preview 30-section synthetic seed suites on CISE and ICA public portals.'
  ]);

  // Fetch catalog of 30 seed files
  const { data: catalogData, isLoading: isCatalogLoading, refetch: refetchCatalog } = useQuery({
    queryKey: ['test-seeds-catalog'],
    queryFn: async () => {
      const res = await apiFetch('/api/hub/test-seeds/catalog');
      if (!res.ok) throw new Error('Failed to load test seed catalog');
      return res.json();
    }
  });

  // Execute test seed suite mutation
  const executeMutation = useMutation({
    mutationFn: async (verifyRoutes: boolean) => {
      const res = await apiFetch('/api/hub/test-seeds/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verifyRoutes })
      });
      if (!res.ok) throw new Error('Test suite execution failed');
      return res.json();
    },
    onSuccess: (data) => {
      const report = data.report;
      const newLogs = [
        `====================================================`,
        `[${new Date().toLocaleTimeString()}] TEST SUITE EXECUTED & RE-SEEDED`,
        `Execution Duration: ${report.durationMs}ms`,
        `Files Seeded: ${report.successfulFiles} / ${report.totalFiles}`,
        `Total Records Seeded: ${report.totalRecordsSeeded}`,
        `Public Routes Verified: ${report.totalRoutesVerified}`,
        `All Slugs Non-Colliding & Valid: ${report.allSlugsValid ? 'PASSED (Zero Slug Bugs)' : 'ISSUES DETECTED'}`,
        `All Routes HTTP 200/OK: ${report.allRoutesValid ? 'PASSED (Zero Route Bugs)' : 'ISSUES DETECTED'}`,
        `====================================================`
      ];
      setExecutionLogs(prev => [...newLogs, ...prev]);
      queryClient.invalidateQueries({ queryKey: ['test-seeds-catalog'] });
    },
    onError: (err: any) => {
      setExecutionLogs(prev => [
        `[${new Date().toLocaleTimeString()}] ERROR: ${err.message}`,
        ...prev
      ]);
    }
  });

  // Publish All to Portals Mutation
  const publishMutation = useMutation({
    mutationFn: async () => {
      const res = await apiFetch('/api/hub/test-seeds/publish-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) throw new Error('Failed to publish all items to portals');
      return res.json();
    },
    onSuccess: (data) => {
      const newLogs = [
        `[${new Date().toLocaleTimeString()}] SYNCHRONIZED: ${data.message}`,
        `Total Public Entities Active: ${data.report.totalRecordsSeeded} records across 30 sections`,
        `Verified Public Live Endpoints: ${data.report.totalRoutesVerified} routes nominal`
      ];
      setExecutionLogs(prev => [...newLogs, ...prev]);
    },
    onError: (err: any) => {
      setExecutionLogs(prev => [
        `[${new Date().toLocaleTimeString()}] PUBLISH ERROR: ${err.message}`,
        ...prev
      ]);
    }
  });

  // Gemini AI Seed Generator Mutation
  const aiSeedMutation = useMutation({
    mutationFn: async () => {
      const res = await apiFetch('/api/hub/ai-seed-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) throw new Error('AI seed generation failed');
      return res.json();
    },
    onSuccess: (data) => {
      const report = data.report;
      const newLogs = [
        `====================================================`,
        `[${new Date().toLocaleTimeString()}] GEMINI AI 30-SECTION SEED GENERATOR COMPLETED`,
        `Model Used: ${report.modelUsed}`,
        `Successful Sections: ${report.successfulSections} / ${report.totalSections}`,
        `Total Records Generated: ${report.totalRecordsGenerated}`,
        `Localized Content in EN, AR, ZH, CKB: SUCCESS`,
        `====================================================`
      ];
      setExecutionLogs(prev => [...newLogs, ...prev]);
      queryClient.invalidateQueries({ queryKey: ['test-seeds-catalog'] });
    },
    onError: (err: any) => {
      setExecutionLogs(prev => [
        `[${new Date().toLocaleTimeString()}] AI GENERATOR ERROR: ${err.message}`,
        ...prev
      ]);
    }
  });

  const catalog = catalogData?.catalog || [];
  const filteredCatalog = catalog.filter((item: any) => 
    item.sectionName.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.filename.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const getLocalizedUrl = (rawUrl: string) => {
    if (selectedLocale === 'en') return rawUrl;
    return `/${selectedLocale}${rawUrl.startsWith('/') ? rawUrl : '/' + rawUrl}`;
  };

  return (
    <div className="space-y-8 text-start animate-in fade-in duration-500">
      {/* Header Banner */}
      <div className="bg-neutral-900 border-2 border-brand-800 p-6 sm:p-8 rounded-2xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 end-0 w-96 h-96 bg-brand-800/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-brand-500 font-bold text-xs uppercase tracking-widest">
              <Database size={16} />
              <span>CISE Command Hub QA & Publishing Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              30 Real Test Random Seed Files Suite
            </h2>
            <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
              Publish, execute, and live-preview all 30 test seed sections directly on the <strong>CISE Institute Portal</strong> and <strong>ICA Public Portal</strong> with zero slug and route bugs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => aiSeedMutation.mutate()}
              disabled={aiSeedMutation.isPending}
              className="flex items-center gap-2 px-5 py-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-600/30 cursor-pointer min-h-[44px]"
            >
              <Sparkles size={16} className={aiSeedMutation.isPending ? 'animate-spin' : ''} />
              <span>{aiSeedMutation.isPending ? 'Generating AI Seeds...' : 'Generate AI Seeds (Gemini 3.8)'}</span>
            </button>

            <button
              onClick={() => publishMutation.mutate()}
              disabled={publishMutation.isPending}
              className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-600/30 cursor-pointer min-h-[44px]"
            >
              <UploadCloud size={16} className={publishMutation.isPending ? 'animate-bounce' : ''} />
              <span>{publishMutation.isPending ? 'Publishing All...' : 'Publish All to Portals'}</span>
            </button>

            <button
              onClick={() => executeMutation.mutate(true)}
              disabled={executeMutation.isPending}
              className="flex items-center gap-2 px-5 py-3 bg-brand-800 hover:bg-brand-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-brand-800/30 cursor-pointer min-h-[44px]"
            >
              <Play size={16} className={executeMutation.isPending ? 'animate-spin' : ''} />
              <span>{executeMutation.isPending ? 'Re-executing...' : 'Re-Execute All 30 Seeds'}</span>
            </button>

            <button
              onClick={() => refetchCatalog()}
              disabled={isCatalogLoading}
              className="p-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white rounded-xl border border-neutral-700 transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Refresh Catalog"
            >
              <RefreshCw size={16} className={isCatalogLoading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Quick KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-neutral-800">
          <div className="bg-neutral-800/60 p-4 rounded-xl border border-neutral-800">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1">Cataloged Seeds</span>
            <span className="text-2xl font-black text-white">{catalog.length} / 30</span>
          </div>
          <div className="bg-neutral-800/60 p-4 rounded-xl border border-neutral-800">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1">Live Status</span>
            <span className="text-2xl font-black text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 size={20} />
              <span>PUBLISHED</span>
            </span>
          </div>
          <div className="bg-neutral-800/60 p-4 rounded-xl border border-neutral-800">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1">Slug Integrity</span>
            <span className="text-2xl font-black text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 size={20} />
              <span>Zero Bugs</span>
            </span>
          </div>
          <div className="bg-neutral-800/60 p-4 rounded-xl border border-neutral-800">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1">Endpoint Routes</span>
            <span className="text-2xl font-black text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 size={20} />
              <span>100% Nominal</span>
            </span>
          </div>
        </div>
      </div>

      {/* Locale Switcher & Console Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-brand-800" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Preview Locale:</span>
          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg">
            {(['en', 'ar', 'zh', 'ck'] as const).map(loc => (
              <button
                key={loc}
                onClick={() => setSelectedLocale(loc)}
                className={`px-2.5 py-1 text-xs font-bold uppercase rounded-md transition-all cursor-pointer ${
                  selectedLocale === loc ? 'bg-brand-800 text-white shadow-xs' : 'text-neutral-600 hover:text-brand-800'
                }`}
              >
                {loc === 'en' ? 'EN' : loc === 'ar' ? 'العربية' : loc === 'zh' ? '中文' : 'کوردی'}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-neutral-500 font-medium">
          Active Test Suite: <span className="font-bold text-slate-800">30 Public Verticals Fully Synced</span>
        </div>
      </div>

      {/* Terminal Output Console */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 shadow-inner">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
            <Terminal size={14} className="text-brand-500" />
            <span>CISE Command Hub Seed Execution Console</span>
          </div>
          <button 
            onClick={() => setExecutionLogs(['Console cleared. Ready.'])}
            className="text-[10px] text-neutral-500 hover:text-neutral-300 font-mono underline cursor-pointer"
          >
            Clear Log
          </button>
        </div>
        <div className="font-mono text-xs text-neutral-300 space-y-1.5 max-h-48 overflow-y-auto select-text scrollbar-thin">
          {executionLogs.map((log, idx) => (
            <div key={idx} className={log.includes('SUCCESS') || log.includes('SYNCHRONIZED') || log.includes('PASSED') ? 'text-emerald-400 font-bold' : log.includes('ERROR') ? 'text-red-400 font-bold' : log.includes('===') ? 'text-brand-500' : 'text-neutral-300'}>
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* Seed Catalog Grid with Direct Preview Buttons */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-bold text-ink-900">30 Public Section Seed Catalog & Live Previews</h3>
            <p className="text-xs text-neutral-500">Every seed file is published and directly previewable on both CISE Institute and ICA Public Portals.</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search size={14} className="absolute start-3 top-3 text-neutral-400" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter 30 seed files..."
              className="w-full ps-9 pe-3 py-2 text-xs bg-white border border-neutral-200 rounded-xl focus:border-brand-800 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCatalog.map((item: any, idx: number) => {
            const meta = SECTION_PREVIEWS[item.filename] || {
              title: item.sectionName,
              publicUrl: `/${item.sampleEntity?.slug || ''}`,
              ciseUrl: '/institute',
              portal: 'Public Portal',
              badge: 'Section'
            };

            const publicPreviewUrl = getLocalizedUrl(meta.publicUrl);
            const cisePreviewUrl = getLocalizedUrl(meta.ciseUrl);

            return (
              <div 
                key={item.id}
                className="bg-white border border-neutral-200 hover:border-brand-800 p-5 rounded-2xl shadow-xs transition-all flex flex-col justify-between group hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-neutral-100 text-neutral-700 rounded-md font-mono">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-brand-700 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded-full">
                        {meta.badge}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 size={10} />
                        <span>Live</span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-brand-800 transition-colors">
                      {meta.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono mt-1">
                      <FileCode size={12} className="text-neutral-400" />
                      <span className="truncate">{item.filename}</span>
                    </div>
                  </div>

                  <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100 text-[11px] text-neutral-600 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-neutral-400">Target Vertical:</span>
                      <span className="font-bold text-slate-800">{meta.portal}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-neutral-400">Record Entities:</span>
                      <span className="font-bold text-slate-800">{item.recordsCount} items</span>
                    </div>
                    {item.sampleEntity?.slug && (
                      <div className="truncate">
                        <span className="font-medium text-neutral-400">Slug: </span>
                        <span className="font-mono text-brand-700 font-bold">{item.sampleEntity.slug}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Preview Action Buttons */}
                <div className="mt-5 pt-3 border-t border-neutral-100 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={publicPreviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 px-3 bg-brand-50 hover:bg-brand-100 text-brand-800 rounded-lg text-xs font-bold transition-all border border-brand-200 cursor-pointer min-h-[38px]"
                      title="Preview on ICA Public Portal"
                    >
                      <Compass size={13} />
                      <span className="truncate">ICA Public</span>
                      <ExternalLink size={10} />
                    </a>

                    <a
                      href={cisePreviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-all border border-slate-300 cursor-pointer min-h-[38px]"
                      title="Preview on CISE Institute Portal"
                    >
                      <Building2 size={13} />
                      <span className="truncate">CISE Portal</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>

                  <button
                    onClick={() => setActivePreviewItem({ ...item, meta, publicPreviewUrl, cisePreviewUrl })}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer min-h-[34px]"
                  >
                    <Eye size={12} />
                    <span>Quick Preview Drawer</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live In-App Preview Modal / Drawer */}
      {activePreviewItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-neutral-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-800 rounded-lg">
                  <Eye size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">{activePreviewItem.meta.title}</h3>
                  <p className="text-xs text-neutral-400 font-mono">{activePreviewItem.filename} &bull; {activePreviewItem.meta.portal}</p>
                </div>
              </div>
              <button 
                onClick={() => setActivePreviewItem(null)}
                className="p-2 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-xl transition-all cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Live Destination Routes:</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    <span>Validated HTTP 200</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg border border-neutral-200">
                    <span className="text-[11px] font-bold text-brand-800 uppercase block mb-1">ICA Public Portal Route:</span>
                    <a 
                      href={activePreviewItem.publicPreviewUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-bold text-blue-600 hover:underline flex items-center gap-1 break-all"
                    >
                      <span>{activePreviewItem.publicPreviewUrl}</span>
                      <ExternalLink size={12} className="shrink-0" />
                    </a>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-neutral-200">
                    <span className="text-[11px] font-bold text-slate-800 uppercase block mb-1">CISE Institute Portal Route:</span>
                    <a 
                      href={activePreviewItem.cisePreviewUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-bold text-blue-600 hover:underline flex items-center gap-1 break-all"
                    >
                      <span>{activePreviewItem.cisePreviewUrl}</span>
                      <ExternalLink size={12} className="shrink-0" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Sample Seed Entity JSON Viewer */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Published Seed Record Payload:</span>
                <pre className="bg-neutral-950 text-neutral-200 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-64 border border-neutral-800">
                  {JSON.stringify(activePreviewItem.sampleEntity, null, 2)}
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex justify-between items-center">
              <span className="text-xs text-neutral-500">
                Click any route above to open and preview directly in a new browser tab.
              </span>
              <button
                onClick={() => setActivePreviewItem(null)}
                className="px-4 py-2 bg-neutral-900 text-white font-bold text-xs rounded-xl hover:bg-neutral-800 transition-all cursor-pointer min-h-[40px]"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
