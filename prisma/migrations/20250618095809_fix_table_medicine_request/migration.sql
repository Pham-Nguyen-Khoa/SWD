/*
  Warnings:

  - You are about to drop the column `dosage` on the `MedicineRequest` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `MedicineRequest` table. All the data in the column will be lost.
  - You are about to drop the column `medicineName` on the `MedicineRequest` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `MedicineRequest` table. All the data in the column will be lost.
  - You are about to drop the column `usageTimes` on the `MedicineRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MedicineRequest" DROP COLUMN "dosage",
DROP COLUMN "endDate",
DROP COLUMN "medicineName",
DROP COLUMN "startDate",
DROP COLUMN "usageTimes";

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
ALTER TABLE "MedicineRequestItem" ADD CONSTRAINT "MedicineRequestItem_requestID_fkey" FOREIGN KEY ("requestID") REFERENCES "MedicineRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
