# Enterprise AI Support Dashboard - Developer Setup Guide

**Version**: 12.0 (V12)
**Port**: 3011
**Stack**: Next.js 15 + TypeScript + Prisma + Supabase + Claude AI

---

## 📦 Quick Start (5 Minutes)

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env.local
# Edit .env.local with your credentials (see below)

# 3. Set up database
npx prisma generate
npx prisma db push

# 4. Start development server
npm run dev
```

**Open**: http://localhost:3011

---

## 🔑 Required Credentials

### 1. Supabase Database

**Get from**: https://supabase.com/dashboard

1. Create a new project
2. Go to Settings → Database
3. Copy the connection string
4. Add to `.env.local`:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@YOUR_PROJECT.supabase.co:5432/postgres"
```

### 2. Anthropic Claude API

**Get from**: https://console.anthropic.com/settings/keys

```env
ANTHROPIC_API_KEY=sk-ant-api03-YOUR_KEY_HERE
```

### 3. Zoho Desk Integration

**Get from**: https://api-console.zoho.com/

1. Create OAuth App
2. Generate refresh token
3. Add to `.env.local`:

```env
ZOHO_ORG_ID=YOUR_ORG_ID
ZOHO_CLIENT_ID=YOUR_CLIENT_ID
ZOHO_CLIENT_SECRET=YOUR_CLIENT_SECRET
ZOHO_REFRESH_TOKEN=YOUR_REFRESH_TOKEN
```

---

## 🗄️ Database Setup

### Initial Schema Push

```bash
# Generate Prisma client
npx prisma generate

# Push schema to Supabase (creates all tables)
npx prisma db push
```

### Sync Initial Data from Zoho

```bash
# Test sync (dry run)
curl "http://localhost:3011/api/zoho/sync?limit=10&dryRun=true"

# Actual sync
curl "http://localhost:3011/api/zoho/sync?limit=10"
```

---

## 🏗️ Architecture Overview

### Data Flow

```
Zoho Desk (Source)
    ↓
┌─────────┴──────┐
│                │
Webhook      Manual Sync
│                │
↓                ↓
/api/zoho/webhook  /api/zoho/sync
    │                │
    └────────┬───────┘
             ↓
     Prisma ORM (upsert)
             ↓
   Supabase PostgreSQL
             ↓
   /api/tickets (Dashboard API)
             ↓
   Frontend (Next.js)
```

### Key Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/tickets` | GET | Get tickets for dashboard |
| `/api/zoho/webhook` | POST | Receive Zoho events |
| `/api/zoho/sync` | GET | Manual sync from Zoho |
| `/api/zoho/process-ticket` | POST | Process individual ticket |

---

## 📂 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── tickets/route.ts          # Dashboard API
│   │   └── zoho/
│   │       ├── webhook/route.ts      # Zoho webhook receiver
│   │       ├── sync/route.ts         # Manual sync endpoint
│   │       └── process-ticket/route.ts # Ticket processor
│   ├── demo/                         # Demo pages
│   └── dashboard/                    # Main dashboard
├── lib/
│   ├── integrations/
│   │   └── zoho-desk.ts             # Zoho API client
│   ├── scenarios/                    # Workflow handlers
│   │   ├── account-unlock-handler.ts
│   │   ├── access-request-handler.ts
│   │   └── general-support-handler.ts
│   └── workflow-engine.ts            # Core workflow logic
├── components/
│   ├── dashboard/                    # Dashboard components
│   └── ui/                          # UI components
└── prisma/
    └── schema.prisma                 # Database schema
```

---

## 🚀 Development Commands

```bash
# Development
npm run dev              # Start dev server (port 3011)
npm run dev:full         # Start with WebSocket server
npm run build            # Production build
npm run start            # Start production server

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:migrate       # Create migration
npm run db:studio        # Open Prisma Studio

# Code Quality
npm run type-check       # TypeScript validation
npm run lint             # ESLint

# Testing
npm run test:e2e         # Playwright E2E tests
```

---

## 🔧 Important Notes

### Dashboard API - No Joins

**Critical**: The dashboard API (`/api/tickets`) does NOT use table joins.

This means:
- `assignedAgent`: Returns ID (e.g., "agent-001") not name
- `reporter`: Returns customer ID not name
- `reporterEmail`: Shows "N/A"

This is by design per requirement: *"dashboard should only populate data from the tickets table"*

### Database Schema Note

The Prisma schema uses `@map("ticketnumber")` to map to the lowercase database column:

```prisma
ticketNumber String @unique @map("ticketnumber")
```

This was critical to fix the "column does not exist" error.

---

## 🔄 How Data Gets into Supabase

### Method 1: Real-Time Webhook (Automatic)

1. Ticket created/updated in Zoho Desk
2. Zoho sends webhook to your app
3. `/api/zoho/webhook` receives event
4. Calls `/api/zoho/process-ticket` internally
5. Ticket saved to Supabase via `prisma.ticket.upsert()`

### Method 2: Manual Sync (On-Demand)

```bash
# Sync 10 tickets
curl "http://localhost:3011/api/zoho/sync?limit=10"

# Sync 50 tickets
curl "http://localhost:3011/api/zoho/sync?limit=50"
```

Both methods use **upsert** (creates new or updates existing based on `ticketNumber`).

---

## 🐛 Common Issues & Solutions

### Issue 1: "Column ticketNumber does not exist"

**Solution**:
```bash
npx prisma generate
npx prisma db push
```

Restart dev server.

### Issue 2: "Failed to load tickets"

**Check**:
1. Is `DATABASE_URL` correct in `.env.local`?
2. Did you run `npx prisma db push`?
3. Is Supabase project active?

**Debug**:
```bash
curl "http://localhost:3011/api/tickets?limit=1"
```

### Issue 3: Zoho API "Invalid refresh token"

**Solution**: Regenerate refresh token in Zoho API Console.

### Issue 4: Webhook not receiving events

**For Local Development**:
1. Use ngrok: `ngrok http 3011`
2. Update webhook URL in Zoho Desk to ngrok URL
3. Test: Send test event from Zoho

---

## 🎯 Testing the Setup

### 1. Test Database Connection

```bash
curl "http://localhost:3011/api/tickets?limit=1"
```

Expected: JSON with ticket data

### 2. Test Zoho Sync

```bash
curl "http://localhost:3011/api/zoho/sync?limit=1&dryRun=true"
```

Expected: Preview of 1 ticket (not saved)

### 3. Test Webhook Endpoint

```bash
curl "http://localhost:3011/api/zoho/webhook"
```

Expected: `{"status":"active","message":"Zoho Desk webhook endpoint is ready"}`

---

## 📊 Database Schema (Key Tables)

### Tickets Table
```prisma
model Ticket {
  id              String   @id @default(cuid())
  ticketNumber    String   @unique @map("ticketnumber")
  subject         String
  description     String   @db.Text
  priority        TicketPriority @default(MEDIUM)
  status          TicketStatus   @default(OPEN)
  customerId      String
  assigneeId      String?
  aiProcessed     Boolean  @default(false)
  aiClassification String?
  zohoDeskId      String?
  workflowScenario String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### Customers Table
```prisma
model Customer {
  id          String   @id @default(cuid())
  name        String
  email       String   @unique
  tier        CustomerTier @default(STANDARD)
  tickets     Ticket[]
}
```

---

## 🌐 Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel Dashboard
```

**Post-Deployment**:
1. Update Zoho webhook URL to production URL
2. Test with real Zoho events
3. Monitor logs for errors

---

## 🤖 AI Workflow System

### 7 Supported Scenarios

1. **Password Reset** - Automated password reset handling
2. **Account Unlock** - Unlock locked accounts
3. **Access Request** - SharePoint/Slack access provisioning
4. **General Support** - Knowledge base search
5. **Email Notifications** - Fix email delivery issues
6. **Printer Issues** - Troubleshoot printing problems
7. **Course Completion** - LMS completion tracking

### How It Works

```typescript
// Detect scenario
const scenario = detectWorkflowScenario(context);

// Process with appropriate handler
const result = await processWorkflowScenario(scenario, context);

// Save to database
await updateTicketWithWorkflowData(ticketNumber, scenario, result);
```

---

## 📞 Support & Documentation

- **Architecture Details**: See `CLAUDE.md`
- **Database Schema**: See `prisma/schema.prisma`
- **API Integration**: See `src/lib/integrations/zoho-desk.ts`
- **Workflow Logic**: See `src/lib/workflow-engine.ts`

---

## ✅ Verification Checklist

Before sharing with QA/stakeholders:

- [ ] Dev server starts without errors
- [ ] Can access http://localhost:3011
- [ ] Database connection works (`/api/tickets` returns data)
- [ ] Zoho sync works (at least 1 ticket synced)
- [ ] Environment variables set correctly
- [ ] No sensitive data in `.env.local` (it's gitignored)
- [ ] All TypeScript errors resolved (`npm run type-check`)

---

## 🎉 You're All Set!

The app should now be running on **http://localhost:3011** with:
- ✅ Database connected
- ✅ Zoho integration configured
- ✅ AI processing ready
- ✅ Real-time webhooks enabled

**Next Steps**:
1. Test ticket creation in Zoho Desk
2. Watch it appear in dashboard
3. Test different workflow scenarios
4. Review AI responses

---

**Questions?** Check the code comments or reach out to the development team.

**Built with Claude AI** 🤖
