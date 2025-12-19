'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-950">
        {children}
      </div>
    </ThemeProvider>
  );
}
