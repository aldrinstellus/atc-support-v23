# Enterprise AI Support V14 - Documentation Index

**Version**: 14.0.0
**Status**: Production-Ready Unified Version
**Last Updated**: 2025-10-13

---

## 🎯 Quick Navigation

| Category | Description | Key Files |
|----------|-------------|-----------|
| [🚀 Setup](#setup) | Installation and configuration guides | QUICK-START, DEVELOPMENT-SETUP |
| [📦 Deployment](#deployment) | Production deployment procedures | DEPLOYMENT-GUIDE, PRODUCTION-DEPLOYMENT |
| [🔗 Integrations](#integrations) | External service integrations | ZOHO, Supabase, Webhooks |
| [🏗️ Architecture](#architecture) | System design and technical specs | BUILD-DIFFERENCES, DASHBOARD-SCENARIOS |
| [🎬 Demos](#demos) | Demo scenarios and use cases | Password Reset, Multi-System Access |
| [🧪 Testing](#testing) | Test strategies and results | E2E, Playwright, Test Results |
| [📚 Reference](#reference) | Additional documentation | PROJECT-STATUS, SUMMARY |

---

## 🚀 Setup

**Getting started with Enterprise AI Support V14**

### Installation Guides
- **[QUICK-START.md](setup/QUICK-START.md)** - 5-minute setup guide for new developers
- **[DEVELOPMENT-SETUP.md](setup/DEVELOPMENT-SETUP.md)** - Detailed local development environment setup
- **[SETUP_FOR_DEVELOPER.md](setup/SETUP_FOR_DEVELOPER.md)** - Developer-specific configuration
- **[CLAUDE-SDK-SETUP.md](setup/CLAUDE-SDK-SETUP.md)** - Anthropic Claude AI integration setup
- **[HOW_TO_SHARE.md](setup/HOW_TO_SHARE.md)** - Sharing and collaboration guidelines

### Environment Configuration
- **Port**: 3014 (development), 3014 (production)
- **Database**: Supabase PostgreSQL
- **AI**: Anthropic Claude 3.5 Sonnet
- **Integrations**: Zoho Desk, Vercel, GitHub

---

## 📦 Deployment

**Production deployment and infrastructure**

### Deployment Guides
- **[DEPLOYMENT-GUIDE.md](deployment/DEPLOYMENT-GUIDE.md)** - Complete deployment walkthrough
- **[PRODUCTION-DEPLOYMENT.md](deployment/PRODUCTION-DEPLOYMENT.md)** - Production-specific configuration
- **[DEPLOYMENT-CHECKLIST.md](deployment/DEPLOYMENT-CHECKLIST.md)** - Pre-deployment verification checklist
- **[DEPLOYMENT-SUMMARY.md](deployment/DEPLOYMENT-SUMMARY.md)** - Deployment status and history

### Infrastructure
- **Platform**: Vercel (primary)
- **Database**: Supabase (PostgreSQL with connection pooling)
- **CDN**: Vercel Edge Network
- **Monitoring**: Built-in Vercel Analytics

---

## 🔗 Integrations

**External service integrations and APIs**

### Zoho Desk Integration
- **[ZOHO-INTEGRATION-COMPLETE.md](integrations/ZOHO-INTEGRATION-COMPLETE.md)** - Complete Zoho Desk setup
- **[ZOHO-WEBHOOK-SETUP.md](integrations/ZOHO-WEBHOOK-SETUP.md)** - Webhook configuration guide
- **[DUAL-WEBHOOK-CONFIGURATION.md](integrations/DUAL-WEBHOOK-CONFIGURATION.md)** - Multi-webhook setup
- **[WEBHOOK-SETUP-SUMMARY.md](integrations/WEBHOOK-SETUP-SUMMARY.md)** - Quick webhook reference
- **[How the Zoho Desk AI Support Agent Works.md](integrations/How%20the%20Zoho%20Desk%20AI%20Support%20Agent%20Works.md)** - AI agent workflow

### Integration Features
- ✅ Real-time webhook processing
- ✅ AI-powered ticket classification
- ✅ Automatic agent assignment
- ✅ Password reset workflows
- ✅ Multi-scenario support

---

## 🏗️ Architecture

**System design, technical specifications, and project structure**

### Architecture Documentation
- **[BUILD-DIFFERENCES.md](architecture/BUILD-DIFFERENCES.md)** - V11 vs V12 vs V14 comparison
- **[DASHBOARD-SCENARIOS.md](architecture/DASHBOARD-SCENARIOS.md)** - Dashboard design patterns
- **[MULTI-SCENARIO-IMPLEMENTATION-STATUS.md](architecture/MULTI-SCENARIO-IMPLEMENTATION-STATUS.md)** - Feature implementation tracking
- **[MULTI-SCENARIO-TESTING-GUIDE.md](architecture/MULTI-SCENARIO-TESTING-GUIDE.md)** - Multi-scenario testing approach

### Technical Stack
- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS 4 (Solar Dusk theme)
- **Database**: Prisma ORM + PostgreSQL
- **AI**: Anthropic Claude SDK
- **Real-time**: WebSocket + Server-Sent Events

---

## 🎬 Demos

**Demo scenarios, workflows, and example use cases**

### Interactive Demos
- **[ACCOUNT-UNLOCK-DEMO.md](demos/ACCOUNT-UNLOCK-DEMO.md)** - Account unlock workflow
- **[PASSWORD-RESET-DEMO.md](demos/PASSWORD-RESET-DEMO.md)** - Password reset automation
- **[MULTI-SYSTEM-ACCESS-DEMO.md](demos/MULTI-SYSTEM-ACCESS-DEMO.md)** - Cross-system access scenarios
- **[INTERACTIVE-UPDATE-DEMO.md](demos/INTERACTIVE-UPDATE-DEMO.md)** - Real-time update demonstrations
- **[ENRICHMENT-SUMMARY.md](demos/ENRICHMENT-SUMMARY.md)** - Data enrichment examples

### Demo Resources
- **[DEMO QUESTIONS.md](demos/DEMO%20QUESTIONS.md)** - Common demo questions
- **[User QNA.md](demos/User%20QNA.md)** - User Q&A scenarios
- **[USER-PROMPTS.md](demos/USER-PROMPTS.md)** - Sample user prompts
- **[aldo demo.md](demos/aldo%20demo.md)** - Aldo demo walkthrough
- **[aldo demo_v12-1.md](demos/aldo%20demo_v12-1.md)** - Extended Aldo demo
- **[aldrin demo- v12.md](demos/aldrin%20demo-%20v12.md)** - Aldrin demo scenarios

---

## 🧪 Testing

**Test strategies, E2E testing, and quality assurance**

### Testing Documentation
- **[E2E-TEST-QUERIES-REFERENCE.md](testing/E2E-TEST-QUERIES-REFERENCE.md)** - End-to-end test queries
- **[E2E-TESTER-AGENT-TEAM-GUIDE.md](testing/E2E-TESTER-AGENT-TEAM-GUIDE.md)** - E2E testing team guide
- **[TESTING-SESSION-RESULTS.md](testing/TESTING-SESSION-RESULTS.md)** - Test session reports
- **[POST-DEPLOYMENT-TEST-CHECKLIST.md](testing/POST-DEPLOYMENT-TEST-CHECKLIST.md)** - Deployment verification tests
- **[TEST-RESULTS-2025-01-04.md](testing/TEST-RESULTS-2025-01-04.md)** - Historical test results

### Testing Stack
- **E2E**: Playwright
- **Unit**: Jest (planned)
- **Integration**: Playwright API testing
- **Performance**: Lighthouse (planned)

---

## 📚 Reference

**Additional documentation and project resources**

### Project Documentation
- **[PROJECT-STATUS.md](reference/PROJECT-STATUS.md)** - Current project status
- **[SUMMARY.md](reference/SUMMARY.md)** - Comprehensive project summary
- **[DUPLICATE-CLEANUP-SUMMARY.md](reference/DUPLICATE-CLEANUP-SUMMARY.md)** - Codebase cleanup history
- **[SEED-DATA.md](reference/SEED-DATA.md)** - Database seed data reference

### Root Documentation
- **[README.md](../README.md)** - Project overview and features
- **[CHANGELOG.md](../CHANGELOG.md)** - Version history and release notes
- **[CLAUDE.md](../CLAUDE.md)** - Claude Code assistant instructions

---

## 🔑 Key Resources

### Development
```bash
# Start development server
npm run dev              # http://localhost:3014

# With webhooks
npm run dev:webhooks     # Includes ngrok tunnel

# Database
npm run db:studio        # Prisma Studio
```

### Demo Pages
- **C-Level Executive**: http://localhost:3014/demo/c-level
- **CS Manager**: http://localhost:3014/demo/cs-manager
- **Support Agent**: http://localhost:3014/demo/support-agent

### Credentials
All credentials stored in `.env.local`:
- Anthropic Claude API
- Supabase Database
- Zoho Desk Integration
- Vercel Deployment

---

## 📊 Project Statistics

- **Version**: 14.0.0
- **Documentation Files**: 50+ organized files
- **API Routes**: 8 specialized endpoints
- **Integration Points**: 4 (Claude, Supabase, Zoho, Vercel)
- **Personas**: 3 (C-Level, CS Manager, Support Agent)
- **Widgets**: 19 specialized components

---

## 🎯 Quick Start

**New to the project? Start here:**

1. **[Setup Guide](setup/QUICK-START.md)** - Get running in 5 minutes
2. **[Development Setup](setup/DEVELOPMENT-SETUP.md)** - Configure your environment
3. **[Architecture Overview](architecture/BUILD-DIFFERENCES.md)** - Understand the system
4. **[Demo Walkthrough](demos/PASSWORD-RESET-DEMO.md)** - See it in action

---

## 📞 Support

- **Issues**: Create GitHub issues for bugs or features
- **Documentation**: All guides in `/docs/` folder
- **Development**: See CLAUDE.md for Claude Code integration

---

**Last Updated**: 2025-10-13
**Maintained By**: Development Team
**Status**: ✅ Production Ready
