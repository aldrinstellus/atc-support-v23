/**
 * Knowledge Base Search Library
 * PRD 1.1.2: KB Search API & Pattern Matching
 *
 * Provides full-text search, pattern matching, and relevance scoring
 * for knowledge base articles.
 */

import type {
  KBArticle,
  KBCategory,
  KBPattern,
  KBSearchRequest,
  KBSearchResult,
  KBSearchResponse,
  MatchedPattern,
  PatternMatchRequest,
  PatternMatchResponse,
  TicketPatternMatch,
} from '@/types/knowledge-base';

// ============================================================================
// Text Processing Utilities
// ============================================================================

/**
 * Normalize text for search (lowercase, remove special chars, etc.)
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Tokenize text into words
 */
export function tokenize(text: string): string[] {
  return normalizeText(text).split(' ').filter(Boolean);
}

/**
 * Calculate word frequency in text
 */
export function wordFrequency(text: string): Map<string, number> {
  const tokens = tokenize(text);
  const freq = new Map<string, number>();
  for (const token of tokens) {
    freq.set(token, (freq.get(token) || 0) + 1);
  }
  return freq;
}

/**
 * Calculate TF-IDF score for a term
 */
export function calculateTFIDF(
  term: string,
  documentFreq: Map<string, number>,
  totalDocs: number,
  documentTermCount: number
): number {
  const tf = (documentFreq.get(term) || 0) / Math.max(1, documentTermCount);
  const docCount = Math.max(1, totalDocs);
  const idf = Math.log(docCount / (1 + (documentFreq.get(term) || 0)));
  return tf * idf;
}

// ============================================================================
// Pattern Matching
// ============================================================================

/**
 * Check if text matches a pattern
 */
export function matchPattern(text: string, pattern: KBPattern): boolean {
  const normalizedText = normalizeText(text);

  switch (pattern.type) {
    case 'KEYWORD':
      return normalizedText.includes(normalizeText(pattern.pattern));

    case 'PHRASE':
      return normalizedText.includes(normalizeText(pattern.pattern));

    case 'REGEX':
      try {
        const regex = new RegExp(pattern.pattern, 'i');
        return regex.test(text);
      } catch {
        return false;
      }

    case 'SYNONYM':
      const synonyms = pattern.pattern.split('|').map((s) => s.trim().toLowerCase());
      return synonyms.some((syn) => normalizedText.includes(syn));

    case 'INTENT':
      // Intent patterns often start with question words
      const intentPatterns = pattern.pattern.split('|');
      return intentPatterns.some((p) => normalizedText.includes(normalizeText(p)));

    case 'PRODUCT':
      return normalizedText.includes(normalizeText(pattern.pattern));

    case 'ERROR_CODE':
      try {
        const errorRegex = new RegExp(pattern.pattern, 'i');
        return errorRegex.test(text);
      } catch {
        return normalizedText.includes(normalizeText(pattern.pattern));
      }

    case 'QUESTION':
      const questionWords = ['how', 'what', 'why', 'when', 'where', 'can', 'does', 'is', 'will'];
      const hasQuestionWord = questionWords.some((w) => normalizedText.startsWith(w));
      const matchesPattern = normalizedText.includes(normalizeText(pattern.pattern));
      return hasQuestionWord && matchesPattern;

    default:
      return false;
  }
}

/**
 * Find all pattern matches in text
 */
export function findPatternMatches(
  text: string,
  patterns: KBPattern[],
  location: 'title' | 'content' | 'tags' | 'keywords'
): MatchedPattern[] {
  const matches: MatchedPattern[] = [];

  for (const pattern of patterns) {
    if (matchPattern(text, pattern)) {
      matches.push({
        pattern,
        matchLocation: location,
        matchText: extractMatchText(text, pattern),
      });
    }
  }

  return matches;
}

/**
 * Extract the matched text portion
 */
function extractMatchText(text: string, pattern: KBPattern): string {
  const normalizedPattern = normalizeText(pattern.pattern);
  const normalizedText = normalizeText(text);
  const index = normalizedText.indexOf(normalizedPattern);

  if (index === -1) return pattern.pattern;

  // Get surrounding context (up to 50 chars on each side)
  const start = Math.max(0, index - 50);
  const end = Math.min(text.length, index + normalizedPattern.length + 50);

  let excerpt = text.slice(start, end);
  if (start > 0) excerpt = '...' + excerpt;
  if (end < text.length) excerpt = excerpt + '...';

  return excerpt;
}

// ============================================================================
// Relevance Scoring
// ============================================================================

/**
 * Calculate relevance score for an article given a search query
 */
export function calculateRelevanceScore(
  article: KBArticle,
  query: string,
  matchedPatterns: MatchedPattern[]
): number {
  let score = 0;

  const queryTokens = tokenize(query);
  const titleTokens = tokenize(article.title);
  const contentTokens = tokenize(article.content);
  const excerptTokens = tokenize(article.excerpt);

  // Title match (high weight)
  const titleMatches = queryTokens.filter((t) => titleTokens.includes(t)).length;
  score += (titleMatches / Math.max(1, queryTokens.length)) * 40;

  // Exact title match bonus
  if (normalizeText(article.title).includes(normalizeText(query))) {
    score += 20;
  }

  // Content match (medium weight)
  const contentMatches = queryTokens.filter((t) => contentTokens.includes(t)).length;
  score += (contentMatches / Math.max(1, queryTokens.length)) * 15;

  // Excerpt match (medium weight)
  const excerptMatches = queryTokens.filter((t) => excerptTokens.includes(t)).length;
  score += (excerptMatches / Math.max(1, queryTokens.length)) * 10;

  // Tag match (high weight)
  const tagMatches = article.tags.filter((tag) =>
    queryTokens.some((t) => normalizeText(tag).includes(t))
  ).length;
  score += tagMatches * 8;

  // Keyword match (medium weight)
  const keywordMatches = article.keywords.filter((kw) =>
    queryTokens.some((t) => normalizeText(kw).includes(t))
  ).length;
  score += keywordMatches * 5;

  // Pattern matches (based on pattern weight)
  for (const match of matchedPatterns) {
    score += match.pattern.weight * 15;
  }

  // Boost for highly rated articles
  score += (article.rating / 5) * 5;

  // Boost for recently updated articles
  const daysSinceUpdate = Math.floor(
    (Date.now() - new Date(article.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysSinceUpdate < 30) score += 3;
  if (daysSinceUpdate < 7) score += 2;

  // Cap at 100
  return Math.min(100, Math.round(score));
}

/**
 * Generate highlighted excerpt with matched terms
 */
export function generateHighlightedExcerpt(article: KBArticle, query: string): string {
  const queryTokens = tokenize(query);
  let excerpt = article.excerpt;

  // Find first occurrence of any query token
  for (const token of queryTokens) {
    const regex = new RegExp(`(${token})`, 'gi');
    excerpt = excerpt.replace(regex, '**$1**');
  }

  return excerpt;
}

// ============================================================================
// Search Implementation
// ============================================================================

/**
 * Search knowledge base articles
 */
export function searchKnowledgeBase(
  articles: KBArticle[],
  request: KBSearchRequest
): KBSearchResponse {
  const startTime = Date.now();

  // Filter by category if specified
  let filteredArticles = articles.filter((a) => a.status === 'published');
  if (request.category) {
    filteredArticles = filteredArticles.filter((a) => a.category === request.category);
  }

  // Filter by tags if specified
  if (request.tags && request.tags.length > 0) {
    filteredArticles = filteredArticles.filter((a) =>
      request.tags!.some((tag) => a.tags.includes(tag))
    );
  }

  // Score and rank articles
  const scoredResults: KBSearchResult[] = filteredArticles
    .map((article) => {
      // Find pattern matches
      const titleMatches = findPatternMatches(article.title, article.patterns, 'title');
      const contentMatches = findPatternMatches(article.content, article.patterns, 'content');
      const tagMatches = findPatternMatches(article.tags.join(' '), article.patterns, 'tags');
      const keywordMatches = findPatternMatches(
        article.keywords.join(' '),
        article.patterns,
        'keywords'
      );

      const allMatches = [...titleMatches, ...contentMatches, ...tagMatches, ...keywordMatches];

      // Also check query against patterns
      const queryMatches = article.patterns
        .filter((p) => matchPattern(request.query, p))
        .map((p) => ({
          pattern: p,
          matchLocation: 'content' as const,
          matchText: request.query,
        }));

      const matchedPatterns = [...allMatches, ...queryMatches];
      const relevanceScore = calculateRelevanceScore(article, request.query, matchedPatterns);
      const highlightedExcerpt = generateHighlightedExcerpt(article, request.query);

      return {
        article,
        relevanceScore,
        matchedPatterns,
        highlightedExcerpt,
      };
    })
    .filter((r) => r.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore);

  // Apply pagination
  const offset = request.offset || 0;
  const limit = request.limit || 10;
  const paginatedResults = scoredResults.slice(offset, offset + limit);

  // Generate related searches
  const relatedSearches = generateRelatedSearches(request.query, scoredResults);

  // Generate AI suggestion based on context
  const aiSuggestion = generateAISuggestion(request, paginatedResults);

  // Get suggested articles (high-rated, frequently viewed)
  const suggestedArticles = filteredArticles
    .filter((a) => !paginatedResults.some((r) => r.article.id === a.id))
    .sort((a, b) => b.views * b.rating - a.views * a.rating)
    .slice(0, 3);

  return {
    success: true,
    query: request.query,
    totalResults: scoredResults.length,
    results: paginatedResults,
    suggestedArticles,
    relatedSearches,
    aiSuggestion,
    searchTime: Date.now() - startTime,
  };
}

/**
 * Generate related search suggestions
 */
function generateRelatedSearches(query: string, results: KBSearchResult[]): string[] {
  const relatedTerms = new Set<string>();

  // Extract common tags from top results
  for (const result of results.slice(0, 5)) {
    for (const tag of result.article.tags) {
      if (!normalizeText(query).includes(normalizeText(tag))) {
        relatedTerms.add(tag);
      }
    }
  }

  // Add common search refinements
  const refinements = [
    `${query} troubleshooting`,
    `${query} setup`,
    `${query} guide`,
    `how to ${query}`,
  ];

  for (const ref of refinements) {
    if (ref.length < 50) {
      relatedTerms.add(ref);
    }
  }

  return Array.from(relatedTerms).slice(0, 5);
}

/**
 * Generate AI suggestion based on search context
 */
function generateAISuggestion(
  request: KBSearchRequest,
  results: KBSearchResult[]
): string | undefined {
  if (results.length === 0) {
    return `No articles found for "${request.query}". Try searching with different keywords or browse our categories.`;
  }

  const topResult = results[0];
  if (topResult.relevanceScore >= 80) {
    return `The article "${topResult.article.title}" appears to be a strong match for your search. It has a ${topResult.article.rating.toFixed(1)}/5 rating from users.`;
  }

  if (results.length > 3) {
    return `Found ${results.length} articles related to "${request.query}". The top results cover ${new Set(results.slice(0, 3).map((r) => r.article.category)).size} different categories.`;
  }

  return undefined;
}

// ============================================================================
// Ticket Pattern Matching
// ============================================================================

/**
 * Match ticket content against KB articles
 */
export function matchTicketToArticles(
  articles: KBArticle[],
  request: PatternMatchRequest
): PatternMatchResponse {
  const startTime = Date.now();

  const combinedText = `${request.ticketSubject} ${request.ticketDescription}`;
  const matches: TicketPatternMatch[] = [];

  for (const article of articles.filter((a) => a.status === 'published')) {
    const patternMatches: MatchedPattern[] = [];
    let totalWeight = 0;

    for (const pattern of article.patterns) {
      if (matchPattern(combinedText, pattern)) {
        patternMatches.push({
          pattern,
          matchLocation: 'content',
          matchText: extractMatchText(combinedText, pattern),
        });
        totalWeight += pattern.weight;
      }
    }

    // Also check for keyword matches
    const articleKeywords = [...article.keywords, ...article.tags];
    const queryTokens = tokenize(combinedText);

    const keywordMatchCount = articleKeywords.filter((kw) =>
      queryTokens.some((t) => normalizeText(kw).includes(t) || t.includes(normalizeText(kw)))
    ).length;

    if (patternMatches.length > 0 || keywordMatchCount >= 2) {
      const matchScore =
        Math.min(100, totalWeight * 50 + keywordMatchCount * 10 + patternMatches.length * 15);

      // Determine suggested action based on score and article type
      let suggestedAction: 'SEND_ARTICLE' | 'USE_AS_REFERENCE' | 'ESCALATE' = 'USE_AS_REFERENCE';
      if (matchScore >= 70 && article.category !== 'TROUBLESHOOTING') {
        suggestedAction = 'SEND_ARTICLE';
      } else if (matchScore < 30) {
        suggestedAction = 'ESCALATE';
      }

      // Calculate confidence
      const confidence = Math.min(
        1,
        (patternMatches.length * 0.3 + keywordMatchCount * 0.1 + (matchScore / 100) * 0.6)
      );

      matches.push({
        ticketId: '', // To be filled by caller
        articleId: article.id,
        matchScore,
        matchedPatterns: patternMatches,
        suggestedAction,
        confidence,
      });
    }
  }

  // Sort by match score
  matches.sort((a, b) => b.matchScore - a.matchScore);

  // Get top article
  const topArticle = matches.length > 0
    ? articles.find((a) => a.id === matches[0].articleId)
    : undefined;

  return {
    success: true,
    matches: matches.slice(0, 10),
    topArticle,
    processingTime: Date.now() - startTime,
  };
}

// ============================================================================
// In-Memory Storage (Demo)
// ============================================================================

let kbArticlesStore: KBArticle[] = [];

/**
 * Initialize KB with demo data
 */
export function initializeKBWithDemoData(): void {
  kbArticlesStore = getDemoArticles();
}

/**
 * Get all KB articles
 */
export function getKBArticles(): KBArticle[] {
  return [...kbArticlesStore];
}

/**
 * Get KB article by ID
 */
export function getKBArticleById(id: string): KBArticle | undefined {
  return kbArticlesStore.find((a) => a.id === id);
}

/**
 * Add KB article
 */
export function addKBArticle(article: KBArticle): void {
  kbArticlesStore.push(article);
}

/**
 * Update KB article
 */
export function updateKBArticle(id: string, updates: Partial<KBArticle>): KBArticle | undefined {
  const index = kbArticlesStore.findIndex((a) => a.id === id);
  if (index === -1) return undefined;

  kbArticlesStore[index] = {
    ...kbArticlesStore[index],
    ...updates,
    updatedAt: new Date(),
    version: kbArticlesStore[index].version + 1,
  };

  return kbArticlesStore[index];
}

// ============================================================================
// Demo Data
// ============================================================================

function getDemoArticles(): KBArticle[] {
  return [
    {
      id: 'KB-001',
      title: 'Password Reset Guide',
      content: `
# How to Reset Your Password

If you've forgotten your password or need to reset it for security reasons, follow these steps:

## Method 1: Self-Service Reset

1. Go to the login page
2. Click "Forgot Password"
3. Enter your email address
4. Check your email for the reset link
5. Click the link and create a new password

## Method 2: Contact Support

If self-service isn't working:
- Email: support@example.com
- Phone: 1-800-SUPPORT
- Chat: Available 24/7

## Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one number
- At least one special character

## Troubleshooting

If you don't receive the reset email:
- Check your spam folder
- Verify you're using the correct email
- Wait 5 minutes and try again
      `,
      category: 'ACCOUNT_MANAGEMENT',
      tags: ['password', 'reset', 'login', 'security', 'account'],
      author: 'Support Team',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-11-01'),
      views: 15420,
      rating: 4.8,
      ratingCount: 342,
      status: 'published',
      version: 5,
      relatedArticleIds: ['KB-002', 'KB-010'],
      excerpt:
        'Learn how to reset your password using self-service or by contacting support. Includes password requirements and troubleshooting tips.',
      keywords: ['password reset', 'forgot password', 'login issues', 'account recovery'],
      patterns: [
        { id: 'p1', pattern: 'password', type: 'KEYWORD', weight: 0.9 },
        { id: 'p2', pattern: 'reset|forgot|change', type: 'SYNONYM', weight: 0.8 },
        { id: 'p3', pattern: 'how to reset password', type: 'PHRASE', weight: 1.0 },
        { id: 'p4', pattern: 'cant login|cannot login|unable to login', type: 'INTENT', weight: 0.7 },
        { id: 'p5', pattern: 'locked out', type: 'KEYWORD', weight: 0.8 },
      ],
    },
    {
      id: 'KB-002',
      title: 'Two-Factor Authentication Setup',
      content: `
# Setting Up Two-Factor Authentication (2FA)

Enhance your account security with two-factor authentication.

## What is 2FA?

Two-factor authentication adds an extra layer of security by requiring:
1. Something you know (password)
2. Something you have (phone/authenticator)

## Setup Steps

### Option 1: Authenticator App (Recommended)

1. Download an authenticator app (Google Authenticator, Authy, etc.)
2. Go to Settings > Security > Two-Factor Authentication
3. Click "Enable 2FA"
4. Scan the QR code with your app
5. Enter the 6-digit code to verify
6. Save your backup codes

### Option 2: SMS Verification

1. Go to Settings > Security > Two-Factor Authentication
2. Select "SMS Verification"
3. Enter your phone number
4. Enter the verification code sent to you
5. Save your backup codes

## Important Notes

- Keep backup codes in a safe place
- Don't share your codes with anyone
- If you lose access, contact support
      `,
      category: 'SECURITY',
      tags: ['2fa', 'security', 'authentication', 'mfa', 'setup'],
      author: 'Security Team',
      createdAt: new Date('2024-02-20'),
      updatedAt: new Date('2024-10-15'),
      views: 8932,
      rating: 4.6,
      ratingCount: 189,
      status: 'published',
      version: 3,
      relatedArticleIds: ['KB-001', 'KB-003'],
      excerpt:
        'Learn how to set up two-factor authentication to protect your account. Supports authenticator apps and SMS verification.',
      keywords: ['2fa', 'two factor', 'authentication', 'security setup', 'mfa'],
      patterns: [
        { id: 'p1', pattern: '2fa|two-factor|two factor', type: 'SYNONYM', weight: 0.9 },
        { id: 'p2', pattern: 'authenticator', type: 'KEYWORD', weight: 0.8 },
        { id: 'p3', pattern: 'setup security', type: 'PHRASE', weight: 0.7 },
        { id: 'p4', pattern: 'how to enable 2fa', type: 'INTENT', weight: 1.0 },
      ],
    },
    {
      id: 'KB-003',
      title: 'Billing and Payment FAQ',
      content: `
# Billing and Payment Frequently Asked Questions

## Payment Methods

### What payment methods do you accept?
- Credit cards (Visa, MasterCard, American Express)
- PayPal
- Bank transfer (enterprise only)
- Purchase orders (enterprise only)

### How do I update my payment method?
1. Go to Settings > Billing
2. Click "Payment Methods"
3. Add or edit your payment information
4. Click Save

## Invoices

### Where can I find my invoices?
Go to Settings > Billing > Invoice History

### How do I get a receipt?
Receipts are automatically emailed after each payment. You can also download them from Invoice History.

## Refunds

### What is your refund policy?
- Monthly plans: Prorated refund within 14 days
- Annual plans: Full refund within 30 days
- No refunds after these periods

### How long do refunds take?
- Credit card: 5-10 business days
- PayPal: 3-5 business days
- Bank transfer: 10-15 business days
      `,
      category: 'BILLING_PAYMENTS',
      tags: ['billing', 'payment', 'invoice', 'refund', 'subscription'],
      author: 'Billing Team',
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date('2024-11-20'),
      views: 12453,
      rating: 4.5,
      ratingCount: 276,
      status: 'published',
      version: 4,
      relatedArticleIds: ['KB-004', 'KB-005'],
      excerpt:
        'Common questions about billing, payment methods, invoices, and refunds. Learn how to manage your subscription.',
      keywords: ['billing', 'payment', 'invoice', 'refund', 'credit card', 'subscription'],
      patterns: [
        { id: 'p1', pattern: 'billing|payment|invoice', type: 'SYNONYM', weight: 0.9 },
        { id: 'p2', pattern: 'refund', type: 'KEYWORD', weight: 0.9 },
        { id: 'p3', pattern: 'charged|charge', type: 'KEYWORD', weight: 0.8 },
        { id: 'p4', pattern: 'how to pay', type: 'INTENT', weight: 0.7 },
        { id: 'p5', pattern: 'update payment', type: 'PHRASE', weight: 0.8 },
      ],
    },
    {
      id: 'KB-004',
      title: 'Getting Started Guide',
      content: `
# Getting Started with Our Platform

Welcome! This guide will help you get up and running quickly.

## Step 1: Create Your Account

1. Visit our website and click "Sign Up"
2. Enter your email and create a password
3. Verify your email address
4. Complete your profile

## Step 2: Set Up Your Workspace

1. Name your workspace
2. Invite team members (optional)
3. Choose your preferences
4. Connect integrations

## Step 3: Create Your First Project

1. Click "New Project"
2. Choose a template or start blank
3. Add tasks and deadlines
4. Assign team members

## Step 4: Explore Features

- **Dashboard**: Overview of all activities
- **Reports**: Track progress and metrics
- **Notifications**: Stay updated in real-time
- **Integrations**: Connect your favorite tools

## Need Help?

- Check our documentation
- Watch tutorial videos
- Contact support
- Join our community forum
      `,
      category: 'GETTING_STARTED',
      tags: ['getting started', 'onboarding', 'setup', 'tutorial', 'beginner'],
      author: 'Product Team',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-12-01'),
      views: 25678,
      rating: 4.9,
      ratingCount: 567,
      status: 'published',
      version: 8,
      relatedArticleIds: ['KB-006', 'KB-007'],
      excerpt:
        'Quick start guide for new users. Learn how to create an account, set up your workspace, and create your first project.',
      keywords: ['getting started', 'onboarding', 'new user', 'setup guide', 'tutorial'],
      patterns: [
        { id: 'p1', pattern: 'getting started|get started', type: 'PHRASE', weight: 1.0 },
        { id: 'p2', pattern: 'new user|beginner', type: 'SYNONYM', weight: 0.8 },
        { id: 'p3', pattern: 'how to start', type: 'INTENT', weight: 0.9 },
        { id: 'p4', pattern: 'onboarding', type: 'KEYWORD', weight: 0.7 },
      ],
    },
    {
      id: 'KB-005',
      title: 'Error Code Reference',
      content: `
# Error Code Reference Guide

This guide explains common error codes and how to resolve them.

## Authentication Errors (1xxx)

### ERR-1001: Invalid Credentials
**Cause**: Incorrect email or password
**Solution**:
- Check your email spelling
- Reset your password if forgotten
- Ensure caps lock is off

### ERR-1002: Session Expired
**Cause**: Your session has timed out
**Solution**: Log in again

### ERR-1003: Account Locked
**Cause**: Too many failed login attempts
**Solution**: Wait 30 minutes or contact support

## API Errors (2xxx)

### ERR-2001: Rate Limit Exceeded
**Cause**: Too many API requests
**Solution**: Implement exponential backoff

### ERR-2002: Invalid API Key
**Cause**: Missing or incorrect API key
**Solution**: Check your API key in settings

### ERR-2003: Insufficient Permissions
**Cause**: Your API key lacks required permissions
**Solution**: Update API key permissions

## Server Errors (5xxx)

### ERR-5001: Internal Server Error
**Cause**: Unexpected server issue
**Solution**: Wait and retry, contact support if persistent

### ERR-5002: Service Unavailable
**Cause**: System maintenance or overload
**Solution**: Check status page, retry later
      `,
      category: 'TROUBLESHOOTING',
      tags: ['error', 'troubleshooting', 'error code', 'debug', 'api'],
      author: 'Engineering Team',
      createdAt: new Date('2024-04-15'),
      updatedAt: new Date('2024-11-10'),
      views: 9876,
      rating: 4.4,
      ratingCount: 198,
      status: 'published',
      version: 6,
      relatedArticleIds: ['KB-001', 'KB-006'],
      excerpt:
        'Complete reference for error codes. Includes authentication, API, and server errors with solutions.',
      keywords: ['error code', 'troubleshooting', 'error message', 'debug', 'fix'],
      patterns: [
        { id: 'p1', pattern: 'ERR-\\d{4}', type: 'REGEX', weight: 1.0 },
        { id: 'p2', pattern: 'error|error code|error message', type: 'SYNONYM', weight: 0.9 },
        { id: 'p3', pattern: 'not working', type: 'KEYWORD', weight: 0.7 },
        { id: 'p4', pattern: 'failed|failure', type: 'SYNONYM', weight: 0.8 },
      ],
    },
    {
      id: 'KB-006',
      title: 'Integration Setup Guide',
      content: `
# Integration Setup Guide

Connect your favorite tools to enhance your workflow.

## Available Integrations

### Slack
Connect Slack to receive notifications and updates.

**Setup:**
1. Go to Settings > Integrations
2. Click "Connect Slack"
3. Authorize the app in Slack
4. Choose notification preferences

### Jira
Sync your projects with Jira for seamless tracking.

**Setup:**
1. Go to Settings > Integrations
2. Click "Connect Jira"
3. Enter your Jira URL and credentials
4. Map projects to sync

### Google Workspace
Connect Google Calendar, Drive, and more.

**Setup:**
1. Go to Settings > Integrations
2. Click "Connect Google"
3. Sign in with Google
4. Select services to enable

### Salesforce
Sync customer data with Salesforce CRM.

**Setup:**
1. Go to Settings > Integrations
2. Click "Connect Salesforce"
3. Log in to Salesforce
4. Configure field mappings

## Troubleshooting

- **Connection failed**: Check credentials
- **Sync issues**: Verify permissions
- **Missing data**: Check field mappings
      `,
      category: 'INTEGRATIONS',
      tags: ['integration', 'slack', 'jira', 'google', 'salesforce', 'setup'],
      author: 'Integration Team',
      createdAt: new Date('2024-05-01'),
      updatedAt: new Date('2024-10-20'),
      views: 7654,
      rating: 4.3,
      ratingCount: 156,
      status: 'published',
      version: 4,
      relatedArticleIds: ['KB-004', 'KB-007'],
      excerpt:
        'Step-by-step guides for setting up integrations with Slack, Jira, Google Workspace, and Salesforce.',
      keywords: ['integration', 'connect', 'slack', 'jira', 'google', 'salesforce', 'sync'],
      patterns: [
        { id: 'p1', pattern: 'integration|integrate', type: 'SYNONYM', weight: 0.9 },
        { id: 'p2', pattern: 'slack|jira|google|salesforce', type: 'PRODUCT', weight: 0.8 },
        { id: 'p3', pattern: 'connect|setup', type: 'KEYWORD', weight: 0.7 },
        { id: 'p4', pattern: 'how to connect', type: 'INTENT', weight: 0.9 },
      ],
    },
  ];
}

// Initialize with demo data on module load
initializeKBWithDemoData();
