# Environment Setup Guide - V17 Mode Switcher

This guide walks you through setting up all environment variables for the 10-week implementation.

## Quick Start (5 minutes)

### Option A: Demo Mode (No API Keys Required)

```bash
# 1. Copy example to local config
cp .env.example .env.local

# 2. Minimal setup - set only database and demo mode
# Edit .env.local:
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/v17-mode-switcher
DEMO_MODE=true

# 3. Start development server
npm run dev
```

App starts at http://localhost:3018 with mock data.

### Option B: Full Setup (With Real APIs)

```bash
# 1. Copy example to local config
cp .env.example .env.local

# 2. Fill in all REQUIRED and OPTIONAL variables (see sections below)

# 3. Start development server
npm run dev
```

## Environment Variables Reference

### 1. Node Environment

```bash
NODE_ENV=development  # development, production, or test
```

**Purpose**: Controls logging verbosity, error handling, and feature flags

---

### 2. Database (REQUIRED)

```bash
DATABASE_URL=postgresql://postgres:password@localhost:5432/v17-mode-switcher
```

**Purpose**: PostgreSQL connection for Prisma ORM

**Setup Options:**

#### Local PostgreSQL
```bash
# Start local PostgreSQL (macOS with Homebrew)
brew services start postgresql

# Create database
createdb v17-mode-switcher

# Connection string
DATABASE_URL=postgresql://postgres:password@localhost:5432/v17-mode-switcher
```

#### Vercel Postgres (Recommended for Production)
```bash
# 1. Create Vercel account: https://vercel.com
# 2. Create project linked to this repo
# 3. Go to Storage tab → Create Postgres
# 4. Copy connection string → paste to .env.local
```

#### Railway (Easy Development Option)
```bash
# 1. Go to https://railway.app
# 2. Create project → Add PostgreSQL
# 3. Copy connection string
```

#### Supabase (Free Tier Available)
```bash
# 1. Go to https://supabase.com
# 2. Create new project
# 3. Copy connection string from Settings → Database
```

**Test Connection:**
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

---

### 3. Anthropic Claude API (Optional but Recommended)

```bash
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Purpose**: AI-powered chat, ticket analysis, knowledge base search

**Setup:**

1. Go to https://console.anthropic.com/account/keys
2. Sign in with your Anthropic account (or create one)
3. Click "Create Key"
4. Copy the key (starts with `sk-ant-`)
5. Paste into `.env.local`

**Models Available:**
- `claude-3-5-sonnet-20241022` (recommended) - Best balance of speed/cost
- `claude-3-opus-20250219` (most capable) - More expensive, slower
- `claude-3-haiku-20250307` (fastest) - Good for quick tasks

**Pricing:**
- Input: $3/1M tokens (Sonnet) or $0.80/1M (Haiku)
- Output: $15/1M tokens (Sonnet) or $4/1M (Haiku)
- Free tier: $5 monthly credit

**Verify Setup:**
```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "content-type: application/json" \
  -d '{"model": "claude-3-5-sonnet-20241022", "max_tokens": 1024, "messages": [{"role": "user", "content": "Say hello"}]}'
```

---

### 4. Zoho Desk Integration (Optional)

```bash
ZOHO_ORG_ID=your_zoho_org_id
ZOHO_CLIENT_ID=your_client_id
ZOHO_CLIENT_SECRET=your_client_secret
ZOHO_REFRESH_TOKEN=your_refresh_token
```

**Purpose**: Support ticket management, customer interactions, CRM integration

**Full Setup Instructions:**

1. **Create Zoho Account**
   - Go to https://www.zoho.com/
   - Sign up for free account

2. **Get Organization ID**
   - Log into Zoho Desk: https://desk.zoho.com
   - Go to Settings → Organization Profile
   - Copy Organization ID

3. **Create OAuth Application**
   - Go to https://accounts.zoho.com/
   - Click Settings (gear icon)
   - Go to Connected Apps → OAuth Applications
   - Click "Create New"
   - Fill in details:
     - **Client Name**: Enterprise AI Support V17
     - **Redirect URL**: `http://localhost:3018/api/auth/callback/zoho`
   - Click "Create"
   - Copy **Client ID** and **Client Secret**

4. **Generate Refresh Token**
   - Use authorization code flow to get refresh token
   - Or: Run test script to generate token:
   ```bash
   npm run scripts/test-zoho-connection.js
   ```

5. **Paste into .env.local**

**Verify Setup:**
```bash
curl https://accounts.zoho.com/oauth/v2/token \
  -d "refresh_token=$ZOHO_REFRESH_TOKEN&client_id=$ZOHO_CLIENT_ID&client_secret=$ZOHO_CLIENT_SECRET&grant_type=refresh_token"
```

---

### 5. Jira Integration (Phase 2 - Optional)

```bash
JIRA_BASE_URL=https://yourcompany.atlassian.net
JIRA_EMAIL=your.email@company.com
JIRA_API_TOKEN=your_api_token
JIRA_PROJECT_KEY=SUPPORT
```

**Purpose**: Issue tracking, project management, ticket synchronization

**Setup:**

1. **Get Jira URL**
   - Log into Jira Cloud: https://www.atlassian.net/
   - Your URL is `https://yourcompany.atlassian.net`

2. **Get API Token**
   - Go to https://id.atlassian.com/manage-profile/security/api-tokens
   - Click "Create API Token"
   - Copy token
   - Paste into `JIRA_API_TOKEN`

3. **Find Project Key**
   - Go to your Jira project
   - Look at URL: `https://yourcompany.atlassian.net/browse/PROJ-123`
   - Your project key is `PROJ`
   - Paste into `JIRA_PROJECT_KEY`

4. **Email Address**
   - Use the email of your Jira account

**Verify Setup:**
```bash
curl -u "your.email@company.com:$JIRA_API_TOKEN" \
  https://yourcompany.atlassian.net/rest/api/3/myself
```

---

### 6. Redis / Upstash (Phase 2 - Optional)

```bash
UPSTASH_REDIS_REST_URL=https://your_id.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

**Purpose**: Rate limiting, caching, session management for production

**Setup:**

1. **Create Upstash Account**
   - Go to https://console.upstash.com
   - Sign up (free tier available)

2. **Create Redis Database**
   - Click "Create Database"
   - Choose Region (pick closest to you)
   - Click "Create"

3. **Get Connection Details**
   - Go to your database
   - Click "REST API"
   - Copy REST URL and Token
   - Paste into `.env.local`

**Verify Setup:**
```bash
curl -X GET "$UPSTASH_REDIS_REST_URL/get/test" \
  -H "Authorization: Bearer $UPSTASH_REDIS_REST_TOKEN"
```

---

### 7. WebSocket (Phase 2 - Optional)

```bash
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

**Purpose**: Real-time features, live updates

**Development:**
- Use mock WebSocket server: `npm run dev:ws`
- Default: `ws://localhost:3001`

**Production:**
- Use hosted service (Pusher, Socket.io Cloud, etc.)
- Example: `wss://your-websocket-service.com`

---

### 8. Dify Knowledge Base (Phase 2 - Optional)

```bash
DIFY_KB_ID=your_kb_id
DIFY_API_KEY=your_dify_api_key
DIFY_CHAT_API_KEY=your_dify_chat_api_key
```

**Purpose**: Knowledge base integration, document retrieval

**Setup:**

1. **Create Dify Account**
   - Go to https://cloud.dify.ai
   - Sign up (free tier)

2. **Create Knowledge Base**
   - Go to "Datasets" or "Knowledge Base"
   - Click "Create New"
   - Upload documents or connect data source
   - Copy Dataset ID → `DIFY_KB_ID`

3. **Get API Keys**
   - Go to Settings → API Keys
   - Create new key
   - Copy API Key → `DIFY_API_KEY`
   - Copy Chat API Key → `DIFY_CHAT_API_KEY`

---

### 9. Logging (Optional)

```bash
LOG_LEVEL=info  # error, warn, info, debug
```

**Recommended:**
- Development: `debug`
- Production: `info`

---

## Environment Setup by Scenario

### Scenario 1: Local Development (Fastest)

```bash
# .env.local
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/v17-mode-switcher
DEMO_MODE=true
LOG_LEVEL=debug
```

**What works:**
- ✅ UI and demo pages
- ✅ Local database with Prisma Studio
- ✅ Mock data for testing
- ❌ Real AI responses (not configured)
- ❌ Real ticket integration

**Start:** `npm run dev`

---

### Scenario 2: Full Local Development (With APIs)

```bash
# .env.local
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/v17-mode-switcher
ANTHROPIC_API_KEY=sk-ant-api03-...
ZOHO_ORG_ID=...
ZOHO_CLIENT_ID=...
ZOHO_CLIENT_SECRET=...
ZOHO_REFRESH_TOKEN=...
DEMO_MODE=false
LOG_LEVEL=debug
```

**What works:**
- ✅ Everything in Scenario 1
- ✅ Real AI responses
- ✅ Real Zoho integration
- ✅ Support ticket sync

**Start:** `npm run dev`

---

### Scenario 3: Production on Vercel

```bash
# .env.local (for testing locally)
NODE_ENV=development
DATABASE_URL=postgresql://... # Vercel Postgres
ANTHROPIC_API_KEY=sk-ant-api03-...
ZOHO_*=...
# ... other variables

# On Vercel Dashboard: Settings → Environment Variables
# Add the same variables
```

**Deploy:**
```bash
git push  # Vercel auto-deploys
```

---

### Scenario 4: Production on Railway

```bash
# Railway automatically configures DATABASE_URL
# Add other variables in Railway dashboard:
# Settings → Variables

# .env.local (optional, for local testing)
NODE_ENV=development
DATABASE_URL=postgresql://...
ANTHROPIC_API_KEY=...
```

---

## Troubleshooting

### "DATABASE_URL is not defined"

**Error:**
```
Error: DATABASE_URL is not defined
```

**Fix:**
1. Check `.env.local` exists
2. Add line: `DATABASE_URL=postgresql://...`
3. Verify connection string is valid

---

### "ANTHROPIC_API_KEY is not defined"

**Error:**
```
Error: ANTHROPIC_API_KEY is not defined
```

**Options:**
- Option A: Add API key to `.env.local`
- Option B: Set `DEMO_MODE=true` to use mock data
- Option C: App still works, just without AI features

---

### "Connection refused" on PostgreSQL

**Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Fix:**
```bash
# Start PostgreSQL (macOS)
brew services start postgresql

# Or check if running
lsof -i :5432

# Or connect to test
psql postgres
```

---

### "401 Unauthorized" from Zoho/Jira

**Error:**
```
401 Unauthorized
```

**Fix:**
1. Verify API credentials are correct
2. Check tokens haven't expired
3. Regenerate new tokens
4. Verify redirect URLs match configuration

---

### "CORS Error" when calling APIs

**Error:**
```
Access-Control-Allow-Origin header is missing
```

**Fix:**
1. Ensure API supports CORS (most do)
2. Check Content-Type header is correct
3. Verify request is from allowed origin

---

## Environment Variable Checklist

### For Development

- [ ] `NODE_ENV=development`
- [ ] `DATABASE_URL=postgresql://...`
- [ ] Decide: `DEMO_MODE=true` or add API keys
- [ ] If real APIs:
  - [ ] `ANTHROPIC_API_KEY`
  - [ ] `ZOHO_*` (all 4 variables)
  - [ ] `JIRA_*` (if using Jira)

### For Production

- [ ] `NODE_ENV=production`
- [ ] `DATABASE_URL` (production database)
- [ ] `ANTHROPIC_API_KEY`
- [ ] `ZOHO_*` (all 4 variables)
- [ ] `JIRA_*` (if using Jira)
- [ ] `UPSTASH_REDIS_*` (if using rate limiting)
- [ ] `LOG_LEVEL=info`
- [ ] Verify no test/demo data in database

---

## Next Steps

1. **Copy Example:** `cp .env.example .env.local`
2. **Choose Scenario:** Pick one from above
3. **Fill in Variables:** Add your API keys and credentials
4. **Verify Setup:** Run `npm run dev` and test
5. **Troubleshoot:** Use troubleshooting section if issues
6. **Deploy:** Push to production when ready

---

## Support

For questions or issues:
1. Check troubleshooting section above
2. Review API documentation links in `.env.example`
3. Check application logs: `npm run dev` output
4. Review Prisma errors: `npm run db:studio`
5. Test connectivity with curl commands (see sections above)

---

## Security Checklist

Before deploying to production:

- [ ] Review `.env.local` for hardcoded secrets
- [ ] Verify `.env.local` is in `.gitignore`
- [ ] Rotate any exposed API keys
- [ ] Use different keys for dev/prod
- [ ] Set `NODE_ENV=production`
- [ ] Verify all secrets are in environment variables
- [ ] Use secrets management tool (Vercel Secrets, AWS Secrets Manager)
- [ ] Enable database SSL/TLS
- [ ] Set up monitoring and logging

