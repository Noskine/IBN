-- CreateTable
CREATE TABLE "WeeklyObservation" (
    "id" TEXT NOT NULL,
    "peopleId" TEXT NOT NULL,
    "weekStart" TIMESTAMP(3) NOT NULL,
    "observation" TEXT NOT NULL,

    CONSTRAINT "WeeklyObservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WeeklyObservation" ADD CONSTRAINT "WeeklyObservation_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "People"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
