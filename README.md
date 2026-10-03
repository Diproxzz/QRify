# QRify Studio — Illustrated Scene QR Generator

A production-quality, studio-grade QR code generator and marketing designer web app built with **Vite, React 18, TypeScript, Tailwind CSS, and anime.js v4**.

Transforms links into **illustrated object-based marketing assets** inspired by Canva templates — where the QR code sits naturally inside a hand-crafted vector illustration (envelopes, coffee cups, beer steins, delivery scooters, serving platters, tickets, smartphones, and book pages).

---

## 🎨 The 7 Reference Templates (and 38+ Scene Library)

Each template has a unique silhouette and hand-crafted vector composition:

1. **Invitation Envelope (`scene-envelope`)**: A clean card sliding upwards out of a lined envelope with an animated bounce on select.
2. **Bold Framed Poster (`scene-framed-card`)**: Architectural rounded frame with a pill banner at the bottom.
3. **Butler Platter (`scene-serving-hand`)**: A waiter's forearm balancing a silver tray with a floating hover motion.
4. **Hand-Drawn Scribble (`scene-scribble-frame`)**: Dynamic rough-sketch hatched lines drawn in with `anime.js` SVG stroke animation.
5. **Craft Beer Stein (`scene-beer-mug`)**: Frosted beer mug with overflowing foam, bubbles, and a pub label.
6. **Courier Scooter (`scene-delivery-scooter`)**: A retro delivery moped with a rear cargo box carrying the QR, animated drive-in on select.
7. **Steaming Coffee Mug (`scene-coffee-cup`)**: Ceramic mug on saucer with looping rising, wavy steam trails.

...plus **31 additional illustrated scenes** across **9 categories**:
- **Business**: Executive Desk Card, Leather Attaché Case, Sleek Laptop Display, Conference Pass Badge.
- **Education**: Open Textbook, Graduation Mortarboard, School Bus Panel, Classroom Chalkboard.
- **Food & Cafe**: Pizzeria Delivery Box, Diner Serving Tray.
- **Delivery & Retail**: Kraft Shopping Tote, Swing Price Tag, Courier Shipping Parcel.
- **Events & Promo**: VIP Concert Ticket Stub, Promo Megaphone, Taped Gig Poster, Highway Billboard.
- **Social & Creator**: Smartphone Screen Mockup, Instant Polaroid Photo, Comic Speech Balloon, Loved Creator Heart.
- **Travel & Hotel**: Vintage Luggage Tag, Hotel Door Hanger, Airline Boarding Pass, 3D Map Pin.
- **Health & Wellness**: Clinic Medical Clipboard, Prescription Pill Bottle, Rolled Yoga Mat, Botanical Eco Leaf.
- **Minimal & Sketch**: Optical Viewfinder HUD, Torn Spiral Notebook.

---

## 🏗️ Architecture: "Scene Templates"

Each template is defined by the `SceneTemplate` schema in [`src/types/qr.ts`](file:///c:/Users/dipro/OneDrive/Desktop/Code%20Editor/QRify/src/types/qr.ts):

```ts
export interface SceneTemplate {
  id: string;
  category: 'business' | 'education' | 'food' | 'retail' | 'events' | 'social' | 'travel' | 'health' | 'minimal';
  name: string;
  description: string;
  viewBox: [number, number];   // [width, height], e.g. [400, 500]
  slot: {                      // Where the QR code sits inside the illustration
    x: number;
    y: number;
    width: number;
    height: number;
    rotate?: number;           // Subtle rotation (-8° to +8°)
    cornerRadius?: number;     // Backing plate radius
  };
  textSlots: {                 // User-editable text captions / CTAs
    id: string;
    x: number;
    y: number;
    defaultText: string;
    fontSize: number;
    align: 'start' | 'middle' | 'end';
    fontWeight?: string | number;
  }[];
  palette: {                   // CSS Variables applied dynamically across SVG
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    ink: string;
  };
  qrStyle: {                   // Module dots and corner geometry
    dotsType: DotType;
    cornersSquareType: CornerSquareType;
    cornersDotType: CornerDotType;
    dotsColor: string;
    backgroundColor: string;
    errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  };
  animation: 'steam' | 'slide-out' | 'ride' | 'scribble' | 'bounce' | 'float' | 'pour' | 'none';
  logoSlot?: { x: number; y: number; size: number }; // Optional badge / banner icon slot
  renderSvgContent: (palette: ScenePalette, isAnimated: boolean) => React.ReactNode;
}
```

### Rendering Pipeline
1. `useQrCode` generates a crisp SVG QR code matrix with `qr-code-styling` (with instant synchronous fallback).
2. `SceneRenderer` nests the vector QR SVG into the scene's `<g id="qr-slot">` on a solid white contrast plate (guaranteeing camera scannability).
3. Injects editable `<text>` elements for user-customized CTA labels and headers.
4. Applies the color palette via CSS variables so users can recolor the illustration in real time.
5. Export pipeline (`exportUtils.ts`) serializes the full composed scene to **high-res PNG (512–4096px)**, **lossless SVG**, and **print-ready A4 PDF**.

---

## 🧪 Scannability Rules & Verification Suite

All 38 scene templates adhere to non-negotiable optical rules:
- **Solid High-Contrast Backing**: White backing plate behind every QR code slot.
- **Quiet Zone**: Minimum 4 modules padding around the QR code matrix.
- **Subtle Rotation**: Maximum $\pm 3^\circ$ tilt to prevent perspective deformation.
- **Automatic Error Correction Boost**: Automatically set to **Level H (30%)** when a logo is present.

### Run Automated Decode Test Suite

```bash
node test-scan.js
```

**Results**:
```
=================================================================
📊 TEST RESULTS: 38 / 38 templates passed standard decode
🎉 100% OF TEMPLATES PASSED DECODE VERIFICATION (Standard & With Logo)
=================================================================
```

---

## 🛠️ How to Add a New Scene Template

1. Add the template definition in `src/templates/moreTemplates.tsx`:

```tsx
import React from 'react';
import type { SceneTemplate } from '../types/qr';

export const myCustomCoffeeBag: SceneTemplate = {
  id: 'scene-coffee-bag',
  category: 'food',
  name: 'Roasted Bean Pouch',
  description: 'Kraft paper coffee bean bag with zip seal.',
  viewBox: [400, 500],
  slot: {
    x: 100,
    y: 160,
    width: 200,
    height: 200,
    cornerRadius: 16,
  },
  textSlots: [
    { id: 'header', x: 200, y: 130, defaultText: 'ETHIOPIA YIRGACHEFFE', fontSize: 12, align: 'middle', fontWeight: 'bold' },
    { id: 'cta', x: 200, y: 410, defaultText: 'Scan for Tasting Notes', fontSize: 13, align: 'middle', fontWeight: 'bold' },
  ],
  palette: {
    primary: '#451a03',
    secondary: '#b45309',
    accent: '#d97706',
    background: '#fffbeb',
    ink: '#451a03',
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
  renderSvgContent: (palette) => (
    <g>
      {/* Pouch Bag Shape */}
      <polygon points="80,90 320,90 350,450 50,450" fill="#fde68a" stroke={palette.primary} strokeWidth="6" />
      {/* Heat Seal Crimping at Top */}
      <rect x="70" y="80" width="260" height="18" fill="#f59e0b" stroke={palette.primary} strokeWidth="3" />
      {/* Center Label for QR */}
      <rect x="90" y="150" width="220" height="220" rx="18" fill="#ffffff" stroke={palette.primary} strokeWidth="5" />
    </g>
  ),
};
```

2. Add it to `ADDITIONAL_SCENE_TEMPLATES` in `src/templates/moreTemplates.tsx`. It will automatically appear in the gallery, support live previews, text editing, recoloring, and exports!

---

## 🚀 Running the App

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Run scan verification test
node test-scan.js

# Build production bundle
npm run build
```

The app runs on `http://localhost:3000`.
