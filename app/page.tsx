import CubeLeaderboardClient from '@/components/CubeLeaderboardClient';
import Footer from '@/components/Footer';
import NavBar from '@/components/nav-bar';
import prisma from '@/lib/db';

export const revalidate = 10;

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
