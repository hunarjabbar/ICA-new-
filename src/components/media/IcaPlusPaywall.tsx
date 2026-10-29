import React from 'react';
import { Lock, Sparkles, Check, ArrowRight, ShieldCheck, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Locale } from '../../types';

interface IcaPlusPaywallProps {
  lang?: Locale | string;
  title?: string;
  description?: string;
  onUnlock?: () => void;
  className?: string;
}

export function IcaPlusPaywall({
  lang = 'en',
  title = 'ICA+ Sovereign Intelligence Gate',
  description = 'This report, documentary, or raw telemetry stream is reserved exclusively for accredited ICA+ Diplomatic & Sovereign Executive members.',
  onUnlock,
  className = ''
}: IcaPlusPaywallProps) {
  const isRtl = lang === 'ar' || lang === 'ckb';

  return (
    <div className={`relative rounded-3xl overflow-hidden bg-[#0a0a0a] border border-neutral-800 text-white p-6 sm:p-10 shadow-2xl ${className}`}>
      {/* Ambient background glow */}
      <div className="absolute top-0 inset-inline-end-0 w-80 h-80 bg-[var(--color-brand-800)]/15 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        {/* Luxury Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-[var(--color-brand-800)]/40 text-xs font-mono font-bold tracking-widest text-[var(--color-brand-800)] uppercase">
          <Crown size={14} className="text-amber-400" />
          <span>ICA+ MEMBERSHIP REQUIRED</span>
        </div>

        {/* Lock Icon & Headline */}
        <div className="space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-700 mx-auto flex items-center justify-center text-[var(--color-brand-800)] shadow-inner">
            <Lock size={28} />
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            {title}
          </h3>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            {description}
          </p>
        </div>

        {/* Membership Tiers Quick Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-start pt-4">
          {/* Diplomatic Scholar */}
          <div className="bg-neutral-900/80 border border-neutral-800 hover:border-[var(--color-brand-800)]/60 rounded-2xl p-5 space-y-3 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-white text-base">Diplomatic Scholar</h4>
                <p className="text-xs text-neutral-400">Researchers & Policy Analysts</p>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                $49/mo
              </span>
            </div>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-[var(--color-brand-800)] shrink-0" />
                <span>Full access to CIPS & clearing models</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-[var(--color-brand-800)] shrink-0" />
                <span>Priority deep-dive white papers</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-[var(--color-brand-800)] shrink-0" />
                <span>Secure diplomatic stream access</span>
              </li>
            </ul>
          </div>

          {/* Sovereign Executive */}
          <div className="bg-neutral-900/80 border-2 border-[var(--color-brand-800)] rounded-2xl p-5 space-y-3 relative shadow-lg">
            <div className="absolute -top-3 inset-inline-end-4 bg-[var(--color-brand-800)] text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              RECOMMENDED
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-white text-base">Sovereign Executive</h4>
                <p className="text-xs text-neutral-400">Institutional & State Leadership</p>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[var(--color-brand-800)]/20 text-[var(--color-brand-800)] border border-[var(--color-brand-800)]/40">
                $199/mo
              </span>
            </div>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-green-400 shrink-0" />
                <span>All Diplomatic Scholar benefits</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-green-400 shrink-0" />
                <span>Direct advisory access to Baghdad & Beijing bureaus</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-green-400 shrink-0" />
                <span>Unrestricted macroeconomic data exports</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-neutral-800/80">
          <Link
            to={`/${lang}/media/ica-plus`}
            className="w-full sm:w-auto min-h-[44px] px-8 py-3 rounded-xl bg-[var(--color-brand-800)] hover:bg-[#b80016] text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
          >
            <Sparkles size={16} />
            <span>Join ICA+ Network</span>
            <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
          </Link>

          <Link
            to={`/${lang}/login`}
            className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ShieldCheck size={16} />
            <span>Sign In to Existing Account</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
