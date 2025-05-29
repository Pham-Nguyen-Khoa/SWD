/*
  Warnings:

  - You are about to drop the column `customAllergies` on the `HealthProfile` table. All the data in the column will be lost.
  - You are about to drop the column `customchronicDiseases` on the `HealthProfile` table. All the data in the column will be lost.
  - You are about to drop the column `hearing` on the `HealthProfile` table. All the data in the column will be lost.
  - You are about to drop the column `physicalCondition` on the `HealthProfile` table. All the data in the column will be lost.
  - You are about to drop the column `vision` on the `HealthProfile` table. All the data in the column will be lost.
  - Added the required column `bloodGroup` to the `HealthProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `HealthProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `HealthProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HealthProfile" DROP COLUMN "customAllergies",
DROP COLUMN "customchronicDiseases",
DROP COLUMN "hearing",
DROP COLUMN "physicalCondition",
DROP COLUMN "vision",
ADD COLUMN     "DetailSideEffect" TEXT,
ADD COLUMN     "bloodGroup" TEXT NOT NULL,
ADD COLUMN     "detailAllergies" TEXT,
ADD COLUMN     "detailchronicDiseases" TEXT,
ADD COLUMN     "hearingAid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hearingLeft" TEXT,
ADD COLUMN     "hearingRight" TEXT,
ADD COLUMN     "height" TEXT NOT NULL,
ADD COLUMN     "methodAllergies" TEXT,
ADD COLUMN     "methodchronicDiseases" TEXT,
ADD COLUMN     "noteHearing" TEXT,
ADD COLUMN     "noteVision" TEXT,
ADD COLUMN     "sideEffect" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "vaccinationHistory" TEXT,
ADD COLUMN     "visionLeft" TEXT,
ADD COLUMN     "visionRight" TEXT,
ADD COLUMN     "wearGlasses" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "weight" TEXT NOT NULL;
