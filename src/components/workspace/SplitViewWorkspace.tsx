'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { InteractiveChat, type InteractiveChatRef } from '../chat/InteractiveChat';
import { DashboardGrid } from '../dashboard/DashboardGrid';
import { ResizableDivider } from './ResizableDivider';
import { usePersona } from '@/hooks/use-persona';
import { useSidebar } from '@/contexts/SidebarContext';
import { getDashboardWidgets, DashboardWidget } from '@/config/dashboard-widgets';

export function SplitViewWorkspace() {
  const { currentPersona } = usePersona();
   
  const { sidebarOpen: _sidebarOpen } = useSidebar();
  const [chatWidth, setChatWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('split-view-chat-width');
      return saved ? parseFloat(saved) : 60;
    }
    return 60;
  });
  const [chatCollapsed, setChatCollapsed] = useState(false);
  const [dashboardCollapsed, setDashboardCollapsed] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<InteractiveChatRef>(null);
  const widgets = getDashboardWidgets(currentPersona.id);

  // Persist chat width
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('split-view-chat-width', chatWidth.toString());
    }
  }, [chatWidth]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+[ = Focus chat
      if ((e.metaKey || e.ctrlKey) && e.key === '[') {
        e.preventDefault();
        if (chatCollapsed) setChatCollapsed(false);
        inputRef.current?.focus();
      }
      // Cmd+] = Focus dashboard
      else if ((e.metaKey || e.ctrlKey) && e.key === ']') {
        e.preventDefault();
        if (dashboardCollapsed) setDashboardCollapsed(false);
      }
      // Cmd+\ = Reset 60/40 split
      else if ((e.metaKey || e.ctrlKey) && e.key === '\\') {
        e.preventDefault();
        setChatWidth(60);
        setChatCollapsed(false);
        setDashboardCollapsed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [chatCollapsed, dashboardCollapsed]);

  const handleWidgetClick = (widget: DashboardWidget) => {
    // Trigger the widget's query in chat
    chatRef.current?.submitQuery(widget.query);
    // Focus chat
    if (chatCollapsed) setChatCollapsed(false);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    chatRef.current?.submitQuery(inputValue);
    setInputValue('');
  };

  const dashboardWidth = 100 - chatWidth;

  return (
    <div className="relative h-full flex">
      {/* Chat Pane */}
      <div
        className="relative flex flex-col transition-all duration-300 ease-in-out"
        style={{
          width: chatCollapsed ? '48px' : `${chatWidth}%`,
        }}
      >
        {chatCollapsed ? (
          // Collapsed state - thin bar with expand button
          <div className="h-full bg-card border-r border-border flex flex-col items-center py-4 gap-4">
            <button
              onClick={() => setChatCollapsed(false)}
              className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              title="Expand chat (Cmd+[)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="flex-1" />
            <div className="writing-mode-vertical text-xs text-muted-foreground font-medium">
              CHAT
            </div>
          </div>
        ) : (
          // Expanded state
          <>
            {/* Collapse button */}
            <button
              onClick={() => setChatCollapsed(true)}
              className="absolute top-4 right-4 z-10 p-2 bg-card/90 backdrop-blur-xl border border-border/50 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shadow-sm"
              title="Collapse chat"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Chat content */}
            <style jsx global>{`
              .split-view-chat .border-t.border-border.bg-card {
                display: none;
              }
            `}</style>

            <div className="split-view-chat h-full flex-1">
              <InteractiveChat ref={chatRef} persona={currentPersona} />
            </div>

            {/* Input bar */}
            <div className="border-t border-border bg-card/50 backdrop-blur-xl p-4">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full pl-4 pr-12 py-3 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </>
        )}
      </div>

      {/* Resizable Divider */}
      {!chatCollapsed && !dashboardCollapsed && (
        <ResizableDivider
          onResize={setChatWidth}
          initialLeftWidth={chatWidth}
          minLeftWidth={30}
          maxLeftWidth={70}
        />
      )}

      {/* Dashboard Pane */}
      <div
        className="relative flex flex-col transition-all duration-300 ease-in-out"
        style={{
          width: dashboardCollapsed ? '48px' : `${dashboardWidth}%`,
        }}
      >
        {dashboardCollapsed ? (
          // Collapsed state
          <div className="h-full bg-card border-l border-border flex flex-col items-center py-4 gap-4">
            <button
              onClick={() => setDashboardCollapsed(false)}
              className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              title="Expand dashboard (Cmd+])"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1" />
            <div className="writing-mode-vertical text-xs text-muted-foreground font-medium">
              DASHBOARD
            </div>
          </div>
        ) : (
          // Expanded state
          <>
            {/* Header with controls */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-xl">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Dashboard</h2>
                <p className="text-xs text-muted-foreground">{widgets.length} widgets</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setChatWidth(60)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                  title="Reset split (Cmd+\)"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDashboardCollapsed(true)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                  title="Collapse dashboard"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="flex-1 overflow-hidden">
              <DashboardGrid widgets={widgets} onWidgetClick={handleWidgetClick} />
            </div>

            {/* Keyboard shortcuts hint */}
            <div className="p-3 border-t border-border bg-card/50 backdrop-blur-xl">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span><kbd className="px-1.5 py-0.5 bg-muted rounded">⌘[</kbd> Chat</span>
                <span><kbd className="px-1.5 py-0.5 bg-muted rounded">⌘]</kbd> Dashboard</span>
                <span><kbd className="px-1.5 py-0.5 bg-muted rounded">⌘\</kbd> Reset</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
