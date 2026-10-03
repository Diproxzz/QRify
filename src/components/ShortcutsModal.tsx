import React from 'react';
import { X, Command, Sparkles } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { keys: ['Ctrl / ⌘', 'Enter'], desc: 'Generate live QR / Validate input' },
    { keys: ['Ctrl / ⌘', 'S'], desc: 'Quick download high-resolution PNG' },
    { keys: ['Ctrl / ⌘', 'P'], desc: 'Quick download vector PDF document' },
    { keys: ['Ctrl / ⌘', 'H'], desc: 'Toggle recent QR history drawer' },
    { keys: ['Ctrl / ⌘', 'K'], desc: 'Focus destination input field' },
    { keys: ['Esc'], desc: 'Close dialogs, drawers & modals' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-brand-600 dark:text-brand-400 mb-2">
          <Command className="w-5 h-5" />
          <span className="font-display font-bold text-base text-slate-900 dark:text-white">
            Keyboard Shortcuts
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
          Power up your workflow with studio quick keys.
        </p>

        <div className="space-y-2.5">
          {shortcuts.map((sc, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800"
            >
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {sc.desc}
              </span>
              <div className="flex items-center space-x-1">
                {sc.keys.map((k, j) => (
                  <kbd
                    key={j}
                    className="px-2 py-0.5 text-[11px] font-mono font-semibold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-md border border-slate-300 dark:border-slate-700 shadow-sm"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
