'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { DashboardHeader } from './DashboardHeader';
import { DashboardWidgetGrid } from './DashboardWidgetGrid';
import { usePersona } from '@/hooks/use-persona';
import { getDashboardWidgets } from '@/config/dashboard-widgets';

export function PersonaDashboard() {
  const { currentPersona } = usePersona();
  const [greeting, setGreeting] = useState('Good day');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const widgets = getDashboardWidgets(currentPersona.id);
  const firstName = currentPersona.name.split(' ')[0];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container px-6 py-8">
        {/* Greeting Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-foreground">
              {greeting}, {firstName} 👋
            </h1>
            <p className="text-sm text-muted-foreground">{currentTime}</p>
          </div>
          <p className="text-muted-foreground">
            Here&apos;s your personalized dashboard to start your day
          </p>
        </motion.div>

        {/* Hero Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Open Items</p>
                <p className="text-3xl font-bold text-foreground">
                  {currentPersona.id === 'cor' ? '24' : currentPersona.id === 'program-manager' ? '18' : '12'}
                </p>
              </div>
              <div className={`h-12 w-12 rounded-full ${currentPersona.theme.badgeSolid}/10 flex items-center justify-center`}>
                <div className={`h-8 w-8 rounded-full ${currentPersona.theme.badgeSolid}`} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {currentPersona.id === 'cor' ? 'SLA Score' : currentPersona.id === 'program-manager' ? 'Team Capacity' : 'Tickets Resolved'}
                </p>
                <p className="text-3xl font-bold text-success">
                  {currentPersona.id === 'cor' ? '92%' : currentPersona.id === 'program-manager' ? '78%' : '23'}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-success" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {currentPersona.id === 'cor' ? 'At Risk' : currentPersona.id === 'program-manager' ? 'SLA Breach' : 'Urgent'}
                </p>
                <p className="text-3xl font-bold text-destructive">
                  {currentPersona.id === 'cor' ? '5' : currentPersona.id === 'program-manager' ? '3' : '2'}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-destructive" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Widgets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-foreground mb-6">Your Widgets</h2>
          <DashboardWidgetGrid widgets={widgets} />
        </motion.div>
      </main>
    </div>
  );
}
