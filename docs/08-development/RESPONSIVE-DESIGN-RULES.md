# Responsive Design Rules

This document defines the responsive design rules and breakpoints used in the ATC Support V21 application. Reference this document when implementing or modifying responsive behavior.

**Last Updated**: 2025-12-15
**Version**: 1.0.0

---

## Breakpoints

We use Tailwind CSS default breakpoints with `md:` (768px) as the primary mobile/desktop divide.

| Breakpoint | Min Width | Description |
|------------|-----------|-------------|
| Default | 0px | Mobile-first base styles |
| `sm:` | 640px | Small tablets (rarely used) |
| `md:` | 768px | **Primary breakpoint** - Desktop behavior starts |
| `lg:` | 1024px | Large tablets / Small desktops |
| `xl:` | 1280px | Desktop |
| `2xl:` | 1536px | Large desktop |

---

## Layout Behavior by Viewport

### Mobile (< 768px)

| Component | Behavior |
|-----------|----------|
| **Sidebar** | Hidden by default, slides in as overlay from left |
| **TopBar** | Theme toggle (left), Hamburger menu (right) |
| **Chat Input** | Responsive padding, icon-only Quick Launch |
| **Content** | Full width |

### Desktop (≥ 768px)

| Component | Behavior |
|-----------|----------|
| **Sidebar** | Inline, collapsible (width: 300px or 0) |
| **TopBar** | Panel toggle icons (left), Theme toggle (left), No hamburger |
| **Chat Input** | Full padding, "Quick Launch ⌘K" button |
| **Content** | Flexible width beside sidebar |

---

## Component-Specific Rules

### TopBar (`src/components/layout/TopBar.tsx`)

```tsx
// Desktop: Panel toggle icons (hidden on mobile)
<button className="hidden md:flex ...">
  {sidebarOpen ? <PanelLeftClose /> : <PanelLeft />}
</button>

// Mobile: Hamburger menu on RIGHT (hidden on desktop)
<button className="flex md:hidden ...">
  <Menu />
</button>

// Theme toggle: Always visible (both mobile and desktop)
<ThemeToggle /> // No responsive classes needed
```

**Key Rules**:
- Hamburger menu goes on **RIGHT** side for better mobile UX (thumb reach)
- Panel icons go on **LEFT** with theme toggle
- Use `hidden md:flex` to show only on desktop
- Use `flex md:hidden` to show only on mobile

### Sidebar (`src/components/layout/Sidebar.tsx`)

```tsx
// Mobile overlay backdrop
<div className={`fixed inset-0 bg-black/50 z-40 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />

// Sidebar positioning
<aside className={`
  h-screen bg-card border-r border-border transition-all duration-300 flex-shrink-0
  fixed md:relative left-0 top-0 z-50 md:z-auto
  ${isOpen
    ? 'translate-x-0 w-[300px]'
    : '-translate-x-full md:translate-x-0 md:w-0 w-[300px]'}
`}>
```

**Key Rules**:
- Mobile: `fixed` positioning with `z-50`
- Desktop: `relative` positioning (inline)
- Mobile: Slides from left (`translate-x-0` / `-translate-x-full`)
- Desktop: Collapses width (`w-[300px]` / `w-0`)
- Backdrop: Only on mobile (`md:hidden`)

### Demo Layout (`src/app/demo/layout.tsx`)

```tsx
// Default sidebar state based on viewport
const [sidebarOpen, setSidebarOpen] = useState(() => {
  if (typeof window !== 'undefined') {
    // Mobile: default to closed
    if (window.innerWidth < 768) {
      return false;
    }
    // Desktop: check localStorage, default to open
    const saved = localStorage.getItem('sidebarOpen');
    return saved !== null ? JSON.parse(saved) : true;
  }
  return true;
});
```

**Key Rules**:
- Mobile: Sidebar **closed** by default
- Desktop: Sidebar **open** by default (or persisted state)
- Use `window.innerWidth < 768` to match Tailwind's `md:` breakpoint

### Floating Input Bar (`src/components/chat/InteractiveChatWithFloatingInput.tsx`)

```tsx
// Responsive positioning and padding
<div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 right-4 sm:left-6 sm:right-6 md:left-8 md:right-8 flex items-center gap-2 sm:gap-3 z-10">

// Input field
<input className="w-full pl-4 sm:pl-6 pr-12 sm:pr-14 py-3 sm:py-4 ..." />

// Quick Launch button
<button className="flex-shrink-0 flex items-center justify-center gap-2 p-3 sm:px-5 sm:py-4 ...">
  <span className="hidden sm:inline text-sm font-medium">Quick Launch</span>
  <kbd className="hidden lg:inline px-2 py-1 ...">⌘K</kbd>
  {/* Icon for mobile */}
  <svg className="w-5 h-5 sm:hidden">...</svg>
</button>
```

**Key Rules**:
- Use `absolute` positioning (NOT `fixed`) to stay within parent container
- Progressive padding: `bottom-4` → `sm:bottom-6` → `md:bottom-8`
- Quick Launch text: `hidden sm:inline` (icon-only on mobile)
- Keyboard shortcut: `hidden lg:inline` (only on large screens)

---

## CSS Hide/Show Patterns

### Show Only on Mobile
```tsx
className="flex md:hidden"
// or
className="block md:hidden"
```

### Show Only on Desktop
```tsx
className="hidden md:flex"
// or
className="hidden md:block"
```

### Progressive Disclosure
```tsx
// Mobile: hidden, Tablet: visible, Desktop: visible with extra
className="hidden sm:flex"           // Show from 640px
className="hidden md:flex"           // Show from 768px
className="hidden lg:inline"         // Show from 1024px (e.g., keyboard shortcuts)
```

---

## Z-Index Hierarchy

| Layer | Z-Index | Components |
|-------|---------|------------|
| Base | 0 | Main content |
| Floating UI | 10 | Chat input bar |
| Sidebar backdrop | 40 | Mobile overlay |
| Sidebar | 50 | Mobile sidebar |
| Modals | 100+ | Command palette, dialogs |

---

## Testing Checklist

When modifying responsive behavior, test at these viewport sizes:

| Device | Size | Key Checks |
|--------|------|------------|
| iPhone SE | 375×667 | Sidebar closed, hamburger right |
| iPhone 14 Pro | 393×852 | Same as above |
| iPad Mini | 768×1024 | **Breakpoint edge** - Desktop behavior |
| iPad Pro | 1024×1366 | Sidebar expanded |
| Laptop | 1440×900 | Full desktop layout |
| Desktop | 1920×1080 | Wide layout |

### Manual Test Steps

1. **Mobile (375px)**
   - [ ] Sidebar closed by default on page load
   - [ ] Hamburger menu on top RIGHT
   - [ ] Theme toggle on top LEFT
   - [ ] Tap hamburger → sidebar slides in as overlay
   - [ ] Dark backdrop behind sidebar
   - [ ] Tap backdrop OR hamburger → sidebar closes
   - [ ] Quick Launch shows icon only

2. **Desktop (1440px)**
   - [ ] Sidebar open by default
   - [ ] Panel toggle icons on top LEFT
   - [ ] No hamburger menu
   - [ ] Click panel icon → sidebar collapses inline (width: 0)
   - [ ] Click again → sidebar expands
   - [ ] State persists in localStorage
   - [ ] Quick Launch shows full text + ⌘K

---

## Common Mistakes to Avoid

1. **Using `fixed` for chat input bar** - Should be `absolute` to stay within right panel
2. **Hamburger on left** - Should be on RIGHT for better mobile UX
3. **Mobile sidebar not closing** - Ensure backdrop click handler works
4. **Sidebar state not persisting** - Check localStorage implementation
5. **Z-index conflicts** - Follow the hierarchy above

---

## Related Files

- `src/components/layout/TopBar.tsx` - Top navigation bar
- `src/components/layout/Sidebar.tsx` - Collapsible sidebar
- `src/app/demo/layout.tsx` - Demo layout with responsive state
- `src/components/chat/InteractiveChatWithFloatingInput.tsx` - Chat input
- `src/contexts/SidebarContext.tsx` - Sidebar state management

---

## Changelog

### v1.0.0 (2025-12-15)
- Initial documentation
- Mobile-first responsive design with md: breakpoint
- Hamburger menu on right for mobile UX
- Sidebar as overlay on mobile, inline on desktop
- Chat input bar contained within right panel
