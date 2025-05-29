/*
  Warnings:

  - You are about to drop the column `isConfirmed` on the `VaccinationEvent` table. All the data in the column will be lost.
  - You are about to drop the column `eventID` on the `VaccinationTarget` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `VaccinationTarget` table. All the data in the column will be lost.
  - Added the required column `academicYearID` to the `VaccinationEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetType` to the `VaccinationTarget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vaccinationEventID` to the `VaccinationTarget` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('DRAFT', 'CONFIRMED', 'CANCELED');

-- DropForeignKey
ALTER TABLE "VaccinationTarget" DROP CONSTRAINT "VaccinationTarget_eventID_fkey";

-- AlterTable
ALTER TABLE "VaccinationEvent" DROP COLUMN "isConfirmed",
ADD COLUMN     "academicYearID" INTEGER NOT NULL,
ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "VaccinationTarget" DROP COLUMN "eventID",
DROP COLUMN "type",
ADD COLUMN     "targetType" "TargetType" NOT NULL,
ADD COLUMN     "vaccinationEventID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "VaccinationEvent" ADD CONSTRAINT "VaccinationEvent_academicYearID_fkey" FOREIGN KEY ("academicYearID") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VaccinationTarget" ADD CONSTRAINT "VaccinationTarget_vaccinationEventID_fkey" FOREIGN KEY ("vaccinationEventID") REFERENCES "VaccinationEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
