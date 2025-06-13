-- CreateTable
CREATE TABLE "VaccineEventStock" (
    "id" TEXT NOT NULL,
    "vaccinationEventID" INTEGER NOT NULL,
    "medicineID" INTEGER,
    "medicineSupplyID" INTEGER,
    "quantityPlanned" INTEGER NOT NULL,
    "quantityUsed" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,

    CONSTRAINT "VaccineEventStock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VaccineEventStock" ADD CONSTRAINT "VaccineEventStock_vaccinationEventID_fkey" FOREIGN KEY ("vaccinationEventID") REFERENCES "VaccinationEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VaccineEventStock" ADD CONSTRAINT "VaccineEventStock_medicineID_fkey" FOREIGN KEY ("medicineID") REFERENCES "Medicine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VaccineEventStock" ADD CONSTRAINT "VaccineEventStock_medicineSupplyID_fkey" FOREIGN KEY ("medicineSupplyID") REFERENCES "MedicineSupply"("id") ON DELETE SET NULL ON UPDATE CASCADE;
