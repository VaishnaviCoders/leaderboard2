import CubeLeaderboardClient from '@/components/CubeLeaderboardClient';
import Footer from '@/components/Footer';
import NavBar from '@/components/nav-bar';
import prisma from '@/lib/db';

export const revalidate = 5;

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

      <CubeLeaderboardClient performances={performances} />

      <Footer />
    </div>
  );
}
