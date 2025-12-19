/**
 * Test Zoho Desk API Connection
 *
 * This script tests the Zoho Desk API credentials and lists your recent tickets.
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
  console.log('🔄 Getting access token...');

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
    const error = await response.text();
    throw new Error(`Failed to get access token: ${error}`);
  }

  const data = await response.json();
  console.log('✅ Access token obtained');
  return data.access_token;
}

async function getTickets(accessToken) {
  console.log('🔄 Fetching recent tickets...');

  const response = await fetch(
    `${DESK_API_URL}/api/v1/tickets?limit=5&sortBy=-createdTime`,
    {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        orgId: config.orgId,
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch tickets: ${error}`);
  }

  const data = await response.json();
  return data.data || [];
}

async function main() {
  console.log('🚀 Testing Zoho Desk API Connection\n');
  console.log('📋 Configuration:');
  console.log(`   Org ID: ${config.orgId}`);
  console.log(`   Client ID: ${config.clientId.substring(0, 20)}...`);
  console.log(`   Refresh Token: ${config.refreshToken.substring(0, 20)}...\n`);

  try {
    // Step 1: Get access token
    const accessToken = await getAccessToken();

    // Step 2: Fetch recent tickets
    const tickets = await getTickets(accessToken);

    console.log(`\n✅ SUCCESS! Found ${tickets.length} recent tickets:\n`);

    tickets.forEach((ticket, index) => {
      console.log(`${index + 1}. Ticket #${ticket.ticketNumber}`);
      console.log(`   Subject: ${ticket.subject}`);
      console.log(`   Status: ${ticket.status}`);
      console.log(`   Channel: ${ticket.channel}`);
      console.log(`   Created: ${ticket.createdTime}`);
      console.log('');
    });

    console.log('🎉 Zoho Desk API connection is working!\n');
    console.log('Next steps:');
    console.log('1. Set up webhook in Zoho Desk');
    console.log('2. Test complete email → AI → reply flow\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('\nPlease check your credentials in .env.local\n');
    process.exit(1);
  }
}

main();
