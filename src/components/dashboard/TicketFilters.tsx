'use client';

/**
 * TicketFilters Component
 * PRD 1.2.3: Advanced filtering - Date Range, Customer, Assignment filters
 *
 * Provides comprehensive filtering capabilities for the ticket queue.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Calendar,
  Building2,
  User,
  X,
  ChevronDown,
  Search,
  Loader2,
  Check,
} from 'lucide-react';

// Filter types
export interface TicketFilterState {
  status?: string;
  priority?: string;
  dateRange?: {
    from?: string;
    to?: string;
  };
  customerId?: string;
  customerName?: string;
  assignedAgentId?: string;
  assignedAgentName?: string;
  searchQuery?: string;
}

interface TicketFiltersProps {
  filters: TicketFilterState;
  onFiltersChange: (filters: TicketFilterState) => void;
  className?: string;
}

// Simple searchable dropdown component
interface SearchableSelectProps {
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  value?: string;
  displayValue?: string;
  options: { id: string; name: string; subtitle?: string }[];
  isLoading?: boolean;
  onSearch: (query: string) => void;
  onSelect: (id: string, name: string) => void;
  onClear: () => void;
}

function SearchableSelect({
  label,
  icon,
  placeholder,
  value,
  displayValue,
  options,
  isLoading,
  onSearch,
  onSelect,
  onClear,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.length >= 2) {
        onSearch(searchQuery);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg glass-card border-border hover:bg-card/90 transition-colors text-left"
      >
        <span className="text-muted-foreground">{icon}</span>
        <span className={`flex-1 text-sm truncate ${value ? 'text-foreground' : 'text-muted-foreground'}`}>
          {displayValue || placeholder}
        </span>
        {value ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            className="p-0.5 rounded hover:bg-muted/50"
          >
            <X className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        ) : (
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded-lg glass-card border border-border shadow-lg z-50 overflow-hidden">
          {/* Search input */}
          <div className="p-2 border-b border-border/50">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-8 pr-3 py-1.5 rounded bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                autoFocus
              />
            </div>
          </div>

          {/* Options list */}
          <div className="max-h-48 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center">
                <Loader2 className="h-5 w-5 text-muted-foreground mx-auto animate-spin" />
              </div>
            ) : options.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                {searchQuery.length < 2 ? 'Type to search...' : 'No results found'}
              </div>
            ) : (
              options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    onSelect(option.id, option.name);
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                  className={`w-full px-3 py-2 text-left hover:bg-muted/50 transition-colors flex items-center gap-2 ${
                    value === option.id ? 'bg-primary/10' : ''
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-foreground truncate">{option.name}</div>
                    {option.subtitle && (
                      <div className="text-xs text-muted-foreground truncate">{option.subtitle}</div>
                    )}
                  </div>
                  {value === option.id && (
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Date Range Picker Component
interface DateRangePickerProps {
  from?: string;
  to?: string;
  onChange: (from?: string, to?: string) => void;
}

function DateRangePicker({ from, to, onChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Preset ranges
  const presets = [
    { label: 'Today', from: new Date().toISOString().split('T')[0], to: new Date().toISOString().split('T')[0] },
    { label: 'Yesterday', from: new Date(Date.now() - 86400000).toISOString().split('T')[0], to: new Date(Date.now() - 86400000).toISOString().split('T')[0] },
    { label: 'Last 7 days', from: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0], to: new Date().toISOString().split('T')[0] },
    { label: 'Last 30 days', from: new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0], to: new Date().toISOString().split('T')[0] },
    { label: 'Last 90 days', from: new Date(Date.now() - 90 * 86400000).toISOString().split('T')[0], to: new Date().toISOString().split('T')[0] },
    { label: 'This month', from: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0], to: new Date().toISOString().split('T')[0] },
    { label: 'Last month', from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toISOString().split('T')[0], to: new Date(new Date().getFullYear(), new Date().getMonth(), 0).toISOString().split('T')[0] },
  ];

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasValue = from || to;
  const displayValue = hasValue
    ? `${from || '...'} - ${to || '...'}`
    : 'Select date range';

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="text-xs text-muted-foreground mb-1 block">Date Range</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg glass-card border-border hover:bg-card/90 transition-colors text-left"
      >
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span className={`flex-1 text-sm truncate ${hasValue ? 'text-foreground' : 'text-muted-foreground'}`}>
          {displayValue}
        </span>
        {hasValue ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange(undefined, undefined);
            }}
            className="p-0.5 rounded hover:bg-muted/50"
          >
            <X className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        ) : (
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded-lg glass-card border border-border shadow-lg z-50 p-3">
          {/* Preset buttons */}
          <div className="mb-3">
            <div className="text-xs text-muted-foreground mb-2">Quick Select</div>
            <div className="flex flex-wrap gap-1">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    onChange(preset.from, preset.to);
                    setIsOpen(false);
                  }}
                  className="px-2 py-1 text-xs rounded bg-muted/50 text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom range */}
          <div className="border-t border-border/50 pt-3">
            <div className="text-xs text-muted-foreground mb-2">Custom Range</div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-muted-foreground">From</label>
                <input
                  type="date"
                  value={from || ''}
                  onChange={(e) => onChange(e.target.value || undefined, to)}
                  className="w-full px-2 py-1.5 rounded bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">To</label>
                <input
                  type="date"
                  value={to || ''}
                  onChange={(e) => onChange(from, e.target.value || undefined)}
                  className="w-full px-2 py-1.5 rounded bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Apply button */}
          <div className="mt-3 pt-3 border-t border-border/50">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-1.5 rounded bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function TicketFilters({ filters, onFiltersChange, className = '' }: TicketFiltersProps) {
  // Company search
  const [companyOptions, setCompanyOptions] = useState<{ id: string; name: string; subtitle?: string }[]>([]);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);

  // Agent search
  const [agentOptions, setAgentOptions] = useState<{ id: string; name: string; subtitle?: string }[]>([]);
  const [isLoadingAgents, setIsLoadingAgents] = useState(false);

  // Search companies
  const handleCompanySearch = useCallback(async (query: string) => {
    setIsLoadingCompanies(true);
    try {
      const response = await fetch(`/api/mock/companies?search=${encodeURIComponent(query)}&pageSize=10`);
      const result = await response.json();
      if (result.success && result.data) {
        setCompanyOptions(
          result.data.map((c: { id: string; name: string; tier: string; industry: string }) => ({
            id: c.id,
            name: c.name,
            subtitle: `${c.tier} • ${c.industry}`,
          }))
        );
      }
    } catch (error) {
      console.error('Failed to search companies:', error);
    } finally {
      setIsLoadingCompanies(false);
    }
  }, []);

  // Search agents
  const handleAgentSearch = useCallback(async (query: string) => {
    setIsLoadingAgents(true);
    try {
      const response = await fetch(`/api/mock/agents?search=${encodeURIComponent(query)}`);
      const result = await response.json();
      if (result.success && result.data) {
        setAgentOptions(
          result.data.slice(0, 10).map((a: { id: string; name: string; role: string; teamId: string }) => ({
            id: a.id,
            name: a.name,
            subtitle: a.role.replace(/-/g, ' '),
          }))
        );
      }
    } catch (error) {
      console.error('Failed to search agents:', error);
    } finally {
      setIsLoadingAgents(false);
    }
  }, []);

  // Count active filters
  const activeFilterCount = [
    filters.dateRange?.from || filters.dateRange?.to,
    filters.customerId,
    filters.assignedAgentId,
  ].filter(Boolean).length;

  return (
    <div className={`glass-card border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-foreground">Advanced Filters</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={() => onFiltersChange({
              ...filters,
              dateRange: undefined,
              customerId: undefined,
              customerName: undefined,
              assignedAgentId: undefined,
              assignedAgentName: undefined,
            })}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all ({activeFilterCount})
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Date Range Filter - PRD 1.2.3 */}
        <DateRangePicker
          from={filters.dateRange?.from}
          to={filters.dateRange?.to}
          onChange={(from, to) =>
            onFiltersChange({
              ...filters,
              dateRange: from || to ? { from, to } : undefined,
            })
          }
        />

        {/* Customer Filter - PRD 1.2.3 */}
        <SearchableSelect
          label="Customer"
          icon={<Building2 className="h-4 w-4" />}
          placeholder="Filter by customer..."
          value={filters.customerId}
          displayValue={filters.customerName}
          options={companyOptions}
          isLoading={isLoadingCompanies}
          onSearch={handleCompanySearch}
          onSelect={(id, name) =>
            onFiltersChange({
              ...filters,
              customerId: id,
              customerName: name,
            })
          }
          onClear={() =>
            onFiltersChange({
              ...filters,
              customerId: undefined,
              customerName: undefined,
            })
          }
        />

        {/* Assignment Filter - PRD 1.2.3 */}
        <SearchableSelect
          label="Assigned To"
          icon={<User className="h-4 w-4" />}
          placeholder="Filter by agent..."
          value={filters.assignedAgentId}
          displayValue={filters.assignedAgentName}
          options={agentOptions}
          isLoading={isLoadingAgents}
          onSearch={handleAgentSearch}
          onSelect={(id, name) =>
            onFiltersChange({
              ...filters,
              assignedAgentId: id,
              assignedAgentName: name,
            })
          }
          onClear={() =>
            onFiltersChange({
              ...filters,
              assignedAgentId: undefined,
              assignedAgentName: undefined,
            })
          }
        />
      </div>
    </div>
  );
}
