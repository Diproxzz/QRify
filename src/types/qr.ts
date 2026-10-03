import type {
  DotType as LibDotType,
  CornerDotType as LibCornerDotType,
  CornerSquareType as LibCornerSquareType,
  ErrorCorrectionLevel as LibErrorCorrectionLevel,
} from 'qr-code-styling';

export type DotType = LibDotType;
export type CornerDotType = LibCornerDotType;
export type CornerSquareType = LibCornerSquareType;
export type ErrorCorrectionLevel = LibErrorCorrectionLevel;

export type SceneCategory =
  | 'all'
  | 'business'
  | 'education'
  | 'food'
  | 'retail'
  | 'events'
  | 'social'
  | 'travel'
  | 'health'
  | 'minimal';

export type ContentType = 'url' | 'text' | 'email' | 'phone' | 'wifi' | 'vcard';

export interface WifiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface VCardData {
  firstName: string;
  lastName: string;
  organization: string;
  title: string;
  phone: string;
  email: string;
  url: string;
  note?: string;
}

export interface EmailData {
  email: string;
  subject: string;
  body: string;
}

export interface PhoneData {
  phone: string;
}

export interface SceneSlot {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate?: number;      // degrees (-8 to +8 safe limit)
  skewX?: number;
  skewY?: number;
  cornerRadius?: number;
}

export interface TextSlot {
  id: string;
  x: number;
  y: number;
  defaultText: string;
  fontSize: number;
  align: 'start' | 'middle' | 'end';
  rotate?: number;
  fontWeight?: string | number;
  color?: string;
  colorVar?: string;
  maxWidth?: number;
}

export interface ScenePalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  ink: string;
}

export interface SceneQrStyle {
  dotsType: DotType;
  cornersSquareType: CornerSquareType;
  cornersDotType: CornerDotType;
  dotsColor: string;
  backgroundColor: string;
  errorCorrectionLevel: ErrorCorrectionLevel;
}

export type SceneAnimation =
  | 'steam'
  | 'slide-out'
  | 'ride'
  | 'scribble'
  | 'bounce'
  | 'float'
  | 'pour'
  | 'none';

export interface LogoSlot {
  x: number;
  y: number;
  size: number;
}

export interface SceneTemplate {
  id: string;
  category: Exclude<SceneCategory, 'all'>;
  name: string;
  description: string;
  viewBox: [number, number]; // [width, height] e.g. [400, 500]
  slot: SceneSlot;
  textSlots: TextSlot[];
  palette: ScenePalette;
  qrStyle: SceneQrStyle;
  animation: SceneAnimation;
  logoSlot?: LogoSlot;
  // SVG illustration generator or definition (can receive qrSlot element to embed inside animated scene groups)
  renderSvgContent: (palette: ScenePalette, isAnimated: boolean, qrSlot?: React.ReactNode) => React.ReactNode;
}

export interface LogoConfig {
  url: string | null;
  size: number; // 0.1 to 0.32
  margin: number;
  shape: 'circle' | 'square' | 'rounded' | 'none';
  bgColor: string;
  placeInLogoSlot?: boolean; // If true and template has logoSlot, place in template logoSlot
}

export type ExportResolution = 512 | 1024 | 2048 | 4096;

export interface ExportSettings {
  resolution: ExportResolution;
  transparentBg: boolean;
  includeFrame: boolean;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  contentType: ContentType;
  rawText: string;
  encodedData: string;
  templateId: string;
  templateName: string;
  thumbnailUrl?: string;
  accentColor: string;
}

export interface ScannabilityReport {
  score: number;
  contrastRatio: number;
  level: 'excellent' | 'good' | 'warning' | 'critical';
  statusText: string;
  details: string[];
}
