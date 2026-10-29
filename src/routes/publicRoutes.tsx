import React, { Suspense } from 'react';
import { RouteObject, useParams, useLocation, Navigate, Outlet } from 'react-router-dom';
import { lazyWithRetry } from './lazyRetry';
import { useLanguageSetup } from './languageSetup';
import { Layout } from '../components/Layout';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { PageSkeleton } from '../components/PageSkeleton';
import { BottomNav } from '../components/mobile/BottomNav';
import { NewsroomLayout } from '../components/newsroom/NewsroomLayout';
import { LivePortalLayout } from '../components/live/LivePortalLayout';
import { CiseCommandHubLangWrapper } from './hubRoutes';
import { IcaPublicHome } from '../pages/public/IcaPublicHome';

// Public & Institutional Pages
const IcaWorldPage = lazyWithRetry(() => import('../pages/public/IcaWorldPage').then(m => ({ default: m.IcaWorldPage })));
const IcaTrendingPage = lazyWithRetry(() => import('../pages/public/IcaTrendingPage').then(m => ({ default: m.IcaTrendingPage })));
const IcaInitiativesPage = lazyWithRetry(() => import('../pages/public/IcaInitiativesPage').then(m => ({ default: m.IcaInitiativesPage })));
const IcaInitiativeDetailPage = lazyWithRetry(() => import('../pages/public/IcaInitiativeDetailPage').then(m => ({ default: m.IcaInitiativeDetailPage })));
const IcaFeaturedPage = lazyWithRetry(() => import('../pages/public/IcaFeaturedPage').then(m => ({ default: m.IcaFeaturedPage })));
const IcaMediaPage = lazyWithRetry(() => import('../pages/public/IcaMediaPage').then(m => ({ default: m.IcaMediaPage })));
const IcaAboutPage = lazyWithRetry(() => import('../pages/public/IcaAboutPage').then(m => ({ default: m.IcaAboutPage })));
const IcaContactPage = lazyWithRetry(() => import('../pages/public/IcaContactPage').then(m => ({ default: m.IcaContactPage })));
const About = lazyWithRetry(() => import('../pages/About').then(m => ({ default: m.About })));
const JoinUs = lazyWithRetry(() => import('../pages/JoinUs').then(m => ({ default: m.JoinUs })));
const SearchPage = lazyWithRetry(() => import('../pages/SearchPage'));
const PodcastsPage = lazyWithRetry(() => import('../pages/PodcastsPage'));
const IcaPlusPage = lazyWithRetry(() => import('../pages/IcaPlusPage').then(m => ({ default: m.IcaPlusPage })));

// Newsroom Pages
const NewsroomLandingPage = lazyWithRetry(() => import('../pages/newsroom/NewsroomLandingPage').then(m => ({ default: m.NewsroomLandingPage })));
const NewsroomArticleDetailPage = lazyWithRetry(() => import('../pages/newsroom/NewsroomArticleDetailPage').then(m => ({ default: m.NewsroomArticleDetailPage })));
const NewsroomCategoryPage = lazyWithRetry(() => import('../pages/newsroom/NewsroomCategoryPage').then(m => ({ default: m.NewsroomCategoryPage })));
const NewsroomTagPage = lazyWithRetry(() => import('../pages/newsroom/NewsroomTagPage').then(m => ({ default: m.NewsroomTagPage })));
const NewsroomAuthorPage = lazyWithRetry(() => import('../pages/newsroom/NewsroomAuthorPage').then(m => ({ default: m.NewsroomAuthorPage })));
const NewsroomArchivePage = lazyWithRetry(() => import('../pages/newsroom/NewsroomArchivePage').then(m => ({ default: m.NewsroomArchivePage })));
const NewsroomSearchPage = lazyWithRetry(() => import('../pages/newsroom/NewsroomSearchPage').then(m => ({ default: m.NewsroomSearchPage })));
const NewsroomFeedPage = lazyWithRetry(() => import('../pages/newsroom/NewsroomFeedPage').then(m => ({ default: m.NewsroomFeedPage })));
const NewsroomSitemapPage = lazyWithRetry(() => import('../pages/newsroom/NewsroomSitemapPage').then(m => ({ default: m.NewsroomSitemapPage })));

// Newsroom Hub Pages
const NewsroomHubDashboard = lazyWithRetry(() => import('../pages/newsroom/hub/NewsroomHubDashboard').then(m => ({ default: m.NewsroomHubDashboard })));
const NewsroomArticlesCrud = lazyWithRetry(() => import('../pages/newsroom/hub/NewsroomArticlesCrud').then(m => ({ default: m.NewsroomArticlesCrud })));
const NewsroomCategoriesCrud = lazyWithRetry(() => import('../pages/newsroom/hub/NewsroomCategoriesCrud').then(m => ({ default: m.NewsroomCategoriesCrud })));
const NewsroomTagsCrud = lazyWithRetry(() => import('../pages/newsroom/hub/NewsroomTagsCrud').then(m => ({ default: m.NewsroomTagsCrud })));
const NewsroomAuthorsCrud = lazyWithRetry(() => import('../pages/newsroom/hub/NewsroomAuthorsCrud').then(m => ({ default: m.NewsroomAuthorsCrud })));
const NewsroomFeedsCrud = lazyWithRetry(() => import('../pages/newsroom/hub/NewsroomFeedsCrud').then(m => ({ default: m.NewsroomFeedsCrud })));
const NewsroomAnalytics = lazyWithRetry(() => import('../pages/newsroom/hub/NewsroomAnalytics').then(m => ({ default: m.NewsroomAnalytics })));
const NewsroomSettings = lazyWithRetry(() => import('../pages/newsroom/hub/NewsroomSettings').then(m => ({ default: m.NewsroomSettings })));

// Live Portal Pages
const LiveLandingPage = lazyWithRetry(() => import('../pages/live/LiveLandingPage').then(m => ({ default: m.LiveLandingPage })));
const LiveNowPage = lazyWithRetry(() => import('../pages/live/LiveNowPage').then(m => ({ default: m.LiveNowPage })));
const LiveSchedulePage = lazyWithRetry(() => import('../pages/live/LiveSchedulePage').then(m => ({ default: m.LiveSchedulePage })));
const LiveMoviesPage = lazyWithRetry(() => import('../pages/live/LiveMoviesPage').then(m => ({ default: m.LiveMoviesPage })));
const LiveDramaPage = lazyWithRetry(() => import('../pages/live/LiveDramaPage').then(m => ({ default: m.LiveDramaPage })));
const LiveDocumentaryPage = lazyWithRetry(() => import('../pages/live/LiveDocumentaryPage').then(m => ({ default: m.LiveDocumentaryPage })));
const LiveExchangePage = lazyWithRetry(() => import('../pages/live/LiveExchangePage').then(m => ({ default: m.LiveExchangePage })));
const LiveArchivePage = lazyWithRetry(() => import('../pages/live/LiveArchivePage').then(m => ({ default: m.LiveArchivePage })));
const LiveSearchPage = lazyWithRetry(() => import('../pages/live/LiveSearchPage').then(m => ({ default: m.LiveSearchPage })));
const LiveRssFeedPage = lazyWithRetry(() => import('../pages/live/LiveRssFeedPage').then(m => ({ default: m.LiveRssFeedPage })));
const LiveDetailVideoPage = lazyWithRetry(() => import('../pages/live/LiveDetailVideoPage').then(m => ({ default: m.LiveDetailVideoPage })));

// Secretariat Hub Pages
const SecretariatHubLayout = lazyWithRetry(() => import('../pages/secretariat/SecretariatHubLayout').then(m => ({ default: m.SecretariatHubLayout })));
const SecretariatDashboard = lazyWithRetry(() => import('../pages/secretariat/SecretariatDashboard').then(m => ({ default: m.SecretariatDashboard })));
const SecretariatContentCrud = lazyWithRetry(() => import('../pages/secretariat/SecretariatContentCrud').then(m => ({ default: m.SecretariatContentCrud })));
const SecretariatInitiativesCrud = lazyWithRetry(() => import('../pages/secretariat/SecretariatInitiativesCrud').then(m => ({ default: m.SecretariatInitiativesCrud })));
const SecretariatMediaCrud = lazyWithRetry(() => import('../pages/secretariat/SecretariatMediaCrud').then(m => ({ default: m.SecretariatMediaCrud })));
const SecretariatNewsletterCrud = lazyWithRetry(() => import('../pages/secretariat/SecretariatNewsletterCrud').then(m => ({ default: m.SecretariatNewsletterCrud })));
const SecretariatFormsCrud = lazyWithRetry(() => import('../pages/secretariat/SecretariatFormsCrud').then(m => ({ default: m.SecretariatFormsCrud })));
const SecretariatUsersCrud = lazyWithRetry(() => import('../pages/secretariat/SecretariatUsersCrud').then(m => ({ default: m.SecretariatUsersCrud })));
const SecretariatAuditCrud = lazyWithRetry(() => import('../pages/secretariat/SecretariatAuditCrud').then(m => ({ default: m.SecretariatAuditCrud })));
const SecretariatSettings = lazyWithRetry(() => import('../pages/secretariat/SecretariatSettings').then(m => ({ default: m.SecretariatSettings })));

// Hub Shared Widgets for Live Hub
const CiseCommandHubDashboard = lazyWithRetry(() => import('../pages/CiseCommandHubDashboard').then(m => ({ default: m.CiseCommandHubDashboard })));
const CiseCommandHubLiveEvents = lazyWithRetry(() => import('../pages/CiseCommandHubLiveEvents'));
const CiseCommandHubVideos = lazyWithRetry(() => import('../pages/CiseCommandHubVideos'));
const CiseCommandHubSettings = lazyWithRetry(() => import('../pages/CiseCommandHubSettings').then(m => ({ default: m.CiseCommandHubSettings })));

export function LangWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const { isValidLang, safeLang, isCkbAlias } = useLanguageSetup(lang);

  if (isCkbAlias) {
    const targetPath = location.pathname.replace(/^\/ck(\/|$)/, '/ckb$1');
    return <Navigate to={`${targetPath}${location.search}${location.hash}`} replace />;
  }

  if (lang && !isValidLang) {
    return <Navigate to="/" replace />;
  }

  return (
    <ErrorBoundary lang={safeLang}>
      <Layout lang={safeLang}>
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </Layout>
    </ErrorBoundary>
  );
}

export function ImmersiveLangWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const { isValidLang, safeLang, isCkbAlias } = useLanguageSetup(lang);

  if (isCkbAlias) {
    const targetPath = location.pathname.replace(/^\/ck(\/|$)/, '/ckb$1');
    return <Navigate to={`${targetPath}${location.search}${location.hash}`} replace />;
  }

  if (lang && !isValidLang) {
    return <Navigate to="/live" replace />;
  }

  return (
    <ErrorBoundary lang={safeLang}>
      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans transition-colors duration-300 pb-[calc(4.75rem+env(safe-area-inset-bottom))] sm:pb-[calc(5.5rem+env(safe-area-inset-bottom))] xl:pb-0">
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </div>
      <BottomNav lang={safeLang} />
    </ErrorBoundary>
  );
}

export function SecretariatLangWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const { isValidLang, safeLang, isCkbAlias } = useLanguageSetup(lang);

  if (isCkbAlias) {
    const targetPath = location.pathname.replace(/^\/ck(\/|$)/, '/ckb$1');
    return <Navigate to={`${targetPath}${location.search}${location.hash}`} replace />;
  }

  if (lang && !isValidLang) {
    return <Navigate to="/secretariat" replace />;
  }

  return (
    <ErrorBoundary lang={safeLang}>
      <Suspense fallback={<PageSkeleton />}>
        <div className="pb-[calc(4.75rem+env(safe-area-inset-bottom))] sm:pb-[calc(5.5rem+env(safe-area-inset-bottom))] xl:pb-0">
          <Outlet />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

// Reusable child routes
const publicChildren: RouteObject[] = [
  { index: true, element: <IcaPublicHome /> },
  { path: "about", element: <About /> },
  { path: "search", element: <SearchPage /> },
  { path: "join", element: <JoinUs /> },
  { path: "newsroom", element: <NewsroomLandingPage /> },
  { path: "newsroom/archive", element: <NewsroomArchivePage /> },
  { path: "newsroom/search", element: <NewsroomSearchPage /> },
  { path: "newsroom/sitemap", element: <NewsroomSitemapPage /> },
  { path: "newsroom/feed", element: <NewsroomFeedPage /> },
  { path: "newsroom/feed/:feedType", element: <NewsroomFeedPage /> },
  { path: "newsroom/category/:category", element: <NewsroomCategoryPage /> },
  { path: "newsroom/tag/:tag", element: <NewsroomTagPage /> },
  { path: "newsroom/author/:author", element: <NewsroomAuthorPage /> },
  { path: "newsroom/:slug", element: <NewsroomArticleDetailPage /> },

  // Direct alias aliases for newsroom
  { path: "news", element: <NewsroomLandingPage /> },
  { path: "news/*", element: <NewsroomLandingPage /> },
  { path: "news-room", element: <NewsroomLandingPage /> },
  { path: "news-room/*", element: <NewsroomLandingPage /> },
  { path: "article/:slug", element: <NewsroomArticleDetailPage /> },
  { path: "category/:category", element: <NewsroomCategoryPage /> },

  // ICA Public Portal Views
  { path: "portal", element: <IcaPublicHome /> },
  { path: "portal/world", element: <IcaWorldPage /> },
  { path: "portal/trending", element: <IcaTrendingPage /> },
  { path: "portal/initiatives", element: <IcaInitiativesPage /> },
  { path: "portal/initiatives/:id", element: <IcaInitiativeDetailPage /> },
  { path: "portal/featured", element: <IcaFeaturedPage /> },
  { path: "portal/media", element: <IcaMediaPage /> },
  { path: "portal/about", element: <IcaAboutPage /> },
  { path: "portal/contact", element: <IcaContactPage /> },
  { path: "public", element: <IcaPublicHome /> },
  { path: "public/world", element: <IcaWorldPage /> },
  { path: "public/trending", element: <IcaTrendingPage /> },
  { path: "public/initiatives", element: <IcaInitiativesPage /> },
  { path: "public/initiatives/:id", element: <IcaInitiativeDetailPage /> },
  { path: "public/featured", element: <IcaFeaturedPage /> },
  { path: "public/media", element: <IcaMediaPage /> },
  { path: "public/about", element: <IcaAboutPage /> },
  { path: "public/contact", element: <IcaContactPage /> },
  { path: "world", element: <IcaWorldPage /> },
  { path: "trending", element: <IcaTrendingPage /> },
  { path: "initiatives", element: <IcaInitiativesPage /> },
  { path: "initiatives/:id", element: <IcaInitiativeDetailPage /> },
  { path: "featured", element: <IcaFeaturedPage /> },
  { path: "media", element: <IcaMediaPage /> },
  { path: "contact", element: <IcaContactPage /> },
  { path: "podcasts", element: <PodcastsPage /> },
  { path: "ica-plus", element: <IcaPlusPage /> },
  { path: "media/ica-plus", element: <IcaPlusPage /> },

  // Institutional Services Canonical Redirects
  { path: "chinese-center", element: <Navigate to="../institute/chinese-center" replace /> },
  { path: "chinese-center/*", element: <Navigate to="../institute/chinese-center" replace /> },
  { path: "chinese-centre", element: <Navigate to="../institute/chinese-centre" replace /> },
  { path: "chinese-centre/*", element: <Navigate to="../institute/chinese-centre" replace /> },
  { path: "visa-centre", element: <Navigate to="../institute/visa-centre" replace /> },
  { path: "visa-centre/*", element: <Navigate to="../institute/visa-centre" replace /> },
  { path: "visa-center", element: <Navigate to="../institute/visa-centre" replace /> },
  { path: "visa-center/*", element: <Navigate to="../institute/visa-centre" replace /> },
  { path: "consultancy", element: <Navigate to="../institute/consultancy" replace /> },
  { path: "consultancy/*", element: <Navigate to="../institute/consultancy" replace /> },
  { path: "cultural-exchange", element: <Navigate to="../institute/cultural-exchange" replace /> },
  { path: "cultural-exchange/*", element: <Navigate to="../institute/cultural-exchange" replace /> },
  { path: "rss", element: <Navigate to="../newsroom/feed" replace /> }
];

const liveChildren: RouteObject[] = [
  { index: true, element: <LiveLandingPage /> },
  { path: "now", element: <LiveNowPage /> },
  { path: "schedule", element: <LiveSchedulePage /> },
  { path: "movies", element: <LiveMoviesPage /> },
  { path: "drama", element: <LiveDramaPage /> },
  { path: "documentary", element: <LiveDocumentaryPage /> },
  { path: "exchange", element: <LiveExchangePage /> },
  { path: "archive", element: <LiveArchivePage /> },
  { path: "search", element: <LiveSearchPage /> },
  { path: "feed", element: <LiveRssFeedPage /> },
  { path: "watch/:id", element: <LiveDetailVideoPage /> },
  { path: ":slug", element: <LiveDetailVideoPage /> }
];

const secretariatChildren: RouteObject[] = [
  { index: true, element: <SecretariatDashboard /> },
  { path: "content", element: <SecretariatContentCrud /> },
  { path: "initiatives", element: <SecretariatInitiativesCrud /> },
  { path: "media", element: <SecretariatMediaCrud /> },
  { path: "newsletter", element: <SecretariatNewsletterCrud /> },
  { path: "forms", element: <SecretariatFormsCrud /> },
  { path: "users", element: <SecretariatUsersCrud /> },
  { path: "audit", element: <SecretariatAuditCrud /> },
  { path: "settings", element: <SecretariatSettings /> }
];

const newsroomHubChildren: RouteObject[] = [
  { index: true, element: <NewsroomHubDashboard /> },
  { path: "articles", element: <NewsroomArticlesCrud /> },
  { path: "categories", element: <NewsroomCategoriesCrud /> },
  { path: "tags", element: <NewsroomTagsCrud /> },
  { path: "authors", element: <NewsroomAuthorsCrud /> },
  { path: "feeds", element: <NewsroomFeedsCrud /> },
  { path: "analytics", element: <NewsroomAnalytics /> },
  { path: "settings", element: <NewsroomSettings /> }
];

const liveHubChildren: RouteObject[] = [
  { index: true, element: <CiseCommandHubDashboard /> },
  { path: "streams", element: <CiseCommandHubLiveEvents /> },
  { path: "movies", element: <CiseCommandHubVideos /> },
  { path: "drama", element: <CiseCommandHubVideos /> },
  { path: "documentary", element: <CiseCommandHubVideos /> },
  { path: "exchange", element: <CiseCommandHubVideos /> },
  { path: "schedule", element: <CiseCommandHubLiveEvents /> },
  { path: "analytics", element: <CiseCommandHubDashboard /> },
  { path: "settings", element: <CiseCommandHubSettings /> }
];

export const publicRoutes: RouteObject[] = [
  // 1. DIRECT ROOT PORTAL (Published link - DIRECT OPEN WITH ZERO REDIRECT!)
  {
    path: "/",
    element: <LangWrapper />,
    children: publicChildren
  },
  // 2. EXPLICIT LANGUAGE PREFACES (/en, /ar, /zh, /ckb)
  {
    path: "/:lang",
    element: <LangWrapper />,
    children: publicChildren
  },

  // 3. DIRECT LIVE PORTAL (Root and Localized)
  {
    path: "/live",
    element: <ImmersiveLangWrapper />,
    children: liveChildren
  },
  {
    path: "/:lang/live",
    element: <ImmersiveLangWrapper />,
    children: liveChildren
  },

  // 4. DIRECT SECRETARIAT COMMAND HUB (Root and Localized)
  {
    path: "/secretariat",
    element: <SecretariatLangWrapper />,
    children: [
      {
        element: <SecretariatHubLayout />,
        children: secretariatChildren
      }
    ]
  },
  {
    path: "/:lang/secretariat",
    element: <SecretariatLangWrapper />,
    children: [
      {
        element: <SecretariatHubLayout />,
        children: secretariatChildren
      }
    ]
  },

  // 5. DIRECT NEWSROOM HUB
  {
    path: "/newsroom/hub",
    element: <CiseCommandHubLangWrapper />,
    children: [
      {
        element: <NewsroomLayout />,
        children: newsroomHubChildren
      }
    ]
  },
  {
    path: "/:lang/newsroom/hub",
    element: <CiseCommandHubLangWrapper />,
    children: [
      {
        element: <NewsroomLayout />,
        children: newsroomHubChildren
      }
    ]
  },

  // 6. DIRECT LIVE HUB
  {
    path: "/live/hub",
    element: <CiseCommandHubLangWrapper />,
    children: [
      {
        element: <LivePortalLayout />,
        children: liveHubChildren
      }
    ]
  },
  {
    path: "/:lang/live/hub",
    element: <CiseCommandHubLangWrapper />,
    children: [
      {
        element: <LivePortalLayout />,
        children: liveHubChildren
      }
    ]
  }
];
