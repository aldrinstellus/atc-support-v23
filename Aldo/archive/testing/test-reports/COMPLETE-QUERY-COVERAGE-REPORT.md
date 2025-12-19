# V17 Mode Switcher: Complete Query Coverage Report

**Date**: 2025-11-13
**Purpose**: Document ALL supported queries for each persona
**Status**: ✅ Complete inventory of all 38 unique responses

---

## 📊 Summary Statistics

| Persona | Mode | Unique Responses | Query Patterns | Status |
|---------|------|------------------|----------------|--------|
| COR | Government | 7 | 6 patterns + 1 default | ✅ ALL UNIQUE |
| Program Manager | Government | 6 | 5 patterns + 1 default | ✅ ALL UNIQUE |
| Stakeholder Lead | Government | 7 | 6 patterns + 1 default | ✅ ALL UNIQUE |
| Project Manager | Project | 6 | 5 patterns + 1 default | ✅ ALL UNIQUE |
| Service Team Lead | Project | 6 | 5 patterns + 1 default | ✅ ALL UNIQUE |
| Service Team Member | Project | 6 | 5 patterns + 1 default | ✅ ALL UNIQUE |

**Total Unique Responses**: 38
**Total Query Patterns**: 32 + 6 defaults

---

## 🏛️ GOVERNMENT MODE PERSONAS

### PERSONA 1: COR (Contracting Officer's Representative)

**Name**: Alexa Johnson
**Badge**: COR (Blue/Purple)
**Focus**: Contracts, vendors, deliverables, compliance

#### Supported Queries (7 responses):

1. **Contract Performance** (Line 790)
   - Triggers: `contract performance`, `contract status`, `show contract active`
   - Response: "Your contract portfolio shows performance metrics across all active contracts:"
   - Widget: Contract Performance Dashboard
   - ✅ **TESTED** (Screenshot: `cor/01-contract-performance.png`)

2. **Deliverable Reviews** (Line 803)
   - Triggers: `deliverable review`, `pending deliverables`, `deliverable approve`
   - Response: "Deliverable review queue shows items requiring your attention and approval:"
   - Widget: Deliverable Review List
   - 🟡 **NOT TESTED YET**

3. **Vendor Compliance** (Line 816)
   - Triggers: `vendor compliance`, `vendor performance`, `vendor sla`
   - Response: "Vendor compliance monitoring indicates the following status across your portfolio:"
   - Widget: Vendor Compliance Dashboard
   - ✅ **TESTED** (Screenshot: `cor/02-vendor-compliance.png`)

4. **Budget Tracking** (Line 825)
   - Triggers: `budget status`, `budget utilization`, `budget remaining`
   - Response: "Budget tracking for CON-2025-042 shows utilization against allocated funds:"
   - Widget: Contract Performance Dashboard
   - 🟡 **NOT TESTED YET**

5. **SLA Compliance** (Line 834)
   - Triggers: `sla compliance`, `sla breach`, `sla violation`
   - Response: "SLA compliance analysis reveals vendor performance against contractual obligations:"
   - Widget: Vendor Compliance Dashboard
   - 🟡 **NOT TESTED YET**

6. **Quality Issues** (Line 843)
   - Triggers: `quality issue`, `quality score`, `quality problem`
   - Response: "Quality assurance review identifies deliverables with technical concerns requiring resolution:"
   - Widget: Deliverable Review List
   - 🟡 **NOT TESTED YET**

7. **Default** (Line 851)
   - Triggers: Any unmatched query
   - Response: "Contract oversight dashboard displays performance tracking for your active portfolio:"
   - Widget: Contract Performance Dashboard
   - 🟡 **NOT TESTED YET**

---

### PERSONA 2: Program Manager

**Name**: Jennifer Chen
**Badge**: PM (Purple)
**Focus**: Program health, milestones, stakeholders, risks

#### Supported Queries (6 responses):

1. **Program Health** (Line 869)
   - Triggers: `program health`, `program status`, `program overview`
   - Response: "Program health assessment for eGrants Modernization indicates overall status:"
   - Widget: Program Health Dashboard
   - ✅ **TESTED** (Screenshot: `program-manager/01-program-health.png`)

2. **Milestones** (Line 878)
   - Triggers: `milestone status`, `milestone track`, `milestone progress`
   - Response: "Strategic milestone tracking shows progress across Phase 2 implementation:"
   - Widget: Program Health Dashboard
   - ✅ **TESTED** (Screenshot: `program-manager/02-milestone-tracking.png`)

3. **Risks** (Line 887)
   - Triggers: `risk top`, `risk critical`, `risk high`
   - Response: "Cross-project risk analysis reveals critical items requiring executive attention:"
   - Widget: Program Health Dashboard
   - 🟡 **NOT TESTED YET**

4. **Budget/Schedule Variance** (Line 896)
   - Triggers: `variance`, `schedule status`
   - Response: "Schedule and budget variance analysis indicates deviation from baseline plan:"
   - Widget: Program Health Dashboard
   - 🟡 **NOT TESTED YET**

5. **Resources** (Line 905)
   - Triggers: `resource availability`, `resource allocation`, `resource capacity`
   - Response: "Resource allocation across initiatives shows capacity and utilization:"
   - Widget: Program Health Dashboard
   - 🟡 **NOT TESTED YET**

6. **Default** (Line 913)
   - Triggers: Any unmatched query
   - Response: "Program portfolio dashboard displays strategic oversight for all initiatives:"
   - Widget: Program Health Dashboard
   - 🟡 **NOT TESTED YET**

---

### PERSONA 3: Stakeholder Lead

**Name**: Jessica Martinez
**Badge**: STAKEHOLDER (Teal)
**Focus**: Engagement, requirements, feedback, communication

#### Supported Queries (7 responses):

1. **Stakeholder Engagement** (Line 930)
   - Triggers: `stakeholder engagement`, `stakeholder overview`, `engagement status`
   - Response: "Stakeholder relationship tracking shows communication effectiveness with DNR leadership:"
   - Widget: Stakeholder Engagement Dashboard
   - ✅ **TESTED** (Screenshot: `stakeholder-lead/01-stakeholder-engagement.png`)

2. **Requirements Tracking** (Line 942)
   - Triggers: `requirement track`, `requirement status`, `requirement progress`, `requirements tracking`
   - Response: "Requirements validation indicates fulfillment status across all program objectives:"
   - Widget: Requirements Tracking Dashboard
   - 🟡 **NOT TESTED YET**

3. **Change Requests** (Line 954)
   - Triggers: `change request`, `change pending`, `change approval`, `change approved`
   - Response: "Change request pipeline shows items requiring stakeholder review and approval:"
   - Widget: Change Request Dashboard
   - 🟡 **NOT TESTED YET**

4. **Meetings** (Line 963)
   - Triggers: `meeting upcoming`, `meeting schedule`, `meeting next`
   - Response: "Upcoming stakeholder coordination meetings with DNR program office:"
   - Widget: Stakeholder Engagement Dashboard
   - 🟡 **NOT TESTED YET**

5. **Action Items** (Line 972)
   - Triggers: `action item`, `action pending`
   - Response: "Pending action items from stakeholder meetings require follow-up and closure:"
   - Widget: Stakeholder Engagement Dashboard
   - 🟡 **NOT TESTED YET**

6. **Traceability** (Line 981)
   - Triggers: `traceability`, `requirement coverage`
   - Response: "Requirements traceability matrix shows coverage from business needs to implementation:"
   - Widget: Requirements Tracking Dashboard
   - 🟡 **NOT TESTED YET**

7. **Default** (Line 989)
   - Triggers: Any unmatched query
   - Response: "Stakeholder management dashboard displays engagement status across all groups:"
   - Widget: Stakeholder Engagement Dashboard
   - 🟡 **NOT TESTED YET**

---

## 💼 PROJECT MODE PERSONAS

### PERSONA 4: Project Manager

**Name**: Dale Thompson
**Badge**: PM (Indigo)
**Focus**: Sprints, velocity, capacity, burndown

#### Supported Queries (6 responses):

1. **Sprint Velocity / Burndown** (Line 1007)
   - Triggers: `sprint burndown`, `current sprint`, `sprint velocity`
   - Response: "Sprint 24 velocity tracking shows current progress against commitment:"
   - Widget: Sprint Dashboard
   - ✅ **TESTED** (Screenshot: `project-manager/01-sprint-velocity.png`)

2. **Team Velocity** (Line 1020)
   - Triggers: `team velocity`, `velocity analysis`, `velocity trend`
   - Response: "Team capacity analysis indicates velocity trends across the last 6 sprints:"
   - Widget: Sprint Dashboard
   - 🟡 **NOT TESTED YET**

3. **Resource Capacity** (Line 1032)
   - Triggers: `resource capacity`, `team capacity`, `capacity overview`
   - Response: "Resource allocation for current sprint shows team availability and utilization:"
   - Widget: Sprint Dashboard
   - 🟡 **NOT TESTED YET**

4. **Sprint Planning** (Line 1041)
   - Triggers: `sprint planning`, `velocity data`, `sprint plan`
   - Response: "Sprint planning data shows historical velocity for capacity-based commitment:"
   - Widget: Sprint Dashboard
   - 🟡 **NOT TESTED YET**

5. **Blockers** (Line 1050)
   - Triggers: `blocker`, `current blocker`, `sprint blocker`
   - Response: "Blocker resolution status requires immediate attention from scrum master:"
   - Widget: Sprint Dashboard
   - 🟡 **NOT TESTED YET**

6. **Default** (Line 1058)
   - Triggers: Any unmatched query
   - Response: "Sprint dashboard shows current iteration progress and team velocity:"
   - Widget: Sprint Dashboard
   - 🟡 **NOT TESTED YET**

---

### PERSONA 5: Service Team Lead

**Name**: Herbert Roberts
**Badge**: LEAD (Amber)
**Focus**: Code quality, CI/CD, technical debt, DORA metrics

#### Supported Queries (6 responses):

1. **Code Quality** (Line 1077)
   - Triggers: `code quality`, `quality dashboard`, `technical debt`
   - Response: "Code quality metrics show technical debt trends and test coverage status:"
   - Widget: Code Quality Dashboard
   - ✅ **TESTED** (Screenshot: `service-team-lead/01-code-quality.png`)

2. **Deployment Pipeline** (Line 1091)
   - Triggers: `deployment pipeline`, `deployment status`, `pipeline health`
   - Response: "Deployment pipeline health indicates CI/CD success rates and build times:"
   - Widget: Code Quality Dashboard
   - 🟡 **NOT TESTED YET**

3. **Blockers** (Line 1103)
   - Triggers: `blocker resolution`, `technical blocker`, `blocker dashboard`
   - Response: "Technical blocker resolution requires engineering team intervention:"
   - Widget: Code Quality Dashboard
   - 🟡 **NOT TESTED YET**

4. **Team Workload** (Line 1112)
   - Triggers: `team workload`, `workload overview`, `team capacity`
   - Response: "Team performance tracking shows developer workload and sprint capacity:"
   - Widget: Code Quality Dashboard
   - 🟡 **NOT TESTED YET**

5. **Deployment Performance** (Line 1121)
   - Triggers: `deployment performance`, `deployment metrics`, `dora metrics`
   - Response: "DORA metrics analysis reveals deployment frequency and lead time performance:"
   - Widget: Code Quality Dashboard
   - 🟡 **NOT TESTED YET**

6. **Default** (Line 1129)
   - Triggers: Any unmatched query
   - Response: "Code quality analysis dashboard displays technical health and engineering excellence:"
   - Widget: Code Quality Dashboard
   - 🟡 **NOT TESTED YET**

---

### PERSONA 6: Service Team Member

**Name**: Molly Rivera
**Badge**: DEVELOPER (Cyan)
**Focus**: My tasks, my blockers, my work items

#### Supported Queries (6 responses):

1. **My Tasks** (Line 1149)
   - Triggers: `my tasks`, `assigned tasks`, `my assignments`
   - Response: "Your task board shows current sprint assignments with priority and status:"
   - Widget: Task Board
   - ✅ **TESTED** (Screenshot: `service-team-member/01-my-tasks.png`)

2. **Sprint Tasks** (Line 1158)
   - Triggers: `sprint task`, `current sprint task`
   - Response: "Sprint assignments require completion before next standup meeting:"
   - Widget: Task Board
   - 🟡 **NOT TESTED YET**

3. **Blockers** (Line 1167)
   - Triggers: `current blocker`, `my blocker`, `blocked task`
   - Response: "Blocker status for your work requires team lead escalation:"
   - Widget: Task Board
   - 🟡 **NOT TESTED YET**

4. **Code Quality Issues** (Line 1176)
   - Triggers: `code quality`, `quality issue`, `pr quality`
   - Response: "Code quality issues in your PRs need attention before merge:"
   - Widget: Task Board
   - 🟡 **NOT TESTED YET**

5. **Knowledge Base** (Line 1190)
   - Triggers: `knowledge base`, `search knowledge`, `documentation`
   - Response: "Knowledge base search found technical documentation for your query:"
   - Widget: Knowledge Article
   - 🟡 **NOT TESTED YET**

6. **Default** (Line 1198)
   - Triggers: Any unmatched query
   - Response: "Developer task board displays your current work items and sprint progress:"
   - Widget: Task Board
   - 🟡 **NOT TESTED YET**

---

## 📊 Testing Coverage Summary

### Tested Queries (8/38 = 21%)
- ✅ COR: Contract Performance (2 tests)
- ✅ Program Manager: Program Health + Milestones (2 tests)
- ✅ Stakeholder Lead: Engagement (1 test)
- ✅ Project Manager: Sprint Velocity (1 test)
- ✅ Service Team Lead: Code Quality (1 test)
- ✅ Service Team Member: My Tasks (1 test)

### Not Yet Tested (30/38 = 79%)
- 🟡 COR: 5 remaining queries
- 🟡 Program Manager: 4 remaining queries
- 🟡 Stakeholder Lead: 6 remaining queries
- 🟡 Project Manager: 5 remaining queries
- 🟡 Service Team Lead: 5 remaining queries
- 🟡 Service Team Member: 5 remaining queries

---

## 🎯 Recommended Additional Testing

To achieve 100% query coverage, test these high-priority scenarios:

### Government Mode
1. **COR**: "Show deliverable reviews", "Show budget status", "Show SLA compliance"
2. **Program Manager**: "Show risks", "Show resource allocation"
3. **Stakeholder Lead**: "Show change requests", "Show requirements tracking"

### Project Mode
4. **Project Manager**: "Show team capacity", "Show blockers"
5. **Service Team Lead**: "Show deployment pipeline", "Show team workload"
6. **Service Team Member**: "Show my blockers", "Search knowledge base"

---

## ✅ Quality Verification

### What We Confirmed (21% tested):
- ✅ All 6 personas have unique response text
- ✅ No generic "Here's the..." patterns
- ✅ Role-specific terminology used
- ✅ Professional action-oriented language

### What We Know (but haven't tested):
- ✅ All 38 responses exist in code
- ✅ All responses are unique per persona
- ✅ All use professional language
- ✅ All follow pattern established in tested queries

---

## 📋 Next Steps for Complete Coverage

If Aldo wants 100% query testing:

1. **Create Automated Test Suite**
   - Test all 38 query patterns
   - Capture screenshot for each
   - Verify unique responses

2. **Estimated Time**
   - 30 remaining queries × 30 seconds = 15 minutes

3. **Value**
   - Complete visual documentation
   - 100% coverage proof
   - Production confidence

**Current Status**: ✅ **Representative testing complete** (all 6 personas verified unique)

**Full Coverage Status**: 🟡 **21% tested, 79% verified in code but not screenshot-tested**

---

**Report Generated**: 2025-11-13
**Coverage**: 8/38 queries tested (21%), all 38 responses verified unique in code
**Status**: ✅ **PERSONA UNIQUENESS CONFIRMED** (further testing optional)
