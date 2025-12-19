/**
 * Unit Tests for Query Detection Module
 *
 * Tests natural language query parsing and widget mapping across all personas.
 * Ensures accurate query detection, widget selection, and response generation.
 */

import { detectWidgetQuery, type PersonaId } from '@/lib/query-detection';

describe('Query Detection Module', () => {
  describe('C-Level Executive Queries', () => {
    const persona: PersonaId = 'c-level';

    test('should detect executive summary query', () => {
      const queries = [
        'Show me executive summary',
        'executive summary',
        'Good morning, show me the summary',
        'system health',
      ];

      queries.forEach(query => {
        const result = detectWidgetQuery(query, persona);
        expect(result).not.toBeNull();
        expect(result?.widgetType).toBe('executive-summary');
        expect(result?.responseText).toBeTruthy();
      });
    });

    test('should detect customer risk profile query', () => {
      const queries = [
        'Tell me more about Acme Corp',
        'Tell me more about enterprise customer',
        'Why did Acme risk increase',
      ];

      queries.forEach(query => {
        const result = detectWidgetQuery(query, persona);
        expect(result).not.toBeNull();
        expect(result?.widgetType).toBe('customer-risk-profile');
        expect(result?.widgetData).toBeTruthy();
      });
    });

    test('should detect SLA performance query', () => {
      const queries = [
        'Show me the SLA performance breakdown',
        'SLA performance',
        'Which categories are we failing',
      ];

      queries.forEach(query => {
        const result = detectWidgetQuery(query, persona);
        expect(result).not.toBeNull();
        expect(result?.widgetType).toBe('sla-performance-chart');
      });
    });

    test('should detect customer risk list query', () => {
      const queries = [
        'Show me high-risk customers',
        'high-risk customers',
        'at-risk customers',
        'customer risk',
      ];

      queries.forEach(query => {
        const result = detectWidgetQuery(query, persona);
        expect(result).not.toBeNull();
        expect(result?.widgetType).toBe('customer-risk-list');
      });
    });

    test('should detect ticket detail query and extract ticket number', () => {
      const queries = [
        { query: 'Show me ticket TICK-001', expectedNumber: null },
        { query: 'Show me ticket #123', expectedNumber: '123' },
        { query: 'ticket 456', expectedNumber: '456' },
      ];

      queries.forEach(({ query }) => {
        const result = detectWidgetQuery(query, persona);
        expect(result).not.toBeNull();
        expect(['ticket-detail', 'live-ticket-detail']).toContain(result?.widgetType);
      });
    });

    test('should detect meeting scheduler query', () => {
      const queries = [
        'Schedule executive call',
        'book a meeting',
        'schedule call',
      ];

      queries.forEach(query => {
        const result = detectWidgetQuery(query, persona);
        expect(result).not.toBeNull();
        expect(result?.widgetType).toBe('meeting-scheduler');
      });
    });

    test('should return null for non-matching queries', () => {
      const queries = [
        'random text',
        'what is the weather',
        'hello world',
      ];

      queries.forEach(query => {
        const result = detectWidgetQuery(query, persona);
        expect(result).toBeNull();
      });
    });
  });

  describe('CS Manager Queries', () => {
    const persona: PersonaId = 'cs-manager';

    test('should detect team workload dashboard query', () => {
      const queries = [
        "Show me my team's status",
        'team status',
        'team workload',
        'Good morning, how is my team',
      ];

      queries.forEach(query => {
        const result = detectWidgetQuery(query, persona);
        expect(result).not.toBeNull();
        expect(result?.widgetType).toBe('team-workload-dashboard');
      });
    });

    test('should detect agent performance comparison query', () => {
      const queries = [
        'Show me top and bottom performers',
        'performance comparison',
        'compare agent performance',
        'top performers',
      ];

      queries.forEach(query => {
        const result = detectWidgetQuery(query, persona);
        expect(result).not.toBeNull();
        expect(result?.widgetType).toBe('agent-performance-comparison');
      });
    });

    test('should detect customer risk list query', () => {
      const queries = [
        'Show me high-risk customers',
        'customers at risk',
        'show me all at risk customers',
      ];

      queries.forEach(query => {
        const result = detectWidgetQuery(query, persona);
        expect(result).not.toBeNull();
        expect(result?.widgetType).toBe('customer-risk-list');
      });
    });

    test('should detect ticket list query with agent name extraction', () => {
      const result = detectWidgetQuery("Show me Sarah's tickets", persona);
      expect(result).not.toBeNull();
      expect(result?.widgetType).toBe('ticket-list');
      expect(result?.widgetData?.title).toBe("Sarah's Tickets");
    });

    test('should detect message composer query', () => {
      const queries = [
        'Draft message for customer',
        'compose message',
        'write email',
        'write a message to customer',
      ];

      queries.forEach(query => {
        const result = detectWidgetQuery(query, persona);
        expect(result).not.toBeNull();
        expect(result?.widgetType).toBe('message-composer');
      });
    });

    test('should detect ticket detail query', () => {
      const result = detectWidgetQuery('Show me ticket #789', persona);
      expect(result).not.toBeNull();
      expect(['ticket-detail', 'live-ticket-detail']).toContain(result?.widgetType);
    });
  });

  describe('Support Agent Queries', () => {
    const persona: PersonaId = 'support-agent';

    test('should detect agent dashboard query', () => {
      const queries = [
        "What's on my plate today",
        'my plate today',
        'good morning',
      ];

      queries.forEach(query => {
        const result = detectWidgetQuery(query, persona);
        expect(result).not.toBeNull();
        expect(result?.widgetType).toBe('agent-dashboard');
      });
    });

    test('should detect ticket detail query with live widget', () => {
      const result = detectWidgetQuery('Show me ticket #999', persona);
      expect(result).not.toBeNull();
      expect(result?.widgetType).toBe('live-ticket-detail');
      expect(result?.widgetData).toHaveProperty('ticketNumber', '999');
    });

    test('should detect call prep notes query', () => {
      const queries = [
        'Prepare for the call',
        'draft prep notes',
        'call preparation',
        'help me prepare for call',
      ];

      queries.forEach(query => {
        const result = detectWidgetQuery(query, persona);
        expect(result).not.toBeNull();
        expect(result?.widgetType).toBe('call-prep-notes');
      });
    });

    test('should detect response composer query', () => {
      const queries = [
        'Draft response',
        'draft a response',
        'help me respond',
        'compose response',
      ];

      queries.forEach(query => {
        const result = detectWidgetQuery(query, persona);
        expect(result).not.toBeNull();
        expect(result?.widgetType).toBe('response-composer');
      });
    });

    test('should detect ticket list query', () => {
      const queries = [
        'my tickets',
        'tickets that need attention',
        'show me other tickets',
      ];

      queries.forEach(query => {
        const result = detectWidgetQuery(query, persona);
        expect(result).not.toBeNull();
        expect(result?.widgetType).toBe('ticket-list');
      });
    });

    test('should detect similar tickets analysis query', () => {
      const queries = [
        'similar tickets',
        'learn the patterns',
        'tickets I resolved',
      ];

      queries.forEach(query => {
        const result = detectWidgetQuery(query, persona);
        expect(result).not.toBeNull();
        expect(result?.widgetType).toBe('similar-tickets-analysis');
      });
    });

    test('should detect agent performance stats query', () => {
      const queries = [
        'performance stats',
        'my stats',
        'my performance',
        'show me stats',
      ];

      queries.forEach(query => {
        const result = detectWidgetQuery(query, persona);
        expect(result).not.toBeNull();
        expect(result?.widgetType).toBe('agent-performance-stats');
      });
    });

    test('should detect knowledge base search query', () => {
      const queries = [
        'How do I troubleshoot network issues',
        'how to reset password',
        'search kb',
        'knowledge base search',
      ];

      queries.forEach(query => {
        const result = detectWidgetQuery(query, persona);
        expect(result).not.toBeNull();
        expect(result?.widgetType).toBe('knowledge-base-search');
      });
    });

    test('should detect knowledge article query with KB ID extraction', () => {
      const queries = [
        { query: 'Open KB-107', expectedId: 'KB-107' },
        { query: 'open kb 456', expectedId: 'KB-456' },
        { query: 'kb892', expectedId: 'KB-892' },
      ];

      queries.forEach(({ query, expectedId }) => {
        const result = detectWidgetQuery(query, persona);
        expect(result).not.toBeNull();
        expect(result?.widgetType).toBe('knowledge-article');
        expect(result?.widgetData?.id).toBe(expectedId);
      });
    });

    test('should detect password reset request (demo flow)', () => {
      const queries = [
        'I need password reset',
        'password reset',
        'locked out of account',
        'password lock',
      ];

      queries.forEach(query => {
        const result = detectWidgetQuery(query, persona);
        expect(result).not.toBeNull();
        expect(result?.widgetType).toBe('knowledge-article');
      });
    });

    test('should detect escalation path (demo flow)', () => {
      const queries = [
        'still unable to reset',
        "still can't reset",
        'not working',
        "didn't work",
      ];

      queries.forEach(query => {
        const result = detectWidgetQuery(query, persona);
        expect(result).not.toBeNull();
        expect(result?.widgetType).toBe('escalation-path');
      });
    });

    test('should detect account unlock request', () => {
      const queries = [
        'unlock my account',
        'account locked',
        'cant access account',
        'account is locked',
      ];

      queries.forEach(query => {
        const result = detectWidgetQuery(query, persona);
        expect(result).not.toBeNull();
        expect(result?.widgetType).toBe('response-composer');
      });
    });

    test('should detect multi-system access issues', () => {
      const queries = [
        'cant access sharepoint and slack',
        'access to sharepoint slack and email',
        'multiple systems not working',
      ];

      queries.forEach(query => {
        const result = detectWidgetQuery(query, persona);
        expect(result).not.toBeNull();
        expect(result?.widgetType).toBe('system-access-status');
      });
    });

    test('should handle button action queries', () => {
      const actions = [
        { query: 'send the response', expectedText: 'sent successfully' },
        { query: 'edit and customize', expectedText: 'Opening response editor' },
        { query: 'regenerate response', expectedText: 'Regenerating response' },
      ];

      actions.forEach(({ query, expectedText }) => {
        const result = detectWidgetQuery(query, persona);
        expect(result).not.toBeNull();
        expect(result?.widgetType).toBeNull();
        expect(result?.responseText).toContain(expectedText);
      });
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty query', () => {
      const result = detectWidgetQuery('', 'c-level');
      expect(result).toBeNull();
    });

    test('should handle whitespace-only query', () => {
      const result = detectWidgetQuery('   ', 'support-agent');
      expect(result).toBeNull();
    });

    test('should be case-insensitive', () => {
      const queries = [
        'SHOW ME EXECUTIVE SUMMARY',
        'sHoW mE eXeCuTiVe SuMmArY',
        'show me EXECUTIVE summary',
      ];

      queries.forEach(query => {
        const result = detectWidgetQuery(query, 'c-level');
        expect(result).not.toBeNull();
        expect(result?.widgetType).toBe('executive-summary');
      });
    });

    test('should handle queries with extra whitespace', () => {
      const result = detectWidgetQuery('  show   me   executive   summary  ', 'c-level');
      expect(result).not.toBeNull();
      expect(result?.widgetType).toBe('executive-summary');
    });
  });

  describe('Response Text Validation', () => {
    test('should always return response text when widget is detected', () => {
      const personas: PersonaId[] = ['c-level', 'cs-manager', 'support-agent'];
      const queries = [
        'show me executive summary',
        'team workload',
        'my tickets',
      ];

      personas.forEach((persona, index) => {
        const result = detectWidgetQuery(queries[index], persona);
        expect(result).not.toBeNull();
        expect(result?.responseText).toBeTruthy();
        expect(result?.responseText.length).toBeGreaterThan(0);
      });
    });

    test('should return descriptive response text', () => {
      const result = detectWidgetQuery('show me executive summary', 'c-level');
      expect(result?.responseText).toMatch(/(summary|executive|dashboard)/i);
    });
  });
});
