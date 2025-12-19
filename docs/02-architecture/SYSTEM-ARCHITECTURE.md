# 🏗️ System Architecture

**High-level architecture overview of Enterprise AI Support V14**

---

## Architecture Overview

Enterprise AI Support V14 is built as a modern, scalable web application with the following layers:

### 1. Presentation Layer
- **Next.js 15** with App Router
- **React 19** for UI components
- **Tailwind CSS 4** for styling
- **Framer Motion** for animations

### 2. API Layer
- **Next.js API Routes** (30+ endpoints)
- **Server-Side Events (SSE)** for streaming
- **RESTful API** design
- **WebSocket** support for real-time updates

### 3. Business Logic Layer
- **AI Workflow Engine** (7 automated scenarios)
- **Widget Rendering System** (19 specialized widgets)
- **Multi-Persona RBAC** (4 personas)
- **Query Detection** & routing

### 4. Integration Layer
- **Anthropic Claude AI** - AI processing
- **Zoho Desk** - Ticket management
- **Supabase PostgreSQL** - Database
- **Jira** (optional) - Issue tracking
- **Dify KB** (optional) - Knowledge base

### 5. Data Layer
- **Prisma ORM** - Database abstraction
- **PostgreSQL 16** - Primary database
- **Redis** (prepared) - Caching & rate limiting

---

## Key Design Decisions

1. **Server-Side Rendering (SSR)** - Fast initial page load
2. **Streaming Responses** - Real-time AI interaction
3. **Component-Based Architecture** - Reusable UI components
4. **Type-Safe Development** - TypeScript strict mode
5. **Automated Workflows** - AI-powered ticket processing

---

*Full architecture documentation coming soon. Key resources:*
- **[Technical Architecture](./TECHNICAL-ARCHITECTURE.md)** - Detailed technical design
- **[Data Flow](./DATA-FLOW.md)** - System data flow diagrams
- **[Design Patterns](./DESIGN-PATTERNS.md)** - Patterns used
- **Legacy docs**: `/Aldo/` for historical context
