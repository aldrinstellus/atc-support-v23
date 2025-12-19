# ATC Support V20 Implementation Proposal
## AI-Powered IT Support System (ITSS)

**Document Version**: 1.0.0
**Date**: December 11, 2025
**Document Owner**: Product Manager (Justice League)
**Status**: Implementation Planning

---

## 1. EXECUTIVE SUMMARY

### Project Overview

ATC Support V20 represents the evolution of the Enterprise AI Support platform into a production-ready AI-Powered IT Support System (ITSS). Building on the robust foundation of V18/V19 (53 widgets, 10 personas, Claude SDK integration, 15+ Prisma models), V20 introduces a **Human-in-the-Loop (HITL)** draft review workflow that enables AI-assisted ticket response generation with agent approval before customer delivery.

**Mission**: Deliver a Phase 1 MVP by December 17, 2025 (6 days) that enables support agents to leverage AI-generated draft responses while maintaining quality control through a streamlined approval workflow.

### Business Value Proposition

| Metric | Current State | Phase 1 Target | Phase 3 Vision |
|--------|---------------|----------------|----------------|
| **First Response Time** | 2-4 hours | <5 minutes | <1 minute |
| **Agent Productivity** | Baseline | +30% | +40% |
| **Draft Acceptance Rate** | N/A | 70% | 85% |
| **SLA Compliance** | ~80% | 90% | 95%+ |
| **Automation Rate** | 0% | 30% | 40-60% |

**ROI Projection**: At 500+ tickets/month with 70% acceptance rate and 50% time savings per response, V20 Phase 1 saves approximately 180+ agent hours monthly.

### Key Success Metrics (Phase 1)

- **95% Draft Generation**: AI successfully generates draft for 95%+ of incoming tickets
- **70% Acceptance Rate**: 70% of drafts approved with minimal edits
- **90% Agent Adoption**: 90% of support agents actively using the system
- **<5 min First Response**: First AI-generated draft ready within 5 minutes

### Risk Assessment Summary

| Risk | Impact | Probability | Mitigation Status |
|------|--------|-------------|-------------------|
| SSO Integration Delays | High | Medium | Early spike planned (Day 1-2) |
| Email Delivery Issues | High | Low | Mock mode fallback for demo |
| Tight Timeline (6 days) | High | Medium | MVP scope defined, defer non-essentials |
| Claude API Rate Limits | Medium | Low | Caching strategy + fallback |

---

## 2. PHASE 1 IMPLEMENTATION PLAN (Dec 11-17, 2025)

### Sprint Overview

**Duration**: 6 working days (Dec 11-17)
**Team Size**: Justice League Heroes (8 primary, 2 support)
**Total Estimated Effort**: 96 hours
**Buffer**: 15% (14 hours contingency)

### Day-by-Day Breakdown

#### Day 1-2 (Dec 11-12): Foundation + Authentication

**Priority**: BLOCKING items first

| Task | Hero | Hours | Dependencies | Deliverables |
|------|------|-------|--------------|--------------|
| SSO Spike: Microsoft Entra ID research | Wonder Woman | 4h | None | Feasibility report, auth flow diagram |
| SSO Implementation: NextAuth Azure AD provider | Wonder Woman + Batman | 8h | Spike complete | `/api/auth/[...nextauth]/route.ts` |
| Draft Model: Prisma schema design | Batman | 4h | None | `Draft`, `DraftVersion` models |
| Draft API: CRUD endpoints | Batman | 6h | Draft Model | `/api/drafts/*` endpoints |
| WidgetRenderer: Add DraftReview widget type | Superman | 4h | None | Widget infrastructure ready |

**Day 1-2 Deliverables**:
- SSO login flow working (or fallback auth documented)
- Draft/DraftVersion Prisma models migrated
- Draft CRUD API endpoints functional
- Widget infrastructure prepared for new components

#### Day 3-4 (Dec 13-14): Core UI + AI Integration

| Task | Hero | Hours | Dependencies | Deliverables |
|------|------|-------|--------------|--------------|
| Agent Dashboard Page | Superman | 6h | Auth working | `/dashboard/agent` page |
| Ticket List Widget (enhanced) | Superman | 4h | Dashboard page | Filtering, sorting, search |
| Split-View Draft Review UI | Superman | 8h | Draft API | Side-by-side original/draft |
| AI Draft Generation API | Flash + Batman | 8h | Draft Model | `/api/drafts/generate` endpoint |
| Confidence Score Display | Flash | 3h | AI Generation | Visual confidence indicators |
| Text Editor Component | Superman | 4h | Split-View UI | Rich text editing for drafts |

**Day 3-4 Deliverables**:
- Agent dashboard with ticket list
- Split-view draft review interface
- AI draft generation working
- Confidence scores displayed

#### Day 5-6 (Dec 15-16): Workflows + Polish

| Task | Hero | Hours | Dependencies | Deliverables |
|------|------|-------|--------------|--------------|
| Approval Workflow (Approve/Reject/Edit) | Batman | 6h | Draft API | Status transitions, audit log |
| Version History Component | Superman | 4h | DraftVersion model | Version diff view |
| Email Delivery Integration | Cyborg + Batman | 6h | Approval workflow | Zoho Desk `sendReply` |
| Status Sync (Zoho ticket status) | Cyborg | 4h | Email delivery | Auto-update ticket status |
| Quality Indicators | Flash | 3h | AI integration | Sentiment, complexity badges |
| Error Handling + Fallbacks | Cyborg | 4h | All systems | Graceful degradation |
| E2E Testing | Aquaman | 8h | All features | Playwright test suite |

**Day 5-6 Deliverables**:
- Complete approval workflow
- Version history with diff view
- Email delivery functional
- Test coverage >80%

#### Day 7 (Dec 17): Buffer + Demo

| Task | Hero | Hours | Dependencies | Deliverables |
|------|------|-------|--------------|--------------|
| Bug fixes + polish | All | 6h | Testing complete | Stable release |
| Demo preparation | Green Lantern | 3h | All features | Demo script, sample data |
| Documentation | Oracle | 3h | All features | User guide, API docs |
| Deployment to staging | Cyborg | 2h | Testing pass | Vercel staging deploy |

---

## 3. JUSTICE LEAGUE HERO ASSIGNMENTS

### Primary Heroes (Phase 1 Active)

| Hero | Role | PRD Features | Key Skills | Hours |
|------|------|--------------|------------|-------|
| **Superman** (frontend-developer) | UI Lead | 1.2, 1.3 | React 19, Next.js 15, Framer Motion, a11y | 26h |
| **Batman** (backend-developer) | API Lead | 1.1, 1.4, 1.5 | Prisma, REST APIs, PostgreSQL, auth | 24h |
| **Wonder Woman** (security-specialist) | Auth Lead | 1.2.1 | SSO, RBAC, Microsoft Entra ID, NextAuth | 12h |
| **Flash** (data-analysis-specialist) | AI Lead | 1.1, 1.4 | ML, Claude SDK, analytics, NLP | 14h |
| **Cyborg** (devops-engineer) | Infra Lead | 1.5, All | CI/CD, Vercel, Docker, monitoring | 12h |
| **Aquaman** (qa-tester) | QA Lead | All | Playwright, E2E, regression testing | 8h |

### Support Heroes

| Hero | Role | Involvement | Hours |
|------|------|-------------|-------|
| **Green Lantern** (Explore) | Recon & Demo | Codebase analysis, demo prep | 4h |
| **Oracle** | Coordinator | Budget tracking, documentation, reporting | 6h |

---

## 4. TECHNICAL ARCHITECTURE

### New Prisma Models Required

```prisma
// === DRAFT SYSTEM MODELS (NEW FOR V20) ===

model Draft {
  id              String       @id @default(cuid())
  draftId         String       @unique // e.g., "DRAFT-2025-001"
  ticketId        String       // Reference to Zoho ticket
  ticketSubject   String       // Cached ticket subject
  originalContent String       @db.Text // Original customer message
  draftContent    String       @db.Text // AI-generated draft
  finalContent    String?      @db.Text // Approved/edited content
  status          DraftStatus  @default(PENDING_REVIEW)

  // AI Metadata
  confidenceScore Float        @default(0) // 0-100
  category        String?      // Classified ticket category
  sentiment       String?      // positive, neutral, negative
  complexity      String?      // simple, moderate, complex

  // Workflow
  generatedAt     DateTime     @default(now())
  reviewedAt      DateTime?
  approvedAt      DateTime?
  sentAt          DateTime?

  // Agent
  assignedAgentId String?
  reviewedById    String?

  // KB References
  kbArticlesUsed  String[]     // Array of KB article IDs used

  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  // Relations
  versions        DraftVersion[]

  @@index([ticketId])
  @@index([status])
  @@index([assignedAgentId])
  @@map("drafts")
}

enum DraftStatus {
  GENERATING       // AI is generating
  PENDING_REVIEW   // Awaiting agent review
  IN_REVIEW        // Agent is reviewing
  APPROVED         // Approved, pending send
  REJECTED         // Rejected by agent
  SENT             // Sent to customer
  FAILED           // Send failed
}

model DraftVersion {
  id              String   @id @default(cuid())
  draftId         String
  version         Int      @default(1)
  content         String   @db.Text
  editedBy        String?  // Agent who made edits
  editType        String   // "ai_generated", "agent_edit", "regenerate"
  editDistance    Int?     // Characters changed from previous

  createdAt       DateTime @default(now())

  // Relations
  draft           Draft    @relation(fields: [draftId], references: [id], onDelete: Cascade)

  @@unique([draftId, version])
  @@index([draftId])
  @@map("draft_versions")
}

model AgentSession {
  id              String   @id @default(cuid())
  agentId         String   // Links to User.id
  sessionToken    String   @unique
  entraIdToken    String?  @db.Text // Microsoft Entra ID token
  expiresAt       DateTime
  lastActiveAt    DateTime @default(now())

  createdAt       DateTime @default(now())

  @@index([agentId])
  @@map("agent_sessions")
}
```

### API Endpoints to Create

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/[...nextauth]` | * | NextAuth SSO handler |
| `/api/drafts` | GET | List drafts (filtered) |
| `/api/drafts` | POST | Create draft manually |
| `/api/drafts/generate` | POST | Generate AI draft |
| `/api/drafts/[id]` | GET | Get draft by ID |
| `/api/drafts/[id]` | PATCH | Update draft (edit) |
| `/api/drafts/[id]/approve` | POST | Approve draft |
| `/api/drafts/[id]/reject` | POST | Reject draft |
| `/api/drafts/[id]/send` | POST | Send to customer |
| `/api/drafts/[id]/regenerate` | POST | Regenerate with new prompt |
| `/api/drafts/[id]/versions` | GET | Get version history |
| `/api/analytics/drafts` | GET | Draft analytics |

### Component Hierarchy (New Components)

```
src/components/
├── draft/
│   ├── DraftReviewWidget.tsx      # Main split-view component
│   ├── DraftEditor.tsx            # Rich text editor
│   ├── DraftToolbar.tsx           # Approve/Reject/Edit actions
│   ├── ConfidenceScore.tsx        # Visual confidence display
│   ├── QualityIndicators.tsx      # Sentiment, complexity badges
│   └── VersionHistory.tsx         # Version diff sidebar
├── dashboard/
│   ├── AgentDashboard.tsx         # Main agent dashboard layout
│   ├── TicketQueue.tsx            # Enhanced ticket list
│   ├── DraftQueue.tsx             # Pending drafts list
│   └── QuickStats.tsx             # Agent performance stats
└── auth/
    ├── SignInButton.tsx           # SSO sign-in
    └── UserMenu.tsx               # User dropdown with logout
```

---

## 5. PHASE 2 & 3 ROADMAP

### Phase 2: Enhanced AI + Manager Tools (Q1 2026)

**Duration**: 8 weeks
**Estimated Effort**: 320 hours

| Feature | Description | Hero | Effort |
|---------|-------------|------|--------|
| AI Chat Interface | Interactive AI for complex queries | Flash + Superman | 60h |
| Advanced Diagnostics | Deep ticket analysis, root cause | Flash | 40h |
| Jira Integration | Full bidirectional sync | Cyborg + Batman | 50h |
| Manager Dashboard | Team performance, SLA tracking | Superman + Batman | 60h |
| Learning Loop | AI improvement from edits | Flash | 40h |
| Bulk Actions | Multi-ticket operations | Batman + Superman | 30h |
| Advanced Reporting | Custom report builder | Superman + Flash | 40h |

### Phase 3: Full Automation + Executive Tools (Q2 2026)

**Duration**: 12 weeks
**Estimated Effort**: 480 hours

| Feature | Description | Hero | Effort |
|---------|-------------|------|--------|
| Autonomous Resolution | Auto-approve high-confidence drafts | Flash + Batman | 80h |
| C-Suite Dashboard | Executive metrics, ROI tracking | Superman | 60h |
| Custom Reports | Drag-and-drop report builder | Superman + Flash | 80h |
| Predictive Analytics | Ticket volume forecasting | Flash | 60h |
| Multi-Channel | Chat, voice, social media | Cyborg + Batman | 100h |
| AI Training Interface | Human feedback integration | Flash | 60h |
| Enterprise SSO | Multiple IdPs, SCIM provisioning | Wonder Woman | 40h |

---

## 6. IMPACT ANALYSIS

### Business Impact

| Metric | Before V20 | After Phase 1 | After Phase 2 | After Phase 3 |
|--------|------------|---------------|---------------|---------------|
| **First Response Time** | 2-4 hours | <5 min | <2 min | <1 min |
| **Automation Rate** | 0% | 30% | 45% | 40-60% |
| **Agent Productivity** | Baseline | +30% | +35% | +40% |
| **SLA Compliance** | ~80% | 90% | 93% | 95%+ |
| **Customer Satisfaction** | 3.5/5 | 4.0/5 | 4.3/5 | 4.5/5 |
| **Cost per Ticket** | $15 | $10 | $8 | $6 |

### Technical Impact

**Lines of Code to Add** (Phase 1):
- New components: ~2,500 LOC
- API routes: ~1,200 LOC
- Types/interfaces: ~400 LOC
- Tests: ~1,500 LOC
- **Total**: ~5,600 LOC

**New Dependencies**:
```json
{
  "next-auth": "^5.0.0",
  "@azure/msal-node": "^2.x",
  "@tanstack/react-query": "^5.x",
  "diff": "^5.x"
}
```

---

## 7. RISK MITIGATION

| ID | Risk | Impact | Probability | Mitigation | Owner |
|----|------|--------|-------------|------------|-------|
| R1 | SSO Integration Delays | High | Medium | Early spike (Day 1), fallback to email auth | Wonder Woman |
| R2 | Email Delivery Issues | High | Low | Mock mode for demo, Zoho sandbox testing | Cyborg |
| R3 | Phase 1 Deadline | High | Medium | MVP scope locked, defer analytics to Phase 2 | Oracle |
| R4 | Claude API Rate Limits | Medium | Low | Response caching, retry with backoff | Flash |
| R5 | Zoho API Changes | Medium | Low | API version pinning, monitoring | Cyborg |
| R6 | Agent Adoption | Medium | Medium | Training docs, in-app guidance | Oracle |

### Contingency Plans

**If SSO fails (R1)**:
- Day 1-2: Attempt Azure AD integration
- Fallback: Email-based magic link authentication
- Impact: 2-hour delay, reduced enterprise feel

**If Email Delivery fails (R2)**:
- Primary: Zoho Desk `sendReply` API
- Fallback: Mark as "Ready to Send" for manual delivery
- Demo mode: Mock successful send

**If Timeline slips (R3)**:
- Cut: Version history UI (Phase 2)
- Cut: Analytics dashboard (Phase 2)
- Keep: Core draft generation + approval flow

---

## 8. SUCCESS CRITERIA

### Phase 1 Acceptance Criteria

| Feature | Criterion | Pass/Fail |
|---------|-----------|-----------|
| SSO Login | Agent can log in via Microsoft Entra ID | [ ] |
| SSO Fallback | Email-based auth works if SSO fails | [ ] |
| Ticket List | Display 20+ tickets with filter/sort | [ ] |
| AI Draft Generation | Generate draft for test ticket in <30s | [ ] |
| Confidence Score | Display 0-100 score for each draft | [ ] |
| Split-View UI | Side-by-side original + draft view | [ ] |
| Text Editor | Edit draft with undo/redo | [ ] |
| Approve Workflow | Approve button changes status | [ ] |
| Reject Workflow | Reject button + reason required | [ ] |
| Version History | Show edit history (3+ versions) | [ ] |
| Email Delivery | Send approved draft via Zoho | [ ] |
| Status Sync | Ticket status updates after send | [ ] |
| Error Handling | Graceful fallback on API failure | [ ] |

### Quality Gates

- [ ] TypeScript: 0 errors (strict mode)
- [ ] ESLint: 0 errors, <10 warnings
- [ ] E2E Tests: 100% pass rate
- [ ] Test Coverage: >80% for new code
- [ ] Lighthouse Performance: >85
- [ ] Accessibility: WCAG 2.1 AA compliant

---

## 9. COST ANALYSIS (Oracle's Invoice)

### Development Costs (Phase 1)

| Hero | Hours | Role |
|------|-------|------|
| Superman (UI Lead) | 26h | Frontend |
| Batman (API Lead) | 24h | Backend |
| Wonder Woman (Auth Lead) | 12h | Security |
| Flash (AI Lead) | 14h | AI/ML |
| Cyborg (Infra Lead) | 12h | DevOps |
| Aquaman (QA Lead) | 8h | Testing |
| Oracle (Coordination) | 6h | PM |
| **Total** | **102h** | |

### Monthly Operating Costs

| Category | Monthly Cost |
|----------|--------------|
| Claude API | $11.55 |
| Infrastructure (Vercel) | $45.00 |
| **Total** | **$56.55/month** |

### ROI Projection (6 months)

| Metric | Value |
|--------|-------|
| Tickets processed | 3,000 |
| Time saved per ticket | 15 min |
| Total time saved | 750 hours |
| Agent hourly cost | $35 |
| **Gross savings** | **$26,250** |
| **System costs** | **$340** |
| **Net ROI** | **$25,910 (7,621% ROI)** |

---

## 10. APPENDICES

### Appendix A: PRD Feature Mapping

| PRD Feature | V20 Implementation | Status |
|-------------|-------------------|--------|
| 1.1 AI Draft Generation | `/api/drafts/generate` | Planned |
| 1.2.1 SSO Auth | NextAuth + Azure AD | Planned |
| 1.2.2 Ticket List | AgentDashboard + TicketQueue | Planned |
| 1.2.3 Filtering/Sorting | Enhanced TicketListWidget | Planned |
| 1.3.1 Split-View | DraftReviewWidget | Planned |
| 1.3.2 Text Editor | DraftEditor | Planned |
| 1.3.3 Regeneration | `/api/drafts/[id]/regenerate` | Planned |
| 1.3.4 Approval Actions | DraftToolbar | Planned |
| 1.3.5 Version History | VersionHistory component | Planned |
| 1.3.6 Quality Indicators | ConfidenceScore, QualityIndicators | Planned |
| 1.4.1 Version Storage | DraftVersion model | Planned |
| 1.4.2 Edit Analysis | editDistance tracking | Planned |
| 1.4.3 Learning Loop | Phase 2 | Deferred |
| 1.5.1 Email Delivery | Zoho `sendReply` | Planned |
| 1.5.2 Status Sync | Zoho ticket update | Planned |
| 1.5.3 Error Handling | Retry logic, fallbacks | Planned |

### Appendix B: Quick Start Commands

```bash
# Development
npm run dev              # Start dev server (port 3020)
npm run type-check       # TypeScript validation
npm run lint             # ESLint

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema changes
npm run db:studio        # Open Prisma Studio

# Testing
npm run test:e2e         # Playwright tests
npm run test:e2e:headed  # Headed browser testing
```

---

## Document Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Product Manager | Justice League PM | Approved | Dec 11, 2025 |
| Tech Lead | Superman | Pending | |
| Security Lead | Wonder Woman | Pending | |
| Sponsor | Aldrin | Pending | |

---

**Document Version**: 1.0.0
**Classification**: Internal - Implementation Planning
**Generated by**: Justice League AI Agent System
