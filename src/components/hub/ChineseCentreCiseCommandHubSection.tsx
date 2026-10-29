import React, { useState } from 'react';
import { 
  Globe, BookOpen, Users, ExternalLink, Award
} from 'lucide-react';
import { GenericCollectionCrud } from './GenericCollectionCrud';
import { Locale } from '../../types';
import { seedChineseCentreData } from '../../utils/seedChineseCentre';
import { toast } from 'sonner';

interface ChineseCentreCiseCommandHubSectionProps {
  initialSubSection?: string;
  lang?: Locale;
}

export function ChineseCentreCiseCommandHubSection({
  initialSubSection,
  lang = 'en'
}: ChineseCentreCiseCommandHubSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(initialSubSection || 'courses');
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeed = async () => {
    if (!window.confirm('This will add sample courses, instructors, and testing sessions to your live database. Continue?')) return;
    
    setIsSeeding(true);
    try {
      await seedChineseCentreData();
      toast.success('Database seeded successfully! Please refresh or switch tabs to see data.');
    } catch (err) {
      console.error(err);
      toast.error('Seeding failed. Check console for details.');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-red-600 uppercase tracking-[0.2em] mb-2">
            <Globe size={14} />
            <span>CISE Services • Chinese Centre Administration</span>
          </div>
          <h2 className="text-2xl font-black uppercase text-neutral-900 tracking-tight">Chinese Centre Controller</h2>
          <p className="text-sm text-neutral-500 mt-1 max-w-2xl">
            Manage HSK curriculum, instructor profiles, and official testing schedules for Sulaymaniyah's premier Chinese language hub.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSeed}
            disabled={isSeeding}
            className="px-4 py-2.5 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
          >
            {isSeeding ? 'Seeding...' : 'Seed Sample Data'}
          </button>
          <a
            href={`/${lang}/institute/chinese-centre`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-xs font-black uppercase tracking-widest text-white flex items-center gap-2 shadow-lg shadow-red-900/10 transition-all active:scale-95"
          >
            <span>Live Public Portal</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-neutral-100 scrollbar-none">
        {[
          { id: 'courses', name: 'Curriculum & Courses', icon: BookOpen },
          { id: 'instructors', name: 'Faculty & Instructors', icon: Users },
          { id: 'testing', name: 'HSK Testing Sessions', icon: Award },
          { id: 'levels', name: 'HSK Level Registry', icon: BookOpen },
          { id: 'tracks', name: 'Specialized Tracks', icon: Globe }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shrink-0 flex items-center gap-2.5 transition-all cursor-pointer ${
                isActive
                   ? 'bg-red-700 text-white shadow-xl shadow-red-900/10'
                  : 'bg-white text-neutral-500 border border-neutral-200 hover:border-red-400 hover:text-red-700'
              }`}
            >
              <Icon size={14} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Content Wrapper */}
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
        {activeTab === 'courses' && (
          <GenericCollectionCrud
            collectionPath="chinese_courses"
            sectionTitle="HSK 3.0 Curriculum Roster"
            sectionDescription="Manage standardized levels, supplementary tracks, pricing, and intake capacities."
            lang={lang}
            fields={[
              { name: 'title', label: 'Course Title', type: 'localized', required: true },
              { name: 'level', label: 'HSK Level', type: 'text', required: true },
              { name: 'type', label: 'Track Type (CORE, BUSINESS, etc.)', type: 'text' },
              { name: 'description', label: 'Description', type: 'localized' },
              { name: 'duration', label: 'Duration Label', type: 'localized' },
              { name: 'price', label: 'Price Label', type: 'localized' },
              { name: 'imageUrl', label: 'Cover Image URL', type: 'text' },
              { name: 'slug', label: 'URL Slug', type: 'text' },
              { name: 'isFeatured', label: 'Featured (true/false)', type: 'text' },
              { name: 'order', label: 'Sort Order', type: 'text' }
            ]}
          />
        )}

        {activeTab === 'instructors' && (
          <GenericCollectionCrud
            collectionPath="chinese_instructors"
            sectionTitle="Faculty Profiles"
            sectionDescription="Manage native instructors and pedagogical experts."
            lang={lang}
            fields={[
              { name: 'name', label: 'Full Name', type: 'localized', required: true },
              { name: 'title', label: 'Official Title', type: 'localized', required: true },
              { name: 'bio', label: 'Biography', type: 'localized' },
              { name: 'imageUrl', label: 'Avatar URL', type: 'text' },
              { name: 'slug', label: 'Profile Slug', type: 'text' },
              { name: 'isFeatured', label: 'Featured (true/false)', type: 'text' },
              { name: 'order', label: 'Sort Order', type: 'text' }
            ]}
          />
        )}

        {activeTab === 'testing' && (
          <GenericCollectionCrud
            collectionPath="chinese_testing_sessions"
            sectionTitle="Official Testing Schedule"
            sectionDescription="Define upcoming HSK, HSKK, and YCT examination windows."
            lang={lang}
            fields={[
              { name: 'testType', label: 'Test Type (HSK, HSKK, etc.)', type: 'text', required: true },
              { name: 'level', label: 'Target Levels', type: 'text' },
              { name: 'testDate', label: 'Examination Date', type: 'text', required: true },
              { name: 'registrationDeadline', label: 'Registration Deadline', type: 'text' },
              { name: 'location', label: 'Testing Location', type: 'localized' },
              { name: 'fee', label: 'Fee Label', type: 'localized' },
              { name: 'status', label: 'Status (OPEN, CLOSED)', type: 'text' }
            ]}
          />
        )}

        {activeTab === 'levels' && (
          <GenericCollectionCrud
            collectionPath="chinese_levels"
            sectionTitle="HSK 3.0 Level Definitions"
            sectionDescription="Standardized HSK level criteria including cumulative words and target hours."
            lang={lang}
            fields={[
              { name: 'level', label: 'Level Label (e.g. HSK 1)', type: 'text', required: true },
              { name: 'slug', label: 'Slug', type: 'text', required: true },
              { name: 'bandKey', label: 'Band Key (hskBandElementary/Intermediate/Advanced)', type: 'text' },
              { name: 'words', label: 'Cumulative Words', type: 'text' },
              { name: 'hours', label: 'Target Hours', type: 'text' },
              { name: 'prereq', label: 'Prerequisite', type: 'text' },
              { name: 'order', label: 'Sort Order', type: 'text' }
            ]}
          />
        )}

        {activeTab === 'tracks' && (
          <GenericCollectionCrud
            collectionPath="chinese_tracks"
            sectionTitle="Specialized Supplementary Tracks"
            sectionDescription="Manage HSKK, YCT, and Business Chinese tracks."
            lang={lang}
            fields={[
              { name: 'name', label: 'Track Name', type: 'text', required: true },
              { name: 'slug', label: 'Slug', type: 'text', required: true },
              { name: 'icon', label: 'Lucide Icon Name', type: 'text' },
              { name: 'descKey', label: 'Description Translation Key', type: 'text' },
              { name: 'order', label: 'Sort Order', type: 'text' }
            ]}
          />
        )}
      </div>
    </div>
  );
}
