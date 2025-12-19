'use client';

import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { InteractiveChat, type InteractiveChatRef } from './InteractiveChat';
import { EnhancedCommandPalette } from '../concepts/EnhancedCommandPalette';
import { usePersona } from '@/hooks/use-persona';
import { useSidebar } from '@/contexts/SidebarContext';
import { getDashboardWidgets } from '@/config/dashboard-widgets';

export function ChatWithPalette() {
  const { currentPersona } = usePersona();
  const { sidebarOpen } = useSidebar();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<InteractiveChatRef>(null);
  const widgets = getDashboardWidgets(currentPersona.id);

  // Keyboard shortcut: Cmd+K to toggle palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
        .floating-input-wrapper .border-t.border-border.bg-card {
          display: none;
        }
      `}</style>

      <div className="floating-input-wrapper h-full">
        <InteractiveChat ref={chatRef} persona={currentPersona} />
      </div>

      {/* Floating Input Bar */}
      <div
        className={`fixed bottom-8 ${
          sidebarOpen ? 'left-[calc(50%+150px)]' : 'left-1/2'
        } -translate-x-1/2 w-full max-w-4xl px-6 flex items-center gap-3 z-10 transition-all duration-300`}
      >
        <form onSubmit={handleSubmit} className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What would you like to do?"
            className="w-full pl-6 pr-14 py-4 bg-card/90 backdrop-blur-xl border border-border/50 rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-xl transition-all"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Enhanced Command Palette */}
      <EnhancedCommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        widgets={widgets}
        onWidgetClick={handleWidgetClick}
      />
    </div>
  );
}
