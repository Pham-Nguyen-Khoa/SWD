-- AlterTable
ALTER TABLE "HealthProfile" ADD COLUMN     "customchronicDiseases" TEXT,
ADD COLUMN     "hasNochronicDiseases" BOOLEAN NOT NULL DEFAULT false;
