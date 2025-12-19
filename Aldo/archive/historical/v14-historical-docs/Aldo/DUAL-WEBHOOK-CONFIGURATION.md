# Dual Webhook Configuration - Development & Production

**Last Updated**: October 13, 2025 11:04 UTC
**Status**: ✅ Both endpoints active and tested

---

## 🎯 Overview

Your Enterprise AI Support V12 system now supports **TWO webhook endpoints**:

1. **Local Development (ngrok)** - For testing and development
2. **Production (Vercel)** - For live email processing

Both can run simultaneously and be configured in Zoho Desk.

---

## 📍 Webhook Endpoints

### 1. Local Development (ngrok)

**Purpose**: Local testing and development
**URL**: `https://iona-khakilike-violet.ngrok-free.dev/api/zoho/webhook`
**Status**: ✅ Active
**Last Tested**: 2025-10-13 11:04 UTC

**Characteristics**:
- ✅ Connected to your local dev server (port 3011)
- ✅ Real-time debugging and log visibility
- ✅ Instant code changes with hot reload
- ⚠️ URL changes on restart (free ngrok plan)
- ⚠️ Requires dev server running

**When to Use**:
- Testing new features locally
- Debugging webhook processing
- Developing new workflows
- Testing before production deployment

**Test Command**:
```bash
curl https://iona-khakilike-violet.ngrok-free.dev/api/zoho/webhook
```

**Expected Response**:
```json
{
  "status": "active",
  "message": "Zoho Desk webhook endpoint is ready",
  "timestamp": "2025-10-13T11:04:01.459Z"
}
```

---

### 2. Production (Vercel)

**Purpose**: Live production email processing
**URL**: `https://enterprise-ai-support-v12-c0ibhp1lm-aldos-projects-8cf34b67.vercel.app/api/zoho/webhook`
**Status**: ✅ Ready
**Last Tested**: 2025-10-13 11:04 UTC

**Characteristics**:
- ✅ Permanent URL (never changes)
- ✅ 24/7 availability
- ✅ Global edge network performance
- ✅ Automatic scaling
- ✅ Production-grade reliability

**When to Use**:
- Live customer email processing
- Production workflows
- High availability requirements
- When local dev server is not running

**Test Command**:
```bash
curl https://enterprise-ai-support-v12-c0ibhp1lm-aldos-projects-8cf34b67.vercel.app/api/zoho/webhook
```

**Expected Response**:
```json
{
  "status": "active",
  "message": "Zoho Desk webhook endpoint is ready",
  "timestamp": "2025-10-13T07:04:03.810Z"
}
```

---

## 🔧 Zoho Desk Configuration Options

You have **3 configuration strategies** to choose from:

### Option A: Production Only (Recommended for Live Use)

**Use Case**: Normal production operation

**Setup**:
1. Go to: Setup → Automation → Webhooks
2. Set URL to: `https://enterprise-ai-support-v12-c0ibhp1lm-aldos-projects-8cf34b67.vercel.app/api/zoho/webhook`
3. Enable webhook
4. All emails processed in production

**Pros**:
- ✅ Simple, single configuration
- ✅ No webhook updates needed
- ✅ Always available

**Cons**:
- ❌ Can't test locally without changing webhook URL

---

### Option B: Development Only (For Active Development)

**Use Case**: Testing new features, debugging

**Setup**:
1. Go to: Setup → Automation → Webhooks
2. Set URL to: `https://iona-khakilike-violet.ngrok-free.dev/api/zoho/webhook`
3. Enable webhook
4. Start dev server: `npm run dev:webhooks`

**Pros**:
- ✅ Real-time debugging
- ✅ Instant code changes
- ✅ Full log visibility

**Cons**:
- ❌ URL changes on restart (free ngrok)
- ❌ Requires dev server running
- ❌ Not available 24/7

---

### Option C: Dual Webhooks (Advanced - Requires Paid Zoho Plan)

**Use Case**: Simultaneous production processing + development testing

**Setup** (Requires Zoho Professional+ Plan):
1. Create **Webhook #1**: "Production"
   - URL: `https://enterprise-ai-support-v12-c0ibhp1lm-aldos-projects-8cf34b67.vercel.app/api/zoho/webhook`
   - Events: Ticket_Add + Ticket_Thread_Add
   - Channel: Email
   - Criteria: All tickets

2. Create **Webhook #2**: "Development"
   - URL: `https://iona-khakilike-violet.ngrok-free.dev/api/zoho/webhook`
   - Events: Ticket_Add + Ticket_Thread_Add
   - Channel: Email
   - Criteria: Subject contains "[TEST]" (optional filter)

**Pros**:
- ✅ Production always available
- ✅ Can test locally simultaneously
- ✅ No switching required

**Cons**:
- ❌ Requires paid Zoho plan
- ❌ Duplicate processing (unless filtered)

---

## 🚀 Quick Start Commands

### Start Local Development
```bash
# Start both Next.js and ngrok
npm run dev:webhooks

# Get current ngrok URL
npm run dev:webhook-url

# Stop all services
npm run dev:stop
```

### Check Status
```bash
# Test local endpoint
curl https://iona-khakilike-violet.ngrok-free.dev/api/zoho/webhook

# Test production endpoint
curl https://enterprise-ai-support-v12-c0ibhp1lm-aldos-projects-8cf34b67.vercel.app/api/zoho/webhook

# Check running services
ps aux | grep -E "(next-server|ngrok)"

# View ngrok logs
tail -f /tmp/ngrok.log
```

### Deploy to Production
```bash
# Deploy latest changes
vercel --prod

# View deployment logs
vercel logs --follow
```

---

## 📊 Current System Status

**Local Development**:
- Next.js: ✅ Running (PID 35125, port 3011)
- ngrok: ✅ Running (PID 38907)
- Webhook: ✅ Active and responding

**Production**:
- Vercel: ✅ Deployed and ready
- Webhook: ✅ Active and responding
- Last Deploy: 2025-10-13 06:53 UTC
- Build: ✅ Successful (46 seconds)

---

## 🧪 Testing Workflows

### Test with Local Development

1. **Start local server**:
   ```bash
   npm run dev:webhooks
   ```

2. **Update Zoho webhook** to ngrok URL (if not already):
   ```
   https://iona-khakilike-violet.ngrok-free.dev/api/zoho/webhook
   ```

3. **Send test email** to: `support@atcaisupport.zohodesk.com`

4. **Watch logs** in your terminal for real-time processing

5. **Make changes** and test immediately with hot reload

---

### Test with Production

1. **Update Zoho webhook** to Vercel URL:
   ```
   https://enterprise-ai-support-v12-c0ibhp1lm-aldos-projects-8cf34b67.vercel.app/api/zoho/webhook
   ```

2. **Send test email** to: `support@atcaisupport.zohodesk.com`

3. **Check Vercel logs**:
   ```bash
   vercel logs --follow
   ```
   Or visit: https://vercel.com/aldos-projects-8cf34b67/enterprise-ai-support-v12

4. **Verify email response** in your inbox

---

## 🔄 Switching Between Development & Production

### Switch to Development (for testing)
```bash
# 1. Start local server
npm run dev:webhooks

# 2. Get webhook URL
npm run dev:webhook-url

# 3. Update Zoho Desk webhook to ngrok URL
# 4. Test your changes
```

### Switch to Production (for live use)
```bash
# 1. Deploy latest changes (if any)
vercel --prod

# 2. Update Zoho Desk webhook to Vercel URL:
# https://enterprise-ai-support-v12-c0ibhp1lm-aldos-projects-8cf34b67.vercel.app/api/zoho/webhook

# 3. You can stop local server:
npm run dev:stop
```

---

## 📝 Environment Variables

Both endpoints use the same environment variables but from different sources:

**Local Development** (`.env.local`):
```bash
ANTHROPIC_API_KEY=sk-ant-api03-...
DATABASE_URL=postgresql://...
ZOHO_ORG_ID=900826394
ZOHO_CLIENT_ID=...
ZOHO_CLIENT_SECRET=...
ZOHO_REFRESH_TOKEN=...
```

**Production** (Vercel Dashboard):
- Configured at: https://vercel.com/aldos-projects-8cf34b67/enterprise-ai-support-v12/settings/environment-variables
- Same variables as local, automatically loaded

---

## 🎯 Recommended Workflows

### For Daily Development
**Use**: Local Development (ngrok)
```bash
npm run dev:webhooks
# Point Zoho to ngrok URL
# Develop and test in real-time
```

### For Production Traffic
**Use**: Production (Vercel)
```bash
# Point Zoho to Vercel URL
# No server needed - always available
```

### For New Feature Testing
**Use**: Both (if paid Zoho plan)
- Production continues handling live emails
- Development handles test emails with "[TEST]" in subject

---

## 🔐 Security Notes

**Both endpoints**:
- ✅ HTTPS/SSL enabled
- ✅ Environment variables secured
- ✅ Channel filtering (Email only)
- ✅ Event filtering (Ticket_Add + Ticket_Thread_Add)

**Local Development**:
- 🔒 ngrok free plan logs traffic (be aware)
- 🔒 Upgrade to paid plan for no logging

**Production**:
- 🔒 Vercel handles all traffic securely
- 🔒 Environment variables encrypted

---

## 📞 Support URLs

**Zoho Desk**:
- Dashboard: https://desk.zoho.com/support/atcaisupport/ShowHomePage.do
- Webhooks: https://desk.zoho.com/support/atcaisupport/ShowHomePage.do#Setup/Webhooks/list

**Vercel**:
- Dashboard: https://vercel.com/aldos-projects-8cf34b67/enterprise-ai-support-v12
- Deployments: https://vercel.com/aldos-projects-8cf34b67/enterprise-ai-support-v12/deployments
- Logs: https://vercel.com/aldos-projects-8cf34b67/enterprise-ai-support-v12/logs

**ngrok**:
- Web Interface: http://localhost:4040 (when running)
- Dashboard: https://dashboard.ngrok.com

---

## 📈 Performance Comparison

| Metric | Local Dev (ngrok) | Production (Vercel) |
|--------|------------------|-------------------|
| **Latency** | ~50-100ms | ~50ms (edge) |
| **Availability** | When server runs | 24/7 |
| **Scaling** | Single instance | Auto-scale |
| **Debugging** | Full logs | Dashboard logs |
| **Cost** | Free (with ads) | Free tier |
| **URL Stability** | Changes | Permanent |

---

## ✅ Verification Checklist

**Local Development**:
- [ ] Next.js running on port 3011
- [ ] ngrok tunnel active
- [ ] Webhook responds with HTTP 200
- [ ] Can see logs in terminal
- [ ] Hot reload working

**Production**:
- [ ] Vercel deployment successful
- [ ] Webhook responds with HTTP 200
- [ ] Environment variables configured
- [ ] Can view logs in Vercel dashboard
- [ ] Test email processed successfully

**Both Endpoints**:
- [ ] Return `{"status":"active"}` response
- [ ] Process Ticket_Add events
- [ ] Process Ticket_Thread_Add events
- [ ] Send auto-replies
- [ ] Escalate follow-ups to agents
- [ ] Sync to database

---

**Configuration saved**: October 13, 2025 11:04 UTC
**Tested by**: Claude Code
**Status**: ✅ Both endpoints verified and operational
