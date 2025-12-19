/**
 * Automated Persona Testing Script
 * Tests all 10 personas and their Quick Actions systematically
 *
 * Usage: node test-all-personas-automated.js
 */

const fs = require('fs');
const path = require('path');

// Test configuration
const BASE_URL = 'http://localhost:3018';
const SCREENSHOT_DIR = path.join(__dirname, 'testing-screenshots');
const WAIT_TIME = 5000; // 5 seconds for widgets to load

// Ensure screenshot directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// Persona definitions
const personas = {
  government: [
    {
      id: 'cor',
      name: 'COR - Alexa Johnson',
      quickActions: [
        'Contract Status Active',
        'Vendor Performance 92%',
        'Compliance Dashboard ✓',
        'Budget Tracking $2.4M',
        'Deliverables Review 8'
      ]
    },
    {
      id: 'program-manager',
      name: 'Program Manager - Marcus Rivera',
      quickActions: [
        'Program Overview',
        'Portfolio Status',
        'Risk Assessment',
        'Resource Planning',
        'Strategic Goals'
      ]
    },
    {
      id: 'project-manager',
      name: 'Project Manager - Taylor Brooks',
      quickActions: [
        'Sprint Status',
        'Team Velocity',
        'Issue Tracker',
        'Timeline View',
        'Deliverables'
      ]
    }
  ],
  project: [
    {
      id: 'service-team-lead',
      name: 'Service Team Lead - Sarah Mitchell',
      quickActions: [
        'Team Dashboard',
        'Active Tickets',
        'Performance Metrics',
        'Resource Planning',
        'Quality Reports'
      ]
    },
    {
      id: 'service-team-member',
      name: 'Service Team Member - Christopher Hayes',
      quickActions: [
        'My Tasks',
        'Active Projects',
        'Time Tracking',
        'Knowledge Base',
        'Team Chat'
      ]
    },
    {
      id: 'stakeholder-lead',
      name: 'Stakeholder Lead - Jordan Taylor',
      quickActions: [
        'Executive Summary',
        'Budget Overview',
        'Risk Assessment',
        'Strategic Alignment',
        'ROI Analysis'
      ]
    }
  ],
  atc: [
    {
      id: 'atc-executive',
      name: 'ATC Executive - Jennifer Anderson (CEO)',
      quickActions: [
        'Company Dashboard',
        'Financial Overview',
        'Strategic Initiatives',
        'Market Analysis',
        'Board Reports'
      ]
    },
    {
      id: 'atc-manager',
      name: 'ATC Manager - David Miller (CS Manager)',
      quickActions: [
        'Team Performance',
        'Customer Health',
        'Support Metrics',
        'Resource Management',
        'Escalations'
      ]
    },
    {
      id: 'atc-support',
      name: 'ATC Support - Christopher Hayes (Support Engineer)',
      quickActions: [
        'My Tickets',
        'Customer Queue',
        'Knowledge Base',
        'Escalation Status',
        'Performance Stats'
      ]
    },
    {
      id: 'atc-csm',
      name: 'ATC CSM - Jordan Taylor (Customer Success Manager)',
      quickActions: [
        'Account Portfolio',
        'Health Scores',
        'Renewal Pipeline',
        'Upsell Opportunities',
        'Customer Feedback'
      ]
    }
  ]
};

// Test results
const results = {
  totalPersonas: 0,
  totalQuickActions: 0,
  passed: 0,
  failed: 0,
  errors: [],
  screenshots: [],
  startTime: new Date(),
  endTime: null
};

// Main testing function (CLI version without Playwright)
async function runTests() {
  console.log('='.repeat(80));
  console.log('AUTOMATED PERSONA TESTING');
  console.log('='.repeat(80));
  console.log('');

  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Screenshot Directory: ${SCREENSHOT_DIR}`);
  console.log('');

  // Count totals
  for (const mode in personas) {
    results.totalPersonas += personas[mode].length;
    personas[mode].forEach(persona => {
      results.totalQuickActions += persona.quickActions.length;
    });
  }

  console.log(`Total Personas to Test: ${results.totalPersonas}`);
  console.log(`Total Quick Actions to Test: ${results.totalQuickActions}`);
  console.log('');
  console.log('='.repeat(80));
  console.log('');

  // Generate test instructions
  console.log('TEST INSTRUCTIONS (Manual Execution)');
  console.log('This script generates test instructions. Use Chrome DevTools MCP to execute.');
  console.log('');

  let testNumber = 1;

  for (const mode in personas) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`MODE: ${mode.toUpperCase()}`);
    console.log(`${'='.repeat(80)}\n`);

    for (const persona of personas[mode]) {
      console.log(`\nPersona ${testNumber}: ${persona.name}`);
      console.log(`URL: ${BASE_URL}/demo/${persona.id}`);
      console.log('-'.repeat(80));

      console.log(`\n1. Navigate to: ${BASE_URL}/demo/${persona.id}`);
      console.log(`2. Take initial screenshot: ${mode}-${persona.id}-initial.png`);
      console.log(`3. Check console for errors\n`);

      persona.quickActions.forEach((action, index) => {
        const actionSlug = action.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        console.log(`   Quick Action ${index + 1}: ${action}`);
        console.log(`   - Click "${action}" button`);
        console.log(`   - Wait ${WAIT_TIME/1000} seconds`);
        console.log(`   - Screenshot: ${mode}-${persona.id}-${actionSlug}.png`);
        console.log(`   - Check console for errors`);
        console.log(`   - Click "New" conversation button`);
        console.log('');
      });

      testNumber++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('END OF TEST INSTRUCTIONS');
  console.log('='.repeat(80));
  console.log('\nNOTE: This is a guide. Execute tests manually with Chrome DevTools MCP.');
  console.log('Playwright automation would require additional setup and dependencies.');
}

// Run tests
runTests().catch(console.error);
