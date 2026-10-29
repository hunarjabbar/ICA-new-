import React, { Suspense } from 'react';
import { RouteObject, useParams, useLocation, Navigate, Outlet } from 'react-router-dom';
import { lazyWithRetry } from './lazyRetry';
import { useLanguageSetup, resolveLocaleFromEnvironment } from './languageSetup';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { PageSkeleton } from '../components/PageSkeleton';
import { BottomNav } from '../components/mobile/BottomNav';

const SummitLandingPage = lazyWithRetry(() => import('../pages/summit/SummitLandingPage').then(m => ({ default: m.SummitLandingPage })));
const SummitAboutSulaymaniyah = lazyWithRetry(() => import('../pages/summit/SummitAboutSulaymaniyah').then(m => ({ default: m.SummitAboutSulaymaniyah })));
const SummitAgendaPage = lazyWithRetry(() => import('../pages/summit/SummitAgendaPage').then(m => ({ default: m.SummitAgendaPage })));
const SummitSpeakersPage = lazyWithRetry(() => import('../pages/summit/SummitSpeakersPage').then(m => ({ default: m.SummitSpeakersPage })));
const SummitExpoPage = lazyWithRetry(() => import('../pages/summit/SummitExpoPage').then(m => ({ default: m.SummitExpoPage })));
const SummitSectorPavilionPage = lazyWithRetry(() => import('../pages/summit/SummitSectorPavilionPage').then(m => ({ default: m.SummitSectorPavilionPage })));
const SummitFloorPlanPage = lazyWithRetry(() => import('../pages/summit/SummitFloorPlanPage').then(m => ({ default: m.SummitFloorPlanPage })));
const SummitExhibitorRegisterPage = lazyWithRetry(() => import('../pages/summit/SummitExhibitorRegisterPage').then(m => ({ default: m.SummitExhibitorRegisterPage })));
const SummitVisitorRegisterPage = lazyWithRetry(() => import('../pages/summit/SummitVisitorRegisterPage').then(m => ({ default: m.SummitVisitorRegisterPage })));
const SummitVipRegisterPage = lazyWithRetry(() => import('../pages/summit/SummitVipRegisterPage').then(m => ({ default: m.SummitVipRegisterPage })));
const SummitServicesPage = lazyWithRetry(() => import('../pages/summit/SummitServicesPage').then(m => ({ default: m.SummitServicesPage })));
const SummitServiceDetailPage = lazyWithRetry(() => import('../pages/summit/SummitServiceDetailPage').then(m => ({ default: m.SummitServiceDetailPage })));
const SummitServiceRequestPage = lazyWithRetry(() => import('../pages/summit/SummitServiceRequestPage').then(m => ({ default: m.SummitServiceRequestPage })));
const SummitB2BMatchmakingPage = lazyWithRetry(() => import('../pages/summit/SummitB2BMatchmakingPage').then(m => ({ default: m.SummitB2BMatchmakingPage })));
const SummitSponsorsPage = lazyWithRetry(() => import('../pages/summit/SummitSponsorsPage').then(m => ({ default: m.SummitSponsorsPage })));
const SummitMediaPage = lazyWithRetry(() => import('../pages/summit/SummitMediaPage').then(m => ({ default: m.SummitMediaPage })));
const SummitFaqPage = lazyWithRetry(() => import('../pages/summit/SummitFaqPage').then(m => ({ default: m.SummitFaqPage })));
const SummitContactPage = lazyWithRetry(() => import('../pages/summit/SummitContactPage').then(m => ({ default: m.SummitContactPage })));

export function SummitLangWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const { isValidLang, safeLang, isCkbAlias } = useLanguageSetup(lang);

  if (isCkbAlias) {
    const targetPath = location.pathname.replace(/^\/ck(\/|$)/, '/ckb$1');
    return <Navigate to={`${targetPath}${location.search}${location.hash}`} replace />;
  }

  if (lang && !isValidLang) {
    return <Navigate to="/summit" replace />;
  }

  return (
    <ErrorBoundary lang={safeLang}>
      <Suspense fallback={<PageSkeleton />}>
        <div className="pb-[calc(4.75rem+env(safe-area-inset-bottom))] sm:pb-[calc(5.5rem+env(safe-area-inset-bottom))] xl:pb-0">
          <Outlet />
        </div>
      </Suspense>
      <BottomNav lang={safeLang} />
    </ErrorBoundary>
  );
}

export function LegacyInsuranceRedirect() {
  const { lang } = useParams<{ lang: string }>();
  const prefix = lang ? `/${lang}` : '';
  return <Navigate to={`${prefix}/institute/services/insurance`} replace />;
}

const summitChildren: RouteObject[] = [
  { index: true, element: <SummitLandingPage /> },
  { path: "about-sulaymaniyah", element: <SummitAboutSulaymaniyah /> },
  { path: "agenda", element: <SummitAgendaPage /> },
  { path: "speakers", element: <SummitSpeakersPage /> },
  { path: "expo", element: <SummitExpoPage /> },
  { path: "expo/sectors/:slug", element: <SummitSectorPavilionPage /> },
  { path: "floor-plan", element: <SummitFloorPlanPage /> },
  { path: "expo/floor-plan", element: <Navigate to="../floor-plan" replace /> },
  { path: "services/insurance", element: <LegacyInsuranceRedirect /> },
  { path: "register/exhibitor", element: <SummitExhibitorRegisterPage /> },
  { path: "expo/register", element: <Navigate to="../register/exhibitor" replace /> },
  { path: "register/visitor", element: <SummitVisitorRegisterPage /> },
  { path: "expo/visitor-register", element: <Navigate to="../register/visitor" replace /> },
  { path: "register/vip", element: <SummitVipRegisterPage /> },
  { path: "services", element: <SummitServicesPage /> },
  { path: "services/request", element: <SummitServiceRequestPage /> },
  { path: "services/:serviceId", element: <SummitServiceDetailPage /> },
  { path: "b2b", element: <SummitB2BMatchmakingPage /> },
  { path: "b2b-matchmaking", element: <Navigate to="../b2b" replace /> },
  { path: "sponsors", element: <SummitSponsorsPage /> },
  { path: "media", element: <SummitMediaPage /> },
  { path: "faq", element: <SummitFaqPage /> },
  { path: "contact", element: <SummitContactPage /> },
];

export const summitRoutes: RouteObject[] = [
  {
    path: "/summit",
    element: <SummitLangWrapper />,
    children: summitChildren
  },
  {
    path: "/:lang/summit",
    element: <SummitLangWrapper />,
    children: summitChildren
  }
];
