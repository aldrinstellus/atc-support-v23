import { LucideIcon } from 'lucide-react';

// Mode type for Government vs Project vs ATC personas
export type ModeType = 'government' | 'project' | 'atc';

// Updated persona types to support all modes
export type PersonaType =
  // Government Mode (3 personas)
  | 'cor'                    // Contracting Officer's Representative
  | 'program-manager'        // Program Manager / Business team lead
  | 'stakeholder-lead'       // Department Group / Stakeholder lead
  // Project Mode (3 personas)
  | 'project-manager'        // Project Manager
  | 'service-team-lead'      // Service team lead
  | 'service-team-member'    // Service team member
  // ATC Mode (4 personas - from v14/v15)
  | 'atc-executive'          // C-Level Executive
  | 'atc-manager'            // CS Manager
  | 'atc-support'            // Support Agent
  | 'atc-csm';               // Customer Success Manager

export interface PersonaTheme {
  primary: string; // HSL values without hsl()
  accent: string;
  badgeGradient: string; // Tailwind classes (legacy)
  badgeSolid: string; // Solid color badge (Tailwind bg-* class)
  badgeRing: string;
}

export interface QuickAction {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge: string | number;
  badgeColor: string;
  query?: string;
  link?: string;
}

export interface Persona {
  id: PersonaType;
  mode: ModeType;          // NEW: Associates persona with government or project mode
  name: string;
  email: string;
  role: string;
  badge: {
    label: string;
    icon: LucideIcon;
    color: string; // Tailwind color class
  };
  theme: PersonaTheme;
  quickActions: QuickAction[];
  demoScenarios: Record<string, string[]>;
  permissions: string[];
}

export interface PersonaContextType {
  currentPersona: Persona;
  setPersona: (personaId: PersonaType) => void;
  availablePersonas: Persona[];
}
