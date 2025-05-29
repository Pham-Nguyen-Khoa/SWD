-- CreateTable
CREATE TABLE "HealthVaccination" (
    "id" SERIAL NOT NULL,
    "healthProfileID" INTEGER NOT NULL,
    "vaccinationID" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),

    CONSTRAINT "HealthVaccination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vaccination" (
    "id" SERIAL NOT NULL,
    "healthProfileID" INTEGER NOT NULL,
    "vaccineName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vaccination_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HealthVaccination_healthProfileID_vaccinationID_key" ON "HealthVaccination"("healthProfileID", "vaccinationID");

-- AddForeignKey
ALTER TABLE "HealthVaccination" ADD CONSTRAINT "HealthVaccination_healthProfileID_fkey" FOREIGN KEY ("healthProfileID") REFERENCES "HealthProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthVaccination" ADD CONSTRAINT "HealthVaccination_vaccinationID_fkey" FOREIGN KEY ("vaccinationID") REFERENCES "Vaccination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
