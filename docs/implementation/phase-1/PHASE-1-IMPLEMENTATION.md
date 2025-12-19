# Phase 1: Core AI Agent with Human-in-the-Loop

**Timeline**: December 9-17, 2025 (6 Days)
**Status**: In Progress
**Last Updated**: December 11, 2025

## Executive Summary

Phase 1 delivers the foundational AI-powered draft generation system with human oversight. Support agents can review, edit, approve, or reject AI-generated responses before sending to customers via Zoho Desk integration.

## Completed Work

### 1. Database Schema (Prisma + Supabase)

**Location**: `prisma/schema.prisma`

```prisma
model Draft {
  id              String       @id @default(cuid())
  draftId         String       @unique  // External ID: DRF-{timestamp}
  ticketId        String
  ticketSubject   String
  customerName    String?
  customerEmail   String?
  originalContent String       @db.Text  // Customer's original message
  draftContent    String       @db.Text  // AI-generated response
  finalContent    String?      @db.Text  // Edited content (if modified)
  status          DraftStatus  @default(PENDING_REVIEW)
  confidenceScore Float        @default(0)  // 0-100
  category        String?      // ticket_category
  priority        Priority     @default(MEDIUM)
  sentiment       String?      // positive/neutral/negative
  complexity      String?      // simple/moderate/complex
  tone            String?      // formal/friendly/technical
  generatedAt     DateTime     @default(now())
  reviewedAt      DateTime?
  approvedAt      DateTime?
  sentAt          DateTime?
  rejectedAt      DateTime?
  assignedAgentId String?
  reviewedById    String?
  approvedById    String?
  rejectionReason String?      @db.Text
  kbArticlesUsed  String[]     // Knowledge base article IDs
  sourcesUsed     Json?        // External sources metadata
  modelVersion    String?      // claude-3-5-sonnet-20241022
  promptTokens    Int?
  completionTokens Int?
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
  versions        DraftVersion[]
}

enum DraftStatus {
  GENERATING      // AI is generating
  PENDING_REVIEW  // Waiting for agent review
  IN_REVIEW       // Agent is currently reviewing
  APPROVED        // Ready to send
  REJECTED        // Needs regeneration
  SENT            // Delivered to customer
  FAILED          // Send failed
  ESCALATED       // Escalated to human
}

model DraftVersion {
  id              String    @id @default(cuid())
  draftId         String
  version         Int
  content         String    @db.Text
  editedBy        String?
  editedByName    String?
  editType        EditType?
  editSummary     String?
  editDistance    Int?      // Character diff
  changePercent   Float?    // % changed
  confidenceScore Float?
  tone            String?
  createdAt       DateTime  @default(now())
  draft           Draft     @relation(...)
}
```

### 2. TypeScript Types

**Location**: `src/types/draft.ts`

Key types created:
- `DraftStatus` - All possible draft states
- `EditType` - Types of edits (AGENT_EDIT, AI_REGENERATE, TONE_CHANGE)
- `DraftTone` - Tone options (formal, friendly, technical)
- `TicketCategory` - Support categories
- `Sentiment`, `Complexity` - Analysis types
- `Draft`, `DraftVersion` - Main interfaces
- API request/response types
- Confidence score utilities

### 3. API Endpoints

**Base Path**: `/api/drafts`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/drafts` | GET | List drafts with filtering, pagination |
| `/api/drafts` | POST | Create draft manually |
| `/api/drafts/generate` | POST | AI generate draft from ticket |
| `/api/drafts/[id]` | GET | Get single draft with versions |
| `/api/drafts/[id]` | PATCH | Update draft content/status |
| `/api/drafts/[id]` | DELETE | Delete draft |
| `/api/drafts/[id]/approve` | POST | Approve draft for sending |
| `/api/drafts/[id]/reject` | POST | Reject with reason |
| `/api/drafts/[id]/send` | POST | Send via Zoho Desk |
| `/api/drafts/[id]/regenerate` | POST | Regenerate with new parameters |
| `/api/drafts/[id]/versions` | GET | Get version history |

### 4. AI Draft Generation

**Location**: `src/app/api/drafts/generate/route.ts`

Features:
- Claude SDK integration (`claude-3-5-sonnet-20241022`)
- Demo mode with mock responses
- Keyword-based ticket classification
- Automatic confidence scoring (70-95)
- Version tracking from generation
- Token usage tracking

Classification categories:
- password_reset (90-95 confidence)
- account_access (85-92 confidence)
- software_installation (80-90 confidence)
- hardware_issue (75-88 confidence)
- network_connectivity (78-90 confidence)
- general_inquiry (70-85 confidence)

## In Progress

### 5. UI Components

**Agent Dashboard** (`/dashboard/agent`)
- Queue of pending drafts
- Filter by status, priority, category
- Sort by age, confidence
- Bulk actions

**Draft Review Widget** (`src/components/widgets/DraftReviewWidget.tsx`)
- Split-view: Original ticket | AI Draft
- Inline editing
- Tone selector
- Regenerate button
- Approve/Reject actions
- Confidence indicator

**Version History** (`src/components/widgets/VersionHistoryWidget.tsx`)
- Timeline of all edits
- Diff view between versions
- Restore previous version

### 6. SSO Authentication

**Status**: Pending

Implementation plan:
1. NextAuth.js with Azure AD provider
2. Fallback to email/password for demo
3. Agent session tracking
4. Role-based access (Agent, Supervisor, Admin)

## API Usage Examples

### Generate Draft
```typescript
POST /api/drafts/generate
{
  "ticketId": "TICK-001",
  "ticketSubject": "Cannot access portal",
  "customerEmail": "john@company.com",
  "customerName": "John Doe",
  "originalContent": "I've been trying to log in but keep getting an error message...",
  "priority": "high"
}

Response:
{
  "success": true,
  "draft": {
    "id": "clx...",
    "draftId": "DRF-1733961234567",
    "status": "PENDING_REVIEW",
    "confidenceScore": 87.5,
    "category": "account_access",
    "draftContent": "Thank you for reaching out..."
  }
}
```

### Approve Draft
```typescript
POST /api/drafts/{id}/approve
{
  "approvedById": "agent-123",
  "approvedByName": "Jane Agent",
  "finalContent": "Optional edited content..."
}
```

### Regenerate with Different Tone
```typescript
POST /api/drafts/{id}/regenerate
{
  "tone": "technical",
  "additionalContext": "Customer is IT admin",
  "regeneratedBy": "agent-123"
}
```

## Workflow Diagram

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│   Ticket    │────▶│  AI Generate │────▶│   PENDING    │
│   Arrives   │     │    Draft     │     │   REVIEW     │
└─────────────┘     └──────────────┘     └──────────────┘
                                                │
                    ┌───────────────────────────┼───────────────────────────┐
                    │                           │                           │
                    ▼                           ▼                           ▼
            ┌──────────────┐           ┌──────────────┐           ┌──────────────┐
            │   APPROVED   │           │  IN_REVIEW   │           │   REJECTED   │
            │              │           │   (Agent     │           │   (With      │
            │              │           │   Editing)   │           │   Reason)    │
            └──────────────┘           └──────────────┘           └──────────────┘
                    │                           │                           │
                    │                           │                           │
                    ▼                           ▼                           ▼
            ┌──────────────┐           ┌──────────────┐           ┌──────────────┐
            │    SEND      │           │   Version    │           │  Regenerate  │
            │   via Zoho   │           │   Created    │           │   AI Draft   │
            └──────────────┘           └──────────────┘           └──────────────┘
                    │                                                       │
                    ▼                                                       │
            ┌──────────────┐                                               │
            │     SENT     │◀──────────────────────────────────────────────┘
            │              │
            └──────────────┘
```

## Remaining Tasks

### Day 3-4 (Dec 13-14)
- [ ] Create Agent Dashboard page
- [ ] Build DraftReviewWidget component
- [ ] Add to WidgetRenderer
- [ ] Implement SSO (NextAuth + Azure AD)

### Day 5-6 (Dec 15-17)
- [ ] Version History UI
- [ ] Confidence Score component
- [ ] E2E tests with Playwright
- [ ] Demo mode testing
- [ ] Documentation completion

## Files Created

```
prisma/
└── schema.prisma (modified - added Draft models)

src/
├── types/
│   └── draft.ts (new)
└── app/
    └── api/
        └── drafts/
            ├── route.ts (GET, POST)
            ├── generate/
            │   └── route.ts (POST)
            └── [id]/
                ├── route.ts (GET, PATCH, DELETE)
                ├── approve/
                │   └── route.ts (POST)
                ├── reject/
                │   └── route.ts (POST)
                ├── send/
                │   └── route.ts (POST)
                ├── regenerate/
                │   └── route.ts (POST)
                └── versions/
                    └── route.ts (GET)

docs/
└── implementation/
    ├── README.md
    └── phase-1/
        └── PHASE-1-IMPLEMENTATION.md (this file)
```

## Environment Variables

```env
# Required for AI
ANTHROPIC_API_KEY=sk-ant-api03-...

# Database (Supabase)
DATABASE_URL=postgresql://...

# Demo mode (set to 'true' for mock responses)
DEMO_MODE=true

# Zoho Desk (for send functionality)
ZOHO_ORG_ID=...
ZOHO_ACCESS_TOKEN=...
```

## Testing Notes

### Demo Mode
Set `DEMO_MODE=true` in `.env.local` to test without:
- Claude API calls (uses mock responses)
- Zoho Desk integration (simulates send)

### Manual Testing
1. Generate draft: `POST /api/drafts/generate`
2. List drafts: `GET /api/drafts`
3. Review draft: `GET /api/drafts/{id}`
4. Approve: `POST /api/drafts/{id}/approve`
5. Send: `POST /api/drafts/{id}/send`

---

**Next Steps**: Build Agent Dashboard UI and DraftReviewWidget component.
