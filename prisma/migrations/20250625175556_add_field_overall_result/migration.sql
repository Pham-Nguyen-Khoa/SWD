/*
  Warnings:

  - Added the required column `overallResult` to the `HealthCheckupResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HealthCheckupResult" ADD COLUMN     "overallResult" "InjectionResult" NOT NULL;
