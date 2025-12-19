/**
 * API Route: Fetch Tickets from Zoho Desk
 * Provides ticket data formatted for dashboard consumption
 * Uses Zoho Desk API with OAuth authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { ZohoDeskClient } from '@/lib/integrations/zoho-desk';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/tickets
 * Fetches tickets from Zoho Desk API
 * Query params: limit (default: 20)
 */
export async function GET(req: NextRequest) {
  try {
    // Get limit from query params
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    // Initialize Zoho Desk client with credentials from .env.local
    const zoho = new ZohoDeskClient({
      orgId: Number(process.env.ZOHO_ORG_ID) || 0,
      clientId: process.env.ZOHO_CLIENT_ID || '',
      clientSecret: process.env.ZOHO_CLIENT_SECRET || '',
      refreshToken: process.env.ZOHO_REFRESH_TOKEN || '',
    });

    // Check if Zoho credentials are configured
    if (!process.env.ZOHO_ORG_ID || !process.env.ZOHO_CLIENT_ID || !process.env.ZOHO_CLIENT_SECRET || !process.env.ZOHO_REFRESH_TOKEN) {
      // Return mock data if Zoho is not configured
      return NextResponse.json({
        success: true,
        tickets: getMockTickets(limit),
        source: 'mock',
        message: 'Using mock data - Zoho credentials not configured'
      });
    }

    // Fetch tickets from Zoho Desk
    interface ZohoTicket {
      id: string;
      ticketNumber: string;
      subject?: string;
      priority?: string;
      status?: string;
      assignee?: { name?: string };
      contact?: { name?: string; email?: string };
      createdTime?: string;
      modifiedTime?: string;
      dueDate?: string;
      category?: string;
      channel?: string;
    }

    const response = await zoho.request<{ data: ZohoTicket[] }>(
      `/api/v1/tickets?limit=${limit}&sortBy=-createdTime`
    );

    // Transform Zoho tickets to our format
    const tickets = response.data.map((ticket: ZohoTicket) => ({
      id: ticket.id,
      ticketNumber: ticket.ticketNumber,
      summary: ticket.subject || 'No subject',
      priority: ticket.priority || 'Medium',
      status: ticket.status || 'Open',
      assignedAgent: ticket.assignee?.name || null,
      reporter: ticket.contact?.name || 'Unknown',
      reporterEmail: ticket.contact?.email || '',
      createdDate: ticket.createdTime,
      lastUpdated: ticket.modifiedTime,
      category: ticket.category || null,
      channel: ticket.channel || 'Web',
      aiProcessed: false,
      aiClassification: null,
    }));

    return NextResponse.json({
      success: true,
      tickets,
      source: 'zoho-desk',
      count: tickets.length
    });

  } catch (error: unknown) {
    console.error('[API /api/tickets] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    // Return mock data on error instead of failing completely
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    return NextResponse.json({
      success: true,
      tickets: getMockTickets(limit),
      source: 'mock',
      message: `Zoho API error: ${errorMessage}. Using mock data.`,
      error: errorMessage
    });
  }
}

/**
 * Generate mock tickets for demo/fallback purposes
 */
function getMockTickets(limit: number) {
  const mockTickets = [
    {
      id: '1',
      ticketNumber: 'TICK-001',
      summary: 'Login not working after password reset',
      priority: 'High' as const,
      status: 'Open',
      assignedAgent: 'Sarah Johnson',
      reporter: 'John Smith',
      reporterEmail: 'john.smith@example.com',
      createdDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      category: 'Authentication',
      channel: 'Email',
      aiProcessed: true,
      aiClassification: 'Technical Issue - High Priority'
    },
    {
      id: '2',
      ticketNumber: 'TICK-002',
      summary: 'Feature request: Export to PDF',
      priority: 'Low' as const,
      status: 'In Progress',
      assignedAgent: 'Mike Chen',
      reporter: 'Emma Wilson',
      reporterEmail: 'emma.w@company.com',
      createdDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      lastUpdated: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      category: 'Feature Request',
      channel: 'Web',
      aiProcessed: true,
      aiClassification: 'Enhancement - Low Priority'
    },
    {
      id: '3',
      ticketNumber: 'TICK-003',
      summary: 'Dashboard loading slowly for large datasets',
      priority: 'Medium' as const,
      status: 'Open',
      assignedAgent: 'Sarah Johnson',
      reporter: 'David Martinez',
      reporterEmail: 'david.m@enterprise.com',
      createdDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      lastUpdated: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      category: 'Performance',
      channel: 'Phone',
      aiProcessed: true,
      aiClassification: 'Performance Issue - Medium Priority'
    },
    {
      id: '4',
      ticketNumber: 'TICK-004',
      summary: 'API integration failing with 500 error',
      priority: 'High' as const,
      status: 'Escalated',
      assignedAgent: 'Alex Thompson',
      reporter: 'Lisa Anderson',
      reporterEmail: 'lisa.anderson@techcorp.com',
      createdDate: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      lastUpdated: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      category: 'API',
      channel: 'Email',
      aiProcessed: true,
      aiClassification: 'Critical Technical Issue'
    },
    {
      id: '5',
      ticketNumber: 'TICK-005',
      summary: 'Need help configuring SSO',
      priority: 'Medium' as const,
      status: 'Open',
      assignedAgent: null,
      reporter: 'Robert Lee',
      reporterEmail: 'robert.lee@startup.io',
      createdDate: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      lastUpdated: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      category: 'Configuration',
      channel: 'Chat',
      aiProcessed: false,
      aiClassification: null
    }
  ];

  return mockTickets.slice(0, Math.min(limit, mockTickets.length));
}
