import { PrismaClient } from '@prisma/client';
import { defineEventHandler, getQuery } from 'h3';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { bidang, kategori } = query;

  const ranking = await prisma.santris.findMany({
    where: {
      category: kategori,
    },
    select: {
      name: true,
      evaluations: {
        where: {
          field: bidang,
        },
        select: {
          score: true,
        },
      },
    },
    orderBy: {
      evaluations: {
        _sum: {
          score: 'desc',
        },
      },
    },
  });

  return ranking;
});
