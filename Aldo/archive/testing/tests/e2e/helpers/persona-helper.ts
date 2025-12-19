import { Page } from '@playwright/test';

export type PersonaId = 'c-level' | 'cs-manager' | 'support-agent';

export interface PersonaInfo {
  id: PersonaId;
  name: string;
  role: string;
  route: string;
}

export const PERSONAS: Record<PersonaId, PersonaInfo> = {
  'c-level': {
    id: 'c-level',
    name: 'Sarah Chen',
    role: 'Chief Executive Officer',
    route: '/demo/c-level'
  },
  'cs-manager': {
    id: 'cs-manager',
    name: 'Michael Torres',
    role: 'CS Manager',
    route: '/demo/cs-manager'
  },
  'support-agent': {
    id: 'support-agent',
    name: 'Marcus Johnson',
    role: 'Support Agent',
    route: '/demo/support-agent'
  }
};

/**
 * Navigate to persona-specific demo page
 */
export async function navigateToPersona(page: Page, personaId: PersonaId) {
  const persona = PERSONAS[personaId];
  await page.goto(persona.route);
  await page.waitForLoadState('networkidle');

  // Wait for chat interface to be ready
  await page.waitForSelector('[data-testid="chat-input"]', { timeout: 10000 });
}

/**
 * Clear browser state and localStorage
 */
export async function clearBrowserState(page: Page) {
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  await page.reload();
  await page.waitForLoadState('networkidle');
}

/**
 * Get current persona from page context
 */
export async function getCurrentPersona(page: Page): Promise<PersonaId | null> {
  const currentRoute = page.url();
  for (const [id, persona] of Object.entries(PERSONAS)) {
    if (currentRoute.includes(persona.route)) {
      return id as PersonaId;
    }
  }
  return null;
}
