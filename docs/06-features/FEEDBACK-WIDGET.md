# Feedback Widget Feature

## Overview

The Feedback Widget provides users with an easy way to report bugs and send feedback directly from the application interface.

## Status

**Current Status**: Hidden (temporarily disabled for demo)

## Components

### Files
- `src/components/feedback/FeedbackWidget.tsx` - Main widget component
- `src/components/feedback/FeedbackTriggerButton.tsx` - Floating trigger button
- `src/components/feedback/FeedbackPanel.tsx` - Feedback form panel
- `src/contexts/FeedbackContext.tsx` - State management
- `src/types/feedback.ts` - TypeScript types

### Location
The widget renders as a floating button in the bottom-right corner of the screen.

## Features

- **Bug Reporting**: Submit bug reports with description
- **General Feedback**: Send feature requests and suggestions
- **Floating Trigger**: Orange button with feedback icon
- **Panel UI**: Slide-out panel for form submission

## Enabling the Widget

To re-enable the Feedback Widget:

1. Open `src/app/layout.tsx`
2. Uncomment the FeedbackWidget line:

```tsx
// Change from:
{/* <FeedbackWidget /> - Hidden for demo, see docs/06-features/FEEDBACK-WIDGET.md */}

// To:
<FeedbackWidget />
```

3. Save and restart the dev server

## Configuration

The widget is wrapped in `FeedbackProvider` context which manages:
- Open/close state
- Form submission handling
- Feedback type selection

## Future Enhancements

- Integration with issue tracking (Jira, Linear, GitHub Issues)
- Screenshot capture
- Session recording attachment
- User identification
- Priority categorization

---

**Last Updated**: 2025-12-10
**Status**: Hidden for demo presentations
