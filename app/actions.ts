'use server';

import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { contactFormSchema } from '@/lib/schemas';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { AgeCategory } from '@prisma/client';

import { addScoreSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';

export async function addPlayer(formData: FormData) {
  try {
    // Parse and validate form data
    const data = addScoreSchema.parse({
      name: formData.get('name'),
      email: formData.get('email') || '',
      ageCategory: formData.get('ageCategory'),
      performances: formData.get('performances')
        ? JSON.parse(formData.get('performances')!.toString())
        : [],
    });

    // Authenticate the user
    const { userId, redirectToSignIn } = await auth();
    if (!userId) return redirectToSignIn();

    // Create player and performances
    await prisma.player.create({
      data: {
        name: data.name,
        email: data.email,
        ageCategory: data.ageCategory as AgeCategory,
        performances: {
          create: data.performances.map((perf) => ({
            cubeType: perf.cubeType,
            timeInSeconds:
              perf.time.minutes * 60 +
              perf.time.seconds +
              perf.time.milliseconds / 1000,
          })),
        },
      },
    });

    // Handle cache invalidation for the dashboard page
    revalidatePath('/', 'layout');
    console.log('Player added successfully.');
  } catch (error) {
    console.error('Error adding player:', error);
    throw new Error('Failed to add player. Please try again later.');
  }
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
