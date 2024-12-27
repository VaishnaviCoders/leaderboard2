import prisma from '@/lib/db';
import Link from 'next/link';
import React from 'react';

const page = async () => {
  const data = await prisma.player.findMany({
    include: {
      performances: true,
    },
  });
  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto px-4">
      {data.map((player) => (
        <div
          key={player.id}
          className="flex justify-between items-center bg-white shadow rounded-lg p-4"
        >
          <div>
            <span className="text-lg font-semibold">{player.id}</span>
            <br />
            <span className="text-lg font-semibold ml-2">{player.name}</span>
            <span className="text-lg font-semibold ml-2">
              {player.ageCategory}
            </span>
            {player.performances.map((item, index) => (
              <div key={item.id}>
                {item.cubeType} - {item.timeInSeconds}
              </div>
            ))}
          </div>
          <Link
            href={`/dashboard/scores/${player.id}/delete`}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </Link>
        </div>
      ))}
    </div>
  );
};

export default page;
