/**
 * Test the /api/tickets endpoint
 */

async function testTicketsAPI() {
  console.log('🧪 Testing /api/tickets endpoint...\n');

  try {
    // Test locally first
    const localUrl = 'http://localhost:3011/api/tickets?limit=10';

    console.log('Fetching from:', localUrl);

    const response = await fetch(localUrl);

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ API Error:', error);
      return;
    }

    const data = await response.json();

    console.log('✅ API Response received!\n');
    console.log(`Found ${data.count} tickets:\n`);

    data.tickets.forEach((ticket, index) => {
      console.log(`${index + 1}. #${ticket.ticketNumber} - ${ticket.summary}`);
      console.log(`   Priority: ${ticket.priority} | Status: ${ticket.status}`);
      console.log(`   Reporter: ${ticket.reporter} (${ticket.reporterEmail})`);
      console.log(`   Assigned: ${ticket.assignedAgent || 'Unassigned'}`);
      console.log(`   Created: ${new Date(ticket.createdDate).toLocaleString()}`);
      console.log(`   Channel: ${ticket.channel}`);
      console.log('');
    });

    console.log('🎉 Dashboard-ready data fetched successfully!\n');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testTicketsAPI();
