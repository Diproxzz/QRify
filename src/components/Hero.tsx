import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Download, Layers } from 'lucide-react';
import { animateFloatingBlobs, animatePageEntrance } from '../lib/animeHelper';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const blob1Ref = useRef<HTMLDivElement | null>(null);
  const blob2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    animatePageEntrance(containerRef.current);
    animateFloatingBlobs(blob1Ref.current, blob2Ref.current);
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden pt-8 pb-6 sm:pt-12 sm:pb-8">
      {/* Background Animated Floating Blobs */}
      <div
        ref={blob1Ref}
        className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-brand-400/20 to-purple-400/20 blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        ref={blob2Ref}
        className="pointer-events-none absolute top-10 right-1/4 w-80 h-80 rounded-full bg-gradient-to-bl from-cyan-400/20 to-brand-500/20 blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 text-center">

        {/* Hero Title */}
        <h1 className="anime-entrance font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          Turn Any Link into a{' '}
          <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            Designer Work of Art
          </span>
        </h1>

        {/* Subhead */}
        <p className="anime-entrance mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Create studio-grade, scannable QR codes with curated templates, custom branding, live preview, and lossless vector & PDF exports. 100% private in your browser.
        </p>

        {/* Value Badges */}
        <div className="anime-entrance mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Zero Server Uploads</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Layers className="w-4 h-4 text-brand-500" />
            <span>Custom Frames & Cards</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Download className="w-4 h-4 text-indigo-500" />
            <span>PNG, SVG & Print PDF</span>
          </div>
        </div>
      </div>
    </div>
  );
};
