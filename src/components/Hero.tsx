import React, { useState, useEffect } from 'react';
import {
  Coffee,
  Mail,
  Store,
  ArrowRight,
  ShieldCheck,
  Download,
  LayoutGrid,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

type SceneMode = 'cafe' | 'envelope' | 'stand';

export const Hero: React.FC = () => {
  const [activeScene, setActiveScene] = useState<SceneMode>('cafe');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-cycle through scenes every 7 seconds unless hovered/interacted with
  useEffect(() => {
    if (!isAutoPlaying) return;

    const scenes: SceneMode[] = ['cafe', 'envelope', 'stand'];
    const interval = setInterval(() => {
      setActiveScene((current) => {
        const nextIndex = (scenes.indexOf(current) + 1) % scenes.length;
        return scenes[nextIndex];
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full pt-4 pb-2 space-y-4">
      {/* Main 2D Animated Banner Container */}
      <div
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="relative w-full overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-premium dark:shadow-premium-dark transition-all duration-300"
      >
        {/* Subtle decorative grid and lighting */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-500/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* =========================================================================
              LEFT COLUMN: Product Copy, Scene Selector & Action Triggers
              ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-5 text-left">
            {/* Live Animation Status Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>LIVE 2D SCENE SIMULATION</span>
              <span className="text-emerald-400 dark:text-emerald-600">•</span>
              <span className="text-[11px] font-normal">Interactive Scanner</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="font-display text-2xl sm:text-4xl xl:text-[2.6rem] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.18]">
                QR Codes Designed for the{' '}
                <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-500 bg-clip-text text-transparent">
                  Real World
                </span>
              </h1>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Place scannable QR codes directly inside illustrated coffee cups, table stands, envelopes, and event badges. Engineered for high camera contrast and commercial print export.
              </p>
            </div>

            {/* Scene Selector Tabs (Interactive 2D Scene Switcher) */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Choose 2D Animated Scene:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveScene('cafe')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                    activeScene === 'cafe'
                      ? 'bg-brand-50 dark:bg-brand-950/70 text-brand-600 dark:text-brand-400 border-brand-500/40 shadow-xs ring-2 ring-brand-500/10'
                      : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Coffee className="w-3.5 h-3.5 text-amber-500" />
                  <span>Cafe Mug & Steam</span>
                </button>

                <button
                  onClick={() => setActiveScene('envelope')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                    activeScene === 'envelope'
                      ? 'bg-brand-50 dark:bg-brand-950/70 text-brand-600 dark:text-brand-400 border-brand-500/40 shadow-xs ring-2 ring-brand-500/10'
                      : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Sliding Card Envelope</span>
                </button>

                <button
                  onClick={() => setActiveScene('stand')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                    activeScene === 'stand'
                      ? 'bg-brand-50 dark:bg-brand-950/70 text-brand-600 dark:text-brand-400 border-brand-500/40 shadow-xs ring-2 ring-brand-500/10'
                      : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Store className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Restaurant Table Stand</span>
                </button>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollTo('destination-section')}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
              >
                <span>Generate Your QR Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo('gallery-section')}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all duration-200"
              >
                <LayoutGrid className="w-4 h-4 text-slate-500" />
                <span>Browse 41 Templates</span>
              </button>
            </div>

            {/* Quality Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>ISO/IEC 18004 Scannable</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
                <span>100% Client-Side Engine</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Download className="w-3.5 h-3.5 text-indigo-500" />
                <span>SVG, PNG 4K & Print PDF</span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: REALISTIC 2D ANIMATED ILLUSTRATION VIEWPORT
              ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200/70 dark:from-slate-800/80 dark:to-slate-950 border border-slate-200/90 dark:border-slate-800 shadow-inner overflow-hidden flex items-center justify-center p-4">
              {/* Background table ambient shadow / lighting */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-300/40 dark:from-slate-950/80 to-transparent" />

              {/* -------------------------------------------------------------------
                  SCENE 1: CAFE MUG + RISING STEAM + PHONE SCANNER
                  ------------------------------------------------------------------- */}
              {activeScene === 'cafe' && (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Wooden / Slate Coaster */}
                  <div className="absolute bottom-10 left-10 w-44 h-12 rounded-[50%] bg-slate-300 dark:bg-slate-700/60 shadow-md border border-slate-400/30" />

                  {/* Ceramic Coffee Mug */}
                  <div className="absolute bottom-14 left-14 w-36 h-36">
                    {/* Mug Handle */}
                    <div className="absolute top-8 -right-6 w-12 h-20 rounded-r-3xl border-8 border-amber-800 dark:border-amber-700 shadow-sm" />

                    {/* Mug Cylinder Body */}
                    <div className="relative w-full h-full rounded-b-3xl bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 dark:from-amber-800 dark:via-amber-700 dark:to-amber-900 shadow-xl overflow-hidden border border-amber-900/40 flex flex-col items-center">
                      {/* Mug Top Lip (Coffee Liquid inside) */}
                      <div className="w-full h-8 rounded-[50%] bg-stone-900 border-2 border-amber-600/60 shadow-inner flex items-center justify-center overflow-hidden">
                        <div className="w-28 h-6 rounded-[50%] bg-[#2a170d] opacity-90" />
                      </div>

                      {/* Ceramic Specular Highlight */}
                      <div className="absolute top-4 left-3 w-3 h-28 rounded-full bg-white/20 blur-[1px]" />

                      {/* Embedded QR Code Label on Mug */}
                      <div className="mt-2 w-20 h-20 bg-white rounded-xl shadow-md p-1.5 flex flex-col items-center justify-center border border-amber-900/20">
                        {/* Live Stylized Vector QR Pattern */}
                        <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                          {/* Corner Finder 1 */}
                          <rect x="5" y="5" width="28" height="28" rx="4" fill="currentColor" />
                          <rect x="11" y="11" width="16" height="16" rx="2" fill="white" />
                          <rect x="15" y="15" width="8" height="8" rx="1" fill="currentColor" />
                          {/* Corner Finder 2 */}
                          <rect x="67" y="5" width="28" height="28" rx="4" fill="currentColor" />
                          <rect x="73" y="11" width="16" height="16" rx="2" fill="white" />
                          <rect x="77" y="15" width="8" height="8" rx="1" fill="currentColor" />
                          {/* Corner Finder 3 */}
                          <rect x="5" y="67" width="28" height="28" rx="4" fill="currentColor" />
                          <rect x="11" y="73" width="16" height="16" rx="2" fill="white" />
                          <rect x="15" y="77" width="8" height="8" rx="1" fill="currentColor" />
                          {/* QR Data Matrix modules */}
                          <rect x="42" y="10" width="8" height="8" rx="1" />
                          <rect x="52" y="10" width="8" height="8" rx="1" />
                          <rect x="42" y="24" width="8" height="8" rx="1" />
                          <rect x="10" y="42" width="8" height="8" rx="1" />
                          <rect x="24" y="42" width="8" height="8" rx="1" />
                          <rect x="42" y="42" width="16" height="16" rx="2" />
                          <rect x="70" y="42" width="8" height="8" rx="1" />
                          <rect x="84" y="42" width="8" height="8" rx="1" />
                          <rect x="42" y="70" width="8" height="8" rx="1" />
                          <rect x="54" y="70" width="8" height="8" rx="1" />
                          <rect x="70" y="70" width="10" height="10" rx="1" />
                          <rect x="82" y="82" width="10" height="10" rx="1" />
                        </svg>
                      </div>
                      <span className="text-[8px] font-bold text-amber-100 tracking-wider uppercase mt-0.5">
                        Cafe Menu
                      </span>
                    </div>

                    {/* Realistic Rising Steam 2D Curves */}
                    <div className="absolute -top-12 left-6 pointer-events-none">
                      <svg className="w-16 h-20 overflow-visible text-white/70 dark:text-stone-300/60" viewBox="0 0 40 60" fill="none">
                        <path
                          d="M10 50 C 15 40, 5 30, 12 15 C 16 5, 12 0, 14 -10"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          className="animate-steam-1"
                        />
                        <path
                          d="M24 50 C 18 38, 28 28, 22 14 C 18 4, 24 -2, 22 -12"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          className="animate-steam-2"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Realistic Smartphone Scanner (Floating Handheld Motion) */}
                  <div className="absolute top-6 right-6 w-44 h-72 rounded-[2.2rem] bg-slate-900 border-4 border-slate-700/80 shadow-2xl p-2.5 flex flex-col justify-between overflow-hidden animate-phone-float z-20">
                    {/* Phone Dynamic Island / Camera Notch */}
                    <div className="mx-auto w-14 h-3.5 bg-black rounded-full flex items-center justify-center space-x-1.5 z-30">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                      <div className="w-1 h-1 rounded-full bg-blue-900" />
                    </div>

                    {/* Camera Viewfinder Screen */}
                    <div className="relative flex-1 rounded-2xl bg-slate-950 overflow-hidden flex items-center justify-center mt-1 border border-slate-800">
                      {/* Viewfinder Target Reticle Corner Brackets */}
                      <div className="absolute inset-4 border-2 border-dashed border-emerald-400/40 rounded-xl pointer-events-none" />
                      <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-emerald-400" />
                      <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-emerald-400" />
                      <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-emerald-400" />
                      <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-emerald-400" />

                      {/* Concentric Scanner Radar Wave */}
                      <div className="absolute w-16 h-16 rounded-full border-2 border-emerald-400/80 animate-radar-ping pointer-events-none" />

                      {/* Active Sweeping Laser Beam (Continuous 2D Animation) */}
                      <div className="absolute left-2 right-2 h-0.5 bg-emerald-400 shadow-[0_0_12px_#34d399] animate-laser-scan z-10" />

                      {/* Target QR inside viewfinder */}
                      <div className="w-16 h-16 bg-white/90 rounded-lg p-1.5 shadow-inner opacity-80">
                        <svg className="w-full h-full text-slate-950" viewBox="0 0 100 100" fill="currentColor">
                          <rect x="5" y="5" width="28" height="28" rx="3" />
                          <rect x="12" y="12" width="14" height="14" rx="2" fill="white" />
                          <rect x="16" y="16" width="6" height="6" rx="1" />
                          <rect x="67" y="5" width="28" height="28" rx="3" />
                          <rect x="74" y="12" width="14" height="14" rx="2" fill="white" />
                          <rect x="78" y="16" width="6" height="6" rx="1" />
                          <rect x="5" y="67" width="28" height="28" rx="3" />
                          <rect x="12" y="74" width="14" height="14" rx="2" fill="white" />
                          <rect x="16" y="78" width="6" height="6" rx="1" />
                          <rect x="44" y="44" width="14" height="14" rx="2" />
                        </svg>
                      </div>

                      {/* Live Sliding Toast Notification (Simulates real scan capture) */}
                      <div className="absolute top-2 inset-x-2 p-1.5 rounded-lg bg-emerald-500/95 text-white text-[9px] font-semibold flex items-center space-x-1.5 shadow-lg animate-phone-toast z-20 backdrop-blur-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">Open: CafeMenu.pdf</span>
                      </div>
                    </div>

                    {/* Camera Shutter Bar */}
                    <div className="py-1 flex items-center justify-around text-slate-400 text-[10px]">
                      <span className="text-emerald-400 font-mono text-[9px]">ISO 18004</span>
                      <div className="w-5 h-5 rounded-full border border-slate-600 bg-white/10" />
                      <span className="text-slate-400 text-[9px]">1x</span>
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------------
                  SCENE 2: SLIDING INVITATION ENVELOPE + HUD SCANNER
                  ------------------------------------------------------------------- */}
              {activeScene === 'envelope' && (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Luxury Envelope Body */}
                  <div className="relative w-56 h-40 rounded-2xl bg-slate-800 dark:bg-slate-900 border-2 border-indigo-500/40 shadow-2xl flex flex-col justify-end p-3">
                    {/* Open Flap Shadow */}
                    <div className="absolute -top-10 inset-x-0 h-14 bg-slate-700 dark:bg-slate-800 rounded-t-3xl border-t-2 border-indigo-400/30 transform -rotate-1 origin-bottom opacity-80" />

                    {/* Sliding VIP Card (Animated Up & Down) */}
                    <div className="absolute -top-12 left-4 right-4 h-44 rounded-xl bg-gradient-to-b from-amber-50 to-white dark:from-slate-800 dark:to-slate-900 border-2 border-amber-400/60 shadow-xl p-3 flex flex-col items-center justify-between animate-card-slide z-10">
                      <div className="w-full flex items-center justify-between border-b border-amber-300/40 pb-1">
                        <span className="text-[8px] font-bold tracking-widest uppercase text-amber-700 dark:text-amber-400">
                          ANNUAL GALA 2026
                        </span>
                        <span className="text-[8px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          VIP PASS
                        </span>
                      </div>

                      {/* Scannable High-Contrast QR */}
                      <div className="w-20 h-20 bg-white rounded-lg p-1.5 shadow-sm border border-slate-200">
                        <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                          <rect x="5" y="5" width="28" height="28" rx="4" />
                          <rect x="11" y="11" width="16" height="16" rx="2" fill="white" />
                          <rect x="15" y="15" width="8" height="8" rx="1" />
                          <rect x="67" y="5" width="28" height="28" rx="4" />
                          <rect x="73" y="11" width="16" height="16" rx="2" fill="white" />
                          <rect x="77" y="15" width="8" height="8" rx="1" />
                          <rect x="5" y="67" width="28" height="28" rx="4" />
                          <rect x="11" y="73" width="16" height="16" rx="2" fill="white" />
                          <rect x="15" y="77" width="8" height="8" rx="1" />
                          <rect x="42" y="42" width="16" height="16" rx="2" />
                          <rect x="70" y="70" width="12" height="12" rx="1" />
                        </svg>
                      </div>

                      <span className="text-[8px] font-semibold text-slate-500">
                        Scan at Reception Table
                      </span>
                    </div>

                    {/* Envelope Lower Pocket */}
                    <div className="relative z-20 w-full h-16 bg-slate-900/90 dark:bg-slate-950 rounded-b-xl border-t border-indigo-400/30 flex items-center justify-between px-3">
                      <span className="text-[9px] font-mono text-slate-400">ENVELOPE SCENE #01</span>
                      <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-400/30">
                        PRINT READY
                      </span>
                    </div>
                  </div>

                  {/* Optical HUD Target Reticle (Spinning 2D Ring) */}
                  <div className="absolute top-6 right-8 w-24 h-24 rounded-full border border-dashed border-indigo-400/40 animate-hud-spin pointer-events-none" />
                  <div className="absolute top-10 right-12 w-16 h-16 rounded-full border-2 border-indigo-400 animate-radar-ping pointer-events-none" />
                </div>
              )}

              {/* -------------------------------------------------------------------
                  SCENE 3: ACRYLIC TABLE STAND + LIVE SCAN BEAM
                  ------------------------------------------------------------------- */}
              {activeScene === 'stand' && (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Heavy Aluminum / Wood Stand Base */}
                  <div className="absolute bottom-8 w-52 h-8 rounded-xl bg-gradient-to-r from-slate-400 via-slate-300 to-slate-500 dark:from-slate-700 dark:via-slate-600 dark:to-slate-800 shadow-xl border border-slate-300 dark:border-slate-600 flex items-center justify-center">
                    <div className="w-40 h-2 bg-slate-600 dark:bg-slate-900 rounded-full" />
                  </div>

                  {/* Clear Acrylic Beveled Upright Panel */}
                  <div className="relative bottom-4 w-44 h-56 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-2 border-white/80 dark:border-slate-600 shadow-2xl p-2.5 flex flex-col justify-between overflow-hidden">
                    {/* Bevel Highlight Reflection Streak */}
                    <div className="absolute -top-10 -left-10 w-24 h-72 bg-gradient-to-r from-transparent via-white/30 to-transparent transform rotate-45 pointer-events-none" />

                    {/* Printed Paper Insert */}
                    <div className="w-full h-full rounded-xl bg-gradient-to-b from-emerald-500 to-teal-700 p-2.5 flex flex-col items-center justify-between text-white shadow-md">
                      <div className="text-center">
                        <div className="text-[10px] font-extrabold tracking-wider uppercase">
                          REVIEW OUR HOTEL
                        </div>
                        <div className="text-[8px] text-emerald-100">
                          Scan to leave a Google Review
                        </div>
                      </div>

                      {/* QR Display */}
                      <div className="w-24 h-24 bg-white rounded-xl p-2 shadow-lg">
                        <svg className="w-full h-full text-slate-950" viewBox="0 0 100 100" fill="currentColor">
                          <rect x="5" y="5" width="28" height="28" rx="4" />
                          <rect x="11" y="11" width="16" height="16" rx="2" fill="white" />
                          <rect x="15" y="15" width="8" height="8" rx="1" />
                          <rect x="67" y="5" width="28" height="28" rx="4" />
                          <rect x="73" y="11" width="16" height="16" rx="2" fill="white" />
                          <rect x="77" y="15" width="8" height="8" rx="1" />
                          <rect x="5" y="67" width="28" height="28" rx="4" />
                          <rect x="11" y="73" width="16" height="16" rx="2" fill="white" />
                          <rect x="15" y="77" width="8" height="8" rx="1" />
                          <rect x="42" y="42" width="16" height="16" rx="2" />
                          <rect x="70" y="70" width="12" height="12" rx="1" />
                        </svg>
                      </div>

                      <div className="flex items-center space-x-1 text-[8px] font-bold text-emerald-200">
                        <span>★★★★★</span>
                        <span>5.0 RATED</span>
                      </div>
                    </div>

                    {/* Continuous Laser Scanning Beam across Stand */}
                    <div className="absolute inset-x-2 h-0.5 bg-emerald-300 shadow-[0_0_12px_#34d399] animate-laser-scan z-10" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Continuous Animated Marquee Ticker Strip */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800/60 py-2.5 px-2">
        <div className="flex animate-marquee whitespace-nowrap">
          {[
            '☕ Cafe Coffee Mugs & Menus',
            '🛍️ Kraft Shopping Totes',
            '🎟️ VIP Event Passes',
            '🏨 Hotel Review Table Stands',
            '💼 Executive Desk Cards',
            '📦 Courier Delivery Boxes',
            '🏷️ Retail Price Tags',
            '💻 Laptop Displays',
            '📄 Print-Ready A4 PDF',
            '🔒 100% Client-Side Engine',
            '⚡ Instant Camera Recognition',
            '📐 Lossless Vector SVG',
            '☕ Cafe Coffee Mugs & Menus',
            '🛍️ Kraft Shopping Totes',
            '🎟️ VIP Event Passes',
            '🏨 Hotel Review Table Stands',
            '💼 Executive Desk Cards',
            '📦 Courier Delivery Boxes',
            '🏷️ Retail Price Tags',
            '💻 Laptop Displays',
            '📄 Print-Ready A4 PDF',
            '🔒 100% Client-Side Engine',
            '⚡ Instant Camera Recognition',
            '📐 Lossless Vector SVG',
          ].map((item, index) => (
            <div
              key={index}
              className="inline-flex items-center mx-3 text-xs font-medium text-slate-600 dark:text-slate-300"
            >
              <span>{item}</span>
              <span className="mx-3 text-slate-300 dark:text-slate-700 font-bold">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
