#!/bin/bash

# Get current webhook URL

if [ -f /tmp/enterprise-ai-webhook-url.txt ]; then
    WEBHOOK_URL=$(cat /tmp/enterprise-ai-webhook-url.txt)
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🌐 Current Webhook URL:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "   ${WEBHOOK_URL}/api/zoho/webhook"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "📋 Configure in Zoho Desk:"
    echo "   Setup → Automation → Webhooks"
    echo ""
else
    echo "❌ Development environment not running"
    echo "   Run: ./start-dev.sh"
fi
