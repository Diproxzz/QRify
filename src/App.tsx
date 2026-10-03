import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InputSection } from './components/InputSection';
import { TemplateGallery } from './components/TemplateGallery';
import { CustomizationPanel } from './components/CustomizationPanel';
import { PreviewCard } from './components/PreviewCard';
import { ExportModal } from './components/ExportModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { ShortcutsModal } from './components/ShortcutsModal';
import { Toast, ToastMessage } from './components/Toast';
import { QrCode, ExternalLink, Eye } from 'lucide-react';

import { ALL_SCENE_TEMPLATES } from './templates/sceneTemplates';
import type {
  ContentType,
  SceneTemplate,
  ScenePalette,
  SceneQrStyle,
  LogoConfig,
  ExportResolution,
  HistoryItem,
} from './types/qr';
import { evaluateScannability } from './lib/contrast';
import { useHistory } from './hooks/useHistory';
import { useTheme } from './hooks/useTheme';
import { useQrCode } from './hooks/useQrCode';
import { downloadScenePng, downloadScenePdf } from './lib/exportUtils';

export const App: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { history, addToHistory, removeFromHistory, clearHistory } = useHistory();

  // Content state
  const [contentType, setContentType] = useState<ContentType>('url');
  const [encodedData, setEncodedData] = useState<string>('https://github.com');
  const [rawSummary, setRawSummary] = useState<string>('https://github.com');

  // Active Scene Template (defaults to envelope template)
  const [currentTemplate, setCurrentTemplate] = useState<SceneTemplate>(ALL_SCENE_TEMPLATES[0]);

  // Customizable Scene Palette & QR style
  const [palette, setPalette] = useState<ScenePalette>(ALL_SCENE_TEMPLATES[0].palette);
  const [qrStyle, setQrStyle] = useState<SceneQrStyle>(ALL_SCENE_TEMPLATES[0].qrStyle);

  // In-place editable text slot values
  const [textValues, setTextValues] = useState<Record<string, string>>({});

  // Brand Logo configuration
  const [logoConfig, setLogoConfig] = useState<LogoConfig>({
    url: null,
    size: 0.22,
    margin: 4,
    shape: 'circle',
    bgColor: '#ffffff',
    placeInLogoSlot: false,
  });

  const [exportResolution, setExportResolution] = useState<ExportResolution>(1024);

  // Modals & Drawers
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ id: `${Date.now()}`, message, type });
  }, []);

  // Live QR Code Generation Hook
  const { qrSvgHtml } = useQrCode({
    data: encodedData,
    qrStyle,
    logoConfig,
    size: 280,
  });

  // Calculate live scannability report
  const scannability = useMemo(() => {
    return evaluateScannability(
      {
        dotsColor: qrStyle.dotsColor,
        backgroundColor: '#ffffff',
        errorCorrectionLevel: qrStyle.errorCorrectionLevel,
      },
      logoConfig
    );
  }, [qrStyle, logoConfig]);

  // Handle template selection
  const handleSelectTemplate = useCallback((template: SceneTemplate) => {
    setCurrentTemplate(template);
    setPalette(template.palette);
    setQrStyle(template.qrStyle);
    setTextValues({}); // Reset custom texts to template defaults

    if (logoConfig.url) {
      setQrStyle((prev) => ({ ...prev, errorCorrectionLevel: 'H' }));
    }

    showToast(`Applied ${template.name} scene`, 'info');
  }, [logoConfig.url, showToast]);

  // Reset to current template default settings
  const handleResetToTemplate = useCallback(() => {
    setPalette(currentTemplate.palette);
    setQrStyle(currentTemplate.qrStyle);
    setTextValues({});
    showToast(`Reset settings to ${currentTemplate.name}`, 'info');
  }, [currentTemplate, showToast]);

  // Encoded content change handler
  const handleEncodedChange = useCallback((newEncoded: string, summary: string) => {
    setEncodedData(newEncoded);
    setRawSummary(summary);

    // Save to history
    addToHistory({
      contentType,
      rawText: summary,
      encodedData: newEncoded,
      templateId: currentTemplate.id,
      templateName: currentTemplate.name,
      accentColor: currentTemplate.palette.accent,
    });
  }, [contentType, currentTemplate, addToHistory]);

  // Load from history
  const handleSelectHistoryItem = useCallback((item: HistoryItem) => {
    setContentType(item.contentType);
    setEncodedData(item.encodedData);
    setRawSummary(item.rawText);

    const matched = ALL_SCENE_TEMPLATES.find((t) => t.id === item.templateId);
    if (matched) {
      handleSelectTemplate(matched);
    }
    showToast(`Loaded QR from history`, 'info');
  }, [handleSelectTemplate, showToast]);

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + S -> Quick PNG download
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        const exportEl = document.querySelector<HTMLElement>('#active-scene-svg') || null;
        downloadScenePng(exportEl, { resolution: exportResolution, transparentBg: false, includeFrame: true }, currentTemplate.name);
        showToast(`Downloaded PNG (${exportResolution}px)`, 'success');
      }

      // Cmd/Ctrl + P -> PDF download
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        const exportEl = document.querySelector<HTMLElement>('#active-scene-svg') || null;
        downloadScenePdf(exportEl, currentTemplate, encodedData);
        showToast('Downloaded print-ready PDF', 'success');
      }

      // Cmd/Ctrl + H -> Toggle History
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        setIsHistoryOpen((prev) => !prev);
      }

      // Cmd/Ctrl + / -> Shortcuts
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
      }

      // Esc -> close all
      if (e.key === 'Escape') {
        setIsHistoryOpen(false);
        setIsShortcutsOpen(false);
        setIsExportModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [exportResolution, currentTemplate, encodedData, showToast]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Header */}
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        historyCount={history.length}
      />

      {/* Main Studio Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Hero Section */}
        <Hero />

        {/* Two-Pane Studio Workspace */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input, Scene Gallery & Customization */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            {/* 1. Destination Link & Content Input */}
            <section id="destination-section">
              <InputSection
                contentType={contentType}
                onChangeContentType={setContentType}
                onEncodedChange={handleEncodedChange}
                initialValue="https://github.com"
              />
            </section>

            {/* 2. Illustrated Scene Gallery */}
            <section id="gallery-section">
              <TemplateGallery
                selectedTemplateId={currentTemplate.id}
                onSelectTemplate={handleSelectTemplate}
                qrSvgHtml={qrSvgHtml}
              />
            </section>

            {/* 3. Customization Studio */}
            <section id="customization-section">
              <CustomizationPanel
                qrStyle={qrStyle}
                setQrStyle={setQrStyle}
                palette={palette}
                setPalette={setPalette}
                logoConfig={logoConfig}
                setLogoConfig={setLogoConfig}
                hasLogoSlot={Boolean(currentTemplate.logoSlot)}
                exportResolution={exportResolution}
                setExportResolution={setExportResolution}
                onResetToTemplate={handleResetToTemplate}
                scannability={scannability}
              />
            </section>
          </div>

          {/* Right Column: Sticky Live Scene Preview Card */}
          <div id="preview-card-section" className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-20">
            <PreviewCard
              template={currentTemplate}
              qrSvgHtml={qrSvgHtml}
              encodedData={encodedData}
              textValues={textValues}
              setTextValues={setTextValues}
              palette={palette}
              setPalette={setPalette}
              logoConfig={logoConfig}
              setLogoConfig={setLogoConfig}
              exportResolution={exportResolution}
              scannability={scannability}
              onShowToast={showToast}
              onOpenExportModal={() => setIsExportModalOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Floating Quick Action Button for Mobile Users */}
      <div className="lg:hidden fixed bottom-5 right-5 z-40 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => {
            const previewEl = document.getElementById('preview-card-section');
            if (previewEl) {
              previewEl.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          aria-label="Scroll to live preview"
          className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-xl shadow-brand-600/35 font-semibold text-xs border border-white/20 active:scale-95 transition-all backdrop-blur-md"
        >
          <Eye className="w-4 h-4" />
          <span>Live Scene</span>
        </button>
      </div>

      {/* Modals & Overlays */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        sceneContainerEl={document.querySelector<HTMLElement>('#active-scene-svg')}
        svgElement={document.querySelector<SVGSVGElement>('#active-scene-svg')}
        template={currentTemplate}
        encodedData={encodedData}
        defaultResolution={exportResolution}
        onShowToast={showToast}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectHistoryItem={handleSelectHistoryItem}
        onClearHistory={clearHistory}
      />

      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      <Toast toast={toast} onDismiss={() => setToast(null)} />

      {/* Crisp Minimal Footer */}
      <footer className="w-full border-t border-slate-200/80 dark:border-slate-800/80 py-6 sm:py-7 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md mt-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-2.5">
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-br from-brand-500 to-indigo-600 text-white shadow-xs">
              <QrCode className="w-3.5 h-3.5" />
            </div>
            <span className="font-display font-bold text-slate-800 dark:text-slate-200">
              QRify Studio
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>© {new Date().getFullYear()} All rights reserved</span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/Diproxzz/QRify"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a
              href="https://github.com/Diproxzz/QRify/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              MIT License
            </a>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a
              href="https://github.com/Diproxzz/QRify/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Report Issue
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
