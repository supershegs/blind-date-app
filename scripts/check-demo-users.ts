import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function run() {
  const demoUser = await prisma.user.findUnique({ where: { email: 'demo.user@example.com' } });
  const demoAdmin = await prisma.user.findUnique({ where: { email: 'demo.admin@example.com' } });
  console.log('DemoUser:', demoUser);
  console.log('DemoAdmin:', demoAdmin);
  await prisma.$disconnect();
}

run().catch(e => { console.error(e); process.exit(1); });
