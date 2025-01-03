import prisma from '@/lib/db';
import Link from 'next/link';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const revalidate = 3;

const page = async () => {
  const data = await prisma.player.findMany({
    include: {
      performances: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden md:block">Competition Name</TableHead>
          <TableHead>Participant</TableHead>
          <TableHead>Solve Time (s)</TableHead>
          <TableHead className="hidden md:block">Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((player) => (
          <TableRow key={player.id}>
            <TableCell className="font-medium hidden md:block">
              {player.id}
            </TableCell>
            <TableCell className="font-medium">{player.name}</TableCell>
            <TableCell>
              {player.performances.map((item, index) => (
                <div key={index}>
                  {item.cubeType} - {item.timeInSeconds}
                </div>
              ))}
            </TableCell>
            <TableCell className="hidden md:block">
              {new Intl.DateTimeFormat('en-US').format(player.createdAt)}
            </TableCell>
            <TableCell>
              <Link
                href={`/dashboard/scores/${player.id}/delete`}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    // <div className="flex flex-col gap-4 max-w-5xl mx-auto px-4">
    //   {data.map((player) => (
    //     <div
    //       key={player.id}
    //       className="flex justify-between items-center bg-white shadow rounded-lg p-4"
    //     >
    //       <div>
    //         <span className="text-lg font-semibold">{player.id}</span>
    //         <br />
    //         <span className="text-lg font-semibold ml-2">{player.name}</span>
    //         <span className="text-lg font-semibold ml-2">
    //           {player.ageCategory}
    //         </span>
    //         {player.performances.map((item, index) => (
    //           <div key={index}>
    //             {item.cubeType} - {item.timeInSeconds}
    //           </div>
    //         ))}
    //       </div>
    //       <Link
    //         href={`/dashboard/scores/${player.id}/delete`}
    //         className="text-red-500 hover:text-red-700"
    //       >
    //         Delete
    //       </Link>
    //     </div>
    //   ))}
    // </div>
  );
};

export default page;
