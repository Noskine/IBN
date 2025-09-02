import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { startOfWeek } from "date-fns";

export async function POST(req: Request) {
  try {
    const { peopleId, observation } = await req.json();

    // Calcula o início da semana (segunda-feira)
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

    // Verifica se já existe uma observação para a pessoa nesta semana
    const existing = await prisma.weeklyObservation.findFirst({
      where: {
        peopleId, // Garante que estamos buscando pela pessoa
        weekStart: {
          gte: weekStart,  // Garantir que a comparação seja com a data de início da semana
          lt: new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000) // Considera a semana completa (7 dias)
        }
      },
    });

    let result;
    if (existing) {
      // Se já existe uma observação, atualiza
      result = await prisma.weeklyObservation.update({
        where: { id: existing.id },
        data: { observation },
      });
    } else {
      // Se não existe, cria uma nova observação
      result = await prisma.weeklyObservation.create({
        data: {
          people: {
            connect: { id: peopleId }, // Conecta a pessoa com o id correto
          },
          weekStart,
          observation,
        },
      });
    }

    // Retorna a resposta com a mensagem e os dados
    return NextResponse.json({ message: "Observação salva", data: result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao salvar observação" }, { status: 500 });
  }
}
