/**
 * Knowledge Base Types
 * PRD 1.1.2: KB Search API & Pattern Matching
 *
 * Types for knowledge base articles, search, and pattern matching.
 */

// ============================================================================
// Article Types
// ============================================================================

export interface KBArticle {
  id: string;
  title: string;
  content: string;
  category: KBCategory;
  tags: string[];
  author: string;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  rating: number;
  ratingCount: number;
  status: 'draft' | 'published' | 'archived';
  version: number;
  relatedArticleIds: string[];
  // Searchable metadata
  excerpt: string;
  keywords: string[];
  // For pattern matching
  patterns: KBPattern[];
}

export type KBCategory =
  | 'GETTING_STARTED'
  | 'ACCOUNT_MANAGEMENT'
  | 'BILLING_PAYMENTS'
  | 'TECHNICAL_SUPPORT'
  | 'PRODUCT_FEATURES'
  | 'TROUBLESHOOTING'
  | 'POLICIES'
  | 'INTEGRATIONS'
  | 'SECURITY'
  | 'FAQ'
  | 'OTHER';

export const KB_CATEGORY_LABELS: Record<KBCategory, string> = {
  GETTING_STARTED: 'Getting Started',
  ACCOUNT_MANAGEMENT: 'Account Management',
  BILLING_PAYMENTS: 'Billing & Payments',
  TECHNICAL_SUPPORT: 'Technical Support',
  PRODUCT_FEATURES: 'Product Features',
  TROUBLESHOOTING: 'Troubleshooting',
  POLICIES: 'Policies',
  INTEGRATIONS: 'Integrations',
  SECURITY: 'Security',
  FAQ: 'FAQ',
  OTHER: 'Other',
};

// ============================================================================
// Pattern Types
// ============================================================================

export interface KBPattern {
  id: string;
  pattern: string; // regex pattern or keyword phrase
  type: PatternType;
  weight: number; // 0-1, how much this pattern influences relevance
  context?: string; // additional context about when this pattern applies
}

export type PatternType =
  | 'KEYWORD' // Simple keyword match
  | 'PHRASE' // Exact phrase match
  | 'REGEX' // Regular expression
  | 'SYNONYM' // Synonym group
  | 'INTENT' // User intent pattern
  | 'PRODUCT' // Product name/feature
  | 'ERROR_CODE' // Error code pattern
  | 'QUESTION'; // Question pattern

// ============================================================================
// Search Types
// ============================================================================

export interface KBSearchRequest {
  query: string;
  category?: KBCategory;
  tags?: string[];
  limit?: number;
  offset?: number;
  ticketContext?: {
    category?: string;
    priority?: string;
    sentiment?: string;
  };
}

export interface KBSearchResult {
  article: KBArticle;
  relevanceScore: number; // 0-100
  matchedPatterns: MatchedPattern[];
  highlightedExcerpt: string;
}

export interface MatchedPattern {
  pattern: KBPattern;
  matchLocation: 'title' | 'content' | 'tags' | 'keywords';
  matchText: string;
}

export interface KBSearchResponse {
  success: boolean;
  query: string;
  totalResults: number;
  results: KBSearchResult[];
  suggestedArticles: KBArticle[];
  relatedSearches: string[];
  aiSuggestion?: string;
  searchTime: number; // milliseconds
  error?: string;
}

// ============================================================================
// Ticket Pattern Matching
// ============================================================================

export interface TicketPatternMatch {
  ticketId: string;
  articleId: string;
  matchScore: number;
  matchedPatterns: MatchedPattern[];
  suggestedAction: 'SEND_ARTICLE' | 'USE_AS_REFERENCE' | 'ESCALATE';
  confidence: number;
}

export interface PatternMatchRequest {
  ticketSubject: string;
  ticketDescription: string;
  ticketCategory?: string;
  customerTier?: string;
}

export interface PatternMatchResponse {
  success: boolean;
  matches: TicketPatternMatch[];
  topArticle?: KBArticle;
  processingTime: number;
  error?: string;
}

// ============================================================================
// Analytics Types
// ============================================================================

export interface KBAnalytics {
  totalArticles: number;
  totalSearches: number;
  avgSearchTime: number;
  topSearchQueries: Array<{
    query: string;
    count: number;
    avgResultsReturned: number;
  }>;
  topViewedArticles: Array<{
    articleId: string;
    title: string;
    views: number;
  }>;
  searchSuccessRate: number; // % of searches with at least 1 result
  avgRelevanceScore: number;
  categoryDistribution: Record<KBCategory, number>;
}

// ============================================================================
// API Request/Response Types
// ============================================================================

export interface GetArticleRequest {
  articleId: string;
}

export interface GetArticleResponse {
  success: boolean;
  article?: KBArticle;
  relatedArticles?: KBArticle[];
  error?: string;
}

export interface CreateArticleRequest {
  title: string;
  content: string;
  category: KBCategory;
  tags: string[];
  keywords?: string[];
  patterns?: Omit<KBPattern, 'id'>[];
}

export interface CreateArticleResponse {
  success: boolean;
  article?: KBArticle;
  error?: string;
}

export interface UpdateArticleRequest {
  articleId: string;
  updates: Partial<Omit<KBArticle, 'id' | 'createdAt' | 'version'>>;
}

export interface UpdateArticleResponse {
  success: boolean;
  article?: KBArticle;
  error?: string;
}
