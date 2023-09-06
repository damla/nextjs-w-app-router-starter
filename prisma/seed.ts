import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('example-password', 10);

  await prisma.user.upsert({
    where: { email: 'damla@user.com' },
    update: {},
    create: {
      name: 'Damla',
      email: 'damla@user.com',
      password: hashedPassword,
      address: 'Istanbul Turkey'
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
