/*
  Warnings:

  - Made the column `student_code` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "student_code" SET NOT NULL;
