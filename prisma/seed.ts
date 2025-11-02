import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create demo user
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo.user@example.com' },
    update: {},
    create: {
      email: 'demo.user@example.com',
      username: 'demouser',
      password: await bcrypt.hash('demouser123', 10),
      role: 'user',
      isVerified: true,
      profile: {
        create: {
          firstname: 'Demo',
          lastname: 'User',
          address: '123 Demo Street',
          state: 'Demo State',
          city: 'Demo City',
          localGovt: 'Demo LGA',
          bio: 'I am a demo user account for testing purposes.',
          sex: 'Other',
        }
      }
    }
  });

  // Create demo admin
  const demoAdmin = await prisma.user.upsert({
    where: { email: 'demo.admin@example.com' },
    update: {},
    create: {
      email: 'demo.admin@example.com',
      username: 'demoadmin',
      password: await bcrypt.hash('demoadmin123', 10),
      role: 'admin',
      isVerified: true,
      profile: {
        create: {
          firstname: 'Demo',
          lastname: 'Admin',
          address: '456 Admin Street',
          state: 'Admin State',
          city: 'Admin City',
          localGovt: 'Admin LGA',
          bio: 'I am a demo administrator account for testing purposes.',
          sex: 'Other',
        }
      }
    }
  });

  console.log({ demoUser, demoAdmin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });