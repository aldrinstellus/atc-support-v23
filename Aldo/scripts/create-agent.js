import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createAgent() {
  try {
    // Create a support agent
    const agent = await prisma.user.upsert({
      where: { email: 'john.smith@support.com' },
      update: {
        isActive: true,
        role: 'SUPPORT_AGENT',
      },
      create: {
        email: 'john.smith@support.com',
        name: 'John Smith',
        role: 'SUPPORT_AGENT',
        password: 'hashed_password_here',
        isActive: true,
      },
    });

    console.log('Created/Updated agent:', agent);

    // Create agent metrics
    const metrics = await prisma.agentMetrics.upsert({
      where: { userId: agent.id },
      update: {
        currentWorkload: 0,
        maxCapacity: 20,
        performanceScore: 0.95,
        status: 'ACTIVE',
      },
      create: {
        userId: agent.id,
        currentWorkload: 0,
        maxCapacity: 20,
        ticketsInProgress: 0,
        ticketsCompleted: 0,
        avgResolutionTime: 0,
        performanceScore: 0.95,
        status: 'ACTIVE',
      },
    });

    console.log('Created/Updated agent metrics:', metrics);
    console.log('\n✅ Support agent created successfully!');
    
  } catch (error) {
    console.error('Error creating agent:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAgent();
