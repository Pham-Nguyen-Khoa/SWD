/*
  Warnings:

  - Added the required column `image` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "image" TEXT NOT NULL;
