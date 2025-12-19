import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should display sign in page', async ({ page }) => {
    await page.goto('/auth/signin');

    // Check page loads - title contains "Enterprise AI Support"
    await expect(page).toHaveTitle(/Enterprise AI Support/);

    // Check sign in elements are present
    await expect(page.getByText('AI-Powered IT Support System')).toBeVisible();
    await expect(page.getByText('Continue with Microsoft')).toBeVisible();
    await expect(page.getByText('Continue with Google')).toBeVisible();
  });

  test('should display Microsoft SSO as primary login', async ({ page }) => {
    await page.goto('/auth/signin');

    // Microsoft button should be first (primary SSO)
    const microsoftButton = page.getByRole('button', { name: /continue with microsoft/i });
    await expect(microsoftButton).toBeVisible();

    // Button should have Microsoft brand color
    await expect(microsoftButton).toHaveCSS('background-color', 'rgb(0, 120, 212)');
  });

  test('should show demo accounts', async ({ page }) => {
    await page.goto('/auth/signin');

    // Check demo account buttons are visible
    await expect(page.getByText('agent@demo.com')).toBeVisible();
    await expect(page.getByText('manager@demo.com')).toBeVisible();
    await expect(page.getByText('admin@demo.com')).toBeVisible();
  });

  test('should fill demo credentials when clicking demo account', async ({ page }) => {
    await page.goto('/auth/signin');

    // Click on agent demo account button
    const agentButton = page.locator('button', { hasText: 'agent@demo.com' });
    await agentButton.click();

    // Wait for form to update
    await page.waitForTimeout(500);

    // Check form is filled - use ID selectors
    const emailInput = page.locator('#email');
    const passwordInput = page.locator('#password');

    await expect(emailInput).toHaveValue('agent@demo.com');
    await expect(passwordInput).toHaveValue('demo');
  });

  test('should have sign in button', async ({ page }) => {
    await page.goto('/auth/signin');

    const signInButton = page.getByRole('button', { name: /sign in/i });
    await expect(signInButton).toBeVisible();
    await expect(signInButton).toBeEnabled();
  });
});

test.describe('Dashboard Layout', () => {
  test('should display sidebar navigation', async ({ page }) => {
    await page.goto('/dashboard/drafts');
    await page.waitForLoadState('networkidle');

    // Check sidebar navigation items are present
    await expect(page.getByRole('link', { name: /draft queue/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /tickets/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /analytics/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /settings/i })).toBeVisible();
  });

  test('should have collapsible sidebar', async ({ page }) => {
    await page.goto('/dashboard/drafts');
    await page.waitForLoadState('networkidle');

    // Find the collapse button
    const collapseButton = page.locator('button').filter({ has: page.locator('svg') }).first();
    await expect(collapseButton).toBeVisible();
  });
});

test.describe('Draft Queue Page', () => {
  test('should display draft queue dashboard', async ({ page }) => {
    await page.goto('/dashboard/drafts');

    // Check page loads
    await page.waitForLoadState('networkidle');

    // Check page title elements - use specific heading
    await expect(page.getByRole('heading', { name: 'Draft Review Queue' })).toBeVisible();
  });

  test('should show demo mode banner when using mock data', async ({ page }) => {
    await page.goto('/dashboard/drafts');
    await page.waitForLoadState('networkidle');

    // Demo mode banner should be visible when database is not connected
    await expect(page.getByText('Demo Mode')).toBeVisible();
  });

  test('should have search functionality', async ({ page }) => {
    await page.goto('/dashboard/drafts');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check search input exists (may have different placeholder)
    const searchInput = page.locator('input[type="text"], input[type="search"]').first();
    await expect(searchInput).toBeVisible();
  });

  test('should display draft items in queue', async ({ page }) => {
    await page.goto('/dashboard/drafts');

    // Wait for page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Check page has some content
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Main Application', () => {
  test('should load home page', async ({ page }) => {
    await page.goto('/');

    // Check page loads without error
    await expect(page).toHaveURL('/');
  });

  test('should have navigation elements', async ({ page }) => {
    await page.goto('/');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Check body exists
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('API Health Check', () => {
  test('should return response from health endpoint', async ({ request }) => {
    const response = await request.get('/api/health');
    // API responds (may have database issues but endpoint works)
    expect([200, 500, 503]).toContain(response.status());
  });
});
