# V17 Mode Switcher: Justice League Optimization Implementation Plan

**Date**: 2025-11-13
**Based On**: JUSTICE-LEAGUE-FULL-SPECTRUM-AUDIT.md
**Goal**: Implement all Priority 1 and Priority 2 improvements

---

## 📋 Implementation Summary

### Priority 1: Widget Optimization (72 → 87 points)
**Impact**: +30-40% user value
**Effort**: Medium (code changes in 1 file)
**Timeline**: This session

### Priority 2: Response Uniqueness (92 → 100 points)
**Impact**: +8 points uniqueness score
**Effort**: Low (11 text changes)
**Timeline**: This session

### Priority 3: Screenshot Cleanup (95 → 100 points)
**Impact**: Cosmetic only
**Effort**: Minimal (1 minute)
**Timeline**: This session

**Total Expected Improvement**: 89/100 → 96/100 overall quality score

---

## 🔧 PRIORITY 1: Widget Optimization

### Step 1: Add Missing Imports

**File**: `/src/lib/query-detection.ts` (lines 7-48)

**Add These Imports**:
```typescript
  analyticsDashboardDemo,
  performanceTrendsDemo,
  sentimentAnalysisDemo,
```

### Step 2: Implement New C-Level Query Mappings

**Location**: `detectCLevelQuery()` function

**New Queries to Add** (5 total):

1. **Analytics Dashboard Queries**:
```typescript
// Show analytics / dashboard / metrics
if (q.includes('analytics') || q.includes('dashboard') || q.includes('metrics overview')) {
  return {
    widgetType: 'analytics-dashboard',
    widgetData: analyticsDashboardDemo,
    responseText: "Executive analytics dashboard displays ticket volume trends and response time metrics:",
  };
}
```

2. **Performance Trends Queries**:
```typescript
// Performance trends / how are we doing
if ((q.includes('performance') && q.includes('trend')) ||
    q.includes('how are we doing') ||
    q.includes('show trends')) {
  return {
    widgetType: 'performance-trends',
    widgetData: performanceTrendsDemo,
    responseText: "Performance trend analysis reveals multi-metric patterns across response time, resolution, and satisfaction:",
  };
}
```

3. **Sentiment Analysis Queries**:
```typescript
// Customer sentiment / how are customers feeling
if (q.includes('sentiment') ||
    (q.includes('customer') && q.includes('feeling')) ||
    q.includes('customer feedback')) {
  return {
    widgetType: 'sentiment-analysis',
    widgetData: sentimentAnalysisDemo,
    responseText: "Customer sentiment analysis shows overall satisfaction trends and recent feedback:",
  };
}
```

### Step 3: Implement CS Manager Query Mappings

**Location**: `detectManagerQuery()` function

**New Queries to Add** (3 total):

1. **Team Analytics**:
```typescript
// Team analytics / team metrics
if ((q.includes('team') && (q.includes('analytics') || q.includes('metrics'))) ||
    q.includes('team data')) {
  return {
    widgetType: 'analytics-dashboard',
    widgetData: analyticsDashboardDemo,
    responseText: "Team analytics dashboard displays volume and response time metrics across your team:",
  };
}
```

2. **Team Performance Trends**:
```typescript
// Team performance trends / how is team trending
if ((q.includes('team') && q.includes('performance') && q.includes('trend')) ||
    q.includes('team trending') ||
    q.includes('show team trend')) {
  return {
    widgetType: 'performance-trends',
    widgetData: performanceTrendsDemo,
    responseText: "Team performance trends reveal improvement patterns across key metrics over time:",
  };
}
```

3. **Team Sentiment**:
```typescript
// Overall sentiment / team sentiment
if ((q.includes('overall') || q.includes('team')) && q.includes('sentiment')) {
  return {
    widgetType: 'sentiment-analysis',
    widgetData: sentimentAnalysisDemo,
    responseText: "Team-wide customer sentiment analysis shows satisfaction levels across all interactions:",
  };
}
```

### Step 4: Implement Support Agent Query Mappings

**Location**: `detectAgentQuery()` function

**New Queries to Add** (2 total):

1. **My Ticket Trends**:
```typescript
// My ticket trends / my performance over time
if ((q.includes('my') && (q.includes('trend') || q.includes('over time'))) ||
    q.includes('how am i trending')) {
  return {
    widgetType: 'performance-trends',
    widgetData: performanceTrendsDemo,
    responseText: "Your personal performance trends show improvement across response time and resolution quality:",
  };
}
```

---

## ✍️ PRIORITY 2: Response Uniqueness Fixes

### Fix 1: Ticket List Responses (3 duplicates)

**Lines to Change**:

**Line 213 (C-Level)**:
```typescript
// BEFORE:
responseText: "Here are the live tickets from Zoho Desk:",

// AFTER:
responseText: "Executive ticket overview from Zoho Desk:",
```

**Line 304 (CS Manager)**:
```typescript
// BEFORE:
responseText: "Here are the live tickets from Zoho Desk:",

// AFTER:
responseText: "Here's your team's ticket queue from Zoho Desk:",
```

**Line 635 (Support Agent)**:
```typescript
// BEFORE:
responseText: "Here are the live tickets from Zoho Desk:",

// AFTER:
responseText: "Here are your assigned tickets from Zoho Desk:",
```

### Fix 2: Ticket Detail Responses (3 duplicates)

**Lines to Change**:

**Line 233 (C-Level)**:
```typescript
// BEFORE:
responseText: "Here are the complete details for ticket #[N] from Zoho Desk:",

// AFTER:
responseText: `Ticket details with executive summary from Zoho Desk:`,
```

**Line 327 (CS Manager)**:
```typescript
// BEFORE:
responseText: "Here are the complete details for ticket #[N] from Zoho Desk:",

// AFTER:
responseText: `Ticket details with team context from Zoho Desk:`,
```

**Line 584 (Support Agent)**:
```typescript
// BEFORE:
responseText: "Here are the complete details for ticket #[N] from Zoho Desk:",

// AFTER:
responseText: `Loading complete ticket details from Zoho Desk:`,
```

### Fix 3: Customer Risk Responses (2 duplicates)

**Lines to Change**:

**Line 163 (C-Level)**:
```typescript
// BEFORE:
responseText: "Here's the list of all high-risk customers requiring attention:",

// AFTER:
responseText: "Strategic risk portfolio shows customers requiring executive attention:",
```

**Line 369 (CS Manager)**:
```typescript
// BEFORE:
responseText: "Here's the list of all high-risk customers requiring attention:",

// AFTER:
responseText: "Here's your team's high-risk customer assignments requiring immediate action:",
```

### Fix 4: Draft Message/Response (2 similar)

**Lines to Change**:

**Line 408 (CS Manager)**:
```typescript
// BEFORE:
responseText: "I've drafted a message for you to review:",

// AFTER:
responseText: "I've drafted a customer communication for your approval:",
```

**Line 619 (Support Agent)**:
```typescript
// BEFORE:
responseText: "I've drafted a response for you to review:",

// AFTER:
responseText: "I've prepared a ticket response for your review and editing:",
```

### Fix 5: KB Article Response (1 generic)

**Line to Change**:

**Line 689 (Support Agent)**:
```typescript
// BEFORE:
responseText: "Here's [KB-ID]:",

// AFTER:
responseText: `Loading knowledge article with troubleshooting steps:`,
```

---

## 🧹 PRIORITY 3: Screenshot Cleanup

### Commands to Run

```bash
cd /Users/admin/Documents/claudecode/workspaces/enterprise-ai-support/apps/v17-mode-switcher/demo-screenshots/service-team-lead

# Remove 3 duplicate files
rm 03-technical-blockers.png
rm 05-deployment-performance.png
rm 05-dora-metrics-FAILED.png

# Verify cleanup
ls -1 *.png | wc -l   # Should show 6 (not 9)
```

---

## ✅ Verification Plan

### Step 1: Code Verification
```bash
# Type check
npm run type-check

# Verify no TypeScript errors
echo $?  # Should be 0
```

### Step 2: Visual Verification with MCP

**Test New C-Level Queries** (3 tests):
1. "show me analytics" → Should show analytics-dashboard
2. "how's our performance trending" → Should show performance-trends
3. "what's customer sentiment" → Should show sentiment-analysis

**Test New CS Manager Queries** (2 tests):
4. "show team analytics" → Should show analytics-dashboard
5. "show team performance trends" → Should show performance-trends

**Test Fixed Response Uniqueness** (sample 3):
6. C-Level: "show my tickets" → "Executive ticket overview from Zoho Desk:"
7. CS Manager: "show team tickets" → "Here's your team's ticket queue from Zoho Desk:"
8. Support Agent: "show my tickets" → "Here are your assigned tickets from Zoho Desk:"

### Step 3: Screenshot Verification
```bash
# Verify only 6 screenshots remain in service-team-lead
ls /Users/admin/Documents/claudecode/workspaces/enterprise-ai-support/apps/v17-mode-switcher/demo-screenshots/service-team-lead/*.png | wc -l
```

---

## 📊 Expected Quality Score Improvement

### Before Optimizations
| Dimension | Score |
|-----------|-------|
| Response Uniqueness | 92/100 |
| Query Relevance | 100/100 |
| Widget Optimality | 72/100 |
| Screenshot Verification | 95/100 |
| **OVERALL** | **89/100** |

### After Optimizations
| Dimension | Score | Change |
|-----------|-------|--------|
| Response Uniqueness | **100/100** | +8 |
| Query Relevance | 100/100 | 0 |
| Widget Optimality | **87/100** | +15 |
| Screenshot Verification | **100/100** | +5 |
| **OVERALL** | **96/100** | **+7** |

---

## 📁 Files to Modify

1. `/src/lib/query-detection.ts` - Add imports, add 10 new queries, fix 11 response texts
2. `/demo-screenshots/service-team-lead/` - Delete 3 files

---

## ⏱️ Estimated Timeline

- **Step 1**: Add imports (2 minutes)
- **Step 2**: Add 10 new query mappings (15 minutes)
- **Step 3**: Fix 11 response texts (10 minutes)
- **Step 4**: Screenshot cleanup (1 minute)
- **Step 5**: Verification with MCP (15 minutes)

**Total**: ~45 minutes

---

## 🎯 Success Criteria

✅ All 10 new query mappings added
✅ All 11 response texts fixed for uniqueness
✅ Only 6 screenshots in service-team-lead folder
✅ Type check passes (0 errors)
✅ MCP visual tests confirm new widgets work
✅ Overall quality score: 96/100

---

**Implementation Status**: 📋 READY TO EXECUTE

**Next Step**: Implement all changes in `/src/lib/query-detection.ts`
