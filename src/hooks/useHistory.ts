import { useState, useEffect, useCallback } from 'react';
import type { HistoryItem } from '../types/qr';

const STORAGE_KEY = 'qrify_recent_history_v1';
const MAX_HISTORY = 10;

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('Unable to persist history to localStorage', e);
    }
  }, [history]);

  const addToHistory = useCallback((item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    setHistory((prev) => {
      // Deduplicate if identical encoded data and template
      const filtered = prev.filter(
        (h) => !(h.encodedData === item.encodedData && h.templateId === item.templateId)
      );

      const newItem: HistoryItem = {
        ...item,
        id: `hist_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        timestamp: Date.now(),
      };

      return [newItem, ...filtered].slice(0, MAX_HISTORY);
    });
  }, []);

  const removeFromHistory = useCallback((id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
}
