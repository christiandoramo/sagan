import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { faker, simpleFaker } from '@faker-js/faker';
import { hash } from 'bcryptjs';
import { colleges } from './colleges/college';

const prisma = new PrismaClient();

async function main() {
  console.time('Seed colleges');
  for (const college of colleges) {
    await prisma.college.createMany({
      data: {
        id: college.id,
        name: college.name,
        uf: college.uf,
        initials: college.initials,
        createdAt: new Date(college.created_at).toISOString(),
        updatedAt: new Date(college.updated_at).toISOString(),
      },
      skipDuplicates: true,
    });
  }
  console.timeEnd('Seed colleges');

  const users = [];
  for (let i = 0; i < 10; i++) {
    const password = faker.internet.password();
    const passwordHashed = await hash(password, 10);

    const min = 1;
    const max = 4;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    switch (randomNumber) {
      case 1:
        users.push({
          id: simpleFaker.string.uuid(),
          name: faker.person.firstName(),
          email: faker.internet.email(),
          password: passwordHashed,
          role: 'STUDENT',
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
          collegeId: randomNumber,
        });
        break;
      case 2:
        users.push({
          id: simpleFaker.string.uuid(),
          name: faker.person.firstName(),
          email: faker.internet.email(),
          password: passwordHashed,
          role: 'PROFESSOR',
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
          collegeId: randomNumber,
        });
        break;
      case 3:
        users.push({
          id: simpleFaker.string.uuid(),
          name: faker.person.firstName(),
          email: faker.internet.email(),
          password: passwordHashed,
          role: 'TECH_MANAGER',
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
          collegeId: randomNumber,
        });
        break;
      case 4:
        users.push({
          id: simpleFaker.string.uuid(),
          name: faker.person.firstName(),
          email: faker.internet.email(),
          password: passwordHashed,
          role: 'ADMIN',
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
          collegeId: randomNumber,
        });
        break;
    }
  }

  console.time('Seed users');
  for (const user of users) {
    await prisma.user.createMany({
      data: {
        ...(user as any),
        createdAt: new Date(user.createdAt).toISOString(),
        updatedAt: new Date(user.updatedAt).toISOString(),
      },
      skipDuplicates: true,
    });
  }
  console.timeEnd('Seed users');

  Logger.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
