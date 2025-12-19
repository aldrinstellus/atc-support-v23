# Query Pattern Documentation

## Overview

This document explains how query detection works in the v17-mode-switcher application and provides guidelines for adding, modifying, and debugging query patterns.

**Last Updated**: 2025-11-13
**Version**: 17.0.0
**File**: `/src/lib/query-detection.ts`

---

## Table of Contents

1. [How Query Detection Works](#how-query-detection-works)
2. [Pattern Priority System](#pattern-priority-system)
3. [Adding New Patterns](#adding-new-patterns)
4. [Modifying Existing Patterns](#modifying-existing-patterns)
5. [Debugging Patterns](#debugging-patterns)
6. [Best Practices](#best-practices)
7. [Common Pitfalls](#common-pitfalls)
8. [Testing Patterns](#testing-patterns)

---

## How Query Detection Works

### Flow Diagram

```
User types query
      ↓
detectWidgetQuery(query, personaId)
      ↓
query.toLowerCase().trim() → "q"
      ↓
Switch based on personaId
      ↓
Route to persona-specific function
      ↓
Check patterns in priority order
      ↓
Return { widgetType, widgetData, responseText } | null
```

### Step-by-Step Execution

1. **User Input**: User types "show zoho tickets dashboard" in chat
2. **Query Detection**: `detectWidgetQuery("show zoho tickets dashboard", "c-level")` is called
3. **Normalization**: Query is lowercased and trimmed → "show zoho tickets dashboard"
4. **Persona Routing**: Switch routes to `detectCLevelQuery(q)`
5. **Pattern Matching**: Function checks patterns in priority order
6. **First Match**: `q.includes('zoho')` returns true (line 257)
7. **Widget Return**: Returns `{ widgetType: 'ticket-list', widgetData: ticketListDemo, responseText: "Executive ticket overview from Zoho Desk:" }`
8. **UI Rendering**: WidgetRenderer displays ticket-list widget

### Function Signature

```typescript
export function detectWidgetQuery(
  query: string,
  personaId: PersonaId
): QueryMatch | null

interface QueryMatch {
  widgetType: WidgetType | null;
  widgetData: WidgetData | null;
  responseText: string;
}

type PersonaId =
  | 'c-level' | 'cs-manager' | 'support-agent' | 'csm'
  // V17 Government Mode
  | 'cor' | 'program-manager' | 'stakeholder-lead'
  // V17 Project Mode
  | 'project-manager' | 'service-team-lead' | 'service-team-member';
```

---

## Pattern Priority System

### Priority Levels

**1. Exact Matches** (Highest Priority)
- Checked FIRST before any pattern matching
- No ambiguity, fastest matching
- Used for specific queries with known responses

```typescript
const exactMatches: Record<string, QueryMatch> = {
  'show me the sla performance breakdown': {
    widgetType: 'sla-performance-chart',
    widgetData: slaPerformanceChartDemo,
    responseText: "Here's the detailed SLA performance breakdown:",
  },
  'which categories are we failing': {
    widgetType: 'sla-performance-chart',
    widgetData: slaPerformanceChartDemo,
    responseText: "We're currently failing in these SLA categories:",
  },
};

if (exactMatches[q]) {
  return exactMatches[q];
}
```

**2. Specific Patterns** (High Priority)
- Checked after exact matches
- Multiple conditions combined with AND logic
- Highly targeted, low false-positive rate

```typescript
// Example: Analytics Dashboard (checked BEFORE generic "dashboard")
if (
  q.includes('analytics') ||
  (q.includes('show') && q.includes('metrics')) ||
  q.includes('ticket trends')
) {
  return {
    widgetType: 'analytics-dashboard',
    widgetData: analyticsDashboardDemo,
    responseText: "Executive analytics dashboard displays...",
  };
}
```

**3. General Patterns** (Medium Priority)
- Checked after specific patterns
- Single keyword or loose conditions
- Higher false-positive risk

```typescript
// Example: Customer Risk (generic "risk" keyword)
if (
  q.includes('high-risk customers') ||
  q.includes('at-risk customers') ||
  q.includes('customer risk') ||
  (q.includes('show me') && q.includes('risk'))
) {
  return {
    widgetType: 'customer-risk-list',
    widgetData: customerRiskListDemo,
    responseText: "Strategic risk portfolio shows...",
  };
}
```

**4. Fallback** (Lowest Priority)
- Checked last (or return `null` if no match)
- Default widget for persona

```typescript
// CSM persona fallback
return {
  widgetType: 'csm-dashboard',
  widgetData: null,
  responseText: "Here's your Customer Success Manager dashboard:",
};
```

### Order of Execution (C-Level Example)

```typescript
function detectCLevelQuery(q: string): QueryMatch | null {
  // 1. EXACT MATCHES (lines 124-140)
  if (exactMatches[q]) return exactMatches[q];

  // 2. SPECIFIC PATTERNS (HIGHEST PRIORITY)
  // CYBORG PRIORITY 1: Analytics Widgets (lines 144-189)
  if (q.includes('analytics')) return analytics-dashboard;
  if (q.includes('performance') && q.includes('trend')) return performance-trends;
  if (q.includes('sentiment')) return sentiment-analysis;

  // 3. GENERAL PATTERNS (lines 192-309)
  if (q.includes('executive summary')) return executive-summary;
  if (q.includes('high-risk customers')) return customer-risk-list;
  if (q.includes('sla performance')) return sla-performance-chart;
  if (q.includes('my current tickets')) return ticket-list;
  if (q.includes('ticket #')) return live-ticket-detail;
  if (q.includes('schedule')) return meeting-scheduler;

  // 4. FALLBACK
  return null;
}
```

**Why This Matters**:
- ✅ "show analytics" → analytics-dashboard (NOT executive-summary)
- ✅ "show me dashboard" → executive-summary (NOT analytics-dashboard)
- ✅ "which categories are failing" → exact match (NOT generic "sla performance")

---

## Adding New Patterns

### Step-by-Step Guide

#### Example: Add "show vendor scorecard" query for COR persona

**Step 1: Identify the Persona**

Query: "show vendor scorecard"
Persona: COR (Contracting Officer's Representative)
Widget: `vendor-compliance-dashboard` (already exists)

**Step 2: Locate the Persona Function**

File: `/src/lib/query-detection.ts`
Function: `detectCORQuery(q: string)` (lines 833-906)

**Step 3: Determine Priority**

- Is it an exact match? **No** (could be "vendor scorecard", "show vendor performance", etc.)
- Is it a specific pattern? **Yes** (vendor + scorecard/performance)
- Is it a general pattern? **No**

**Priority**: Specific pattern (check after contract performance, before generic vendor)

**Step 4: Add Pattern**

```typescript
function detectCORQuery(q: string): QueryMatch | null {
  // Contract Performance (existing - lines 835-844)
  if (q.includes('contract performance') || ...) {
    return contract-performance-dashboard;
  }

  // Deliverable Reviews (existing - lines 847-857)
  if (q.includes('deliverable') && ...) {
    return deliverable-review-list;
  }

  // 🆕 NEW PATTERN: Vendor Scorecard
  if (
    q.includes('vendor scorecard') ||
    q.includes('vendor performance scorecard') ||
    (q.includes('vendor') && q.includes('scorecard'))
  ) {
    return {
      widgetType: 'vendor-compliance-dashboard',
      widgetData: vendorComplianceDemo,
      responseText: "Vendor performance scorecard indicates compliance status across your portfolio:",
    };
  }

  // Vendor Compliance (existing - lines 860-870)
  if (q.includes('vendor compliance') || ...) {
    return vendor-compliance-dashboard;
  }

  // ... rest of function
}
```

**Step 5: Verify Widget Data Import**

Check lines 7-52 for import:

```typescript
import {
  // ... other imports
  vendorComplianceDemo,  // ✅ Already imported
  // ... other imports
} from '@/data/demo-widget-data';
```

**Step 6: Test the Pattern**

```typescript
// Manual test
const result = detectWidgetQuery('show vendor scorecard', 'cor');
console.log(result);
// Expected: { widgetType: 'vendor-compliance-dashboard', widgetData: {...}, responseText: "..." }

// UI test with Chrome DevTools MCP
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3017/demo/cor" });
mcp__chrome-devtools__fill({ uid: "chat-input", value: "show vendor scorecard" });
mcp__chrome-devtools__press_key({ key: "Enter" });
mcp__chrome-devtools__take_screenshot({ filePath: "vendor-scorecard-test.png" });
```

**Step 7: Update Documentation**

Add to `QUERY-DETECTION-TEST-SUITE.md`:

```markdown
### COR (Contracting Officer's Representative) (`cor` persona)

| Query | Expected Widget | Status | Notes |
|-------|----------------|--------|-------|
| ... (existing patterns) | ... | ... | ... |
| "show vendor scorecard" | `vendor-compliance-dashboard` | ✅ | NEW 2025-11-13 - Vendor scorecard view |
| "vendor performance scorecard" | `vendor-compliance-dashboard` | ✅ | Alternative phrasing |
```

---

## Modifying Existing Patterns

### When to Modify

1. **False Positives**: Pattern matches too broadly
2. **False Negatives**: Pattern misses valid queries
3. **Conflicts**: Two patterns shadowing each other
4. **Response Text**: Need to update AI response

### Example: Fix Overlapping Patterns

**Problem**: "show analytics dashboard" sometimes returns `executive-summary` instead of `analytics-dashboard`

**Root Cause**: Generic "dashboard" pattern checked before "analytics"

**Before** (WRONG):
```typescript
// Executive Summary (checked first)
if (q.includes('show me') && q.includes('dashboard')) {
  return executive-summary;
}

// Analytics Dashboard (checked second - never reached!)
if (q.includes('analytics')) {
  return analytics-dashboard;
}
```

**After** (FIXED):
```typescript
// Analytics Dashboard (checked FIRST - more specific)
if (
  q.includes('analytics') ||
  (q.includes('show') && q.includes('metrics')) ||
  q.includes('ticket trends')
) {
  return analytics-dashboard;
}

// Executive Summary (checked SECOND - exclude analytics)
if (
  q.includes('executive summary') ||
  q.includes('system health') ||
  (q.includes('show me') && q.includes('dashboard') && !q.includes('analytics'))  // ✅ Added exclusion
) {
  return executive-summary;
}
```

**Testing**:
```typescript
detectWidgetQuery('show analytics dashboard', 'c-level')  // ✅ analytics-dashboard
detectWidgetQuery('show me dashboard', 'c-level')         // ✅ executive-summary
detectWidgetQuery('show analytics', 'c-level')            // ✅ analytics-dashboard
```

---

## Debugging Patterns

### Common Debugging Techniques

#### 1. Console Logging

Add logs to persona functions:

```typescript
function detectCLevelQuery(q: string): QueryMatch | null {
  console.log('[Query Detection - C-Level] Input query:', q);

  if (q.includes('analytics')) {
    console.log('[Query Detection - C-Level] Matched: analytics-dashboard');
    return {
      widgetType: 'analytics-dashboard',
      widgetData: analyticsDashboardDemo,
      responseText: "Executive analytics dashboard...",
    };
  }

  console.log('[Query Detection - C-Level] No match found, returning null');
  return null;
}
```

**Example Output**:
```
[Query Detection - C-Level] Input query: show zoho tickets dashboard
[Query Detection - C-Level] Matched: ticket-list
```

#### 2. Chrome DevTools Console

Check browser console for logs:

1. Open Chrome DevTools (F12)
2. Navigate to Console tab
3. Type query in chat input
4. Watch console for logs

#### 3. Chrome DevTools MCP Automation

Automate testing with MCP:

```typescript
// Navigate to demo page
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3017/demo/c-level" });

// Type query
mcp__chrome-devtools__fill({ uid: "chat-input", value: "show analytics" });

// Press Enter
mcp__chrome-devtools__press_key({ key: "Enter" });

// Check console errors
mcp__chrome-devtools__list_console_messages({ types: ["error", "warn"] });
// Expected: <no console messages found>

// Take screenshot
mcp__chrome-devtools__take_screenshot({ filePath: "analytics-test.png" });
```

#### 4. Unit Testing

Create test file: `/src/lib/__tests__/query-detection.test.ts`

```typescript
import { detectWidgetQuery } from '../query-detection';

describe('Analytics Widget Priority', () => {
  test('"show analytics" should return analytics-dashboard, NOT executive-summary', () => {
    const result = detectWidgetQuery('show analytics', 'c-level');

    // Debug output
    console.log('Result:', result);

    // Assertions
    expect(result).not.toBeNull();
    expect(result?.widgetType).toBe('analytics-dashboard');
    expect(result?.widgetType).not.toBe('executive-summary');
  });

  test('"show me dashboard" should return executive-summary', () => {
    const result = detectWidgetQuery('show me dashboard', 'c-level');
    expect(result?.widgetType).toBe('executive-summary');
  });
});
```

Run tests:
```bash
npm run test -- query-detection.test.ts
```

### Debugging Checklist

When a pattern doesn't work:

- [ ] Is the query normalized correctly? (lowercase, trimmed)
- [ ] Is the persona correct? (check personaId parameter)
- [ ] Is the pattern in the right persona function?
- [ ] Is the pattern checked in the right priority order?
- [ ] Is another pattern shadowing this one?
- [ ] Are all keywords spelled correctly? (typos!)
- [ ] Is the widget data imported correctly?
- [ ] Is the widget type defined in `src/types/widget.ts`?
- [ ] Is the widget component imported in `WidgetRenderer.tsx`?

---

## Best Practices

### 1. Use Specific Patterns Over General

**Bad** (too broad):
```typescript
if (q.includes('show')) {  // ❌ Every query has "show"!
  return generic-widget;
}
```

**Good** (specific):
```typescript
if (
  q.includes('show analytics') ||
  (q.includes('show') && q.includes('metrics'))
) {
  return analytics-dashboard;
}
```

### 2. Check Specific Before General

**Bad** (general first):
```typescript
if (q.includes('ticket')) return ticket-list;              // ❌ Checked first
if (q.includes('ticket') && q.includes('#')) return ticket-detail;  // Never reached!
```

**Good** (specific first):
```typescript
if (q.includes('ticket #')) return ticket-detail;          // ✅ Checked first
if (q.includes('ticket')) return ticket-list;              // ✅ Checked second
```

### 3. Use AND Logic for Compound Queries

**Bad** (OR logic):
```typescript
if (q.includes('customer') || q.includes('risk')) {  // ❌ Too broad!
  return customer-risk-profile;
}
```

**Good** (AND logic):
```typescript
if (
  q.includes('customer') && q.includes('risk') ||
  q.includes('high-risk customers')
) {
  return customer-risk-profile;
}
```

### 4. Provide Alternative Phrasings

**Bad** (single pattern):
```typescript
if (q.includes('show team workload')) return team-workload-dashboard;
```

**Good** (multiple alternatives):
```typescript
if (
  q.includes('team workload') ||
  q.includes('team status') ||
  q.includes('show me my team') ||
  (q.includes('good morning') && q.includes('team'))
) {
  return team-workload-dashboard;
}
```

### 5. Use Regex for Number Extraction

**Good**:
```typescript
if (q.includes('ticket #') || /tick-?\d+/i.test(q)) {
  const ticketNumberMatch = q.match(/#?(\d+)/);
  const ticketNumber = ticketNumberMatch ? ticketNumberMatch[1] : null;

  if (ticketNumber) {
    return {
      widgetType: 'live-ticket-detail',
      widgetData: { ticketNumber },
      responseText: `Ticket #${ticketNumber} details:`,
    };
  }
}
```

### 6. Write Persona-Specific Response Text

**Bad** (generic):
```typescript
responseText: "Here are the tickets from Zoho Desk:"
```

**Good** (persona-aware):
```typescript
// C-Level
responseText: "Executive ticket overview from Zoho Desk:"

// CS Manager
responseText: "Here are the live tickets from Zoho Desk:"

// Support Agent
responseText: "Here are your assigned tickets from Zoho Desk:"
```

### 7. Group Related Patterns

**Good** (grouped by feature):
```typescript
// ============================================================================
// ANALYTICS WIDGETS (CYBORG PRIORITY 1)
// ============================================================================

// Analytics Dashboard
if (q.includes('analytics')) return analytics-dashboard;

// Performance Trends
if (q.includes('performance trend')) return performance-trends;

// Sentiment Analysis
if (q.includes('sentiment')) return sentiment-analysis;

// ============================================================================
// CUSTOMER RISK WIDGETS
// ============================================================================

// Customer Risk List
if (q.includes('high-risk customers')) return customer-risk-list;

// Customer Risk Profile
if (q.includes('risk score')) return customer-risk-profile;
```

---

## Common Pitfalls

### 1. Shadowing Patterns

**Problem**: More specific pattern never reached because general pattern checked first

**Example**:
```typescript
// ❌ WRONG ORDER
if (q.includes('dashboard')) return executive-summary;          // Checked first
if (q.includes('analytics dashboard')) return analytics-dashboard;  // Never reached!
```

**Solution**: Check specific first
```typescript
// ✅ CORRECT ORDER
if (q.includes('analytics dashboard')) return analytics-dashboard;  // Checked first
if (q.includes('dashboard')) return executive-summary;          // Checked second
```

### 2. Overly Broad Patterns

**Problem**: Pattern matches unintended queries

**Example**:
```typescript
// ❌ Too broad
if (q.includes('show')) return some-widget;  // Matches "show me", "show analytics", "show ticket", etc.
```

**Solution**: Combine with specific keywords
```typescript
// ✅ Specific
if (q.includes('show') && q.includes('metrics')) return analytics-dashboard;
```

### 3. Missing Alternative Phrasings

**Problem**: Users phrase queries differently than expected

**Example**:
```typescript
// ❌ Only one phrasing
if (q.includes('team workload')) return team-workload-dashboard;
// Misses: "team status", "show me my team", "team capacity"
```

**Solution**: Add common alternatives
```typescript
// ✅ Multiple phrasings
if (
  q.includes('team workload') ||
  q.includes('team status') ||
  q.includes('show me my team') ||
  q.includes('team capacity')
) {
  return team-workload-dashboard;
}
```

### 4. Persona Confusion

**Problem**: Pattern added to wrong persona function

**Example**:
```typescript
// ❌ WRONG - COR pattern in C-Level function
function detectCLevelQuery(q: string): QueryMatch | null {
  if (q.includes('contract performance')) return contract-performance-dashboard;  // Wrong persona!
}
```

**Solution**: Add to correct persona
```typescript
// ✅ CORRECT - COR pattern in COR function
function detectCORQuery(q: string): QueryMatch | null {
  if (q.includes('contract performance')) return contract-performance-dashboard;  // Correct!
}
```

### 5. Case Sensitivity

**Problem**: Forgot query is already lowercased

**Example**:
```typescript
// ❌ WRONG - Checking for uppercase
if (q.includes('Zoho')) return ticket-list;  // Will never match!
```

**Solution**: Remember query is normalized
```typescript
// ✅ CORRECT - Lowercase (query already normalized on line 74)
if (q.includes('zoho')) return ticket-list;  // Will match
```

### 6. Missing Widget Data Import

**Problem**: Pattern references non-existent widget data

**Example**:
```typescript
// Pattern in detectCORQuery
return {
  widgetType: 'vendor-compliance-dashboard',
  widgetData: vendorComplianceDemo,  // ❌ Not imported!
  responseText: "Vendor compliance...",
};
```

**Solution**: Add import at top
```typescript
// Line 7-52
import {
  // ... other imports
  vendorComplianceDemo,  // ✅ Added
  // ... other imports
} from '@/data/demo-widget-data';
```

---

## Testing Patterns

### Manual Testing Process

**Step 1: Start Dev Server**
```bash
cd /Users/admin/Documents/claudecode/workspaces/enterprise-ai-support/apps/v17-mode-switcher
npm run dev
```

**Step 2: Navigate to Demo Page**
```
http://localhost:3017/demo/c-level
http://localhost:3017/demo/cs-manager
http://localhost:3017/demo/support-agent
http://localhost:3017/demo/cor
http://localhost:3017/demo/program-manager
http://localhost:3017/demo/stakeholder-lead
http://localhost:3017/demo/project-manager
http://localhost:3017/demo/service-team-lead
http://localhost:3017/demo/service-team-member
```

**Step 3: Type Query**

Enter query in chat input and press Enter.

**Step 4: Verify Widget**

Check:
- ✅ Correct widget displays
- ✅ Widget data loads
- ✅ Response text matches persona
- ✅ No console errors

**Step 5: Test Variations**

Try alternative phrasings:
- "show zoho tickets dashboard"
- "zoho dashboard"
- "my current tickets"
- "all my current tickets zoho"

All should return the same widget.

### Automated Testing with Chrome DevTools MCP

**Complete Test Flow**:
```typescript
// 1. Navigate to demo page
await mcp__chrome-devtools__navigate_page({
  url: "http://localhost:3017/demo/c-level",
  type: "url"
});

// 2. Take "before" screenshot
await mcp__chrome-devtools__take_screenshot({
  filePath: "test-before.png"
});

// 3. Type query
await mcp__chrome-devtools__fill({
  uid: "chat-input",
  value: "show zoho tickets dashboard"
});

// 4. Press Enter
await mcp__chrome-devtools__press_key({ key: "Enter" });

// 5. Wait for widget to load (2 seconds)
await new Promise(resolve => setTimeout(resolve, 2000));

// 6. Take "after" screenshot
await mcp__chrome-devtools__take_screenshot({
  filePath: "test-after.png"
});

// 7. Check console for errors
const consoleErrors = await mcp__chrome-devtools__list_console_messages({
  types: ["error"]
});
console.log('Console Errors:', consoleErrors);
// Expected: <no console messages found>

// 8. Check network requests
const networkRequests = await mcp__chrome-devtools__list_network_requests({
  pageSize: 20
});
console.log('Network Requests:', networkRequests);
// Expected: GET / = 200, all assets loaded

// 9. Verify widget rendered (check DOM)
const snapshot = await mcp__chrome-devtools__take_snapshot({ verbose: false });
console.log('Page Snapshot:', snapshot);
// Expected: Widget component visible in snapshot
```

**Time Savings**: 5-10 minutes per test (vs manual browser testing)

### Unit Testing

**Test File**: `/src/lib/__tests__/query-detection.test.ts`

```typescript
import { detectWidgetQuery } from '../query-detection';

describe('Query Detection - C-Level Executive', () => {
  describe('Zoho Tickets Dashboard', () => {
    test('should match "show zoho tickets dashboard"', () => {
      const result = detectWidgetQuery('show zoho tickets dashboard', 'c-level');
      expect(result).not.toBeNull();
      expect(result?.widgetType).toBe('ticket-list');
      expect(result?.responseText).toContain('Zoho Desk');
    });

    test('should match "zoho"', () => {
      const result = detectWidgetQuery('zoho', 'c-level');
      expect(result?.widgetType).toBe('ticket-list');
    });

    test('should match "my current tickets"', () => {
      const result = detectWidgetQuery('my current tickets', 'c-level');
      expect(result?.widgetType).toBe('ticket-list');
    });
  });

  describe('Analytics Widgets (CYBORG PRIORITY 1)', () => {
    test('"show analytics" should return analytics-dashboard', () => {
      const result = detectWidgetQuery('show analytics', 'c-level');
      expect(result?.widgetType).toBe('analytics-dashboard');
    });

    test('"how are we doing" should return performance-trends', () => {
      const result = detectWidgetQuery('how are we doing', 'c-level');
      expect(result?.widgetType).toBe('performance-trends');
    });

    test('"sentiment" should return sentiment-analysis', () => {
      const result = detectWidgetQuery('sentiment', 'c-level');
      expect(result?.widgetType).toBe('sentiment-analysis');
    });

    test('"show me dashboard" should NOT return analytics (should return executive-summary)', () => {
      const result = detectWidgetQuery('show me dashboard', 'c-level');
      expect(result?.widgetType).toBe('executive-summary');
      expect(result?.widgetType).not.toBe('analytics-dashboard');
    });
  });

  describe('Number Extraction', () => {
    test('should extract ticket number from "show ticket #123"', () => {
      const result = detectWidgetQuery('show ticket #123', 'c-level');
      expect(result?.widgetType).toBe('live-ticket-detail');
      expect(result?.widgetData).toEqual({ ticketNumber: '123' });
    });

    test('should extract ticket number from "ticket TICK-001"', () => {
      const result = detectWidgetQuery('ticket TICK-001', 'c-level');
      expect(result?.widgetType).toBe('live-ticket-detail');
      expect(result?.widgetData).toEqual({ ticketNumber: '001' });
    });

    test('should fallback to demo if no number found', () => {
      const result = detectWidgetQuery('show ticket', 'c-level');
      expect(result?.widgetType).toBe('ticket-detail');
      expect(result?.widgetData).toHaveProperty('id');
    });
  });
});

describe('Query Detection - CS Manager', () => {
  describe('Agent Name Extraction', () => {
    test('should extract agent name from "show me Sarah\'s tickets"', () => {
      const result = detectWidgetQuery('show me Sarah\'s tickets', 'cs-manager');
      expect(result?.widgetType).toBe('ticket-list');
      expect(result?.widgetData).toHaveProperty('title', 'Sarah\'s Tickets');
    });

    test('should extract agent name from "his tickets"', () => {
      const result = detectWidgetQuery('show me John his tickets', 'cs-manager');
      expect(result?.widgetType).toBe('ticket-list');
      expect(result?.widgetData).toHaveProperty('title');
    });
  });
});

describe('Query Detection - Support Agent', () => {
  describe('Demo Flow Priority', () => {
    test('password reset should return knowledge-article (NOT kb-search)', () => {
      const result = detectWidgetQuery('i need password reset', 'support-agent');
      expect(result?.widgetType).toBe('knowledge-article');
      expect(result?.widgetData).toEqual(expect.objectContaining({
        id: expect.stringContaining('password')
      }));
    });

    test('escalation trigger should return escalation-path', () => {
      const result = detectWidgetQuery('still unable', 'support-agent');
      expect(result?.widgetType).toBe('escalation-path');
    });

    test('account unlock should return response-composer', () => {
      const result = detectWidgetQuery('unlock account', 'support-agent');
      expect(result?.widgetType).toBe('response-composer');
    });

    test('multi-system access should return system-access-status', () => {
      const result = detectWidgetQuery('cant access sharepoint and slack', 'support-agent');
      expect(result?.widgetType).toBe('system-access-status');
    });
  });
});

describe('Query Detection - All Personas', () => {
  test('should return null for unmatched queries', () => {
    const personas: PersonaId[] = [
      'c-level', 'cs-manager', 'support-agent', 'csm',
      'cor', 'program-manager', 'stakeholder-lead',
      'project-manager', 'service-team-lead', 'service-team-member'
    ];

    personas.forEach(persona => {
      const result = detectWidgetQuery('gibberish query xyz123', persona);
      expect(result).toBeNull();
    });
  });
});
```

Run tests:
```bash
npm run test -- query-detection.test.ts --coverage
```

### Regression Testing

**When to Run**:
- After modifying query-detection.ts
- After adding new patterns
- After refactoring pattern priority
- Before deploying to production

**Test Matrix** (from QUERY-DETECTION-TEST-SUITE.md):
- ✅ All Zoho patterns (3 personas)
- ✅ All analytics widgets (CYBORG PRIORITY 1)
- ✅ All demo flows (Support Agent)
- ✅ Number extraction (ticket detail)
- ✅ Name extraction (CS Manager)
- ✅ All V17 Government patterns
- ✅ All V17 Project patterns

**Tools**:
- Manual UI testing (5 minutes per persona)
- Chrome DevTools MCP automation (2 minutes per persona)
- Unit tests (10 seconds for all tests)

---

## Quick Reference

### Pattern Syntax Cheat Sheet

```typescript
// Single keyword
if (q.includes('analytics')) return widget;

// Multiple keywords (OR)
if (q.includes('analytics') || q.includes('metrics')) return widget;

// Compound keywords (AND)
if (q.includes('team') && q.includes('workload')) return widget;

// Complex boolean logic
if (
  q.includes('analytics') ||
  (q.includes('show') && q.includes('metrics')) ||
  q.includes('ticket trends')
) {
  return widget;
}

// Regex matching
if (/tick-?\d+/i.test(q)) return widget;

// Regex extraction
const match = q.match(/#?(\d+)/);
const number = match ? match[1] : null;

// Exclusion
if (q.includes('dashboard') && !q.includes('analytics')) return widget;
```

### Common Keywords by Category

**Analytics**:
- analytics, metrics, data, trends, performance, statistics

**Risk**:
- risk, at-risk, high-risk, churn, critical, concern

**Tickets**:
- ticket, tickets, ticket #, TICK-, show ticket, my tickets

**Team**:
- team, workload, status, capacity, performance, agents

**Customer**:
- customer, client, account, user, stakeholder

**Schedule**:
- schedule, meeting, calendar, book, appointment

**Performance**:
- performance, stats, metrics, comparison, trends

---

## Conclusion

This documentation provides a complete guide to understanding, modifying, and debugging query patterns in the v17-mode-switcher application.

**Key Takeaways**:
- ✅ Patterns are checked in priority order (specific → general)
- ✅ Use exact matches for known queries
- ✅ Test patterns with Chrome DevTools MCP automation
- ✅ Always check for shadowing patterns
- ✅ Write persona-specific response text
- ✅ Add alternative phrasings for user flexibility

**Next Steps**:
1. Review `QUERY-DETECTION-TEST-SUITE.md` for complete test matrix
2. Run unit tests: `npm run test -- query-detection.test.ts`
3. Test in UI: `npm run dev` → http://localhost:3017/demo/c-level
4. Use Chrome DevTools MCP for automated testing

**Questions?** Check the test suite for examples or consult this guide.
