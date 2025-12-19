# 🚀 Quick Start Guide

**Get Enterprise AI Support V14 running in 5 minutes!**

---

## Prerequisites

Before you start, ensure you have:
- ✅ Node.js 20+ installed
- ✅ Git installed
- ✅ A code editor (VS Code recommended)
- ✅ Terminal/command line access

---

## 5-Minute Setup

### Step 1: Clone the Repository (30 seconds)

```bash
cd /path/to/your/projects
git clone <repository-url> enterprise-ai-support-v14
cd enterprise-ai-support-v14
```

### Step 2: Install Dependencies (2 minutes)

```bash
npm install
```

**Expected output**:
```
added 1247 packages in 1m 23s
```

### Step 3: Configure Environment (1 minute)

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local with your credentials
nano .env.local  # or use your preferred editor
```

**Minimum required variables**:
```env
# Database (required)
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@YOUR_PROJECT.supabase.co:5432/postgres"

# Claude AI (optional for demo mode)
ANTHROPIC_API_KEY=sk-ant-api03-YOUR_KEY_HERE

# Zoho Desk (optional)
ZOHO_CLIENT_ID=YOUR_CLIENT_ID
ZOHO_CLIENT_SECRET=YOUR_CLIENT_SECRET
ZOHO_REFRESH_TOKEN=YOUR_REFRESH_TOKEN
ZOHO_ORG_ID=YOUR_ORG_ID
```

### Step 4: Initialize Database (1 minute)

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

**Expected output**:
```
✔ Generated Prisma Client
✔ Database synchronized
```

### Step 5: Start Development Server (30 seconds)

```bash
npm run dev
```

**Expected output**:
```
▲ Next.js 15.5.4
- Local:        http://localhost:3014
- Network:      http://192.168.1.x:3014

✓ Ready in 2.3s
```

### Step 6: Verify Installation (30 seconds)

Open your browser and visit:

```
http://localhost:3014
```

You should see the Enterprise AI Support dashboard! 🎉

---

## Quick Verification

Test that everything works:

### 1. Check Health Endpoint

```bash
curl http://localhost:3014/api/health
```

**Expected response**:
```json
{
  "status": "healthy",
  "checks": {
    "uptime": 45.2,
    "timestamp": 1760425414364,
    "environment": "development",
    "version": "14.0.0",
    "database": "connected",
    "memory": {
      "heapUsed": 140,
      "heapTotal": 158,
      "rss": 597
    }
  }
}
```

### 2. Check TypeScript

```bash
npm run type-check
```

**Expected**: No errors

### 3. Try the Demo Pages

- **C-Level**: http://localhost:3014/demo/c-level
- **CS Manager**: http://localhost:3014/demo/cs-manager
- **Support Agent**: http://localhost:3014/demo/support-agent

---

## 🎯 You're All Set!

The application is now running with:
- ✅ Development server on port 3014
- ✅ Database connected
- ✅ Hot reload enabled
- ✅ TypeScript compilation working

---

## Next Steps

### **1. Explore the Demo**
Visit the demo pages to see the 4-persona system in action:
- Admin, C-Level, CS Manager, Support Agent

### **2. Read the Documentation**
- **[Developer Setup](./DEVELOPER-SETUP.md)** - Complete environment guide
- **[System Architecture](../02-architecture/SYSTEM-ARCHITECTURE.md)** - Understand the system
- **[API Reference](../03-api/API-REFERENCE.md)** - Learn the API

### **3. Start Development**
- **[Developer Guide](../08-development/DEVELOPER-GUIDE.md)** - Development workflow
- **[Code Structure](../08-development/CODE-STRUCTURE.md)** - Navigate the codebase
- **[Coding Standards](../08-development/CODING-STANDARDS.md)** - Style guide

---

## Common Issues

### Port Already in Use

If port 3014 is already in use:

```bash
# Kill the process using port 3014
lsof -ti:3014 | xargs kill

# Or run on a different port
PORT=3015 npm run dev
```

### Database Connection Error

If you see "Database connection failed":

1. Check your `DATABASE_URL` in `.env.local`
2. Ensure Supabase project is active
3. Verify credentials are correct
4. Test connection:

```bash
npx prisma db pull --force
```

### Missing Environment Variables

If you see "Environment variable validation failed":

1. Copy `.env.example` to `.env.local`
2. Fill in at minimum `DATABASE_URL`
3. Restart the dev server

### Build Errors

If you encounter build errors:

```bash
# Clean install
rm -rf node_modules .next
npm install
npm run dev
```

---

## Development Commands

```bash
# Development
npm run dev              # Start dev server (port 3014)
npm run build            # Production build
npm run start            # Start production server

# Code Quality
npm run type-check       # TypeScript validation
npm run lint             # ESLint

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema changes
npm run db:studio        # Open Prisma Studio

# Testing
npm run test:e2e         # Run E2E tests
```

---

## Getting Help

- **[Troubleshooting Guide](../11-operations/TROUBLESHOOTING.md)** - Common issues
- **[FAQ](../15-reference/FAQ.md)** - Frequently asked questions
- **[Documentation Index](../00-DOCUMENTATION-INDEX.md)** - All documentation

---

**Congratulations!** You've successfully set up Enterprise AI Support V14.

**Time taken**: ~5 minutes ⏱️
**Status**: ✅ Ready for development

For a more comprehensive setup with integrations, see the **[Developer Setup Guide](./DEVELOPER-SETUP.md)**.
