import React, { Suspense } from 'react';
import { RouteObject, useParams, useLocation, Navigate, Outlet } from 'react-router-dom';
import { lazyWithRetry } from './lazyRetry';
import { useLanguageSetup } from './languageSetup';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { InstituteLayout } from '../components/institute/InstituteLayout';
import { PageSkeleton } from '../components/PageSkeleton';

// Institute Core
const InstituteHome = lazyWithRetry(() => import('../pages/institute/InstituteHome').then(m => ({ default: m.InstituteHome })));
const AboutInstitute = lazyWithRetry(() => import('../pages/institute/AboutInstitute').then(m => ({ default: m.AboutInstitute })));
const ResearchPillars = lazyWithRetry(() => import('../pages/institute/ResearchPillars').then(m => ({ default: m.ResearchPillars })));
const ResearchPillarDetail = lazyWithRetry(() => import('../pages/institute/ResearchPillarDetail'));
const CiseServicesDirectory = lazyWithRetry(() => import('../pages/institute/CiseServicesDirectory').then(m => ({ default: m.CiseServicesDirectory })));
const InsuranceFacilitationPage = lazyWithRetry(() => import('../pages/institute/InsuranceFacilitationPage').then(m => ({ default: m.InsuranceFacilitationPage })));
const PublicationsArchive = lazyWithRetry(() => import('../pages/institute/PublicationsArchive').then(m => ({ default: m.PublicationsArchive })));
const PublicationDetail = lazyWithRetry(() => import('../pages/institute/PublicationDetail').then(m => ({ default: m.PublicationDetail })));
const DataHub = lazyWithRetry(() => import('../pages/institute/DataHub').then(m => ({ default: m.DataHub })));
const DataHubTradeExplorer = lazyWithRetry(() => import('../pages/institute/DataHubTradeExplorer'));
const DataHubCorridorTracker = lazyWithRetry(() => import('../pages/institute/DataHubCorridorTracker'));
const DataHubBRIProjects = lazyWithRetry(() => import('../pages/institute/DataHubBRIProjects'));
const DataHubMethodology = lazyWithRetry(() => import('../pages/institute/DataHubMethodology'));
const ExpertsDirectory = lazyWithRetry(() => import('../pages/institute/ExpertsDirectory').then(m => ({ default: m.ExpertsDirectory })));
const ExpertProfile = lazyWithRetry(() => import('../pages/institute/ExpertProfile'));
const Partnerships = lazyWithRetry(() => import('../pages/institute/Partnerships').then(m => ({ default: m.Partnerships })));
const EventsCalendar = lazyWithRetry(() => import('../pages/institute/EventsCalendar').then(m => ({ default: m.EventsCalendar })));

// Visa Centre
const VisaCentreLanding = lazyWithRetry(() => import('../pages/institute/visa-centre/VisaCentreLanding').then(m => ({ default: m.VisaCentreLanding })));
const VisaCentreAbout = lazyWithRetry(() => import('../pages/institute/visa-centre/VisaCentreAbout').then(m => ({ default: m.VisaCentreAbout })));
const VisaCentreServices = lazyWithRetry(() => import('../pages/institute/visa-centre/VisaCentreServices').then(m => ({ default: m.VisaCentreServices })));
const VisaCentreServiceDetail = lazyWithRetry(() => import('../pages/institute/visa-centre/VisaCentreServiceDetail').then(m => ({ default: m.VisaCentreServiceDetail })));
const VisaCentreTypes = lazyWithRetry(() => import('../pages/institute/visa-centre/VisaCentreTypes').then(m => ({ default: m.VisaCentreTypes })));
const VisaCentreCategoryDetail = lazyWithRetry(() => import('../pages/institute/visa-centre/VisaCentreCategoryDetail').then(m => ({ default: m.VisaCentreCategoryDetail })));
const VisaCentreRequirements = lazyWithRetry(() => import('../pages/institute/visa-centre/VisaCentreRequirements').then(m => ({ default: m.VisaCentreRequirements })));
const VisaCentreFees = lazyWithRetry(() => import('../pages/institute/visa-centre/VisaCentreFees').then(m => ({ default: m.VisaCentreFees })));
const VisaCentreProcess = lazyWithRetry(() => import('../pages/institute/visa-centre/VisaCentreProcess').then(m => ({ default: m.VisaCentreProcess })));
const VisaCentreAppointments = lazyWithRetry(() => import('../pages/institute/visa-centre/VisaCentreAppointments').then(m => ({ default: m.VisaCentreAppointments })));
const VisaCentreApply = lazyWithRetry(() => import('../pages/institute/visa-centre/VisaCentreApply').then(m => ({ default: m.VisaCentreApply })));
const VisaCentreTrack = lazyWithRetry(() => import('../pages/institute/visa-centre/VisaCentreTrack').then(m => ({ default: m.VisaCentreTrack })));
const VisaCentreNews = lazyWithRetry(() => import('../pages/institute/visa-centre/VisaCentreNews').then(m => ({ default: m.VisaCentreNews })));
const VisaCentreFaq = lazyWithRetry(() => import('../pages/institute/visa-centre/VisaCentreFaq').then(m => ({ default: m.VisaCentreFaq })));
const VisaCentreContact = lazyWithRetry(() => import('../pages/institute/visa-centre/VisaCentreContact').then(m => ({ default: m.VisaCentreContact })));
const VisaCentreDisclaimer = lazyWithRetry(() => import('../pages/institute/visa-centre/VisaCentreDisclaimer').then(m => ({ default: m.VisaCentreDisclaimer })));

// Chinese Centre
const ChineseCentreLanding = lazyWithRetry(() => import('../pages/institute/chinese-centre/ChineseCentreLanding').then(m => ({ default: m.ChineseCentreLanding })));
const ChineseCentreEnrollment = lazyWithRetry(() => import('../pages/institute/chinese-centre/ChineseCentreEnrollment').then(m => ({ default: m.ChineseCentreEnrollment })));
const ChineseCentreCourses = lazyWithRetry(() => import('../pages/institute/chinese-centre/ChineseCentreCourses').then(m => ({ default: m.ChineseCentreCourses })));
const ChineseCentreTesting = lazyWithRetry(() => import('../pages/institute/chinese-centre/ChineseCentreTesting').then(m => ({ default: m.ChineseCentreTesting })));
const ChineseCentreInstructors = lazyWithRetry(() => import('../pages/institute/chinese-centre/ChineseCentreInstructors').then(m => ({ default: m.ChineseCentreInstructors })));
const ChineseCentreFAQ = lazyWithRetry(() => import('../pages/institute/chinese-centre/ChineseCentreFAQ').then(m => ({ default: m.ChineseCentreFAQ })));
const ChineseCentreContact = lazyWithRetry(() => import('../pages/institute/chinese-centre/ChineseCentreContact').then(m => ({ default: m.ChineseCentreContact })));

// Consultancy
const ConsultancyLanding = lazyWithRetry(() => import('../pages/consultancy/ConsultancyLanding').then(m => ({ default: m.ConsultancyLanding })));
const ConsultancyAbout = lazyWithRetry(() => import('../pages/consultancy/ConsultancyMisc').then(m => ({ default: m.ConsultancyAbout })));
const ConsultancyIraqBound = lazyWithRetry(() => import('../pages/consultancy/ConsultancyIraqBound').then(m => ({ default: m.ConsultancyIraqBound })));
const ConsultancyChinaBound = lazyWithRetry(() => import('../pages/consultancy/ConsultancyChinaBound').then(m => ({ default: m.ConsultancyChinaBound })));
const ConsultancyBilateral = lazyWithRetry(() => import('../pages/consultancy/ConsultancyBilateral').then(m => ({ default: m.ConsultancyBilateral })));
const ConsultancyInquiry = lazyWithRetry(() => import('../pages/consultancy/ConsultancyInquiry').then(m => ({ default: m.ConsultancyInquiry })));
const ConsultancyFAQ = lazyWithRetry(() => import('../pages/consultancy/ConsultancyMisc').then(m => ({ default: m.ConsultancyFAQ })));
const ConsultancyContact = lazyWithRetry(() => import('../pages/consultancy/ConsultancyMisc').then(m => ({ default: m.ConsultancyContact })));
const ConsultancyLegal = lazyWithRetry(() => import('../pages/consultancy/ConsultancyMisc').then(m => ({ default: m.ConsultancyLegal })));

// Cultural Exchange
const CulturalExchangeLanding = lazyWithRetry(() => import('../pages/institute/cultural-exchange/CulturalExchangeLanding').then(m => ({ default: m.CulturalExchangeLanding })));
const CulturalExchangePrograms = lazyWithRetry(() => import('../pages/institute/cultural-exchange/CulturalExchangePrograms').then(m => ({ default: m.CulturalExchangePrograms })));
const CulturalExchangeProgramDetail = lazyWithRetry(() => import('../pages/institute/cultural-exchange/CulturalExchangeProgramDetail').then(m => ({ default: m.CulturalExchangeProgramDetail })));
const CulturalExchangePartners = lazyWithRetry(() => import('../pages/institute/cultural-exchange/CulturalExchangePartners').then(m => ({ default: m.CulturalExchangePartners })));
const CulturalExchangeApply = lazyWithRetry(() => import('../pages/institute/cultural-exchange/CulturalExchangeApply').then(m => ({ default: m.CulturalExchangeApply })));
const CulturalExchangeFAQ = lazyWithRetry(() => import('../pages/institute/cultural-exchange/CulturalExchangeFAQ').then(m => ({ default: m.CulturalExchangeFAQ })));
const CulturalExchangeContact = lazyWithRetry(() => import('../pages/institute/cultural-exchange/CulturalExchangeContact').then(m => ({ default: m.CulturalExchangeContact })));

export function InstituteLangWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const { isValidLang, safeLang, isCkbAlias } = useLanguageSetup(lang);

  if (isCkbAlias) {
    const targetPath = location.pathname.replace(/^\/ck(\/|$)/, '/ckb$1');
    return <Navigate to={`${targetPath}${location.search}${location.hash}`} replace />;
  }

  if (lang && !isValidLang) {
    return <Navigate to="/institute" replace />;
  }

  return (
    <ErrorBoundary lang={safeLang}>
      <InstituteLayout lang={safeLang}>
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </InstituteLayout>
    </ErrorBoundary>
  );
}

export function InstituteServiceSummitRedirect() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const sub = location.pathname.replace(/^.*(\/services\/summit|\/institute\/summit)/, '');
  const prefix = lang ? `/${lang}` : '';
  return <Navigate to={`${prefix}/summit${sub}${location.search}${location.hash}`} replace />;
}

export function InstituteServiceSettlementRedirect() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const sub = location.pathname.replace(/^.*(\/services\/settlement|\/institute\/settlement)/, '');
  const prefix = lang ? `/${lang}` : '';
  return <Navigate to={`${prefix}/settlement${sub}${location.search}${location.hash}`} replace />;
}

const instituteChildren: RouteObject[] = [
  { index: true, element: <InstituteHome /> },
  { path: "services", element: <CiseServicesDirectory /> },
  { path: "initiatives", element: <CiseServicesDirectory /> },
  { path: "about", element: <AboutInstitute /> },
  { path: "research", element: <ResearchPillars /> },
  { path: "research/:pillar", element: <ResearchPillarDetail /> },
  { path: "insurance-facilitation", element: <InsuranceFacilitationPage /> },
  { path: "services/insurance", element: <InsuranceFacilitationPage /> },
  { path: "insurance", element: <InsuranceFacilitationPage /> },
  { path: "services/summit", element: <InstituteServiceSummitRedirect /> },
  { path: "services/summit/*", element: <InstituteServiceSummitRedirect /> },
  { path: "summit", element: <InstituteServiceSummitRedirect /> },
  { path: "summit/*", element: <InstituteServiceSummitRedirect /> },
  { path: "services/settlement", element: <InstituteServiceSettlementRedirect /> },
  { path: "services/settlement/*", element: <InstituteServiceSettlementRedirect /> },
  { path: "settlement", element: <InstituteServiceSettlementRedirect /> },
  { path: "settlement/*", element: <InstituteServiceSettlementRedirect /> },
  { path: "publications", element: <PublicationsArchive /> },
  { path: "publications/:slug", element: <PublicationDetail /> },
  { path: "data-hub", element: <DataHub /> },
  { path: "data-hub/trade", element: <DataHubTradeExplorer /> },
  { path: "data-hub/trade-explorer", element: <DataHubTradeExplorer /> },
  { path: "data-hub/corridor", element: <DataHubCorridorTracker /> },
  { path: "data-hub/corridor-tracker", element: <DataHubCorridorTracker /> },
  { path: "data-hub/projects", element: <DataHubBRIProjects /> },
  { path: "data-hub/bri-projects", element: <DataHubBRIProjects /> },
  { path: "data-hub/methodology", element: <DataHubMethodology /> },
  { path: "experts", element: <ExpertsDirectory /> },
  { path: "experts/:id", element: <ExpertProfile /> },
  { path: "partnerships", element: <Partnerships /> },
  { path: "events", element: <EventsCalendar /> },
  // Bilateral Visa Centre
  { path: "visa-centre", element: <VisaCentreLanding /> },
  { path: "visa-center", element: <VisaCentreLanding /> },
  { path: "services/visa-centre", element: <VisaCentreLanding /> },
  { path: "visa-centre/about", element: <VisaCentreAbout /> },
  { path: "visa-centre/services", element: <VisaCentreServices /> },
  { path: "visa-centre/services/:slug", element: <VisaCentreServiceDetail /> },
  { path: "visa-centre/visa-types", element: <VisaCentreTypes /> },
  { path: "visa-centre/visa-types/:direction/:category", element: <VisaCentreCategoryDetail /> },
  { path: "visa-centre/requirements", element: <VisaCentreRequirements /> },
  { path: "visa-centre/fees", element: <VisaCentreFees /> },
  { path: "visa-centre/process", element: <VisaCentreProcess /> },
  { path: "visa-centre/appointments", element: <VisaCentreAppointments /> },
  { path: "visa-centre/apply", element: <VisaCentreApply /> },
  { path: "visa-centre/track", element: <VisaCentreTrack /> },
  { path: "visa-centre/news", element: <VisaCentreNews /> },
  { path: "visa-centre/faq", element: <VisaCentreFaq /> },
  { path: "visa-centre/contact", element: <VisaCentreContact /> },
  { path: "visa-centre/disclaimer", element: <VisaCentreDisclaimer /> },
  { path: "visa-center/*", element: <VisaCentreLanding /> },
  // Chinese Centre & Chinese Center (Full Dual Spelling & Subroute Parity)
  { path: "chinese-centre", element: <ChineseCentreLanding /> },
  { path: "chinese-center", element: <ChineseCentreLanding /> },
  { path: "services/chinese-centre", element: <ChineseCentreLanding /> },
  { path: "services/chinese-center", element: <ChineseCentreLanding /> },

  { path: "chinese-centre/enroll", element: <ChineseCentreEnrollment /> },
  { path: "chinese-center/enroll", element: <ChineseCentreEnrollment /> },

  { path: "chinese-centre/courses", element: <ChineseCentreCourses /> },
  { path: "chinese-center/courses", element: <ChineseCentreCourses /> },

  { path: "chinese-centre/testing", element: <ChineseCentreTesting /> },
  { path: "chinese-center/testing", element: <ChineseCentreTesting /> },
  { path: "chinese-centre/testing/register", element: <ChineseCentreTesting /> },
  { path: "chinese-center/testing/register", element: <ChineseCentreTesting /> },
  { path: "chinese-centre/certificates", element: <ChineseCentreTesting /> },
  { path: "chinese-center/certificates", element: <ChineseCentreTesting /> },

  { path: "chinese-centre/instructors", element: <ChineseCentreInstructors /> },
  { path: "chinese-center/instructors", element: <ChineseCentreInstructors /> },
  { path: "chinese-centre/instructors/:id", element: <ChineseCentreInstructors /> },
  { path: "chinese-center/instructors/:id", element: <ChineseCentreInstructors /> },

  { path: "chinese-centre/faq", element: <ChineseCentreFAQ /> },
  { path: "chinese-center/faq", element: <ChineseCentreFAQ /> },

  { path: "chinese-centre/contact", element: <ChineseCentreContact /> },
  { path: "chinese-center/contact", element: <ChineseCentreContact /> },

  { path: "chinese-centre/*", element: <ChineseCentreLanding /> },
  { path: "chinese-center/*", element: <ChineseCentreLanding /> },
  // Strategic Consultancy
  { path: "consultancy", element: <ConsultancyLanding /> },
  { path: "services/consultancy", element: <ConsultancyLanding /> },
  { path: "consultancy/about", element: <ConsultancyAbout /> },
  { path: "consultancy/iraq-bound", element: <ConsultancyIraqBound /> },
  { path: "consultancy/china-bound", element: <ConsultancyChinaBound /> },
  { path: "consultancy/bilateral", element: <ConsultancyBilateral /> },
  { path: "consultancy/inquiry", element: <ConsultancyInquiry /> },
  { path: "consultancy/faq", element: <ConsultancyFAQ /> },
  { path: "consultancy/contact", element: <ConsultancyContact /> },
  { path: "consultancy/legal", element: <ConsultancyLegal /> },
  // Cultural Exchange
  { path: "cultural-exchange", element: <CulturalExchangeLanding /> },
  { path: "cultural-exchange/programs", element: <CulturalExchangePrograms /> },
  { path: "cultural-exchange/programs/:slug", element: <CulturalExchangeProgramDetail /> },
  { path: "cultural-exchange/partners", element: <CulturalExchangePartners /> },
  { path: "cultural-exchange/apply", element: <CulturalExchangeApply /> },
  { path: "cultural-exchange/faq", element: <CulturalExchangeFAQ /> },
  { path: "cultural-exchange/contact", element: <CulturalExchangeContact /> },
  { path: "cultural-exchange/*", element: <CulturalExchangeLanding /> },
  { path: "services/cultural-exchange", element: <CulturalExchangeLanding /> },
  { path: "services/cultural-exchange/programs", element: <CulturalExchangePrograms /> },
  { path: "services/cultural-exchange/programs/:slug", element: <CulturalExchangeProgramDetail /> },
  { path: "services/cultural-exchange/partners", element: <CulturalExchangePartners /> },
  { path: "services/cultural-exchange/apply", element: <CulturalExchangeApply /> },
  { path: "services/cultural-exchange/faq", element: <CulturalExchangeFAQ /> },
  { path: "services/cultural-exchange/contact", element: <CulturalExchangeContact /> },
  { path: "services/cultural-exchange/*", element: <CulturalExchangeLanding /> },
  { path: "settings", element: <Navigate to="../hub/management/settings" replace /> },
  { path: "profile", element: <Navigate to="../hub/management" replace /> },
];

export const instituteRoutes: RouteObject[] = [
  {
    path: "/institute",
    element: <InstituteLangWrapper />,
    children: instituteChildren
  },
  {
    path: "/:lang/institute",
    element: <InstituteLangWrapper />,
    children: instituteChildren
  }
];
