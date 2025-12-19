'use client';

import { useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * ClientOnly Component
 *
 * Prevents hydration errors by only rendering children after client-side mount.
 * Useful for components that rely on browser APIs (localStorage, Date.now(), etc.)
 *
 * @param children - Content to render after client mount
 * @param fallback - Optional content to show during server render (default: null)
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
