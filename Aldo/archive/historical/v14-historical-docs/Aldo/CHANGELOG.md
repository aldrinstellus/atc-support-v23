# Changelog

All notable changes to the Enterprise AI Support V3 project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [6.0.0] - 2025-10-06

### 🎉 Initial Release - V6 Fork from V4

**Forked from V4 commit**: `33f26b4`

This is a fresh development branch for new feature experimentation. All V4 features are included:
- PerformanceTrendsWidget with multi-line Recharts
- SentimentAnalysisWidget with progress bars
- C-Level enrichment (13 Q&A pairs)
- CS Manager enrichment (14 Q&A pairs)
- Complete widget system with 19+ widgets

**V4 remains stable** - Use V6 for:
- New feature development
- Experimental changes
- Breaking changes testing
- Cherry-pick successful features back to V4

---

## [Unreleased] - 2025-10-06

### ✨ Added - Widget Enrichment (WIP from Bhanu Reference)

#### **New Widgets**
- ✅ **PerformanceTrendsWidget** - Multi-line Recharts visualization
  - Tracks 3 metrics over time: Response Time, Resolution Time, Customer Satisfaction
  - Trend summary cards with improving/declining indicators
  - Solar Dusk theme integration
  - **File**: `src/components/widgets/PerformanceTrendsWidget.tsx`

- ✅ **SentimentAnalysisWidget** - Progress bars with sentiment breakdown
  - Overall sentiment score with dynamic icon (Smile/Meh/Frown)
  - Progress bars for Positive/Neutral/Negative sentiment
  - Recent comments section with sentiment-coded cards
  - **File**: `src/components/widgets/SentimentAnalysisWidget.tsx`

#### **C-Level Persona Enrichment (3 new Q&A)**
- Added "Show me our performance trends over the last week" → performance-trends widget
- Added "What is the current customer sentiment?" → sentiment-analysis widget
- Added "Show me detailed analytics with performance metrics" → analytics-dashboard widget
- **File**: `src/lib/c-level-conversation.ts` (now 13 total Q&A entries)

#### **CS Manager Persona Enrichment (8 new Q&A)**
- Added "Show me the current team workload distribution" → team-workload-dashboard
- Added "Compare agent performance for this month" → agent-performance-comparison
- Added "Show me SLA performance breakdown" → sla-performance-chart
- Added "Show me performance trends for the past week" → performance-trends
- Added "Show me all at-risk customers" → customer-risk-list
- Added "What critical tickets need attention?" → ticket-list
- Added "What is the overall customer sentiment?" → sentiment-analysis
- Added "Show me the detailed analytics dashboard" → analytics-dashboard
- **File**: `src/lib/cs-manager-conversation.ts` (now 14 total Q&A entries)

#### **TypeScript Types**
- Added `PerformanceTrendsData` interface for performance metrics
- Added `SentimentAnalysisData` interface for sentiment analysis
- Updated `WidgetType` union with 'performance-trends' and 'sentiment-analysis'
- **File**: `src/types/widget.ts`

#### **Demo Data**
- Created `performanceTrendsDemo` with 7 days of mock performance data
- Created `sentimentAnalysisDemo` with negative sentiment example
- Updated `getWidgetDemoData()` mapping for new widgets
- **File**: `src/data/demo-widget-data.ts`

### 🐛 Fixed - Widget Data Issues

- ✅ Fixed missing `widgetData` in CS Manager new Q&A entries
  - All 8 new entries now properly reference demo data imports
  - Prevents "Unable to load" errors in widgets
- ✅ Added missing imports in `cs-manager-conversation.ts`
- ✅ Updated `query-detection.ts` with new widget data imports

### 📝 Documentation

- ✅ Created `ENRICHMENT-SUMMARY.md` with full enrichment analysis
  - New widgets documentation
  - C-Level and CS Manager enrichment details
  - Comparison with Bhanu's reference implementation
  - Test queries and success metrics
  - Backward compatibility verification

- ✅ Added deployment documentation
  - `DEPLOYMENT-GUIDE.md`
  - `DEPLOYMENT-SUMMARY.md`
  - `POST-DEPLOYMENT-TEST-CHECKLIST.md`

### ⚠️ Known Issues

- C-Level has duplicate Q&A ID numbering (q6, q7 used twice)
  - Does not affect functionality (pattern matching uses triggers, not IDs)
  - Recommend renumbering new entries to q11, q12, q13
- Support Agent persona has no conversation file
  - Currently relies on `query-detection.ts` fallback patterns only

### 🔄 Backward Compatibility

- ✅ All original 10 C-Level Q&A pairs remain intact
- ✅ All original 6 CS Manager Q&A pairs remain intact
- ✅ No breaking changes to existing widgets
- ✅ Additive enrichment only

---

## [4.0.1] - 2025-10-03

### 🐛 Bug Fixes

#### **Analytics Dashboard Chart Colors**
- ✅ Fixed `AnalyticsDashboardWidget` chart rendering issue
- ✅ Removed incorrect `hsl()` wrappers from Recharts components
- ✅ Charts now use direct CSS variable references (`var(--chart-1)`)
- **Impact**: Bar and line charts now display in proper blue theme colors instead of black
- **Files Modified**: `src/components/widgets/AnalyticsDashboardWidget.tsx`

**Technical Details**:
- Issue: OKLCH color variables were wrapped in `hsl()` causing invalid CSS
- Before: `fill="hsl(var(--chart-1))"` → rendered as black
- After: `fill="var(--chart-1)"` → renders as blue (oklch(0.7049 0.1867 47.6044))
- Affected 3 lines: Bar fill, Line stroke, Line dot fill

---

### ✨ Enhancements

#### **AI Response Animations**
- ✅ Implemented two-phase AI response animation
  - Phase 1: "Thinking" state (1.5-2s)
  - Phase 2: "Composing" state (1.5-2.5s)
- ✅ Added word-by-word typewriter effect for AI messages
- ✅ Enhanced state tracking for typing animations
- **Impact**: More realistic and engaging AI interaction experience
- **Files Modified**: `src/components/chat/InteractiveChat.tsx`

**Technical Details**:
- New states: `isThinking`, `isComposing`, `typingMessageId`, `displayedText`
- Typewriter speed: ~10-12 words per second (85ms per word)
- Maintains backward compatibility with existing `isTyping` state

---

### 📝 Documentation

#### **Added User Reference Documentation**
- ✅ Created `User QNA.md` with Bhanu's 10 C-Level Q&A pairs
- Reference list for testing interactive demo scenarios

---

## [3.0.0] - 2025-10-01

### 🚀 V3 Release - Fresh Clone from V2

**Focus**: Complete codebase clone from enterprise-ai-support-v2 with Claude SDK integration

---

### Added

#### **New V3 Repository**
- ✅ Cloned from enterprise-ai-support-v2 (feature/claude-sdk-integration branch)
- ✅ Independent repository: https://github.com/aldrinstellus/enterprise-ai-support-v3
- ✅ All V2 features and improvements included
- ✅ Claude SDK integration with real AI responses
- ✅ Updated documentation to V3 standards
- ✅ Version bumped to 3.0.0 for fresh start

#### **Inherited from V2**
- ✅ 4-Persona RBAC System (Admin, C-Level, CS Manager, Support Agent)
- ✅ Conversation Management (save, load, pin, archive, export)
- ✅ Message Actions (copy, regenerate, like/dislike, timestamps)
- ✅ Typewriter streaming effect
- ✅ 27 Quick Actions across personas
- ✅ Two-state interface design (empty/active)
- ✅ Solar Dusk theme with Framer Motion animations

---

### Changed

#### **Documentation Updates**
- All references updated from V2 to V3
- Repository URLs updated to enterprise-ai-support-v3
- Version numbers updated to 3.0.0
- Directory paths updated in examples

#### **Package Information**
- Package name: `enterprise-ai-support-v3`
- Version: `3.0.0`
- Description: "Enterprise AI Support Dashboard V3 - Claude SDK Integration Edition"

---

### Technical Details

**Repository**: https://github.com/aldrinstellus/enterprise-ai-support-v3
**Cloned From**: https://github.com/aldrinstellus/enterprise-ai-support-v2 (feature/claude-sdk-integration)
**Date**: October 1, 2025

---

## [1.1.0] - 2025-10-01 (V2 History)

### ✨ Feature Update - Advanced Persona System & Conversation Management

**Focus**: Complete RBAC persona system with interactive conversation management

---

### Added

#### **4-Persona RBAC System**
- ✅ Admin persona (Orange badge, full system access)
- ✅ C-Level persona (Purple badge, executive-level insights)
- ✅ CS Manager persona (Teal badge, team management)
- ✅ Support Agent persona (Green badge, ticket operations)
- ✅ Persona switcher in bottom profile badge
- ✅ Unique badge colors and icons per persona
- ✅ 27 Quick Actions across all personas
- ✅ Role-specific capabilities and demo scenarios
- ✅ Persona persistence via localStorage

#### **Conversation Management**
- ✅ New conversation functionality
- ✅ Save/load conversations (persona-specific)
- ✅ Recent conversations with persona badges
- ✅ 3-dot menu on each conversation:
  - Rename (inline editing with keyboard support)
  - Pin/Unpin to top
  - Archive/Unarchive
  - Export as Text or JSON
  - Copy to clipboard
  - Share link generation
  - Delete with confirmation
- ✅ Pinned conversations section
- ✅ Regular conversations section (last 10)
- ✅ Collapsible archived conversations section
- ✅ Conversation titles auto-generated from first query

#### **Message Features**
- ✅ Typewriter streaming effect (3 chars/chunk, 15ms delay)
- ✅ Message action bar (appears on hover):
  - Copy button with visual feedback
  - Regenerate response
  - Like/Dislike feedback buttons with fill state
  - Relative timestamp display
- ✅ Save query to favorites with star button
- ✅ Saved queries section per persona

#### **New Type Definitions**
- `/src/types/persona.ts` - PersonaType, Persona, PersonaTheme, QuickAction
- `/src/data/personas.ts` - Complete persona definitions
- `/src/hooks/use-persona.ts` - Persona state management hook

#### **Enhanced Components**
- `ConversationCard` - Full-featured conversation item with dropdown menu
- `AssistantMessage` - Enhanced with action bar and feedback
- `UserMessage` - Added save query functionality

---

### Changed

#### **From v1.0.0**
- Simplified persona system (removed complex theme switching)
- Enhanced sidebar with functional conversation management
- Updated API streaming for typewriter effect
- Expanded Message interface with feedback and metadata
- Added Conversation interface with pin/archive/tags support

#### **UI Improvements**
- Bottom profile badge shows current persona
- Sidebar organized into Pinned/Recent/Archived sections
- Message action bars with smooth hover transitions
- Inline rename editing for conversations
- Visual feedback for all interactive actions

---

### Fixed

#### **Performance**
- ✅ Proper React hook dependencies in usePersona
- ✅ Optimized localStorage reads/writes
- ✅ Efficient conversation filtering and sorting

#### **UX Issues**
- ✅ Fast Refresh runtime errors with dynamic icon rendering
- ✅ Proper state management for conversation menus
- ✅ Keyboard shortcuts for rename (Enter/Escape)
- ✅ Debounced autosave for conversations

---

### Technical Details

#### **New Files Created**
```
src/
├── types/
│   └── persona.ts (PersonaType, Persona interfaces)
├── data/
│   └── personas.ts (4 persona definitions with 27 actions)
└── hooks/
    └── use-persona.ts (persona state hook)
```

#### **Major Updates**
- **page.tsx**: +737 lines (conversation management, action handlers)
- **route.ts**: +25 lines (streaming typewriter effect)

#### **LocalStorage Keys**
- `selected-persona` - Current persona ID
- `conversations-{personaId}` - Conversations per persona
- `savedQueries-{personaId}` - Saved queries per persona

---

### Performance

- **Streaming Speed**: ~200 chars/sec typewriter effect
- **LocalStorage**: Efficient persona-specific partitioning
- **Animations**: 60fps transitions on action bars
- **Fast Refresh**: Sub-100ms hot reload

---

### Accessibility

- ✅ Keyboard navigation for conversation rename
- ✅ Hover states for all interactive elements
- ✅ Visual feedback for copy/save actions
- ✅ Clear focus management in menus
- ✅ Descriptive button titles/tooltips

---

### Development Notes

**Session Date**: October 1, 2025 (Continuation)

**Key Features Implemented**:
1. Complete RBAC system with 4 distinct personas
2. Full conversation lifecycle management
3. Advanced message actions with feedback
4. Persona-aware data persistence

**Design Decisions**:
- Simplified persona system (badge-only instead of full theme)
- Kept typewriter effect at 200 chars/sec (feels natural)
- Used hover for action bars (cleaner UI)
- Implemented inline rename (better UX than modal)

---

## [1.0.0] - 2025-10-01

### ✨ Initial Release - Claude-Style AI Assistant Interface

**Project**: Enterprise AI Multi-Tool Assistant (Option 2)
**Description**: Production-ready demo interface showcasing conversational AI task automation across multiple services.

---

### Added

#### **Core Features**
- ✅ Two-state interface design (empty state → active state)
- ✅ Smooth Framer Motion animations (600ms transitions)
- ✅ GlowingEffect component for mouse-following input border
- ✅ Collapsible sidebar with localStorage persistence
- ✅ Keyboard shortcut support (`⌘B` / `Ctrl+B` for sidebar toggle)
- ✅ Example prompts for quick demos
- ✅ Execution result display system with step-by-step visualization
- ✅ Status indicators (✅ success, ❌ error, ℹ️ info)
- ✅ Mock data for demo purposes

#### **Interface States**
- **Empty State**:
  - Clean, minimal centered interface
  - Hero headline: "AI that *actually* gets work done" (Merriweather serif font)
  - Subtext: "Connect your tools. Ask AI. Watch it happen."
  - Centered input box (max-width: 672px)
  - Smooth fade-in animation
  - Auto-focused input

- **Active State**:
  - Input transitions from center to bottom (600ms animation)
  - Bottom-fixed input with 32px padding from bottom
  - Scrollable messages area
  - Staggered message animations (50ms delay)
  - Backdrop blur effect on input container

#### **UI Components**
- `GlowingEffect` - Mouse-following border animation
- `UserMessage` - User message bubble
- `AssistantMessage` - AI response with execution results
- `ServiceBadge` - Connected service indicators
- `ExecutionResultCard` - Step-by-step result display
- `ExecutionStepDisplay` - Individual step visualization

#### **Technical Stack**
- Next.js 15.5.4 with App Router & Turbopack
- React 19.0.0
- TypeScript 5.7.3 (strict mode)
- Tailwind CSS 4.0.14
- Framer Motion (motion/react 12.23.22)
- Lucide React icons

#### **Theme & Styling**
- Solar Dusk theme (warm orange/amber accents)
- Dark mode optimized
- Glass morphism effects
- Backdrop blur
- Custom animations with easing curves

#### **Configuration**
- Next.js dev indicator disabled for clean UI
- TypeScript strict mode enabled
- ESLint configuration
- Tailwind CSS 4 with custom theme
- Path aliases (`@/*` → `src/*`)

---

### Changed

#### **From Initial Setup**
- Removed Next.js default welcome message
- Changed from single-state to two-state conditional layout
- Updated hero text from generic to "AI that actually gets work done"
- Changed headline font from sans-serif to Merriweather (serif)
- Made "actually" italic for emphasis
- Disabled Next.js development indicator badge
- Removed extra wrapper div in `layout.tsx` for cleaner structure

#### **Layout Improvements**
- Fixed horizontal centering by removing conflicting flex containers
- Made chat glass container fully responsive with equal padding
- Removed max-width constraints on messages and input for full flex
- Changed main container from `justify-center items-center` to `justify-center flex-col`
- Fixed sidebar width transition (collapsed: 0px, open: 320px)

---

### Fixed

#### **Layout Issues**
- ✅ Resolved chat container left-alignment issue
- ✅ Fixed extra right spacing caused by wrapper div in `layout.tsx`
- ✅ Corrected conflicting flex centering on main container
- ✅ Fixed chat not expanding to full width with equal padding
- ✅ Removed layout shifts during state transitions

#### **Animation Issues**
- ✅ Smooth center-to-bottom input transition
- ✅ Eliminated jarring layout shifts
- ✅ Fixed stagger delay calculation for messages
- ✅ Proper animation cleanup

---

### Technical Details

#### **Dependencies Added**
```json
{
  "motion": "^12.23.22",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.8.0"
}
```

#### **Configuration Changes**
- **next.config.ts**: Added `devIndicators.buildActivity: false`
- **tailwind.config.ts**: Solar Dusk theme colors
- **tsconfig.json**: Strict mode, path aliases

#### **File Structure**
```
src/
├── app/
│   ├── page.tsx (two-state interface)
│   ├── layout.tsx (minimal wrapper)
│   ├── globals.css (Solar Dusk theme)
│   └── favicon.ico
├── components/
│   └── ui/
│       └── glowing-effect.tsx
└── lib/
    └── utils.ts (cn helper)
```

---

### Performance

- **Build Time**: ~800ms with Turbopack
- **Animation Frame Rate**: 60fps
- **Bundle Optimization**: Next.js 15 automatic optimization
- **Hot Reload**: Fast refresh enabled

---

### Accessibility

- ✅ Keyboard navigation support
- ✅ Auto-focus on input
- ✅ Sidebar keyboard shortcut (`⌘B`)
- ✅ Focus management during transitions
- ✅ Semantic HTML structure

---

### Known Limitations

- **Demo Data Only**: All responses are mocked (no real API integrations)
- **No Persistence**: Conversations reset on page reload
- **No Authentication**: Open access (suitable for demo)
- **Single Conversation**: No conversation history/threading

---

### Development Notes

**Session Date**: October 1, 2025

**Key Challenges Solved**:
1. Layout centering with responsive glass container
2. Smooth state transitions without layout shift
3. Framer Motion integration for 60fps animations
4. Removing conflicting flex containers
5. Proper animation timing and easing curves

**Design Decisions**:
- Chose two-state layout over always-visible chat for better UX
- Used Framer Motion instead of CSS animations for better control
- Implemented localStorage for sidebar state (respects user preference)
- Selected Merriweather serif for headline (elegant but readable)
- Set transition duration to 600ms (feels natural, not too slow/fast)

---

### Future Roadmap

**Potential Enhancements** (if converting to real implementation):
- [ ] Real API integrations (Zoho CRM, Zoho Desk, Slack, Google Calendar)
- [ ] Actual AI/LLM integration (OpenAI GPT-4, Anthropic Claude)
- [ ] Conversation persistence with database
- [ ] User authentication system
- [ ] Multi-conversation management
- [ ] Custom workflow builder
- [ ] Export execution reports (PDF, CSV)
- [ ] Voice input support
- [ ] Mobile app version (React Native)
- [ ] Real-time collaboration features

---

## Version History

- **v1.0.0** (2025-10-01): Initial release - Claude-style AI assistant interface

---

## Links

- **Repository**: https://github.com/aldrinstellus/enterprise-ai-support-v3
- **V2 Repository**: https://github.com/aldrinstellus/enterprise-ai-support-v2
- **Documentation**: See [SUMMARY.md](./SUMMARY.md)
- **Quick Start**: See [QUICK-START.md](./QUICK-START.md)
- **Architecture**: See [ARCHITECTURE.md](./ARCHITECTURE.md)

---

*Changelog maintained following [Keep a Changelog](https://keepachangelog.com/) principles*
