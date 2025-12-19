'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { PersonaDashboard } from '@/components/dashboard/PersonaDashboard';
import { usePersona } from '@/hooks/use-persona';
import { PersonaType } from '@/types/persona';

export default function DashboardPage() {
  const params = useParams();
  const { setPersona } = usePersona();
  const personaSlug = params.persona as string;

  useEffect(() => {
    // Set persona based on route (map old URL slugs to new persona IDs for backward compatibility)
    const personaMap: Record<string, PersonaType> = {
      'cor': 'cor',
      'c-level': 'cor', // backward compatibility
      'program-manager': 'program-manager',
      'cs-manager': 'program-manager', // backward compatibility
      'service-team-member': 'service-team-member',
      'support-agent': 'service-team-member', // backward compatibility
    };

    const personaType = personaMap[personaSlug];
    if (personaType) {
      setPersona(personaType);
    }
  }, [personaSlug, setPersona]);

  return <PersonaDashboard />;
}
