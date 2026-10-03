import React, { useEffect, useRef } from 'react';
import type { SceneTemplate, ScenePalette, LogoConfig } from '../types/qr';
import { initSceneAnimation } from '../lib/animeHelper';

interface SceneRendererProps {
  template: SceneTemplate;
  qrSvgHtml: string;
  textValues: Record<string, string>;
  palette?: ScenePalette;
  logoConfig?: LogoConfig;
  isAnimated?: boolean;
  svgRef?: React.Ref<SVGSVGElement>;
  className?: string;
  id?: string;
}

export const SceneRenderer: React.FC<SceneRendererProps> = ({
  template,
  qrSvgHtml,
  textValues,
  palette = template.palette,
  logoConfig,
  isAnimated = true,
  svgRef,
  className = '',
  id,
}) => {
  const internalSvgRef = useRef<SVGSVGElement | null>(null);

  // Sync internal and external ref
  const setRefs = (el: SVGSVGElement | null) => {
    internalSvgRef.current = el;
    if (typeof svgRef === 'function') {
      svgRef(el);
    } else if (svgRef && 'current' in svgRef) {
      (svgRef as React.MutableRefObject<SVGSVGElement | null>).current = el;
    }
  };

  // Trigger anime.js scene animation on mount / template change
  useEffect(() => {
    if (!isAnimated || !internalSvgRef.current) return;
    initSceneAnimation(internalSvgRef.current, template.animation);
  }, [template.id, template.animation, isAnimated]);

  const { slot, textSlots, logoSlot, viewBox } = template;
  const padding = Math.max(6, Math.round(slot.width * 0.05)); // Quiet zone padding
  const innerQrSize = slot.width - padding * 2;

  // Center logo calculations
  const showCenterLogo = Boolean(logoConfig?.url && !logoConfig?.placeInLogoSlot);
  const centerLogoSize = (logoConfig?.size || 0.22) * slot.width;
  const centerLogoX = slot.width / 2 - centerLogoSize / 2;
  const centerLogoY = slot.height / 2 - centerLogoSize / 2;

  const qrSlotNode = (
    <g
      id="qr-slot"
      key="qr-slot"
      transform={`translate(${slot.x}, ${slot.y}) rotate(${slot.rotate || 0} ${slot.width / 2} ${slot.height / 2})`}
    >
      {/* Solid High-Contrast Backing Plate (Guarantees Camera Scannability) */}
      <rect
        x={0}
        y={0}
        width={slot.width}
        height={slot.height}
        rx={slot.cornerRadius || 14}
        fill="#ffffff"
        stroke="rgba(0,0,0,0.06)"
        strokeWidth="1.5"
      />

      {/* QR Code Nested Vector SVG */}
      <svg
        x={padding}
        y={padding}
        width={innerQrSize}
        height={innerQrSize}
        viewBox="0 0 280 280"
        dangerouslySetInnerHTML={{ __html: qrSvgHtml }}
      />

      {/* Center Logo Embedding if Enabled */}
      {showCenterLogo && logoConfig && logoConfig.url && (
        <g transform={`translate(${centerLogoX}, ${centerLogoY})`}>
          {/* Logo Backing Badge */}
          {logoConfig.shape === 'circle' && (
            <circle
              cx={centerLogoSize / 2}
              cy={centerLogoSize / 2}
              r={centerLogoSize / 2}
              fill={logoConfig.bgColor || '#ffffff'}
              stroke="rgba(0,0,0,0.12)"
              strokeWidth="1.5"
            />
          )}
          {logoConfig.shape === 'rounded' && (
            <rect
              x={0}
              y={0}
              width={centerLogoSize}
              height={centerLogoSize}
              rx={centerLogoSize * 0.25}
              fill={logoConfig.bgColor || '#ffffff'}
              stroke="rgba(0,0,0,0.12)"
              strokeWidth="1.5"
            />
          )}
          {logoConfig.shape === 'square' && (
            <rect
              x={0}
              y={0}
              width={centerLogoSize}
              height={centerLogoSize}
              fill={logoConfig.bgColor || '#ffffff'}
              stroke="rgba(0,0,0,0.12)"
              strokeWidth="1.5"
            />
          )}
          {/* Logo Image */}
          <image
            href={logoConfig.url}
            x={centerLogoSize * 0.15}
            y={centerLogoSize * 0.15}
            width={centerLogoSize * 0.7}
            height={centerLogoSize * 0.7}
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
      )}
    </g>
  );

  const hasInjectedSlot = template.renderSvgContent.length >= 3;

  return (
    <svg
      id={id}
      ref={setRefs}
      viewBox={`0 0 ${viewBox[0]} ${viewBox[1]}`}
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto max-w-full select-none ${className}`}
      style={
        {
          '--scene-primary': palette.primary,
          '--scene-secondary': palette.secondary,
          '--scene-accent': palette.accent,
          '--scene-bg': palette.background,
          '--scene-ink': palette.ink,
        } as React.CSSProperties
      }
    >
      {/* 1. Illustration Background & Object Artwork (with embedded QR slot if supported) */}
      {hasInjectedSlot ? (
        template.renderSvgContent(palette, isAnimated, qrSlotNode)
      ) : (
        <>
          {template.renderSvgContent(palette, isAnimated)}
          {qrSlotNode}
        </>
      )}

      {/* 2. Template-Level Logo Slot (e.g. Mug badge, Banner pill icon) */}
      {logoSlot && logoConfig?.url && logoConfig?.placeInLogoSlot && (
        <g id="template-logo-slot">
          <image
            href={logoConfig.url}
            x={logoSlot.x - logoSlot.size / 2}
            y={logoSlot.y - logoSlot.size / 2}
            width={logoSlot.size}
            height={logoSlot.size}
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
      )}

      {/* 3. Editable Text Slots */}
      {textSlots.map((ts) => {
        const textContent = textValues[ts.id] ?? ts.defaultText;
        const textColor = ts.color || (ts.id === 'cta' ? '#ffffff' : palette.ink);
        return (
          <text
            key={ts.id}
            x={ts.x}
            y={ts.y}
            textAnchor={ts.align}
            fontSize={ts.fontSize}
            fontWeight={ts.fontWeight || 700}
            fontFamily="'Inter', 'Plus Jakarta Sans', sans-serif"
            fill={textColor}
            transform={ts.rotate ? `rotate(${ts.rotate} ${ts.x} ${ts.y})` : undefined}
            style={{ pointerEvents: 'none', userSelect: 'none' }}
          >
            {textContent}
          </text>
        );
      })}
    </svg>
  );
};
