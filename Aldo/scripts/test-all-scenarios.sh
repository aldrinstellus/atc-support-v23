#!/bin/bash

# Test All Scenarios by Simulating Zoho Webhooks
# This script sends test webhook requests to verify all workflow handlers

echo "🧪 Testing All 7 Workflow Scenarios"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Base URL
BASE_URL="http://localhost:3014"

echo "${YELLOW}Test 1: Password Reset${NC}"
curl -X POST "${BASE_URL}/api/zoho/process-ticket" \
  -H "Content-Type: application/json" \
  -d '{
    "ticketId": "TEST-001",
    "eventType": "Ticket_Add",
    "payload": {
      "subject": "password lock reset",
      "ticketNumber": "TICKET-001",
      "priority": "High",
      "status": "Open",
      "email": "aldrinstellus@gmail.com",
      "contact": {
        "firstName": "Test",
        "lastName": "User",
        "email": "aldrinstellus@gmail.com"
      },
      "firstThread": {
        "content": "I need help resetting my password"
      },
      "webUrl": "https://test.zoho.com/ticket/1"
    },
    "headers": {
      "host": "localhost:3014"
    }
  }'
echo -e "\n${GREEN}✓ Sent${NC}\n"
sleep 2

echo "${YELLOW}Test 2: Password Reset Follow-up${NC}"
curl -X POST "${BASE_URL}/api/zoho/process-ticket" \
  -H "Content-Type: application/json" \
  -d '{
    "ticketId": "TEST-002",
    "eventType": "Ticket_Thread_Add",
    "payload": {
      "subject": "Re: Password Reset Help",
      "ticketNumber": "TICKET-002",
      "priority": "Medium",
      "status": "Open",
      "email": "aldrinstellus@gmail.com",
      "contact": {
        "firstName": "Test",
        "lastName": "User",
        "email": "aldrinstellus@gmail.com"
      },
      "content": "Thanks for the password reset link!",
      "webUrl": "https://test.zoho.com/ticket/2"
    },
    "headers": {
      "host": "localhost:3014"
    }
  }'
echo -e "\n${GREEN}✓ Sent${NC}\n"
sleep 2

echo "${YELLOW}Test 3: Access Request${NC}"
curl -X POST "${BASE_URL}/api/zoho/process-ticket" \
  -H "Content-Type: application/json" \
  -d '{
    "ticketId": "TEST-003",
    "eventType": "Ticket_Add",
    "payload": {
      "subject": "need access to sharepoint",
      "ticketNumber": "TICKET-003",
      "priority": "Medium",
      "status": "Open",
      "email": "aldrinstellus@gmail.com",
      "contact": {
        "firstName": "Test",
        "lastName": "User",
        "email": "aldrinstellus@gmail.com"
      },
      "firstThread": {
        "content": "I need access to the marketing folder in SharePoint"
      },
      "webUrl": "https://test.zoho.com/ticket/3"
    },
    "headers": {
      "host": "localhost:3014"
    }
  }'
echo -e "\n${GREEN}✓ Sent${NC}\n"
sleep 2

echo "${YELLOW}Test 4: Account Unlock${NC}"
curl -X POST "${BASE_URL}/api/zoho/process-ticket" \
  -H "Content-Type: application/json" \
  -d '{
    "ticketId": "TEST-004",
    "eventType": "Ticket_Add",
    "payload": {
      "subject": "account locked out",
      "ticketNumber": "TICKET-004",
      "priority": "High",
      "status": "Open",
      "email": "aldrinstellus@gmail.com",
      "contact": {
        "firstName": "Test",
        "lastName": "User",
        "email": "aldrinstellus@gmail.com"
      },
      "firstThread": {
        "content": "My account is locked and I cannot login"
      },
      "webUrl": "https://test.zoho.com/ticket/4"
    },
    "headers": {
      "host": "localhost:3014"
    }
  }'
echo -e "\n${GREEN}✓ Sent${NC}\n"
sleep 2

echo "${YELLOW}Test 5: General Support with KB Search${NC}"
curl -X POST "${BASE_URL}/api/zoho/process-ticket" \
  -H "Content-Type: application/json" \
  -d '{
    "ticketId": "TEST-005",
    "eventType": "Ticket_Add",
    "payload": {
      "subject": "vpn connection issues",
      "ticketNumber": "TICKET-005",
      "priority": "Medium",
      "status": "Open",
      "email": "aldrinstellus@gmail.com",
      "contact": {
        "firstName": "Test",
        "lastName": "User",
        "email": "aldrinstellus@gmail.com"
      },
      "firstThread": {
        "content": "I cannot connect to the company VPN from home"
      },
      "webUrl": "https://test.zoho.com/ticket/5"
    },
    "headers": {
      "host": "localhost:3014"
    }
  }'
echo -e "\n${GREEN}✓ Sent${NC}\n"
sleep 2

echo "${YELLOW}Test 6: Email Notifications${NC}"
curl -X POST "${BASE_URL}/api/zoho/process-ticket" \
  -H "Content-Type: application/json" \
  -d '{
    "ticketId": "TEST-006",
    "eventType": "Ticket_Add",
    "payload": {
      "subject": "not receiving email notifications",
      "ticketNumber": "TICKET-006",
      "priority": "Medium",
      "status": "Open",
      "email": "aldrinstellus@gmail.com",
      "contact": {
        "firstName": "Test",
        "lastName": "User",
        "email": "aldrinstellus@gmail.com"
      },
      "firstThread": {
        "content": "I am not receiving any email notifications from the system"
      },
      "webUrl": "https://test.zoho.com/ticket/6"
    },
    "headers": {
      "host": "localhost:3014"
    }
  }'
echo -e "\n${GREEN}✓ Sent${NC}\n"
sleep 2

echo "${YELLOW}Test 7: Printer Issue${NC}"
curl -X POST "${BASE_URL}/api/zoho/process-ticket" \
  -H "Content-Type: application/json" \
  -d '{
    "ticketId": "TEST-007",
    "eventType": "Ticket_Add",
    "payload": {
      "subject": "printer not working",
      "ticketNumber": "TICKET-007",
      "priority": "Low",
      "status": "Open",
      "email": "aldrinstellus@gmail.com",
      "contact": {
        "firstName": "Test",
        "lastName": "User",
        "email": "aldrinstellus@gmail.com"
      },
      "firstThread": {
        "content": "The printer on the 3rd floor is not printing"
      },
      "webUrl": "https://test.zoho.com/ticket/7"
    },
    "headers": {
      "host": "localhost:3014"
    }
  }'
echo -e "\n${GREEN}✓ Sent${NC}\n"

echo ""
echo "=================================="
echo "${GREEN}✓ All 7 scenarios tested!${NC}"
echo ""
echo "📧 Check aldrinstellus@gmail.com for 7 emails:"
echo "   1. Purple - Password Reset Help"
echo "   2. Blue - Password Reset Confirmed"
echo "   3. Green - Access Request Processed"
echo "   4. Orange - Account Unlocked"
echo "   5. Cyan - VPN Help (with KB article)"
echo "   6. Green - Email Notifications Fixed"
echo "   7. Purple - Printer Issue Escalated"
echo ""
