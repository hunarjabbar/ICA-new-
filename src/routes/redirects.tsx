import React from 'react';
import { useLocation, useParams, Navigate } from 'react-router-dom';
import { resolveLocaleFromEnvironment } from './languageSetup';

export function RootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  searchParams.set('welcome', '1');
  const searchStr = `?${searchParams.toString()}`;
  return <Navigate to={`/${loc}${searchStr}${location.hash}`} replace />;
}

export function InstituteRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const instituteSubPath = location.pathname.replace(/^\/institute/, '');
  return <Navigate to={`/${loc}/institute${instituteSubPath}${location.search}${location.hash}`} replace />;
}

export function NewsroomRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const isCategory = location.pathname.startsWith('/category');
  const subPath = location.pathname.replace(/^\/(newsroom|news-room|news|article|category)/, '');
  const targetPath = isCategory ? `/category${subPath}` : subPath;
  return <Navigate to={`/${loc}/newsroom${targetPath}${location.search}${location.hash}`} replace />;
}

export function LegacyNewsRedirect() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const isCategory = location.pathname.includes('/category/');
  const subPath = location.pathname.replace(/^\/[^/]+\/(news-room|news|article|category)/, '');
  const cleanLang = (lang === 'ck' || lang === 'ku') ? 'ckb' : (lang || 'en');
  const targetPath = isCategory ? `/category${subPath}` : subPath;
  return <Navigate to={`/${cleanLang}/newsroom${targetPath}${location.search}${location.hash}`} replace />;
}

export function GenericRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const subPath = location.pathname;
  return <Navigate to={`/${loc}${subPath}${location.search}${location.hash}`} replace />;
}

export function IcaPlusRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const subPath = location.pathname.replace(/^\/ica-plus/, '/media/ica-plus');
  return <Navigate to={`/${loc}${subPath}${location.search}${location.hash}`} replace />;
}

export function KurdishAliasRedirect() {
  const location = useLocation();
  const targetPath = location.pathname.replace(/^\/ck(\/|$)/, '/ckb$1');
  return <Navigate to={`${targetPath}${location.search}${location.hash}`} replace />;
}

export function LiveRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const subPath = location.pathname.replace(/^\/live/, '');
  return <Navigate to={`/${loc}/live${subPath}${location.search}${location.hash}`} replace />;
}

export function PublicPortalRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const subPath = location.pathname.replace(/^\/(portal|public)/, '');
  const searchParams = new URLSearchParams(location.search);
  searchParams.set('welcome', '1');
  const searchStr = `?${searchParams.toString()}`;
  return <Navigate to={`/${loc}/portal${subPath}${searchStr}${location.hash}`} replace />;
}

export function SettingsRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const subPath = location.pathname.replace(/^\/settings/, '');
  return <Navigate to={`/${loc}/hub/management/settings${subPath}${location.search}${location.hash}`} replace />;
}

export function ProfileRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const subPath = location.pathname.replace(/^\/profile/, '');
  return <Navigate to={`/${loc}/hub/management${subPath}${location.search}${location.hash}`} replace />;
}

export function CulturalExchangeRootRedirect() {
  const location = useLocation();
  const loc = (typeof window !== 'undefined' ? localStorage.getItem('ica_lang') : null) || 'en';
  const subPath = location.pathname.replace(/^\/cultural-exchange/, '');
  return <Navigate to={`/${loc}/institute/services/cultural-exchange${subPath}${location.search}${location.hash}`} replace />;
}

export function LegacyCulturalExchangeRedirect() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const cleanLang = (lang === 'ck' || lang === 'ku') ? 'ckb' : (lang || 'en');
  const subPath = location.pathname.replace(/^\/[^/]+\/cultural-exchange/, '');
  return <Navigate to={`/${cleanLang}/institute/services/cultural-exchange${subPath}${location.search}${location.hash}`} replace />;
}

export function ConsultancyRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const consultancySubPath = location.pathname.replace(/^\/consultancy/, '');
  return <Navigate to={`/${loc}/institute/consultancy${consultancySubPath}${location.search}${location.hash}`} replace />;
}

export function SecretariatRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const subPath = location.pathname.replace(/^\/secretariat/, '');
  return <Navigate to={`/${loc}/secretariat${subPath}${location.search}${location.hash}`} replace />;
}
