/*
  Warnings:

  - A unique constraint covering the columns `[vaccinationEventID,studentID]` on the table `VaccinationResult` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VaccinationResult_vaccinationEventID_studentID_key" ON "VaccinationResult"("vaccinationEventID", "studentID");
