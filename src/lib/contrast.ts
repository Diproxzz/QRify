import type { LogoConfig, ScannabilityReport } from '../types/qr';

export interface ScannabilityQrInput {
  dotsColor: string;
  backgroundColor?: string;
  errorCorrectionLevel: string;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return { r, g, b };
  }
  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

export function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return 1;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export function evaluateScannability(
  qrConfig: ScannabilityQrInput,
  logoConfig: LogoConfig
): ScannabilityReport {
  const fgColor = qrConfig.dotsColor || '#000000';
  const bgColor = qrConfig.backgroundColor || '#ffffff';

  const contrastRatio = Number(getContrastRatio(fgColor, bgColor).toFixed(1));
  const details: string[] = [];
  let score = 100;

  // Contrast check
  if (contrastRatio >= 7.0) {
    details.push(`High contrast ratio (${contrastRatio}:1) ensures lightning-fast detection.`);
  } else if (contrastRatio >= 4.5) {
    details.push(`Good contrast ratio (${contrastRatio}:1) meets WCAG standards for reliable scanning.`);
    score -= 10;
  } else if (contrastRatio >= 3.0) {
    details.push(`Borderline contrast (${contrastRatio}:1). Works under normal lighting, but may struggle in dim conditions.`);
    score -= 30;
  } else {
    details.push(`Low contrast (${contrastRatio}:1)! Phone cameras may fail to read this code.`);
    score -= 60;
  }

  // Logo checks
  if (logoConfig.url) {
    if (!logoConfig.placeInLogoSlot && logoConfig.size > 0.28) {
      details.push(`Center logo is ${Math.round(logoConfig.size * 100)}% of QR area. Keeping it under 28% improves scan stability.`);
      score -= 20;
    } else {
      details.push(`Logo is well-balanced within Reed-Solomon redundancy.`);
    }

    if (qrConfig.errorCorrectionLevel !== 'H' && qrConfig.errorCorrectionLevel !== 'Q') {
      details.push(`Error correction level (${qrConfig.errorCorrectionLevel}) is low for logo embedding. Level 'H' is recommended.`);
      score -= 15;
    }
  }

  score = Math.max(10, Math.min(100, score));

  let level: ScannabilityReport['level'] = 'excellent';
  let statusText = 'Looks scannable ✓';

  if (score >= 85) {
    level = 'excellent';
    statusText = 'Excellent scannability ✓';
  } else if (score >= 65) {
    level = 'good';
    statusText = 'Good scannability ✓';
  } else if (score >= 45) {
    level = 'warning';
    statusText = 'Risky scan conditions ⚠';
  } else {
    level = 'critical';
    statusText = 'Unreliable scannability ✕';
  }

  return {
    score,
    contrastRatio,
    level,
    statusText,
    details,
  };
}
