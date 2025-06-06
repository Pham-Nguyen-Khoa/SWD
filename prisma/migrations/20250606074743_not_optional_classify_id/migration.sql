/*
  Warnings:

  - Made the column `classifyID` on table `Medicine` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Medicine" DROP CONSTRAINT "Medicine_classifyID_fkey";

-- AlterTable
ALTER TABLE "Medicine" ALTER COLUMN "classifyID" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_classifyID_fkey" FOREIGN KEY ("classifyID") REFERENCES "MedicineClassify"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
