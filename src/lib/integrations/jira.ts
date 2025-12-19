/**
 * Jira API Integration
 * Create issues with Atlassian Document Format
 */

export interface JiraConfig {
  baseUrl: string;
  email: string;
  apiToken: string;
  projectKey: string;
}

export interface JiraIssueFields {
  project: {
    key: string;
  };
  summary: string;
  description: {
    type: 'doc';
    version: 1;
    content: Array<{
      type: 'paragraph' | 'heading' | 'bulletList' | 'orderedList';
      content?: Array<{
        type: 'text' | 'hardBreak';
        text?: string;
        marks?: Array<{
          type: 'strong' | 'em' | 'code';
        }>;
      }>;
      attrs?: {
        level?: number;
      };
    }>;
  };
  issuetype: {
    name: string;
  };
  priority?: {
    name: 'Highest' | 'High' | 'Medium' | 'Low' | 'Lowest';
  };
  labels?: string[];
}

export interface JiraCreateIssueRequest {
  fields: JiraIssueFields;
}

export interface JiraCreateIssueResponse {
  id: string;
  key: string;
  self: string;
}

/**
 * Jira API Client
 */
export class JiraClient {
  private config: JiraConfig;
  private authHeader: string;

  constructor(config: JiraConfig) {
    this.config = config;
    // Create Basic Auth header
    const credentials = Buffer.from(`${config.email}:${config.apiToken}`).toString('base64');
    this.authHeader = `Basic ${credentials}`;
  }

  /**
   * Create Jira issue
   */
  async createIssue(request: JiraCreateIssueRequest): Promise<JiraCreateIssueResponse> {
    const response = await fetch(
      `${this.config.baseUrl}/rest/api/3/issue`,
      {
        method: 'POST',
        headers: {
          'Authorization': this.authHeader,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Jira create issue failed: ${error}`);
    }

    const data: JiraCreateIssueResponse = await response.json();

    return {
      ...data,
      self: `${this.config.baseUrl}/browse/${data.key}`,
    };
  }

  /**
   * Create issue from simple text description
   */
  async createIssueFromText(options: {
    summary: string;
    description: string;
    priority?: 'High' | 'Medium' | 'Low';
    issueType?: string;
    labels?: string[];
  }): Promise<JiraCreateIssueResponse> {
    const request: JiraCreateIssueRequest = {
      fields: {
        project: {
          key: this.config.projectKey,
        },
        summary: options.summary,
        description: this.textToAtlassianDoc(options.description),
        issuetype: {
          name: options.issueType || 'Task',
        },
        priority: options.priority ? {
          name: options.priority,
        } : undefined,
        labels: options.labels,
      },
    };

    return this.createIssue(request);
  }

  /**
   * Convert plain text to Atlassian Document Format
   */
  private textToAtlassianDoc(text: string): JiraIssueFields['description'] {
    // Split by double newlines for paragraphs
    const paragraphs = text.split(/\n\n+/);

    const content = paragraphs.map(para => ({
      type: 'paragraph' as const,
      content: [{
        type: 'text' as const,
        text: para.replace(/\n/g, ' '), // Single newlines become spaces
      }],
    }));

    return {
      type: 'doc',
      version: 1,
      content,
    };
  }

  /**
   * Create issue for Zoho ticket escalation
   */
  async createZohoEscalation(options: {
    title: string;
    description: string;
    zohoTicketId: string;
    zohoTicketUrl: string;
    priority: 'High' | 'Medium' | 'Low';
    customer?: string;
    company?: string;
  }): Promise<JiraCreateIssueResponse> {
    // Build comprehensive description
    const descriptionParts = [
      options.description,
      '',
      '--- Zoho Ticket Information ---',
      `Zoho Ticket ID: ${options.zohoTicketId}`,
      `Zoho Ticket URL: ${options.zohoTicketUrl}`,
    ];

    if (options.customer) {
      descriptionParts.push(`Customer: ${options.customer}`);
    }

    if (options.company) {
      descriptionParts.push(`Company: ${options.company}`);
    }

    const fullDescription = descriptionParts.join('\n');

    return this.createIssueFromText({
      summary: options.title,
      description: fullDescription,
      priority: options.priority,
      issueType: 'Task',
      labels: ['zoho-desk', 'auto-escalation'],
    });
  }
}

/**
 * Create Jira client from environment variables
 */
export function createJiraClient(): JiraClient | null {
  const baseUrl = process.env.JIRA_BASE_URL;
  const email = process.env.JIRA_EMAIL;
  const apiToken = process.env.JIRA_API_TOKEN;
  const projectKey = process.env.JIRA_PROJECT_KEY;

  if (!baseUrl || !email || !apiToken || !projectKey) {
    console.warn('[Jira] Configuration missing - Jira integration disabled');
    return null;
  }

  return new JiraClient({
    baseUrl,
    email,
    apiToken,
    projectKey,
  });
}

/**
 * Singleton instance
 */
let jiraClient: JiraClient | null | undefined;

export function getJiraClient(): JiraClient | null {
  if (jiraClient === undefined) {
    jiraClient = createJiraClient();
  }
  return jiraClient;
}
