'use client';

import { Building2, Users, Briefcase } from 'lucide-react';
import { useMode } from '@/contexts/ModeContext';
import { usePersona } from '@/hooks/use-persona';
import { useRouter } from 'next/navigation';
import { PersonaType } from '@/types/persona';

// Skeleton loader for the mode switcher buttons
function ModeSwitcherSkeleton() {
  return (
    <div className="flex items-center gap-1 p-1 bg-background border border-border rounded-lg animate-pulse">
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md">
        <div className="h-3.5 w-3.5 bg-muted rounded" />
        <div className="h-3 w-16 bg-muted rounded" />
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md">
        <div className="h-3.5 w-3.5 bg-muted rounded" />
        <div className="h-3 w-12 bg-muted rounded" />
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md">
        <div className="h-3.5 w-3.5 bg-muted rounded" />
        <div className="h-3 w-8 bg-muted rounded" />
      </div>
    </div>
  );
}

export function ModeSwitcher() {
  const { currentMode, setMode, hasMounted } = useMode();
  const { setPersona } = usePersona();
  const router = useRouter();

  const handleModeSwitch = (mode: 'government' | 'project' | 'atc') => {
    if (mode === currentMode) return; // Already on this mode

    setMode(mode);

    // Navigate to first persona of the new mode
    const firstPersonaMap = {
      government: 'cor',
      project: 'project-manager',
      atc: 'atc-executive'
    };

    const firstPersonaId = firstPersonaMap[mode] as PersonaType;
    setPersona(firstPersonaId); // Switch persona
    router.push(`/demo/${firstPersonaId}`); // Navigate to page
  };

  // Show skeleton until hydrated to prevent flash of wrong state
  if (!hasMounted) {
    return <ModeSwitcherSkeleton />;
  }

  return (
    <div className="flex items-center gap-1 p-1 bg-background border border-border rounded-lg">
      <button
        onClick={() => handleModeSwitch('government')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
          currentMode === 'government'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
        }`}
        aria-label="Switch to Government mode"
      >
        <Building2 className="h-3.5 w-3.5" />
        <span>Government</span>
      </button>
      <button
        onClick={() => handleModeSwitch('project')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
          currentMode === 'project'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
        }`}
        aria-label="Switch to Project mode"
      >
        <Users className="h-3.5 w-3.5" />
        <span>Project</span>
      </button>
      <button
        onClick={() => handleModeSwitch('atc')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
          currentMode === 'atc'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
        }`}
        aria-label="Switch to ATC mode"
      >
        <Briefcase className="h-3.5 w-3.5" />
        <span>ATC</span>
      </button>
    </div>
  );
}
