import React from 'react';
import type { SceneTemplate } from '../types/qr';

export const ADDITIONAL_SCENE_TEMPLATES: SceneTemplate[] = [
  // ==================== BUSINESS ====================
  {
    id: 'scene-desk-card',
    category: 'business',
    name: 'Executive Desk Card',
    description: 'A premium vCard laid upon an executive oak desk with fountain pen.',
    viewBox: [420, 500],
    slot: { x: 105, y: 120, width: 210, height: 210, cornerRadius: 14, rotate: -2 },
    textSlots: [
      { id: 'header', x: 210, y: 80, defaultText: 'EXECUTIVE CONTACT', fontSize: 12, align: 'middle', fontWeight: 'bold' },
      { id: 'cta', x: 210, y: 360, defaultText: 'Scan to Save Contact', fontSize: 13, align: 'middle', fontWeight: 600 },
    ],
    palette: { primary: '#0f172a', secondary: '#334155', accent: '#0284c7', background: '#f8fafc', ink: '#020617' },
    qrStyle: { dotsType: 'square', cornersSquareType: 'square', cornersDotType: 'square', dotsColor: '#0f172a', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Desk Surface texture lines */}
        <line x1="20" y1="40" x2="400" y2="40" stroke={palette.secondary} strokeWidth="1.5" opacity="0.15" />
        <line x1="20" y1="460" x2="400" y2="460" stroke={palette.secondary} strokeWidth="1.5" opacity="0.15" />
        {/* Shadow under tilted card */}
        <rect x="98" y="102" width="235" height="280" rx="20" transform="rotate(-2 210 240)" fill="#000000" opacity="0.1" />
        {/* Tilted Card */}
        <rect x="92" y="96" width="235" height="280" rx="20" transform="rotate(-2 210 240)" fill="#ffffff" stroke={palette.primary} strokeWidth="5.5" />
        {/* Brass Fountain Pen on right */}
        <path d="M 350 70 L 362 82 L 322 360 L 312 375 L 310 360 Z" fill="#d97706" stroke={palette.primary} strokeWidth="3" />
        <polygon points="312,375 306,395 318,382" fill="#0f172a" stroke={palette.primary} strokeWidth="2" />
        {/* Clip and ruler accent on left */}
        <rect x="45" y="150" width="18" height="120" rx="4" fill="#cbd5e1" stroke={palette.primary} strokeWidth="3" />
      </g>
    ),
  },

  {
    id: 'scene-briefcase',
    category: 'business',
    name: 'Leather Attache Case',
    description: 'An executive leather briefcase with the QR badge on the flap.',
    viewBox: [420, 500],
    slot: { x: 110, y: 150, width: 200, height: 200, cornerRadius: 18 },
    textSlots: [
      { id: 'cta', x: 210, y: 405, defaultText: 'Scan for Credentials', fontSize: 13, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#451a03', secondary: '#78350f', accent: '#d97706', background: '#fef3c7', ink: '#451a03' },
    qrStyle: { dotsType: 'classy', cornersSquareType: 'extra-rounded', cornersDotType: 'dot', dotsColor: '#451a03', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Briefcase Handle */}
        <path d="M 160 90 C 160 40 260 40 260 90" fill="none" stroke={palette.primary} strokeWidth="16" strokeLinecap="round" />
        <path d="M 160 90 C 160 46 260 46 260 90" fill="none" stroke="#d97706" strokeWidth="6" strokeLinecap="round" />
        {/* Handle Chrome Mounts */}
        <rect x="150" y="80" width="20" height="24" rx="4" fill="#cbd5e1" stroke={palette.primary} strokeWidth="4" />
        <rect x="250" y="80" width="20" height="24" rx="4" fill="#cbd5e1" stroke={palette.primary} strokeWidth="4" />
        {/* Briefcase Main Leather Body */}
        <rect x="50" y="95" width="320" height="340" rx="28" fill={palette.secondary} stroke={palette.primary} strokeWidth="7" />
        {/* Front Flap */}
        <path d="M 50 95 L 370 95 L 370 260 L 210 295 L 50 260 Z" fill={palette.primary} opacity="0.3" />
        {/* Leather Stitching Dash Lines */}
        <rect x="62" y="107" width="296" height="316" rx="20" fill="none" stroke="#fde68a" strokeWidth="2" strokeDasharray="6 6" />
        {/* Center Plaque Badge for QR */}
        <rect x="95" y="135" width="230" height="230" rx="22" fill="#ffffff" stroke={palette.primary} strokeWidth="6" />
        {/* Brass Clasp at Bottom */}
        <rect x="185" y="365" width="50" height="24" rx="6" fill="#f59e0b" stroke={palette.primary} strokeWidth="3" />
      </g>
    ),
  },

  {
    id: 'scene-laptop',
    category: 'business',
    name: 'Sleek Laptop Display',
    description: 'A modern ultra-slim aluminium laptop display showing your QR.',
    viewBox: [440, 480],
    slot: { x: 120, y: 70, width: 200, height: 200, cornerRadius: 10 },
    textSlots: [
      { id: 'cta', x: 220, y: 305, defaultText: 'Scan to Open Web Portal', fontSize: 13, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#1e293b', secondary: '#475569', accent: '#3b82f6', background: '#f8fafc', ink: '#0f172a' },
    qrStyle: { dotsType: 'rounded', cornersSquareType: 'extra-rounded', cornersDotType: 'dot', dotsColor: '#1e293b', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Laptop Display Lid Frame */}
        <rect x="70" y="35" width="300" height="300" rx="18" fill="#0f172a" stroke={palette.primary} strokeWidth="6" />
        {/* Display Screen Area */}
        <rect x="85" y="50" width="270" height="270" rx="12" fill="#ffffff" />
        {/* Webcam Notch */}
        <circle cx="220" cy="42" r="3" fill="#64748b" />
        {/* Browser Mockup Top Bar inside screen */}
        <rect x="85" y="50" width="270" height="24" fill="#f1f5f9" />
        <circle cx="97" cy="62" r="3.5" fill="#ef4444" />
        <circle cx="109" cy="62" r="3.5" fill="#f59e0b" />
        <circle cx="121" cy="62" r="3.5" fill="#10b981" />
        {/* Laptop Base / Keyboard Chassis */}
        <polygon points="30,340 410,340 380,380 60,380" fill="#cbd5e1" stroke={palette.primary} strokeWidth="6" />
        {/* Trackpad Indentation */}
        <rect x="180" y="348" width="80" height="24" rx="4" fill="#94a3b8" opacity="0.6" stroke={palette.primary} strokeWidth="1.5" />
      </g>
    ),
  },

  {
    id: 'scene-lanyard',
    category: 'business',
    name: 'Conference Pass Badge',
    description: 'An event VIP lanyard badge on a woven strap with clip.',
    viewBox: [400, 520],
    slot: { x: 100, y: 170, width: 200, height: 200, cornerRadius: 16 },
    textSlots: [
      { id: 'header', x: 200, y: 145, defaultText: 'VIP ALL-ACCESS PASS', fontSize: 12, align: 'middle', fontWeight: 'bold' },
      { id: 'cta', x: 200, y: 405, defaultText: 'Scan for Conference Hub', fontSize: 13, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#1e1b4b', secondary: '#4338ca', accent: '#f59e0b', background: '#e0e7ff', ink: '#1e1b4b' },
    qrStyle: { dotsType: 'classy-rounded', cornersSquareType: 'dot', cornersDotType: 'dot', dotsColor: '#1e1b4b', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'float',
    renderSvgContent: (palette) => (
      <g>
        {/* Woven Lanyard Straps entering from top */}
        <path d="M 160 0 L 195 90" stroke={palette.secondary} strokeWidth="24" fill="none" />
        <path d="M 240 0 L 205 90" stroke={palette.secondary} strokeWidth="24" fill="none" />
        <path d="M 160 0 L 195 90" stroke="#ffffff" strokeWidth="4" strokeDasharray="6 6" fill="none" opacity="0.5" />
        {/* Metal Swivel Lobster Clip */}
        <ellipse cx="200" cy="98" rx="14" ry="10" fill="#94a3b8" stroke={palette.primary} strokeWidth="4" />
        <rect x="194" y="104" width="12" height="22" rx="4" fill="#cbd5e1" stroke={palette.primary} strokeWidth="3" />
        {/* Badge Plastic Pouch Header Slot */}
        <rect x="70" y="120" width="260" height="330" rx="20" fill="#ffffff" stroke={palette.primary} strokeWidth="6" />
        {/* Lanyard Hole Punch Slot */}
        <rect x="175" y="128" width="50" height="10" rx="5" fill="#f1f5f9" stroke={palette.primary} strokeWidth="3" />
        {/* Badge Accent Header Banner */}
        <rect x="80" y="148" width="240" height="28" rx="8" fill={palette.primary} />
      </g>
    ),
  },

  // ==================== EDUCATION ====================
  {
    id: 'scene-open-book',
    category: 'education',
    name: 'Open Textbook',
    description: 'A study textbook with bookmark ribbon and QR on the page.',
    viewBox: [440, 480],
    slot: { x: 235, y: 110, width: 170, height: 170, cornerRadius: 10 },
    textSlots: [
      { id: 'header', x: 120, y: 150, defaultText: 'CHAPTER 04', fontSize: 13, align: 'middle', fontWeight: 'bold' },
      { id: 'cta', x: 320, y: 310, defaultText: 'Scan for Study Guide', fontSize: 12, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#1e3a8a', secondary: '#3b82f6', accent: '#f59e0b', background: '#eff6ff', ink: '#172554' },
    qrStyle: { dotsType: 'classy', cornersSquareType: 'square', cornersDotType: 'dot', dotsColor: '#1e3a8a', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Book Hardcover Base */}
        <path d="M 30 380 Q 220 400 410 380 L 410 395 Q 220 415 30 395 Z" fill={palette.primary} stroke={palette.ink} strokeWidth="4" />
        {/* Left Book Page */}
        <path d="M 35 100 Q 130 90 220 110 L 220 375 Q 130 355 35 365 Z" fill="#ffffff" stroke={palette.primary} strokeWidth="5" />
        {/* Left Page Text lines */}
        <line x1="60" y1="180" x2="180" y2="180" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
        <line x1="60" y1="210" x2="190" y2="210" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
        <line x1="60" y1="240" x2="175" y2="240" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
        <line x1="60" y1="270" x2="160" y2="270" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
        {/* Right Book Page (holding QR) */}
        <path d="M 220 110 Q 310 90 405 100 L 405 365 Q 310 355 220 375 Z" fill="#ffffff" stroke={palette.primary} strokeWidth="5" />
        {/* Spine Bookmark Ribbon */}
        <path d="M 215 80 L 225 80 L 225 280 L 220 270 L 215 280 Z" fill={palette.accent} stroke={palette.primary} strokeWidth="2.5" />
      </g>
    ),
  },

  {
    id: 'scene-grad-cap',
    category: 'education',
    name: 'Graduation Mortarboard',
    description: 'Academic graduation cap with gold tassel and hanging diploma card.',
    viewBox: [420, 500],
    slot: { x: 110, y: 220, width: 200, height: 200, cornerRadius: 16 },
    textSlots: [
      { id: 'header', x: 210, y: 195, defaultText: 'CLASS OF 2026', fontSize: 13, align: 'middle', fontWeight: 'bold' },
      { id: 'cta', x: 210, y: 450, defaultText: 'Scan for Commencement', fontSize: 13, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#0f172a', secondary: '#334155', accent: '#f59e0b', background: '#f8fafc', ink: '#020617' },
    qrStyle: { dotsType: 'rounded', cornersSquareType: 'extra-rounded', cornersDotType: 'dot', dotsColor: '#0f172a', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Skull Cap Base */}
        <ellipse cx="210" cy="150" rx="90" ry="40" fill={palette.secondary} stroke={palette.primary} strokeWidth="6" />
        {/* Diamond Mortarboard Top */}
        <polygon points="210,50 380,105 210,160 40,105" fill={palette.primary} stroke={palette.ink} strokeWidth="6" />
        {/* Center Button */}
        <ellipse cx="210" cy="105" rx="10" ry="7" fill={palette.accent} stroke={palette.primary} strokeWidth="3" />
        {/* Hanging Tassel */}
        <path d="M 210 105 Q 290 120 310 180" fill="none" stroke={palette.accent} strokeWidth="5" />
        <rect x="304" y="180" width="12" height="30" rx="3" fill={palette.accent} stroke={palette.primary} strokeWidth="2.5" />
        {/* Diploma Card Hanging Below */}
        <rect x="90" y="175" width="240" height="260" rx="20" fill="#ffffff" stroke={palette.primary} strokeWidth="6" />
        {/* Ribbon Seal Badge */}
        <circle cx="210" cy="180" r="16" fill={palette.accent} stroke={palette.primary} strokeWidth="3" />
      </g>
    ),
  },

  {
    id: 'scene-school-bus',
    category: 'education',
    name: 'School Bus Panel',
    description: 'A classic bright yellow school bus with QR displayed on the side.',
    viewBox: [450, 480],
    slot: { x: 125, y: 95, width: 190, height: 190, cornerRadius: 14 },
    textSlots: [
      { id: 'cta', x: 220, y: 310, defaultText: 'Scan Bus Schedule & Route', fontSize: 12, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#1c1917', secondary: '#f59e0b', accent: '#ef4444', background: '#fffbeb', ink: '#1c1917' },
    qrStyle: { dotsType: 'extra-rounded', cornersSquareType: 'extra-rounded', cornersDotType: 'dot', dotsColor: '#1c1917', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'ride',
    renderSvgContent: (palette) => (
      <g>
        {/* Yellow Bus Body */}
        <rect x="40" y="60" width="370" height="280" rx="26" fill="#f59e0b" stroke={palette.primary} strokeWidth="7" />
        {/* Black Guard Stripes */}
        <line x1="40" y1="180" x2="410" y2="180" stroke={palette.primary} strokeWidth="7" />
        <line x1="40" y1="210" x2="410" y2="210" stroke={palette.primary} strokeWidth="7" />
        {/* Bus Front Windows */}
        <rect x="55" y="75" width="45" height="50" rx="8" fill="#e0f2fe" stroke={palette.primary} strokeWidth="4" />
        <rect x="350" y="75" width="45" height="50" rx="8" fill="#e0f2fe" stroke={palette.primary} strokeWidth="4" />
        {/* Wheels */}
        <circle cx="110" cy="340" r="40" fill="#1c1917" stroke={palette.primary} strokeWidth="6" />
        <circle cx="110" cy="340" r="18" fill="#94a3b8" />
        <circle cx="340" cy="340" r="40" fill="#1c1917" stroke={palette.primary} strokeWidth="6" />
        <circle cx="340" cy="340" r="18" fill="#94a3b8" />
        {/* Center White Board for QR */}
        <rect x="110" y="80" width="220" height="220" rx="18" fill="#ffffff" stroke={palette.primary} strokeWidth="5.5" />
      </g>
    ),
  },

  {
    id: 'scene-chalkboard',
    category: 'education',
    name: 'Classroom Chalkboard',
    description: 'Wooden easel chalkboard with white chalk sketch framing.',
    viewBox: [420, 500],
    slot: { x: 110, y: 95, width: 200, height: 200, cornerRadius: 12 },
    textSlots: [
      { id: 'header', x: 210, y: 65, defaultText: 'TODAY’S LESSON', fontSize: 13, align: 'middle', fontWeight: 'bold' },
      { id: 'cta', x: 210, y: 325, defaultText: 'Scan for Homework ✏️', fontSize: 13, align: 'middle', fontWeight: 600 },
    ],
    palette: { primary: '#1e293b', secondary: '#0f766e', accent: '#f59e0b', background: '#f0fdf4', ink: '#ffffff' },
    qrStyle: { dotsType: 'classy', cornersSquareType: 'square', cornersDotType: 'square', dotsColor: '#134e4a', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Chalkboard Easel Wooden Legs */}
        <line x1="80" y1="360" x2="50" y2="470" stroke="#78350f" strokeWidth="12" strokeLinecap="round" />
        <line x1="340" y1="360" x2="370" y2="470" stroke="#78350f" strokeWidth="12" strokeLinecap="round" />
        {/* Wooden Frame */}
        <rect x="50" y="40" width="320" height="340" rx="18" fill="#92400e" stroke="#451a03" strokeWidth="6" />
        {/* Slate Dark Green Board */}
        <rect x="68" y="58" width="284" height="304" rx="10" fill="#064e3b" stroke="#042f2e" strokeWidth="3" />
        {/* Center White Clean Pad for QR Scannability */}
        <rect x="95" y="80" width="230" height="230" rx="14" fill="#ffffff" stroke="#042f2e" strokeWidth="4" />
        {/* Chalk Stick & Wooden Chalk Tray */}
        <rect x="90" y="362" width="240" height="14" rx="4" fill="#b45309" stroke="#451a03" strokeWidth="2.5" />
        <rect x="130" y="356" width="30" height="7" rx="2" fill="#ffffff" />
        <rect x="260" y="354" width="40" height="10" rx="3" fill="#38bdf8" />
      </g>
    ),
  },

  // ==================== FOOD & CAFE ====================
  {
    id: 'scene-pizza-box',
    category: 'food',
    name: 'Pizzeria Delivery Box',
    description: 'Cardboard pizza box with retro pizzeria stamp.',
    viewBox: [420, 480],
    slot: { x: 110, y: 110, width: 200, height: 200, cornerRadius: 16 },
    textSlots: [
      { id: 'header', x: 210, y: 75, defaultText: '★ ARTISAN PIZZERIA ★', fontSize: 13, align: 'middle', fontWeight: 'bold' },
      { id: 'cta', x: 210, y: 345, defaultText: 'Scan to Reorder Pizza 🍕', fontSize: 13, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#78350f', secondary: '#b45309', accent: '#dc2626', background: '#fef3c7', ink: '#78350f' },
    qrStyle: { dotsType: 'rounded', cornersSquareType: 'extra-rounded', cornersDotType: 'dot', dotsColor: '#991b1b', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'steam',
    renderSvgContent: (palette) => (
      <g>
        {/* Corrugated Kraft Box Body */}
        <rect x="50" y="50" width="320" height="350" rx="22" fill="#d97706" opacity="0.3" stroke={palette.primary} strokeWidth="6" />
        <rect x="60" y="60" width="300" height="330" rx="18" fill="#fef3c7" stroke={palette.primary} strokeWidth="4" />
        {/* Red Checkered Border Accent */}
        <rect x="75" y="75" width="270" height="300" rx="14" fill="none" stroke="#dc2626" strokeWidth="3" strokeDasharray="8 8" />
        {/* Center Clean Card for QR */}
        <rect x="95" y="95" width="230" height="230" rx="18" fill="#ffffff" stroke={palette.primary} strokeWidth="5" />
      </g>
    ),
  },

  {
    id: 'scene-burger-tray',
    category: 'food',
    name: 'Diner Serving Tray',
    description: 'Fast-casual serving tray with checkered liner and order code.',
    viewBox: [420, 500],
    slot: { x: 110, y: 120, width: 200, height: 200, cornerRadius: 16 },
    textSlots: [
      { id: 'cta', x: 210, y: 355, defaultText: 'Scan for Secret Menu 🍔', fontSize: 13, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#b91c1c', secondary: '#ef4444', accent: '#f59e0b', background: '#fef2f2', ink: '#991b1b' },
    qrStyle: { dotsType: 'extra-rounded', cornersSquareType: 'extra-rounded', cornersDotType: 'dot', dotsColor: '#991b1b', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Red Diner Tray */}
        <rect x="40" y="50" width="340" height="380" rx="30" fill="#dc2626" stroke="#7f1d1d" strokeWidth="7" />
        {/* Checkered Liner Paper */}
        <rect x="60" y="70" width="300" height="340" rx="20" fill="#ffffff" stroke="#b91c1c" strokeWidth="3" strokeDasharray="10 10" />
        {/* Standing Menu Card for QR */}
        <rect x="95" y="105" width="230" height="230" rx="18" fill="#ffffff" stroke="#991b1b" strokeWidth="5.5" />
      </g>
    ),
  },

  // ==================== DELIVERY & RETAIL ====================
  {
    id: 'scene-shopping-bag',
    category: 'retail',
    name: 'Kraft Shopping Tote',
    description: 'Boutique shopping tote bag with twisted rope handles.',
    viewBox: [400, 500],
    slot: { x: 100, y: 175, width: 200, height: 200, cornerRadius: 16 },
    textSlots: [
      { id: 'cta', x: 200, y: 415, defaultText: 'Scan for VIP Discount', fontSize: 13, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#451a03', secondary: '#b45309', accent: '#d97706', background: '#fffbeb', ink: '#451a03' },
    qrStyle: { dotsType: 'rounded', cornersSquareType: 'extra-rounded', cornersDotType: 'dot', dotsColor: '#451a03', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Rope Handles */}
        <path d="M 140 130 C 140 30 260 30 260 130" fill="none" stroke="#78350f" strokeWidth="14" strokeLinecap="round" />
        <path d="M 140 130 C 140 36 260 36 260 130" fill="none" stroke="#fef3c7" strokeWidth="4" strokeDasharray="6 6" strokeLinecap="round" />
        {/* Paper Bag Body */}
        <polygon points="60,120 340,120 360,450 40,450" fill="#fde68a" stroke={palette.primary} strokeWidth="7" />
        {/* Bag Top Folded Lip */}
        <rect x="55" y="120" width="290" height="24" rx="6" fill="#f59e0b" stroke={palette.primary} strokeWidth="4" />
        {/* Center Label for QR */}
        <rect x="85" y="160" width="230" height="230" rx="20" fill="#ffffff" stroke={palette.primary} strokeWidth="5.5" />
      </g>
    ),
  },

  {
    id: 'scene-price-tag',
    category: 'retail',
    name: 'Swing Price Tag',
    description: 'Apparel hang tag with brass eyelet and hanging twine string.',
    viewBox: [400, 520],
    slot: { x: 100, y: 170, width: 200, height: 200, cornerRadius: 16, rotate: 3 },
    textSlots: [
      { id: 'cta', x: 200, y: 410, defaultText: 'Scan for Product Info', fontSize: 13, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#1e293b', secondary: '#64748b', accent: '#f59e0b', background: '#f8fafc', ink: '#0f172a' },
    qrStyle: { dotsType: 'classy', cornersSquareType: 'dot', cornersDotType: 'dot', dotsColor: '#1e293b', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'float',
    renderSvgContent: (palette) => (
      <g>
        {/* Twine String entering from top */}
        <path d="M 190 0 C 160 50 220 80 200 120" fill="none" stroke="#94a3b8" strokeWidth="5" />
        {/* Tag Body with Cut Corners at Top */}
        <g transform="rotate(3 200 280)">
          <polygon points="100,140 140,80 260,80 300,140 300,440 100,440" fill="#ffffff" stroke={palette.primary} strokeWidth="6" />
          {/* Brass Eyelet Grommet */}
          <circle cx="200" cy="115" r="14" fill="#f59e0b" stroke={palette.primary} strokeWidth="4" />
          <circle cx="200" cy="115" r="7" fill="#ffffff" />
          {/* Inset border */}
          <polygon points="108,145 145,90 255,90 292,145 292,430 108,430" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" />
        </g>
      </g>
    ),
  },

  {
    id: 'scene-shipping-parcel',
    category: 'retail',
    name: 'Courier Cardboard Box',
    description: 'Cardboard package with packaging tape and shipping label.',
    viewBox: [420, 480],
    slot: { x: 110, y: 120, width: 200, height: 200, cornerRadius: 14 },
    textSlots: [
      { id: 'cta', x: 210, y: 350, defaultText: 'Track Shipment 📦', fontSize: 13, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#78350f', secondary: '#b45309', accent: '#0284c7', background: '#fef3c7', ink: '#78350f' },
    qrStyle: { dotsType: 'square', cornersSquareType: 'square', cornersDotType: 'square', dotsColor: '#451a03', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Cardboard Box Carton */}
        <rect x="50" y="60" width="320" height="340" rx="16" fill="#d97706" opacity="0.4" stroke={palette.primary} strokeWidth="6" />
        {/* Center Packaging Tape Band */}
        <rect x="180" y="60" width="60" height="340" fill="#fde68a" stroke={palette.primary} strokeWidth="3" />
        {/* Fragile Glass Icon on side */}
        <path d="M 75 100 L 95 100 L 90 120 L 80 120 Z" fill="#b91c1c" />
        {/* White Shipping Label for QR */}
        <rect x="95" y="105" width="230" height="230" rx="16" fill="#ffffff" stroke={palette.primary} strokeWidth="5.5" />
      </g>
    ),
  },

  // ==================== EVENTS & PROMO ====================
  {
    id: 'scene-ticket-stub',
    category: 'events',
    name: 'VIP Concert Ticket Stub',
    description: 'Vintage concert ticket stub with perforated tear-line.',
    viewBox: [420, 500],
    slot: { x: 110, y: 140, width: 200, height: 200, cornerRadius: 14 },
    textSlots: [
      { id: 'header', x: 210, y: 80, defaultText: '★ ADMIT ONE VIP ★', fontSize: 14, align: 'middle', fontWeight: 'bold' },
      { id: 'cta', x: 210, y: 385, defaultText: 'Scan for Event Entry', fontSize: 13, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#581c87', secondary: '#a855f7', accent: '#ec4899', background: '#faf5ff', ink: '#3b0764' },
    qrStyle: { dotsType: 'dots', cornersSquareType: 'extra-rounded', cornersDotType: 'dot', dotsColor: '#581c87', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Ticket Outer Body */}
        <rect x="50" y="45" width="320" height="390" rx="24" fill="#fdf4ff" stroke={palette.primary} strokeWidth="6" />
        {/* Circular Tear Notches on Sides */}
        <circle cx="50" cy="240" r="22" fill="#f8fafc" stroke={palette.primary} strokeWidth="6" />
        <circle cx="370" cy="240" r="22" fill="#f8fafc" stroke={palette.primary} strokeWidth="6" />
        {/* Perforated Tear Line */}
        <line x1="72" y1="240" x2="348" y2="240" stroke={palette.secondary} strokeWidth="3" strokeDasharray="8 8" opacity="0.6" />
        {/* Top Header Tag */}
        <rect x="75" y="60" width="270" height="34" rx="10" fill={palette.primary} />
        {/* White Center Pass Card for QR */}
        <rect x="95" y="125" width="230" height="230" rx="16" fill="#ffffff" stroke={palette.primary} strokeWidth="5.5" />
      </g>
    ),
  },

  {
    id: 'scene-megaphone',
    category: 'events',
    name: 'Promo Megaphone',
    description: 'Bullhorn megaphone projecting out an energetic announcement.',
    viewBox: [440, 480],
    slot: { x: 195, y: 110, width: 190, height: 190, cornerRadius: 18 },
    textSlots: [
      { id: 'cta', x: 290, y: 335, defaultText: 'Scan for Special Offer 📢', fontSize: 12, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#0f172a', secondary: '#ef4444', accent: '#f59e0b', background: '#fef2f2', ink: '#0f172a' },
    qrStyle: { dotsType: 'extra-rounded', cornersSquareType: 'extra-rounded', cornersDotType: 'dot', dotsColor: '#b91c1c', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Megaphone Cone entering from left */}
        <polygon points="50,170 160,110 160,290 50,230" fill="#ef4444" stroke={palette.primary} strokeWidth="6" />
        <rect x="40" y="180" width="20" height="40" rx="6" fill="#1e293b" stroke={palette.primary} strokeWidth="4" />
        <path d="M 80 230 L 100 310 L 120 305 L 105 230 Z" fill="#1e293b" stroke={palette.primary} strokeWidth="4" />
        {/* Sound Energy Rays */}
        <path d="M 165 140 Q 185 140 185 200 Q 185 260 165 260" fill="none" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
        {/* Announcement Speech Card for QR */}
        <rect x="180" y="95" width="220" height="220" rx="22" fill="#ffffff" stroke={palette.primary} strokeWidth="6" />
      </g>
    ),
  },

  {
    id: 'scene-concert-poster',
    category: 'events',
    name: 'Taped Gig Poster',
    description: 'Underground concert poster taped with masking tape corners.',
    viewBox: [400, 500],
    slot: { x: 100, y: 130, width: 200, height: 200, cornerRadius: 14 },
    textSlots: [
      { id: 'header', x: 200, y: 90, defaultText: 'LIVE MUSIC FESTIVAL', fontSize: 13, align: 'middle', fontWeight: 'bold' },
      { id: 'cta', x: 200, y: 375, defaultText: 'Scan for Lineup & Tickets', fontSize: 13, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#18181b', secondary: '#dc2626', accent: '#f59e0b', background: '#fafafa', ink: '#18181b' },
    qrStyle: { dotsType: 'square', cornersSquareType: 'square', cornersDotType: 'square', dotsColor: '#18181b', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Poster Paper Body */}
        <rect x="60" y="50" width="280" height="380" rx="14" fill="#ffffff" stroke={palette.primary} strokeWidth="6" />
        {/* Diagonal Masking Tape on Corners */}
        <polygon points="40,65 75,30 95,50 60,85" fill="#fde68a" stroke={palette.primary} strokeWidth="3" />
        <polygon points="325,35 360,70 340,90 305,55" fill="#fde68a" stroke={palette.primary} strokeWidth="3" />
        <polygon points="45,395 80,430 60,450 25,415" fill="#fde68a" stroke={palette.primary} strokeWidth="3" />
        <polygon points="340,390 375,425 355,445 320,410" fill="#fde68a" stroke={palette.primary} strokeWidth="3" />
        {/* Poster Inner Dark Block for QR */}
        <rect x="85" y="115" width="230" height="230" rx="16" fill="#ffffff" stroke={palette.primary} strokeWidth="4" />
      </g>
    ),
  },

  {
    id: 'scene-billboard',
    category: 'events',
    name: 'Highway Billboard',
    description: 'Outdoor advertising billboard with steel posts and spotlights.',
    viewBox: [440, 480],
    slot: { x: 120, y: 75, width: 200, height: 200, cornerRadius: 10 },
    textSlots: [
      { id: 'cta', x: 220, y: 310, defaultText: 'Scan Billboard Campaign', fontSize: 13, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#0f172a', secondary: '#334155', accent: '#3b82f6', background: '#f8fafc', ink: '#0f172a' },
    qrStyle: { dotsType: 'rounded', cornersSquareType: 'extra-rounded', cornersDotType: 'dot', dotsColor: '#0f172a', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Steel Pylon Legs */}
        <rect x="130" y="330" width="18" height="130" fill="#64748b" stroke={palette.primary} strokeWidth="5" />
        <rect x="290" y="330" width="18" height="130" fill="#64748b" stroke={palette.primary} strokeWidth="5" />
        {/* Billboard Board Frame */}
        <rect x="50" y="40" width="340" height="290" rx="14" fill="#e2e8f0" stroke={palette.primary} strokeWidth="7" />
        {/* Top Spotlight Mounts */}
        <circle cx="120" cy="30" r="10" fill="#f59e0b" stroke={palette.primary} strokeWidth="3" />
        <circle cx="320" cy="30" r="10" fill="#f59e0b" stroke={palette.primary} strokeWidth="3" />
        {/* White Center Canvas for QR */}
        <rect x="105" y="60" width="230" height="230" rx="12" fill="#ffffff" stroke={palette.primary} strokeWidth="4.5" />
      </g>
    ),
  },

  // ==================== SOCIAL & CREATOR ====================
  {
    id: 'scene-phone-mockup',
    category: 'social',
    name: 'Smartphone Screen',
    description: 'Modern smartphone mockup displaying the QR on the mobile screen.',
    viewBox: [400, 520],
    slot: { x: 100, y: 130, width: 200, height: 200, cornerRadius: 20 },
    textSlots: [
      { id: 'header', x: 200, y: 95, defaultText: '@your_channel', fontSize: 13, align: 'middle', fontWeight: 'bold' },
      { id: 'cta', x: 200, y: 380, defaultText: 'Tap or Scan to Follow 📱', fontSize: 13, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#09090b', secondary: '#27272a', accent: '#ec4899', background: '#f4f4f5', ink: '#ffffff' },
    qrStyle: { dotsType: 'rounded', cornersSquareType: 'extra-rounded', cornersDotType: 'dot', dotsColor: '#09090b', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Phone Chassis */}
        <rect x="65" y="30" width="270" height="440" rx="42" fill="#09090b" stroke="#27272a" strokeWidth="6" />
        {/* Phone Glass Screen */}
        <rect x="77" y="42" width="246" height="416" rx="34" fill="#ffffff" />
        {/* Dynamic Island / Top Camera Notch */}
        <rect x="160" y="52" width="80" height="18" rx="9" fill="#09090b" />
        {/* Center QR Inset */}
        <rect x="90" y="120" width="220" height="220" rx="22" fill="#ffffff" stroke="#e4e4e7" strokeWidth="3" />
        {/* Bottom Home Indicator Bar */}
        <rect x="155" y="440" width="90" height="5" rx="2.5" fill="#09090b" />
      </g>
    ),
  },

  {
    id: 'scene-polaroid',
    category: 'social',
    name: 'Instant Polaroid Photo',
    description: 'Vintage instant photo print with handwritten marker caption.',
    viewBox: [400, 500],
    slot: { x: 100, y: 95, width: 200, height: 200, cornerRadius: 8, rotate: -2 },
    textSlots: [
      { id: 'cta', x: 200, y: 375, defaultText: 'Scan Our Memories ✨', fontSize: 14, align: 'middle', fontWeight: 600 },
    ],
    palette: { primary: '#1c1917', secondary: '#78716c', accent: '#f43f5e', background: '#fafaf9', ink: '#1c1917' },
    qrStyle: { dotsType: 'classy-rounded', cornersSquareType: 'square', cornersDotType: 'dot', dotsColor: '#1c1917', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        <g transform="rotate(-2 200 240)">
          {/* Polaroid Thick White Photo Paper */}
          <rect x="65" y="55" width="270" height="360" rx="14" fill="#ffffff" stroke={palette.primary} strokeWidth="5.5" />
          {/* Square Photo Window for QR */}
          <rect x="88" y="80" width="224" height="224" rx="8" fill="#f5f5f4" stroke={palette.primary} strokeWidth="3" />
          {/* Bottom Marker Underline */}
          <line x1="120" y1="390" x2="280" y2="390" stroke={palette.accent} strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        </g>
      </g>
    ),
  },

  {
    id: 'scene-speech-bubble',
    category: 'social',
    name: 'Comic Speech Balloon',
    description: 'Pop-art comic book speech balloon with pointer tail.',
    viewBox: [420, 480],
    slot: { x: 110, y: 95, width: 200, height: 200, cornerRadius: 26 },
    textSlots: [
      { id: 'cta', x: 210, y: 335, defaultText: 'Join the Discussion! 💬', fontSize: 13, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#0f172a', secondary: '#3b82f6', accent: '#fbbf24', background: '#eff6ff', ink: '#0f172a' },
    qrStyle: { dotsType: 'dots', cornersSquareType: 'dot', cornersDotType: 'dot', dotsColor: '#1e40af', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Speech Bubble Outline and Pointer Tail */}
        <path
          d="M 80 60 L 340 60 Q 370 60 370 90 L 370 330 Q 370 360 340 360 L 170 360 L 90 430 L 110 360 L 80 360 Q 50 360 50 330 L 50 90 Q 50 60 80 60 Z"
          fill="#ffffff"
          stroke={palette.primary}
          strokeWidth="7"
        />
        {/* Halftone Accent Dots in corner */}
        <circle cx="340" cy="85" r="4" fill={palette.accent} />
        <circle cx="355" cy="85" r="4" fill={palette.accent} />
        <circle cx="340" cy="100" r="4" fill={palette.accent} />
      </g>
    ),
  },

  {
    id: 'scene-heart-badge',
    category: 'social',
    name: 'Loved Creator Heart',
    description: 'A 3D heart crest badge with ribbon banner.',
    viewBox: [420, 500],
    slot: { x: 110, y: 140, width: 200, height: 200, cornerRadius: 20 },
    textSlots: [
      { id: 'cta', x: 210, y: 395, defaultText: 'Scan with Love ❤️', fontSize: 14, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#9f1239', secondary: '#f43f5e', accent: '#fb7185', background: '#fff1f2', ink: '#881337' },
    qrStyle: { dotsType: 'extra-rounded', cornersSquareType: 'extra-rounded', cornersDotType: 'dot', dotsColor: '#be123c', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Heart Crest Silhouette */}
        <path
          d="M 210 110 C 170 40 80 60 80 150 C 80 250 210 340 210 340 C 210 340 340 250 340 150 C 340 60 250 40 210 110 Z"
          fill="#f43f5e"
          stroke={palette.primary}
          strokeWidth="7"
        />
        {/* Clean Center Card for QR */}
        <rect x="95" y="125" width="230" height="230" rx="22" fill="#ffffff" stroke={palette.primary} strokeWidth="5.5" />
      </g>
    ),
  },

  // ==================== TRAVEL & HOTEL ====================
  {
    id: 'scene-luggage-tag',
    category: 'travel',
    name: 'Vintage Luggage Tag',
    description: 'Classic leather travel baggage tag with strap and buckle.',
    viewBox: [400, 520],
    slot: { x: 100, y: 170, width: 200, height: 200, cornerRadius: 18, rotate: -2 },
    textSlots: [
      { id: 'header', x: 200, y: 140, defaultText: 'BON VOYAGE', fontSize: 13, align: 'middle', fontWeight: 'bold' },
      { id: 'cta', x: 200, y: 410, defaultText: 'Scan for Flight & Hotel ✈️', fontSize: 13, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#1c1917', secondary: '#78350f', accent: '#f59e0b', background: '#fffbeb', ink: '#1c1917' },
    qrStyle: { dotsType: 'classy', cornersSquareType: 'square', cornersDotType: 'dot', dotsColor: '#1c1917', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Leather Buckle Loop at Top */}
        <path d="M 180 20 L 180 100 L 220 100 L 220 20" fill="none" stroke="#78350f" strokeWidth="16" strokeLinecap="round" />
        <rect x="185" y="55" width="30" height="20" rx="4" fill="#f59e0b" stroke={palette.primary} strokeWidth="3" />
        {/* Tag Body */}
        <g transform="rotate(-2 200 280)">
          <rect x="75" y="100" width="250" height="350" rx="28" fill="#fef3c7" stroke={palette.primary} strokeWidth="7" />
          {/* Top Grommet Hole */}
          <circle cx="200" cy="120" r="12" fill="#d97706" stroke={palette.primary} strokeWidth="3.5" />
          <circle cx="200" cy="120" r="6" fill="#ffffff" />
          {/* Card for QR */}
          <rect x="90" y="155" width="220" height="220" rx="18" fill="#ffffff" stroke={palette.primary} strokeWidth="5" />
        </g>
      </g>
    ),
  },

  {
    id: 'scene-hotel-door-hanger',
    category: 'travel',
    name: 'Hotel Door Hanger',
    description: 'Do Not Disturb door handle hanger for hotel guest services.',
    viewBox: [400, 520],
    slot: { x: 100, y: 190, width: 200, height: 200, cornerRadius: 18 },
    textSlots: [
      { id: 'header', x: 200, y: 160, defaultText: 'ROOM CONCIERGE', fontSize: 13, align: 'middle', fontWeight: 'bold' },
      { id: 'cta', x: 200, y: 430, defaultText: 'Scan for Room Service 🛎️', fontSize: 13, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#1e1b4b', secondary: '#312e81', accent: '#eab308', background: '#e0e7ff', ink: '#1e1b4b' },
    qrStyle: { dotsType: 'classy-rounded', cornersSquareType: 'extra-rounded', cornersDotType: 'dot', dotsColor: '#1e1b4b', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'float',
    renderSvgContent: (palette) => (
      <g>
        {/* Door Hanger Silhouette with Top Hook Cutout */}
        <path
          d="M 80 40 
             L 260 40 
             C 320 40 320 140 260 140 
             C 220 140 200 110 200 110 
             C 170 110 170 70 200 70 
             C 240 70 240 100 220 100 
             L 320 100 
             L 320 460 
             C 320 480 300 490 280 490 
             L 120 490 
             C 100 490 80 480 80 460 
             Z"
          fill="#ffffff"
          stroke={palette.primary}
          strokeWidth="7"
        />
        {/* Header Ribbon */}
        <rect x="95" y="145" width="210" height="28" rx="8" fill={palette.primary} />
      </g>
    ),
  },

  {
    id: 'scene-boarding-pass',
    category: 'travel',
    name: 'Airline Boarding Pass',
    description: 'Flight airline boarding pass with barcode and gate details.',
    viewBox: [440, 480],
    slot: { x: 215, y: 110, width: 185, height: 185, cornerRadius: 12 },
    textSlots: [
      { id: 'header', x: 125, y: 140, defaultText: 'FLIGHT 804', fontSize: 13, align: 'middle', fontWeight: 'bold' },
      { id: 'cta', x: 308, y: 330, defaultText: 'Scan Mobile Gate Pass', fontSize: 12, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#0369a1', secondary: '#0284c7', accent: '#f59e0b', background: '#f0f9ff', ink: '#0c4a6e' },
    qrStyle: { dotsType: 'rounded', cornersSquareType: 'extra-rounded', cornersDotType: 'dot', dotsColor: '#0369a1', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Boarding Pass Body */}
        <rect x="40" y="70" width="360" height="310" rx="20" fill="#ffffff" stroke={palette.primary} strokeWidth="6" />
        {/* Perforated Stub Divider */}
        <line x1="200" y1="70" x2="200" y2="380" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6 6" />
        {/* Airplane Icon */}
        <path d="M 125 180 L 110 200 L 125 210 L 140 200 Z" fill={palette.primary} />
        {/* Left Stub Barcode Mockup */}
        <line x1="65" y1="260" x2="65" y2="320" stroke={palette.primary} strokeWidth="4" />
        <line x1="75" y1="260" x2="75" y2="320" stroke={palette.primary} strokeWidth="2" />
        <line x1="85" y1="260" x2="85" y2="320" stroke={palette.primary} strokeWidth="6" />
        <line x1="100" y1="260" x2="100" y2="320" stroke={palette.primary} strokeWidth="3" />
        <line x1="115" y1="260" x2="115" y2="320" stroke={palette.primary} strokeWidth="5" />
      </g>
    ),
  },

  {
    id: 'scene-map-pin',
    category: 'travel',
    name: '3D Map Location Pin',
    description: 'Giant location pin marker highlighting a local venue.',
    viewBox: [420, 500],
    slot: { x: 110, y: 110, width: 200, height: 200, cornerRadius: 26 },
    textSlots: [
      { id: 'cta', x: 210, y: 350, defaultText: 'Scan for Directions 📍', fontSize: 13, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#b91c1c', secondary: '#ef4444', accent: '#f59e0b', background: '#fef2f2', ink: '#991b1b' },
    qrStyle: { dotsType: 'dots', cornersSquareType: 'dot', cornersDotType: 'dot', dotsColor: '#b91c1c', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Map Pin Silhouette */}
        <path
          d="M 210 40 
             C 120 40 70 90 70 170 
             C 70 270 210 450 210 450 
             C 210 450 350 270 350 170 
             C 350 90 300 40 210 40 Z"
          fill="#ef4444"
          stroke="#991b1b"
          strokeWidth="8"
        />
        {/* White Circular Center Plate for QR */}
        <circle cx="210" cy="210" r="120" fill="#ffffff" stroke="#991b1b" strokeWidth="6" />
      </g>
    ),
  },

  // ==================== HEALTH & WELLNESS ====================
  {
    id: 'scene-medical-clipboard',
    category: 'health',
    name: 'Clinic Medical Clipboard',
    description: 'Doctor clipboard with metal clip for patient check-in.',
    viewBox: [400, 500],
    slot: { x: 100, y: 140, width: 200, height: 200, cornerRadius: 14 },
    textSlots: [
      { id: 'header', x: 200, y: 115, defaultText: 'PATIENT CHECK-IN', fontSize: 13, align: 'middle', fontWeight: 'bold' },
      { id: 'cta', x: 200, y: 385, defaultText: 'Scan for Health Portal 🩺', fontSize: 13, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#0f766e', secondary: '#14b8a6', accent: '#0284c7', background: '#f0fdfa', ink: '#115e59' },
    qrStyle: { dotsType: 'rounded', cornersSquareType: 'extra-rounded', cornersDotType: 'dot', dotsColor: '#0f766e', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Hardboard Base */}
        <rect x="50" y="45" width="300" height="410" rx="20" fill="#b45309" stroke="#78350f" strokeWidth="6" />
        {/* Paper Sheet */}
        <rect x="68" y="65" width="264" height="370" rx="12" fill="#ffffff" stroke="#0f766e" strokeWidth="4" />
        {/* Metal Top Clip */}
        <rect x="140" y="30" width="120" height="40" rx="8" fill="#94a3b8" stroke="#334155" strokeWidth="4" />
        <circle cx="200" cy="50" r="8" fill="#475569" />
        {/* Medical Cross Symbol */}
        <polygon points="190,85 210,85 210,95 220,95 220,105 210,105 210,115 190,115 190,105 180,105 180,95 190,95" fill="#0f766e" />
      </g>
    ),
  },

  {
    id: 'scene-pill-bottle',
    category: 'health',
    name: 'Prescription Pill Bottle',
    description: 'Amber pharmacy prescription medicine bottle with white label.',
    viewBox: [400, 500],
    slot: { x: 105, y: 155, width: 190, height: 190, cornerRadius: 12 },
    textSlots: [
      { id: 'cta', x: 200, y: 395, defaultText: 'Scan for Dosage & Refills 💊', fontSize: 13, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#1e293b', secondary: '#ea580c', accent: '#0284c7', background: '#fff7ed', ink: '#1e293b' },
    qrStyle: { dotsType: 'square', cornersSquareType: 'square', cornersDotType: 'square', dotsColor: '#1e293b', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Childproof White Ribbed Cap */}
        <rect x="110" y="40" width="180" height="45" rx="10" fill="#ffffff" stroke={palette.primary} strokeWidth="6" />
        <line x1="140" y1="45" x2="140" y2="80" stroke="#cbd5e1" strokeWidth="3" />
        <line x1="170" y1="45" x2="170" y2="80" stroke="#cbd5e1" strokeWidth="3" />
        <line x1="200" y1="45" x2="200" y2="80" stroke="#cbd5e1" strokeWidth="3" />
        <line x1="230" y1="45" x2="230" y2="80" stroke="#cbd5e1" strokeWidth="3" />
        <line x1="260" y1="45" x2="260" y2="80" stroke="#cbd5e1" strokeWidth="3" />
        {/* Amber Translucent Bottle Body */}
        <rect x="80" y="85" width="240" height="360" rx="28" fill="#ea580c" opacity="0.6" stroke={palette.primary} strokeWidth="7" />
        {/* Pharmacy White Label for QR */}
        <rect x="90" y="130" width="220" height="250" rx="16" fill="#ffffff" stroke={palette.primary} strokeWidth="5.5" />
      </g>
    ),
  },

  {
    id: 'scene-yoga-mat',
    category: 'health',
    name: 'Rolled Yoga Mat',
    description: 'Rolled fitness yoga mat with branded carry strap tag.',
    viewBox: [420, 480],
    slot: { x: 110, y: 120, width: 200, height: 200, cornerRadius: 16 },
    textSlots: [
      { id: 'cta', x: 210, y: 360, defaultText: 'Scan for Class Schedule 🧘', fontSize: 13, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#4c1d95', secondary: '#7c3aed', accent: '#10b981', background: '#f5f3ff', ink: '#4c1d95' },
    qrStyle: { dotsType: 'classy-rounded', cornersSquareType: 'dot', cornersDotType: 'dot', dotsColor: '#4c1d95', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Rolled Cylinder Mat Silhouette */}
        <ellipse cx="80" cy="240" rx="30" ry="80" fill="#7c3aed" stroke={palette.primary} strokeWidth="6" />
        <rect x="80" y="160" width="280" height="160" fill="#8b5cf6" stroke={palette.primary} strokeWidth="6" />
        <ellipse cx="360" cy="240" rx="30" ry="80" fill="#6d28d9" stroke={palette.primary} strokeWidth="6" />
        {/* Black Elastic Straps */}
        <rect x="130" y="150" width="20" height="180" fill="#1e1b4b" />
        <rect x="290" y="150" width="20" height="180" fill="#1e1b4b" />
        {/* Center Studio Pass Card for QR */}
        <rect x="95" y="105" width="230" height="230" rx="18" fill="#ffffff" stroke={palette.primary} strokeWidth="5.5" />
      </g>
    ),
  },

  {
    id: 'scene-leaf-badge',
    category: 'health',
    name: 'Botanical Eco Leaf',
    description: 'Eco-friendly organic leaf emblem with wellness seal.',
    viewBox: [420, 500],
    slot: { x: 110, y: 130, width: 200, height: 200, cornerRadius: 22 },
    textSlots: [
      { id: 'cta', x: 210, y: 380, defaultText: 'Scan for Organic Certification 🌿', fontSize: 12, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#064e3b', secondary: '#059669', accent: '#10b981', background: '#ecfdf5', ink: '#064e3b' },
    qrStyle: { dotsType: 'rounded', cornersSquareType: 'extra-rounded', cornersDotType: 'dot', dotsColor: '#065f46', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Organic Shield Crest */}
        <path
          d="M 210 50 
             C 120 70 70 120 70 230 
             C 70 350 210 440 210 440 
             C 210 440 350 350 350 230 
             C 350 120 300 70 210 50 Z"
          fill="#059669"
          stroke="#064e3b"
          strokeWidth="7"
        />
        {/* Sprouting Leaf at Top */}
        <path d="M 210 50 Q 240 20 270 40 Q 250 65 210 50 Z" fill="#34d399" stroke="#064e3b" strokeWidth="3" />
        {/* Center White Plate for QR */}
        <rect x="95" y="115" width="230" height="230" rx="24" fill="#ffffff" stroke="#064e3b" strokeWidth="5.5" />
      </g>
    ),
  },

  // ==================== MINIMAL & SKETCH ====================
  {
    id: 'scene-scanner-brackets',
    category: 'minimal',
    name: 'Optical Viewfinder HUD',
    description: 'Camera optical autofocus targeting brackets and grid.',
    viewBox: [400, 480],
    slot: { x: 100, y: 100, width: 200, height: 200, cornerRadius: 10 },
    textSlots: [
      { id: 'cta', x: 200, y: 345, defaultText: 'ALIGN CAMERA WITH CODE', fontSize: 12, align: 'middle', fontWeight: 'bold' },
    ],
    palette: { primary: '#0f172a', secondary: '#38bdf8', accent: '#ef4444', background: '#ffffff', ink: '#0f172a' },
    qrStyle: { dotsType: 'square', cornersSquareType: 'square', cornersDotType: 'square', dotsColor: '#0f172a', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Camera HUD Corner Brackets */}
        <path d="M 70 120 L 70 80 L 110 80" fill="none" stroke={palette.primary} strokeWidth="8" strokeLinecap="round" />
        <path d="M 330 120 L 330 80 L 290 80" fill="none" stroke={palette.primary} strokeWidth="8" strokeLinecap="round" />
        <path d="M 70 280 L 70 320 L 110 320" fill="none" stroke={palette.primary} strokeWidth="8" strokeLinecap="round" />
        <path d="M 330 280 L 330 320 L 290 320" fill="none" stroke={palette.primary} strokeWidth="8" strokeLinecap="round" />
        {/* Center Crosshairs */}
        <line x1="200" y1="65" x2="200" y2="85" stroke="#ef4444" strokeWidth="3" />
        <line x1="200" y1="315" x2="200" y2="335" stroke="#ef4444" strokeWidth="3" />
        {/* Clean Center Screen for QR */}
        <rect x="90" y="90" width="220" height="220" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
      </g>
    ),
  },

  {
    id: 'scene-torn-paper',
    category: 'minimal',
    name: 'Torn Spiral Notebook',
    description: 'Ripped spiral notepad sheet with distressed perforated edge.',
    viewBox: [400, 500],
    slot: { x: 100, y: 120, width: 200, height: 200, cornerRadius: 10 },
    textSlots: [
      { id: 'cta', x: 200, y: 370, defaultText: 'Scan the Note 📝', fontSize: 13, align: 'middle', fontWeight: 600 },
    ],
    palette: { primary: '#27272a', secondary: '#71717a', accent: '#3b82f6', background: '#f4f4f5', ink: '#18181b' },
    qrStyle: { dotsType: 'classy', cornersSquareType: 'square', cornersDotType: 'dot', dotsColor: '#27272a', backgroundColor: '#ffffff', errorCorrectionLevel: 'Q' },
    animation: 'bounce',
    renderSvgContent: (palette) => (
      <g>
        {/* Paper Sheet Body with Top Torn Edge */}
        <path
          d="M 60 70 
             Q 75 60 90 70 Q 105 80 120 70 Q 135 60 150 70 Q 165 80 180 70 Q 195 60 210 70 Q 225 80 240 70 Q 255 60 270 70 Q 285 80 300 70 Q 315 60 330 70 
             L 340 430 L 60 430 Z"
          fill="#ffffff"
          stroke={palette.primary}
          strokeWidth="5.5"
        />
        {/* Spiral Notebook Holes */}
        <circle cx="85" cy="100" r="7" fill="#e4e4e7" stroke={palette.primary} strokeWidth="3" />
        <circle cx="140" cy="100" r="7" fill="#e4e4e7" stroke={palette.primary} strokeWidth="3" />
        <circle cx="195" cy="100" r="7" fill="#e4e4e7" stroke={palette.primary} strokeWidth="3" />
        <circle cx="250" cy="100" r="7" fill="#e4e4e7" stroke={palette.primary} strokeWidth="3" />
        <circle cx="305" cy="100" r="7" fill="#e4e4e7" stroke={palette.primary} strokeWidth="3" />
        {/* Ruling Lines */}
        <line x1="75" y1="350" x2="325" y2="350" stroke="#93c5fd" strokeWidth="2" opacity="0.6" />
        <line x1="75" y1="390" x2="325" y2="390" stroke="#93c5fd" strokeWidth="2" opacity="0.6" />
      </g>
    ),
  },
];
