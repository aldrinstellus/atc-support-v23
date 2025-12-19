# CSM PERSONA GUIDE
## Customer Success Manager - Jordan Taylor

**Last Updated**: 2025-11-09
**Version**: V15-Presentation (NEW PERSONA)

---

## 📋 PERSONA PROFILE

**Name**: Jordan Taylor
**Email**: jordan.taylor@company.com
**Role**: Customer Success Manager
**Badge**: CSM (Cyan)
**Status**: ✨ **NEW IN V15**

---

## 🎯 ROLE OVERVIEW

Customer Success Managers focus on:
- 📊 Client health monitoring and risk mitigation
- 📈 Product adoption and feature usage tracking
- 💰 Renewal management and expansion opportunities
- 🎤 Client feedback and NPS score analysis
- 📅 Business review meetings and relationship management
- 🚀 Product roadmap alignment with client needs

---

## ⚡ QUICK ACTIONS (7 TOTAL)

### **1. Client Health Scores**
- **Query**: "Show me health scores for my assigned clients"
- **Expected Widget**: Client Health Dashboard
- **Badge**: Live (Cyan)
- **Use Case**: Monitor overall client portfolio health
- **Key Metrics**: Health score, engagement level, product usage, support tickets

### **2. Product Adoption**
- **Query**: "Show product adoption metrics and feature usage across clients"
- **Expected Widget**: Adoption Metrics Widget
- **Badge**: Metrics (Green)
- **Use Case**: Track feature adoption across client base
- **Key Metrics**: Feature adoption rate, usage frequency, active users, time to value

### **3. Renewal Pipeline**
- **Query**: "Show upcoming renewals and contract status"
- **Expected Widget**: Renewal Pipeline Widget
- **Badge**: 12 (Orange)
- **Use Case**: Manage contract renewals proactively
- **Key Metrics**: Renewal date, contract value, renewal probability, expansion opportunities

### **4. Client Feedback**
- **Query**: "Show recent client feedback and NPS scores"
- **Expected Widget**: NPS Dashboard
- **Badge**: NPS (Purple)
- **Use Case**: Monitor client satisfaction and sentiment
- **Key Metrics**: NPS score, feedback trends, satisfaction ratings, churn risk indicators

### **5. Upsell Opportunities**
- **Query**: "Identify upsell and cross-sell opportunities"
- **Expected Widget**: Upsell Opportunities List
- **Badge**: $2.4M (Yellow)
- **Use Case**: Drive revenue expansion
- **Key Metrics**: Expansion potential, feature usage gaps, seat expansion opportunities

### **6. Product Roadmap**
- **Query**: "Show product roadmap and upcoming features"
- **Expected Widget**: Roadmap Timeline
- **Badge**: Q1 (Blue)
- **Use Case**: Align client expectations with product development
- **Key Metrics**: Feature release dates, feature requests from clients, roadmap priorities

### **7. Client Meetings**
- **Query**: "Schedule and manage client business reviews"
- **Expected Widget**: Meeting Scheduler
- **Badge**: 8 (Cyan)
- **Use Case**: Organize quarterly business reviews (QBRs)
- **Key Metrics**: Meeting schedule, attendance, action items, follow-ups

---

## 📚 DEMO SCENARIOS

**Note**: CSM persona currently has Quick Actions defined but demo scenarios are being developed. Below are recommended scenarios based on CSM role responsibilities.

### **Category 1: Client Health Management** (4 queries)

**Scenario 1**: Monitor client portfolio health
- **Query**: "Show me health scores for all my assigned clients"
- **Expected Response**: Client health dashboard with scores, risk levels, and engagement metrics
- **Follow-up Actions**: Identify at-risk clients, schedule check-in calls

**Scenario 2**: Identify declining adoption
- **Query**: "Which clients have declining product adoption?"
- **Expected Response**: List of clients with decreasing usage trends
- **Key Indicators**: Usage drop %, feature abandonment, login frequency

**Scenario 3**: Churn risk assessment
- **Query**: "Show me clients at risk of churn this quarter"
- **Expected Response**: Risk-scored client list with churn indicators
- **Mitigation Actions**: Outreach plan, success plan review, escalation to leadership

**Scenario 4**: Engagement trend analysis
- **Query**: "Compare client engagement trends month-over-month"
- **Expected Response**: Engagement trend charts with MoM comparisons
- **Insights**: Growth clients, stable clients, declining clients

---

### **Category 2: Revenue Growth** (4 queries)

**Scenario 1**: Renewal pipeline management
- **Query**: "Show upcoming renewals in next 90 days"
- **Expected Response**: Renewal pipeline with contract details
- **Actions**: Prepare renewal proposals, schedule renewal discussions

**Scenario 2**: Expansion opportunity identification
- **Query**: "Identify expansion opportunities across my portfolio"
- **Expected Response**: Expansion-ready clients with growth potential
- **Signals**: High engagement, feature requests, seat utilization

**Scenario 3**: Premium tier upgrades
- **Query**: "Show clients ready for premium tier upgrade"
- **Expected Response**: Clients using features only available in premium
- **Conversion Strategy**: ROI analysis, feature comparison, pricing proposal

**Scenario 4**: Revenue metrics analysis
- **Query**: "Analyze revenue retention and expansion metrics"
- **Expected Response**: Net revenue retention (NRR), gross retention, expansion MRR
- **Targets**: >100% NRR, >95% gross retention, 20% expansion rate

---

### **Category 3: Client Engagement** (4 queries)

**Scenario 1**: NPS survey analysis
- **Query**: "Show recent NPS survey results by client"
- **Expected Response**: NPS scores with verbatim feedback
- **Actions**: Follow up with detractors, amplify promoter feedback

**Scenario 2**: Business review scheduling
- **Query**: "Which clients need business review meetings?"
- **Expected Response**: Clients overdue for QBR or scheduled reviews
- **Preparation**: Metrics deck, success plan review, roadmap preview

**Scenario 3**: Feature request tracking
- **Query**: "Show product roadmap items most requested by clients"
- **Expected Response**: Feature requests ranked by client demand
- **Communication**: Update clients on request status, manage expectations

**Scenario 4**: QBR scheduling
- **Query**: "Schedule quarterly business reviews for top accounts"
- **Expected Response**: Calendar integration with meeting scheduler
- **QBR Agenda**: Performance review, success metrics, roadmap alignment

---

## 🔒 PERMISSIONS (10 RECOMMENDED)

**Note**: CSM persona currently has an empty permissions array in the codebase. Below are recommended permissions based on CSM role responsibilities:

- ✅ `view_client_health` - Access client health scores and risk indicators
- ✅ `view_product_adoption` - View feature usage and adoption metrics
- ✅ `view_renewal_pipeline` - Access contract renewal data
- ✅ `view_nps_scores` - View customer satisfaction surveys
- ✅ `manage_client_meetings` - Schedule and manage QBRs
- ✅ `view_upsell_opportunities` - Access expansion opportunity data
- ✅ `view_product_roadmap` - View product development timeline
- ✅ `view_client_feedback` - Access customer feedback and requests
- ✅ `schedule_business_reviews` - Organize quarterly reviews
- ✅ `view_expansion_metrics` - Access revenue expansion data

---

## 🎨 THEME & VISUAL IDENTITY

**Primary Color**: Cyan (`oklch(0.68 0.14 210)`)
**Accent Color**: Blue (`oklch(0.64 0.18 240)`)
**Badge Gradient**: `from-cyan-500 via-blue-500 to-cyan-500`
**Badge Solid**: `bg-cyan-500`
**Badge Ring**: `ring-cyan-500/30`

**Icon**: Target (representing client success goals)

---

## 🚀 USAGE EXAMPLES

### **Example 1: Morning Health Check**
```
User: "Show me health scores for all my assigned clients"
Response: Client health dashboard renders
- 15 clients total
- 3 at-risk (red)
- 5 stable (yellow)
- 7 healthy (green)
Action: Schedule calls with 3 at-risk clients
```

### **Example 2: Renewal Preparation**
```
User: "Show upcoming renewals in next 90 days"
Response: Renewal pipeline widget
- 12 contracts renewing
- Total ARR: $2.4M
- Renewal probability: 85% average
Action: Prepare renewal proposals for top 5 contracts
```

### **Example 3: Expansion Opportunity**
```
User: "Identify upsell and cross-sell opportunities"
Response: Upsell opportunities list
- Client A: Add 50 seats ($60K ARR)
- Client B: Upgrade to Enterprise ($120K ARR)
- Client C: Add premium features ($45K ARR)
Total Potential: $225K expansion ARR
Action: Prepare ROI analysis for each opportunity
```

### **Example 4: Client Satisfaction Review**
```
User: "Show recent client feedback and NPS scores"
Response: NPS Dashboard widget
- Overall NPS: +52 (Excellent)
- Promoters: 65%
- Passives: 22%
- Detractors: 13%
Top themes: "Easy to use", "Great support", "Missing feature X"
Action: Follow up with 5 detractors to address concerns
```

### **Example 5: Roadmap Alignment**
```
User: "Show product roadmap and upcoming features"
Response: Roadmap Timeline widget
Q1 2026:
- Advanced Analytics (requested by 8 clients)
- Mobile App v2.0 (requested by 12 clients)
- API Enhancements (requested by 5 clients)
Action: Update clients on most-requested features
```

---

## 📊 SUCCESS METRICS

**For CSM Persona**:
- Net Revenue Retention (NRR): Target >110%
- Gross Retention Rate: Target >95%
- Client Health Score: Target average >80/100
- NPS Score: Target >50 (promoters - detractors)
- Expansion Rate: Target 20% of existing ARR
- QBR Completion: 100% of enterprise clients per quarter
- Time to Value: <90 days for new clients
- Feature Adoption: >70% of purchased features actively used

---

## 🎯 BEST PRACTICES

1. **Daily Health Monitoring**: Check client health scores every morning
2. **Proactive Outreach**: Contact at-risk clients within 24 hours
3. **Regular QBRs**: Quarterly reviews for all enterprise clients
4. **Feature Evangelism**: Drive adoption of underutilized features
5. **Feedback Loop**: Share client requests with product team weekly
6. **Renewal Planning**: Begin renewal discussions 90 days before contract end
7. **Expansion Focus**: Identify expansion opportunities in every client interaction
8. **Data-Driven Decisions**: Use metrics to guide client success strategies

---

## 🔗 RELATED DOCUMENTATION

- [Multi-Persona System](./MULTI-PERSONA-SYSTEM.md) - Overview of all 4 personas
- [Widget Catalog](../07-components/WIDGET-CATALOG.md) - All available widgets
- [AI Workflows](../14-workflows/WORKFLOW-OVERVIEW.md) - Automated workflows
- [API Integration](../03-api/API-OVERVIEW.md) - Data sources and integrations

---

## ⚠️ IMPLEMENTATION STATUS

**Current Status**: CSM persona is defined in codebase but requires additional implementation:

1. ✅ **Completed**:
   - Persona profile with badge and theme
   - 7 Quick Actions defined with icons and queries
   - Theme colors and visual identity

2. ⏳ **Pending**:
   - Demo scenarios implementation (currently empty in codebase)
   - Permissions array population (currently empty in codebase)
   - Widget implementations for CSM-specific queries
   - Query detection patterns for CSM persona

3. 🔄 **Recommended Next Steps**:
   - Implement demo scenarios (12 total across 3 categories)
   - Define and implement 10 CSM-specific permissions
   - Create widgets: Client Health Dashboard, Adoption Metrics, Renewal Pipeline, NPS Dashboard
   - Add CSM query patterns to `src/lib/query-detection.ts`
   - Test all Quick Actions in development environment

---

**CSM Persona Status**: ⚠️ **PARTIAL** (V15-Presentation)
**Quick Actions**: ✅ Complete (7/7)
**Demo Scenarios**: ⏳ Pending (0/12 recommended)
**Permissions**: ⏳ Pending (0/10 recommended)
**Widgets**: ⏳ Pending (4 required widgets)

**Next Steps**: Complete demo scenarios, permissions, and widget implementations for full CSM persona functionality.

---
