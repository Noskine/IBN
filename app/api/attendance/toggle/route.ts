// app/api/attendance/toggle/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { peopleId } = await req.json();

    const person = await prisma.people.findUnique({
      where: { id: peopleId },
    });

    if (!person) {
      return NextResponse.json({ error: "Pessoa não encontrada" }, { status: 404 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await prisma.attendance.findFirst({
      where: {
        peopleId,
        entryAt: { gte: today },
        exitAt: null,
      },
    });

    if (existing) {
      const updated = await prisma.attendance.update({
        where: { id: existing.id },
        data: { exitAt: new Date() },
        include: { people: true },
      });

      return NextResponse.json({
        message: "Saída registrada",
        action: "exit",
        data: updated,
        name: updated.people.name,
      });
    } else {
      const created = await prisma.attendance.create({
        data: { peopleId },
        include: { people: true },
      });

      return NextResponse.json({
        message: "Entrada registrada",
        action: "entry",
        data: created,
        name: created.people.name,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
