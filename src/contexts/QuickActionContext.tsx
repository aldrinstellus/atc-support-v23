'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface QuickActionContextType {
  quickActionQuery: string | null;
  setQuickActionQuery: (query: string | null) => void;
}

const QuickActionContext = createContext<QuickActionContextType | undefined>(undefined);

export function QuickActionProvider({ children }: { children: ReactNode }) {
  const [quickActionQuery, setQuickActionQuery] = useState<string | null>(null);

  const value = useMemo(
    () => ({ quickActionQuery, setQuickActionQuery }),
    [quickActionQuery]
  );

  return (
    <QuickActionContext.Provider value={value}>
      {children}
    </QuickActionContext.Provider>
  );
}

export function useQuickAction() {
  const context = useContext(QuickActionContext);
  if (!context) {
    throw new Error('useQuickAction must be used within QuickActionProvider');
  }
  return context;
}
