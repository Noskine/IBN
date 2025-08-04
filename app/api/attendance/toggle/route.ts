// app/api/attendance/toggle/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { peopleId } = await req.json();

  // verifica se há presença ativa sem saída
  const existing = await prisma.attendance.findFirst({
    where: { peopleId, exitAt: null },
    orderBy: { entryAt: "desc" },
    include: { people: true },
  });

  if (existing) {
    // registrar saída
    const updated = await prisma.attendance.update({
      where: { id: existing.id },
      data: { exitAt: new Date() },
    });

    return NextResponse.json({ action: "exit", name: existing.people.name });
  } else {
    // registrar entrada
    const attendance = await prisma.attendance.create({
      data: { peopleId },
      include: { people: true },
    });

    return NextResponse.json({ action: "entry", name: attendance.people.name });
  }
}
