-- CreateEnum
CREATE TYPE "MedicineRequestStatus" AS ENUM ('PENDING', 'CONFIRMED_RECEIVED', 'CONFIRMED_NOT_RECEIVED', 'COMPLETED', 'REJECTED');

-- CreateTable
CREATE TABLE "MedicineRequest" (
    "id" SERIAL NOT NULL,
    "studentID" INTEGER NOT NULL,
    "parentID" INTEGER NOT NULL,
    "note" TEXT,
    "status" "MedicineRequestStatus" NOT NULL DEFAULT 'PENDING',
    "receivedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "confirmedAt" TIMESTAMPTZ(3),
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMPTZ(3),
    "updatedBy" INTEGER,

    CONSTRAINT "MedicineRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicineRequestItem" (
    "id" SERIAL NOT NULL,
    "requestID" INTEGER NOT NULL,
    "medicineName" TEXT NOT NULL,
    "quantitySent" INTEGER NOT NULL,
    "dosage" TEXT NOT NULL,
    "usageTimes" TEXT[],
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicineRequestItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MedicineRequest" ADD CONSTRAINT "MedicineRequest_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineRequest" ADD CONSTRAINT "MedicineRequest_parentID_fkey" FOREIGN KEY ("parentID") REFERENCES "Parent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineRequestItem" ADD CONSTRAINT "MedicineRequestItem_requestID_fkey" FOREIGN KEY ("requestID") REFERENCES "MedicineRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
