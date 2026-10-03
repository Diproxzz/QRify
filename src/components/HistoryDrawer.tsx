import React from 'react';
import { X, Clock, Trash2, ArrowUpRight, QrCode } from 'lucide-react';
import type { HistoryItem } from '../types/qr';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelectHistoryItem: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectHistoryItem,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              Recent QR Codes
            </h3>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {history.length}
            </span>
          </div>

          <div className="flex items-center space-x-1">
            {history.length > 0 && (
              <button
                onClick={onClearHistory}
                title="Clear all recent history"
                className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
                <QrCode className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No recent QR codes
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Your generated QR codes will appear here automatically for fast retrieval.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectHistoryItem(item);
                  onClose();
                }}
                className="group p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-brand-50/50 dark:hover:bg-brand-950/30 border border-slate-200/80 dark:border-slate-700/80 hover:border-brand-400 dark:hover:border-brand-700 cursor-pointer transition-all duration-200 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: item.accentColor || '#4370f7' }}
                  >
                    <QrCode className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {item.rawText || item.encodedData}
                    </h4>
                    <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-0.5">
                      <span className="uppercase font-semibold tracking-wider">{item.contentType}</span>
                      <span>•</span>
                      <span>{item.templateName}</span>
                      <span>•</span>
                      <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>

                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors flex-shrink-0 ml-2" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
