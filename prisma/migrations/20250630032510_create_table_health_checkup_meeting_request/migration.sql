-- CreateEnum
CREATE TYPE "MeetingStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- AlterTable
ALTER TABLE "HealthCheckupResult" ADD COLUMN     "isMeeting" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "HealthCheckupMeetingRequest" (
    "id" SERIAL NOT NULL,
    "healthCheckUpID" INTEGER NOT NULL,
    "studentID" INTEGER NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "MeetingStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HealthCheckupMeetingRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HealthCheckupMeetingRequest_healthCheckUpID_studentID_key" ON "HealthCheckupMeetingRequest"("healthCheckUpID", "studentID");

-- AddForeignKey
ALTER TABLE "HealthCheckupMeetingRequest" ADD CONSTRAINT "HealthCheckupMeetingRequest_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthCheckupMeetingRequest" ADD CONSTRAINT "HealthCheckupMeetingRequest_healthCheckUpID_fkey" FOREIGN KEY ("healthCheckUpID") REFERENCES "HealthCheckup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
