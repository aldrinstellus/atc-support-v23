# Testing Quick Start Guide

Get up and running with the test suite in 5 minutes.

---

## Prerequisites

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers (for E2E tests)
npx playwright install chromium

# 3. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your configuration
```

---

## Running Your First Tests

### Step 1: Unit Tests (Fast - 30 seconds)

```bash
npm run test:unit
```

**What it tests**: Utility functions, query detection, data processing

**Expected output**:
```
 PASS  __tests__/unit/lib/query-detection.test.ts
 PASS  __tests__/unit/lib/utils.test.ts

Test Suites: 2 passed, 2 total
Tests:       45 passed, 45 total
Time:        4.321s
```

---

### Step 2: Integration Tests (Medium - 1 minute)

```bash
# Start database (if not running)
docker-compose up -d postgres

# Run migrations
npm run db:migrate

# Run integration tests
npm run test:integration
```

**What it tests**: API endpoints, database operations

**Expected output**:
```
 PASS  __tests__/integration/api/health.test.ts

Test Suites: 1 passed, 1 total
Tests:       12 passed, 12 total
Time:        8.742s
```

---

### Step 3: E2E Tests (Slow - 5 minutes)

```bash
# Start development server
npm run dev
# Server runs on http://localhost:3014

# In another terminal, run E2E tests
npm run test:e2e
```

**What it tests**: Complete user workflows, widget rendering, multi-step conversations

**Expected output**:
```
Running 26 tests using 3 workers

  ✓ tests/e2e/personas/c-level.spec.ts (7 passed)
  ✓ tests/e2e/personas/cs-manager.spec.ts (7 passed)
  ✓ tests/e2e/personas/support-agent.spec.ts (12 passed)

26 passed (5m 32s)
```

---

## Common Test Commands

```bash
# Run all tests
npm run test:all

# Run tests in watch mode (auto-rerun on changes)
npm run test:watch

# Generate coverage report
npm run test:coverage
# Then open: coverage/lcov-report/index.html

# Run specific persona E2E tests
npm run test:e2e:support-agent

# Run E2E tests with visible browser
npm run test:e2e:headed

# Run accessibility tests
npm run test:e2e:accessibility

# Run performance tests (Lighthouse)
npm run test:performance

# Check code quality
npm run type-check
npm run lint
```

---

## Viewing Test Reports

### Coverage Report
```bash
npm run test:coverage
open coverage/lcov-report/index.html
```

### E2E Test Report
```bash
npm run test:e2e:report
```

### Lighthouse Report
```bash
npm run test:performance
open tests/reports/lighthouse/report.html
```

---

## Writing Your First Test

### Unit Test Example

Create `__tests__/unit/lib/my-function.test.ts`:

```typescript
import { myFunction } from '@/lib/my-function';

describe('myFunction', () => {
  test('should return expected result', () => {
    const result = myFunction('input');
    expect(result).toBe('expected output');
  });

  test('should handle edge cases', () => {
    expect(myFunction('')).toBe('');
    expect(myFunction(null)).toBeNull();
  });
});
```

Run it:
```bash
npm run test:unit -- my-function.test.ts
```

---

### E2E Test Example

Create `tests/e2e/my-workflow.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('My workflow', async ({ page }) => {
  await page.goto('http://localhost:3014/demo/support-agent');

  const input = page.locator('[data-testid="chat-input"]');
  await input.fill('What is my plate today');
  await input.press('Enter');

  await page.waitForSelector('[data-widget-type="agent-dashboard"]');

  const widget = page.locator('[data-widget-type="agent-dashboard"]');
  await expect(widget).toBeVisible();
});
```

Run it:
```bash
npm run test:e2e -- my-workflow.spec.ts
```

---

## Debugging Tests

### Debug Unit Tests

```bash
# Run specific test file
npm run test:unit -- query-detection.test.ts

# Run specific test
npm run test:unit -- -t "should detect executive summary"

# Watch mode
npm run test:watch
```

### Debug E2E Tests

```bash
# Run with visible browser
npm run test:e2e:headed

# Debug mode (interactive)
npm run test:e2e:debug

# Run specific test
npm run test:e2e -- -g "C-Level executive summary"
```

---

## CI/CD Integration

Tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

View results:
- **Actions tab** in GitHub
- **Coverage**: Codecov dashboard
- **Reports**: Download artifacts from GitHub Actions

---

## Troubleshooting

### "Module not found" errors
```bash
# Clear caches and reinstall
rm -rf node_modules coverage .next
npm install
```

### "Port 3014 already in use"
```bash
# Find and kill process
lsof -ti:3014 | xargs kill -9
```

### E2E tests timing out
```bash
# Check if server is running
curl http://localhost:3014/api/health

# Increase timeout in playwright.config.ts
timeout: 120000 // 2 minutes
```

### Database connection errors
```bash
# Check DATABASE_URL in .env.local
echo $DATABASE_URL

# Reset database
npm run db:push --force-reset
```

---

## Next Steps

- Read [COMPREHENSIVE-TESTING-STRATEGY.md](./COMPREHENSIVE-TESTING-STRATEGY.md) for detailed documentation
- Explore test files in `__tests__/` and `tests/` directories
- Check [TEST-COVERAGE-REPORT.md](./TEST-COVERAGE-REPORT.md) for current coverage
- Review [KNOWN-ISSUES.md](./KNOWN-ISSUES.md) for test limitations

---

**Happy Testing!** 🧪
