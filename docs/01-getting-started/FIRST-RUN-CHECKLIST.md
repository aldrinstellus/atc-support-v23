# ✅ First Run Checklist

**Verification steps after initial setup**

---

## Quick Verification

After running the Quick Start Guide, verify:

### 1. Development Server
```bash
npm run dev
```
✅ Server starts without errors on port 3014

### 2. Health Check
```bash
curl http://localhost:3014/api/health
```
✅ Returns JSON with "status": "healthy"

### 3. TypeScript
```bash
npm run type-check
```
✅ 0 errors

### 4. ESLint
```bash
npm run lint
```
✅ <10 warnings

### 5. Build
```bash
npm run build
```
✅ Build succeeds

### 6. Database
```bash
npx prisma studio
```
✅ Prisma Studio opens, shows tables

### 7. Demo Pages
- http://localhost:3014/demo/c-level ✅
- http://localhost:3014/demo/cs-manager ✅
- http://localhost:3014/demo/support-agent ✅

---

## Detailed Checklist

*This document is being expanded. For troubleshooting, see:*
- **[Troubleshooting Guide](../11-operations/TROUBLESHOOTING.md)**
- **[Operations Manual](../11-operations/OPERATIONS-MANUAL.md)**
