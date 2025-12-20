'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Building2, AlertTriangle, Check, X } from 'lucide-react';
import {
  useCustomerPersona,
  CUSTOMER_PERSONAS,
  type CustomerPersonaKey,
} from '@/contexts/CustomerPersonaContext';
import type { CompanyTier, RiskLevel } from '@/types/mock';

interface CustomerPersonaSelectorProps {
  variant?: 'dropdown' | 'chips';
  className?: string;
}

const TIER_LABELS: Record<CompanyTier | 'all', { label: string; color: string }> = {
  all: { label: 'All Tiers', color: 'bg-gray-600' },
  enterprise: { label: 'Enterprise', color: 'bg-purple-600' },
  smb: { label: 'SMB', color: 'bg-blue-600' },
  startup: { label: 'Startup', color: 'bg-green-600' },
};

const RISK_LABELS: Record<RiskLevel | 'all', { label: string; color: string; icon?: React.ReactNode }> = {
  all: { label: 'All Risk', color: 'bg-gray-600' },
  healthy: { label: 'Healthy', color: 'bg-emerald-600', icon: <Check className="w-3 h-3" /> },
  'at-risk': { label: 'At Risk', color: 'bg-amber-600', icon: <AlertTriangle className="w-3 h-3" /> },
  churning: { label: 'Churning', color: 'bg-red-600', icon: <X className="w-3 h-3" /> },
};

export function CustomerPersonaSelector({
  variant = 'dropdown',
  className = '',
}: CustomerPersonaSelectorProps) {
  const {
    selectedTier,
    selectedRisk,
    setTier,
    setRisk,
    selectPreset,
    reset,
    isFiltered,
    currentPersonaLabel,
  } = useCustomerPersona();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'chips') {
    return (
      <div className={`flex items-center gap-2 flex-wrap ${className}`}>
        {/* Tier chips */}
        {(['all', 'enterprise', 'smb', 'startup'] as const).map((tier) => (
          <button
            key={tier}
            onClick={() => setTier(tier)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
              selectedTier === tier
                ? `${TIER_LABELS[tier].color} text-white`
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {TIER_LABELS[tier].label}
          </button>
        ))}

        <div className="w-px h-6 bg-gray-700 mx-1" />

        {/* Risk chips */}
        {(['all', 'healthy', 'at-risk', 'churning'] as const).map((risk) => (
          <button
            key={risk}
            onClick={() => setRisk(risk)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-1 ${
              selectedRisk === risk
                ? `${RISK_LABELS[risk].color} text-white`
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {RISK_LABELS[risk].icon}
            {RISK_LABELS[risk].label}
          </button>
        ))}

        {isFiltered && (
          <button
            onClick={reset}
            className="px-2 py-1.5 text-xs text-gray-400 hover:text-white transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all border ${
          isFiltered
            ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-300'
            : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
        }`}
      >
        <Building2 className="w-4 h-4" />
        <span className="font-medium">{currentPersonaLabel}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-800">
            <div className="text-sm font-medium text-white">Customer Persona</div>
            <div className="text-xs text-gray-400 mt-0.5">
              Filter by company tier and risk level
            </div>
          </div>

          {/* Quick Presets */}
          <div className="p-2 border-b border-gray-800">
            <div className="text-xs font-medium text-gray-500 px-2 mb-1">Quick Select</div>
            <div className="grid grid-cols-3 gap-1">
              {(['all', 'enterpriseAtRisk', 'smbChurning'] as CustomerPersonaKey[]).map((key) => {
                const preset = CUSTOMER_PERSONAS[key];
                return (
                  <button
                    key={key}
                    onClick={() => {
                      selectPreset(key);
                      setIsOpen(false);
                    }}
                    className="px-2 py-1.5 text-xs text-center rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors truncate"
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tier Selection */}
          <div className="p-2 border-b border-gray-800">
            <div className="text-xs font-medium text-gray-500 px-2 mb-1">Company Tier</div>
            <div className="space-y-1">
              {(['all', 'enterprise', 'smb', 'startup'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setTier(tier)}
                  className={`w-full px-3 py-2 text-sm text-left rounded-lg flex items-center justify-between transition-colors ${
                    selectedTier === tier
                      ? 'bg-indigo-600/30 text-indigo-300'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${TIER_LABELS[tier].color}`} />
                    {TIER_LABELS[tier].label}
                  </div>
                  {selectedTier === tier && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          {/* Risk Selection */}
          <div className="p-2 border-b border-gray-800">
            <div className="text-xs font-medium text-gray-500 px-2 mb-1">Risk Level</div>
            <div className="space-y-1">
              {(['all', 'healthy', 'at-risk', 'churning'] as const).map((risk) => (
                <button
                  key={risk}
                  onClick={() => setRisk(risk)}
                  className={`w-full px-3 py-2 text-sm text-left rounded-lg flex items-center justify-between transition-colors ${
                    selectedRisk === risk
                      ? 'bg-indigo-600/30 text-indigo-300'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${RISK_LABELS[risk].color}`} />
                    {RISK_LABELS[risk].label}
                  </div>
                  {selectedRisk === risk && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-2 bg-gray-800/50">
            <button
              onClick={() => {
                reset();
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-sm text-center text-gray-400 hover:text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Compact badge showing current selection
export function CustomerPersonaBadge({ className = '' }: { className?: string }) {
  const { selectedTier, selectedRisk, isFiltered } = useCustomerPersona();

  if (!isFiltered) return null;

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {selectedTier !== 'all' && (
        <span className={`px-2 py-0.5 text-xs font-medium rounded ${TIER_LABELS[selectedTier].color} text-white`}>
          {TIER_LABELS[selectedTier].label}
        </span>
      )}
      {selectedRisk !== 'all' && (
        <span className={`px-2 py-0.5 text-xs font-medium rounded ${RISK_LABELS[selectedRisk].color} text-white flex items-center gap-1`}>
          {RISK_LABELS[selectedRisk].icon}
          {RISK_LABELS[selectedRisk].label}
        </span>
      )}
    </div>
  );
}

export default CustomerPersonaSelector;
