'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2 } from 'lucide-react';
import { addScoreSchema } from '@/lib/schemas';
import { addPlayer } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const ageCategoryOptions = [
  { value: 'FOUR_TO_SIX', label: '4-6 years' },
  { value: 'SIX_TO_EIGHT', label: '6-8 years' },
  { value: 'EIGHT_TO_TEN', label: '8-10 years' },
  { value: 'TEN_TO_TWELVE', label: '10-12 years' },
  { value: 'TWELVE_TO_FOURTEEN', label: '12-14 years' },
  { value: 'FOURTEEN_PLUS', label: '14+ years' },
  { value: 'TEACHERS', label: 'Teachers' },
  { value: 'PARENTS', label: 'Parents' },
];

const cubeTypeOptions = [
  { value: 'CUBE_3X3', label: '3x3 Cube' },
  { value: 'CUBE_2X2', label: '2x2 Cube' },
  { value: 'PYRAMINX', label: 'Pyraminx' },
  { value: 'CUBE_RELAY', label: 'Cube Relay' },
  { value: 'MIRROR', label: 'Mirror Cube' },
  { value: 'SKEWB', label: 'Skewb' },
];

type FormValues = z.infer<typeof addScoreSchema>;

export default function CubePerformanceForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(addScoreSchema),
    defaultValues: {
      name: '',
      email: '',
      ageCategory: 'FOUR_TO_SIX',
      performances: [
        {
          cubeType: 'CUBE_3X3',
          time: { minutes: 0, seconds: 0, milliseconds: 0 },
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'performances',
    control: form.control,
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    // Simulate API call
    try {
      const performances = data.performances.map((performance) => ({
        ...performance,
        timeInSeconds:
          performance.time.minutes * 60 +
          performance.time.seconds +
          performance.time.milliseconds / 1000,
      }));

      const formData = new FormData();
      formData.set('name', data.name);
      formData.set('email', data.email || '');
      formData.set('ageCategory', data.ageCategory);
      formData.set('performances', JSON.stringify(performances));

      await addPlayer(formData);

      toast({
        title: 'Success',
        description: 'Player data added successfully!',
      });
      form.reset();
    } catch (error) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full max-w-3xl mt-8 mx-auto p-6 bg-white shadow-lg rounded-lg"
      >
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Cube Performance Form Dec 2024
          </h2>
          <p className="text-gray-500">
            Enter player details and cube performances.
          </p>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter player name" {...field} />
              </FormControl>
              <FormDescription>The player&apos;s full name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email (optional)</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The player&apos;s email address (if available).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ageCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ageCategoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the player&apos;s age category.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Cube Performances
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({
                  cubeType: 'CUBE_3X3',
                  time: { minutes: 0, seconds: 0, milliseconds: 0 },
                })
              }
            >
              Add Cube
            </Button>
          </div>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-end space-x-4 bg-gray-50 p-4 rounded-md"
            >
              <FormField
                control={form.control}
                name={`performances.${index}.cubeType`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Cube Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cube type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cubeTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 flex-1 min-w-[200px]">
                <FormField
                  control={form.control}
                  name={`performances.${index}.time.minutes`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Minutes</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="59"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`performances.${index}.time.seconds`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Seconds</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="59"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`performances.${index}.time.milliseconds`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Milliseconds</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="999"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove performance</span>
              </Button>
            </div>
          ))}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Performance'}
        </Button>
      </form>
    </Form>
  );
}
