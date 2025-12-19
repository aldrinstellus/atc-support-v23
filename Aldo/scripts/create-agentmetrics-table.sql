-- Create AgentMetrics table manually
-- Run this in Supabase SQL Editor FIRST

CREATE TABLE IF NOT EXISTS "AgentMetrics" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT UNIQUE NOT NULL,

  -- Daily Stats
  "ticketsOpen" INTEGER DEFAULT 0 NOT NULL,
  "ticketsInProgress" INTEGER DEFAULT 0 NOT NULL,
  "ticketsResolved" INTEGER DEFAULT 0 NOT NULL,
  "ticketsEscalated" INTEGER DEFAULT 0 NOT NULL,

  -- Performance Stats
  "avgResponseTime" DOUBLE PRECISION DEFAULT 0 NOT NULL,
  "avgResolutionTime" DOUBLE PRECISION DEFAULT 0 NOT NULL,
  "firstContactResolution" DOUBLE PRECISION DEFAULT 0 NOT NULL,
  "customerSatisfaction" DOUBLE PRECISION DEFAULT 0 NOT NULL,

  -- AI Integration Stats
  "aiAssistedTickets" INTEGER DEFAULT 0 NOT NULL,
  "aiSuccessRate" DOUBLE PRECISION DEFAULT 0 NOT NULL,

  -- Workload
  "currentWorkload" INTEGER DEFAULT 0 NOT NULL,
  "maxCapacity" INTEGER DEFAULT 20 NOT NULL,
  "ticketsCompleted" INTEGER DEFAULT 0 NOT NULL,
  "performanceScore" DOUBLE PRECISION DEFAULT 0 NOT NULL,
  "status" TEXT DEFAULT 'ACTIVE' NOT NULL,

  -- Timestamps
  "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,

  -- Foreign key
  CONSTRAINT "AgentMetrics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create index on userId
CREATE UNIQUE INDEX IF NOT EXISTS "AgentMetrics_userId_key" ON "AgentMetrics"("userId");

-- Confirm table created
SELECT
  table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name = 'AgentMetrics'
ORDER BY ordinal_position;
