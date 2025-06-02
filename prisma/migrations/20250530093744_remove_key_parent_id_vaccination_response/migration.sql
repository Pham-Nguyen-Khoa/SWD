/*
  Warnings:

  - You are about to drop the column `parentID` on the `VaccinationResponse` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "VaccinationResponse" DROP CONSTRAINT "VaccinationResponse_parentID_fkey";

-- AlterTable
ALTER TABLE "VaccinationResponse" DROP COLUMN "parentID";
