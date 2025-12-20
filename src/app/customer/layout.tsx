'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { CustomerPersonaProvider } from '@/contexts/CustomerPersonaContext';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <CustomerPersonaProvider>
        <div className="min-h-screen bg-gray-950">
          {children}
        </div>
      </CustomerPersonaProvider>
    </ThemeProvider>
  );
}
