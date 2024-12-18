import { motion } from 'framer-motion';
import { CuboidIcon as Cube } from 'lucide-react';
import React from 'react';

export default function HeaderSection() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-500 via-blue-500 to-blue-600 px-6 py-12 shadow-xl">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
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
      </div>

      {/* Content */}
      <div className="relative">
        <div className="flex items-center justify-center space-x-3">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Cube className="h-10 w-10 text-white/90" />
          </motion.div>
          <h1 className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            Rsai Cube Dec-2024
          </h1>
        </div>

        <h2 className="mt-4 text-center text-3xl font-semibold text-white/90">
          Competition Leaderboard
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-white/80">
          Explore the top performers in the Rsai Cube Competition across various
          age categories and cube types.
        </p>
      </div>
    </div>
  );
}
