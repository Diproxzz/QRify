import React from 'react';
import type { SceneTemplate, ScenePalette, SceneCategory } from '../types/qr';

export interface CategoryMeta {
  id: SceneCategory;
  name: string;
  iconName: string;
  count?: number;
}

export const SCENE_CATEGORIES: CategoryMeta[] = [
  { id: 'all', name: 'All Scenes', iconName: 'Sparkles' },
  { id: 'business', name: 'Business', iconName: 'Briefcase' },
  { id: 'education', name: 'Education', iconName: 'GraduationCap' },
  { id: 'food', name: 'Food & Cafe', iconName: 'Utensils' },
  { id: 'retail', name: 'Delivery & Retail', iconName: 'ShoppingBag' },
  { id: 'events', name: 'Events & Promo', iconName: 'Ticket' },
  { id: 'social', name: 'Social & Creator', iconName: 'Share2' },
  { id: 'travel', name: 'Travel & Hotel', iconName: 'Compass' },
  { id: 'health', name: 'Health & Wellness', iconName: 'Heart' },
  { id: 'minimal', name: 'Minimal & Sketch', iconName: 'PenTool' },
];

/**
 * 41 Illustrated Object-based Scene Templates across 9 categories
 */
export const SCENE_TEMPLATES: SceneTemplate[] = [
  // =========================================================================
  // 1. ENVELOPE WITH SLIDING CARD (Reference #1)
  // =========================================================================
  {
    id: 'scene-envelope',
    category: 'business',
    name: 'Invitation Envelope',
    description: 'A crisp invitation card sliding out of an elegant lined envelope.',
    viewBox: [400, 500],
    slot: {
      x: 95,
      y: 88,
      width: 210,
      height: 210,
      cornerRadius: 14,
    },
    textSlots: [
      {
        id: 'cta',
        x: 200,
        y: 459,
        defaultText: 'Scan to Open',
        fontSize: 14,
        align: 'middle',
        fontWeight: 'bold',
        color: '#ffffff',
      },
      {
        id: 'header',
        x: 200,
        y: 55,
        defaultText: 'YOU ARE INVITED',
        fontSize: 11,
        align: 'middle',
        fontWeight: 700,
      },
    ],
    palette: {
      primary: '#334155',
      secondary: '#64748b',
      accent: '#3b82f6',
      background: '#f8fafc',
      ink: '#0f172a',
    },
    qrStyle: {
      dotsType: 'rounded',
      cornersSquareType: 'extra-rounded',
      cornersDotType: 'dot',
      dotsColor: '#1e293b',
      backgroundColor: '#ffffff',
      errorCorrectionLevel: 'Q',
    },
    animation: 'slide-out',
    logoSlot: { x: 200, y: 420, size: 28 },
    renderSvgContent: (palette, isAnimated, qrSlot) => (
      <g>
        {/* Envelope back flap (open behind card) */}
        <polygon
          points="40,240 200,100 360,240"
          fill={palette.secondary}
          opacity="0.25"
        />
        <polygon
          points="40,240 200,110 360,240"
          fill={palette.secondary}
          opacity="0.15"
        />

        {/* Envelope back body */}
        <rect
          x="40"
          y="230"
          width="320"
          height="230"
          rx="18"
          fill={palette.background}
          stroke={palette.primary}
          strokeWidth="6"
        />

        {/* Envelope interior shadow */}
        <path
          d="M44 240 L200 350 L356 240"
          fill="none"
          stroke={palette.primary}
          strokeWidth="3"
          opacity="0.3"
        />

        {/* Sliding Card Body (carrying QR slot) */}
        <g id="envelope-card-slide" className={isAnimated ? 'anime-slide-card' : ''}>
          <rect
            x="75"
            y="65"
            width="250"
            height="260"
            rx="18"
            fill="#ffffff"
            stroke={palette.primary}
            strokeWidth="5"
          />
          {/* Card subtle top accent bar */}
          <line
            x1="120"
            y1="78"
            x2="280"
            y2="78"
            stroke={palette.accent}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Injected QR slot */}
          {qrSlot}
        </g>

        {/* Envelope Front Pocket Layers (covers lower half of card) */}
        <polygon
          points="40,230 40,460 200,355"
          fill={palette.background}
          stroke={palette.primary}
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <polygon
          points="360,230 360,460 200,355"
          fill={palette.background}
          stroke={palette.primary}
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <polygon
          points="40,460 200,335 360,460"
          fill={palette.secondary}
          opacity="0.2"
          stroke={palette.primary}
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* Bottom Banner Pill */}
        <rect
          x="110"
          y="434"
          width="180"
          height="40"
          rx="20"
          fill={palette.primary}
          stroke="#ffffff"
          strokeWidth="3"
        />
        {/* Decorative stamp on envelope */}
        <rect
          x="300"
          y="370"
          width="36"
          height="44"
          rx="4"
          fill={palette.accent}
          stroke="#ffffff"
          strokeWidth="2"
        />
        <circle cx="318" cy="392" r="10" fill="#ffffff" opacity="0.8" />
      </g>
    ),
  },

  // =========================================================================
  // HOTEL GOOGLE REVIEW STAND (Business Category)
  // =========================================================================
  {
    id: 'scene-hotel-google-review',
    category: 'business',
    name: 'Hotel Google Review Stand',
    description: 'Luxury hotel reception counter stand with 5-star Google review rating and concierge bell.',
    viewBox: [400, 500],
    slot: {
      x: 105,
      y: 145,
      width: 190,
      height: 190,
      cornerRadius: 14,
    },
    textSlots: [
      {
        id: 'header',
        x: 200,
        y: 65,
        defaultText: 'GRAND HOTEL & SUITES',
        fontSize: 11,
        align: 'middle',
        fontWeight: 800,
        color: '#1e3a8a',
      },
      {
        id: 'subhead',
        x: 200,
        y: 88,
        defaultText: 'Review us on Google',
        fontSize: 15,
        align: 'middle',
        fontWeight: 'bold',
        color: '#0f172a',
      },
      {
        id: 'cta',
        x: 218,
        y: 445,
        defaultText: 'Leave a 5★ Review',
        fontSize: 13,
        align: 'middle',
        fontWeight: 'bold',
        color: '#ffffff',
      },
    ],
    palette: {
      primary: '#1e3a8a',
      secondary: '#3b82f6',
      accent: '#f59e0b',
      background: '#f8fafc',
      ink: '#0f172a',
    },
    qrStyle: {
      dotsType: 'rounded',
      cornersSquareType: 'extra-rounded',
      cornersDotType: 'dot',
      dotsColor: '#1e3a8a',
      backgroundColor: '#ffffff',
      errorCorrectionLevel: 'Q',
    },
    animation: 'bounce',
    logoSlot: { x: 115, y: 441, size: 24 },
    renderSvgContent: (palette, _isAnimated, qrSlot) => (
      <g>
        {/* Desk Counter Surface Base */}
        <polygon
          points="10,480 390,480 400,450 0,450"
          fill="#f1f5f9"
          stroke={palette.primary}
          strokeWidth="3"
          opacity="0.6"
        />
        <line x1="0" y1="450" x2="400" y2="450" stroke={palette.secondary} strokeWidth="3" opacity="0.3" />

        {/* Polished Brass Concierge Bell on Desk */}
        <g id="concierge-bell">
          <ellipse cx="45" cy="445" rx="30" ry="8" fill="#d97706" stroke={palette.ink} strokeWidth="3" />
          <path d="M 18 440 C 18 410 72 410 72 440 Z" fill="#fbbf24" stroke={palette.ink} strokeWidth="3.5" />
          <path d="M 28 435 C 28 418 45 415 55 418" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="42" y="402" width="6" height="8" fill="#d97706" />
          <circle cx="45" cy="399" r="5" fill="#f59e0b" stroke={palette.ink} strokeWidth="2" />
        </g>

        {/* Luxury Hotel Key Fob on Right */}
        <g id="hotel-key-fob">
          <polygon points="360,405 380,425 360,445 340,425" fill="#fef3c7" stroke={palette.ink} strokeWidth="3" />
          <circle cx="360" cy="425" r="4" fill={palette.accent} />
          <line x1="360" y1="405" x2="360" y2="395" stroke={palette.ink} strokeWidth="2" />
          <circle cx="360" cy="391" r="4" fill="none" stroke={palette.ink} strokeWidth="2" />
        </g>

        {/* Counter Display Stand Shadow */}
        <rect x="68" y="38" width="264" height="344" rx="24" fill="#000000" opacity="0.08" />

        {/* Counter Display Stand Body */}
        <rect
          x="65"
          y="32"
          width="270"
          height="345"
          rx="24"
          fill="#ffffff"
          stroke={palette.primary}
          strokeWidth="6"
        />

        {/* Top Accent Stripe */}
        <rect x="170" y="42" width="60" height="4" rx="2" fill={palette.accent} />

        {/* 5 Golden Google Rating Stars */}
        <g id="google-rating-stars">
          {[144, 172, 200, 228, 256].map((cx, idx) => (
            <polygon
              key={idx}
              points={`${cx},106 ${cx + 2.5},112 ${cx + 8.5},112 ${cx + 3.5},116 ${cx + 5.5},122 ${cx},118 ${cx - 5.5},122 ${cx - 3.5},116 ${cx - 8.5},112 ${cx - 2.5},112`}
              fill="#f59e0b"
              stroke="#d97706"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          ))}
        </g>

        {/* Injected QR slot */}
        {qrSlot}

        {/* Camera guidance text */}
        <text
          x="200"
          y="353"
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="600"
          fill="#64748b"
          fontFamily="'Inter', sans-serif"
        >
          Point camera to open Google Maps
        </text>

        {/* Stand Heavy Base Mount */}
        <rect x="50" y="365" width="300" height="24" rx="6" fill="#1e293b" stroke={palette.ink} strokeWidth="3.5" />
        <rect x="55" y="367" width="290" height="4" fill="#ffffff" opacity="0.2" />
        <rect x="175" y="360" width="50" height="8" rx="2" fill="#fbbf24" stroke={palette.ink} strokeWidth="2" />

        {/* Bottom Banner Pill */}
        <rect
          x="90"
          y="418"
          width="220"
          height="46"
          rx="23"
          fill={palette.primary}
          stroke="#ffffff"
          strokeWidth="2.5"
        />
        {/* Professional Google "G" Review Logo Medallion */}
        <circle
          cx="115"
          cy="441"
          r="14"
          fill="#ffffff"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="1"
        />
        <g transform="translate(106, 432) scale(0.75)">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            fill="#EA4335"
          />
        </g>
      </g>
    ),
  },

  // =========================================================================
  // 2. FRAMED BANNER CARD (Reference #2)
  // =========================================================================
  {
    id: 'scene-framed-card',
    category: 'minimal',
    name: 'Bold Framed Poster',
    description: 'Thick rounded architectural frame with bottom CTA pill banner.',
    viewBox: [400, 500],
    slot: {
      x: 95,
      y: 75,
      width: 210,
      height: 210,
      cornerRadius: 16,
    },
    textSlots: [
      {
        id: 'cta',
        x: 215,
        y: 444,
        defaultText: 'Scan to View',
        fontSize: 14,
        align: 'middle',
        fontWeight: 'bold',
        color: '#ffffff',
      },
    ],
    palette: {
      primary: '#18181b',
      secondary: '#52525b',
      accent: '#2563eb',
      background: '#f4f4f5',
      ink: '#09090b',
    },
    qrStyle: {
      dotsType: 'square',
      cornersSquareType: 'extra-rounded',
      cornersDotType: 'dot',
      dotsColor: '#18181b',
      backgroundColor: '#ffffff',
      errorCorrectionLevel: 'Q',
    },
    animation: 'bounce',
    logoSlot: { x: 130, y: 437, size: 20 },
    renderSvgContent: (palette, _isAnimated, qrSlot) => (
      <g>
        {/* Soft Offset Shadow */}
        <rect
          x="62"
          y="42"
          width="276"
          height="346"
          rx="28"
          fill="#000000"
          opacity="0.08"
        />

        {/* Outer Heavy Frame */}
        <rect
          x="55"
          y="35"
          width="290"
          height="355"
          rx="30"
          fill={palette.background}
          stroke={palette.primary}
          strokeWidth="9"
        />

        {/* Inner Card Inset */}
        <rect
          x="75"
          y="55"
          width="250"
          height="315"
          rx="20"
          fill="#ffffff"
          stroke={palette.primary}
          strokeWidth="3.5"
          opacity="0.9"
        />

        {/* Frame corner decorative rivets */}
        <circle cx="78" cy="58" r="4" fill={palette.secondary} />
        <circle cx="322" cy="58" r="4" fill={palette.secondary} />
        <circle cx="78" cy="368" r="4" fill={palette.secondary} />
        <circle cx="322" cy="368" r="4" fill={palette.secondary} />

        {/* Injected QR slot */}
        {qrSlot}

        {/* Bottom Banner Pill */}
        <rect
          x="85"
          y="416"
          width="230"
          height="46"
          rx="23"
          fill={palette.primary}
          stroke={palette.secondary}
          strokeWidth="2"
        />

        {/* Banner Left Icon (Play / Link symbol) */}
        <rect x="110" y="428" width="22" height="22" rx="6" fill="#ffffff" opacity="0.2" />
        <polygon points="117,433 127,439 117,445" fill="#ffffff" />
      </g>
    ),
  },

  // =========================================================================
  // 3. SERVING HAND / WAITER TRAY (Reference #3)
  // =========================================================================
  {
    id: 'scene-serving-hand',
    category: 'food',
    name: 'Butler Platter',
    description: 'A formal serving tray carried by hand with the QR standing proud.',
    viewBox: [400, 500],
    slot: {
      x: 100,
      y: 105,
      width: 200,
      height: 200,
      cornerRadius: 14,
    },
    textSlots: [
      {
        id: 'header',
        x: 200,
        y: 58,
        defaultText: 'SCAN FOR MENU',
        fontSize: 13,
        align: 'middle',
        fontWeight: 'bold',
        color: '#ffffff',
      },
      {
        id: 'cta',
        x: 200,
        y: 330,
        defaultText: 'Daily Specials & Drinks',
        fontSize: 11,
        align: 'middle',
        fontWeight: 600,
        color: '#1c1917',
      },
    ],
    palette: {
      primary: '#1c1917',
      secondary: '#78716c',
      accent: '#d97706',
      background: '#fafaf9',
      ink: '#1c1917',
    },
    qrStyle: {
      dotsType: 'classy',
      cornersSquareType: 'dot',
      cornersDotType: 'dot',
      dotsColor: '#292524',
      backgroundColor: '#ffffff',
      errorCorrectionLevel: 'Q',
    },
    animation: 'float',
    renderSvgContent: (palette, isAnimated, qrSlot) => (
      <g className={isAnimated ? 'anime-float-tray' : ''}>
        {/* Waiter Sleeve & Hand entering from bottom-left */}
        <g id="waiter-arm">
          {/* Suit sleeve */}
          <path
            d="M -10 470 L 85 405 L 115 445 L -10 520 Z"
            fill={palette.primary}
            stroke={palette.ink}
            strokeWidth="5"
          />
          {/* White shirt cuff */}
          <polygon
            points="80,402 96,390 125,430 108,442"
            fill="#ffffff"
            stroke={palette.primary}
            strokeWidth="3.5"
          />
          {/* Hand palm & fingers balancing platter */}
          <path
            d="M 96 390 C 125 382 165 378 215 386 C 225 388 228 396 218 402 C 182 410 142 414 108 440 Z"
            fill="#fcd34d"
            stroke={palette.primary}
            strokeWidth="5"
          />
          {/* Finger details */}
          <path
            d="M 135 382 Q 175 378 205 382"
            stroke={palette.primary}
            strokeWidth="3.5"
            fill="none"
          />
        </g>

        {/* Silver Tray Platter Body */}
        <ellipse
          cx="200"
          cy="380"
          rx="170"
          ry="24"
          fill="#e2e8f0"
          stroke={palette.primary}
          strokeWidth="6"
        />
        {/* Platter inner polished reflection */}
        <ellipse
          cx="200"
          cy="378"
          rx="150"
          ry="16"
          fill="#f8fafc"
          stroke={palette.secondary}
          strokeWidth="2"
        />

        {/* Card Stand Base */}
        <polygon
          points="160,372 240,372 230,356 170,356"
          fill={palette.primary}
        />

        {/* Card Backing on Tray */}
        <rect
          x="85"
          y="70"
          width="230"
          height="280"
          rx="20"
          fill="#ffffff"
          stroke={palette.primary}
          strokeWidth="6"
        />

        {/* Injected QR slot */}
        {qrSlot}

        {/* Top Header Tag Ribbon */}
        <rect
          x="120"
          y="40"
          width="160"
          height="28"
          rx="14"
          fill={palette.primary}
        />

        {/* Cloche sparkle stars */}
        <path d="M 55 120 L 59 128 L 67 130 L 59 134 L 55 142 L 51 134 L 43 130 L 51 128 Z" fill={palette.accent} />
        <path d="M 345 100 L 348 106 L 355 108 L 348 111 L 345 118 L 342 111 L 335 108 L 342 106 Z" fill={palette.accent} />
      </g>
    ),
  },

  // =========================================================================
  // 4. SCRIBBLE / SKETCHY FRAME (Reference #4)
  // =========================================================================
  {
    id: 'scene-scribble-frame',
    category: 'minimal',
    name: 'Hand-Drawn Scribble',
    description: 'Dynamic rough-sketch hatched lines radiating around a clean card.',
    viewBox: [400, 500],
    slot: {
      x: 95,
      y: 80,
      width: 210,
      height: 210,
      cornerRadius: 12,
    },
    textSlots: [
      {
        id: 'cta',
        x: 200,
        y: 442,
        defaultText: 'Scan to Discover',
        fontSize: 14,
        align: 'middle',
        fontWeight: 'bold',
        color: '#ffffff',
      },
    ],
    palette: {
      primary: '#27272a',
      secondary: '#71717a',
      accent: '#ef4444',
      background: '#ffffff',
      ink: '#18181b',
    },
    qrStyle: {
      dotsType: 'square',
      cornersSquareType: 'square',
      cornersDotType: 'square',
      dotsColor: '#27272a',
      backgroundColor: '#ffffff',
      errorCorrectionLevel: 'Q',
    },
    animation: 'scribble',
    renderSvgContent: (palette, isAnimated, qrSlot) => (
      <g>
        {/* Dynamic hand-drawn radiating hatch scribble strokes */}
        <g
          id="scribble-strokes"
          className={isAnimated ? 'anime-scribble-lines' : ''}
          stroke={palette.primary}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          {/* Top scribbles */}
          <path d="M 60 40 L 90 20 M 110 35 L 140 15 M 180 30 L 205 10 M 235 32 L 260 12 M 285 38 L 320 18 M 330 45 L 355 25" />
          {/* Left scribbles */}
          <path d="M 45 70 L 15 95 M 52 130 L 20 155 M 48 190 L 15 210 M 50 250 L 18 275 M 52 310 L 22 335 M 55 370 L 25 395" />
          {/* Right scribbles */}
          <path d="M 345 75 L 378 95 M 342 135 L 375 160 M 348 195 L 382 215 M 344 255 L 380 275 M 342 315 L 378 335 M 340 375 L 372 400" />
          {/* Bottom scribbles */}
          <path d="M 70 455 L 45 480 M 120 465 L 100 488 M 160 468 L 145 492 M 220 468 L 240 492 M 280 465 L 305 488 M 325 455 L 350 480" />
          {/* Additional energetic cross-hatching */}
          <path d="M 25 80 L 50 110 M 370 85 L 340 115 M 30 350 L 60 380 M 370 355 L 340 385" strokeWidth="2.5" opacity="0.6" />
        </g>

        {/* Card Body with Hand-Drawn Wobbly Look */}
        <rect
          x="75"
          y="55"
          width="250"
          height="335"
          rx="18"
          fill="#ffffff"
          stroke={palette.primary}
          strokeWidth="6"
        />

        {/* Inner subtle scribble border */}
        <rect
          x="85"
          y="65"
          width="230"
          height="315"
          rx="12"
          fill="none"
          stroke={palette.secondary}
          strokeWidth="2"
          strokeDasharray="8 6"
        />

        {/* Injected QR slot */}
        {qrSlot}

        {/* Bottom Dark Tag */}
        <rect
          x="90"
          y="415"
          width="220"
          height="44"
          rx="12"
          fill={palette.primary}
        />
        {/* Tag stitched details */}
        <rect
          x="94"
          y="419"
          width="212"
          height="36"
          rx="8"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      </g>
    ),
  },

  // =========================================================================
  // 5. BEER MUG WITH FROTHY FOAM (Reference #5)
  // =========================================================================
  {
    id: 'scene-beer-mug',
    category: 'food',
    name: 'Craft Beer Stein',
    description: 'A frosted beer mug with overflowing foam head and pub label.',
    viewBox: [400, 500],
    slot: {
      x: 97,
      y: 195,
      width: 180,
      height: 180,
      cornerRadius: 16,
    },
    textSlots: [
      {
        id: 'cta',
        x: 188,
        y: 457,
        defaultText: 'Scan for Tap List 🍺',
        fontSize: 13,
        align: 'middle',
        fontWeight: 'bold',
        color: '#ffffff',
      },
    ],
    palette: {
      primary: '#1c1917',
      secondary: '#f59e0b',
      accent: '#fbbf24',
      background: '#fef3c7',
      ink: '#1c1917',
    },
    qrStyle: {
      dotsType: 'extra-rounded',
      cornersSquareType: 'extra-rounded',
      cornersDotType: 'dot',
      dotsColor: '#78350f',
      backgroundColor: '#ffffff',
      errorCorrectionLevel: 'Q',
    },
    animation: 'pour',
    logoSlot: { x: 188, y: 155, size: 24 },
    renderSvgContent: (palette, isAnimated, qrSlot) => (
      <g>
        {/* Beer Mug Handle on Right */}
        <path
          d="M 270 200 C 350 200 350 350 270 350"
          fill="none"
          stroke={palette.primary}
          strokeWidth="24"
          strokeLinecap="round"
        />
        <path
          d="M 270 200 C 342 200 342 350 270 350"
          fill="none"
          stroke="#ffffff"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Mug Glass Body */}
        <rect
          x="75"
          y="150"
          width="225"
          height="265"
          rx="26"
          fill={palette.secondary}
          stroke={palette.primary}
          strokeWidth="7"
        />

        {/* Glass vertical facets / highlights */}
        <line x1="110" y1="170" x2="110" y2="400" stroke="#ffffff" strokeWidth="8" opacity="0.3" strokeLinecap="round" />
        <line x1="265" y1="170" x2="265" y2="400" stroke="#ffffff" strokeWidth="8" opacity="0.3" strokeLinecap="round" />

        {/* Effervescent Rising Bubbles */}
        <g id="beer-bubbles" className={isAnimated ? 'anime-bubbles' : ''}>
          <circle cx="100" cy="380" r="5" fill="#ffffff" opacity="0.7" />
          <circle cx="130" cy="360" r="4" fill="#ffffff" opacity="0.6" />
          <circle cx="240" cy="370" r="6" fill="#ffffff" opacity="0.7" />
          <circle cx="260" cy="340" r="4" fill="#ffffff" opacity="0.5" />
          <circle cx="120" cy="320" r="3" fill="#ffffff" opacity="0.6" />
        </g>

        {/* Injected QR slot */}
        {qrSlot}

        {/* Frothy Overflowing Foam Head at Top */}
        <path
          d="M 60 160 
             Q 60 110 100 115 
             Q 120 70 170 85 
             Q 210 65 250 85 
             Q 290 80 305 125 
             Q 325 155 300 175 
             Q 280 185 260 170 
             Q 230 180 200 165 
             Q 170 180 140 165 
             Q 110 185 85 170 
             Q 65 175 60 160 Z"
          fill="#ffffff"
          stroke={palette.primary}
          strokeWidth="6"
        />
        {/* Foam Drip running down left side */}
        <path
          d="M 70 165 C 65 210 80 230 85 230 C 90 230 92 210 90 165 Z"
          fill="#ffffff"
          stroke={palette.primary}
          strokeWidth="5"
        />

        {/* Bottom Banner Pill */}
        <rect
          x="95"
          y="432"
          width="185"
          height="40"
          rx="20"
          fill={palette.primary}
        />
      </g>
    ),
  },

  // =========================================================================
  // 6. DELIVERY SCOOTER (Reference #6)
  // =========================================================================
  {
    id: 'scene-delivery-scooter',
    category: 'retail',
    name: 'Courier Scooter',
    description: 'Fast delivery moped with courier cargo box carrying the QR.',
    viewBox: [450, 480],
    slot: {
      x: 72,
      y: 85,
      width: 176,
      height: 176,
      cornerRadius: 14,
    },
    textSlots: [
      {
        id: 'cta',
        x: 160,
        y: 293,
        defaultText: 'Track Order',
        fontSize: 12,
        align: 'middle',
        fontWeight: 'bold',
        color: '#ffffff',
      },
    ],
    palette: {
      primary: '#1e293b',
      secondary: '#475569',
      accent: '#06b6d4',
      background: '#f1f5f9',
      ink: '#0f172a',
    },
    qrStyle: {
      dotsType: 'rounded',
      cornersSquareType: 'extra-rounded',
      cornersDotType: 'dot',
      dotsColor: '#0f172a',
      backgroundColor: '#ffffff',
      errorCorrectionLevel: 'Q',
    },
    animation: 'ride',
    renderSvgContent: (palette, isAnimated, qrSlot) => (
      <g className={isAnimated ? 'anime-scooter-ride' : ''}>
        {/* Speed motion lines behind scooter */}
        <g stroke={palette.accent} strokeWidth="3.5" strokeLinecap="round" opacity="0.7">
          <line x1="15" y1="210" x2="45" y2="210" />
          <line x1="5" y1="240" x2="35" y2="240" />
          <line x1="20" y1="365" x2="55" y2="365" />
        </g>

        {/* Ground shadow */}
        <ellipse cx="235" cy="425" rx="160" ry="10" fill="#000000" opacity="0.1" />

        {/* Scooter Chassis & Wheels */}
        {/* Rear Wheel Fender / Mudguard */}
        <path
          d="M 90 385 C 90 325 170 325 170 385"
          fill={palette.secondary}
          stroke={palette.primary}
          strokeWidth="6"
        />

        {/* Step-through Chassis & Footboard */}
        <path
          d="M 155 350 C 185 345 220 345 250 365 L 290 365 L 310 270 L 290 270 Z"
          fill={palette.secondary}
          stroke={palette.primary}
          strokeWidth="5"
        />

        {/* Seat Cushion */}
        <path
          d="M 150 315 C 160 305 200 305 210 315"
          stroke={palette.primary}
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Handlebars & Headlight Column */}
        <rect x="285" y="232" width="34" height="12" rx="6" fill={palette.primary} />
        <circle cx="320" cy="245" r="14" fill="#fde047" stroke={palette.primary} strokeWidth="4" />
        <circle cx="320" cy="245" r="7" fill="#ffffff" opacity="0.6" />

        {/* Rear Wheel */}
        <circle cx="130" cy="385" r="34" fill="#ffffff" stroke={palette.primary} strokeWidth="9" />
        <circle cx="130" cy="385" r="13" fill={palette.primary} />

        {/* Front Wheel */}
        <circle cx="340" cy="385" r="34" fill="#ffffff" stroke={palette.primary} strokeWidth="9" />
        <circle cx="340" cy="385" r="13" fill={palette.primary} />

        {/* Rear Cargo Rack Mounting Struts */}
        <line x1="85" y1="315" x2="85" y2="350" stroke={palette.primary} strokeWidth="6" strokeLinecap="round" />
        <line x1="160" y1="315" x2="160" y2="350" stroke={palette.primary} strokeWidth="6" strokeLinecap="round" />

        {/* Delivery Cargo Box Outline */}
        <rect
          x="60"
          y="75"
          width="200"
          height="240"
          rx="20"
          fill="#ffffff"
          stroke={palette.primary}
          strokeWidth="6"
        />
        {/* Box Top Lid Hinge Line */}
        <line x1="60" y1="105" x2="260" y2="105" stroke={palette.primary} strokeWidth="3" opacity="0.3" strokeDasharray="6 4" />

        {/* Injected QR slot - Perfectly nestled inside the cargo box */}
        {qrSlot}

        {/* Bottom Banner Pill on Delivery Box */}
        <rect
          x="75"
          y="272"
          width="170"
          height="32"
          rx="10"
          fill={palette.primary}
        />
      </g>
    ),
  },

  // =========================================================================
  // 7. COFFEE CUP WITH RISING STEAM (Reference #7)
  // =========================================================================
  {
    id: 'scene-coffee-cup',
    category: 'food',
    name: 'Steaming Coffee Mug',
    description: 'Artisan ceramic coffee mug with rising steam trails and saucer.',
    viewBox: [400, 500],
    slot: {
      x: 105,
      y: 185,
      width: 180,
      height: 180,
      cornerRadius: 16,
    },
    textSlots: [
      {
        id: 'cta',
        x: 195,
        y: 459,
        defaultText: 'Scan for Menu ☕',
        fontSize: 14,
        align: 'middle',
        fontWeight: 'bold',
        color: '#ffffff',
      },
    ],
    palette: {
      primary: '#292524',
      secondary: '#78350f',
      accent: '#d97706',
      background: '#fffbeb',
      ink: '#1c1917',
    },
    qrStyle: {
      dotsType: 'classy-rounded',
      cornersSquareType: 'extra-rounded',
      cornersDotType: 'dot',
      dotsColor: '#451a03',
      backgroundColor: '#ffffff',
      errorCorrectionLevel: 'Q',
    },
    animation: 'steam',
    renderSvgContent: (palette, isAnimated, qrSlot) => (
      <g>
        {/* Rising Wavy Steam Trails (Targeted by anime.js) */}
        <g
          id="coffee-steam"
          className={isAnimated ? 'anime-steam-rise' : ''}
          stroke={palette.primary}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        >
          <path d="M 150 120 Q 130 85 160 50 Q 140 25 155 10" />
          <path d="M 195 125 Q 220 85 190 50 Q 215 25 195 10" />
          <path d="M 240 120 Q 220 85 250 50 Q 230 25 245 10" />
        </g>

        {/* Coffee Mug Handle on Right */}
        <path
          d="M 285 200 C 360 200 360 320 285 320"
          fill="none"
          stroke={palette.primary}
          strokeWidth="20"
          strokeLinecap="round"
        />
        <path
          d="M 285 200 C 348 200 348 320 285 320"
          fill="none"
          stroke="#ffffff"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Saucer / Plate Below */}
        <ellipse
          cx="195"
          cy="405"
          rx="145"
          ry="18"
          fill="#e7e5e4"
          stroke={palette.primary}
          strokeWidth="6"
        />
        <ellipse
          cx="195"
          cy="403"
          rx="120"
          ry="12"
          fill="#fafaf9"
          stroke={palette.secondary}
          strokeWidth="2"
        />

        {/* Coffee Mug Ceramic Body */}
        <rect
          x="80"
          y="160"
          width="230"
          height="230"
          rx="24"
          fill="#ffffff"
          stroke={palette.primary}
          strokeWidth="7"
        />

        {/* Coffee Dark Rim at Top */}
        <ellipse
          cx="195"
          cy="165"
          rx="105"
          ry="14"
          fill={palette.secondary}
          stroke={palette.primary}
          strokeWidth="4"
        />

        {/* Injected QR slot */}
        {qrSlot}

        {/* Bottom Banner Pill */}
        <rect
          x="105"
          y="435"
          width="180"
          height="38"
          rx="19"
          fill={palette.primary}
        />
      </g>
    ),
  },
];

import { ADDITIONAL_SCENE_TEMPLATES } from './moreTemplates';

export const ALL_SCENE_TEMPLATES: SceneTemplate[] = [
  ...SCENE_TEMPLATES,
  ...ADDITIONAL_SCENE_TEMPLATES,
];
