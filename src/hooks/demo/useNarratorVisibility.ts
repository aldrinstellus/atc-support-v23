'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'narrator-visible';

export type DemoPhase = 'intro' | 'demo' | 'use-case';

interface UseNarratorVisibilityOptions {
  /**
   * Initial visibility state
   * @default true
   */
  defaultVisible?: boolean;

  /**
   * Current phase of the demo
   * @default 'intro'
   */
  currentPhase?: DemoPhase;

  /**
   * Auto-hide narrator when demo/use-case phase starts
   * @default true
   */
  autoHideOnDemo?: boolean;
}

export function useNarratorVisibility({
  defaultVisible = true,
  currentPhase = 'intro',
  autoHideOnDemo = true,
}: UseNarratorVisibilityOptions = {}) {
  const [isVisible, setIsVisible] = useState<boolean>(defaultVisible);
  const [hasUserOverride, setHasUserOverride] = useState<boolean>(false);

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      setIsVisible(saved === 'true');
      setHasUserOverride(true);
    }
  }, []);

  // Auto-hide logic based on demo phase (only if user hasn't overridden)
  useEffect(() => {
    if (autoHideOnDemo && !hasUserOverride) {
      if (currentPhase === 'demo' || currentPhase === 'use-case') {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }
  }, [currentPhase, autoHideOnDemo, hasUserOverride]);

  const toggleVisibility = () => {
    setIsVisible((prev) => {
      const newValue = !prev;
      localStorage.setItem(STORAGE_KEY, String(newValue));
      setHasUserOverride(true);
      return newValue;
    });
  };

  const show = () => {
    setIsVisible(true);
    localStorage.setItem(STORAGE_KEY, 'true');
    setHasUserOverride(true);
  };

  const hide = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, 'false');
    setHasUserOverride(true);
  };

  const resetToAuto = () => {
    setHasUserOverride(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    isVisible,
    toggleVisibility,
    show,
    hide,
    resetToAuto,
    hasUserOverride,
  };
}
