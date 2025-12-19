/**
 * AUTOMATED PERSONA QUERY TEST SUITE
 *
 * Tests all 78 queries across 4 personas using Chrome DevTools Protocol
 * Generates comprehensive test report with screenshots and error logs
 */

const TEST_QUERIES = {
  'c-level': {
    personaName: 'C-Level Executive (Sarah Chen)',
    url: 'http://localhost:3016/demo/c-level',
    quickActions: [
      { id: 'QA1', query: 'Show me all my current tickets from Zoho Desk', expectedWidget: 'Ticket List Widget' },
      { id: 'QA2', query: 'Show me SLA performance dashboard for this quarter', expectedWidget: 'SLA Performance Chart' },
      { id: 'QA3', query: 'Which customers are at highest risk of churning?', expectedWidget: 'Customer Risk List' },
      { id: 'QA4', query: 'Generate comprehensive executive dashboard summary', expectedWidget: 'Executive Summary Widget' },
      { id: 'QA5', query: 'Prepare metrics for board meeting presentation', expectedWidget: 'Board Metrics Dashboard' },
      { id: 'QA6', query: 'Show me status of top 20 high-value customer accounts', expectedWidget: 'Customer List Widget' },
      { id: 'QA7', query: 'Show me progress on strategic initiatives and OKRs', expectedWidget: 'Strategic Dashboard' }
    ],
    demoScenarios: [
      { id: 'DS1', query: 'Show me SLA performance for Q4 2025', expectedWidget: 'SLA Performance Chart', category: 'Executive Overview' },
      { id: 'DS2', query: 'Which customers are at risk of churning?', expectedWidget: 'Customer Risk List', category: 'Executive Overview' },
      { id: 'DS3', query: 'Executive dashboard summary for board meeting', expectedWidget: 'Executive Summary Widget', category: 'Executive Overview' },
      { id: 'DS4', query: 'Revenue impact analysis from support tickets', expectedWidget: 'Revenue Impact Dashboard', category: 'Executive Overview' },
      { id: 'DS5', query: 'Show me customer satisfaction scores', expectedWidget: 'Customer Satisfaction Widget', category: 'Customer Health' },
      { id: 'DS6', query: 'Top 10 accounts by revenue with health scores', expectedWidget: 'Customer Health Dashboard', category: 'Customer Health' },
      { id: 'DS7', query: 'Escalation trends over last 3 months', expectedWidget: 'Escalation Trend Chart', category: 'Customer Health' },
      { id: 'DS8', query: 'Customer retention metrics and forecasts', expectedWidget: 'Retention Metrics Widget', category: 'Customer Health' },
      { id: 'DS9', query: 'Show me resource allocation efficiency', expectedWidget: 'Resource Allocation Chart', category: 'Strategic Planning' },
      { id: 'DS10', query: 'Team capacity vs demand projections', expectedWidget: 'Capacity Planning Widget', category: 'Strategic Planning' },
      { id: 'DS11', query: 'Integration ROI analysis', expectedWidget: 'ROI Analysis Dashboard', category: 'Strategic Planning' },
      { id: 'DS12', query: 'Competitive positioning from customer feedback', expectedWidget: 'Competitive Analysis Widget', category: 'Strategic Planning' }
    ]
  },
  'cs-manager': {
    personaName: 'CS Manager (Michael Torres)',
    url: 'http://localhost:3016/demo/cs-manager',
    quickActions: [
      { id: 'QA1', query: 'Show me all my current tickets from Zoho Desk', expectedWidget: 'Ticket List Widget' },
      { id: 'QA2', query: 'Show me all high-priority customers needing attention', expectedWidget: 'Customer Risk List' },
      { id: 'QA3', query: 'Show me agent performance metrics for this week', expectedWidget: 'Agent Performance Stats' },
      { id: 'QA4', query: 'Who is my most slacking agent this week?', expectedWidget: 'Agent Performance Comparison' },
      { id: 'QA5', query: 'Who is my top performing agent this week?', expectedWidget: 'Agent Performance Stats' },
      { id: 'QA6', query: 'Show me agent workload distribution and recommend reassignments', expectedWidget: 'Team Workload Dashboard' },
      { id: 'QA7', query: 'Show me tickets at risk of SLA breach', expectedWidget: 'SLA Alert List' },
      { id: 'QA8', query: 'Show me team capacity and forecast for next week', expectedWidget: 'Capacity Forecast Chart' },
      { id: 'QA9', query: 'Show me all escalated tickets requiring manager attention', expectedWidget: 'Escalated Ticket List' }
    ],
    demoScenarios: [
      { id: 'DS1', query: 'Show me agent performance for this week', expectedWidget: 'Agent Performance Stats', category: 'Team Performance' },
      { id: 'DS2', query: 'Who is my most slacking agent?', expectedWidget: 'Agent Performance Comparison', category: 'Team Performance' },
      { id: 'DS3', query: 'Who is my top performing agent?', expectedWidget: 'Agent Performance Stats', category: 'Team Performance' },
      { id: 'DS4', query: 'Compare agent metrics: resolution time vs customer satisfaction', expectedWidget: 'Agent Comparison Chart', category: 'Team Performance' },
      { id: 'DS5', query: 'Which customers need immediate attention?', expectedWidget: 'Priority Customer List', category: 'Customer Management' },
      { id: 'DS6', query: 'Show me all high-priority tickets by customer', expectedWidget: 'Ticket List Widget (filtered)', category: 'Customer Management' },
      { id: 'DS7', query: 'Customers with multiple open tickets', expectedWidget: 'Customer Ticket Count Widget', category: 'Customer Management' },
      { id: 'DS8', query: 'Accounts with declining satisfaction scores', expectedWidget: 'Customer Satisfaction Trend', category: 'Customer Management' },
      { id: 'DS9', query: 'Recommend ticket reassignments for workload balance', expectedWidget: 'Workload Rebalancing Widget', category: 'Operations' },
      { id: 'DS10', query: 'Show me SLA breach risks for next 24 hours', expectedWidget: 'SLA Risk Dashboard', category: 'Operations' },
      { id: 'DS11', query: 'Team capacity planning for Q1 2026', expectedWidget: 'Capacity Planning Widget', category: 'Operations' },
      { id: 'DS12', query: 'Escalation trends and root cause analysis', expectedWidget: 'Escalation Analysis Dashboard', category: 'Operations' }
    ]
  },
  'support-agent': {
    personaName: 'Support Agent (Christopher Hayes)',
    url: 'http://localhost:3016/demo/support-agent',
    quickActions: [
      { id: 'QA1', query: 'Show me all my current tickets from Zoho Desk', expectedWidget: 'Ticket List Widget' },
      { id: 'QA2', query: 'Show me all my currently open support tickets', expectedWidget: 'Ticket List Widget (filtered)' },
      { id: 'QA3', query: 'How many tickets did AI resolve for me today?', expectedWidget: 'AI Resolution Stats Widget' },
      { id: 'QA4', query: 'Show me tickets escalated to me that need my attention', expectedWidget: 'Escalated Ticket List' },
      { id: 'QA5', query: 'Show me my scheduled customer meetings for today', expectedWidget: 'Meeting Scheduler' },
      { id: 'QA6', query: 'Show me status of Jira issues linked to my tickets', expectedWidget: 'Jira Integration Status' },
      { id: 'QA7', query: 'Show me my urgent tickets and critical alerts', expectedWidget: 'Priority Alert List' }
    ],
    demoScenarios: [
      { id: 'DS1', query: 'Show me my tickets received in last 24 hours', expectedWidget: 'Ticket List Widget (filtered)', category: 'My Workload' },
      { id: 'DS2', query: 'How many tickets did AI resolve for me?', expectedWidget: 'AI Resolution Stats', category: 'My Workload' },
      { id: 'DS3', query: 'What are my urgent tickets right now?', expectedWidget: 'Priority Ticket List', category: 'My Workload' },
      { id: 'DS4', query: 'My ticket resolution rate this week', expectedWidget: 'Agent Performance Stats', category: 'My Workload' },
      { id: 'DS5', query: 'Prep notes for my 2 PM customer call', expectedWidget: 'Call Prep Notes Widget', category: 'Customer Interactions' },
      { id: 'DS6', query: 'Show me conversation history with TechCorp Solutions', expectedWidget: 'Customer Conversation History', category: 'Customer Interactions' },
      { id: 'DS7', query: 'Draft response for ticket DESK-1002', expectedWidget: 'Response Composer Widget', category: 'Customer Interactions' },
      { id: 'DS8', query: 'Schedule follow-up meeting with CloudNine Technologies', expectedWidget: 'Meeting Scheduler', category: 'Customer Interactions' },
      { id: 'DS9', query: 'Link ticket DESK-1002 to Jira issue PROJ-302', expectedWidget: 'Jira Link Confirmation', category: 'Productivity' },
      { id: 'DS10', query: 'Show me tickets I can close today', expectedWidget: 'Closeable Tickets List', category: 'Productivity' },
      { id: 'DS11', query: 'AI-suggested canned responses for common issues', expectedWidget: 'Canned Response Library', category: 'Productivity' },
      { id: 'DS12', query: 'My performance metrics vs team average', expectedWidget: 'Agent Performance Comparison', category: 'Productivity' }
    ]
  },
  'csm': {
    personaName: 'CSM (Jordan Taylor)',
    url: 'http://localhost:3016/demo/csm',
    quickActions: [
      { id: 'QA1', query: 'Show me health scores for my assigned clients', expectedWidget: 'Client Health Dashboard' },
      { id: 'QA2', query: 'Show product adoption metrics and feature usage across clients', expectedWidget: 'Adoption Metrics Widget' },
      { id: 'QA3', query: 'Show upcoming renewals and contract status', expectedWidget: 'Renewal Pipeline Widget' },
      { id: 'QA4', query: 'Show recent client feedback and NPS scores', expectedWidget: 'NPS Dashboard' },
      { id: 'QA5', query: 'Identify upsell and cross-sell opportunities', expectedWidget: 'Upsell Opportunities List' },
      { id: 'QA6', query: 'Show product roadmap and upcoming features', expectedWidget: 'Roadmap Timeline' },
      { id: 'QA7', query: 'Schedule and manage client business reviews', expectedWidget: 'Meeting Scheduler' }
    ],
    demoScenarios: [
      { id: 'DS1', query: 'Show me health scores for all my assigned clients', expectedWidget: 'Client Health Dashboard', category: 'Client Success' },
      { id: 'DS2', query: 'Which clients have declining product adoption?', expectedWidget: 'Adoption Trend Widget', category: 'Client Success' },
      { id: 'DS3', query: 'Show me clients at risk of churn this quarter', expectedWidget: 'Churn Risk Dashboard', category: 'Client Success' },
      { id: 'DS4', query: 'Compare client engagement trends month-over-month', expectedWidget: 'Engagement Trend Chart', category: 'Client Success' },
      { id: 'DS5', query: 'Show upcoming renewals in next 90 days', expectedWidget: 'Renewal Pipeline Widget', category: 'Revenue Growth' },
      { id: 'DS6', query: 'Identify expansion opportunities across my portfolio', expectedWidget: 'Expansion Opportunity List', category: 'Revenue Growth' },
      { id: 'DS7', query: 'Show clients ready for premium tier upgrade', expectedWidget: 'Upgrade Opportunity Widget', category: 'Revenue Growth' },
      { id: 'DS8', query: 'Analyze revenue retention and expansion metrics', expectedWidget: 'Revenue Metrics Dashboard', category: 'Revenue Growth' },
      { id: 'DS9', query: 'Show recent NPS survey results by client', expectedWidget: 'NPS Dashboard', category: 'Client Engagement' },
      { id: 'DS10', query: 'Which clients need business review meetings?', expectedWidget: 'QBR Schedule Widget', category: 'Client Engagement' },
      { id: 'DS11', query: 'Show product roadmap items most requested by clients', expectedWidget: 'Feature Request Ranking', category: 'Client Engagement' },
      { id: 'DS12', query: 'Schedule quarterly business reviews for top accounts', expectedWidget: 'Meeting Scheduler', category: 'Client Engagement' }
    ]
  }
};

console.log('TEST SUITE CONFIGURATION LOADED');
console.log('Total Personas:', Object.keys(TEST_QUERIES).length);
console.log('Total Queries:', Object.values(TEST_QUERIES).reduce((acc, p) => acc + p.quickActions.length + p.demoScenarios.length, 0));
