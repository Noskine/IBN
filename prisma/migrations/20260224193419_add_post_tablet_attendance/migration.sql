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

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "People"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyObservation" ADD CONSTRAINT "WeeklyObservation_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "People"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
