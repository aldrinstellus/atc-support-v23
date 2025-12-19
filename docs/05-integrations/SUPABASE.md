# Supabase Setup Guide

Complete guide for setting up and configuring Supabase as the PostgreSQL database backend for Enterprise AI Support V17.

## Overview

This project uses **Supabase** as the PostgreSQL database provider. Supabase provides:
- Managed PostgreSQL hosting (AWS-backed infrastructure)
- Built-in authentication system
- Real-time database subscriptions
- GraphQL API layer
- Row-level security (RLS) policies
- Database backups and point-in-time recovery

The database schema is managed via **Prisma ORM** with automatic migrations.

## Prerequisites

- Supabase account (free at https://supabase.com)
- PostgreSQL 15+ (provided by Supabase)
- Prisma CLI (`npm install -g @prisma/cli`)
- Git for version control

## Quick Start (5 minutes)

### 1. Create Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click **New Project**
3. Fill in project details:
   - **Name**: `enterprise-ai-v17` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your location
   - **Pricing**: Free tier is fine for development

4. Wait for project creation (2-3 minutes)

### 2. Get Connection String

1. In Supabase Dashboard, click your project
2. Go to **Settings** → **Database**
3. Under "Connection pooling", copy the **Session pooler** connection string
4. It looks like: `postgresql://postgres:PASSWORD@HOST:5432/postgres`

### 3. Configure Local Environment

```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local and add your Supabase connection string
# DATABASE_URL="postgresql://postgres:PASSWORD@HOST:5432/postgres"

# Also add your Anthropic API key if you have one
# ANTHROPIC_API_KEY=sk-ant-api03-...
```

### 4. Push Database Schema

```bash
# Install Prisma and generate client
npm install

# Push the schema to Supabase
npm run db:push

# Or create a migration (recommended for production)
npm run db:migrate
```

That's it! Your database is ready.

## Detailed Setup Steps

### Step 1: Create Supabase Account

1. Visit https://supabase.com
2. Click **Start your project** or **Sign up**
3. Choose authentication method (GitHub recommended)
4. Verify your email

### Step 2: Create New Project

**Dashboard Navigation:**
```
Supabase Dashboard
  └── Click "+" → "New Project"
      ├── Select Organization
      ├── Enter Project Name
      ├── Create Database Password
      ├── Select Region
      └── Click "Create New Project"
```

**Recommended Settings:**

| Setting | Recommended | Notes |
|---------|-------------|-------|
| **Region** | US East (N. Virginia) or EU (Ireland) | Closest to your location |
| **Database Version** | 15 (latest) | Automatic, no action needed |
| **Backup** | Daily (free tier) | Automatic, no action needed |
| **SSL Enforcement** | Require SSL | Automatic, no action needed |

**Project Setup Time**: 2-5 minutes. The dashboard will show a spinning icon while infrastructure is provisioned.

### Step 3: Get Database Connection Details

Once your project is created, follow this path:

**Supabase Dashboard** → **Your Project** → **Settings** → **Database**

You'll see several connection options:

#### Connection Pooler (Recommended for Development)

The **Session pooler** is the recommended connection string for local development:

```
postgresql://postgres:PASSWORD@[region]-[number].supabase.co:5432/postgres
```

**Where to find it:**
1. Go to **Settings** → **Database**
2. Under "Connection pooling", click the dropdown
3. Select "Session pooler"
4. Copy the connection string
5. Replace `[YOUR-PASSWORD]` with your database password from project creation

#### Direct Connection (For psql CLI)

If you need direct PostgreSQL access:

```
postgresql://postgres:PASSWORD@[region]-[number].supabase.co:6543/postgres
```

**Use this if:**
- You're using PostgreSQL CLI tools directly
- You need to run SQL scripts
- You're using PgAdmin

#### Transaction Pooler (For Production)

For Vercel/production deployments, use the Transaction pooler:

```
postgresql://postgres:PASSWORD@[region]-[number].pooler.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1
```

**Use this in Vercel environment variables** for production deployments (better for serverless).

### Step 4: Get Project API Keys (Optional)

For Supabase SDK integration (if using JavaScript client):

1. **Settings** → **API**
2. You'll see two keys:
   - **anon (public)**: Safe to use in frontend code
   - **service_role (private)**: Keep secret, backend only

**For this project**: We use Prisma ORM on the backend, so you typically only need the connection string, not API keys.

### Step 5: Configure .env.local

```bash
# Copy example configuration
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase details:

```bash
# ============================================================================
# Supabase Database Connection
# ============================================================================

# Session pooler for local development (recommended)
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@YOUR_PROJECT.supabase.co:5432/postgres"

# If using transaction pooler (production on Vercel):
# DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@YOUR_PROJECT.pooler.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"

# ============================================================================
# Claude AI Integration (Optional - app works without this)
# ============================================================================
ANTHROPIC_API_KEY=sk-ant-api03-YOUR_KEY_HERE

# ============================================================================
# Demo Mode (set to false to use real Claude AI)
# ============================================================================
DEMO_MODE=false
```

### Step 6: Initialize Database

```bash
# Generate Prisma client
npm install

# Push the database schema
npm run db:push
```

**What this does:**
1. Reads `prisma/schema.prisma`
2. Compares with Supabase database
3. Creates any missing tables, indexes, and relationships
4. Generates Prisma client code

**Expected output:**
```
✔ Created 14 tables
✔ Generated Prisma Client
Database schema updated successfully!
```

### Step 7: Verify Connection

Test your database connection:

```bash
# Open Prisma Studio to view database
npm run db:studio

# Or run the app
npm run dev
```

**Prisma Studio** opens a web interface at `http://localhost:5555` where you can:
- View all database tables
- Add/edit/delete records
- Run queries
- View relationships

## Database Schema

This project includes a comprehensive schema with 14+ tables:

### Core Tables

| Table | Purpose | Records |
|-------|---------|---------|
| **users** | User accounts with role-based access | 5-10k |
| **customers** | Customer/client records | 100-1k |
| **tickets** | Support tickets with full lifecycle | 1k-10k |
| **agent_metrics** | Agent performance tracking | 100-500 |

### Supporting Tables

| Table | Purpose |
|-------|---------|
| **comments** | Ticket comments and responses |
| **attachments** | File attachments on tickets |
| **activities** | Audit log of all changes |
| **notifications** | Real-time alerts |
| **accounts** | NextAuth OAuth provider accounts |
| **sessions** | NextAuth session management |
| **verification_tokens** | Email verification tokens |
| **sla_rules** | Service level agreement configuration |
| **risk_insights** | Customer risk scoring |
| **system_config** | Application configuration |
| **dashboard_metrics** | Cached dashboard data |

**Full schema**: See `prisma/schema.prisma` in project root.

## Common Tasks

### Connect to Database via psql

```bash
# Get the direct connection string from Supabase
# Settings → Database → Connection string (select "User" from dropdown)

psql "postgresql://postgres:PASSWORD@HOST:5432/postgres"

# List all tables
\dt

# Exit
\q
```

### View Database via Prisma Studio

```bash
npm run db:studio
```

Opens interactive database viewer at `http://localhost:5555`

### Create Database Migration

```bash
# Create a migration from schema changes
npm run db:migrate

# This will:
# 1. Detect schema changes in prisma/schema.prisma
# 2. Create a timestamped migration file in prisma/migrations/
# 3. Apply the migration to Supabase
```

### Reset Database (Development Only)

```bash
# WARNING: This deletes ALL data
npx prisma migrate reset

# Or manually:
npm run db:push -- --force-reset
```

### Seed Database with Sample Data

```bash
# Create a seed script in prisma/seed.ts
npm run db:seed
```

Example seed script:

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const user = await prisma.user.create({
    data: {
      email: 'agent@example.com',
      name: 'Support Agent',
      role: 'SUPPORT_AGENT',
    },
  });
  console.log('Created user:', user.id);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

## Environment Variables Reference

### Required

| Variable | Format | Example |
|----------|--------|---------|
| **DATABASE_URL** | PostgreSQL connection string | `postgresql://postgres:pwd@host:5432/postgres` |

### Optional

| Variable | Purpose | Default |
|----------|---------|---------|
| `ANTHROPIC_API_KEY` | Claude AI integration | Demo mode |
| `DEMO_MODE` | Use mock responses | `false` |
| `NEXT_PUBLIC_WS_URL` | WebSocket server | `ws://localhost:3001` |

## Troubleshooting

### Connection Refused

**Error**: `Error: connect ECONNREFUSED`

**Solutions:**
1. Verify connection string is correct in `.env.local`
2. Check password is correct (from project creation)
3. Check region in connection string matches Supabase project
4. Ensure internet connection is working
5. Temporarily allow-list your IP in Supabase (Settings → Networking)

### Password Authentication Failed

**Error**: `FATAL: password authentication failed for user "postgres"`

**Solutions:**
1. Go to Supabase Dashboard → Settings → Database
2. Click "Reset database password"
3. Copy new password
4. Update `.env.local` with new password
5. Restart dev server

### Connection Pool Exhausted

**Error**: `sorry, too many clients already`

**Solutions:**
1. Use Session pooler instead of Direct connection
2. Check `.env.local` is using correct pooler URL
3. Restart dev server: `npm run dev`
4. If using Vercel, verify connection limit in environment variables

### Prisma Client Generation Failed

**Error**: `Can't find Prisma schema`

**Solutions:**
```bash
# Regenerate Prisma client
npm run db:generate

# Or install Prisma globally
npm install -g @prisma/cli
prisma generate
```

### Database Doesn't Match Schema

**Error**: `Database schema doesn't match expected schema`

**Solutions:**
```bash
# View pending changes
npx prisma migrate status

# Apply all pending migrations
npm run db:push

# Or create a new migration
npm run db:migrate
```

## Security Best Practices

### 1. Keep Passwords Secret

- Never commit `.env.local` to Git (protected by `.gitignore`)
- Never share your database password
- Rotate passwords periodically

### 2. Use Connection Pooling

- Local development: Use **Session pooler**
- Production (Vercel): Use **Transaction pooler**
- Never use direct connection in production

### 3. Row-Level Security (RLS)

Enable RLS policies for multi-tenant environments:

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can only see their own records"
ON users FOR SELECT
USING (auth.uid() = id);
```

### 4. Regular Backups

Supabase provides daily backups automatically. To restore:

1. **Settings** → **Backups**
2. Find backup by date
3. Click **Restore** (creates new project)

### 5. API Keys

- Keep `service_role` key private (backend only)
- Rotate keys periodically
- Use minimal scope keys when possible

## Performance Optimization

### 1. Enable Query Monitoring

Supabase provides query analytics:
1. **Settings** → **Logs Explorer**
2. View slow queries and optimize indexes

### 2. Index Optimization

Common indexes to add:

```sql
-- User lookups
CREATE INDEX idx_users_email ON users(email);

-- Ticket lookups
CREATE INDEX idx_tickets_number ON tickets(ticketnumber);
CREATE INDEX idx_tickets_customer ON tickets(customerId);
CREATE INDEX idx_tickets_assignee ON tickets(assigneeId);
CREATE INDEX idx_tickets_status ON tickets(status);

-- Customer lookups
CREATE INDEX idx_customers_email ON customers(email);

-- Activity lookups
CREATE INDEX idx_activities_ticket ON activities(ticketId);
CREATE INDEX idx_activities_user ON activities(userId);
```

### 3. Connection Pool Tuning

For high-traffic production:

```
DATABASE_URL="postgresql://...?max_pool_size=20&min_pool_size=5&connect_timeout=10"
```

## Deployment

### Local Development

```bash
DATABASE_URL="postgresql://...@host:5432/postgres"  # Session pooler
npm run dev
```

### Production on Vercel

1. Go to Vercel project settings
2. **Environment Variables**
3. Add `DATABASE_URL` with **Transaction pooler** URL:
   ```
   postgresql://...@host.pooler.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1
   ```
4. Deploy

### Production on Other Platforms

1. Set `DATABASE_URL` environment variable
2. Run database migrations: `npm run db:migrate`
3. Ensure Prisma client is generated: `npm run db:generate`

## Resources

### Official Documentation
- **Supabase Docs**: https://supabase.com/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **PostgreSQL Docs**: https://www.postgresql.org/docs/15/

### Useful Links
- **Supabase Dashboard**: https://supabase.com/dashboard
- **Supabase Status**: https://status.supabase.com
- **Database Backups**: https://supabase.com/docs/guides/database/backups
- **Row-Level Security**: https://supabase.com/docs/guides/database/postgres/row-level-security

### Related Documentation
- **Database Schema**: See `prisma/schema.prisma`
- **API Routes**: See `docs/03-api/API-OVERVIEW.md`
- **Environment Setup**: See `.env.example`
- **Deployment Guide**: See `docs/10-deployment/DEPLOYMENT-GUIDE.md`

## Support

### Getting Help

1. **Supabase Support**:
   - Free tier: Community Discord (https://discord.supabase.com)
   - Paid tier: Priority email support

2. **Prisma Support**:
   - Documentation: https://www.prisma.io/docs
   - Community: https://github.com/prisma/prisma/discussions

3. **Project Support**:
   - Check `.env.example` for configuration
   - Review `docs/15-reference/TROUBLESHOOTING.md`
   - Check GitHub issues

## Quick Reference

### Most Common Commands

```bash
# Start development
npm run dev

# View database
npm run db:studio

# Push schema changes
npm run db:push

# Create migration
npm run db:migrate

# Generate Prisma client
npm run db:generate

# Type check
npm run type-check
```

### Connection String Template

```
postgresql://postgres:PASSWORD@REGION-NUMBER.supabase.co:PORT/postgres

Where:
- PASSWORD: Your database password (from project creation)
- REGION: us-east-1, eu-west-1, etc.
- NUMBER: Your project number
- PORT: 5432 (session), 6543 (transaction/direct)
```

### Database Regions

| Region | Location | URL |
|--------|----------|-----|
| **us-east-1** | US East (N. Virginia) | *.us-east-1.supabase.co |
| **eu-west-1** | EU (Ireland) | *.eu-west-1.supabase.co |
| **ap-south-1** | Asia Pacific (Singapore) | *.ap-south-1.supabase.co |
| **ap-northeast-1** | Asia Pacific (Tokyo) | *.ap-northeast-1.supabase.co |

---

**Last Updated**: November 2025
**Schema Version**: 14 tables, 30+ relationships
**Prisma Version**: 6.16.3+
