import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Camera, Download } from 'lucide-react';
import { Locale } from '../../types';

export interface GalleryPhoto {
  id: string;
  url: string;
  title: Record<string, string> | string;
  caption?: Record<string, string> | string;
  photographer?: string;
  date?: string;
  location?: string;
}

interface PhotoGalleryProps {
  photos: GalleryPhoto[];
  lang?: Locale | string;
  className?: string;
}

export function PhotoGallery({ photos, lang = 'en', className = '' }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const getLocalized = (val: Record<string, string> | string | undefined): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val[lang] || val['en'] || Object.values(val)[0] || '';
  };

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % photos.length);
  }, [selectedIndex, photos.length]);

  const showPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
  }, [selectedIndex, photos.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, showNext, showPrev]);

  if (!photos || photos.length === 0) return null;

  const currentPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Responsive Photo Grid (1-col at 320, 2-col at 640, 3-4 col at 1024+) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => openLightbox(index)}
            className="group relative bg-[#0a0a0a] rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer border border-neutral-200 dark:border-neutral-800 hover:border-[var(--color-brand-800)] transition-all shadow-sm"
          >
            <img
              src={photo.url}
              alt={getLocalized(photo.title)}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
              <span className="self-end bg-black/60 text-white p-2 rounded-xl backdrop-blur-xs min-h-[44px] min-w-[44px] flex items-center justify-center">
                <Maximize2 size={16} />
              </span>
              <div className="space-y-1">
                <p className="text-white text-xs font-bold truncate">
                  {getLocalized(photo.title)}
                </p>
                {photo.location && (
                  <p className="text-neutral-300 text-[10px] font-mono">
                    {photo.location}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {currentPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={getLocalized(currentPhoto.title)}
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between gap-4 text-white pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <Camera size={18} className="text-[var(--color-brand-800)]" />
              <span className="text-xs font-mono text-neutral-400">
                {selectedIndex! + 1} / {photos.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={currentPhoto.url}
                download
                target="_blank"
                rel="noreferrer"
                aria-label="Download Full Photo"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white transition-colors"
              >
                <Download size={18} />
              </a>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close Lightbox"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-neutral-900 hover:bg-[var(--color-brand-800)] text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Center Stage & Nav */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden my-4">
            <button
              type="button"
              onClick={showPrev}
              aria-label="Previous photo"
              className="absolute inset-inline-start-2 z-10 min-h-[44px] min-w-[44px] rounded-full bg-black/60 hover:bg-[var(--color-brand-800)] text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
            >
              <ChevronLeft size={24} className="rtl:rotate-180" />
            </button>

            <img
              src={currentPhoto.url}
              alt={getLocalized(currentPhoto.title)}
              className="max-h-[75vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            />

            <button
              type="button"
              onClick={showNext}
              aria-label="Next photo"
              className="absolute inset-inline-end-2 z-10 min-h-[44px] min-w-[44px] rounded-full bg-black/60 hover:bg-[var(--color-brand-800)] text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
            >
              <ChevronRight size={24} className="rtl:rotate-180" />
            </button>
          </div>

          {/* Bottom Captions */}
          <div className="max-w-3xl mx-auto text-center space-y-1">
            <h3 className="text-white font-bold text-sm sm:text-base">
              {getLocalized(currentPhoto.title)}
            </h3>
            {currentPhoto.caption && (
              <p className="text-neutral-400 text-xs leading-relaxed">
                {getLocalized(currentPhoto.caption)}
              </p>
            )}
            <div className="flex items-center justify-center gap-3 text-[11px] font-mono text-neutral-500 pt-1">
              {currentPhoto.photographer && <span>Photo: {currentPhoto.photographer}</span>}
              {currentPhoto.date && <span>· {currentPhoto.date}</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
