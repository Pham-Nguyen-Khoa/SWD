-- CreateTable
CREATE TABLE "Treatment" (
    "id" SERIAL NOT NULL,
    "medicalEventID" INTEGER NOT NULL,
    "medicineID" INTEGER NOT NULL,
    "medicineSupplyID" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "dosage" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMPTZ(3),
    "updatedBy" INTEGER,

    CONSTRAINT "Treatment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_medicalEventID_fkey" FOREIGN KEY ("medicalEventID") REFERENCES "MedicalEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_medicineID_fkey" FOREIGN KEY ("medicineID") REFERENCES "Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_medicineSupplyID_fkey" FOREIGN KEY ("medicineSupplyID") REFERENCES "MedicineSupply"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
