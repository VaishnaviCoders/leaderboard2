import { z } from 'zod';

export const addScoreSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email().optional().or(z.literal('')),
  ageCategory: z.enum([
    'FOUR_TO_SIX',
    'SIX_TO_EIGHT',
    'EIGHT_TO_TEN',
    'TEN_TO_TWELVE',
    'TWELVE_TO_FOURTEEN',
    'FOURTEEN_PLUS',
  ]),
  performances: z
    .array(
      z.object({
        cubeType: z.enum([
          'CUBE_3X3',
          'CUBE_2X2',
          'PYRAMINX',
          'CUBE_RELAY',
          'MIRROR',
          'SKEWB',
        ]),
        time: z.object({
          minutes: z.number().min(0).max(59),
          seconds: z.number().min(0).max(59),
          milliseconds: z.number().min(0).max(999),
        }),
      })
    )
    .min(1, 'At least one cube performance is required.'),
});

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(32, { message: 'Name must be at most 32 characters' }),
  email: z.string().email({ message: 'Invalid email address' }).optional(),
  message: z
    .string()
    .min(2, { message: 'Message must be at least 2 characters' })
    .max(1000, { message: 'Message must be at most 1000 characters' }),
});
