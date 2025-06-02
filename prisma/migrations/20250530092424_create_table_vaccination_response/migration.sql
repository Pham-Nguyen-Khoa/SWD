/*
  Warnings:

  - Made the column `description` on table `VaccinationEvent` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ResponseStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- AlterTable
ALTER TABLE "VaccinationEvent" ALTER COLUMN "description" SET NOT NULL;

-- CreateTable
CREATE TABLE "VaccinationResponse" (
    "id" SERIAL NOT NULL,
    "vaccinationEventID" INTEGER NOT NULL,
    "studentID" INTEGER NOT NULL,
    "status" "ResponseStatus" NOT NULL DEFAULT 'PENDING',
    "note" TEXT,
    "respondedAt" TIMESTAMP(3),
    "parentID" INTEGER NOT NULL,

    CONSTRAINT "VaccinationResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VaccinationResponse" ADD CONSTRAINT "VaccinationResponse_vaccinationEventID_fkey" FOREIGN KEY ("vaccinationEventID") REFERENCES "VaccinationEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VaccinationResponse" ADD CONSTRAINT "VaccinationResponse_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VaccinationResponse" ADD CONSTRAINT "VaccinationResponse_parentID_fkey" FOREIGN KEY ("parentID") REFERENCES "Parent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
