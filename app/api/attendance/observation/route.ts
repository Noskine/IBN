import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { startOfWeek } from "date-fns";

export async function POST(req: Request) {
  try {
    const { peopleId, observation } = await req.json();

    // calcula o início da semana (segunda-feira)
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

    // verifica se já existe uma observação nessa semana
    const existing = await prisma.weeklyObservation.findFirst({
      where: { id: peopleId, weekStart },
    });

    let result;
    if (existing) {
      result = await prisma.weeklyObservation.update({
        where: { id: existing.id },
        data: { observations: observation },
      });
    } else {
      result = await prisma.weeklyObservation.create({
        data: { id:peopleId , weekStart, observations: observation },
      });
    }

    return NextResponse.json({ message: "Observação salva", data: result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao salvar observação" }, { status: 500 });
  }
}
