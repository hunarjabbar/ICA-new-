import React, { useState } from 'react';
import { 
  GraduationCap, Award, Users, ExternalLink
} from 'lucide-react';
import { GenericCollectionCrud } from './GenericCollectionCrud';
import { Locale } from '../../types';
import { seedCulturalExchangeData } from '../../utils/seedCulturalExchange';
import { toast } from 'sonner';

interface CulturalExchangeCiseCommandHubSectionProps {
  initialSubSection?: string;
  lang?: Locale;
}

export function CulturalExchangeCiseCommandHubSection({
  initialSubSection,
  lang = 'en'
}: CulturalExchangeCiseCommandHubSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(initialSubSection || 'programs');
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeed = async () => {
    if (!window.confirm('This will add sample programs, partners, and categories to your live database. Continue?')) return;
    
    setIsSeeding(true);
    try {
      await seedCulturalExchangeData();
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
            <GraduationCap size={14} />
            <span>CISE Services • Academic Exchange Administration</span>
          </div>
          <h2 className="text-2xl font-black uppercase text-neutral-900 tracking-tight">Cultural Exchange Controller</h2>
          <p className="text-sm text-neutral-500 mt-1 max-w-2xl">
            Create, edit, and manage fellowship programs, scholarships, and partner university rosters for the bilateral Sino-Iraqi academic corridor.
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
            href={`/${lang}/institute/services/cultural-exchange`}
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
          { id: 'programs', name: 'Fellowships & Scholarships', icon: GraduationCap },
          { id: 'partners', name: 'Partner Universities', icon: Award },
          { id: 'categories', name: 'Program Tracks (Categories)', icon: Users }
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
        {activeTab === 'programs' && (
          <GenericCollectionCrud
            collectionPath="cultural_programs"
            sectionTitle="Academic Exchange & Fellowship Roster"
            sectionDescription="Manage fully funded scholarships, eligibility criteria, application windows, and intake capacity."
            lang={lang}
            fields={[
              { name: 'title', label: 'Program Title', type: 'localized', required: true },
              { name: 'description', label: 'Brief Description', type: 'localized' },
              { name: 'details', label: 'Full Dossier & Curriculum', type: 'localized' },
              { name: 'institutionName', label: 'Partner Institution', type: 'text', required: true },
              { name: 'coverImage', label: 'Cover Image URL', type: 'text' },
              { name: 'applicationDeadline', label: 'Deadline', type: 'text' },
              { name: 'eventDate', label: 'Cycle Date', type: 'text' },
              { name: 'eligibility', label: 'Eligibility Requirements', type: 'textarea' },
              { name: 'categorySlug', label: 'Category Slug', type: 'text', required: true }
            ]}
          />
        )}

        {activeTab === 'partners' && (
          <GenericCollectionCrud
            collectionPath="cultural_partners"
            sectionTitle="Partner Universities & Research Labs"
            sectionDescription="Manage affiliations with Peking University, Tsinghua, University of Baghdad, Basra, and Salahaddin."
            lang={lang}
            fields={[
              { name: 'name', label: 'University Name', type: 'localized', required: true },
              { name: 'location', label: 'City, Country', type: 'localized' },
              { name: 'specialty', label: 'Main Specialty', type: 'localized' },
              { name: 'mouScope', label: 'MOU Scope', type: 'localized' },
              { name: 'tierBadge', label: 'Tier Badge Label', type: 'text' }
            ]}
          />
        )}

        {activeTab === 'categories' && (
          <GenericCollectionCrud
            collectionPath="cultural_categories"
            sectionTitle="Strategic Program Tracks"
            sectionDescription="Define the high-level categories that group your fellowship programs (e.g., Educational Exchange, Heritage)."
            lang={lang}
            fields={[
              { name: 'name', label: 'Category Name', type: 'localized', required: true },
              { name: 'slug', label: 'URL Slug', type: 'text', required: true },
              { name: 'description', label: 'Track Purpose', type: 'localized' }
            ]}
          />
        )}
      </div>
    </div>
  );
}

