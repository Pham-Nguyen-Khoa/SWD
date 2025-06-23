-- CreateTable
CREATE TABLE "MedicineLog" (
    "id" SERIAL NOT NULL,
    "medicineRequestItemID" INTEGER NOT NULL,
    "takenAt" TIMESTAMP(3) NOT NULL,
    "givenBy" INTEGER NOT NULL,
    "note" TEXT,

    CONSTRAINT "MedicineLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MedicineLog" ADD CONSTRAINT "MedicineLog_medicineRequestItemID_fkey" FOREIGN KEY ("medicineRequestItemID") REFERENCES "MedicineRequestItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
