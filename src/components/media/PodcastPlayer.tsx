import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, Download, Gauge, Mic, Radio } from 'lucide-react';

export interface PodcastEpisode {
  id: string;
  title: string;
  host?: string;
  guest?: string;
  duration?: string;
  audioUrl?: string;
  coverUrl?: string;
  category?: string;
}

interface PodcastPlayerProps {
  episode: PodcastEpisode;
  onClose?: () => void;
  className?: string;
}

export function PodcastPlayer({ episode, onClose, className = '' }: PodcastPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const speedOptions = [0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const skipTime = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(
      Math.max(audioRef.current.currentTime + seconds, 0),
      duration || 3600
    );
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (!duration && audioRef.current.duration) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      togglePlay();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      skipTime(10);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      skipTime(-10);
    } else if (e.key === 'm' || e.key === 'M') {
      e.preventDefault();
      setIsMuted(prev => !prev);
    }
  };

  return (
    <div
      role="region"
      aria-label={`Podcast Player: ${episode.title}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`bg-[#0a0a0a] text-white border border-neutral-800 rounded-2xl p-4 sm:p-6 shadow-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-800)] ${className}`}
    >
      <audio
        ref={audioRef}
        src={episode.audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-4">
        {/* Cover Thumbnail */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 shrink-0">
          {episode.coverUrl ? (
            <img src={episode.coverUrl} alt={episode.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--color-brand-800)]">
              <Radio size={32} />
            </div>
          )}
          <div className="absolute top-1 inset-inline-start-1 bg-[var(--color-brand-800)] text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
            ICA+
          </div>
        </div>

        {/* Episode Info */}
        <div className="flex-1 text-center sm:text-start min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-mono text-neutral-400 mb-1">
            <span className="text-[var(--color-brand-800)] font-bold">{episode.category || 'Diplomatic Audio'}</span>
            <span>·</span>
            <span>{episode.duration || formatTime(duration)}</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-white truncate" title={episode.title}>
            {episode.title}
          </h4>
          {(episode.host || episode.guest) && (
            <p className="text-xs text-neutral-400 mt-1 flex items-center justify-center sm:justify-start gap-1">
              <Mic size={12} className="text-[var(--color-brand-800)]" />
              <span>{episode.host ? `Host: ${episode.host}` : ''} {episode.guest ? `· Guest: ${episode.guest}` : ''}</span>
            </p>
          )}
        </div>

        {/* Speed & Download Tools */}
        <div className="flex items-center gap-2 self-center sm:self-start">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              aria-label="Playback Speed"
              className="min-h-[44px] min-w-[44px] px-2.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono font-bold text-white flex items-center justify-center gap-1 transition-colors"
            >
              <Gauge size={14} />
              <span>{playbackRate}x</span>
            </button>
            {showSpeedMenu && (
              <div className="absolute top-full mt-1 end-0 bg-neutral-900 border border-neutral-700 rounded-xl p-1 z-20 shadow-xl flex flex-col gap-1 min-w-[70px]">
                {speedOptions.map(rate => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => {
                      setPlaybackRate(rate);
                      setShowSpeedMenu(false);
                    }}
                    className={`px-2 py-1 text-xs font-mono rounded ${playbackRate === rate ? 'bg-[var(--color-brand-800)] text-white' : 'hover:bg-neutral-800 text-neutral-300'}`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            )}
          </div>

          {episode.audioUrl && (
            <a
              href={episode.audioUrl}
              download
              aria-label="Download Audio Track"
              className="min-h-[44px] min-w-[44px] rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white flex items-center justify-center transition-colors"
            >
              <Download size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Progress Bar & Seek */}
      <div className="space-y-1 mb-4">
        <div className="relative">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Seek track"
            className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[var(--color-brand-800)]"
          />
        </div>
        <div className="flex justify-between text-[11px] font-mono text-neutral-400 tabular-nums">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Bottom Transport Controls */}
      <div className="flex items-center justify-between gap-4 pt-2 border-t border-neutral-800/80">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            aria-label="Volume slider"
            className="w-16 sm:w-24 h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[var(--color-brand-800)] hidden sm:block"
          />
        </div>

        {/* Center Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => skipTime(-10)}
            aria-label="Rewind 10 seconds"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
          >
            <RotateCcw size={18} />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="min-h-[48px] min-w-[48px] flex items-center justify-center rounded-full bg-[var(--color-brand-800)] hover:bg-[#b80016] text-white shadow-lg transition-transform active:scale-95"
          >
            {isPlaying ? <Pause size={22} /> : <Play size={22} className="translate-x-0.5" />}
          </button>

          <button
            type="button"
            onClick={() => skipTime(10)}
            aria-label="Fast forward 10 seconds"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
          >
            <RotateCw size={18} />
          </button>
        </div>

        <div className="text-[11px] font-mono text-neutral-400 hidden sm:block">
          <span>Keyboard: Space / ← / →</span>
        </div>
      </div>
    </div>
  );
}
