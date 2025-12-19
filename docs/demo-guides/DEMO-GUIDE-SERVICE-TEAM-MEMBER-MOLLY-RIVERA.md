# Demo Preparation Guide: Molly Rivera (Service Team Member - Developer)

**Mode**: Project Mode
**Primary Focus**: Task execution, code quality, and knowledge search
**Demo Duration**: 5-7 minutes per category
**Difficulty**: Beginner-Intermediate

---

## 🎯 Persona Overview

**Who They Are**:
Molly Rivera is a Software Developer completing 3-8 story points per sprint, working on 2-4 tasks simultaneously. Her day involves coding, code reviews, debugging, knowledge base searches, standup meetings, and time tracking. She needs clear priorities, fast access to documentation, and quick blocker resolution.

**What They Care About**:
- Goal 1: Complete 100% of committed story points per sprint (meet commitments)
- Goal 2: Maintain personal code quality above team average (professional growth)
- Goal 3: Reduce time spent searching for documentation from 2 hours to <30 min/week
- Goal 4: Achieve <4 hour first response on code reviews (team collaboration)

**Their Pain Points** (before V17):
- Problem 1: Unclear task priorities - switching between 3-4 tasks daily based on "who asked loudest"
- Problem 2: Time wasted searching for documentation across Confluence, GitHub, Slack, emails (2-3 hours/week)
- Problem 3: Manual time tracking in Jira - often forgotten or inaccurate at end of day

**How V17 Helps**:
V17 provides Molly with AI-powered task prioritization based on sprint goals, not noise. She can ask "What should I work on next?" and get intelligent recommendations. Knowledge base search uses semantic understanding, not keyword matching - finding relevant docs in seconds vs hours. Time tracking happens automatically via Jira integration.

---

## 📋 Top Demo Scenarios

### Scenario 1: Daily Task Prioritization

**Query**: "What are my priorities today?"
**Widget**: `task-kanban-board`
**Shows**: 7 assigned tasks sorted by priority (2 sprint goal tasks at top, 5 supporting tasks below)
**Script**: "V17 shows Molly's 7 assigned tasks intelligently prioritized. The top 2 are sprint goal tasks - if these don't complete, the sprint fails. Below are 5 supporting tasks. Before V17, all 7 tasks looked equally urgent in Jira. Now Molly knows exactly where to focus. Task USER-456 'Implement OAuth integration' is flagged as blocked - she shouldn't start it yet."

### Scenario 2: Knowledge Base Search

**Query**: "Search knowledge base for error solutions"
**Widget**: `knowledge-base-search`
**Shows**: 8 relevant articles for "OAuth 401 error" including troubleshooting guide and code examples
**Script**: "Molly hits an OAuth 401 error. Instead of spending 30 minutes Googling and searching Slack history, she asks V17. The knowledge base search returns 8 relevant articles using semantic search - it understands she needs OAuth troubleshooting, not just articles containing '401'. The top result is a step-by-step guide written by a senior developer who solved this exact issue last month."

### Scenario 3: Code Review Status

**Query**: "Pull requests waiting for review"
**Widget**: `code-quality-dashboard` (my PRs view)
**Shows**: 3 PRs submitted - 1 approved, 1 under review (2 comments), 1 no response (18 hours old)
**Script**: "Molly's PR dashboard shows 3 pull requests. PR #234 is approved and ready to merge. PR #235 has 2 review comments she needs to address. PR #236 has been waiting 18 hours with no response - V17 automatically pinged the assigned reviewer (Herbert) 30 minutes ago. Molly can see exactly what needs her attention vs what's waiting on others."

### Scenario 4: Time Tracking Summary

**Query**: "Time tracking summary for today"
**Widget**: `task-kanban-board` (time view)
**Shows**: 6.5 hours logged across 3 tasks (USER-456: 4hrs, USER-457: 2hrs, CODE-REVIEW: 0.5hrs)
**Script**: "At end of day, Molly checks her time tracking. V17 shows 6.5 hours logged across 3 tasks based on Jira work log integration. She spent 4 hours on USER-456 (OAuth integration), 2 hours on USER-457 (bug fix), and 30 minutes on code reviews. No manual entry needed - V17 aggregated from her Jira activity."

### Scenario 5: Blocker Escalation

**Query**: "Blockers I reported"
**Widget**: `blocker-resolution-dashboard`
**Shows**: 1 blocker reported 4 hours ago, assigned to Herbert (Team Lead), status "In Progress"
**Script**: "Molly reported a blocker on USER-456 four hours ago - OAuth API returns 401 despite valid credentials. She can see Herbert (Team Lead) picked it up 2 hours ago and marked it 'In Progress'. He added a comment: 'API requires additional scope parameter (undocumented) - testing fix now'. Molly has visibility into resolution progress without interrupting Herbert with 'any update?' messages."

---

## 🔗 Cross-Persona Workflows

### Workflow 4: Escalates Blocker to Team Lead
**Role**: Molly hits technical blocker, searches knowledge base, escalates to Herbert
**Flow**: Molly encounters error → Searches KB → No solution → Reports blocker → Herbert diagnoses
**Time**: 8-12 hours total (Molly's work: 1-2 hours)

---

## 🎬 Complete Demo Script (5-7 minutes)

**Opening** (30 seconds):
> "Meet Molly Rivera, Software Developer on an 8-person agile team. Her challenge? Staying focused on the right priorities while finding solutions fast. Before V17, she spent 2-3 hours per week searching for documentation and 30 minutes daily figuring out priorities. Watch the difference..."

**Scenario Sequence** (5 minutes):
1. Task Prioritization (1 min)
2. Knowledge Base Search (1.5 min)
3. Blocker Escalation (1.5 min)
4. Code Review Status (1 min)

**Closing** (30 seconds):
> "Molly reclaimed 2.5 hours per week previously spent on documentation searches and priority confusion. Her code quality score improved from 7.2/10 to 8.6/10. Sprint commitment completion went from 80% to 95%. She's more productive and less frustrated."

---

## 💡 Quick Reference

**Top 5 Queries**:
1. "What are my priorities today?" → `task-kanban-board`
2. "Search knowledge base for error solutions" → `knowledge-base-search`
3. "Pull requests waiting for review" → `code-quality-dashboard` (my PRs)
4. "Blockers I reported" → `blocker-resolution-dashboard`
5. "Time tracking summary for today" → `task-kanban-board` (time view)

**Key Metrics**:
- Documentation search time: 2-3 hours/week → 30 min/week (80% reduction)
- Task prioritization time: 30 min/day → 30 sec/day (98% reduction)
- Sprint commitment completion: 80% → 95% (19% improvement)
- Code quality score: 7.2/10 → 8.6/10 (19% improvement)

---

**Status**: ✅ READY FOR DEMO
