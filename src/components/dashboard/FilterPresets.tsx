'use client';

/**
 * FilterPresets Component
 * PRD 1.2.3: Save and load custom filter configurations
 *
 * Allows agents to save frequently used filter combinations for quick access.
 */

import { useState, useEffect, useCallback } from 'react';
import {
  Bookmark,
  BookmarkPlus,
  Trash2,
  Check,
  X,
  ChevronDown,
  Star,
  StarOff,
} from 'lucide-react';

// Types
export interface FilterState {
  status?: string;
  priority?: string;
  category?: string;
  assignedTo?: string;
  dateRange?: {
    from?: string;
    to?: string;
  };
  searchQuery?: string;
}

export interface FilterPreset {
  id: string;
  name: string;
  filters: FilterState;
  isDefault?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface FilterPresetsProps {
  currentFilters: FilterState;
  onApplyPreset: (filters: FilterState) => void;
  storageKey?: string;
  className?: string;
}

const STORAGE_KEY_PREFIX = 'filter-presets-';

/**
 * Generate unique preset ID
 */
function generatePresetId(): string {
  return `preset-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

/**
 * Load presets from localStorage
 */
function loadPresets(storageKey: string): FilterPreset[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const presets = JSON.parse(stored);
      return presets.map((p: FilterPreset) => ({
        ...p,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt),
      }));
    }
  } catch (e) {
    console.error('Failed to load filter presets:', e);
  }
  return [];
}

/**
 * Save presets to localStorage
 */
function savePresets(storageKey: string, presets: FilterPreset[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(storageKey, JSON.stringify(presets));
  } catch (e) {
    console.error('Failed to save filter presets:', e);
  }
}

/**
 * Check if filters are empty
 */
function isEmptyFilter(filters: FilterState): boolean {
  return (
    !filters.status &&
    !filters.priority &&
    !filters.category &&
    !filters.assignedTo &&
    !filters.dateRange?.from &&
    !filters.dateRange?.to &&
    !filters.searchQuery
  );
}

/**
 * Format filter summary for display
 */
function formatFilterSummary(filters: FilterState): string {
  const parts: string[] = [];
  if (filters.status) parts.push(`Status: ${filters.status}`);
  if (filters.priority) parts.push(`Priority: ${filters.priority}`);
  if (filters.category) parts.push(`Category: ${filters.category}`);
  if (filters.assignedTo) parts.push(`Assigned: ${filters.assignedTo}`);
  if (filters.dateRange?.from || filters.dateRange?.to) {
    parts.push('Date range set');
  }
  if (filters.searchQuery) parts.push(`Search: "${filters.searchQuery}"`);
  return parts.length > 0 ? parts.join(', ') : 'No filters';
}

export function FilterPresets({
  currentFilters,
  onApplyPreset,
  storageKey = 'default',
  className = '',
}: FilterPresetsProps) {
  const fullStorageKey = `${STORAGE_KEY_PREFIX}${storageKey}`;

  const [presets, setPresets] = useState<FilterPreset[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Load presets on mount
  useEffect(() => {
    setPresets(loadPresets(fullStorageKey));
  }, [fullStorageKey]);

  // Save preset
  const handleSavePreset = useCallback(() => {
    if (!newPresetName.trim()) {
      setError('Please enter a preset name');
      return;
    }

    if (isEmptyFilter(currentFilters)) {
      setError('Cannot save empty filter');
      return;
    }

    // Check for duplicate names
    if (presets.some(p => p.name.toLowerCase() === newPresetName.trim().toLowerCase())) {
      setError('A preset with this name already exists');
      return;
    }

    const newPreset: FilterPreset = {
      id: generatePresetId(),
      name: newPresetName.trim(),
      filters: { ...currentFilters },
      isDefault: presets.length === 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedPresets = [...presets, newPreset];
    setPresets(updatedPresets);
    savePresets(fullStorageKey, updatedPresets);

    setNewPresetName('');
    setIsCreating(false);
    setError(null);
  }, [newPresetName, currentFilters, presets, fullStorageKey]);

  // Delete preset
  const handleDeletePreset = useCallback((presetId: string) => {
    const updatedPresets = presets.filter(p => p.id !== presetId);

    // If we deleted the default, make the first one default
    if (updatedPresets.length > 0 && !updatedPresets.some(p => p.isDefault)) {
      updatedPresets[0].isDefault = true;
    }

    setPresets(updatedPresets);
    savePresets(fullStorageKey, updatedPresets);
  }, [presets, fullStorageKey]);

  // Set default preset
  const handleSetDefault = useCallback((presetId: string) => {
    const updatedPresets = presets.map(p => ({
      ...p,
      isDefault: p.id === presetId,
      updatedAt: p.id === presetId ? new Date() : p.updatedAt,
    }));
    setPresets(updatedPresets);
    savePresets(fullStorageKey, updatedPresets);
  }, [presets, fullStorageKey]);

  // Apply preset
  const handleApplyPreset = useCallback((preset: FilterPreset) => {
    onApplyPreset(preset.filters);
    setIsOpen(false);
  }, [onApplyPreset]);

  const defaultPreset = presets.find(p => p.isDefault);

  return (
    <div className={`relative ${className}`}>
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg glass-card border-border hover:bg-card/90 transition-colors"
      >
        <Bookmark className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-foreground">
          {defaultPreset ? defaultPreset.name : 'Filter Presets'}
        </span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 rounded-lg glass-card border border-border shadow-lg z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-border/50">
            <span className="text-sm font-medium text-foreground">Saved Filters</span>
            <button
              onClick={() => {
                setIsCreating(true);
                setError(null);
              }}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <BookmarkPlus className="h-3 w-3" />
              Save Current
            </button>
          </div>

          {/* Create New Form */}
          {isCreating && (
            <div className="p-3 border-b border-border/50 bg-muted/30">
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={newPresetName}
                  onChange={(e) => setNewPresetName(e.target.value)}
                  placeholder="Preset name..."
                  className="flex-1 px-2 py-1 rounded border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSavePreset();
                    if (e.key === 'Escape') {
                      setIsCreating(false);
                      setNewPresetName('');
                      setError(null);
                    }
                  }}
                />
                <button
                  onClick={handleSavePreset}
                  className="p-1 rounded hover:bg-success/20 transition-colors"
                  title="Save"
                >
                  <Check className="h-4 w-4 text-success" />
                </button>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setNewPresetName('');
                    setError(null);
                  }}
                  className="p-1 rounded hover:bg-destructive/20 transition-colors"
                  title="Cancel"
                >
                  <X className="h-4 w-4 text-destructive" />
                </button>
              </div>
              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Current: {formatFilterSummary(currentFilters)}
              </p>
            </div>
          )}

          {/* Preset List */}
          <div className="max-h-64 overflow-y-auto">
            {presets.length === 0 ? (
              <div className="p-6 text-center">
                <Bookmark className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-sm text-muted-foreground">No saved presets</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Set your filters and click "Save Current"
                </p>
              </div>
            ) : (
              presets.map((preset) => (
                <div
                  key={preset.id}
                  className="flex items-center gap-2 p-3 hover:bg-muted/30 transition-colors border-b border-border/30 last:border-b-0"
                >
                  <button
                    onClick={() => handleApplyPreset(preset)}
                    className="flex-1 text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        {preset.name}
                      </span>
                      {preset.isDefault && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {formatFilterSummary(preset.filters)}
                    </p>
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleSetDefault(preset.id)}
                      className={`p-1 rounded transition-colors ${
                        preset.isDefault
                          ? 'text-primary'
                          : 'text-muted-foreground hover:text-primary hover:bg-primary/20'
                      }`}
                      title={preset.isDefault ? 'Default preset' : 'Set as default'}
                    >
                      {preset.isDefault ? (
                        <Star className="h-4 w-4 fill-current" />
                      ) : (
                        <StarOff className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDeletePreset(preset.id)}
                      className="p-1 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/20 transition-colors"
                      title="Delete preset"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {presets.length > 0 && (
            <div className="p-2 border-t border-border/50 bg-muted/20">
              <p className="text-[10px] text-muted-foreground text-center">
                {presets.length} saved preset{presets.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
