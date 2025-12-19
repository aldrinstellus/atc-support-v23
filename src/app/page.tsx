'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to demo c-level page (default persona)
    router.replace('/demo/c-level');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-4 text-lg text-muted-foreground">Loading...</div>
      </div>
    </div>
  );
}
