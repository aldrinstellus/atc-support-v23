/**
 * Conversation Aggregator
 * Consolidates email threads into AI-optimized queries
 * Based on n8n workflow logic
 */

import { cleanEmailContent } from './email-cleaner';

export interface ThreadMessage {
  id: string;
  content: string;
  authorType: 'AGENT' | 'CUSTOMER' | 'SYSTEM' | 'UNKNOWN';
  createdTime: string;
  channel?: string;
}

export interface AggregatedConversation {
  latestMessage: string;
  previousConversation: string;
  queryForKB: string;
  totalMessages: number;
  messagesByAuthor: {
    customer: number;
    agent: number;
    system: number;
  };
}

/**
 * Aggregate thread messages into formatted conversation string
 * Matches n8n "Aggregate the Content" node logic
 */
export function aggregateConversation(threads: ThreadMessage[]): AggregatedConversation {
  if (!threads || threads.length === 0) {
    return {
      latestMessage: '',
      previousConversation: 'EMPTY',
      queryForKB: 'latest message: , previous conversation: EMPTY',
      totalMessages: 0,
      messagesByAuthor: { customer: 0, agent: 0, system: 0 },
    };
  }

  // Process all threads and clean content
  const formattedMessages: string[] = [];
  const messagesByAuthor = {
    customer: 0,
    agent: 0,
    system: 0,
  };

  for (const thread of threads) {
    const cleanedContent = cleanEmailContent(thread.content || '');

    if (cleanedContent) {
      // Format as "AUTHOR_TYPE - content"
      formattedMessages.push(`${thread.authorType} - ${cleanedContent}`);

      // Count by author type
      const authorKey = thread.authorType.toLowerCase() as 'customer' | 'agent' | 'system';
      if (authorKey in messagesByAuthor) {
        messagesByAuthor[authorKey]++;
      }
    }
  }

  // Latest message is first (assuming threads are sorted by time desc)
  const latestMessage = formattedMessages[0] || '';

  // Previous conversations are all others
  const previousConversation = formattedMessages.length > 1
    ? formattedMessages.slice(1).join(', ')
    : 'EMPTY';

  // Create query for knowledge base
  const queryForKB = `LATEST MESSAGE: ${latestMessage}, PREVIOUS CONVERSATION: ${previousConversation}`;

  return {
    latestMessage,
    previousConversation,
    queryForKB,
    totalMessages: formattedMessages.length,
    messagesByAuthor,
  };
}

/**
 * Prepare optimized query for knowledge base search
 * Consolidates conversation into single-line technical summary
 */
export function prepareKBQuery(aggregated: AggregatedConversation): string {
  // If no previous conversation, return latest message as-is
  if (aggregated.previousConversation === 'EMPTY') {
    return aggregated.latestMessage.replace(/^[A-Z_]+ - /, ''); // Remove author prefix
  }

  // Otherwise, let AI consolidate (this happens in Claude tool)
  // For now, return the full query
  return aggregated.queryForKB;
}

/**
 * Extract conversation history for context
 * Returns array of messages with metadata
 */
export function extractConversationHistory(threads: ThreadMessage[]): Array<{
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}> {
  return threads.map(thread => {
    const cleanedContent = cleanEmailContent(thread.content);

    // Map author type to role
    let role: 'user' | 'assistant' | 'system' = 'user';
    if (thread.authorType === 'AGENT') {
      role = 'assistant';
    } else if (thread.authorType === 'SYSTEM') {
      role = 'system';
    }

    return {
      role,
      content: cleanedContent,
      timestamp: thread.createdTime,
    };
  });
}

/**
 * Consolidate conversation into AI-friendly format
 * Generates summary matching n8n "Query Preparation" logic
 */
export function consolidateForAI(aggregated: AggregatedConversation, options: {
  maxLength?: number;
  focusOnTechnical?: boolean;
} = {}): string {
  const { maxLength = 200 } = options;

  // Extract latest message without author prefix
  const latestClean = aggregated.latestMessage.replace(/^[A-Z_]+ - /, '');

  // If no history, return latest message
  if (aggregated.previousConversation === 'EMPTY') {
    return latestClean.substring(0, maxLength);
  }

  // Extract previous messages
  const previousMessages = aggregated.previousConversation.split(', ');

  // Build consolidated summary
  let summary = `Customer wants ${latestClean}.`;

  if (previousMessages.length > 0 && previousMessages[0] !== 'EMPTY') {
    // Extract key points from previous conversation
    const previousPoints = previousMessages
      .map(msg => msg.replace(/^[A-Z_]+ - /, ''))
      .slice(0, 3) // Limit to last 3 messages for context
      .join('. ');

    summary += ` Previously: ${previousPoints}`;
  }

  // Remove line breaks and extra whitespace
  summary = summary
    .replace(/\r?\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Truncate if needed
  if (summary.length > maxLength) {
    summary = summary.substring(0, maxLength - 3) + '...';
  }

  return summary;
}

/**
 * Detect if conversation indicates escalation is needed
 */
export function detectEscalationSignals(content: string): {
  hasSignals: boolean;
  signals: string[];
  confidence: number;
} {
  const escalationPhrases = [
    'need to work with the team',
    "i'll get back to you",
    "i'll check with",
    'let me check with',
    'check with our technical team',
    'check with the team',
    'requires further investigation',
    'need to escalate',
    'escalate this',
    'urgent',
    'asap',
    'not sure',
    "i'm not certain",
    'unable to resolve',
    "can't resolve",
    'beyond my capabilities',
  ];

  const lowerContent = content.toLowerCase();
  const foundSignals: string[] = [];

  for (const phrase of escalationPhrases) {
    if (lowerContent.includes(phrase)) {
      foundSignals.push(phrase);
    }
  }

  const confidence = Math.min(foundSignals.length / 3, 1); // 3+ signals = 100% confidence

  return {
    hasSignals: foundSignals.length > 0,
    signals: foundSignals,
    confidence,
  };
}

/**
 * Detect if a follow-up message indicates the previous solution didn't work
 * Used to trigger automatic escalation to human agent
 */
export function detectFailedResolution(threads: ThreadMessage[]): {
  needsHumanEscalation: boolean;
  reason: string;
  signals: string[];
} {
  // Need at least 2 messages to detect a follow-up
  if (!threads || threads.length < 2) {
    return {
      needsHumanEscalation: false,
      reason: 'No conversation history',
      signals: [],
    };
  }

  // Phrases indicating customer is still having issues
  const failureSignals = [
    'still unable',
    "still can't",
    "still cannot",
    'not working',
    "didn't work",
    "doesn't work",
    'still having',
    'still experiencing',
    'same issue',
    'same problem',
    'tried that',
    'already tried',
    "it's not",
    'no luck',
    "that won't work",
    "that doesn't help",
    'still broken',
    'still not',
    'continues to',
    "i'm still",
  ];

  // Get the most recent 3 messages
  const recentMessages = threads.slice(0, 3);

  // Check if there was a previous agent/system response
  const hasAgentResponse = recentMessages.some(
    msg => msg.authorType === 'AGENT' || msg.authorType === 'SYSTEM'
  );

  if (!hasAgentResponse) {
    return {
      needsHumanEscalation: false,
      reason: 'No previous agent response to fail',
      signals: [],
    };
  }

  // Check the latest message for failure signals
  const latestMessage = recentMessages[0];
  if (!latestMessage || latestMessage.authorType !== 'CUSTOMER') {
    return {
      needsHumanEscalation: false,
      reason: 'Latest message not from customer',
      signals: [],
    };
  }

  const lowerContent = latestMessage.content.toLowerCase();
  const foundSignals: string[] = [];

  for (const phrase of failureSignals) {
    if (lowerContent.includes(phrase)) {
      foundSignals.push(phrase);
    }
  }

  // If we found failure signals in a follow-up after an agent response, escalate
  const needsEscalation = foundSignals.length > 0;

  return {
    needsHumanEscalation: needsEscalation,
    reason: needsEscalation
      ? 'Customer indicates previous solution did not resolve the issue'
      : 'No failure signals detected',
    signals: foundSignals,
  };
}

/**
 * Calculate conversation metrics
 */
export function calculateMetrics(aggregated: AggregatedConversation): {
  totalMessages: number;
  customerMessages: number;
  agentMessages: number;
  responseRate: number;
  averageMessageLength: number;
} {
  const { totalMessages, messagesByAuthor, queryForKB } = aggregated;

  const responseRate = messagesByAuthor.customer > 0
    ? messagesByAuthor.agent / messagesByAuthor.customer
    : 0;

  const averageMessageLength = totalMessages > 0
    ? queryForKB.length / totalMessages
    : 0;

  return {
    totalMessages,
    customerMessages: messagesByAuthor.customer,
    agentMessages: messagesByAuthor.agent,
    responseRate,
    averageMessageLength,
  };
}
