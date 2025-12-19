import { AgentTicketQueue } from '@/components/dashboard/AgentTicketQueue';
import { AgentQuickStats } from '@/components/dashboard/AgentQuickStats';

export default function AgentDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Agent Dashboard</h1>
          <p className="text-muted-foreground">
            Review AI-generated draft responses and manage your ticket queue
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <AgentQuickStats />
          <AgentTicketQueue />
        </div>
      </div>
    </div>
  );
}
