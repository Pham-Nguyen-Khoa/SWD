-- CreateEnum
CREATE TYPE "MedicineRequestStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'REJECTED');

-- CreateTable
CREATE TABLE "MedicineRequest" (
    "id" SERIAL NOT NULL,
    "studentID" INTEGER NOT NULL,
    "parentID" INTEGER NOT NULL,
    "medicineName" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "usageTimes" TEXT[],
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "status" "MedicineRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "confirmedAt" TIMESTAMPTZ(3),
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMPTZ(3),
    "updatedBy" INTEGER,

    CONSTRAINT "MedicineRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MedicineRequest" ADD CONSTRAINT "MedicineRequest_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineRequest" ADD CONSTRAINT "MedicineRequest_parentID_fkey" FOREIGN KEY ("parentID") REFERENCES "Parent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
