# Persona-Specific Data Files

**Purpose**: Provide 100% unique, realistic data for each persona to eliminate widget data reuse and create immersive, role-specific experiences.

**Status**: Phase 1 COMPLETE (6/6 personas) ✅ - All persona data files created

---

## Problem Statement

Previously, all personas shared the same widget data from `enhanced-demo-data.ts`, making the app feel repetitive. Users would see identical contract names, ticket numbers, and metrics regardless of which persona they selected.

**Example of the problem**:
- COR (government contract oversight) saw "Sprint 12" sprint data (software development)
- Project Manager (agile software) saw "Contract CON-042" (government contracts)
- All personas shared the same vendor names, employee names, and dates

---

## Solution: Persona-Specific Data Files

Each persona now has a dedicated data file with 100% unique content tailored to their role:

```
src/data/persona-data/
├── README.md (this file)
├── UNIQUENESS-VERIFICATION.md       ✅ COMPLETE (100% verification)
├── cor-data.ts                      ✅ COMPLETE (450+ lines, 5 exports)
├── project-manager-data.ts          ✅ COMPLETE (520+ lines, 5 exports)
├── program-manager-data.ts          ✅ COMPLETE (510+ lines, 5 exports)
├── stakeholder-lead-data.ts         ✅ COMPLETE (540+ lines, 5 exports)
├── service-team-lead-data.ts        ✅ COMPLETE (480+ lines, 5 exports)
└── service-team-member-data.ts      ✅ COMPLETE (500+ lines, 5 exports)
```

---

## Data Uniqueness Verification

### COR (Contracting Officer's Representative) - Alexa Johnson

**Role**: Government contract oversight for IT infrastructure projects

**Unique Data**:
- Contract: "Enterprise IT Infrastructure Modernization" (CON-2025-042, $2.5M)
- Vendor: "TechCorp Solutions Inc." (David Chen, PM)
- Focus: Security upgrades, data center migration, disaster recovery
- Deliverables: Network security, migration plans, audit reports
- Issues: Hardware delays, security clearance pending
- Budget: $2.5M total, $1.9M spent, 76% utilization

**Data NOT shared with other personas**: No sprint data, no agile terms, no mobile app references

---

### Project Manager - Dale Thompson

**Role**: Agile software development project management for mobile + web app

**Unique Data**:
- Sprint: "Sprint 24 - Q4 Feature Release" (Nov 4-17, 2025, 55 story points)
- Team: 8 developers (Aisha, Marcus, Elena, Priya, Carlos, Jordan, Sarah, QA)
- Focus: OAuth 2.0, payment gateway (Stripe), push notifications (FCM)
- Tasks: 20 unique tasks (TASK-387 through TASK-407)
- Blockers: Stripe API credentials, iOS build pipeline issues
- Velocity: 48.5 average, 92% predictability

**Data NOT shared with other personas**: No contracts, no vendors, no deliverables, no government terms

---

## Uniqueness Guarantees

### 1. No Shared Names
- **COR vendors**: TechCorp Solutions Inc., CloudSecure Systems LLC, NetSolutions Corp
- **PM team**: Aisha Okafor, Marcus Lee, Elena Volkov, Priya Sharma, Carlos Rivera, Jordan Kim, Sarah Chen
- **NO OVERLAP** between personas

### 2. No Shared Identifiers
- **COR**: CON-2025-042, DEL-042-001, ISS-042-008, VEN-TC-001
- **PM**: TASK-387, TASK-398, BLOCK-142, RISK-S24-001
- **NO OVERLAP** between personas

### 3. No Shared Dates
- **COR**: Fiscal year focus (FY 2025), quarterly reports, long contracts (2024-2026)
- **PM**: Sprint focus (2-week iterations), daily standups, Nov 4-17 sprint
- **Different cadences** and timelines

### 4. No Shared Business Context
- **COR**: Government contracts, compliance, SLAs, federal vendors, security clearances
- **PM**: Agile sprints, story points, velocity, OAuth, mobile apps, payment APIs
- **Completely different domains**

---

## Data Structure Examples

### COR Data Exports

```typescript
export const corContractPerformanceData: ContractPerformanceData = {
  contractId: 'CON-2025-042',
  vendor: { name: 'TechCorp Solutions Inc.', tier: 'tier-1' },
  financials: { totalValue: 2500000, spent: 1900000 },
  deliverables: [ ... ], // Government deliverables
};

export const corVendorComplianceData = { ... }; // Vendor tracking
export const corDeliverableReviewList = { ... }; // Pending approvals
export const corBudgetTrackingData = { ... }; // Financial oversight
export const corSLAComplianceData = { ... }; // SLA monitoring
```

### Project Manager Data Exports

```typescript
export const pmSprintBurndownData: SprintBurndownData = {
  sprint: { name: 'Sprint 24', totalStoryPoints: 55 },
  burndown: [ ... ], // Daily burndown
  risks: [ ... ], // Sprint risks
};

export const pmTeamVelocityData: TeamVelocityData = { ... }; // Velocity trends
export const pmTaskKanbanData: TaskKanbanData = { ... }; // Kanban board
export const pmResourceCapacityData = { ... }; // Team workload
export const pmBlockersDashboardData = { ... }; // Active blockers
```

---

## Naming Conventions

### File Naming
- Format: `{persona-id}-data.ts`
- Examples: `cor-data.ts`, `project-manager-data.ts`
- Lowercase with hyphens (kebab-case)

### Export Naming
- Individual exports: `{personaAbbrev}{WidgetName}Data`
  - Example: `corContractPerformanceData`, `pmSprintBurndownData`
- Bundle export: `{personaName}PersonaData`
  - Example: `corPersonaData`, `projectManagerPersonaData`
- Default export: Bundle object

### Variable Naming
- Use role-appropriate terms:
  - COR: contracts, vendors, deliverables, compliance, SLAs
  - PM: sprints, tasks, velocity, story points, blockers

---

## How Widgets Will Use This Data

**Phase 2** (next step) will update widgets to consume persona-specific data:

```typescript
// BEFORE (shared data)
import { enhancedContractPerformance } from '@/data/enhanced-demo-data';

// AFTER (persona-specific data)
import { corContractPerformanceData } from '@/data/persona-data/cor-data';
import { usePersona } from '@/hooks/use-persona';

function ContractWidget() {
  const { currentPersona } = usePersona();

  // Route to correct data based on persona
  const data = currentPersona.id === 'cor'
    ? corContractPerformanceData
    : null;

  if (!data) return <WidgetNotAvailable />;
  return <ContractPerformanceDashboard data={data} />;
}
```

---

## Remaining Work

### Phase 1: Data Creation (100% Complete ✅)

- [x] COR (Contracting Officer's Representative) - Alexa Johnson
- [x] Project Manager - Dale Thompson
- [x] Program Manager - Jennifer Chen (5 strategic programs, 15 milestones, portfolio management)
- [x] Stakeholder Lead - Patricia Kim (8 impact analyses, 15 requirements, 10 change requests)
- [x] Service Team Lead - Herbert Roberts (8 team members, code quality, 10 PRs, deployments)
- [x] Service Team Member - Molly Rivera (12 personal tasks, 6 tickets, 15 KB articles, time tracking)

### Phase 2: Widget Integration (0% Complete)

- [ ] Update WidgetRenderer.tsx to use persona-specific data
- [ ] Add persona context checks to all widgets
- [ ] Remove references to enhanced-demo-data.ts
- [ ] Test widget rendering for all 6 personas
- [ ] Verify no data leakage between personas

---

## Quality Checklist

Before marking a persona data file as "complete", verify:

- [ ] 100% unique names (people, companies, projects)
- [ ] 100% unique identifiers (IDs, ticket numbers, contract numbers)
- [ ] 100% unique dates (no date reuse across personas)
- [ ] 100% unique business context (role-appropriate terminology)
- [ ] At least 3-5 widgets worth of data (sufficient variety)
- [ ] Proper TypeScript types for all exports
- [ ] Realistic values (not placeholder/TODO text)
- [ ] Consistent with persona role from `src/data/personas.ts`

---

## Testing Strategy

### Manual Testing (Phase 2)
1. Switch to each persona in the UI
2. Trigger queries that render widgets
3. Verify widget data matches persona context
4. Check for any shared data leakage

### Automated Testing (Future)
```typescript
describe('Persona Data Uniqueness', () => {
  it('should have no shared names across personas', () => {
    const corNames = extractNames(corPersonaData);
    const pmNames = extractNames(projectManagerPersonaData);
    expect(intersection(corNames, pmNames)).toHaveLength(0);
  });

  it('should have no shared IDs across personas', () => {
    const corIds = extractIds(corPersonaData);
    const pmIds = extractIds(projectManagerPersonaData);
    expect(intersection(corIds, pmIds)).toHaveLength(0);
  });
});
```

---

## File Statistics

### cor-data.ts
- Lines: 450+
- Exports: 6 (5 data objects + 1 bundle)
- Unique names: 15+ (vendors, employees, contractors)
- Unique IDs: 30+ (contracts, deliverables, issues, vendors)
- Widgets supported: 5 (Contract Performance, Vendor Compliance, Deliverable Review, Budget Tracking, SLA Compliance)

### project-manager-data.ts
- Lines: 520+
- Exports: 6 (5 data objects + 1 bundle)
- Unique names: 12+ (team members, roles)
- Unique IDs: 40+ (tasks, blockers, risks)
- Widgets supported: 5 (Sprint Burndown, Team Velocity, Task Kanban, Resource Capacity, Blockers Dashboard)

---

## Contributing Guidelines

When creating remaining persona data files:

1. **Read the persona definition** in `src/data/personas.ts` first
2. **Review existing files** (cor-data.ts, project-manager-data.ts) for structure
3. **Brainstorm unique context** for the persona's role
4. **Generate realistic data** (use real company names, dates, metrics)
5. **Verify zero overlap** with existing persona data
6. **Export 3-5 widgets worth** of data minimum
7. **Add TypeScript types** for all data structures
8. **Document uniqueness** in comments

---

**Last Updated**: 2025-11-13
**Author**: Backend Developer Agent
**Status**: Phase 1 COMPLETE (6/6 personas) ✅ | Ready for Phase 2 (Widget Integration)
