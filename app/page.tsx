import CubeLeaderboardClient from '@/components/CubeLeaderboardClient';
import Footer from '@/components/Footer';
import NavBar from '@/components/nav-bar';
import prisma from '@/lib/db';
import Link from 'next/link';
import { Suspense } from 'react';

function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      Loading...
    </div>
  );
}

export default async function CubeLeaderboard() {
  const performances = await prisma.performance.findMany({
    include: {
      player: true,
    },
    orderBy: {
      timeInSeconds: 'asc',
    },
  });

  return (
    <div>
      <NavBar />
      <Suspense fallback={<Loading />}>
        <CubeLeaderboardClient performances={performances} />
      </Suspense>
      <Footer />
    </div>
  );
}
