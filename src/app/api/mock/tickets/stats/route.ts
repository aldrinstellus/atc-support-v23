// GET /api/mock/tickets/stats - Get ticket statistics

import { NextResponse } from 'next/server';
import { getMockDatabase } from '@/data/mock/database';
import type { TicketStatus, TicketPriority, TicketChannel, CompanyTier } from '@/types/mock';

export async function GET() {
  const db = getMockDatabase();

  const statuses: TicketStatus[] = ['open', 'in-progress', 'pending-customer', 'resolved', 'closed'];
  const priorities: TicketPriority[] = ['critical', 'high', 'medium', 'low'];
  const channels: TicketChannel[] = ['email', 'chat', 'phone', 'web'];
  const tiers: CompanyTier[] = ['enterprise', 'smb', 'startup'];

  // Count by status
  const byStatus: Record<TicketStatus, number> = {} as any;
  for (const status of statuses) {
    byStatus[status] = db.tickets.filter(t => t.status === status).length;
  }

  // Count by priority
  const byPriority: Record<TicketPriority, number> = {} as any;
  for (const priority of priorities) {
    byPriority[priority] = db.tickets.filter(t => t.priority === priority).length;
  }

  // Count by channel
  const byChannel: Record<TicketChannel, number> = {} as any;
  for (const channel of channels) {
    byChannel[channel] = db.tickets.filter(t => t.channel === channel).length;
  }

  // Count by tier
  const byTier: Record<CompanyTier, number> = {} as any;
  for (const tier of tiers) {
    byTier[tier] = db.tickets.filter(t => t.company.tier === tier).length;
  }

  // Active tickets (not resolved/closed)
  const activeTickets = db.tickets.filter(t => !['resolved', 'closed'].includes(t.status));

  // SLA metrics
  const slaBreached = activeTickets.filter(t => t.firstResponseBreached || t.resolutionBreached);
  const slaAtRisk = activeTickets.filter(t => t.slaTimeRemaining !== null && t.slaTimeRemaining <= 60 && t.slaTimeRemaining > 0);

  // AI stats
  const aiSuggested = db.tickets.filter(t => t.aiSuggested);
  const avgAiConfidence = aiSuggested.length > 0
    ? Math.round(aiSuggested.reduce((sum, t) => sum + (t.aiConfidence || 0), 0) / aiSuggested.length)
    : 0;

  // Sentiment breakdown
  const sentimentBreakdown = {
    positive: db.tickets.filter(t => t.sentiment === 'positive').length,
    neutral: db.tickets.filter(t => t.sentiment === 'neutral').length,
    negative: db.tickets.filter(t => t.sentiment === 'negative').length,
    frustrated: db.tickets.filter(t => t.sentiment === 'frustrated').length,
  };

  // Today's metrics
  const today = new Date().toDateString();
  const createdToday = db.tickets.filter(t => new Date(t.createdAt).toDateString() === today);
  const resolvedToday = db.tickets.filter(t => t.resolvedAt && new Date(t.resolvedAt).toDateString() === today);

  return NextResponse.json({
    success: true,
    data: {
      total: db.tickets.length,
      active: activeTickets.length,
      byStatus,
      byPriority,
      byChannel,
      byTier,
      sla: {
        breached: slaBreached.length,
        atRisk: slaAtRisk.length,
        compliance: activeTickets.length > 0
          ? Math.round(((activeTickets.length - slaBreached.length) / activeTickets.length) * 100)
          : 100,
      },
      ai: {
        totalSuggested: aiSuggested.length,
        avgConfidence: avgAiConfidence,
        suggestionRate: db.tickets.length > 0
          ? Math.round((aiSuggested.length / db.tickets.length) * 100)
          : 0,
      },
      sentimentBreakdown,
      today: {
        created: createdToday.length,
        resolved: resolvedToday.length,
      },
    },
  });
}
