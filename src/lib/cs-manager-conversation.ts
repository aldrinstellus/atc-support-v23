// CS Manager Conversation Patterns
// Multi-turn conversation flows for CS Manager persona

import type { WidgetData } from '@/types/widget';
import {
  meetingSchedulerDemo,
  teamWorkloadDashboardDemo,
  customerRiskListDemo,
} from '@/data/demo-widget-data';

export interface ConversationEntry {
  id: string;
  triggers: string[];
  userQuery: string;
  aiResponse: string;
  widgetType?: string;
  widgetData?: WidgetData;
}

// Helper to get tomorrow's date in ISO format
function getTomorrow(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0]; // Returns YYYY-MM-DD
}

const conversationEntries: ConversationEntry[] = [
  // Q1: Schedule 1-on-1 (Initial Request - AI Response Only)
  {
    id: 'q1-schedule-1on1',
    triggers: ['schedule 1-on-1', 'schedule a 1-on-1', 'coaching session with'],
    userQuery: 'Schedule a 1-on-1 coaching session with Marcus',
    aiResponse:
      "I can help you schedule a 1-on-1 with Marcus. The session will be 30 minutes.\n\nWould you like me to check both of your calendars for availability?",
  },

  // Q2: Check availability (Show Calendar)
  {
    id: 'q2-check-availability',
    triggers: [
      // Affirmative responses (for Q1 "Would you like me to check calendars?" follow-up)
      'yes', 'yeah', 'yep', 'sure', 'ok', 'okay', 'please', 'go ahead', 'proceed',
      // Explicit triggers
      'find time', 'availability', 'check calendar',
    ],
    userQuery: 'Yes, check availability',
    aiResponse: "I've checked both calendars. Here are the available time slots:",
    widgetType: 'meeting-scheduler',
    widgetData: {
      ...meetingSchedulerDemo,
      title: 'Schedule 1-on-1 with Marcus',
      type: '1-on-1 Coaching Session',
      duration: '30 minutes',
      attendees: [
        {
          name: 'You (CS Manager)',
          status: 'organizer',
          required: true,
        },
        {
          name: 'Marcus Johnson (Support Agent)',
          status: 'available',
          required: true,
        },
      ],
    },
  },

  // Q3: Book Meeting (Confirmation)
  {
    id: 'q3-book-meeting',
    triggers: ['book', 'confirm', 'schedule', 'tomorrow', '1pm', '13:00', '2pm', '14:00', '10am'],
    userQuery: 'Book the tomorrow at 1pm slot.',
    aiResponse: 'Perfect! 1-on-1 session confirmed and calendar invite sent.',
    widgetType: 'meeting-confirmation',
    widgetData: {
      meetingDate: getTomorrow(),
      meetingTime: '1:00 PM',
      timezone: 'PST',
      duration: '30 minutes',
      location: 'Video Conference',
      invitesSent: [
        { name: 'Marcus Johnson', email: 'marcus.johnson@company.com', role: 'Support Agent' },
      ],
      briefingCreated: true,
      briefingItems: [
        'Performance metrics for last 30 days',
        'Recent tickets handled',
        'Customer feedback summary',
        'Development goals discussion',
      ],
      agendaItems: [
        'Review performance metrics and trends',
        'Discuss recent challenging tickets',
        'Address any blockers or support needs',
        'Set goals for next quarter',
        'Career development discussion',
      ],
    },
  },

  // Message Composer Actions
  {
    id: 'q4-send-message',
    triggers: ['send the message', 'send message', 'send it'],
    userQuery: 'Send the message',
    aiResponse: '✓ Message sent to Acme Corp successfully! They should receive it within the next few minutes. I\'ve also added this to your sent items.',
  },

  {
    id: 'q5-save-draft',
    triggers: ['save as draft', 'save draft'],
    userQuery: 'Save as draft',
    aiResponse: '✓ Message saved as draft. You can find it in your Drafts folder and continue editing later.',
  },

  {
    id: 'q6-save-template',
    triggers: ['save as template', 'save template'],
    userQuery: 'Save as template',
    aiResponse: '✓ Message saved as template "Customer Outage Response". You can reuse this template for similar customer communications in the future.',
  },

  // NEW Q&A #1: Team Workload Dashboard
  {
    id: 'q7-team-workload',
    triggers: ['team workload', 'team capacity', 'workload dashboard', 'team distribution', 'agent workload'],
    userQuery: 'Show me the current team workload distribution',
    aiResponse: "Here's the real-time team workload dashboard showing current capacity and distribution. I can identify any agents that are overloaded and recommend ticket redistribution to available team members:",
    widgetType: 'team-workload-dashboard',
    widgetData: teamWorkloadDashboardDemo,
  },

  // NEW Q&A #2: Customer Risk List (KEEP - potentially unique)
  {
    id: 'q11-customer-risk-list',
    triggers: ['at-risk customers', 'customer risk', 'high-risk accounts', 'customers at risk', 'risk list'],
    userQuery: 'Show me all at-risk customers',
    aiResponse: "Here are your 8 high-risk customers requiring immediate attention. Acme Corporation tops the list with a risk score of 92 and contract renewal in just 45 days:",
    widgetType: 'customer-risk-list',
    widgetData: customerRiskListDemo,
  },

  // Ticket Detail (Click-to-view from Live Tickets Dashboard) - DISABLED
  // This is now handled by the live query detection in detectManagerQuery
  // which extracts the ticket number and fetches real data from Zoho
  /*
  {
    id: 'ticket-detail',
    triggers: ['details for ticket', 'ticket #', 'show me ticket'],
    userQuery: 'Show me details for ticket #XXX',
    aiResponse: 'Here are the complete details for this ticket:',
    widgetType: 'ticket-detail',
    widgetData: ticketDetailDemo,
  },
  */
];

/**
 * Find best matching conversation entry for CS Manager queries using scoring algorithm
 */
export function findBestMatch(userInput: string): ConversationEntry | null {
  const normalizedInput = userInput.toLowerCase().trim();

  const scoredMatches = conversationEntries
    .map((entry) => {
      const matchedTriggers = entry.triggers.filter((trigger) =>
        normalizedInput.includes(trigger.toLowerCase())
      );

      if (matchedTriggers.length === 0) return null;

      // Score calculation:
      // - Longer trigger phrases score higher (more specific)
      // - Multiple matches boost score by 10 per match
      const score =
        matchedTriggers.reduce((sum, trigger) => sum + trigger.length, 0) +
        matchedTriggers.length * 10;

      return { entry, score, matchCount: matchedTriggers.length };
    })
    .filter((match) => match !== null);

  if (scoredMatches.length === 0) return null;

  // Sort by score descending and return highest match
  scoredMatches.sort((a, b) => b!.score - a!.score);
  return scoredMatches[0]!.entry;
}
