-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "roleID" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMPTZ(3),
    "updatedBy" INTEGER,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "student_code" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "class" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMPTZ(3),
    "updatedBy" INTEGER,
    "accountID" INTEGER NOT NULL,
    "parentId" INTEGER,
    "parentInfoID" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentClassAssignment" (
    "id" SERIAL NOT NULL,
    "studentID" INTEGER NOT NULL,
    "academicYearID" INTEGER NOT NULL,
    "classID" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),

    CONSTRAINT "StudentClassAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicYear" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMPTZ(3),
    "updatedBy" INTEGER,

    CONSTRAINT "AcademicYear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParentInfo" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isRegistered" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,

    CONSTRAINT "ParentInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parent" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "accountID" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMPTZ(3),
    "updatedBy" INTEGER,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Student_student_code_key" ON "Student"("student_code");

-- CreateIndex
CREATE UNIQUE INDEX "Student_accountID_key" ON "Student"("accountID");

-- CreateIndex
CREATE UNIQUE INDEX "StudentClassAssignment_studentID_academicYearID_key" ON "StudentClassAssignment"("studentID", "academicYearID");

-- CreateIndex
CREATE UNIQUE INDEX "AcademicYear_name_key" ON "AcademicYear"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ParentInfo_email_key" ON "ParentInfo"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_email_key" ON "Parent"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_accountID_key" ON "Parent"("accountID");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_roleID_fkey" FOREIGN KEY ("roleID") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_accountID_fkey" FOREIGN KEY ("accountID") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_parentInfoID_fkey" FOREIGN KEY ("parentInfoID") REFERENCES "ParentInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentClassAssignment" ADD CONSTRAINT "StudentClassAssignment_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentClassAssignment" ADD CONSTRAINT "StudentClassAssignment_academicYearID_fkey" FOREIGN KEY ("academicYearID") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentClassAssignment" ADD CONSTRAINT "StudentClassAssignment_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_accountID_fkey" FOREIGN KEY ("accountID") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
