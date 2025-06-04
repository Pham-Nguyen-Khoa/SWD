/*
  Warnings:

  - You are about to drop the column `respondedAt` on the `VaccinationResult` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VaccinationResult" DROP COLUMN "respondedAt",
ADD COLUMN     "isSend" BOOLEAN NOT NULL DEFAULT false;
