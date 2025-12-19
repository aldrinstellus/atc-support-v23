# V17 Mode Switcher: Persona Response Uniqueness Audit - Complete Report Index

**Mission**: Wonder Woman's Truth-Seeking Audit of Persona Response Uniqueness
**Status**: CRITICAL ISSUES IDENTIFIED - READY FOR IMPLEMENTATION
**Date**: November 12, 2025

---

## Executive Summary (Start Here)

**Bottom Line**: 70+ generic "Here's the..." responses prevent users from distinguishing personas. All 6 roles sound identical despite having different data.

### Key Findings
- **SEVERITY**: HIGH
- **SCOPE**: 6 Personas × 10+ Widget Types = 60+ generic responses
- **IMPACT**: Users cannot tell which persona they're using
- **ROOT CAUSE**: Query detection returns generic response text
- **FIX EFFORT**: 7-8 hours (Phase 1) + 4-6 hours (Phase 2 optional)

### What's Broken (Quick List)
1. Response text is generic across all personas (70+ instances)
2. No persona-specific terminology or context
3. Widget rendering doesn't customize per role
4. Response templates don't receive persona context
5. Users experience identical messaging for different roles

### What Works (Quick List)
1. Persona routing is correct (queries go to right function)
2. Quick Actions are truly unique per persona
3. Widget selection is persona-appropriate
4. Demo scenarios are role-specific

---

## Complete Audit Documents

### 1. **PERSONA-RESPONSE-UNIQUENESS-AUDIT.md** (13 KB)
**Purpose**: Detailed technical analysis with code evidence
**Audience**: Developers, Technical Leads
**Contents**:
- Critical findings with line-by-line code references
- 4 major issues with specific examples
- Root cause analysis by issue
- Red flags and warning signs
- Summary detection report (what works vs broken)
- Recommendations for fixing each issue
- Verification checklist

**Read This If**: You want to understand the specific issues and evidence

### 2. **PERSONA-FIX-IMPLEMENTATION-GUIDE.md** (19 KB)
**Purpose**: Step-by-step implementation roadmap
**Audience**: Developers implementing fixes
**Contents**:
- Overview and timeline estimate
- Phase 1: 3 required changes with detailed steps
  - Change 1: Query Detection Response Text (MAJOR)
  - Change 2: Response Templates (MODERATE)
  - Change 3: Widget Renderer (MODERATE)
- Phase 2: Optional widget customization
- Complete implementation checklist
- Code review checklist
- Rollback plan (if needed)
- Success metrics

**Read This If**: You're implementing the fixes

### 3. **PERSONA-RESPONSE-UNIQUENESS-AUDIT.md** (This Document)
**Purpose**: Navigation hub for all audit materials
**Audience**: Anyone reviewing the audit
**Contents**:
- This index with document descriptions
- Quick reference summaries
- File change overview

---

## Quick Reference: What Needs Fixing

### By Severity
| Severity | Issue | File | Effort | Lines |
|----------|-------|------|--------|-------|
| CRITICAL | Generic response text | `/src/lib/query-detection.ts` | 2-3h | 70+ |
| HIGH | No persona context | `/src/lib/response-templates.ts` | 1h | ~50 |
| HIGH | No persona in widgets | `/src/components/widgets/WidgetRenderer.tsx` | 1h | ~20 |

### By File
1. **`/src/lib/query-detection.ts`** (MAJOR - 2-3 hours)
   - Replace 70+ generic "Here's the..." responses
   - Create persona response templates
   - Update all 6 persona detection functions

2. **`/src/lib/response-templates.ts`** (MODERATE - 1 hour)
   - Add PersonaId parameter to 6 functions
   - Customize templates per role
   - Update getPasswordResetTemplate, getAgentAssignmentTemplate, etc.

3. **`/src/components/widgets/WidgetRenderer.tsx`** (MODERATE - 1 hour)
   - Update interface to include personaId
   - Pass persona to widgets
   - Enable Phase 2 customization

---

## Issues Found: Deep Dive

### Issue #1: "Here's the..." Generic Opening (MOST CRITICAL)

**Evidence**: 70+ identical response text patterns

**Government Mode Examples**:
```
COR: "Here's the performance overview for your active contracts:"
COR: "Here's the compliance status for your vendors:"
COR: "Here's your contract performance dashboard:"

PM: "Here's the overall program health status:"
PM: "Here's the status of program milestones:"
PM: "Here's your program health dashboard:"
```

**Project Mode Examples**:
```
Project Manager: "Here's the current sprint burndown chart:"
Project Manager: "Here's your sprint dashboard:"

Service Team Lead: "Here's the code quality dashboard:"
Service Team Lead: "Here's the deployment pipeline status:"

Service Team Member: "Here are your assigned tasks:"
Service Team Member: "Here's your task board:"
```

**Impact**: Users cannot distinguish which persona they're using

### Issue #2: No Persona-Specific Terminology

**COR (Contracting Officer) Should Say**:
- vendor, contract, compliance, deliverables, SLA, budget, cost variance
- Current: Generic "Here's the..."

**Program Manager Should Say**:
- program, milestone, stakeholder, risk, resource, schedule, dependency
- Current: Generic "Here's the..."

**Stakeholder Lead Should Say**:
- engagement, feedback, user adoption, impact, requirements, change
- Current: Generic "Here's the..."

**Project Manager Should Say**:
- sprint, velocity, capacity, blockers, timeline, story point
- Current: Generic "Here's the..."

**Service Team Lead Should Say**:
- code quality, CI/CD, MTTR, coverage, technical debt, incidents
- Current: Generic "Here's the..."

**Service Team Member Should Say**:
- my tasks, my work, my blockers, my progress, my assignments
- Current: Generic "Here are..."

### Issue #3: Widget Rendering Not Persona-Aware

**Current State**:
```typescript
// Same component for all personas
case 'contract-performance-dashboard':
  return <ContractPerformanceDashboardWidget data={data} />;
```

**Missing**: No way to customize widget display per role

### Issue #4: Response Templates Without Persona

**Current State**:
```typescript
export function getPasswordResetTemplate(customerName?: string): ResponseTemplate
```

**Missing**: No PersonaId parameter to customize response based on role

---

## File-by-File Changes Required

### File 1: `/src/lib/query-detection.ts`

**Current Pattern** (Generic):
```typescript
return {
  widgetType: 'contract-performance-dashboard',
  widgetData: contractPerformanceDemo,
  responseText: "Here's the performance overview for your active contracts:",
};
```

**Fixed Pattern** (Persona-Aware):
```typescript
const widgetType = 'contract-performance-dashboard';
return {
  widgetType,
  widgetData: contractPerformanceDemo,
  responseText: getPersonaResponse('cor', widgetType),
};
```

**Response Examples** (New):
```typescript
'cor': {
  'contract-performance-dashboard':
    'Let me review your active contracts for compliance gaps...',
  'deliverable-review-list':
    'Here are deliverables pending approval. I\'ve flagged quality concerns...',
}

'program-manager': {
  'program-health-dashboard':
    'Program status: milestones, risks, and resource allocation...',
  'stakeholder-engagement-dashboard':
    'Stakeholder engagement: communication status and pending actions...',
}
```

**Functions to Update**: 6 persona detection functions (~70 response text instances)

### File 2: `/src/lib/response-templates.ts`

**Current Function**:
```typescript
export function getPasswordResetTemplate(customerName?: string): ResponseTemplate
```

**Fixed Function**:
```typescript
import type { PersonaId } from '@/types/persona';

export function getPasswordResetTemplate(
  customerName?: string,
  personaId?: PersonaId
): ResponseTemplate {
  // Customize greeting/context based on persona
  if (personaId === 'cor') {
    // Contract compliance context
  } else if (personaId === 'program-manager') {
    // Program management context
  }
}
```

**Functions to Update**:
1. `getPasswordResetTemplate()`
2. `getAgentAssignmentTemplate()`
3. `getAccountUnlockTemplate()`
4. `getAccessRequestTemplate()`
5. `getGeneralSupportTemplate()`
6. `getEmailNotificationTemplate()`

### File 3: `/src/components/widgets/WidgetRenderer.tsx`

**Current Interface**:
```typescript
interface WidgetRendererProps {
  type: WidgetType;
  data: WidgetData;
  onAction?: (action: string) => void;
}
```

**Fixed Interface**:
```typescript
import type { PersonaId } from '@/types/persona';

interface WidgetRendererProps {
  type: WidgetType;
  data: WidgetData;
  personaId?: PersonaId;  // ADD THIS
  onAction?: (action: string) => void;
}
```

**Pass to Widgets** (Optional - Phase 2):
```typescript
case 'contract-performance-dashboard':
  return <ContractPerformanceDashboardWidget data={data} personaId={personaId} />;
```

---

## Implementation Timeline

### Phase 1: Required (Days 1-2)
| Task | File | Effort | Time |
|------|------|--------|------|
| Create response templates | query-detection.ts | High | 2-3h |
| Update 6 persona functions | query-detection.ts | High | Included |
| Add PersonaId to 6 templates | response-templates.ts | Medium | 1h |
| Update WidgetRenderer interface | WidgetRenderer.tsx | Medium | 1h |
| Test all personas | All | Medium | 2h |
| Code review | All | Low | 1h |
| **SUBTOTAL** | | | **7-8h** |

### Phase 2: Optional (Days 3-4)
| Task | File | Effort | Time |
|------|------|--------|------|
| Widget data customization | widget components | High | 3-4h |
| Field visibility per role | widget components | Medium | 1-2h |
| Field reordering per role | widget components | Medium | 1h |
| **SUBTOTAL** | | | **5-7h** |

### Total Timeline
- **Phase 1 (Required)**: 7-8 hours
- **Phase 2 (Optional)**: 5-7 hours
- **Total with both phases**: 12-15 hours

---

## Success Criteria Checklist

### Response Text Verification
- [ ] COR responses mention "vendor", "contract", "compliance", "deliverables"
- [ ] PM responses mention "program", "milestone", "stakeholder", "risk"
- [ ] Stakeholder Lead responses mention "engagement", "feedback", "adoption"
- [ ] Project Manager responses mention "sprint", "velocity", "capacity"
- [ ] Service Team Lead responses mention "code quality", "CI/CD", "MTTR"
- [ ] Service Team Member responses mention "my tasks", "my blockers", "my work"

### Technical Verification
- [ ] No generic "Here's the..." responses remain
- [ ] PersonaId parameter added to all functions
- [ ] TypeScript build passes (`npm run type-check`)
- [ ] No console errors in browser
- [ ] All personas tested and verified

### Quality Verification
- [ ] Code review approved
- [ ] No duplicate code introduced
- [ ] Functions properly typed
- [ ] Fallbacks handle missing persona gracefully

---

## Key Takeaways

### What Users Will Experience

**BEFORE (Current)**:
```
[Switch to COR persona]
User: "Show contract status"
System: "Here's the performance overview for your active contracts:"
User reaction: "This could work for any role... not very personalized"
```

**AFTER (Fixed)**:
```
[Switch to COR persona]
User: "Show contract status"
System: "Let me review your active contracts for compliance gaps..."
User reaction: "This clearly understands my COR role!"
```

### Developer Impact

**BEFORE**:
- Copy-paste response text across all personas
- No persona context in templates
- Hard to customize per role

**AFTER**:
- Persona-specific response templates
- PersonaId parameter enables customization
- Easy to add role-specific language

---

## Document Files Location

```
v17-mode-switcher/
├── AUDIT-REPORT-INDEX.md                          ← You are here
├── PERSONA-RESPONSE-UNIQUENESS-AUDIT.md           (13 KB - detailed findings)
├── PERSONA-FIX-IMPLEMENTATION-GUIDE.md            (19 KB - implementation steps)
├── PERSONA-PROMPT-RESPONSE-MATRIX.md              (18 KB - existing docs)
├── PERSONA-WIDGET-ALIGNMENT-ANALYSIS.md           (35 KB - existing docs)
└── src/
    ├── lib/
    │   ├── query-detection.ts                    (CHANGE THIS - 70+ lines)
    │   └── response-templates.ts                 (CHANGE THIS - 6 functions)
    └── components/widgets/
        └── WidgetRenderer.tsx                    (CHANGE THIS - props update)
```

---

## Next Steps

### For Project Managers
1. Review this index (5 minutes)
2. Read Executive Summary in detailed audit (10 minutes)
3. Share PERSONA-FIX-IMPLEMENTATION-GUIDE.md with development team
4. Schedule 8-hour block for Phase 1 implementation

### For Developers
1. Read PERSONA-RESPONSE-UNIQUENESS-AUDIT.md for detailed issues
2. Follow PERSONA-FIX-IMPLEMENTATION-GUIDE.md for step-by-step implementation
3. Use verification checklist to validate completion
4. Get code review before merging

### For QA
1. Review the verification checklist
2. Test each of 6 personas with sample queries
3. Verify response text mentions role-specific terms
4. Check TypeScript build passes
5. Sign off on success criteria

---

## Questions & Contact

For questions about this audit:
- **Audit Details**: See PERSONA-RESPONSE-UNIQUENESS-AUDIT.md
- **Implementation Steps**: See PERSONA-FIX-IMPLEMENTATION-GUIDE.md
- **Code Changes**: See specific file sections above

---

**Report Prepared By**: Wonder Woman (Truth-Seeking Mission)
**Date**: November 12, 2025
**Status**: CRITICAL ISSUES IDENTIFIED - READY FOR IMPLEMENTATION
**Confidence Level**: HIGH (code-based evidence, specific line numbers provided)

---

## Document Versions

| Document | Size | Purpose | Read Time |
|----------|------|---------|-----------|
| AUDIT-REPORT-INDEX.md (this) | ~8 KB | Navigation hub | 10 min |
| PERSONA-RESPONSE-UNIQUENESS-AUDIT.md | 13 KB | Detailed findings | 20 min |
| PERSONA-FIX-IMPLEMENTATION-GUIDE.md | 19 KB | Implementation steps | 30 min |

**Total read time for full audit**: 60 minutes
**Total implementation time**: 7-8 hours (Phase 1)

---

END OF AUDIT REPORT INDEX
