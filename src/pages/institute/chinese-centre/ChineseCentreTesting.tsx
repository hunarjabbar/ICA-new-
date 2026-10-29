import React from 'react';
import { useParams } from 'react-router-dom';
import { Locale } from '../../../types';
import { ChineseCenterModalViews } from '../../../components/institute/chinese-center/ChineseCenterModalViews';

export function ChineseCentreTesting() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  return <ChineseCenterModalViews lang={lang} view="testing" />;
}

export default ChineseCentreTesting;
