import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Locale } from '../../../types';
import { ccTranslations } from './translations';
import { ArrowRight, Mic, Sparkles, Briefcase, MessageSquare, Compass } from 'lucide-react';

interface SupplementaryTracksProps {
  lang: Locale;
}

interface TrackData {
  id: string;
  slug: string;
  name: string; // Latin script
  icon: React.ElementType;
  descKey: 'suppHskkElemDesc' | 'suppHskkInterDesc' | 'suppHskkAdvDesc' | 'suppYctDesc' | 'suppBusinessDesc';
}

const TRACKS: TrackData[] = [
  {
    id: 'hskk-elem',
    slug: 'hskk-elementary',
    name: 'HSKK Elementary',
    icon: Mic,
    descKey: 'suppHskkElemDesc'
  },
  {
    id: 'hskk-inter',
    slug: 'hskk-intermediate',
    name: 'HSKK Intermediate',
    icon: MessageSquare,
    descKey: 'suppHskkInterDesc'
  },
  {
    id: 'hskk-adv',
    slug: 'hskk-advanced',
    name: 'HSKK Advanced',
    icon: Sparkles,
    descKey: 'suppHskkAdvDesc'
  },
  {
    id: 'yct',
    slug: 'yct-1-4',
    name: 'YCT 1–4',
    icon: Compass,
    descKey: 'suppYctDesc'
  },
  {
    id: 'business',
    slug: 'business-chinese',
    name: 'Business Chinese',
    icon: Briefcase,
    descKey: 'suppBusinessDesc'
  }
];

export function SupplementaryTracks({ lang }: SupplementaryTracksProps) {
  const t = ccTranslations[lang] || ccTranslations.en;
  const isRtl = lang === 'ar' || lang === 'ckb';
  const navigate = useNavigate();
  const location = useLocation();

  // Determine base path to preserve current URL dialect (/chinese-centre or /chinese-center)
  const basePath = location.pathname.includes('/chinese-centre')
    ? `/${lang}/institute/chinese-centre`
    : `/${lang}/institute/chinese-center`;

  return (
    <section id="supplementary-tracks" className="py-24 bg-red-50/30 border-b border-slate-100" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-950 uppercase tracking-tighter mb-6">
            {t.suppHeading}
          </h2>
          <p className="text-slate-600 text-lg font-medium leading-relaxed">
            {t.suppSubheading}
          </p>
        </div>

        {/* 5-Card Row / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {TRACKS.map((item) => {
            const Icon = item.icon;
            const description = t[item.descKey];
            const targetUrl = `${basePath}/courses?track=${item.slug}`;

            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => navigate(targetUrl)}
                onKeyDown={(e) => e.key === 'Enter' && navigate(targetUrl)}
                className="bg-white border border-slate-100 p-8 flex flex-col justify-between hover:border-red-200 hover:shadow-xl transition-all duration-300 cursor-pointer group rounded-xl outline-none focus:ring-2 focus:ring-red-600/20"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-red-50 group-hover:bg-red-700 text-red-700 group-hover:text-white flex items-center justify-center mb-6 transition-colors shadow-xs">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-black text-slate-950 group-hover:text-red-700 mb-3 leading-tight uppercase tracking-tight transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed font-medium mb-8">
                    {description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-50">
                  <Link
                    to={targetUrl}
                    onClick={(e) => e.stopPropagation()}
                    className="group/link inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 group-hover:text-red-700 transition-colors"
                  >
                    <span>{t.suppLearnMore}</span>
                    <ArrowRight size={14} className="ms-1.5 rtl:rotate-180 transform group-hover/link:translate-x-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
