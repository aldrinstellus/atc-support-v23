'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, LayoutDashboard } from 'lucide-react';
import { InteractiveChat, type InteractiveChatRef } from './InteractiveChat';
import { DashboardDrawer } from '../dashboard/DashboardDrawer';
import { usePersona } from '@/hooks/use-persona';
import { useSidebar } from '@/contexts/SidebarContext';
import { getDashboardWidgets, DashboardWidget } from '@/config/dashboard-widgets';

export function ChatWithDrawer() {
  const { currentPersona } = usePersona();
  const { sidebarOpen } = useSidebar();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerPinned, setIsDrawerPinned] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('dashboard-drawer-pinned') === 'true';
    }
    return false;
  });
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<InteractiveChatRef>(null);
  const widgets = getDashboardWidgets(currentPersona.id);

  // Persist pin state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dashboard-drawer-pinned', isDrawerPinned.toString());
    }
  }, [isDrawerPinned]);

  // Keyboard shortcut: Cmd+Shift+D to toggle drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'd') {
        e.preventDefault();
        setIsDrawerOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isDrawerOpen && !isDrawerPinned) {
        e.preventDefault();
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, isDrawerPinned]);

  const handleWidgetClick = (widget: DashboardWidget) => {
    // Trigger the widget's query in chat
    chatRef.current?.submitQuery(widget.query);
    // Optionally close drawer if not pinned
    if (!isDrawerPinned) {
      setIsDrawerOpen(false);
    }
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
      {/* Dashboard Button */}
      <div className="absolute top-4 right-6 z-20">
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg transition-all ${
            isDrawerOpen
              ? 'bg-primary text-primary-foreground'
              : 'bg-card/90 backdrop-blur-xl border border-border/50 text-foreground hover:bg-card'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="text-sm font-medium">Dashboard</span>
        </button>
        <div className="text-xs text-muted-foreground text-center mt-2">
          <kbd className="px-2 py-1 bg-muted rounded text-xs">⌘⇧D</kbd>
        </div>
      </div>

      {/* Chat Area - adjusts width when drawer is pinned */}
      <div
        className={`h-full transition-all duration-300 ${
          isDrawerOpen && isDrawerPinned ? 'mr-[600px] md:mr-[600px] lg:mr-[700px]' : ''
        }`}
      >
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
          } -translate-x-1/2 w-full max-w-4xl px-6 flex items-center gap-3 z-10 transition-all duration-300 ${
            isDrawerOpen && isDrawerPinned ? 'mr-[600px] md:mr-[600px] lg:mr-[700px]' : ''
          }`}
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
      </div>

      {/* Dashboard Drawer */}
      <DashboardDrawer
        isOpen={isDrawerOpen}
        isPinned={isDrawerPinned}
        widgets={widgets}
        onClose={() => setIsDrawerOpen(false)}
        onTogglePin={() => setIsDrawerPinned((prev) => !prev)}
        onWidgetClick={handleWidgetClick}
      />
    </div>
  );
}
