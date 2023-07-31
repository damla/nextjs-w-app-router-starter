import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@admin.com',
      role: 'admin'
    }
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async e => {
    await prisma.$disconnect();
    process.exit();
  });
