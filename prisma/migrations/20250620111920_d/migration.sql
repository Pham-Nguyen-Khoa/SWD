/*
  Warnings:

  - Made the column `quantityRemaining` on table `MedicineRequestItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MedicineRequestItem" ALTER COLUMN "quantityRemaining" SET NOT NULL;
