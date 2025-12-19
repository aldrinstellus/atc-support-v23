# Bug Report Template

Use this template when reporting bugs found during testing.

---

## Bug Information

**Bug ID**: [AUTO-GENERATED or JIRA-XXX]
**Date Found**: YYYY-MM-DD
**Found By**: [Name/Role]
**Status**: Open | In Progress | Resolved | Closed

---

## Priority & Severity

**Priority**: 🔴 P0 Critical | 🟠 P1 High | 🟡 P2 Medium | 🟢 P3 Low

**Severity**:
- [ ] **Blocker**: Prevents testing/development
- [ ] **Critical**: Major functionality broken
- [ ] **Major**: Significant issue, workaround exists
- [ ] **Minor**: Cosmetic or minor issue
- [ ] **Trivial**: Typo or small UI issue

---

## Bug Description

**Title**: [Clear, concise bug title]

**Description**:
[Detailed description of the issue]

**Expected Behavior**:
[What should happen]

**Actual Behavior**:
[What actually happens]

---

## Reproduction Steps

1. [Step 1]
2. [Step 2]
3. [Step 3]
4. [Observe the issue]

**Reproducibility**: Always | Sometimes | Rarely | Once

---

## Environment

**Application Version**: 14.0.0
**Environment**: Development | Staging | Production
**Browser**: Chrome 120 / Firefox 121 / Safari 17
**OS**: macOS 14 / Windows 11 / Linux
**Device**: Desktop / Mobile / Tablet
**Viewport**: 1920x1080 / 375x667 / Other

---

## Test Category

**Found During**:
- [ ] Unit Tests
- [ ] Integration Tests
- [ ] E2E Tests
- [ ] Accessibility Tests
- [ ] Performance Tests
- [ ] Security Tests
- [ ] Manual Testing
- [ ] User Report

**Persona Affected**:
- [ ] C-Level Executive
- [ ] CS Manager
- [ ] Support Agent
- [ ] All Personas

---

## Technical Details

**Component/Module**: [e.g., Query Detection, Widget Renderer]

**File Path**:
```
src/lib/query-detection.ts:145
```

**Related Test File**:
```
__tests__/unit/lib/query-detection.test.ts
```

**Error Message**:
```
TypeError: Cannot read property 'widgetType' of null
```

**Stack Trace**:
```
[Stack trace here]
```

---

## Screenshots/Videos

**Screenshot**:
[Attach screenshot or drag-and-drop image]

**Video** (if applicable):
[Link to video recording]

**Console Logs**:
```
[Console error messages]
```

---

## Network/API

**Failed Request** (if applicable):
- URL: `/api/chat`
- Method: POST
- Status: 500
- Response:
```json
{
  "error": "Internal Server Error"
}
```

---

## Suggested Fix

**Root Cause** (if known):
[Analysis of why this happened]

**Proposed Solution**:
[How to fix it]

**Code Suggestion**:
```typescript
// Before
const result = detectWidgetQuery(query, persona);
console.log(result.widgetType); // Crashes if null

// After
const result = detectWidgetQuery(query, persona);
if (result) {
  console.log(result.widgetType);
}
```

---

## Impact Assessment

**Users Affected**: [Percentage or count]
**Workaround Available**: Yes | No
**Blocks Release**: Yes | No
**Related Bugs**: [Links to related issues]

---

## Test Coverage

**Existing Test**: Yes | No
**Test File**: `__tests__/unit/...`
**Test Added**: Yes | No

**New Test** (if applicable):
```typescript
test('should handle null query gracefully', () => {
  const result = detectWidgetQuery('', 'c-level');
  expect(result).toBeNull();
});
```

---

## Resolution

**Fixed In**: Version X.Y.Z | Commit SHA
**Fix Verified**: Yes | No
**Verified By**: [Name]
**Verification Date**: YYYY-MM-DD

**Resolution Notes**:
[How was this fixed]

---

## Follow-Up Actions

- [ ] Add regression test
- [ ] Update documentation
- [ ] Review similar code patterns
- [ ] Add error handling
- [ ] Notify affected teams

---

## Additional Notes

[Any other relevant information]

---

## Example: Sample Bug Report

**Bug ID**: BUG-001
**Date Found**: 2025-10-20
**Found By**: Aquaman (QA Engineer)
**Status**: Open

### Priority & Severity
**Priority**: 🟠 P1 High
**Severity**: Major

### Bug Description
**Title**: Query detection returns null for valid executive summary queries

**Description**: When a C-Level user enters "Show me executive summary" with extra spaces, the query detection returns null instead of the executive-summary widget type.

**Expected Behavior**: Query should be trimmed and matched regardless of extra whitespace.

**Actual Behavior**: Query detection fails and no widget is rendered.

### Reproduction Steps
1. Navigate to `/demo/c-level`
2. Enter "  Show me executive summary  " (with extra spaces)
3. Press Enter
4. Observe: No widget is displayed, AI message shows "I'm not sure how to help with that"

**Reproducibility**: Always

### Environment
- **Version**: 14.0.0
- **Browser**: Chrome 120
- **OS**: macOS 14
- **Viewport**: 1920x1080

### Technical Details
**Component**: Query Detection
**File Path**: `src/lib/query-detection.ts:49`

**Error**: No error, but query matching fails due to missing trim()

### Suggested Fix
```typescript
// Before
export function detectWidgetQuery(query: string, personaId: PersonaId) {
  const q = query.toLowerCase();
  // ...
}

// After
export function detectWidgetQuery(query: string, personaId: PersonaId) {
  const q = query.toLowerCase().trim(); // Add trim()
  // ...
}
```

### Test Coverage
**New Test Added**:
```typescript
test('should handle queries with extra whitespace', () => {
  const result = detectWidgetQuery('  Show me executive summary  ', 'c-level');
  expect(result?.widgetType).toBe('executive-summary');
});
```

---

**Template Version**: 1.0
**Last Updated**: 2025-10-20
