/**
 * Dify AI Knowledge Base Integration
 * Chat and retrieval API for knowledge base search
 */

export interface DifyConfig {
  kbId: string;
  apiKey: string;
  chatApiKey?: string;
  baseUrl?: string;
}

export interface DifyRetrievalRequest {
  query: string;
  retrieval_model: {
    search_method: 'keyword_search' | 'semantic_search' | 'full_text_search';
    reranking_enable: boolean;
    top_k: number;
    score_threshold_enabled: boolean;
    score_threshold?: number;
  };
}

export interface DifyRetrievalRecord {
  segment: {
    id: string;
    content: string;
    position: number;
    document_id: string;
    score: number;
  };
  score: number;
}

export interface DifyRetrievalResponse {
  query: {
    content: string;
  };
  records: DifyRetrievalRecord[];
}

export interface DifyChatRequest {
  inputs: Record<string, unknown>;
  query: string;
  response_mode: 'blocking' | 'streaming';
  conversation_id?: string;
  user: string;
}

export interface DifyChatResponse {
  id: string;
  answer: string;
  conversation_id: string;
  created_at: number;
  metadata?: {
    usage?: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  };
}

const DEFAULT_BASE_URL = 'https://api.dify.ai/v1';

/**
 * Dify AI Client
 */
export class DifyClient {
  private config: DifyConfig;

  constructor(config: DifyConfig) {
    this.config = {
      ...config,
      baseUrl: config.baseUrl || DEFAULT_BASE_URL,
    };
  }

  /**
   * Search knowledge base using retrieval API
   * Best for longer queries (>250 chars)
   */
  async retrieve(query: string, options: {
    searchMethod?: 'keyword_search' | 'semantic_search' | 'full_text_search';
    topK?: number;
    scoreThreshold?: number;
  } = {}): Promise<DifyRetrievalResponse> {
    const request: DifyRetrievalRequest = {
      query,
      retrieval_model: {
        search_method: options.searchMethod || 'keyword_search',
        reranking_enable: false,
        top_k: options.topK || 5,
        score_threshold_enabled: !!options.scoreThreshold,
        score_threshold: options.scoreThreshold,
      },
    };

    const response = await fetch(
      `${this.config.baseUrl}/datasets/${this.config.kbId}/retrieve`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Dify retrieval failed: ${error}`);
    }

    return response.json();
  }

  /**
   * Query knowledge base using chat API
   * Best for shorter queries (≤250 chars)
   */
  async chat(query: string, options: {
    conversationId?: string;
    user?: string;
  } = {}): Promise<DifyChatResponse> {
    if (!this.config.chatApiKey) {
      throw new Error('Dify chat API key not configured');
    }

    const request: DifyChatRequest = {
      inputs: {},
      query,
      response_mode: 'blocking',
      conversation_id: options.conversationId || '',
      user: options.user || 'zoho-integration',
    };

    const response = await fetch(
      `${this.config.baseUrl}/chat-messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.chatApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        signal: AbortSignal.timeout(45000), // 45 second timeout
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Dify chat failed: ${error}`);
    }

    return response.json();
  }

  /**
   * Aggregate retrieval results into context string
   */
  aggregateRetrievalResults(response: DifyRetrievalResponse): string {
    return response.records
      .map(record => record.segment.content)
      .join('\n\n---\n\n');
  }
}

/**
 * Create Dify client from environment variables
 */
export function createDifyClient(): DifyClient {
  const kbId = process.env.DIFY_KB_ID;
  const apiKey = process.env.DIFY_API_KEY;
  const chatApiKey = process.env.DIFY_CHAT_API_KEY;

  if (!kbId || !apiKey) {
    throw new Error(
      'Missing Dify configuration. Required env vars: DIFY_KB_ID, DIFY_API_KEY'
    );
  }

  return new DifyClient({
    kbId,
    apiKey,
    chatApiKey,
  });
}

/**
 * Singleton instance
 */
let difyClient: DifyClient | null = null;

export function getDifyClient(): DifyClient {
  if (!difyClient) {
    difyClient = createDifyClient();
  }
  return difyClient;
}

/**
 * Smart KB search - uses chat for short queries, retrieval for long ones
 * If Dify is not configured, returns a fallback message
 */
export async function smartKBSearch(query: string, characterThreshold = 250): Promise<{
  method: 'chat' | 'retrieval';
  answer?: string;
  context?: string;
  matches: number;
}> {
  // Check if Dify is configured
  if (!process.env.DIFY_KB_ID || !process.env.DIFY_API_KEY) {
    console.warn('[Dify] Not configured - returning fallback response');
    return {
      method: 'chat',
      answer: 'Knowledge base search is not currently configured. AI will generate a response based on general knowledge.',
      matches: 0,
    };
  }

  const client = getDifyClient();

  if (query.length <= characterThreshold) {
    // Short query - use chat API
    const response = await client.chat(query);
    return {
      method: 'chat',
      answer: response.answer,
      matches: 1,
    };
  } else {
    // Long query - use retrieval API
    const response = await client.retrieve(query);
    return {
      method: 'retrieval',
      context: client.aggregateRetrievalResults(response),
      matches: response.records.length,
    };
  }
}
