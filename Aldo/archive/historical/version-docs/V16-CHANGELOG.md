# V16 CHANGELOG - Client Feedback Phase 2

**Version**: 16.0.0
**Date**: 2025-11-11
**Base**: Cloned from V15-Presentation (all Phase 1 feedback complete)

---

## 🎯 NEW FEATURES (Phase 2 Client Feedback)

### 1. **Video Title Component** (Pending Implementation)
**Status**: 🔄 PENDING
**Priority**: HIGH
**Client Request**: "Add vid. title on the top"

**Planned Implementation**:
- Component: `/src/components/branding/VideoTitle.tsx`
- Title: "AI-Enhanced Customer Support Services" (pending client confirmation)
- Position: Top of page, sticky positioning
- Styling: CTIS branding colors
- Responsive: Mobile-friendly design

---

### 2. **Keyword Fly-In/Out Animations** (Pending Implementation)
**Status**: 🔄 PENDING
**Priority**: MEDIUM
**Client Request**: "For first few minutes, add key words fly in/out on screen during the initial talk"

**Planned Implementation**:
- Component: `/src/components/presentation/KeywordAnimations.tsx`
- Keywords (5-7):
  - "AI-Enhanced"
  - "Cost Savings"
  - "Performance"
  - "WCAG Compliant"
  - "Real-Time"
  - "Enterprise-Ready"
- Animation: Framer Motion staggered animations
- Timing: Fly-in during first 30 seconds of Slide 1, fly-out before Slide 2
- Accessibility: `prefers-reduced-motion` support

---

## ✅ PRESERVED FROM V15 (All Phase 1 Feedback Complete)

1. ✅ **CTIS Logo + WTC Title** (top-left corner)
2. ✅ **Tagline Update** ("AI-enhanced customer support services - saving costs and improving performance")
3. ✅ **Persona Names** (Jennifer Anderson, David Miller, Christopher Hayes, Jordan Taylor)
4. ✅ **Closed Captions** (enabled by default with toggle)
5. ✅ **Narrator Toggle** (hidden by default - professional mode)
6. ✅ **Intro Slides** (4-slide carousel with auto-advance)
7. ✅ **Use Cases** (8 comprehensive scenarios with ROI)
8. ✅ **Gender-Appropriate Avatars** (male/female DiceBear styles)

---

## 📊 PROJECT STATUS

### **Infrastructure**
- ✅ GitHub Repository: https://github.com/aldrinstellus/v16-presentation
- ✅ Vercel Deployment: https://v15-presentation-f0ymbkt1n-aldos-projects-8cf34b67.vercel.app
- ✅ Local Dev Server: http://localhost:3017
- ✅ Port: 3017 (v15=3016, v14=3014)

### **Development Status**
- [x] Project cloned from v15
- [x] Package.json updated (name, version, port)
- [x] Git repository initialized
- [x] GitHub repository created
- [x] Pushed to GitHub
- [x] Deployed to Vercel
- [ ] VideoTitle component (pending)
- [ ] KeywordAnimations component (pending)
- [ ] Chrome DevTools MCP testing
- [ ] Savepoint creation

---

## 🔄 NEXT STEPS

### **Immediate Tasks**:
1. Create VideoTitle component (30 min)
2. Create KeywordAnimations component (1.5 hours)
3. Test with Chrome DevTools MCP (30 min)
4. Create comprehensive savepoint
5. Git commit + push
6. Redeploy to Vercel

### **Pending Client Clarification**:
- Video title text (using "AI-Enhanced Customer Support Services" as placeholder)

---

## 📈 VERSION COMPARISON

| Feature | V15 | V16 |
|---------|-----|-----|
| CTIS Logo + WTC | ✅ | ✅ |
| Tagline Update | ✅ | ✅ |
| Persona Names | ✅ | ✅ |
| CC Default On | ✅ | ✅ |
| Narrator Toggle | ✅ | ✅ |
| Intro Slides | ✅ | ✅ |
| Use Cases | ✅ | ✅ |
| Gender Avatars | ✅ | ✅ |
| **Video Title** | ❌ | 🔄 PENDING |
| **Keyword Animations** | ❌ | 🔄 PENDING |

---

## 🎨 TECHNICAL DETAILS

### **Port Configuration**:
- Dev Server: 3017
- Start Script: `npm run dev` (Next.js 15 + Turbopack)
- Build: `npm run build`

### **Dependencies** (Same as V15):
- Next.js 15.5.4
- React 19.1.0
- TypeScript 5.x
- Framer Motion 12.23.22
- Tailwind CSS 4.x
- Radix UI components

### **New Components** (Planned):
- `/src/components/branding/VideoTitle.tsx`
- `/src/components/presentation/KeywordAnimations.tsx`

---

## 📝 NOTES

- V15 remains stable at https://v15-presentation-fvu01dxs4-aldos-projects-8cf34b67.vercel.app
- V16 is safe testing environment for Phase 2 features
- All v15 features preserved and functional
- Easy rollback to v15 if needed

---

**Created By**: Oracle
**Date**: 2025-11-11
**Next Update**: After VideoTitle + KeywordAnimations implementation
