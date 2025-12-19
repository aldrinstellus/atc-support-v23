'use client';

import { TicketListDemo } from '@/components/tickets/TicketListDemo';
import { useQuickAction } from '@/contexts/QuickActionContext';

export function LiveTicketListWidget() {
  const { setQuickActionQuery } = useQuickAction();

  const handleTicketClick = (ticketNumber: string) => {
    console.log('[LiveTicketListWidget] Ticket clicked:', ticketNumber);
    const query = `Show me details for ticket #${ticketNumber}`;
    console.log('[LiveTicketListWidget] Setting query:', query);
    setQuickActionQuery(query);
  };

  return (
    <div className="my-4 overflow-x-auto">
      <TicketListDemo
        limit={20}
        autoRefresh={false}
        onTicketClick={handleTicketClick}
      />
    </div>
  );
}
