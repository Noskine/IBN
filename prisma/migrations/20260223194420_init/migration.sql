-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('ACTIVE', 'RETURNED', 'LOST', 'LATE');

-- CreateEnum
CREATE TYPE "IsUserAdm" AS ENUM ('Yes', 'No');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isAdm" "IsUserAdm" NOT NULL DEFAULT 'No',
    "loanId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL,
    "peopleId" TEXT NOT NULL,
    "entryAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observation" TEXT,
    "exitAt" TIMESTAMP(3),

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyObservation" (
    "id" TEXT NOT NULL,
    "peopleId" TEXT NOT NULL,
    "weekStart" TIMESTAMP(3) NOT NULL,
    "observation" TEXT NOT NULL,

    CONSTRAINT "WeeklyObservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "People" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "People_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "barcode" TEXT,
    "categoryId" TEXT,
    "totalCopies" INTEGER NOT NULL DEFAULT 0,
    "availableCopies" INTEGER NOT NULL DEFAULT 0,
    "publisher" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan" (
    "id" TEXT NOT NULL,
    "peopleId" TEXT NOT NULL,
    "bookId" TEXT,
    "loanDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3),
    "status" "LoanStatus" NOT NULL DEFAULT 'ACTIVE',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "People"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyObservation" ADD CONSTRAINT "WeeklyObservation_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "People"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "People"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
