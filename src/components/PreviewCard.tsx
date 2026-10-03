import React, { useRef } from 'react';
import {
  Download,
  Copy,
  Share2,
  FileCode,
  FileText,
  ShieldCheck,
  Palette,
  Type,
} from 'lucide-react';
import type { SceneTemplate, ScenePalette, LogoConfig, ExportResolution, ScannabilityReport } from '../types/qr';
import { SceneRenderer } from './SceneRenderer';
import { downloadScenePng, downloadSceneSvg, downloadScenePdf, copySceneToClipboard, shareQr } from '../lib/exportUtils';
import { animateButtonPress } from '../lib/animeHelper';

interface PreviewCardProps {
  template: SceneTemplate;
  qrSvgHtml: string;
  encodedData?: string;
  textValues: Record<string, string>;
  setTextValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  palette: ScenePalette;
  setPalette: React.Dispatch<React.SetStateAction<ScenePalette>>;
  logoConfig: LogoConfig;
  setLogoConfig: React.Dispatch<React.SetStateAction<LogoConfig>>;
  exportResolution: ExportResolution;
  scannability: ScannabilityReport;
  onShowToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  onOpenExportModal: () => void;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({
  template,
  qrSvgHtml,
  encodedData = 'https://qrify.app',
  textValues,
  setTextValues,
  palette,
  setPalette,
  logoConfig,
  setLogoConfig,
  exportResolution,
  scannability,
  onShowToast,
  onOpenExportModal,
}) => {
  const sceneContainerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const handleDownloadPng = async (e: React.MouseEvent<HTMLButtonElement>) => {
    animateButtonPress(e.currentTarget);
    const success = await downloadScenePng(
      sceneContainerRef.current,
      { resolution: exportResolution, transparentBg: false, includeFrame: true },
      template.name
    );
    if (success) {
      onShowToast(`Downloaded high-res PNG (${exportResolution}px)`, 'success');
    } else {
      onShowToast('PNG export encountered an issue', 'error');
    }
  };

  const handleDownloadSvg = async (e: React.MouseEvent<HTMLButtonElement>) => {
    animateButtonPress(e.currentTarget);
    const success = await downloadSceneSvg(svgRef.current, template.name);
    if (success) {
      onShowToast('Downloaded vector SVG scene', 'success');
    } else {
      onShowToast('SVG export encountered an issue', 'error');
    }
  };

  const handleDownloadPdf = async (e: React.MouseEvent<HTMLButtonElement>) => {
    animateButtonPress(e.currentTarget);
    const success = await downloadScenePdf(sceneContainerRef.current, template, encodedData);
    if (success) {
      onShowToast('Downloaded print-ready PDF document', 'success');
    } else {
      onShowToast('PDF export encountered an issue', 'error');
    }
  };

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    animateButtonPress(e.currentTarget);
    const success = await copySceneToClipboard(sceneContainerRef.current);
    if (success) {
      onShowToast('Copied scene image to clipboard!', 'success');
    } else {
      onShowToast('Failed to copy to clipboard', 'error');
    }
  };

  const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
    animateButtonPress(e.currentTarget);
    const success = await shareQr(encodedData, `Scan ${template.name}`);
    if (success) {
      onShowToast('Share dialog opened or link copied', 'info');
    }
  };

  return (
    <div className="sticky top-20 w-full space-y-4">
      {/* Studio Preview Card */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-premium dark:shadow-premium-dark border border-slate-200/80 dark:border-slate-800 transition-all duration-200 flex flex-col items-center">
        
        {/* Top Header Badge */}
        <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Live Scene Preview
            </span>
          </div>

          {/* Scannability Chip */}
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>{scannability.statusText}</span>
          </div>
        </div>

        {/* Master Illustrated Scene Output Target */}
        <div
          ref={sceneContainerRef}
          className="w-full flex items-center justify-center p-3 rounded-2xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 overflow-hidden shadow-inner my-2"
        >
          <div className="max-w-[340px] w-full flex items-center justify-center">
            <SceneRenderer
              id="active-scene-svg"
              svgRef={svgRef}
              template={template}
              qrSvgHtml={qrSvgHtml}
              textValues={textValues}
              palette={palette}
              logoConfig={logoConfig}
              isAnimated={true}
            />
          </div>
        </div>

        {/* In-Place Text Editing Slots */}
        {template.textSlots.length > 0 && (
          <div className="w-full mt-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 space-y-2.5">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
              <Type className="w-3.5 h-3.5 text-brand-500" />
              <span>Customize Scene Captions</span>
            </div>
            {template.textSlots.map((ts) => (
              <div key={ts.id}>
                <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  {ts.id === 'cta' ? 'CTA Button / Badge Label' : 'Header / Tagline'}
                </label>
                <input
                  type="text"
                  value={textValues[ts.id] ?? ts.defaultText}
                  onChange={(e) =>
                    setTextValues((prev) => ({ ...prev, [ts.id]: e.target.value }))
                  }
                  className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            ))}
          </div>
        )}

        {/* Scene Palette Recolor Swatches */}
        <div className="w-full mt-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
              <Palette className="w-3.5 h-3.5 text-brand-500" />
              <span>Scene Color Palette</span>
            </div>
            <button
              onClick={() => setPalette(template.palette)}
              className="text-[10px] font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              Reset Colors
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            {/* Primary Ink */}
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Primary
              </label>
              <div className="flex items-center space-x-1.5">
                <input
                  type="color"
                  value={palette.primary}
                  onChange={(e) => setPalette((p) => ({ ...p, primary: e.target.value }))}
                  className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border border-slate-300 dark:border-slate-600 p-0.5"
                />
                <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 truncate">
                  {palette.primary}
                </span>
              </div>
            </div>

            {/* Accent Color */}
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Accent
              </label>
              <div className="flex items-center space-x-1.5">
                <input
                  type="color"
                  value={palette.accent}
                  onChange={(e) => setPalette((p) => ({ ...p, accent: e.target.value }))}
                  className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border border-slate-300 dark:border-slate-600 p-0.5"
                />
                <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 truncate">
                  {palette.accent}
                </span>
              </div>
            </div>

            {/* Secondary Color */}
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Secondary
              </label>
              <div className="flex items-center space-x-1.5">
                <input
                  type="color"
                  value={palette.secondary}
                  onChange={(e) => setPalette((p) => ({ ...p, secondary: e.target.value }))}
                  className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border border-slate-300 dark:border-slate-600 p-0.5"
                />
                <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 truncate">
                  {palette.secondary}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Download Buttons */}
        <div className="w-full mt-4 space-y-2">
          {/* Main Primary PNG Button */}
          <button
            onClick={handleDownloadPng}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-md shadow-brand-500/25 transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            <span>Download High-Res PNG ({exportResolution}px)</span>
          </button>

          {/* Secondary Action Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={handleDownloadSvg}
              title="Download Vector SVG"
              className="flex items-center justify-center space-x-1.5 py-2 px-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors border border-slate-200/80 dark:border-slate-700"
            >
              <FileCode className="w-3.5 h-3.5 text-brand-500" />
              <span>SVG</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              title="Download Print-Ready PDF"
              className="flex items-center justify-center space-x-1.5 py-2 px-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors border border-slate-200/80 dark:border-slate-700"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              <span>PDF</span>
            </button>

            <button
              onClick={handleCopy}
              title="Copy image to clipboard"
              className="flex items-center justify-center space-x-1.5 py-2 px-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors border border-slate-200/80 dark:border-slate-700"
            >
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>Copy</span>
            </button>

            <button
              onClick={handleShare}
              title="Share QR or copy link"
              className="flex items-center justify-center space-x-1.5 py-2 px-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors border border-slate-200/80 dark:border-slate-700"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Share</span>
            </button>
          </div>

          <button
            onClick={onOpenExportModal}
            className="w-full text-center text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline pt-1.5"
          >
            More export options & transparent background →
          </button>
        </div>
      </div>
    </div>
  );
};
