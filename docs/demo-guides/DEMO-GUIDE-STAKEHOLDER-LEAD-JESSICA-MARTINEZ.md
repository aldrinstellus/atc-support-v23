# Demo Preparation Guide: Jessica Martinez (Stakeholder Lead)

**Mode**: Government Mode
**Primary Focus**: Requirements management, change control, and stakeholder communication
**Demo Duration**: 5-7 minutes per scenario category
**Difficulty**: Intermediate

---

## 🎯 Persona Overview

**Who They Are**:
Jessica Martinez is the Department Stakeholder Lead managing 50-150 requirements across 12-20 stakeholders. She bridges business needs and technical implementation, ensuring requirements are captured accurately, change requests are properly evaluated, and stakeholder expectations are managed proactively. Her day involves triaging change requests, analyzing impact, coordinating approvals, and maintaining requirements traceability.

**What They Care About**:
- Goal 1: Maintain 95%+ requirements coverage (zero critical requirements missed in releases)
- Goal 2: Reduce change request approval time from 5-7 days to 2-3 days
- Goal 3: Improve stakeholder satisfaction from 3.5/5 to 4.5/5 through proactive communication
- Goal 4: Achieve 80%+ user adoption within 90 days of deployment

**Their Pain Points** (before V17):
- Problem 1: Requirements tracked in fragmented spreadsheets across SharePoint, emails, and meeting notes - no single source of truth
- Problem 2: Change impact analysis takes 3-4 hours per request across multiple systems and manual dependency mapping
- Problem 3: Stakeholder feedback scattered across 6 communication channels (email, Slack, surveys, meetings) with no aggregation

**How V17 Helps**:
V17 provides Jessica with unified change request management and requirements tracking in real-time. She can ask "Show pending change requests" and instantly see all requests with approval status, impact analysis, and stakeholder sentiment. The AI automates impact analysis by analyzing system dependencies, reducing her analysis time from hours to minutes. Stakeholder engagement tracking ensures no feedback falls through the cracks.

---

## 📋 Demo Scenario: Daily Operations

**Setup** (what to say before demo):
> "Jessica starts her morning by checking what change requests need her attention and which stakeholders require follow-up. Before V17, this meant checking 6 different systems. Now watch what happens in seconds..."

---

### Scenario 1.1: Morning Priority Check

**Query to Type**:
```
"What needs my attention today?"
```

**Expected Widget**: `change-request-dashboard`

**What the Widget Shows**:
- Data Point 1: 3 change requests requiring approval (2 high priority, 1 medium)
- Data Point 2: 2 stakeholders flagged as "low engagement" (no response in 2+ weeks)
- Data Point 3: 5 requirements at risk of missing sprint deadline
- Key Insight: AI prioritizes by business impact and urgency, not chronological order

**Presenter Script**:
> "V17 immediately shows Jessica her top priorities. Three change requests need her approval today - two are high priority impacting production deployments. Two stakeholders haven't responded to communications in 2+ weeks, signaling potential disengagement that could lead to surprises later. And five requirements are at risk of missing the sprint deadline, requiring coordination with the project team. This replaces checking 6 systems manually."

**Follow-Up Questions**:
1. Q: "How does V17 determine what's 'high priority' for change requests?"
   A: "V17 uses configurable scoring based on: production impact, number of affected users, regulatory requirements, and sponsor urgency. Jessica can adjust weights per agency policy."

2. Q: "What's the expected action for 'low engagement' stakeholders?"
   A: "Jessica can initiate outreach directly from the dashboard - schedule a meeting, send a reminder email, or escalate to their manager if needed. It's early warning, not accusation."

**Demo Tips**:
- ✅ DO: Emphasize the proactive nature - catching issues before they escalate
- ❌ DON'T: Imply V17 makes decisions for Jessica - she's empowered, not replaced

---

### Scenario 1.2: Pending Change Requests

**Query to Type**:
```
"Pending change requests requiring approval"
```

**Expected Widget**: `change-request-dashboard` (filtered view)

**What the Widget Shows**:
- Data Point 1: 7 pending change requests sorted by priority (3 high, 2 medium, 2 low)
- Data Point 2: Approval workflow status per request (stakeholder approvals, technical review)
- Data Point 3: Days pending (3 requests >5 days, at risk of SLA breach)
- Key Insight: Visual workflow shows bottlenecks in approval chain

**Presenter Script**:
> "The change request queue shows 7 pending requests. Three high-priority requests need Jessica's approval, but notice the approval workflow status - two are stuck waiting for technical review from the development team for 6 days. Jessica can identify this bottleneck and follow up directly with the team lead. Without V17, she wouldn't know where the delay was occurring until someone escalated."

**Follow-Up Questions**:
1. Q: "Can Jessica approve requests directly from this interface?"
   A: "Yes - she can review details, add comments, and approve/reject with a single click. V17 routes the approval to the next step in the workflow automatically."

2. Q: "What happens if she rejects a change request?"
   A: "V17 notifies the requester with Jessica's rejection reason, logs the decision for audit trail, and can suggest alternative approaches based on similar past requests."

**Demo Tips**:
- ✅ DO: Show how workflow visualization reveals process bottlenecks
- ❌ DON'T: Skip the audit trail importance for government stakeholders

---

## 📋 Demo Scenario: Requirements Management

**Setup** (what to say before demo):
> "Managing 50-150 requirements across multiple sprints is Jessica's core responsibility. Let's see how V17 gives her complete visibility and traceability..."

---

### Scenario 2.1: Requirements Status Tracking

**Query to Type**:
```
"Show requirements status for current sprint"
```

**Expected Widget**: `requirements-tracking-dashboard`

**What the Widget Shows**:
- Data Point 1: 42 requirements in current sprint (35 complete, 5 in progress, 2 not started)
- Data Point 2: Completion rate: 83% (above target of 80%)
- Data Point 3: 2 requirements flagged "at risk" due to dependency on blocked tasks
- Key Insight: Real-time progress vs static status reports updated weekly

**Presenter Script**:
> "The requirements tracking dashboard shows Jessica's current sprint has 42 requirements with 83% completion - above the 80% target. But the real value is the early warning on the 2 at-risk requirements. These depend on tasks currently blocked by technical issues. Jessica can proactively work with the project manager to descope or defer these requirements rather than discovering the miss on sprint review day."

**Follow-Up Questions**:
1. Q: "How does V17 determine if a requirement is 'at risk'?"
   A: "V17 analyzes task dependencies, developer velocity, and remaining sprint days. If a requirement's linked tasks are blocked or behind schedule with <3 days remaining, it's flagged as at-risk."

2. Q: "Can she see requirements traceability - design to test?"
   A: "Yes - clicking any requirement opens the traceability matrix showing: user story → design doc → implementation tickets → test cases → test results. Full end-to-end visibility."

**Demo Tips**:
- ✅ DO: Highlight proactive risk detection - "know 3 days early, not on delivery day"
- ❌ DON'T: Claim 100% prediction accuracy - it's probabilistic forecasting

---

### Scenario 2.2: Requirements Coverage Gaps

**Query to Type**:
```
"Coverage gaps in requirement testing"
```

**Expected Widget**: `requirements-tracking-dashboard` (test coverage view)

**What the Widget Shows**:
- Data Point 1: Overall test coverage: 89% (target: 95%)
- Data Point 2: 8 requirements with <80% test coverage (red flag)
- Data Point 3: 3 requirements with zero test cases (critical gap)
- Key Insight: Catch quality gaps before production deployment

**Presenter Script**:
> "Test coverage analysis shows Jessica's requirements are at 89% coverage overall - close to the 95% target. But drilling down reveals 8 requirements below 80% coverage, and critically, 3 requirements with ZERO test cases. These are typically edge cases or late-added requirements that slipped through. Jessica can flag these for the QA team before sprint review, preventing untested code from reaching production."

**Follow-Up Questions**:
1. Q: "Does V17 automatically flag requirements without test cases?"
   A: "Yes - requirements in 'Ready for Test' status with zero linked test cases trigger automatic alerts to Jessica and the QA lead."

2. Q: "Can she enforce a test coverage policy - like 'no deployment <95% coverage'?"
   A: "Absolutely - V17 supports quality gates. Jessica can configure rules like 'block deployment if any requirement has <80% coverage' which integrates with CI/CD pipelines."

**Demo Tips**:
- ✅ DO: Emphasize prevention - "catch quality gaps pre-deployment, not post-incident"
- ❌ DON'T: Oversell automation - QA teams still write test cases, V17 tracks coverage

---

## 📋 Demo Scenario: Change Management

**Setup** (what to say before demo):
> "Change requests are constant in government projects. Jessica needs to quickly assess impact and coordinate approvals across multiple stakeholders..."

---

### Scenario 3.1: Impact Analysis for Change Requests

**Query to Type**:
```
"Impact analysis for proposed changes"
```

**Expected Widget**: `change-request-dashboard` (impact view)

**What the Widget Shows**:
- Data Point 1: 3 change requests with system-wide impact analysis
- Data Point 2: Change #1: Impacts 4 modules, 12 requirements, 2 sprints (medium risk)
- Data Point 3: Change #2: Impacts database schema, 8 APIs, 3 teams (high risk)
- Key Insight: AI maps technical dependencies Jessica wouldn't manually discover

**Presenter Script**:
> "When Jessica reviews change requests, V17 automatically performs impact analysis. Change Request #1 looks simple - update a form field label - but V17 reveals it actually impacts 4 modules, 12 existing requirements, and would affect 2 sprints' worth of work. Change Request #2 to 'add customer birthdate field' seems minor, but it requires database schema changes affecting 8 APIs and requiring coordination across 3 teams. This analysis would take Jessica 3-4 hours manually; V17 does it instantly."

**Follow-Up Questions**:
1. Q: "How does V17 know the technical dependencies?"
   A: "V17 integrates with your code repository, database schema, and API documentation. It traces dependencies through code analysis and historical change patterns. It's not perfect - Jessica can add manual dependencies V17 missed."

2. Q: "Can she compare multiple change requests to see conflicts?"
   A: "Yes - if two change requests modify the same module or database table, V17 flags the conflict and suggests sequencing or merging the changes."

**Demo Tips**:
- ✅ DO: Show a real example where "simple change" has complex dependencies
- ❌ DON'T: Claim V17 catches 100% of dependencies - position as "catches 80-90%, Jessica reviews"

---

### Scenario 3.2: Stakeholder Approval Coordination

**Query to Type**:
```
"Stakeholder approval status"
```

**Expected Widget**: `change-request-dashboard` (approval workflow)

**What the Widget Shows**:
- Data Point 1: Change Request #1: 3/5 approvals received (COR ✓, PM ✓, Tech Lead ✓, Sponsor pending, Security pending)
- Data Point 2: Average approval time: 4.2 days (target: <3 days)
- Data Point 3: 2 approvers haven't responded in 5+ days (auto-reminder sent)
- Key Insight: Visual workflow prevents "silent approvals" that delay projects

**Presenter Script**:
> "The approval workflow shows Change Request #1 has received 3 of 5 required approvals. The sponsor and security team haven't responded in 5 days - V17 automatically sent reminder notifications. Jessica can see the average approval time is 4.2 days, slightly above the 3-day target. She can identify which approvers consistently delay (perhaps they need training or delegation authority) and address process bottlenecks."

**Follow-Up Questions**:
1. Q: "Can Jessica escalate approvals if they're overdue?"
   A: "Yes - she can click 'Escalate to Manager' which sends a notification to the approver's supervisor with context and urgency. This is logged for audit trail."

2. Q: "What if an approver is on leave?"
   A: "V17 can route to their designated delegate automatically. Jessica configures delegation rules during onboarding (e.g., 'If sponsor unavailable, route to deputy director')."

**Demo Tips**:
- ✅ DO: Highlight accountability - "no more 'I never saw that email' excuses"
- ❌ DON'T: Make it sound like micromanagement - it's process visibility

---

## 📋 Demo Scenario: Stakeholder Communication

**Setup** (what to say before demo):
> "Managing 12-20 stakeholders requires constant communication. Jessica uses V17 to track engagement and ensure no stakeholder feels ignored..."

---

### Scenario 4.1: Stakeholder Engagement Tracking

**Query to Type**:
```
"Stakeholder engagement summary"
```

**Expected Widget**: `stakeholder-engagement-dashboard`

**What the Widget Shows**:
- Data Point 1: 18 stakeholders tracked with engagement scores (High: 12, Medium: 4, Low: 2)
- Data Point 2: Low-engagement stakeholders: Director Smith (last contact 18 days ago), Manager Jones (missed 3 meetings)
- Data Point 3: Upcoming touchpoints: 5 meetings scheduled this week
- Key Insight: Proactive relationship management prevents surprise escalations

**Presenter Script**:
> "Jessica's stakeholder dashboard tracks 18 stakeholders with engagement scoring. Two are flagged as 'low engagement' - Director Smith hasn't been in contact for 18 days, and Manager Jones missed the last 3 status meetings. This is an early warning system. In government projects, low stakeholder engagement often precedes major issues - they're disengaged because they're unhappy or confused. Jessica can proactively reach out before small issues become congressional inquiries."

**Follow-Up Questions**:
1. Q: "Isn't this just tracking who responds to emails?"
   A: "It's more nuanced. V17 tracks: meeting attendance, email response rate, action item completion, feedback submission, and time since last meaningful interaction. High engagement means active participation, not just inbox presence."

2. Q: "What if a stakeholder prefers phone calls over email?"
   A: "Jessica can log phone calls and in-person meetings manually. V17 gives her flexibility - it's about capturing engagement, not forcing a communication method."

**Demo Tips**:
- ✅ DO: Frame as relationship management, not surveillance
- ❌ DON'T: Oversimplify - stakeholder engagement is nuanced

---

### Scenario 4.2: User Feedback Aggregation

**Query to Type**:
```
"User feedback received today"
```

**Expected Widget**: `stakeholder-engagement-dashboard` (feedback view)

**What the Widget Shows**:
- Data Point 1: 8 feedback items received today (5 via email, 2 via survey, 1 via meeting notes)
- Data Point 2: Sentiment analysis: 3 positive, 3 neutral, 2 negative
- Data Point 3: Common themes: "Login issues" (3 mentions), "Report performance slow" (2 mentions)
- Key Insight: AI identifies patterns across fragmented feedback channels

**Presenter Script**:
> "Today Jessica received 8 pieces of user feedback across 3 channels - email, surveys, and meeting notes. V17 aggregates all of this in one view with sentiment analysis. Three pieces are positive, three neutral, and two negative. More importantly, V17 identifies themes: 'Login issues' mentioned 3 times and 'Report performance slow' mentioned twice. These aren't individual complaints - they're systemic issues requiring action. Jessica can create a change request directly from this feedback."

**Follow-Up Questions**:
1. Q: "How accurate is the sentiment analysis?"
   A: "V17's NLP is ~85% accurate on sentiment. Jessica can correct misclassifications, and V17 learns from her corrections. For example, 'This change is critical' might be classified as negative (due to 'critical') but Jessica can reclassify as positive-urgent."

2. Q: "Can she respond to feedback directly from V17?"
   A: "Yes - she can draft responses, assign follow-up tasks, or link feedback to existing change requests. The goal is to close the feedback loop so users know they were heard."

**Demo Tips**:
- ✅ DO: Show how fragmented feedback becomes actionable intelligence
- ❌ DON'T: Claim perfect sentiment analysis - acknowledge ~15% error rate

---

## 🔗 Cross-Persona Workflows

**Jessica Martinez** participates in these collaboration workflows:

### Workflow 1: Receives Escalation from Program Manager

**Your Role**: Jennifer (Program Manager) escalates a failed deliverable that requires stakeholder approval for timeline extension.

**Demo Flow**:
1. **Setup**: "Jennifer escalates a 2-week timeline slip due to vendor delay. She needs Jessica to coordinate stakeholder approval for the extension."
2. **Your Query**: "Show pending change requests requiring approval"
3. **What Happens**: Dashboard shows Change Request #47: "Timeline Extension - Project Alpha (2 weeks)". Jessica can see impact analysis (affects 3 downstream projects) and required approvals (sponsor, COR, deputy director).
4. **Your Action**: Jessica reviews stakeholder sentiment (2 stakeholders already expressed concern about delays), drafts communication explaining vendor delay and mitigation plan, coordinates approvals.

**Time**: 4-5 minutes

---

### Workflow 3: Stakeholder-Initiated Change Request

**Your Role**: Jessica receives user feedback requesting new feature, evaluates feasibility, and routes to Program Manager and COR for approval.

**Demo Flow**:
1. **Setup**: "Multiple users request a new feature: 'Bulk approval for low-risk change requests'. Jessica evaluates impact and initiates change request workflow."
2. **Your Query**: "User feedback on recent deployments"
3. **What Happens**: V17 shows 5 users requested bulk approval feature. Jessica creates change request, V17 performs impact analysis (medium complexity, 2-sprint effort, no system-wide dependencies).
4. **Your Action**: Jessica routes change request to Jennifer (PM) for resource planning and Alexa (COR) for budget approval.
5. **Handoff**: Jennifer assesses team capacity, Alexa approves $50K budget allocation.

**Time**: 5-7 minutes

---

## 🎬 Complete Demo Script (5-7 minutes)

**Opening** (30 seconds):
> "Meet Jessica Martinez, Stakeholder Lead managing 150 requirements across 18 stakeholders. Her biggest challenge? Fragmented data across 6 systems and 3-4 hours spent on change impact analysis. Let's see how V17 transforms her workday..."

**Scenario Sequence** (5-6 minutes):
1. **Daily Operations**: "What needs my attention today?" (1 min)
2. **Requirements Tracking**: "Show requirements status for current sprint" (1.5 min)
3. **Change Impact Analysis**: "Impact analysis for proposed changes" (1.5 min)
4. **Stakeholder Engagement**: "Stakeholder engagement summary" (1.5 min)

**Closing** (30 seconds):
> "V17 transformed Jessica from data compiler to strategic stakeholder manager. She reduced change request approval time from 5-7 days to 2-3 days. Stakeholder satisfaction improved from 3.5/5 to 4.5/5. Most importantly, she can proactively manage relationships before issues escalate."

---

## 💡 Presentation Tips

**Audience-Specific Messaging**:

| Audience | Emphasize | Avoid |
|----------|-----------|-------|
| **Executives** | Stakeholder satisfaction improvement, approval time reduction | Technical details about NLP |
| **End Users (Stakeholders)** | Faster response to feedback, transparent approval processes | Process complexity |
| **Technical (IT)** | Integration with existing tools, traceability matrix | Business value alone |

**Common Questions & Answers**:

**Q1**: "Does V17 replace our requirements management tool (Jira, Azure DevOps)?"
**A**: "No - V17 integrates WITH those tools. Stakeholders and developers still use Jira for detailed requirements and tasks. V17 provides the stakeholder-friendly view above those systems with impact analysis and approval workflows."

**Q2**: "How does V17 handle confidential or sensitive change requests?"
**A**: "V17 supports role-based access control. Jessica can mark change requests as 'Restricted' which limits visibility to authorized stakeholders only. All access is logged for audit compliance."

**Q3**: "What if stakeholders don't want to use another tool?"
**A**: "V17 meets stakeholders where they are. They can submit feedback via email, and V17 ingests it automatically. They can approve change requests via email link without logging into V17. Jessica is the primary user; stakeholders interact minimally."

---

## 🚀 Quick Reference

**Top 5 Queries for This Persona**:
1. "What needs my attention today?" → `change-request-dashboard` (Daily Operations)
2. "Pending change requests requiring approval" → `change-request-dashboard` (Change Management)
3. "Show requirements status for current sprint" → `requirements-tracking-dashboard` (Requirements Management)
4. "Impact analysis for proposed changes" → `change-request-dashboard` (Change Management)
5. "Stakeholder engagement summary" → `stakeholder-engagement-dashboard` (Stakeholder Communication)

**Key Metrics to Highlight**:
- Change request approval time: 5-7 days → 2-3 days (57% reduction)
- Stakeholder satisfaction: 3.5/5 → 4.5/5 (29% improvement)
- Impact analysis time: 3-4 hours → 30 seconds (99% reduction)
- Requirements coverage: 95%+ (zero critical requirements missed)

**URLs for Demo**:
- Local: `http://localhost:3018`

---

**Last Updated**: 2025-11-12
**Version**: 1.0 (Phase 6 Complete)
**Status**: ✅ READY FOR DEMO
