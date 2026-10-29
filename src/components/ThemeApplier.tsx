import React, { useEffect } from 'react';
import { useSiteStore } from '../store/useSiteStore';

function mixColor(hex: string, targetHex: string, weight: number): string {
  try {
    const cleanHex = hex.replace('#', '');
    const cleanTarget = targetHex.replace('#', '');
    const r1 = parseInt(cleanHex.substring(0, 2), 16) || 0;
    const g1 = parseInt(cleanHex.substring(2, 4), 16) || 0;
    const b1 = parseInt(cleanHex.substring(4, 6), 16) || 0;
    
    const r2 = parseInt(cleanTarget.substring(0, 2), 16) || 0;
    const g2 = parseInt(cleanTarget.substring(2, 4), 16) || 0;
    const b2 = parseInt(cleanTarget.substring(4, 6), 16) || 0;
    
    const r = Math.round(r1 + (r2 - r1) * weight);
    const g = Math.round(g1 + (g2 - g1) * weight);
    const b = Math.round(b1 + (b2 - b1) * weight);
    
    return `rgb(${r}, ${g}, ${b})`;
  } catch (e) {
    return hex;
  }
}

export function ThemeApplier() {
  const { brandColor, inkColor, paperColor } = useSiteStore();
  
  useEffect(() => {
    try {
      const root = document.documentElement;
      root.classList.remove('dark');
      document.body?.classList.remove('dark');

      const safeInk = (!inkColor || ['#ffffff', '#fff', '#fafafa', '#f4f4f5', '#f8fafc'].includes(inkColor.toLowerCase().trim()))
        ? 'var(--color-ink-900)'
        : inkColor;
      const safePaper = (!paperColor || ['#000000', '#000', '#09090b', 'var(--color-ink-900)'].includes(paperColor.toLowerCase().trim()))
        ? '#ffffff'
        : paperColor;
      root.style.setProperty('--color-ink-900', safeInk);
      root.style.setProperty('--color-paper-50', safePaper);

      if (brandColor) {
        const bc = (brandColor && brandColor.startsWith('#') && brandColor !== '#8B0000' && brandColor !== '#990000' && brandColor !== '#C91C24' && brandColor !== '#800000' && brandColor !== '#a30000') 
          ? brandColor 
          : 'var(--color-brand-800)';
        root.style.setProperty('--color-brand-950', bc);
        root.style.setProperty('--color-brand-900', bc);
        root.style.setProperty('--color-brand-800', bc);
        root.style.setProperty('--color-brand-700', mixColor(bc, '#ffffff', 0.12));
        root.style.setProperty('--color-brand-600', mixColor(bc, '#ffffff', 0.25));
        root.style.setProperty('--color-brand-500', mixColor(bc, '#ffffff', 0.45));
        root.style.setProperty('--color-brand-400', mixColor(bc, '#ffffff', 0.65));
        root.style.setProperty('--color-brand-300', mixColor(bc, '#ffffff', 0.78));
        root.style.setProperty('--color-brand-200', mixColor(bc, '#ffffff', 0.86));
        root.style.setProperty('--color-brand-100', mixColor(bc, '#ffffff', 0.92));
        root.style.setProperty('--color-brand-50', mixColor(bc, '#ffffff', 0.96));
      }
    } catch (e) {
      console.warn("ThemeApplier style property error:", e);
    }
  }, [brandColor, inkColor, paperColor]);
  
  return null;
}
