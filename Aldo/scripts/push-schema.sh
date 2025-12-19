#!/bin/bash

# Push Prisma schema to Supabase database
# This will create all missing tables

echo "Pushing Prisma schema to database..."

DATABASE_URL="postgresql://postgres:Fishfingers123!@db.neoyuxqcvaiwxpqauucp.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1" npx prisma db push --accept-data-loss

echo "✅ Schema pushed successfully!"
echo ""
echo "Now run the SQL script in Supabase to create the support agent:"
echo "1. Open Supabase SQL Editor"
echo "2. Copy contents of create-support-agent-simple.sql"
echo "3. Run the query"
