import React from 'react';
import {
  QrCode,
  Sun,
  Moon,
  History,
  Command,
  Sparkles,
} from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenHistory: () => void;
  onOpenShortcuts: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  onToggleTheme,
  onOpenHistory,
  onOpenShortcuts,
  historyCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 text-white shadow-glow-sm">
            <QrCode className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                QRify
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-700/50">
                Studio
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Keyboard Shortcuts Trigger */}
          <button
            onClick={onOpenShortcuts}
            aria-label="Keyboard shortcuts"
            title="Keyboard shortcuts (Cmd/Ctrl + /)"
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200/60 dark:border-slate-700/60"
          >
            <Command className="w-3.5 h-3.5" />
            <span>Shortcuts</span>
          </button>

          {/* Recent History Trigger */}
          <button
            onClick={onOpenHistory}
            aria-label="Recent QR History"
            title="View recent QR codes"
            className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            <History className="w-5 h-5" />
            {historyCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-brand-600 rounded-full shadow-sm">
                {historyCount}
              </span>
            )}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            {isDark ? <Sun className="w-5 h-5 transition-transform hover:rotate-45" /> : <Moon className="w-5 h-5 transition-transform hover:-rotate-12" />}
          </button>

          {/* Quick Pro Badge */}
          <div className="hidden md:flex items-center space-x-1 pl-2 border-l border-slate-200 dark:border-slate-800 text-xs font-semibold text-brand-600 dark:text-brand-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vector Engine</span>
          </div>
        </div>
      </div>
    </header>
  );
};
