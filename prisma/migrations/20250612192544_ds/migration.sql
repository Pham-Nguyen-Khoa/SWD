/*
  Warnings:

  - The primary key for the `VaccineEventStock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `VaccineEventStock` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "VaccineEventStock" DROP CONSTRAINT "VaccineEventStock_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "VaccineEventStock_pkey" PRIMARY KEY ("id");
