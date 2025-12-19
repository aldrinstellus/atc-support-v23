# Real-Time Implementation Analysis
# V17 Mode Switcher: From Mock Data to Live Integration

**Document Version**: 1.0.0
**Date**: 2025-11-12
**Prepared By**: Wonder Woman (Product Management Agent)
**Classification**: Strategic Planning - Architecture & Implementation

---

## Executive Summary

### Current State
V17 Mode Switcher is a **fully functional dual-mode AI assistant** with 14 specialized widgets, 6 personas, and 192 demo scenarios. The application runs on **100% mock/static data** with sophisticated Claude AI integration for natural language query detection. All data flows are simulated through:
- Static demo datasets (`demo-widget-data.ts`)
- Mock API clients (Zoho Desk, Jira, Slack, Calendar)
- LocalStorage persistence for UI state

### Real-Time Requirements (From PRD Analysis)
To deliver the PRD's promised value proposition, V17 requires:
- **Live API integrations**: Zoho CRM/Desk, Jira, Supabase, Slack, Calendar, SonarQube, CI/CD pipelines
- **Real-time updates**: WebSocket/SSE for dashboard refreshes (<5 sec latency)
- **Database persistence**: PostgreSQL with Prisma (schema already defined)
- **Authentication system**: NextAuth.js with role-based access (4 roles)
- **Webhook handlers**: Bidirectional sync with external systems

### Gap Analysis Summary
| Component | Current State | Required State | Effort |
|-----------|--------------|----------------|--------|
| Data Layer | 100% mock data | Live API integration | 120 hours |
| Real-Time | None (static) | WebSocket + SSE | 60 hours |
| Auth | None | NextAuth.js + RBAC | 40 hours |
| Database | Schema only | Fully migrated + seeded | 30 hours |
| Webhooks | None | Bidirectional sync | 50 hours |
| **TOTAL** | **Demo-ready** | **Production-ready** | **300 hours** |

### Recommended Strategy
**Strategy C: Hybrid Demo + Live** (Phased approach)
- Keep demo mode functional (zero downtime)
- Add "Connect Live Data" toggle per widget
- Gradual rollout based on API availability
- Fallback to demo if API fails
- **Timeline**: 8-10 weeks, ~240 hours effort
- **Risk**: Low (no breaking changes to existing demo)
- **Value**: Immediate production use while maintaining demo capability

### Immediate Next Action
**Week 1 Sprint**: Authentication + Database Foundation
1. Set up Supabase PostgreSQL database (8 hours)
2. Run Prisma migrations + seed demo data (8 hours)
3. Implement NextAuth.js with 4 roles (16 hours)
4. Add authentication to API routes (8 hours)
**Deliverable**: Authenticated database access, user login working

---

## Part 1: Full Impact Analysis

### 1.1 Current vs Required State Comparison

#### What the PRD Promises

**Data Sources Mentioned in PRD** (Section: Technical Architecture, Lines 1016-1025):
1. **Zoho CRM** - Customer accounts, contract management
2. **Zoho Desk** - Support tickets, customer communications
3. **Jira** - Project management, sprint tracking, requirements
4. **Slack** - Team messaging, notifications
5. **Calendar** - Meeting scheduling, availability
6. **SonarQube** - Code quality metrics
7. **CI/CD Pipelines** - Deployment status, build metrics
8. **Supabase** - User data, application state

**Integration Criticality** (PRD Feature Specifications):

| Integration | Critical? | Used By Widgets | Fallback Possible? |
|------------|-----------|-----------------|-------------------|
| **Zoho Desk** | ✅ YES | Contract Performance, Deliverable Review, Vendor Compliance (3) | No - Core COR workflow |
| **Jira** | ✅ YES | Sprint Burndown, Team Velocity, Task Kanban, Requirements Tracking (5) | No - Core PM workflow |
| **Supabase** | ✅ YES | All 14 widgets (authentication, user preferences) | No - Required for auth |
| **Zoho CRM** | ⚠️ HIGH | Contract Performance, Vendor Compliance (2) | Demo fallback OK |
| **SonarQube** | ⚠️ HIGH | Code Quality Dashboard (1) | Demo fallback OK |
| **CI/CD** | ⚠️ HIGH | Deployment Pipeline Dashboard (1) | Demo fallback OK |
| **Slack** | ℹ️ NICE | Stakeholder Engagement, Team notifications (1) | Email fallback |
| **Calendar** | ℹ️ NICE | Stakeholder Engagement, Meeting Scheduler (2) | Manual scheduling |

**Authentication Requirements** (PRD Non-Functional Requirements, Lines 405-406):
- NextAuth.js integration (already in package.json)
- 4 role-based personas (C_LEVEL, CS_MANAGER, SUPPORT_AGENT, ADMIN)
- Session persistence across browser refresh
- OAuth 2.0 for external services (Zoho, Jira)

**Security Requirements** (Inferred from Enterprise Context):
- HTTPS/TLS for all API calls
- Environment variable management (`.env.local`)
- API key rotation capability
- Rate limiting on external API calls
- Audit logging for sensitive actions

---

### 1.2 System Component Impact Assessment

#### Frontend (14 Widgets)

**Widget Categories by Data Dependency**:

**Category A: Critical - Requires Real Data (No Demo Fallback)**
1. **Contract Performance Dashboard** (COR)
   - Data: Zoho CRM contracts, deliverables, budget
   - Impact: Must show real-time contract status
   - Effort: 12 hours (API integration + error handling)

2. **Deliverable Review List** (COR)
   - Data: Zoho Desk tickets tagged as deliverables
   - Impact: Approval workflow requires real data
   - Effort: 10 hours (OAuth flow + list pagination)

3. **Sprint Burndown Chart** (PM)
   - Data: Jira sprint data, story points
   - Impact: Daily standup dependency
   - Effort: 8 hours (Jira API + chart sync)

4. **Task Kanban Board** (Developer)
   - Data: Jira issues assigned to user
   - Impact: Core developer workflow
   - Effort: 10 hours (drag-drop + Jira sync)

**Category B: High Priority - Demo Fallback Acceptable**
5. **Team Velocity Dashboard** (PM)
   - Data: Jira historical sprint data
   - Fallback: Demo shows 6 sprints of data
   - Effort: 6 hours (API + caching)

6. **Code Quality Dashboard** (Lead)
   - Data: SonarQube metrics
   - Fallback: Demo shows static A- grade
   - Effort: 8 hours (SonarQube API + webhooks)

7. **Deployment Pipeline Dashboard** (Lead)
   - Data: CI/CD system (GitHub Actions, Jenkins)
   - Fallback: Demo shows passing pipeline
   - Effort: 10 hours (multiple CI/CD integrations)

**Category C: Nice-to-Have - Demo Sufficient**
8-14. Remaining 7 widgets (Program Health, Stakeholder Engagement, Requirements Tracking, Change Request, Vendor Compliance, Resource Capacity, Blocker Resolution)
   - Fallback: Demo data sufficient for 80% of use cases
   - Effort: 6-8 hours each for live integration

**Total Frontend Impact**: 80-120 hours

**Key Changes Required**:
- Add loading states for API fetches (Suspense + ErrorBoundary)
- Implement retry logic for failed API calls
- Add "Last Updated" timestamps to all widgets
- Create "Live" vs "Demo" badge indicators
- Add manual refresh buttons for each widget

---

#### Backend (API Layer)

**Current API Routes** (From `src/app/api/`):
- `/api/chat` - Claude AI integration (✅ LIVE already)
- `/api/health` - Health check endpoint (✅ LIVE)
- `/api/tickets/[ticketNumber]` - Ticket lookup (❌ MOCK)
- `/api/zoho/webhook` - Zoho webhook handler (❌ STUB)
- `/api/zoho/sync` - Manual sync trigger (❌ STUB)

**Required New API Routes** (30+ endpoints):

**Authentication Routes** (NextAuth.js):
- `GET /api/auth/[...nextauth]` - NextAuth.js handler (5 hours)
- `GET /api/auth/session` - Session validation (2 hours)
- `POST /api/auth/callback/[provider]` - OAuth callbacks (8 hours)

**Data Integration Routes**:
- `GET /api/zoho/contracts` - List contracts (4 hours)
- `GET /api/zoho/contracts/[id]` - Contract detail (3 hours)
- `GET /api/zoho/deliverables` - Pending deliverables (4 hours)
- `POST /api/zoho/deliverables/[id]/approve` - Approve deliverable (6 hours)
- `POST /api/zoho/deliverables/[id]/reject` - Reject deliverable (6 hours)
- `GET /api/jira/sprints/active` - Active sprint data (4 hours)
- `GET /api/jira/sprints/[id]/burndown` - Burndown data (4 hours)
- `GET /api/jira/issues/assigned` - User's tasks (4 hours)
- `PATCH /api/jira/issues/[id]` - Update issue status (6 hours)
- `GET /api/sonarqube/quality` - Code quality metrics (4 hours)
- `GET /api/cicd/pipelines/[id]` - Pipeline status (4 hours)

**Webhook Routes**:
- `POST /api/webhooks/zoho/ticket-created` - New ticket (4 hours)
- `POST /api/webhooks/zoho/ticket-updated` - Ticket update (4 hours)
- `POST /api/webhooks/jira/issue-updated` - Issue update (4 hours)
- `POST /api/webhooks/jira/sprint-started` - Sprint event (4 hours)

**WebSocket/SSE Routes**:
- `GET /api/realtime/[widget]` - SSE endpoint per widget (3 hours each)

**Total Backend Impact**: 100-140 hours

**Key Changes Required**:
- Add Zod validation for all request bodies
- Implement rate limiting middleware (10 requests/sec per user)
- Add request/response logging
- Create API error response standards
- Add API documentation (OpenAPI/Swagger)

---

#### Database (Schema Requirements)

**Current State**:
- Prisma schema fully defined (15+ models)
- No database connected
- No migrations run
- No seed data

**Prisma Models Already Defined** (From PRD Section 4.4, Lines 1136-1151):
1. **User** - Authentication, roles, preferences
2. **Ticket** - Support tickets with full lifecycle
3. **Customer** - Customer profiles with risk tiers
4. **AgentMetrics** - Performance tracking
5. **Activity** - Audit logging
6. **Notification** - Real-time alerts
7. **Contract** - Government contracts
8. **Deliverable** - Contract deliverables
9. **Vendor** - Vendor profiles
10. **Requirement** - Requirements tracking
11. **ChangeRequest** - Change request workflow
12. **Sprint** - Agile sprint management
13. **Task** - Kanban tasks
14. **TeamMember** - Team roster
15. **BlockerIssue** - Blocker tracking

**Required Database Operations**:

**Setup Phase** (30 hours):
1. Create Supabase project (2 hours)
2. Configure connection pooling (PgBouncer) (4 hours)
3. Run Prisma migrations (2 hours)
4. Create indexes for performance (8 hours)
5. Seed demo data (500+ records) (10 hours)
6. Set up backup/restore procedures (4 hours)

**Integration Phase** (40 hours):
1. Create API middleware for database access (8 hours)
2. Implement row-level security (RLS) for multi-tenancy (12 hours)
3. Add optimistic locking for concurrent updates (8 hours)
4. Create database views for complex queries (8 hours)
5. Add full-text search indexes (4 hours)

**Total Database Impact**: 70 hours

**Key Schema Changes Required**:
- Add `externalId` fields for Zoho/Jira sync
- Add `lastSyncedAt` timestamps
- Add `syncStatus` enum (SYNCED, PENDING, FAILED)
- Add `dataSource` enum (ZOHO, JIRA, MANUAL)

---

#### External Integrations

**Integration 1: Zoho Desk** (Critical - 40 hours)

**Status**: Client already defined in `src/lib/integrations/zoho-desk.ts`

**Required Work**:
1. OAuth 2.0 flow implementation (8 hours)
   - Authorization endpoint
   - Token exchange
   - Refresh token handling
   - Token storage in database
2. API method completion (12 hours)
   - Fetch conversations (already started)
   - Fetch threads
   - Send replies
   - Update ticket status
   - Fetch attachments
3. Webhook handler (8 hours)
   - Ticket created event
   - Ticket updated event
   - Conversation added event
   - Signature verification
4. Error handling + retry logic (6 hours)
5. Rate limit handling (429 responses) (6 hours)

**Configuration Required**:
```env
ZOHO_CLIENT_ID=1000.XXX
ZOHO_CLIENT_SECRET=xxx
ZOHO_REFRESH_TOKEN=1000.xxx (from OAuth flow)
ZOHO_ORG_ID=12345678
ZOHO_BASE_URL=https://desk.zoho.com
```

---

**Integration 2: Jira** (Critical - 40 hours)

**Status**: Client already defined in `src/lib/integrations/jira.ts`

**Required Work**:
1. Basic Auth setup (2 hours)
   - API token generation
   - Base64 encoding
   - Header management
2. API method expansion (16 hours)
   - Fetch sprint data
   - Fetch sprint issues
   - Update issue status (drag-drop support)
   - Fetch issue transitions
   - Search issues (JQL queries)
   - Fetch board configuration
3. Webhook handler (8 hours)
   - Issue created event
   - Issue updated event
   - Sprint started event
   - Sprint completed event
4. Atlassian Document Format (ADF) parser (8 hours)
   - Convert ADF to markdown
   - Convert markdown to ADF
   - Handle rich text fields
5. Caching strategy (6 hours)
   - Cache sprint data (10 min TTL)
   - Cache issue data (5 min TTL)
   - Invalidate on webhook events

**Configuration Required**:
```env
JIRA_BASE_URL=https://yourcompany.atlassian.net
JIRA_EMAIL=user@company.com
JIRA_API_TOKEN=xxx
JIRA_PROJECT_KEY=SUP
```

---

**Integration 3: Supabase** (Critical - 30 hours)

**Status**: Not started (Prisma configured for PostgreSQL)

**Required Work**:
1. Supabase project setup (4 hours)
   - Create project
   - Configure database
   - Set up connection pooling
   - Configure RLS policies
2. Prisma migration (6 hours)
   - Run migrations
   - Validate schema
   - Create indexes
   - Set up triggers
3. Supabase Auth integration (10 hours)
   - Email/password auth
   - OAuth providers (Google, GitHub)
   - Role mapping (C_LEVEL, CS_MANAGER, etc.)
   - Session management
4. Real-time subscriptions (10 hours)
   - Set up Supabase Realtime
   - Subscribe to table changes
   - Broadcast to WebSocket clients
   - Handle reconnection

**Configuration Required**:
```env
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
SUPABASE_URL=https://[project-ref].supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

**Integration 4: SonarQube** (High Priority - 20 hours)

**Status**: Not started

**Required Work**:
1. API client creation (8 hours)
   - Authentication (token-based)
   - Fetch project metrics
   - Fetch quality gate status
   - Fetch issues by severity
2. Webhook handler (6 hours)
   - Quality gate status changed
   - New issues detected
3. Caching strategy (4 hours)
   - Cache metrics (1 hour TTL)
   - Invalidate on webhook
4. Grade calculation logic (2 hours)
   - Map metrics to A-F grade
   - Calculate trend (improving/declining)

**Configuration Required**:
```env
SONARQUBE_URL=https://sonarcloud.io
SONARQUBE_TOKEN=xxx
SONARQUBE_PROJECT_KEY=company_project
```

---

**Integration 5: CI/CD Pipelines** (High Priority - 25 hours)

**Status**: Not started

**Required Work**:
1. GitHub Actions integration (8 hours)
   - Fetch workflow runs
   - Fetch workflow status
   - Parse deployment stages
2. Generic CI/CD adapter (8 hours)
   - Support Jenkins
   - Support GitLab CI
   - Support CircleCI
3. Webhook handlers (6 hours)
   - Workflow started
   - Workflow completed
   - Deployment succeeded/failed
4. Metrics calculation (3 hours)
   - Lead time
   - Deployment frequency
   - MTTR
   - Change failure rate

**Configuration Required**:
```env
GITHUB_TOKEN=ghp_xxx
GITHUB_REPO=company/project
CICD_PROVIDER=github # or jenkins, gitlab, circleci
```

---

**Integration 6: Slack** (Nice-to-Have - 15 hours)

**Status**: Mock implementation in `src/lib/integrations/mock-systems.ts`

**Required Work**:
1. Slack App creation (2 hours)
   - Create app in Slack workspace
   - Configure permissions
   - Install to workspace
2. API methods (8 hours)
   - Send notification
   - Create channel
   - Invite users
   - Schedule message
3. Event subscription (3 hours)
   - Message posted
   - User mentioned
4. Rate limiting (2 hours)
   - Handle 429 responses
   - Implement exponential backoff

**Configuration Required**:
```env
SLACK_BOT_TOKEN=xoxb-xxx
SLACK_SIGNING_SECRET=xxx
SLACK_WORKSPACE_ID=T12345
```

---

**Integration 7: Calendar (Google/Outlook)** (Nice-to-Have - 20 hours)

**Status**: Mock implementation in `src/lib/integrations/mock-systems.ts`

**Required Work**:
1. OAuth 2.0 flow (8 hours)
   - Google Calendar API
   - Microsoft Graph API
   - Token management
2. API methods (8 hours)
   - List events
   - Create event
   - Update event
   - Check availability
3. Calendar sync (4 hours)
   - Bidirectional sync
   - Conflict resolution
   - Recurring events

**Configuration Required**:
```env
GOOGLE_CALENDAR_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CALENDAR_CLIENT_SECRET=xxx
MICROSOFT_CLIENT_ID=xxx
MICROSOFT_CLIENT_SECRET=xxx
```

---

#### Authentication & Authorization

**Current State**: No authentication (open demo)

**Required Implementation**: NextAuth.js with role-based access

**Authentication Flow** (40 hours):

1. **NextAuth.js Setup** (12 hours)
   - Install and configure NextAuth.js
   - Create auth API route
   - Configure session strategy (JWT)
   - Add CSRF protection
   - Configure callbacks

2. **Auth Providers** (12 hours)
   - Email/password (Supabase)
   - Google OAuth
   - GitHub OAuth
   - SAML/SSO for enterprise (optional)

3. **Role-Based Access Control** (10 hours)
   - Define 4 roles (C_LEVEL, CS_MANAGER, SUPPORT_AGENT, ADMIN)
   - Create middleware for route protection
   - Add role checks to API routes
   - Implement persona-to-role mapping

4. **Session Management** (6 hours)
   - Session persistence
   - Session expiry (24 hours)
   - Refresh token rotation
   - Logout functionality

**Authorization Matrix**:

| Route/Feature | C_LEVEL | CS_MANAGER | SUPPORT_AGENT | ADMIN |
|---------------|---------|------------|---------------|-------|
| Executive Summary Widget | ✅ | ✅ | ❌ | ✅ |
| Agent Performance Stats | ✅ | ✅ | View Only | ✅ |
| Team Workload Dashboard | ✅ | ✅ | ❌ | ✅ |
| Ticket Detail Widget | ✅ | ✅ | ✅ | ✅ |
| Ticket Assignment | ❌ | ✅ | View Only | ✅ |
| Knowledge Base Edit | ❌ | ✅ | Suggest Only | ✅ |
| User Management | ❌ | ❌ | ❌ | ✅ |

**Security Enhancements**:
- Add API rate limiting (10 req/sec per user)
- Implement request signing for webhooks
- Add audit logging for sensitive actions
- Enable 2FA for admin accounts

---

#### Real-Time Infrastructure

**Current State**: No real-time updates (static data)

**Required Implementation**: WebSocket + Server-Sent Events (SSE)

**Real-Time Architecture** (60 hours):

**Option A: Server-Sent Events (SSE)** - Recommended
- Simpler than WebSocket
- Built-in reconnection
- Works over HTTP
- No WebSocket server needed

**Implementation**:
1. **SSE Endpoint Creation** (20 hours)
   - Create `/api/realtime/[widget]` endpoints
   - Implement event stream formatting
   - Add heartbeat (30 sec interval)
   - Handle client disconnection

2. **Widget-Specific Streams** (24 hours)
   - Contract Performance: Update every 5 seconds
   - Sprint Burndown: Update on Jira webhook
   - Team Velocity: Update daily
   - Code Quality: Update hourly
   - Deployment Pipeline: Update in real-time
   - Ticket Detail: Update on Zoho webhook
   - Task Kanban: Update on Jira webhook

3. **Client-Side Integration** (12 hours)
   - Create `useRealtimeWidget` hook
   - Handle reconnection logic
   - Update widget state on events
   - Add connection status indicator

4. **Fallback to Polling** (4 hours)
   - Detect SSE support
   - Fall back to 30-second polling
   - Minimize API calls

**Option B: WebSocket** - Alternative
- Full duplex communication
- More complex server setup
- Better for chat features

**Implementation** (if needed):
- Use Socket.io server (already in package.json)
- Create namespace per widget type
- Implement room-based broadcasts
- Add Redis adapter for horizontal scaling

**Real-Time Requirements from PRD**:
- Widget load time: <500ms (P95)
- Real-time latency: <5 seconds
- Streaming AI responses: 1500 chars/sec (already implemented)

---

#### Security & Compliance

**Current State**: Demo app with no security

**Required Security Measures** (30 hours):

1. **API Security** (12 hours)
   - HTTPS/TLS enforcement (2 hours)
   - API key rotation system (4 hours)
   - Rate limiting (10 req/sec per user) (3 hours)
   - Request signing for webhooks (3 hours)

2. **Data Protection** (8 hours)
   - Encrypt sensitive fields in database (4 hours)
   - Implement data retention policies (2 hours)
   - Add GDPR compliance (data export/deletion) (2 hours)

3. **Audit Logging** (6 hours)
   - Log all API calls (2 hours)
   - Log authentication events (2 hours)
   - Log sensitive actions (deliverable approval, etc.) (2 hours)

4. **Vulnerability Scanning** (4 hours)
   - Add dependency scanning (Snyk/Dependabot) (2 hours)
   - Add SAST scanning (ESLint security rules) (2 hours)

**Compliance Requirements** (Inferred from Government Context):
- FedRAMP (if government contracts)
- WCAG 2.1 Level AA (already implemented in PRD)
- HIPAA (if healthcare customers)

---

#### Performance & Caching

**Current State**: No caching (static data)

**Required Caching Strategy** (20 hours):

1. **Client-Side Caching** (8 hours)
   - Implement SWR (stale-while-revalidate)
   - Cache widget data (5 min TTL)
   - Cache user preferences (LocalStorage)
   - Cache conversation history (IndexedDB)

2. **Server-Side Caching** (8 hours)
   - Add Redis for API response caching
   - Cache Jira data (10 min TTL)
   - Cache Zoho data (5 min TTL)
   - Cache SonarQube data (1 hour TTL)

3. **Cache Invalidation** (4 hours)
   - Invalidate on webhook events
   - Invalidate on user actions
   - Manual refresh buttons

**Performance Targets** (From PRD Section 10, Lines 1138-1152):
- Widget load time: <500ms (P95)
- Query response time: <2s (P95)
- Mode switching: <300ms (P95)
- Page load time: <2s (P95)

**Optimization Techniques**:
- Code splitting for widgets
- Lazy loading for Recharts
- React.memo for expensive components
- Bundle size reduction (target: <500KB)

---

### 1.3 Risk Analysis

#### Technical Risks

**Risk 1: External API Availability**
- **Likelihood**: Medium
- **Impact**: High (blocks core workflows)
- **Mitigation**:
  - Implement retry logic with exponential backoff
  - Add circuit breaker pattern (fail fast after 5 retries)
  - Fallback to demo data when API unavailable
  - Add "API Status" dashboard for monitoring
  - Cache last successful response (5-10 min)

**Risk 2: API Rate Limits**
- **Likelihood**: High
- **Impact**: Medium (degrades performance)
- **Mitigation**:
  - Implement aggressive caching (5-10 min TTL)
  - Add rate limit monitoring
  - Queue non-critical requests
  - Upgrade API plans if needed (Zoho, Jira)
  - Add "Refresh Limit Reached" UI message

**Risk 3: OAuth Token Expiry**
- **Likelihood**: Medium
- **Impact**: High (breaks authentication)
- **Mitigation**:
  - Implement automatic token refresh
  - Store refresh tokens securely (encrypted)
  - Add token expiry monitoring
  - Prompt user to re-authenticate if refresh fails
  - Add 5-minute buffer before expiry

**Risk 4: Data Synchronization Conflicts**
- **Likelihood**: Medium
- **Impact**: Medium (data inconsistency)
- **Mitigation**:
  - Implement optimistic locking (version field)
  - Add conflict resolution UI
  - Use "last write wins" for non-critical fields
  - Add sync status indicators per widget
  - Manual conflict resolution for critical data

**Risk 5: Performance Degradation**
- **Likelihood**: High
- **Impact**: Medium (slow user experience)
- **Mitigation**:
  - Implement aggressive caching
  - Add pagination for large datasets
  - Use database indexes for queries
  - Add performance monitoring (Vercel Analytics)
  - Set up alerts for slow API responses (>2s)

---

#### Security Risks

**Risk 1: API Key Exposure**
- **Likelihood**: Low
- **Impact**: Critical (data breach)
- **Mitigation**:
  - Store API keys in environment variables only
  - Never commit `.env.local` to Git
  - Add `.env.local` to `.gitignore` (already done)
  - Rotate keys quarterly
  - Use secret management service (Vercel Secrets)

**Risk 2: Webhook Signature Verification Bypass**
- **Likelihood**: Medium
- **Impact**: High (malicious data injection)
- **Mitigation**:
  - Verify webhook signatures (HMAC-SHA256)
  - Add IP whitelist for webhook sources
  - Rate limit webhook endpoints (10/min)
  - Log all webhook events for audit
  - Add alerting for suspicious webhook activity

**Risk 3: Unauthorized Data Access**
- **Likelihood**: Medium
- **Impact**: High (data leak)
- **Mitigation**:
  - Implement row-level security (RLS) in Supabase
  - Add role checks to all API routes
  - Audit all database queries for leaks
  - Add data masking for sensitive fields (PII)
  - Enable API request logging

**Risk 4: SQL Injection**
- **Likelihood**: Low
- **Impact**: Critical (database compromise)
- **Mitigation**:
  - Use Prisma ORM (parameterized queries)
  - Never use raw SQL with user input
  - Add input validation (Zod schemas)
  - Enable Prisma query logging
  - Run security audits (npm audit)

---

#### Performance Risks

**Risk 1: Database Query Performance**
- **Likelihood**: High
- **Impact**: High (slow widgets)
- **Mitigation**:
  - Create indexes on foreign keys
  - Add composite indexes for common queries
  - Use database views for complex joins
  - Monitor slow queries (>1s)
  - Add query timeout (10s max)

**Risk 2: Bundle Size Bloat**
- **Likelihood**: Medium
- **Impact**: Medium (slow page load)
- **Mitigation**:
  - Code split by widget (dynamic imports)
  - Lazy load Recharts (heavy library)
  - Tree shake unused dependencies
  - Monitor bundle size (<500KB target)
  - Use Next.js bundle analyzer

**Risk 3: Real-Time Overhead**
- **Likelihood**: Medium
- **Impact**: Medium (server cost increase)
- **Mitigation**:
  - Use SSE instead of WebSocket (simpler)
  - Add connection pooling (max 1000 concurrent)
  - Implement heartbeat (30 sec interval)
  - Auto-disconnect inactive clients (5 min)
  - Use Redis pub/sub for scaling

---

#### Timeline Risks

**Risk 1: Third-Party API Documentation Gaps**
- **Likelihood**: High
- **Impact**: Medium (delays integration)
- **Mitigation**:
  - Allocate 20% buffer time for research
  - Contact vendor support early
  - Use Postman for API exploration
  - Create integration tests first
  - Document findings for team

**Risk 2: OAuth Flow Complexity**
- **Likelihood**: High
- **Impact**: High (blocks user access)
- **Mitigation**:
  - Use NextAuth.js (battle-tested)
  - Follow vendor OAuth guides exactly
  - Test with sandbox accounts first
  - Add detailed error messages
  - Create fallback to API key auth (if supported)

**Risk 3: Database Migration Issues**
- **Likelihood**: Medium
- **Impact**: High (data loss risk)
- **Mitigation**:
  - Run migrations in staging first
  - Back up database before migrations
  - Test rollback procedures
  - Use Prisma migrate (safe migrations)
  - Add migration testing to CI/CD

**Risk 4: Scope Creep**
- **Likelihood**: High
- **Impact**: High (timeline overrun)
- **Mitigation**:
  - Stick to MVP scope (see Strategy C)
  - Defer nice-to-have integrations (Slack, Calendar)
  - Use demo fallback for low-priority widgets
  - Weekly scope review meetings
  - Clear "must-have" vs "nice-to-have" list

---

### 1.4 Effort Estimation

#### Component-Level Breakdown

**Frontend (14 Widgets)** - 80-120 hours
- Critical widgets (4): 12+10+8+10 = 40 hours
- High priority widgets (3): 6+8+10 = 24 hours
- Nice-to-have widgets (7): 7 × 8 = 56 hours
- Loading states + error handling: 20 hours

**Backend (30+ API Routes)** - 100-140 hours
- Authentication routes (3): 15 hours
- Data integration routes (15): 75 hours
- Webhook routes (6): 24 hours
- WebSocket/SSE routes (14): 42 hours
- Middleware + logging: 20 hours

**Database (PostgreSQL + Prisma)** - 70 hours
- Setup phase: 30 hours
- Integration phase: 40 hours

**External Integrations** - 180 hours
- Zoho Desk: 40 hours
- Jira: 40 hours
- Supabase: 30 hours
- SonarQube: 20 hours
- CI/CD: 25 hours
- Slack: 15 hours (optional)
- Calendar: 20 hours (optional)

**Authentication & Authorization** - 40 hours

**Real-Time Infrastructure** - 60 hours

**Security & Compliance** - 30 hours

**Performance & Caching** - 20 hours

**Testing & QA** - 80 hours
- Unit tests for API clients
- Integration tests for webhooks
- E2E tests for critical workflows
- Performance testing
- Security testing

**Documentation** - 40 hours
- API documentation
- Integration guides
- Deployment runbook
- User guides

---

#### Critical Path Dependencies

**Phase Dependency Chart**:
```
Week 1-2: Foundation
├── Database Setup (must complete first)
│   ├── Supabase project creation
│   └── Prisma migrations
└── Authentication (parallel)
    ├── NextAuth.js setup
    └── OAuth providers

Week 3-4: Core Integrations (depends on Auth)
├── Zoho Desk (critical path)
└── Jira (critical path)

Week 5-6: Widgets (depends on Core Integrations)
├── Contract Performance
├── Deliverable Review
├── Sprint Burndown
└── Task Kanban

Week 7-8: Real-Time (depends on Widgets)
├── SSE endpoints
└── Widget subscriptions

Week 9-10: Polish (depends on Real-Time)
├── Performance optimization
├── Security hardening
└── Testing & QA
```

**Critical Path**: Database → Auth → Zoho/Jira → Widgets → Real-Time → Testing
**Total Duration**: 10 weeks (with 2-person team)

---

#### Resource Requirements

**Team Composition**:
- **Full-Stack Developer** (1): API routes, database, integrations
- **Frontend Developer** (1): Widget updates, real-time UI, loading states
- **QA Engineer** (0.5): Testing, security audits, performance testing
- **Product Manager** (0.25): Scope management, stakeholder communication

**Estimated Hours by Role**:
- Full-Stack Developer: 400 hours (10 weeks × 40 hrs)
- Frontend Developer: 200 hours (10 weeks × 20 hrs)
- QA Engineer: 80 hours (10 weeks × 8 hrs)
- Product Manager: 40 hours (10 weeks × 4 hrs)

**Total Team Effort**: 720 hours

---

#### Total Timeline (Realistic)

**Single Full-Stack Developer** (Solo):
- Total Hours: 600 hours (excluding testing/PM)
- Working 40 hours/week: 15 weeks (3.75 months)
- Working 20 hours/week: 30 weeks (7.5 months)

**2-Person Team** (Full-Stack + Frontend):
- Total Hours: 600 hours
- Parallelizable: 60% (360 hours)
- Sequential: 40% (240 hours)
- Timeline: 240 + (360/2) = 420 hours / 80 hrs/week = 5.25 weeks
- **Realistic with buffer**: 8-10 weeks (2-2.5 months)

**3-Person Team** (Full-Stack + Frontend + QA):
- Total Hours: 680 hours (including QA)
- Parallelizable: 70% (476 hours)
- Sequential: 30% (204 hours)
- Timeline: 204 + (476/3) = 363 hours / 120 hrs/week = 3 weeks
- **Realistic with buffer**: 6-8 weeks (1.5-2 months)

**Recommended Team**: 2-person (Full-Stack + Frontend) for 8-10 weeks

---

## Part 2: Implementation Strategies

### Strategy A: Minimum Viable Real-Time (MVR)

**Focus**: Get 1-2 highest-value personas live ASAP

**Scope**:
- **Personas**: COR + Support Agent (Government focus)
- **Widgets**: 6 critical widgets
  1. Contract Performance Dashboard (COR)
  2. Deliverable Review List (COR)
  3. Vendor Compliance Dashboard (COR)
  4. Ticket Detail Widget (Support Agent)
  5. Ticket List Widget (Support Agent)
  6. Knowledge Base Search (Support Agent)
- **Integrations**: Zoho CRM, Zoho Desk, Supabase only
- **Authentication**: Email/password + role-based access
- **Real-Time**: Polling (30 sec) - No WebSocket/SSE yet

**Timeline**: 4 weeks (160 hours)

**Week 1: Foundation**
- Days 1-2: Supabase setup + Prisma migrations (16 hours)
- Days 3-5: NextAuth.js + email/password auth (24 hours)

**Week 2: Zoho Integration**
- Days 1-2: Zoho OAuth flow (16 hours)
- Days 3-5: Zoho CRM API (contracts, vendors) (24 hours)

**Week 3: Zoho Desk Integration**
- Days 1-2: Zoho Desk API (tickets, conversations) (16 hours)
- Days 3-5: Widget updates (6 widgets) (24 hours)

**Week 4: Polish & Deploy**
- Days 1-2: Polling mechanism (30 sec refresh) (16 hours)
- Days 3-4: Testing & bug fixes (16 hours)
- Day 5: Production deployment (8 hours)

**Deliverables**:
- ✅ COR can monitor real contracts
- ✅ COR can approve/reject real deliverables
- ✅ Support Agent can view real tickets
- ✅ Basic authentication working
- ✅ 30-second auto-refresh

**Pros**:
- ✅ Fastest time to production (4 weeks)
- ✅ Immediate value for 2 critical personas
- ✅ Lowest risk (small scope)
- ✅ Early feedback from users

**Cons**:
- ❌ Only 2 of 6 personas supported
- ❌ No real-time updates (polling only)
- ❌ Limited integrations (no Jira)
- ❌ Other 4 personas still on demo data

**Cost**: $20,000 (160 hours × $125/hr contractor rate)

---

### Strategy B: Full Implementation (All 6 Personas)

**Focus**: Complete real-time for all personas, all 14 widgets

**Scope**:
- **Personas**: All 6 (COR, Program Manager, Stakeholder Lead, Project Manager, Service Team Lead, Service Team Member)
- **Widgets**: All 14 widgets live
- **Integrations**: Zoho CRM, Zoho Desk, Jira, Supabase, SonarQube, CI/CD, Slack, Calendar
- **Authentication**: NextAuth.js + OAuth providers (Google, GitHub)
- **Real-Time**: SSE endpoints for all widgets (<5 sec latency)

**Timeline**: 10 weeks (600 hours)

**Phase 1: Foundation (Weeks 1-2) - 120 hours**
- Supabase setup + Prisma migrations (30 hours)
- NextAuth.js + OAuth providers (40 hours)
- API middleware + error handling (30 hours)
- Security hardening (20 hours)

**Phase 2: Government Integrations (Weeks 3-4) - 120 hours**
- Zoho Desk full integration (40 hours)
- Zoho CRM full integration (40 hours)
- Government widgets (7) updated (40 hours)

**Phase 3: Project Integrations (Weeks 5-6) - 140 hours**
- Jira full integration (40 hours)
- SonarQube integration (20 hours)
- CI/CD integration (25 hours)
- Project widgets (7) updated (55 hours)

**Phase 4: Real-Time (Weeks 7-8) - 100 hours**
- SSE endpoints for all 14 widgets (60 hours)
- Frontend real-time hooks (20 hours)
- Connection status indicators (10 hours)
- Fallback to polling (10 hours)

**Phase 5: Nice-to-Have (Week 9) - 60 hours**
- Slack integration (15 hours)
- Calendar integration (20 hours)
- Advanced caching (15 hours)
- Performance optimization (10 hours)

**Phase 6: Testing & Deploy (Week 10) - 60 hours**
- E2E testing (30 hours)
- Security audit (10 hours)
- Performance testing (10 hours)
- Production deployment (10 hours)

**Deliverables**:
- ✅ All 6 personas fully live
- ✅ All 14 widgets with real data
- ✅ Real-time updates (<5 sec)
- ✅ All 8 integrations working
- ✅ OAuth authentication
- ✅ Production-grade security
- ✅ 99.5% uptime SLA

**Pros**:
- ✅ Complete feature parity with PRD
- ✅ All personas supported
- ✅ Real-time updates
- ✅ Production-ready
- ✅ Scalable architecture

**Cons**:
- ❌ Longest timeline (10 weeks)
- ❌ Highest cost ($75,000)
- ❌ Highest risk (many dependencies)
- ❌ No early feedback (big bang release)

**Cost**: $75,000 (600 hours × $125/hr)

---

### Strategy C: Hybrid Demo + Live (RECOMMENDED)

**Focus**: Keep demo functional, add "Connect Live Data" toggle per widget

**Philosophy**: Gradual rollout based on customer needs and API availability

**Scope**:
- **Phase 1 (Weeks 1-2)**: Foundation - Auth + Database (80 hours)
- **Phase 2 (Weeks 3-4)**: Critical Widgets (4) - Zoho + Jira (80 hours)
- **Phase 3 (Weeks 5-6)**: High Priority Widgets (3) - SonarQube + CI/CD (60 hours)
- **Phase 4 (Weeks 7-8)**: Nice-to-Have Widgets (7) - Remaining integrations (80 hours)
- **Continuous**: Demo mode always works as fallback

**Timeline**: 8-10 weeks (300-400 hours, phased delivery)

---

#### Phase 1: Foundation (Weeks 1-2) - 80 hours

**Goal**: Authentication + Database working, no widget changes yet

**Tasks**:
1. **Supabase Setup** (20 hours)
   - Create Supabase project
   - Run Prisma migrations
   - Seed demo data (500+ records)
   - Configure RLS policies

2. **NextAuth.js Implementation** (30 hours)
   - Auth API routes
   - Email/password provider
   - Google OAuth provider
   - Session management
   - Role mapping (4 roles)

3. **API Security** (20 hours)
   - Add auth middleware to API routes
   - Implement rate limiting
   - Add request validation (Zod)
   - Set up audit logging

4. **UI Updates** (10 hours)
   - Add login page
   - Add "Connect Account" button in settings
   - Add "Live" badge to widgets (preparation)

**Deliverable**: Users can log in, database is live, but widgets still show demo data

**Demo Status**: ✅ FULLY FUNCTIONAL (no breaking changes)

---

#### Phase 2: Critical Widgets (Weeks 3-4) - 80 hours

**Goal**: 4 critical widgets switch to live data when "Connect Live" enabled

**Critical Widgets**:
1. **Contract Performance Dashboard** (COR)
2. **Deliverable Review List** (COR)
3. **Sprint Burndown Chart** (PM)
4. **Task Kanban Board** (Developer)

**Tasks**:
1. **Zoho Desk Integration** (30 hours)
   - OAuth flow
   - Fetch contracts API
   - Fetch deliverables API
   - Approve/reject deliverable API
   - Update widget #1 and #2

2. **Jira Integration** (30 hours)
   - Basic Auth setup
   - Fetch sprint data API
   - Fetch issues API
   - Update issue status API
   - Update widget #8 and #12

3. **"Connect Live Data" Toggle** (10 hours)
   - Add toggle UI to widget settings
   - Store connection preference in database
   - Add "Live" vs "Demo" badge
   - Add "Last Updated" timestamp

4. **Fallback Logic** (10 hours)
   - If API fails, fall back to demo data
   - Show error toast with retry button
   - Log API failures for monitoring

**Deliverable**: 4 critical widgets can use live data, others still demo

**Demo Status**: ✅ FULLY FUNCTIONAL (demo fallback always works)

---

#### Phase 3: High Priority Widgets (Weeks 5-6) - 60 hours

**Goal**: 3 high-priority widgets switch to live data

**High Priority Widgets**:
5. **Team Velocity Dashboard** (PM)
6. **Code Quality Dashboard** (Lead)
7. **Deployment Pipeline Dashboard** (Lead)

**Tasks**:
1. **Jira Historical Data** (15 hours)
   - Fetch past sprint data (6 sprints)
   - Calculate velocity trends
   - Update widget #9

2. **SonarQube Integration** (20 hours)
   - API client creation
   - Fetch project metrics
   - Map to A-F grade
   - Update widget #10

3. **CI/CD Integration** (20 hours)
   - GitHub Actions API
   - Fetch workflow runs
   - Calculate DORA metrics
   - Update widget #11

4. **Real-Time Polling** (5 hours)
   - Add 30-second auto-refresh
   - Add manual refresh button

**Deliverable**: 7 of 14 widgets support live data

**Demo Status**: ✅ FULLY FUNCTIONAL (demo fallback always works)

---

#### Phase 4: Nice-to-Have Widgets (Weeks 7-8) - 80 hours

**Goal**: Remaining 7 widgets support live data (as integrations become available)

**Remaining Widgets**:
8. **Program Health Dashboard** (Program Manager)
9. **Stakeholder Engagement Dashboard** (Stakeholder Lead)
10. **Requirements Tracking Dashboard** (Stakeholder Lead)
11. **Change Request Dashboard** (Stakeholder Lead)
12. **Vendor Compliance Dashboard** (COR)
13. **Resource Capacity Dashboard** (PM)
14. **Blocker Resolution Dashboard** (Lead)

**Tasks**:
1. **Jira Advanced Queries** (30 hours)
   - Fetch requirements (Jira issues with "Requirement" label)
   - Fetch change requests (Jira issues with "Change Request" label)
   - Fetch blockers (Jira issues with "Blocker" label)
   - Update widgets #10, #11, #14

2. **Zoho CRM Extended** (20 hours)
   - Fetch vendor records
   - Fetch compliance violations
   - Update widget #3

3. **Slack Integration** (Optional - 15 hours)
   - Send notification API
   - Update widget #5

4. **Calendar Integration** (Optional - 20 hours)
   - List events API
   - Create event API
   - Update widget #5

**Deliverable**: All 14 widgets support live data (when integrations configured)

**Demo Status**: ✅ FULLY FUNCTIONAL (demo fallback always works)

---

#### Phase 5: Real-Time Updates (Ongoing) - Can start in Week 7

**Goal**: Replace polling with SSE for <5 sec latency

**Tasks**:
1. **SSE Endpoints** (40 hours)
   - Create `/api/realtime/[widget]` routes
   - Implement event streaming
   - Add heartbeat (30 sec)
   - Handle disconnection

2. **Frontend Real-Time Hooks** (20 hours)
   - Create `useRealtimeWidget` hook
   - Update all 14 widgets
   - Add connection status indicator

3. **Webhook Handlers** (20 hours)
   - Zoho ticket created/updated
   - Jira issue created/updated
   - SonarQube quality gate changed
   - CI/CD workflow completed

**Deliverable**: Real-time updates (<5 sec) for all widgets

**Demo Status**: ✅ FULLY FUNCTIONAL (real-time not required for demo)

---

### Strategy Comparison Matrix

| Criteria | Strategy A (MVR) | Strategy B (Full) | Strategy C (Hybrid) ⭐ |
|----------|------------------|-------------------|----------------------|
| **Timeline** | 4 weeks | 10 weeks | 8-10 weeks |
| **Effort** | 160 hours | 600 hours | 300-400 hours |
| **Cost** | $20,000 | $75,000 | $37,500-$50,000 |
| **Personas Supported** | 2 of 6 | 6 of 6 | 6 of 6 (phased) |
| **Widgets Live** | 6 of 14 | 14 of 14 | 14 of 14 (phased) |
| **Integrations** | 2 (Zoho only) | 8 (all) | 8 (phased) |
| **Real-Time** | Polling (30s) | SSE (<5s) | SSE (<5s) |
| **Demo Mode** | ❌ Breaks for 4 personas | ❌ Removed | ✅ Always works |
| **Risk** | Low | High | Medium |
| **Early Feedback** | ✅ Week 4 | ❌ Week 10 | ✅ Every 2 weeks |
| **Production-Ready** | Week 4 (limited) | Week 10 (full) | Week 4+ (incremental) |
| **Fallback Strategy** | ❌ None | ❌ None | ✅ Demo fallback |
| **Flexibility** | Low (2 personas only) | Low (big bang) | ✅ High (add integrations as needed) |

**Recommended Strategy**: **C (Hybrid Demo + Live)** ⭐

---

## Part 3: Recommendation & Next Steps

### Recommended Strategy: C (Hybrid Demo + Live)

**Why This Strategy?**

**1. Business Value**
- ✅ **Immediate production use**: Week 4 delivers value to COR + Developer
- ✅ **Zero downtime**: Demo mode always works (no breaking changes)
- ✅ **Incremental revenue**: Can sell to customers even during development
- ✅ **Customer choice**: Users choose when to connect live data
- ✅ **Competitive advantage**: "Try before you buy" with full demo

**2. Risk Mitigation**
- ✅ **Low deployment risk**: Phased rollout every 2 weeks
- ✅ **Graceful degradation**: API failures fall back to demo
- ✅ **Early feedback**: User testing starts Week 4, not Week 10
- ✅ **Scope flexibility**: Can pause/resume based on customer demand
- ✅ **Integration flexibility**: Add APIs only when customers need them

**3. Time-to-Market**
- ✅ **First production release**: Week 4 (4 widgets live)
- ✅ **Critical widgets**: Week 4 (COR + Developer workflows)
- ✅ **All widgets**: Week 8-10 (full feature parity)
- ✅ **Continuous delivery**: New widgets every 2 weeks
- ✅ **No "all or nothing"**: Can ship incomplete

**4. Cost Efficiency**
- ✅ **Incremental investment**: $10K every 2 weeks, not $75K upfront
- ✅ **ROI visibility**: Measure value after Week 4
- ✅ **Pivot capability**: Can pause if customer feedback changes direction
- ✅ **Resource optimization**: Can scale team up/down based on phase

**5. User Experience**
- ✅ **No disruption**: Demo users unaffected
- ✅ **Opt-in adoption**: Users control when to go live
- ✅ **Hybrid workflows**: Can mix demo + live widgets
- ✅ **Confidence building**: Users test with demo first
- ✅ **Onboarding simplicity**: Demo → Live transition is smooth

---

### Why NOT Strategy A (MVR)?

**Cons**:
- ❌ **Limited value**: Only 2 of 6 personas (33% feature coverage)
- ❌ **Breaks demo**: Other 4 personas still on demo (confusing UX)
- ❌ **Not extensible**: Hard to add remaining personas later
- ❌ **No fallback**: If Zoho API fails, COR workflow breaks
- ❌ **Customer disappointment**: "Why doesn't my persona work live?"

**When to Use Strategy A**:
- ✅ If customer ONLY uses COR + Support Agent personas
- ✅ If timeline is CRITICAL (<4 weeks to production)
- ✅ If budget is VERY constrained (<$25K)

---

### Why NOT Strategy B (Full)?

**Cons**:
- ❌ **Long timeline**: 10 weeks with no production release
- ❌ **High risk**: Big bang release, no early feedback
- ❌ **High cost**: $75K upfront investment
- ❌ **Scope rigidity**: Can't pivot based on feedback
- ❌ **No demo fallback**: If APIs break, entire app breaks

**When to Use Strategy B**:
- ✅ If customer demands ALL personas live from Day 1
- ✅ If demo mode is NOT a requirement
- ✅ If team size is large (3+ developers)
- ✅ If timeline is flexible (3+ months acceptable)

---

### Implementation Roadmap: Strategy C (Hybrid)

#### Week 1-2: Foundation Phase

**Sprint Goal**: Authentication + Database + No Breaking Changes

**Day 1-2** (16 hours):
- [ ] Create Supabase project
- [ ] Configure connection string
- [ ] Run Prisma migrations
- [ ] Verify schema in Supabase Studio

**Day 3-5** (24 hours):
- [ ] Install NextAuth.js dependencies
- [ ] Create `/api/auth/[...nextauth]` route
- [ ] Configure email/password provider
- [ ] Add Google OAuth provider
- [ ] Test login flow

**Day 6-8** (24 hours):
- [ ] Add auth middleware to API routes
- [ ] Implement role-based access checks
- [ ] Add request validation (Zod schemas)
- [ ] Set up audit logging

**Day 9-10** (16 hours):
- [ ] Create login page UI
- [ ] Add "Connect Account" button in settings
- [ ] Add "Live" badge component (preparation)
- [ ] Test E2E authentication

**Deliverable**:
- ✅ Users can log in with email/password or Google
- ✅ Database is live (but widgets still show demo data)
- ✅ Demo mode fully functional (zero breaking changes)

**Demo Links After Week 2**:
- http://localhost:3018/ → Login page
- http://localhost:3018/demo/cor → COR demo (unchanged)
- http://localhost:3018/demo/project-manager → PM demo (unchanged)

**GitHub PR**: "Phase 1: Authentication + Database Foundation"

---

#### Week 3-4: Critical Widgets Phase

**Sprint Goal**: 4 critical widgets with "Connect Live" toggle

**Day 1-3** (24 hours):
- [ ] Zoho OAuth flow implementation
- [ ] Create `/api/zoho/contracts` route
- [ ] Create `/api/zoho/deliverables` route
- [ ] Test Zoho API calls in Postman

**Day 4-6** (24 hours):
- [ ] Update Contract Performance Dashboard widget
  - [ ] Add "Connect Live Data" toggle
  - [ ] Fetch from `/api/zoho/contracts` when live
  - [ ] Fallback to demo data if API fails
  - [ ] Add "Last Updated" timestamp
- [ ] Update Deliverable Review List widget
  - [ ] Add toggle
  - [ ] Fetch from `/api/zoho/deliverables`
  - [ ] Add approve/reject actions

**Day 7-9** (24 hours):
- [ ] Jira Basic Auth setup
- [ ] Create `/api/jira/sprints/active` route
- [ ] Create `/api/jira/issues/assigned` route
- [ ] Test Jira API calls

**Day 10** (8 hours):
- [ ] Update Sprint Burndown widget
  - [ ] Add toggle
  - [ ] Fetch from `/api/jira/sprints/active`
- [ ] Update Task Kanban widget
  - [ ] Add toggle
  - [ ] Fetch from `/api/jira/issues/assigned`

**Deliverable**:
- ✅ COR can monitor real contracts (when connected)
- ✅ COR can approve/reject real deliverables
- ✅ PM can view real sprint burndown
- ✅ Developer can view real tasks
- ✅ Demo mode still works for all users

**Demo Links After Week 4**:
- http://localhost:3018/demo/cor?live=true → COR with live Zoho data
- http://localhost:3018/demo/project-manager?live=true → PM with live Jira data
- http://localhost:3018/demo/cor → COR demo (unchanged fallback)

**GitHub PR**: "Phase 2: Critical Widgets - Zoho + Jira Integration"

---

#### Week 5-6: High Priority Widgets Phase

**Sprint Goal**: 3 high-priority widgets with live data

**Day 1-3** (24 hours):
- [ ] Fetch Jira historical sprint data (6 sprints)
- [ ] Create `/api/jira/sprints/history` route
- [ ] Update Team Velocity Dashboard widget
  - [ ] Add toggle
  - [ ] Calculate velocity trends
  - [ ] Show predictability score

**Day 4-6** (24 hours):
- [ ] SonarQube API client creation
- [ ] Create `/api/sonarqube/quality` route
- [ ] Update Code Quality Dashboard widget
  - [ ] Add toggle
  - [ ] Fetch real metrics
  - [ ] Map to A-F grade
  - [ ] Show trend (improving/declining)

**Day 7-10** (32 hours):
- [ ] GitHub Actions API integration
- [ ] Create `/api/cicd/pipelines` route
- [ ] Update Deployment Pipeline Dashboard widget
  - [ ] Add toggle
  - [ ] Show stage-by-stage status
  - [ ] Calculate DORA metrics (lead time, MTTR)
- [ ] Add 30-second auto-refresh polling

**Deliverable**:
- ✅ 7 of 14 widgets support live data
- ✅ PM can track velocity trends
- ✅ Lead can monitor code quality
- ✅ Lead can watch deployments
- ✅ Auto-refresh every 30 seconds

**GitHub PR**: "Phase 3: High Priority Widgets - Jira History + SonarQube + CI/CD"

---

#### Week 7-8: Nice-to-Have Widgets Phase

**Sprint Goal**: Remaining 7 widgets with live data

**Day 1-4** (32 hours):
- [ ] Jira advanced queries (requirements, change requests, blockers)
- [ ] Create `/api/jira/requirements` route
- [ ] Create `/api/jira/change-requests` route
- [ ] Create `/api/jira/blockers` route
- [ ] Update 3 widgets:
  - [ ] Requirements Tracking Dashboard
  - [ ] Change Request Dashboard
  - [ ] Blocker Resolution Dashboard

**Day 5-7** (24 hours):
- [ ] Zoho CRM vendor API
- [ ] Create `/api/zoho/vendors` route
- [ ] Update Vendor Compliance Dashboard
- [ ] Update Program Health Dashboard (combines Zoho + Jira)

**Day 8-10** (24 hours):
- [ ] Complete Stakeholder Engagement Dashboard
- [ ] Complete Resource Capacity Dashboard
- [ ] Add Slack integration (optional)
- [ ] Add Calendar integration (optional)

**Deliverable**:
- ✅ All 14 widgets support live data
- ✅ All 6 personas fully functional
- ✅ Demo fallback still works

**GitHub PR**: "Phase 4: Nice-to-Have Widgets - All 14 Widgets Complete"

---

#### Week 9-10: Real-Time Updates (Optional)

**Sprint Goal**: Replace polling with SSE (<5 sec latency)

**Day 1-3** (24 hours):
- [ ] Create SSE endpoint `/api/realtime/[widget]`
- [ ] Implement event streaming
- [ ] Add heartbeat (30 sec interval)
- [ ] Test connection stability

**Day 4-6** (24 hours):
- [ ] Create `useRealtimeWidget` hook
- [ ] Update all 14 widgets to use SSE
- [ ] Add connection status indicator
- [ ] Fallback to polling if SSE fails

**Day 7-10** (32 hours):
- [ ] Webhook handlers:
  - [ ] Zoho ticket created/updated
  - [ ] Jira issue created/updated
  - [ ] SonarQube quality gate changed
  - [ ] CI/CD workflow completed
- [ ] Broadcast events to SSE clients
- [ ] Test E2E real-time updates

**Deliverable**:
- ✅ Real-time updates (<5 sec latency)
- ✅ Webhook-driven updates (no polling)
- ✅ Connection status indicators
- ✅ Graceful fallback to polling

**GitHub PR**: "Phase 5: Real-Time Updates - SSE + Webhooks"

---

### Immediate Next Action

**This Week (Week 1)**: Authentication + Database Foundation

**Monday** (8 hours):
1. Create Supabase account → https://supabase.com/dashboard/sign-up
2. Create new Supabase project
   - Project name: "v17-mode-switcher-prod"
   - Database password: Generate strong password
   - Region: Choose closest to users
3. Copy connection string → `.env.local`
   ```env
   DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
   SUPABASE_URL=https://[project-ref].supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. Run Prisma migrations:
   ```bash
   cd /Users/admin/Documents/claudecode/workspaces/enterprise-ai-support/apps/v17-mode-switcher
   npm run db:push
   npm run db:studio  # Verify schema in browser
   ```

**Tuesday** (8 hours):
5. Install NextAuth.js dependencies (already in package.json)
6. Create auth configuration file: `src/lib/auth.ts`
   ```typescript
   import NextAuth from 'next-auth';
   import EmailProvider from 'next-auth/providers/email';
   import GoogleProvider from 'next-auth/providers/google';
   import { PrismaAdapter } from '@next-auth/prisma-adapter';
   import { prisma } from '@/lib/prisma';

   export const { handlers, auth, signIn, signOut } = NextAuth({
     adapter: PrismaAdapter(prisma),
     providers: [
       EmailProvider({
         server: process.env.EMAIL_SERVER,
         from: process.env.EMAIL_FROM,
       }),
       GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
       }),
     ],
     callbacks: {
       session: async ({ session, user }) => {
         session.user.role = user.role; // Add role to session
         return session;
       },
     },
   });
   ```
7. Create auth API route: `src/app/api/auth/[...nextauth]/route.ts`
   ```typescript
   import { handlers } from '@/lib/auth';
   export const { GET, POST } = handlers;
   ```

**Wednesday** (8 hours):
8. Create login page: `src/app/login/page.tsx`
   - Email/password form
   - "Sign in with Google" button
   - Redirect to `/demo/cor` after login
9. Add auth check to demo pages
   - Wrap pages with `auth()` server function
   - Redirect to `/login` if not authenticated

**Thursday** (8 hours):
10. Seed demo data into Supabase
    - Create `prisma/seed.ts`
    - Insert 500+ demo records (tickets, customers, contracts, etc.)
    - Run `npx prisma db seed`
11. Test full authentication flow
    - Sign up with email
    - Sign in with Google
    - Verify session persistence
    - Test logout

**Friday** (8 hours):
12. Add "Connect Account" UI
    - Create settings page: `src/app/settings/page.tsx`
    - Add Zoho/Jira connection buttons (UI only, no API yet)
    - Add "Live" badge component for widgets
13. Create GitHub PR: "Phase 1: Authentication + Database Foundation"
14. Document Week 1 progress in `docs/IMPLEMENTATION-LOG.md`

**Week 1 Success Criteria**:
- ✅ Users can log in with email/password
- ✅ Users can log in with Google
- ✅ Database has 500+ demo records
- ✅ Session persists across page refresh
- ✅ Demo mode still works (no breaking changes)

**Commands to Run**:
```bash
# Set up environment variables
echo "DATABASE_URL=your_supabase_url" >> .env.local
echo "SUPABASE_URL=your_supabase_url" >> .env.local
echo "SUPABASE_ANON_KEY=your_anon_key" >> .env.local
echo "GOOGLE_CLIENT_ID=your_google_client_id" >> .env.local
echo "GOOGLE_CLIENT_SECRET=your_google_secret" >> .env.local

# Run Prisma migrations
npm run db:push

# Seed database
npx prisma db seed

# Start dev server
npm run dev

# Open in browser
open http://localhost:3018/login
```

---

## Appendices

### Appendix A: External API Inventory

| API | Base URL | Auth Method | Rate Limit | Cost |
|-----|----------|-------------|------------|------|
| **Zoho Desk** | https://desk.zoho.com/api/v1 | OAuth 2.0 | 50,000 calls/day | $50/month (Standard plan) |
| **Zoho CRM** | https://www.zohoapis.com/crm/v2 | OAuth 2.0 | 10,000 calls/day | $65/month (Professional plan) |
| **Jira** | https://[company].atlassian.net/rest/api/3 | Basic Auth (API Token) | 10,000 calls/hour | Free tier: 10 users |
| **Supabase** | https://[project-ref].supabase.co | API Key | 50,000 calls/month (free) | Free: 500 MB, Paid: $25/month |
| **SonarQube** | https://sonarcloud.io/api | Token-based | 10,000 calls/day | Free for open source |
| **GitHub Actions** | https://api.github.com/repos/[owner]/[repo]/actions | Personal Access Token | 5,000 calls/hour | Free for public repos |
| **Slack** | https://slack.com/api | OAuth 2.0 / Bot Token | 1 call/sec (burst 20) | Free tier: 10,000 messages |
| **Google Calendar** | https://www.googleapis.com/calendar/v3 | OAuth 2.0 | 1,000,000 calls/day | Free |

**Total Monthly Cost** (all APIs): ~$140/month

---

### Appendix B: Database Schema Requirements

**Critical Schema Changes for Real-Time**:

```prisma
// Add to schema.prisma

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String?
  role          Role     @default(SUPPORT_AGENT)

  // Real-time integration fields
  zohoUserId    String?  @unique
  jiraAccountId String?  @unique

  // OAuth tokens (encrypted)
  zohoAccessToken     String?
  zohoRefreshToken    String?
  jiraApiToken        String?

  // Connection status
  zohoConnected       Boolean @default(false)
  jiraConnected       Boolean @default(false)
  lastSyncedAt        DateTime?

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Ticket {
  id             String   @id @default(cuid())
  ticketNumber   String   @unique
  subject        String
  description    String
  status         TicketStatus
  priority       TicketPriority

  // Real-time sync fields
  externalId     String?  @unique // Zoho Desk ticket ID
  dataSource     DataSource @default(MANUAL)
  syncStatus     SyncStatus @default(SYNCED)
  lastSyncedAt   DateTime?

  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model Contract {
  id             String   @id @default(cuid())
  contractNumber String   @unique
  name           String
  vendor         String
  status         ContractStatus

  // Real-time sync fields
  externalId     String?  @unique // Zoho CRM contract ID
  dataSource     DataSource @default(MANUAL)
  syncStatus     SyncStatus @default(SYNCED)
  lastSyncedAt   DateTime?

  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model Task {
  id             String   @id @default(cuid())
  title          String
  description    String?
  status         TaskStatus
  assigneeId     String

  // Real-time sync fields
  externalId     String?  @unique // Jira issue key (e.g., "SUP-123")
  dataSource     DataSource @default(MANUAL)
  syncStatus     SyncStatus @default(SYNCED)
  lastSyncedAt   DateTime?

  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

// New enums
enum DataSource {
  ZOHO_DESK
  ZOHO_CRM
  JIRA
  SUPABASE
  MANUAL
}

enum SyncStatus {
  SYNCED     // Successfully synced with external system
  PENDING    // Sync in progress
  FAILED     // Sync failed (retry needed)
  CONFLICT   // Data conflict detected (manual resolution)
}
```

**Migration Commands**:
```bash
# Generate migration
npx prisma migrate dev --name add_realtime_sync_fields

# Apply migration
npx prisma migrate deploy

# Regenerate Prisma client
npx prisma generate
```

---

### Appendix C: Security Requirements Checklist

**Pre-Production Security Audit**:

**Authentication & Authorization**:
- [ ] NextAuth.js configured with secure session strategy (JWT)
- [ ] CSRF protection enabled
- [ ] OAuth providers verified (Google, GitHub)
- [ ] Role-based access control (RBAC) implemented
- [ ] API routes protected with auth middleware
- [ ] Session expiry configured (24 hours)
- [ ] Refresh token rotation enabled

**API Security**:
- [ ] All API keys stored in environment variables
- [ ] `.env.local` added to `.gitignore`
- [ ] API rate limiting implemented (10 req/sec per user)
- [ ] Request validation with Zod schemas
- [ ] Webhook signature verification (HMAC-SHA256)
- [ ] IP whitelist for webhook endpoints
- [ ] API error responses sanitized (no stack traces)

**Data Protection**:
- [ ] Database connection uses SSL/TLS
- [ ] Sensitive fields encrypted at rest (tokens)
- [ ] PII masked in logs
- [ ] Data retention policy implemented (90 days)
- [ ] GDPR compliance (data export/deletion)
- [ ] Row-level security (RLS) enabled in Supabase

**Infrastructure Security**:
- [ ] HTTPS enforced (Vercel automatic)
- [ ] Security headers configured (CSP, HSTS, X-Frame-Options)
- [ ] Content Security Policy (CSP) allows only trusted domains
- [ ] CORS configured for API routes
- [ ] Dependency scanning enabled (npm audit)
- [ ] SAST scanning enabled (ESLint security rules)

**Monitoring & Logging**:
- [ ] Audit logging for sensitive actions
- [ ] Authentication event logging
- [ ] API call logging (request/response)
- [ ] Error tracking (Sentry or similar)
- [ ] Performance monitoring (Vercel Analytics)
- [ ] Alerting for security events (failed auth, rate limit breaches)

**Compliance**:
- [ ] WCAG 2.1 Level AA accessibility (already implemented)
- [ ] FedRAMP controls (if government contracts)
- [ ] HIPAA compliance (if healthcare customers)
- [ ] SOC 2 Type II preparation (if enterprise customers)

**Security Testing**:
- [ ] Penetration testing completed
- [ ] Vulnerability scanning completed
- [ ] SQL injection testing (Prisma protects, but verify)
- [ ] XSS testing (React protects, but verify)
- [ ] CSRF testing (NextAuth.js protects, but verify)

**Incident Response**:
- [ ] Security incident response plan documented
- [ ] API key rotation procedure documented
- [ ] Data breach notification procedure documented
- [ ] Backup and restore procedures tested

---

### Appendix D: Cost-Benefit Analysis

**Cost Breakdown by Strategy**:

| Cost Category | Strategy A (MVR) | Strategy B (Full) | Strategy C (Hybrid) |
|--------------|------------------|-------------------|-------------------|
| **Labor** | | | |
| Development (hours) | 160 | 600 | 300-400 |
| Developer hourly rate | $125/hr | $125/hr | $125/hr |
| **Subtotal Labor** | **$20,000** | **$75,000** | **$37,500-$50,000** |
| **Infrastructure** | | | |
| Supabase (monthly) | $25 | $25 | $25 |
| Zoho CRM (monthly) | $65 | $65 | $65 |
| Zoho Desk (monthly) | $50 | $50 | $50 |
| SonarQube (monthly) | $0 (free tier) | $0 | $0 |
| GitHub Actions (monthly) | $0 (free tier) | $0 | $0 |
| Slack (monthly) | $0 (free tier) | $8/user | $0 (optional) |
| Calendar API (monthly) | $0 (free) | $0 | $0 (optional) |
| **Subtotal Infrastructure** | **$140/month** | **$148/month** | **$140/month** |
| **Total First Year** | | | |
| One-time (development) | $20,000 | $75,000 | $37,500-$50,000 |
| Recurring (12 months) | $1,680 | $1,776 | $1,680 |
| **TOTAL YEAR 1** | **$21,680** | **$76,776** | **$39,180-$51,680** |

**ROI Analysis** (Assumes $100/user/month SaaS pricing):

| Metric | Strategy A (MVR) | Strategy B (Full) | Strategy C (Hybrid) |
|--------|------------------|-------------------|-------------------|
| **Break-Even** | | | |
| Users needed (monthly) | 217 users | 768 users | 392-517 users |
| OR Enterprise contracts | 11 contracts ($2K/month each) | 39 contracts | 20-26 contracts |
| **Time to Break-Even** | | | |
| With 100 users/month | 2.2 months | 7.7 months | 3.9-5.2 months |
| With 50 users/month | 4.4 months | 15.4 months | 7.8-10.3 months |
| **Customer Value** | | | |
| COR time savings | 40% (8 hrs/week) | 40% | 40% |
| PM time savings | 0% (not included) | 25% (5 hrs/week) | 25% |
| Developer time savings | 0% (not included) | 30% (6 hrs/week) | 30% |
| **Value per User** | | | |
| COR ($100/hr) | $800/week saved | $800/week | $800/week |
| PM ($80/hr) | $0 | $400/week | $400/week |
| Developer ($70/hr) | $0 | $420/week | $420/week |

**Recommendation**: Strategy C offers best ROI with 3.9-5.2 month break-even for 100 users

---

**Document Version**: 1.0.0
**Last Updated**: 2025-11-12
**Next Review**: 2025-11-19 (Weekly during implementation)

---

*End of Real-Time Implementation Analysis*
