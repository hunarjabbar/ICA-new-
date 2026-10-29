import React from 'react';
import { useParams } from 'react-router-dom';
import { Locale } from '../../../types';
import { ChineseCenterModalViews } from '../../../components/institute/chinese-center/ChineseCenterModalViews';

export function ChineseCentreInstructors() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  return <ChineseCenterModalViews lang={lang} view="instructors" />;
}

export default ChineseCentreInstructors;
