-- Restore Sarah Johnson agent metrics after schema update
-- Run this in Supabase SQL Editor or via psql

INSERT INTO "agent_metrics" (
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
  "performanceScore",
  "status",
  "lastUpdated",
  "dateRecorded"
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
  0,        -- currentWorkload = 0 (available!)
  20,       -- maxCapacity = 20
  0.95,     -- performanceScore
  'ACTIVE', -- status
  NOW(),    -- lastUpdated
  NOW()     -- dateRecorded
)
ON CONFLICT ("userId")
DO UPDATE SET
  "currentWorkload" = 0,
  "maxCapacity" = 20,
  "performanceScore" = 0.95,
  "status" = 'ACTIVE',
  "lastUpdated" = NOW();

-- Verify the agent is available
SELECT
  u.id,
  u.name,
  u.email,
  u.role,
  am."currentWorkload",
  am."maxCapacity",
  (am."maxCapacity" - am."currentWorkload") as "availableCapacity",
  am."performanceScore",
  am.status
FROM "users" u
LEFT JOIN "agent_metrics" am ON u.id = am."userId"
WHERE u.role = 'SUPPORT_AGENT'
  AND u."isActive" = true;
