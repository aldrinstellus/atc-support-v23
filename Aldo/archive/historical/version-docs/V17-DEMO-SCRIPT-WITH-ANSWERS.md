# V17 Mode Switcher - Complete Demo Script with Expected Answers

**Date**: November 14, 2025
**Version**: v17-mode-switcher
**Port**: 3018
**URL**: http://localhost:3018
**Status**: Production-Ready Demo Script

---

## How to Use This Script

This script provides the **complete conversation flow** for all 13 personas across 3 modes. For each Quick Action, you'll find:

1. **Query** - What to type or click
2. **Expected AI Response** - The first line of AI's answer
3. **Widget Type** - Which visual component should appear
4. **Key Data Points** - What information the widget displays

**Testing Instructions**:
1. Navigate to persona URL (e.g., http://localhost:3018/demo/atc-executive)
2. Click Quick Action button OR type the query
3. Verify AI response matches expected text
4. Verify widget appears with correct data
5. Check console for 0 errors

---

## Mode 1: Government (6 Personas, 30+ Quick Actions)

### 1.1 Government COR (Contracting Officer Representative)

**Persona**: Patricia Martinez
**URL**: http://localhost:3018/demo/cor
**Badge**: Purple/Violet with Shield icon

#### Quick Action 1: Contract Status Dashboard
**Query**: "Show me current contract status"

**Expected Answer**:
```
Here is the current contract status for Project Phoenix:

[CONTRACT STATUS DASHBOARD WIDGET]
- Active Contracts: 3
- Total Contract Value: $2.4M
- Compliance Rate: 94%
- Pending Actions: 2
```

**Widget**: Contract Compliance Dashboard
**Key Metrics**:
- Contract value, compliance %, vendor count
- Status indicators (green/yellow/red)
- Action items list

---

#### Quick Action 2: Vendor Performance
**Query**: "Show me vendor performance metrics"

**Expected Answer**:
```
Here is the vendor performance review for our contracted vendors:

[VENDOR PERFORMANCE WIDGET]
- TechCorp Solutions: 92% (Excellent)
- DataSync Inc: 87% (Good)
- CloudFirst LLC: 78% (Needs Improvement)
```

**Widget**: Vendor Performance Review
**Key Metrics**:
- Vendor names and scores
- Performance categories
- Trend indicators

---

#### Quick Action 3: Budget Tracking
**Query**: "Show me budget tracking dashboard"

**Expected Answer**:
```
Here is the budget tracking dashboard for Project Phoenix:

[BUDGET TRACKING WIDGET]
- Total Budget: $2.4M
- Spent: $1.6M (67%)
- Remaining: $800K (33%)
- Burn Rate: On Target
```

**Widget**: Budget vs Actuals Dashboard
**Key Metrics**:
- Budget utilization %
- Monthly burn rate
- Projected completion costs

---

#### Quick Action 4: Compliance Dashboard
**Query**: "Show me compliance dashboard"

**Expected Answer**:
```
Here is the compliance dashboard for all contracted work:

[COMPLIANCE DASHBOARD WIDGET]
- Overall Compliance: 94%
- Documentation: 98%
- Deliverables: 92%
- Security Requirements: 91%
```

**Widget**: Vendor Compliance Dashboard
**Key Metrics**:
- Compliance by category
- Recent violations
- Remediation status

---

#### Quick Action 5: Contract Deliverables
**Query**: "Show me contract deliverables status"

**Expected Answer**:
```
Here is the deliverables status for all active contracts:

[DELIVERABLES WIDGET]
- Completed: 12 (80%)
- In Progress: 2 (13%)
- Upcoming: 1 (7%)
```

**Widget**: Deliverables Tracker
**Key Metrics**:
- Deliverable completion %
- On-time delivery rate
- Quality scores

---

### 1.2 Government Program Manager

**Persona**: James Chen
**URL**: http://localhost:3018/demo/program-manager
**Badge**: Blue with Briefcase icon

#### Quick Action 1: Program Health
**Query**: "Show me program health dashboard"

**Expected Answer**:
```
Here is the program health dashboard for all active initiatives:

[PROGRAM HEALTH WIDGET]
- Overall Health: 85% (Good)
- Schedule: On Track
- Budget: 92% utilized
- Risk Level: Medium
```

**Widget**: Program Health Dashboard
**Key Metrics**:
- Health score by category
- Risk assessment
- Resource utilization

---

#### Quick Action 2: Milestone Tracker
**Query**: "Show me milestone tracker"

**Expected Answer**:
```
Here is the milestone status for all program projects:

[MILESTONE TRACKER WIDGET]
- Completed: 8 milestones
- On Track: 3 milestones
- At Risk: 1 milestone
- Next Due: Q1 2026 Planning
```

**Widget**: Milestone Tracker Dashboard
**Key Metrics**:
- Milestone completion %
- Upcoming deadlines
- Critical path items

---

#### Quick Action 3: Stakeholder Reports
**Query**: "Show me stakeholder reports"

**Expected Answer**:
```
Here are the latest stakeholder reports for the DNR program:

[STAKEHOLDER REPORTS WIDGET]
- Executive Summary: Monthly
- Financial Reports: Quarterly
- Risk Assessments: Bi-weekly
- Last Updated: November 14, 2025
```

**Widget**: Stakeholder Reports Dashboard
**Key Metrics**:
- Report types and frequency
- Distribution lists
- Recent updates

---

#### Quick Action 4: Resource Allocation
**Query**: "Show me resource allocation"

**Expected Answer**:
```
Here is the resource allocation across all program projects:

[RESOURCE ALLOCATION WIDGET]
- Total Resources: 24 FTEs
- Allocated: 22 FTEs (92%)
- Available: 2 FTEs (8%)
- Top Allocation: IT Development (8 FTEs)
```

**Widget**: Resource Allocation Chart
**Key Metrics**:
- Resource distribution by project
- Utilization rates
- Capacity planning

---

#### Quick Action 5: Risk Register
**Query**: "Show me risk register"

**Expected Answer**:
```
Here is the risk register for the DNR grants program:

[RISK REGISTER WIDGET]
- High Risk: 2 items
- Medium Risk: 5 items
- Low Risk: 8 items
- Mitigated: 12 items
```

**Widget**: Risk Register Dashboard
**Key Metrics**:
- Risk severity distribution
- Mitigation status
- Owner assignments

---

### 1.3 Government Project Manager

**Persona**: Michael Davis
**URL**: http://localhost:3018/demo/project-manager
**Badge**: Orange with Clipboard icon

#### Quick Action 1: Sprint Burndown
**Query**: "Show me sprint burndown chart"

**Expected Answer**:
```
Here is the burndown chart for the current sprint:

[SPRINT BURNDOWN WIDGET]
- Sprint: Sprint 12 (Nov 1-14, 2025)
- Total Points: 42
- Completed: 28 points (67%)
- Remaining: 14 points
- Trend: On Track
```

**Widget**: Sprint Burndown Chart
**Key Metrics**:
- Ideal vs actual burndown
- Velocity trend
- Days remaining

---

#### Quick Action 2: Team Workload
**Query**: "Show me team workload distribution"

**Expected Answer**:
```
Here is the team workload distribution:

[TEAM WORKLOAD WIDGET]
- Sarah Johnson: 85% capacity
- Mike Chen: 92% capacity
- Alex Kumar: 78% capacity
- Team Average: 85% capacity
```

**Widget**: Team Workload Dashboard
**Key Metrics**:
- Individual utilization %
- Task distribution
- Capacity warnings

---

#### Quick Action 3: Quality Metrics
**Query**: "Show me quality metrics dashboard"

**Expected Answer**:
```
Here are the quality metrics for the development team:

[QUALITY METRICS WIDGET]
- Code Coverage: 87%
- Bug Density: 0.3/KLOC
- Tech Debt: 12 days
- Quality Score: 92/100
```

**Widget**: Quality Metrics Dashboard
**Key Metrics**:
- Test coverage %
- Defect rates
- Code quality scores

---

#### Quick Action 4: Deployment Status
**Query**: "Show me deployment status"

**Expected Answer**:
```
Here is the deployment status for all environments:

[DEPLOYMENT STATUS WIDGET]
- Production: v2.4.1 (Stable)
- Staging: v2.5.0-rc1 (Testing)
- Development: v2.6.0-dev (Active)
- Last Deploy: November 13, 2025
```

**Widget**: Deployment Status Dashboard
**Key Metrics**:
- Environment versions
- Deployment frequency
- Success rates

---

#### Quick Action 5: Sprint Planning
**Query**: "Show me sprint planning board"

**Expected Answer**:
```
Here is the sprint planning board for Sprint 13:

[SPRINT PLANNING WIDGET]
- Sprint Start: November 15, 2025
- Sprint End: November 28, 2025
- Capacity: 48 points
- Committed: 42 points
```

**Widget**: Sprint Planning Board
**Key Metrics**:
- Sprint capacity
- Story point allocation
- Team availability

---

### 1.4 Government Service Team Lead

**Persona**: Emily Johnson
**URL**: http://localhost:3018/demo/service-team-lead
**Badge**: Teal with Star icon

#### Quick Action 1: Team Performance
**Query**: "Show me team performance dashboard"

**Expected Answer**:
```
Here is the team performance dashboard:

[TEAM PERFORMANCE WIDGET]
- Team Velocity: 42 points/sprint
- Sprint Success Rate: 85%
- Code Quality: 92/100
- Team Morale: High
```

**Widget**: Team Performance Dashboard
**Key Metrics**:
- Velocity trends
- Quality metrics
- Team health indicators

---

#### Quick Action 2: Code Review Stats
**Query**: "Show me code review metrics"

**Expected Answer**:
```
Here are the code review metrics for the last 2 weeks:

[CODE REVIEW WIDGET]
- Total Reviews: 48
- Average Turnaround: 4.2 hours
- Approval Rate: 92%
- Comments per PR: 3.5
```

**Widget**: Code Review Metrics Dashboard
**Key Metrics**:
- Review turnaround times
- Approval/rejection rates
- Review quality scores

---

#### Quick Action 3: Task Distribution
**Query**: "Show me task distribution"

**Expected Answer**:
```
Here is the task distribution across team members:

[TASK DISTRIBUTION WIDGET]
- Sarah: 8 tasks (3 completed)
- Mike: 6 tasks (5 completed)
- Alex: 7 tasks (4 completed)
- Team Total: 21 tasks
```

**Widget**: Task Distribution Chart
**Key Metrics**:
- Task allocation by member
- Completion rates
- Balance analysis

---

#### Quick Action 4: Capacity Planning
**Query**: "Show me capacity planning"

**Expected Answer**:
```
Here is the capacity planning for next sprint:

[CAPACITY PLANNING WIDGET]
- Team Capacity: 48 points
- Committed Work: 42 points
- Buffer: 6 points (12.5%)
- PTO Impact: 1 developer (20% reduction)
```

**Widget**: Capacity Planning Dashboard
**Key Metrics**:
- Available capacity
- Planned allocations
- Risk factors

---

#### Quick Action 5: Technical Debt
**Query**: "Show me technical debt tracker"

**Expected Answer**:
```
Here is the technical debt tracking report:

[TECHNICAL DEBT WIDGET]
- Total Debt: 12 days
- High Priority: 3 days
- Medium Priority: 6 days
- Low Priority: 3 days
- Trend: Decreasing
```

**Widget**: Technical Debt Tracker
**Key Metrics**:
- Debt severity levels
- Remediation timeline
- Impact assessment

---

### 1.5 Government Service Team Member

**Persona**: Alex Kumar
**URL**: http://localhost:3018/demo/service-team-member
**Badge**: Indigo with Code icon

#### Quick Action 1: My Tasks
**Query**: "Show me my assigned tasks"

**Expected Answer**:
```
Here are your currently assigned tasks:

[MY TASKS WIDGET]
- API Authentication (High Priority)
- Database Migration (Medium Priority)
- Code Review: User Module (Today)
- Documentation Update (Low Priority)
```

**Widget**: My Tasks List
**Key Metrics**:
- Task priorities
- Due dates
- Status indicators

---

#### Quick Action 2: Pull Requests
**Query**: "Show me my pull requests"

**Expected Answer**:
```
Here are your open pull requests:

[PULL REQUESTS WIDGET]
- PR#42: Authentication Refactor (2 approvals needed)
- PR#38: Database Schema Update (Approved, ready to merge)
- PR#35: API Documentation (In Review)
```

**Widget**: Pull Requests Dashboard
**Key Metrics**:
- PR status
- Review progress
- Merge readiness

---

#### Quick Action 3: Time Tracking
**Query**: "Show me my time tracking"

**Expected Answer**:
```
Here is your time tracking for this week:

[TIME TRACKING WIDGET]
- Monday: 8.5 hours
- Tuesday: 7.0 hours
- Wednesday: 8.0 hours
- Thursday: 6.5 hours (today)
- Total: 30.0 hours
```

**Widget**: Time Tracking Summary
**Key Metrics**:
- Daily hours
- Project allocation
- Weekly totals

---

#### Quick Action 4: Code Metrics
**Query**: "Show me my code metrics"

**Expected Answer**:
```
Here are your code metrics for this sprint:

[CODE METRICS WIDGET]
- Lines of Code: 2,450
- Code Reviews: 12 completed
- Commits: 38
- Test Coverage: 92%
```

**Widget**: Developer Code Metrics
**Key Metrics**:
- Productivity indicators
- Quality metrics
- Contribution stats

---

#### Quick Action 5: Knowledge Base
**Query**: "Search knowledge base for authentication"

**Expected Answer**:
```
Here are knowledge base articles related to authentication:

[KNOWLEDGE BASE WIDGET]
1. OAuth 2.0 Implementation Guide
2. JWT Token Best Practices
3. Password Reset Flow Documentation
4. Multi-Factor Authentication Setup
```

**Widget**: Knowledge Base Search Results
**Key Metrics**:
- Article relevance scores
- Last updated dates
- View counts

---

### 1.6 Government Stakeholder Lead

**Persona**: Dr. Sarah Thompson
**URL**: http://localhost:3018/demo/stakeholder-lead
**Badge**: Green with Users icon

#### Quick Action 1: Stakeholder Engagement
**Query**: "Show me stakeholder engagement metrics"

**Expected Answer**:
```
Here is the stakeholder engagement dashboard:

[STAKEHOLDER ENGAGEMENT WIDGET]
- Total Stakeholders: 24
- Active Engagement: 21 (88%)
- Recent Meetings: 8 (last 30 days)
- Satisfaction Score: 4.2/5.0
```

**Widget**: Stakeholder Engagement Dashboard
**Key Metrics**:
- Engagement levels
- Communication frequency
- Satisfaction trends

---

#### Quick Action 2: Feedback Summary
**Query**: "Show me stakeholder feedback"

**Expected Answer**:
```
Here is the stakeholder feedback summary:

[FEEDBACK SUMMARY WIDGET]
- Total Responses: 18
- Positive: 14 (78%)
- Neutral: 3 (17%)
- Negative: 1 (5%)
- Top Theme: Communication Quality
```

**Widget**: Feedback Summary Dashboard
**Key Metrics**:
- Sentiment distribution
- Key themes
- Action items

---

#### Quick Action 3: Meeting Schedule
**Query**: "Show me stakeholder meetings"

**Expected Answer**:
```
Here are upcoming stakeholder meetings:

[MEETING SCHEDULE WIDGET]
- Nov 15: DNR Executive Review
- Nov 18: Budget Committee Meeting
- Nov 22: Technical Steering Committee
- Nov 29: Quarterly Business Review
```

**Widget**: Meeting Schedule Dashboard
**Key Metrics**:
- Meeting dates/times
- Attendee lists
- Agenda items

---

#### Quick Action 4: Action Items
**Query**: "Show me action items from meetings"

**Expected Answer**:
```
Here are action items from stakeholder meetings:

[ACTION ITEMS WIDGET]
- Complete budget analysis (Due: Nov 20)
- Update risk register (Due: Nov 17)
- Prepare QBR materials (Due: Nov 27)
- Review vendor contracts (Due: Nov 22)
```

**Widget**: Action Items Tracker
**Key Metrics**:
- Item status
- Due dates
- Owner assignments

---

#### Quick Action 5: Approval Status
**Query**: "Show me approval status"

**Expected Answer**:
```
Here is the approval status for pending decisions:

[APPROVAL STATUS WIDGET]
- Budget Increase Request: Approved
- Scope Change CR-42: Pending (2/3 approvals)
- Vendor Extension: Under Review
- Risk Mitigation Plan: Approved
```

**Widget**: Approval Status Dashboard
**Key Metrics**:
- Approval progress
- Decision timelines
- Stakeholder votes

---

## Mode 2: Project (3 Personas, 15 Quick Actions)

### 2.1 Project Manager

**Persona**: Michael Rodriguez
**URL**: http://localhost:3018/demo/project-manager
**Badge**: Orange with Clipboard icon

*(Same as Government Project Manager - see section 1.3 above)*

---

### 2.2 Project Service Team Lead

**Persona**: Emily Johnson
**URL**: http://localhost:3018/demo/service-team-lead
**Badge**: Teal with Star icon

*(Same as Government Service Team Lead - see section 1.4 above)*

---

### 2.3 Project Service Team Member

**Persona**: Alex Kumar
**URL**: http://localhost:3018/demo/service-team-member
**Badge**: Indigo with Code icon

*(Same as Government Service Team Member - see section 1.5 above)*

---

## Mode 3: ATC (4 Personas, 26 Quick Actions)

### 3.1 ATC Executive (CEO)

**Persona**: Jennifer Anderson
**URL**: http://localhost:3018/demo/atc-executive
**Badge**: Gold with Crown icon

#### Quick Action 1: Live Tickets Dashboard ✅
**Query**: "Show me all my current tickets from Zoho Desk"

**Expected Answer**:
```
Here are the current tickets from Zoho Desk:

[TICKET LIST WIDGET]
- Total Tickets: 20
- Open: 12 (60%)
- In Progress: 5 (25%)
- Pending: 3 (15%)
```

**Widget**: Ticket List (Live Zoho Data)
**Key Metrics**:
- Ticket counts by status
- Priority distribution
- Assignment overview

**Status**: ✅ VERIFIED - Zoho API integration working

---

#### Quick Action 2: SLA Performance
**Query**: "Show me SLA performance dashboard for this quarter"

**Expected Answer**:
```
Here's the detailed SLA performance across all service tiers:

[SLA PERFORMANCE WIDGET]
- Enterprise SLA: 92% (Target: 95%)
- Business SLA: 88% (Target: 90%)
- Standard SLA: 94% (Target: 85%)
- Overall: 91%
```

**Widget**: SLA Performance Chart
**Key Metrics**:
- SLA by tier
- Breach analysis
- Response time trends

---

#### Quick Action 3: Churn Risk
**Query**: "Which customers are at highest risk of churning?"

**Expected Answer**:
```
Here are the high-risk customers requiring executive attention:

[CUSTOMER RISK LIST WIDGET]
- Acme Corp: Risk 85% (ARR $240K)
- TechStart Inc: Risk 72% (ARR $180K)
- DataFlow LLC: Risk 68% (ARR $150K)
```

**Widget**: Customer Risk List
**Key Metrics**:
- Risk scores
- ARR values
- Risk factors

---

#### Quick Action 4: Executive Summary
**Query**: "Generate comprehensive executive dashboard summary"

**Expected Answer**:
```
Good morning. Here's your executive summary for ATC:

[EXECUTIVE SUMMARY WIDGET]
- Client Satisfaction: 92% (+5%)
- Revenue Growth: $2.4M (+18%)
- SLA Performance: 89% (-2%)
- Team Efficiency: 3.8h (-0.7h)
```

**Widget**: Executive Summary Dashboard
**Key Metrics**:
- Key business metrics
- Trend indicators
- Insights and actions

---

#### Quick Action 5: Board Metrics
**Query**: "Prepare metrics for board meeting presentation"

**Expected Answer**:
```
Here are the board-level KPIs for this quarter:

[EXECUTIVE SUMMARY WIDGET - BOARD MODE]
- Revenue: $2.4M (18% growth)
- Customer Count: 342 (+24 new)
- Churn Rate: 3.2% (-0.8%)
- NPS Score: 67 (Industry leading)
```

**Widget**: Executive Summary (Board Variant)
**Key Metrics**:
- Financial performance
- Growth metrics
- Customer health

---

#### Quick Action 6: High-Value Accounts ✅
**Query**: "Show me status of top 20 high-value customer accounts"

**Expected Answer**:
```
Here's the status overview of your top high-value customer accounts:

[CUSTOMER RISK LIST WIDGET]
- Enterprise Tier: 8 accounts
- Total ARR: $1.8M
- Average Health Score: 78%
- At-Risk: 3 accounts (need attention)
```

**Widget**: Customer Risk List
**Key Metrics**:
- Account health scores
- ARR distribution
- Risk indicators

**Status**: ✅ VERIFIED - Query detection working

---

#### Quick Action 7: Strategic Initiatives
**Query**: "Show me progress on strategic initiatives and OKRs"

**Expected Answer**:
```
Here are ATC's active strategic initiatives with progress tracking:

[TEXT RESPONSE]
**Q4 2025 Strategic Initiatives:**

1. AI-Powered Support Automation
   - Status: On Track (75% complete)
   - Key Result: 40% reduction in response times achieved

2. Enterprise Customer Expansion
   - Status: Ahead of Schedule (120% of target)
   - Key Result: 24 new enterprise customers (target: 20)

3. Platform Modernization
   - Status: In Progress (60% complete)
   - Key Result: Migration to v2.0 scheduled for Q1 2026
```

**Widget**: Text Response (No Widget)
**Format**: Structured text with progress indicators

---

### 3.2 ATC Manager

**Persona**: David Miller
**URL**: http://localhost:3018/demo/atc-manager
**Badge**: Blue with Users icon

#### Quick Action 1: Agent Performance
**Query**: "Show me agent performance stats"

**Expected Answer**:
```
Here's the performance comparison across all support agents:

[AGENT PERFORMANCE WIDGET]
- Sarah Johnson: 94% CSAT, 2.1h avg resolution
- Mike Chen: 91% CSAT, 2.8h avg resolution
- Alex Kumar: 89% CSAT, 3.2h avg resolution
- Team Average: 91% CSAT, 2.7h avg resolution
```

**Widget**: Agent Performance Comparison
**Key Metrics**:
- Individual agent scores
- CSAT ratings
- Resolution times

---

#### Quick Action 2: Workload Balance
**Query**: "Show me team workload distribution"

**Expected Answer**:
```
Here's the current team workload distribution:

[TEAM WORKLOAD WIDGET]
- Sarah Johnson: 12 tickets (High capacity)
- Mike Chen: 8 tickets (Optimal)
- Alex Kumar: 15 tickets (Overloaded ⚠️)
- Unassigned: 3 tickets
```

**Widget**: Team Workload Dashboard
**Key Metrics**:
- Ticket distribution
- Capacity warnings
- Balance recommendations

---

#### Quick Action 3: SLA Breach Alerts
**Query**: "Show me SLA breach alerts"

**Expected Answer**:
```
Here's the current SLA compliance status:

[SLA PERFORMANCE WIDGET]
- Critical Breaches: 2
- At Risk (< 2 hours): 5
- On Track: 34
- Average Response Time: 1.8h
```

**Widget**: SLA Performance Chart
**Key Metrics**:
- Breach counts
- Time-to-breach
- Recovery actions

---

#### Quick Action 4: Live Tickets
**Query**: "Show me live tickets dashboard"

**Expected Answer**:
```
Here are the current tickets from Zoho Desk:

[TICKET LIST WIDGET]
- Total: 41 tickets
- Unassigned: 3
- High Priority: 8
- Overdue: 2
```

**Widget**: Ticket List Dashboard
**Key Metrics**:
- Ticket status breakdown
- Priority distribution
- Assignment status

---

#### Quick Action 5: Priority Customers
**Query**: "Show me priority customer status"

**Expected Answer**:
```
Here are your priority customers requiring attention:

[CUSTOMER RISK LIST WIDGET]
- Enterprise Tier: 12 customers
- High Touch: 8 customers
- At Risk: 3 customers
- VIP Support: 5 customers
```

**Widget**: Customer Risk List
**Key Metrics**:
- Customer tiers
- Support levels
- Risk flags

---

### 3.3 ATC Support Agent

**Persona**: Christopher Hayes
**URL**: http://localhost:3018/demo/atc-support
**Badge**: Green with Headset icon

#### Quick Action 1: My Active Tickets
**Query**: "Show me my active tickets"

**Expected Answer**:
```
Here are your currently active tickets:

[MY ACTIVE TICKETS WIDGET]
- TICK-042: Login issues (High Priority)
- TICK-038: API timeout errors (Medium)
- TICK-035: Feature request (Low)
- Total: 3 active tickets
```

**Widget**: My Active Tickets List
**Key Metrics**:
- Ticket IDs and subjects
- Priority levels
- Time in queue

---

#### Quick Action 2: Ticket Detail
**Query**: "Show me ticket TICK-001 details"

**Expected Answer**:
```
Here are the details for ticket TICK-001:

[TICKET DETAIL WIDGET]
- Subject: Cannot access dashboard
- Customer: john.smith@example.com
- Priority: High
- Created: 2 hours ago
- Last Update: 45 minutes ago
- Status: In Progress
```

**Widget**: Ticket Detail View
**Key Metrics**:
- Full ticket information
- Activity timeline
- Customer context

---

#### Quick Action 3: Knowledge Base Search
**Query**: "Search knowledge base for password reset"

**Expected Answer**:
```
Here are knowledge base articles related to password reset:

[KNOWLEDGE BASE WIDGET]
1. Password Reset Flow (Updated Nov 2025)
2. Two-Factor Authentication Reset
3. Account Recovery Best Practices
4. Common Password Issues
```

**Widget**: Knowledge Base Search Results
**Key Metrics**:
- Article titles
- Relevance scores
- Last updated dates

---

#### Quick Action 4: Similar Tickets
**Query**: "Find similar tickets to TICK-001"

**Expected Answer**:
```
Here are tickets similar to TICK-001:

[SIMILAR TICKETS WIDGET]
- TICK-092: Dashboard access error (Resolved)
- TICK-085: Login timeout issue (Resolved)
- TICK-078: Session expiration bug (In Progress)
```

**Widget**: Similar Tickets Analysis
**Key Metrics**:
- Similar ticket IDs
- Resolution status
- Solution summaries

---

#### Quick Action 5: Draft Response
**Query**: "Draft response for angry customer about delayed shipment"

**Expected Answer**:
```
Here's a professional response template for this situation:

[RESPONSE COMPOSER WIDGET]

Dear [Customer Name],

I sincerely apologize for the delay in your shipment. I understand how frustrating this must be, and I want to assure you that we're taking immediate action to resolve this issue.

[Additional template content with empathy and action steps]
```

**Widget**: Response Composer
**Format**: Pre-formatted email template

---

#### Quick Action 6: Customer History
**Query**: "Show me customer history for john.smith@example.com"

**Expected Answer**:
```
Here is the customer history for john.smith@example.com:

[CUSTOMER HISTORY WIDGET]
- Account Since: January 2024
- Total Tickets: 8
- CSAT Average: 4.2/5.0
- Recent Issues: Login problems (3x)
- Last Contact: November 12, 2025
```

**Widget**: Customer History Timeline
**Key Metrics**:
- Interaction history
- Ticket patterns
- Satisfaction trends

---

### 3.4 ATC Customer Success Manager (CSM)

**Persona**: Jordan Taylor
**URL**: http://localhost:3018/demo/atc-csm
**Badge**: Purple with Heart icon

#### Quick Action 1: Customer Health
**Query**: "Show me customer health dashboard"

**Expected Answer**:
```
Here is the customer health dashboard for your accounts:

[CUSTOMER HEALTH WIDGET]
- Total Accounts: 24
- Healthy: 18 (75%)
- At Risk: 4 (17%)
- Critical: 2 (8%)
```

**Widget**: Customer Health Dashboard
**Key Metrics**:
- Health score distribution
- Risk indicators
- Account values

---

#### Quick Action 2: Account Risk
**Query**: "Show me account risk profile for Acme Corp"

**Expected Answer**:
```
Here is the risk profile for Acme Corp:

[CUSTOMER RISK PROFILE WIDGET]
- Overall Risk: 85% (High)
- ARR: $240,000
- Contract End: March 2026
- Engagement Score: 32/100 (Low)
- Risk Factors: Low usage, missed QBRs, support tickets up 40%
```

**Widget**: Customer Risk Profile
**Key Metrics**:
- Risk score breakdown
- Contributing factors
- Recommended actions

---

#### Quick Action 3: Renewal Pipeline
**Query**: "Show me renewal pipeline for Q1 2026"

**Expected Answer**:
```
Here is the renewal pipeline for Q1 2026:

[RENEWAL PIPELINE WIDGET]
- Total ARR at Risk: $1.2M
- High Confidence: $850K (71%)
- Medium Risk: $250K (21%)
- High Risk: $100K (8%)
- Renewals Due: 12 accounts
```

**Widget**: Renewal Pipeline Dashboard
**Key Metrics**:
- ARR by confidence level
- Renewal dates
- Risk assessment

---

#### Quick Action 4: Usage Analytics
**Query**: "Show me usage analytics for enterprise customers"

**Expected Answer**:
```
Here are the usage analytics for enterprise customers:

[USAGE ANALYTICS WIDGET]
- Average Daily Users: 142
- Feature Adoption: 68%
- API Calls: 24,500/day
- Trend: +12% month-over-month
```

**Widget**: Usage Analytics Dashboard
**Key Metrics**:
- Engagement metrics
- Feature utilization
- Trend analysis

---

#### Quick Action 5: Expansion Opportunities
**Query**: "Identify expansion opportunities in my portfolio"

**Expected Answer**:
```
Here are the expansion opportunities in your portfolio:

[EXPANSION OPPORTUNITIES WIDGET]
- TechCorp: +$50K (Add 25 users)
- DataFlow: +$35K (Upgrade to Enterprise)
- CloudFirst: +$28K (Add API access)
- Total Potential: $113K ARR
```

**Widget**: Expansion Opportunities List
**Key Metrics**:
- Account names
- Expansion value
- Opportunity type

---

#### Quick Action 6: QBR Preparation
**Query**: "Prepare QBR materials for Acme Corp"

**Expected Answer**:
```
Here are the QBR materials for Acme Corp:

[QBR PREPARATION WIDGET]

**Business Review Summary:**
- Account Health: At Risk (Score: 32/100)
- Usage Trends: Declining (down 18%)
- Support Tickets: Up 40% (red flag)
- Engagement: 2 missed meetings

**Recommended Discussion Topics:**
1. Address support ticket surge
2. Review product adoption
3. Discuss success plan adjustments
```

**Widget**: QBR Preparation Dashboard
**Format**: Structured report with metrics

---

#### Quick Action 7: Success Plan
**Query**: "Show me success plan tracker for top accounts"

**Expected Answer**:
```
Here is the success plan progress for your top 10 accounts:

[SUCCESS PLAN TRACKER WIDGET]
- On Track: 6 accounts
- Needs Attention: 3 accounts
- Critical: 1 account (Acme Corp)
- Next Milestone: Q1 2026 Reviews
```

**Widget**: Success Plan Tracker
**Key Metrics**:
- Plan status by account
- Milestone completion
- Action items

---

#### Quick Action 8: Meeting Scheduler
**Query**: "Schedule meeting with Acme Corp stakeholders"

**Expected Answer**:
```
I'll help you schedule a meeting with Acme Corp stakeholders:

[MEETING SCHEDULER WIDGET]

**Recommended Meeting:**
- Type: Emergency QBR
- Duration: 60 minutes
- Attendees: CEO, CTO, Product Lead
- Agenda: Address risk factors, review success plan
- Suggested Dates: Nov 18-22, 2025
```

**Widget**: Meeting Scheduler
**Format**: Calendar integration interface

---

## Testing Checklist

### For Each Persona
- [ ] Navigate to persona URL
- [ ] Verify persona name and badge appear
- [ ] Click each Quick Action button
- [ ] Verify query populates in chat input
- [ ] Verify AI response matches expected answer
- [ ] Verify widget appears with correct data
- [ ] Check console for 0 errors
- [ ] Take screenshot for evidence

### Overall Testing
- [ ] Test all 13 personas
- [ ] Verify mode switcher works (Gov/Project/ATC)
- [ ] Verify Quick Launch (⌘K) works
- [ ] Verify sidebar navigation
- [ ] Verify conversation history
- [ ] Verify message actions (Copy, Regenerate, etc.)

---

## Summary

**Total Personas**: 13
**Total Quick Actions**: 61+
**Total Widgets**: 19+ types

**Government Mode**: 6 personas, 30+ actions
**Project Mode**: 3 personas, 15 actions
**ATC Mode**: 4 personas, 26 actions

**Testing Time Estimate**: 3-4 hours for complete verification
**Documentation**: All queries and expected answers provided
**Status**: Ready for comprehensive demo testing

---

**Created**: November 14, 2025
**Last Updated**: November 14, 2025
**Version**: v17-mode-switcher
**Purpose**: Complete demo script with queries and expected AI answers for all personas
