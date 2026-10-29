import React from 'react';
import { useParams } from 'react-router-dom';
import { Locale } from '../../../types';
import { ChineseCenterModalViews } from '../../../components/institute/chinese-center/ChineseCenterModalViews';

export function ChineseCentreEnrollment() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  return <ChineseCenterModalViews lang={lang} view="enroll" />;
}

export default ChineseCentreEnrollment;
