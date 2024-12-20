'use client';

// import CubePerformanceForm from '@/components/ScoreForm';
import dynamic from 'next/dynamic';
import React from 'react';

const CubePerformanceForm = dynamic(() => import('@/components/ScoreForm'), {
  ssr: false,
});

const page = () => {
  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <CubePerformanceForm />
    </div>
  );
};

export default page;
