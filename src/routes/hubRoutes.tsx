import React, { Suspense } from 'react';
import { RouteObject, useParams, useLocation, Navigate, Outlet } from 'react-router-dom';
import { lazyWithRetry } from './lazyRetry';
import { useLanguageSetup, resolveLocaleFromEnvironment } from './languageSetup';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { PageSkeleton } from '../components/PageSkeleton';
import { CiseCommandHubLayout } from '../components/CiseCommandHubLayout';

const CiseCommandHubDashboard = lazyWithRetry(() => import('../pages/CiseCommandHubDashboard').then(m => ({ default: m.CiseCommandHubDashboard })));
const CiseCommandHubArticles = lazyWithRetry(() => import('../pages/CiseCommandHubArticles').then(m => ({ default: m.CiseCommandHubArticles })));
const CiseCommandHubArticleNew = lazyWithRetry(() => import('../pages/CiseCommandHubArticleNew').then(m => ({ default: m.CiseCommandHubArticleNew })));
const CiseCommandHubAuditLogs = lazyWithRetry(() => import('../pages/CiseCommandHubAuditLogs').then(m => ({ default: m.CiseCommandHubAuditLogs })));
const CiseCommandHubChineseProducts = lazyWithRetry(() => import('../pages/CiseCommandHubChineseProducts').then(m => ({ default: m.CiseCommandHubChineseProducts })));
const CiseCommandHubBusiness = lazyWithRetry(() => import('../pages/CiseCommandHubBusiness'));
const CiseCommandHubUsers = lazyWithRetry(() => import('../pages/CiseCommandHubUsers').then(m => ({ default: m.CiseCommandHubUsers })));
const CiseCommandHubMedia = lazyWithRetry(() => import('../pages/CiseCommandHubMedia').then(m => ({ default: m.CiseCommandHubMedia })));
const CiseCommandHubSettings = lazyWithRetry(() => import('../pages/CiseCommandHubSettings').then(m => ({ default: m.CiseCommandHubSettings })));
const CiseCommandHubLanguages = lazyWithRetry(() => import('../components/hub/CiseCommandHubLanguages').then(m => ({ default: m.CiseCommandHubLanguages })));
const CiseCommandHubIcaPlus = lazyWithRetry(() => import('../pages/CiseCommandHubIcaPlus'));
const CiseCommandHubLiveEvents = lazyWithRetry(() => import('../pages/CiseCommandHubLiveEvents'));
const CiseCommandHubPartners = lazyWithRetry(() => import('../pages/CiseCommandHubPartners'));
const CiseCommandHubSourcing = lazyWithRetry(() => import('../pages/CiseCommandHubSourcing'));
const CiseCommandHubFinanceEconomics = lazyWithRetry(() => import('../pages/CiseCommandHubFinanceEconomics').then(m => ({ default: m.CiseCommandHubFinanceEconomics })));
const CiseCommandHubPayments = lazyWithRetry(() => import('../pages/CiseCommandHubPayments').then(m => ({ default: m.CiseCommandHubPayments })));
const CiseCommandHubCulturalExchange = lazyWithRetry(() => import('../pages/CiseCommandHubCulturalExchange'));
const CiseCommandHubInstitute = lazyWithRetry(() => import('../pages/CiseCommandHubInstitute').then(m => ({ default: m.CiseCommandHubInstitute })));
const CiseCommandHubPublicSections = lazyWithRetry(() => import('../pages/CiseCommandHubPublicSections'));
const CiseCommandHubFooter = lazyWithRetry(() => import('../pages/CiseCommandHubFooter').then(m => ({ default: m.CiseCommandHubFooter })));
const CiseCommandHubVisaCentre = lazyWithRetry(() => import('../pages/CiseCommandHubVisaCentre').then(m => ({ default: m.CiseCommandHubVisaCentre })));
const CiseCommandHubSummit = lazyWithRetry(() => import('../pages/CiseCommandHubSummit').then(m => ({ default: m.CiseCommandHubSummit })));
const CiseCommandHubOmniRoute = lazyWithRetry(() => import('../pages/CiseCommandHubOmniRoute').then(m => ({ default: m.CiseCommandHubOmniRoute })));
const CommandHubPage = lazyWithRetry(() => import('../pages/CommandHubPage').then(m => ({ default: m.CommandHubPage })));

function CiseCommandHubLanguagesWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const { safeLang } = useLanguageSetup(lang);
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CiseCommandHubLanguages lang={safeLang} />
    </Suspense>
  );
}

function CiseCommandHubFooterWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const { safeLang } = useLanguageSetup(lang);
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CiseCommandHubFooter lang={safeLang} />
    </Suspense>
  );
}

export function CiseCommandHubLangWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const { isValidLang, safeLang, isCkbAlias } = useLanguageSetup(lang);

  if (isCkbAlias) {
    const targetPath = location.pathname.replace(/^\/ck(\/|$)/, '/ckb$1');
    return <Navigate to={`${targetPath}${location.search}${location.hash}`} replace />;
  }

  if (lang && !isValidLang) {
    return <Navigate to="/hub/management" replace />;
  }

  return (
    <ErrorBoundary lang={safeLang}>
      <CiseCommandHubLayout>
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </CiseCommandHubLayout>
    </ErrorBoundary>
  );
}

const hubManagementChildren: RouteObject[] = [
  { index: true, element: <CiseCommandHubDashboard /> },
  { path: "sections", element: <CiseCommandHubPublicSections /> },
  { path: "articles", element: <CiseCommandHubArticles /> },
  { path: "articles/new", element: <CiseCommandHubArticleNew /> },
  { path: "articles/:id", element: <CiseCommandHubArticleNew /> },
  { path: "cultural-exchange", element: <CiseCommandHubCulturalExchange /> },
  { path: "institute", element: <CiseCommandHubInstitute /> },
  { path: "podcasts", element: <CiseCommandHubIcaPlus /> },
  { path: "icaplus", element: <CiseCommandHubIcaPlus /> },
  { path: "live-events", element: <CiseCommandHubLiveEvents /> },
  { path: "finance-economics", element: <CiseCommandHubFinanceEconomics /> },
  { path: "market", element: <CiseCommandHubFinanceEconomics /> },
  { path: "payments", element: <CiseCommandHubPayments /> },
  { path: "partners", element: <CiseCommandHubPartners /> },
  { path: "business", element: <CiseCommandHubBusiness /> },
  { path: "sourcing", element: <CiseCommandHubSourcing /> },
  { path: "audit-logs", element: <CiseCommandHubAuditLogs /> },
  { path: "chinese-products", element: <CiseCommandHubChineseProducts /> },
  { path: "visa-centre", element: <CiseCommandHubVisaCentre /> },
  { path: "users", element: <CiseCommandHubUsers /> },
  { path: "media", element: <CiseCommandHubMedia /> },
  { path: "languages", element: <CiseCommandHubLanguagesWrapper /> },
  { path: "footer", element: <CiseCommandHubFooterWrapper /> },
  { path: "settings", element: <CiseCommandHubSettings /> },
  { path: "summit", element: <CiseCommandHubSummit /> },
  { path: "omniroute", element: <CiseCommandHubOmniRoute /> }
];

export const hubRoutes: RouteObject[] = [
  { path: "/hub", element: <CommandHubPage /> },
  { path: "/hub/*", element: <CommandHubPage /> },
  { path: "/:lang/hub", element: <CommandHubPage /> },
  { path: "/:lang/hub/*", element: <CommandHubPage /> },
  {
    path: "/hub/management",
    element: <CiseCommandHubLangWrapper />,
    children: hubManagementChildren
  },
  {
    path: "/:lang/hub/management",
    element: <CiseCommandHubLangWrapper />,
    children: hubManagementChildren
  }
];
