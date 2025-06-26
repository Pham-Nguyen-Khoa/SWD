-- CreateEnum
CREATE TYPE "HealthInputType" AS ENUM ('NUMBER', 'TEXT', 'BOOLEAN');

-- AlterTable
ALTER TABLE "HealthCheckupContent" ADD COLUMN     "inputType" "HealthInputType" NOT NULL DEFAULT 'TEXT';
