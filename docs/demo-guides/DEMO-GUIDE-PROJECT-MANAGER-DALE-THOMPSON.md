# Demo Preparation Guide: Dale Thompson (Project Manager)

**Mode**: Project Mode
**Primary Focus**: Agile project management, sprint tracking, and team coordination
**Demo Duration**: 5-7 minutes per category
**Difficulty**: Intermediate

---

## 🎯 Persona Overview

**Who They Are**:
Dale Thompson is a Project Manager leading 1-3 agile teams (6-20 developers) delivering software in 2-week sprints. He coordinates sprint planning, tracks velocity, resolves blockers, manages client expectations, and ensures teams hit their sprint goals. His day involves standup facilitation, sprint burndown monitoring, resource allocation, and client status reporting.

**What They Care About**:
- Goal 1: Achieve 85%+ sprint goal completion rate (meet commitments)
- Goal 2: Maintain team velocity within ±10% sprint-to-sprint (predictability)
- Goal 3: Resolve blockers within 8 hours of identification (keep teams unblocked)
- Goal 4: Keep client satisfaction at 4.5/5 or higher (happy clients renew contracts)

**Their Pain Points** (before V17):
- Problem 1: Manual sprint progress tracking across Jira/Azure DevOps requiring 30-45 minutes daily to compile status
- Problem 2: Reactive blocker resolution - often discovered in standup, not proactively
- Problem 3: Client status report preparation takes 2-3 hours per week with manual data compilation

**How V17 Helps**:
V17 provides Dale with real-time sprint dashboards that update automatically from Jira/Azure DevOps. He can ask "Show current sprint progress" and see burndown charts, blockers, and at-risk stories instantly. The AI proactively flags blockers and resource conflicts before standup meetings. Client status reports generate in 30 seconds vs 2-3 hours.

---

## 📋 Top Demo Scenarios

### Scenario 1: Sprint Progress Monitoring

**Query**: "Show current sprint progress"
**Widget**: `sprint-burndown-chart`
**Shows**: Sprint burndown with ideal vs actual lines, 85% complete, 3 stories at risk
**Script**: "Dale can see Sprint 12 is 85% complete with 2 days remaining. The burndown chart shows actual progress slightly behind ideal pace. Three stories are flagged 'at risk' - V17 predicts they won't complete based on remaining hours and developer velocity. This gives Dale a 48-hour runway to descope or extend sprint."

### Scenario 2: Blocker Resolution

**Query**: "Active blockers requiring resolution"
**Widget**: `blocker-resolution-dashboard`
**Shows**: 5 active blockers (2 critical, 3 medium), average age 6 hours
**Script**: "V17 shows 5 active blockers across the team. Two are critical - blocking sprint goal stories. The critical blocker for USER-456 has been open 8 hours, meeting Dale's threshold for escalation. He can see the developer already attempted 2 solutions. Dale assigns a senior developer to pair-program and unblock within 2 hours."

### Scenario 3: Team Capacity Planning

**Query**: "Team capacity for next sprint"
**Widget**: `resource-capacity-dashboard`
**Shows**: 80 story points available, 3 developers on PTO, 1 developer over-allocated at 120%
**Script**: "For Sprint 13 planning, V17 forecasts 80 story points of capacity - down from 100 due to 3 developers on PTO. One developer (Sarah Chen) is over-allocated at 120% across 2 projects. Dale can reallocate Sarah's external commitments or reduce Sprint 13 scope to match realistic capacity."

### Scenario 4: Client Status Update

**Query**: "Prepare weekly client status update"
**Widget**: `sprint-burndown-chart` (client format)
**Shows**: 1-page client summary with accomplishments, risks, and decisions needed
**Script**: "V17 generates a client-ready status report in 30 seconds. It highlights: 12 stories completed this week (3 ahead of plan), 1 risk (integration testing delayed), and 1 decision needed (approve design change for Feature X). Before V17, Dale spent 2-3 hours compiling this from Jira, Slack, and emails."

### Scenario 5: Sprint Retrospective Data

**Query**: "Sprint retrospective action items"
**Widget**: `sprint-burndown-chart` (retrospective view)
**Shows**: 8 action items from last retro, 5 completed, 3 in progress
**Script**: "The retrospective dashboard shows Sprint 11's action items. Five of eight are complete - including 'Reduce story point estimation errors' which improved velocity predictability by 12%. Three remain in progress. Dale can identify if certain action items consistently don't get addressed (signal of deeper issues)."

---

## 🔗 Cross-Persona Workflows

### Workflow 4: Sprint Blocker Resolution Chain
**Role**: Dale receives blocker escalation from Molly (Developer) via Herbert (Team Lead)
**Flow**: Molly hits blocker → Herbert diagnoses → Dale adjusts sprint plan
**Time**: 8-12 hours

### Workflow 6: Client Escalation & Sprint Replanning
**Role**: Dale receives critical client escalation requiring sprint replanning
**Flow**: Client reports P1 bug → Dale pulls resources from planned work → Assigns emergency fix
**Time**: 2-4 hours

---

## 🎬 Complete Demo Script (5-7 minutes)

**Opening** (30 seconds):
> "Meet Dale Thompson, Project Manager for a 12-person agile team. His biggest challenge? Keeping sprints on track while managing client expectations and resolving blockers fast. Before V17, he spent 30-45 minutes daily compiling sprint status. Watch what happens now..."

**Scenario Sequence** (5 minutes):
1. Sprint Progress (1.5 min)
2. Blocker Resolution (1.5 min)
3. Capacity Planning (1 min)
4. Client Status Report (1 min)

**Closing** (30 seconds):
> "Dale reduced status compilation from 45 minutes to 30 seconds daily - 10 hours reclaimed per month. Blocker resolution improved from 24 hours to 8 hours. Sprint goal completion increased from 75% to 88%. Client satisfaction hit 4.7/5."

---

## 💡 Quick Reference

**Top 5 Queries**:
1. "Show current sprint progress" → `sprint-burndown-chart`
2. "Active blockers requiring resolution" → `blocker-resolution-dashboard`
3. "Team capacity for next sprint" → `resource-capacity-dashboard`
4. "Prepare weekly client status update" → `sprint-burndown-chart` (client format)
5. "Which stories are at risk?" → `sprint-burndown-chart` (filtered)

**Key Metrics**:
- Sprint goal completion: 75% → 88% (17% improvement)
- Blocker resolution time: 24 hours → 8 hours (67% reduction)
- Status compilation: 45 min/day → 30 sec/day (99% reduction)
- Client satisfaction: 4.2/5 → 4.7/5

---

**Status**: ✅ READY FOR DEMO
