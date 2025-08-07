import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { attendanceId, observation } = await req.json();

    const updated = await prisma.attendance.update({
      where: { id: attendanceId },
      //@ts-expect-error
      data: { observation },
    });

    return NextResponse.json({ message: "Observação salva", data: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao salvar observação" }, { status: 500 });
  }
}
