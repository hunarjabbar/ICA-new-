import React from 'react';
import { useParams } from 'react-router-dom';
import { Locale } from '../../../types';
import { ChineseCenterModalViews } from '../../../components/institute/chinese-center/ChineseCenterModalViews';

export function ChineseCentreFAQ() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  return <ChineseCenterModalViews lang={lang} view="faq" />;
}

export default ChineseCentreFAQ;
