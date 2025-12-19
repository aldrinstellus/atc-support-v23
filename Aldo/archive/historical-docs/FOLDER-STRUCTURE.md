# V15 Folder Structure Guide

**Last Updated**: 2025-11-07
**Oracle Status**: ✅ Optimized & Professional

---

## 📂 Root Directory Organization

This project follows **Next.js 15 best practices** with a clean, professional folder structure.

### Essential Documentation (Root)
```
📄 README.md                    # Quick start guide
📄 CLAUDE.md                    # Project documentation for Claude Code
📄 DOCUMENTATION-POLICY.md      # SDLC documentation standards
📄 FOLDER-STRUCTURE.md          # This file - navigation guide
```

### Configuration Files (Root - Required by Tools)

**Build & Runtime**:
```
📄 package.json                 # Dependencies & scripts
📄 package-lock.json            # Dependency lock file
📄 tsconfig.json                # TypeScript configuration
📄 tsconfig.tsbuildinfo         # TypeScript build cache
📄 next.config.ts               # Next.js configuration
📄 next-env.d.ts                # Next.js type definitions
```

**Code Quality**:
```
📄 eslint.config.mjs            # ESLint rules
📄 postcss.config.mjs           # PostCSS/Tailwind config
```

**Testing**:
```
📄 jest.config.js               # Jest unit test config
📄 jest.setup.js                # Jest setup file
📄 playwright.config.ts         # Playwright E2E config
📄 lighthouserc.js              # Lighthouse performance config
```

**Deployment**:
```
📄 Dockerfile                   # Docker container definition
📄 docker-compose.yml           # Docker compose orchestration
📄 vercel.json                  # Vercel deployment config
```

---

## 📁 Source Code (`/src`)

**Primary application code** - See CLAUDE.md for detailed breakdown.

```
src/
├── app/                        # Next.js 15 App Router
│   ├── page.tsx               # Main chat interface
│   ├── layout.tsx             # Root layout
│   ├── globals.css            # Solar Dusk theme
│   ├── api/                   # API routes
│   ├── demo/                  # Demo persona pages
│   ├── workflows/             # Workflow management
│   └── dashboard/             # Dashboard views
├── components/                 # React components
│   ├── widgets/               # 19 specialized widgets
│   ├── ui/                    # Radix UI components
│   ├── chat/                  # Chat interface
│   ├── layout/                # Layout components
│   ├── presentation/          # V15: Video/slide system
│   ├── accessibility/         # V15: CC, zoom, WCAG
│   ├── demo/                  # V15: Demo controls
│   └── branding/              # V15: CTIS/ITSS branding
├── config/                     # Configuration
│   ├── variants/              # V15: Demo variants
│   └── personas.ts            # Persona configs
├── types/                      # TypeScript definitions
│   ├── persona.ts
│   ├── widget.ts
│   ├── workflow.ts
│   ├── brand/                 # V15: Brand types
│   ├── presentation/          # V15: Presentation types
│   └── demo/                  # V15: Demo types
├── hooks/                      # React hooks
│   ├── use-persona.ts
│   ├── demo/                  # V15: Demo hooks
│   └── accessibility/         # V15: A11y hooks
├── lib/                        # Utilities
│   ├── query-detection.ts
│   └── integrations/
├── data/                       # Mock data
│   └── demo-widget-data.ts
└── contexts/                   # React contexts
```

---

## 📚 Documentation (`/docs`)

**SDLC-style documentation** organized into 15 categories:

```
docs/
├── 00-DOCUMENTATION-INDEX.md   # Master navigation (START HERE)
├── 01-getting-started/         # Quick start, setup, prerequisites
├── 02-architecture/            # System design, patterns, data flow
├── 03-api/                     # API reference, authentication
├── 04-database/                # Schema, migrations, Prisma
├── 05-integrations/            # Claude AI, Zoho, Supabase
├── 06-features/                # Multi-persona, widgets, AI workflows
├── 07-components/              # 19 widgets, UI components, theme
├── 08-development/             # Developer guide, code structure
├── 09-testing/                 # E2E, QA, test data
├── 10-deployment/              # Docker, Vercel, CI/CD
├── 11-operations/              # Monitoring, logging, troubleshooting
├── 12-security/                # Security architecture, headers
├── 13-performance/             # Optimization, benchmarks
├── 14-workflows/               # 7 AI workflow scenarios
└── 15-reference/               # Glossary, changelog, FAQ
```

---

## 🗄️ Archive (`/archive`)

**Historical & reference content** - NOT in active development:

```
archive/
├── analysis/                   # Historical analysis
├── config/                     # Old config files (package.json.updated, etc.)
├── notes/                      # Development notes
├── references/                 # Reference materials
├── savepoints/                 # Project savepoints & summaries
├── screenshots/                # Screenshots (v15-homepage-initial.png, etc.)
├── ui-experiments/             # Old UI experiments
└── v14-historical-docs/        # V14 documentation
```

---

## 🧪 Testing (`/__tests__` & `/tests`)

**Comprehensive testing infrastructure**:

```
__tests__/                      # Jest unit & integration tests
├── unit/
│   ├── components/
│   └── lib/
├── integration/
│   └── api/
└── security/

tests/                          # Playwright E2E tests
└── e2e/
    ├── accessibility/
    └── visual-regression/
```

---

## 🗃️ Database (`/prisma`)

**Prisma ORM schema & migrations**:

```
prisma/
├── schema.prisma              # Database schema (15+ models)
└── migrations/                # Migration history
```

---

## 🌐 Public Assets (`/public`)

**Static files served at `/`**:

```
public/
├── images/
├── icons/
└── fonts/
```

---

## 🔧 Scripts (`/scripts`)

**Build & deployment automation**:

```
scripts/
├── start-dev.sh
├── stop-dev.sh
└── get-webhook-url.sh
```

---

## 📦 Dependencies (`/node_modules`)

**Generated folder** - DO NOT EDIT. Install with `npm install`.

---

## ✅ Why This Structure Works

### Industry Standard
- **Config files at root**: Expected by all tools (Next.js, TypeScript, ESLint, Jest, Playwright)
- **`/src` for code**: Clean separation of source vs configuration
- **`/docs` for documentation**: SDLC-compliant organization
- **`/archive` for history**: Keeps root clean while preserving context

### Professional Benefits
- ✅ **Immediate tool compatibility**: No configuration overrides needed
- ✅ **Clear navigation**: Folders named for purpose
- ✅ **Scalable**: Easy to add new features without restructuring
- ✅ **Version control friendly**: `.gitignore` handles build artifacts
- ✅ **Onboarding friendly**: New developers understand structure instantly

### Zero Breaking Changes
- ✅ **Dev server works**: `npm run dev` on port 3015
- ✅ **Build works**: `npm run build` with Turbopack
- ✅ **Tests work**: Jest & Playwright configured correctly
- ✅ **Deployment works**: Docker, Vercel configs at root
- ✅ **All imports valid**: No path changes needed

---

## 🚀 Quick Navigation

**Starting development**:
1. Read `README.md` for 5-minute setup
2. Check `CLAUDE.md` for full project documentation
3. Browse `/docs/00-DOCUMENTATION-INDEX.md` for deep dive
4. Explore `/src/components` for component examples

**Adding features**:
1. New components → `/src/components/[category]/`
2. New types → `/src/types/`
3. New API routes → `/src/app/api/`
4. New documentation → `/docs/[category]/`

**Finding things**:
- Config files? **Check root directory**
- Component code? **Check `/src/components/`**
- Documentation? **Check `/docs/`**
- Historical stuff? **Check `/archive/`**
- Test files? **Check `/__tests__/` or `/tests/`**

---

**Oracle Recommendation**: This structure is **production-ready** and follows **Next.js 15 best practices**. No reorganization needed.

**Last Verified**: 2025-11-07 | **Dev Server**: ✅ Running on port 3015
