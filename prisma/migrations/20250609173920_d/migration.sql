/*
  Warnings:

  - Added the required column `image` to the `MedicineSupply` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "UrgencyLevel" AS ENUM ('NORMAL', 'URGENT');

-- AlterTable
ALTER TABLE "MedicineSupply" ADD COLUMN     "category" TEXT,
ADD COLUMN     "image" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MedicineSupplyRequest" (
    "id" SERIAL NOT NULL,
    "note" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,

    CONSTRAINT "MedicineSupplyRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestItem" (
    "id" SERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,
    "medicineID" INTEGER,
    "medicalSupplyID" INTEGER,
    "quantity" INTEGER NOT NULL,
    "urgency" "UrgencyLevel" NOT NULL DEFAULT 'NORMAL',
    "note" TEXT,

    CONSTRAINT "RequestItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RequestItem" ADD CONSTRAINT "RequestItem_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "MedicineSupplyRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestItem" ADD CONSTRAINT "RequestItem_medicineID_fkey" FOREIGN KEY ("medicineID") REFERENCES "Medicine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestItem" ADD CONSTRAINT "RequestItem_medicalSupplyID_fkey" FOREIGN KEY ("medicalSupplyID") REFERENCES "MedicineSupply"("id") ON DELETE SET NULL ON UPDATE CASCADE;
