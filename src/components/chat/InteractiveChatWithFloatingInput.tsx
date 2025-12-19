'use client';

import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { InteractiveChat, type InteractiveChatRef } from './InteractiveChat';
import { CommandPalette } from '../concepts/CommandPalette';
import { usePersona } from '@/hooks/use-persona';
import { useSidebar } from '@/contexts/SidebarContext';
import { useQuickAction } from '@/contexts/QuickActionContext';
import { getDashboardWidgets } from '@/config/dashboard-widgets';

export function InteractiveChatWithFloatingInput() {
  const { currentPersona } = usePersona();
  const { sidebarOpen } = useSidebar();
  const { quickActionQuery, setQuickActionQuery } = useQuickAction();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<InteractiveChatRef>(null);
  const processingQueryRef = useRef<string | null>(null);

  // Get widgets from dashboard config
  const widgets = getDashboardWidgets(currentPersona.id);

  // Monitor QuickAction context for widget click events
  useEffect(() => {
    if (quickActionQuery && quickActionQuery !== processingQueryRef.current) {
      processingQueryRef.current = quickActionQuery;
      chatRef.current?.submitQuery(quickActionQuery);
      setQuickActionQuery(null);
      // Clear the processing ref after a brief delay
      setTimeout(() => {
        processingQueryRef.current = null;
      }, 100);
    }
  }, [quickActionQuery, setQuickActionQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K to toggle command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleWidgetClick = (query: string) => {
    // Trigger the query in InteractiveChat via ref
    chatRef.current?.submitQuery(query);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Trigger query via ref
    chatRef.current?.submitQuery(inputValue);

    // Clear input
    setInputValue('');
  };

  return (
    <div className="relative h-full">
      {/* Hide InteractiveChat's default input with CSS */}
      <style jsx global>{`
        .floating-input-wrapper .absolute.bottom-0.left-0.right-0.bg-gradient-to-t {
          display: none;
        }
      `}</style>

      <div className="floating-input-wrapper h-full">
        <InteractiveChat ref={chatRef} persona={currentPersona} />
      </div>

      {/* Floating Input Bar - Contained within right panel */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 right-4 sm:left-6 sm:right-6 md:left-8 md:right-8 flex items-center gap-2 sm:gap-3 z-10">
          {/* Input with inline Send button */}
          <form onSubmit={handleSubmit} className="flex-1 relative min-w-0">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What would you like to do?"
              data-testid="chat-input"
              className="w-full pl-4 sm:pl-6 pr-12 sm:pr-14 py-3 sm:py-4 bg-card/90 backdrop-blur-xl border border-border/50 rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-xl transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              data-testid="send-button"
              className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Launch Button - Responsive: icon on mobile, full on desktop */}
          <button
            onClick={() => setIsPaletteOpen(true)}
            className="flex-shrink-0 flex items-center justify-center gap-2 p-3 sm:px-5 sm:py-4 bg-primary text-primary-foreground rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 hover:bg-primary/90"
            title="Quick Launch (⌘K)"
          >
            <span className="hidden sm:inline text-sm font-medium">Quick Launch</span>
            <kbd className="hidden lg:inline px-2 py-1 bg-primary-foreground/20 rounded text-xs">⌘K</kbd>
            {/* Icon for mobile */}
            <svg className="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
      </div>

      {/* Command Palette */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        widgets={widgets}
        onWidgetClick={handleWidgetClick}
      />
    </div>
  );
}
