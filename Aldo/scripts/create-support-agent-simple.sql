-- Create Demo Support Agent for Password Reset Workflow
-- Run this in Supabase SQL Editor

-- Step 1: Create a support agent user
INSERT INTO "users" (
  "id",
  "email",
  "name",
  "role",
  "password",
  "isActive",
  "createdAt",
  "updatedAt"
) VALUES (
  'agent-001',
  'sarah.johnson@support.com',
  'Sarah Johnson',
  'SUPPORT_AGENT',
  '$2a$10$dummyhashedpassword',
  true,
  NOW(),
  NOW()
)
ON CONFLICT ("email")
DO UPDATE SET
  "isActive" = true,
  "role" = 'SUPPORT_AGENT',
  "name" = 'Sarah Johnson',
  "updatedAt" = NOW();

-- Step 2: Create agent metrics
-- Try with the exact Prisma table name
INSERT INTO "AgentMetrics" (
  "id",
  "userId",
  "ticketsOpen",
  "ticketsInProgress",
  "ticketsResolved",
  "ticketsEscalated",
  "avgResponseTime",
  "avgResolutionTime",
  "firstContactResolution",
  "customerSatisfaction",
  "aiAssistedTickets",
  "aiSuccessRate",
  "currentWorkload",
  "maxCapacity",
  "ticketsCompleted",
  "performanceScore",
  "status",
  "createdAt",
  "updatedAt"
) VALUES (
  'metrics-agent-001',
  'agent-001',
  0,
  0,
  0,
  0,
  0.0,
  0.0,
  0.0,
  0.0,
  0,
  0.0,
  0,
  20,
  0,
  0.95,
  'ACTIVE',
  NOW(),
  NOW()
)
ON CONFLICT ("userId")
DO UPDATE SET
  "currentWorkload" = 0,
  "maxCapacity" = 20,
  "performanceScore" = 0.95,
  "status" = 'ACTIVE',
  "updatedAt" = NOW();

-- Verify the agent was created
SELECT
  u.id,
  u.email,
  u.name,
  u.role,
  u."isActive",
  am."currentWorkload",
  am."maxCapacity",
  am."performanceScore",
  am.status
FROM "users" u
LEFT JOIN "AgentMetrics" am ON u.id = am."userId"
WHERE u.role = 'SUPPORT_AGENT'
  AND u."isActive" = true;
