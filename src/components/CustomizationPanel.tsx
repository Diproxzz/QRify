import React, { useState, useRef } from 'react';
import {
  Palette,
  Shapes,
  Image as ImageIcon,
  Sliders,
  RotateCcw,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';
import type {
  SceneQrStyle,
  ScenePalette,
  LogoConfig,
  DotType,
  CornerDotType,
  CornerSquareType,
  ErrorCorrectionLevel,
  ExportResolution,
  ScannabilityReport,
} from '../types/qr';
import { SAMPLE_LOGOS } from '../lib/sampleLogos';
import { animateLogoPop } from '../lib/animeHelper';

interface CustomizationPanelProps {
  qrStyle: SceneQrStyle;
  setQrStyle: React.Dispatch<React.SetStateAction<SceneQrStyle>>;
  palette: ScenePalette;
  setPalette: React.Dispatch<React.SetStateAction<ScenePalette>>;
  logoConfig: LogoConfig;
  setLogoConfig: React.Dispatch<React.SetStateAction<LogoConfig>>;
  hasLogoSlot?: boolean;
  exportResolution: ExportResolution;
  setExportResolution: (res: ExportResolution) => void;
  onResetToTemplate: () => void;
  scannability: ScannabilityReport;
}

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  qrStyle,
  setQrStyle,
  palette,
  setPalette,
  logoConfig,
  setLogoConfig,
  hasLogoSlot = false,
  exportResolution,
  setExportResolution,
  onResetToTemplate,
  scannability,
}) => {
  type ActiveTab = 'colors' | 'shapes' | 'logo' | 'advanced';
  const [activeTab, setActiveTab] = useState<ActiveTab>('colors');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const logoPreviewRef = useRef<HTMLDivElement | null>(null);

  const handleLogoUpload = (file: File) => {
    setUploadError(null);
    if (file.size > 2 * 1024 * 1024) {
      setUploadError('File exceeds 2MB limit. Please upload a smaller image.');
      return;
    }

    const validTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Invalid format. Please upload PNG, JPG, SVG, or WebP.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setLogoConfig((prev) => ({
        ...prev,
        url: result,
      }));
      setQrStyle((prev) => ({
        ...prev,
        errorCorrectionLevel: 'H',
      }));

      setTimeout(() => {
        animateLogoPop(logoPreviewRef.current);
      }, 50);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleLogoUpload(e.dataTransfer.files[0]);
    }
  };

  const dotTypes: { value: DotType; label: string }[] = [
    { value: 'rounded', label: 'Rounded' },
    { value: 'dots', label: 'Dots' },
    { value: 'classy', label: 'Classy' },
    { value: 'classy-rounded', label: 'Classy Soft' },
    { value: 'extra-rounded', label: 'Smooth Pill' },
    { value: 'square', label: 'Square' },
  ];

  const cornerSquareTypes: { value: CornerSquareType; label: string }[] = [
    { value: 'extra-rounded', label: 'Soft Pill' },
    { value: 'dot', label: 'Circular' },
    { value: 'square', label: 'Sharp Square' },
  ];

  const cornerDotTypes: { value: CornerDotType; label: string }[] = [
    { value: 'dot', label: 'Circular' },
    { value: 'square', label: 'Square' },
  ];

  const errorLevels: { value: ErrorCorrectionLevel; label: string; desc: string }[] = [
    { value: 'L', label: 'Level L', desc: '7% recovery (simplest)' },
    { value: 'M', label: 'Level M', desc: '15% recovery (standard)' },
    { value: 'Q', label: 'Level Q', desc: '25% recovery (recommended)' },
    { value: 'H', label: 'Level H', desc: '30% recovery (required for logos)' },
  ];

  const resolutions: ExportResolution[] = [512, 1024, 2048, 4096];

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 shadow-premium dark:shadow-premium-dark border border-slate-200/80 dark:border-slate-800 transition-all duration-200">
      {/* Top Header & Reset */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80 gap-3 mb-5">
        <div>
          <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">
            Scene Customization Studio
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Customize illustration colors, QR module geometries, brand logos, and export resolution.
          </p>
        </div>

        <button
          onClick={onResetToTemplate}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 rounded-xl transition-colors border border-slate-200 dark:border-slate-700/80 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Defaults</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center space-x-1 overflow-x-auto pb-3 mb-6 scrollbar-none border-b border-slate-100 dark:border-slate-800">
        {[
          { id: 'colors' as ActiveTab, label: 'Scene Colors', icon: Palette },
          { id: 'shapes' as ActiveTab, label: 'QR Dots & Corners', icon: Shapes },
          { id: 'logo' as ActiveTab, label: 'Brand Logo', icon: ImageIcon },
          { id: 'advanced' as ActiveTab, label: 'Resolution & Error Recovery', icon: Sliders },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                isActive
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ==================== TAB 1: SCENE COLORS ==================== */}
      {activeTab === 'colors' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Primary Illustration Ink */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Primary Line & Ink
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={palette.primary}
                  onChange={(e) => {
                    const c = e.target.value;
                    setPalette((p) => ({ ...p, primary: c, ink: c }));
                    setQrStyle((s) => ({ ...s, dotsColor: c }));
                  }}
                  className="w-10 h-10 rounded-xl cursor-pointer border border-slate-300 dark:border-slate-600 bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={palette.primary}
                  onChange={(e) => {
                    const c = e.target.value;
                    setPalette((p) => ({ ...p, primary: c, ink: c }));
                    setQrStyle((s) => ({ ...s, dotsColor: c }));
                  }}
                  className="w-24 px-3 py-1.5 text-xs font-mono rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 uppercase"
                />
              </div>
            </div>

            {/* Accent Highlight */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Accent Highlight
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={palette.accent}
                  onChange={(e) => setPalette((p) => ({ ...p, accent: e.target.value }))}
                  className="w-10 h-10 rounded-xl cursor-pointer border border-slate-300 dark:border-slate-600 bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={palette.accent}
                  onChange={(e) => setPalette((p) => ({ ...p, accent: e.target.value }))}
                  className="w-24 px-3 py-1.5 text-xs font-mono rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 uppercase"
                />
              </div>
            </div>

            {/* Secondary Color */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Secondary Body Fill
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={palette.secondary}
                  onChange={(e) => setPalette((p) => ({ ...p, secondary: e.target.value }))}
                  className="w-10 h-10 rounded-xl cursor-pointer border border-slate-300 dark:border-slate-600 bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={palette.secondary}
                  onChange={(e) => setPalette((p) => ({ ...p, secondary: e.target.value }))}
                  className="w-24 px-3 py-1.5 text-xs font-mono rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 uppercase"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 2: QR DOTS & CORNERS ==================== */}
      {activeTab === 'shapes' && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Module Dot Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {dotTypes.map((dot) => {
                const isSelected = qrStyle.dotsType === dot.value;
                return (
                  <button
                    key={dot.value}
                    onClick={() => setQrStyle((s) => ({ ...s, dotsType: dot.value }))}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-brand-50/70 dark:bg-brand-950/40 border-brand-500 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    <span>{dot.label}</span>
                    <span className="text-[10px] opacity-60 uppercase font-mono">{dot.value}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Corner Square Shape
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {cornerSquareTypes.map((cs) => {
                const isSelected = qrStyle.cornersSquareType === cs.value;
                return (
                  <button
                    key={cs.value}
                    onClick={() => setQrStyle((s) => ({ ...s, cornersSquareType: cs.value }))}
                    className={`p-3 rounded-xl border text-xs font-semibold transition-all text-center ${
                      isSelected
                        ? 'bg-brand-50/70 dark:bg-brand-950/40 border-brand-500 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    <span>{cs.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Corner Inner Dot Shape
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {cornerDotTypes.map((cd) => {
                const isSelected = qrStyle.cornersDotType === cd.value;
                return (
                  <button
                    key={cd.value}
                    onClick={() => setQrStyle((s) => ({ ...s, cornersDotType: cd.value }))}
                    className={`p-3 rounded-xl border text-xs font-semibold transition-all text-center ${
                      isSelected
                        ? 'bg-brand-50/70 dark:bg-brand-950/40 border-brand-500 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    <span>{cd.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 3: BRAND LOGO ==================== */}
      {activeTab === 'logo' && (
        <div className="space-y-6">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-200 ${
              isDragOver
                ? 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/30 scale-[1.01]'
                : 'border-slate-300 dark:border-slate-700 hover:border-brand-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleLogoUpload(e.target.files[0]);
                }
              }}
              className="hidden"
            />
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-2">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              Click to upload or drag & drop brand logo
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Supports PNG, SVG, JPG, WebP (Max 2MB).
            </p>
          </div>

          {uploadError && (
            <div className="flex items-center space-x-2 p-3 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 rounded-xl">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}

          {/* Quick Sample Logos */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Or pick a 1-click preset icon:
            </label>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_LOGOS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => {
                    setLogoConfig((prev) => ({ ...prev, url: sample.dataUrl }));
                    setQrStyle((s) => ({ ...s, errorCorrectionLevel: 'H' }));
                  }}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs font-medium transition-all"
                >
                  <img src={sample.dataUrl} alt={sample.name} className="w-4 h-4 object-contain" />
                  <span>{sample.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Logo Controls */}
          {logoConfig.url && (
            <div
              ref={logoPreviewRef}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-xl p-1.5 border border-slate-200 dark:border-slate-700 shadow-sm"
                    style={{ backgroundColor: logoConfig.bgColor }}
                  >
                    <img src={logoConfig.url} alt="Logo" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Active Logo Embedded
                    </span>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                      Error correction set to Level H (30%)
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setLogoConfig((prev) => ({ ...prev, url: null }))}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors border border-red-200"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>

              {/* Logo Placement Toggle */}
              {hasLogoSlot && (
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                        Place Logo in Template Badge Slot
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Places logo on the object badge / icon slot instead of center of QR.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={Boolean(logoConfig.placeInLogoSlot)}
                      onChange={(e) =>
                        setLogoConfig((prev) => ({ ...prev, placeInLogoSlot: e.target.checked }))
                      }
                      className="w-4 h-4 rounded text-brand-600 accent-brand-600"
                    />
                  </label>
                </div>
              )}

              {/* Logo Size and Backing */}
              {!logoConfig.placeInLogoSlot && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                        Logo Center Scale
                      </label>
                      <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300">
                        {Math.round(logoConfig.size * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.12"
                      max="0.30"
                      step="0.01"
                      value={logoConfig.size}
                      onChange={(e) =>
                        setLogoConfig((prev) => ({ ...prev, size: parseFloat(e.target.value) }))
                      }
                      className="w-full accent-brand-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Backing Shape
                    </label>
                    <div className="flex items-center space-x-2">
                      {[
                        { value: 'circle', label: 'Circle' },
                        { value: 'rounded', label: 'Rounded' },
                        { value: 'square', label: 'Square' },
                      ].map((s) => (
                        <button
                          key={s.value}
                          onClick={() =>
                            setLogoConfig((prev) => ({ ...prev, shape: s.value as any }))
                          }
                          className={`px-2.5 py-1 text-xs rounded-lg border font-medium ${
                            logoConfig.shape === s.value
                              ? 'bg-brand-600 text-white border-brand-600'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ==================== TAB 4: ADVANCED ==================== */}
      {activeTab === 'advanced' && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Reed-Solomon Error Recovery Redundancy
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {errorLevels.map((lvl) => {
                const isSelected = qrStyle.errorCorrectionLevel === lvl.value;
                return (
                  <button
                    key={lvl.value}
                    onClick={() =>
                      setQrStyle((prev) => ({ ...prev, errorCorrectionLevel: lvl.value }))
                    }
                    className={`flex flex-col text-left p-3 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-brand-50 dark:bg-brand-950/40 border-brand-500 ring-2 ring-brand-500/20'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100'
                    }`}
                  >
                    <span
                      className={`text-xs font-bold ${
                        isSelected ? 'text-brand-600 dark:text-brand-400' : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {lvl.label}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-0.5">{lvl.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Default Master Export Resolution
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {resolutions.map((res) => {
                const isSelected = exportResolution === res;
                return (
                  <button
                    key={res}
                    onClick={() => setExportResolution(res)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-mono font-semibold transition-all ${
                      isSelected
                        ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {res} × {res}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
