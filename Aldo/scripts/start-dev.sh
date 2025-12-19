#!/bin/bash

# Enterprise AI Support V14 - Development Startup Script
# This script starts both the Next.js dev server and ngrok tunnel

echo "🚀 Starting Enterprise AI Support V14 Development Environment..."
echo ""

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok is not installed. Please install it first:"
    echo "   brew install ngrok"
    exit 1
fi

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found. Please create it with required environment variables."
    exit 1
fi

# Kill any existing processes on port 3014
echo "🧹 Cleaning up existing processes..."
lsof -ti:3014 | xargs kill -9 2>/dev/null || true

# Kill any existing ngrok processes
pkill -f ngrok 2>/dev/null || true
sleep 2

echo ""
echo "✅ Starting Next.js dev server on port 3014..."
npm run dev &
NEXTJS_PID=$!

# Wait for Next.js to start
echo "⏳ Waiting for Next.js to be ready..."
sleep 5

echo ""
echo "✅ Starting ngrok tunnel..."
ngrok http 3014 --log=stdout > /tmp/ngrok.log 2>&1 &
NGROK_PID=$!

# Wait for ngrok to start
sleep 3

# Get the ngrok public URL
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels 2>/dev/null | python3 -c "import sys, json; data=json.load(sys.stdin); print(data['tunnels'][0]['public_url'])" 2>/dev/null)

if [ -z "$NGROK_URL" ]; then
    # Try alternative port (4041)
    NGROK_URL=$(curl -s http://localhost:4041/api/tunnels 2>/dev/null | python3 -c "import sys, json; data=json.load(sys.stdin); print(data['tunnels'][0]['public_url'])" 2>/dev/null)
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Development Environment Ready!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📍 Local Dev Server:    http://localhost:3014"
echo "🌐 Public Webhook URL:  ${NGROK_URL}/api/zoho/webhook"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "⚙️  Configure this webhook URL in Zoho Desk:"
echo "   1. Go to Setup → Automation → Webhooks"
echo "   2. Update webhook URL to: ${NGROK_URL}/api/zoho/webhook"
echo "   3. Events: Ticket Add + Ticket Thread Add"
echo "   4. Channel Filter: Email only"
echo ""
echo "💡 To stop: Press Ctrl+C or run './stop-dev.sh'"
echo ""
echo "📋 Process IDs:"
echo "   Next.js: $NEXTJS_PID"
echo "   ngrok:   $NGROK_PID"
echo ""

# Save PIDs for cleanup
echo "$NEXTJS_PID" > /tmp/enterprise-ai-nextjs.pid
echo "$NGROK_PID" > /tmp/enterprise-ai-ngrok.pid

# Save webhook URL for reference
echo "$NGROK_URL" > /tmp/enterprise-ai-webhook-url.txt

# Keep script running and wait for user to stop
trap "echo ''; echo '🛑 Shutting down...'; kill $NEXTJS_PID $NGROK_PID 2>/dev/null; exit 0" INT TERM

# Monitor logs
echo "📊 Monitoring logs (Ctrl+C to stop)..."
echo ""
tail -f /tmp/ngrok.log 2>/dev/null &
wait
