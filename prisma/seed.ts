const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const AgeCategory = {
  FOUR_TO_SIX: 'FOUR_TO_SIX',
  SIX_TO_EIGHT: 'SIX_TO_EIGHT',
  EIGHT_TO_TEN: 'EIGHT_TO_TEN',
  TEN_TO_TWELVE: 'TEN_TO_TWELVE',
  TWELVE_TO_FOURTEEN: 'TWELVE_TO_FOURTEEN',
  FOURTEEN_PLUS: 'FOURTEEN_PLUS',
};

const CubeType = {
  CUBE_3X3: 'CUBE_3X3',
  CUBE_2X2: 'CUBE_2X2',
  PYRAMINX: 'PYRAMINX',
  CUBE_RELAY: 'CUBE_RELAY',
  MIRROR: 'MIRROR',
  SKEWB: 'SKEWB',
};

async function main() {
  // Clean the database first
  await prisma.performance.deleteMany();
  await prisma.player.deleteMany();

  // Create some players across different age categories
  const players = await Promise.all([
    prisma.player.create({
      data: {
        name: 'Rohan Patel',
        email: 'rohan.p@example.com',
        ageCategory: AgeCategory.EIGHT_TO_TEN,
      },
    }),
    prisma.player.create({
      data: {
        name: 'Nisha Singh',
        email: 'nisha.s@example.com',
        ageCategory: AgeCategory.FOUR_TO_SIX,
      },
    }),
    prisma.player.create({
      data: {
        name: 'Amit Kumar',
        email: 'amit.k@example.com',
        ageCategory: AgeCategory.TWELVE_TO_FOURTEEN,
      },
    }),
    prisma.player.create({
      data: {
        name: 'Priya Rao',
        email: 'priya.r@example.com',
        ageCategory: AgeCategory.FOURTEEN_PLUS,
      },
    }),
    prisma.player.create({
      data: {
        name: 'Arjun Jain',
        email: 'arjun.j@example.com',
        ageCategory: AgeCategory.SIX_TO_EIGHT,
      },
    }),
  ]);

  // Create performances for each player
  for (const player of players) {
    // Generate random performances for different cube types
    const performanceData = [
      {
        playerId: player.id,
        cubeType: CubeType.CUBE_3X3,
        timeInSeconds: 15 + Math.random() * 30, // 15-45 seconds
      },
      {
        playerId: player.id,
        cubeType: CubeType.CUBE_2X2,
        timeInSeconds: 5 + Math.random() * 15, // 5-20 seconds
      },
      {
        playerId: player.id,
        cubeType: CubeType.PYRAMINX,
        timeInSeconds: 10 + Math.random() * 20, // 10-30 seconds
      },
      {
        playerId: player.id,
        cubeType: CubeType.CUBE_RELAY,
        timeInSeconds: 45 + Math.random() * 60, // 45-105 seconds
      },
      {
        playerId: player.id,
        cubeType: CubeType.MIRROR,
        timeInSeconds: 30 + Math.random() * 45, // 30-75 seconds
      },
      {
        playerId: player.id,
        cubeType: CubeType.SKEWB,
        timeInSeconds: 8 + Math.random() * 17, // 8-25 seconds
      },
    ];

    await Promise.all(
      performanceData.map((data) =>
        prisma.performance.create({
          data,
        })
      )
    );
  }

  console.log('Database has been seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
