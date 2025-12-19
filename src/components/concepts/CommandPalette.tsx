'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Zap } from 'lucide-react';
import type { DashboardWidget } from '@/config/dashboard-widgets';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  widgets: DashboardWidget[];
  onWidgetClick: (query: string) => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  widgets,
  onWidgetClick,
}: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter widgets based on search
  const filteredWidgets = widgets.filter((widget) =>
    widget.title.toLowerCase().includes(search.toLowerCase())
  );

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Focus input when palette opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleWidgetSelect = useCallback((widget: DashboardWidget) => {
    onWidgetClick(widget.query);
    onClose();
    setSearch('');
  }, [onWidgetClick, onClose]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredWidgets.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredWidgets[selectedIndex]) {
            handleWidgetSelect(filteredWidgets[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredWidgets, onClose, handleWidgetSelect]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Command Palette */}
      <div className="fixed top-[20vh] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4">
        <div className="bg-card border border-border rounded-lg shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Quick Actions..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {filteredWidgets.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No Quick Actions found
              </div>
            ) : (
              <div className="py-2">
                {filteredWidgets.map((widget, index) => {
                  return (
                    <button
                      key={widget.id}
                      onClick={() => handleWidgetSelect(widget)}
                      className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                        index === selectedIndex
                          ? 'bg-muted'
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Zap className="w-4 h-4 text-foreground" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium text-foreground">
                          {widget.title}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {widget.query}
                        </div>
                      </div>
                      <Zap className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Hints */}
          <div className="flex items-center gap-4 px-4 py-2 border-t border-border bg-muted/30 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-background rounded border border-border">
                ↑↓
              </kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-background rounded border border-border">
                ↵
              </kbd>
              <span>Select</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-background rounded border border-border">
                Esc
              </kbd>
              <span>Close</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
