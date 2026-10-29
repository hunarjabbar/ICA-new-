import React, { Suspense } from 'react';
import { RouteObject, useParams, useLocation, Navigate, Outlet } from 'react-router-dom';
import { lazyWithRetry } from './lazyRetry';
import { useLanguageSetup } from './languageSetup';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { PageSkeleton } from '../components/PageSkeleton';
import { BottomNav } from '../components/mobile/BottomNav';

const SettlementLandingPage = lazyWithRetry(() => import('../pages/settlement/SettlementLandingPage').then(m => ({ default: m.SettlementLandingPage })));
const SettlementAboutPage = lazyWithRetry(() => import('../pages/settlement/SettlementAboutPage').then(m => ({ default: m.SettlementAboutPage })));
const SettlementHowItWorksPage = lazyWithRetry(() => import('../pages/settlement/SettlementHowItWorksPage').then(m => ({ default: m.SettlementHowItWorksPage })));
const SettlementCompliancePage = lazyWithRetry(() => import('../pages/settlement/SettlementCompliancePage').then(m => ({ default: m.SettlementCompliancePage })));
const SettlementFeesPage = lazyWithRetry(() => import('../pages/settlement/SettlementFeesPage').then(m => ({ default: m.SettlementFeesPage })));
const SettlementCalculatorPage = lazyWithRetry(() => import('../pages/settlement/SettlementCalculatorPage').then(m => ({ default: m.SettlementCalculatorPage })));
const SettlementTrackerPublicPage = lazyWithRetry(() => import('../pages/settlement/SettlementTrackerPublicPage').then(m => ({ default: m.SettlementTrackerPublicPage })));
const SettlementTrackerDetailPage = lazyWithRetry(() => import('../pages/settlement/SettlementTrackerDetailPage').then(m => ({ default: m.SettlementTrackerDetailPage })));
const SettlementGatewayPage = lazyWithRetry(() => import('../pages/settlement/SettlementGatewayPage').then(m => ({ default: m.SettlementGatewayPage })));
const SettlementCheckoutPage = lazyWithRetry(() => import('../pages/settlement/SettlementCheckoutPage').then(m => ({ default: m.SettlementCheckoutPage })));
const SettlementInquiryPage = lazyWithRetry(() => import('../pages/settlement/SettlementInquiryPage').then(m => ({ default: m.SettlementInquiryPage })));
const SettlementConfirmationPage = lazyWithRetry(() => import('../pages/settlement/SettlementConfirmationPage').then(m => ({ default: m.SettlementConfirmationPage })));
const SettlementCardLandingPage = lazyWithRetry(() => import('../pages/settlement/SettlementCardLandingPage').then(m => ({ default: m.SettlementCardLandingPage })));
const SettlementCardRegisterPage = lazyWithRetry(() => import('../pages/settlement/SettlementCardRegisterPage').then(m => ({ default: m.SettlementCardRegisterPage })));
const SettlementCardGeneratePage = lazyWithRetry(() => import('../pages/settlement/SettlementCardGeneratePage').then(m => ({ default: m.SettlementCardGeneratePage })));
const SettlementFaqPage = lazyWithRetry(() => import('../pages/settlement/SettlementFaqPage').then(m => ({ default: m.SettlementFaqPage })));
const SettlementContactPage = lazyWithRetry(() => import('../pages/settlement/SettlementContactPage').then(m => ({ default: m.SettlementContactPage })));
const SettlementLegalPage = lazyWithRetry(() => import('../pages/settlement/SettlementLegalPage').then(m => ({ default: m.SettlementLegalPage })));

export function SettlementLangWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const { isValidLang, safeLang, isCkbAlias } = useLanguageSetup(lang);

  if (isCkbAlias) {
    const targetPath = location.pathname.replace(/^\/ck(\/|$)/, '/ckb$1');
    return <Navigate to={`${targetPath}${location.search}${location.hash}`} replace />;
  }

  if (lang && !isValidLang) {
    return <Navigate to="/settlement" replace />;
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

const settlementChildren: RouteObject[] = [
  { index: true, element: <SettlementLandingPage /> },
  { path: "about", element: <SettlementAboutPage /> },
  { path: "how-it-works", element: <SettlementHowItWorksPage /> },
  { path: "compliance", element: <SettlementCompliancePage /> },
  { path: "fees", element: <SettlementFeesPage /> },
  { path: "calculator", element: <SettlementCalculatorPage /> },
  { path: "tracker", element: <SettlementTrackerPublicPage /> },
  { path: "tracker/:referenceId", element: <SettlementTrackerDetailPage /> },
  { path: "gateway", element: <SettlementGatewayPage /> },
  { path: "gateway/checkout", element: <SettlementCheckoutPage /> },
  { path: "inquiry", element: <SettlementInquiryPage /> },
  { path: "inquiry/confirmation", element: <SettlementConfirmationPage /> },
  { path: "card", element: <SettlementCardLandingPage /> },
  { path: "card/register", element: <SettlementCardRegisterPage /> },
  { path: "card/generate", element: <SettlementCardGeneratePage /> },
  { path: "faq", element: <SettlementFaqPage /> },
  { path: "contact", element: <SettlementContactPage /> },
  { path: "legal", element: <SettlementLegalPage /> },
];

export const settlementRoutes: RouteObject[] = [
  {
    path: "/settlement",
    element: <SettlementLangWrapper />,
    children: settlementChildren
  },
  {
    path: "/:lang/settlement",
    element: <SettlementLangWrapper />,
    children: settlementChildren
  },
  {
    path: "/settlement-sourcing",
    element: <SettlementLangWrapper />,
    children: settlementChildren
  },
  {
    path: "/:lang/settlement-sourcing",
    element: <SettlementLangWrapper />,
    children: settlementChildren
  }
];
