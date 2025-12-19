import {
  Shield,
  Users,
  Briefcase,
  FolderKanban,
  GitBranch,
  Wrench,
  Target,
  AlertCircle,
  TrendingUp,
  BarChart3,
  Clock,
  CheckCircle,
  FileText,
  MessageSquare,
  Calendar,
  Activity,
  Ticket,
  LayoutDashboard,
  Award,
  Zap,
  Bell,
  ArrowUpCircle,
  Headphones,
  TrendingDown,
  Users as UsersIcon,
  DollarSign,
} from 'lucide-react';
import { Persona, ModeType } from '@/types/persona';

// ========================================
// GOVERNMENT MODE PERSONAS (3)
// ========================================

export const governmentPersonas: Persona[] = [
  // ===========================
  // COR - Contracting Officer's Representative
  // ===========================
  {
    id: 'cor',
    mode: 'government',
    name: 'Alexa Johnson',
    email: 'alexa.johnson@agency.gov',
    role: 'Contracting Officer\'s Representative',
    badge: {
      label: 'COR',
      icon: Shield,
      color: 'text-blue-600',
    },
    theme: {
      primary: 'oklch(0.55 0.20 255)', // Government Blue
      accent: 'oklch(0.65 0.18 220)',
      badgeGradient: 'from-blue-600 via-blue-700 to-blue-600',
      badgeSolid: 'bg-blue-600',
      badgeRing: 'ring-blue-600/30',
    },
    quickActions: [
      {
        id: 'contract-status',
        icon: FileText,
        label: 'Contract Status',
        badge: 'Active',
        badgeColor: 'bg-green-600 text-white',
        query: 'Show me current contract status and deliverables',
      },
      {
        id: 'vendor-performance',
        icon: BarChart3,
        label: 'Vendor Performance',
        badge: '92%',
        badgeColor: 'bg-blue-500 text-white',
        query: 'Show vendor performance and compliance status',
      },
      {
        id: 'compliance-dashboard',
        icon: CheckCircle,
        label: 'Compliance Dashboard',
        badge: '✓',
        badgeColor: 'bg-green-600 text-white',
        query: 'Show compliance status for all active contracts',
      },
      {
        id: 'budget-tracking',
        icon: TrendingUp,
        label: 'Budget Tracking',
        badge: '$2.4M',
        badgeColor: 'bg-purple-500 text-white',
        query: 'Show budget utilization and projections',
      },
      {
        id: 'deliverables-review',
        icon: Ticket,
        label: 'Deliverables Review',
        badge: 8,
        badgeColor: 'bg-orange-500 text-white',
        query: 'Show pending deliverables requiring review',
      },
    ],
    demoScenarios: {
      'Daily Operations': [
        'Show me contract performance for active projects',
        'Which deliverables are due this month?',
        'Show today\'s pending approvals',
        'Contract status for NAVFAC project',
        'Budget remaining for current contracts',
        'What needs my attention today?',
        'Show overdue deliverables requiring escalation',
      ],
      'Contract Management': [
        'Generate compliance report for quarterly review',
        'Budget status for contract modifications',
        'Compare actual vs projected spending',
        'Show all contract modifications this quarter',
        'Risk analysis for contracts ending soon',
        'Payment schedule for active contracts',
      ],
      'Vendor Oversight': [
        'Vendor performance metrics for last quarter',
        'Show SLA compliance by vendor',
        'Risk assessment for current contracts',
        'Escalation trends by vendor',
        'Which vendors have quality issues?',
        'Vendor scorecard comparison',
        'Show security audit findings by vendor',
      ],
      'Reporting & Analysis': [
        'Executive summary for program review',
        'Trend analysis for deliverable delays',
        'Cost variance report by contract',
        'Generate monthly COR briefing',
        'Show improvement trends by vendor',
      ],
      'Escalations & Issues': [
        'Critical issues requiring COR attention',
        'Show contracts with SLA breaches',
        'Deliverables rejected for quality',
        'Vendor non-compliance incidents',
        'Emergency contract actions needed',
      ],
    },
    permissions: [
      'view_contract_status',
      'view_vendor_performance',
      'view_compliance_reports',
      'view_budget_data',
      'approve_deliverables',
    ],
  },

  // ===========================
  // PROGRAM MANAGER - Business Team Lead
  // ===========================
  {
    id: 'program-manager',
    mode: 'government',
    name: 'Jennifer Chen',
    email: 'jennifer.chen@agency.gov',
    role: 'Program Manager',
    badge: {
      label: 'PM',
      icon: FolderKanban,
      color: 'text-purple-600',
    },
    theme: {
      primary: 'oklch(0.58 0.22 290)', // Purple
      accent: 'oklch(0.62 0.18 270)',
      badgeGradient: 'from-purple-600 via-purple-700 to-purple-600',
      badgeSolid: 'bg-purple-600',
      badgeRing: 'ring-purple-600/30',
    },
    quickActions: [
      {
        id: 'program-overview',
        icon: LayoutDashboard,
        label: 'Program Overview',
        badge: '5 Projects',
        badgeColor: 'bg-purple-500 text-white',
        query: 'Show me comprehensive program status dashboard',
      },
      {
        id: 'milestone-tracker',
        icon: Target,
        label: 'Milestone Tracker',
        badge: 12,
        badgeColor: 'bg-blue-500 text-white',
        query: 'Show upcoming milestones and completion status',
      },
      {
        id: 'stakeholder-reports',
        icon: FileText,
        label: 'Stakeholder Reports',
        badge: 'Q4',
        badgeColor: 'bg-green-600 text-white',
        query: 'Generate stakeholder communication report',
      },
      {
        id: 'resource-allocation',
        icon: Users,
        label: 'Resource Allocation',
        badge: 'View',
        badgeColor: 'bg-teal-500 text-white',
        query: 'Show resource allocation across program initiatives',
      },
      {
        id: 'risk-register',
        icon: AlertCircle,
        label: 'Risk Register',
        badge: 3,
        badgeColor: 'bg-red-600 text-white',
        query: 'Show active risks and mitigation status',
      },
    ],
    demoScenarios: {
      'Daily Operations': [
        'Show me program health dashboard',
        'What needs my attention today?',
        'Critical path tasks for this week',
        'Program status for executive briefing',
        'Today\'s milestone deadlines',
        'Issues escalated to me',
        'Team capacity overview for planning',
      ],
      'Program Health': [
        'Which projects are behind schedule?',
        'Resource utilization by project',
        'Risk trends across portfolio',
        'Budget variance analysis',
        'Show projects at risk of missing deadlines',
        'Cross-project dependency status',
      ],
      'Stakeholder Management': [
        'Prepare executive briefing for program review',
        'Show stakeholder engagement metrics',
        'Generate monthly status report',
        'Dependencies blocking progress',
        'Schedule stakeholder review meeting',
        'Action items from last steering committee',
        'Stakeholder feedback summary',
      ],
      'Resource Planning': [
        'Resource allocation across all projects',
        'Skill gaps by project team',
        'Overtime trends analysis',
        'Contractor vs FTE utilization',
        'Resource forecasting for next quarter',
      ],
      'Risk & Issue Management': [
        'Top 5 program risks requiring mitigation',
        'Show critical blockers by project',
        'Risk register with mitigation plans',
        'Issues impacting multiple projects',
        'Escalation needed for budget approval',
      ],
    },
    permissions: [
      'view_program_status',
      'view_project_metrics',
      'view_resource_allocation',
      'view_risk_register',
      'generate_reports',
    ],
  },

  // ===========================
  // STAKEHOLDER LEAD - Department Group Lead
  // ===========================
  {
    id: 'stakeholder-lead',
    mode: 'government',
    name: 'Jessica Martinez',
    email: 'jessica.martinez@agency.gov',
    role: 'Department Stakeholder Lead',
    badge: {
      label: 'STAKEHOLDER',
      icon: Users,
      color: 'text-teal-600',
    },
    theme: {
      primary: 'oklch(0.60 0.15 200)', // Teal
      accent: 'oklch(0.70 0.14 180)',
      badgeGradient: 'from-teal-600 via-cyan-600 to-teal-600',
      badgeSolid: 'bg-teal-600',
      badgeRing: 'ring-teal-600/30',
    },
    quickActions: [
      {
        id: 'impact-analysis',
        icon: Activity,
        label: 'Impact Analysis',
        badge: 'New',
        badgeColor: 'bg-blue-500 text-white',
        query: 'Show impact analysis for department initiatives',
      },
      {
        id: 'change-requests',
        icon: GitBranch,
        label: 'Change Requests',
        badge: 7,
        badgeColor: 'bg-orange-500 text-white',
        query: 'Show pending change requests requiring approval',
      },
      {
        id: 'user-feedback',
        icon: MessageSquare,
        label: 'User Feedback',
        badge: '24',
        badgeColor: 'bg-green-600 text-white',
        query: 'Show latest user feedback and sentiment analysis',
      },
      {
        id: 'requirements-tracking',
        icon: CheckCircle,
        label: 'Requirements Tracking',
        badge: '89%',
        badgeColor: 'bg-purple-500 text-white',
        query: 'Show requirements completion status',
      },
      {
        id: 'communication-log',
        icon: Bell,
        label: 'Communication Log',
        badge: 'View',
        badgeColor: 'bg-cyan-500 text-white',
        query: 'Show stakeholder communication history',
      },
    ],
    demoScenarios: {
      'Daily Operations': [
        'What needs my attention today?',
        'Pending change requests requiring approval',
        'User feedback received today',
        'Upcoming stakeholder meetings this week',
        'Action items assigned to me',
        'Requirements status for current sprint',
      ],
      'Requirements Management': [
        'Show requirements status for current sprint',
        'Which requirements are at risk?',
        'User feedback on recent deployments',
        'Requirements traceability matrix',
        'Coverage gaps in requirement testing',
        'Prioritize backlog based on user needs',
        'Requirements dependency analysis',
      ],
      'Change Management': [
        'Show pending change requests by priority',
        'Impact analysis for proposed changes',
        'Stakeholder approval status',
        'Change implementation timeline',
        'Recent changes deployed to production',
        'Change request rejection reasons',
      ],
      'Stakeholder Communication': [
        'Draft communication for system downtime',
        'Stakeholder engagement summary',
        'Schedule review meeting with department heads',
        'Communication log for last 30 days',
        'Feedback trends from user surveys',
      ],
      'Impact Analysis': [
        'Impact of proposed UI redesign',
        'User adoption metrics for new features',
        'Cost-benefit analysis for change requests',
        'Risk assessment for breaking changes',
        'Department-specific impact report',
      ],
    },
    permissions: [
      'view_requirements',
      'approve_change_requests',
      'view_user_feedback',
      'view_impact_analysis',
      'view_communication_log',
    ],
  },
];

// ========================================
// PROJECT MODE PERSONAS (3)
// ========================================

export const projectPersonas: Persona[] = [
  // ===========================
  // PROJECT MANAGER
  // ===========================
  {
    id: 'project-manager',
    mode: 'project',
    name: 'Dale Thompson',
    email: 'dale.thompson@company.com',
    role: 'Project Manager',
    badge: {
      label: 'PM',
      icon: Briefcase,
      color: 'text-indigo-600',
    },
    theme: {
      primary: 'oklch(0.56 0.20 270)', // Indigo
      accent: 'oklch(0.64 0.18 250)',
      badgeGradient: 'from-indigo-600 via-indigo-700 to-indigo-600',
      badgeSolid: 'bg-indigo-600',
      badgeRing: 'ring-indigo-600/30',
    },
    quickActions: [
      {
        id: 'project-dashboard',
        icon: LayoutDashboard,
        label: 'Project Dashboard',
        badge: 'Live',
        badgeColor: 'bg-green-600 text-white',
        query: 'Show me real-time project dashboard',
      },
      {
        id: 'sprint-planning',
        icon: Calendar,
        label: 'Sprint Planning',
        badge: 'Sprint 12',
        badgeColor: 'bg-blue-500 text-white',
        query: 'Show current sprint status and upcoming planning',
      },
      {
        id: 'team-capacity',
        icon: Users,
        label: 'Team Capacity',
        badge: '78%',
        badgeColor: 'bg-purple-500 text-white',
        query: 'Show team capacity and resource utilization',
      },
      {
        id: 'blocker-resolution',
        icon: AlertCircle,
        label: 'Blocker Resolution',
        badge: 5,
        badgeColor: 'bg-red-600 text-white',
        query: 'Show active blockers and resolution status',
      },
      {
        id: 'client-meetings',
        icon: MessageSquare,
        label: 'Client Meetings',
        badge: '3',
        badgeColor: 'bg-orange-500 text-white',
        query: 'Show upcoming client meetings and action items',
      },
    ],
    demoScenarios: {
      'Daily Operations': [
        'What needs my attention today?',
        'Show current sprint progress',
        'Active blockers requiring resolution',
        'Team capacity for this week',
        'Today\'s standup summary',
        'Client meeting prep for today',
      ],
      'Sprint Management': [
        'Which stories are at risk?',
        'Team velocity trends',
        'Sprint burndown analysis',
        'Sprint goal progress',
        'Story point completion forecast',
        'Carry-over work from last sprint',
        'Sprint retrospective action items',
      ],
      'Resource Management': [
        'Team capacity for next sprint',
        'Resource allocation by task',
        'Skill gaps identification',
        'Overtime tracking by team member',
        'PTO impact on sprint capacity',
        'Cross-team dependency conflicts',
      ],
      'Client Communication': [
        'Prepare weekly client status update',
        'Client feedback from last review',
        'Schedule next client demo',
        'Client escalation tracking',
        'Feature request prioritization with client',
      ],
      'Risk & Planning': [
        'Sprint risk register',
        'Dependencies blocking next sprint',
        'Budget burn rate analysis',
        'Scope creep alerts',
        'Velocity vs plan variance',
      ],
    },
    permissions: [
      'view_project_status',
      'manage_sprints',
      'view_team_capacity',
      'resolve_blockers',
      'schedule_meetings',
    ],
  },

  // ===========================
  // SERVICE TEAM LEAD
  // ===========================
  {
    id: 'service-team-lead',
    mode: 'project',
    name: 'Herbert Roberts',
    email: 'herbert.roberts@company.com',
    role: 'Service Team Lead',
    badge: {
      label: 'LEAD',
      icon: Award,
      color: 'text-amber-600',
    },
    theme: {
      primary: 'oklch(0.62 0.18 50)', // Amber
      accent: 'oklch(0.70 0.16 40)',
      badgeGradient: 'from-amber-600 via-orange-600 to-amber-600',
      badgeSolid: 'bg-amber-600',
      badgeRing: 'ring-amber-600/30',
    },
    quickActions: [
      {
        id: 'team-workload',
        icon: Activity,
        label: 'Team Workload',
        badge: '12 Tasks',
        badgeColor: 'bg-blue-500 text-white',
        query: 'Show team workload distribution',
      },
      {
        id: 'code-quality',
        icon: BarChart3,
        label: 'Code Quality',
        badge: '94%',
        badgeColor: 'bg-green-600 text-white',
        query: 'Show me code coverage and technical debt',
      },
      {
        id: 'code-reviews',
        icon: CheckCircle,
        label: 'Code Reviews',
        badge: 8,
        badgeColor: 'bg-purple-500 text-white',
        query: 'Show pending code reviews requiring attention',
      },
      {
        id: 'deployment-status',
        icon: Zap,
        label: 'Deployment Status',
        badge: '✓',
        badgeColor: 'bg-green-600 text-white',
        query: 'Show deployment pipeline status',
      },
      {
        id: 'team-performance',
        icon: TrendingUp,
        label: 'Team Performance',
        badge: 'View',
        badgeColor: 'bg-teal-500 text-white',
        query: 'Show team performance analytics',
      },
    ],
    demoScenarios: {
      'Daily Operations': [
        'What needs my attention today?',
        'Show team workload balance',
        'Pending code reviews requiring approval',
        'Today\'s deployment status',
        'Team standup summary',
        'Active incidents assigned to team',
      ],
      'Team Management': [
        'Which team members need support?',
        'Code review backlog status',
        'Team performance trends',
        'Work distribution across team',
        '1-on-1 preparation for team members',
        'Skill development progress tracking',
      ],
      'Quality Assurance': [
        'Quality metrics by sprint',
        'Code coverage trends',
        'Bug resolution times',
        'Technical debt tracking',
        'Critical vulnerabilities in codebase',
        'Code smell trends',
        'Test automation coverage',
      ],
      'Deployment & DevOps': [
        'Deployment pipeline health',
        'Failed builds analysis',
        'Deployment frequency trends',
        'Mean time to recovery (MTTR)',
        'Production incident postmortems',
      ],
      'Technical Leadership': [
        'Architecture decision records (ADRs)',
        'Technical spike recommendations',
        'Refactoring backlog prioritization',
        'Performance optimization opportunities',
        'Security scan findings review',
      ],
    },
    permissions: [
      'view_team_workload',
      'view_quality_metrics',
      'approve_code_reviews',
      'view_deployments',
      'view_team_performance',
    ],
  },

  // ===========================
  // SERVICE TEAM MEMBER
  // ===========================
  {
    id: 'service-team-member',
    mode: 'project',
    name: 'Molly Rivera',
    email: 'molly.rivera@company.com',
    role: 'Service Team Member',
    badge: {
      label: 'DEVELOPER',
      icon: Wrench,
      color: 'text-cyan-600',
    },
    theme: {
      primary: 'oklch(0.64 0.16 200)', // Cyan
      accent: 'oklch(0.72 0.14 180)',
      badgeGradient: 'from-cyan-600 via-blue-600 to-cyan-600',
      badgeSolid: 'bg-cyan-600',
      badgeRing: 'ring-cyan-600/30',
    },
    quickActions: [
      {
        id: 'my-sprint-tasks',
        icon: Ticket,
        label: 'My Sprint Tasks',
        badge: 7,
        badgeColor: 'bg-blue-500 text-white',
        query: 'Show my sprint tasks and priorities',
      },
      {
        id: 'my-pull-requests',
        icon: GitBranch,
        label: 'My Pull Requests',
        badge: 3,
        badgeColor: 'bg-purple-500 text-white',
        query: 'Show my pull requests and review status',
      },
      {
        id: 'my-performance',
        icon: BarChart3,
        label: 'My Performance',
        badge: 'Stats',
        badgeColor: 'bg-green-600 text-white',
        query: 'Show my performance stats this sprint',
      },
      {
        id: 'knowledge-base',
        icon: FileText,
        label: 'Knowledge Base',
        badge: 'Search',
        badgeColor: 'bg-orange-500 text-white',
        query: 'Search knowledge base for solutions',
      },
      {
        id: 'my-blockers',
        icon: AlertCircle,
        label: 'My Blockers',
        badge: 2,
        badgeColor: 'bg-red-600 text-white',
        query: 'Show blockers affecting my work',
      },
    ],
    demoScenarios: {
      'Daily Operations': [
        'What are my priorities today?',
        'Show my tasks for this sprint',
        'Time tracking summary for today',
        'Standup notes for today',
        'Code reviews assigned to me',
        'Pull requests waiting for review',
      ],
      'Task Management': [
        'What should I work on next?',
        'Time tracking summary for this week',
        'Blockers I reported',
        'Task dependencies for my work',
        'Sprint progress for my assigned stories',
        'Estimate remaining work for current task',
      ],
      'Technical Support': [
        'Search knowledge base for error solutions',
        'Similar tickets to my current work',
        'Code examples for current task',
        'Documentation for API integration',
        'How to set up local development environment',
        'Troubleshooting guide for common errors',
      ],
      'Code Quality': [
        'My code review feedback summary',
        'Test coverage for my recent commits',
        'Static analysis warnings for my code',
        'Performance benchmarks for my changes',
        'Security scan results for my branch',
      ],
      'Learning & Growth': [
        'Technical debt in areas I work on',
        'Best practices for current framework',
        'Team coding standards documentation',
        'Skill development resources',
        'Mentorship opportunities',
      ],
    },
    permissions: [
      'view_own_tasks',
      'update_task_status',
      'view_knowledge_base',
      'log_time',
      'report_blockers',
    ],
  },
];

// ========================================
// ATC MODE PERSONAS (4)
// ========================================

export const atcPersonas: Persona[] = [
  // ===========================
  // ATC EXECUTIVE - C-Level Dashboard
  // ===========================
  {
    id: 'atc-executive',
    mode: 'atc',
    name: 'Jennifer Anderson',
    email: 'jennifer.anderson@company.com',
    role: 'Chief Executive Officer',
    badge: {
      label: 'C-LEVEL',
      icon: TrendingUp,
      color: 'text-purple-500',
    },
    theme: {
      primary: 'oklch(0.58 0.2557 316.13)', // Purple (darkened for better contrast)
      accent: 'oklch(0.62 0.18 270)', // Deep blue
      badgeGradient: 'from-purple-500 via-blue-600 to-purple-500',
      badgeSolid: 'bg-purple-500',
      badgeRing: 'ring-purple-500/30',
    },
    quickActions: [
      {
        id: 'live-tickets',
        icon: Ticket,
        label: 'Live Tickets Dashboard',
        badge: 'New',
        badgeColor: 'bg-blue-500 text-white',
        query: 'Show me all my current tickets from Zoho Desk',
      },
      {
        id: 'sla-performance',
        icon: LayoutDashboard,
        label: 'SLA Performance',
        badge: '92%',
        badgeColor: 'bg-green-600 text-white',
        query: 'Show me SLA performance dashboard for this quarter',
      },
      {
        id: 'churn-risk',
        icon: TrendingDown,
        label: 'Churn Risk',
        badge: 5,
        badgeColor: 'bg-red-600 text-white',
        query: 'Which customers are at highest risk of churning?',
      },
      {
        id: 'exec-summary',
        icon: BarChart3,
        label: 'Executive Summary',
        badge: 'Q4',
        badgeColor: 'bg-purple-500 text-white',
        query: 'Generate comprehensive executive dashboard summary',
      },
      {
        id: 'board-metrics',
        icon: Award,
        label: 'Board Metrics',
        badge: 'Ready',
        badgeColor: 'bg-cyan-500 text-white',
        query: 'Prepare metrics for board meeting presentation',
      },
      {
        id: 'high-value',
        icon: Target,
        label: 'High-Value Accounts',
        badge: 18,
        badgeColor: 'bg-orange-500 text-white',
        query: 'Show me status of top 20 high-value customer accounts',
      },
      {
        id: 'strategic',
        icon: GitBranch,
        label: 'Strategic Initiatives',
        badge: 8,
        badgeColor: 'bg-green-600 text-white',
        query: 'Show me progress on strategic initiatives and OKRs',
      },
    ],
    demoScenarios: {
      'Executive Overview': [
        'Show me SLA performance for Q4 2025',
        'Which customers are at risk of churning?',
        'Executive dashboard summary for board meeting',
        'Revenue impact analysis from support tickets',
      ],
      'Customer Health': [
        'Show me customer satisfaction scores',
        'Top 10 accounts by revenue with health scores',
        'Escalation trends over last 3 months',
        'Customer retention metrics and forecasts',
      ],
      'Strategic Planning': [
        'Show me resource allocation efficiency',
        'Team capacity vs demand projections',
        'Integration ROI analysis',
        'Competitive positioning from customer feedback',
      ],
    },
    permissions: [
      'view_all_metrics',
      'view_financial_data',
      'view_customer_health',
      'view_strategic_initiatives',
      'view_sla_reports',
    ],
  },

  // ===========================
  // ATC MANAGER - Team Operations
  // ===========================
  {
    id: 'atc-manager',
    mode: 'atc',
    name: 'David Miller',
    email: 'david.miller@company.com',
    role: 'Customer Support Operations Manager',
    badge: {
      label: 'CS MANAGER',
      icon: Users,
      color: 'text-teal-500',
    },
    theme: {
      primary: 'oklch(0.60 0.1446 235.91)', // Teal (darkened for better contrast)
      accent: 'oklch(0.70 0.14 200)', // Cyan
      badgeGradient: 'from-teal-500 via-cyan-600 to-teal-500',
      badgeSolid: 'bg-teal-500',
      badgeRing: 'ring-teal-500/30',
    },
    quickActions: [
      {
        id: 'live-tickets',
        icon: Ticket,
        label: 'Live Tickets Dashboard',
        badge: 'New',
        badgeColor: 'bg-blue-500 text-white',
        query: 'Show me all my current tickets from Zoho Desk',
      },
      {
        id: 'priority-customers',
        icon: AlertCircle,
        label: 'Priority Customers',
        badge: 12,
        badgeColor: 'bg-red-600 text-white',
        query: 'Show me all high-priority customers needing attention',
      },
      {
        id: 'agent-performance',
        icon: BarChart3,
        label: 'Agent Performance',
        badge: 'This Week',
        badgeColor: 'bg-teal-500 text-white',
        query: 'Show me agent performance metrics for this week',
      },
      {
        id: 'slacking-agent',
        icon: TrendingDown,
        label: 'Most Slacking Agent',
        badge: '!',
        badgeColor: 'bg-orange-500 text-white',
        query: 'Who is my most slacking agent this week?',
      },
      {
        id: 'top-performer',
        icon: Award,
        label: 'Top Performing Agent',
        badge: '⭐',
        badgeColor: 'bg-green-600 text-white',
        query: 'Who is my top performing agent this week?',
      },
      {
        id: 'workload-balance',
        icon: UsersIcon,
        label: 'Workload Balance',
        badge: 'View',
        badgeColor: 'bg-cyan-500 text-white',
        query: 'Show me agent workload distribution and recommend reassignments',
      },
      {
        id: 'sla-breach',
        icon: Clock,
        label: 'SLA Breach Alerts',
        badge: 3,
        badgeColor: 'bg-red-600 text-white',
        query: 'Show me tickets at risk of SLA breach',
      },
      {
        id: 'capacity',
        icon: Activity,
        label: 'Team Capacity',
        badge: '78%',
        badgeColor: 'bg-green-600 text-white',
        query: 'Show me team capacity and forecast for next week',
      },
      {
        id: 'escalations',
        icon: ArrowUpCircle,
        label: 'Escalation Queue',
        badge: 7,
        badgeColor: 'bg-orange-500 text-white',
        query: 'Show me all escalated tickets requiring manager attention',
      },
      {
        id: 'team-budget',
        icon: DollarSign,
        label: 'Team Budget',
        badge: '$450K',
        badgeColor: 'bg-purple-500 text-white',
        query: 'Show team budget and department costs',
      },
    ],
    demoScenarios: {
      'Team Performance': [
        "Show me my team's status",
        'Who are the top and bottom performers?',
        'Show me agent performance for this week',
        'Who is my most slacking agent?',
        'Who is my top performing agent?',
        "Show me Sarah's tickets",
        'Compare agent metrics: resolution time vs customer satisfaction',
      ],
      'Customer Management': [
        'Show me all high-risk customers',
        'Which customers need immediate attention?',
        'Show me all high-priority tickets by customer',
        'Customers with multiple open tickets',
        'Accounts with declining satisfaction scores',
      ],
      'Operations': [
        'Draft a message to Acme Corp about the outage',
        'Schedule a 1-on-1 coaching session with Marcus',
        'Recommend ticket reassignments for workload balance',
        'Show me SLA breach risks for next 24 hours',
        'Team capacity planning for Q1 2026',
        'Escalation trends and root cause analysis',
      ],
    },
    permissions: [
      'view_team_metrics',
      'view_all_tickets',
      'reassign_tickets',
      'view_agent_performance',
      'escalate_tickets',
      'view_customer_data',
      'manage_team',
    ],
  },

  // ===========================
  // ATC SUPPORT - Personal Queue
  // ===========================
  {
    id: 'atc-support',
    mode: 'atc',
    name: 'Christopher Hayes',
    email: 'christopher.hayes@company.com',
    role: 'Senior Support Engineer',
    badge: {
      label: 'SUPPORT AGENT',
      icon: Headphones,
      color: 'text-green-500',
    },
    theme: {
      primary: 'oklch(0.58 0.1688 149.18)', // Green (darkened for better contrast)
      accent: 'oklch(0.60 0.16 165)', // Emerald
      badgeGradient: 'from-green-500 via-emerald-600 to-green-500',
      badgeSolid: 'bg-green-500',
      badgeRing: 'ring-green-500/30',
    },
    quickActions: [
      {
        id: 'live-tickets',
        icon: Ticket,
        label: 'Live Tickets Dashboard',
        badge: 'New',
        badgeColor: 'bg-blue-500 text-white',
        query: 'Show me all my current tickets from Zoho Desk',
      },
      {
        id: 'my-tickets',
        icon: Target,
        label: 'My Open Tickets',
        badge: 18,
        badgeColor: 'bg-orange-500 text-white',
        query: 'Show me all my currently open support tickets',
      },
      {
        id: 'ai-resolved',
        icon: Zap,
        label: 'AI-Resolved Today',
        badge: 23,
        badgeColor: 'bg-green-600 text-white',
        query: 'How many tickets did AI resolve for me today?',
      },
      {
        id: 'escalated-to-me',
        icon: ArrowUpCircle,
        label: 'Escalated to Me',
        badge: 5,
        badgeColor: 'bg-red-600 text-white',
        query: 'Show me tickets escalated to me that need my attention',
      },
      {
        id: 'todays-meetings',
        icon: Calendar,
        label: "Today's Meetings",
        badge: 3,
        badgeColor: 'bg-cyan-500 text-white',
        query: 'Show me my scheduled customer meetings for today',
      },
      {
        id: 'jira-sync',
        icon: GitBranch,
        label: 'Jira Sync Status',
        badge: '✓',
        badgeColor: 'bg-green-600 text-white',
        query: 'Show me status of Jira issues linked to my tickets',
      },
      {
        id: 'urgent-alerts',
        icon: Bell,
        label: 'High-Priority Alerts',
        badge: 7,
        badgeColor: 'bg-red-600 text-white',
        query: 'Show me my urgent tickets and critical alerts',
      },
    ],
    demoScenarios: {
      'My Workload': [
        'Show me my tickets received in last 24 hours',
        'How many tickets did AI resolve for me?',
        'What are my urgent tickets right now?',
        'My ticket resolution rate this week',
      ],
      'Customer Interactions': [
        'Prep notes for my 2 PM customer call',
        'Show me conversation history with TechCorp Solutions',
        'Draft response for ticket DESK-1002',
        'Schedule follow-up meeting with CloudNine Technologies',
      ],
      'Productivity': [
        'Link ticket DESK-1002 to Jira issue PROJ-302',
        'Show me tickets I can close today',
        'AI-suggested canned responses for common issues',
        'My performance metrics vs team average',
      ],
    },
    permissions: [
      'view_own_tickets',
      'update_own_tickets',
      'view_customer_data',
      'link_jira_issues',
      'escalate_tickets',
      'view_own_meetings',
      'view_own_performance',
    ],
  },

  // ===========================
  // ATC CSM - Customer Success Manager
  // ===========================
  {
    id: 'atc-csm',
    mode: 'atc',
    name: 'Jordan Taylor',
    email: 'jordan.taylor@company.com',
    role: 'Customer Success Manager',
    badge: {
      label: 'CSM',
      icon: Target,
      color: 'text-cyan-500',
    },
    theme: {
      primary: 'oklch(0.68 0.14 210)', // Cyan
      accent: 'oklch(0.64 0.18 240)', // Blue
      badgeGradient: 'from-cyan-500 via-blue-500 to-cyan-500',
      badgeSolid: 'bg-cyan-500',
      badgeRing: 'ring-cyan-500/30',
    },
    quickActions: [
      {
        id: 'customer-health',
        icon: Activity,
        label: 'Customer Health Scores',
        badge: 'Live',
        badgeColor: 'bg-cyan-500 text-white',
        query: 'Show me health scores for my assigned customers',
      },
      {
        id: 'product-adoption',
        icon: TrendingUp,
        label: 'Product Adoption',
        badge: 'Metrics',
        badgeColor: 'bg-green-600 text-white',
        query: 'Show product adoption metrics and feature usage across customers',
      },
      {
        id: 'renewal-pipeline',
        icon: Calendar,
        label: 'Renewal Pipeline',
        badge: '12',
        badgeColor: 'bg-orange-500 text-white',
        query: 'Show upcoming renewals and contract status',
      },
      {
        id: 'customer-feedback',
        icon: Bell,
        label: 'Customer Feedback',
        badge: 'NPS',
        badgeColor: 'bg-purple-500 text-white',
        query: 'Show recent customer feedback and NPS scores',
      },
      {
        id: 'upsell-opportunities',
        icon: ArrowUpCircle,
        label: 'Upsell Opportunities',
        badge: '$2.4M',
        badgeColor: 'bg-yellow-600 text-white',
        query: 'Identify upsell and cross-sell opportunities',
      },
      {
        id: 'product-roadmap',
        icon: GitBranch,
        label: 'Product Roadmap',
        badge: 'Q1',
        badgeColor: 'bg-blue-500 text-white',
        query: 'Show product roadmap and upcoming features',
      },
      {
        id: 'customer-meetings',
        icon: Calendar,
        label: 'Customer Meetings',
        badge: '8',
        badgeColor: 'bg-cyan-600 text-white',
        query: 'Schedule and manage customer business reviews',
      },
    ],
    demoScenarios: {
      'Customer Success': [
        'Show me health scores for all my assigned customers',
        'Which customers have declining product adoption?',
        'Show me customers at risk of churn this quarter',
        'Compare customer engagement trends month-over-month',
      ],
      'Revenue Growth': [
        'Show upcoming renewals in next 90 days',
        'Identify expansion opportunities across my portfolio',
        'Show customers ready for premium tier upgrade',
        'Analyze revenue retention and expansion metrics',
      ],
      'Customer Engagement': [
        'Show recent NPS survey results by customer',
        'Which customers need business review meetings?',
        'Show product roadmap items most requested by customers',
        'Schedule quarterly business reviews for top accounts',
      ],
    },
    permissions: [
      'view_customer_health',
      'view_product_adoption',
      'view_renewal_pipeline',
      'view_nps_scores',
      'manage_customer_meetings',
      'view_upsell_opportunities',
      'view_product_roadmap',
      'view_customer_feedback',
      'schedule_business_reviews',
      'view_expansion_metrics',
    ],
  },
];

// ========================================
// COMBINED EXPORT & HELPERS
// ========================================

// Combined personas (all 10) - for backward compatibility
export const personas: Persona[] = [
  ...governmentPersonas,
  ...projectPersonas,
  ...atcPersonas,
];

// All personas export (alias)
export const allPersonas = personas;

// Helper: Get personas by mode
export const getPersonasByMode = (mode: ModeType): Persona[] => {
  if (mode === 'government') return governmentPersonas;
  if (mode === 'project') return projectPersonas;
  if (mode === 'atc') return atcPersonas;
  return governmentPersonas; // default
};

// Helper: Get persona by ID
export const getPersonaById = (id: string): Persona | undefined => {
  return personas.find((p) => p.id === id);
};

// Helper: Get default persona for mode
export const getDefaultPersona = (mode: ModeType): Persona => {
  if (mode === 'government') return governmentPersonas[0];
  if (mode === 'project') return projectPersonas[0];
  if (mode === 'atc') return atcPersonas[0];
  return governmentPersonas[0]; // default
};

// Export default for backward compatibility
export default personas;
