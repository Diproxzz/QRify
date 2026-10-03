import React, { useState, useEffect, useRef } from 'react';
import {
  Coffee,
  Mail,
  Store,
  ArrowRight,
  ShieldCheck,
  Download,
  LayoutGrid,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

type SceneMode = 'cafe' | 'envelope' | 'stand';

const SCENE_OPTIONS: { id: SceneMode; label: string; shortLabel: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'cafe', label: 'Cafe Mug & Steam', shortLabel: 'Cafe Mug', icon: Coffee },
  { id: 'envelope', label: 'Sliding Card Envelope', shortLabel: 'Envelope', icon: Mail },
  { id: 'stand', label: 'Restaurant Table Stand', shortLabel: 'Table Stand', icon: Store },
];

export const Hero: React.FC = () => {
  const [activeScene, setActiveScene] = useState<SceneMode>('cafe');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartXRef = useRef<number | null>(null);

  // Auto-cycle through scenes every 7 seconds unless hovered/touched
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

  const handleNextScene = () => {
    const scenes: SceneMode[] = ['cafe', 'envelope', 'stand'];
    const nextIndex = (scenes.indexOf(activeScene) + 1) % scenes.length;
    setActiveScene(scenes[nextIndex]);
  };

  const handlePrevScene = () => {
    const scenes: SceneMode[] = ['cafe', 'envelope', 'stand'];
    const prevIndex = (scenes.indexOf(activeScene) - 1 + scenes.length) % scenes.length;
    setActiveScene(scenes[prevIndex]);
  };

  // Touch swipe support for mobile users
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    setIsAutoPlaying(false);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;

    // Minimum swipe threshold 40px
    if (diff > 40) {
      handlePrevScene();
    } else if (diff < -40) {
      handleNextScene();
    }
    touchStartXRef.current = null;
    setIsAutoPlaying(true);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full pt-2 sm:pt-4 pb-2 space-y-3 sm:space-y-4">
      {/* Main 2D Animated Banner Container */}
      <div
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-premium dark:shadow-premium-dark transition-all duration-300"
      >
        {/* Subtle decorative grid and lighting */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-brand-500/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 p-4 sm:p-7 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
          {/* =========================================================================
              LEFT COLUMN: Product Copy, Scene Selector & Action Triggers
              ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-4 sm:space-y-5 text-left">
            {/* Live Animation Status Badge */}
            <div className="inline-flex items-center space-x-2 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>LIVE 2D SIMULATION</span>
              <span className="text-emerald-400 dark:text-emerald-600">•</span>
              <span className="text-[10px] sm:text-[11px] font-normal">Real-Time Scanner</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="font-display text-2xl sm:text-4xl xl:text-[2.6rem] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2]">
                QR Codes Designed for the{' '}
                <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-500 bg-clip-text text-transparent">
                  Real World
                </span>
              </h1>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Place scannable QR codes directly inside illustrated coffee cups, table stands, envelopes, and event badges. Engineered for high camera contrast and commercial print export.
              </p>
            </div>

            {/* Scene Selector Tabs (Touch-optimized on mobile with horizontal scroll) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Select 2D Scene:
                </span>
                <span className="text-[10px] text-slate-400 sm:hidden">
                  Swipe or tap scene below
                </span>
              </div>

              <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto pb-1 scrollbar-none">
                {SCENE_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isActive = activeScene === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setActiveScene(opt.id)}
                      className={`flex items-center space-x-1.5 sm:space-x-2 px-3 py-2 sm:py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border whitespace-nowrap flex-shrink-0 min-h-[40px] sm:min-h-0 ${
                        isActive
                          ? 'bg-brand-50 dark:bg-brand-950/70 text-brand-600 dark:text-brand-400 border-brand-500/40 shadow-xs ring-2 ring-brand-500/10'
                          : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="sm:hidden">{opt.shortLabel}</span>
                      <span className="hidden sm:inline">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Action Buttons (Full width on mobile, stacked) */}
            <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => scrollTo('destination-section')}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 min-h-[44px]"
              >
                <span>Generate Your QR Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo('gallery-section')}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-3 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all duration-200 min-h-[44px]"
              >
                <LayoutGrid className="w-4 h-4 text-slate-500" />
                <span>Browse 41 Templates</span>
              </button>
            </div>

            {/* Quality Badges */}
            <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">
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
              RIGHT COLUMN: SCALABLE VECTOR 2D ANIMATION VIEWPORT
              Scales smoothly from 320px mobile screens to large desktop monitors
              ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-center justify-center w-full">
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onClick={handleNextScene}
              title="Click or swipe to cycle 2D scenes"
              className="group relative w-full max-w-[420px] aspect-[4/3] rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200/70 dark:from-slate-800/80 dark:to-slate-950 border border-slate-200/90 dark:border-slate-800 shadow-inner overflow-hidden cursor-pointer select-none flex items-center justify-center p-2 sm:p-3"
            >
              {/* Desktop & Mobile Left/Right Tap Chevrons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevScene();
                }}
                aria-label="Previous scene"
                className="absolute left-2 z-30 p-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-700 dark:text-slate-200 shadow-sm opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextScene();
                }}
                aria-label="Next scene"
                className="absolute right-2 z-30 p-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-700 dark:text-slate-200 shadow-sm opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* -------------------------------------------------------------------
                  SCENE 1: CAFE MUG + RISING STEAM + PHONE SCANNER (Scalable Vector)
                  ------------------------------------------------------------------- */}
              {activeScene === 'cafe' && (
                <svg
                  viewBox="0 0 420 300"
                  className="w-full h-full max-h-[280px] sm:max-h-[300px] pointer-events-none"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="tableGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.7" />
                    </linearGradient>
                    <linearGradient id="mugGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#92400e" />
                      <stop offset="40%" stopColor="#b45309" />
                      <stop offset="100%" stopColor="#78350f" />
                    </linearGradient>
                    <linearGradient id="laserGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#34d399" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#34d399" stopOpacity="1" />
                      <stop offset="100%" stopColor="#34d399" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>

                  {/* Horizon Table surface */}
                  <rect x="0" y="210" width="420" height="90" fill="url(#tableGrad)" />

                  {/* Coaster shadow & body */}
                  <ellipse cx="130" cy="245" rx="70" ry="18" fill="rgba(0,0,0,0.18)" />
                  <ellipse cx="130" cy="240" rx="66" ry="16" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />

                  {/* Ceramic Coffee Mug Group */}
                  <g>
                    {/* Mug handle */}
                    <path
                      d="M 185 140 C 220 140, 220 195, 185 195"
                      stroke="#92400e"
                      strokeWidth="11"
                      strokeLinecap="round"
                      fill="none"
                    />

                    {/* Mug cylinder body */}
                    <path
                      d="M 80 120 L 80 205 C 80 232, 180 232, 180 205 L 180 120 Z"
                      fill="url(#mugGrad)"
                    />

                    {/* Mug top ellipse (rim + dark coffee) */}
                    <ellipse cx="130" cy="120" rx="50" ry="14" fill="#78350f" stroke="#b45309" strokeWidth="2" />
                    <ellipse cx="130" cy="120" rx="44" ry="11" fill="#1c1109" />

                    {/* Specular gloss highlight on ceramic */}
                    <path
                      d="M 94 135 C 92 160, 92 185, 94 210"
                      stroke="rgba(255,255,255,0.25)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Embedded QR Code label on mug body */}
                    <g transform="translate(100, 138)">
                      <rect x="0" y="0" width="60" height="60" rx="8" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))" />
                      {/* Realistic vector QR modules */}
                      <g fill="#0f172a">
                        {/* Finder 1 */}
                        <rect x="4" y="4" width="18" height="18" rx="2" />
                        <rect x="8" y="8" width="10" height="10" rx="1" fill="#ffffff" />
                        <rect x="10" y="10" width="6" height="6" rx="0.5" />
                        {/* Finder 2 */}
                        <rect x="38" y="4" width="18" height="18" rx="2" />
                        <rect x="42" y="8" width="10" height="10" rx="1" fill="#ffffff" />
                        <rect x="44" y="10" width="6" height="6" rx="0.5" />
                        {/* Finder 3 */}
                        <rect x="4" y="38" width="18" height="18" rx="2" />
                        <rect x="8" y="42" width="10" height="10" rx="1" fill="#ffffff" />
                        <rect x="10" y="44" width="6" height="6" rx="0.5" />
                        {/* Matrix data bits */}
                        <rect x="25" y="8" width="4" height="4" rx="0.5" />
                        <rect x="25" y="16" width="4" height="4" rx="0.5" />
                        <rect x="8" y="26" width="4" height="4" rx="0.5" />
                        <rect x="16" y="26" width="4" height="4" rx="0.5" />
                        <rect x="25" y="25" width="10" height="10" rx="1" />
                        <rect x="40" y="26" width="4" height="4" rx="0.5" />
                        <rect x="48" y="26" width="4" height="4" rx="0.5" />
                        <rect x="25" y="42" width="4" height="4" rx="0.5" />
                        <rect x="33" y="42" width="4" height="4" rx="0.5" />
                        <rect x="42" y="42" width="6" height="6" rx="0.5" />
                        <rect x="50" y="50" width="6" height="6" rx="0.5" />
                      </g>
                      <text x="30" y="56" fill="#78350f" fontSize="4.5" fontWeight="bold" textAnchor="middle">
                        CAFE MENU
                      </text>
                    </g>

                    {/* Realistic Rising Steam 2D Animation */}
                    <path
                      d="M 120 100 C 128 80, 110 60, 122 35 C 130 18, 124 5, 128 -10"
                      stroke="rgba(255,255,255,0.7)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      className="animate-steam-1"
                    />
                    <path
                      d="M 142 100 C 134 78, 150 56, 138 32 C 130 14, 140 2, 136 -12"
                      stroke="rgba(255,255,255,0.7)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="animate-steam-2"
                    />
                  </g>

                  {/* Smartphone Scanner (Handheld Float Motion) */}
                  <g className="animate-phone-float" transform="translate(240, 35)">
                    {/* Phone Shadow */}
                    <rect x="8" y="10" width="130" height="225" rx="26" fill="rgba(0,0,0,0.3)" />

                    {/* Phone Chassis */}
                    <rect x="0" y="0" width="130" height="225" rx="24" fill="#0f172a" stroke="#334155" strokeWidth="3" />

                    {/* Dynamic Island Notch */}
                    <rect x="45" y="8" width="40" height="9" rx="4.5" fill="#000000" />

                    {/* Screen Viewfinder */}
                    <rect x="6" y="24" width="118" height="175" rx="16" fill="#020617" />

                    {/* Viewfinder Reticle Corners */}
                    <path d="M 22 55 L 32 55 M 22 55 L 22 65" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M 108 55 L 98 55 M 108 55 L 108 65" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M 22 155 L 32 155 M 22 155 L 22 145" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M 108 155 L 98 155 M 108 155 L 108 145" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />

                    {/* Radar Pulse Wave */}
                    <circle cx="65" cy="105" r="24" stroke="#34d399" strokeWidth="1.8" fill="none" className="animate-radar-ping" />

                    {/* Sweeping Green Laser Beam */}
                    <rect x="15" y="45" width="100" height="2" fill="url(#laserGrad)" className="animate-laser-scan" />

                    {/* QR Preview on Phone Screen */}
                    <rect x="42" y="82" width="46" height="46" rx="6" fill="rgba(255,255,255,0.9)" />
                    <g fill="#020617" transform="translate(42, 82)">
                      <rect x="4" y="4" width="12" height="12" rx="1.5" />
                      <rect x="6" y="6" width="8" height="8" rx="1" fill="#ffffff" />
                      <rect x="8" y="8" width="4" height="4" />
                      <rect x="30" y="4" width="12" height="12" rx="1.5" />
                      <rect x="32" y="6" width="8" height="8" rx="1" fill="#ffffff" />
                      <rect x="34" y="8" width="4" height="4" />
                      <rect x="4" y="30" width="12" height="12" rx="1.5" />
                      <rect x="6" y="32" width="8" height="8" rx="1" fill="#ffffff" />
                      <rect x="8" y="34" width="4" height="4" />
                      <rect x="20" y="20" width="8" height="8" rx="1" />
                    </g>

                    {/* Sliding Captured Toast Notification */}
                    <g className="animate-phone-toast" transform="translate(10, 32)">
                      <rect x="0" y="0" width="110" height="20" rx="6" fill="#10b981" />
                      <text x="55" y="13.5" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">
                        ✓ Open: CafeMenu.pdf
                      </text>
                    </g>

                    {/* Bottom HUD bar */}
                    <text x="20" y="213" fill="#34d399" fontSize="6.5" fontFamily="monospace">ISO 18004</text>
                    <circle cx="65" cy="210" r="5" stroke="#475569" strokeWidth="1" fill="rgba(255,255,255,0.1)" />
                    <text x="110" y="213" fill="#64748b" fontSize="6.5">1x</text>
                  </g>
                </svg>
              )}

              {/* -------------------------------------------------------------------
                  SCENE 2: SLIDING INVITATION ENVELOPE (Scalable Vector)
                  ------------------------------------------------------------------- */}
              {activeScene === 'envelope' && (
                <svg
                  viewBox="0 0 420 300"
                  className="w-full h-full max-h-[280px] sm:max-h-[300px] pointer-events-none"
                  fill="none"
                >
                  {/* Table Surface */}
                  <rect x="0" y="210" width="420" height="90" fill="#cbd5e1" opacity="0.4" />

                  {/* Envelope Base Shadow */}
                  <rect x="95" y="115" width="230" height="150" rx="18" fill="rgba(0,0,0,0.18)" filter="blur(6px)" />

                  {/* Envelope Back Body */}
                  <rect x="95" y="110" width="230" height="150" rx="16" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />

                  {/* Envelope Open Flap Top */}
                  <path d="M 95 110 L 210 40 L 325 110 Z" fill="#334155" opacity="0.8" />

                  {/* Sliding Invitation Card (Animated Up & Down) */}
                  <g className="animate-card-slide">
                    <rect
                      x="115"
                      y="60"
                      width="190"
                      height="150"
                      rx="12"
                      fill="#ffffff"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      filter="drop-shadow(0 8px 16px rgba(0,0,0,0.15))"
                    />
                    <text x="210" y="82" fill="#b45309" fontSize="8.5" fontWeight="bold" letterSpacing="1.5" textAnchor="middle">
                      ANNUAL GALA 2026
                    </text>
                    <line x1="135" y1="88" x2="285" y2="88" stroke="#fde68a" strokeWidth="1.5" />

                    {/* QR Code Graphic on Pass */}
                    <g transform="translate(170, 96)">
                      <rect x="0" y="0" width="80" height="80" rx="8" fill="#ffffff" />
                      <g fill="#0f172a">
                        <rect x="4" y="4" width="22" height="22" rx="3" />
                        <rect x="8" y="8" width="14" height="14" rx="2" fill="#ffffff" />
                        <rect x="11" y="11" width="8" height="8" rx="1" />
                        <rect x="54" y="4" width="22" height="22" rx="3" />
                        <rect x="58" y="8" width="14" height="14" rx="2" fill="#ffffff" />
                        <rect x="61" y="11" width="8" height="8" rx="1" />
                        <rect x="4" y="54" width="22" height="22" rx="3" />
                        <rect x="8" y="58" width="14" height="14" rx="2" fill="#ffffff" />
                        <rect x="11" y="61" width="8" height="8" rx="1" />
                        <rect x="34" y="34" width="12" height="12" rx="1.5" />
                        <rect x="54" y="54" width="10" height="10" rx="1" />
                        <rect x="66" y="66" width="10" height="10" rx="1" />
                      </g>
                    </g>
                    <text x="210" y="195" fill="#64748b" fontSize="7" fontWeight="bold" textAnchor="middle">
                      SCAN FOR VIP ENTRANCE
                    </text>
                  </g>

                  {/* Envelope Front Pocket Lower Cover */}
                  <path d="M 95 160 L 210 215 L 325 160 L 325 260 L 95 260 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
                  <path d="M 95 260 L 210 185 L 325 260 Z" fill="#1e293b" opacity="0.6" />

                  {/* Rotating Optical HUD Scan Reticle */}
                  <g transform="translate(210, 136)">
                    <circle cx="0" cy="0" r="48" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="6 4" className="animate-hud-spin" />
                    <circle cx="0" cy="0" r="30" stroke="#38bdf8" strokeWidth="1.5" className="animate-radar-ping" />
                  </g>

                  {/* Verified Toast Badge */}
                  <g className="animate-phone-toast" transform="translate(145, 230)">
                    <rect x="0" y="0" width="130" height="22" rx="7" fill="#3b82f6" />
                    <text x="65" y="14" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                      ✓ VIP Pass Verified • Table 12
                    </text>
                  </g>
                </svg>
              )}

              {/* -------------------------------------------------------------------
                  SCENE 3: RESTAURANT TABLE STAND (Scalable Vector)
                  ------------------------------------------------------------------- */}
              {activeScene === 'stand' && (
                <svg
                  viewBox="0 0 420 300"
                  className="w-full h-full max-h-[280px] sm:max-h-[300px] pointer-events-none"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="acrylicGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="posterGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#059669" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                  </defs>

                  {/* Stand Weighted Base */}
                  <rect x="110" y="240" width="200" height="22" rx="11" fill="#475569" stroke="#64748b" strokeWidth="2" />
                  <rect x="140" y="245" width="140" height="4" rx="2" fill="#334155" />

                  {/* Clear Acrylic Beveled Upright Panel */}
                  <rect
                    x="130"
                    y="45"
                    width="160"
                    height="200"
                    rx="14"
                    fill="url(#acrylicGrad)"
                    stroke="rgba(255,255,255,0.7)"
                    strokeWidth="3"
                    filter="drop-shadow(0 10px 20px rgba(0,0,0,0.2))"
                  />

                  {/* Printed Poster Insert */}
                  <g transform="translate(140, 55)">
                    <rect x="0" y="0" width="140" height="180" rx="10" fill="url(#posterGrad)" />

                    <text x="70" y="24" fill="#ffffff" fontSize="9" fontWeight="extrabold" textAnchor="middle" letterSpacing="1">
                      GOOGLE REVIEW
                    </text>
                    <text x="70" y="36" fill="#a7f3d0" fontSize="6.5" textAnchor="middle">
                      Scan to rate our restaurant
                    </text>

                    {/* QR Code */}
                    <g transform="translate(30, 46)">
                      <rect x="0" y="0" width="80" height="80" rx="8" fill="#ffffff" />
                      <g fill="#0f172a">
                        <rect x="4" y="4" width="22" height="22" rx="3" />
                        <rect x="8" y="8" width="14" height="14" rx="2" fill="#ffffff" />
                        <rect x="11" y="11" width="8" height="8" rx="1" />
                        <rect x="54" y="4" width="22" height="22" rx="3" />
                        <rect x="58" y="8" width="14" height="14" rx="2" fill="#ffffff" />
                        <rect x="61" y="11" width="8" height="8" rx="1" />
                        <rect x="4" y="54" width="22" height="22" rx="3" />
                        <rect x="8" y="58" width="14" height="14" rx="2" fill="#ffffff" />
                        <rect x="11" y="61" width="8" height="8" rx="1" />
                        <rect x="34" y="34" width="12" height="12" rx="1.5" />
                        <rect x="54" y="54" width="10" height="10" rx="1" />
                        <rect x="66" y="66" width="10" height="10" rx="1" />
                      </g>
                    </g>

                    {/* Rating stars */}
                    <text x="70" y="145" fill="#fde047" fontSize="10" textAnchor="middle">
                      ★★★★★
                    </text>
                    <text x="70" y="160" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">
                      5.0 STAR RATED
                    </text>
                  </g>

                  {/* Sweeping Laser Beam across Stand */}
                  <rect x="135" y="60" width="150" height="2" fill="#34d399" className="animate-laser-scan" />

                  {/* Notification Toast */}
                  <g className="animate-phone-toast" transform="translate(145, 15)">
                    <rect x="0" y="0" width="130" height="22" rx="7" fill="#059669" />
                    <text x="65" y="14" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                      ✓ Review Form Loaded • 5 Stars
                    </text>
                  </g>
                </svg>
              )}

              {/* Scene Indicator Dots at Bottom of Viewport */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 z-20 bg-slate-900/60 dark:bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full">
                {SCENE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveScene(opt.id);
                    }}
                    aria-label={`Switch to ${opt.label}`}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeScene === opt.id ? 'bg-brand-400 w-4' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continuous Animated Marquee Ticker Strip (Optimized for Mobile) */}
      <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800/60 py-2 sm:py-2.5 px-2">
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
              className="inline-flex items-center mx-2 sm:mx-3 text-[11px] sm:text-xs font-medium text-slate-600 dark:text-slate-300"
            >
              <span>{item}</span>
              <span className="mx-2 sm:mx-3 text-slate-300 dark:text-slate-700 font-bold">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
