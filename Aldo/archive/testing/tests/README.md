# E2E Testing with Playwright

Comprehensive end-to-end test suite for Enterprise AI Support V4, validating all 21 queries across 3 personas with multi-step conversations and interactive button testing.

## Test Coverage

### C-Level Executive (7 test cases)
- ✅ Q1: Executive Summary Widget
- ✅ Q2: Customer Risk Profile Widget
- ✅ Q3: SLA Performance Chart Widget
- ✅ Q4: Customer Risk List Widget
- ✅ Q5: Ticket Detail Widget
- ✅ Q6-Q8: Multi-Step - Schedule Executive Call (3 steps)
- ✅ Console Errors Validation

### CS Manager (7 test cases)
- ✅ Q1: Team Workload Dashboard Widget
- ✅ Q2: Ticket List Widget (personalized title: "Sarah's Tickets")
- ✅ Q3: Multi-Step - Schedule 1-on-1 with Marcus (3 steps)
- ✅ Q4: Message Composer Widget
- ✅ Q5: Interactive Button - Send Message
- ✅ Q6: Interactive Button - Save as Draft
- ✅ Q7: Interactive Button - Save as Template
- ✅ Console Errors Validation

### Support Agent (12 test cases)
- ✅ Q1: Agent Dashboard Widget
- ✅ Q2: Ticket Detail Widget
- ✅ Q3: Call Prep Notes Widget
- ✅ Q4: Response Composer Widget
- ✅ Q5: Interactive Button - Send Response
- ✅ Q6: Interactive Button - Edit and Customize
- ✅ Q7: Interactive Button - Regenerate Response
- ✅ Q8: Ticket List Widget
- ✅ Q9: Similar Tickets Analysis Widget
- ✅ Q10: Agent Performance Stats Widget
- ✅ Q11: Knowledge Base Search Widget
- ✅ Q12: Knowledge Article Widget (dynamic KB ID extraction: KB-107)
- ✅ Console Errors Validation

**Total**: 26 test cases validating 21 queries + 6 button actions across 17 unique widgets

## Prerequisites

1. **Install Playwright** (already done if you see this):
   ```bash
   npm install -D @playwright/test
   npx playwright install chromium
   ```

2. **Start the dev server**:
   ```bash
   npm run dev
   # Server should be running on http://localhost:3004
   ```

## Running Tests

### Run All Tests
```bash
npm run test:e2e
```

### Run Tests in Headed Mode (see browser)
```bash
npm run test:e2e:headed
```

### Run Tests in Debug Mode
```bash
npm run test:e2e:debug
```

### Run Persona-Specific Tests
```bash
# C-Level Executive tests only
npm run test:e2e:c-level

# CS Manager tests only
npm run test:e2e:cs-manager

# Support Agent tests only
npm run test:e2e:support-agent
```

### View HTML Report
```bash
npm run test:e2e:report
```

## Test Architecture

```
tests/
├── e2e/
│   ├── personas/
│   │   ├── c-level.spec.ts (C-Level tests)
│   │   ├── cs-manager.spec.ts (CS Manager tests)
│   │   └── support-agent.spec.ts (Support Agent tests)
│   └── helpers/
│       ├── persona-helper.ts (persona switching utilities)
│       ├── widget-assertions.ts (widget validation helpers)
│       └── multi-step-helper.ts (conversation flow utilities)
├── reports/ (generated test reports)
└── README.md (this file)
```

## Key Testing Features

### 1. Multi-Step Conversation Testing
Tests conversational flows with 3+ steps:
- **C-Level**: "Schedule executive call" → "yes" → "book tomorrow at 1pm"
- **CS Manager**: "Schedule 1-on-1 with Marcus" → "yes" → "book tomorrow at 1pm"

### 2. Interactive Button Testing
Validates all widget button actions:
- **Message Composer**: Send Message, Save as Draft, Save as Template
- **Response Composer**: Send Response, Edit and Customize, Regenerate

### 3. Widget Rendering Validation
- 17 unique widgets tested
- Validates correct widget displays for each query
- Checks widget content and structure
- Ensures widgets appear within timeout (15 seconds)

### 4. Dynamic Content Testing
- **Personalized titles**: "Sarah's Tickets" (not generic "My Tickets")
- **Dynamic ID extraction**: KB-107 (from query "Open KB-107")
- **Meeting attendees**: Marcus (from query "Schedule 1-on-1 with Marcus")

### 5. Error Detection
- Captures all console errors during test execution
- Fails tests if JavaScript errors occur (except 404s)
- Ensures production-quality code

## Test Helpers

### `persona-helper.ts`
- `navigateToPersona()` - Navigate to persona-specific page
- `clearBrowserState()` - Clear localStorage/sessionStorage
- `getCurrentPersona()` - Get current persona from URL

### `widget-assertions.ts`
- `waitForWidget()` - Wait for widget to appear
- `assertWidgetVisible()` - Assert widget is visible
- `assertWidgetContainsText()` - Assert widget contains text
- `waitForAIResponse()` - Wait for AI message
- `assertAIResponseContains()` - Assert AI response text

### `multi-step-helper.ts`
- `sendQuery()` - Send query to chat
- `executeConversationFlow()` - Run multi-step conversation
- `clickWidgetButton()` - Click button in widget
- `clearChatHistory()` - Clear messages between tests

## Test Data Attributes

Components use the following attributes for reliable testing:

- `data-testid="chat-input"` - Chat input field
- `data-testid="send-button"` - Send button
- `data-widget-type="widget-name"` - Widget containers
- `data-message-role="ai|user"` - Message containers

## Troubleshooting

### Dev Server Not Running
```bash
# Start the dev server first
npm run dev
# Then run tests in another terminal
npm run test:e2e
```

### Tests Timing Out
- Increase timeout in `playwright.config.ts` (currently 90s)
- Check if dev server is responsive at http://localhost:3004
- Run tests in headed mode to see what's happening: `npm run test:e2e:headed`

### Widget Not Found
- Check if widget is implemented in `WidgetRenderer.tsx`
- Verify query pattern in `query-detection.ts` or conversation files
- Ensure `data-widget-type` attribute is added to widget

### Console Errors Failing Tests
- Check browser console in headed mode
- Review error messages in test output
- Fix source code issues causing errors

## CI/CD Integration

These tests can be integrated into CI/CD pipelines:

```yaml
# .github/workflows/e2e-tests.yml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run start & npx wait-on http://localhost:3004
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: tests/reports/playwright-report/
```

## Maintenance

When adding new features:

1. **Add test data attributes** to new components
2. **Create test cases** for new queries/widgets
3. **Update helpers** if new patterns emerge
4. **Run full suite** before committing: `npm run test:e2e`

## Performance Metrics

- **Total Tests**: 26
- **Expected Runtime**: 5-10 minutes
- **Success Rate**: 100% (all scenarios validated manually before automation)
- **Browsers**: Chromium (Chrome/Edge)
- **Viewports**: 1920x1080 (Desktop)
