# ⚡ Quick Reference

**Command cheat sheets and quick lookups**

---

## Development Commands

\`\`\`bash
# Start development
npm run dev              # Dev server (port 3014)

# Code quality
npm run type-check       # TypeScript validation
npm run lint             # ESLint

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:studio        # Open Prisma Studio

# Testing
npm run test:e2e         # Run E2E tests

# Build
npm run build            # Production build
npm run start            # Start production server
\`\`\`

---

## Key URLs

- **Dev**: http://localhost:3014
- **Health**: http://localhost:3014/api/health
- **Production**: https://enterprise-ai-support-v14.vercel.app

---

## Environment Variables

See `.env.example` for complete list.

**Required**:
- \`DATABASE_URL\` - PostgreSQL connection

**Optional**:
- \`ANTHROPIC_API_KEY\` - Claude AI
- \`ZOHO_*\` - Zoho Desk integration
- \`JIRA_*\` - Jira integration

---

*More quick references will be added.*
