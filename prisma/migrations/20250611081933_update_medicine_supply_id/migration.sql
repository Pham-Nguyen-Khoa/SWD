/*
  Warnings:

  - You are about to drop the column `medicalSupplyID` on the `RequestItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "RequestItem" DROP CONSTRAINT "RequestItem_medicalSupplyID_fkey";

-- AlterTable
ALTER TABLE "RequestItem" DROP COLUMN "medicalSupplyID",
ADD COLUMN     "medicineSupplyID" INTEGER;

-- AddForeignKey
ALTER TABLE "RequestItem" ADD CONSTRAINT "RequestItem_medicineSupplyID_fkey" FOREIGN KEY ("medicineSupplyID") REFERENCES "MedicineSupply"("id") ON DELETE SET NULL ON UPDATE CASCADE;
