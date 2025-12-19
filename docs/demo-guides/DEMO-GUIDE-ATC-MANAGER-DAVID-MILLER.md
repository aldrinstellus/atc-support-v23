# Demo Preparation Guide: David Miller (Customer Support Operations Manager)

**Mode**: ATC Mode (Advanced Technology Consulting)
**Primary Focus**: Team management, workload optimization, SLA compliance, agent performance
**Demo Duration**: 5-7 minutes per scenario category
**Difficulty**: Intermediate

---

## 🎯 Persona Overview

**Who They Are**:
David Miller is the Customer Support Operations Manager at ATC, responsible for managing a team of 12 support agents, ensuring SLA compliance, optimizing workload distribution, and maintaining high customer satisfaction. His typical day involves balancing team capacity, addressing escalations, monitoring performance metrics, coaching agents, and identifying process improvements.

**What They Care About**:
- Goal 1: Maintain 92%+ SLA compliance across all customer tiers
- Goal 2: Optimize team workload to prevent burnout (target: 70-85% utilization)
- Goal 3: Reduce escalation rate to <8% through proactive agent support
- Goal 4: Improve agent performance through data-driven coaching and resource allocation

**Their Pain Points** (before V17):
- Problem 1: Team workload data scattered across ticketing system, time tracking, and agent self-reports - requires 45 minutes daily to compile capacity view
- Problem 2: No real-time visibility into agent performance bottlenecks - discovers overloaded agents reactively when they flag capacity issues
- Problem 3: Manual escalation queue management across multiple systems creates delays in addressing priority customer issues

**How V17 Helps**:
V17 provides David with a real-time team operations dashboard that aggregates workload, performance, and SLA metrics across all agents. He can ask questions like "Show me team workload distribution" and instantly see which agents are overloaded, who has capacity, and where to reassign tickets. The AI proactively identifies SLA breach risks, performance anomalies, and escalation patterns, reducing his daily status compilation from 45 minutes to 30 seconds.

---

## 📋 Demo Scenario: Daily Operations

**Setup** (what to say before demo):
> "David starts his day by checking team capacity and identifying any issues requiring immediate attention. Before V17, this meant checking 3 different systems. Now watch what happens..."

---

### Scenario 1.1: Team Workload Dashboard

**Query to Type**:
```
"Show me the current team workload distribution."
```

**Expected Widget**: `team-workload-dashboard`

**What the Widget Shows**:
- Data Point 1: 12 agents displayed with current ticket loads (ranging from 4 to 18 tickets per agent)
- Data Point 2: Utilization percentages by agent (Sarah Chen: 95%, Michael Torres: 42%, Emily Johnson: 78%)
- Data Point 3: Color-coded capacity indicators (Green: healthy, Yellow: approaching capacity, Red: overloaded)
- Key Insight: 3 agents overloaded (>90% utilization), 2 agents with significant capacity (<50% utilization)

**Presenter Script**:
> "The team workload dashboard gives David instant visibility across all 12 agents. Sarah Chen is flagged red at 95% utilization with 18 open tickets - she's approaching burnout. Michael Torres is green at 42% with only 4 tickets - he has capacity to take on more work. The AI immediately identifies the imbalance: 3 agents are overloaded while 2 have capacity available. David can rebalance the workload in minutes, not hours."

**Follow-Up Questions** (stakeholders might ask):
1. Q: "How does V17 calculate agent utilization percentage?"
   A: "V17 integrates with the ticketing system and time tracking to see active tickets, estimated hours remaining, and agent availability. If Sarah has 18 tickets averaging 2 hours each (36 hours of work) and only 40 work hours this week, she's at 90% utilization. The calculation updates in real-time as tickets are closed or reassigned."

2. Q: "Can David reassign tickets directly from this dashboard?"
   A: "Not directly - V17 is an intelligence layer, not a ticketing system replacement. However, David can click 'Rebalance Workload' and V17 generates recommended reassignments: 'Move 4 tickets from Sarah Chen to Michael Torres, move 3 tickets from Emily Johnson to Alex Rodriguez.' He can then execute these changes in the ticketing system."

**Demo Tips**:
- ✅ DO: Emphasize the proactive nature - "catching overload before agents complain or burn out"
- ❌ DON'T: Imply agents are interchangeable - acknowledge skill-based routing considerations

---

### Scenario 1.2: Agent Performance Comparison

**Query to Type**:
```
"Show me agent performance comparison."
```

**Expected Widget**: `agent-performance-comparison`

**What the Widget Shows**:
- Data Point 1: Performance metrics for all agents (resolution time, satisfaction score, tickets closed)
- Data Point 2: Top performers highlighted (Sarah Chen: 4.2 CSAT, 3.1h avg resolution)
- Data Point 3: Bottom performers flagged (Michael Torres: 3.8 CSAT, 5.4h avg resolution)
- Key Insight: Performance variance reveals coaching opportunities

**Presenter Script**:
> "The performance comparison shows David exactly who's excelling and who needs support. Sarah Chen is the top performer with 4.2 CSAT and 3.1 hour average resolution time. Michael Torres has the slowest resolution time at 5.4 hours and lowest CSAT at 3.8. But here's the key insight: Michael's ticket load is only 4 tickets, so his low utilization isn't capacity - it's a performance issue. David can now schedule a coaching session to understand if Michael needs training, better tools, or different ticket assignments."

**Follow-Up Questions** (stakeholders might ask):
1. Q: "What if Michael is handling more complex tickets than Sarah?"
   A: "Great point. V17 can filter performance by ticket complexity, priority, or category. David could ask 'Compare agent performance for enterprise tickets only' to see if Michael specializes in high-touch complex issues that naturally take longer. Context matters for fair performance evaluation."

2. Q: "Can David see trends over time, or just current week?"
   A: "Both. The default view shows this week for quick daily checks, but David can toggle to 'Last 30 Days' or 'Last Quarter' to identify long-term trends. If Michael's performance has been declining over 3 months, that's a different conversation than a bad week."

**Demo Tips**:
- ✅ DO: Frame performance gaps as coaching opportunities, not failures
- ❌ DON'T: Suggest firing underperformers - emphasize development and support

---

### Scenario 1.3: SLA Breach Alerts

**Query to Type**:
```
"Show me SLA performance and breaches."
```

**Expected Widget**: `sla-performance-chart`

**What the Widget Shows**:
- Data Point 1: Overall SLA compliance at 89% (target: 92%)
- Data Point 2: Breakdown by tier (Enterprise: 84%, Professional: 91%, Standard: 95%)
- Data Point 3: 12 active SLA breach alerts with time remaining to resolution
- Key Insight: Enterprise tier underperforming with 5 breaches in last 48 hours

**Presenter Script**:
> "The SLA performance chart shows David a critical issue: overall compliance is 89%, below the 92% target. When we drill down by tier, enterprise customers at 84% are driving the problem - 5 breaches in the last 48 hours. V17 shows the 12 active breaches with countdown timers: 'TICK-247: 4 hours until SLA breach' and 'TICK-189: Already breached by 2 hours.' David can triage immediately - assign the at-risk tickets to top performers and escalate the already-breached tickets for damage control."

**Follow-Up Questions** (stakeholders might ask):
1. Q: "What causes enterprise SLA breaches to be higher than standard tier?"
   A: "V17's root cause analysis (accessible via drill-down) might show enterprise tickets have 3x higher complexity, require specialist expertise, or get stuck in escalation queues. David can use this data to justify hiring senior engineers for enterprise support or creating a dedicated enterprise team."

2. Q: "Does V17 automatically escalate SLA breach risks?"
   A: "V17 sends proactive alerts when tickets are 80% through their SLA window with no resolution in sight. David gets notified via dashboard, email, or Slack (configurable). He can choose to auto-escalate or manually review before escalating."

**Demo Tips**:
- ✅ DO: Show the countdown timers - "4 hours until breach" creates urgency
- ❌ DON'T: Blame agents for breaches - focus on systemic root causes (complexity, staffing, training)

---

## 📋 Demo Scenario: Team Management

**Setup** (what to say before demo):
> "Beyond daily operations, David coaches his team and plans for future capacity needs. Let's see how V17 helps him be a better manager..."

---

### Scenario 2.1: Escalation Queue Management

**Query to Type**:
```
"Show me the escalation queue."
```

**Expected Widget**: `ticket-list` (escalation view)

**What the Widget Shows**:
- Data Point 1: 8 escalated tickets requiring manager attention
- Data Point 2: Each ticket shows customer (Acme Corp, TechStart Inc), priority, escalation reason, time in queue
- Data Point 3: Recommended actions per ticket (assign to senior agent, direct manager intervention, customer call)
- Key Insight: 3 of 8 escalations are from same customer (Acme Corp) indicating systemic issue

**Presenter Script**:
> "The escalation queue shows David 8 tickets requiring his attention. But the AI surfaces a critical pattern: 3 of 8 escalations are from Acme Corporation in the last week. This isn't isolated ticket issues - this is a customer relationship problem. David can now make a strategic decision: call Acme's primary contact, coordinate with the CSM, or escalate to executive leadership. Without V17, he'd address each ticket individually and miss the pattern."

**Follow-Up Questions** (stakeholders might ask):
1. Q: "What's the typical escalation rate for a healthy support team?"
   A: "Industry benchmark is 5-10% of total tickets. If David's team is handling 200 tickets per week and 8 are escalated, that's 4% - actually quite good. V17 tracks escalation rate trends so David can see if it's increasing (process problem) or stable (normal complexity variance)."

2. Q: "Can David delegate escalations back to agents after reviewing?"
   A: "Yes. David might review an escalation and decide 'This isn't actually complex - Agent Michael just needs guidance.' He can add coaching notes and reassign it back to Michael with instructions, turning the escalation into a teachable moment."

**Demo Tips**:
- ✅ DO: Highlight the pattern recognition - "3 escalations from 1 customer = relationship issue"
- ❌ DON'T: Imply escalations are failures - they're a normal part of complex support

---

### Scenario 2.2: Priority Customer Monitoring

**Query to Type**:
```
"Show me priority customers requiring attention."
```

**Expected Widget**: `customer-risk-list`

**What the Widget Shows**:
- Data Point 1: 5 high-priority customers with risk scores and ARR values
- Data Point 2: Recent ticket activity and sentiment trends
- Data Point 3: Recommended interventions (proactive check-in, CSM escalation, discount offer)
- Key Insight: $1.2M in ARR at moderate-to-high risk

**Presenter Script**:
> "David monitors high-value customers proactively. The customer risk list shows 5 accounts requiring attention. Acme Corporation ($450K ARR) has an 85% risk score driven by 3 recent escalations and declining CSAT scores. TechStart Inc. ($280K ARR) is at 72% risk with slow ticket resolution times. David can coordinate with the CSM team to address these risks before they become churn. This proactive approach is why ATC maintains 96% retention."

**Follow-Up Questions** (stakeholders might ask):
1. Q: "How does David's priority customer list differ from the CEO's churn risk list?"
   A: "Great question. David sees operational risks (recent escalations, slow resolution times, declining CSAT) that he can fix with support team actions. The CEO sees strategic risks (contract renewal timeline, competitive evaluation, payment delays) requiring executive intervention. Same data, different action levels."

2. Q: "What if David addresses a customer concern but the risk score doesn't improve?"
   A: "Risk scores update based on outcomes. If David resolves Acme's 3 escalations quickly and CSAT improves, the risk score will drop within 24-48 hours. If risk persists despite intervention, it signals deeper issues requiring CSM or executive engagement."

**Demo Tips**:
- ✅ DO: Position as proactive relationship management, not reactive firefighting
- ❌ DON'T: Imply support team alone can prevent churn - acknowledge need for CSM partnership

---

### Scenario 2.3: Team Capacity Planning

**Query to Type**:
```
"Show me team capacity metrics."
```

**Expected Widget**: `team-workload-dashboard` (capacity view)

**What the Widget Shows**:
- Data Point 1: Current team capacity at 78% (healthy range: 70-85%)
- Data Point 2: Projected capacity for next 30 days based on ticket trends
- Data Point 3: Recommendations for capacity adjustments (hire 1 agent if volume grows 15%+)
- Key Insight: Team is optimally loaded now but approaching capacity ceiling

**Presenter Script**:
> "Capacity planning shows David his team is at 78% utilization - right in the healthy 70-85% range. But the forecast is the key insight: if ticket volume grows 15% next month (which historical trends suggest it will during enterprise renewals season), the team will hit 92% utilization and risk burnout. V17 recommends hiring 1 additional agent now to handle the upcoming surge. This gives David data to justify headcount requests to leadership."

**Follow-Up Questions** (stakeholders might ask):
1. Q: "What if leadership denies the headcount request?"
   A: "David can model alternatives in V17: 'What if we increase AI automation from 40% to 55% of tickets?' or 'What if we extend response SLAs for standard tier customers during peak season?' Each scenario shows projected impact on SLA compliance and customer satisfaction."

2. Q: "How accurate are the capacity forecasts?"
   A: "Based on historical seasonality and ticket trend analysis, V17's 30-day forecasts are accurate within ±10%. Not perfect, but directionally reliable enough for planning decisions. David can adjust forecasts if he knows of upcoming events (product launches, major releases) that will spike ticket volume."

**Demo Tips**:
- ✅ DO: Emphasize proactive planning - "hiring before the crisis, not during it"
- ❌ DON'T: Oversell forecast accuracy - acknowledge it's a planning tool, not a guarantee

---

## 📋 Demo Scenario: Agent Development

**Setup** (what to say before demo):
> "David believes in developing his team through data-driven coaching. Let's see how V17 helps him provide targeted support to each agent..."

---

### Scenario 3.1: Scheduling 1-on-1 Coaching Session

**Query to Type** (multi-turn conversation):
```
1. "Schedule a 1-on-1 coaching session with an agent."
2. "Yes, check availability."
3. "Book the tomorrow at 2pm slot."
```

**Expected Widget**: `meeting-scheduler` → `meeting-confirmation`

**What the Widget Shows**:
- Data Point 1: Available time slots for both David and the agent (tomorrow 10am and 2pm)
- Data Point 2: Meeting confirmation with calendar invite sent
- Data Point 3: Auto-generated coaching prep notes (agent performance metrics, recent tickets, customer feedback)
- Key Insight: V17 prepares coaching context automatically

**Presenter Script**:
> "Watch how easy V17 makes coaching. David asks to schedule a 1-on-1 with an agent. V17 checks both calendars and suggests two open slots: tomorrow at 10am or 2pm. David selects 2pm. V17 sends the calendar invite and automatically generates coaching prep notes: the agent's performance metrics for the last 30 days, recent tickets they handled, and customer feedback summary. What used to take David 20 minutes of prep now takes 30 seconds."

**Follow-Up Questions** (stakeholders might ask):
1. Q: "Does V17 suggest coaching topics or just provide data?"
   A: "Both. The prep notes include data (resolution times, CSAT scores) AND suggested discussion topics based on patterns. For example, if the agent's resolution time increased 15% this month, V17 suggests 'Discuss: What's causing longer resolution times - ticket complexity or knowledge gaps?' David can follow the suggestions or create his own agenda."

2. Q: "Can David schedule recurring 1-on-1s for the whole team?"
   A: "Yes. David can set up recurring monthly 1-on-1s with each agent, and V17 will auto-generate fresh coaching notes before each meeting. The notes evolve based on recent performance, making every 1-on-1 relevant and data-driven."

**Demo Tips**:
- ✅ DO: Highlight the time savings - "20 minutes of prep → 30 seconds"
- ❌ DON'T: Imply coaching is purely data-driven - emphasize David's judgment and empathy

---

### Scenario 3.2: Identifying Coaching Opportunities

**Query to Type**:
```
"Show me escalation trends and root cause analysis."
```

**Expected Widget**: `analytics-dashboard` (escalation view)

**What the Widget Shows**:
- Data Point 1: Escalation trends over 90 days (stable at 4-5% rate)
- Data Point 2: Root cause breakdown (Technical complexity: 45%, Knowledge gaps: 30%, Customer escalation: 25%)
- Data Point 3: Agents with highest escalation rates and primary causes
- Key Insight: 30% of escalations driven by agent knowledge gaps - training opportunity

**Presenter Script**:
> "The escalation trend analysis reveals a coaching opportunity. While the 4-5% escalation rate is healthy, 30% of escalations are caused by agent knowledge gaps - agents escalating tickets they could have resolved with better training or documentation. V17 identifies which agents have the highest knowledge-gap escalation rates and which topics are most problematic. David can now create targeted training: 'Authentication troubleshooting workshop for Michael Torres and 2 other agents.'"

**Follow-Up Questions** (stakeholders might ask):
1. Q: "How does V17 distinguish between legitimate escalations and knowledge gaps?"
   A: "V17 analyzes ticket history. If an agent escalates a password reset ticket that 5 other agents have successfully resolved, it's likely a knowledge gap. If an agent escalates a complex API integration issue that gets routed to engineering, it's legitimate technical complexity. The AI learns these patterns over time."

2. Q: "What if David disagrees with the root cause classification?"
   A: "David can reclassify escalations manually, and V17 learns from his corrections. Over 3-6 months, the AI becomes increasingly accurate at distinguishing root causes specific to ATC's support operations."

**Demo Tips**:
- ✅ DO: Frame knowledge gaps as growth opportunities, not agent failures
- ❌ DON'T: Suggest all escalations are preventable - some complexity requires escalation

---

## 🔗 Cross-Persona Workflows

**David Miller (CS Manager)** participates in these collaboration workflows:

### Workflow: SLA Breach Escalation to CEO

**Your Role**: Detects enterprise SLA performance gap and escalates to CEO for strategic resource allocation

**Demo Flow**:
1. **Setup**: "David reviews SLA performance and discovers enterprise tier at 84% compliance (vs 92% target)"
2. **Your Query**: `"Show me SLA performance and breaches"`
3. **What Happens**: SLA chart shows Enterprise: 84%, 12 breaches, $1.2M ARR at risk
4. **Action**: David documents the trend and escalates to CEO Jennifer Anderson with recommendation: "Hire 2 senior engineers for enterprise support"
5. **Handoff**: Jennifer reviews business case ($240K hiring cost vs $1.2M revenue risk) and approves hiring plan

**Time**: 3-4 minutes

---

### Workflow: Customer Risk Coordination with CSM

**Your Role**: Identifies high-risk customer from support metrics and coordinates with CSM team for intervention

**Demo Flow**:
1. **Setup**: "David notices Acme Corporation has 3 escalations in one week - unusual pattern"
2. **Your Query**: `"Show me priority customers requiring attention"`
3. **What Happens**: Customer risk list shows Acme Corp at 85% risk, declining CSAT, $450K ARR
4. **Action**: David reaches out to CSM Jordan Taylor to share support context and coordinate customer outreach
5. **Handoff**: Jordan schedules business review with Acme to address relationship concerns while David ensures outstanding tickets are prioritized

**Time**: 2-3 minutes

---

## 🎬 Complete Demo Script (5-7 minutes)

**Opening** (30 seconds):
> "Meet David Miller, Customer Support Operations Manager at ATC, managing 12 support agents. Before V17, David spent 45 minutes every morning compiling team workload from multiple systems. Agent performance issues were discovered reactively when agents complained about overload. SLA breaches were caught too late to prevent customer impact. Let's see how V17 transforms his team management..."

**Scenario Sequence** (6 minutes):
1. **Team Workload**: Demo "Show me current team workload distribution" (1.5 min)
   - Show 3 overloaded agents (>90% utilization), 2 with capacity (<50%)
   - Demonstrate immediate rebalancing opportunity

2. **Agent Performance**: Demo "Show me agent performance comparison" (1.5 min)
   - Show top performer (Sarah: 4.2 CSAT, 3.1h avg) vs bottom performer (Michael: 3.8 CSAT, 5.4h avg)
   - Frame as coaching opportunity, not criticism

3. **SLA Monitoring**: Demo "Show me SLA performance and breaches" (1.5 min)
   - Show enterprise tier at 84% (vs 92% target)
   - Highlight 12 active breaches with countdown timers

4. **1-on-1 Scheduling**: Demo scheduling workflow (1.5 min)
   - Ask to schedule 1-on-1, check availability, book meeting
   - Show auto-generated coaching prep notes

**Closing** (30 seconds):
> "David's transformation: Daily status compilation reduced from 45 minutes to 30 seconds. Workload imbalances caught proactively before burnout. SLA breaches predicted and prevented with countdown alerts. Coaching sessions backed by data-driven prep in 30 seconds. David shifts from reactive crisis management to proactive team optimization. He's no longer asking 'Who's struggling?' - he's asking 'How can I help them succeed?' That's the power of AI-assisted team management."

---

## 💡 Presentation Tips

**Audience-Specific Messaging**:

| Audience | Emphasize | Avoid |
|----------|-----------|-------|
| **Support Managers (Peers)** | Real-world scenarios (workload balancing, coaching prep), time savings, agent development | Executive strategy, financial metrics |
| **HR/People Ops** | Employee satisfaction (preventing burnout), data-driven coaching, fair performance evaluation | Technical details, SLA mechanics |
| **Executives** | SLA compliance improvement, efficiency gains, customer retention impact | Day-to-day operational details |

**Common Questions & Answers**:

**Q1**: "How does V17 integrate with our existing ticketing system?"
**A**: "V17 integrates with major ticketing platforms (Zendesk, Jira Service Management, Salesforce Service Cloud, Freshdesk) via APIs. It pulls ticket data, agent assignments, time tracking, and customer metadata automatically. David doesn't have to manually export data - it syncs every 15 minutes in real-time."

**Q2**: "What if agents feel like they're being micromanaged with this level of visibility?"
**A**: "That's a valid concern. V17 is designed for team optimization, not surveillance. David uses it to identify agents who need support (coaching, training, workload rebalancing) and celebrate top performers. Successful managers position V17 as 'making sure you have what you need to succeed' not 'tracking your every move.' Transparency and communication are key."

**Q3**: "Can David customize what metrics he tracks per agent?"
**A**: "Yes. Every team has different priorities. David might care most about resolution time and CSAT for customer-facing agents, but prioritize technical accuracy and documentation quality for technical specialists. V17's metrics are fully configurable, and David can create custom dashboards for different agent roles."

**Q4**: "How long does it take to onboard David's team to using V17?"
**A**: "David needs 2-3 hours of initial training to understand dashboards and workflows. His agents don't need training - V17 works in the background analyzing their existing ticket work. If David wants agents to use V17 themselves (e.g., 'Show me my performance stats'), that's an optional 30-minute onboarding per agent."

**Q5**: "What if David's team is remote or distributed across time zones?"
**A**: "V17 works perfectly for remote teams. David can filter views by time zone to see who's currently working, schedule 1-on-1s across time zones automatically, and track async work patterns. The capacity planning accounts for different work schedules and availability windows."

---

## 🚀 Quick Reference

**Top 6 Queries for This Persona**:
1. `"Show me current team workload distribution"` → `team-workload-dashboard` (Daily Operations)
2. `"Show me agent performance comparison"` → `agent-performance-comparison` (Team Management)
3. `"Show me SLA performance and breaches"` → `sla-performance-chart` (Daily Operations)
4. `"Show me escalation queue"` → `ticket-list` (escalation view) (Daily Operations)
5. `"Show me priority customers requiring attention"` → `customer-risk-list` (Team Management)
6. `"Schedule 1-on-1 coaching session"` → `meeting-scheduler` (Agent Development)

**Key Metrics to Highlight**:
- Metric 1: Daily status compilation time reduced 98% (45 minutes → 30 seconds)
- Metric 2: Proactive workload balancing prevents agent burnout
- Metric 3: SLA breach prediction with countdown timers (4-8 hours early warning)
- Metric 4: Coaching prep time reduced 98% (20 minutes → 30 seconds)

**URLs for Demo**:
- Local: `http://localhost:3017/demo/atc-manager`
- Persona: ATC Manager (David Miller, CS Operations Manager)

---

**Last Updated**: 2025-11-14
**Version**: 1.0
**Status**: ✅ READY FOR DEMO
