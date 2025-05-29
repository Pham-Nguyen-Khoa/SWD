-- CreateTable
CREATE TABLE "ChronicDiseases" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ChronicDiseases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthChronicDiseases" (
    "id" SERIAL NOT NULL,
    "healthProfileID" INTEGER NOT NULL,
    "chronicDiseasesID" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),

    CONSTRAINT "HealthChronicDiseases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChronicDiseases_name_key" ON "ChronicDiseases"("name");

-- CreateIndex
CREATE UNIQUE INDEX "HealthChronicDiseases_healthProfileID_chronicDiseasesID_key" ON "HealthChronicDiseases"("healthProfileID", "chronicDiseasesID");

-- AddForeignKey
ALTER TABLE "HealthChronicDiseases" ADD CONSTRAINT "HealthChronicDiseases_healthProfileID_fkey" FOREIGN KEY ("healthProfileID") REFERENCES "HealthProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthChronicDiseases" ADD CONSTRAINT "HealthChronicDiseases_chronicDiseasesID_fkey" FOREIGN KEY ("chronicDiseasesID") REFERENCES "ChronicDiseases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
