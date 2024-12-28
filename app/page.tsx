import CubeLeaderboardClient from '@/components/CubeLeaderboardClient';
import Footer from '@/components/Footer';
import NavBar from '@/components/nav-bar';
import prisma from '@/lib/db';
<<<<<<< HEAD
import { Suspense } from 'react';

export const revalidate = 5;

function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      Loading...
    </div>
  );
}
=======

export const revalidate = 10;
>>>>>>> upstream/main

export default async function CubeLeaderboard() {
  console.time('fetch-performances');
  const performances = await prisma.performance.findMany({
    include: {
      player: true,
    },
    orderBy: {
      timeInSeconds: 'asc',
    },
  });
  console.timeEnd('fetch-performances');
  console.log('Performances:', performances);

  return (
    <div>
      <NavBar />

      <CubeLeaderboardClient performances={performances} />

      <Footer />
    </div>
  );
}
