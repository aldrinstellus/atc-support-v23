# V17 Mode Switcher: Persona Response Uniqueness Audit
## Wonder Woman's Truth-Seeking Mission

---

## CRITICAL FINDINGS: Response Uniqueness Issues

### Issue Summary
**SEVERITY**: HIGH
**TYPE**: Generic Response Text Duplication
**SCOPE**: 6 Personas × 10+ Widget Types = 60+ Generic Responses
**IMPACT**: Users cannot distinguish which persona they're using - responses are identical across roles

---

## Issue #1: "Here's the..." Generic Opening (MOST CRITICAL)

### Problem
The majority of responses follow identical template patterns: "Here's the [widget name]"

### Evidence
Counting identical response patterns:

```
"Here's the..." pattern: 35+ occurrences across ALL personas
"Here are the..." pattern: 20+ occurrences across ALL personas
"Here's your..." pattern: 15+ occurrences across ALL personas
```

### Examples of Duplication

**Government Mode - COR (Contracting Officer)**:
- Line 790: `"Here's the performance overview for your active contracts:"`
- Line 816: `"Here's the compliance status for your vendors:"`
- Line 825: `"Here's the budget utilization for your contracts:"`
- Line 834: `"Here's the SLA compliance status:"`
- Line 851: `"Here's your contract performance dashboard:"`

**Government Mode - Program Manager**:
- Line 869: `"Here's the overall program health status:"`
- Line 878: `"Here's the status of program milestones:"`
- Line 887: `"Here are the top program risks requiring attention:"`
- Line 896: `"Here's the schedule and budget variance analysis:"`
- Line 905: `"Here's the resource availability status:"`
- Line 913: `"Here's your program health dashboard:"`

**Government Mode - Stakeholder Lead**:
- Line 930: `"Here's the stakeholder engagement overview:"`
- Line 942: `"Here's the requirements tracking status:"`
- Line 954: `"Here are the change requests requiring review:"`
- Line 963: `"Here are your upcoming stakeholder meetings:"`
- Line 972: `"Here are the pending stakeholder action items:"`
- Line 981: `"Here's the requirements traceability analysis:"`
- Line 989: `"Here's your stakeholder engagement dashboard:"`

**Project Mode - Project Manager**:
- Line 1007: `"Here's the current sprint burndown chart:"`
- Line 1020: `"Here's the team velocity analysis:"`
- Line 1032: `"Here's the resource capacity overview:"`
- Line 1041: `"Here's the team velocity data for sprint planning:"`
- Line 1050: `"Here are the current blockers requiring resolution:"`
- Line 1058: `"Here's your sprint dashboard:"`

**Project Mode - Service Team Lead**:
- Line 1077: `"Here's the code quality dashboard:"`
- Line 1091: `"Here's the deployment pipeline status:"`
- Line 1103: `"Here's the blocker resolution dashboard:"`
- Line 1112: `"Here's the team workload overview:"`
- Line 1121: `"Here are the deployment performance metrics:"`
- Line 1129: `"Here's your code quality dashboard:"`

**Project Mode - Service Team Member**:
- Line 1149: `"Here are your assigned tasks:"`
- Line 1158: `"Here are the tasks for the current sprint:"`
- Line 1167: `"Here are the current blockers:"`
- Line 1176: `"Here are the code quality issues:"`
- Line 1190: `"Here's the relevant knowledge base article:"`
- Line 1198: `"Here's your task board:"`

---

## Issue #2: No Persona-Specific Terminology or Context

### Problem
Response text does NOT reflect role-specific language, concerns, or context

### Evidence by Persona

**COR (Contracting Officer) - SHOULD use**:
- Vendor-focused language ("vendor performance", "contract compliance", "deliverables")
- Financial terms ("budget utilization", "cost variance")
- Governance terms ("compliance", "SLA", "contract modifications")
- Current: Uses generic "Here's the..." instead

**Program Manager - SHOULD use**:
- Program/project language ("program health", "milestone status", "resource allocation")
- Cross-team terms ("dependencies", "stakeholder coordination", "risk mitigation")
- Timeline language ("schedule variance", "burndown", "capacity planning")
- Current: Uses generic "Here's the..." instead

**Stakeholder Lead - SHOULD use**:
- User-focused language ("stakeholder feedback", "user requirements", "impact analysis")
- Business terms ("user adoption", "feedback sentiment", "change impact")
- Communication terms ("engagement", "communication log", "feedback trends")
- Current: Uses generic "Here's the..." instead

**Project Manager - SHOULD use**:
- Agile/delivery terms ("sprint velocity", "sprint progress", "team capacity")
- Timeline language ("burndown", "velocity trends", "deadline tracking")
- Team language ("team capacity", "story point velocity")
- Current: Uses generic "Here's the..." instead

**Service Team Lead - SHOULD use**:
- Technical terms ("code quality", "deployment pipeline", "CI/CD metrics", "MTTR")
- Quality/DevOps language ("code coverage", "test automation", "incident response")
- Team management language ("code review", "team performance", "skill gaps")
- Current: Uses generic "Here's the..." instead

**Service Team Member - SHOULD use**:
- Individual contributor terms ("my tasks", "my assignments", "my blockers")
- Technical/learning terms ("knowledge base", "code standards", "documentation")
- Time-focused terms ("my progress", "my capacity", "skill development")
- Current: Uses generic "Here are..." instead

---

## Issue #3: Query Detection NOT Persona-Aware Enough

### Current Implementation
File: `/src/lib/query-detection.ts` (lines 66-100)

```typescript
export function detectWidgetQuery(
  query: string,
  personaId: PersonaId
): QueryMatch | null {
  const q = query.toLowerCase().trim();

  // Route based on persona
  switch (personaId) {
    case 'cor':
      return detectCORQuery(q);
    case 'program-manager':
      return detectProgramManagerQuery(q);
    // ... etc
  }
}
```

### Issue
- Routes to CORRECT persona functions ✅
- BUT: Response text is generic/boilerplate ❌
- Query patterns are OK but responses don't reflect persona uniqueness ❌

### Root Cause
Response templates don't vary by persona:
```typescript
// Current (Generic)
return {
  widgetType: 'contract-performance-dashboard',
  widgetData: contractPerformanceDemo,
  responseText: "Here's the performance overview for your active contracts:",
};

// Should be (Persona-Specific)
return {
  widgetType: 'contract-performance-dashboard',
  widgetData: contractPerformanceDemo,
  responseText: "Let me review your vendor contract performance metrics...",
};
```

---

## Issue #4: Widget Data NOT Persona-Customized

### Current Implementation
File: `/src/components/widgets/WidgetRenderer.tsx`

Widget rendering by type ONLY - no persona context passed:
```typescript
case 'contract-performance-dashboard':
  return <ContractPerformanceDashboardWidget data={data as ContractPerformanceData} />;
```

### Issue
- Each widget receives SAME data structure
- Data is NOT filtered/customized by persona role
- Widget visualization shows all fields equally
- COR might see "Team Assignments" field they don't need
- Program Manager might see "Vendor Name" field they don't care about

### Impact
- Response data looks the same across personas
- No visual differentiation in widget display
- Can't tell which persona is using the system

---

## Summary: Detection Report

### ✅ WHAT'S WORKING
1. **Persona Routing**: Correctly routes to persona-specific detection functions
2. **Quick Actions**: Each persona has truly unique Quick Actions in personas.ts
3. **Widget Selection**: Picks appropriate widget type per persona
4. **Demo Scenarios**: Each persona has unique demo scenarios

### ❌ WHAT'S BROKEN (Response Uniqueness)

| Aspect | Status | Issue |
|--------|--------|-------|
| Response Text | BROKEN | 70+ generic "Here's the..." responses |
| Persona Language | BROKEN | No role-specific terminology or context |
| Widget Data Filtering | BROKEN | Same data shown to all personas |
| Data Customization | BROKEN | No field hiding/reordering per role |
| Terminology | BROKEN | Generic "contract", "dashboard", "status" |

### Red Flags (From Code Analysis)

1. **Same Response for Different Roles**:
   - COR gets: "Here's the performance overview for your active contracts:"
   - PM gets: "Here's the overall program health status:"
   - BUT: Both are equally generic "Here's the..."

2. **No Persona Context in Templates**:
   - `/src/lib/response-templates.ts` has functions but NOT persona parameters
   - Could be: `getPasswordResetTemplate(customerName, personaId)`
   - Currently: `getPasswordResetTemplate(customerName)` only

3. **Widget Rendering Without Persona**:
   - `/src/components/widgets/WidgetRenderer.tsx` doesn't receive persona
   - Can't customize widget display per role
   - No way to hide/show fields based on persona

4. **Query Detection Doesn't Pass Full Context**:
   - `/src/lib/query-detection.ts` returns only widgetType + data + response
   - Doesn't include metadata about WHY this persona made this query
   - No persona-awareness in response generation

---

## Recommendations for Wonder Woman's Fix

### Priority 1: Fix Response Text (Critical)
**File**: `/src/lib/query-detection.ts`

Create persona-specific response templates:

```typescript
// Function to build persona-aware response
function buildPersonaResponse(
  personaId: PersonaId,
  widgetType: WidgetType,
  context?: Record<string, string>
): string {
  const responses: Record<PersonaId, Record<WidgetType, string>> = {
    'cor': {
      'contract-performance-dashboard':
        "Let me review your vendor contract performance and identify compliance issues...",
      'deliverable-review-list':
        "Here are the deliverables pending your approval. I've flagged quality concerns...",
      'vendor-compliance-dashboard':
        "Vendor SLA compliance analysis: [vendor name] at [percentage]% compliance..."
    },
    'program-manager': {
      'program-health-dashboard':
        "Program status: [X] milestones on track, [Y] at risk. Resource utilization at [%]...",
      'stakeholder-engagement-dashboard':
        "Stakeholder engagement: [X] stakeholders updated. [Y] action items pending..."
    },
    // ... etc
  };

  return responses[personaId]?.[widgetType] || "Here's the information you requested:";
}
```

### Priority 2: Customize Widget Data (High)
**File**: `/src/components/widgets/WidgetRenderer.tsx`

Pass persona to widget:
```typescript
interface WidgetRendererProps {
  type: WidgetType;
  data: WidgetData;
  personaId: PersonaId;  // ADD THIS
  onAction?: (action: string) => void;
}
```

### Priority 3: Add Persona Context to Templates (High)
**File**: `/src/lib/response-templates.ts`

Add persona parameter:
```typescript
export function getPasswordResetTemplate(
  customerName: string | undefined,
  personaId: PersonaId  // ADD THIS
): ResponseTemplate {
  // Customize response based on persona
  if (personaId === 'cor') {
    // Focus on vendor/contract compliance implications
  } else if (personaId === 'project-manager') {
    // Focus on team communication and documentation
  }
}
```

### Priority 4: Use Role-Specific Terminology (High)
**File**: `/src/lib/query-detection.ts`

Replace generic openers with persona language:

```typescript
// COR
"Let me review vendor contract performance and identify compliance gaps..."
"These deliverables require your approval..."
"SLA compliance analysis by vendor..."

// Program Manager
"Program health overview - milestones, risks, and resource status..."
"Stakeholder engagement status and pending actions..."
"Cross-project dependencies and critical path analysis..."

// Project Manager
"Current sprint status - velocity, capacity, and blockers..."
"Team capacity and skill allocation for upcoming sprints..."
"Sprint burndown and velocity trends..."

// Service Team Lead
"Code quality metrics including coverage, technical debt, and vulnerabilities..."
"CI/CD pipeline status and deployment performance metrics..."
"Code review backlog and team quality metrics..."

// Service Team Member
"Your assigned tasks and current sprint assignments..."
"Blockers affecting your work and resolution timeline..."
"Relevant knowledge base articles and team documentation..."
```

---

## Verification Checklist

After implementing fixes, verify:

- [ ] Each persona's responses use role-specific language
- [ ] Response text differs across personas (even for same widget)
- [ ] COR responses mention "vendor", "contract", "compliance", "deliverables"
- [ ] PM responses mention "program", "milestone", "stakeholder", "risk"
- [ ] Stakeholder Lead responses mention "engagement", "feedback", "requirements"
- [ ] Project Manager responses mention "sprint", "velocity", "capacity"
- [ ] Service Team Lead responses mention "code quality", "CI/CD", "MTTR"
- [ ] Service Team Member responses mention "my tasks", "my blockers", "my work"
- [ ] No generic "Here's the..." responses remain
- [ ] Widget data shown reflects persona role's needs

---

## Files Requiring Changes

1. **`/src/lib/query-detection.ts`** - Response text generation (MAJOR)
2. **`/src/lib/response-templates.ts`** - Add persona parameter (MODERATE)
3. **`/src/components/widgets/WidgetRenderer.tsx`** - Pass persona to widgets (MODERATE)
4. **Demo data files** - May need role-specific fields hidden/shown (if needed)

---

## Expected Impact

After fixes:
- ✅ Users can immediately tell which persona they're using
- ✅ Responses reflect role-specific concerns and terminology
- ✅ Widget data respects persona boundaries
- ✅ Professional, personalized experience across all 6 personas
- ✅ Each persona feels like a custom role, not a generic view

---

**Report Generated**: Wonder Woman's Persona Uniqueness Audit
**Mission Status**: Issues Identified - Ready for Fix Implementation
