/**
 * Test Ticket Processing Logic
 *
 * This script manually triggers the ticket processing pipeline
 * for an existing Zoho Desk ticket (without needing webhooks).
 */

async function testTicketProcessing(ticketId) {
  console.log(`🚀 Testing ticket processing for Ticket ID: ${ticketId}\n`);

  try {
    const response = await fetch('http://localhost:3014/api/zoho/process-ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ticketId: ticketId,
        eventType: 'Ticket_Add',
        payload: {
          id: ticketId,
          ticketNumber: `TICK-${ticketId}`,
          subject: 'Manual Test',
          channel: 'EMAIL',
          priority: 'Medium',
          status: 'Open',
          contact: {
            email: 'test@example.com',
            lastName: 'Test Customer',
          },
          webUrl: `https://desk.zoho.com/support/ticket/${ticketId}`,
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
    console.log('📊 Results:\n');
    console.log('Classification:', result.classification?.primary_category);
    console.log('Confidence:', result.classification?.confidence);
    console.log('Auto-resolvable:', result.classification?.auto_resolvable);
    console.log('\nAI Response:', result.aiResponse?.text?.substring(0, 200) + '...');

    if (result.jiraTicket) {
      console.log('\n🎫 Jira Ticket Created:', result.jiraTicket.key);
    }

    console.log('\n⏱️  Processing Timeline:');
    result.timeline?.forEach((step) => {
      const status = step.status === 'completed' ? '✅' : '⏳';
      console.log(`  ${status} ${step.step} (${step.duration}ms)`);
    });

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }
}

// Get ticket ID from command line or use default
const ticketId = process.argv[2] || '106'; // Using your recent ticket

console.log('📝 Make sure your dev server is running on port 3014\n');
testTicketProcessing(ticketId);
