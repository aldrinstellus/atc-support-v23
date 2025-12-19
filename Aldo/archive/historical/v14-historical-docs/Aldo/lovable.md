# 🚀 Lovable.dev Migration Guide - Enterprise AI Support Dashboard

**Complete specifications for rebuilding the Enterprise AI Support Dashboard in Lovable.dev**

---

## 1️⃣ STARTER PROMPT FOR LOVABLE.DEV

Copy/paste this into Lovable.dev to begin:

```
Build an Enterprise AI Support Dashboard with an assistant-first chat interface.

CORE CONCEPT:
- Chat-based interface where users ask questions in natural language
- AI responds with rich, interactive widgets based on the query and user role
- 3 user personas: C-Level Executive, CS Manager, Support Agent
- Each persona sees different widgets for the same types of questions

TECHNICAL STACK:
- React 19 with TypeScript
- Tailwind CSS with custom Solar Dusk theme (I'll provide CSS)
- Framer Motion for animations
- shadcn/ui components
- Lucide React icons

KEY FEATURES:
1. Persona selector (switch between 3 roles)
2. Chat interface with message history
3. Natural language query detection (pattern matching)
4. 17 different widget types that render based on query + persona
5. 2-stage loading: text response → skeleton loader → animated widget
6. Conversation history with localStorage
7. Sidebar with conversation management

WIDGETS TO BUILD (17 total):
- Executive Summary Dashboard
- Customer Risk Profile
- SLA Performance Chart
- Team Workload Dashboard
- Agent Performance Comparison
- Customer Risk List
- Message Composer
- Agent Dashboard
- Ticket Detail View
- Ticket List
- Call Prep Notes
- Response Composer
- Similar Tickets Analysis
- Agent Performance Stats
- Knowledge Base Search
- Knowledge Article Viewer
- Meeting Scheduler

QUERY DETECTION:
- Client-side pattern matching (no AI needed initially)
- Query examples:
  * "executive summary" → Executive Summary widget
  * "tell me more about Acme" → Customer Risk Profile
  * "show me ticket #2847" → Ticket Detail
  * "my performance stats" → Agent Performance Stats

UI/UX REQUIREMENTS:
- Glass-morphism cards
- Smooth fade-in animations (framer-motion)
- Professional skeleton loaders
- WCAG 2.1 AA accessible
- Responsive (mobile, tablet, desktop)
- Dark mode with Solar Dusk theme

Start with:
1. The basic chat interface layout
2. Persona selector component
3. Message rendering with text support
4. Then we'll add widgets one by one

I have complete demo data, CSS theme, and all widget specifications ready to provide.
```

---

## 2️⃣ SOLAR DUSK THEME - CSS CONFIGURATION

### Complete Theme CSS

```css
/* Solar Dusk Theme - Complete Configuration */

:root {
  /* Base Colors (OKLCH) */
  --background: oklch(0.15 0.02 270);           /* Deep purple-black */
  --foreground: oklch(0.95 0.01 270);           /* Near white */

  --card: oklch(0.18 0.025 270);                /* Slightly lighter than bg */
  --card-foreground: oklch(0.95 0.01 270);

  --popover: oklch(0.18 0.025 270);
  --popover-foreground: oklch(0.95 0.01 270);

  --primary: oklch(0.65 0.25 280);              /* Vibrant purple */
  --primary-foreground: oklch(0.98 0.01 280);

  --secondary: oklch(0.25 0.03 270);            /* Dark purple-gray */
  --secondary-foreground: oklch(0.95 0.01 270);

  --muted: oklch(0.25 0.03 270);
  --muted-foreground: oklch(0.65 0.02 270);     /* Medium gray */

  --accent: oklch(0.3 0.04 270);                /* Accent purple */
  --accent-foreground: oklch(0.95 0.01 270);

  --destructive: oklch(0.55 0.25 25);           /* Warm red */
  --destructive-foreground: oklch(0.98 0.01 25);

  --border: oklch(0.3 0.04 270);                /* Subtle border */
  --input: oklch(0.3 0.04 270);
  --ring: oklch(0.65 0.25 280);                 /* Focus ring */

  /* Chart Colors */
  --chart-1: oklch(0.65 0.25 280);              /* Purple */
  --chart-2: oklch(0.7 0.2 160);                /* Teal */
  --chart-3: oklch(0.75 0.2 85);                /* Yellow */
  --chart-4: oklch(0.65 0.25 25);               /* Orange-red */
  --chart-5: oklch(0.7 0.2 320);                /* Pink */

  /* Radius */
  --radius: 0.5rem;
}

/* Glass-morphism effect for cards */
.glass-card {
  background: oklch(0.18 0.025 270 / 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid oklch(0.3 0.04 270 / 0.3);
}

/* Gradient backgrounds */
.gradient-bg {
  background: linear-gradient(
    135deg,
    oklch(0.15 0.02 270) 0%,
    oklch(0.2 0.03 280) 100%
  );
}

/* Glow effects for important elements */
.glow-primary {
  box-shadow: 0 0 20px oklch(0.65 0.25 280 / 0.3);
}

/* Status colors */
.status-success {
  color: oklch(0.7 0.2 160);
  background: oklch(0.7 0.2 160 / 0.1);
}

.status-warning {
  color: oklch(0.75 0.2 85);
  background: oklch(0.75 0.2 85 / 0.1);
}

.status-error {
  color: oklch(0.65 0.25 25);
  background: oklch(0.65 0.25 25 / 0.1);
}

.status-info {
  color: oklch(0.65 0.25 280);
  background: oklch(0.65 0.25 280 / 0.1);
}
```

### Tailwind Config Alternative

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        border: "oklch(0.3 0.04 270)",
        input: "oklch(0.3 0.04 270)",
        ring: "oklch(0.65 0.25 280)",
        background: "oklch(0.15 0.02 270)",
        foreground: "oklch(0.95 0.01 270)",
        primary: {
          DEFAULT: "oklch(0.65 0.25 280)",
          foreground: "oklch(0.98 0.01 280)",
        },
        secondary: {
          DEFAULT: "oklch(0.25 0.03 270)",
          foreground: "oklch(0.95 0.01 270)",
        },
        destructive: {
          DEFAULT: "oklch(0.55 0.25 25)",
          foreground: "oklch(0.98 0.01 25)",
        },
        muted: {
          DEFAULT: "oklch(0.25 0.03 270)",
          foreground: "oklch(0.65 0.02 270)",
        },
        accent: {
          DEFAULT: "oklch(0.3 0.04 270)",
          foreground: "oklch(0.95 0.01 270)",
        },
        card: {
          DEFAULT: "oklch(0.18 0.025 270)",
          foreground: "oklch(0.95 0.01 270)",
        },
        chart: {
          1: "oklch(0.65 0.25 280)",
          2: "oklch(0.7 0.2 160)",
          3: "oklch(0.75 0.2 85)",
          4: "oklch(0.65 0.25 25)",
          5: "oklch(0.7 0.2 320)",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
    },
  },
}
```

---

## 3️⃣ APPLICATION ARCHITECTURE

### Layout Structure

```
┌─────────────────────────────────────────────────┐
│              Main App Layout                     │
│  ┌──────────┐  ┌──────────────────────────────┐ │
│  │          │  │    Chat Interface             │ │
│  │ Sidebar  │  │  ┌────────────────────────┐  │ │
│  │          │  │  │  Persona Selector      │  │ │
│  │ Convos   │  │  └────────────────────────┘  │ │
│  │          │  │  ┌────────────────────────┐  │ │
│  │          │  │  │  Message History       │  │ │
│  │          │  │  │  - User messages       │  │ │
│  │          │  │  │  - AI responses        │  │ │
│  │          │  │  │  - Widgets             │  │ │
│  │          │  │  └────────────────────────┘  │ │
│  │          │  │  ┌────────────────────────┐  │ │
│  │          │  │  │  Input Box             │  │ │
│  │          │  │  └────────────────────────┘  │ │
│  └──────────┘  └──────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### Core Type Definitions

```typescript
// Personas
type PersonaId = 'c-level' | 'cs-manager' | 'support-agent';

interface Persona {
  id: PersonaId;
  name: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

// Messages
interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  widgetType?: WidgetType;
  widgetData?: WidgetData;
  widgetLoading?: boolean;
}

// Conversations
interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
  messages: Message[];
  personaId: PersonaId;
  pinned?: boolean;
  archived?: boolean;
  tags?: string[];
}

// Query Detection
interface QueryMatch {
  widgetType: WidgetType;
  widgetData: WidgetData;
  responseText: string;
}

// Widget Types
type WidgetType =
  | 'executive-summary'
  | 'customer-risk-profile'
  | 'sla-performance-chart'
  | 'team-workload-dashboard'
  | 'agent-performance-comparison'
  | 'customer-risk-list'
  | 'message-composer'
  | 'agent-dashboard'
  | 'ticket-detail'
  | 'ticket-list'
  | 'call-prep-notes'
  | 'response-composer'
  | 'similar-tickets-analysis'
  | 'agent-performance-stats'
  | 'knowledge-base-search'
  | 'knowledge-article'
  | 'meeting-scheduler';
```

### Query Detection System

```typescript
function detectWidgetQuery(
  query: string,
  personaId: PersonaId
): QueryMatch | null {
  const q = query.toLowerCase().trim();

  switch (personaId) {
    case 'c-level':
      return detectCLevelQuery(q);
    case 'cs-manager':
      return detectManagerQuery(q);
    case 'support-agent':
      return detectAgentQuery(q);
    default:
      return null;
  }
}

function detectCLevelQuery(q: string): QueryMatch | null {
  // Executive Summary
  if (q.includes('executive summary') ||
      q.includes('system health') ||
      (q.includes('good morning') && q.includes('summary')) ||
      (q.includes('show me') && (q.includes('dashboard') || q.includes('summary')))) {
    return {
      widgetType: 'executive-summary',
      widgetData: executiveSummaryDemo,
      responseText: "Good morning. Here's your executive summary for today:",
    };
  }

  // Customer Risk Profile
  if (q.includes('tell me more about') ||
      q.includes('risk score') ||
      q.includes('why did') ||
      (q.includes('acme') && (q.includes('risk') || q.includes('increase')))) {
    return {
      widgetType: 'customer-risk-profile',
      widgetData: customerRiskProfileDemo,
      responseText: "Let me pull up the detailed risk profile:",
    };
  }

  // SLA Performance
  if (q.includes('sla performance') ||
      q.includes('sla breakdown') ||
      (q.includes('which categories') && q.includes('failing')) ||
      (q.includes('show me') && q.includes('sla'))) {
    return {
      widgetType: 'sla-performance-chart',
      widgetData: slaPerformanceChartDemo,
      responseText: "Here's the detailed SLA performance breakdown:",
    };
  }

  // Meeting Scheduler
  if (q.includes('schedule') ||
      q.includes('book') ||
      (q.includes('executive call') && q.includes('attend'))) {
    return {
      widgetType: 'meeting-scheduler',
      widgetData: meetingSchedulerDemo,
      responseText: "I've found available time slots for the executive call:",
    };
  }

  return null;
}

// Similar patterns for detectManagerQuery and detectAgentQuery
```

---

## 4️⃣ WIDGET SPECIFICATIONS (All 17)

### Widget 1: Executive Summary

```typescript
interface ExecutiveSummaryData {
  title: string;
  overallSLA: {
    current: string;
    target: string;
    trend: 'up' | 'down';
  };
  highRiskCustomers: number;
  systemHealth: 'excellent' | 'good' | 'warning' | 'critical';
  insights: Array<{
    type: 'success' | 'warning' | 'info';
    message: string;
  }>;
  metrics: Array<{
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
  }>;
}

// Demo Data
const executiveSummaryDemo: ExecutiveSummaryData = {
  title: "Executive Summary",
  overallSLA: {
    current: "87%",
    target: "90%",
    trend: "down"
  },
  highRiskCustomers: 3,
  systemHealth: "warning",
  insights: [
    { type: "warning", message: "SLA compliance down 3% this week" },
    { type: "success", message: "Customer satisfaction up 2 points" },
    { type: "info", message: "3 accounts require executive attention" }
  ],
  metrics: [
    { label: "Active Tickets", value: "47", change: "+5", trend: "up" },
    { label: "Avg Resolution", value: "2.3h", change: "-0.5h", trend: "down" },
    { label: "CSAT Score", value: "4.6", change: "+0.2", trend: "up" }
  ]
};

// Visual Requirements
- Large SLA gauge (current vs target)
- Customer health indicators
- Insight cards with color-coded icons
- Metric cards with trend arrows
- Responsive grid layout
```

### Widget 2: Customer Risk Profile

```typescript
interface CustomerRiskProfileData {
  customerName: string;
  riskScore: number; // 0-100
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  riskFactors: Array<{
    factor: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
  }>;
  recentEscalations: Array<{
    date: string;
    type: string;
    status: string;
  }>;
  actionPlan: string[];
  accountHealth: {
    revenue: string;
    tenure: string;
    tickets: number;
    satisfaction: number;
  };
}

// Demo Data
const customerRiskProfileDemo: CustomerRiskProfileData = {
  customerName: "Acme Corporation",
  riskScore: 87,
  riskLevel: "high",
  riskFactors: [
    {
      factor: "SLA Breaches",
      severity: "high",
      description: "3 P1 tickets exceeded response time in last 30 days"
    },
    {
      factor: "Escalations",
      severity: "medium",
      description: "2 escalations to leadership in past 2 weeks"
    }
  ],
  recentEscalations: [
    { date: "2024-01-12", type: "SLA Breach", status: "Resolved" },
    { date: "2024-01-08", type: "Executive Complaint", status: "In Progress" }
  ],
  actionPlan: [
    "Schedule executive call within 24 hours",
    "Review SLA terms and provide remediation plan",
    "Assign dedicated account manager"
  ],
  accountHealth: {
    revenue: "$250K ARR",
    tenure: "3 years",
    tickets: 47,
    satisfaction: 3.2
  }
};

// Visual Requirements
- Large risk score circle/gauge (color-coded)
- Risk level badge
- Risk factors with severity indicators
- Timeline of escalations
- Action plan checklist
- Account health metrics grid
```

### Widget 3: SLA Performance Chart

```typescript
interface SLAPerformanceChartData {
  overallSLA: {
    current: string;
    target: string;
  };
  categories: Array<{
    name: string;
    sla: string;
    target: string;
    trend: string;
    status: 'good' | 'warning' | 'critical';
  }>;
  topBreaches: Array<{
    ticket: string;
    customer: string;
    breach: string;
    impact: 'low' | 'medium' | 'high';
  }>;
  rootCauses: Array<{
    cause: string;
    percentage: number;
  }>;
  recommendations: string[];
}

// Visual Requirements
- Overall SLA comparison (current vs target)
- Category breakdown table/chart
- Color-coded status indicators (green/yellow/red)
- Top breaches list with impact levels
- Root cause pie chart or bar chart
- Recommendation callout boxes
```

### Widget 4: Team Workload Dashboard

```typescript
interface TeamWorkloadDashboardData {
  teamSize: number;
  avgUtilization: string;
  openTickets: number;
  agents: Array<{
    name: string;
    utilization: number;
    activeTickets: number;
    status: 'available' | 'busy' | 'overloaded';
  }>;
  workloadDistribution: {
    labels: string[];
    data: number[];
  };
}

// Visual Requirements
- Team summary metrics (size, utilization, tickets)
- Agent capacity grid with status indicators
- Utilization bars/gauges per agent
- Color coding (green = available, yellow = busy, red = overloaded)
- Workload distribution chart
```

### Widget 5: Agent Performance Comparison

```typescript
interface AgentPerformanceComparisonData {
  period: string;
  topPerformers: Array<{
    name: string;
    metrics: {
      resolved: number;
      csat: string;
      avgTime: string;
    };
    badge: string;
  }>;
  teamAverages: {
    resolved: number;
    csat: string;
    avgTime: string;
  };
  needsAttention: Array<{
    name: string;
    issue: string;
    recommendation: string;
  }>;
}

// Visual Requirements
- Top performers cards with badges/stars
- Team average comparison section
- Performance metrics table
- Coaching recommendations
- Color-coded performance indicators
```

### Widget 6: Customer Risk List

```typescript
interface CustomerRiskListData {
  totalHighRisk: number;
  customers: Array<{
    name: string;
    riskScore: number;
    trend: 'up' | 'down' | 'stable';
    lastContact: string;
    openTickets: number;
    primaryConcern: string;
  }>;
}

// Visual Requirements
- Total count header
- Scrollable customer list
- Risk score badges (color-coded)
- Trend indicators (arrows)
- Quick action buttons
- Sortable/filterable columns
```

### Widget 7: Message Composer

```typescript
interface MessageComposerData {
  recipient: {
    name: string;
    role: string;
    company: string;
    email: string;
  };
  context: {
    reason: string;
    relatedTickets: string[];
    customerHealth: string;
    lastContact: string;
  };
  suggestedTone: 'professional' | 'empathetic' | 'direct' | 'formal';
  aiDraftedMessage: {
    subject: string;
    body: string;
  };
  talkingPoints: string[];
  templateOptions: Array<{
    name: string;
    description: string;
    preview: string;
  }>;
  schedulingSuggestion?: {
    preferredTimes: string[];
    meetingDuration: string;
  };
}

// Visual Requirements
- Recipient info card
- Context summary section
- Tone badge/selector
- Editable email draft (subject + body)
- Talking points list
- Template option cards
- Scheduling suggestions
- Send/Save/Template buttons
```

### Widget 8: Agent Dashboard

```typescript
interface AgentDashboardData {
  agentName: string;
  activeTickets: number;
  pendingResponses: number;
  upcomingMeetings: Array<{
    time: string;
    title: string;
    customer: string;
  }>;
  priorities: Array<{
    ticket: string;
    customer: string;
    priority: 'urgent' | 'high' | 'medium';
    dueIn: string;
  }>;
  dailySummary: string;
}

// Visual Requirements
- Personalized greeting with agent name
- Quick stats cards (tickets, responses)
- Priority ticket list (color-coded)
- Meeting schedule
- Daily summary callout box
```

### Widget 9: Ticket Detail

```typescript
interface TicketDetailData {
  ticketId: string;
  title: string;
  customer: string;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  status: string;
  createdAt: string;
  timeline: Array<{
    date: string;
    actor: string;
    action: string;
    details?: string;
  }>;
  jiraIntegration?: {
    issueKey: string;
    status: string;
    url: string;
  };
  aiSentiment: {
    score: number;
    trend: 'improving' | 'declining' | 'stable';
  };
  sla: {
    responseTime: {
      status: 'met' | 'at-risk' | 'breached';
      remaining: string
    };
    resolutionTime: {
      status: 'met' | 'at-risk' | 'breached';
      remaining: string
    };
  };
  recommendedActions: string[];
}

// Visual Requirements
- Ticket header (ID, priority badge, status)
- Customer info section
- Activity timeline with icons
- Jira integration badge/link
- AI sentiment gauge
- SLA status indicators (color-coded)
- Recommended actions list
```

### Widget 10: Ticket List

```typescript
interface TicketListData {
  total: number;
  tickets: Array<{
    id: string;
    title: string;
    customer: string;
    priority: 'P1' | 'P2' | 'P3' | 'P4';
    status: string;
    age: string;
    slaStatus: 'good' | 'warning' | 'critical';
  }>;
}

// Visual Requirements
- Total ticket count
- Sortable table or card grid
- Priority badges (color-coded)
- SLA status indicators
- Quick action buttons
- Filtering/search options
```

### Widget 11: Call Prep Notes

```typescript
interface CallPrepNotesData {
  customerName: string;
  callType: string;
  scheduledTime: string;
  customerContext: {
    company: string;
    accountHealth: string;
    riskScore: number;
  };
  talkingPoints: Array<{
    priority: 'high' | 'medium' | 'low';
    point: string;
  }>;
  potentialObjections: Array<{
    objection: string;
    response: string;
  }>;
  successCriteria: string[];
  aiRecommendations: string[];
}

// Visual Requirements
- Call header with customer and time
- Customer context card
- Prioritized talking points (color-coded)
- Objection handling guide (collapsible)
- Success criteria checklist
- AI recommendations callout
```

### Widget 12: Response Composer

```typescript
interface ResponseComposerData {
  ticketContext: string;
  aiGeneratedResponse: string;
  templateOptions: Array<{
    name: string;
    preview: string;
  }>;
  knowledgeBaseArticles: Array<{
    id: string;
    title: string;
    relevance: number;
  }>;
  responseTips: string[];
}

// Visual Requirements
- Context summary
- Editable response text area
- Template selector (dropdown or cards)
- KB article suggestions with relevance scores
- Tips/best practices sidebar
- Send/Edit/Save buttons
```

### Widget 13: Similar Tickets Analysis

```typescript
interface SimilarTicketsAnalysisData {
  category: string;
  ticketsAnalyzed: number;
  avgResolutionTime: string;
  successRate: string;
  commonPatterns: Array<{
    pattern: string;
    frequency: number;
    percentage: number;
    avgResolutionTime: string;
    typicalSolution: string;
    examples: string[];
  }>;
  yourStrengths: string[];
  improvementOpportunities: string[];
  bestPractices: Array<{
    practice: string;
    impact: string;
  }>;
}

// Visual Requirements
- Summary metrics (tickets, time, success rate)
- Pattern breakdown with progress bars
- Strength highlights (badges or list)
- Improvement suggestions
- Best practices guide with impact scores
```

### Widget 14: Agent Performance Stats

```typescript
interface AgentPerformanceStatsData {
  period: string;
  agentName: string;
  keyMetrics: {
    ticketsResolved: {
      value: number;
      trend: string;
      comparison: string;
      percentile: string
    };
    avgResolutionTime: {
      value: string;
      trend: string;
      comparison: string;
      percentile: string
    };
    firstResponseTime: {
      value: string;
      trend: string;
      comparison: string;
      percentile: string
    };
    slaCompliance: {
      value: string;
      trend: string;
      comparison: string;
      percentile: string
    };
    customerSatisfaction: {
      value: string;
      trend: string;
      comparison: string;
      percentile: string
    };
  };
  trendChart: {
    labels: string[];
    datasets: Array<{ label: string; data: number[] }>;
  };
  categoryBreakdown: Array<{
    category: string;
    count: number;
    percentage: number;
    avgTime: string;
  }>;
  achievements: Array<{
    badge: string;
    description: string;
    dateEarned: string;
  }>;
  feedback: Array<{
    date: string;
    customer: string;
    rating: number;
    comment: string;
  }>;
}

// Visual Requirements
- Metric cards with percentile badges
- Trend indicators (arrows)
- Performance trend chart (line or bar)
- Category breakdown table
- Achievement badges display
- Customer feedback quotes
```

### Widget 15: Knowledge Base Search

```typescript
interface KnowledgeBaseSearchData {
  query: string;
  resultsCount: number;
  topResults: Array<{
    id: string;
    title: string;
    category: string;
    relevance: number;
    excerpt: string;
    views: number;
    lastUpdated: string;
    rating: number;
    tags: string[];
  }>;
  relatedSearches: string[];
  aiSuggestion?: string;
}

// Visual Requirements
- Search query display
- Results count
- AI suggestion callout (if present)
- Article result cards with:
  - Relevance score badge
  - Title and excerpt
  - Metadata (views, rating, date)
  - Tags
- Related searches list
- Click to open article
```

### Widget 16: Knowledge Article

```typescript
interface KnowledgeArticleData {
  id: string;
  title: string;
  category: string;
  lastUpdated: string;
  author: string;
  views: number;
  rating: number;
  tags: string[];
  sections: Array<{
    heading: string;
    content: string;
    type?: 'text' | 'code' | 'list' | 'warning' | 'tip';
    items?: string[];
    code?: { language: string; snippet: string };
  }>;
  relatedArticles: Array<{
    id: string;
    title: string;
    relevance: number;
  }>;
  helpfulCount: number;
  notHelpfulCount: number;
}

// Visual Requirements
- Article header (title, metadata, rating stars)
- Category and tags
- Multi-section content with type-based rendering:
  - Text sections (regular paragraphs)
  - Code blocks (syntax highlighted)
  - List sections (bulleted)
  - Warning callouts (yellow/orange background)
  - Tip callouts (blue/teal background)
- Related articles sidebar
- Helpful/not helpful feedback buttons
- Apply to ticket button
```

### Widget 17: Meeting Scheduler

```typescript
interface MeetingSchedulerData {
  meetingType: string;
  participants: string[];
  availableSlots: Array<{
    date: string;
    time: string;
    duration: string;
  }>;
  suggestedAgenda: string[];
}

// Visual Requirements
- Meeting type badge
- Participant list with avatars/icons
- Available time slot cards (clickable)
- Suggested agenda items
- Schedule/Book button
```

---

## 5️⃣ LOADING & ANIMATION SEQUENCE

### 2-Stage Loading Pattern

```typescript
// Step-by-step flow
1. User sends message
   ↓
2. Create placeholder assistant message
   ↓
3. Detect widget match
   ↓
4. After 500ms:
   - Show AI text response
   - Display skeleton loader
   ↓
5. After additional 600ms:
   - Hide skeleton
   - Fade in widget with framer-motion
```

### Framer Motion Configuration

```typescript
// Widget fade-in animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  <WidgetRenderer type={widgetType} data={widgetData} />
</motion.div>

// Skeleton pulse animation
<motion.div
  animate={{ opacity: [0.5, 1, 0.5] }}
  transition={{ duration: 2, repeat: Infinity }}
  className="glass-card rounded-lg border border-border bg-card/70 p-4"
>
  <div className="h-6 bg-muted/50 rounded w-3/4 mb-3" />
  <div className="h-4 bg-muted/50 rounded w-full mb-2" />
  <div className="h-4 bg-muted/50 rounded w-5/6" />
</motion.div>
```

---

## 6️⃣ DATA PERSISTENCE

### localStorage Structure

```typescript
// Conversation storage per persona
{
  "conversations-c-level": [
    {
      id: "1736789123456",
      title: "Executive Summary Review",
      timestamp: "2024-01-15T10:30:00Z",
      messages: [...],
      personaId: "c-level",
      pinned: false,
      archived: false,
      tags: []
    }
  ],
  "conversations-cs-manager": [...],
  "conversations-support-agent": [...],

  // Saved queries per persona
  "savedQueries-c-level": [
    "executive summary",
    "sla breakdown",
    "tell me more about Acme"
  ],
  "savedQueries-cs-manager": [...],
  "savedQueries-support-agent": [...],

  // UI preferences
  "sidebarOpen": true,
  "preferredPersona": "support-agent"
}
```

### Auto-save Implementation

```typescript
// Save conversation on message update
useEffect(() => {
  if (messages.length > 0) {
    const timeoutId = setTimeout(() => {
      saveCurrentConversation();
    }, 2000); // Debounce by 2 seconds

    return () => clearTimeout(timeoutId);
  }
}, [messages]);

function saveCurrentConversation() {
  const key = `conversations-${currentPersona.id}`;
  const existing = JSON.parse(localStorage.getItem(key) || '[]');

  const updated = {
    id: currentConversationId,
    title: generateTitle(messages),
    timestamp: new Date().toISOString(),
    messages: messages,
    personaId: currentPersona.id,
    pinned: false,
    archived: false
  };

  const newConversations = [
    updated,
    ...existing.filter(c => c.id !== currentConversationId)
  ];

  localStorage.setItem(key, JSON.stringify(newConversations));
}
```

---

## 7️⃣ PRIORITY BUILD ORDER

### Phase 1: Foundation (Days 1-2)

**Prompt to Lovable:**
```
Create the basic layout with:
1. Responsive sidebar (collapsible)
2. Main chat area
3. Persona selector component with 3 options
4. Basic message rendering (text only)
5. Input box with send button
6. New conversation button

Use the Solar Dusk theme CSS I provided.
```

**Deliverables:**
- Layout component
- Persona selector
- Message list
- Input component
- Sidebar navigation

---

### Phase 2: Query Detection (Day 3)

**Prompt to Lovable:**
```
Add query detection system:
1. Create detectWidgetQuery function with pattern matching
2. Support for C-Level persona with 4 widget types:
   - "executive summary" → executive-summary
   - "tell me more about" → customer-risk-profile
   - "sla performance" → sla-performance-chart
   - "schedule" → meeting-scheduler
3. Return QueryMatch with widgetType, widgetData, responseText
4. Log detection results to console

I'll provide the detection logic and demo data.
```

**Deliverables:**
- Query detection module
- Pattern matching logic
- Demo data structure

---

### Phase 3: Widget System (Day 4)

**Prompt to Lovable:**
```
Create widget infrastructure:
1. WidgetRenderer component that routes by type
2. WidgetSkeleton loader with pulse animation
3. 2-stage loading: text (500ms) → skeleton → widget (600ms)
4. Framer Motion fade-in for widgets
5. Build first widget: Executive Summary

Use the ExecutiveSummaryData interface and demo data I'll provide.
```

**Deliverables:**
- WidgetRenderer
- WidgetSkeleton
- First widget component

---

### Phase 4: Core Widgets (Days 5-7)

**Build these widgets one by one:**

Day 5:
- Customer Risk Profile
- SLA Performance Chart

Day 6:
- Team Workload Dashboard
- Agent Performance Comparison

Day 7:
- Customer Risk List
- Agent Dashboard

**For each widget, provide:**
- TypeScript interface
- Demo data
- Visual requirements
- Layout specs

---

### Phase 5: Advanced Widgets (Days 8-10)

Day 8:
- Ticket Detail (most complex)
- Ticket List

Day 9:
- Call Prep Notes
- Response Composer

Day 10:
- Similar Tickets Analysis
- Agent Performance Stats

---

### Phase 6: Knowledge & Collaboration Widgets (Days 11-12)

Day 11:
- Knowledge Base Search
- Knowledge Article

Day 12:
- Message Composer
- Meeting Scheduler

---

### Phase 7: Polish & Features (Days 13-14)

**Prompt to Lovable:**
```
Add final features:
1. Conversation management (save, load, delete)
2. localStorage persistence
3. Conversation titles auto-generation
4. Pin/archive conversations
5. Saved queries feature
6. Accessibility improvements (ARIA labels, keyboard nav)
7. Mobile responsive design
8. Error handling and fallbacks
```

**Deliverables:**
- Full conversation management
- Data persistence
- Responsive design
- Accessibility features

---

## 8️⃣ COMPLETE QUERY PATTERN REFERENCE

### C-Level Executive (10 patterns)

```typescript
// Executive Summary (4 patterns)
"executive summary"
"system health"
"good morning, show me the summary"
"show me the dashboard"

// Customer Risk Profile (4 patterns)
"tell me more about Acme"
"risk score"
"why did the risk increase"
"Acme risk"

// SLA Performance (4 patterns)
"sla performance breakdown"
"sla breakdown"
"which categories are failing"
"show me the sla"

// Meeting Scheduler (3 patterns)
"schedule a meeting"
"book executive call"
"schedule"
```

### CS Manager (12 patterns)

```typescript
// Team Workload (4 patterns)
"show me team status"
"what's my team's status"
"show me my team"
"good morning, how's my team"

// Agent Performance (5 patterns)
"show me top and bottom performers"
"performance comparison"
"top performers"
"bottom performers"
"show me performers"

// Customer Risk List (3 patterns)
"show me high-risk customers"
"at-risk customers"
"show me all risk"

// Ticket List (3 patterns)
"show me tickets"
"show me his tickets"
"show me her tickets"

// Meeting Scheduler (2 patterns)
"schedule 1-on-1"
"schedule coaching"

// Message Composer (4 patterns)
"draft message to customer"
"compose message"
"write email"
"message customer"
```

### Support Agent (20+ patterns)

```typescript
// Agent Dashboard (3 patterns)
"good morning"
"what's on my plate today"
"my plate today"

// Ticket Detail (4 patterns)
"show me ticket #2847"
"ticket #2847 details"
"ticket number 2847"
"details 2847"

// Call Prep Notes (4 patterns)
"prepare for call"
"draft prep notes"
"call preparation"
"help me prepare"

// Response Composer (4 patterns)
"draft response"
"draft a response"
"help me respond"
"compose response"

// Ticket List (3 patterns)
"my tickets"
"tickets that need attention"
"show me other tickets"

// Similar Tickets (3 patterns)
"similar tickets"
"learn the patterns"
"tickets i resolved"

// Performance Stats (4 patterns)
"my performance stats"
"my stats"
"my performance"
"show me stats"

// KB Search (5 patterns)
"how do i troubleshoot SSO issues"
"how to fix authentication"
"search kb"
"knowledge base"
"how can i troubleshoot"

// KB Article (2 patterns)
"open kb-892"
"KB-892"
```

---

## 9️⃣ ACCESSIBILITY REQUIREMENTS

### WCAG 2.1 AA Compliance

```typescript
// Color Contrast
- Text on background: Minimum 4.5:1 ratio
- Large text (18pt+): Minimum 3:1 ratio
- Interactive elements: Clear focus indicators

// Keyboard Navigation
- Tab order: Logical flow
- Focus visible: All interactive elements
- Shortcuts: No conflicts with screen readers
- Escape key: Close modals/dropdowns

// ARIA Labels
<button aria-label="Send message">
  <Send className="h-4 w-4" />
</button>

<div role="region" aria-label="Chat messages">
  {messages.map(msg => (
    <div key={msg.id} role="article" aria-label={`${msg.type} message`}>
      {msg.content}
    </div>
  ))}
</div>

// Screen Reader Support
- Meaningful alt text for images
- Descriptive link text
- Form labels associated with inputs
- Live region for new messages
```

---

## 🔟 NEXT STEPS

### Getting Started with Lovable

1. **Create New Project**
   - Go to lovable.dev
   - Click "New Project"
   - Paste the starter prompt from Section 1

2. **Share Theme CSS**
   - When Lovable asks about styling, provide Solar Dusk CSS
   - It will set up Tailwind config automatically

3. **Build Iteratively**
   - Start with layout and persona selector
   - Add query detection
   - Build widgets one at a time

4. **Request Specs as Needed**
   - Ask for specific widget interfaces
   - Get demo data for each widget
   - Request visual requirements

### Tips for Lovable.dev

- **Be Specific:** Provide exact TypeScript interfaces
- **Show Examples:** Give demo data with each widget
- **Iterate Small:** Build one component at a time
- **Test Often:** Check each widget before moving on
- **Use Previews:** Lovable's live preview is very helpful

### Demo Data Ready

I have complete demo data for all 17 widgets (1,161 lines) ready to provide as you build each widget. Just ask for the specific widget data when you're ready to implement it.

---

## 📚 DOCUMENTATION REFERENCE

This guide complements the existing documentation:

1. **`IMPLEMENTATION_COMPLETE.md`** - Technical implementation in Next.js
2. **`session-notes.md`** - Development history and decisions
3. **`capabilities-v3.md`** - Testing guide with all queries
4. **`lovable.md`** (this file) - Lovable.dev migration guide

---

## 📞 SUPPORT

For questions about this migration:
1. Review the widget specifications in this document
2. Check the original Next.js implementation for reference
3. Use capabilities-v3.md for query patterns
4. Request additional demo data as needed

---

**Ready to build in Lovable.dev! 🚀**

Start with the starter prompt and we'll build this assistant-first interface step by step.
