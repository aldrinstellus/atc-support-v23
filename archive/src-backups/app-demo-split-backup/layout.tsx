'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { QuickActionProvider, useQuickAction } from '@/contexts/QuickActionContext';
import { SidebarProvider } from '@/contexts/SidebarContext';
import { ConversationProvider, useConversation } from '@/contexts/ConversationContext';

function DemoLayoutContent({ children }: { children: React.ReactNode }) {
  const { setQuickActionQuery } = useQuickAction();
  const { clearAllConversations } = useConversation();

  // Collapsible sidebar state with localStorage persistence
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarOpen');
      return saved !== null ? JSON.parse(saved) : true; // Default to open
    }
    return true;
  });

  // Save sidebar state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  // Keyboard shortcut: Cmd/Ctrl + B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setSidebarOpen((prev: boolean) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleQuickAction = (query: string) => {
    setQuickActionQuery(query);
    // Clear after a brief moment to allow child to consume it
    setTimeout(() => setQuickActionQuery(null), 200);
  };

  const handleNewConversation = () => {
    window.location.reload();
  };

  const handleResetData = () => {
    if (confirm('Reset all conversation data? This will clear all messages across all personas.')) {
      clearAllConversations();
      console.log('[DemoLayout] All conversations cleared');
    }
  };

  return (
    <SidebarProvider
      value={{ sidebarOpen, toggleSidebar: () => setSidebarOpen(!sidebarOpen) }}
    >
      <div className="flex h-screen bg-background overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onQuickAction={handleQuickAction}
          onNewConversation={handleNewConversation}
          onResetData={handleResetData}
        />
        <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
      </div>
    </SidebarProvider>
  );
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConversationProvider>
      <QuickActionProvider>
        <DemoLayoutContent>{children}</DemoLayoutContent>
      </QuickActionProvider>
    </ConversationProvider>
  );
}
