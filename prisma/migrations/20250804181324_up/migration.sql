-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL,
    "peopleId" TEXT NOT NULL,
    "entryAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exitAt" TIMESTAMP(3),

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "People"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
