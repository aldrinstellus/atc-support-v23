'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { CompanyTier, RiskLevel } from '@/types/mock';

const CUSTOMER_PERSONA_STORAGE_KEY = 'customer-persona-filters';

// Customer persona combinations (9 total)
export interface CustomerPersona {
  tier: CompanyTier | 'all';
  risk: RiskLevel | 'all';
}

// Preset personas for quick selection
export const CUSTOMER_PERSONAS = {
  all: { tier: 'all' as const, risk: 'all' as const, label: 'All Customers', description: 'View all customers' },
  // Enterprise
  enterpriseHealthy: { tier: 'enterprise' as const, risk: 'healthy' as const, label: 'Enterprise - Healthy', description: 'High ARR, fast SLA, few tickets' },
  enterpriseAtRisk: { tier: 'enterprise' as const, risk: 'at-risk' as const, label: 'Enterprise - At Risk', description: 'VIP attention needed, escalations' },
  enterpriseChurning: { tier: 'enterprise' as const, risk: 'churning' as const, label: 'Enterprise - Churning', description: 'Critical priority, urgent attention' },
  // SMB
  smbHealthy: { tier: 'smb' as const, risk: 'healthy' as const, label: 'SMB - Healthy', description: 'Standard support, satisfied customers' },
  smbAtRisk: { tier: 'smb' as const, risk: 'at-risk' as const, label: 'SMB - At Risk', description: 'Increased ticket volume' },
  smbChurning: { tier: 'smb' as const, risk: 'churning' as const, label: 'SMB - Churning', description: 'High churn probability' },
  // Startup
  startupHealthy: { tier: 'startup' as const, risk: 'healthy' as const, label: 'Startup - Healthy', description: 'Self-service focused, growing' },
  startupAtRisk: { tier: 'startup' as const, risk: 'at-risk' as const, label: 'Startup - At Risk', description: 'Growing pains, needs help' },
  startupChurning: { tier: 'startup' as const, risk: 'churning' as const, label: 'Startup - Churning', description: 'Budget concerns, may cancel' },
};

export type CustomerPersonaKey = keyof typeof CUSTOMER_PERSONAS;

interface CustomerPersonaContextType {
  // Current filter state
  selectedTier: CompanyTier | 'all';
  selectedRisk: RiskLevel | 'all';

  // Setters
  setTier: (tier: CompanyTier | 'all') => void;
  setRisk: (risk: RiskLevel | 'all') => void;
  setPersona: (persona: CustomerPersona) => void;
  selectPreset: (key: CustomerPersonaKey) => void;
  reset: () => void;

  // Derived state
  isFiltered: boolean;
  currentPersonaKey: CustomerPersonaKey | null;
  currentPersonaLabel: string;

  // Query params for API calls
  getQueryParams: () => URLSearchParams;
}

const CustomerPersonaContext = createContext<CustomerPersonaContextType | undefined>(undefined);

export function CustomerPersonaProvider({ children }: { children: ReactNode }) {
  const [selectedTier, setSelectedTier] = useState<CompanyTier | 'all'>('all');
  const [selectedRisk, setSelectedRisk] = useState<RiskLevel | 'all'>('all');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CUSTOMER_PERSONA_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.tier) setSelectedTier(parsed.tier);
        if (parsed.risk) setSelectedRisk(parsed.risk);
      }
    } catch (error) {
      console.warn('[CustomerPersonaContext] Failed to load saved filters:', error);
    }
  }, []);

  // Save to localStorage when filters change
  useEffect(() => {
    try {
      localStorage.setItem(
        CUSTOMER_PERSONA_STORAGE_KEY,
        JSON.stringify({ tier: selectedTier, risk: selectedRisk })
      );
    } catch (error) {
      console.warn('[CustomerPersonaContext] Failed to save filters:', error);
    }
  }, [selectedTier, selectedRisk]);

  const setTier = useCallback((tier: CompanyTier | 'all') => {
    setSelectedTier(tier);
  }, []);

  const setRisk = useCallback((risk: RiskLevel | 'all') => {
    setSelectedRisk(risk);
  }, []);

  const setPersona = useCallback((persona: CustomerPersona) => {
    setSelectedTier(persona.tier);
    setSelectedRisk(persona.risk);
  }, []);

  const selectPreset = useCallback((key: CustomerPersonaKey) => {
    const preset = CUSTOMER_PERSONAS[key];
    setSelectedTier(preset.tier);
    setSelectedRisk(preset.risk);
  }, []);

  const reset = useCallback(() => {
    setSelectedTier('all');
    setSelectedRisk('all');
  }, []);

  // Check if any filter is active
  const isFiltered = selectedTier !== 'all' || selectedRisk !== 'all';

  // Find current persona key (if matches a preset)
  const currentPersonaKey = Object.entries(CUSTOMER_PERSONAS).find(
    ([_, preset]) => preset.tier === selectedTier && preset.risk === selectedRisk
  )?.[0] as CustomerPersonaKey | undefined ?? null;

  // Get current label
  const currentPersonaLabel = currentPersonaKey
    ? CUSTOMER_PERSONAS[currentPersonaKey].label
    : `${selectedTier === 'all' ? 'All Tiers' : selectedTier.toUpperCase()} / ${selectedRisk === 'all' ? 'All Risk' : selectedRisk}`;

  // Build query params for API calls
  const getQueryParams = useCallback(() => {
    const params = new URLSearchParams();
    if (selectedTier !== 'all') {
      params.set('tier', selectedTier);
    }
    if (selectedRisk !== 'all') {
      params.set('risk', selectedRisk);
    }
    return params;
  }, [selectedTier, selectedRisk]);

  return (
    <CustomerPersonaContext.Provider
      value={{
        selectedTier,
        selectedRisk,
        setTier,
        setRisk,
        setPersona,
        selectPreset,
        reset,
        isFiltered,
        currentPersonaKey,
        currentPersonaLabel,
        getQueryParams,
      }}
    >
      {children}
    </CustomerPersonaContext.Provider>
  );
}

export function useCustomerPersona() {
  const context = useContext(CustomerPersonaContext);
  if (context === undefined) {
    throw new Error('useCustomerPersona must be used within a CustomerPersonaProvider');
  }
  return context;
}

// Helper hooks for common patterns
export function useCustomerFilters() {
  const { selectedTier, selectedRisk, getQueryParams } = useCustomerPersona();
  return {
    tier: selectedTier === 'all' ? undefined : selectedTier,
    risk: selectedRisk === 'all' ? undefined : selectedRisk,
    queryParams: getQueryParams(),
  };
}
