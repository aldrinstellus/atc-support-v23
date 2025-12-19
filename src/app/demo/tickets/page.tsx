import { TicketListDemo } from '@/components/tickets/TicketListDemo';

export default function TicketsDemoPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            CS Manager Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Real-time ticket management powered by Zoho Desk
          </p>
        </div>

        {/* Ticket List */}
        <TicketListDemo limit={20} autoRefresh={false} />

        {/* Demo Info */}
        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h3 className="font-semibold text-blue-900 mb-2">✨ Demo Features</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Live Data:</strong> Fetching real tickets from Zoho Desk API</li>
            <li>• <strong>Auto-refresh:</strong> Click &quot;Refresh&quot; to get latest tickets</li>
            <li>• <strong>All Fields:</strong> Ticket #, Summary, Priority, Status, Assigned Agent, Reporter, Created Date</li>
            <li>• <strong>AI Integration:</strong> Tickets #106 and #107 are from the email test (AI automation ready)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
