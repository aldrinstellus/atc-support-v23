# V15 A/B Testing: Development vs Presentation Mode

**Last Updated**: 2025-11-07
**Strategy**: Parallel Development with Independent Versions

---

## 📋 Overview

This folder (`v15-presentation`) is an **A/B testing variant** of the original V15 application. It allows us to develop and test presentation mode features without affecting the stable V15 development version.

### Why A/B Testing?

- ✅ **Risk Mitigation**: Keep original V15 stable while experimenting
- ✅ **Side-by-Side Comparison**: Run both versions simultaneously for UX testing
- ✅ **Rollback Safety**: Can revert to v15-development anytime
- ✅ **Feature Isolation**: Presentation mode features developed independently
- ✅ **Client Demo**: Show both versions to ATC for feedback

---

## 🔀 Version Comparison

| Feature | V15 Development (Original) | V15 Presentation (This Folder) |
|---------|---------------------------|--------------------------------|
| **Port** | 3015 | 3016 |
| **Package Name** | `enterprise-ai-support-v15-development` | `enterprise-ai-support-v15-presentation` |
| **Version** | 15.0.0 | 15.1.0 |
| **Status** | ✅ Stable - DO NOT MODIFY | 🚧 Active Development |
| **Purpose** | General development, widget system | Presentation mode, video demo features |
| **Node Modules** | Independent | Independent |
| **Build Cache** | Independent `.next/` | Independent `.next/` |

---

## 🚀 Running Both Versions Simultaneously

### Terminal 1: V15 Development (Stable)
```bash
cd /Users/admin/Documents/claudecode/workspaces/enterprise-ai-support/apps/v15-development
npm run dev
# Running on http://localhost:3015
```

### Terminal 2: V15 Presentation (Experimental)
```bash
cd /Users/admin/Documents/claudecode/workspaces/enterprise-ai-support/apps/v15-presentation
npm run dev
# Running on http://localhost:3016
```

### Access URLs
- **V15 Development**: http://localhost:3015 (stable baseline)
- **V15 Presentation**: http://localhost:3016 (presentation features)

---

## 🎯 V15 Presentation Mode Features

This version implements ATC video feedback requirements:

### Phase 1: Core Presentation System (Weeks 1-3)

#### Week 1: Foundation
- **TypeScript Types** (`/src/types/presentation/`, `/src/types/demo/`, `/src/types/brand/`)
- **Government CIO Deck** (5 slides, 5-minute executive summary)
- **PresentationController** component
- **Keyboard Navigation** (Arrow keys, Space, Esc)

#### Week 2: Content & Accessibility
- **Government Program Deck** (15 slides, 15-minute detailed)
- **ClosedCaptions** component (WCAG 2.1 AA)
- **VoiceNarrator** component with sync
- **Metrics/Workflow Slides** (Charts, diagrams)

#### Week 3: Variants & Polish
- **VariantSwitcher** (Gov CIO vs Gov Prog toggle)
- **AgendaOverlay** (Section transitions)
- **Variant Configuration** system
- **Screen Reader Testing** (VoiceOver/NVDA)

### Phase 2: Enhancements (Week 4)
- **ZoomControls** component
- **NarratorToggle** for use case demos
- **BrandingSystem** (CTIS/ITSS themes)
- **Final Integration Testing**

---

## 📁 New Component Structure

```
src/
├── components/
│   ├── presentation/          # NEW - Slide rendering system
│   │   ├── PresentationController.tsx
│   │   ├── SlideRenderer.tsx
│   │   ├── SlideNavigation.tsx
│   │   └── PresentationDeck.tsx
│   ├── accessibility/         # NEW - WCAG 2.1 AA features
│   │   ├── ClosedCaptions.tsx
│   │   ├── ZoomControls.tsx
│   │   └── SkipToContent.tsx
│   ├── demo/                  # NEW - Demo controls
│   │   ├── VariantSwitcher.tsx
│   │   ├── VoiceNarrator.tsx
│   │   ├── NarratorToggle.tsx
│   │   └── AgendaOverlay.tsx
│   └── branding/              # NEW - CTIS/ITSS brand system
│       ├── BrandProvider.tsx
│       ├── BrandedLayout.tsx
│       └── LogoDisplay.tsx
├── config/
│   └── variants/              # NEW - Demo variant configs
│       ├── gov-cio.ts         # 5-minute executive
│       ├── gov-prog.ts        # 15-minute detailed
│       └── client-service.ts  # Original persona demos
├── types/
│   ├── presentation/          # NEW - Presentation types
│   │   ├── index.ts
│   │   ├── slide.ts
│   │   └── deck.ts
│   ├── demo/                  # NEW - Demo types
│   │   ├── index.ts
│   │   └── variant.ts
│   └── brand/                 # NEW - Brand types
│       └── index.ts
└── hooks/
    ├── demo/                  # NEW - Demo hooks
    │   ├── use-variant.ts
    │   └── use-narrator.ts
    └── accessibility/         # NEW - A11y hooks
        ├── use-closed-captions.ts
        └── use-zoom.ts
```

---

## 🔄 Merge Strategy (Future)

When presentation mode features are tested and approved:

### Option 1: Feature Flags (Recommended)
```typescript
// In v15-development
const features = {
  presentationMode: process.env.NEXT_PUBLIC_PRESENTATION_MODE === 'true',
  govVariants: process.env.NEXT_PUBLIC_GOV_VARIANTS === 'true',
};

// Conditional rendering
{features.presentationMode && <PresentationController />}
```

### Option 2: Separate Routes
```typescript
// Keep both versions accessible via routes
/demo/c-level              // Original persona demos
/presentation/gov-cio      // New presentation mode (Gov CIO)
/presentation/gov-prog     // New presentation mode (Gov Prog)
```

### Option 3: Full Merge
- Copy all new components from `v15-presentation/src/components/presentation/` → `v15-development/src/components/presentation/`
- Copy all new types from `v15-presentation/src/types/` → `v15-development/src/types/`
- Merge config files
- Update imports and routes

---

## 🧪 Testing Checklist

### Before Merging to V15 Development

- [ ] All 23 new components pass TypeScript compilation
- [ ] No breaking changes to existing V15 features
- [ ] Government CIO deck works (5 slides, 5 min)
- [ ] Government Program deck works (15 slides, 15 min)
- [ ] Closed captions display correctly (WCAG 2.1 AA)
- [ ] Keyboard navigation works (Arrow keys, Space, Esc)
- [ ] Voice narrator syncs with slides
- [ ] Zoom controls function properly
- [ ] Screen reader compatible (VoiceOver, NVDA)
- [ ] Both versions run simultaneously without conflicts
- [ ] No shared state between v15-development and v15-presentation

---

## 📊 Development Progress

### Week 1: Foundation (Nov 7-13, 2025)
- [x] A/B folder structure created
- [x] Port 3016 configured
- [ ] TypeScript types defined
- [ ] Gov CIO deck created
- [ ] PresentationController implemented
- [ ] Keyboard navigation added

### Week 2: Content & Accessibility (Nov 14-20, 2025)
- [ ] Gov Prog deck created
- [ ] ClosedCaptions component
- [ ] VoiceNarrator component
- [ ] Metrics/workflow slides
- [ ] ARIA attributes added

### Week 3: Variants & Polish (Nov 21-27, 2025)
- [ ] VariantSwitcher component
- [ ] AgendaOverlay component
- [ ] Variant configuration system
- [ ] Screen reader testing
- [ ] Demo preparation

### Week 4: Enhancements (Nov 28 - Dec 4, 2025)
- [ ] ZoomControls component
- [ ] NarratorToggle component
- [ ] BrandingSystem implementation
- [ ] Final integration testing
- [ ] Client demo preparation

---

## 🚨 Important Reminders

### DO NOT Modify V15 Development
- ❌ **NEVER** make changes to `/apps/v15-development/`
- ✅ **ALWAYS** work in `/apps/v15-presentation/`
- 🔒 V15 Development remains stable for baseline comparisons

### Port Conflicts
- If port 3016 is already in use: `lsof -ti:3016 | xargs kill`
- Or change port in `package.json`: `"dev": "next dev --turbopack -p 3017"`

### Node Modules
- Each version has **independent** `node_modules/`
- Run `npm install` separately in each folder
- Do not symlink or share dependencies

---

## 📚 Documentation

- **Main Project Docs**: `/apps/v15-development/docs/`
- **Folder Structure**: `/apps/v15-development/FOLDER-STRUCTURE.md`
- **CLAUDE.md**: `/apps/v15-development/CLAUDE.md`
- **Justice League Plan**: See conversation history for full implementation plan

---

## 🎯 Success Criteria

**V15 Presentation is ready to merge when**:
1. All ATC video feedback requirements implemented (see PDF)
2. Both decks (Gov CIO, Gov Prog) working perfectly
3. WCAG 2.1 AA accessibility compliance verified
4. No regressions in original V15 features
5. Client demo successfully completed
6. Performance metrics meet standards (<3s load, 60fps animations)

---

**Oracle Verification**: ✅ A/B structure ready for parallel development
**Next Step**: Create TypeScript type definitions (Week 1, Day 1)
