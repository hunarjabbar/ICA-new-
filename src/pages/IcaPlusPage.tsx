import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Mic, Video as VideoIcon, Film, Clock, MapPin, PlayCircle, 
  ExternalLink, ArrowLeft, Crown, Sparkles, Check, Lock, ShieldCheck, ChevronRight 
} from 'lucide-react';
import { apiFetch } from '../lib/api';
import { useParams, Link } from 'react-router-dom';
import { PodcastPlayer, PodcastEpisode } from '../components/media/PodcastPlayer';
import { IcaPlusPaywall } from '../components/media/IcaPlusPaywall';
import { useAuthStore } from '../store/useAuthStore';

type Tab = 'podcasts' | 'videos' | 'documentaries' | 'tiers';

interface IcaTier {
  id: string;
  name: Record<string, string>;
  priceMonthly: string;
  priceAnnual: string;
  features: Record<string, string[]>;
  isRecommended: boolean;
}

export function IcaPlusPage() {
  const { lang: language = 'en' } = useParams<{lang: string}>();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<Tab>('podcasts');
  const [items, setItems] = useState<any[]>([]);
  const [tiers, setTiers] = useState<IcaTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMedia, setActiveMedia] = useState<string | null>(null);
  const [activePodcastEpisode, setActivePodcastEpisode] = useState<PodcastEpisode | null>(null);
  const [showPaywallModal, setShowPaywallModal] = useState(false);
  const [selectedGatedItem, setSelectedGatedItem] = useState<any | null>(null);

  // Allow preview access for demo or if user is logged in
  const isSubscriber = Boolean(user && (user.role === 'ADMIN' || user.role === 'EDITOR' || user.role === 'SUBSCRIBER'));

  useEffect(() => {
    fetchItems(activeTab);
    setActiveMedia(null);
  }, [activeTab]);

  useEffect(() => {
    fetchTiers();
  }, []);

  const fetchTiers = async () => {
    try {
      const res = await apiFetch('/api/hub/ica-plus/tiers');
      if (res.ok) {
        const data = await res.json();
        setTiers(data);
      }
    } catch (e) {
      console.warn('Fallback tiers for ICA+ page');
    }
  };

  const fetchItems = async (type: Tab) => {
    if (type === 'tiers') return;
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

  const getLocalized = (item: any, field: 'title' | 'description' | 'synopsis' | 'name') => {
    if (!item) return '';
    if (language === 'ar' && (item[`${field}Ar`] || item[field]?.ar)) return item[`${field}Ar`] || item[field]?.ar;
    if (language === 'zh' && (item[`${field}Zh`] || item[field]?.zh)) return item[`${field}Zh`] || item[field]?.zh;
    if (language === 'ckb' && (item[`${field}Ckb`] || item[field]?.ckb)) return item[`${field}Ckb`] || item[field]?.ckb;
    return item[`${field}En`] || item[field]?.en || item[field] || '';
  };

  const handleItemClick = (item: any) => {
    if (item.isFeatured && !isSubscriber) {
      setSelectedGatedItem(item);
      setShowPaywallModal(true);
      return;
    }

    if (activeTab === 'podcasts') {
      setActivePodcastEpisode({
        id: item.id,
        title: getLocalized(item, 'title'),
        host: 'Dr. Tariq Al-Hashemi',
        guest: item.guestName || 'Special Envoy',
        duration: item.duration || '28:10',
        audioUrl: item.audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        coverUrl: item.coverUrl,
        category: item.category || 'Strategic Audio'
      });
    } else {
      setActiveMedia(activeMedia === item.id ? null : item.id);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-900 border-x border-brand-800/10 dark:border-neutral-800 shadow-xs p-4 sm:p-6 md:p-8 text-start min-h-screen">
      
      {/* Back to Media Hub */}
      <div className="max-w-7xl mx-auto mb-6">
        <Link
          to={`/${language}/media`}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-brand-800)] hover:text-black dark:text-brand-400 dark:hover:text-white transition-colors group min-h-[44px]"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:translate-x-1" />
          <span>Back to Media Hub</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 bg-[var(--color-brand-800)]/10 text-[var(--color-brand-800)] dark:text-brand-300 px-4 py-1.5 rounded-full mb-4 border border-[var(--color-brand-800)]/20"
        >
          <Crown size={14} className="text-amber-500 fill-amber-500" />
          <span className="font-black text-xs uppercase tracking-[0.3em]">ICA+ SOVEREIGN ARCHIVE</span>
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-neutral-100 mb-3 leading-tight tracking-tight">
          Exclusive Media Hub Intelligence
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          In-depth podcasts, sovereign video reports, and full-length documentaries tracking Sino-Iraqi macroeconomic and infrastructure developments.
        </p>
      </div>

      {/* Spotlight Active Podcast Player */}
      {activePodcastEpisode && (
        <div className="max-w-5xl mx-auto mb-10 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between pb-2 text-xs font-mono font-bold text-[var(--color-brand-800)] uppercase">
            <span>NOW PLAYING • ICA+ SYNDICATE</span>
            <button
              type="button"
              onClick={() => setActivePodcastEpisode(null)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer min-h-[36px] px-2"
            >
              Close Player
            </button>
          </div>
          <PodcastPlayer episode={activePodcastEpisode} />
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10 max-w-4xl mx-auto">
        {[
          { id: 'podcasts', icon: Mic, label: 'Podcasts' },
          { id: 'videos', icon: VideoIcon, label: 'Videos' },
          { id: 'documentaries', icon: Film, label: 'Documentaries' },
          { id: 'tiers', icon: Crown, label: 'Membership Tiers' }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`min-h-[44px] flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[var(--color-brand-800)] text-white shadow-md'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300'
            }`}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* CONTENT: MEDIA TIERS */}
      {activeTab === 'tiers' && (
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              Sovereign Membership Privileges
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
              Choose your accreditation tier to access raw trade telemetry, CIPS settlement models, and the complete multimedia intelligence vault.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tiers.map(tier => (
              <div
                key={tier.id}
                className={`ica-card-interactive rounded-3xl p-8 bg-white dark:bg-neutral-800 border flex flex-col justify-between relative shadow-sm ${
                  tier.isRecommended 
                    ? 'border-2 border-[var(--color-brand-800)] ring-4 ring-[var(--color-brand-800)]/10 shadow-xl' 
                    : 'border-neutral-200 dark:border-neutral-700'
                }`}
              >
                {tier.isRecommended && (
                  <div className="absolute -top-3.5 inset-inline-end-6 bg-[var(--color-brand-800)] text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                    MOST POPULAR ACCREDITATION
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                      {getLocalized(tier, 'name')}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-4xl font-black text-gray-900 dark:text-white tabular-nums">
                        {tier.priceMonthly}
                      </span>
                      <span className="text-xs font-mono text-gray-500">/ month</span>
                      <span className="text-xs font-mono text-emerald-600 ms-auto">
                        {tier.priceAnnual} billed annually
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 pt-4 border-t border-gray-100 dark:border-neutral-700">
                    {(tier.features?.en || []).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs text-gray-700 dark:text-neutral-300">
                        <Check size={16} className="text-[var(--color-brand-800)] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 mt-6 border-t border-gray-100 dark:border-neutral-700">
                  <Link
                    to={`/${language}/login`}
                    className={`min-h-[48px] w-full rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-sm ${
                      tier.isRecommended
                        ? 'bg-[var(--color-brand-800)] hover:bg-[#b80016] text-white shadow-brand-800/20'
                        : 'bg-neutral-900 hover:bg-black text-white'
                    }`}
                  >
                    <span>Apply for {getLocalized(tier, 'name')}</span>
                    <ChevronRight size={16} className="rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTENT: CATALOG GRID */}
      {activeTab !== 'tiers' && (
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-[var(--color-brand-800)] border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="ica-card-interactive bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-[var(--color-brand-800)] transition-all group flex flex-col justify-between shadow-xs hover:shadow-md"
                >
                  <div className="relative aspect-video overflow-hidden bg-neutral-900">
                    <img 
                      src={item.coverUrl} 
                      alt={getLocalized(item, 'title')}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    
                    {item.isFeatured && (
                      <div className="absolute top-3 inset-inline-end-3 bg-[var(--color-brand-800)] text-white text-[10px] px-2.5 py-1 rounded font-black uppercase tracking-widest shadow-sm flex items-center gap-1">
                        <Crown size={12} />
                        <span>ICA+ EXCLUSIVE</span>
                      </div>
                    )}
                    
                    <div className="absolute top-3 inset-inline-start-3 bg-black/75 backdrop-blur-xs text-white text-[10px] px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                      {item.category || 'Diplomatic'}
                    </div>

                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        type="button"
                        onClick={() => handleItemClick(item)}
                        className="bg-[var(--color-brand-800)] text-white p-3.5 rounded-full hover:bg-[#b80016] transition-transform transform hover:scale-110 cursor-pointer shadow-xl min-h-[48px] min-w-[48px] flex items-center justify-center"
                      >
                        {item.isFeatured && !isSubscriber ? <Lock className="h-6 w-6" /> : <PlayCircle className="h-7 w-7" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-black text-gray-900 dark:text-neutral-100 mb-2 line-clamp-2 leading-snug">
                        {getLocalized(item, 'title')}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-xs mb-4 line-clamp-3 leading-relaxed">
                        {getLocalized(item, 'description')}
                      </p>
                      
                      {activeTab === 'documentaries' && getLocalized(item, 'synopsis') && (
                        <p className="text-neutral-500 dark:text-neutral-400 text-[11px] mb-4 line-clamp-2 italic">
                          "{getLocalized(item, 'synopsis')}"
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-neutral-100 dark:border-neutral-700/60 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                      <div className="flex items-center gap-1.5 font-mono tabular-nums">
                        <Clock className="h-3.5 w-3.5 text-[var(--color-brand-800)]" />
                        <span>{item.duration || '00:00'}</span>
                      </div>

                      {item.guestName && (
                        <div className="flex items-center gap-1.5 truncate max-w-[150px]">
                          <Mic className="h-3.5 w-3.5 text-[var(--color-brand-800)]" />
                          <span className="truncate">{item.guestName}</span>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => handleItemClick(item)}
                        className="text-[var(--color-brand-800)] font-bold uppercase tracking-wider text-[11px] hover:underline cursor-pointer flex items-center gap-1"
                      >
                        {item.isFeatured && !isSubscriber ? 'Unlock' : 'Access'}
                        <ChevronRight size={14} className="rtl:rotate-180" />
                      </button>
                    </div>
                  </div>
                  
                  {activeMedia === item.id && activeTab !== 'podcasts' && (
                    <div className="p-4 bg-neutral-900 border-t border-neutral-800">
                      <a 
                        href={item.videoUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="min-h-[44px] flex justify-center items-center gap-2 bg-[var(--color-brand-800)] hover:bg-[#b80016] text-white py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                      >
                        Watch Full Exclusive Report <ExternalLink size={14} />
                      </a>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
          
          {!loading && items.length === 0 && (
            <div className="text-center py-20 text-neutral-400 font-mono text-sm uppercase tracking-widest bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-200 dark:border-neutral-700">
              No exclusive content available in this category yet.
            </div>
          )}
        </div>
      )}

      {/* Paywall Overlay Modal */}
      {showPaywallModal && selectedGatedItem && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="max-w-2xl w-full relative animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setShowPaywallModal(false)}
              className="absolute top-4 inset-inline-end-4 z-20 text-white hover:text-neutral-300 min-h-[44px] min-w-[44px] flex items-center justify-center font-bold cursor-pointer"
            >
              ✕
            </button>
            <IcaPlusPaywall
              lang={language}
              title={`Access Gated: ${getLocalized(selectedGatedItem, 'title')}`}
              description="This sovereign intelligence file contains confidential trade data and bilateral clearing reports restricted to accredited ICA+ members."
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default IcaPlusPage;
