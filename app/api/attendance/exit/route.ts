// /app/api/attendance/exit/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { attendanceId } = await req.json();

  const updated = await prisma.attendance.update({
    where: { id: attendanceId },
    data: { exitAt: new Date() },
  });

  return NextResponse.json(updated);
}
