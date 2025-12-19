'use client';

import { LayoutDashboard, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar } from '@/components/ui/Avatar';
import { usePersona } from '@/hooks/use-persona';

export function DashboardHeader() {
  const pathname = usePathname();
  const { currentPersona } = usePersona();

  const isDashboard = pathname.includes('/dashboard');
  const personaSlug = currentPersona.id;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Logo & Navigation */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-lg ${currentPersona.theme.badgeSolid} flex items-center justify-center`}>
              <LayoutDashboard className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-foreground">Support AI</span>
          </div>

          {/* Tab Navigation */}
          <nav className="flex items-center gap-1">
            <Link
              href={`/dashboard/${personaSlug}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isDashboard
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </div>
            </Link>
            <Link
              href={`/demo/${personaSlug}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !isDashboard
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat
              </div>
            </Link>
          </nav>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">{currentPersona.name}</p>
            <p className="text-xs text-muted-foreground">{currentPersona.role}</p>
          </div>
          <Avatar name={currentPersona.name} id={currentPersona.id} size={40} />
        </div>
      </div>
    </header>
  );
}
