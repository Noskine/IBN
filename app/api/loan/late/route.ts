import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const lateLoans = await prisma.loan.findMany({
    where: { status: "LATE" },
    include: {
      people: true,
      book: true,
    },
  });

  return NextResponse.json(lateLoans);
}
