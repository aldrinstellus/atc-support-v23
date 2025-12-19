import { z } from 'zod';

/**
 * Environment Variable Validation
 *
 * Validates all environment variables at startup to catch configuration
 * errors early. Uses Zod for runtime validation with TypeScript inference.
 *
 * Usage:
 * import { env } from '@/lib/env';
 * const apiKey = env.ANTHROPIC_API_KEY;
 */

const envSchema = z.object({
  // Node Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Database
  DATABASE_URL: z.string().url().describe('PostgreSQL connection string'),

  // AI Integration (Optional in development)
  ANTHROPIC_API_KEY: z.string().min(1).optional().describe('Anthropic Claude API key'),

  // Zoho Desk Integration (Optional)
  ZOHO_CLIENT_ID: z.string().optional().describe('Zoho OAuth Client ID'),
  ZOHO_CLIENT_SECRET: z.string().optional().describe('Zoho OAuth Client Secret'),
  ZOHO_REFRESH_TOKEN: z.string().optional().describe('Zoho OAuth Refresh Token'),
  ZOHO_ORG_ID: z.string().optional().describe('Zoho Organization ID'),

  // WebSocket (Optional)
  NEXT_PUBLIC_WS_URL: z.string().url().optional().describe('WebSocket server URL'),

  // Redis/Upstash (Optional - for rate limiting)
  UPSTASH_REDIS_REST_URL: z.string().url().optional().describe('Upstash Redis REST URL'),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional().describe('Upstash Redis REST token'),

  // Logging (Optional)
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info').describe('Application log level'),
});

/**
 * Parse and validate environment variables
 *
 * This runs at module load time, so any misconfiguration will cause
 * the application to fail fast at startup rather than at runtime.
 */
function validateEnv() {
  try {
    const parsed = envSchema.parse(process.env);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Environment variable validation failed:');
      console.error('');

      const issues = error.issues || [];
      issues.forEach((err: z.ZodIssue) => {
        const path = err.path.join('.');
        console.error(`  • ${path}: ${err.message}`);
      });

      console.error('');
      console.error('Please check your .env.local file and ensure all required variables are set.');
      console.error('See .env.example for required environment variables.');
      console.error('');

      // In development, show more details
      if (process.env.NODE_ENV === 'development') {
        console.error('Full validation error:', JSON.stringify(error.issues, null, 2));
      }

      process.exit(1);
    }

    throw error;
  }
}

/**
 * Validated and typed environment variables
 *
 * Use this instead of process.env for type safety and validation.
 */
export const env = validateEnv();

/**
 * Type-safe access to environment variables
 * Inferred from the Zod schema
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Check if all optional integrations are configured
 */
export const integrations = {
  anthropic: Boolean(env.ANTHROPIC_API_KEY),
  zoho: Boolean(
    env.ZOHO_CLIENT_ID &&
    env.ZOHO_CLIENT_SECRET &&
    env.ZOHO_REFRESH_TOKEN &&
    env.ZOHO_ORG_ID
  ),
  websocket: Boolean(env.NEXT_PUBLIC_WS_URL),
  redis: Boolean(env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN),
};

// Log integration status in development
if (process.env.NODE_ENV === 'development') {
  console.log('');
  console.log('🔧 Integration Status:');
  console.log(`  • Anthropic Claude: ${integrations.anthropic ? '✅' : '❌'}`);
  console.log(`  • Zoho Desk:        ${integrations.zoho ? '✅' : '❌'}`);
  console.log(`  • WebSocket:        ${integrations.websocket ? '✅' : '❌'}`);
  console.log(`  • Redis (Upstash):  ${integrations.redis ? '✅' : '❌'}`);
  console.log('');
}
