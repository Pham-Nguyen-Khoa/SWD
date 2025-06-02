-- CreateEnum
CREATE TYPE "InjectionResult" AS ENUM ('GOOD', 'BAD');

-- CreateEnum
CREATE TYPE "InjectionStatus" AS ENUM ('SUCCESS', 'SKIPPED');

-- CreateTable
CREATE TABLE "VaccinationResult" (
    "id" SERIAL NOT NULL,
    "vaccinationEventID" INTEGER NOT NULL,
    "studentID" INTEGER NOT NULL,
    "status" "InjectionStatus" NOT NULL,
    "result" "InjectionResult" NOT NULL,
    "note" TEXT,
    "respondedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMPTZ(3),
    "updatedBy" INTEGER,

    CONSTRAINT "VaccinationResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VaccinationResult" ADD CONSTRAINT "VaccinationResult_vaccinationEventID_fkey" FOREIGN KEY ("vaccinationEventID") REFERENCES "VaccinationEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VaccinationResult" ADD CONSTRAINT "VaccinationResult_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
