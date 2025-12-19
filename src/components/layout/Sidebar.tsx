'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Plus, Check, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname, useRouter } from 'next/navigation';
import { Avatar } from '@/components/ui/Avatar';
import { usePersona } from '@/hooks/use-persona';
import { useConversation } from '@/contexts/ConversationContext';
import { CTISLogo } from '@/components/layout/CTISLogo';

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
  onQuickAction?: (query: string) => void;
  onNewConversation?: () => void;
  onResetData?: () => void;
}

export function Sidebar({
  isOpen = true,
  onToggle: _onToggle,  
  onQuickAction,
  onNewConversation,
  onResetData,
}: SidebarProps) {
  usePathname();
  const router = useRouter();
  const { currentPersona, setPersona, availablePersonas } = usePersona();
  const { messagesByPersona } = useConversation();
  const [personaSelectorOpen, setPersonaSelectorOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Fix hydration: Only show conversation data after client mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Memoize current messages to avoid recalculating on every render
  const currentMessages = useMemo(
    () => messagesByPersona[currentPersona.id] || [],
    [messagesByPersona, currentPersona.id]
  );

  // Memoize message count
  const messageCount = useMemo(
    () => (isClient ? currentMessages.length : 0),
    [isClient, currentMessages.length]
  );

  // Memoize conversation preview
  const conversationPreview = useMemo(() => {
    if (!isClient) return null;
    const firstUserMessage = currentMessages.find(msg => msg.type === 'user');
    const preview = firstUserMessage?.content?.substring(0, 50) || null;
    return preview;
  }, [isClient, currentMessages]);

  // Memoize persona-specific Quick Actions
  const quickActions = useMemo(
    () => currentPersona.quickActions || [],
    [currentPersona.quickActions]
  );

  // Memoize toggle callback
  const togglePersonaSelector = useCallback(() => {
    setPersonaSelectorOpen(prev => !prev);
  }, []);

  return (
    <>
      {/* Mobile overlay backdrop - only show on mobile when sidebar is open */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={_onToggle}
      />

      {/* Sidebar - Mobile: slide in from left as overlay, Desktop: inline with collapse */}
      <aside
        className={`h-screen bg-card border-r border-border transition-all duration-300 flex-shrink-0
          fixed md:relative left-0 top-0 z-50 md:z-auto
          ${isOpen ? 'translate-x-0 w-[300px]' : '-translate-x-full md:translate-x-0 md:w-0 w-[300px]'}
        `}
      >
        <div
          className={`flex h-full flex-col w-[300px] ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } transition-opacity duration-200`}
        >
      {/* CTIS Logo */}
      <CTISLogo />

      {/* Scrollable Middle Section: Conversations + Quick Actions */}
      <div className="flex-1 overflow-y-auto">
        {/* Conversations Section (New + Recent + Reset) */}
        <div className="py-3 border-b border-border">
          {/* Section Header with Actions */}
          <div className="flex items-center justify-between mb-2 px-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Conversations</span>
            </div>
            <div className="flex items-center gap-1">
              {/* Reset Data - Icon Only */}
              <button
                onClick={onResetData}
                className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                title="Reset All Data"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
              {/* New Conversation */}
              <button
                onClick={onNewConversation}
                className="flex items-center gap-1 px-2 py-1 bg-primary hover:bg-primary/90 rounded-md text-xs font-medium text-primary-foreground transition-colors"
                title="New Conversation"
              >
                <Plus className="w-3 h-3" />
                <span>New</span>
              </button>
            </div>
          </div>
          {messageCount === 0 ? (
            <div className="text-xs text-muted-foreground/60 py-4 text-center px-3">
              No conversations yet
            </div>
          ) : (
            <div className="space-y-2 px-3">
              <div className="rounded-lg border border-border/50 bg-background/50 p-3">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-xs font-medium text-foreground">Current Session</span>
                  <span className="text-xs text-muted-foreground">{messageCount} msgs</span>
                </div>
                {conversationPreview && (
                  <p className="text-xs text-muted-foreground/80 truncate">
                    {conversationPreview}{conversationPreview.length >= 50 ? '...' : ''}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="py-3 border-b border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 px-4">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Quick Actions
          </div>
          <div className="space-y-1 px-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => action.query && onQuickAction?.(action.query)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-muted transition-colors group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground truncate">{action.label}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${action.badgeColor}`}
                  >
                    {action.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Section: User Profile */}
      <div className="flex-shrink-0">
        {/* User Profile with Persona Selector */}
        <div className="border-t border-border p-3">
        <div className="relative">
          {/* Ultra-Compact Profile Button - Left Aligned with Badge */}
          <button
            onClick={togglePersonaSelector}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 bg-primary/10 rounded-lg hover:bg-primary/15 transition-colors"
          >
            {/* Avatar */}
            <Avatar key={currentPersona.id} name={currentPersona.name} id={currentPersona.id} size={28} />

            {/* User Info + Badge */}
            <div className="flex-1 min-w-0 flex items-center gap-2">
              {/* Text Container */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate leading-tight">{currentPersona.name}</p>
                <p className="text-[10px] text-muted-foreground truncate leading-tight">{currentPersona.role}</p>
              </div>

              {/* Badge */}
              {(() => {
                const BadgeIcon = currentPersona.badge.icon;
                return (
                  <div className={`flex items-center gap-1 rounded-md ${currentPersona.theme.badgeSolid} px-1.5 py-0.5 flex-shrink-0`}>
                    <BadgeIcon className="h-2.5 w-2.5 text-white" />
                    <span className="text-[9px] font-bold uppercase text-white whitespace-nowrap">{currentPersona.badge.label}</span>
                  </div>
                );
              })()}
            </div>
          </button>

          {/* Persona Selector Dropdown */}
          <AnimatePresence>
            {personaSelectorOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bottom-full left-0 right-0 mb-2 overflow-hidden rounded-lg border border-border bg-card shadow-xl"
              >
                {availablePersonas.map((persona) => {
                  const BadgeIcon = persona.badge.icon;
                  const isActive = persona.id === currentPersona.id;
                  return (
                    <button
                      key={persona.id}
                      onClick={() => {
                        setPersona(persona.id);
                        setPersonaSelectorOpen(false);
                        // Use Next.js router for smooth client-side navigation
                        router.push(`/demo/${persona.id}`);
                      }}
                      className={`w-full p-3 relative transition-colors ${
                        isActive ? 'bg-primary/10' : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        {/* Avatar */}
                        <Avatar name={persona.name} id={persona.id} size={40} />
                        <div className="w-full text-center">
                          <div className="flex items-center justify-center gap-2">
                            <p className="text-sm font-medium truncate">{persona.name}</p>
                            {/* Badge */}
                            <div className={`flex items-center gap-1 rounded-md ${persona.theme.badgeSolid} px-1.5 py-0.5`}>
                              <BadgeIcon className="h-2.5 w-2.5 text-white" />
                              <span className="text-[9px] font-bold uppercase text-white">{persona.badge.label}</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{persona.role}</p>
                        </div>
                        {isActive && (
                          <div className="absolute top-2 right-2">
                            <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            // For demo purposes, redirect to home or login page
            router.push('/');
          }}
          className="w-full flex items-center gap-2 px-2.5 py-2 mt-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-xs font-medium">Logout</span>
        </button>
        </div>
      </div>
      </div>
    </aside>
    </>
  );
}
