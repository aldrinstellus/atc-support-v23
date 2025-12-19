# Full Implementation TODO Master List

**Project**: V17 Mode Switcher - Real-Time Data Integration  
**Strategy**: Full Implementation (All 6 Personas, All 14 Widgets)  
**Timeline**: 10 weeks (600 hours)  
**Start Date**: 2025-11-12  
**Target Completion**: 2026-01-21  

---

## Executive Summary

This document tracks the complete implementation of real-time data integration for V17 Mode Switcher. Upon completion:

- ✅ All 14 widgets connected to live data sources
- ✅ All 6 personas functional with real-time updates
- ✅ 192 demo scenarios working with actual data
- ✅ WebSocket real-time updates operational
- ✅ Enterprise-grade security and performance
- ✅ Production-ready for 500+ users

**Total Tasks**: 47 across 6 phases

---

## PHASE 1: Foundation & Core Infrastructure (Week 1-2)

**Duration**: 80 hours  
**Status**: ⏳ IN PROGRESS  
**Completion**: 0/9 tasks

### Week 1: Monday-Friday

#### Task 1.1: Supabase Project Setup (8 hours)
- [ ] Create Supabase account at https://supabase.com/dashboard
- [ ] Create new project: `v17-mode-switcher-prod`
- [ ] Note connection string and anon key
- [ ] Add to `.env.local`:
  ```env
  DATABASE_URL="postgresql://postgres:[password]@[host]:5432/postgres"
  NEXT_PUBLIC_SUPABASE_URL="https://[project].supabase.co"
  NEXT_PUBLIC_SUPABASE_ANON_KEY="[key]"
  ```
- [ ] Test connection with `npx prisma db pull`

**Deliverable**: Supabase project live and accessible

---

#### Task 1.2: Prisma Schema Configuration (12 hours)
- [ ] Update `prisma/schema.prisma` with 15+ models:
  - Users (name, email, role, department)
  - Contracts (contract_id, vendor, value, status, deliverables)
  - Vendors (vendor_id, name, performance_score, sla_compliance)
  - Deliverables (deliverable_id, contract_id, due_date, status, quality_score)
  - Requirements (req_id, stakeholder, priority, status, test_coverage)
  - ChangeRequests (request_id, impact, approvals, implementation_date)
  - Sprints (sprint_id, team, velocity, goal_completion, blockers)
  - Tasks (task_id, sprint_id, assignee, status, story_points)
  - CodeQuality (repo, coverage, vulnerabilities, code_smells, tech_debt)
  - Deployments (deployment_id, environment, status, duration, rollback)
  - KnowledgeArticles (article_id, title, content, category, views)
  - Plus: TicketMetrics, AgentPerformance, CustomerRisk, StakeholderEngagement

**Deliverable**: Complete Prisma schema file

---

#### Task 1.3: Run Prisma Migrations (4 hours)
- [ ] Generate Prisma client: `npx prisma generate`
- [ ] Push schema to database: `npx prisma db push`
- [ ] Verify tables created: `npx prisma studio`
- [ ] Check all 15+ tables exist in Supabase dashboard

**Deliverable**: Database schema live in Supabase

---

#### Task 1.4: NextAuth.js Setup (10 hours)
- [ ] Install dependencies:
  ```bash
  npm install next-auth @next-auth/prisma-adapter
  ```
- [ ] Create `src/app/api/auth/[...nextauth]/route.ts`
- [ ] Configure providers:
  - Email/Password (Credentials provider)
  - Google OAuth (OAuth provider)
- [ ] Add NextAuth session to root layout
- [ ] Create Prisma adapter for sessions

**Deliverable**: Authentication system functional

---

#### Task 1.5: Login/Signup UI (12 hours)
- [ ] Create `src/app/login/page.tsx`
- [ ] Create `src/app/signup/page.tsx`
- [ ] Add role selection dropdown:
  - COR (Contracting Officer's Representative)
  - Program Manager
  - Stakeholder Lead
  - Project Manager
  - Service Team Lead
  - Service Team Member
- [ ] Add email/password form
- [ ] Add "Sign in with Google" button
- [ ] Add session persistence check

**Deliverable**: Complete authentication UI

---

#### Task 1.6: RBAC Middleware (10 hours)
- [ ] Create `src/middleware.ts` for route protection
- [ ] Create `src/lib/auth-utils.ts` with role checking:
  ```typescript
  export function hasRole(user, allowedRoles) { ... }
  export function canAccessWidget(user, widgetId) { ... }
  ```
- [ ] Protect all `/api/*` routes except `/api/auth/*`
- [ ] Add role-based widget visibility logic

**Deliverable**: RBAC system operational

---

#### Task 1.7: Database Seeding Script (16 hours)
- [ ] Create `prisma/seed.ts`
- [ ] Generate 500+ realistic records:
  - 50 users across 6 roles
  - 20 contracts with vendors
  - 100 deliverables
  - 50 requirements
  - 30 change requests
  - 10 sprints
  - 200 tasks
  - 20 code quality reports
  - 50 deployments
  - 100 knowledge articles
- [ ] Add randomized data (names, dates, statuses)
- [ ] Run seed: `npx prisma db seed`

**Deliverable**: Database populated with realistic demo data

---

#### Task 1.8: Redis Caching Setup (6 hours)
- [ ] Sign up for Redis Cloud (free tier) or use local Redis
- [ ] Install `ioredis`:
  ```bash
  npm install ioredis
  ```
- [ ] Create `src/lib/redis.ts` client
- [ ] Add cache wrapper for API responses:
  ```typescript
  export async function cachedFetch(key, fetchFn, ttl = 300) { ... }
  ```
- [ ] Test caching with sample API call

**Deliverable**: Redis caching operational

---

#### Task 1.9: Environment Variables Configuration (2 hours)
- [ ] Create comprehensive `.env.example`:
  ```env
  # Database
  DATABASE_URL="postgresql://..."
  
  # Supabase
  NEXT_PUBLIC_SUPABASE_URL="https://..."
  NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
  
  # NextAuth
  NEXTAUTH_URL="http://localhost:3018"
  NEXTAUTH_SECRET="[generate with: openssl rand -base64 32]"
  
  # Google OAuth
  GOOGLE_CLIENT_ID="..."
  GOOGLE_CLIENT_SECRET="..."
  
  # Redis
  REDIS_URL="redis://..."
  
  # External APIs (to be added in Phase 2)
  ZOHO_DESK_API_KEY="..."
  JIRA_API_TOKEN="..."
  GITHUB_TOKEN="..."
  SONARQUBE_TOKEN="..."
  SLACK_BOT_TOKEN="..."
  GOOGLE_CALENDAR_API_KEY="..."
  ```
- [ ] Add all to Vercel environment variables
- [ ] Document in README.md

**Deliverable**: All environment variables configured

---

## PHASE 2: External API Integrations (Week 3-4)

**Duration**: 80 hours  
**Status**: ⏸️ PENDING  
**Completion**: 0/8 tasks

### Task 2.1: Zoho Desk API Integration (12 hours)
- [ ] Sign up for Zoho Desk developer account
- [ ] Create OAuth app and get API credentials
- [ ] Install SDK: `npm install @zohocrm/nodejs-sdk`
- [ ] Create `src/lib/integrations/zoho-desk.ts`
- [ ] Implement methods:
  - `getTickets(filters)`
  - `getTicketDetails(ticketId)`
  - `getAgentPerformance()`
  - `getCustomerRisk(customerId)`
- [ ] Add error handling and retry logic
- [ ] Test with live Zoho Desk data

**Deliverable**: Zoho Desk integration functional

---

### Task 2.2: Jira API Integration (12 hours)
- [ ] Get Jira API token from Atlassian account
- [ ] Install SDK: `npm install jira-client`
- [ ] Create `src/lib/integrations/jira.ts`
- [ ] Implement methods:
  - `getSprints(projectKey)`
  - `getSprintTasks(sprintId)`
  - `getVelocity(projectKey, sprints)`
  - `getBlockers(sprintId)`
- [ ] Add Jira webhook support for real-time updates
- [ ] Test with live Jira project

**Deliverable**: Jira integration functional

---

### Task 2.3: GitHub API Integration (10 hours)
- [ ] Generate GitHub personal access token
- [ ] Install Octokit: `npm install @octokit/rest`
- [ ] Create `src/lib/integrations/github.ts`
- [ ] Implement methods:
  - `getPullRequests(repo, state)`
  - `getDeployments(repo)`
  - `getCommits(repo, since)`
  - `getPRReviews(repo, prNumber)`
- [ ] Test with live GitHub repository

**Deliverable**: GitHub integration functional

---

### Task 2.4: SonarQube API Integration (10 hours)
- [ ] Set up SonarQube Cloud account or self-hosted instance
- [ ] Get API token
- [ ] Create `src/lib/integrations/sonarqube.ts`
- [ ] Implement methods:
  - `getCodeQuality(project)`
  - `getTestCoverage(project)`
  - `getVulnerabilities(project)`
  - `getCodeSmells(project)`
- [ ] Test with live SonarQube project

**Deliverable**: SonarQube integration functional

---

### Task 2.5: Slack API Integration (8 hours)
- [ ] Create Slack app at api.slack.com/apps
- [ ] Get bot token
- [ ] Install SDK: `npm install @slack/web-api`
- [ ] Create `src/lib/integrations/slack.ts`
- [ ] Implement methods:
  - `sendNotification(channel, message)`
  - `getChannelMessages(channel, limit)`
- [ ] Test notification delivery

**Deliverable**: Slack integration functional

---

### Task 2.6: Google Calendar API Integration (8 hours)
- [ ] Enable Google Calendar API in Google Cloud Console
- [ ] Get API credentials
- [ ] Install SDK: `npm install googleapis`
- [ ] Create `src/lib/integrations/google-calendar.ts`
- [ ] Implement methods:
  - `getUpcomingMeetings(calendarId, days)`
  - `createMeeting(event)`
- [ ] Test with live Google Calendar

**Deliverable**: Google Calendar integration functional

---

### Task 2.7: Unified API Client Layer (12 hours)
- [ ] Create `src/lib/api-client.ts` base class:
  ```typescript
  export class ApiClient {
    protected async request(config) {
      // Error handling
      // Retry logic (exponential backoff)
      // Rate limiting
      // Caching
      // Logging
    }
  }
  ```
- [ ] Extend for each integration (Zoho, Jira, GitHub, etc.)
- [ ] Add request/response interceptors
- [ ] Add timeout configuration

**Deliverable**: Unified API client system

---

### Task 2.8: API Rate Limiting (8 hours)
- [ ] Install `bottleneck`: `npm install bottleneck`
- [ ] Create rate limiters per API:
  ```typescript
  const jiraLimiter = new Bottleneck({ maxConcurrent: 5, minTime: 200 });
  const githubLimiter = new Bottleneck({ maxConcurrent: 10, minTime: 100 });
  ```
- [ ] Wrap all API calls with limiters
- [ ] Add quota tracking and alerts
- [ ] Test under load

**Deliverable**: API rate limiting operational

---

## PHASE 3: Government Mode Widgets (Week 5-6)

**Duration**: 80 hours  
**Status**: ⏸️ PENDING  
**Completion**: 0/7 tasks

### Task 3.1: COR - Contract Performance Dashboard (12 hours)
- [ ] Update `src/components/widgets/ContractPerformanceDashboardWidget.tsx`
- [ ] Replace mock data with live contract data:
  ```typescript
  const contracts = await prisma.contract.findMany({
    where: { status: 'ACTIVE' },
    include: { vendor: true, deliverables: true }
  });
  ```
- [ ] Add loading spinner and error states
- [ ] Implement data refresh (polling every 30s)
- [ ] Test with 20+ contracts

**Deliverable**: Contract Performance widget live

---

### Task 3.2: COR - Vendor Compliance Dashboard (12 hours)
- [ ] Update `src/components/widgets/VendorComplianceDashboardWidget.tsx`
- [ ] Fetch vendor performance metrics
- [ ] Calculate SLA compliance percentage
- [ ] Display compliance trends (last 6 months)
- [ ] Add drill-down to vendor details

**Deliverable**: Vendor Compliance widget live

---

### Task 3.3: COR - Deliverable Review List (10 hours)
- [ ] Update `src/components/widgets/DeliverableReviewListWidget.tsx`
- [ ] Fetch pending deliverables from database
- [ ] Sort by due date (urgent first)
- [ ] Add approve/reject actions
- [ ] Update deliverable status in real-time

**Deliverable**: Deliverable Review widget live

---

### Task 3.4: PM - Program Health Dashboard (14 hours)
- [ ] Update `src/components/widgets/ProgramHealthDashboardWidget.tsx`
- [ ] Aggregate data from multiple projects
- [ ] Calculate portfolio health score
- [ ] Show resource utilization across projects
- [ ] Display top 5 risks

**Deliverable**: Program Health widget live

---

### Task 3.5: Stakeholder - Change Request Dashboard (12 hours)
- [ ] Update `src/components/widgets/ChangeRequestDashboardWidget.tsx`
- [ ] Fetch change requests by status (pending, approved, rejected)
- [ ] Show approval workflow progress
- [ ] Calculate impact scores
- [ ] Add approve/reject/escalate actions

**Deliverable**: Change Request widget live

---

### Task 3.6: Stakeholder - Requirements Tracking (12 hours)
- [ ] Update `src/components/widgets/RequirementsTrackingDashboardWidget.tsx`
- [ ] Fetch requirements by sprint/release
- [ ] Calculate completion percentage
- [ ] Show test coverage per requirement
- [ ] Flag at-risk requirements

**Deliverable**: Requirements Tracking widget live

---

### Task 3.7: Stakeholder - Engagement Dashboard (8 hours)
- [ ] Update `src/components/widgets/StakeholderEngagementDashboardWidget.tsx`
- [ ] Calculate engagement scores per stakeholder
- [ ] Show last contact date
- [ ] Display upcoming touchpoints
- [ ] Show feedback trends

**Deliverable**: Stakeholder Engagement widget live

---

## PHASE 4: Project Mode Widgets (Week 7-8)

**Duration**: 80 hours  
**Status**: ⏸️ PENDING  
**Completion**: 0/7 tasks

### Task 4.1: PM - Sprint Burndown Chart (14 hours)
- [ ] Update `src/components/widgets/SprintBurndownChartWidget.tsx`
- [ ] Fetch sprint data from Jira API
- [ ] Calculate ideal vs actual burndown
- [ ] Show story point completion
- [ ] Flag at-risk stories
- [ ] Display velocity trend

**Deliverable**: Sprint Burndown widget live

---

### Task 4.2: PM - Resource Capacity Dashboard (12 hours)
- [ ] Update `src/components/widgets/ResourceCapacityDashboardWidget.tsx`
- [ ] Fetch team member availability
- [ ] Calculate capacity (story points/sprint)
- [ ] Show PTO calendar
- [ ] Flag over-allocated members

**Deliverable**: Resource Capacity widget live

---

### Task 4.3: PM - Blocker Resolution Dashboard (10 hours)
- [ ] Update `src/components/widgets/BlockerResolutionDashboardWidget.tsx`
- [ ] Fetch active blockers from Jira
- [ ] Calculate average resolution time
- [ ] Show blocker age and severity
- [ ] Display assignee and status

**Deliverable**: Blocker Resolution widget live

---

### Task 4.4: Team Lead - Code Quality Dashboard (14 hours)
- [ ] Update `src/components/widgets/CodeQualityDashboardWidget.tsx`
- [ ] Fetch code quality metrics from SonarQube
- [ ] Display test coverage trends
- [ ] Show vulnerabilities and code smells
- [ ] Calculate technical debt estimate

**Deliverable**: Code Quality widget live

---

### Task 4.5: Team Lead - Deployment Pipeline (12 hours)
- [ ] Update `src/components/widgets/DeploymentPipelineDashboardWidget.tsx`
- [ ] Fetch deployment status from CI/CD (GitHub Actions)
- [ ] Show deployment frequency
- [ ] Calculate MTTR (Mean Time to Recovery)
- [ ] Display success/failure rate

**Deliverable**: Deployment Pipeline widget live

---

### Task 4.6: Developer - Task Kanban Board (10 hours)
- [ ] Update `src/components/widgets/TaskKanbanBoardWidget.tsx`
- [ ] Fetch developer's assigned tasks from Jira
- [ ] Show task status (To Do, In Progress, Done)
- [ ] Enable drag-and-drop to update status
- [ ] Show time tracking per task

**Deliverable**: Task Kanban widget live

---

### Task 4.7: Developer - Knowledge Base Search (8 hours)
- [ ] Update knowledge base search to query Confluence API
- [ ] Implement semantic search (vector embeddings)
- [ ] Show article relevance scores
- [ ] Display article previews
- [ ] Track article views and usefulness

**Deliverable**: Knowledge Base Search widget live

---

## PHASE 5: Real-Time Updates (Week 9)

**Duration**: 40 hours  
**Status**: ⏸️ PENDING  
**Completion**: 0/5 tasks

### Task 5.1: WebSocket Server Setup (10 hours)
- [ ] Install `ws`: `npm install ws @types/ws`
- [ ] Create WebSocket server in `src/lib/websocket-server.ts`
- [ ] Configure Next.js custom server to support WebSocket
- [ ] Test connection from client

**Deliverable**: WebSocket server operational

---

### Task 5.2: Client-Side Subscriptions (8 hours)
- [ ] Create `src/hooks/useWebSocket.ts`
- [ ] Implement per-widget subscriptions:
  ```typescript
  const { data, isConnected } = useWebSocket('contract-performance');
  ```
- [ ] Add automatic reconnection logic
- [ ] Test subscription lifecycle

**Deliverable**: WebSocket subscriptions working

---

### Task 5.3: Event Broadcasting System (10 hours)
- [ ] Create event emitter in `src/lib/event-emitter.ts`
- [ ] Define events:
  - `contract:updated`
  - `deliverable:submitted`
  - `sprint:completed`
  - `deployment:started`
  - etc.
- [ ] Broadcast events from API routes
- [ ] Test event delivery to subscribed clients

**Deliverable**: Event broadcasting operational

---

### Task 5.4: Polling Fallback (6 hours)
- [ ] Add polling logic for widgets where WebSocket unavailable
- [ ] Implement exponential backoff for polling
- [ ] Auto-detect WebSocket unavailability and fallback
- [ ] Test fallback behavior

**Deliverable**: Polling fallback working

---

### Task 5.5: Connection Management (6 hours)
- [ ] Add connection status indicator in UI
- [ ] Handle connection loss gracefully
- [ ] Implement reconnection with exponential backoff
- [ ] Show user notification on disconnection
- [ ] Test connection recovery

**Deliverable**: Connection management robust

---

## PHASE 6: Testing, Security & Performance (Week 10)

**Duration**: 80 hours  
**Status**: ⏸️ PENDING  
**Completion**: 0/7 tasks

### Task 6.1: E2E Tests for 192 Scenarios (24 hours)
- [ ] Set up Playwright test suite
- [ ] Create test files per persona (6 files)
- [ ] Write tests for all 192 demo scenarios:
  - Login as persona
  - Execute query
  - Verify widget renders
  - Check data accuracy
- [ ] Run tests in CI/CD pipeline
- [ ] Achieve 95%+ test pass rate

**Deliverable**: 192 E2E tests passing

---

### Task 6.2: Security Headers Implementation (6 hours)
- [ ] Add CSP (Content Security Policy)
- [ ] Add HSTS (HTTP Strict Transport Security)
- [ ] Add X-Frame-Options
- [ ] Add X-Content-Type-Options
- [ ] Test with securityheaders.com

**Deliverable**: Security headers configured

---

### Task 6.3: Audit Logging (10 hours)
- [ ] Create audit log table in database
- [ ] Log all sensitive operations:
  - User login/logout
  - Role changes
  - Data access (contracts, tickets)
  - API calls to external systems
- [ ] Create audit log viewer for admins

**Deliverable**: Audit logging operational

---

### Task 6.4: Security Vulnerability Scan (8 hours)
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Run Snyk scan: `npx snyk test`
- [ ] Fix all critical and high-severity issues
- [ ] Document remaining medium/low issues

**Deliverable**: 0 critical vulnerabilities

---

### Task 6.5: Performance Optimization (16 hours)
- [ ] Implement lazy loading for widgets
- [ ] Add code splitting per route
- [ ] Optimize images (next/image)
- [ ] Add Redis caching for API responses
- [ ] Minimize bundle size (<500KB)
- [ ] Test with Lighthouse (target: 90+ score)

**Deliverable**: Performance optimized

---

### Task 6.6: Load Testing (10 hours)
- [ ] Write k6 load test scripts
- [ ] Test scenarios:
  - 100 concurrent users
  - 500 concurrent users
  - 1000 concurrent users (target)
- [ ] Identify bottlenecks
- [ ] Optimize database queries
- [ ] Test again until 1000 users supported

**Deliverable**: System handles 1000 concurrent users

---

### Task 6.7: Production Deployment (6 hours)
- [ ] Run final production build: `npm run build`
- [ ] Verify 0 TypeScript errors
- [ ] Deploy to Vercel production
- [ ] Configure custom domain (if applicable)
- [ ] Test production deployment end-to-end
- [ ] Create rollback plan

**Deliverable**: Production deployment successful

---

## Progress Tracking

**Overall Progress**: 0/47 tasks (0%)

| Phase | Tasks | Completed | Progress |
|-------|-------|-----------|----------|
| Phase 1 | 9 | 0 | 0% |
| Phase 2 | 8 | 0 | 0% |
| Phase 3 | 7 | 0 | 0% |
| Phase 4 | 7 | 0 | 0% |
| Phase 5 | 5 | 0 | 0% |
| Phase 6 | 7 | 0 | 0% |

---

## Success Criteria

**Phase 1 Complete When**:
- [ ] User can log in with email/password or Google OAuth
- [ ] Database has 500+ realistic records
- [ ] All environment variables configured
- [ ] Redis caching operational

**Phase 2 Complete When**:
- [ ] All 6 external APIs integrated and tested
- [ ] API rate limiting prevents quota breaches
- [ ] Error handling robust (retry logic)

**Phase 3 Complete When**:
- [ ] All 7 Government Mode widgets show live data
- [ ] Loading states and error handling work
- [ ] Data refreshes automatically

**Phase 4 Complete When**:
- [ ] All 7 Project Mode widgets show live data
- [ ] Jira, GitHub, SonarQube integrations working
- [ ] Widget interactions functional

**Phase 5 Complete When**:
- [ ] WebSocket real-time updates operational
- [ ] Fallback to polling works when WebSocket unavailable
- [ ] Connection status visible to user

**Phase 6 Complete When**:
- [ ] 192 E2E tests passing (95%+ pass rate)
- [ ] Security scan shows 0 critical vulnerabilities
- [ ] Load test handles 1000 concurrent users
- [ ] Production deployment successful

---

## Risk Mitigation

**Risk 1**: External API rate limits hit  
**Mitigation**: Implement aggressive caching (5-15 min TTL), rate limiting per API

**Risk 2**: Supabase free tier exceeded  
**Mitigation**: Monitor usage, upgrade to paid tier if needed ($25/month)

**Risk 3**: WebSocket connection issues  
**Mitigation**: Polling fallback, connection retry logic

**Risk 4**: Timeline slippage due to API complexity  
**Mitigation**: 20% buffer time built into estimates, prioritize critical widgets first

---

## Weekly Checkpoints

**Week 1**: Foundation tasks 1.1-1.5 complete  
**Week 2**: Foundation tasks 1.6-1.9 complete, Phase 1 DONE  
**Week 3**: External APIs 2.1-2.4 complete  
**Week 4**: External APIs 2.5-2.8 complete, Phase 2 DONE  
**Week 5**: Government widgets 3.1-3.4 complete  
**Week 6**: Government widgets 3.5-3.7 complete, Phase 3 DONE  
**Week 7**: Project widgets 4.1-4.4 complete  
**Week 8**: Project widgets 4.5-4.7 complete, Phase 4 DONE  
**Week 9**: Real-time tasks 5.1-5.5 complete, Phase 5 DONE  
**Week 10**: Testing & deployment 6.1-6.7 complete, Phase 6 DONE  

---

**Last Updated**: 2025-11-12  
**Status**: Phase 1 Task 1 IN PROGRESS  
**Next Action**: Create Supabase project
