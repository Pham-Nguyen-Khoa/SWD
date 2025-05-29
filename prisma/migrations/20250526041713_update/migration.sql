/*
  Warnings:

  - You are about to drop the column `detailchronicDiseases` on the `HealthProfile` table. All the data in the column will be lost.
  - You are about to drop the column `methodchronicDiseases` on the `HealthProfile` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `HealthVaccination` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HealthProfile" DROP COLUMN "detailchronicDiseases",
DROP COLUMN "methodchronicDiseases",
ADD COLUMN     "detailChronicDiseases" TEXT,
ADD COLUMN     "methodChronicDiseases" TEXT;

-- AlterTable
ALTER TABLE "HealthVaccination" DROP COLUMN "status";
