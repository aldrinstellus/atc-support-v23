# PROJECT SAVEPOINT: V17 Demo Data Planning Session

**Date**: 2025-11-12
**Project**: Enterprise AI Support V17 Mode Switcher
**Session**: Demo Data Architecture & Persona Scenarios Planning
**Token Usage**: 135K/200K (67.5%) - Emergency savepoint before compaction
**Status**: Planning Phase - Ready for Implementation

---

## 🎯 Session Objective

Create comprehensive demo data architecture for V17's 6 personas (Government/Project modes) with realistic Zoho Help Desk scenarios for daily workflows.

---

## 📋 User Requirements (Confirmed)

1. **Data Approach**: Hybrid - Keep V14/V15 structure, add Government/Project-specific scenarios
2. **Scenario Count**: 20+ scenarios per persona (120+ total)
3. **Workflow Chains**: Yes - Include cross-persona workflows (COR → Program Manager → etc.)
4. **Database Size**: Lightweight (100-200 records total)
5. **Integration**: Zoho Help Desk as primary system
6. **Goal**: Concise, realistic daily queries that personas would actually ask

---

## 🔍 Comprehensive Research Completed

### V14/V15 Analysis Summary

**Plan Agent Research Findings**:
- ✅ Analyzed 2,623 lines of demo widget data (30+ datasets)
- ✅ Reviewed 739 lines of query detection patterns (100+ patterns)
- ✅ Examined 17 Zoho Help Desk tool integrations
- ✅ Studied persona-specific widget triggering flows
- ✅ Documented existing data structures and TypeScript interfaces

### Key Discoveries

**1. Existing Data Patterns (V14/V15)**:
- Strongly-typed TypeScript interfaces for all widget data
- Hierarchical organization: Executive → Manager → Agent granularity
- 30+ specialized widget types (Executive Summary, Team Workload, Ticket Detail, etc.)
- Realistic enterprise data with actual company names, metrics, ticket numbers

**2. Query → Widget Flow**:
- Two-stage detection: Exact match first, pattern match fallback
- Persona-aware routing (different patterns per persona)
- Priority system: Demo workflows > Exact queries > Persona patterns > Generic patterns

**3. V17 Persona Analysis**:

**Government Mode** (3 personas):
- **COR (Alexa Johnson)**: Contract monitoring, vendor management, compliance, budget
- **Program Manager (Jennifer Chen)**: Program health, resource management, stakeholder communication
- **Stakeholder Lead (Jessica Martinez)**: Requirements tracking, change management, user feedback

**Project Mode** (3 personas):
- **Project Manager (Dale Thompson)**: Sprint management, resource planning, risk management
- **Service Team Lead (Herbert Roberts)**: Team operations, quality assurance, deployment management
- **Service Team Member (Molly Rivera)**: Task execution, ticket resolution, knowledge management

**4. Current V17 Status**:
- ✅ HAS: 6 personas defined, Quick Actions (5 each), Basic scenarios (8 per persona = 48 total)
- ❌ NEEDS: 72 additional scenarios, 15+ new widget types, Government/Project demo data, workflow chains

---

## 🗄️ Recommended Database Schema (Lightweight 100-200 Records)

### Core Tables (8 total)

**1. Tickets** (40-50 records)
- Fields: id, priority, status, subject, customerId, assignedTo, createdAt, slaDeadline, tags, category, mode
- Categories: Contract, Requirements, Technical, Support
- Split: 25 Government, 25 Project

**2. Customers** (15-20 records)
- Fields: id, name, tier, arr, riskScore, riskLevel, contractRenewal, csm, mode
- Tiers: Enterprise Plus, Enterprise, Professional, Standard

**3. Users** (6 records - the 6 personas)
- Fields: id, mode, name, email, role, badgeLabel, badgeColor
- Exact match to V17 persona definitions

**4. Deliverables** (20-25 records) [Government Mode]
- Fields: id, contractId, name, dueDate, status, reviewedBy, qualityScore, issues
- Statuses: pending, submitted, approved, rejected

**5. Contracts** (10-12 records) [Government Mode]
- Fields: id, vendorId, value, startDate, endDate, status, slaCompliance, performanceScore
- Statuses: active, completed, terminated

**6. Sprints** (10-12 records) [Project Mode]
- Fields: id, name, startDate, endDate, status, velocity, capacity, teamId
- Statuses: planning, active, completed

**7. Tasks** (30-40 records) [Project Mode]
- Fields: id, sprintId, assignedTo, priority, status, storyPoints, blockedBy
- Statuses: todo, in-progress, review, done

**8. KnowledgeBase** (15-20 articles)
- Fields: id, title, category, content, videoUrl, viewCount, helpfulCount, mode
- Modes: government, project, both

**Total**: ~190 records (within 100-200 target)

---

## 🎭 Scenario Categories by Persona

### Government Mode

**COR (Alexa Johnson)** - 20+ scenarios:
- Contract Monitoring (6-8): Performance metrics, budget tracking, deliverable reviews
- Vendor Management (5-7): SLA compliance, performance reviews, escalations
- Compliance Reporting (4-6): Quarterly reports, audit trails, risk assessments
- Budget Operations (4-5): Modifications, utilization, forecasts

**Program Manager (Jennifer Chen)** - 20+ scenarios:
- Program Health (6-8): Dashboards, milestone tracking, risk management
- Resource Management (5-7): Allocation, capacity planning, skill gaps
- Stakeholder Communication (5-6): Briefings, reports, meeting prep
- Portfolio Management (4-5): Project dependencies, cross-project risks

**Stakeholder Lead (Jessica Martinez)** - 20+ scenarios:
- Requirements Tracking (6-8): Status, traceability, risk assessment
- Change Management (5-7): Request reviews, impact analysis, approvals
- User Feedback (4-6): Sentiment analysis, feature requests, pain points
- Communications (4-5): Meeting logs, decision records, escalation paths

### Project Mode

**Project Manager (Dale Thompson)** - 20+ scenarios:
- Sprint Management (6-8): Planning, progress tracking, velocity analysis
- Resource Planning (5-7): Capacity, allocation, overtime monitoring
- Risk Management (4-6): Blocker resolution, dependency tracking, mitigation
- Client Relations (4-5): Meetings, status reports, escalations

**Service Team Lead (Herbert Roberts)** - 20+ scenarios:
- Team Operations (6-8): Workload balance, capacity monitoring, support needs
- Quality Assurance (5-7): Code quality, test coverage, bug tracking
- Deployment Management (4-6): Pipeline status, release planning, rollbacks
- Performance Reviews (4-5): Team metrics, 1-on-1 prep, skill development

**Service Team Member (Molly Rivera)** - 20+ scenarios:
- Task Execution (6-8): Sprint tasks, priorities, time tracking
- Ticket Resolution (5-7): Support tickets, bug fixes, customer issues
- Knowledge Management (4-6): KB searches, documentation, solution sharing
- Collaboration (4-5): Standups, code reviews, blocker reporting

---

## 🔗 Workflow Chain Examples

### Example 1: Contract Deliverable Review
**Chain**: COR → Program Manager → Service Team Lead → Service Team Member

1. **COR**: "Show pending deliverables requiring review"
   - Widget: Deliverable Review List
   - Action: Select DEL-2847 (Q4 Security Audit Report)

2. **COR**: "What's the quality assessment for DEL-2847?"
   - Widget: Deliverable Quality Dashboard
   - Finding: 2 high-priority issues flagged
   - Action: Requests clarification from Program Manager

3. **Program Manager**: "Show deliverable DEL-2847 review status"
   - Widget: Deliverable Detail (with COR feedback)
   - Action: Assigns to Service Team Lead for remediation

4. **Service Team Lead**: "Show DEL-2847 remediation tasks"
   - Widget: Task Breakdown (2 issues → 4 tasks)
   - Action: Assigns to 2 team members

5. **Service Team Member**: "My tasks for DEL-2847"
   - Widget: Task List (assigned subtasks)
   - Action: Completes fixes, updates status

### Example 2: Production Incident Escalation
**Chain**: Service Team Member → Service Team Lead → Project Manager → Program Manager → Stakeholder Lead

1. **Service Team Member**: "Production deployment failing with auth errors"
2. **Service Team Lead**: "Show incident INC-5821 details"
3. **Project Manager**: "Show client impact for INC-5821"
4. **Program Manager**: "Show INC-5821 program impact"
5. **Stakeholder Lead**: "Show stakeholder impact for INC-5821"

---

## 🏗️ Implementation Phases (38-50 hours total)

### Phase 1: Foundation (Data Structure) - 4-6 hours
- Create TypeScript interfaces for Government/Project widgets
- Define 15+ new widget types in `src/types/widget.ts`
- Design lightweight database schema (8 tables, ~190 records)
- Create mock data generation scripts

### Phase 2: Demo Widget Data - 8-10 hours
- Create 15+ new demo datasets (contractPerformanceDemo, sprintBurndownDemo, etc.)
- Port V14/V15 structure with Government/Project context
- Ensure data cross-references (shared IDs, workflow chains)
- Add workflow chain markers (escalation paths, status transitions)

### Phase 3: Query Detection - 6-8 hours
- Add Government/Project persona routing in `detectWidgetQuery()`
- Create 6 new detection functions (one per persona)
- Define 100+ query patterns (20+ per persona)
- Test exact match vs pattern match fallbacks

### Phase 4: Zoho Integration - 4-5 hours
- Update ticket mock data structure (add category field)
- Create 50 realistic tickets (25 Government, 25 Project)
- Add 10 new API tool definitions
- Update `executeTool()` mock responses

### Phase 5: Widget Components - 12-15 hours
- Create 15+ new widget React components
- Ensure responsive design + Solar Dusk theme
- Add Framer Motion animations (consistent with V14/V15)
- Integrate Recharts for data visualizations

### Phase 6: Demo Scenarios - 4-6 hours
- Expand from 8 to 20+ scenarios per persona
- Create cross-persona workflow chains (5-7 chains)
- Add scenario categories (4-5 per persona)
- Document expected widget responses

---

## 📊 Gap Analysis: V17 vs V14/V15

### What V17 HAS ✅
- ✅ 6 personas defined (3 Gov, 3 Project)
- ✅ Quick Actions configured (5 each)
- ✅ Badge colors and themes
- ✅ Permissions defined
- ✅ Basic demo scenarios (8 per persona = 48 total)
- ✅ Persona switcher UI
- ✅ Query detection infrastructure

### What V17 NEEDS ❌

**Critical Gaps**:
1. ❌ Demo Widget Data - Zero Government/Project-specific widget demos
2. ❌ Query Detection Patterns - No Government/Project query patterns
3. ❌ Zoho Help Desk Integration - Mock data structure incomplete
4. ❌ Widget Types - Missing 15+ Government/Project widgets
5. ❌ Workflow Chains - No cross-persona data flow
6. ❌ Demo Scenarios - Only 48 total (need 120+)
7. ❌ Government Mode Data - Contracts, deliverables, compliance metrics
8. ❌ Project Mode Data - Sprints, story points, velocity, burndown
9. ❌ API Tool Definitions - No Government/Project tools
10. ❌ TypeScript Interfaces - No new data types

---

## 🎯 Sample Implementation (COR Persona)

### TypeScript Interface
```typescript
export interface ContractPerformanceData {
  title: string;
  contractId: string;
  contractName: string;
  vendor: {
    name: string;
    id: string;
    tier: 'prime' | 'subcontractor';
  };
  performance: {
    overallScore: number;
    slaCompliance: number;
    budgetUtilization: number;
    deliverableCompletion: number;
  };
  financials: {
    totalValue: number;
    spent: number;
    committed: number;
    remaining: number;
  };
  deliverables: Array<{
    id: string;
    name: string;
    dueDate: Date;
    status: 'pending' | 'submitted' | 'approved' | 'rejected';
    qualityScore: number;
  }>;
  issues: Array<{
    severity: 'critical' | 'high' | 'medium' | 'low';
    description: string;
    dueDate: Date;
    assignedTo: string;
  }>;
  recommendations: Array<{
    priority: 'critical' | 'high' | 'medium' | 'low';
    action: string;
    reason: string;
  }>;
}
```

### Demo Data Example
```typescript
export const contractPerformanceDemo: ContractPerformanceData = {
  title: 'Contract Performance Dashboard',
  contractId: 'CON-2025-042',
  contractName: 'Enterprise IT Infrastructure Modernization',
  vendor: {
    name: 'TechSolutions Inc.',
    id: 'VEND-1523',
    tier: 'prime',
  },
  performance: {
    overallScore: 87,
    slaCompliance: 92,
    budgetUtilization: 78,
    deliverableCompletion: 85,
  },
  // ... (see full example in research output)
};
```

### Query Patterns
```typescript
function detectGovCORQuery(q: string): QueryMatch | null {
  if (
    q.includes('contract performance') ||
    q.includes('contract status') ||
    (q.includes('show me') && q.includes('contract') && q.includes('active'))
  ) {
    return {
      widgetType: 'contract-performance-dashboard',
      widgetData: contractPerformanceDemo,
      responseText: "Here's the performance overview for your active contracts:",
    };
  }
  // ... 18+ more query patterns
}
```

**This pattern repeated 6 times** (once per persona) = Complete V17 implementation.

---

## 📁 Key Files to Modify

**Files Analyzed by Plan Agent**:
- ✅ `src/data/demo-widget-data.ts` (V14/V15/V17) - 2,623 lines
- ✅ `src/lib/query-detection.ts` (V14/V15/V17) - 739 lines
- ✅ `src/app/api/chat/route.ts` (V14/V15/V17)
- ✅ `src/data/personas.ts` (V17)
- ✅ `src/types/widget.ts`
- ✅ `src/components/widgets/` directory structure

**Files to Create/Modify in Implementation**:
1. `src/types/widget.ts` - Add 15+ new interfaces
2. `src/data/demo-widget-data.ts` - Add 15+ new datasets
3. `src/lib/query-detection.ts` - Add 6 new detection functions
4. `src/app/api/chat/route.ts` - Add 10 new tool definitions
5. `src/data/personas.ts` - Expand scenarios from 8 to 20+ per persona
6. `src/components/widgets/` - Create 15+ new widget components
7. `prisma/schema.prisma` - Add/update 8 tables (if using Prisma)
8. `src/data/mock-database.ts` - New file for 190 mock records

---

## 🚀 Next Session Action Plan

### To Resume Work:

1. **User types**: `/init`
2. **Oracle will**:
   - Restore this savepoint
   - Show token usage status
   - Present implementation phases
   - Ask which phase to start with

### Recommended Starting Point:

**Phase 1: Foundation (Data Structure)** - 4-6 hours
- Low risk, high value
- Unlocks parallel development of other phases
- Provides clear TypeScript contracts for team
- Can be implemented incrementally

### Files to Read First (Next Session):
```bash
cd /Users/admin/Documents/claudecode/workspaces/enterprise-ai-support/apps/v17-mode-switcher

# Read existing structures
cat src/types/widget.ts | head -100
cat src/data/demo-widget-data.ts | head -200
cat src/lib/query-detection.ts | head -150

# Review V17 personas
cat src/data/personas.ts | grep -A 20 "demoScenarios"
```

---

## 💰 Budget Status

**Current Session**:
- Tokens Used: 135K/200K (67.5%)
- Remaining: 65K (32.5%)
- Status: ⚠️ CAUTION - Approaching compaction threshold

**Savepoint Created**: Emergency savepoint at 67.5% usage (user-triggered)

**Recommendation**: Start new session with `/init` to restore full context window.

---

## 📝 Key Decisions Made

1. ✅ **Hybrid Approach**: Keep V14/V15 structure, add Government/Project scenarios
2. ✅ **120+ Scenarios**: 20+ per persona (comprehensive coverage)
3. ✅ **Workflow Chains**: Include cross-persona data flows
4. ✅ **Lightweight Database**: 100-200 records (8 tables, ~190 total)
5. ✅ **Phase 1 Start**: Begin with TypeScript interfaces and database schema
6. ✅ **Pattern Reuse**: Follow V14/V15 patterns for consistency

---

## 🎯 Success Metrics

**When Implementation Complete**:
- ✅ 6 personas × 20+ scenarios = 120+ total demo scenarios
- ✅ 15+ new widget types (Government/Project-specific)
- ✅ 100+ query patterns (persona-aware detection)
- ✅ 190 mock database records (realistic, cross-referenced)
- ✅ 5-7 workflow chains (cross-persona interactions)
- ✅ 10+ new Zoho Help Desk API tools
- ✅ All widgets themed with Solar Dusk palette
- ✅ Production-ready demo for client presentations

---

## 📚 Reference Documentation

**Plan Agent Research Output**: Complete analysis document included in conversation history (10+ sections, 9000+ words)

**Key Sections**:
1. Existing Data Patterns (V14/V15)
2. Query → Widget Flow
3. Persona Analysis (V17)
4. Zoho Help Desk Patterns
5. Scenario Categories
6. Workflow Chains
7. Database Schema
8. Gap Analysis
9. Recommendations
10. Sample Implementation

**Total Research**: Comprehensive codebase analysis across V14/V15/V17 versions.

---

## 🔄 Session Recovery Instructions

**To Continue Next Session**:

```bash
# 1. Navigate to V17 project
cd /Users/admin/Documents/claudecode/workspaces/enterprise-ai-support/apps/v17-mode-switcher

# 2. Start new Claude Code conversation
# Type: /init

# 3. Oracle will present this savepoint and ask:
# "Ready to continue Phase 1: Foundation (Data Structure)?"

# 4. User confirms, Oracle begins implementation
```

---

**Savepoint Created**: 2025-11-12 08:50 UTC
**Token Usage**: 135K/200K (67.5%)
**Status**: ✅ Planning Complete - Ready for Implementation
**Next Session**: Start with Phase 1 (TypeScript interfaces + database schema)
**Estimated Completion**: 38-50 hours (1 week focused development)
