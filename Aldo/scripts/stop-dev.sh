#!/bin/bash

# Stop development environment

echo "🛑 Stopping Enterprise AI Support V14 Development Environment..."

# Kill Next.js
if [ -f /tmp/enterprise-ai-nextjs.pid ]; then
    NEXTJS_PID=$(cat /tmp/enterprise-ai-nextjs.pid)
    kill $NEXTJS_PID 2>/dev/null
    echo "✅ Stopped Next.js (PID: $NEXTJS_PID)"
    rm /tmp/enterprise-ai-nextjs.pid
fi

# Kill ngrok
if [ -f /tmp/enterprise-ai-ngrok.pid ]; then
    NGROK_PID=$(cat /tmp/enterprise-ai-ngrok.pid)
    kill $NGROK_PID 2>/dev/null
    echo "✅ Stopped ngrok (PID: $NGROK_PID)"
    rm /tmp/enterprise-ai-ngrok.pid
fi

# Clean up any remaining processes
lsof -ti:3014 | xargs kill -9 2>/dev/null || true
pkill -f ngrok 2>/dev/null || true

echo "✅ Development environment stopped"
