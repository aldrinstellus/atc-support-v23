// Widget type definitions for Bhanu's assistant-first interface
// These are ADDITIVE to the existing dashboard system (backward compatible)

import type { Draft } from './draft';

export type WidgetType =
  // Original V14/V15 Widget Types
  | 'executive-summary'
  | 'analytics-dashboard'
  | 'performance-trends'
  | 'sentiment-analysis'
  | 'customer-risk-profile'
  | 'sla-performance-chart'
  | 'team-workload-dashboard'
  | 'ticket-list'
  | 'agent-performance-comparison'
  | 'agent-dashboard'
  | 'ticket-detail'
  | 'live-ticket-detail'
  | 'meeting-scheduler'
  | 'meeting-confirmation'
  | 'message-composer'
  | 'call-prep-notes'
  | 'response-composer'
  | 'similar-tickets-analysis'
  | 'agent-performance-stats'
  | 'knowledge-base-search'
  | 'customer-risk-list'
  | 'knowledge-article'
  | 'escalation-path'
  | 'system-access-status'
  | 'interactive-update'
  | 'ticket-processing'
  | 'csm-dashboard'
  | 'client-health-dashboard'
  | 'product-adoption-metrics'
  | 'churn-risk-analysis'
  | 'renewal-pipeline'
  | 'upsell-opportunities'
  | 'client-feedback-dashboard'
  | 'business-review-scheduler'
  | 'product-roadmap-view'
  // V17 Government Mode Widget Types
  | 'contract-performance-dashboard'
  | 'deliverable-review-list'
  | 'vendor-compliance-dashboard'
  | 'program-health-dashboard'
  | 'stakeholder-engagement-dashboard'
  | 'requirements-tracking-dashboard'
  | 'change-request-dashboard'
  // V17 Project Mode Widget Types
  | 'sprint-burndown-chart'
  | 'team-velocity-dashboard'
  | 'code-quality-dashboard'
  | 'deployment-pipeline-dashboard'
  | 'task-kanban-board'
  | 'resource-capacity-dashboard'
  | 'blocker-resolution-dashboard'
  | 'kb-article-viewer'
  // V18 CSM Insights & Training Widget Types
  | 'csm-insights-dashboard'
  | 'csm-training-dashboard'
  // V18 DORA Metrics Widget Type
  | 'dora-metrics-dashboard'
  // V20 ITSS Draft Review Widget Type
  | 'draft-review';

// ============================================================================
// WIDGET DATA INTERFACES (Based on Bhanu's Demo Data)
// ============================================================================

// Executive Summary Widget (C-Level)
export interface ExecutiveSummaryData {
  title: string;
  date: string;
  sections: Array<{
    title: string;
    status: 'success' | 'warning' | 'critical' | 'info';
    value: string;
    change: string;
    description: string;
  }>;
  keyInsights: string[];
  recommendedActions: Array<{
    priority: 'critical' | 'high' | 'medium' | 'low';
    action: string;
    reason: string;
  }>;
}

// Analytics Dashboard Widget (C-Level, CS Manager)
export interface AnalyticsDashboardData {
  ticketVolume: Array<{
    date: string;
    tickets: number;
  }>;
  responseTime: Array<{
    hour: string;
    avgMinutes: number;
  }>;
  resolution: {
    resolved: number;
    pending: number;
    escalated: number;
  };
}

// Performance Trends Widget (C-Level, CS Manager)
export interface PerformanceTrendsData {
  period: string;
  metrics: Array<{
    date: string;
    responseTime: number;
    resolutionTime: number;
    satisfaction: number;
  }>;
}

// Sentiment Analysis Widget (C-Level)
export interface SentimentAnalysisData {
  overall: 'positive' | 'neutral' | 'negative';
  score: number;
  breakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  recentComments: Array<{
    text: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    timestamp: string;
  }>;
}

// Customer Risk Profile Widget (C-Level, CS Manager)
export interface CustomerRiskProfileData {
  customerId: string;
  customerName: string;
  riskScore: number;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  previousScore: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  accountValue: string;
  contractRenewal: string;
  riskFactors: Array<{
    factor: string;
    severity: 'high' | 'medium' | 'low';
    count?: number;
    trend?: 'up' | 'down' | 'stable';
    currentValue?: string;
    previousValue?: string;
    description: string;
    impact: string;
  }>;
  recentActivity: Array<{
    date: string;
    event: string;
    description: string;
  }>;
  aiAnalysis: string;
  recommendations: Array<{
    priority: 'critical' | 'high' | 'medium' | 'low';
    action: string;
    description: string;
    estimatedImpact: string;
  }>;
}

// Team Workload Dashboard Widget (CS Manager)
export interface TeamWorkloadDashboardData {
  title: string;
  lastUpdated: string;
  teamSize: number;
  agentsOnline: number;
  totalTickets: number;
  avgTicketsPerAgent: number;
  agents: Array<{
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'busy' | 'offline' | 'overloaded';
    statusColor: 'success' | 'warning' | 'error' | 'disabled';
    ticketCount: number;
    capacity: number;
    loadPercentage: number;
    loadStatus: 'low' | 'moderate' | 'high' | 'overloaded' | 'offline';
    avgResponseTime: string;
    slaCompliance: number;
    activeTickets: {
      critical: number;
      high: number;
      medium: number;
      low: number;
    };
    alerts: string[];
    performance: 'excellent' | 'good' | 'needs-attention';
  }>;
  aiRecommendation?: {
    type: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    message: string;
    suggestedActions: Array<{
      action: string;
      impact: string;
      tickets?: string[];
    }>;
  };
}

// SLA Performance Chart Widget (C-Level, CS Manager)
export interface SLAPerformanceChartData {
  title: string;
  overallCompliance: number;
  target: number;
  byCategory: Array<{
    category: string;
    target: string;
    compliance: number;
    trend: 'improving' | 'stable' | 'declining';
    breaches: number;
    avgTime: string;
    status: 'success' | 'warning' | 'error';
  }>;
  trendData: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
    }>;
  };
  topBreaches: Array<{
    ticketId: string;
    customer: string;
    priority: string;
    slaTarget: string;
    actualTime: string;
    reason: string;
    assignedTo: string;
  }>;
  rootCauses: Array<{
    cause: string;
    percentage: number;
    count: number;
    description: string;
  }>;
  recommendations: string[];
}

// Agent Dashboard Widget (Support Agent)
export interface AgentDashboardData {
  title: string;
  agentName: string;
  date: string;
  summary: {
    totalTickets: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    dueSoon: number;
    needsResponse: number;
  };
  priorities: Array<{
    type: string;
    severity: 'high' | 'medium' | 'low';
    message: string;
    tickets: string[];
  }>;
  aiSuggestions: Array<{
    type: string;
    message: string;
  }>;
  upcomingMeetings: Array<{
    time: string;
    title: string;
    duration: string;
    attendees: string[];
  }>;
  performanceSnapshot: {
    ticketsResolvedToday: number;
    ticketsResolvedThisWeek: number;
    avgResponseTime: string;
    customerSatisfaction: number;
    slaCompliance: number;
  };
}

// Ticket Detail Widget (All personas)
export interface TicketDetailData {
  ticketId: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'in-progress' | 'pending' | 'resolved' | 'closed';
  subject: string;
  customer: {
    name: string;
    id: string;
    plan: string;
    arr: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    riskScore: number;
    riskLevel: 'critical' | 'high' | 'medium' | 'low';
  };
  metadata: {
    created: string;
    createdBy: string;
    assignedTo: string;
    assignedAt: string;
    lastUpdated: string;
    tags: string[];
    category: string;
    product: string;
  };
  sla: {
    responseTime: {
      target: string;
      actual: string;
      status: 'met' | 'breached';
    };
    resolutionTime: {
      target: string;
      deadline: string;
      elapsed: string;
      status: 'met' | 'at-risk' | 'breached';
      breachedBy?: string;
    };
  };
  description: string;
  timeline: Array<{
    timestamp: string;
    type: 'created' | 'assigned' | 'response' | 'internal-note' | 'escalated' | 'customer-reply' | 'status-change';
    actor: string;
    action: string;
    content?: string;
    jiraTicket?: string;
  }>;
  relatedTickets: Array<{
    id: string;
    subject: string;
    customer: string;
    status: string;
    priority: string;
  }>;
  jiraIntegration?: {
    linkedIssue: string;
    issueTitle: string;
    status: string;
    priority: string;
    assignee: string;
    lastUpdated: string;
    comments: Array<{
      timestamp: string;
      author: string;
      content: string;
    }>;
  };
  aiInsights: {
    sentiment: {
      current: string;
      score: number;
      trend: 'improving' | 'stable' | 'declining';
      analysis: string;
    };
    recommendedActions: Array<{
      priority: 'critical' | 'high' | 'medium' | 'low';
      action: string;
      details: string;
    }>;
  };
}

// Ticket List Widget (CS Manager, Support Agent)
export interface TicketListData {
  title: string;
  count: number;
  filters?: Record<string, unknown>;
  tickets: Array<{
    id: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
    priorityColor: 'error' | 'warning' | 'info' | 'success';
    subject: string;
    customer: string;
    status: 'open' | 'in-progress' | 'pending' | 'resolved' | 'closed';
    created: string;
    ageInDays: number;
    slaDeadline?: string;
    slaStatus: 'on-track' | 'at-risk' | 'breached';
    slaRemaining?: string;
    slaBreachedBy?: string;
    lastUpdate: string;
    lastUpdateBy: string;
    tags: string[];
    customerRisk: 'critical' | 'high' | 'medium' | 'low';
  }>;
  summary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    breached: number;
    atRisk: number;
    onTrack: number;
  };
}

// Agent Performance Comparison Widget (CS Manager)
export interface AgentPerformanceComparisonData {
  title: string;
  period: string;
  topPerformers: Array<{
    rank: number;
    name: string;
    avatar: string;
    metrics: {
      ticketsResolved: number;
      avgResolutionTime: string;
      slaCompliance: number;
      customerSatisfaction: number;
      firstResponseTime: string;
    };
    strengths: string[];
    badge: string;
  }>;
  needsAttention: Array<{
    rank: number;
    name: string;
    avatar: string;
    metrics: {
      ticketsResolved: number;
      avgResolutionTime: string;
      slaCompliance: number;
      customerSatisfaction: number;
      firstResponseTime: string;
    };
    concerns: string[];
    recommendations: string[];
    status: string;
  }>;
  teamAverage: {
    ticketsResolved: number;
    avgResolutionTime: string;
    slaCompliance: number;
    customerSatisfaction: number;
    firstResponseTime: string;
  };
}

// Customer Risk List Widget (CS Manager)
export interface CustomerRiskListData {
  title: string;
  count: number;
  totalCustomers: number;
  customers: Array<{
    name: string;
    id: string;
    riskScore: number;
    riskLevel: 'critical' | 'high' | 'medium' | 'low';
    arr: string;
    openTickets: number;
    criticalTickets: number;
    escalations: number;
    sentiment: 'positive' | 'neutral' | 'negative' | 'mixed';
    sentimentScore: number;
    contractRenewal: string;
    csm: string;
    lastContact: string;
    primaryIssues: string[];
  }>;
}

// Meeting Scheduler Widget (All personas)
export interface MeetingSchedulerData {
  title: string;
  duration: string;
  type?: string;
  availableSlots: Array<{
    date: string;
    time: string;
    timezone: string;
    status: 'available' | 'preferred' | 'unavailable';
    conflicts?: string[];
    note?: string;
  }>;
  attendees: Array<{
    name: string;
    status: 'organizer' | 'available' | 'external' | 'tentative';
    required: boolean;
  }>;
  agenda?: string[];
  suggestedAgenda?: string[];
  coachingTips?: string[];
}

// Meeting Confirmation Widget (All personas)
export interface MeetingConfirmationData {
  title?: string;
  meetingDate: string;
  meetingTime: string;
  timezone: string;
  duration?: string;
  location?: string;
  invitesSent: Array<{
    name: string;
    email: string;
    role?: string;
  }>;
  briefingCreated?: boolean;
  briefingItems?: string[];
  nextAction?: string;
  agendaItems?: string[];
}

// Call Prep Notes Widget (Support Agent)
export interface CallPrepNotesData {
  title: string;
  customer: {
    name: string;
    id: string;
    contactPerson: string;
    contactEmail: string;
    contactPhone: string;
    plan: string;
    arr: string;
    riskScore: number;
    riskLevel: 'critical' | 'high' | 'medium' | 'low';
  };
  callDetails: {
    purpose: string;
    scheduledTime: string;
    duration: string;
    attendees: string[];
    type: 'support-call' | 'escalation' | 'follow-up' | 'onboarding' | 'renewal';
  };
  context: {
    recentTickets: Array<{
      id: string;
      subject: string;
      status: string;
      priority: string;
      created: string;
    }>;
    accountHealth: {
      openTickets: number;
      criticalTickets: number;
      avgResponseTime: string;
      slaCompliance: number;
      lastContact: string;
    };
    sentiment: {
      current: string;
      trend: 'improving' | 'stable' | 'declining';
      recentFeedback: string;
    };
  };
  talkingPoints: Array<{
    topic: string;
    priority: 'high' | 'medium' | 'low';
    description: string;
    suggestedApproach: string;
  }>;
  potentialObjections: Array<{
    objection: string;
    response: string;
  }>;
  successCriteria: string[];
  aiRecommendations: Array<{
    type: 'preparation' | 'conversation' | 'follow-up';
    recommendation: string;
  }>;
}

// Response Composer Widget (Support Agent)
export interface ResponseComposerData {
  ticketId: string;
  customer: string;
  subject: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  lastMessage: {
    from: string;
    timestamp: string;
    content: string;
  };
  suggestedTone: 'professional' | 'empathetic' | 'technical' | 'apologetic';
  templateOptions: Array<{
    name: string;
    description: string;
    preview: string;
  }>;
  aiGeneratedResponse: {
    content: string;
    keyPoints: string[];
    nextSteps: string[];
    estimatedSentiment: 'positive' | 'neutral' | 'negative';
  };
  knowledgeBaseArticles: Array<{
    id: string;
    title: string;
    relevance: number;
    excerpt: string;
  }>;
}

// Similar Tickets Analysis Widget (Support Agent)
export interface SimilarTicketsAnalysisData {
  title: string;
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

// Agent Performance Stats Widget (Support Agent)
export interface AgentPerformanceStatsData {
  title: string;
  period: string;
  agentName: string;
  keyMetrics: {
    ticketsResolved: {
      value: number;
      trend: string;
      comparison: string;
      percentile: string;
    };
    avgResolutionTime: {
      value: string;
      trend: string;
      comparison: string;
      percentile: string;
    };
    firstResponseTime: {
      value: string;
      trend: string;
      comparison: string;
      percentile: string;
    };
    slaCompliance: {
      value: string;
      trend: string;
      comparison: string;
      percentile: string;
    };
    customerSatisfaction: {
      value: string;
      trend: string;
      comparison: string;
      percentile: string;
    };
  };
  trendChart: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
    }>;
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

// Knowledge Base Search Widget (Support Agent)
export interface KnowledgeBaseSearchData {
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

// Knowledge Article Widget (Support Agent)
export interface KnowledgeArticleData {
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
    code?: {
      language: string;
      snippet: string;
    };
  }>;
  relatedArticles: Array<{
    id: string;
    title: string;
    relevance: number;
  }>;
  helpfulCount: number;
  notHelpfulCount: number;
}

// Message Composer Widget (CS Manager)
export interface MessageComposerData {
  title: string;
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

// Escalation Path Widget (All personas - for AI → Human escalation)
export interface EscalationPathData {
  ticketId: string;
  currentStage: number;
  stages: Array<{
    level: string;
    assignee: string;
    status: 'completed' | 'current' | 'pending';
    timestamp?: string;
    duration?: string;
    notes?: string;
  }>;
  recommendedAction?: string;
}

// System Access Status Widget (Support Agent - multi-system access checks)
export interface SystemAccessStatusData {
  ticketId: string;
  customer: string;
  issueReported: string;
  timestamp: string;
  systemChecks: Array<{
    systemName: string;
    status: 'working' | 'degraded' | 'down' | 'fixed';
    issue: string;
    aiAction: string;
    resolved: boolean;
    details?: string;
  }>;
  overallResolution: 'fully-resolved' | 'partially-resolved' | 'escalation-needed';
  automatedActions: string[];
  manualActionsNeeded?: string[];
  resolutionMessage: string;
}

// Interactive Update Widget (Support Agent - hybrid UI updates with AI automation)
export interface InteractiveUpdateData {
  ticketId: string;
  customer: string;
  updateType: 'profile' | 'course' | 'settings';
  title: string;
  issueReported: string;
  currentData: Record<string, string>;
  updateableFields: Array<{
    field: string;
    label: string;
    currentValue: string;
    canAutoUpdate: boolean;
    requiresApproval?: string; // "manager" | "hr" | "admin"
    icon?: string;
  }>;
  aiCapabilities: {
    canUpdate: string[];
    needsHuman: string[];
    explanation: string;
  };
  updateResult?: {
    success: boolean;
    updatedFields: Array<{
      field: string;
      label: string;
      oldValue: string;
      newValue: string;
    }>;
    message: string;
    timestamp: string;
  };
  resolution: 'ai-resolved' | 'human-assigned' | 'pending';
  humanAgent?: {
    name: string;
    role: string;
    eta: string;
    reason: string;
  };
}

// Ticket Processing Widget (Real-time Zoho ticket processing status)
export interface TicketProcessingData {
  ticketId: string;
  ticketNumber: string;
  customer: string;
  subject: string;
  status: 'extracting' | 'classifying' | 'searching' | 'generating' | 'replying' | 'escalating' | 'completed' | 'failed';
  classification?: {
    primary_category: string;
    confidence: number;
    auto_resolvable: boolean;
    reasoning: string;
  };
  kbSearch?: {
    query: string;
    method: 'chat' | 'retrieval';
    matches: number;
  };
  aiResponse?: {
    text: string;
    needsEscalation: boolean;
    escalationSignals: string[];
  };
  jiraTicket?: {
    key: string;
    url: string;
    summary: string;
  };
  timeline: Array<{
    step: string;
    status: 'pending' | 'in_progress' | 'completed' | 'failed';
    timestamp: string;
    duration?: number;
  }>;
  startTime: string;
  endTime?: string;
  totalDuration?: number;
  error?: {
    step: string;
    message: string;
  };
}

// Live Ticket Detail Widget Data (from Zoho Desk API)
export interface LiveTicketDetailData {
  ticketNumber: string;
}

// ============================================================================
// V17 GOVERNMENT MODE WIDGET DATA INTERFACES
// ============================================================================

// Contract Performance Dashboard Widget (COR Persona)
export interface ContractPerformanceData {
  title: string;
  contractId: string;
  contractName: string;
  vendor: {
    name: string;
    id: string;
    tier: 'prime' | 'subcontractor';
  };
  performance: {
    overallScore: number;
    slaCompliance: number;
    budgetUtilization: number;
    deliverableCompletion: number;
  };
  financials: {
    totalValue: number;
    spent: number;
    committed: number;
    remaining: number;
  };
  deliverables: Array<{
    id: string;
    name: string;
    dueDate: Date;
    status: 'pending' | 'submitted' | 'approved' | 'rejected';
    qualityScore: number;
  }>;
  issues: Array<{
    severity: 'critical' | 'high' | 'medium' | 'low';
    description: string;
    dueDate: Date;
    assignedTo: string;
  }>;
  recommendations: Array<{
    priority: 'critical' | 'high' | 'medium' | 'low';
    action: string;
    reason: string;
  }>;
}

// Deliverable Review List Widget (COR Persona)
export interface DeliverableReviewListData {
  title: string;
  count: number;
  filters?: {
    status?: string;
    priority?: string;
    dueWithin?: string;
  };
  deliverables: Array<{
    id: string;
    name: string;
    contractId: string;
    contractName: string;
    vendor: string;
    dueDate: string;
    submittedDate?: string;
    status: 'pending' | 'submitted' | 'under-review' | 'approved' | 'rejected' | 'resubmission-required';
    priority: 'critical' | 'high' | 'medium' | 'low';
    qualityScore?: number;
    reviewedBy?: string;
    issues: number;
    comments: number;
  }>;
  summary: {
    pendingReview: number;
    approved: number;
    rejected: number;
    overdue: number;
  };
}

// Vendor Compliance Dashboard Widget (COR Persona)
export interface VendorComplianceData {
  title: string;
  vendor: {
    name: string;
    id: string;
    tier: 'prime' | 'subcontractor';
    contractValue: number;
  };
  compliance: {
    overallScore: number;
    slaCompliance: number;
    securityCompliance: number;
    reportingCompliance: number;
    qualityCompliance: number;
  };
  violations: Array<{
    date: string;
    type: 'sla' | 'security' | 'reporting' | 'quality';
    severity: 'critical' | 'high' | 'medium' | 'low';
    description: string;
    status: 'open' | 'remediated' | 'waived';
    remediationDue?: string;
  }>;
  trends: Array<{
    month: string;
    score: number;
  }>;
  recommendations: string[];
}

// Program Health Dashboard Widget (Program Manager Persona)
export interface ProgramHealthData {
  title: string;
  programName: string;
  programId: string;
  status: 'on-track' | 'at-risk' | 'critical';
  health: {
    schedule: {
      status: 'green' | 'yellow' | 'red';
      score: number;
      variance: string;
    };
    budget: {
      status: 'green' | 'yellow' | 'red';
      score: number;
      utilization: number;
    };
    resources: {
      status: 'green' | 'yellow' | 'red';
      score: number;
      availability: number;
    };
    risks: {
      status: 'green' | 'yellow' | 'red';
      count: number;
      criticalCount: number;
    };
  };
  milestones: Array<{
    name: string;
    dueDate: string;
    status: 'completed' | 'on-track' | 'at-risk' | 'delayed';
    completion: number;
  }>;
  topRisks: Array<{
    id: string;
    description: string;
    impact: 'critical' | 'high' | 'medium' | 'low';
    probability: 'high' | 'medium' | 'low';
    mitigation: string;
  }>;
  keyMetrics: {
    contractsActive: number;
    deliverablesCompleted: number;
    stakeholderSatisfaction: number;
    budgetRemaining: number;
  };
}

// Stakeholder Engagement Dashboard Widget (Stakeholder Lead Persona)
export interface StakeholderEngagementData {
  title: string;
  stakeholders: Array<{
    name: string;
    role: string;
    organization: string;
    engagementLevel: 'high' | 'medium' | 'low';
    sentiment: 'positive' | 'neutral' | 'negative';
    lastContact: string;
    nextMeeting?: string;
    primaryInterests: string[];
  }>;
  communications: {
    thisWeek: number;
    thisMonth: number;
    avgResponseTime: string;
  };
  upcomingMeetings: Array<{
    date: string;
    title: string;
    attendees: string[];
    agenda: string[];
  }>;
  actionItems: Array<{
    stakeholder: string;
    action: string;
    dueDate: string;
    status: 'pending' | 'in-progress' | 'completed';
  }>;
}

// Requirements Tracking Dashboard Widget (Stakeholder Lead Persona)
export interface RequirementsTrackingData {
  title: string;
  summary: {
    total: number;
    approved: number;
    inReview: number;
    draft: number;
    traceability: number;
  };
  requirements: Array<{
    id: string;
    title: string;
    category: 'functional' | 'non-functional' | 'technical' | 'business';
    priority: 'critical' | 'high' | 'medium' | 'low';
    status: 'draft' | 'in-review' | 'approved' | 'implemented' | 'verified';
    assignedTo: string;
    stakeholders: string[];
    traceability: {
      designDocs: number;
      testCases: number;
      completeness: number;
    };
  }>;
  risksAtRisk: Array<{
    id: string;
    title: string;
    risk: string;
    mitigation: string;
  }>;
}

// Change Request Dashboard Widget (Stakeholder Lead Persona)
export interface ChangeRequestData {
  title: string;
  summary: {
    pending: number;
    approved: number;
    rejected: number;
    implemented: number;
  };
  requests: Array<{
    id: string;
    title: string;
    requestedBy: string;
    requestDate: string;
    category: 'scope' | 'schedule' | 'budget' | 'requirements';
    impact: {
      schedule: 'high' | 'medium' | 'low' | 'none';
      budget: 'high' | 'medium' | 'low' | 'none';
      resources: 'high' | 'medium' | 'low' | 'none';
    };
    status: 'pending-review' | 'approved' | 'rejected' | 'implemented';
    approvers: Array<{
      name: string;
      status: 'pending' | 'approved' | 'rejected';
    }>;
  }>;
}

// ============================================================================
// V17 PROJECT MODE WIDGET DATA INTERFACES
// ============================================================================

// Sprint Burndown Chart Widget (Project Manager Persona)
export interface SprintBurndownData {
  title: string;
  sprint: {
    name: string;
    startDate: string;
    endDate: string;
    totalStoryPoints: number;
    completedStoryPoints: number;
  };
  burndown: Array<{
    date: string;
    idealRemaining: number;
    actualRemaining: number;
  }>;
  velocity: {
    current: number;
    average: number;
    trend: 'increasing' | 'stable' | 'decreasing';
  };
  status: 'on-track' | 'at-risk' | 'critical';
  risks: string[];
}

// Team Velocity Dashboard Widget (Project Manager Persona)
export interface TeamVelocityData {
  title: string;
  currentSprint: {
    name: string;
    velocity: number;
    capacity: number;
    utilizationRate: number;
  };
  velocityTrend: Array<{
    sprint: string;
    plannedVelocity: number;
    actualVelocity: number;
  }>;
  teamMembers: Array<{
    name: string;
    role: string;
    capacity: number;
    assigned: number;
    completed: number;
    utilizationRate: number;
  }>;
  predictability: {
    score: number;
    consistency: string;
  };
}

// Code Quality Dashboard Widget (Service Team Lead Persona)
export interface CodeQualityData {
  title: string;
  overall: {
    score: number;
    grade: 'A' | 'B' | 'C' | 'D' | 'F';
    trend: 'improving' | 'stable' | 'declining';
  };
  metrics: {
    testCoverage: {
      value: number;
      target: number;
      status: 'pass' | 'warning' | 'fail';
    };
    codeSmells: {
      count: number;
      critical: number;
      status: 'pass' | 'warning' | 'fail';
    };
    technicalDebt: {
      hours: number;
      trend: 'increasing' | 'stable' | 'decreasing';
    };
    duplicateCode: {
      percentage: number;
      status: 'pass' | 'warning' | 'fail';
    };
  };
  recentIssues: Array<{
    file: string;
    type: 'bug' | 'vulnerability' | 'code-smell' | 'duplicate';
    severity: 'critical' | 'high' | 'medium' | 'low';
    description: string;
    assignedTo?: string;
  }>;
}

// Deployment Pipeline Dashboard Widget (Service Team Lead Persona)
export interface DeploymentPipelineData {
  title: string;
  pipeline: {
    status: 'passing' | 'failing' | 'running';
    lastDeployment: string;
    environment: 'production' | 'staging' | 'development';
  };
  stages: Array<{
    name: string;
    status: 'passed' | 'failed' | 'running' | 'pending';
    duration?: string;
    startTime?: string;
  }>;
  deploymentFrequency: {
    thisWeek: number;
    lastWeek: number;
    average: number;
  };
  metrics: {
    leadTime: string;
    deploymentSuccess: number;
    mttr: string;
    changeFailure: number;
  };
  recentDeployments: Array<{
    version: string;
    environment: string;
    status: 'success' | 'failed' | 'rolled-back';
    deployedBy: string;
    timestamp: string;
  }>;
}

// Task Kanban Board Widget (Service Team Member Persona)
export interface TaskKanbanData {
  title: string;
  sprint: string;
  columns: Array<{
    name: 'todo' | 'in-progress' | 'review' | 'done';
    tasks: Array<{
      id: string;
      title: string;
      assignedTo: string;
      storyPoints: number;
      priority: 'critical' | 'high' | 'medium' | 'low';
      blockedBy?: string;
      tags: string[];
    }>;
  }>;
  myTasks: {
    todo: number;
    inProgress: number;
    review: number;
    completed: number;
  };
}

// Resource Capacity Dashboard Widget (Project Manager Persona)
export interface ResourceCapacityData {
  title: string;
  teamCapacity: {
    totalHours: number;
    allocated: number;
    available: number;
    utilizationRate: number;
  };
  members: Array<{
    name: string;
    role: string;
    capacity: number;
    allocated: number;
    available: number;
    status: 'available' | 'at-capacity' | 'over-allocated';
    upcomingPTO: string[];
  }>;
  upcomingSprints: Array<{
    sprint: string;
    capacity: number;
    demand: number;
    gap: number;
  }>;
}

// Blocker Resolution Dashboard Widget (Service Team Lead Persona)
export interface BlockerResolutionData {
  title: string;
  activeBlockers: number;
  avgResolutionTime: string;
  blockers: Array<{
    id: string;
    task: string;
    blockerType: 'technical' | 'dependency' | 'resource' | 'external';
    severity: 'critical' | 'high' | 'medium' | 'low';
    blockedSince: string;
    impactedTasks: number;
    assignedTo: string;
    status: 'open' | 'in-progress' | 'resolved';
    description: string;
  }>;
  resolutionTrend: Array<{
    week: string;
    opened: number;
    resolved: number;
  }>;
}

// Knowledge Base Article Viewer Widget (Service Team Member Persona)
export interface KBArticleViewerData {
  id: string;
  title: string;
  category: string;
  tags: string[];
  content: string;
  videoUrl?: string;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  metadata: {
    author: string;
    lastUpdated: string;
    views: number;
    helpfulCount: number;
  };
  relatedArticles: Array<{
    id: string;
    title: string;
    category: string;
  }>;
}

// ============================================================================
// V18 ATC CSM (CUSTOMER SUCCESS MANAGER) WIDGET DATA INTERFACES
// ============================================================================

// Client Health Dashboard Widget (ATC CSM Persona)
export interface ClientHealthDashboardData {
  title: string;
  period: string;
  customersAnalyzed: number;
  healthMetrics: Array<{
    customerId: string;
    customerName: string;
    arr: string;
    healthScore: number;
    healthLevel: 'excellent' | 'good' | 'at-risk' | 'critical';
    lastUpdated: string;
    trendDirection: 'up' | 'down' | 'stable';
    scoreComponents: {
      productAdoption: number;
      supportTickets: number;
      paymentHealth: number;
      renewalLikelihood: number;
    };
    riskFactors: string[];
    recommendations: Array<{
      priority: 'high' | 'medium' | 'low';
      action: string;
    }>;
  }>;
  overallHealthTrend: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
    }>;
  };
}

// Renewal Pipeline Widget (ATC CSM Persona)
export interface RenewalPipelineData {
  title: string;
  period: string;
  renewalCount: number;
  totalArr: number;
  renewals: Array<{
    customerId: string;
    customerName: string;
    currentArr: number;
    renewalDate: string;
    daysUntilRenewal: number;
    status: 'on-track' | 'at-risk' | 'critical';
    expansionOpportunity: number;
    renewalLikelihood: number;
    csm: string;
    lastEngagement: string;
    actionItems: string[];
  }>;
  summary: {
    upcomingMonth: number;
    upcomingQuarter: number;
    atRisk: number;
    highValue: number;
  };
}

// Upsell Opportunities Widget (ATC CSM Persona)
export interface UpsellOpportunitiesData {
  title: string;
  totalOpportunities: number;
  totalPotentialRevenue: number;
  opportunities: Array<{
    customerId: string;
    customerName: string;
    currentArr: number;
    opportunityType: 'tier-upgrade' | 'add-on' | 'cross-sell' | 'new-product';
    suggestedProduct: string;
    estimatedRevenue: number;
    confidence: number;
    reasons: string[];
    buyingSignals: string[];
    nextSteps: string[];
    timelineToClose: string;
  }>;
  byType: {
    tierUpgrade: number;
    addOn: number;
    crossSell: number;
    newProduct: number;
  };
}

// Product Adoption Metrics Widget (ATC CSM Persona)
export interface ProductAdoptionMetricsData {
  title: string;
  period: string;
  customersTracked: number;
  metrics: Array<{
    customerId: string;
    customerName: string;
    currentAdoptionRate: number;
    previousAdoptionRate: number;
    trend: 'improving' | 'stable' | 'declining';
    trendPercentage: number;
    featureUsage: Array<{
      feature: string;
      usageRate: number;
      trend: 'up' | 'down' | 'stable';
    }>;
    loginsPerMonth: number;
    activeUsers: number;
    totalLicenses: number;
    utilizationRate: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    recommendations: string[];
  }>;
  adoptionTrend: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
    }>;
  };
}

// V18 CSM Insights Dashboard
export interface CSMInsightsDashboardData {
  title: string;
  period: string;
  insights: Array<{
    id: string;
    category: 'churn-risk' | 'upsell' | 'engagement' | 'adoption' | 'satisfaction';
    priority: 'critical' | 'high' | 'medium' | 'low';
    title: string;
    description: string;
    impactedCustomers: number;
    impactedArr: number;
    recommendedAction: string;
    confidence: number;
    dataPoints: string[];
  }>;
  summary: {
    totalInsights: number;
    criticalInsights: number;
    highPriorityInsights: number;
    potentialArrImpact: number;
    customersRequiringAction: number;
  };
  trendData: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
    }>;
  };
}

// V18 CSM Training Dashboard
export interface CSMTrainingDashboardData {
  title: string;
  period: string;
  trainingSessions: Array<{
    id: string;
    customerName: string;
    customerId: string;
    trainingType: 'onboarding' | 'feature-adoption' | 'best-practices' | 'advanced' | 'refresher';
    status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
    scheduledDate: string;
    duration: string;
    attendees: number;
    topics: string[];
    trainer: string;
    completionRate?: number;
    satisfactionScore?: number;
    notes?: string;
  }>;
  upcomingCount: number;
  completedThisMonth: number;
  averageSatisfaction: number;
  topRequestedTopics: Array<{
    topic: string;
    requestCount: number;
  }>;
  customersNeedingTraining: Array<{
    customerId: string;
    customerName: string;
    reason: string;
    priority: 'high' | 'medium' | 'low';
    suggestedTopics: string[];
  }>;
}

// V18 DORA Metrics Dashboard
export interface DoraMetricsData {
  title: string;
  period: string;
  team: string;
  overallPerformance: 'elite' | 'high' | 'medium' | 'low';
  deploymentFrequency: {
    value: string;
    unit: string;
    target: string;
    trend: 'up' | 'down' | 'stable';
    change: string;
    status: 'excellent' | 'good' | 'fair' | 'poor';
  };
  leadTime: {
    value: string;
    unit: string;
    target: string;
    trend: 'up' | 'down' | 'stable';
    change: string;
    status: 'excellent' | 'good' | 'fair' | 'poor';
  };
  changeFailureRate: {
    value: number;
    target: number;
    trend: 'up' | 'down' | 'stable';
    change: string;
    status: 'excellent' | 'good' | 'fair' | 'poor';
  };
  mttr: {
    value: string;
    unit: string;
    target: string;
    trend: 'up' | 'down' | 'stable';
    change: string;
    status: 'excellent' | 'good' | 'fair' | 'poor';
  };
  insights: Array<{
    type: 'positive' | 'warning' | 'critical';
    message: string;
  }>;
  recentIncidents?: Array<{
    title: string;
    date: string;
    duration: string;
    impact: string;
    resolved: boolean;
  }>;
}

// Union type for all widget data
export type WidgetData =
  | ExecutiveSummaryData
  | AnalyticsDashboardData
  | PerformanceTrendsData
  | SentimentAnalysisData
  | CustomerRiskProfileData
  | TeamWorkloadDashboardData
  | SLAPerformanceChartData
  | AgentDashboardData
  | TicketDetailData
  | LiveTicketDetailData
  | TicketListData
  | AgentPerformanceComparisonData
  | CustomerRiskListData
  | MeetingSchedulerData
  | MeetingConfirmationData
  | CallPrepNotesData
  | ResponseComposerData
  | SimilarTicketsAnalysisData
  | AgentPerformanceStatsData
  | KnowledgeBaseSearchData
  | KnowledgeArticleData
  | MessageComposerData
  | EscalationPathData
  | SystemAccessStatusData
  | InteractiveUpdateData
  | TicketProcessingData
  // V17 Government Mode Widget Data
  | ContractPerformanceData
  | DeliverableReviewListData
  | VendorComplianceData
  | ProgramHealthData
  | StakeholderEngagementData
  | RequirementsTrackingData
  | ChangeRequestData
  // V17 Project Mode Widget Data
  | SprintBurndownData
  | TeamVelocityData
  | CodeQualityData
  | DeploymentPipelineData
  | TaskKanbanData
  | ResourceCapacityData
  | BlockerResolutionData
  | KBArticleViewerData
  // V18 ATC CSM Widget Data
  | ClientHealthDashboardData
  | RenewalPipelineData
  | UpsellOpportunitiesData
  | ProductAdoptionMetricsData
  | CSMInsightsDashboardData
  | CSMTrainingDashboardData
  // V18 DORA Metrics
  | DoraMetricsData
  // V20 ITSS Draft Review
  | Draft;

// ============================================================================
// V20 ITSS DRAFT REVIEW DATA INTERFACE
// Re-export Draft type from draft.ts as DraftReviewData for widget compatibility
// ============================================================================

export type { Draft as DraftReviewData } from './draft';
