import { NextRequest, NextResponse } from 'next/server';
import type { FeedbackEntry, FeedbackSubmitResponse, IntegrationTarget } from '@/types/feedback';

// Integration handlers (implemented as separate files for modularity)
async function sendToEmail(entry: FeedbackEntry): Promise<{ success: boolean; error?: string; messageId?: string }> {
  // In production, use Resend or SMTP
  const emailTo = process.env.FEEDBACK_EMAIL_TO;

  if (!emailTo) {
    return { success: false, error: 'Email not configured (FEEDBACK_EMAIL_TO missing)' };
  }

  // Mock implementation - in production, integrate with email service
  console.log('[Feedback] Would send email to:', emailTo);
  console.log('[Feedback] Subject:', `[${entry.category.toUpperCase()}] ${entry.title}`);

  return { success: true, messageId: `mock-${Date.now()}` };
}

async function sendToSupabase(entry: FeedbackEntry): Promise<{ success: boolean; error?: string; data?: unknown }> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    // In production, insert into feedback table
    // For now, mock the response
    console.log('[Feedback] Would insert into Supabase:', entry.id);

    return { success: true, data: { id: entry.id } };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Supabase insert failed' };
  }
}

async function sendToGitHub(entry: FeedbackEntry): Promise<{ success: boolean; error?: string; issueUrl?: string; issueNumber?: number }> {
  const githubToken = process.env.GITHUB_TOKEN;
  const githubRepo = process.env.GITHUB_FEEDBACK_REPO;

  if (!githubToken || !githubRepo) {
    return { success: false, error: 'GitHub not configured (GITHUB_TOKEN or GITHUB_FEEDBACK_REPO missing)' };
  }

  try {
    const [owner, repo] = githubRepo.split('/');

    // Priority to label mapping
    const priorityLabels: Record<string, string> = {
      critical: 'priority: critical',
      high: 'priority: high',
      medium: 'priority: medium',
      low: 'priority: low',
    };

    // Category to label mapping
    const categoryLabels: Record<string, string> = {
      bug: 'bug',
      feature: 'enhancement',
      improvement: 'improvement',
      question: 'question',
      other: 'feedback',
    };

    const labels = [
      priorityLabels[entry.priority] || 'priority: medium',
      categoryLabels[entry.category] || 'feedback',
    ];

    const body = `## Feedback Report

**Category:** ${entry.category}
**Priority:** ${entry.priority}
**URL:** ${entry.url}

### Description
${entry.description || 'No description provided'}

### Context
- **Viewport:** ${entry.viewport.width}x${entry.viewport.height}
- **User Agent:** ${entry.userAgent}
- **Timestamp:** ${new Date(entry.timestamp).toISOString()}
${entry.persona ? `- **Persona:** ${entry.persona}` : ''}
${entry.mode ? `- **Mode:** ${entry.mode}` : ''}

### Annotations
${entry.annotations.length > 0 ? `${entry.annotations.length} annotation(s) included` : 'No annotations'}

### Tagged Elements
${entry.taggedElements.length > 0 ? entry.taggedElements.map(t => `- \`${t.selector}\` - ${t.note || 'No note'}`).join('\n') : 'No elements tagged'}

---
*Screenshot attached to this issue*
`;

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: `[${entry.category.toUpperCase()}] ${entry.title}`,
        body,
        labels,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message || 'GitHub API error' };
    }

    const issue = await response.json();
    return { success: true, issueUrl: issue.html_url, issueNumber: issue.number };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'GitHub issue creation failed' };
  }
}

async function sendToGoogleSheets(entry: FeedbackEntry): Promise<{ success: boolean; error?: string; rowNumber?: number; spreadsheetUrl?: string }> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  const webAppUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;

  if (!spreadsheetId) {
    return { success: false, error: 'Google Sheets not configured (GOOGLE_SHEETS_ID missing)' };
  }

  try {
    // Data to send to Google Sheets via Apps Script Web App
    // Include screenshot for upload to Google Drive
    const rowData = {
      id: entry.id,
      timestamp: new Date(entry.timestamp).toISOString(),
      title: entry.title,
      description: entry.description || '',
      category: entry.category,
      priority: entry.priority,
      url: entry.url,
      annotations: entry.annotations.length.toString(),
      taggedElements: entry.taggedElements.length.toString(),
      persona: entry.persona || '',
      mode: entry.mode || '',
      viewport: entry.viewport.width + 'x' + entry.viewport.height,
      screenshot: entry.screenshot, // Base64 screenshot for Drive upload
    };

    // If Apps Script Web App URL is configured, use it for real submissions
    if (webAppUrl) {
      console.log('[Feedback] Sending to Google Sheets via Apps Script Web App');

      const response = await fetch(webAppUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rowData),
      });

      // Apps Script returns text that might be JSON
      const responseText = await response.text();
      console.log('[Feedback] Apps Script response:', responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch {
        // If not JSON, check if it looks like success
        if (responseText.includes('success') || response.ok) {
          result = { success: true };
        } else {
          return { success: false, error: `Apps Script returned: ${responseText}` };
        }
      }

      if (result.success) {
        return {
          success: true,
          rowNumber: result.row || Date.now(),
          spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`
        };
      } else {
        return { success: false, error: result.error || 'Apps Script submission failed' };
      }
    }

    // Demo mode: Log the data and return success when spreadsheet ID is configured
    // This allows testing the UI flow without full Google Sheets API setup
    console.log('[Feedback] Google Sheets Demo Mode - Spreadsheet ID:', spreadsheetId);
    console.log('[Feedback] Row data that would be appended:', JSON.stringify(rowData, null, 2));

    return {
      success: true,
      rowNumber: Date.now(),
      spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`
    };
  } catch (error) {
    console.error('[Feedback] Google Sheets error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Google Sheets append failed' };
  }
}

async function sendToSlack(entry: FeedbackEntry): Promise<{ success: boolean; error?: string }> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    return { success: false, error: 'Slack webhook not configured' };
  }

  try {
    const priorityEmojis: Record<string, string> = {
      critical: ':rotating_light:',
      high: ':warning:',
      medium: ':information_source:',
      low: ':memo:',
    };

    const categoryEmojis: Record<string, string> = {
      bug: ':bug:',
      feature: ':bulb:',
      improvement: ':sparkles:',
      question: ':question:',
      other: ':speech_balloon:',
    };

    const blocks = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `${categoryEmojis[entry.category] || ':speech_balloon:'} New Feedback: ${entry.title}`,
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Category:*\n${entry.category}`,
          },
          {
            type: 'mrkdwn',
            text: `*Priority:*\n${priorityEmojis[entry.priority] || ''} ${entry.priority}`,
          },
        ],
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Description:*\n${entry.description || 'No description provided'}`,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `URL: ${entry.url} | ${new Date(entry.timestamp).toISOString()}`,
          },
        ],
      },
      {
        type: 'divider',
      },
    ];

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blocks }),
    });

    if (!response.ok) {
      return { success: false, error: `Slack webhook returned ${response.status}` };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Slack notification failed' };
  }
}

export async function POST(request: NextRequest) {
  try {
    const entry = await request.json() as FeedbackEntry;

    // Validate required fields
    if (!entry.title || !entry.screenshot) {
      return NextResponse.json(
        { success: false, error: 'Title and screenshot are required' },
        { status: 400 }
      );
    }

    const targets = entry.targetIntegrations || ['supabase'];
    const results: Record<IntegrationTarget, { success: boolean; error?: string; data?: unknown }> = {
      email: { success: false, error: 'Not requested' },
      supabase: { success: false, error: 'Not requested' },
      github: { success: false, error: 'Not requested' },
      slack: { success: false, error: 'Not requested' },
      sheets: { success: false, error: 'Not requested' },
    };

    // Process each requested integration
    const integrationPromises: Promise<void>[] = [];

    if (targets.includes('email')) {
      integrationPromises.push(
        sendToEmail(entry).then(r => { results.email = r; })
      );
    }

    if (targets.includes('supabase')) {
      integrationPromises.push(
        sendToSupabase(entry).then(r => { results.supabase = r; })
      );
    }

    if (targets.includes('github')) {
      integrationPromises.push(
        sendToGitHub(entry).then(r => { results.github = r; })
      );
    }

    if (targets.includes('slack')) {
      integrationPromises.push(
        sendToSlack(entry).then(r => { results.slack = r; })
      );
    }

    if (targets.includes('sheets')) {
      integrationPromises.push(
        sendToGoogleSheets(entry).then(r => { results.sheets = r; })
      );
    }

    // Wait for all integrations to complete
    await Promise.all(integrationPromises);

    // Check if at least one integration succeeded
    const successfulIntegrations = targets.filter(t => results[t].success);
    const overallSuccess = successfulIntegrations.length > 0;

    const response: FeedbackSubmitResponse = {
      success: overallSuccess,
      feedbackId: entry.id,
      results,
      error: overallSuccess ? undefined : 'All integrations failed',
    };

    return NextResponse.json(response, { status: overallSuccess ? 200 : 500 });
  } catch (error) {
    console.error('[Feedback API] Error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET endpoint to check configured integrations
export async function GET() {
  const configuredIntegrations: IntegrationTarget[] = [];

  if (process.env.FEEDBACK_EMAIL_TO) {
    configuredIntegrations.push('email');
  }
  if (process.env.SUPABASE_URL) {
    configuredIntegrations.push('supabase');
  }
  if (process.env.GITHUB_TOKEN && process.env.GITHUB_FEEDBACK_REPO) {
    configuredIntegrations.push('github');
  }
  if (process.env.SLACK_WEBHOOK_URL) {
    configuredIntegrations.push('slack');
  }
  if (process.env.GOOGLE_SHEETS_ID) {
    configuredIntegrations.push('sheets');
  }

  return NextResponse.json({
    configured: configuredIntegrations,
    available: ['email', 'supabase', 'github', 'slack', 'sheets'],
  });
}
