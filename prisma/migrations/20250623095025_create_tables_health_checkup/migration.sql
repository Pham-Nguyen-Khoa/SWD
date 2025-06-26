-- CreateTable
CREATE TABLE "HealthCheckup" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'DRAFT',
    "customMailTitle" TEXT,
    "customMailBody" TEXT,
    "academicYearID" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMPTZ(3),
    "updatedBy" INTEGER,

    CONSTRAINT "HealthCheckup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthCheckupStock" (
    "id" SERIAL NOT NULL,
    "healthCheckUpID" INTEGER NOT NULL,
    "medicineID" INTEGER,
    "medicineSupplyID" INTEGER,
    "quantityPlanned" INTEGER NOT NULL,
    "quantityUsed" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,

    CONSTRAINT "HealthCheckupStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthCheckupTarget" (
    "id" SERIAL NOT NULL,
    "healthCheckUpID" INTEGER NOT NULL,
    "targetType" "TargetType" NOT NULL,
    "targetID" INTEGER NOT NULL,

    CONSTRAINT "HealthCheckupTarget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthCheckupResponse" (
    "id" SERIAL NOT NULL,
    "healthCheckUpID" INTEGER NOT NULL,
    "studentID" INTEGER NOT NULL,
    "status" "ResponseStatus" NOT NULL DEFAULT 'PENDING',
    "note" TEXT,
    "respondedAt" TIMESTAMP(3),

    CONSTRAINT "HealthCheckupResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthCheckupContent" (
    "id" SERIAL NOT NULL,
    "healthCheckUpID" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HealthCheckupContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthCheckupContentResult" (
    "id" SERIAL NOT NULL,
    "studentID" INTEGER NOT NULL,
    "contentID" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HealthCheckupContentResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthCheckupResult" (
    "id" SERIAL NOT NULL,
    "healthCheckUpID" INTEGER NOT NULL,
    "studentID" INTEGER NOT NULL,
    "status" "InjectionStatus" NOT NULL,
    "overallNotes" TEXT,
    "isSend" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMPTZ(3),
    "updatedBy" INTEGER,

    CONSTRAINT "HealthCheckupResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HealthCheckupContentResult_contentID_studentID_key" ON "HealthCheckupContentResult"("contentID", "studentID");

-- CreateIndex
CREATE UNIQUE INDEX "HealthCheckupResult_healthCheckUpID_studentID_key" ON "HealthCheckupResult"("healthCheckUpID", "studentID");

-- AddForeignKey
ALTER TABLE "HealthCheckup" ADD CONSTRAINT "HealthCheckup_academicYearID_fkey" FOREIGN KEY ("academicYearID") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthCheckupStock" ADD CONSTRAINT "HealthCheckupStock_healthCheckUpID_fkey" FOREIGN KEY ("healthCheckUpID") REFERENCES "HealthCheckup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthCheckupStock" ADD CONSTRAINT "HealthCheckupStock_medicineID_fkey" FOREIGN KEY ("medicineID") REFERENCES "Medicine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthCheckupStock" ADD CONSTRAINT "HealthCheckupStock_medicineSupplyID_fkey" FOREIGN KEY ("medicineSupplyID") REFERENCES "MedicineSupply"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthCheckupTarget" ADD CONSTRAINT "HealthCheckupTarget_healthCheckUpID_fkey" FOREIGN KEY ("healthCheckUpID") REFERENCES "HealthCheckup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthCheckupResponse" ADD CONSTRAINT "HealthCheckupResponse_healthCheckUpID_fkey" FOREIGN KEY ("healthCheckUpID") REFERENCES "HealthCheckup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthCheckupResponse" ADD CONSTRAINT "HealthCheckupResponse_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthCheckupContent" ADD CONSTRAINT "HealthCheckupContent_healthCheckUpID_fkey" FOREIGN KEY ("healthCheckUpID") REFERENCES "HealthCheckup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthCheckupContentResult" ADD CONSTRAINT "HealthCheckupContentResult_contentID_fkey" FOREIGN KEY ("contentID") REFERENCES "HealthCheckupContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthCheckupContentResult" ADD CONSTRAINT "HealthCheckupContentResult_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthCheckupResult" ADD CONSTRAINT "HealthCheckupResult_healthCheckUpID_fkey" FOREIGN KEY ("healthCheckUpID") REFERENCES "HealthCheckup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthCheckupResult" ADD CONSTRAINT "HealthCheckupResult_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
