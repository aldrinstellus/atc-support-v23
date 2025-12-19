# Cross-Persona Workflow Chains

This document describes realistic workflow chains that span multiple personas in both Government and Project modes, demonstrating how data and actions flow through the V17 Mode Switcher system.

## Government Mode Workflows

### Workflow 1: Contract Deliverable Review & Escalation

**Participants**: COR → Program Manager → Stakeholder Lead

**Scenario**: A vendor submits a deliverable that fails quality review and requires escalation through the government oversight chain.

**Flow**:
1. **COR (Alexa Johnson)** receives notification of deliverable submission
   - Query: "Show pending deliverables requiring review"
   - Widget: `deliverable-review-list`
   - Action: Reviews "Mobile App Beta v2.0" from vendor TechSolutions Inc
   - Finds: Quality score 65% (failing threshold of 75%)
   - Action: Clicks "Request Changes" with notes about UX issues

2. **Program Manager (Jennifer Chen)** gets escalation notification
   - Query: "Critical issues requiring COR attention"
   - Widget: `program-health-dashboard`
   - Sees: Deliverable rejection impacting Project Alpha timeline
   - Action: Assesses budget and schedule impact
   - Query: "Risk analysis for contracts ending soon"
   - Widget: `program-health-dashboard`
   - Decision: Escalates to Stakeholder Lead due to timeline risk

3. **Stakeholder Lead (Jessica Martinez)** receives escalation
   - Query: "Pending change requests requiring approval"
   - Widget: `change-request-dashboard`
   - Sees: Change request for 2-week extension on Project Alpha
   - Query: "Impact analysis for proposed changes"
   - Widget: `requirements-tracking-dashboard`
   - Reviews: User feedback shows critical need for improved UX
   - Action: Approves extension, schedules stakeholder review meeting

**Expected Widget Responses**:
- COR's `deliverable-review-list` shows 8 pending deliverables, 1 with failing quality score
- Program Manager's `program-health-dashboard` shows schedule variance increased to -2 weeks
- Stakeholder Lead's `change-request-dashboard` shows impact on 3 departments, 45 end users affected

---

### Workflow 2: Budget Overrun Detection & Mitigation

**Participants**: COR → Program Manager

**Scenario**: Monthly budget review reveals a contract is trending 15% over budget.

**Flow**:
1. **COR (Alexa Johnson)** performs monthly review
   - Query: "Show budget utilization and projections"
   - Widget: `contract-performance-dashboard`
   - Finds: Contract NAVFAC-2025-089 at 85% budget with 65% timeline complete
   - Projection: Will exceed budget by $340K if trend continues
   - Action: Documents overage in contract performance notes

2. **COR** escalates to Program Manager
   - Query: "Show contracts with budget variance"
   - Widget: `contract-performance-dashboard`
   - Action: Prepares briefing package for Program Manager

3. **Program Manager (Jennifer Chen)** reviews portfolio impact
   - Query: "Budget variance analysis across all projects"
   - Widget: `program-health-dashboard`
   - Sees: NAVFAC overrun impacts 2 other dependent projects
   - Query: "Resource allocation across all projects"
   - Widget: `program-health-dashboard`
   - Action: Reallocates resources from lower-priority Project Charlie
   - Decision: Approves contract modification request for additional $340K

**Expected Widget Responses**:
- COR's `contract-performance-dashboard` shows 92% budget utilization with red warning indicator
- Program Manager's `program-health-dashboard` shows portfolio budget status: $2.4M used of $2.8M total
- Variance chart shows cumulative impact across 5 active projects

---

### Workflow 3: Stakeholder Requirement Change Request Flow

**Participants**: Stakeholder Lead → Program Manager → COR

**Scenario**: Department stakeholders request new reporting feature based on user feedback.

**Flow**:
1. **Stakeholder Lead (Jessica Martinez)** receives user feedback
   - Query: "User feedback received today"
   - Widget: `stakeholder-engagement-dashboard`
   - Sees: 24 feedback submissions requesting custom export feature
   - Query: "Requirements traceability matrix"
   - Widget: `requirements-tracking-dashboard`
   - Finds: No existing requirement for custom exports
   - Action: Creates change request CR-2025-042

2. **Stakeholder Lead** submits change request
   - Query: "Impact of proposed custom export feature"
   - Widget: `change-request-dashboard`
   - Documents: 3 departments, 120 users affected, priority: High
   - Estimated effort: 80 hours development, $45K cost
   - Action: Routes to Program Manager for approval

3. **Program Manager (Jennifer Chen)** reviews change request
   - Query: "Show pending change requests by priority"
   - Widget: `program-health-dashboard`
   - Sees: CR-2025-042 (High priority, $45K cost, 80 hours)
   - Query: "Resource availability for new work"
   - Widget: `program-health-dashboard`
   - Finds: Team capacity available in Sprint 14 (3 weeks out)
   - Action: Approves change request with sprint assignment

4. **COR (Alexa Johnson)** receives contract modification request
   - Query: "Show all contract modifications this quarter"
   - Widget: `contract-performance-dashboard`
   - Reviews: CR-2025-042 requires $45K additional funding
   - Query: "Budget remaining for current contracts"
   - Widget: `contract-performance-dashboard`
   - Finds: $120K remaining in contract NAVFAC-2025-089
   - Action: Approves modification, notifies vendor to begin work

**Expected Widget Responses**:
- Stakeholder Lead's `change-request-dashboard` shows impact: 3 depts, 120 users, $45K cost, 80 hrs
- Program Manager's `program-health-dashboard` shows resource capacity: 200 hrs available in Sprint 14
- COR's `contract-performance-dashboard` shows updated budget: $2.82M total ($120K → $75K remaining)

---

## Project Mode Workflows

### Workflow 4: Sprint Blocker Resolution Chain

**Participants**: Service Team Member → Service Team Lead → Project Manager

**Scenario**: Developer encounters technical blocker that threatens sprint goal.

**Flow**:
1. **Service Team Member (Molly Rivera)** hits blocker
   - Query: "What are my priorities today?"
   - Widget: `task-kanban-board`
   - Working on: USER-456 "Implement OAuth integration"
   - Encounters: Third-party API returns 401 errors despite valid credentials
   - Action: Reports blocker in standup notes

2. **Service Team Member** seeks technical guidance
   - Query: "Search knowledge base for OAuth 401 error solutions"
   - Widget: `knowledge-base-search`
   - Finds: KB-1023 "OAuth 2.0 Troubleshooting Guide"
   - Tries: All documented solutions, still fails
   - Action: Escalates to Service Team Lead

3. **Service Team Lead (Herbert Roberts)** investigates
   - Query: "Active blockers requiring resolution"
   - Widget: `blocker-resolution-dashboard`
   - Sees: USER-456 blocked 8 hours, impact: Sprint goal at risk
   - Query: "Technical spike recommendations"
   - Widget: `code-quality-dashboard`
   - Diagnosis: Third-party API requires additional scope parameter (undocumented)
   - Action: Provides solution to Molly, estimates 4 hours to complete

4. **Service Team Lead** updates Project Manager
   - Query: "Sprint progress with blocker impact"
   - Widget: `sprint-burndown-chart`
   - Assesses: Blocker delayed USER-456 by 8 hours
   - Action: Notifies PM of resolution and revised timeline

5. **Project Manager (Dale Thompson)** reviews sprint impact
   - Query: "Show current sprint progress"
   - Widget: `sprint-burndown-chart`
   - Sees: Sprint burndown now tracking behind ideal by 8 story points
   - Query: "Team capacity for this week"
   - Widget: `resource-capacity-dashboard`
   - Finds: Can recover with 2 team members working 4 hours overtime
   - Action: Approves overtime to keep sprint on track

**Expected Widget Responses**:
- Service Team Member's `task-kanban-board` shows USER-456 in "Blocked" column with red indicator
- Service Team Lead's `blocker-resolution-dashboard` shows 1 active blocker, 8 hrs duration, High priority
- Project Manager's `sprint-burndown-chart` shows actual line 8 points behind ideal line

---

### Workflow 5: Code Quality Issue Escalation

**Participants**: Service Team Member → Service Team Lead

**Scenario**: Automated security scan flags critical vulnerability in developer's code.

**Flow**:
1. **Service Team Member (Molly Rivera)** receives security scan alert
   - Query: "Security scan results for my branch"
   - Widget: `code-quality-dashboard`
   - Sees: Critical vulnerability in dependency package (Log4j)
   - Severity: 9.8 CVSS score, RCE (Remote Code Execution)
   - Action: Immediately notifies Service Team Lead

2. **Service Team Lead (Herbert Roberts)** assesses impact
   - Query: "Critical vulnerabilities in codebase"
   - Widget: `code-quality-dashboard`
   - Finds: Log4j vulnerability affects 12 microservices
   - Query: "Deployment pipeline status"
   - Widget: `deployment-pipeline-dashboard`
   - Checks: Production deployment scheduled in 2 hours
   - Action: Blocks production deployment immediately

3. **Service Team Lead** coordinates remediation
   - Query: "Team workload balance"
   - Widget: `resource-capacity-dashboard`
   - Assigns: 3 developers to upgrade Log4j across all services
   - Estimated effort: 6 hours (2 hours per developer)
   - Action: Creates emergency patch branch

4. **Service Team Member** applies fix
   - Query: "How to upgrade Log4j to patched version"
   - Widget: `knowledge-base-search`
   - Finds: KB-892 "Dependency Upgrade Procedures"
   - Action: Upgrades Log4j from 2.14.1 → 2.17.1 in all affected services

5. **Service Team Lead** verifies fix
   - Query: "Security scan results after patch"
   - Widget: `code-quality-dashboard`
   - Confirms: Vulnerability resolved, all scans pass
   - Query: "Deployment pipeline health"
   - Widget: `deployment-pipeline-dashboard`
   - Action: Approves emergency production deployment

**Expected Widget Responses**:
- Service Team Member's `code-quality-dashboard` shows 1 critical vulnerability, 12 affected files
- Service Team Lead's `deployment-pipeline-dashboard` shows "Blocked" status with manual override option
- Post-fix `code-quality-dashboard` shows 0 vulnerabilities, 100% pass rate

---

### Workflow 6: Client Escalation & Sprint Replanning

**Participants**: Project Manager → Service Team Lead → Service Team Member

**Scenario**: Client reports critical production bug requiring immediate attention mid-sprint.

**Flow**:
1. **Project Manager (Dale Thompson)** receives client escalation
   - Query: "Client escalation tracking"
   - Widget: `sprint-burndown-chart`
   - Receives: Email from client about payment processing failure
   - Severity: Critical (blocking all transactions)
   - Impact: $50K/hour revenue loss

2. **Project Manager** assesses sprint impact
   - Query: "Active blockers requiring resolution"
   - Widget: `blocker-resolution-dashboard`
   - Sees: No blockers currently, team working on planned stories
   - Query: "Team capacity for emergency work"
   - Widget: `resource-capacity-dashboard`
   - Finds: 3 developers available (80% capacity)
   - Action: Pulls 2 developers from planned work

3. **Service Team Lead (Herbert Roberts)** receives assignment
   - Query: "Active incidents assigned to team"
   - Widget: `deployment-pipeline-dashboard`
   - Sees: PROD-2025-089 (Payment processing failure)
   - Query: "Which team members have payment system experience"
   - Widget: `resource-capacity-dashboard`
   - Assigns: Molly Rivera and Tom Chen (both have Stripe integration experience)

4. **Service Team Member (Molly Rivera)** investigates
   - Query: "Search knowledge base for payment processing errors"
   - Widget: `knowledge-base-search`
   - Finds: KB-455 "Stripe Integration Troubleshooting"
   - Query: "Production incident postmortems for payment failures"
   - Widget: `code-quality-dashboard`
   - Reviews: 3 previous incidents, all related to webhook signature validation

5. **Service Team Member** identifies root cause
   - Diagnosis: Stripe rotated webhook signing secret, validation failing
   - Fix: Update signing secret in production environment variables
   - Duration: 30 minutes to fix + deploy
   - Action: Deploys fix, verifies payment processing restored

6. **Project Manager** updates client and sprint plan
   - Query: "Sprint burndown analysis with emergency work impact"
   - Widget: `sprint-burndown-chart`
   - Sees: 16 story points lost due to emergency work (2 developers × 8 hours)
   - Query: "Sprint goal progress"
   - Widget: `sprint-burndown-chart`
   - Decision: Descope 2 low-priority stories to meet sprint commitment
   - Action: Prepares client update: issue resolved, sprint adjusted

**Expected Widget Responses**:
- Project Manager's `blocker-resolution-dashboard` shows 1 production incident, Critical severity
- Service Team Lead's `resource-capacity-dashboard` shows Molly 100% allocated, Tom 100% allocated
- Service Team Member's `knowledge-base-search` returns 5 articles ranked by relevance
- Project Manager's `sprint-burndown-chart` shows updated forecast after 16-point reduction

---

### Workflow 7: Performance Optimization Request

**Participants**: Project Manager → Service Team Lead → Service Team Member

**Scenario**: Client reports slow page load times, requests performance improvements.

**Flow**:
1. **Project Manager (Dale Thompson)** receives client feedback
   - Query: "Client feedback from last review"
   - Widget: `sprint-burndown-chart`
   - Feedback: Dashboard loads in 8-12 seconds (target: <3 seconds)
   - Client priority: High (affects 500 daily users)
   - Action: Creates story PERF-123 "Optimize dashboard load time"

2. **Service Team Lead (Herbert Roberts)** plans investigation
   - Query: "Performance optimization opportunities"
   - Widget: `code-quality-dashboard`
   - Sees: Dashboard makes 47 API calls on load (high waterfall)
   - Query: "Team member with performance tuning experience"
   - Widget: `resource-capacity-dashboard`
   - Assigns: Molly Rivera (React optimization background)
   - Estimated effort: 16 hours (2 days)

3. **Service Team Member (Molly Rivera)** analyzes performance
   - Query: "Performance benchmarks for dashboard page"
   - Widget: `code-quality-dashboard`
   - Finds:
     * 47 sequential API calls (should be batched)
     * No React component memoization
     * Large bundle size (2.4 MB uncompressed)
   - Query: "Best practices for React performance"
   - Widget: `knowledge-base-search`
   - Finds: KB-789 "React Performance Optimization Guide"

4. **Service Team Member** implements optimizations
   - Actions:
     * Batch API calls into 3 requests (47 → 3)
     * Add React.memo to 12 components
     * Enable code splitting with dynamic imports
     * Implement request caching with React Query
   - Testing: Load time reduced from 8-12s → 1.8s (85% improvement)

5. **Service Team Lead** reviews performance impact
   - Query: "Performance benchmarks after optimization"
   - Widget: `code-quality-dashboard`
   - Confirms:
     * Load time: 1.8s (beats 3s target)
     * Bundle size: 2.4 MB → 890 KB (63% reduction)
     * API calls: 47 → 3 (94% reduction)
   - Action: Approves code review, merges to main

6. **Project Manager** communicates results to client
   - Query: "Prepare weekly client status update"
   - Widget: `sprint-burndown-chart`
   - Includes:
     * Performance improvement: 8-12s → 1.8s (85% faster)
     * Exceeds target of <3s
     * Ready for production deployment
   - Action: Schedules client demo for next day

**Expected Widget Responses**:
- Service Team Lead's `code-quality-dashboard` shows performance metrics before/after
- Service Team Member's `knowledge-base-search` returns 8 performance optimization articles
- Project Manager's sprint summary shows PERF-123 completed, client satisfaction score increased

---

## Widget Response Matrix

| Workflow | Starting Persona | Widgets Used | Cross-Persona Transitions | Resolution Time |
|----------|------------------|--------------|---------------------------|-----------------|
| 1. Deliverable Review & Escalation | COR | deliverable-review-list, program-health-dashboard, change-request-dashboard, requirements-tracking-dashboard | COR → PM → Stakeholder | 3-5 days |
| 2. Budget Overrun Detection | COR | contract-performance-dashboard (×2), program-health-dashboard (×2) | COR → PM | 1-2 days |
| 3. Stakeholder Requirement Change | Stakeholder | stakeholder-engagement-dashboard, requirements-tracking-dashboard, change-request-dashboard, program-health-dashboard (×2), contract-performance-dashboard (×2) | Stakeholder → PM → COR | 5-7 days |
| 4. Sprint Blocker Resolution | Service Team Member | task-kanban-board, knowledge-base-search, blocker-resolution-dashboard, code-quality-dashboard, sprint-burndown-chart, resource-capacity-dashboard | Dev → Lead → PM | 8-12 hours |
| 5. Code Quality Issue | Service Team Member | code-quality-dashboard (×3), deployment-pipeline-dashboard (×2), resource-capacity-dashboard, knowledge-base-search | Dev → Lead | 6-8 hours |
| 6. Client Escalation | Project Manager | sprint-burndown-chart (×2), blocker-resolution-dashboard, resource-capacity-dashboard (×2), deployment-pipeline-dashboard, knowledge-base-search, code-quality-dashboard | PM → Lead → Dev | 2-4 hours (critical) |
| 7. Performance Optimization | Project Manager | sprint-burndown-chart (×2), code-quality-dashboard (×3), resource-capacity-dashboard, knowledge-base-search | PM → Lead → Dev | 2-3 days |

---

## Implementation Notes

### Query Detection Requirements

Each workflow scenario requires specific query patterns in `src/lib/query-detection.ts`:

**Government Mode** (functions: `detectCORQuery`, `detectProgramManagerQuery`, `detectStakeholderLeadQuery`):
- Contract performance queries
- Deliverable review queries
- Budget variance queries
- Change request queries
- Requirements tracking queries
- Stakeholder engagement queries

**Project Mode** (functions: `detectProjectManagerQuery`, `detectServiceTeamLeadQuery`, `detectServiceTeamMemberQuery`):
- Sprint progress queries
- Blocker resolution queries
- Code quality queries
- Deployment status queries
- Resource capacity queries
- Performance optimization queries
- Knowledge base search queries

### Widget Data Contracts

Each widget must handle the following data scenarios:

1. **Initial Load**: Show current state based on demo data
2. **Workflow Context**: Reflect changes from cross-persona actions
3. **Error States**: Handle missing or invalid data gracefully
4. **Loading States**: Show skeleton while fetching data

### Testing Scenarios

To test cross-persona workflows:

1. **Manual Testing**: Use persona switcher + Quick Actions
   - Switch to COR → Click "Deliverables Review" → Note failing deliverable
   - Switch to Program Manager → Click "Program Overview" → See impact
   - Switch to Stakeholder Lead → Click "Change Requests" → Review escalation

2. **Automated Testing** (future):
   - E2E tests simulating multi-persona workflows
   - Data flow validation across widgets
   - Performance testing for widget loading chains

### Future Enhancements

1. **Real-Time Updates**: Use WebSocket to push workflow state changes
2. **Notification System**: Alert downstream personas when escalations occur
3. **Workflow History**: Track complete audit trail of cross-persona actions
4. **Analytics Dashboard**: Show workflow completion times and bottlenecks
5. **AI-Suggested Actions**: Recommend next steps based on workflow context

---

**Last Updated**: 2025-11-12
**Version**: 1.0.0 (Phase 6 Demo Scenarios)
