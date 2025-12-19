# Comprehensive Testing Strategy

**Project**: Enterprise AI Support V14
**Version**: 14.0.0
**Last Updated**: 2025-10-20
**Author**: Aquaman (QA Engineer)

---

## Table of Contents

1. [Overview](#overview)
2. [Testing Pyramid](#testing-pyramid)
3. [Test Categories](#test-categories)
4. [Test Coverage Goals](#test-coverage-goals)
5. [Testing Tools & Frameworks](#testing-tools--frameworks)
6. [Running Tests](#running-tests)
7. [CI/CD Integration](#cicd-integration)
8. [Test Reporting](#test-reporting)
9. [Best Practices](#best-practices)

---

## Overview

This document outlines the comprehensive testing strategy for Enterprise AI Support V14, a production-ready AI-powered support dashboard with multi-persona RBAC, 19 specialized widgets, and 7 automated workflows.

### Testing Objectives

- **Quality Assurance**: Ensure all features work as expected
- **Regression Prevention**: Catch bugs before they reach production
- **Performance Validation**: Meet performance benchmarks (90+ Lighthouse scores)
- **Accessibility Compliance**: WCAG 2.1 Level AA compliance
- **Security Validation**: Prevent XSS, CSRF, and other vulnerabilities
- **User Experience**: Validate workflows across all personas

### Key Metrics

- **Target Code Coverage**: 80%+ lines, 70%+ branches
- **Performance Scores**: 90+ (Lighthouse)
- **Accessibility Violations**: 0 critical issues
- **Test Execution Time**: < 15 minutes (full suite)
- **Test Success Rate**: 100% (no flaky tests)

---

## Testing Pyramid

We follow the testing pyramid approach with appropriate test distribution:

```
        /\
       /  \      E2E Tests (10%)
      /____\     - User workflows
     /      \    - Cross-browser testing
    /        \   Integration Tests (20%)
   /__________\  - API endpoints
  /            \ - Database operations
 /              \
/________________\ Unit Tests (70%)
                   - Utility functions
                   - Component logic
                   - Query detection
```

### Distribution

- **Unit Tests (70%)**: Fast, isolated, comprehensive
- **Integration Tests (20%)**: API routes, database, external services
- **E2E Tests (10%)**: Critical user workflows, persona validation

---

## Test Categories

### 1. Unit Tests

**Location**: `__tests__/unit/`

**Coverage**:
- Utility functions (`/lib/`)
- Query detection logic
- Data processing functions
- React component logic
- Type utilities

**Tools**: Jest, @testing-library/react

**Example**:
```typescript
describe('Query Detection', () => {
  test('should detect executive summary query', () => {
    const result = detectWidgetQuery('Show me executive summary', 'c-level');
    expect(result?.widgetType).toBe('executive-summary');
  });
});
```

**Run**: `npm run test:unit`

---

### 2. Integration Tests

**Location**: `__tests__/integration/`

**Coverage**:
- API route handlers
- Database operations
- External API integrations (Zoho, Jira)
- Authentication flows
- WebSocket connections

**Tools**: Jest, Supertest, Test Database

**Example**:
```typescript
describe('Health Check API', () => {
  test('should return 200 when healthy', async () => {
    const response = await GET();
    expect(response.status).toBe(200);
  });
});
```

**Run**: `npm run test:integration`

---

### 3. End-to-End (E2E) Tests

**Location**: `tests/e2e/`

**Coverage**:
- Complete user workflows
- Multi-step conversations
- Widget rendering
- Button interactions
- Cross-persona navigation

**Tools**: Playwright

**Test Suites**:
- **Persona Tests**: `tests/e2e/personas/`
  - C-Level Executive (7 test cases)
  - CS Manager (7 test cases)
  - Support Agent (12 test cases)

**Example**:
```typescript
test('C-Level executive summary workflow', async () => {
  await page.goto('http://localhost:3014/demo/c-level');
  await sendQuery(page, 'Show me executive summary');
  await assertWidgetVisible(page, 'executive-summary');
});
```

**Run**: `npm run test:e2e`

---

### 4. Accessibility Tests

**Location**: `tests/e2e/accessibility/`

**Standards**: WCAG 2.1 Level AA

**Coverage**:
- Automated accessibility scanning
- Keyboard navigation
- Screen reader compatibility
- Color contrast
- ARIA attributes
- Form labels
- Focus management

**Tools**: @axe-core/playwright

**Example**:
```typescript
test('should have no accessibility violations', async () => {
  await page.goto('http://localhost:3014/demo/support-agent');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});
```

**Run**: `npm run test:e2e:accessibility`

---

### 5. Performance Tests

**Location**: `lighthouserc.js`

**Metrics**:
- First Contentful Paint (FCP): < 2s
- Largest Contentful Paint (LCP): < 3s
- Cumulative Layout Shift (CLS): < 0.1
- Total Blocking Time (TBT): < 300ms
- Speed Index: < 3s

**Tools**: Lighthouse CI

**Pages Tested**:
- C-Level demo page
- CS Manager demo page
- Support Agent demo page

**Run**: `npm run test:performance`

---

### 6. Security Tests

**Location**: `__tests__/security/`

**Coverage**:
- XSS prevention
- CSRF protection
- Input validation
- SQL injection prevention
- Authentication vulnerabilities
- Authorization checks
- Rate limiting

**Tools**: Jest, Custom security utilities

**Example**:
```typescript
test('should sanitize script tags', () => {
  const malicious = '<script>alert("XSS")</script>';
  const sanitized = sanitizeInput(malicious);
  expect(sanitized).not.toContain('<script>');
});
```

**Run**: `npm run test:security`

---

### 7. Visual Regression Tests

**Location**: `tests/e2e/visual-regression/`

**Coverage**:
- Persona landing pages
- Widget screenshots
- Responsive design (mobile, tablet, desktop)
- Component snapshots

**Tools**: Playwright (screenshot comparison)

**Example**:
```typescript
test('C-Level landing page visual', async () => {
  await page.goto('http://localhost:3014/demo/c-level');
  await expect(page).toHaveScreenshot('c-level-landing.png', {
    maxDiffPixels: 100
  });
});
```

**Run**: Included in `npm run test:e2e`

---

## Test Coverage Goals

### Overall Coverage

```
Category          | Target | Current | Status
------------------|--------|---------|--------
Lines             | 80%    | TBD     | 🟡
Statements        | 80%    | TBD     | 🟡
Functions         | 70%    | TBD     | 🟡
Branches          | 70%    | TBD     | 🟡
```

### Critical Paths (100% Coverage Required)

- Authentication flows
- Query detection logic
- Widget rendering
- API health endpoints
- Security middleware

### Lower Priority (60%+ Coverage Acceptable)

- Mock data generators
- Development utilities
- Type definitions

---

## Testing Tools & Frameworks

### Core Frameworks

| Tool | Version | Purpose |
|------|---------|---------|
| **Jest** | 29.7.0 | Unit & Integration testing |
| **Playwright** | 1.55.1 | E2E testing |
| **@testing-library/react** | 16.1.0 | Component testing |
| **@axe-core/playwright** | 4.10.2 | Accessibility testing |
| **Lighthouse** | 12.2.1 | Performance audits |

### Additional Tools

- **@swc/jest**: Fast TypeScript/JSX transformation
- **jest-environment-jsdom**: DOM testing environment
- **@testing-library/user-event**: Realistic user interactions
- **@testing-library/jest-dom**: Custom DOM matchers

---

## Running Tests

### Quick Reference

```bash
# All tests
npm run test:all              # Run all test suites

# Unit tests
npm run test:unit             # Run unit tests only
npm run test:watch            # Run in watch mode
npm run test:coverage         # Generate coverage report

# Integration tests
npm run test:integration      # API & database tests

# E2E tests
npm run test:e2e              # All E2E tests
npm run test:e2e:headed       # With visible browser
npm run test:e2e:debug        # Debug mode
npm run test:e2e:c-level      # C-Level persona only
npm run test:e2e:cs-manager   # CS Manager persona only
npm run test:e2e:support-agent # Support Agent persona only

# Accessibility tests
npm run test:e2e:accessibility # WCAG compliance

# Performance tests
npm run test:performance      # Lighthouse audits

# Security tests
npm run test:security         # XSS, CSRF, etc.

# Code quality
npm run type-check            # TypeScript validation
npm run lint                  # ESLint validation
```

### Prerequisites

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Install Playwright browsers** (for E2E tests):
   ```bash
   npx playwright install chromium
   ```

3. **Start development server** (for E2E/performance tests):
   ```bash
   npm run dev        # Port 3014
   ```

4. **Database setup** (for integration tests):
   ```bash
   npm run db:generate
   npm run db:push
   ```

---

## CI/CD Integration

### GitHub Actions Workflow

**File**: `.github/workflows/test-suite.yml`

### Pipeline Jobs

1. **Code Quality** (2 min)
   - TypeScript type checking
   - ESLint validation

2. **Unit Tests** (3 min)
   - Run all unit tests
   - Generate coverage report

3. **Integration Tests** (4 min)
   - Spin up PostgreSQL
   - Run database migrations
   - Execute API tests

4. **E2E Tests** (8 min)
   - Build application
   - Start server
   - Run Playwright tests

5. **Accessibility Tests** (5 min)
   - Run axe-core scans
   - Validate WCAG compliance

6. **Security Tests** (2 min)
   - Run security test suite
   - npm audit check

7. **Performance Tests** (6 min)
   - Run Lighthouse CI
   - Validate performance scores

8. **Coverage Report** (2 min)
   - Aggregate coverage
   - Upload to Codecov
   - Comment on PR

### Total Pipeline Time: ~15 minutes

### Triggers

- **Push**: main, develop branches
- **Pull Request**: all branches → main/develop

---

## Test Reporting

### Local Reports

```bash
# Unit/Integration coverage
open coverage/lcov-report/index.html

# E2E Playwright report
npm run test:e2e:report

# Lighthouse report
open tests/reports/lighthouse/report.html
```

### CI Reports

- **Coverage**: Codecov dashboard
- **E2E**: GitHub Actions artifacts
- **Performance**: Lighthouse CI temporary storage
- **Accessibility**: Playwright HTML report

### PR Comments

Automated comments on pull requests include:
- Test coverage summary
- Failed tests (if any)
- Performance regression warnings
- Accessibility violation count

---

## Best Practices

### Writing Tests

1. **Descriptive Names**
   ```typescript
   // Good
   test('should detect executive summary query for C-Level persona')

   // Bad
   test('test 1')
   ```

2. **AAA Pattern** (Arrange, Act, Assert)
   ```typescript
   test('example', () => {
     // Arrange
     const query = 'Show me executive summary';

     // Act
     const result = detectWidgetQuery(query, 'c-level');

     // Assert
     expect(result?.widgetType).toBe('executive-summary');
   });
   ```

3. **Test Isolation**
   - No shared state between tests
   - Clean up after each test
   - Use `beforeEach` / `afterEach` hooks

4. **Avoid Flaky Tests**
   - Use proper wait mechanisms
   - Avoid hardcoded delays
   - Handle async operations correctly

5. **Mock External Dependencies**
   - Mock API calls
   - Mock database in unit tests
   - Use test databases for integration tests

### Maintenance

- Run tests before committing
- Keep tests up to date with features
- Refactor tests when refactoring code
- Remove obsolete tests
- Monitor test execution time

### Code Coverage

- Aim for 80%+ line coverage
- Focus on critical paths first
- Don't write tests just for coverage
- Test behavior, not implementation

---

## Test Data

### Mock Data Location

- Widget demo data: `src/data/demo-widget-data.ts`
- Test fixtures: `__tests__/fixtures/`
- E2E test data: Inline in test files

### Test Users

| Persona | Username | Access Level |
|---------|----------|--------------|
| C-Level | exec@test.com | Full access |
| CS Manager | manager@test.com | Team management |
| Support Agent | agent@test.com | Ticket handling |

---

## Troubleshooting

### Common Issues

**1. Tests timing out**
- Increase timeout in jest.config.js or playwright.config.ts
- Check if dev server is running
- Verify network connectivity

**2. E2E tests failing locally**
- Ensure dev server is on port 3014
- Clear browser cache: `npx playwright run --project=chromium --headed`
- Regenerate screenshots if intentional UI changes: `npm run test:e2e -- --update-snapshots`

**3. Coverage not updating**
- Delete coverage folder: `rm -rf coverage`
- Run `npm run test:coverage` again

**4. Database connection errors**
- Check DATABASE_URL environment variable
- Ensure PostgreSQL is running
- Run migrations: `npm run db:migrate`

---

## Future Enhancements

### Planned Improvements

- [ ] Visual regression testing with Percy
- [ ] Load testing with k6
- [ ] Cross-browser E2E tests (Firefox, Safari)
- [ ] Mutation testing with Stryker
- [ ] API contract testing with Pact
- [ ] Mobile app testing (if applicable)

---

## Contact

For questions or issues with the testing suite:

- **QA Team**: qa@enterprise-ai-support.com
- **Documentation**: `/docs/09-testing/`
- **Issues**: GitHub Issues

---

**Last Updated**: 2025-10-20
**Next Review**: 2025-11-20
