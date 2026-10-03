import React, { useEffect, useRef } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { animateToast } from '../lib/animeHelper';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  const toastRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!toast) return;

    // Slide in
    animateToast(toastRef.current, true);

    const timer = setTimeout(() => {
      animateToast(toastRef.current, false, onDismiss);
    }, 3200);

    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success' || !toast.type;
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      <div
        ref={toastRef}
        className={`pointer-events-auto flex items-center space-x-3 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-md transition-all ${
          isSuccess
            ? 'bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 border-emerald-500/40'
            : isError
            ? 'bg-red-950/95 text-red-200 border-red-500/40'
            : 'bg-slate-900/95 text-white border-brand-500/40'
        }`}
        role="status"
        aria-live="polite"
      >
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 dark:text-emerald-600 flex-shrink-0" />}
        {isError && <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-cyan-400 flex-shrink-0" />}

        <span className="text-xs sm:text-sm font-semibold">{toast.message}</span>

        <button
          onClick={() => animateToast(toastRef.current, false, onDismiss)}
          className="p-1 rounded-lg hover:bg-white/10 dark:hover:bg-black/10 transition-colors ml-2"
        >
          <X className="w-4 h-4 opacity-75" />
        </button>
      </div>
    </div>
  );
};
