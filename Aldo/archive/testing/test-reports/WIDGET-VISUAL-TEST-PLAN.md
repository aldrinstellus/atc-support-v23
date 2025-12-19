# WIDGET VISUAL TEST PLAN - Chrome DevTools MCP

## Overview

This document provides step-by-step MCP commands to visually test all widgets and capture evidence of issues/fixes.

**Testing Tool**: Chrome DevTools MCP
**Port**: 3017
**Personas to Test**: C-Level, CS Manager, Support Agent

---

## PRE-TEST SETUP

### 1. Start Development Server
```bash
cd /Users/admin/Documents/claudecode/workspaces/enterprise-ai-support/apps/v17-mode-switcher
npm run dev
```

### 2. Verify Server Running
```bash
curl http://localhost:3017/api/health
# Expected: {"status":"healthy"}
```

---

## TEST SUITE 1: CRITICAL WIDGETS (PerformanceTrends + AnalyticsDashboard)

### Test 1A: PerformanceTrendsWidget (CS Manager)

**Step 1: Navigate to CS Manager demo**
```javascript
await mcp__chrome-devtools__navigate_page({
  url: "http://localhost:3017/demo/cs-manager",
  type: "url"
})
```

**Step 2: Wait for page load**
```javascript
await mcp__chrome-devtools__wait_for({
  text: "CS Manager",
  timeout: 5000
})
```

**Step 3: Take page screenshot (for context)**
```javascript
await mcp__chrome-devtools__take_screenshot({
  filePath: "test-cs-manager-page.png"
})
```

**Step 4: Trigger Performance Trends widget**
```javascript
// Option A: Click Quick Action (if exists)
// First take snapshot to find UID
await mcp__chrome-devtools__take_snapshot()
// Then click the Quick Action button
// await mcp__chrome-devtools__click({ uid: "performance-trends-button-uid" })

// Option B: Type query in chat
// Find input field UID from snapshot
// await mcp__chrome-devtools__fill({ uid: "chat-input-uid", value: "Show performance trends" })
// await mcp__chrome-devtools__press_key({ key: "Enter" })
```

**Step 5: Wait for widget to render**
```javascript
await mcp__chrome-devtools__wait_for({
  text: "Performance Trends",
  timeout: 8000
})
```

**Step 6: Take widget screenshot**
```javascript
await mcp__chrome-devtools__take_screenshot({
  filePath: "performance-trends-before-fix.png"
})
```

**Step 7: Check console for errors**
```javascript
await mcp__chrome-devtools__list_console_messages({
  types: ["error", "warn"]
})
```

**Step 8: Check network requests**
```javascript
await mcp__chrome-devtools__list_network_requests({
  pageSize: 20
})
```

**Expected Issues**:
- Chart should show lines but with hardcoded colors (#3b82f6, #10b981, #f59e0b)
- No gradient effect on lines
- Basic tooltip styling
- No smooth entry animation

**After Fix - Repeat Steps 1-8 with "after-fix" filenames**

---

### Test 1B: AnalyticsDashboardWidget (Multiple Personas)

**Step 1: Navigate to CS Manager demo**
```javascript
await mcp__chrome-devtools__navigate_page({
  url: "http://localhost:3017/demo/cs-manager",
  type: "url"
})
```

**Step 2: Trigger Analytics Dashboard widget**
```javascript
// Query: "Show analytics dashboard"
// OR click Quick Action if available
```

**Step 3: Wait for widget**
```javascript
await mcp__chrome-devtools__wait_for({
  text: "Analytics Dashboard",
  timeout: 8000
})
```

**Step 4: Take screenshot**
```javascript
await mcp__chrome-devtools__take_screenshot({
  filePath: "analytics-dashboard-before-fix.png"
})
```

**Step 5: Take text snapshot (to analyze chart elements)**
```javascript
await mcp__chrome-devtools__take_snapshot({
  verbose: true
})
```

**Step 6: Check console**
```javascript
await mcp__chrome-devtools__list_console_messages({
  types: ["error", "warn"]
})
```

**Expected Issues**:
- BarChart with solid fill (no gradient)
- LineChart with solid stroke (no gradient)
- Basic tooltip styling
- No entry animation

**After Fix - Repeat with "after-fix" filenames**

---

## TEST SUITE 2: ENHANCED WIDGETS (Verify Still Working)

### Test 2A: VendorComplianceDashboardWidget (COR)

**Step 1: Navigate to demo**
```javascript
await mcp__chrome-devtools__navigate_page({
  url: "http://localhost:3017/demo/cor",
  type: "url"
})
```

**Step 2: Trigger widget**
```javascript
// Query: "Show vendor compliance dashboard"
```

**Step 3: Take screenshot**
```javascript
await mcp__chrome-devtools__take_screenshot({
  filePath: "vendor-compliance-verification.png"
})
```

**Step 4: Check console**
```javascript
await mcp__chrome-devtools__list_console_messages({
  types: ["error"]
})
```

**Expected Result**:
- ✅ Multi-stop gradients on AreaChart
- ✅ CustomTooltip with proper styling
- ✅ Smooth Framer Motion entry animation
- ✅ 0 console errors

---

### Test 2B: SprintBurndownChartWidget (PM)

**Step 1: Navigate to PM demo**
```javascript
await mcp__chrome-devtools__navigate_page({
  url: "http://localhost:3017/demo/pm",
  type: "url"
})
```

**Step 2: Trigger widget**
```javascript
// Query: "Show sprint burndown"
```

**Step 3: Take screenshot**
```javascript
await mcp__chrome-devtools__take_screenshot({
  filePath: "sprint-burndown-verification.png"
})
```

**Expected Result**:
- ✅ Multi-stop gradients on LineChart
- ✅ CustomTooltip
- ✅ Framer Motion animations
- ✅ 0 console errors

---

### Test 2C: TeamVelocityDashboardWidget (PM)

**Step 1: Navigate to PM demo**
```javascript
await mcp__chrome-devtools__navigate_page({
  url: "http://localhost:3017/demo/pm",
  type: "url"
})
```

**Step 2: Trigger widget**
```javascript
// Query: "Show team velocity"
```

**Step 3: Take screenshot**
```javascript
await mcp__chrome-devtools__take_screenshot({
  filePath: "team-velocity-verification.png"
})
```

**Expected Result**:
- ✅ Multi-stop gradients on charts
- ✅ CustomTooltip
- ✅ Framer Motion animations
- ✅ 0 console errors

---

### Test 2D: ContractPerformanceDashboardWidget (COR)

**Step 1: Navigate to COR demo**
```javascript
await mcp__chrome-devtools__navigate_page({
  url: "http://localhost:3017/demo/cor",
  type: "url"
})
```

**Step 2: Trigger widget**
```javascript
// Query: "Show contract performance"
```

**Step 3: Take screenshot**
```javascript
await mcp__chrome-devtools__take_screenshot({
  filePath: "contract-performance-verification.png"
})
```

**Expected Result**:
- ✅ Multi-stop gradients on charts
- ✅ CustomTooltip
- ✅ Framer Motion animations
- ✅ 0 console errors

---

## TEST SUITE 3: DASHBOARD WIDGETS (No Charts - Verify Layout)

### Test 3A: TeamWorkloadDashboardWidget (CS Manager)

**Step 1: Navigate and trigger**
```javascript
await mcp__chrome-devtools__navigate_page({
  url: "http://localhost:3017/demo/cs-manager",
  type: "url"
})

// Query: "Show team workload"
```

**Step 2: Take screenshot**
```javascript
await mcp__chrome-devtools__take_screenshot({
  filePath: "team-workload-dashboard.png"
})
```

**Expected Result**:
- ✅ No charts (agent cards with progress bars)
- ⚠️ Missing Framer Motion (add later)
- ✅ 0 console errors

---

### Test 3B: SLAPerformanceChartWidget (CS Manager)

**Note**: Misnamed widget - actually a dashboard, not a chart widget

**Step 1: Navigate and trigger**
```javascript
await mcp__chrome-devtools__navigate_page({
  url: "http://localhost:3017/demo/cs-manager",
  type: "url"
})

// Query: "Show SLA performance"
```

**Step 2: Take screenshot**
```javascript
await mcp__chrome-devtools__take_screenshot({
  filePath: "sla-performance-dashboard.png"
})
```

**Expected Result**:
- ✅ No charts (progress bars and metrics)
- ⚠️ Missing Framer Motion (add later)
- ⚠️ Misnamed (should be "SLAPerformanceDashboardWidget")
- ✅ 0 console errors

---

## TEST SUITE 4: AUTOMATED MULTI-WIDGET TEST

### Batch Test Script (All Widgets in One Session)

```javascript
// List of all chart widgets to test
const chartWidgets = [
  {
    persona: "cs-manager",
    query: "Show performance trends",
    name: "PerformanceTrends",
    hasCharts: true,
    expectedQuality: 5
  },
  {
    persona: "cs-manager",
    query: "Show analytics dashboard",
    name: "AnalyticsDashboard",
    hasCharts: true,
    expectedQuality: 5
  },
  {
    persona: "cor",
    query: "Show vendor compliance",
    name: "VendorCompliance",
    hasCharts: true,
    expectedQuality: 10
  },
  {
    persona: "pm",
    query: "Show sprint burndown",
    name: "SprintBurndown",
    hasCharts: true,
    expectedQuality: 10
  },
  {
    persona: "pm",
    query: "Show team velocity",
    name: "TeamVelocity",
    hasCharts: true,
    expectedQuality: 10
  },
  {
    persona: "cor",
    query: "Show contract performance",
    name: "ContractPerformance",
    hasCharts: true,
    expectedQuality: 10
  },
  {
    persona: "cs-manager",
    query: "Show SLA performance",
    name: "SLAPerformance",
    hasCharts: false,
    expectedQuality: 7
  },
  {
    persona: "cs-manager",
    query: "Compare agent performance",
    name: "AgentPerformanceComparison",
    hasCharts: false,
    expectedQuality: 7
  },
  {
    persona: "cs-manager",
    query: "Show team workload",
    name: "TeamWorkload",
    hasCharts: false,
    expectedQuality: 7
  }
];

// For each widget, run test sequence
for (const widget of chartWidgets) {
  // Navigate to persona demo
  await mcp__chrome-devtools__navigate_page({
    url: `http://localhost:3017/demo/${widget.persona}`,
    type: "url"
  });

  // Wait for page load
  await mcp__chrome-devtools__wait_for({
    text: widget.persona.replace("-", " "),
    timeout: 5000
  });

  // Take page screenshot
  await mcp__chrome-devtools__take_screenshot({
    filePath: `test-${widget.name}-page.png`
  });

  // Take snapshot to find input UID
  await mcp__chrome-devtools__take_snapshot();

  // Trigger widget via query
  // (Manual step - find input UID from snapshot and fill/submit)

  // Wait for widget
  await mcp__chrome-devtools__wait_for({
    text: widget.name.replace(/([A-Z])/g, ' $1').trim(),
    timeout: 8000
  });

  // Take widget screenshot
  await mcp__chrome-devtools__take_screenshot({
    filePath: `test-${widget.name}-widget.png`
  });

  // Check console
  const consoleMessages = await mcp__chrome-devtools__list_console_messages({
    types: ["error", "warn"]
  });

  // Log results
  console.log(`Widget: ${widget.name}`);
  console.log(`Has Charts: ${widget.hasCharts}`);
  console.log(`Expected Quality: ${widget.expectedQuality}/10`);
  console.log(`Console Errors: ${consoleMessages.length}`);
  console.log("---");
}
```

---

## TEST SUITE 5: PERFORMANCE TESTING

### Test 5A: Chart Rendering Performance

**Step 1: Start performance trace**
```javascript
await mcp__chrome-devtools__performance_start_trace({
  reload: true,
  autoStop: true
})
```

**Step 2: Navigate to widget**
```javascript
await mcp__chrome-devtools__navigate_page({
  url: "http://localhost:3017/demo/cs-manager",
  type: "url"
})
```

**Step 3: Stop trace and analyze**
```javascript
await mcp__chrome-devtools__performance_stop_trace()
```

**Expected Metrics**:
- Largest Contentful Paint (LCP): <2.5s
- First Input Delay (FID): <100ms
- Cumulative Layout Shift (CLS): <0.1
- Widget render time: <500ms

---

## TEST SUITE 6: RESPONSIVE DESIGN TESTING

### Test 6A: Mobile Viewport

**Step 1: Resize to mobile**
```javascript
await mcp__chrome-devtools__resize_page({
  width: 375,
  height: 667
})
```

**Step 2: Navigate and screenshot**
```javascript
await mcp__chrome-devtools__navigate_page({
  url: "http://localhost:3017/demo/cs-manager",
  type: "url"
})

await mcp__chrome-devtools__take_screenshot({
  filePath: "mobile-view.png"
})
```

### Test 6B: Tablet Viewport

**Step 1: Resize to tablet**
```javascript
await mcp__chrome-devtools__resize_page({
  width: 768,
  height: 1024
})
```

**Step 2: Take screenshot**
```javascript
await mcp__chrome-devtools__take_screenshot({
  filePath: "tablet-view.png"
})
```

### Test 6C: Desktop Viewport

**Step 1: Resize to desktop**
```javascript
await mcp__chrome-devtools__resize_page({
  width: 1920,
  height: 1080
})
```

**Step 2: Take screenshot**
```javascript
await mcp__chrome-devtools__take_screenshot({
  filePath: "desktop-view.png"
})
```

---

## TEST SUITE 7: NETWORK CONDITION TESTING

### Test 7A: Slow 3G

**Step 1: Enable network throttling**
```javascript
await mcp__chrome-devtools__emulate({
  networkConditions: "Slow 3G"
})
```

**Step 2: Navigate and measure load time**
```javascript
const startTime = Date.now();

await mcp__chrome-devtools__navigate_page({
  url: "http://localhost:3017/demo/cs-manager",
  type: "url"
})

const endTime = Date.now();
console.log(`Load time: ${endTime - startTime}ms`);
```

**Step 3: Disable throttling**
```javascript
await mcp__chrome-devtools__emulate({
  networkConditions: "No emulation"
})
```

---

## EVIDENCE COLLECTION CHECKLIST

For each widget tested, collect:

- [ ] Before-fix screenshot
- [ ] After-fix screenshot
- [ ] Console error log (JSON)
- [ ] Network request log (JSON)
- [ ] Page snapshot (text representation)
- [ ] Performance trace (if applicable)
- [ ] Mobile/tablet/desktop responsive screenshots

**Evidence Location**: `/screenshots/widget-tests/`

---

## REPORTING TEMPLATE

### Widget Test Report Template

```markdown
## Widget: [Name]

**Date Tested**: 2025-11-13
**Persona**: [CS Manager / PM / COR / C-Level / Support Agent]
**Quality Score**: [0-10]/10

### Visual Evidence
- Before Fix: ![](screenshots/[name]-before-fix.png)
- After Fix: ![](screenshots/[name]-after-fix.png)

### Console Errors
```json
[
  // Error logs here
]
```

### Issues Found
1. Issue 1 description
2. Issue 2 description

### Fixes Applied
1. Fix 1 description
2. Fix 2 description

### Verification
- [ ] Charts render correctly
- [ ] Multi-stop gradients visible
- [ ] CustomTooltip displays properly
- [ ] Framer Motion animations smooth (60fps)
- [ ] 0 console errors
- [ ] Responsive across viewports
- [ ] Performance acceptable (<500ms render)

### Status
- [ ] PASS
- [ ] FAIL (reason: ...)
```

---

## AUTOMATED TEST RUNNER (Future Enhancement)

### Playwright Test Script (Optional)

```typescript
import { test, expect } from '@playwright/test';

test.describe('Widget Visual Tests', () => {
  test('PerformanceTrendsWidget renders correctly', async ({ page }) => {
    await page.goto('http://localhost:3017/demo/cs-manager');

    // Trigger widget
    await page.fill('[data-testid="chat-input"]', 'Show performance trends');
    await page.press('[data-testid="chat-input"]', 'Enter');

    // Wait for widget
    await page.waitForSelector('text=Performance Trends', { timeout: 8000 });

    // Take screenshot
    await page.screenshot({ path: 'performance-trends.png' });

    // Check for errors
    const errors = await page.evaluate(() => {
      return window.console.errors || [];
    });
    expect(errors).toHaveLength(0);

    // Verify gradient exists
    const gradient = await page.locator('linearGradient').count();
    expect(gradient).toBeGreaterThan(0);
  });
});
```

---

**Test Plan Version**: 1.0
**Date**: 2025-11-13
**Author**: Claude Code QA Engineer
**Tools**: Chrome DevTools MCP, Playwright (optional)
