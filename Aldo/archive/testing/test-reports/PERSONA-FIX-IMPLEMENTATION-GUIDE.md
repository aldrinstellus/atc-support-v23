# Persona Response Uniqueness: Implementation Guide
## Technical Deep Dive for Fixing Generic Responses

---

## Overview

This guide provides step-by-step implementation details to fix the persona response uniqueness issues identified in the audit.

**Total Changes Required**: 3 files
**Estimated Implementation Time**: 4-6 hours
**Testing Time**: 2-3 hours
**Complexity**: Medium (straightforward changes, many repetitive additions)

---

## Change 1: Query Detection Response Text (MAJOR)
**File**: `/src/lib/query-detection.ts`
**Lines to Modify**: ~70 response text instances
**Effort**: High (repetitive pattern, but many instances)

### Current State
Every response uses generic "Here's the..." template:
```typescript
return {
  widgetType: 'contract-performance-dashboard',
  widgetData: contractPerformanceDemo,
  responseText: "Here's the performance overview for your active contracts:",
};
```

### Goal
Replace with persona-specific language that reflects role concerns and terminology.

### Implementation Strategy

#### Step 1: Create Response Builder Function
Add at the top of `/src/lib/query-detection.ts` (after imports):

```typescript
/**
 * Persona-specific response templates
 * Each persona has unique language reflecting their role
 */
const PERSONA_RESPONSES: Record<PersonaId, Record<string, string>> = {
  // ==========================================
  // GOVERNMENT MODE - COR RESPONSES
  // ==========================================
  'cor': {
    'contract-performance-dashboard':
      'Let me review your active contracts for performance issues and compliance gaps...',
    'deliverable-review-list':
      'Here are deliverables pending your approval. I\'ve highlighted quality concerns and compliance risks...',
    'vendor-compliance-dashboard':
      'Vendor compliance dashboard - showing SLA breaches and performance metrics...',
    'contract-status-default':
      'Here\'s your contract performance dashboard:',
  },

  // ==========================================
  // GOVERNMENT MODE - PROGRAM MANAGER RESPONSES
  // ==========================================
  'program-manager': {
    'program-health-dashboard':
      'Program health status: milestones, risks, resource allocation, and schedule variance...',
    'deliverable-review-list':
      'Program deliverables overview - tracking completion status and dependencies...',
    'vendor-compliance-dashboard':
      'Cross-vendor SLA compliance across program scope...',
    'default':
      'Here\'s your program health dashboard:',
  },

  // ==========================================
  // GOVERNMENT MODE - STAKEHOLDER LEAD RESPONSES
  // ==========================================
  'stakeholder-lead': {
    'stakeholder-engagement-dashboard':
      'Stakeholder engagement status - communication history, feedback summary, and upcoming reviews...',
    'requirements-tracking-dashboard':
      'Requirements status across program scope - coverage, traceability, and implementation status...',
    'change-request-dashboard':
      'Change requests requiring stakeholder review and approval...',
    'default':
      'Here\'s your stakeholder engagement dashboard:',
  },

  // ==========================================
  // PROJECT MODE - PROJECT MANAGER RESPONSES
  // ==========================================
  'project-manager': {
    'sprint-burndown-chart':
      'Current sprint status - velocity, capacity, and burndown forecast...',
    'team-velocity-dashboard':
      'Team velocity trends for sprint planning and capacity forecasting...',
    'resource-capacity-dashboard':
      'Resource capacity and skill allocation across team...',
    'blocker-resolution-dashboard':
      'Active blockers impacting sprint progress and timeline...',
    'default':
      'Here\'s your sprint dashboard:',
  },

  // ==========================================
  // PROJECT MODE - SERVICE TEAM LEAD RESPONSES
  // ==========================================
  'service-team-lead': {
    'code-quality-dashboard':
      'Code quality metrics - coverage, technical debt, and vulnerabilities...',
    'deployment-pipeline-dashboard':
      'CI/CD pipeline status, deployment frequency, and MTTR metrics...',
    'blocker-resolution-dashboard':
      'Production blockers and critical incident resolution status...',
    'resource-capacity-dashboard':
      'Team workload, capacity utilization, and skill gaps...',
    'default':
      'Here\'s your code quality dashboard:',
  },

  // ==========================================
  // PROJECT MODE - SERVICE TEAM MEMBER RESPONSES
  // ==========================================
  'service-team-member': {
    'task-kanban-board':
      'Your assigned work for this sprint - priorities, blockers, and status...',
    'blocker-resolution-dashboard':
      'Blockers affecting your current work and resolution timeline...',
    'code-quality-dashboard':
      'Code quality issues in areas you\'re working on...',
    'knowledge-article':
      'Relevant knowledge base article for your current task...',
    'default':
      'Here\'s your task board:',
  },
};

/**
 * Build persona-specific response text
 */
function getPersonaResponse(personaId: PersonaId, widgetType: WidgetType | null): string {
  if (!widgetType) {
    return 'Here\'s the information you requested:';
  }

  // Try to get persona + widget specific response
  const personaResponses = PERSONA_RESPONSES[personaId];
  if (personaResponses) {
    const response = personaResponses[widgetType] || personaResponses['default'];
    if (response) {
      return response;
    }
  }

  // Fallback to generic
  return 'Here\'s the information you requested:';
}
```

#### Step 2: Modify Each Query Detection Function

Update each persona's query detection function to use the new response builder:

**OLD PATTERN:**
```typescript
function detectCORQuery(q: string): QueryMatch | null {
  if (q.includes('contract performance') || ...) {
    return {
      widgetType: 'contract-performance-dashboard',
      widgetData: contractPerformanceDemo,
      responseText: "Here's the performance overview for your active contracts:",
    };
  }
}
```

**NEW PATTERN:**
```typescript
function detectCORQuery(q: string): QueryMatch | null {
  if (q.includes('contract performance') || ...) {
    const widgetType = 'contract-performance-dashboard';
    return {
      widgetType,
      widgetData: contractPerformanceDemo,
      responseText: getPersonaResponse('cor', widgetType),
    };
  }
}
```

#### Step 3: Apply to All Persona Functions

Apply the pattern to these functions (lines ~780-1200):
1. `detectCORQuery()` - ~9 return statements
2. `detectProgramManagerQuery()` - ~7 return statements
3. `detectStakeholderLeadQuery()` - ~7 return statements
4. `detectProjectManagerQuery()` - ~6 return statements
5. `detectServiceTeamLeadQuery()` - ~6 return statements
6. `detectServiceTeamMemberQuery()` - ~6 return statements

#### Step 4: Expand Response Templates

After initial implementation, expand `PERSONA_RESPONSES` with more specific messages:

```typescript
'cor': {
  'contract-performance-dashboard':
    'Analyzing vendor contract performance and compliance...',
  'deliverable-review-list':
    'These deliverables need your approval. Quality flags: {{flags_count}}, Compliance issues: {{compliance_count}}',
  'vendor-compliance-dashboard':
    'SLA Performance by Vendor - identifying non-compliant vendors for action...',
  'vendor-performance': // Multiple queries map to same widget
    'Vendor performance metrics - quality, delivery, and SLA compliance...',
  'budget-tracking':
    'Contract budget utilization and spending projections...',
  'compliance-check':
    'Compliance status across active contracts...',
  'quality-issues':
    'Quality concerns in recent deliverables requiring escalation...',
  'default':
    'Here\'s your contract performance dashboard:',
}
```

---

## Change 2: Response Templates (MODERATE)
**File**: `/src/lib/response-templates.ts`
**Functions to Modify**: 6 export functions
**Effort**: Medium

### Current State
Functions don't receive persona context:
```typescript
export function getPasswordResetTemplate(customerName?: string): ResponseTemplate {
  // Generic password reset template
}
```

### Goal
Add persona parameter and customize response based on role.

### Implementation

#### Step 1: Add PersonaId Import
Add at top of file:
```typescript
import type { PersonaId } from '@/types/persona';
```

#### Step 2: Modify Function Signatures
Update all 6 export functions:

**OLD:**
```typescript
export function getPasswordResetTemplate(customerName?: string): ResponseTemplate
```

**NEW:**
```typescript
export function getPasswordResetTemplate(
  customerName?: string,
  personaId?: PersonaId
): ResponseTemplate
```

#### Step 3: Add Persona-Specific Content

Example for `getPasswordResetTemplate`:

```typescript
export function getPasswordResetTemplate(
  customerName?: string,
  personaId?: PersonaId
): ResponseTemplate {
  const name = customerName || 'there';

  // Customize greeting and context based on persona
  let contextMessage = 'I can help you reset your password with our step-by-step guide.';
  if (personaId === 'cor') {
    contextMessage = 'Let me help you regain account access so you can manage your contracts.';
  } else if (personaId === 'program-manager') {
    contextMessage = 'Let\'s get you back to program management quickly with our secure reset process.';
  } else if (personaId === 'project-manager') {
    contextMessage = 'Let\'s restore your access to sprint planning and team coordination immediately.';
  } else if (personaId === 'service-team-lead') {
    contextMessage = 'I\'ll help you regain access to code review and deployment dashboards.';
  }

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">Password Reset Help</h1>
    </div>
    <div class="content" style="background: #fff; padding: 30px; border: 1px solid #e0e0e0;">
      <p>Hi ${name},</p>
      <p>${contextMessage}</p>
      <!-- Rest of template content -->
    </div>
  </div>
</body>
</html>
  `.trim();

  // ... rest of function
}
```

#### Step 4: Apply to All 6 Functions
1. `getPasswordResetTemplate()` - Contract compliance context
2. `getAgentAssignmentTemplate()` - Role assignment context
3. `getAccountUnlockTemplate()` - Role-specific access impact
4. `getAccessRequestTemplate()` - Role-specific system access
5. `getGeneralSupportTemplate()` - Role-relevant article suggestion
6. `getEmailNotificationTemplate()` - Role-specific notification context

---

## Change 3: Widget Renderer (MODERATE)
**File**: `/src/components/widgets/WidgetRenderer.tsx`
**Lines to Modify**: Props interface + pass-through
**Effort**: Medium

### Current State
Widget doesn't receive persona context:
```typescript
interface WidgetRendererProps {
  type: WidgetType;
  data: WidgetData;
  onAction?: (action: string) => void;
}

export function WidgetRenderer({ type, data, onAction }: WidgetRendererProps)
```

### Goal
Pass persona to widgets so they can customize display.

### Implementation

#### Step 1: Update Props Interface
```typescript
import type { PersonaId } from '@/types/persona';

interface WidgetRendererProps {
  type: WidgetType;
  data: WidgetData;
  personaId?: PersonaId;  // ADD THIS
  onAction?: (action: string) => void;
}
```

#### Step 2: Update Function Signature
```typescript
export function WidgetRenderer({
  type,
  data,
  personaId,  // ADD THIS
  onAction
}: WidgetRendererProps)
```

#### Step 3: Pass Persona to Widgets (Optional - Phase 2)

For widgets that need persona context (for future enhancement):

```typescript
case 'contract-performance-dashboard':
  return (
    <ContractPerformanceDashboardWidget
      data={data as ContractPerformanceData}
      personaId={personaId}  // PASS THIS
    />
  );

case 'program-health-dashboard':
  return (
    <ProgramHealthDashboardWidget
      data={data as ProgramHealthData}
      personaId={personaId}  // PASS THIS
    />
  );
```

#### Step 4: Update Widget Component Props (Optional - Phase 2)

Each widget component can optionally accept persona for field customization:

```typescript
interface ContractPerformanceDashboardWidgetProps {
  data: ContractPerformanceData;
  personaId?: PersonaId;  // OPTIONAL - for field visibility
}

export function ContractPerformanceDashboardWidget({
  data,
  personaId
}: ContractPerformanceDashboardWidgetProps) {
  // Show different fields based on persona
  const showVendorMetrics = personaId === 'cor';
  const showResourceAllocation = personaId === 'program-manager';

  return (
    <div>
      {/* Always show */}
      {/* Conditional fields based on persona */}
    </div>
  );
}
```

---

## Phase 2: Widget Data Customization (Optional)

After completing the above 3 changes, consider Phase 2 improvements:

### Phase 2 Goals
- Hide non-relevant fields per persona
- Reorder fields based on persona priority
- Add persona-specific metrics

### Example: ContractPerformanceDashboardWidget

**COR Persona Focus**:
1. Vendor name (who to contact)
2. Compliance status (high priority)
3. SLA metrics (enforcement)
4. Budget remaining (tracking)
5. Deliverables pending (approval)

**Program Manager Focus**:
1. Overall status (green/yellow/red)
2. Schedule variance (timeline risk)
3. Resource allocation (team impact)
4. Budget variance (financial risk)
5. Dependencies (blocking other work)

Implementation:
```typescript
function getFieldsForPersona(personaId?: PersonaId): string[] {
  const baseFields = ['name', 'status', 'budget'];

  if (personaId === 'cor') {
    return [...baseFields, 'vendor', 'compliance', 'sla_metrics', 'deliverables'];
  }
  if (personaId === 'program-manager') {
    return [...baseFields, 'schedule_variance', 'resource_allocation', 'dependencies'];
  }

  return baseFields;
}
```

---

## Implementation Checklist

### Phase 1: Core Changes (REQUIRED)

#### Change 1: Query Detection Response Text
- [ ] Create `PERSONA_RESPONSES` object with all persona languages
- [ ] Add `getPersonaResponse()` builder function
- [ ] Update `detectCORQuery()` - 9 return statements
- [ ] Update `detectProgramManagerQuery()` - 7 return statements
- [ ] Update `detectStakeholderLeadQuery()` - 7 return statements
- [ ] Update `detectProjectManagerQuery()` - 6 return statements
- [ ] Update `detectServiceTeamLeadQuery()` - 6 return statements
- [ ] Update `detectServiceTeamMemberQuery()` - 6 return statements
- [ ] Test: Each persona shows different response text
- [ ] TypeScript check: `npm run type-check`

#### Change 2: Response Templates
- [ ] Add PersonaId import
- [ ] Update `getPasswordResetTemplate()` signature
- [ ] Add persona-specific greeting/context
- [ ] Update `getAgentAssignmentTemplate()` signature
- [ ] Add persona-specific assignment context
- [ ] Update `getAccountUnlockTemplate()` signature
- [ ] Update `getAccessRequestTemplate()` signature
- [ ] Update `getGeneralSupportTemplate()` signature
- [ ] Update `getEmailNotificationTemplate()` signature
- [ ] Test: Templates render with persona context
- [ ] TypeScript check: `npm run type-check`

#### Change 3: Widget Renderer
- [ ] Import PersonaId type
- [ ] Update WidgetRendererProps interface
- [ ] Update function signature to accept personaId
- [ ] Verify props pass-through (optional - Phase 2)
- [ ] Test: Widget rendering still works
- [ ] TypeScript check: `npm run type-check`

### Phase 2: Widget Customization (OPTIONAL)

- [ ] Update widget component props (per widget)
- [ ] Add field visibility logic
- [ ] Add field reordering logic
- [ ] Test each widget with different personas
- [ ] Verify data filtering works correctly

### Testing & Verification

- [ ] Test COR role - see contract/vendor/compliance language
- [ ] Test Program Manager - see program/milestone/risk language
- [ ] Test Stakeholder Lead - see engagement/feedback language
- [ ] Test Project Manager - see sprint/velocity language
- [ ] Test Service Team Lead - see code quality/CI-CD language
- [ ] Test Service Team Member - see "my tasks" language
- [ ] Verify no generic "Here's the..." responses remain
- [ ] Run TypeScript check: `npm run type-check`
- [ ] No build errors
- [ ] No console errors in browser DevTools

---

## Code Review Checklist

When reviewing implementation:

1. **Response Text**
   - [ ] No "Here's the..." generic openers remain
   - [ ] Each persona has unique language
   - [ ] Terminology matches persona role
   - [ ] No copy-paste from other personas

2. **Function Signatures**
   - [ ] PersonaId parameter added to all functions
   - [ ] Type imports present
   - [ ] Default parameter value if optional

3. **TypeScript**
   - [ ] No `any` types introduced
   - [ ] All types properly imported
   - [ ] Build passes without errors
   - [ ] No type assertion warnings

4. **Testing**
   - [ ] All 6 personas tested
   - [ ] Response text verified unique
   - [ ] Quick Actions still working
   - [ ] Demo scenarios still working

---

## Timeline Estimate

| Task | Effort | Time |
|------|--------|------|
| Query Detection Response Text | High | 2-3h |
| Response Templates | Medium | 1h |
| Widget Renderer | Medium | 1h |
| Testing & Verification | Medium | 2h |
| Code Review | Low | 1h |
| **TOTAL** | | **7-8h** |

---

## Files Changed Summary

```
v17-mode-switcher/
├── src/
│   ├── lib/
│   │   ├── query-detection.ts          (MAJOR: 70+ lines changed)
│   │   └── response-templates.ts       (MODERATE: 6 functions updated)
│   └── components/
│       └── widgets/
│           └── WidgetRenderer.tsx      (MODERATE: Props interface + pass-through)
```

**Total Lines Changed**: ~100-150 lines
**Total Files Changed**: 3 files
**Complexity**: Medium (repetitive pattern, straightforward logic)
**Risk**: Low (isolated to response/template layer, no data structure changes)

---

## Rollback Plan

If issues arise:
1. Revert changes to 3 files
2. Go back to generic "Here's the..." responses
3. No data loss or structural changes required
4. System continues to work (just with generic responses again)

---

## Success Metrics

After implementation:
- ✅ COR responses mention vendors, contracts, compliance
- ✅ PM responses mention programs, milestones, risk
- ✅ Stakeholder Lead responses mention engagement, feedback
- ✅ Project Manager responses mention sprints, velocity
- ✅ Service Team Lead responses mention code quality, CI/CD
- ✅ Service Team Member responses mention tasks, blockers
- ✅ No generic "Here's the..." patterns remain
- ✅ TypeScript build passes
- ✅ All personas tested and verified

---

**Ready to implement?** Start with Change 1 (Query Detection) as it has the highest impact on user experience.
