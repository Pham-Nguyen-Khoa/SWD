/*
  Warnings:

  - A unique constraint covering the columns `[medicalEventID]` on the table `HospitalTransfer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "HospitalTransfer_medicalEventID_key" ON "HospitalTransfer"("medicalEventID");
