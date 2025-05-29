-- CreateEnum
CREATE TYPE "TargetType" AS ENUM ('SCHOOL', 'GRADE', 'CLASS');

-- CreateTable
CREATE TABLE "VaccinationEvent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VaccinationEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VaccinationTarget" (
    "id" SERIAL NOT NULL,
    "eventID" INTEGER NOT NULL,
    "type" "TargetType" NOT NULL,
    "targetID" INTEGER NOT NULL,

    CONSTRAINT "VaccinationTarget_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VaccinationTarget" ADD CONSTRAINT "VaccinationTarget_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "VaccinationEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
