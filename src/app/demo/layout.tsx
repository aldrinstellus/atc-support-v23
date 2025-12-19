'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { QuickActionProvider, useQuickAction } from '@/contexts/QuickActionContext';
import { SidebarProvider } from '@/contexts/SidebarContext';
import { ConversationProvider, useConversation } from '@/contexts/ConversationContext';
import { PersonaProvider } from '@/contexts/PersonaContext';
import { ModeProvider } from '@/contexts/ModeContext';
import { PersonaType, ModeType } from '@/types/persona';

// Helper to determine mode from persona ID
function getModeFromPersona(personaId?: string): ModeType {
  if (!personaId) return 'government';

  // ATC personas
  if (personaId.startsWith('atc-')) return 'atc';
  if (['c-level', 'cs-manager', 'support-agent'].includes(personaId)) return 'atc';

  // Project personas
  if (personaId.startsWith('project-')) return 'project';

  // Government personas (default)
  return 'government';
}

function DemoLayoutContent({ children }: { children: React.ReactNode }) {
  const { setQuickActionQuery } = useQuickAction();
  const { clearAllConversations } = useConversation();

  // Collapsible sidebar state with localStorage persistence
  // On mobile (< 768px), default to closed; on desktop, check localStorage
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      // Mobile: default to closed
      if (window.innerWidth < 768) {
        return false;
      }
      // Desktop: check localStorage, default to open
      const saved = localStorage.getItem('sidebarOpen');
      return saved !== null ? JSON.parse(saved) : true;
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
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <div className="flex-1 overflow-hidden">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Extract persona ID from URL path (e.g., /demo/project-manager → project-manager)
  const personaId = pathname?.split('/').pop() as PersonaType | undefined;

  // Determine initial mode from persona
  const initialMode = getModeFromPersona(personaId);

  return (
    <ModeProvider initialMode={initialMode}>
      <PersonaProvider initialPersonaId={personaId}>
        <ConversationProvider>
          <QuickActionProvider>
            <DemoLayoutContent>{children}</DemoLayoutContent>
          </QuickActionProvider>
        </ConversationProvider>
      </PersonaProvider>
    </ModeProvider>
  );
}
