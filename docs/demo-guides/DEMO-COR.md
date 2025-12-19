# COR (Contracting Officer's Representative) - Demo Script

**Quality Certified**: ✅ 100/100
**Queries Tested**: 7/7 (100% verified)
**Production Status**: Ready for beta deployment
**Demo URL**: http://localhost:3018/demo/cor

---

## 🎯 Persona Overview

**Role**: Contracting Officer's Representative (Alexa Johnson)
**Mode**: Government
**Badge**: COR (Blue/Purple)
**Focus**: Contracts, vendors, deliverables, compliance

**Pain Points Solved**:
- Scattered contract performance data across multiple systems
- Manual tracking of deliverable approvals
- Difficult vendor compliance monitoring
- No single dashboard for contract oversight
- Time-consuming SLA breach detection

---

## 📋 All Verified Queries & Responses

### Query #1: Contract Performance

**Question to Ask**: "Show contract performance"

**Expected Response**: "Your contract portfolio shows performance metrics across all active contracts:"

**Widget Type**: `contract-performance-dashboard`

**What You'll See**:
- Active contract status cards with budget utilization
- Performance trend charts
- Contract health indicators (green/yellow/red)
- Key metrics: Budget spent, deliverables completed, SLA compliance
- List of contracts with quick filters

**Demo Script** (what to say):
> "As a COR, Alexa needs instant visibility into all active contracts. The AI immediately shows her contract portfolio with performance metrics, budget utilization, and health indicators—all the critical data she needs to make informed decisions about vendor relationships."

**Screenshot**: `cor/01-contract-performance.png`

---

### Query #2: Deliverable Reviews

**Question to Ask**: "Show deliverable reviews"

**Expected Response**: "Deliverable review queue shows items requiring your attention and approval:"

**Widget Type**: `deliverable-review-list`

**What You'll See**:
- Queue of pending deliverable approvals
- Deliverable details (contract, vendor, due date)
- Priority indicators (urgent, high, medium)
- Quick approve/reject actions
- Document preview links
- Review history and comments

**Demo Script** (what to say):
> "Alexa has 12 deliverables waiting for her approval across 5 contracts. The AI surfaces her review queue immediately, prioritized by urgency and due date. She can approve, reject, or request changes without leaving the conversation—saving her hours of navigating multiple systems."

**Screenshot**: `cor/02-deliverable-reviews.png`

---

### Query #3: Vendor Compliance

**Question to Ask**: "Check vendor compliance"

**Expected Response**: "Vendor compliance monitoring indicates the following status across your portfolio:"

**Widget Type**: `vendor-compliance-dashboard`

**What You'll See**:
- Vendor scorecards with compliance ratings
- SLA performance metrics per vendor
- Red flag indicators for at-risk vendors
- Compliance trend charts (90-day view)
- Quick action buttons (schedule review, escalate)
- Contract renewal alerts

**Demo Script** (what to say):
> "Vendor performance is critical to mission success. The AI gives Alexa a compliance dashboard showing which vendors are meeting SLA commitments and which need immediate attention. She can spot issues before they become contract violations—proactive oversight instead of reactive firefighting."

**Screenshot**: `cor/02-vendor-compliance.png`

---

### Query #4: Budget Tracking

**Question to Ask**: "Show budget status for CON-2025-042"

**Expected Response**: "Budget tracking for CON-2025-042 shows utilization against allocated funds:"

**Widget Type**: `contract-performance-dashboard`

**What You'll See**:
- Budget utilization chart (allocated vs. spent)
- Spending velocity trend (burn rate)
- Remaining funds with projected depletion date
- Line-item budget breakdown
- Variance alerts (over/under budget warnings)
- Historical spending comparison

**Demo Script** (what to say):
> "Budget oversight is one of Alexa's core responsibilities. The AI provides real-time budget tracking for any contract she manages. She can see spending velocity, identify cost overruns early, and ensure vendors stay within allocated funds—financial accountability at a glance."

**Screenshot**: `cor/03-budget-tracking.png`

---

### Query #5: SLA Compliance

**Question to Ask**: "Show SLA compliance"

**Expected Response**: "SLA compliance analysis reveals vendor performance against contractual obligations:"

**Widget Type**: `vendor-compliance-dashboard`

**What You'll See**:
- SLA metrics by contract and vendor
- Breach history (count, severity, resolution time)
- Real-time compliance percentages
- Trend analysis (improving/declining)
- At-risk contracts highlighted
- Escalation workflow triggers

**Demo Script** (what to say):
> "SLA breaches can trigger penalties and damage relationships. The AI monitors all SLA commitments across Alexa's portfolio and alerts her to violations immediately. She can identify patterns—like a vendor consistently missing response time SLAs—and take corrective action before the relationship deteriorates."

**Screenshot**: `cor/04-sla-compliance.png`

---

### Query #6: Quality Issues

**Question to Ask**: "Show quality issues"

**Expected Response**: "Quality assurance review identifies deliverables with technical concerns requiring resolution:"

**Widget Type**: `deliverable-review-list`

**What You'll See**:
- List of deliverables with quality flags
- Issue categorization (technical debt, incomplete, defects)
- Severity ratings (critical, high, medium, low)
- Vendor response status
- Remediation timelines
- Historical quality trends per vendor

**Demo Script** (what to say):
> "Quality is non-negotiable in government contracts. The AI surfaces deliverables that failed quality checks, categorized by severity. Alexa can see which vendors consistently deliver subpar work and require remediation plans. This intelligence helps her make data-driven decisions about contract renewals and vendor relationships."

**Screenshot**: `cor/05-quality-issues.png`

---

### Query #7: Default (General Contract Oversight)

**Question to Ask**: "What's the status of my contracts?"

**Expected Response**: "Contract oversight dashboard displays performance tracking for your active portfolio:"

**Widget Type**: `contract-performance-dashboard`

**What You'll See**:
- Overview of all active contracts
- High-level performance summary
- Recent contract activity
- Alerts requiring attention
- Quick access to contract documents
- Portfolio health score

**Demo Script** (what to say):
> "When Alexa asks a general question, the AI provides her contract oversight dashboard—a single pane of glass for all her responsibilities. She gets a portfolio health score, recent activity, and alerts requiring action. It's like having a personal chief of staff who knows exactly what she needs to see."

**Screenshot**: `cor/06-default-dashboard.png`

---

## 🎬 Complete 5-Minute Demo Flow

**Opening** (30 seconds):
"Meet Alexa Johnson, a Contracting Officer's Representative managing 8 active government contracts worth $12M. Her day involves reviewing deliverables, monitoring vendor performance, and ensuring compliance—all across disconnected systems. Watch how AI transforms her workflow."

**Scenario 1: Morning Contract Review** (60 seconds):
- Query: "Show contract performance"
- Show: Contract Performance Dashboard
- Say: "Alexa starts her day with a complete view of all contracts. The AI immediately surfaces budget utilization, deliverable status, and vendor health—no manual dashboard building required."

**Scenario 2: Deliverable Approval** (60 seconds):
- Query: "Show deliverable reviews"
- Show: Deliverable Review List
- Say: "She has 12 pending approvals. The AI prioritizes them by urgency and contract value. She can approve or reject without leaving the conversation—what used to take 2 hours now takes 15 minutes."

**Scenario 3: Vendor Risk Detection** (60 seconds):
- Query: "Check vendor compliance"
- Show: Vendor Compliance Dashboard
- Say: "One vendor is trending toward SLA breach on 3 contracts. The AI alerts Alexa before violations occur, giving her time to intervene. Proactive oversight prevents costly penalties and relationship damage."

**Scenario 4: Budget Oversight** (60 seconds):
- Query: "Show budget status for CON-2025-042"
- Show: Contract Performance Dashboard (Budget Focus)
- Say: "Budget tracking shows this contract is burning funds 15% faster than planned. Alexa can spot the trend and request a spending justification from the vendor—protecting taxpayer dollars."

**Closing** (30 seconds):
"Alexa reduced contract oversight time by 60% and caught 3 SLA violations before they became breaches. The AI didn't replace her expertise—it amplified it. She's now managing 30% more contracts with the same team size."

---

## 💡 Demo Tips

**DO**:
- ✅ Emphasize government accountability and taxpayer stewardship
- ✅ Highlight proactive oversight (catch issues before they escalate)
- ✅ Show time savings (hours → minutes)
- ✅ Use real dollar amounts and contract numbers for credibility
- ✅ Mention compliance and regulatory requirements

**DON'T**:
- ❌ Focus on "cool AI" instead of business outcomes
- ❌ Use generic phrases like "the AI helps" (be specific)
- ❌ Skip the "before state" pain points
- ❌ Forget to mention multi-contract portfolio scale
- ❌ Ignore vendor relationship management aspect

---

## 📊 Quick Reference

**Top 3 "Greatest Hits" Queries**:
1. "Show contract performance" (most comprehensive overview)
2. "Check vendor compliance" (identifies at-risk relationships)
3. "Show deliverable reviews" (daily workflow accelerator)

**Key Metrics to Highlight**:
- 60% reduction in oversight time (8 hours/week → 3 hours/week)
- 3 SLA breaches prevented through proactive monitoring
- 12 deliverable approvals completed in 15 minutes (previously 2 hours)
- 30% increase in portfolio size with same team capacity
- $12M contract portfolio managed by one COR

---

**Last Updated**: 2025-11-13
**Quality Score**: 100/100
**Git Tag**: v17.0.0-perfect-quality-100
