import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Download,
  ShieldCheck,
  Smartphone,
  ArrowRight,
  QrCode,
  FileCode,
  Check,
  Layers,
  Zap,
} from 'lucide-react';

interface BannerSlide {
  id: string;
  badge: string;
  badgeIcon: React.FC<{ className?: string }>;
  title: string;
  highlight: string;
  description: string;
  ctaText: string;
  targetId: string;
  theme: {
    badgeBg: string;
    border: string;
    gradient: string;
    glow: string;
    accent: string;
    btnBg: string;
  };
  features: string[];
}

const BANNERS: BannerSlide[] = [
  {
    id: 'templates',
    badge: 'COLLECTION • 41 SCENES',
    badgeIcon: LayoutGrid,
    title: 'Contextual Marketing Scenes',
    highlight: 'for Real-World Touchpoints',
    description:
      'Seamlessly embed scannable QR codes inside illustrated coffee mugs, desk stands, dining receipts, event passes, and storefront signs that customers actually scan.',
    ctaText: 'Explore 41 Scene Templates',
    targetId: 'gallery-section',
    theme: {
      badgeBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      border: 'border-blue-500/20 dark:border-blue-500/30',
      gradient: 'from-blue-600/10 via-indigo-600/5 to-transparent',
      glow: 'shadow-blue-500/10',
      accent: 'text-blue-600 dark:text-blue-400',
      btnBg: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    features: ['41 Illustrated Mockups', '9 Industry Categories', 'Custom Slot Text'],
  },
  {
    id: 'export',
    badge: 'PRINT & PRODUCTION READY',
    badgeIcon: Download,
    title: 'Lossless Vector SVG & Print PDF',
    highlight: 'Commercial Grade Output',
    description:
      'Download razor-sharp vector SVGs for print shops and signage, high-DPI raster PNGs up to 4096px, or print-ready A4 flyer PDF documents in one click.',
    ctaText: 'View Export Options',
    targetId: 'customization-section',
    theme: {
      badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      border: 'border-emerald-500/20 dark:border-emerald-500/30',
      gradient: 'from-emerald-600/10 via-teal-600/5 to-transparent',
      glow: 'shadow-emerald-500/10',
      accent: 'text-emerald-600 dark:text-emerald-400',
      btnBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
    features: ['Vector SVG Lossless', 'High-Res PNG (1024–4096px)', 'A4 Flyer PDF Format'],
  },
  {
    id: 'privacy',
    badge: 'PRIVACY & SECURITY',
    badgeIcon: ShieldCheck,
    title: '100% Client-Side Engine',
    highlight: 'Zero Server Telemetry',
    description:
      'Your URLs, Wi-Fi credentials, business cards, and uploaded brand logos are rendered entirely in your browser. Nothing is ever sent to or stored on an external server.',
    ctaText: 'Generate Live QR Code',
    targetId: 'destination-section',
    theme: {
      badgeBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      border: 'border-indigo-500/20 dark:border-indigo-500/30',
      gradient: 'from-indigo-600/10 via-purple-600/5 to-transparent',
      glow: 'shadow-indigo-500/10',
      accent: 'text-indigo-600 dark:text-indigo-400',
      btnBg: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    },
    features: ['Zero Server Tracking', 'Offline Processing', 'Local Browser Storage'],
  },
  {
    id: 'contrast',
    badge: 'RELIABILITY STANDARD',
    badgeIcon: Smartphone,
    title: 'Guaranteed Phone Scannability',
    highlight: 'ISO/IEC 18004 Standard',
    description:
      'Real-time luminance ratio checks and automatic quiet zones ensure immediate recognition on iOS Camera, Google Lens, and handheld commercial barcode readers.',
    ctaText: 'Test Camera Scannability',
    targetId: 'destination-section',
    theme: {
      badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      border: 'border-amber-500/20 dark:border-amber-500/30',
      gradient: 'from-amber-600/10 via-orange-600/5 to-transparent',
      glow: 'shadow-amber-500/10',
      accent: 'text-amber-600 dark:text-amber-400',
      btnBg: 'bg-amber-600 hover:bg-amber-700 text-white',
    },
    features: ['Real-Time Contrast Checks', 'iOS & Android Tested', 'Quiet Zone Enforced'],
  },
];

const MARQUEE_ITEMS = [
  '☕ Cafe & Restaurant Menus',
  '🛍️ Kraft Shopping Totes',
  '🎟️ VIP Event Tickets',
  '🏨 Hotel Review Stands',
  '💼 Executive Desk Cards',
  '📦 Courier Delivery Boxes',
  '🏷️ Retail Price Tags',
  '💻 Laptop Display Badges',
  '📄 Print-Ready A4 PDF',
  '🔒 100% Client-Side Engine',
  '⚡ Instant Camera Scans',
  '📐 Lossless Vector SVG',
];

export const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const autoPlayDuration = 6000; // 6 seconds per slide

  // Auto-slide with progress bar
  useEffect(() => {
    if (isPaused) return;

    const intervalStep = 50;
    const stepIncrement = (intervalStep / autoPlayDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((idx) => (idx + 1) % BANNERS.length);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
    setProgress(0);
  };

  const handleSelectSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const handleCtaClick = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentBanner = BANNERS[currentIndex];
  const BadgeIcon = currentBanner.badgeIcon;

  return (
    <div className="relative w-full pt-4 pb-2 space-y-4">
      {/* Main Animated Banner Card */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className={`relative w-full overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border ${currentBanner.theme.border} shadow-premium dark:shadow-premium-dark transition-all duration-500`}
      >
        {/* Subtle background glow */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${currentBanner.theme.gradient} opacity-70 pointer-events-none transition-colors duration-700`}
        />

        {/* Top Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-800 z-20">
          <div
            className="h-full bg-gradient-to-r from-brand-500 to-indigo-600 transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Banner Content Grid */}
        <div className="relative z-10 px-6 sm:px-10 py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[300px]">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4 text-left">
            {/* Category Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-300 backdrop-blur-sm shadow-xs ${currentBanner.theme.badgeBg}">
              <BadgeIcon className="w-3.5 h-3.5" />
              <span>{currentBanner.badge}</span>
            </div>

            {/* Headline */}
            <div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                {currentBanner.title}{' '}
                <span className={`block sm:inline ${currentBanner.theme.accent}`}>
                  {currentBanner.highlight}
                </span>
              </h2>
              <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                {currentBanner.description}
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {currentBanner.features.map((feat, i) => (
                <span
                  key={i}
                  className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                >
                  <Check className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                  <span>{feat}</span>
                </span>
              ))}
            </div>

            {/* Action Row */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleCtaClick(currentBanner.targetId)}
                className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 ${currentBanner.theme.btnBg}`}
              >
                <span>{currentBanner.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium hidden sm:inline">
                Auto-advancing • Hover to pause
              </span>
            </div>
          </div>

          {/* Right Column: Dynamic Graphic Preview */}
          <div className="lg:col-span-5 xl:col-span-4 flex items-center justify-center">
            {currentIndex === 0 && (
              /* Slide 1 Graphic: Layered scene mockups */
              <div className="relative w-64 h-48 sm:h-52 flex items-center justify-center animate-float-slow">
                {/* Back card */}
                <div className="absolute top-2 left-3 w-48 h-36 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 transform -rotate-6 shadow-md p-3 flex flex-col justify-between opacity-70">
                  <div className="w-12 h-2.5 bg-indigo-200 dark:bg-indigo-800 rounded"></div>
                  <div className="w-full h-16 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center border border-indigo-100 dark:border-indigo-900">
                    <QrCode className="w-8 h-8 text-indigo-400" />
                  </div>
                </div>

                {/* Middle card (Mug silhouette or Stand) */}
                <div className="absolute top-4 right-2 w-48 h-36 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 transform rotate-6 shadow-md p-3 flex flex-col justify-between opacity-80">
                  <div className="w-16 h-2.5 bg-sky-200 dark:bg-sky-800 rounded"></div>
                  <div className="w-full h-16 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center border border-sky-100 dark:border-sky-900">
                    <QrCode className="w-8 h-8 text-sky-400" />
                  </div>
                </div>

                {/* Front prominent card */}
                <div className="relative z-10 w-52 h-40 rounded-2xl bg-white dark:bg-slate-800 border-2 border-brand-500/40 shadow-xl p-3.5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2 h-2 rounded-full bg-brand-500"></div>
                      <span className="text-[10px] font-bold tracking-wider uppercase text-brand-600 dark:text-brand-400">
                        Contextual QR
                      </span>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                      LIVE
                    </span>
                  </div>
                  <div className="w-full h-20 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center border border-slate-200/80 dark:border-slate-700/80">
                    <QrCode className="w-12 h-12 text-slate-800 dark:text-white" />
                  </div>
                  <div className="text-[10px] text-center font-medium text-slate-500 dark:text-slate-400">
                    Scan for Menu & Wi-Fi
                  </div>
                </div>
              </div>
            )}

            {currentIndex === 1 && (
              /* Slide 2 Graphic: Format Badges */
              <div className="w-64 space-y-2.5 animate-float-slow">
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-emerald-500/30 shadow-md flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                      SVG
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        Vector Scene
                      </div>
                      <div className="text-[10px] text-slate-500">Infinite zoom • Clean paths</div>
                    </div>
                  </div>
                  <Check className="w-4 h-4 text-emerald-500" />
                </div>

                <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-teal-500/30 shadow-md flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-xs">
                      PNG
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        4K High-Res Raster
                      </div>
                      <div className="text-[10px] text-slate-500">Up to 4096px • 300 DPI</div>
                    </div>
                  </div>
                  <Check className="w-4 h-4 text-teal-500" />
                </div>

                <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-cyan-500/30 shadow-md flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xs">
                      PDF
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        Print Flyer Document
                      </div>
                      <div className="text-[10px] text-slate-500">A4 format • Print margins</div>
                    </div>
                  </div>
                  <Check className="w-4 h-4 text-cyan-500" />
                </div>
              </div>
            )}

            {currentIndex === 2 && (
              /* Slide 3 Graphic: Privacy Shield & Local Engine */
              <div className="relative w-60 h-48 flex items-center justify-center animate-float-slow">
                {/* Concentric subtle radar pulse ring */}
                <div className="absolute w-44 h-44 rounded-full border border-indigo-500/20 animate-pulse-subtle"></div>
                <div className="absolute w-32 h-32 rounded-full border border-indigo-500/30"></div>

                {/* Central Shield Card */}
                <div className="relative z-10 p-5 rounded-3xl bg-white dark:bg-slate-800 border-2 border-indigo-500/40 shadow-xl flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-inner">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      100% Client-Side
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      Zero data leaves browser
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                    AIR-GAPPED COMPLIANT
                  </span>
                </div>
              </div>
            )}

            {currentIndex === 3 && (
              /* Slide 4 Graphic: Viewfinder Scanner HUD */
              <div className="relative w-56 h-48 rounded-2xl bg-slate-900 border-2 border-amber-500/40 p-3 shadow-xl flex flex-col justify-between text-white overflow-hidden animate-float-slow">
                {/* Target Corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-400"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-400"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-400"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-400"></div>

                {/* Animated Laser Scan Beam */}
                <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_8px_#f59e0b] animate-bounce"></div>

                <div className="flex items-center justify-between text-[10px] font-mono text-amber-400">
                  <span>CAMERA HUD</span>
                  <span>ISO 18004</span>
                </div>

                <div className="w-20 h-20 mx-auto bg-white rounded-lg p-1.5 flex items-center justify-center shadow-inner">
                  <QrCode className="w-full h-full text-slate-950" />
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-emerald-400 font-bold flex items-center space-x-1">
                    <Check className="w-3 h-3 inline" />
                    <span>21:1 PASSED</span>
                  </span>
                  <span className="text-slate-400">0.08s</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Carousel Bottom Control Bar */}
        <div className="relative z-20 px-6 sm:px-10 py-3 bg-slate-50/70 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          {/* Slide Indicator Tabs */}
          <div className="flex items-center space-x-2">
            {BANNERS.map((banner, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={banner.id}
                  onClick={() => handleSelectSlide(index)}
                  aria-label={`Go to slide ${index + 1}: ${banner.title}`}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs border border-slate-200 dark:border-slate-700'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? 'bg-brand-500 scale-110' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  />
                  <span className="hidden sm:inline">{banner.badge.split('•')[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* Left / Right Nav Arrows */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Continuous Animated Marquee Ticker Strip */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800/60 py-2.5 px-2">
        <div className="flex animate-marquee whitespace-nowrap">
          {/* Double array to create seamless infinite loop */}
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
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
