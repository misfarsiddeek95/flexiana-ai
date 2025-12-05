
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const dataPath = path.join(__dirname, 'seed_data.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  console.log('Seeding System User Types...');
  for (const userType of data.systemUserTypes) {
    await prisma.systemUserType.upsert({
      where: { id: userType.id },
      update: {
        ...userType,
        createdAt: new Date(userType.createdAt),
        updatedAt: new Date(userType.updatedAt),
      },
      create: {
        ...userType,
        createdAt: new Date(userType.createdAt),
        updatedAt: new Date(userType.updatedAt),
      },
    });
  }

  console.log('Seeding System Users...');
  for (const user of data.systemUsers) {
    await prisma.systemUser.upsert({
      where: { id: user.id },
      update: {
        ...user,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      },
      create: {
        ...user,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      },
    });
  }

  console.log('Seeding Blogs...');
  for (const blog of data.blogs) {
    // Remove fields that might cause issues if they are not in the schema or are auto-generated but we want to preserve them
    // In this case, we want to preserve everything including IDs.

    await prisma.blog.upsert({
      where: { id: blog.id },
      update: {
        ...blog,
        publishDate: new Date(blog.publishDate),
        createdAt: new Date(blog.createdAt),
        updatedAt: new Date(blog.updatedAt),
      },
      create: {
        ...blog,
        publishDate: new Date(blog.publishDate),
        createdAt: new Date(blog.createdAt),
        updatedAt: new Date(blog.updatedAt),
      },
    });
  }

  console.log('Seeding Case Studies...');
  for (const cs of data.caseStudies) {
    await prisma.caseStudy.upsert({
      where: { id: cs.id },
      update: {
        ...cs,
        createdAt: new Date(cs.createdAt),
        updatedAt: new Date(cs.updatedAt),
      },
      create: {
        ...cs,
        createdAt: new Date(cs.createdAt),
        updatedAt: new Date(cs.updatedAt),
      },
    });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
