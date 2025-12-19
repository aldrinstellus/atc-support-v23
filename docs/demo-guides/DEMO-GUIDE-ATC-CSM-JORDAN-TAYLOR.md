# Demo Preparation Guide: Jordan Taylor (Customer Success Manager)

**Mode**: ATC Mode (Advanced Technology Consulting)
**Primary Focus**: Customer health monitoring, renewal management, expansion opportunities, relationship building
**Demo Duration**: 5-7 minutes per scenario category
**Difficulty**: Intermediate-Advanced

---

## 🎯 Persona Overview

**Who They Are**:
Jordan Taylor is a Customer Success Manager at ATC, responsible for a portfolio of 25 customer accounts totaling $3.2M in annual recurring revenue (ARR). Their typical day involves monitoring customer health scores, identifying expansion opportunities, preparing for quarterly business reviews (QBRs), analyzing product adoption patterns, and coordinating with support and sales teams to drive customer satisfaction and retention.

**What They Care About**:
- Goal 1: Maintain 95%+ renewal rate across assigned customer portfolio
- Goal 2: Achieve 120%+ net revenue retention through expansion and upsells
- Goal 3: Keep customer health scores above 75/100 to prevent churn risk
- Goal 4: Conduct timely QBRs with data-driven insights to strengthen relationships

**Their Pain Points** (before V17):
- Problem 1: Customer health data scattered across CRM, product analytics, support ticketing, and NPS surveys - requires 2-3 hours per week to compile portfolio view
- Problem 2: No proactive alerts for declining product adoption or engagement - discovers at-risk customers reactively during QBR prep or after renewal fails
- Problem 3: Manual tracking of expansion opportunities across 25 accounts - misses upsell signals hidden in usage data
- Problem 4: QBR preparation requires 4-6 hours per customer to gather metrics, create decks, and identify discussion topics

**How V17 Helps**:
V17 provides Jordan with a unified customer intelligence platform that aggregates health scores, product usage, support history, and expansion signals in real-time. They can ask questions like "Show me client health scores" and instantly see their entire portfolio color-coded by risk level with AI-recommended interventions. The system proactively surfaces declining adoption trends, upsell opportunities based on feature usage, and auto-generates QBR materials in minutes, reducing Jordan's data compilation time from hours to seconds.

---

## 📋 Demo Scenario: Daily Operations

**Setup** (what to say before demo):
> "Jordan starts the day by checking portfolio health and identifying customers requiring immediate attention. Before V17, this meant opening 5 different systems. Now watch what happens..."

---

### Scenario 1.1: Client Health Score Dashboard

**Query to Type**:
```
"Show me client health scores."
```

**Expected Widget**: `customer-risk-list`

**What the Widget Shows**:
- Data Point 1: 25 customers displayed with health scores (ranging from 42 to 96 on 100-point scale)
- Data Point 2: Color-coded risk levels (Green: healthy 75+, Yellow: at-risk 50-74, Red: critical <50)
- Data Point 3: Risk factors per customer (declining usage, low NPS, support escalations, payment issues)
- Data Point 4: ARR value and days to renewal for each account
- Key Insight: 5 customers flagged red/yellow representing $1.1M ARR at risk

**Presenter Script**:
> "Jordan's health score dashboard shows the entire 25-customer portfolio at a glance. Five customers are flagged yellow or red representing $1.1M in at-risk ARR. Acme Corporation ($450K ARR) has a health score of 42 - critical level with 45 days until renewal. The risk factors are clear: declining feature usage (down 35% in 30 days), 3 recent support escalations, and NPS score of 4 (detractor). Jordan knows exactly where to focus their energy."

**Follow-Up Questions** (stakeholders might ask):
1. Q: "How is the health score calculated?"
   A: "V17 combines multiple signals with configurable weights: product usage frequency (30%), feature adoption breadth (25%), support ticket sentiment (20%), NPS score (15%), and payment history (10%). Jordan's team customized these weights during onboarding to match ATC's customer success methodology."

2. Q: "Can Jordan see what changed to cause a health score drop?"
   A: "Yes. Clicking into Acme Corp shows a 30-day trend line: health score dropped from 78 (green) to 42 (red) starting 3 weeks ago when their primary user went on leave and usage dropped 35%. This context helps Jordan understand it's a temporary issue vs. product dissatisfaction."

**Demo Tips**:
- ✅ DO: Emphasize the ARR-weighted risk view - "$1.1M at risk" has executive impact
- ❌ DON'T: Claim health scores are perfect predictors - position as early warning, not certainty

---

### Scenario 1.2: Product Adoption Metrics

**Query to Type**:
```
"Show me product adoption metrics."
```

**Expected Widget**: `analytics-dashboard` (adoption view)

**What the Widget Shows**:
- Data Point 1: Feature adoption rates across portfolio (Core features: 92%, Advanced features: 47%, New features: 18%)
- Data Point 2: Adoption by customer segment (Enterprise: 78% overall, Mid-market: 65%, SMB: 54%)
- Data Point 3: Trending features gaining/losing adoption
- Key Insight: Advanced feature adoption gap represents untapped expansion opportunity

**Presenter Script**:
> "The product adoption dashboard reveals strategic insights. Core feature adoption is strong at 92% across Jordan's portfolio, but advanced features are only at 47% adoption. This 45-point gap represents massive expansion opportunity - customers paying for capabilities they're not using yet. Enterprise customers adopt advanced features at 78%, while SMB customers are only at 54%. Jordan can create targeted enablement campaigns: 'Advanced Features Workshop for SMB Customers' to drive adoption and justify premium tier upgrades."

**Follow-Up Questions** (stakeholders might ask):
1. Q: "What counts as 'adoption' for a feature?"
   A: "V17 uses configurable thresholds. For example, 'API Integration' feature is adopted if the customer makes 10+ API calls per month. 'Advanced Reporting' is adopted if they create 2+ custom reports per month. Jordan's team defines what meaningful usage looks like per feature."

2. Q: "Can Jordan see which specific customers aren't using advanced features?"
   A: "Yes. Clicking 'Advanced features: 47%' drills down to a list of 13 customers who have advanced feature access but <30% usage. These become Jordan's upsell coaching targets: 'Let me show you how to get more value from features you're already paying for.'"

**Demo Tips**:
- ✅ DO: Frame low adoption as opportunity, not failure - "untapped value to unlock"
- ❌ DON'T: Blame customers for not using features - position as enablement gap

---

### Scenario 1.3: Renewal Pipeline View

**Query to Type**:
```
"Show me the renewal pipeline."
```

**Expected Widget**: `customer-risk-list` (renewal view)

**What the Widget Shows**:
- Data Point 1: 8 customers with renewals in next 90 days (total $1.8M ARR)
- Data Point 2: Renewal likelihood score per customer (Acme: 42% likely, TechStart: 88% likely)
- Data Point 3: Recommended actions (Acme: "Schedule executive call + discount offer", TechStart: "Upsell premium tier")
- Key Insight: $850K ARR at moderate-to-high churn risk requiring intervention

**Presenter Script**:
> "Jordan's renewal pipeline shows 8 customers renewing in the next 90 days, representing $1.8M in ARR. The AI provides renewal likelihood forecasts: TechStart Inc. is 88% likely to renew - Jordan can focus on upselling them to premium tier. Acme Corporation is only 42% likely to renew - Jordan needs to schedule an executive call immediately and potentially offer a discount or contract flexibility. The $850K at-risk ARR across 3 accounts becomes Jordan's top priority this month."

**Follow-Up Questions** (stakeholders might ask):
1. Q: "How accurate are the renewal likelihood predictions?"
   A: "Based on historical data, V17's 90-day renewal predictions are accurate within ±15%. A customer predicted at 40% likelihood has actual churn rate of 50-70% if no intervention happens. It's directionally reliable for prioritization, though not perfect."

2. Q: "What if Jordan successfully saves Acme's renewal - does the score update?"
   A: "Yes. If Jordan resolves Acme's issues, closes their support escalations, and gets a positive NPS score, the renewal likelihood could increase to 75-85% within 2-4 weeks. The AI recalculates daily based on fresh data."

**Demo Tips**:
- ✅ DO: Show the strategic triage - "who to save vs who to grow"
- ❌ DON'T: Oversell prediction accuracy - acknowledge it's probabilistic

---

## 📋 Demo Scenario: Customer Success Strategy

**Setup** (what to say before demo):
> "Beyond daily monitoring, Jordan develops strategic plans for customer retention and growth. Let's see how V17 helps with data-driven customer success..."

---

### Scenario 2.1: NPS and Feedback Analysis

**Query to Type**:
```
"Show me client feedback and NPS data."
```

**Expected Widget**: `sentiment-analysis`

**What the Widget Shows**:
- Data Point 1: Overall NPS score at 58 for Jordan's portfolio (Promoters: 62%, Passives: 25%, Detractors: 13%)
- Data Point 2: NPS trend over 6 months (improving from 52 to 58)
- Data Point 3: Common themes in feedback (Positive: "Great support team", Negative: "Pricing concerns", Neutral: "Feature requests")
- Key Insight: Portfolio NPS improving, but pricing feedback signals discount requests

**Presenter Script**:
> "Jordan's portfolio NPS is 58 with positive 6-month trend - improving from 52. This is solid performance. The AI analyzes verbatim feedback to identify themes: 62% of promoters mention 'great support team' and 'fast resolution times.' The 13% detractors cite 'pricing concerns' and 'lack of advanced features in standard tier.' This tells Jordan where to focus: celebrate support wins in QBRs, and prepare discount/upgrade discussions for price-sensitive customers."

**Follow-Up Questions** (stakeholders might ask):
1. Q: "Can Jordan see which specific customers are promoters vs detractors?"
   A: "Yes. Clicking 'Detractors: 13%' shows the 3 detractor accounts (Acme Corp, Alpha Systems, Beta Industries) with their verbatim NPS comments. Jordan can address concerns individually: 'I saw your NPS feedback about pricing - let's discuss contract flexibility options.'"

2. Q: "How does V17 analyze feedback themes?"
   A: "Natural language processing analyzes survey comments, support ticket text, and call transcripts (with transcription). It clusters similar comments into themes using semantic similarity, not just keyword matching. 'Too expensive' and 'pricing is high' both map to 'pricing concerns' theme."

**Demo Tips**:
- ✅ DO: Connect feedback themes to actionable strategies (pricing → discount offers)
- ❌ DON'T: Claim perfect sentiment analysis - NLP has ~85% accuracy

---

### Scenario 2.2: Upsell and Expansion Opportunities

**Query to Type**:
```
"Show me upsell opportunities."
```

**Expected Widget**: `customer-risk-list` (expansion view)

**What the Widget Shows**:
- Data Point 1: 7 customers with strong upsell signals based on usage patterns
- Data Point 2: Recommended expansion plays (TechStart: "Upgrade to premium tier", Delta Corp: "Add 20 user licenses")
- Data Point 3: Revenue impact estimates (TechStart upsell: +$60K ARR, Delta expansion: +$15K ARR)
- Key Insight: $180K in identified expansion opportunities across 7 accounts

**Presenter Script**:
> "The expansion opportunities dashboard shows Jordan 7 accounts with upsell potential worth $180K in additional ARR. TechStart Inc. is using 95% of their standard tier feature quota and hitting usage limits weekly - perfect upsell to premium tier for $60K incremental ARR. Delta Corporation added 15 employees last quarter but hasn't increased their user license count - opportunity to add 20 licenses for $15K ARR. These aren't cold upsells - they're data-driven recommendations based on actual need."

**Follow-Up Questions** (stakeholders might ask):
1. Q: "How does V17 identify upsell signals from usage data?"
   A: "V17 analyzes patterns: hitting feature limits (95% of quota), requesting features available in higher tiers (API rate limit increases), adding users beyond contract (15 new employees), or showing power user behavior (advanced features used heavily). Each signal gets a confidence score for upsell readiness."

2. Q: "What if a customer says no to the upsell?"
   A: "Jordan logs the objection (pricing, timing, budget approval) and V17 tracks it. If TechStart declines the upsell due to 'Q4 budget freeze,' V17 resurfaces the opportunity in Q1 with context: 'Previous upsell interest - revisit in new budget cycle.' No opportunity is forgotten."

**Demo Tips**:
- ✅ DO: Emphasize the data-driven nature - "based on actual usage, not guesswork"
- ❌ DON'T: Imply every upsell closes - acknowledge some are timing/budget dependent

---

### Scenario 2.3: Product Roadmap Alignment

**Query to Type**:
```
"Show me the product roadmap."
```

**Expected Widget**: `analytics-dashboard` (roadmap view)

**What the Widget Shows**:
- Data Point 1: Upcoming features by quarter (Q1: Mobile app, Q2: Advanced analytics, Q3: API v2)
- Data Point 2: Customer-requested features with request counts (Mobile app: 18 requests, SSO: 12 requests)
- Data Point 3: Jordan's customers who requested each feature
- Key Insight: 18 of Jordan's 25 customers requested mobile app - high QBR talking point

**Presenter Script**:
> "Jordan uses the product roadmap to build QBR narratives. The mobile app launches Q1 and 18 of Jordan's 25 customers have requested it. This is a massive retention and expansion play: 'Great news - the mobile app you requested is launching next month. Let me show you the demo and discuss whether you want to add mobile users to your contract.' Roadmap visibility transforms Jordan's QBRs from status updates to value demonstrations."

**Follow-Up Questions** (stakeholders might ask):
1. Q: "Can Jordan influence roadmap priorities based on customer feedback?"
   A: "Jordan can't change the roadmap directly, but V17 aggregates feature requests across all CSMs. If 65 total customers request SSO and only 20 request a different feature, product leadership sees that data for prioritization decisions. Jordan becomes the voice of the customer to product."

2. Q: "What if a customer requests a feature that's not on the roadmap?"
   A: "Jordan logs it as a feature request in V17. If 5+ customers request the same unlisted feature, it gets flagged for product review. Jordan can say 'I've submitted your request to product - I'll update you on their evaluation.' This manages expectations and closes the feedback loop."

**Demo Tips**:
- ✅ DO: Show how roadmap knowledge becomes competitive advantage in renewals
- ❌ DON'T: Promise features will be built - roadmaps change

---

## 📋 Demo Scenario: QBR Preparation

**Setup** (what to say before demo):
> "Quarterly Business Reviews are Jordan's most important customer touchpoint. Let's see how V17 transforms QBR prep from 4-6 hours to 15 minutes..."

---

### Scenario 3.1: Client Meeting Scheduler

**Query to Type**:
```
"Show me upcoming client meetings."
```

**Expected Widget**: `meeting-scheduler`

**What the Widget Shows**:
- Data Point 1: 5 QBRs scheduled in next 30 days (Acme Corp, TechStart Inc, Delta Corp, etc.)
- Data Point 2: Meeting prep status per QBR (Acme: "Needs prep", TechStart: "Ready", Delta: "Needs prep")
- Data Point 3: Recommended QBR agenda items auto-generated from customer data
- Key Insight: Jordan sees all upcoming customer meetings with prep status tracking

**Presenter Script**:
> "Jordan has 5 QBRs scheduled in the next 30 days. V17 shows meeting prep status: TechStart's QBR is flagged 'Ready' because Jordan already reviewed the auto-generated prep materials. Acme Corp's QBR is flagged 'Needs prep' - clicking into it reveals V17 has already drafted agenda items based on Acme's data: discuss recent support escalations, address declining usage, present mobile app roadmap, negotiate renewal terms. Jordan can customize the agenda or use V17's recommendations directly."

**Follow-Up Questions** (stakeholders might ask):
1. Q: "How does V17 auto-generate QBR agenda items?"
   A: "V17 analyzes the customer's 90-day history: what went well (wins to celebrate), what went poorly (issues to address), usage trends (adoption coaching), upcoming renewals (contract discussions), and roadmap alignment (value to demonstrate). It creates a balanced agenda covering relationship, value, and business topics."

2. Q: "Can Jordan share the QBR deck with the customer in advance?"
   A: "Yes. V17 generates a presentation deck (PowerPoint or PDF) with customer-specific metrics, usage trends, and discussion topics. Jordan can send it 2-3 days before the QBR so the customer comes prepared. This makes meetings more productive."

**Demo Tips**:
- ✅ DO: Emphasize the time savings - "4-6 hours → 15 minutes QBR prep"
- ❌ DON'T: Imply QBRs are fully automated - Jordan's relationship expertise still matters

---

### Scenario 3.2: Churn Risk Deep Dive

**Query to Type**:
```
"Show me clients at churn risk."
```

**Expected Widget**: `customer-risk-list` (churn focus)

**What the Widget Shows**:
- Data Point 1: 5 customers at moderate-to-high churn risk (health scores <65)
- Data Point 2: Churn drivers per customer (Acme: usage decline + escalations, Alpha: pricing complaints)
- Data Point 3: Recommended retention plays (Acme: executive call + usage enablement, Alpha: discount offer)
- Data Point 4: Win-back effort estimate (Acme: High effort, Alpha: Medium effort)
- Key Insight: Not all churn risks are equal - some need executive intervention, others need product coaching

**Presenter Script**:
> "Jordan's churn risk analysis shows 5 at-risk customers, but the AI provides triage guidance. Acme Corporation requires 'High effort' - executive intervention, CSM-led enablement sessions, potential discount. Alpha Systems is 'Medium effort' - primarily pricing complaints that can be addressed with contract restructuring. This helps Jordan allocate time efficiently: invest deeply in Acme ($450K ARR) while handling Alpha ($120K ARR) with a targeted discount conversation."

**Follow-Up Questions** (stakeholders might ask):
1. Q: "What's Jordan's success rate at saving at-risk renewals?"
   A: "V17 tracks intervention outcomes. If Jordan identifies churn risk 60+ days before renewal and intervenes, historical save rate is 65-70%. If churn risk is identified <30 days before renewal, save rate drops to 30-40%. Early detection is critical."

2. Q: "Can Jordan see which retention tactics work best?"
   A: "Yes. V17 tracks 'What was tried?' (executive call, discount, enablement session) and 'What worked?' (renewed or churned). Over time, patterns emerge: executive calls work best for enterprise accounts, discounts work for price-sensitive SMB, enablement works for low-adoption mid-market."

**Demo Tips**:
- ✅ DO: Show the triage framework - "high effort vs medium effort saves"
- ❌ DON'T: Imply all churn is preventable - some customers leave for valid reasons

---

### Scenario 3.3: Declining Adoption Intervention

**Query to Type**:
```
"Show me clients with declining product adoption."
```

**Expected Widget**: `analytics-dashboard` (adoption trends)

**What the Widget Shows**:
- Data Point 1: 4 customers with >20% usage decline in last 30 days
- Data Point 2: Adoption trend lines showing when decline started
- Data Point 3: Root cause analysis (Acme: primary user on leave, Beta: competitor evaluation)
- Key Insight: Early intervention can reverse adoption decline before it becomes churn

**Presenter Script**:
> "The declining adoption dashboard shows 4 customers with >20% usage drops in the last 30 days. Acme Corp's usage dropped 35% starting exactly 3 weeks ago. Drilling into the data, V17 identifies the root cause: their primary user (admin who trained the team) went on parental leave. This isn't product dissatisfaction - it's a knowledge transfer gap. Jordan can offer 're-onboarding for backup admin' to reverse the decline. Beta Industries' decline coincides with mentions of 'evaluating competitors' in support tickets - this is a competitive threat requiring different intervention."

**Follow-Up Questions** (stakeholders might ask):
1. Q: "How does V17 distinguish between temporary dips and permanent decline?"
   A: "V17 looks at duration and severity. A 20% drop for 1 week might be vacation-related. A 35% drop sustained for 3 weeks is a pattern. Jordan can set alert thresholds: 'Alert me if usage drops >25% for 2+ consecutive weeks.' False positive rate is low."

2. Q: "What if the customer is intentionally reducing usage because they're downsizing?"
   A: "That's a valid business reason. Jordan would document it in the customer record: 'Usage decline expected - company reduced headcount by 40%.' V17 stops flagging it as abnormal. The goal isn't to prevent all usage declines - it's to catch unexpected ones that signal problems."

**Demo Tips**:
- ✅ DO: Show different root causes require different interventions (onboarding vs competitive threat)
- ❌ DON'T: Blame customers for low usage - position as partnership to maximize value

---

## 🔗 Cross-Persona Workflows

**Jordan Taylor (CSM)** participates in these collaboration workflows:

### Workflow: Churn Risk Escalation to CEO

**Your Role**: Identifies high-value customer at churn risk and escalates to CEO for executive intervention

**Demo Flow**:
1. **Setup**: "Jordan reviews health scores and sees Acme Corporation ($450K ARR) at 42% health with 45 days to renewal"
2. **Your Query**: `"Show me client health scores"`
3. **What Happens**: Customer risk list shows Acme at critical level with declining usage, escalations, NPS 4
4. **Action**: Jordan coordinates with Support Manager David Miller to resolve outstanding tickets and escalates to CEO Jennifer Anderson for executive call
5. **Handoff**: Jennifer schedules call with Acme's CTO while Jordan prepares usage enablement plan and discount proposal

**Time**: 3-4 minutes

---

### Workflow: Support Coordination for At-Risk Account

**Your Role**: Identifies customer with support issues and coordinates with support manager for priority handling

**Demo Flow**:
1. **Setup**: "Jordan sees Acme Corporation has 3 escalations in one week - unusual pattern"
2. **Your Query**: `"Show me clients at churn risk"`
3. **What Happens**: Churn risk list shows Acme with support escalations as primary risk driver
4. **Action**: Jordan reaches out to Support Manager David Miller to prioritize Acme's tickets and ensure senior engineers are assigned
5. **Outcome**: David assigns top performer Sarah Chen to Acme tickets and provides daily status updates to Jordan for customer communication

**Time**: 2-3 minutes

---

## 🎬 Complete Demo Script (5-7 minutes)

**Opening** (30 seconds):
> "Meet Jordan Taylor, Customer Success Manager at ATC managing 25 customer accounts worth $3.2M in ARR. Before V17, Jordan spent 2-3 hours weekly compiling customer health data from 5 different systems. QBR preparation took 4-6 hours per customer. Expansion opportunities were discovered by chance, not data. Let's see how V17 transforms customer success from reactive to proactive..."

**Scenario Sequence** (6 minutes):
1. **Health Score Dashboard**: Demo "Show me client health scores" (1.5 min)
   - Show 25 customers color-coded by health, 5 flagged red/yellow representing $1.1M at risk
   - Highlight Acme Corp: 42% health, $450K ARR, 45 days to renewal

2. **Renewal Pipeline**: Demo "Show me renewal pipeline" (1.5 min)
   - Show 8 renewals in next 90 days, $1.8M ARR, renewal likelihood scores
   - Contrast high-likelihood upsell (TechStart: 88%) vs high-risk save (Acme: 42%)

3. **Expansion Opportunities**: Demo "Show me upsell opportunities" (1.5 min)
   - Show 7 accounts with $180K expansion potential
   - Walk through TechStart's premium tier upsell based on usage data

4. **QBR Prep**: Demo "Show me upcoming client meetings" (1.5 min)
   - Show 5 QBRs scheduled with auto-generated prep materials
   - Demonstrate agenda generation for Acme's QBR

**Closing** (30 seconds):
> "Jordan's transformation: Customer health data compilation from 2-3 hours to 30 seconds. QBR prep from 4-6 hours to 15 minutes. $180K in expansion opportunities identified automatically. $1.1M in at-risk ARR detected proactively with 45+ days to intervene. Jordan shifts from data compiler to strategic relationship manager. The question changes from 'What's happening with my customers?' to 'What should I do about it?' That's the power of AI-assisted customer success."

---

## 💡 Presentation Tips

**Audience-Specific Messaging**:

| Audience | Emphasize | Avoid |
|----------|-----------|-------|
| **CSMs (Peers)** | Time savings, expansion identification, renewal predictions, QBR automation | Executive strategy, technical product details |
| **Sales Leaders** | Expansion revenue ($180K identified), renewal rates (95%+), net revenue retention (120%) | Day-to-day customer interactions |
| **Executives** | Revenue retention, churn prevention ($1.1M at-risk ARR), efficiency gains, customer lifetime value | QBR prep mechanics, health score calculations |

**Common Questions & Answers**:

**Q1**: "How does V17 integrate with our CRM (Salesforce, HubSpot, etc.)?"
**A**: "V17 syncs with your CRM bidirectionally via API. Customer data, contract details, and renewal dates flow from CRM into V17. Jordan's activities (QBR notes, intervention plans, expansion opportunities) sync back to CRM for sales visibility. Updates happen every 15 minutes in real-time."

**Q2**: "What if Jordan disagrees with a health score or renewal prediction?"
**A**: "Jordan can manually override any score with justification: 'Acme's score is 42, but I just spoke with their CEO who confirmed renewal - adjusting to 85.' V17 learns from these overrides to improve future predictions. Jordan's expertise augments the AI, not the other way around."

**Q3**: "How accurate are the expansion revenue estimates?"
**A**: "V17's expansion recommendations close at ~35-45% rate based on ATC's historical data. Not every upsell works, but the $180K pipeline Jordan sees has an expected value of $65-80K realized revenue. This is directionally reliable for planning, though individual deals vary."

**Q4**: "Can Jordan track which CSMs are identifying the most expansion opportunities?"
**A**: "Yes. CSM leadership can run reports: 'Expansion identified by CSM' to see who's proactively finding upsells vs who's missing signals. This isn't for punishment - it's for coaching and best practice sharing. Top performers can teach their approach to the team."

**Q5**: "What's the ROI for a CSM using V17?"
**A**: "Based on time savings alone: Jordan saves 2-3 hours weekly on health data compilation + 3-4 hours per QBR (8 QBRs/quarter = 24-32 hours saved) + expansion opportunities identified ($180K pipeline). If Jordan's fully-loaded cost is $60/hour, the time savings alone are worth $3,000-4,500/quarter. Add the retained revenue from churn prevention and expansion, and ROI is 10-20x."

---

## 🚀 Quick Reference

**Top 7 Queries for This Persona**:
1. `"Show me client health scores"` → `customer-risk-list` (Daily Operations)
2. `"Show me product adoption metrics"` → `analytics-dashboard` (adoption view) (Daily Operations)
3. `"Show me renewal pipeline"` → `customer-risk-list` (renewal view) (Daily Operations)
4. `"Show me client feedback and NPS data"` → `sentiment-analysis` (Customer Success Strategy)
5. `"Show me upsell opportunities"` → `customer-risk-list` (expansion view) (Customer Success Strategy)
6. `"Show me upcoming client meetings"` → `meeting-scheduler` (QBR Preparation)
7. `"Show me clients at churn risk"` → `customer-risk-list` (churn focus) (QBR Preparation)

**Key Metrics to Highlight**:
- Metric 1: Customer health data compilation time reduced 98% (2-3 hours → 30 seconds)
- Metric 2: QBR prep time reduced 96% (4-6 hours → 15 minutes)
- Metric 3: $180K in expansion opportunities identified automatically
- Metric 4: $1.1M ARR at-risk detected 45+ days before renewal

**URLs for Demo**:
- Local: `http://localhost:3017/demo/atc-csm`
- Persona: ATC CSM (Jordan Taylor, Customer Success Manager)

---

**Last Updated**: 2025-11-14
**Version**: 1.0
**Status**: ✅ READY FOR DEMO
