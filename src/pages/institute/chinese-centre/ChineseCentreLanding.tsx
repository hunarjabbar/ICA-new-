import React from 'react';
import { useParams } from 'react-router-dom';
import { Locale } from '../../../types';
import { ChineseCenterHero } from '../../../components/institute/chinese-center/ChineseCenterHero';
import { HskLevelsGrid } from '../../../components/institute/chinese-center/HskLevelsGrid';
import { SupplementaryTracks } from '../../../components/institute/chinese-center/SupplementaryTracks';
import { TestingCertificationBlock } from '../../../components/institute/chinese-center/TestingCertificationBlock';
import { InstructorsPreview } from '../../../components/institute/chinese-center/InstructorsPreview';
import { UpcomingSessions } from '../../../components/institute/chinese-center/UpcomingSessions';
import { TestimonialsSection } from '../../../components/institute/chinese-center/TestimonialsSection';
import { FaqPreview } from '../../../components/institute/chinese-center/FaqPreview';
import { EnrollmentCtaBand } from '../../../components/institute/chinese-center/EnrollmentCtaBand';

export function ChineseCentreLanding() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();

  return (
    <div className="w-full min-h-screen bg-white font-sans text-slate-950">
      {/* 2.1 Hero Section */}
      <ChineseCenterHero lang={lang} />

      {/* 2.2 HSK Levels Grid */}
      <HskLevelsGrid lang={lang} />

      {/* 2.3 Supplementary Tracks */}
      <SupplementaryTracks lang={lang} />

      {/* 2.4 Testing & Certification Block */}
      <TestingCertificationBlock lang={lang} />

      {/* 2.5 Instructors Preview */}
      <InstructorsPreview lang={lang} />

      {/* 2.6 Upcoming Sessions */}
      <UpcomingSessions lang={lang} />

      {/* 2.7 Testimonials */}
      <TestimonialsSection lang={lang} />

      {/* 2.8 FAQ Preview */}
      <FaqPreview lang={lang} />

      {/* 2.9 Enrollment CTA Band */}
      <EnrollmentCtaBand lang={lang} />
    </div>
  );
}

export default ChineseCentreLanding;
