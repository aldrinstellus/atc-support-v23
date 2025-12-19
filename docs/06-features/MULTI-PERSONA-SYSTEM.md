# MULTI-PERSONA SYSTEM

**Last Updated**: 2025-11-09
**Version**: V15-Presentation
**File**: `/src/data/personas.ts`

---

## 📋 OVERVIEW

V15-Presentation supports **4 distinct personas** with role-based interfaces, permissions, and AI query optimization. Each persona has a custom theme, badge styling, Quick Actions, and demo scenarios tailored to their specific role and responsibilities.

### **Personas**:
1. **C-Level Executive** (Sarah Chen) - Strategic oversight and executive decision-making
2. **CS Manager** (Michael Torres) - Team operations and performance management
3. **Support Agent** (Christopher Hayes) - Personal ticket queue and customer interactions
4. **CSM** (Jordan Taylor) - Client success and relationship management (NEW in V15)

### **Key Features**:
- 🎯 **30 Quick Actions** across 4 personas (7-9 per persona)
- 📊 **48 Demo Scenarios** with example queries and expected responses
- 🎨 **Custom Themes** per persona with unique color gradients
- 🔒 **Role-Based Permissions** (25+ unique permissions)
- 🤖 **AI Query Detection** for smart widget rendering
- 📱 **Badge System** with icons, colors, and gradient effects

---

## 🦸 PERSONA 1: C-LEVEL EXECUTIVE

### **Profile**
- **ID**: `c-level`
- **Name**: Sarah Chen
- **Email**: sarah.chen@company.com
- **Role**: Chief Executive Officer
- **Badge Label**: C-LEVEL
- **Badge Icon**: TrendingUp
- **Badge Color**: Purple (text-purple-500)

### **Theme Configuration**
```typescript
theme: {
  primary: 'oklch(0.58 0.2557 316.13)',           // Purple (darkened for contrast)
  accent: 'oklch(0.62 0.18 270)',                 // Deep blue
  badgeGradient: 'from-purple-500 via-blue-600 to-purple-500',
  badgeSolid: 'bg-purple-500',
  badgeRing: 'ring-purple-500/30',
}
```

### **Quick Actions** (7 total)

| Action | Icon | Badge | Badge Color | Query Prompt | Expected Widget |
|--------|------|-------|-------------|--------------|-----------------|
| **Live Tickets Dashboard** | Ticket | New | Blue (bg-blue-500) | "Show me all my current tickets from Zoho Desk" | Ticket List Widget |
| **SLA Performance** | LayoutDashboard | 92% | Green (bg-green-600) | "Show me SLA performance dashboard for this quarter" | SLA Performance Chart |
| **Churn Risk** | TrendingDown | 5 | Red (bg-red-600) | "Which customers are at highest risk of churning?" | Customer Risk List |
| **Executive Summary** | BarChart3 | Q4 | Purple (bg-purple-500) | "Generate comprehensive executive dashboard summary" | Executive Summary Widget |
| **Board Metrics** | Award | Ready | Cyan (bg-cyan-500) | "Prepare metrics for board meeting presentation" | Executive Summary Widget |
| **High-Value Accounts** | Target | 18 | Orange (bg-orange-500) | "Show me status of top 20 high-value customer accounts" | Customer Risk Profile |
| **Strategic Initiatives** | GitBranch | 8 | Green (bg-green-600) | "Show me progress on strategic initiatives and OKRs" | Executive Summary Widget |

### **Demo Scenarios** (12 queries across 3 categories)

#### **Executive Overview** (4 queries)
1. "Show me SLA performance for Q4 2025" → **SLA Performance Chart Widget**
2. "Which customers are at risk of churning?" → **Customer Risk List Widget**
3. "Executive dashboard summary for board meeting" → **Executive Summary Widget**
4. "Revenue impact analysis from support tickets" → **Executive Summary Widget**

#### **Customer Health** (4 queries)
1. "Show me customer satisfaction scores" → **Customer Risk Profile Widget**
2. "Top 10 accounts by revenue with health scores" → **Customer Risk List Widget**
3. "Escalation trends over last 3 months" → **SLA Performance Chart Widget**
4. "Customer retention metrics and forecasts" → **Executive Summary Widget**

#### **Strategic Planning** (4 queries)
1. "Show me resource allocation efficiency" → **Agent Performance Comparison Widget**
2. "Team capacity vs demand projections" → **Team Workload Dashboard Widget**
3. "Integration ROI analysis" → **Executive Summary Widget**
4. "Competitive positioning from customer feedback" → **Customer Risk Profile Widget**

### **Permissions** (5 total)
- `view_all_metrics` - Access to all organizational metrics and KPIs
- `view_financial_data` - Revenue, cost, and financial analytics
- `view_customer_health` - Customer health scores and churn risk
- `view_strategic_initiatives` - Strategic OKR and initiative tracking
- `view_sla_reports` - SLA performance across all teams

---

## 🦸 PERSONA 2: CS MANAGER

### **Profile**
- **ID**: `cs-manager`
- **Name**: Michael Torres
- **Email**: michael.torres@company.com
- **Role**: Customer Success Manager
- **Badge Label**: CS MANAGER
- **Badge Icon**: Users
- **Badge Color**: Teal (text-teal-500)

### **Theme Configuration**
```typescript
theme: {
  primary: 'oklch(0.60 0.1446 235.91)',           // Teal (darkened for contrast)
  accent: 'oklch(0.70 0.14 200)',                 // Cyan
  badgeGradient: 'from-teal-500 via-cyan-600 to-teal-500',
  badgeSolid: 'bg-teal-500',
  badgeRing: 'ring-teal-500/30',
}
```

### **Quick Actions** (9 total)

| Action | Icon | Badge | Badge Color | Query Prompt | Expected Widget |
|--------|------|-------|-------------|--------------|-----------------|
| **Live Tickets Dashboard** | Ticket | New | Blue (bg-blue-500) | "Show me all my current tickets from Zoho Desk" | Ticket List Widget |
| **Priority Customers** | AlertCircle | 12 | Red (bg-red-600) | "Show me all high-priority customers needing attention" | Customer Risk List Widget |
| **Agent Performance** | BarChart3 | This Week | Teal (bg-teal-500) | "Show me agent performance metrics for this week" | Agent Performance Stats Widget |
| **Most Slacking Agent** | TrendingDown | ! | Orange (bg-orange-500) | "Who is my most slacking agent this week?" | Agent Performance Comparison Widget |
| **Top Performing Agent** | Award | ⭐ | Green (bg-green-600) | "Who is my top performing agent this week?" | Agent Performance Stats Widget |
| **Workload Balance** | UsersIcon | View | Cyan (bg-cyan-500) | "Show me agent workload distribution and recommend reassignments" | Team Workload Dashboard Widget |
| **SLA Breach Alerts** | Clock | 3 | Red (bg-red-600) | "Show me tickets at risk of SLA breach" | SLA Performance Chart Widget |
| **Team Capacity** | Activity | 78% | Green (bg-green-600) | "Show me team capacity and forecast for next week" | Team Workload Dashboard Widget |
| **Escalation Queue** | ArrowUpCircle | 7 | Orange (bg-orange-500) | "Show me all escalated tickets requiring manager attention" | Ticket List Widget |

### **Demo Scenarios** (12 queries across 3 categories)

#### **Team Performance** (4 queries)
1. "Show me agent performance for this week" → **Agent Performance Stats Widget**
2. "Who is my most slacking agent?" → **Agent Performance Comparison Widget**
3. "Who is my top performing agent?" → **Agent Performance Stats Widget**
4. "Compare agent metrics: resolution time vs customer satisfaction" → **Agent Performance Comparison Widget**

#### **Customer Management** (4 queries)
1. "Which customers need immediate attention?" → **Customer Risk List Widget**
2. "Show me all high-priority tickets by customer" → **Ticket List Widget**
3. "Customers with multiple open tickets" → **Customer Risk Profile Widget**
4. "Accounts with declining satisfaction scores" → **Customer Risk List Widget**

#### **Operations** (4 queries)
1. "Recommend ticket reassignments for workload balance" → **Team Workload Dashboard Widget**
2. "Show me SLA breach risks for next 24 hours" → **SLA Performance Chart Widget**
3. "Team capacity planning for Q1 2026" → **Team Workload Dashboard Widget**
4. "Escalation trends and root cause analysis" → **Agent Performance Comparison Widget**

### **Permissions** (7 total)
- `view_team_metrics` - Team-wide performance metrics
- `view_all_tickets` - Access to all team tickets
- `reassign_tickets` - Ability to reassign tickets between agents
- `view_agent_performance` - Individual agent performance data
- `escalate_tickets` - Escalate tickets to senior management
- `view_customer_data` - Customer information and history
- `manage_team` - Team scheduling and capacity management

---

## 🦸 PERSONA 3: SUPPORT AGENT

### **Profile**
- **ID**: `support-agent`
- **Name**: Christopher Hayes
- **Email**: christopher.hayes@company.com
- **Role**: Senior Support Engineer
- **Badge Label**: SUPPORT AGENT
- **Badge Icon**: Headphones
- **Badge Color**: Green (text-green-500)

### **Theme Configuration**
```typescript
theme: {
  primary: 'oklch(0.58 0.1688 149.18)',           // Green (darkened for contrast)
  accent: 'oklch(0.60 0.16 165)',                 // Emerald
  badgeGradient: 'from-green-500 via-emerald-600 to-green-500',
  badgeSolid: 'bg-green-500',
  badgeRing: 'ring-green-500/30',
}
```

### **Quick Actions** (7 total)

| Action | Icon | Badge | Badge Color | Query Prompt | Expected Widget |
|--------|------|-------|-------------|--------------|-----------------|
| **Live Tickets Dashboard** | Ticket | New | Blue (bg-blue-500) | "Show me all my current tickets from Zoho Desk" | Ticket List Widget |
| **My Open Tickets** | Target | 18 | Orange (bg-orange-500) | "Show me all my currently open support tickets" | Ticket List Widget |
| **AI-Resolved Today** | Zap | 23 | Green (bg-green-600) | "How many tickets did AI resolve for me today?" | Agent Dashboard Widget |
| **Escalated to Me** | ArrowUpCircle | 5 | Red (bg-red-600) | "Show me tickets escalated to me that need my attention" | Ticket List Widget |
| **Today's Meetings** | Calendar | 3 | Cyan (bg-cyan-500) | "Show me my scheduled customer meetings for today" | Meeting Scheduler Widget |
| **Jira Sync Status** | GitBranch | ✓ | Green (bg-green-600) | "Show me status of Jira issues linked to my tickets" | Ticket Detail Widget |
| **High-Priority Alerts** | Bell | 7 | Red (bg-red-600) | "Show me my urgent tickets and critical alerts" | Ticket List Widget |

### **Demo Scenarios** (12 queries across 3 categories)

#### **My Workload** (4 queries)
1. "Show me my tickets received in last 24 hours" → **Ticket List Widget**
2. "How many tickets did AI resolve for me?" → **Agent Dashboard Widget**
3. "What are my urgent tickets right now?" → **Ticket List Widget**
4. "My ticket resolution rate this week" → **Agent Performance Stats Widget**

#### **Customer Interactions** (4 queries)
1. "Prep notes for my 2 PM customer call" → **Call Prep Notes Widget**
2. "Show me conversation history with TechCorp Solutions" → **Ticket Detail Widget**
3. "Draft response for ticket DESK-1002" → **Response Composer Widget**
4. "Schedule follow-up meeting with CloudNine Technologies" → **Meeting Scheduler Widget**

#### **Productivity** (4 queries)
1. "Link ticket DESK-1002 to Jira issue PROJ-302" → **Ticket Detail Widget**
2. "Show me tickets I can close today" → **Ticket List Widget**
3. "AI-suggested canned responses for common issues" → **Response Composer Widget**
4. "My performance metrics vs team average" → **Agent Performance Stats Widget**

### **Permissions** (7 total)
- `view_own_tickets` - Access to personally assigned tickets
- `update_own_tickets` - Modify and update own tickets
- `view_customer_data` - Customer information for assigned accounts
- `link_jira_issues` - Link tickets to Jira issues
- `escalate_tickets` - Escalate tickets to manager
- `view_own_meetings` - Personal meeting schedule
- `view_own_performance` - Personal performance metrics

---

## 🦸 PERSONA 4: CSM (NEW IN V15)

### **Profile**
- **ID**: `csm`
- **Name**: Jordan Taylor
- **Email**: jordan.taylor@company.com
- **Role**: Customer Success Manager
- **Badge Label**: CSM
- **Badge Icon**: Target
- **Badge Color**: Cyan (text-cyan-500)

### **Theme Configuration**
```typescript
theme: {
  primary: 'oklch(0.68 0.14 210)',                // Cyan
  accent: 'oklch(0.64 0.18 240)',                 // Blue
  badgeGradient: 'from-cyan-500 via-blue-500 to-cyan-500',
  badgeSolid: 'bg-cyan-500',
  badgeRing: 'ring-cyan-500/30',
}
```

### **Quick Actions** (7 total)

| Action | Icon | Badge | Badge Color | Query Prompt | Expected Widget |
|--------|------|-------|-------------|--------------|-----------------|
| **Client Health Scores** | Activity | Live | Cyan (bg-cyan-500) | "Show me health scores for my assigned clients" | Customer Risk Profile Widget |
| **Product Adoption** | TrendingUp | Metrics | Green (bg-green-600) | "Show product adoption metrics and feature usage across clients" | Executive Summary Widget |
| **Renewal Pipeline** | Calendar | 12 | Orange (bg-orange-500) | "Show upcoming renewals and contract status" | Executive Summary Widget |
| **Client Feedback** | Bell | NPS | Purple (bg-purple-500) | "Show recent client feedback and NPS scores" | Customer Risk Profile Widget |
| **Upsell Opportunities** | ArrowUpCircle | $2.4M | Yellow (bg-yellow-600) | "Identify upsell and cross-sell opportunities" | Executive Summary Widget |
| **Product Roadmap** | GitBranch | Q1 | Blue (bg-blue-500) | "Show product roadmap and upcoming features" | Executive Summary Widget |
| **Client Meetings** | Calendar | 8 | Cyan (bg-cyan-600) | "Schedule and manage client business reviews" | Meeting Scheduler Widget |

### **Demo Scenarios** (12 queries across 3 categories)

#### **Client Success** (4 queries)
1. "Show me health scores for my assigned clients" → **Customer Risk Profile Widget**
2. "Which clients are at risk of churn?" → **Customer Risk List Widget**
3. "Product adoption metrics across my portfolio" → **Executive Summary Widget**
4. "Client satisfaction trends over last quarter" → **Customer Risk Profile Widget**

#### **Revenue Growth** (4 queries)
1. "Show upcoming renewals in next 90 days" → **Executive Summary Widget**
2. "Identify upsell opportunities based on usage patterns" → **Executive Summary Widget**
3. "Calculate expansion revenue potential" → **Executive Summary Widget**
4. "Show clients not using premium features" → **Customer Risk List Widget**

#### **Relationship Management** (4 queries)
1. "Schedule quarterly business reviews" → **Meeting Scheduler Widget**
2. "Show recent client feedback and NPS scores" → **Customer Risk Profile Widget**
3. "Product roadmap presentation for clients" → **Executive Summary Widget**
4. "Client engagement history and touchpoints" → **Ticket Detail Widget**

### **Permissions** (0 defined - pending implementation)
*Note*: CSM persona currently has no permissions defined in source data. Expected permissions:
- `view_assigned_clients` - Access to assigned client accounts
- `view_client_health` - Client health scores and risk metrics
- `view_product_adoption` - Product usage and adoption metrics
- `schedule_client_meetings` - Manage client meetings and QBRs
- `view_renewal_pipeline` - Contract renewal status
- `identify_upsell_opportunities` - Revenue expansion opportunities
- `view_client_feedback` - NPS and feedback data

---

## 🎨 THEME SYSTEM

Each persona has a unique color theme for visual differentiation:

### **C-Level Executive** (Purple/Blue)
- **Primary Color**: `oklch(0.58 0.2557 316.13)` - Purple
- **Accent Color**: `oklch(0.62 0.18 270)` - Deep Blue
- **Gradient**: `from-purple-500 via-blue-600 to-purple-500`
- **Use Case**: Executive dashboards, strategic metrics

### **CS Manager** (Teal/Cyan)
- **Primary Color**: `oklch(0.60 0.1446 235.91)` - Teal
- **Accent Color**: `oklch(0.70 0.14 200)` - Cyan
- **Gradient**: `from-teal-500 via-cyan-600 to-teal-500`
- **Use Case**: Team performance, operational dashboards

### **Support Agent** (Green/Emerald)
- **Primary Color**: `oklch(0.58 0.1688 149.18)` - Green
- **Accent Color**: `oklch(0.60 0.16 165)` - Emerald
- **Gradient**: `from-green-500 via-emerald-600 to-green-500`
- **Use Case**: Personal queue, ticket management

### **CSM** (Cyan/Blue)
- **Primary Color**: `oklch(0.68 0.14 210)` - Cyan
- **Accent Color**: `oklch(0.64 0.18 240)` - Blue
- **Gradient**: `from-cyan-500 via-blue-500 to-cyan-500`
- **Use Case**: Client success, relationship management

### **Theme Application**
```typescript
// Badge gradient background
className={`bg-gradient-to-r ${persona.theme.badgeGradient}`}

// Solid badge background
className={persona.theme.badgeSolid}

// Ring effect
className={`ring-2 ${persona.theme.badgeRing}`}

// CSS custom properties
style={{ '--theme-primary': persona.theme.primary }}
```

---

## 🔒 PERMISSION MATRIX

| Permission | C-Level | CS Manager | Support Agent | CSM | Description |
|------------|---------|------------|---------------|-----|-------------|
| **Metrics & Analytics** |
| `view_all_metrics` | ✅ | ❌ | ❌ | ❌ | All organizational KPIs |
| `view_team_metrics` | ❌ | ✅ | ❌ | ❌ | Team performance data |
| `view_own_performance` | ❌ | ❌ | ✅ | ❌ | Personal metrics |
| **Financial Data** |
| `view_financial_data` | ✅ | ❌ | ❌ | ❌ | Revenue, cost analytics |
| **Customer Management** |
| `view_customer_health` | ✅ | ❌ | ❌ | ❌ | Customer health scores |
| `view_customer_data` | ❌ | ✅ | ✅ | ❌ | Customer info & history |
| `view_assigned_clients` | ❌ | ❌ | ❌ | *Pending* | Assigned client accounts |
| `view_client_health` | ❌ | ❌ | ❌ | *Pending* | Client health metrics |
| **Ticket Management** |
| `view_all_tickets` | ❌ | ✅ | ❌ | ❌ | All team tickets |
| `view_own_tickets` | ❌ | ❌ | ✅ | ❌ | Personally assigned tickets |
| `update_own_tickets` | ❌ | ❌ | ✅ | ❌ | Modify own tickets |
| `reassign_tickets` | ❌ | ✅ | ❌ | ❌ | Reassign between agents |
| `escalate_tickets` | ❌ | ✅ | ✅ | ❌ | Escalate to management |
| **Team Operations** |
| `view_agent_performance` | ❌ | ✅ | ❌ | ❌ | Individual agent data |
| `manage_team` | ❌ | ✅ | ❌ | ❌ | Scheduling, capacity |
| **Strategic** |
| `view_strategic_initiatives` | ✅ | ❌ | ❌ | ❌ | OKR and initiative tracking |
| `view_sla_reports` | ✅ | ❌ | ❌ | ❌ | SLA performance reports |
| **Integrations** |
| `link_jira_issues` | ❌ | ❌ | ✅ | ❌ | Link tickets to Jira |
| **Meetings & Calendar** |
| `view_own_meetings` | ❌ | ❌ | ✅ | ❌ | Personal meeting schedule |
| `schedule_client_meetings` | ❌ | ❌ | ❌ | *Pending* | Manage client meetings |
| **Client Success** |
| `view_product_adoption` | ❌ | ❌ | ❌ | *Pending* | Product usage metrics |
| `view_renewal_pipeline` | ❌ | ❌ | ❌ | *Pending* | Contract renewal status |
| `identify_upsell_opportunities` | ❌ | ❌ | ❌ | *Pending* | Revenue expansion |
| `view_client_feedback` | ❌ | ❌ | ❌ | *Pending* | NPS and feedback data |

**Total Unique Permissions**: 25 (19 implemented + 6 pending for CSM)

---

## 🤖 AI QUERY DETECTION

The multi-persona system uses intelligent query detection to render appropriate widgets based on persona context and user intent.

### **Detection Flow**

```typescript
// 1. User submits query
const query = "Show me SLA performance for Q4 2025";

// 2. Query detection analyzes persona context
const personaContext = getPersonaById('c-level');

// 3. Pattern matching against persona-specific queries
const matchedWidget = detectWidgetFromQuery(query, personaContext);

// 4. Widget rendered with persona theme
<WidgetRenderer
  type="sla-performance-chart"
  theme={personaContext.theme}
  permissions={personaContext.permissions}
/>
```

### **Query Detection Logic** (`/src/lib/query-detection.ts`)

**Pattern Matching**:
- Keyword extraction from user query
- Fuzzy matching against Quick Action prompts
- Persona-aware priority scoring
- Fallback to generic widgets if no match

**Example Matches**:
```typescript
// C-Level Executive
"SLA performance" → SLA Performance Chart Widget
"churn risk" → Customer Risk List Widget
"executive summary" → Executive Summary Widget

// CS Manager
"agent performance" → Agent Performance Stats Widget
"workload balance" → Team Workload Dashboard Widget
"most slacking" → Agent Performance Comparison Widget

// Support Agent
"my tickets" → Ticket List Widget (filtered to agent)
"AI resolved" → Agent Dashboard Widget
"draft response" → Response Composer Widget

// CSM
"client health" → Customer Risk Profile Widget
"renewal pipeline" → Executive Summary Widget
"upsell opportunities" → Executive Summary Widget
```

### **Widget Rendering with Permissions**

```typescript
// Widget checks persona permissions before rendering sensitive data
function SLAPerformanceChart({ persona }: WidgetProps) {
  if (!persona.permissions.includes('view_sla_reports')) {
    return <PermissionDeniedMessage />;
  }

  // Filter data based on persona permissions
  const data = filterByPermissions(rawData, persona.permissions);

  return <ChartComponent data={data} theme={persona.theme} />;
}
```

### **Theme Application**

```typescript
// Each widget automatically applies persona theme
<div
  className={`bg-gradient-to-r ${persona.theme.badgeGradient}`}
  style={{
    '--primary': persona.theme.primary,
    '--accent': persona.theme.accent
  }}
>
  {/* Widget content with themed colors */}
</div>
```

---

## 🚀 USAGE GUIDE

### **For Developers**

#### **Import Personas**
```typescript
import { personas, getPersonaById, defaultPersona } from '@/data/personas';

// Get specific persona
const cLevel = getPersonaById('c-level');
const csManager = getPersonaById('cs-manager');
const supportAgent = getPersonaById('support-agent');
const csm = getPersonaById('csm');

// Get default persona (C-Level)
const admin = defaultPersona;
```

#### **Access Persona Data**
```typescript
// Persona profile
console.log(persona.name);        // "Sarah Chen"
console.log(persona.email);       // "sarah.chen@company.com"
console.log(persona.role);        // "Chief Executive Officer"

// Badge configuration
console.log(persona.badge.label); // "C-LEVEL"
console.log(persona.badge.icon);  // TrendingUp (Lucide icon)
console.log(persona.badge.color); // "text-purple-500"

// Theme colors
console.log(persona.theme.primary);       // "oklch(0.58 0.2557 316.13)"
console.log(persona.theme.badgeGradient); // "from-purple-500 via-blue-600..."
```

#### **Iterate Quick Actions**
```typescript
persona.quickActions.forEach(action => {
  console.log(action.id);          // "sla-performance"
  console.log(action.label);       // "SLA Performance"
  console.log(action.query);       // "Show me SLA performance..."
  console.log(action.badge);       // "92%"
  console.log(action.badgeColor);  // "bg-green-600 text-white"
});
```

#### **Access Demo Scenarios**
```typescript
// Get all demo scenarios for persona
const scenarios = persona.demoScenarios;

// Iterate by category
Object.entries(scenarios).forEach(([category, queries]) => {
  console.log(`Category: ${category}`);
  queries.forEach(query => {
    console.log(`  - ${query}`);
  });
});
```

#### **Check Permissions**
```typescript
// Check if persona has specific permission
const canViewMetrics = persona.permissions.includes('view_all_metrics');
const canReassignTickets = persona.permissions.includes('reassign_tickets');

// Filter data based on permissions
function getFilteredData(persona: Persona) {
  if (persona.permissions.includes('view_all_tickets')) {
    return allTickets; // CS Manager sees all
  } else if (persona.permissions.includes('view_own_tickets')) {
    return myTickets; // Support Agent sees only theirs
  }
  return [];
}
```

#### **Render Persona Badge**
```tsx
import { Badge } from '@/components/ui/badge';

function PersonaBadge({ persona }: { persona: Persona }) {
  const Icon = persona.badge.icon;

  return (
    <Badge
      className={`bg-gradient-to-r ${persona.theme.badgeGradient} text-white`}
    >
      <Icon className="w-4 h-4 mr-1" />
      {persona.badge.label}
    </Badge>
  );
}
```

---

### **For QA Testers**

#### **Testing Persona Switching**
1. Open application at `http://localhost:3015`
2. Click persona selector in top-right
3. Switch between 4 personas
4. Verify:
   - Badge color changes
   - Quick Actions update
   - Theme colors apply
   - Demo scenarios reflect persona

#### **Testing Quick Actions**
1. Select a persona (e.g., C-Level)
2. Click each Quick Action button
3. Verify:
   - Query is pre-filled in input
   - Correct widget renders
   - Badge counts are accurate
   - Colors match persona theme

#### **Testing Demo Scenarios**
1. Navigate to demo page: `/demo/c-level`
2. Try each query from demo scenarios
3. Verify expected widget renders
4. Check data filtering by permissions

#### **Testing Permissions**
1. As C-Level: Should see all metrics, financial data
2. As CS Manager: Should see team data, NOT financial
3. As Support Agent: Should see only own tickets
4. As CSM: Should see assigned clients only

#### **Regression Test Matrix**

| Test Case | C-Level | CS Manager | Support Agent | CSM |
|-----------|---------|------------|---------------|-----|
| Badge renders with correct color | ✅ Purple | ✅ Teal | ✅ Green | ✅ Cyan |
| Quick Actions count | ✅ 7 | ✅ 9 | ✅ 7 | ✅ 7 |
| Demo scenarios populated | ✅ 12 | ✅ 12 | ✅ 12 | ✅ 12 |
| Theme gradient applies | ✅ Purple/Blue | ✅ Teal/Cyan | ✅ Green/Emerald | ✅ Cyan/Blue |
| Permissions enforced | ✅ 5 perms | ✅ 7 perms | ✅ 7 perms | ⚠️ 0 perms |
| Widget filtering | ✅ All data | ✅ Team data | ✅ Own data | ⚠️ Pending |

**Known Issues**:
- ⚠️ CSM persona has no permissions defined (expected 6+ permissions)
- ⚠️ CSM widget data filtering not implemented

---

## 📊 QUICK REFERENCE

### **Statistics**

| Metric | Count | Details |
|--------|-------|---------|
| **Total Personas** | 4 | C-Level, CS Manager, Support Agent, CSM |
| **Quick Actions** | 30 | 7 (C-Level), 9 (CS Manager), 7 (Agent), 7 (CSM) |
| **Demo Scenarios** | 48 | 12 per persona across 3 categories |
| **Unique Permissions** | 25 | 19 implemented + 6 pending |
| **Theme Variants** | 4 | Purple/Blue, Teal/Cyan, Green/Emerald, Cyan/Blue |
| **Badge Icons** | 20+ | From Lucide React icon library |
| **Widget Types** | 19 | Specialized widgets for different use cases |

### **Persona Quick Reference**

| Persona | ID | Badge Color | Primary Focus | Quick Actions | Permissions |
|---------|-----|-------------|---------------|---------------|-------------|
| **C-Level** | `c-level` | Purple | Strategic oversight | 7 | 5 |
| **CS Manager** | `cs-manager` | Teal | Team operations | 9 | 7 |
| **Support Agent** | `support-agent` | Green | Personal queue | 7 | 7 |
| **CSM** | `csm` | Cyan | Client success | 7 | 0* |

*Pending implementation

### **Color Palette**

| Persona | Primary (OKLCH) | Accent (OKLCH) | Gradient |
|---------|-----------------|----------------|----------|
| C-Level | `0.58 0.2557 316.13` | `0.62 0.18 270` | Purple → Blue → Purple |
| CS Manager | `0.60 0.1446 235.91` | `0.70 0.14 200` | Teal → Cyan → Teal |
| Support Agent | `0.58 0.1688 149.18` | `0.60 0.16 165` | Green → Emerald → Green |
| CSM | `0.68 0.14 210` | `0.64 0.18 240` | Cyan → Blue → Cyan |

### **Common Widgets by Persona**

**C-Level**:
- Executive Summary Widget
- SLA Performance Chart Widget
- Customer Risk List Widget
- Agent Performance Comparison Widget

**CS Manager**:
- Team Workload Dashboard Widget
- Agent Performance Stats Widget
- Agent Performance Comparison Widget
- Ticket List Widget

**Support Agent**:
- Ticket List Widget
- Ticket Detail Widget
- Response Composer Widget
- Agent Dashboard Widget
- Meeting Scheduler Widget

**CSM**:
- Customer Risk Profile Widget
- Executive Summary Widget
- Meeting Scheduler Widget

---

## 🔄 IMPLEMENTATION NOTES

### **Data Source**
- **File**: `/src/data/personas.ts`
- **Export**: `personas` array (4 personas)
- **Helper**: `getPersonaById(id: string)` function
- **Default**: `defaultPersona` (C-Level)

### **Type Definitions**
```typescript
// /src/types/persona.ts
interface Persona {
  id: string;
  name: string;
  email: string;
  role: string;
  badge: {
    label: string;
    icon: LucideIcon;
    color: string;
  };
  theme: {
    primary: string;
    accent: string;
    badgeGradient: string;
    badgeSolid: string;
    badgeRing: string;
  };
  quickActions: QuickAction[];
  demoScenarios: Record<string, string[]>;
  permissions: string[];
}
```

### **Future Enhancements**
- ✅ Add CSM permissions (6+ expected)
- ✅ Implement CSM widget data filtering
- ✅ Add persona-specific notification preferences
- ✅ Create persona switching animations
- ✅ Add persona usage analytics
- ✅ Implement role-based API access control
- ✅ Add custom widget layouts per persona
- ✅ Create persona onboarding tours

### **Related Documentation**
- [Widget System](./WIDGET-SYSTEM.md) - 19 widget types
- [Query Detection](../08-development/QUERY-DETECTION.md) - AI query matching
- [Permissions](../12-security/PERMISSIONS.md) - RBAC system
- [Theme System](../07-components/THEME-SYSTEM.md) - Solar Dusk theming

---

**Document Version**: 1.0
**Total Word Count**: ~4,500 words
**Last Reviewed**: 2025-11-09
