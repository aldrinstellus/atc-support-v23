POC Vision & Architecture Analysis

  Core Design Principles (from Meeting Transcript)

  1. Assistant-First Interface
  - Primary interaction is through chat/conversation
  - Slack-inspired navigation: Chat history + Dashboard tabs
  - Dashboards are created dynamically via chat commands, not pre-built
  - User asks "Show me X" → Assistant creates a dashboard tab for that view

  2. Proactive AI Behavior
  - Assistant should anticipate needs and offer suggestions
  - Not just reactive - should identify patterns and recommend actions
  - Example: "I notice John Doe is overloaded. Should I rebalance his workload?"

  3. Light Mode Preference
  - Light mode preferred for demos and executive presentations
  - Better visibility and professional appearance
  - ✅ Already implemented in our V3 project

  Per-Persona Data Structure (from Bhanu's Demo Data)

  PERSONA 1: C-Level Executive (CCO/CEO)

  Primary Focus: Strategic oversight, customer health, SLA performance

  Widget Types:
  1. executive-summary - Daily summary with:
    - SLA Performance (target vs actual, trend)
    - Customer Health (at-risk count, risk score changes)
    - Ticket Volume (trends, comparisons)
    - Team Performance (avg resolution time, top performers)
    - Key Insights (AI-generated observations)
    - Recommended Actions (prioritized action items)
  2. customer-risk-profile - Deep dive on specific customers:
    - Risk score with trend (0-100 scale)
    - Risk factors (critical tickets, sentiment, escalations, response time)
    - Recent activity timeline
    - AI analysis of situation
    - Prioritized recommendations with estimated impact
  3. sla-performance-chart - SLA breakdown:
    - By category (First Response, Critical Resolution, etc.)
    - Compliance percentage per category
    - Top breaches with root causes
    - Root cause analysis (pie chart data)
    - Trend data over time (weekly comparison)
  4. meeting-scheduler - Calendar integration:
    - Available time slots
    - Attendee availability
    - Auto-generated agenda
    - Conflict detection

  Key Metrics:
  - SLA compliance % (target: 90%)
  - Customer risk scores (0-100, with thresholds)
  - ARR values per customer
  - Sentiment scores (0-100)
  - Contract renewal days remaining
  - Churn probability percentage

  ---
  PERSONA 2: CS Manager

  Primary Focus: Team workload, agent performance, customer assignments

  Widget Types:
  1. team-workload-dashboard - Real-time team view:
    - Agent status (online, busy, offline, overloaded)
    - Ticket count vs capacity per agent
    - Load percentage (0-150%+)
    - Active tickets breakdown by priority
    - Alerts (SLA risks, overload warnings)
    - AI recommendations for workload rebalancing
  2. ticket-list - Filtered ticket views:
    - By agent, customer, priority, status
    - Age in days
    - SLA status (on-track, at-risk, breached)
    - Customer risk indicator
    - Last update info
    - Summary counts by priority and SLA status
  3. agent-performance-comparison - Team analytics:
    - Top performers (ranked 1-3) with metrics:
        - Tickets resolved
      - Avg resolution time
      - SLA compliance %
      - Customer satisfaction (1-5 scale)
      - First response time
    - Needs attention (bottom performers)
    - Team averages for benchmarking
    - Strengths and concerns per agent
    - Coaching recommendations
  4. message-composer - Communication drafts:
    - AI-generated message drafts
    - Tone variants (professional, casual, formal)
    - AI insights on messaging approach
    - Alternative phrasings
  5. customer-risk-list - Portfolio view:
    - All high-risk customers
    - Risk level (critical, high, medium, low)
    - Open/critical ticket counts
    - Escalation count
    - Sentiment (positive, neutral, negative, mixed)
    - Primary issues tags
    - Assigned CSM

  Key Metrics:
  - Agent capacity % (0-150%+)
  - Tickets per agent
  - Average response time (hours)
  - SLA compliance % per agent
  - Customer satisfaction scores (1-5)
  - Workload distribution across team
  - Performance badges (⭐ Top Performer, 🚀 Rising Star, etc.)

  ---
  PERSONA 3: Support Agent

  Primary Focus: Personal queue, ticket resolution, customer interactions

  Widget Types:
  1. agent-dashboard - Personal overview:
    - Total tickets with priority breakdown
    - Due soon count
    - Needs response count
    - SLA risk alerts
    - AI prioritization suggestions
    - Quick wins identification
    - Upcoming meetings
    - Performance snapshot (weekly stats)
  2. ticket-detail - Comprehensive ticket view:
    - Customer profile (name, plan, ARR, risk score, contact info)
    - Ticket metadata (created, assigned, tags, category)
    - SLA tracking (response time, resolution time, deadline, breach info)
    - Full description
    - Complete timeline (all interactions)
    - Related tickets
    - Jira integration (linked issues, status, comments)
    - AI insights:
        - Sentiment analysis (score 0-100, trend, analysis)
      - Recommended actions
      - Similar ticket suggestions
  3. call-prep-notes - Meeting preparation:
    - Customer summary
    - Open issues list
    - Recent interactions
    - Talking points
    - Potential questions
    - Risks and concerns
  4. response-composer - AI-assisted replies:
    - Suggested response drafts
    - Tone options
    - Canned response suggestions
    - Similar ticket references
    - Knowledge base article recommendations
  5. similar-tickets-analysis - Pattern recognition:
    - Similar past tickets
    - Resolution strategies that worked
    - Common patterns
    - Knowledge base references
  6. knowledge-base-search - Article discovery:
    - Relevant KB articles
    - Search results with relevance scoring
    - Quick preview
    - Link to full article
  7. agent-performance-stats - Personal metrics:
    - Tickets resolved (daily, weekly)
    - Avg resolution time
    - SLA compliance %
    - Customer satisfaction score
    - First response time
    - Comparison to team average
    - Performance trend

  Key Metrics:
  - Personal ticket queue size
  - Tickets resolved (daily/weekly counts)
  - Average response time (hours)
  - Customer satisfaction (1-5 scale)
  - SLA compliance % (personal)
  - Due soon count
  - Needs response count

  ---
  Conversational Flow Pattern

  All personas follow this interaction model:

  1. User asks question → type: "user"
  2. AI acknowledges → type: "ai" (brief text response)
  3. AI shows data widget → type: "widget" with specific widgetType
  4. User follows up → Loop continues

  Example:
  User: "Good morning. Give me the executive summary"
  AI: "Good morning, Michael. Here's your executive summary:"
  [Widget: executive-summary with full data]
  User: "Tell me more about Acme Corp"
  AI: "Let me pull up Acme Corp's detailed risk profile:"
  [Widget: customer-risk-profile with detailed data]

  ---
  Data Structure Patterns

  Common Fields Across All Widgets:

  - title - Widget heading
  - timestamp - When data was generated
  - data - Main payload object

  Status Indicators:

  - SLA Status: on-track, at-risk, breached
  - Priority: critical, high, medium, low
  - Risk Level: critical, high, medium, low
  - Sentiment: positive, neutral, negative, mixed, very negative
  - Agent Status: online, busy, offline, overloaded

  Color Coding:

  - Success: Green (SLA met, high performance)
  - Warning: Yellow/Orange (at-risk, moderate concerns)
  - Error: Red (SLA breached, critical issues)
  - Info: Blue (general information)

  ---
  Key Differences from Current V3 Implementation

  Current V3:

  - Static personas with pre-defined quick actions
  - Click-based navigation
  - Pre-built dashboard views
  - Persona switching via modal

  Bhanu's Vision:

  - Dynamic dashboard creation via chat
  - Conversational interface as primary interaction
  - Widget-based responses (not static pages)
  - Slack-style tabs for conversation history + created dashboards
  - Proactive AI suggestions embedded in responses

---------

📊 PERSONA 1: C-LEVEL EXECUTIVE (CEO/CCO)

  Persona Profile:
  - Name: Michael Chen (in your V3: Sarah Chen)
  - Role: Chief Customer Officer
  - Focus: Strategic oversight, customer health, SLA performance

  Widgets Used:

  1. ✅ executive-summary (DONE)
    - SLA Performance metrics
    - Customer Health (at-risk customers)
    - Ticket Volume trends
    - Team Performance averages
    - Key AI insights
    - Recommended actions
  2. ✅ customer-risk-profile (DONE)
    - Individual customer deep-dive
    - Risk score with trend
    - Risk factors breakdown
    - Recent activity timeline
    - AI analysis
    - Prioritized recommendations
  3. ⏳ sla-performance-chart
    - Overall compliance vs target
    - By category breakdown
    - Trend data (weekly comparison)
    - Top SLA breaches
    - Root cause analysis
  4. ✅ meeting-scheduler (DONE)
    - Executive call scheduling
    - Attendee management
    - Agenda generation

  Typical Queries:

  "Good morning. Give me the executive summary for today."
  "Tell me more about Acme Corp. Why did their risk score increase?"
  "Schedule that executive call. Who should attend from our side?"
  "Show me the SLA performance breakdown. Which categories are we failing?"

  Key Metrics C-Level Sees:

  - SLA compliance % (target: 90%)
  - Customer risk scores (0-100 scale)
  - ARR values at risk
  - Churn probability %
  - Sentiment scores
  - Contract renewal timelines

  ---
  👥 PERSONA 2: CS MANAGER

  Persona Profile:
  - Name: Jennifer Walsh (in your V3: Michael Torres)
  - Role: Customer Success Manager
  - Focus: Team workload, agent performance, customer portfolio

  Widgets Used:

  1. ✅ team-workload-dashboard (DONE)
    - Real-time agent status (online/busy/offline/overloaded)
    - Ticket count vs capacity per agent
    - Load percentage (0-150%+)
    - Active tickets by priority
    - SLA risk alerts
    - AI workload rebalancing recommendations
  2. ✅ ticket-list (DONE)
    - Filtered by agent, customer, priority, status
    - Age in days
    - SLA status (on-track/at-risk/breached)
    - Customer risk indicators
    - Summary counts
  3. ⏳ agent-performance-comparison
    - Top performers (ranked 1-3)
        - Tickets resolved
      - Avg resolution time
      - SLA compliance %
      - Customer satisfaction (1-5)
      - First response time
    - Needs attention (bottom performers)
    - Team averages for benchmarking
  4. ⏳ message-composer
    - AI-generated message drafts
    - Tone variants (professional/casual/formal)
    - AI insights on messaging approach
  5. ✅ customer-risk-list (DONE)
    - Portfolio view of all high-risk customers
    - Risk levels (critical/high/medium/low)
    - Open/critical ticket counts
    - Escalation count
    - Sentiment indicators
    - Primary issues tags
  6. ✅ meeting-scheduler (DONE)
    - 1-on-1 coaching sessions
    - Team meetings
    - Coaching tips included

  Typical Queries:

  "Good morning. Show me my team's status."
  "That's concerning about John. Show me his tickets."
  "Apply the AI recommendation. Rebalance his workload."
  "Yes, draft that message."
  "Show me the top and bottom performers this week."
  "Schedule a 1-on-1 with John for coaching."
  "Show me all high-risk customers."

  Key Metrics CS Manager Sees:

  - Agent capacity % (0-150%+)
  - Tickets per agent
  - Average response time (hours)
  - SLA compliance % per agent
  - Customer satisfaction scores (1-5)
  - Workload distribution
  - Performance badges (⭐ Top Performer, 🚀 Rising Star, ⚠️ Needs Support)

  ---
  🎧 PERSONA 3: SUPPORT AGENT

  Persona Profile:
  - Name: Sarah Chen (in your V3: Alex Rivera)
  - Role: Senior Support Engineer
  - Focus: Personal queue, ticket resolution, customer interactions

  Widgets Used:

  1. ✅ agent-dashboard (DONE)
    - Total tickets with priority breakdown
    - Due soon count
    - Needs response count
    - SLA risk alerts
    - AI prioritization suggestions
    - Quick wins identification
    - Upcoming meetings today
    - Performance snapshot (weekly stats)
  2. ⏳ ticket-detail
    - Complete customer profile
    - Ticket metadata
    - SLA tracking (response/resolution times)
    - Full timeline of all interactions
    - Related tickets
    - Jira integration (linked issues, status, comments)
    - AI sentiment analysis
    - Recommended next actions
  3. ✅ ticket-list (DONE)
    - My open tickets
    - Escalated to me
    - By priority/status
  4. ⏳ call-prep-notes
    - Customer summary
    - Open issues list
    - Recent interactions
    - Talking points
    - Potential questions
    - Risks and concerns
  5. ⏳ response-composer
    - AI-suggested response drafts
    - Tone options
    - Canned response suggestions
    - Similar ticket references
    - Knowledge base recommendations
  6. ⏳ similar-tickets-analysis
    - Similar past tickets
    - Resolution strategies that worked
    - Common patterns
    - Knowledge base references
  7. ⏳ agent-performance-stats
    - Personal metrics dashboard
    - Tickets resolved (daily/weekly)
    - Avg resolution time
    - Customer satisfaction
    - SLA compliance
    - Comparison to team average
  8. ⏳ knowledge-base-search
    - Relevant KB articles
    - Search results with relevance scoring
    - Quick preview
  9. ✅ meeting-scheduler (DONE)
    - Customer meetings
    - Prep notes integration

  Typical Queries:

  "Good morning! What's on my plate today?"
  "Show me ticket #4521 details."
  "Show me all my currently open support tickets."
  "How many tickets did AI resolve for me today?"
  "Prep notes for my 2 PM customer call."
  "Draft response for ticket DESK-1002."
  "Show me my scheduled customer meetings for today."

  Key Metrics Support Agent Sees:

  - Personal ticket queue size
  - Tickets resolved (daily/weekly)
  - Average response time (hours)
  - Customer satisfaction (1-5 scale)
  - SLA compliance % (personal)
  - Due soon count
  - AI-resolved ticket count

  ---
  📋 WIDGET-TO-PERSONA MAPPING

  | Widget                       | C-Level     | CS Manager  | Support Agent | Status  |
  |------------------------------|-------------|-------------|---------------|---------|
  | executive-summary            | ✅ Primary   | ❌           | ❌             | ✅ Built |
  | customer-risk-profile        | ✅ Primary   | ✅ Secondary | ❌             | ✅ Built |
  | sla-performance-chart        | ✅ Primary   | ✅ Secondary | ❌             | ⏳ TODO  |
  | team-workload-dashboard      | ❌           | ✅ Primary   | ❌             | ✅ Built |
  | ticket-list                  | ❌           | ✅ Primary   | ✅ Primary     | ✅ Built |
  | agent-performance-comparison | ❌           | ✅ Primary   | ❌             | ⏳ TODO  |
  | agent-dashboard              | ❌           | ❌           | ✅ Primary     | ✅ Built |
  | ticket-detail                | ✅ Secondary | ✅ Secondary | ✅ Primary     | ⏳ TODO  |
  | meeting-scheduler            | ✅ Secondary | ✅ Secondary | ✅ Secondary   | ✅ Built |
  | message-composer             | ❌           | ✅ Primary   | ❌             | ⏳ TODO  |
  | call-prep-notes              | ❌           | ❌           | ✅ Primary     | ⏳ TODO  |
  | response-composer            | ❌           | ❌           | ✅ Primary     | ⏳ TODO  |
  | similar-tickets-analysis     | ❌           | ❌           | ✅ Secondary   | ⏳ TODO  |
  | agent-performance-stats      | ❌           | ❌           | ✅ Secondary   | ⏳ TODO  |
  | knowledge-base-search        | ❌           | ❌           | ✅ Secondary   | ⏳ TODO  |
  | customer-risk-list           | ✅ Secondary | ✅ Primary   | ❌             | ✅ Built |

  ---
  🎯 Conversational Flow Pattern (All Personas)

  Bhanu's pattern is always:
  1. User asks question → type: "user"
  2. AI brief text response → type: "ai"
  3. Widget with detailed data → type: "widget"

  Example:
  User: "Show me my team's status"
  AI: "Good morning, Jennifer. Here's your team overview:"
  [Widget: team-workload-dashboard with full agent data]

  ---
  💡 Key Differences from Your Current V3

  Your Current V3:
  - Static personas with pre-defined quick actions
  - Single dashboard per query
  - Metric cards (simple)

  Bhanu's Vision:
  - Dynamic conversations with context
  - Multiple widgets per conversation
  - Rich, interactive widgets with AI insights
  - Proactive recommendations embedded in data

--------------
 🏢 PERSONA 1: C-LEVEL EXECUTIVE (Chief Customer Officer)

  Name: Michael ChenConversation: Morning Dashboard Check

  Questions (6 total):

  1. "Good morning. Give me the executive summary for today."
    - Triggers: executive-summary widget
    - Response: SLA performance, customer health, ticket volume, team performance
  2. "Tell me more about Acme Corp. Why did their risk score increase?"
    - Triggers: customer-risk-profile widget
    - Response: Detailed risk analysis with factors, activity, AI insights
  3. "Schedule that executive call. Who should attend from our side?"
    - Triggers: AI text response with attendee recommendations
    - Follow-up leads to meeting-scheduler widget
  4. "Yes, find a time today or tomorrow. Make it 1 hour."
    - Triggers: meeting-scheduler widget
    - Response: Available time slots with attendee availability
  5. "Book the January 16th at 1pm slot."
    - Triggers: Confirmation action
    - Response: Meeting confirmation with calendar invites sent
  6. "Show me the SLA performance breakdown. Which categories are we failing?"
    - Triggers: sla-performance-chart widget
    - Response: SLA metrics by category, trends, breaches, root causes

  ---
  👥 PERSONA 2: CS MANAGER (Customer Success Manager)

  Name: Jennifer WalshConversation 1: Morning Team Check

  Questions (9 total):

  1. "Good morning. Show me my team's status."
    - Triggers: team-workload-dashboard widget
    - Response: All agents with load %, capacity, tickets, SLA compliance
  2. "That's concerning about John. Show me his tickets."
    - Triggers: ticket-list widget (filtered by agent: John Doe)
    - Response: All John's tickets with SLA status, priorities, ages
  3. "Apply the AI recommendation. Rebalance his workload."
    - Triggers: AI confirmation dialog
    - Response: Workload rebalancing plan (6 to Lisa, 3 to Emma)
  4. "Yes, do it."
    - Triggers: Action execution
    - Response: Tickets reassigned, capacity updated, notifications sent
  5. "Yes, draft that message."
    - Triggers: message-composer widget
    - Response: AI-drafted message to John about workload changes
  6. "Perfect. Send it."
    - Triggers: Send action
    - Response: Message sent confirmation
  7. "Show me the top and bottom performers this week."
    - Triggers: agent-performance-comparison widget
    - Response: Top 3 performers vs agents needing attention
  8. "Schedule a 1-on-1 with John for coaching."
    - Triggers: meeting-scheduler widget
    - Response: Available slots + suggested agenda + coaching tips

  Conversation 2: High-Risk Customer Review

  9. "Show me all high-risk customers."
    - Triggers: customer-risk-list widget
    - Response: List of high-risk customers with risk scores, ARR, tickets

  ---
  🎧 PERSONA 3: SUPPORT AGENT (Senior Support Engineer)

  Name: Sarah ChenConversation 1: Morning Queue Review

  Questions (13 total):

  1. "Good morning! What's on my plate today?"
    - Triggers: agent-dashboard widget
    - Response: Personal queue summary, priorities, AI suggestions, meetings
  2. "Show me ticket #4521 details."
    - Triggers: ticket-detail widget
    - Response: Full ticket with customer info, timeline, Jira link, AI sentiment
  3. "I need to prepare for tomorrow's call. Help me draft prep notes."
    - Triggers: call-prep-notes widget
    - Response: Customer summary, open issues, talking points, concerns
  4. "Perfect. Now show me my other tickets that need attention."
    - Triggers: ticket-list widget (filtered by needs attention)
    - Response: Tickets awaiting response or at SLA risk
  5. "Let me start with #4523. Show me the details."
    - Triggers: ticket-detail widget
    - Response: Full ticket details for #4523
  6. "Draft a response for this ticket."
    - Triggers: response-composer widget
    - Response: AI-suggested response with tone options, canned responses
  7. "Perfect, send it."
    - Triggers: Send action
    - Response: Response sent, ticket status updated, SLA time recorded
  8. "Yes, show me #4524 about Salesforce integration."
    - Triggers: ticket-detail widget
    - Response: Full details for #4524
  9. "Draft response with the fix."
    - Triggers: response-composer widget
    - Response: Technical response with fix steps
  10. "Send it. Now show me similar tickets I've resolved before so I can learn the patterns."
    - Triggers: Send action + similar-tickets-analysis widget
    - Response: Past similar tickets with resolution patterns
  11. "Interesting. Show me my performance stats for the week."
    - Triggers: agent-performance-stats widget
    - Response: Personal metrics vs team average
  12. "How do I troubleshoot SSO authentication issues?"
    - Triggers: knowledge-base-search widget
    - Response: Relevant KB articles with previews
  13. "Open KB-892."
    - Triggers: knowledge-article widget
    - Response: Full KB article with troubleshooting steps

  ---
  📊 QUERY PATTERN ANALYSIS

  C-Level Query Patterns:

  - Strategic questions (executive summary, SLA performance)
  - Customer-focused (risk profiles, churn analysis)
  - Action-oriented (schedule calls, get briefings)
  - High-level metrics (what's failing, who's at risk)

  CS Manager Query Patterns:

  - Team management (team status, workload distribution)
  - Performance monitoring (top/bottom performers)
  - Resource allocation (rebalance workload, schedule coaching)
  - Customer portfolio (high-risk customers, account reviews)
  - Communication (draft messages, send notifications)

  Support Agent Query Patterns:

  - Personal productivity (what's on my plate, my tickets)
  - Ticket deep-dives (show me details, draft response)
  - Execution actions (send it, update status)
  - Learning & improvement (similar tickets, performance stats)
  - Knowledge seeking (how do I, troubleshooting guides)

  ---
  🎯 Conversation Flow Examples

  C-Level Full Flow:

  1. Morning greeting → Executive Summary
  2. Follow-up on concern → Customer Risk Profile
  3. Take action → Schedule Meeting
  4. Confirm details → Meeting Scheduler
  5. Book meeting → Confirmation
  6. Deep-dive on metrics → SLA Performance Chart

  CS Manager Full Flow:

  1. Morning check → Team Workload Dashboard
  2. Identify issue → Ticket List (agent-specific)
  3. AI suggests action → Workload Rebalancing
  4. Execute action → Tickets Reassigned
  5. Draft communication → Message Composer
  6. Send message → Confirmation
  7. Review performance → Agent Performance Comparison
  8. Schedule coaching → Meeting Scheduler
  9. Portfolio review → Customer Risk List

  Support Agent Full Flow:

  1. Morning check → Agent Dashboard
  2. Select priority → Ticket Detail
  3. Prepare for call → Call Prep Notes
  4. View queue → Ticket List
  5. Work on ticket → Ticket Detail
  6. Draft response → Response Composer
  7. Send response → Confirmation
  8. Next ticket → Ticket Detail
  9. Learn patterns → Similar Tickets Analysis
  10. Check stats → Agent Performance Stats
  11. Get help → Knowledge Base Search
  12. View article → Knowledge Article

-----
