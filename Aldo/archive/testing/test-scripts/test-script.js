// Automated test script for all 78 persona queries
const queries = {
  "c-level": [
    // Quick Actions (7)
    "Show me all my current tickets from Zoho Desk",
    "Show me SLA performance dashboard for this quarter",
    "Which customers are at highest risk of churning?",
    "Generate comprehensive executive dashboard summary",
    "Prepare metrics for board meeting presentation",
    "Show me status of top 20 high-value customer accounts",
    "Show me progress on strategic initiatives and OKRs",
    // Demo Scenarios (12)
    "Show me SLA performance for Q4 2025",
    "Which customers are at risk of churning?",
    "Executive dashboard summary for board meeting",
    "Revenue impact analysis from support tickets",
    "Show me customer satisfaction scores",
    "Top 10 accounts by revenue with health scores",
    "Escalation trends over last 3 months",
    "Customer retention metrics and forecasts",
    "Show me resource allocation efficiency",
    "Team capacity vs demand projections",
    "Integration ROI analysis",
    "Competitive positioning from customer feedback"
  ],
  "cs-manager": [
    // Quick Actions (9)
    "Show me all my current tickets from Zoho Desk",
    "Show me all high-priority customers needing attention",
    "Show me agent performance metrics for this week",
    "Who is my most slacking agent this week?",
    "Who is my top performing agent this week?",
    "Show me agent workload distribution and recommend reassignments",
    "Show me tickets at risk of SLA breach",
    "Show me team capacity and forecast for next week",
    "Show me all escalated tickets requiring manager attention",
    // Demo Scenarios (12)
    "Show me agent performance for this week",
    "Who is my most slacking agent?",
    "Who is my top performing agent?",
    "Compare agent metrics: resolution time vs customer satisfaction",
    "Which customers need immediate attention?",
    "Show me all high-priority tickets by customer",
    "Customers with multiple open tickets",
    "Accounts with declining satisfaction scores",
    "Recommend ticket reassignments for workload balance",
    "Show me SLA breach risks for next 24 hours",
    "Team capacity planning for Q1 2026",
    "Escalation trends and root cause analysis"
  ],
  "support-agent": [
    // Quick Actions (7)
    "Show me all my current tickets from Zoho Desk",
    "Show me all my currently open support tickets",
    "How many tickets did AI resolve for me today?",
    "Show me tickets escalated to me that need my attention",
    "Show me my scheduled customer meetings for today",
    "Show me status of Jira issues linked to my tickets",
    "Show me my urgent tickets and critical alerts",
    // Demo Scenarios (12)
    "Show me my tickets received in last 24 hours",
    "How many tickets did AI resolve for me?",
    "What are my urgent tickets right now?",
    "My ticket resolution rate this week",
    "Prep notes for my 2 PM customer call",
    "Show me conversation history with TechCorp Solutions",
    "Draft response for ticket DESK-1002",
    "Schedule follow-up meeting with CloudNine Technologies",
    "Link ticket DESK-1002 to Jira issue PROJ-302",
    "Show me tickets I can close today",
    "AI-suggested canned responses for common issues",
    "My performance metrics vs team average"
  ],
  "csm": [
    // Quick Actions (7)
    "Show me health scores for my assigned clients",
    "Show product adoption metrics and feature usage across clients",
    "Show upcoming renewals and contract status",
    "Show recent client feedback and NPS scores",
    "Identify upsell and cross-sell opportunities",
    "Show product roadmap and upcoming features",
    "Schedule and manage client business reviews",
    // Demo Scenarios (12)
    "Show me health scores for all my assigned clients",
    "Which clients have declining product adoption?",
    "Show me clients at risk of churn this quarter",
    "Compare client engagement trends month-over-month",
    "Show upcoming renewals in next 90 days",
    "Identify expansion opportunities across my portfolio",
    "Show clients ready for premium tier upgrade",
    "Analyze revenue retention and expansion metrics",
    "Show recent NPS survey results by client",
    "Which clients need business review meetings?",
    "Show product roadmap items most requested by clients",
    "Schedule quarterly business reviews for top accounts"
  ]
};

console.log(JSON.stringify(queries, null, 2));
