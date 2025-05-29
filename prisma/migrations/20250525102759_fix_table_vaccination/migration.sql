/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Vaccination` table. All the data in the column will be lost.
  - You are about to drop the column `healthProfileID` on the `Vaccination` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Vaccination` table. All the data in the column will be lost.
  - You are about to drop the column `vaccineName` on the `Vaccination` table. All the data in the column will be lost.
  - Added the required column `name` to the `Vaccination` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vaccination" DROP COLUMN "createdAt",
DROP COLUMN "healthProfileID",
DROP COLUMN "updatedAt",
DROP COLUMN "vaccineName",
ADD COLUMN     "name" TEXT NOT NULL;
