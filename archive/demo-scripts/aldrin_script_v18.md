# V18 Unified Modes - Demo Script
**Version**: 18.0.0
**Date**: 2025-11-21
**Author**: Aldrin

---

## Demo Overview

V18 supports 3 modes with 10 personas. This script covers all queries and expected responses.

---

## ATC Mode (Enterprise Support)

### 1. C-Level Executive (Jennifer Anderson)
**URL**: http://localhost:3019/demo/atc-executive

| Query | Expected Response | Widget |
|-------|-------------------|--------|
| "Show me executive summary" | Board-ready metrics: ARR $18.2M, NRR 118%, Satisfaction 92% | executive-summary |
| "Which customers are at churn risk?" | 5 high-risk customers, $2.99M ARR at risk | customer-risk-list |
| "Show me SLA performance" | 89% compliance, breakdown by tier | sla-performance-chart |
| "Show board-level metrics" | Q4 financial KPIs for board presentation | executive-summary |
| "Show detailed analytics" | Ticket volume trends, response time charts | analytics-dashboard |

**Quick Actions**: SLA Performance (92%), Churn Risk (5), Executive Summary Q4, Board Metrics, High-Value Accounts (18)

---

### 2. CS Manager (David Miller)
**URL**: http://localhost:3019/demo/atc-manager

| Query | Expected Response | Widget |
|-------|-------------------|--------|
| "Show me team status" | 8 agents, 6 online, 47 tickets, workload distribution | team-workload-dashboard |
| "Who is top performing agent?" | Sarah Chen - 98% compliance, 4.8 CSAT | agent-performance-comparison |
| "Who is most slacking agent?" | David Park - 78% compliance, overloaded | team-workload-dashboard |
| "Show workload balance" | Rebalancing recommendations | team-workload-dashboard |
| "Show team budget" | $450K total, breakdown by category | program-health-dashboard |

**Quick Actions**: Priority Customers (12), Agent Performance, Most Slacking (!), Top Performing, Workload Balance, Team Budget ($450K)

---

### 3. Support Agent (Christopher Hayes)
**URL**: http://localhost:3019/demo/atc-support

| Query | Expected Response | Widget |
|-------|-------------------|--------|
| "Show me my tickets" | Personal ticket queue (18 open) | ticket-list |
| "Show ticket DESK-1001" | Ticket details, timeline, actions | live-ticket-detail |
| "Search knowledge base for password reset" | KB articles matching query | knowledge-base-search |
| "Draft response for angry customer" | AI-generated response template | response-composer |

**RBAC Protected** (Should NOT work):
| Query | Expected | Reason |
|-------|----------|--------|
| "Show me executive summary" | BLOCKED | Support agents don't see ARR data |
| "Which customers at churn risk?" | BLOCKED | Retention is CSM role |

**Quick Actions**: My Open Tickets (18), AI-Resolved Today (23), Escalated to Me (5), Jira Sync Status

---

### 4. Customer Success Manager (Jordan Taylor)
**URL**: http://localhost:3019/demo/atc-csm

| Query | Expected Response | Widget |
|-------|-------------------|--------|
| "Show customer health scores" | Health metrics for assigned customers | customer-risk-list |
| "Show upcoming renewals" | Renewal pipeline (12 due) | renewal-pipeline |
| "Show upsell opportunities" | $2.4M expansion pipeline | upsell-opportunities |
| "Which customers declining adoption?" | Product usage trends | product-adoption-metrics |

**Quick Actions**: Customer Health Scores, Product Adoption, Renewal Pipeline (12), Customer Feedback NPS, Upsell Opportunities ($2.4M)

---

## Government Mode (Contract Management)

### 5. COR - Contracting Officer's Representative (Alexa Johnson)
**URL**: http://localhost:3019/demo/cor

| Query | Expected Response | Widget |
|-------|-------------------|--------|
| "Show contract status" | Contract CON-2025-042, 87% performance | contract-performance-dashboard |
| "Show vendor performance" | Vendor compliance metrics | vendor-compliance-dashboard |
| "Show deliverables due this month" | Pending deliverable approvals (8) | deliverable-review-list |
| "Budget remaining for contracts" | Budget utilization 76% | contract-performance-dashboard |

**Terminology**: Uses "Compliance" and "Service Level" (NOT "SLA")

**Quick Actions**: Contract Status (Active), Vendor Performance (92%), Compliance Dashboard, Budget Tracking ($2.4M), Deliverables Review (8)

---

### 6. Program Manager (Jennifer Chen)
**URL**: http://localhost:3019/demo/program-manager

| Query | Expected Response | Widget |
|-------|-------------------|--------|
| "Show program overview" | 5 active projects, health status | program-health-dashboard |
| "Show milestone status" | 12 milestones, upcoming deadlines | milestone-tracker |
| "Show resource allocation" | Team capacity and utilization | resource-allocation-dashboard |
| "Show risk register" | 3 active risks, mitigation plans | risk-register |

**Quick Actions**: Program Overview (5 Projects), Milestone Tracker (12), Stakeholder Reports Q4, Resource Allocation, Risk Register (3)

---

### 7. Stakeholder Lead (Jessica Martinez)
**URL**: http://localhost:3019/demo/stakeholder-lead

| Query | Expected Response | Widget |
|-------|-------------------|--------|
| "Show impact analysis" | Change impact assessment | impact-analysis-dashboard |
| "Show change requests" | 7 pending change requests | change-request-list |
| "Show user feedback" | 24 feedback items, NPS trends | user-feedback-dashboard |
| "Show requirements tracking" | 89% requirements coverage | requirements-tracker |

**Quick Actions**: Impact Analysis (New), Change Requests (7), User Feedback (24), Requirements Tracking (89%), Communication Log

---

### 8. Service Team Lead (Herbert Roberts)
**URL**: http://localhost:3019/demo/service-team-lead

| Query | Expected Response | Widget |
|-------|-------------------|--------|
| "Show team workload" | 12 tasks across team | team-workload-dashboard |
| "Show code quality metrics" | 78% coverage, tech debt stats | code-quality-dashboard |
| "Show deployment status" | CI/CD pipeline status | deployment-pipeline-dashboard |
| "Show code reviews" | 8 pending reviews | code-review-list |

**Quick Actions**: Team Workload (12 Tasks), Code Quality (94%), Code Reviews (8), Deployment Status, Team Performance

---

### 9. Service Team Member (Molly Rivera)
**URL**: http://localhost:3019/demo/service-team-member

| Query | Expected Response | Widget |
|-------|-------------------|--------|
| "Show my assigned requests" | Personal task queue | agent-dashboard |
| "Show my performance this week" | Personal metrics | agent-performance-stats |
| "Search knowledge base" | Documentation search | knowledge-article |
| "Show my sprint tasks" | Current sprint assignments | task-kanban-board |

**IC-Focused** (No strategic data):
- Should NOT show program-level initiatives
- Should NOT show strategic planning data

**Quick Actions**: My Sprint Tasks (7), My Pull Requests (3), My Performance Stats, Knowledge Base Search, My Blockers (2)

---

## Project Mode (Agile Development)

### 10. Project Manager (Dale Thompson)
**URL**: http://localhost:3019/demo/project-manager

| Query | Expected Response | Widget |
|-------|-------------------|--------|
| "Show sprint burndown" | Sprint 24 progress chart | sprint-burndown-chart |
| "Show team velocity" | Velocity trends over sprints | team-velocity-dashboard |
| "Show resource capacity" | Team utilization 78% | resource-capacity-dashboard |
| "Show blockers" | 5 active blockers | blocker-resolution-list |

**Note**: Code quality queries moved to Service Team Lead

**Quick Actions**: Project Dashboard (Live), Sprint Planning (Sprint 12), Team Capacity (78%), Blocker Resolution (5), Client Meetings (3)

---

## Demo Flow Recommendations

### Executive Demo (10 min)
1. Start with **ATC Executive** - Show board metrics, churn risk
2. Switch to **CS Manager** - Show team workload, budget
3. Show **Support Agent** - Demonstrate RBAC (blocked queries)
4. End with **COR** - Government mode, contract management

### Technical Demo (15 min)
1. **Service Team Lead** - Code quality, deployments
2. **Project Manager** - Sprint burndown, velocity
3. **Service Team Member** - IC-focused tasks
4. Mode switching demonstration

### Full Demo (25 min)
- All 10 personas, 3 queries each
- Emphasize role-appropriate responses
- Highlight RBAC and terminology differences

---

## Key Talking Points

1. **RBAC Enforcement**: Support agents can't see financial data
2. **Mode-Aware Terminology**: "Compliance" works for all modes
3. **IC vs Manager**: Different data granularity per role
4. **AI Query Detection**: Natural language → appropriate widget
5. **Quick Actions**: Role-specific one-click access

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Page won't load | Check dev server: `PORT=3019 npm run dev` |
| Wrong widget shown | Clear localStorage, refresh |
| Console errors | Check browser DevTools |
| Slow response | Expected 30-45s for AI queries |

---

**End of Script**
