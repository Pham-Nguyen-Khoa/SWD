-- DropForeignKey
ALTER TABLE "Treatment" DROP CONSTRAINT "Treatment_medicineID_fkey";

-- DropForeignKey
ALTER TABLE "Treatment" DROP CONSTRAINT "Treatment_medicineSupplyID_fkey";

-- AlterTable
ALTER TABLE "Treatment" ALTER COLUMN "medicineID" DROP NOT NULL,
ALTER COLUMN "medicineSupplyID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_medicineID_fkey" FOREIGN KEY ("medicineID") REFERENCES "Medicine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_medicineSupplyID_fkey" FOREIGN KEY ("medicineSupplyID") REFERENCES "MedicineSupply"("id") ON DELETE SET NULL ON UPDATE CASCADE;
