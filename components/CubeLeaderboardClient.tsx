'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Medal } from 'lucide-react';
import { motion } from 'framer-motion';
import { CuboidIcon as Cube } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const ageCategories = [
  // { id: 'ALL', label: 'ALL' },
  { id: 'FOUR_TO_SIX', label: '4-6 years' },
  { id: 'SIX_TO_EIGHT', label: '6-8 years' },
  { id: 'EIGHT_TO_TEN', label: '8-10 years' },
  { id: 'TEN_TO_TWELVE', label: '10-12 years' },
  { id: 'TWELVE_TO_FOURTEEN', label: '12-14 years' },
  { id: 'FOURTEEN_PLUS', label: '14+ years' },
];

const cubeTypes = [
  // { id: 'ALL', label: 'ALL' },
  { id: 'CUBE_3X3', label: '3×3 Cube' },
  { id: 'CUBE_2X2', label: '2×2 Cube' },
  { id: 'PYRAMINX', label: 'Pyraminx' },
  { id: 'CUBE_RELAY', label: 'Cube Relay' },
  { id: 'MIRROR', label: 'Mirror Cube' },
  { id: 'SKEWB', label: 'Skewb' },
];
type Performance = {
  timeInSeconds: number;
  cubeType: string;
  player: {
    name: string;
    ageCategory: string;
  };
};

const CubeLeaderboardClient = ({
  performances,
}: {
  performances: Performance[];
}) => {
  const [activeAge, setActiveAge] = useState('FOUR_TO_SIX'); // Make It all
  const [activeCube, setActiveCube] = useState('CUBE_3X3'); // Make It all

  const formatTime = (timeInSeconds: number) => {
    const totalSeconds = Math.floor(timeInSeconds);
    const milliseconds = Math.round((timeInSeconds - totalSeconds) * 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes} Min - ${seconds} Sec - ${milliseconds} Ms`;
  };

  const filteredPerformances = performances.filter((performance) => {
    const matchesAge =
      activeAge === 'ALL' || performance.player.ageCategory === activeAge;
    const matchesCube =
      activeCube === 'ALL' || performance.cubeType === activeCube;
    return matchesAge && matchesCube;
  });

  return (
    <div className="container max-w-7xl mx-auto p-6 space-y-6">
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-500 via-blue-500 to-blue-600 px-6 py-12 shadow-xl">
        {/* Animated background elements */}
        {/* <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-32 w-32 rounded-full bg-white/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.2, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 2,
              }}
            />
          ))}
        </div> */}

        {/* Content */}
        <div className="relative">
          <div className="flex items-center justify-center space-x-3 ">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className=""
            >
              <Cube className="h-10 w-10 text-white/90" />
            </motion.div>
            <h1 className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-3xl font-bold text-transparent  sm:text-5xl text-center">
              RSAI NATIONAL CUBE FEST 2024
            </h1>
          </div>

          <h2 className="mt-4 text-center text-2xl sm:text-3xl font-semibold text-white/90">
            Clash of champions!
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-white/80">
            Honoring excellence in cubing – Official RSAI national records
            across all age groups and events!
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Age Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {ageCategories.map((age) => (
                <Button
                  key={age.id}
                  variant={activeAge === age.id ? 'default' : 'outline'}
                  className="flex-1 min-w-[100px]"
                  onClick={() => setActiveAge(age.id)}
                >
                  {age.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cube Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {cubeTypes.map((cube) => (
                <Button
                  key={cube.id}
                  variant={activeCube === cube.id ? 'default' : 'outline'}
                  className="flex-1 min-w-[100px]"
                  onClick={() => setActiveCube(cube.id)}
                >
                  {cube.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Medal className="h-6 w-6 text-yellow-500" />
            Top Performers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-50 font-mono">
                <tr>
                  <th className="px-6 py-3">Rank</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Time</th>
                  <th className="px-6 py-3 max-sm:hidden">Age</th>
                  <th className="px-6 py-3 max-sm:hidden">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPerformances.map((performance, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium flex">
                      {index + 1}
                      {index === 0 && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <span className="ml-2 text-yellow-500">🏆</span>
                            </TooltipTrigger>
                            <TooltipContent className="text-blue-500 bg-blue-100">
                              <p className="text-blue-500 bg-blue-100">
                                National Record Holder
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      {index === 1 && (
                        <span className="ml-2 text-gray-400">🥈</span>
                      )}
                      {index === 2 && (
                        <span className="ml-2 text-amber-600">🥉</span>
                      )}
                    </td>
                    <td className="px-6 py-4">{performance.player.name}</td>

                    <td className="px-6 py-4 tabular-nums">
                      {formatTime(performance.timeInSeconds)}
                    </td>
                    <td className="px-6 py-4 max-sm:hidden">
                      {performance.player.ageCategory}
                    </td>
                    <td className="px-6 py-4 max-sm:hidden">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CubeLeaderboardClient;
