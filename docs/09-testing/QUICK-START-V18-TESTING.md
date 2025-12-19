# Quick Start: V18 Testing Guide

**Purpose**: Fast-track guide for running remaining 52 persona tests using Chrome DevTools MCP

**Estimated Time**: 15-20 minutes for 5 remaining personas

**Status**: Dev server running on port 3019 ✅

---

## 🚀 Quick Commands

### Verify Dev Server Running

```bash
# Check if server is active
lsof -ti:3019

# Verify HTTP response
curl -s -o /dev/null -w "%{http_code}" http://localhost:3019
# Expected: 200
```

**If server not running**:
```bash
cd /Users/admin/Documents/claudecode/workspaces/enterprise-ai-support/apps/v18-unified-modes
npm run dev
```

---

## 🧪 Testing Workflow

### Method 1: Chrome DevTools MCP (Automated)

**Advantages**:
- Automated screenshot capture
- Console error detection
- Network request monitoring
- Before/after comparison

**Basic Workflow**:

```javascript
// 1. Navigate to persona page
await mcp__chrome-devtools__navigate_page({
  url: "http://localhost:3019/demo/program-manager",
  type: "url"
})

// 2. Take initial screenshot
await mcp__chrome-devtools__take_screenshot({
  filePath: "program-manager-initial.png"
})

// 3. Take snapshot to get input UID
await mcp__chrome-devtools__take_snapshot()

// 4. Fill query (use UID from snapshot)
await mcp__chrome-devtools__fill({
  uid: "input-123", // Get from snapshot
  value: "Show me program health overview"
})

// 5. Submit query (press Enter)
await mcp__chrome-devtools__press_key({
  key: "Enter"
})

// 6. Wait for widget to render (30-45 seconds typical)
// Wait for response...

// 7. Take result screenshot
await mcp__chrome-devtools__take_screenshot({
  filePath: "program-manager-test-1-result.png"
})

// 8. Check console errors
await mcp__chrome-devtools__list_console_messages({
  types: ["error"]
})
// Expected: <no console messages found>
```

---

### Method 2: Manual Testing (Browser)

**Advantages**:
- Faster for quick checks
- No tool setup required
- Visual verification immediate

**Steps**:
1. Open http://localhost:3019/demo/program-manager
2. Type query in input field
3. Press Enter
4. Wait 30-45 seconds for widget to render
5. Visually verify widget displays correctly
6. Check browser console for errors (F12)
7. Take screenshot (Cmd+Shift+4 on Mac)
8. Document results

---

## 📋 Remaining Personas to Test

### Government Mode (4 personas)

| Persona | URL | First Query | Expected Widget |
|---------|-----|-------------|----------------|
| Program Manager | `/demo/program-manager` | "Show me program health overview" | Program Health Dashboard |
| Service Team Lead | `/demo/service-team-lead` | "Show me team capacity" | Resource Capacity Dashboard |
| Service Team Member | `/demo/service-team-member` | "Show me my tasks" | Task Kanban Board |
| Stakeholder Lead | `/demo/stakeholder-lead` | "Show me stakeholder engagement status" | Stakeholder Engagement Dashboard |

### Project Mode (1 persona)

| Persona | URL | First Query | Expected Widget |
|---------|-----|-------------|----------------|
| Project Lead | `/demo/project-lead` | "Show me code quality metrics" | Code Quality Dashboard |

---

## 📊 Test Dashboard

### Current Progress

| Mode | Tested | Remaining | Success Rate |
|------|--------|-----------|--------------|
| ATC | 4/4 (100%) | 0 | 100% |
| Government | 1/5 (20%) | 4 | 100% |
| Project | 1/2 (50%) | 1 | 100% |
| **Total** | **6/11 (55%)** | **5** | **100%** |

### Next Steps

**Priority 1**: Test Government personas (4 remaining)
- Program Manager
- Service Team Lead
- Service Team Member
- Stakeholder Lead

**Priority 2**: Test Project Lead (1 remaining)

**Expected Timeline**: 15-20 minutes total (3-4 minutes per persona)

---

## 🎬 Demo Script Reference

**Full Demo Script**: `/Aldo/aldo-script-v18-demo.md`

**Total Queries**: 52 across all 11 personas

**Query Breakdown**:
- ATC Mode: 28 queries (7+6+9+8)
- Government Mode: 18 queries (5+5+5+5+5)
- Project Mode: 12 queries (6+6)

**Testing Strategy**: Start with one query per persona for basic validation, then expand to full query set if needed.

---

## ✅ Success Criteria

### Per-Persona Checklist

For each persona test:
- [ ] Persona page loads correctly
- [ ] Query input field visible
- [ ] Query submitted successfully
- [ ] Widget renders within 45 seconds
- [ ] Widget displays correct data
- [ ] Zero console errors
- [ ] Screenshot captured

### Overall Success

- [ ] All 11 personas tested
- [ ] 100% widget rendering success rate
- [ ] Zero console errors across all tests
- [ ] All screenshots documented
- [ ] Test report updated

---

## 🔧 Troubleshooting

### Issue: Widget Not Rendering

**Symptoms**: Query submitted but no widget appears after 45+ seconds

**Solutions**:
1. Check console for errors (F12)
2. Verify Claude API key in `.env.local`
3. Check network requests (DevTools Network tab)
4. Try refreshing page (Cmd+Shift+R)
5. Retry query

---

### Issue: Console Errors

**Symptoms**: Red errors in browser console

**Solutions**:
1. Take screenshot of error
2. Document error message
3. Check if widget still renders
4. Report to Backend Developer if blocking

---

### Issue: Dev Server Not Responding

**Symptoms**: Cannot access http://localhost:3019

**Solutions**:
```bash
# Kill existing server
lsof -ti:3019 | xargs kill -9

# Restart server
cd /Users/admin/Documents/claudecode/workspaces/enterprise-ai-support/apps/v18-unified-modes
npm run dev

# Verify server running
curl http://localhost:3019
```

---

## 📸 Screenshot Organization

**Location**: `/Aldo/test-results/`

**Naming Convention**:
- Initial state: `{persona}-initial.png`
- Query result: `{persona}-test-{query-num}-result.png`
- Error state: `{persona}-error.png`

**Examples**:
- `program-manager-initial.png`
- `program-manager-test-1-result.png`
- `service-team-lead-initial.png`

---

## 📝 Documentation Template

### Per-Test Documentation

```markdown
### {Persona Name}

**URL**: http://localhost:3019/demo/{persona-slug}
**Status**: ✅ SUCCESS / ❌ FAILED
**Response Time**: {X} seconds

#### Query: "{query text}"
- **Expected Widget**: {Widget Type}
- **Screenshot**: {filename.png}
- **Widget Data**: {Brief description of displayed data}
- **Console Errors**: {0 or list of errors}
- **Notes**: {Any observations}
```

---

## 🎯 Quick Reference

### All Demo URLs

**ATC Mode**:
- http://localhost:3019/demo/atc-executive
- http://localhost:3019/demo/atc-manager
- http://localhost:3019/demo/atc-support
- http://localhost:3019/demo/atc-csm

**Government Mode**:
- http://localhost:3019/demo/cor
- http://localhost:3019/demo/program-manager
- http://localhost:3019/demo/service-team-lead
- http://localhost:3019/demo/service-team-member
- http://localhost:3019/demo/stakeholder-lead

**Project Mode**:
- http://localhost:3019/demo/project-lead
- http://localhost:3019/demo/project-manager

---

## 🚀 Start Testing Now

**Fastest Path** (15 minutes):

1. **Test Government Program Manager** (3 mins)
   ```
   URL: http://localhost:3019/demo/program-manager
   Query: "Show me program health overview"
   Expected: Program Health Dashboard widget
   ```

2. **Test Government Service Team Lead** (3 mins)
   ```
   URL: http://localhost:3019/demo/service-team-lead
   Query: "Show me team capacity"
   Expected: Resource Capacity Dashboard widget
   ```

3. **Test Government Service Team Member** (3 mins)
   ```
   URL: http://localhost:3019/demo/service-team-member
   Query: "Show me my tasks"
   Expected: Task Kanban Board widget
   ```

4. **Test Government Stakeholder Lead** (3 mins)
   ```
   URL: http://localhost:3019/demo/stakeholder-lead
   Query: "Show me stakeholder engagement status"
   Expected: Stakeholder Engagement Dashboard widget
   ```

5. **Test Project Lead** (3 mins)
   ```
   URL: http://localhost:3019/demo/project-lead
   Query: "Show me code quality metrics"
   Expected: Code Quality Dashboard widget
   ```

**Result**: 100% persona coverage in 15 minutes!

---

**Created**: 2025-11-20 3:35 PM PST
**Version**: 1.0
**Author**: Frontend Developer
