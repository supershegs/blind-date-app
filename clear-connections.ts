import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearConnections() {
  try {
    const connections = await prisma.connection.findMany({});

    console.log(`Found ${connections.length} existing connections:`);
    connections.forEach(conn => {
      console.log(`- Sender ID: ${conn.senderId} → Receiver ID: ${conn.receiverId} (${conn.status})`);
    });

    if (connections.length > 0) {
      console.log('\nDeleting all connections...');
      const result = await prisma.connection.deleteMany({});
      console.log(`✅ Deleted ${result.count} connections`);
    } else {
      console.log('\n✅ No connections to delete');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearConnections();
