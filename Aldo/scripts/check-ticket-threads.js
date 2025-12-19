/**
 * Check if AI replied to a specific ticket
 */

const TOKEN_API_URL = 'https://accounts.zoho.com/oauth/v2/token';
const DESK_API_URL = 'https://desk.zoho.com';

const config = {
  orgId: process.env.ZOHO_ORG_ID || '900826394',
  clientId: process.env.ZOHO_CLIENT_ID || '1000.JHJHU3FUJ6D6LM0B6KGQ2SSHU65VBJ',
  clientSecret: process.env.ZOHO_CLIENT_SECRET || 'caa681997cb408e25d504f2037de39ff728b7d41e3',
  refreshToken: process.env.ZOHO_REFRESH_TOKEN || '1000.07fa025bec9cfc14ea32c12e43bde114.8191f3e1ae37e15746bdc9a8abbdb594',
};

async function getAccessToken() {
  const params = new URLSearchParams({
    refresh_token: config.refreshToken,
    client_id: config.clientId,
    client_secret: config.clientSecret,
    grant_type: 'refresh_token',
  });

  const response = await fetch(`${TOKEN_API_URL}?${params.toString()}`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`Failed to get access token`);
  }

  const data = await response.json();
  return data.access_token;
}

async function getTicketThreads(accessToken, ticketId) {
  const response = await fetch(
    `${DESK_API_URL}/api/v1/tickets/${ticketId}/conversations`,
    {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        orgId: config.orgId,
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch threads: ${error}`);
  }

  const data = await response.json();
  return data.data || [];
}

async function main() {
  const ticketId = process.argv[2] || '107';

  console.log(`\n🔍 Checking Ticket #${ticketId} for AI replies...\n`);

  try {
    const accessToken = await getAccessToken();
    const threads = await getTicketThreads(accessToken, ticketId);

    console.log(`Found ${threads.length} thread(s):\n`);

    threads.forEach((thread, index) => {
      console.log(`${index + 1}. ${thread.direction || 'Unknown'} - ${thread.channel}`);
      console.log(`   From: ${thread.from || 'N/A'}`);
      console.log(`   Summary: ${thread.summary || 'No summary'}`);
      console.log(`   Time: ${thread.createdTime}`);
      console.log(`   Content preview: ${(thread.content || '').substring(0, 100)}...`);
      console.log('');
    });

    const outgoingReplies = threads.filter(t => t.direction === 'out' || t.channel === 'EMAIL');

    if (outgoingReplies.length > 0) {
      console.log('✅ AI reply detected!\n');
    } else {
      console.log('⏳ No AI reply yet. Webhook might still be processing...\n');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

main();
