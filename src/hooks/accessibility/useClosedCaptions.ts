'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'closed-captions-enabled';

export function useClosedCaptions(defaultEnabled = true) {
  const [isEnabled, setIsEnabled] = useState<boolean>(defaultEnabled);
  const [currentCaption, setCurrentCaption] = useState<string>('');

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      setIsEnabled(saved === 'true');
    }
  }, []);

  // Save preference when changed
  const toggleCaptions = () => {
    setIsEnabled((prev) => {
      const newValue = !prev;
      localStorage.setItem(STORAGE_KEY, String(newValue));
      return newValue;
    });
  };

  const updateCaption = (text: string) => {
    setCurrentCaption(text);
  };

  const clearCaption = () => {
    setCurrentCaption('');
  };

  return {
    isEnabled,
    currentCaption,
    toggleCaptions,
    updateCaption,
    clearCaption,
  };
}
