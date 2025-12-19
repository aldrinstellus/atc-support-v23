'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MessageSquare, LayoutDashboard } from 'lucide-react';
import { InteractiveChat, type InteractiveChatRef } from './InteractiveChat';
import { DashboardGrid } from '../dashboard/DashboardGrid';
import { usePersona } from '@/hooks/use-persona';
import { useSidebar } from '@/contexts/SidebarContext';
import { getDashboardWidgets, DashboardWidget } from '@/config/dashboard-widgets';

type ViewMode = 'chat' | 'dashboard';

export function ChatWithDashboardToggle() {
  const { currentPersona } = usePersona();
  const { sidebarOpen } = useSidebar();
  const [viewMode, setViewMode] = useState<ViewMode>('chat');
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<InteractiveChatRef>(null);
  const widgets = getDashboardWidgets(currentPersona.id);

  // Keyboard shortcut: Cmd+Shift+D to toggle view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'd') {
        e.preventDefault();
        setViewMode((prev) => (prev === 'chat' ? 'dashboard' : 'chat'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleWidgetClick = (widget: DashboardWidget) => {
    // Switch to chat mode and trigger the widget's query
    setViewMode('chat');
    setTimeout(() => {
      chatRef.current?.submitQuery(widget.query);
    }, 100);
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
      {/* Toggle Button */}
      <div className="absolute top-4 right-6 z-20">
        <div className="flex items-center gap-2 bg-card/90 backdrop-blur-xl border border-border/50 rounded-full p-1 shadow-lg">
          <button
            onClick={() => setViewMode('chat')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              viewMode === 'chat'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Chat
          </button>
          <button
            onClick={() => setViewMode('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              viewMode === 'dashboard'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </button>
        </div>
        <div className="text-xs text-muted-foreground text-center mt-2">
          <kbd className="px-2 py-1 bg-muted rounded text-xs">⌘⇧D</kbd>
        </div>
      </div>

      {/* View Content with smooth transitions */}
      <AnimatePresence mode="wait">
        {viewMode === 'chat' ? (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="h-full"
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
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            <DashboardGrid widgets={widgets} onWidgetClick={handleWidgetClick} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
