import { PrismaClient } from '@prisma/client';
import { hash } from "bcrypt"


const prisma = new PrismaClient();

async function main() {
  const roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Manager' },
    { id: 3, name: 'Nurse' },
    { id: 4, name: 'Parent' },
    { id: 5, name: 'Student' },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { id: role.id },
      update: {},
      create: role,
    });
  }


  const plainPassword = '123456';
  const saltRounds = 10;

  const existingAdmin = await prisma.account.findUnique({
    where: { email: 'admin@gmail.com' },
  });

  if (!existingAdmin) {
    const hashedPassword = await hash(plainPassword, saltRounds);
    await prisma.account.create({
      data: {
        fullname: 'admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        roleID: 1,
      },
    });
    console.log('Admin account created');
  } else {
    console.log('Admin account already exists, skipping creation');
  }

  console.log('Seed roles done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
