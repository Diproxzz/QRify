import React, { useState } from 'react';
import {
  X,
  Download,
  Copy,
  FileCode,
  FileText,
  ImageIcon,
} from 'lucide-react';
import type { ExportResolution, ExportSettings, SceneTemplate } from '../types/qr';
import { downloadScenePng, downloadSceneSvg, downloadScenePdf, copySceneToClipboard } from '../lib/exportUtils';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  sceneContainerEl: HTMLElement | null;
  svgElement: SVGSVGElement | null;
  template: SceneTemplate;
  encodedData: string;
  defaultResolution: ExportResolution;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  sceneContainerEl,
  svgElement,
  template,
  encodedData,
  defaultResolution,
  onShowToast,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'png' | 'svg' | 'pdf'>('png');
  const [resolution, setResolution] = useState<ExportResolution>(defaultResolution);
  const [transparentBg, setTransparentBg] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    setIsExporting(true);
    const settings: ExportSettings = {
      resolution,
      transparentBg,
      includeFrame: true,
    };

    let success = false;
    if (selectedFormat === 'png') {
      success = await downloadScenePng(sceneContainerEl, settings, template.name);
      if (success) onShowToast(`Downloaded PNG (${resolution}px)`, 'success');
    } else if (selectedFormat === 'svg') {
      success = await downloadSceneSvg(svgElement, template.name);
      if (success) onShowToast('Downloaded vector SVG scene', 'success');
    } else if (selectedFormat === 'pdf') {
      success = await downloadScenePdf(sceneContainerEl, template, encodedData);
      if (success) onShowToast('Downloaded print-ready PDF', 'success');
    }

    setIsExporting(false);
    if (success) onClose();
  };

  const handleCopy = async () => {
    const success = await copySceneToClipboard(sceneContainerEl);
    if (success) {
      onShowToast('Copied high-res image to clipboard!', 'success');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase mb-2">
            <Download className="w-3.5 h-3.5" />
            <span>Lossless Scene Export</span>
          </div>
          <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">
            Export {template.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Export the full composed marketing illustration as PNG, SVG vector, or print-ready PDF.
          </p>
        </div>

        {/* Format Selector */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { id: 'png' as const, label: 'PNG Image', icon: ImageIcon, desc: 'High DPI raster' },
            { id: 'svg' as const, label: 'SVG Vector', icon: FileCode, desc: 'Lossless vector' },
            { id: 'pdf' as const, label: 'PDF Document', icon: FileText, desc: 'Print-ready A4' },
          ].map((fmt) => {
            const Icon = fmt.icon;
            const isSelected = selectedFormat === fmt.id;
            return (
              <button
                key={fmt.id}
                onClick={() => setSelectedFormat(fmt.id)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-brand-50/70 dark:bg-brand-950/40 border-brand-500 ring-2 ring-brand-500/20'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100'
                }`}
              >
                <Icon
                  className={`w-5 h-5 mb-1 ${
                    isSelected ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'
                  }`}
                />
                <span
                  className={`block text-xs font-bold ${
                    isSelected ? 'text-brand-700 dark:text-brand-300' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {fmt.label}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">{fmt.desc}</span>
              </button>
            );
          })}
        </div>

        {/* Resolution Options for PNG */}
        {selectedFormat === 'png' && (
          <div className="mb-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Resolution Scale
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { res: 512, label: '512px', tag: 'Web' },
                { res: 1024, label: '1024px', tag: 'HD' },
                { res: 2048, label: '2048px', tag: 'Print' },
                { res: 4096, label: '4096px', tag: '4K Ultra' },
              ].map((item) => (
                <button
                  key={item.res}
                  onClick={() => setResolution(item.res as ExportResolution)}
                  className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                    resolution === item.res
                      ? 'bg-brand-600 text-white border-brand-600 font-bold'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 text-xs'
                  }`}
                >
                  <span className="block text-xs font-mono font-semibold">{item.label}</span>
                  <span className="text-[9px] opacity-75">{item.tag}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Transparency Option */}
        {selectedFormat !== 'pdf' && (
          <div className="mb-6">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 cursor-pointer">
              <div>
                <span className="block text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Transparent Canvas Background
                </span>
                <span className="text-[11px] text-slate-400">
                  Removes white backdrop so illustration blends onto external materials.
                </span>
              </div>
              <input
                type="checkbox"
                checked={transparentBg}
                onChange={(e) => setTransparentBg(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 accent-brand-600"
              />
            </label>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="flex-1 flex items-center justify-center space-x-2 py-3 px-5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-md shadow-brand-500/25 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Exporting...' : `Download ${selectedFormat.toUpperCase()}`}</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center justify-center space-x-1.5 py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-colors border border-slate-200 dark:border-slate-700"
          >
            <Copy className="w-4 h-4" />
            <span>Copy</span>
          </button>
        </div>
      </div>
    </div>
  );
};
