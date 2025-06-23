-- AlterTable
ALTER TABLE "MedicineRequestItem" ADD COLUMN     "isLowStockNotified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "quantityRemaining" INTEGER;
