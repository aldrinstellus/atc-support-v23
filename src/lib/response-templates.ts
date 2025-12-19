/**
 * Response Templates for Common Support Scenarios
 * Provides formatted, professional responses with rich content
 */

export interface ResponseTemplate {
  subject: string;
  htmlContent: string;
  plainTextFallback: string;
}

/**
 * Password Reset Help Template
 * Includes help article, video tutorial, and CTA button
 */
export function getPasswordResetTemplate(customerName?: string): ResponseTemplate {
  const name = customerName || 'there';

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
    .article { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .article h3 { color: #667eea; margin-top: 0; }
    .video-container { background: #000; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
    .video-link { color: #667eea; text-decoration: none; font-weight: 600; }
    .cta-button { display: inline-block; background: #667eea; color: white; padding: 15px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
    .cta-button:hover { background: #5568d3; }
    .steps { background: #fff; border-left: 4px solid #667eea; padding: 15px; margin: 15px 0; }
    .footer { color: #666; font-size: 14px; padding: 20px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">Password Reset Help</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">We're here to help you regain access to your account</p>
    </div>

    <div class="content">
      <p>Hi ${name},</p>

      <p>I understand you're having trouble with a password lock reset. Don't worry, we've got you covered! Below you'll find a comprehensive guide to help you reset your password successfully.</p>

      <div class="article">
        <h3>📚 How to Reset Your Password</h3>
        <p>Follow these simple steps to reset your password and regain access to your account:</p>

        <div class="steps">
          <strong>Step 1: Access the Reset Page</strong>
          <p>Click the button below to go to our secure password reset page.</p>
        </div>

        <div class="steps">
          <strong>Step 2: Enter Your Email</strong>
          <p>Enter the email address associated with your account. Make sure it's the same email you used to sign up.</p>
        </div>

        <div class="steps">
          <strong>Step 3: Check Your Email</strong>
          <p>You'll receive a password reset link in your email within 2-3 minutes. Check your spam folder if you don't see it in your inbox.</p>
        </div>

        <div class="steps">
          <strong>Step 4: Create New Password</strong>
          <p>Click the link in the email and create a strong password. Use a combination of uppercase, lowercase, numbers, and special characters.</p>
        </div>

        <div class="steps">
          <strong>Step 5: Login with New Password</strong>
          <p>Return to the login page and sign in with your new password. You're all set!</p>
        </div>
      </div>

      <div class="video-container">
        <p style="color: white; margin-bottom: 15px;">🎥 <strong>Watch Video Tutorial</strong></p>
        <p style="color: white; margin-bottom: 15px;">For a visual guide, watch this helpful tutorial:</p>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" class="video-link" target="_blank" style="color: #667eea; background: white; padding: 10px 20px; border-radius: 4px; display: inline-block;">
          ▶️ Watch Password Reset Tutorial
        </a>
        <p style="color: #999; font-size: 12px; margin-top: 10px;">Opens in YouTube</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://example.com/reset-password" class="cta-button">
          🔐 Reset Your Password Now
        </a>
        <p style="color: #666; font-size: 14px; margin-top: 10px;">This will take you to our secure reset page</p>
      </div>

      <div style="background: #fff3cd; border: 1px solid #ffc107; border-radius: 6px; padding: 15px; margin: 20px 0;">
        <p style="margin: 0; color: #856404;"><strong>💡 Pro Tips:</strong></p>
        <ul style="margin: 10px 0 0 0; color: #856404;">
          <li>Make sure your email address is spelled correctly</li>
          <li>Check your spam/junk folder for the reset email</li>
          <li>The reset link expires after 24 hours for security</li>
          <li>If you don't receive the email, try again or contact us</li>
        </ul>
      </div>

      <p>If you continue to experience issues after following these steps, please reply to this email and we'll have a specialist assist you right away.</p>

      <p>Best regards,<br>
      <strong>Support Team</strong></p>
    </div>

    <div class="footer">
      <p>This email was sent by our AI support assistant. If you need further help, a human agent is always ready to assist.</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const plainTextFallback = `
Hi ${name},

I understand you're having trouble with a password lock reset. Here's how to reset your password:

HOW TO RESET YOUR PASSWORD
===========================

Step 1: Access the Reset Page
Click here to go to our secure password reset page:
https://example.com/reset-password

Step 2: Enter Your Email
Enter the email address associated with your account.

Step 3: Check Your Email
You'll receive a password reset link in your email within 2-3 minutes.
Check your spam folder if you don't see it.

Step 4: Create New Password
Click the link and create a strong password with uppercase, lowercase, numbers, and special characters.

Step 5: Login with New Password
Return to the login page and sign in with your new password.

VIDEO TUTORIAL
==============
Watch this helpful tutorial: https://www.youtube.com/watch?v=dQw4w9WgXcQ

PRO TIPS:
- Make sure your email address is spelled correctly
- Check your spam/junk folder for the reset email
- The reset link expires after 24 hours for security
- If you don't receive the email, try again or contact us

If you continue to experience issues, please reply to this email and we'll have a specialist assist you.

Best regards,
Support Team
  `.trim();

  return {
    subject: 'Password Reset Help - Step-by-Step Guide',
    htmlContent,
    plainTextFallback,
  };
}

/**
 * Agent Assignment Notification Template
 * Sent when ticket is escalated to human agent
 */
export function getAgentAssignmentTemplate(customerName: string | undefined, agentName: string, ticketNumber: string): ResponseTemplate {
  const name = customerName || 'there';

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
    .agent-card { background: #f0f9ff; border: 2px solid #0284c7; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
    .agent-name { font-size: 24px; font-weight: 700; color: #0284c7; margin: 10px 0; }
    .badge { display: inline-block; background: #10b981; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">✅ Ticket Assigned to Specialist</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Your issue is now being handled by our expert team</p>
    </div>

    <div class="content">
      <p>Hi ${name},</p>

      <p>Thank you for your patience. We've reviewed your case and assigned it to one of our technical specialists who will help resolve your issue immediately.</p>

      <div class="agent-card">
        <span class="badge">ASSIGNED SPECIALIST</span>
        <div class="agent-name">${agentName}</div>
        <p style="color: #64748b; margin: 5px 0;">Senior Support Specialist</p>
        <p style="color: #64748b; font-size: 14px;">Ticket #${ticketNumber}</p>
      </div>

      <p><strong>${agentName}</strong> will review your issue and get back to you shortly. They have access to all the details of your case and will work to resolve it as quickly as possible.</p>

      <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0;">
        <p style="margin: 0; color: #065f46;"><strong>✨ What happens next:</strong></p>
        <ul style="margin: 10px 0 0 0; color: #065f46;">
          <li>${agentName} will review your complete ticket history</li>
          <li>You'll receive a personalized response within 2-4 hours</li>
          <li>They'll work with you until the issue is fully resolved</li>
        </ul>
      </div>

      <p>We appreciate your patience and are committed to resolving this for you.</p>

      <p>Best regards,<br>
      <strong>Support Team</strong></p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const plainTextFallback = `
Hi ${name},

TICKET ASSIGNED TO SPECIALIST
==============================

We've reviewed your case and assigned it to one of our technical specialists:

ASSIGNED TO: ${agentName}
TICKET #: ${ticketNumber}
ROLE: Senior Support Specialist

${agentName} will review your issue and get back to you shortly. They have access to all the details of your case and will work to resolve it as quickly as possible.

WHAT HAPPENS NEXT:
- ${agentName} will review your complete ticket history
- You'll receive a personalized response within 2-4 hours
- They'll work with you until the issue is fully resolved

We appreciate your patience and are committed to resolving this for you.

Best regards,
Support Team
  `.trim();

  return {
    subject: `Your Ticket #${ticketNumber} Has Been Assigned to ${agentName}`,
    htmlContent,
    plainTextFallback,
  };
}

/**
 * Detect if subject/content relates to password reset
 * IMPORTANT: Keep keywords in sync with workflow-engine.ts
 */
export function isPasswordResetIntent(subject: string, content: string): boolean {
  const keywords = [
    'password',
    'reset',
    'forgot password',
    'cant login',
    "can't login",
    'login issue',
    'forgot my password',
    'password recovery'
  ];

  const combined = `${subject} ${content}`.toLowerCase();

  return keywords.some(keyword => combined.includes(keyword));
}

// ========================================
// NEW SCENARIO TEMPLATES
// ========================================

/**
 * Account Unlock Template
 * Sent when account is automatically unlocked or requires IT intervention
 */
export function getAccountUnlockTemplate(customerName: string | undefined, unlockStatus: 'auto_unlocked' | 'escalated'): ResponseTemplate {
  const name = customerName || 'there';
  const isAutoUnlocked = unlockStatus === 'auto_unlocked';

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, ${isAutoUnlocked ? '#10b981 0%, #059669 100%' : '#f59e0b 0%, #d97706 100%'}); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
    .status-card { background: ${isAutoUnlocked ? '#ecfdf5' : '#fef3c7'}; border-left: 4px solid ${isAutoUnlocked ? '#10b981' : '#f59e0b'}; padding: 20px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">${isAutoUnlocked ? '✅ Account Unlocked Successfully' : '⚠️ Account Unlock in Progress'}</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      ${isAutoUnlocked ? `
        <p>Good news! We've successfully unlocked your account. You can now log in using your existing password.</p>
        <div class="status-card">
          <p style="margin: 0;"><strong>✅ Your account is now active</strong></p>
          <p style="margin: 10px 0 0 0;">You can log in immediately at: <a href="https://example.com/login">example.com/login</a></p>
        </div>
        <p><strong>To prevent future lockouts:</strong></p>
        <ul>
          <li>Ensure you're entering the correct password</li>
          <li>Check that Caps Lock is off</li>
          <li>Consider using a password manager</li>
        </ul>
      ` : `
        <p>We've received your account unlock request and our IT team is working on it right away.</p>
        <div class="status-card">
          <p style="margin: 0;"><strong>⏱️ Your request requires manual verification</strong></p>
          <p style="margin: 10px 0 0 0;">An IT specialist will unlock your account within 1-2 hours.</p>
        </div>
        <p>You'll receive a notification once your account is unlocked. In the meantime, if you need urgent access, please call our IT helpdesk at 1-800-IT-SUPPORT.</p>
      `}
      <p>Best regards,<br><strong>Support Team</strong></p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const plainTextFallback = isAutoUnlocked
    ? `Hi ${name},\n\nGood news! Your account has been unlocked. You can now log in at example.com/login.\n\nBest regards,\nSupport Team`
    : `Hi ${name},\n\nYour account unlock request is being processed by our IT team. You'll receive a notification within 1-2 hours.\n\nBest regards,\nSupport Team`;

  return {
    subject: isAutoUnlocked ? 'Account Unlocked - You Can Now Log In' : 'Account Unlock Request Received',
    htmlContent,
    plainTextFallback,
  };
}

/**
 * Access Request Template
 * Sent when access is provisioned or requires approval
 */
export function getAccessRequestTemplate(
  customerName: string | undefined,
  accessType: string,
  status: 'provisioned' | 'pending_approval'
): ResponseTemplate {
  const name = customerName || 'there';
  const isProvisioned = status === 'provisioned';

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, ${isProvisioned ? '#6366f1 0%, #4f46e5 100%' : '#8b5cf6 0%, #7c3aed 100%'}); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
    .access-card { background: ${isProvisioned ? '#ede9fe' : '#fef3c7'}; border: 2px solid ${isProvisioned ? '#6366f1' : '#f59e0b'}; border-radius: 8px; padding: 20px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">${isProvisioned ? '✅ Access Granted' : '⏳ Access Request Pending'}</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      ${isProvisioned ? `
        <p>Great news! We've granted you access to <strong>${accessType}</strong>.</p>
        <div class="access-card">
          <p style="margin: 0;"><strong>✅ Your access has been provisioned</strong></p>
          <p style="margin: 10px 0 0 0;">You can start using ${accessType} immediately.</p>
        </div>
        <p><strong>Getting Started:</strong></p>
        <ul>
          <li>Log in using your company credentials</li>
          <li>Check your email for any additional setup instructions</li>
          <li>Contact IT if you encounter any access issues</li>
        </ul>
      ` : `
        <p>We've received your request for access to <strong>${accessType}</strong>.</p>
        <div class="access-card">
          <p style="margin: 0;"><strong>⏳ Your request is awaiting manager approval</strong></p>
          <p style="margin: 10px 0 0 0;">You'll be notified once approved (typically within 24 hours).</p>
        </div>
      `}
      <p>Best regards,<br><strong>IT Support Team</strong></p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const plainTextFallback = isProvisioned
    ? `Hi ${name},\n\nAccess granted to ${accessType}! You can start using it immediately.\n\nBest regards,\nIT Support Team`
    : `Hi ${name},\n\nYour access request for ${accessType} is pending approval. You'll be notified within 24 hours.\n\nBest regards,\nIT Support Team`;

  return {
    subject: isProvisioned ? `Access Granted: ${accessType}` : `Access Request Received: ${accessType}`,
    htmlContent,
    plainTextFallback,
  };
}

/**
 * General Support Template with KB Article
 */
export function getGeneralSupportTemplate(customerName: string | undefined, kbArticleTitle: string, kbArticleUrl: string): ResponseTemplate {
  const name = customerName || 'there';

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
    .kb-card { background: #dbeafe; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; }
    .cta-button { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">📚 Support Article Found</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      <p>We found a helpful article that should answer your question:</p>
      <div class="kb-card">
        <h3 style="margin-top: 0; color: #1e40af;">📖 ${kbArticleTitle}</h3>
        <p style="margin-bottom: 15px;">This article provides step-by-step instructions to help you resolve your issue.</p>
        <a href="${kbArticleUrl}" class="cta-button">Read Full Article →</a>
      </div>
      <p>If this article doesn't fully answer your question, please reply to this email and a support specialist will assist you directly.</p>
      <p>Best regards,<br><strong>Support Team</strong></p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const plainTextFallback = `Hi ${name},\n\nWe found a helpful article: "${kbArticleTitle}"\n\nRead it here: ${kbArticleUrl}\n\nIf this doesn't answer your question, reply to this email.\n\nBest regards,\nSupport Team`;

  return {
    subject: `Support Article: ${kbArticleTitle}`,
    htmlContent,
    plainTextFallback,
  };
}

/**
 * Email Notification Issue Template
 */
export function getEmailNotificationTemplate(customerName: string | undefined, status: 'resolved' | 'escalated'): ResponseTemplate {
  const name = customerName || 'there';
  const isResolved = status === 'resolved';

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, ${isResolved ? '#10b981 0%, #059669 100%' : '#f59e0b 0%, #d97706 100%'}); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
    .status-card { background: ${isResolved ? '#ecfdf5' : '#fef3c7'}; border-left: 4px solid ${isResolved ? '#10b981' : '#f59e0b'}; padding: 20px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">${isResolved ? '✅ Email Notifications Fixed' : '⚙️ DevOps Team Notified'}</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      ${isResolved ? `
        <p>We've identified and resolved the email notification issue.</p>
        <div class="status-card">
          <p style="margin: 0;"><strong>✅ Your email notifications are now working</strong></p>
          <p style="margin: 10px 0 0 0;">You should start receiving notifications immediately.</p>
        </div>
        <p>Please let us know if you still don't receive expected notifications.</p>
      ` : `
        <p>We've detected a system-level issue with email notifications and have alerted our DevOps team.</p>
        <div class="status-card">
          <p style="margin: 0;"><strong>⚙️ Our technical team is investigating</strong></p>
          <p style="margin: 10px 0 0 0;">We'll update you as soon as the issue is resolved.</p>
        </div>
      `}
      <p>Best regards,<br><strong>Technical Support</strong></p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const plainTextFallback = isResolved
    ? `Hi ${name},\n\nEmail notifications have been fixed! You should start receiving them immediately.\n\nBest regards,\nTechnical Support`
    : `Hi ${name},\n\nWe've alerted our DevOps team about the email notification issue. We'll update you soon.\n\nBest regards,\nTechnical Support`;

  return {
    subject: isResolved ? 'Email Notifications Restored' : 'Email Notification Issue - Technical Team Investigating',
    htmlContent,
    plainTextFallback,
  };
}

/**
 * Printer Issue Template
 */
export function getPrinterIssueTemplate(customerName: string | undefined): ResponseTemplate {
  const name = customerName || 'there';

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
    .steps { background: #e0f2fe; border-left: 4px solid #06b6d4; padding: 15px; margin: 15px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">🖨️ Printer Troubleshooting Guide</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      <p>Let's get your printer working again! Follow these troubleshooting steps:</p>

      <div class="steps">
        <strong>Step 1: Check Connections</strong>
        <p>• Ensure printer is powered on<br>• Check USB/network cable is connected<br>• Verify printer shows as "Ready"</p>
      </div>

      <div class="steps">
        <strong>Step 2: Check Print Queue</strong>
        <p>• Open "Printers & Scanners"<br>• Cancel any stuck print jobs<br>• Try printing again</p>
      </div>

      <div class="steps">
        <strong>Step 3: Restart Everything</strong>
        <p>• Turn off printer for 30 seconds<br>• Restart your computer<br>• Turn printer back on</p>
      </div>

      <p>If these steps don't resolve the issue, reply to this email and we'll create an IT ticket for in-person support.</p>
      <p>Best regards,<br><strong>IT Support Team</strong></p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const plainTextFallback = `Hi ${name},\n\nPrinter Troubleshooting:\n1. Check connections and power\n2. Clear print queue\n3. Restart printer and computer\n\nStill not working? Reply for IT support.\n\nBest regards,\nIT Support Team`;

  return {
    subject: 'Printer Troubleshooting Guide',
    htmlContent,
    plainTextFallback,
  };
}

/**
 * Course Completion Template
 */
export function getCourseCompletionTemplate(
  customerName: string | undefined,
  courseName: string,
  status: 'auto_completed' | 'escalated'
): ResponseTemplate {
  const name = customerName || 'there';
  const isCompleted = status === 'auto_completed';

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, ${isCompleted ? '#10b981 0%, #059669 100%' : '#8b5cf6 0%, #7c3aed 100%'}); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
    .course-card { background: ${isCompleted ? '#ecfdf5' : '#f3e8ff'}; border: 2px solid ${isCompleted ? '#10b981' : '#8b5cf6'}; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">${isCompleted ? '🎓 Course Marked Complete!' : '📚 Course Completion Review'}</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      ${isCompleted ? `
        <p>Great news! We've successfully marked your course as complete.</p>
        <div class="course-card">
          <h3 style="margin-top: 0; color: #059669;">✅ ${courseName}</h3>
          <p style="color: #065f46; margin: 10px 0;">Status: <strong>COMPLETED</strong></p>
          <p style="font-size: 14px; color: #064e3b;">Your certificate will be available in the LMS within 24 hours.</p>
        </div>
        <p>You can view your certificate and completion status in your Learning Management System dashboard.</p>
      ` : `
        <p>We've received your request to mark "${courseName}" as complete.</p>
        <div class="course-card">
          <h3 style="margin-top: 0; color: #7c3aed;">📋 ${courseName}</h3>
          <p style="color: #6b21a8; margin: 10px 0;">Status: <strong>Under Review</strong></p>
          <p style="font-size: 14px; color: #581c87;">Our training team will verify your completion and update your record within 24 hours.</p>
        </div>
      `}
      <p>Best regards,<br><strong>Learning & Development Team</strong></p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const plainTextFallback = isCompleted
    ? `Hi ${name},\n\nCourse "${courseName}" has been marked complete! Your certificate will be available within 24 hours.\n\nBest regards,\nLearning & Development Team`
    : `Hi ${name},\n\nYour request for "${courseName}" completion is under review. We'll update your record within 24 hours.\n\nBest regards,\nLearning & Development Team`;

  return {
    subject: isCompleted ? `Course Complete: ${courseName}` : `Course Completion Review: ${courseName}`,
    htmlContent,
    plainTextFallback,
  };
}
