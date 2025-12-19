# PERSONA PROMPT/RESPONSE MATRIX
## Complete Query → Widget Mapping for All 4 Personas

**Last Updated**: 2025-11-09
**Version**: V15-Presentation
**Total Entries**: 78 (30 Quick Actions + 48 Demo Scenarios)

---

## 📊 QUICK REFERENCE

| Persona | Role Title | Quick Actions | Demo Scenarios | Total Queries | Permissions |
|---------|------------|---------------|----------------|---------------|-------------|
| **C-Level Executive** (Sarah Chen) | Chief Executive Officer | 7 | 12 | 19 | 5 |
| **CS Manager** (Michael Torres) | Customer Support Operations Manager | 9 | 12 | 21 | 7 |
| **Support Agent** (Christopher Hayes) | Senior Support Engineer | 7 | 12 | 19 | 7 |
| **CSM** (Jordan Taylor) | Customer Success Manager (Client Relations) | 7 | 12 | 19 | 10 |
| **TOTAL** | | **30** | **48** | **78** | **29** |

> **Note**: **CS Manager** and **CSM** have different roles despite similar-sounding titles:
> - **CS Manager** (Michael Torres) = Internal **Team Operations Manager** (manages support agents, SLA, workload)
> - **CSM** (Jordan Taylor) = External **Client Success Manager** (manages customer accounts, renewals, NPS)

---

## 🦸 PERSONA 1: C-LEVEL EXECUTIVE (Sarah Chen)

### Quick Actions (7)

| # | Action | Query Prompt | Expected Widget | Badge | Badge Color |
|---|--------|--------------|-----------------|-------|-------------|
| 1 | Live Tickets Dashboard | "Show me all my current tickets from Zoho Desk" | Ticket List Widget | New | Blue |
| 2 | SLA Performance | "Show me SLA performance dashboard for this quarter" | SLA Performance Chart | 92% | Green |
| 3 | Churn Risk | "Which customers are at highest risk of churning?" | Customer Risk List | 5 | Red |
| 4 | Executive Summary | "Generate comprehensive executive dashboard summary" | Executive Summary Widget | Q4 | Purple |
| 5 | Board Metrics | "Prepare metrics for board meeting presentation" | Board Metrics Dashboard | Ready | Cyan |
| 6 | High-Value Accounts | "Show me status of top 20 high-value customer accounts" | Customer List Widget | 18 | Orange |
| 7 | Strategic Initiatives | "Show me progress on strategic initiatives and OKRs" | Strategic Dashboard | 8 | Green |

### Demo Scenarios (12)

#### Category: Executive Overview (4)

| # | Query | Expected Widget | Expected Output |
|---|-------|-----------------|-----------------|
| 1 | "Show me SLA performance for Q4 2025" | SLA Performance Chart | Q4 SLA metrics, breach counts, resolution times |
| 2 | "Which customers are at risk of churning?" | Customer Risk List | At-risk customers with health scores, engagement metrics |
| 3 | "Executive dashboard summary for board meeting" | Executive Summary Widget | High-level KPIs, trends, achievements |
| 4 | "Revenue impact analysis from support tickets" | Revenue Impact Dashboard | Revenue at risk, customer ARR, ticket correlation |

#### Category: Customer Health (4)

| # | Query | Expected Widget | Expected Output |
|---|-------|-----------------|-----------------|
| 5 | "Show me customer satisfaction scores" | Customer Satisfaction Widget | CSAT scores, NPS, trend analysis |
| 6 | "Top 10 accounts by revenue with health scores" | Customer Health Dashboard | Revenue + health score ranking |
| 7 | "Escalation trends over last 3 months" | Escalation Trend Chart | Escalation count, categories, resolution times |
| 8 | "Customer retention metrics and forecasts" | Retention Metrics Widget | Retention rate, churn forecast, cohort analysis |

#### Category: Strategic Planning (4)

| # | Query | Expected Widget | Expected Output |
|---|-------|-----------------|-----------------|
| 9 | "Show me resource allocation efficiency" | Resource Allocation Chart | Agent utilization, capacity, efficiency metrics |
| 10 | "Team capacity vs demand projections" | Capacity Planning Widget | Current capacity, demand forecast, hiring needs |
| 11 | "Integration ROI analysis" | ROI Analysis Dashboard | Integration costs, time savings, efficiency gains |
| 12 | "Competitive positioning from customer feedback" | Competitive Analysis Widget | Feature comparisons, customer preferences, market position |

---

## 🦸 PERSONA 2: CS MANAGER (Michael Torres - Customer Support Operations Manager)

### Quick Actions (9)

| # | Action | Query Prompt | Expected Widget | Badge | Badge Color |
|---|--------|--------------|-----------------|-------|-------------|
| 1 | Live Tickets Dashboard | "Show me all my current tickets from Zoho Desk" | Ticket List Widget | New | Blue |
| 2 | Priority Customers | "Show me all high-priority customers needing attention" | Customer Risk List | 12 | Red |
| 3 | Agent Performance | "Show me agent performance metrics for this week" | Agent Performance Stats | This Week | Teal |
| 4 | Most Slacking Agent | "Who is my most slacking agent this week?" | Agent Performance Comparison | ! | Orange |
| 5 | Top Performing Agent | "Who is my top performing agent this week?" | Agent Performance Stats | ⭐ | Green |
| 6 | Workload Balance | "Show me agent workload distribution and recommend reassignments" | Team Workload Dashboard | View | Cyan |
| 7 | SLA Breach Alerts | "Show me tickets at risk of SLA breach" | SLA Alert List | 3 | Red |
| 8 | Team Capacity | "Show me team capacity and forecast for next week" | Capacity Forecast Chart | 78% | Green |
| 9 | Escalation Queue | "Show me all escalated tickets requiring manager attention" | Escalated Ticket List | 7 | Orange |

### Demo Scenarios (12)

#### Category: Team Performance (4)

| # | Query | Expected Widget | Expected Output |
|---|-------|-----------------|-----------------|
| 1 | "Show me agent performance for this week" | Agent Performance Stats | Resolution time, CSAT, ticket count per agent |
| 2 | "Who is my most slacking agent?" | Agent Performance Comparison | Bottom performer with metrics, improvement areas |
| 3 | "Who is my top performing agent?" | Agent Performance Stats | Top performer with achievements, best practices |
| 4 | "Compare agent metrics: resolution time vs customer satisfaction" | Agent Comparison Chart | Scatter plot showing resolution time vs CSAT correlation |

#### Category: Customer Management (4)

| # | Query | Expected Widget | Expected Output |
|---|-------|-----------------|-----------------|
| 5 | "Which customers need immediate attention?" | Priority Customer List | High-priority customers with urgency indicators |
| 6 | "Show me all high-priority tickets by customer" | Ticket List Widget (filtered) | High-priority tickets grouped by customer |
| 7 | "Customers with multiple open tickets" | Customer Ticket Count Widget | Customers with 3+ open tickets, ticket details |
| 8 | "Accounts with declining satisfaction scores" | Customer Satisfaction Trend | Customers with negative CSAT trends |

#### Category: Operations (4)

| # | Query | Expected Widget | Expected Output |
|---|-------|-----------------|-----------------|
| 9 | "Recommend ticket reassignments for workload balance" | Workload Rebalancing Widget | Suggested reassignments, workload distribution |
| 10 | "Show me SLA breach risks for next 24 hours" | SLA Risk Dashboard | At-risk tickets with time remaining, priority |
| 11 | "Team capacity planning for Q1 2026" | Capacity Planning Widget | Demand forecast, staffing recommendations |
| 12 | "Escalation trends and root cause analysis" | Escalation Analysis Dashboard | Escalation reasons, frequency, resolution paths |

---

## 🦸 PERSONA 3: SUPPORT AGENT (Christopher Hayes)

### Quick Actions (7)

| # | Action | Query Prompt | Expected Widget | Badge | Badge Color |
|---|--------|--------------|-----------------|-------|-------------|
| 1 | Live Tickets Dashboard | "Show me all my current tickets from Zoho Desk" | Ticket List Widget | New | Blue |
| 2 | My Open Tickets | "Show me all my currently open support tickets" | Ticket List Widget (filtered) | 18 | Orange |
| 3 | AI-Resolved Today | "How many tickets did AI resolve for me today?" | AI Resolution Stats Widget | 23 | Green |
| 4 | Escalated to Me | "Show me tickets escalated to me that need my attention" | Escalated Ticket List | 5 | Red |
| 5 | Today's Meetings | "Show me my scheduled customer meetings for today" | Meeting Scheduler | 3 | Cyan |
| 6 | Jira Sync Status | "Show me status of Jira issues linked to my tickets" | Jira Integration Status | ✓ | Green |
| 7 | High-Priority Alerts | "Show me my urgent tickets and critical alerts" | Priority Alert List | 7 | Red |

### Demo Scenarios (12)

#### Category: My Workload (4)

| # | Query | Expected Widget | Expected Output |
|---|-------|-----------------|-----------------|
| 1 | "Show me my tickets received in last 24 hours" | Ticket List Widget (filtered) | Recent tickets assigned to agent, unread count |
| 2 | "How many tickets did AI resolve for me?" | AI Resolution Stats | AI-resolved count, time saved, resolution quality |
| 3 | "What are my urgent tickets right now?" | Priority Ticket List | P1/P2 tickets with SLA countdown |
| 4 | "My ticket resolution rate this week" | Agent Performance Stats | Resolution rate, comparison to average, trend |

#### Category: Customer Interactions (4)

| # | Query | Expected Widget | Expected Output |
|---|-------|-----------------|-----------------|
| 5 | "Prep notes for my 2 PM customer call" | Call Prep Notes Widget | Customer history, open tickets, talking points |
| 6 | "Show me conversation history with TechCorp Solutions" | Customer Conversation History | Full ticket thread, email history, notes |
| 7 | "Draft response for ticket DESK-1002" | Response Composer Widget | AI-suggested response, similar ticket responses |
| 8 | "Schedule follow-up meeting with CloudNine Technologies" | Meeting Scheduler | Calendar integration, suggested times |

#### Category: Productivity (4)

| # | Query | Expected Widget | Expected Output |
|---|-------|-----------------|-----------------|
| 9 | "Link ticket DESK-1002 to Jira issue PROJ-302" | Jira Link Confirmation | Link created, issue details, sync status |
| 10 | "Show me tickets I can close today" | Closeable Tickets List | Resolved tickets awaiting closure, one-click close |
| 11 | "AI-suggested canned responses for common issues" | Canned Response Library | Top 10 responses by issue type, usage frequency |
| 12 | "My performance metrics vs team average" | Agent Performance Comparison | Personal metrics vs team benchmark, percentile rank |

---

## 🦸 PERSONA 4: CSM (Jordan Taylor - Customer Success Manager - Client Relations) - NEW IN V15

### Quick Actions (7)

| # | Action | Query Prompt | Expected Widget | Badge | Badge Color |
|---|--------|--------------|-----------------|-------|-------------|
| 1 | Client Health Scores | "Show me health scores for my assigned clients" | Client Health Dashboard | Live | Cyan |
| 2 | Product Adoption | "Show product adoption metrics and feature usage across clients" | Adoption Metrics Widget | Metrics | Green |
| 3 | Renewal Pipeline | "Show upcoming renewals and contract status" | Renewal Pipeline Widget | 12 | Orange |
| 4 | Client Feedback | "Show recent client feedback and NPS scores" | NPS Dashboard | NPS | Purple |
| 5 | Upsell Opportunities | "Identify upsell and cross-sell opportunities" | Upsell Opportunities List | $2.4M | Yellow |
| 6 | Product Roadmap | "Show product roadmap and upcoming features" | Roadmap Timeline | Q1 | Blue |
| 7 | Client Meetings | "Schedule and manage client business reviews" | Meeting Scheduler | 8 | Cyan |

### Demo Scenarios (12)

#### Category: Client Success (4)

| # | Query | Expected Widget | Expected Output |
|---|-------|-----------------|-----------------|
| 1 | "Show me health scores for all my assigned clients" | Client Health Dashboard | 15 clients: 3 at-risk (red), 5 stable (yellow), 7 healthy (green) |
| 2 | "Which clients have declining product adoption?" | Adoption Trend Widget | Clients with decreasing usage, feature abandonment metrics |
| 3 | "Show me clients at risk of churn this quarter" | Churn Risk Dashboard | Risk-scored clients with churn indicators, mitigation actions |
| 4 | "Compare client engagement trends month-over-month" | Engagement Trend Chart | MoM engagement comparison, growth vs decline segments |

#### Category: Revenue Growth (4)

| # | Query | Expected Widget | Expected Output |
|---|-------|-----------------|-----------------|
| 5 | "Show upcoming renewals in next 90 days" | Renewal Pipeline Widget | 12 contracts, $2.4M ARR, renewal probability, action items |
| 6 | "Identify expansion opportunities across my portfolio" | Expansion Opportunity List | Expansion-ready clients with growth potential, ARR impact |
| 7 | "Show clients ready for premium tier upgrade" | Upgrade Opportunity Widget | Clients using premium features, ROI analysis, pricing gap |
| 8 | "Analyze revenue retention and expansion metrics" | Revenue Metrics Dashboard | NRR >110%, gross retention >95%, expansion MRR |

#### Category: Client Engagement (4)

| # | Query | Expected Widget | Expected Output |
|---|-------|-----------------|-----------------|
| 9 | "Show recent NPS survey results by client" | NPS Dashboard | NPS scores, promoter/detractor breakdown, verbatim feedback |
| 10 | "Which clients need business review meetings?" | QBR Schedule Widget | Clients overdue for QBR, scheduled reviews, preparation status |
| 11 | "Show product roadmap items most requested by clients" | Feature Request Ranking | Top feature requests by client demand, roadmap status |
| 12 | "Schedule quarterly business reviews for top accounts" | Meeting Scheduler | Calendar integration, QBR templates, agenda builder |

---

## 📊 WIDGET TYPE SUMMARY

### Unique Widgets Used (19 total)

1. **Ticket List Widget** - Used by all personas
2. **SLA Performance Chart** - C-Level, CS Manager
3. **Customer Risk List** - C-Level, CS Manager
4. **Executive Summary Widget** - C-Level only
5. **Agent Performance Stats** - CS Manager, Support Agent
6. **Team Workload Dashboard** - CS Manager only
7. **Agent Performance Comparison** - CS Manager, Support Agent
8. **AI Resolution Stats** - Support Agent only
9. **Meeting Scheduler** - Support Agent, CSM
10. **Jira Integration Status** - Support Agent only
11. **Response Composer** - Support Agent only
12. **Call Prep Notes** - Support Agent only
13. **Client Health Dashboard** - CSM only
14. **Adoption Metrics Widget** - CSM only
15. **Renewal Pipeline Widget** - CSM only
16. **NPS Dashboard** - CSM, C-Level
17. **Upsell Opportunities List** - CSM only
18. **Roadmap Timeline** - CSM only
19. **Customer Satisfaction Widget** - C-Level, CS Manager

---

## 🔒 PERMISSION MATRIX

| Permission | C-Level | CS Manager | Support Agent | CSM |
|------------|---------|------------|---------------|-----|
| view_all_metrics | ✅ | ❌ | ❌ | ❌ |
| view_financial_data | ✅ | ❌ | ❌ | ❌ |
| view_customer_health | ✅ | ✅ | ❌ | ✅ |
| view_strategic_initiatives | ✅ | ❌ | ❌ | ❌ |
| view_sla_reports | ✅ | ✅ | ❌ | ❌ |
| view_team_metrics | ❌ | ✅ | ❌ | ❌ |
| view_all_tickets | ❌ | ✅ | ❌ | ❌ |
| reassign_tickets | ❌ | ✅ | ❌ | ❌ |
| view_agent_performance | ❌ | ✅ | ✅ | ❌ |
| escalate_tickets | ❌ | ✅ | ✅ | ❌ |
| manage_team | ❌ | ✅ | ❌ | ❌ |
| view_own_tickets | ❌ | ❌ | ✅ | ❌ |
| update_own_tickets | ❌ | ❌ | ✅ | ❌ |
| view_customer_data | ❌ | ✅ | ✅ | ❌ |
| link_jira_issues | ❌ | ❌ | ✅ | ❌ |
| view_own_meetings | ❌ | ❌ | ✅ | ❌ |
| view_own_performance | ❌ | ❌ | ✅ | ❌ |
| view_client_health | ❌ | ❌ | ❌ | ✅ |
| view_product_adoption | ❌ | ❌ | ❌ | ✅ |
| view_renewal_pipeline | ❌ | ❌ | ❌ | ✅ |
| view_nps_scores | ❌ | ❌ | ❌ | ✅ |
| manage_client_meetings | ❌ | ❌ | ❌ | ✅ |
| view_upsell_opportunities | ❌ | ❌ | ❌ | ✅ |
| view_product_roadmap | ❌ | ❌ | ❌ | ✅ |
| view_client_feedback | ❌ | ❌ | ❌ | ✅ |
| schedule_business_reviews | ❌ | ❌ | ❌ | ✅ |
| view_expansion_metrics | ❌ | ❌ | ❌ | ✅ |

**Total Unique Permissions**: 27

---

## 📈 QUERY COMPLEXITY ANALYSIS

### Query Types by Complexity

**Simple Queries** (single widget, no parameters):
- "Show me my open tickets" (Support Agent)
- "Show me SLA performance" (C-Level)
- "Show me client health scores" (CSM)

**Medium Queries** (filtered data, time ranges):
- "Show me agent performance for this week" (CS Manager)
- "Show upcoming renewals in next 90 days" (CSM)
- "Show me tickets received in last 24 hours" (Support Agent)

**Complex Queries** (multi-widget, analysis, recommendations):
- "Recommend ticket reassignments for workload balance" (CS Manager)
- "Analyze revenue retention and expansion metrics" (CSM)
- "Competitive positioning from customer feedback" (C-Level)

### AI Query Detection Patterns

**Exact Match Triggers**:
- "Show me SLA performance" → SLA Performance Chart
- "Who is my top performing agent?" → Agent Performance Stats

**Keyword-Based Detection**:
- Contains "churn" + "risk" → Customer Risk List
- Contains "renewal" + "pipeline" → Renewal Pipeline Widget
- Contains "NPS" OR "feedback" → NPS Dashboard

**Persona Context**:
- C-Level + "summary" → Executive Summary Widget
- CS Manager + "workload" → Team Workload Dashboard
- CSM + "adoption" → Adoption Metrics Widget

---

## 🎯 USAGE STATISTICS

### Queries Per Category

| Persona | Quick Actions | Demo Scenarios | Total |
|---------|---------------|----------------|-------|
| C-Level | 7 | 12 | 19 |
| CS Manager | 9 | 12 | 21 |
| Support Agent | 7 | 12 | 19 |
| CSM | 7 | 12 | 19 |
| **TOTAL** | **30** | **48** | **78** |

### Widget Usage Frequency

| Widget Type | Personas Using | Frequency |
|-------------|----------------|-----------|
| Ticket List | 4 | Very High |
| Customer Risk List | 2 | High |
| Agent Performance | 2 | High |
| Meeting Scheduler | 2 | Medium |
| SLA Performance | 2 | Medium |
| NPS Dashboard | 2 | Medium |
| Others (13 widgets) | 1 each | Low |

---

## 🔗 RELATED DOCUMENTATION

- **Multi-Persona System**: `/docs/06-features/MULTI-PERSONA-SYSTEM.md`
- **CSM Persona Guide**: `/docs/06-features/CSM-PERSONA-GUIDE.md`
- **Widget Catalog**: `/docs/07-components/WIDGET-CATALOG.md`
- **AI Workflows**: `/docs/14-workflows/WORKFLOW-OVERVIEW.md`
- **Source Code**: `/src/data/personas.ts`

---

**Matrix Completeness**: ✅ 100% (all 78 queries documented)
**Last Verification**: 2025-11-09
**Status**: Production-ready reference

---
