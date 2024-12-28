import CubePerformanceForm from '@/components/ScoreForm';

import React from 'react';
import { auth } from '@clerk/nextjs/server';

const page = async () => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();
  return (
    <div className="flex flex-col h-full w-full items-center justify-center px-4">
      <h1>Hello, {userId}</h1>
      <CubePerformanceForm />
    </div>
  );
};

export default page;
