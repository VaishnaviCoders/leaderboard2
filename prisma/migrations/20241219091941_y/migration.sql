-- CreateEnum
CREATE TYPE "AgeCategory" AS ENUM ('FOUR_TO_SIX', 'SIX_TO_EIGHT', 'EIGHT_TO_TEN', 'TEN_TO_TWELVE', 'TWELVE_TO_FOURTEEN', 'FOURTEEN_PLUS');

-- CreateEnum
CREATE TYPE "CubeType" AS ENUM ('CUBE_3X3', 'CUBE_2X2', 'PYRAMINX', 'CUBE_RELAY', 'MIRROR', 'SKEWB');

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ageCategory" "AgeCategory" NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Performance" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "cubeType" "CubeType" NOT NULL,
    "timeInSeconds" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Performance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactForm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Performance_playerId_cubeType_key" ON "Performance"("playerId", "cubeType");

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
