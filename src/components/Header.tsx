import React from 'react';
import {
  QrCode,
  Sun,
  Moon,
  Clock,
  Keyboard,
  ExternalLink,
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
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 text-white shadow-sm">
            <QrCode className="w-5 h-5" />
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
            title="Keyboard shortcuts (Ctrl + / or ⌘ + /)"
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100/90 dark:bg-slate-800/70 hover:bg-slate-200/90 dark:hover:bg-slate-700/80 rounded-lg transition-all border border-slate-200/80 dark:border-slate-700/60 shadow-xs active:scale-95"
          >
            <Keyboard className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Shortcuts</span>
            <kbd className="hidden lg:inline-flex text-[10px] font-mono px-1 py-0.5 rounded bg-slate-200/70 dark:bg-slate-700/70 text-slate-500 dark:text-slate-400 ml-1">
              Ctrl+/
            </kbd>
          </button>

          {/* Recent History Trigger */}
          <button
            onClick={onOpenHistory}
            aria-label="Recent QR History"
            title="View recent QR codes"
            className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl transition-all border border-slate-200/50 dark:border-slate-700/40 hover:border-slate-300 dark:hover:border-slate-600 active:scale-95"
          >
            <Clock className="w-4.5 h-4.5" />
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-brand-600 rounded-full shadow-sm ring-2 ring-white dark:ring-slate-900">
                {historyCount}
              </span>
            )}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl transition-all border border-slate-200/50 dark:border-slate-700/40 hover:border-slate-300 dark:hover:border-slate-600 active:scale-95"
          >
            {isDark ? (
              <Sun className="w-4.5 h-4.5 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-slate-600 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* GitHub Repository Badge */}
          <div className="pl-1 sm:pl-2 border-l border-slate-200 dark:border-slate-800">
            <a
              href="https://github.com/Diproxzz/QRify"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View QRify on GitHub"
              title="GitHub repository: Diproxzz/QRify"
              className="flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200/90 dark:hover:bg-slate-700/80 rounded-lg transition-all border border-slate-200/80 dark:border-slate-700/60 shadow-xs group"
            >
              <svg
                className="w-4 h-4 fill-current text-slate-800 dark:text-slate-100 group-hover:scale-110 transition-transform"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span className="hidden sm:inline">GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
