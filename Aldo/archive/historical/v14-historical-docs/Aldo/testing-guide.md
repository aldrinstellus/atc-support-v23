# Testing Guide: Widget Repeating Bug Fix

## Problem Description
Previously, all queries were showing the same widget (executive-summary) regardless of the actual query. This was caused by browser caching old JavaScript code.

## Fix Applied
1. ✅ Killed all dev server processes
2. ✅ Cleared Next.js cache (`.next/` directory)
3. ✅ Cleared Turbopack cache (`node_modules/.cache/`)
4. ✅ Added cache busting to Next.js config (`generateBuildId`)
5. ✅ Added enhanced debug logging to track widget updates

## How to Test

### Step 1: Clear Browser Cache
**CRITICAL:** You must clear browser cache completely before testing.

**Chrome/Edge:**
1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"
4. OR: Go to Settings → Privacy → Clear browsing data → Cached images and files

**Firefox:**
1. Ctrl+Shift+Delete (Cmd+Shift+Delete on Mac)
2. Select "Cache" only
3. Click "Clear Now"

**Safari:**
1. Develop → Empty Caches
2. OR: Cmd+Option+E

### Step 2: Open Browser Console
Keep DevTools console open to see debug logs:
- You should see `[Widget Detection]` logs for each query
- You should see `[Widget] Captured values` logs
- You should see `[Widget] Step 1` and `[Widget] Step 2` logs

### Step 3: Test Queries by Persona

## C-LEVEL EXECUTIVE TEST QUERIES

Test these queries in order (switch to C-Level persona first):

| # | Query | Expected Widget | Expected Response Text |
|---|-------|-----------------|------------------------|
| 1 | "executive summary" | executive-summary | "Good morning. Here's your executive summary for today:" |
| 2 | "tell me more about Acme Corp" | customer-risk-profile | "Let me pull up the detailed risk profile:" |
| 3 | "sla performance breakdown" | sla-performance-chart | "Here's the detailed SLA performance breakdown:" |
| 4 | "schedule a meeting with Sarah" | meeting-scheduler | "I've found available time slots for the executive call:" |

### What to Look For:
- **Query 1** should show Executive Summary widget (system health, critical alerts, metrics)
- **Query 2** should show Customer Risk Profile widget (different from Query 1!)
- **Query 3** should show SLA Performance Chart (bar charts, categories)
- **Query 4** should show Meeting Scheduler (calendar slots)

### Console Logs to Verify:
Each query should show:
```javascript
[Widget Detection] {
  query: "your query here",
  persona: "c-level",
  matched: true,
  widgetType: "executive-summary", // or customer-risk-profile, etc.
  assistantId: "assistant-1234567890-1"
}

[Widget] Captured values for setTimeout: {
  matchedWidgetType: "executive-summary",
  matchedResponseText: "Good morning. Here's your executive summary for...",
  capturedAssistantId: "assistant-1234567890-1",
  timestamp: 1234567890
}

[Widget] Step 1: Setting response text and widget loading {...}
[Widget] Step 1 complete. Message updated with content and widgetLoading
[Widget] Step 2: Setting widget type and data {...}
[Widget] Step 2 complete. Widget rendered: {...}
```

**CRITICAL CHECK:** The `widgetType` should be DIFFERENT for each query!

## CS MANAGER TEST QUERIES

Switch to CS Manager persona, then test:

| # | Query | Expected Widget | Expected Response Text |
|---|-------|-----------------|------------------------|
| 1 | "show me my team status" | team-workload-dashboard | "Here's your team's current workload status:" |
| 2 | "who are the top performers" | agent-performance-comparison | "Here's the agent performance comparison for this week:" |
| 3 | "show me high-risk customers" | customer-risk-list | "Here's the list of all high-risk customers requiring attention:" |

## SUPPORT AGENT TEST QUERIES

Switch to Support Agent persona, then test:

| # | Query | Expected Widget | Expected Response Text |
|---|-------|-----------------|------------------------|
| 1 | "what's on my plate today" | agent-dashboard | "Good morning! Here's what's on your plate today:" |
| 2 | "show me ticket #4892" | ticket-detail | "Here are the complete details for this ticket:" |
| 3 | "prepare for call with TechCorp" | call-prep-notes | "I've prepared comprehensive notes for your upcoming call:" |
| 4 | "help me respond to this ticket" | response-composer | "I've drafted a response for you to review:" |

## Troubleshooting

### If widgets still repeat (showing same widget for all queries):

1. **Check Console Logs**
   - Do you see `[Widget Detection]` logs?
   - Is `matched: true` for each query?
   - Is `widgetType` DIFFERENT for each query?

2. **If no console logs appear:**
   - Browser is still using old cached code
   - Try Incognito/Private window
   - Try different browser
   - Restart browser completely

3. **If `widgetType` is always "executive-summary":**
   - There's a bug in query detection logic
   - Report the exact query you typed
   - Check that persona matches (C-Level, CS Manager, Support Agent)

4. **If `widgetType` is correct but widget shows old data:**
   - Demo data might be cached in localStorage
   - Clear localStorage: `localStorage.clear()` in console
   - Refresh page

## Success Criteria

✅ **Fix is working if:**
- Each different query shows a DIFFERENT widget
- Console logs show different `widgetType` values
- Widget content matches the query intent
- No repeated widgets from previous queries

❌ **Fix is NOT working if:**
- All queries show "executive-summary" widget
- Console logs show same `widgetType` for different queries
- Widget content doesn't match query
- Previous widget appears for new queries

## Quick Test Script

Copy-paste this into browser console to verify all data is loaded:

```javascript
// Test query detection for C-Level
import('/src/lib/query-detection.js').then(module => {
  const queries = [
    'executive summary',
    'tell me more about Acme',
    'sla performance breakdown',
    'schedule a meeting'
  ];

  queries.forEach(q => {
    const result = module.detectWidgetQuery(q, 'c-level');
    console.log(`"${q}" →`, result?.widgetType || 'NO MATCH');
  });
});
```

Expected output:
```
"executive summary" → executive-summary
"tell me more about Acme" → customer-risk-profile
"sla performance breakdown" → sla-performance-chart
"schedule a meeting" → meeting-scheduler
```

## Report Template

If issue persists, provide this info:

```
**Browser:** Chrome/Firefox/Safari (version)
**Persona:** C-Level/CS Manager/Support Agent
**Query 1:** [your query]
**Widget Shown 1:** [widget name from console]
**Query 2:** [your query]
**Widget Shown 2:** [widget name from console]

**Console Logs:**
[paste relevant console logs]

**LocalStorage Cleared:** Yes/No
**Cache Cleared:** Yes/No
**Incognito Mode:** Yes/No
```
