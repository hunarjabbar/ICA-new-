import React, { useState, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize, Minimize, Download, Info } from 'lucide-react';
import { Locale } from '../../types';

export interface InfographicData {
  id: string;
  title: Record<string, string> | string;
  description?: Record<string, string> | string;
  imageUrl: string;
  downloadUrl?: string;
  dimensions?: string;
  source?: string;
  date?: string;
}

interface InfographicViewerProps {
  infographic: InfographicData;
  lang?: Locale | string;
  className?: string;
}

export function InfographicViewer({ infographic, lang = 'en', className = '' }: InfographicViewerProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const getLocalized = (val: Record<string, string> | string | undefined): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val[lang] || val['en'] || Object.values(val)[0] || '';
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3.5));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative bg-[#0a0a0a] rounded-2xl overflow-hidden border border-neutral-800 shadow-xl ${className}`}
    >
      {/* Top Controls Bar */}
      <div className="absolute top-3 inset-inline-start-3 inset-inline-end-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-neutral-800 text-xs font-mono text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand-800)]"></span>
          <span className="font-bold truncate max-w-[180px] sm:max-w-xs">{getLocalized(infographic.title)}</span>
          <span className="text-neutral-400 tabular-nums">({Math.round(scale * 100)}%)</span>
        </div>

        {/* Toolbar */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-black/80 backdrop-blur-md p-1 rounded-xl border border-neutral-800">
          <button
            type="button"
            onClick={handleZoomIn}
            aria-label="Zoom In"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
          >
            <ZoomIn size={18} />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            aria-label="Zoom Out"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
          >
            <ZoomOut size={18} />
          </button>
          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset Zoom"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw size={16} />
          </button>
          <button
            type="button"
            onClick={() => setShowInfo(!showInfo)}
            aria-label="Toggle Info"
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-colors cursor-pointer ${showInfo ? 'bg-[var(--color-brand-800)] text-white' : 'text-neutral-300 hover:text-white hover:bg-neutral-800'}`}
          >
            <Info size={16} />
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="Toggle Fullscreen"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
          {infographic.downloadUrl || infographic.imageUrl ? (
            <a
              href={infographic.downloadUrl || infographic.imageUrl}
              download
              target="_blank"
              rel="noreferrer"
              aria-label="Download Infographic"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
            >
              <Download size={18} />
            </a>
          ) : null}
        </div>
      </div>

      {/* Interactive Canvas */}
      <div
        className="w-full h-[450px] sm:h-[550px] overflow-hidden flex items-center justify-center select-none"
        style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={infographic.imageUrl}
          alt={getLocalized(infographic.title)}
          draggable={false}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)'
          }}
          className="max-h-full max-w-full object-contain pointer-events-auto"
        />
      </div>

      {/* Info Slideout */}
      {showInfo && (
        <div className="absolute bottom-3 inset-inline-start-3 inset-inline-end-3 z-20 bg-black/90 backdrop-blur-md p-4 rounded-xl border border-neutral-800 text-white animate-in slide-in-from-bottom-2 duration-200">
          <h4 className="font-bold text-sm text-[var(--color-brand-800)]">
            {getLocalized(infographic.title)}
          </h4>
          {infographic.description && (
            <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
              {getLocalized(infographic.description)}
            </p>
          )}
          <div className="flex flex-wrap gap-4 mt-2 pt-2 border-t border-neutral-800 text-[11px] font-mono text-neutral-400 tabular-nums">
            {infographic.dimensions && <span>Dimensions: {infographic.dimensions}</span>}
            {infographic.source && <span>Source: {infographic.source}</span>}
            {infographic.date && <span>Published: {infographic.date}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
