import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

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
  .then(() => prisma.$disconnect())
  .catch(async e => {
    await prisma.$disconnect();
    process.exit();
  });
