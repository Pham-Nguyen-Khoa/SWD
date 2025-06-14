-- CreateEnum
CREATE TYPE "MedicalEventStatus" AS ENUM ('PENDING', 'PROCESSING', 'HOSPITALIZED', 'HOSPITALDISCHARGE', 'COMPLETED');

-- CreateEnum
CREATE TYPE "MedicalEventSeverity" AS ENUM ('NORMAL', 'HOSPITAL');

-- CreateTable
CREATE TABLE "MedicalEvent" (
    "id" SERIAL NOT NULL,
    "studentID" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "MedicalEventStatus" NOT NULL DEFAULT 'PENDING',
    "severity" "MedicalEventSeverity" NOT NULL DEFAULT 'NORMAL',
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMPTZ(3),
    "updatedBy" INTEGER,

    CONSTRAINT "MedicalEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HospitalTransfer" (
    "id" SERIAL NOT NULL,
    "medicalEventID" INTEGER NOT NULL,
    "hospitalName" TEXT NOT NULL,
    "transferredAt" TIMESTAMPTZ(3) NOT NULL,
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMPTZ(3),
    "updatedBy" INTEGER,

    CONSTRAINT "HospitalTransfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MedicalEvent" ADD CONSTRAINT "MedicalEvent_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalTransfer" ADD CONSTRAINT "HospitalTransfer_medicalEventID_fkey" FOREIGN KEY ("medicalEventID") REFERENCES "MedicalEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
