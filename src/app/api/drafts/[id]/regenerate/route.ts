// ============================================================================
// V23 ITSS - Regenerate Draft API
// POST /api/drafts/[id]/regenerate - Regenerate draft with new parameters
// PRD 1.5.2: Add internal note documenting action
// ============================================================================

import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { prisma } from '@/lib/prisma'
import type { DraftTone, DetailLevel } from '@/types/draft'
import { addInternalNote } from '@/lib/email-service'

type RouteParams = { params: Promise<{ id: string }> }

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const DEMO_MODE = process.env.DEMO_MODE === 'true'

export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params
    const body = await request.json()

    const {
      tone = 'friendly' as DraftTone,
      detailLevel = 'standard' as DetailLevel,
      additionalContext,
      focusAreas,
      regeneratedBy,
      regeneratedByName,
    } = body

    // Detail level instructions for AI
    const detailLevelInstructions: Record<DetailLevel, string> = {
      brief: 'Keep the response very concise (2-3 sentences max). Focus only on the essential action items.',
      standard: 'Provide a balanced response with clear explanation and steps. Use 1-2 short paragraphs.',
      detailed: 'Include thorough explanation with context, multiple steps, and helpful tips. Use 2-3 paragraphs.',
      comprehensive: 'Provide an exhaustive response covering all aspects, edge cases, and related information. Include examples and detailed instructions.',
    }

    // Find existing draft
    const existingDraft = await prisma.draft.findFirst({
      where: {
        OR: [
          { id },
          { draftId: id },
        ],
      },
      include: {
        versions: {
          orderBy: { version: 'desc' },
          take: 1,
        },
      },
    })

    if (!existingDraft) {
      return NextResponse.json(
        { success: false, error: 'Draft not found' },
        { status: 404 }
      )
    }

    // Can only regenerate drafts in review status
    if (!['PENDING_REVIEW', 'IN_REVIEW', 'REJECTED'].includes(existingDraft.status)) {
      return NextResponse.json(
        { success: false, error: `Cannot regenerate draft in ${existingDraft.status} status` },
        { status: 400 }
      )
    }

    let newDraftContent: string
    let newConfidenceScore: number = existingDraft.confidenceScore
    let promptTokens = 0
    let completionTokens = 0

    if (DEMO_MODE) {
      // Demo mode: generate variation based on tone and detail level
      const toneVariations: Record<DraftTone, Record<DetailLevel, string>> = {
        formal: {
          brief: `We have reviewed your inquiry. Please verify your credentials and clear browser cache. Contact us if issues persist.`,
          standard: `Thank you for contacting our support team regarding this matter.

We have reviewed your inquiry and recommend: 1) Verify account credentials, 2) Clear browser cache and cookies, 3) Try an incognito window.

Please contact us if you require further assistance.`,
          detailed: `Thank you for contacting our support team regarding this matter.

We have reviewed your inquiry and are committed to providing a resolution.

Based on the information provided, we recommend the following course of action:
1. First, please verify your account credentials are correct
2. If the issue persists, clear your browser cache and cookies
3. Attempt to access the system again using an incognito/private window

Should you require further assistance, please do not hesitate to contact us.

We appreciate your patience and understanding.`,
          comprehensive: `Thank you for contacting our support team regarding this matter.

We have thoroughly reviewed your inquiry and are committed to providing a comprehensive resolution.

Based on the information provided, we recommend the following systematic course of action:

**Step 1: Credential Verification**
- Ensure you are using the correct username format (email address vs. username)
- Verify there are no trailing spaces in your password
- Check that Caps Lock is not enabled

**Step 2: Browser Cache Reset**
- Navigate to Settings > Privacy > Clear browsing data
- Select "All time" for the time range
- Clear cookies, cached images, and files

**Step 3: Session Isolation Test**
- Open a private/incognito browser window
- Navigate directly to the portal URL
- Attempt authentication with verified credentials

**Step 4: Alternative Access Methods**
- If possible, try a different browser (Chrome, Firefox, Edge)
- Attempt access from a different network connection
- Test on a mobile device if available

Should these steps not resolve the issue, please provide your account email and the approximate time of your last successful login. This information will enable our technical team to investigate further.

We appreciate your patience and understanding. Our team is committed to ensuring your access is restored promptly.`,
        },
        friendly: {
          brief: `Try clearing your browser cache and using a private window. Let me know if that helps! 😊`,
          standard: `Thanks for reaching out! I totally understand how frustrating this can be.

Let me help you get this sorted: 1) Check your login details, 2) Clear browser cache, 3) Try a private window.

Here to help if you need more assistance! 😊`,
          detailed: `Thanks for reaching out! I totally understand how frustrating this can be.

Let me help you get this sorted out quickly! Here's what I suggest:
1. Double-check that you're using the right login details
2. Try clearing your browser cache (it works like magic sometimes!)
3. Give it another shot in a private/incognito window

If that doesn't do the trick, just let me know and I'll dig deeper into what's going on.

Here to help! 😊`,
          comprehensive: `Thanks for reaching out! I totally understand how frustrating this can be when you're trying to get things done.

Let me help you get this sorted out! Here's my step-by-step guide:

**First, let's double-check the basics:**
- Make sure you're using the right email/username
- Check that Caps Lock isn't on (happens to all of us!)
- No extra spaces before or after your password

**Next, let's clear out the browser cobwebs:**
- Go to your browser settings → Privacy → Clear browsing data
- Clear cookies and cache for the last 24 hours at minimum
- This works like magic for so many login issues!

**Still stuck? Let's try the incognito trick:**
- Open a private/incognito window (Ctrl+Shift+N in Chrome)
- Head directly to the login page
- Give it another go with your credentials

**Bonus tips if nothing's working:**
- Try a different browser just to rule out browser-specific issues
- If you're on VPN, try disconnecting temporarily
- Sometimes restarting your computer does wonders!

If none of these work, don't worry! Just reply back with the email you're using to log in, and I'll personally look into what's happening on our end.

Here to help until we get this sorted! 😊`,
        },
        technical: {
          brief: `Auth issue detected. Clear cache, verify credentials format, test in incognito. Provide browser version if persists.`,
          standard: `Issue Analysis: Authentication/session management issue detected.

Troubleshooting: 1) Verify credential format, 2) Clear cache and cookies for *.example.com, 3) Test in incognito mode.

If issue persists, provide browser version and network console output.`,
          detailed: `Issue Analysis:

Based on the reported symptoms, this appears to be related to authentication/session management.

Recommended troubleshooting steps:

1. Credential Verification
   - Confirm username format (email vs. username)
   - Verify no trailing whitespace in password field

2. Browser State Reset
   \`\`\`
   - Clear cache: Settings > Privacy > Clear browsing data
   - Clear cookies for domain: *.example.com
   - Disable browser extensions temporarily
   \`\`\`

3. Session Isolation Test
   - Open incognito/private window
   - Navigate directly to https://portal.example.com
   - Attempt authentication

If issue persists, please provide:
- Browser version (chrome://version)
- Network console output (F12 > Network > Failed requests)
- Timestamp of last successful login

This data will assist in root cause analysis.`,
          comprehensive: `Issue Analysis:

Based on the reported symptoms, this appears to be related to authentication/session management. Detailed diagnostic follows.

**Root Cause Possibilities:**
1. Stale session tokens in browser storage
2. Credential format mismatch (email vs. username)
3. Browser extension interference
4. Network/proxy blocking authentication endpoints
5. Account lockout due to failed attempts

**Systematic Troubleshooting Protocol:**

**1. Credential Verification**
\`\`\`
- Confirm username format (email vs. username)
- Verify no trailing/leading whitespace in password field
- Check for special character encoding issues
- Confirm account is not locked (check email for security notifications)
\`\`\`

**2. Browser State Reset**
\`\`\`bash
# Chrome
Settings > Privacy > Clear browsing data
- Cookies and site data: *.example.com
- Cached images and files: All
- Time range: All time

# Firefox
Options > Privacy > Clear Data
- Select both Cookies and Cache
\`\`\`

**3. Extension Isolation**
\`\`\`
- Disable all browser extensions temporarily
- Particularly: ad blockers, privacy extensions, VPN extensions
- Test authentication
- Re-enable extensions one by one to identify culprit
\`\`\`

**4. Session Isolation Test**
\`\`\`
1. Open incognito/private window (Ctrl+Shift+N / Cmd+Shift+N)
2. Navigate directly to https://portal.example.com
3. Attempt authentication
4. If successful → browser profile issue
5. If failed → proceed to network diagnostics
\`\`\`

**5. Network Diagnostics**
\`\`\`
1. Open Developer Tools (F12)
2. Go to Network tab
3. Enable "Preserve log"
4. Attempt login
5. Look for:
   - Failed requests (red entries)
   - 401/403 status codes
   - CORS errors in console
\`\`\`

**If Issue Persists, Please Provide:**
- Browser version: \`chrome://version\` or \`about:support\`
- Full network console output (HAR file export preferred)
- Exact error message displayed
- Timestamp of last successful login
- Whether issue occurs on other devices/networks

This diagnostic data will enable root cause analysis and expedited resolution.`,
        },
      }

      const validTone = (tone as DraftTone) in toneVariations ? (tone as DraftTone) : 'friendly'
      const validDetailLevel = (detailLevel as DetailLevel) in toneVariations[validTone] ? (detailLevel as DetailLevel) : 'standard'
      newDraftContent = toneVariations[validTone][validDetailLevel]
      newConfidenceScore = 82 + Math.random() * 10 // 82-92 for regenerated

    } else {
      // Real Claude API call
      const systemPrompt = `You are an expert IT support agent. Regenerate a response draft with the following parameters:

TONE: ${tone.toUpperCase()}
DETAIL LEVEL: ${detailLevel.toUpperCase()}
${detailLevelInstructions[detailLevel as DetailLevel]}
${additionalContext ? `ADDITIONAL CONTEXT: ${additionalContext}` : ''}
${focusAreas?.length ? `FOCUS AREAS: ${focusAreas.join(', ')}` : ''}

Generate a complete, professional response. Do not include greetings or signatures - just the response content.`

      const userPrompt = `Original ticket:
Subject: ${existingDraft.ticketSubject}
Customer: ${existingDraft.customerName || 'Unknown'}

Original message:
${existingDraft.originalContent}

Previous draft (for reference):
${existingDraft.draftContent}

Please generate a new response with the ${tone} tone and ${detailLevel} detail level.`

      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      })

      const textContent = response.content.find(c => c.type === 'text')
      newDraftContent = textContent?.type === 'text' ? textContent.text : existingDraft.draftContent
      promptTokens = response.usage.input_tokens
      completionTokens = response.usage.output_tokens
      newConfidenceScore = 80 // Regenerated drafts start at 80 confidence
    }

    // Create new version
    const latestVersion = existingDraft.versions[0]?.version || 0
    const previousContent = existingDraft.draftContent
    const editDistance = Math.abs(newDraftContent.length - previousContent.length)
    const changePercent = previousContent.length > 0
      ? (editDistance / previousContent.length) * 100
      : 100

    await prisma.draftVersion.create({
      data: {
        draftId: existingDraft.id,
        version: latestVersion + 1,
        content: newDraftContent,
        editedBy: regeneratedBy || 'AI',
        editedByName: regeneratedByName || 'AI Assistant',
        editType: tone !== existingDraft.tone ? 'TONE_CHANGE' : 'REGENERATE',
        editSummary: `Regenerated with ${tone} tone, ${detailLevel} detail`,
        editDistance,
        changePercent,
        confidenceScore: newConfidenceScore,
        tone,
      },
    })

    // Update draft
    const _updatedDraft = await prisma.draft.update({
      where: { id: existingDraft.id },
      data: {
        draftContent: newDraftContent,
        tone,
        confidenceScore: newConfidenceScore,
        status: 'PENDING_REVIEW',
        promptTokens: existingDraft.promptTokens
          ? existingDraft.promptTokens + promptTokens
          : promptTokens,
        completionTokens: existingDraft.completionTokens
          ? existingDraft.completionTokens + completionTokens
          : completionTokens,
      },
    })

    // Fetch complete draft
    const completeDraft = await prisma.draft.findUnique({
      where: { id: existingDraft.id },
      include: { versions: { orderBy: { version: 'desc' } } },
    })

    // PRD 1.5.2: Add internal note documenting the regeneration
    try {
      await addInternalNote({
        ticketId: existingDraft.ticketId,
        agentId: regeneratedBy || 'system',
        agentName: regeneratedByName || 'AI Assistant',
        action: 'DRAFT_REGENERATED',
        details: {
          draftId: existingDraft.draftId,
          tone,
          detailLevel,
          confidenceScore: newConfidenceScore,
        },
      })
    } catch (noteError) {
      console.error('[Draft Regenerate] Failed to add internal note:', noteError)
    }

    return NextResponse.json({
      success: true,
      message: 'Draft regenerated successfully',
      draft: completeDraft,
    })
  } catch (error) {
    console.error('[Draft Regenerate] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to regenerate draft' },
      { status: 500 }
    )
  }
}
