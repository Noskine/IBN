// /app/api/attendance/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { peopleId } = await req.json();

  const attendance = await prisma.at.create({
    data: {
      peopleId,
    },
  });

  return NextResponse.json(attendance);
}
