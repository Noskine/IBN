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

    const now = new Date();

    // Buscar o último registro SEM saída
    const lastOpenAttendance = await prisma.attendance.findFirst({
      where: {
        peopleId,
        exitAt: null,
      },
      orderBy: {
        entryAt: "desc",
      },
    });

    if (
      lastOpenAttendance &&
      new Date(lastOpenAttendance.entryAt).toDateString() === now.toDateString()
    ) {
      // Se for do mesmo dia, registra saída
      const updated = await prisma.attendance.update({
        where: { id: lastOpenAttendance.id },
        data: { exitAt: now },
        include: { people: true },
      });

      return NextResponse.json({
        message: "Saída registrada",
        action: "exit",
        data: updated,
        name: updated.people.name,
      });
    } else {
      // Se não há registro ou é de outro dia, cria nova entrada
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
