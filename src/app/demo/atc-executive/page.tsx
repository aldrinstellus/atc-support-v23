'use client';

import { Suspense } from 'react';
import { InteractiveChatWithFloatingInput } from '@/components/chat/InteractiveChatWithFloatingInput';

export default function ATCExecutiveDemoPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InteractiveChatWithFloatingInput />
    </Suspense>
  );
}
