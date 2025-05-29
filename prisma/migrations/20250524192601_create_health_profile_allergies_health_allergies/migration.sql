-- CreateTable
CREATE TABLE "HealthProfile" (
    "id" SERIAL NOT NULL,
    "customAllergies" TEXT,
    "hasNoAllergies" BOOLEAN NOT NULL DEFAULT false,
    "studentID" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMPTZ(3),
    "updatedBy" INTEGER,

    CONSTRAINT "HealthProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Allergies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Allergies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthAllergies" (
    "id" SERIAL NOT NULL,
    "healthProfileID" INTEGER NOT NULL,
    "allergiesID" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),

    CONSTRAINT "HealthAllergies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HealthProfile_studentID_key" ON "HealthProfile"("studentID");

-- CreateIndex
CREATE UNIQUE INDEX "Allergies_name_key" ON "Allergies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "HealthAllergies_healthProfileID_allergiesID_key" ON "HealthAllergies"("healthProfileID", "allergiesID");

-- AddForeignKey
ALTER TABLE "HealthProfile" ADD CONSTRAINT "HealthProfile_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthAllergies" ADD CONSTRAINT "HealthAllergies_healthProfileID_fkey" FOREIGN KEY ("healthProfileID") REFERENCES "HealthProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthAllergies" ADD CONSTRAINT "HealthAllergies_allergiesID_fkey" FOREIGN KEY ("allergiesID") REFERENCES "Allergies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
