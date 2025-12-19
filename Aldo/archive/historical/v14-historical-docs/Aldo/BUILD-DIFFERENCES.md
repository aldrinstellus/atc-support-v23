# Build Differences: V11 vs V12

**Document Created:** 2025-10-13
**Status:** Active Development - V12 Running on Port 3011

---

## Overview

This document explains the relationship between the `enterprise-ai-support-v11/` and `enterprise-ai-support-v12/` folders, and why V12 contains V11 code with enhancements.

### Key Insight
Both folders identify as **Version 11.0.0** in `package.json`, but they are **NOT identical**:
- **V11 folder** = Baseline/clean V11 codebase
- **V12 folder** = Enhanced V11 with Zoho integration features (currently running for demo)

---

## Version Identity

### V11 Folder
```json
{
  "name": "enterprise-ai-support-v11",
  "version": "11.0.0",
  "description": "Enterprise AI Support Dashboard V11 - Advanced Development Branch"
}
```

### V12 Folder (Same Identity!)
```json
{
  "name": "enterprise-ai-support-v11",
  "version": "11.0.0",
  "description": "Enterprise AI Support Dashboard V11 - Advanced Development Branch"
}
```

**Why?** V12 is a **working copy** of V11 with production enhancements, not a version bump.

---

## Major Differences

### 1. NPM Scripts (package.json)

**V12 Additions:**
```json
{
  "scripts": {
    "dev:webhooks": "./start-dev.sh",      // ⭐ NEW: Start with ngrok tunnel
    "dev:stop": "./stop-dev.sh",           // ⭐ NEW: Clean shutdown script
    "dev:webhook-url": "./get-webhook-url.sh"  // ⭐ NEW: Get ngrok URL
  }
}
```

These enable automated webhook development workflow with ngrok tunneling.

### 2. Shell Automation Scripts

**V12 Has 5 Shell Scripts (V11 has 0):**

| Script | Purpose | Lines |
|--------|---------|-------|
| `start-dev.sh` | Start Next.js + ngrok tunnel, configure webhook URL | 93 |
| `stop-dev.sh` | Clean shutdown of dev server and ngrok | 748 |
| `get-webhook-url.sh` | Retrieve current ngrok public URL | 1037 |
| `test-all-scenarios.sh` | Test webhook scenarios end-to-end | 6294 |
| `push-schema.sh` | Database schema deployment | 551 |

**Key Feature - `start-dev.sh`:**
- Kills existing processes on port 3011
- Starts Next.js dev server
- Launches ngrok tunnel
- Displays webhook URL for Zoho Desk configuration
- Saves PIDs for cleanup

### 3. API Routes

**API Route Count:**
- V11: **5 API route files**
- V12: **8 API route files** (+3 additions)

**V12 Additional Routes:**

#### `/api/webhook/route.ts` (NEW)
Simplified webhook proxy endpoint:
```typescript
// Shorter URL that forwards to /api/zoho/webhook
GET  /api/webhook → Returns webhook status
POST /api/webhook → Forwards to /api/zoho/webhook
```

#### `/api/zoho/sync/route.ts` (ENHANCED)
Manual ticket sync from Zoho Desk:
- Fetch tickets with filters
- Bulk import functionality
- Dry-run mode for testing

#### `/api/zoho/process-ticket/route.ts` (ENHANCED)
AI-powered ticket processing:
- Password reset automation
- Agent assignment logic
- Follow-up detection
- Customer tier management

---

## Feature Additions in V12

### 1. Zoho Desk Integration

**Live Webhook Processing:**
- Real-time ticket creation events (`Ticket_Add`)
- Thread reply detection (`Ticket_Thread_Add`)
- Channel filtering (Email only)
- Event forwarding and processing

**Visible in Logs:**
```
[Zoho Webhook] Received event: {
  eventType: 'Ticket_Add',
  ticketId: '1200801000000525099',
  ticketNumber: '163',
  channel: 'Email',
  subject: 'test webhook - password help'
}
```

### 2. AI-Powered Automation

**Password Reset Detection:**
```typescript
[Processing] Optimized query:
[Processing] Sending password reset template
[Processing] Completed password reset ticket 1200801000000537001 in 3849ms
```

**Agent Assignment:**
```typescript
[Processing] Follow-up detected: Follow-up on password reset issue - demo escalation
[Agent Assignment] Assigned ticket 163 to agent agent-001
[Processing] Completed agent assignment for ticket in 6487ms
```

### 3. Database Integration

**Active Prisma Operations:**
- Customer upserts with tier management
- Ticket creation and updates
- Agent metrics tracking
- Activity logging
- Real-time workload balancing

**Sample Query:**
```sql
INSERT INTO "public"."tickets" (...) VALUES (...)
ON CONFLICT ("ticketnumber") DO UPDATE SET "aiProcessed" = $18, ...
```

### 4. ngrok Tunnel Management

**Automatic Public URL:**
```bash
🌐 Public Webhook URL: https://xxxx.ngrok.io/api/zoho/webhook
```

**Benefits:**
- Test webhooks locally without deployment
- Dynamic URL generation
- Automatic configuration display
- No manual port forwarding

---

## Infrastructure Differences

### API Structure

**V11 Structure:**
```
src/app/api/
├── chat/
├── tickets/
└── zoho/
    ├── test/
    └── webhook/
```

**V12 Structure:**
```
src/app/api/
├── chat/
├── tickets/
├── webhook/           ⭐ NEW
├── zoho/
│   ├── process-ticket/ ⭐ NEW
│   ├── sync/          ⭐ NEW
│   ├── test/
│   └── webhook/
```

### Environment Variables

**V12 Requires:**
```bash
# Database (Supabase PostgreSQL)
DATABASE_URL=postgresql://...

# Zoho Desk API (for testing)
ZOHO_DESK_ORG_ID=...
ZOHO_ACCESS_TOKEN=...

# Optional: ngrok authtoken for custom domains
NGROK_AUTHTOKEN=...
```

---

## When to Use Each Version

### Use V11 Folder When:
- Starting fresh feature development
- Testing changes without Zoho integration
- Need clean baseline for comparison
- Prototyping new ideas

### Use V12 Folder When:
- Running demos with live webhooks ✅ (CURRENTLY ACTIVE)
- Testing Zoho Desk integration
- Demonstrating AI automation
- Production-like environment testing

---

## Current Deployment Status

**Active Server:** V12 on port 3011
**Status:** STABLE ✅
**Features Active:**
- ✅ Zoho Desk webhook processing
- ✅ AI ticket classification
- ✅ Agent assignment automation
- ✅ Database persistence
- ✅ Real-time updates

**Production URL:** http://localhost:3011/demo/c-level

---

## Migration Path

If you want to merge V12 enhancements back to V11:

1. **Copy Shell Scripts:**
   ```bash
   cp enterprise-ai-support-v12/*.sh enterprise-ai-support-v11/
   ```

2. **Update package.json:**
   Add the three new npm scripts

3. **Copy API Routes:**
   ```bash
   cp -r enterprise-ai-support-v12/src/app/api/webhook enterprise-ai-support-v11/src/app/api/
   cp -r enterprise-ai-support-v12/src/app/api/zoho/sync enterprise-ai-support-v11/src/app/api/zoho/
   cp -r enterprise-ai-support-v12/src/app/api/zoho/process-ticket enterprise-ai-support-v11/src/app/api/zoho/
   ```

4. **Bump Version:**
   Consider updating to 11.1.0 or 12.0.0 to reflect enhancements

---

## Conclusion

**V12 is NOT a new version** - it's an **enhanced production build** of V11 with:
- Zoho Desk integration
- AI automation workflows
- Webhook infrastructure
- Development tooling

Think of it as:
- **V11** = Core product
- **V12** = Core product + Production integrations

The naming is slightly misleading, but functionally, V12 is the **demo-ready** version with all features enabled.

---

**Last Updated:** 2025-10-13
**Maintained By:** Development Team
**Status:** Active - Do Not Break Production Server!
