import re

# 1. Update SecretariatHubLayout.tsx
layout_content = """import React, { useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Layers,
  Video,
  Mail,
  Inbox,
  Users,
  ShieldCheck,
  Settings,
  Globe,
  Radio,
  ExternalLink,
  Shield,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';
import { Footer } from '../../components/Footer';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { Locale } from '../../types';

export function SecretariatHubLayout() {
  const location = useLocation();
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const isRtl = currentLang === 'ar' || currentLang === 'ckb';
  const t = (key: string) => getPortalTranslation(currentLang, key);
  const { user } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t('secretariat.dashboard'), href: `/${currentLang}/secretariat`, icon: LayoutDashboard, exact: true },
    { label: t('secretariat.content'), href: `/${currentLang}/secretariat/content`, icon: FileText },
    { label: t('secretariat.initiatives'), href: `/${currentLang}/secretariat/initiatives`, icon: Layers },
    { label: t('secretariat.media'), href: `/${currentLang}/secretariat/media`, icon: Video },
    { label: t('secretariat.newsletter'), href: `/${currentLang}/secretariat/newsletter`, icon: Mail },
    { label: t('secretariat.forms'), href: `/${currentLang}/secretariat/forms`, icon: Inbox },
    { label: t('secretariat.users'), href: `/${currentLang}/secretariat/users`, icon: Users },
    { label: t('secretariat.audit'), href: `/${currentLang}/secretariat/audit`, icon: ShieldCheck },
    { label: t('secretariat.settings'), href: `/${currentLang}/secretariat/settings`, icon: Settings },
  ];

  const isCurrent = (href: string, exact = false) => {
    if (exact) return location.pathname === href;
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Top Header */}
      <header className="bg-[#000000] text-white border-b border-neutral-800 px-4 sm:px-6 py-3 flex items-center justify-between select-none sticky top-0 z-40">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile Navigation Drawer Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer flex items-center justify-center min-h-[44px] min-w-[44px] shrink-0"
            aria-label="Open Secretariat Command Navigation"
            title="Open Secretariat Command Navigation"
          >
            <Menu size={22} />
          </button>

          <Link to={`/${currentLang}/secretariat`} className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-800)] flex items-center justify-center font-black text-xs text-white shrink-0 shadow-sm">
              ICA
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-serif font-bold text-xs sm:text-sm tracking-tight text-white truncate">
                  ICA SECRETARIAT COMMAND HUB
                </span>
                <span className="text-[9px] font-mono text-red-400 bg-red-950/60 border border-red-800/50 px-1.5 py-0.5 rounded shrink-0 hidden sm:inline-block">
                  CISE Command Hub Section
                </span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400 block truncate -mt-0.5">
                Plenipotentiary Administration Console
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 text-xs shrink-0">
          <Link
            to={`/${currentLang}/hub/management`}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-red-600 text-neutral-300 hover:text-white transition-colors cursor-pointer min-h-[44px]"
            title="Return to CISE Command Hub Main Management Surface"
          >
            <Shield size={14} className="text-[var(--color-brand-800)] shrink-0" />
            <span className="hidden sm:inline font-bold">CISE Command Hub</span>
          </Link>

          <Link
            to={`/${currentLang}`}
            className="hidden md:flex items-center gap-1 text-neutral-300 hover:text-white transition-colors px-2 py-2 min-h-[44px]"
          >
            <span>{t('secretariat.openPublic')}</span>
            <ExternalLink size={13} />
          </Link>

          <div className="hidden sm:block">
            <LanguageSwitcher lang={currentLang as Locale} />
          </div>

          <div className="flex items-center gap-2 ps-2 sm:ps-3 border-s border-neutral-800">
            <div className="w-7 h-7 rounded-full bg-[var(--color-brand-800)] text-white flex items-center justify-center font-bold text-xs shrink-0">
              {user?.name?.[0] || 'A'}
            </div>
            <span className="font-bold text-white text-xs hidden lg:inline max-w-[120px] truncate">
              {user?.name || 'Administrator'}
            </span>
          </div>
        </div>
      </header>

      {/* Breadcrumb strip */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 sm:px-6 py-2 text-xs flex items-center gap-2 text-neutral-500 overflow-x-auto">
        <Link to={`/${currentLang}/hub/management`} className="hover:text-red-600 transition-colors font-medium shrink-0">
          CISE Command Hub
        </Link>
        <ChevronRight size={12} className="shrink-0 rtl:rotate-180 text-neutral-400" />
        <span className="font-bold text-neutral-900 shrink-0">
          ICA Secretariat Section
        </span>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between p-4 z-10 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-[var(--color-brand-800)] text-white flex items-center justify-center font-black text-xs">
                    ICA
                  </div>
                  <span className="font-bold text-xs text-neutral-900 uppercase tracking-wider">
                    Secretariat Navigation
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                  aria-label="Close Navigation"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#4B5563] px-3 mb-1 block">
                  Governance & CRUD
                </span>
                {navItems.map(item => {
                  const Icon = item.icon;
                  const active = isCurrent(item.href, item.exact);
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
                        active
                          ? 'bg-[var(--color-brand-800)] text-white shadow-sm'
                          : 'text-[#000000] hover:bg-[#F9FAFB] hover:text-[var(--color-brand-800)]'
                      }`}
                    >
                      <Icon size={18} className="shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E7EB] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-medium">Locale:</span>
                <LanguageSwitcher lang={currentLang as Locale} />
              </div>
              <Link
                to={`/${currentLang}/hub/management`}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-neutral-900 text-white font-bold text-xs min-h-[44px] cursor-pointer"
              >
                <Shield size={14} className="text-red-500" />
                <span>CISE Command Hub</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Body with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Secretariat Desktop Sidebar */}
        <aside className="w-64 bg-[#FFFFFF] border-e border-[#E5E7EB] shrink-0 p-4 space-y-6 hidden md:flex md:flex-col justify-between overflow-y-auto">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#4B5563] px-3 mb-2 block">
              Governance & CRUD
            </span>
            {navItems.map(item => {
              const Icon = item.icon;
              const active = isCurrent(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[40px] ${
                    active
                      ? 'bg-[var(--color-brand-800)] text-white shadow-sm'
                      : 'text-[#000000] hover:bg-[#F9FAFB] hover:text-[var(--color-brand-800)]'
                  }`}
                >
                  <Icon size={16} className="shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-2 text-xs">
            <div className="font-bold text-[#000000]">Security Scope</div>
            <div className="text-[11px] font-mono text-[var(--color-brand-800)] font-bold">ALL-SCOPES AUTHORIZED</div>
            <p className="text-[10px] text-[#4B5563]">
              Synchronized with CISE Command Hub RBAC ledger.
            </p>
          </div>
        </aside>

        {/* Content Outlet Area */}
        <main className="flex-1 overflow-y-auto flex flex-col justify-between min-w-0">
          <div className="p-4 sm:p-6 lg:p-10 w-full max-w-7xl mx-auto">
            <Outlet />
          </div>
          <Footer currentLocale={currentLang as any} variant="admin" />
        </main>
      </div>
    </div>
  );
}

export default SecretariatHubLayout;
"""

with open('src/pages/secretariat/SecretariatHubLayout.tsx', 'w') as f:
    f.write(layout_content)
print("Updated SecretariatHubLayout.tsx")

