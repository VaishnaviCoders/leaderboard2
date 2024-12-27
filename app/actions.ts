'use server';

import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { contactFormSchema } from '@/lib/schemas';
import { z } from 'zod';
import { redirect } from 'next/navigation';
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

  const { userId } = await auth();

  if (!userId) {
    redirect('/');
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

export async function contactFormAction(
  _prevState: unknown,
  formData: FormData
) {
  const defaultValues = z
    .record(z.string(), z.string())
    .parse(Object.fromEntries(formData.entries()));

  try {
    const data = contactFormSchema.parse(Object.fromEntries(formData));

    // This simulates a slow response like a form submission.
    // Replace this with your actual form submission logic.
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email || '',
        message: data.message,
      },
    });

    console.log(data);

    return {
      defaultValues: {
        name: '',
        email: '',
        message: '',
      },
      success: true,
      errors: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        defaultValues,
        success: false,
        errors: Object.fromEntries(
          Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
            key,
            value?.join(', '),
          ])
        ),
      };
    }

    return {
      defaultValues,
      success: false,
      errors: null,
    };
  }
}

export async function deletePlayerById(fromData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    return redirect('/');
  }
  const playerId = fromData.get('playerId') as string;

  await prisma.performance.deleteMany({
    where: {
      playerId,
    },
  });

  await prisma.player.delete({
    where: {
      id: playerId,
    },
  });

  redirect('/dashboard/scores');
}
