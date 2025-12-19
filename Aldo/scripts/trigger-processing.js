/**
 * Manually trigger ticket processing for testing
 */

async function triggerProcessing(ticketId) {
  console.log(`\n🚀 Manually triggering AI processing for Ticket #${ticketId}...\n`);

  try {
    const response = await fetch('https://enterprise-ai-support-v14.vercel.app/api/zoho/process-ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ticketId: ticketId,
        eventType: 'Ticket_Add',
        payload: {
          id: ticketId,
          ticketNumber: ticketId,
          subject: 'Need help resetting my password',
          channel: 'EMAIL',
          priority: 'Medium',
          status: 'Open',
          contact: {
            email: 'test@example.com',
            lastName: 'Test User',
          },
          webUrl: `https://desk.zoho.com/support/ticket/${ticketId}`,
        },
        headers: {
          host: 'desk.zoho.com',
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Error:', error);
      return;
    }

    const result = await response.json();

    console.log('✅ Processing complete!\n');
    console.log('Status:', result.status);
    console.log('\n📊 Classification:');
    console.log('  Category:', result.classification?.primary_category);
    console.log('  Confidence:', Math.round((result.classification?.confidence || 0) * 100) + '%');
    console.log('  Auto-resolvable:', result.classification?.auto_resolvable);

    if (result.aiResponse) {
      console.log('\n💬 AI Response:');
      console.log('  ' + result.aiResponse.text.substring(0, 300) + '...');
    }

    if (result.jiraTicket) {
      console.log('\n🎫 Jira Ticket:', result.jiraTicket.key);
    }

    console.log('\n⏱️  Timeline:');
    result.timeline?.forEach((step) => {
      const icon = step.status === 'completed' ? '✅' : step.status === 'failed' ? '❌' : '⏳';
      console.log(`  ${icon} ${step.step.replace(/_/g, ' ')} ${step.duration ? `(${step.duration}ms)` : ''}`);
    });

    if (result.error) {
      console.log('\n❌ Error occurred:');
      console.log('  Step:', result.error.step);
      console.log('  Message:', result.error.message);
    }

  } catch (error) {
    console.error('\n❌ Request failed:', error.message);
  }
}

const ticketId = process.argv[2] || '107';
triggerProcessing(ticketId);
