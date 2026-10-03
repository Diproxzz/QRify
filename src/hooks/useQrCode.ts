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
  const hiddenHostRef = useRef<HTMLDivElement | null>(null);
  const qrInstanceRef = useRef<QRCodeStyling | null>(null);

  // Initialize with synchronous fallback SVG using the current data
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

  const updateSvgMarkup = useCallback(() => {
    if (!hiddenHostRef.current) return;
    const svgEl = hiddenHostRef.current.querySelector('svg');
    if (svgEl && svgEl.innerHTML) {
      setQrSvgHtml(svgEl.innerHTML);
    }
  }, []);

  // Initial mount: create and attach offscreen host container
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const div = document.createElement('div');
    div.style.cssText =
      'position:fixed;left:-9999px;top:-9999px;width:280px;height:280px;overflow:hidden;opacity:0;pointer-events:none;';
    div.setAttribute('aria-hidden', 'true');
    document.body.appendChild(div);
    hiddenHostRef.current = div;

    try {
      const qr = new QRCodeStyling(buildOptions());
      qrInstanceRef.current = qr;
      qr.append(div);

      setTimeout(() => {
        updateSvgMarkup();
      }, 50);
    } catch (e) {
      console.warn('QRCodeStyling initialization error:', e);
    }

    return () => {
      if (div.parentNode) {
        div.parentNode.removeChild(div);
      }
      hiddenHostRef.current = null;
      qrInstanceRef.current = null;
    };
  }, []);

  // Prop updates: whenever data, qrStyle, or options change
  useEffect(() => {
    // 1. Immediately update synchronous SVG so redirect target updates instantly with 0 latency
    setQrSvgHtml(generateFallbackSvg(data, qrStyle.errorCorrectionLevel, qrStyle.dotsColor));

    // 2. Refine with styled SVG from QRCodeStyling
    if (qrInstanceRef.current && hiddenHostRef.current) {
      try {
        qrInstanceRef.current.update(buildOptions());
        setTimeout(() => {
          updateSvgMarkup();
        }, 40);
      } catch (e) {
        console.warn('QRCodeStyling update error:', e);
      }
    }
  }, [buildOptions, data, qrStyle.errorCorrectionLevel, qrStyle.dotsColor, updateSvgMarkup]);

  return {
    qrInstance: qrInstanceRef.current,
    qrSvgHtml,
  };
}
