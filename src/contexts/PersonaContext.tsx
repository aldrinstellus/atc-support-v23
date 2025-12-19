'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Persona, PersonaType } from '@/types/persona';
import { getPersonaById, getPersonasByMode, getDefaultPersona } from '@/data/personas';
import { useMode } from '@/contexts/ModeContext';

const PERSONA_STORAGE_KEY = 'selected-persona';

interface PersonaContextType {
  currentPersona: Persona;
  setPersona: (personaId: PersonaType) => void;
  availablePersonas: Persona[];
  isTransitioning: boolean;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({
  children,
  initialPersonaId
}: {
  children: ReactNode;
  initialPersonaId?: PersonaType;
}) {
  const { currentMode } = useMode();
  const [currentPersona, setCurrentPersona] = useState<Persona>(getDefaultPersona(currentMode));
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load persona on mount - URL persona takes priority over localStorage
  useEffect(() => {
    console.log('[PersonaContext] Loading persona - initialPersonaId:', initialPersonaId, 'currentMode:', currentMode);

    // Priority 1: Use initialPersonaId if provided (from URL/route)
    // URL is the source of truth - load the persona regardless of mode mismatch
    if (initialPersonaId) {
      const persona = getPersonaById(initialPersonaId);
      console.log('[PersonaContext] Found persona for ID:', persona);
      if (persona) {
        setCurrentPersona(persona);
        localStorage.setItem(PERSONA_STORAGE_KEY, persona.id);
        console.log('[PersonaContext] Loaded persona from URL:', persona.id, 'mode:', persona.mode);
        return;
      }
    }

    // Priority 2: Use saved persona from localStorage
    const savedPersonaId = localStorage.getItem(PERSONA_STORAGE_KEY);
    if (savedPersonaId && !initialPersonaId) {
      const persona = getPersonaById(savedPersonaId);
      // Only use saved persona if it matches current mode
      if (persona && persona.mode === currentMode) {
        setCurrentPersona(persona);
        console.log('[PersonaContext] Loaded persona from localStorage:', persona.id);
        return;
      }
    }

    // Priority 3: Fall back to default persona for current mode
    const defaultPersona = getDefaultPersona(currentMode);
    setCurrentPersona(defaultPersona);
    localStorage.setItem(PERSONA_STORAGE_KEY, defaultPersona.id);
    console.log('[PersonaContext] Using default persona:', defaultPersona.id);
  }, [currentMode, initialPersonaId]); // Re-run when mode or initialPersonaId changes

  // Change persona with transition
  const setPersona = useCallback(
    (personaId: PersonaType) => {
      const newPersona = getPersonaById(personaId);
      if (!newPersona || newPersona.id === currentPersona.id) return;

      setIsTransitioning(true);

      // Fade out phase (200ms)
      setTimeout(() => {
        setCurrentPersona(newPersona);
        localStorage.setItem(PERSONA_STORAGE_KEY, personaId);
        console.log('[PersonaContext] Changed persona to:', personaId);

        // Fade in phase (400ms)
        setTimeout(() => {
          setIsTransitioning(false);
        }, 400);
      }, 200);
    },
    [currentPersona.id]
  );

  return (
    <PersonaContext.Provider
      value={{
        currentPersona,
        setPersona,
        availablePersonas: getPersonasByMode(currentMode),
        isTransitioning,
      }}
    >
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const context = useContext(PersonaContext);
  if (context === undefined) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
}
