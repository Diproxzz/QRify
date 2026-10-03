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
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-20">
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

      {/* Footer */}
      <footer className="w-full border-t border-slate-200/80 dark:border-slate-800/80 py-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="font-display font-bold text-slate-700 dark:text-slate-300">QRify Studio</span>
            <span>•</span>
            <span>Object-Based Marketing Scene Generator</span>
          </div>
          <div>
            100% Client-Side Processing • Your logos and links never leave your browser
          </div>
        </div>
      </footer>
    </div>
  );
};
