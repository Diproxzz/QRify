import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Download, Layers } from 'lucide-react';
import { animatePageEntrance } from '../lib/animeHelper';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    animatePageEntrance(containerRef.current);
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden pt-6 pb-4 sm:pt-10 sm:pb-6">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Hero Title */}
        <h1 className="anime-entrance font-display text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2]">
          Designed QR Codes for Print & Displays
        </h1>

        {/* Subhead */}
        <p className="anime-entrance mt-3.5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Embed custom scannable QR codes inside illustrated scene templates. Export crisp vector SVG, high-resolution PNG, and print-ready PDF files directly from your browser.
        </p>

        {/* Value Badges */}
        <div className="anime-entrance mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>100% Client-Side</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Layers className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>Object-Based Templates</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Vector SVG & Print PDF</span>
          </div>
        </div>
      </div>
    </div>
  );
};
