'use server';

import prisma from '@/lib/db';
type AgeCategory =
  | 'FOUR_TO_SIX'
  | 'SIX_TO_EIGHT'
  | 'EIGHT_TO_TEN'
  | 'TEN_TO_TWELVE'
  | 'TWELVE_TO_FOURTEEN'
  | 'FOURTEEN_PLUS';

type Performance = {
  cubeType: string;
  timeInSeconds: number;
};
export async function addPlayer(formData: FormData) {
  const name = formData.get('name')?.toString();
  const email = formData.get('email')?.toString();
  const ageCategory = formData.get('ageCategory')?.toString() as AgeCategory;
  const performances = formData.get('performances')
    ? JSON.parse(formData.get('performances')!.toString())
    : [];

  if (
    !name ||
    !ageCategory ||
    !performances.length ||
    !isValidAgeCategory(ageCategory)
  ) {
    throw new Error('Required fields are missing or invalid.');
  }

  try {
    // Create a new player with performances
    await prisma.player.create({
      data: {
        name,
        email,
        ageCategory,
        performances: {
          create: performances.map((performance: Performance) => ({
            cubeType: performance.cubeType,
            timeInSeconds: performance.timeInSeconds,
          })),
        },
      },
    });
  } catch (error) {
    console.error('Error creating player:', error);
    throw new Error('Failed to add player. Please try again later.');
  }
}

function isValidAgeCategory(category: string): category is AgeCategory {
  return [
    'FOUR_TO_SIX',
    'SIX_TO_EIGHT',
    'EIGHT_TO_TEN',
    'TEN_TO_TWELVE',
    'TWELVE_TO_FOURTEEN',
    'FOURTEEN_PLUS',
  ].includes(category);
}
