-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "classifyID" INTEGER;

-- CreateTable
CREATE TABLE "MedicineClassify" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MedicineClassify_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MedicineClassify_name_key" ON "MedicineClassify"("name");

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_classifyID_fkey" FOREIGN KEY ("classifyID") REFERENCES "MedicineClassify"("id") ON DELETE SET NULL ON UPDATE CASCADE;
