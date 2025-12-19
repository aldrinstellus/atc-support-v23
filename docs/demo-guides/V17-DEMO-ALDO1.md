# V17 Mode Switcher - Demo Testing Guide (ALDO1)

**Purpose**: Test prompts with expected widget responses for all 6 personas
**Version**: 1.0 (Draft for refinement)
**Date**: 2025-11-12

---

## 🎯 How to Use This Guide

1. **Navigate** to persona demo page (e.g., `/demo/cor`)
2. **Type** the exact query from "Query to Test"
3. **Verify** the expected widget appears
4. **Check** the widget shows expected data points
5. **Note** any discrepancies for refinement

---

## 📋 PERSONA 1: COR - Lynn Burgess (Government Mode)

**Page**: `/demo/cor` or select "COR - Lynn Burgess" from persona switcher

### Test 1.1: Morning Dashboard Check
**Query to Test**:
```
What needs my attention today?
```

**Expected Widget**: `cor-daily-dashboard`

**Expected Content**:
- 2 deliverables requiring review (due within 48 hours)
- 1 contract with budget variance alert (85% spent, 65% complete)
- 3 upcoming milestone deadlines this week
- Risk score indicators (green/yellow/red)

**Pass Criteria**: ✅ Widget renders with at least 2 action items

---

### Test 1.2: Contract Performance Check
**Query to Test**:
```
Show me contract performance for all active projects
```

**Expected Widget**: `contract-performance-dashboard`

**Expected Content**:
- List of 8-10 active contracts
- Budget utilization percentages
- Health scores (green/yellow/red)
- Vendor names linked to each contract
- Status indicators (on-track, at-risk, critical)

**Pass Criteria**: ✅ Shows multiple contracts with health scores

---

### Test 1.3: Deliverable Review
**Query to Test**:
```
Which deliverables are due this month?
```

**Expected Widget**: `deliverable-review-list`

**Expected Content**:
- 12-15 deliverables listed
- Due dates visible
- Quality scores (0-100)
- Status: pending-review, approved, rejected
- Assigned reviewer names
- Some items flagged as overdue (red indicator)

**Pass Criteria**: ✅ Shows deliverables with due dates and statuses

---

### Test 1.4: Vendor Performance
**Query to Test**:
```
Generate vendor performance metrics report
```

**Expected Widget**: `vendor-compliance-dashboard`

**Expected Content**:
- 10-12 vendors listed
- Performance scores (65-98%)
- SLA compliance percentages
- Risk levels (low, medium, high)
- Active contract counts
- Contact information

**Pass Criteria**: ✅ Shows vendors with performance metrics

---

### Test 1.5: Budget Tracking
**Query to Test**:
```
Show budget utilization and projections
```

**Expected Widget**: `contract-performance-dashboard` (budget view)

**Expected Content**:
- Total budget across all contracts
- Amount spent vs allocated
- Budget variance alerts
- Projected burn rate
- Contracts over 85% budget highlighted

**Pass Criteria**: ✅ Shows budget numbers and alerts

---

## 📋 PERSONA 2: Program Manager - Jennifer Chen (Government Mode)

**Page**: `/demo/program-manager`

### Test 2.1: Program Health Overview
**Query to Test**:
```
Show me program health dashboard
```

**Expected Widget**: `program-health-dashboard`

**Expected Content**:
- Multiple programs listed (3-5)
- Overall health scores
- Budget status per program
- Timeline status (on-track/delayed)
- Resource allocation summary
- Top 3 risks per program

**Pass Criteria**: ✅ Shows program-level metrics

---

### Test 2.2: Cross-Program Dependencies
**Query to Test**:
```
What are the cross-program dependencies?
```

**Expected Widget**: `program-dependencies-view` or `program-health-dashboard`

**Expected Content**:
- Dependency map/list
- Blocking relationships
- Critical path items
- Impact analysis
- Mitigation strategies

**Pass Criteria**: ✅ Shows program relationships

---

### Test 2.3: Portfolio Status Report
**Query to Test**:
```
Generate portfolio status report
```

**Expected Widget**: `program-health-dashboard` or `executive-summary`

**Expected Content**:
- High-level portfolio metrics
- Programs: on-track vs at-risk
- Budget rollup across programs
- Resource utilization
- Key milestones upcoming
- Executive summary bullet points

**Pass Criteria**: ✅ Shows portfolio-level view

---

### Test 2.4: Resource Allocation
**Query to Test**:
```
Show resource allocation across programs
```

**Expected Widget**: `resource-capacity-dashboard`

**Expected Content**:
- Team members assigned
- Utilization percentages
- Overallocated resources flagged
- Available capacity
- Skills matrix

**Pass Criteria**: ✅ Shows resource distribution

---

### Test 2.5: Risk Management
**Query to Test**:
```
What are the top program risks?
```

**Expected Widget**: `program-health-dashboard` (risks view)

**Expected Content**:
- Top 5-10 risks listed
- Severity levels (critical, high, medium, low)
- Mitigation strategies
- Risk owners
- Impact assessments
- Probability ratings

**Pass Criteria**: ✅ Shows risks with severities

---

## 📋 PERSONA 3: Stakeholder Lead - Jessica Martinez (Government Mode)

**Page**: `/demo/stakeholder-lead`

### Test 3.1: Requirements Status
**Query to Test**:
```
Show requirements tracking status
```

**Expected Widget**: `requirements-tracking-dashboard`

**Expected Content**:
- 20-30 requirements listed
- Status: approved, pending, rejected, in-review
- Priority levels
- Stakeholder assignments
- Approval workflow status
- Recent changes highlighted

**Pass Criteria**: ✅ Shows requirements with statuses

---

### Test 3.2: Change Requests
**Query to Test**:
```
What are the pending change requests?
```

**Expected Widget**: `change-request-dashboard`

**Expected Content**:
- 5-8 change requests
- Status: draft, submitted, under-review, approved, rejected
- Impact analysis (cost, schedule, scope)
- Approval chain progress
- Submitter and reviewers
- Priority indicators

**Pass Criteria**: ✅ Shows change requests with approval status

---

### Test 3.3: Stakeholder Engagement
**Query to Test**:
```
Show stakeholder engagement metrics
```

**Expected Widget**: `stakeholder-engagement-dashboard`

**Expected Content**:
- List of stakeholders (8-12)
- Engagement scores
- Meeting attendance rates
- Communication frequency
- Satisfaction ratings
- Action items per stakeholder

**Pass Criteria**: ✅ Shows stakeholder metrics

---

### Test 3.4: Decision Log
**Query to Test**:
```
Show recent decisions and approvals
```

**Expected Widget**: `decision-log` or `change-request-dashboard`

**Expected Content**:
- 10-15 recent decisions
- Decision dates
- Decision makers
- Impact levels
- Implementation status
- Related requirements/CRs

**Pass Criteria**: ✅ Shows decision history

---

### Test 3.5: Requirements Coverage
**Query to Test**:
```
What's the requirements coverage status?
```

**Expected Widget**: `requirements-tracking-dashboard` (coverage view)

**Expected Content**:
- Total requirements count
- Coverage percentage
- Uncovered requirements flagged
- Traceability matrix
- Gaps identified
- Completion forecast

**Pass Criteria**: ✅ Shows coverage metrics

---

## 📋 PERSONA 4: Project Manager - Dale Thompson (Project Mode)

**Page**: `/demo/project-manager`

### Test 4.1: Sprint Overview
**Query to Test**:
```
Show me current sprint status
```

**Expected Widget**: `sprint-burndown-dashboard`

**Expected Content**:
- Sprint name (e.g., "Sprint 12")
- Sprint goal
- Start and end dates
- Burndown chart (ideal vs actual)
- Current velocity
- Days remaining
- Completion forecast

**Pass Criteria**: ✅ Shows sprint burndown chart

---

### Test 4.2: Team Velocity
**Query to Test**:
```
What's our team velocity trend?
```

**Expected Widget**: `team-velocity-dashboard`

**Expected Content**:
- Last 6 sprints shown
- Committed vs completed story points
- Average velocity calculated
- Trend line (improving/stable/declining)
- Predictability percentage
- Velocity chart visualization

**Pass Criteria**: ✅ Shows velocity over time

---

### Test 4.3: Task Status
**Query to Test**:
```
What are my priorities today?
```

**Expected Widget**: `task-kanban-board`

**Expected Content**:
- 4 columns: To Do, In Progress, Review, Done
- 15-25 tasks total
- Sprint goal displayed
- Sprint progress bar
- Task priorities visible
- Blocked tasks flagged
- Assignee names on cards

**Pass Criteria**: ✅ Shows kanban board with tasks

---

### Test 4.4: Sprint Health
**Query to Test**:
```
Show sprint health dashboard
```

**Expected Widget**: `sprint-burndown-dashboard` or `team-velocity-dashboard`

**Expected Content**:
- Sprint progress percentage
- On-track vs at-risk indicator
- Blocker count
- Velocity comparison (current vs average)
- Completion forecast
- Risk factors listed

**Pass Criteria**: ✅ Shows sprint health metrics

---

### Test 4.5: Blocker Tracking
**Query to Test**:
```
Show me current blockers
```

**Expected Widget**: `blocker-resolution-dashboard`

**Expected Content**:
- 3-5 active blockers
- Blocked tasks listed
- Time blocked (hours/days)
- Assigned resolver
- Resolution status
- Impact assessment
- Priority levels

**Pass Criteria**: ✅ Shows blockers with status

---

## 📋 PERSONA 5: Service Team Lead - Herbert Roberts (Project Mode)

**Page**: `/demo/service-team-lead`

### Test 5.1: Code Quality Metrics
**Query to Test**:
```
Show quality metrics by sprint
```

**Expected Widget**: `code-quality-dashboard`

**Expected Content**:
- Test coverage: 87%
- Code smells count: 45
- Technical debt: 15-30 hours
- Security issues: 0-5
- Trends over 6 months
- Recent PRs listed (5+)
- Quality gates status

**Pass Criteria**: ✅ Shows code quality metrics

---

### Test 5.2: Code Review Backlog
**Query to Test**:
```
Show pending code reviews requiring approval
```

**Expected Widget**: `code-quality-dashboard` (PR view)

**Expected Content**:
- 5-8 pending PRs
- PR age (hours/days)
- SLA status (on-time/overdue)
- Authors listed
- Review status
- Lines changed
- Average review time displayed

**Pass Criteria**: ✅ Shows PR list with review status

---

### Test 5.3: Deployment Pipeline
**Query to Test**:
```
Show deployment pipeline health
```

**Expected Widget**: `deployment-pipeline-dashboard`

**Expected Content**:
- Recent deployments (10-15)
- Success vs failure count
- Success rate percentage (92-95%)
- Rollback count
- Pipeline stages
- Deployment duration
- Environment status

**Pass Criteria**: ✅ Shows deployment history

---

### Test 5.4: Technical Debt
**Query to Test**:
```
Show refactoring backlog prioritization
```

**Expected Widget**: `code-quality-dashboard` (tech debt view)

**Expected Content**:
- 40-50 technical debt items
- Estimated cost in hours/days
- Priority ranking
- Business impact scores
- Assigned owners
- Target sprint for fix
- Top 5 items highlighted

**Pass Criteria**: ✅ Shows tech debt prioritized

---

### Test 5.5: Team Performance
**Query to Test**:
```
Show team performance trends
```

**Expected Widget**: `code-quality-dashboard` (team metrics)

**Expected Content**:
- Velocity trend (last 6 sprints)
- Bug introduction rate
- Code review quality scores
- PR merge time average
- Team metrics comparison
- Improvement trends

**Pass Criteria**: ✅ Shows team performance data

---

## 📋 PERSONA 6: Service Team Member - Molly Rivera (Project Mode)

**Page**: `/demo/service-team-member`

### Test 6.1: Daily Priorities
**Query to Test**:
```
What are my priorities today?
```

**Expected Widget**: `task-kanban-board`

**Expected Content**:
- 5-7 tasks assigned to Molly
- Prioritized by sprint goal
- Top 2 tasks are sprint-critical
- Status per task (todo, in-progress, review, done)
- Blocked tasks flagged
- Story points visible
- Sprint progress shown

**Pass Criteria**: ✅ Shows prioritized task list

---

### Test 6.2: Knowledge Base Search
**Query to Test**:
```
Search knowledge base for error solutions
```

**Expected Widget**: `knowledge-base-search`

**Expected Content**:
- 8-10 relevant articles
- Article titles
- Relevance scores
- View counts
- Last updated dates
- Categories/tags
- Quick preview/summary
- Search for "OAuth 401 error" example

**Pass Criteria**: ✅ Shows KB search results

---

### Test 6.3: Pull Request Status
**Query to Test**:
```
Pull requests waiting for review
```

**Expected Widget**: `code-quality-dashboard` (my PRs view)

**Expected Content**:
- 3-4 PRs submitted by Molly
- PR status: approved, under-review, no-response
- Time since submission
- Reviewer names
- Comment counts
- Approval status
- Merge readiness

**Pass Criteria**: ✅ Shows user's PRs with status

---

### Test 6.4: Time Tracking
**Query to Test**:
```
Time tracking summary for today
```

**Expected Widget**: `task-kanban-board` (time view)

**Expected Content**:
- 6-7 hours total logged
- Time breakdown by task
- Task IDs and names
- Time spent per task
- Total daily hours
- Integration with Jira work logs

**Pass Criteria**: ✅ Shows time breakdown

---

### Test 6.5: Blocker Escalation
**Query to Test**:
```
Blockers I reported
```

**Expected Widget**: `blocker-resolution-dashboard`

**Expected Content**:
- 1-2 blockers reported
- Blocker age (hours since report)
- Assigned resolver (Herbert)
- Resolution status
- Progress comments
- Estimated resolution time
- Impact on tasks

**Pass Criteria**: ✅ Shows reported blockers

---

## 🔍 Cross-Persona Workflow Tests

### Workflow Test 1: Contract → Deliverable → Vendor Chain

**Step 1** (COR):
```
Show contract CONT-423 status
```
**Expected**: Contract details with vendor info

**Step 2** (COR):
```
Show deliverables for contract CONT-423
```
**Expected**: List of deliverables linked to that contract

**Step 3** (COR):
```
Show vendor performance for [vendor from contract]
```
**Expected**: Vendor metrics and SLA compliance

**Pass Criteria**: ✅ Data flows between queries with consistent IDs

---

### Workflow Test 2: Sprint → Task → Blocker Chain

**Step 1** (Project Manager):
```
Show current sprint status
```
**Expected**: Sprint 12 overview

**Step 2** (Team Member):
```
What are my priorities today?
```
**Expected**: Tasks from Sprint 12

**Step 3** (Team Member):
```
Show blockers for task TASK-456
```
**Expected**: Blocker details with resolver

**Pass Criteria**: ✅ Sprint tasks flow to individual assignments

---

### Workflow Test 3: Requirements → Change Request Chain

**Step 1** (Stakeholder Lead):
```
Show requirements tracking status
```
**Expected**: List of requirements

**Step 2** (Stakeholder Lead):
```
Show change requests affecting requirement REQ-789
```
**Expected**: Related change requests

**Pass Criteria**: ✅ Requirements link to change requests

---

## 📊 Data Consistency Checks

### Check 1: User Names Consistency
- Verify same user names appear across widgets
- Check faker.js generated names are realistic
- Ensure no "User 1", "User 2" placeholders

### Check 2: Date Consistency
- Sprint dates should be 14-day intervals
- Deliverable due dates should be in future or past (realistic)
- Historical metrics should go back 6 months

### Check 3: Relationship Integrity
- Contracts should link to valid vendors
- Deliverables should link to valid contracts
- Tasks should link to valid sprints
- All foreign keys should resolve

### Check 4: Metrics Realism
- Budget percentages should be 0-100%
- Velocity should be positive integers
- Test coverage should be 0-100%
- Performance scores should be 0-100

---

## 🎨 Visual/UI Checks

### Check 1: Demo Mode Indicator
- ✅ Visible in bottom-right corner
- ✅ Shows "DEMO MODE" badge
- ✅ Event counter increases
- ✅ Pause/resume button works
- ✅ Ctrl+D toggles visibility

### Check 2: Auto-Refresh Behavior
- ✅ Widgets refresh every 10-30 seconds
- ✅ Loading spinner shows during refresh
- ✅ Last updated timestamp updates
- ✅ No screen flicker on refresh

### Check 3: Animations
- ✅ Widgets fade in on load
- ✅ Values pulse when changing
- ✅ Smooth transitions between states
- ✅ Loading skeletons on initial load only

### Check 4: Responsive Layout
- ✅ Widgets stack properly on mobile
- ✅ Text remains readable
- ✅ Charts resize appropriately

---

## 🐛 Known Issues to Document

### Issue 1: [To be filled during testing]
**Description**:
**Steps to Reproduce**:
**Expected**:
**Actual**:
**Severity**: Critical / High / Medium / Low

### Issue 2: [To be filled during testing]
**Description**:
**Steps to Reproduce**:
**Expected**:
**Actual**:
**Severity**: Critical / High / Medium / Low

---

## 📝 Testing Notes Template

**Tester**: [Your Name]
**Date**: [Test Date]
**Version**: V17 ALDO1
**Environment**: Dev Server (localhost:3018)

### Persona 1 (COR) - Testing Results
| Test # | Query | Widget Rendered? | Data Correct? | Issues? |
|--------|-------|------------------|---------------|---------|
| 1.1 | What needs my attention today? | ☐ Yes ☐ No | ☐ Yes ☐ No | |
| 1.2 | Show me contract performance | ☐ Yes ☐ No | ☐ Yes ☐ No | |
| 1.3 | Which deliverables are due? | ☐ Yes ☐ No | ☐ Yes ☐ No | |
| 1.4 | Generate vendor performance | ☐ Yes ☐ No | ☐ Yes ☐ No | |
| 1.5 | Show budget utilization | ☐ Yes ☐ No | ☐ Yes ☐ No | |

**Overall Pass Rate**: __/5 tests passed

**Notes**:


---

## 🎯 Refinement Action Items

### Priority 1: Fix Broken Tests
- [ ] List tests that failed
- [ ] Identify root cause (query detection, widget logic, data issue)
- [ ] Create fix plan

### Priority 2: Improve Query Detection
- [ ] Add alternative phrasings for queries
- [ ] Test natural language variations
- [ ] Update query-detection.ts patterns

### Priority 3: Enhance Widget Data
- [ ] Add missing data points
- [ ] Fix incorrect calculations
- [ ] Improve realism of mock data

### Priority 4: Update Documentation
- [ ] Refine queries based on testing
- [ ] Add screenshots to guide
- [ ] Document edge cases

---

## 🚀 Next Steps After Testing

1. **Document all issues** found during testing
2. **Prioritize fixes** (critical → high → medium → low)
3. **Refine queries** that don't work as expected
4. **Update widget logic** if needed
5. **Re-test** after fixes
6. **Create V17-DEMO-ALDO2.md** with refined queries

---

**Status**: ✅ DRAFT COMPLETE - Ready for Testing

**Instructions**: Test each query, document results, identify issues for refinement in ALDO2 version.
