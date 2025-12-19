'use client';

import { useState, useCallback, Suspense } from 'react';
import { ChevronDown } from 'lucide-react';
import { InteractiveChat } from '@/components/chat/InteractiveChat';
import { PersonaProvider, usePersona } from '@/contexts/PersonaContext';
import { ConversationProvider } from '@/contexts/ConversationContext';
import { QuickActionProvider } from '@/contexts/QuickActionContext';
import { SidebarProvider } from '@/contexts/SidebarContext';
import { ModeProvider } from '@/contexts/ModeContext';
import type { Persona, PersonaType } from '@/types/persona';

function ChatLoadingFallback() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[400px]">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-muted" />
        <div className="h-4 w-48 rounded bg-muted" />
        <div className="h-3 w-32 rounded bg-muted/50" />
      </div>
    </div>
  );
}

function ChatPageContent() {
  const { currentPersona, setPersona, availablePersonas } = usePersona();
  const [showPersonaDropdown, setShowPersonaDropdown] = useState(false);

  const handlePersonaChange = (persona: Persona) => {
    setPersona(persona.id as PersonaType);
    setShowPersonaDropdown(false);
  };

  const getPersonaColor = (personaId: string) => {
    switch (personaId) {
      case 'atc-support':
        return 'bg-green-500';
      case 'atc-executive':
        return 'bg-purple-500';
      case 'atc-manager':
        return 'bg-teal-500';
      case 'atc-csm':
        return 'bg-cyan-500';
      default:
        return 'bg-muted-foreground';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Compact Header - Integrated with dashboard */}
      <div className="sticky top-0 z-30 border-b border-border/50 bg-card-elevated/95 backdrop-blur-xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">AI Assistant</h1>
            <p className="text-xs text-muted-foreground">
              Intelligent support for IT tickets and knowledge base
            </p>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            {/* Persona Selector - Compact */}
            <div className="relative">
              <button
                onClick={() => setShowPersonaDropdown(!showPersonaDropdown)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-border/50"
              >
                <span className={`h-2 w-2 rounded-full ${getPersonaColor(currentPersona.id)}`} />
                <span className="text-sm font-medium text-foreground">
                  {currentPersona.name}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>

              {showPersonaDropdown && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg bg-card-elevated border border-border shadow-xl z-50">
                  <div className="p-2 space-y-1">
                    <p className="text-xs text-muted-foreground px-2 py-1">Select Role</p>
                    {availablePersonas.map((persona) => (
                      <button
                        key={persona.id}
                        onClick={() => handlePersonaChange(persona)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          currentPersona.id === persona.id
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-muted text-foreground'
                        }`}
                      >
                        <span className={`h-2 w-2 rounded-full ${getPersonaColor(persona.id)}`} />
                        <span className="text-sm font-medium">{persona.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Content - Fills remaining height */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Suspense fallback={<ChatLoadingFallback />}>
          <InteractiveChat />
        </Suspense>
      </div>
    </div>
  );
}

function ChatPageWithSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);

  return (
    <SidebarProvider value={{ sidebarOpen, toggleSidebar }}>
      <ChatPageContent />
    </SidebarProvider>
  );
}

export default function ChatPage() {
  return (
    <ModeProvider initialMode="atc">
      <PersonaProvider initialPersonaId="atc-support">
        <ConversationProvider>
          <QuickActionProvider>
            <ChatPageWithSidebar />
          </QuickActionProvider>
        </ConversationProvider>
      </PersonaProvider>
    </ModeProvider>
  );
}
