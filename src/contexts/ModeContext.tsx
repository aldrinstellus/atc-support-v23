'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ModeType } from '@/types/persona';

const MODE_STORAGE_KEY = 'selected-mode';

interface ModeContextType {
  currentMode: ModeType;
  setMode: (mode: ModeType) => void;
  hasMounted: boolean;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

// Helper to safely get initial mode from localStorage (for SSR compatibility)
function getInitialMode(initialMode?: ModeType): ModeType {
  if (initialMode) return initialMode;

  // Only access localStorage on client
  if (typeof window !== 'undefined') {
    const savedMode = localStorage.getItem(MODE_STORAGE_KEY) as ModeType | null;
    if (savedMode && (savedMode === 'government' || savedMode === 'project' || savedMode === 'atc')) {
      return savedMode;
    }
  }

  return 'government';
}

export function ModeProvider({
  children,
  initialMode
}: {
  children: ReactNode;
  initialMode?: ModeType;
}) {
  // Initialize with correct mode immediately (avoiding useEffect delay)
  const [currentMode, setCurrentMode] = useState<ModeType>(() => getInitialMode(initialMode));
  const [hasMounted, setHasMounted] = useState(false);

  // Mark as mounted after hydration
  useEffect(() => {
    setHasMounted(true);

    // Re-sync with localStorage after mount (in case SSR had different value)
    if (!initialMode) {
      const savedMode = localStorage.getItem(MODE_STORAGE_KEY) as ModeType | null;
      if (savedMode && (savedMode === 'government' || savedMode === 'project' || savedMode === 'atc')) {
        setCurrentMode(savedMode);
      }
    } else {
      // If initialMode is provided, use it and save to localStorage
      setCurrentMode(initialMode);
      localStorage.setItem(MODE_STORAGE_KEY, initialMode);
    }
  }, [initialMode]);

  // Save to localStorage when mode changes (only after mounted)
  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem(MODE_STORAGE_KEY, currentMode);
    }
  }, [currentMode, hasMounted]);

  const setMode = (mode: ModeType) => {
    setCurrentMode(mode);
    // Mode change will trigger persona filtering in usePersona hook
  };

  return (
    <ModeContext.Provider value={{ currentMode, setMode, hasMounted }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within ModeProvider');
  }
  return context;
}
