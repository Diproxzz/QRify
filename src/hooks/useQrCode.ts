import { useEffect, useRef, useState, useCallback } from 'react';
import QRCodeStyling, { Options } from 'qr-code-styling';
import qrcode from 'qrcode-generator';
import type { SceneQrStyle, LogoConfig } from '../types/qr';

interface UseQrCodeProps {
  data: string;
  qrStyle: SceneQrStyle;
  logoConfig?: LogoConfig;
  size?: number;
}

// Generate fast synchronous clean SVG paths using qrcode-generator
function generateFallbackSvg(data: string, ecLevel: 'L' | 'M' | 'Q' | 'H', color: string): string {
  try {
    const qr = qrcode(0, ecLevel);
    qr.addData(data || 'https://qrify.app');
    qr.make();
    const count = qr.getModuleCount();
    const margin = 2;
    const total = count + margin * 2;
    const cellSize = 280 / total;

    const paths: string[] = [];
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (qr.isDark(r, c)) {
          const x = (c + margin) * cellSize;
          const y = (r + margin) * cellSize;
          paths.push(`M${x.toFixed(1)},${y.toFixed(1)} h${cellSize.toFixed(1)} v${cellSize.toFixed(1)} h-${cellSize.toFixed(1)} Z`);
        }
      }
    }
    return `<path d="${paths.join(' ')}" fill="${color}" />`;
  } catch {
    return `<rect width="280" height="280" fill="${color}" />`;
  }
}

export function useQrCode({ data, qrStyle, logoConfig, size = 280 }: UseQrCodeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const qrInstanceRef = useRef<QRCodeStyling | null>(null);

  // Initialize with synchronous fallback SVG
  const [qrSvgHtml, setQrSvgHtml] = useState<string>(() =>
    generateFallbackSvg(data, qrStyle.errorCorrectionLevel, qrStyle.dotsColor)
  );

  const buildOptions = useCallback((): Options => {
    return {
      width: size,
      height: size,
      type: 'svg',
      data: data || 'https://qrify.app',
      margin: 4,
      qrOptions: {
        errorCorrectionLevel: logoConfig?.url ? 'H' : qrStyle.errorCorrectionLevel,
      },
      dotsOptions: {
        type: qrStyle.dotsType,
        color: qrStyle.dotsColor,
      },
      cornersSquareOptions: {
        type: qrStyle.cornersSquareType,
        color: qrStyle.dotsColor,
      },
      cornersDotOptions: {
        type: qrStyle.cornersDotType,
        color: qrStyle.dotsColor,
      },
      backgroundOptions: {
        color: '#ffffff',
      },
    };
  }, [data, qrStyle, logoConfig, size]);

  // Extract SVG markup from hidden container
  const updateSvgMarkup = useCallback(() => {
    if (!containerRef.current) return;
    const svgEl = containerRef.current.querySelector('svg');
    if (svgEl) {
      setQrSvgHtml(svgEl.innerHTML);
    }
  }, []);

  // Initial mount
  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const qr = new QRCodeStyling(buildOptions());
    qrInstanceRef.current = qr;
    qr.append(containerRef.current);

    setTimeout(() => {
      updateSvgMarkup();
    }, 50);

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = '';
      qrInstanceRef.current = null;
    };
  }, []);

  // Prop updates
  useEffect(() => {
    if (!qrInstanceRef.current) return;
    qrInstanceRef.current.update(buildOptions());

    // Update synchronous markup immediately
    setQrSvgHtml(generateFallbackSvg(data, qrStyle.errorCorrectionLevel, qrStyle.dotsColor));

    // Then refine with styled SVG
    setTimeout(() => {
      updateSvgMarkup();
    }, 40);
  }, [buildOptions, data, qrStyle.errorCorrectionLevel, qrStyle.dotsColor, updateSvgMarkup]);

  return {
    containerRef,
    qrInstance: qrInstanceRef.current,
    qrSvgHtml,
  };
}
