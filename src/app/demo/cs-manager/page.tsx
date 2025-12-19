'use client';

import { useEffect } from 'react';
import { InteractiveChatWithFloatingInput } from '@/components/chat/InteractiveChatWithFloatingInput';
import { usePersona } from '@/hooks/use-persona';

export default function CSManagerDemoPage() {
  const { setPersona } = usePersona();

  useEffect(() => {
    setPersona('program-manager');
  }, [setPersona]);

  return <InteractiveChatWithFloatingInput />;
}
