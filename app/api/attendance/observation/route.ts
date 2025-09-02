import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { startOfWeek } from "date-fns";

export async function POST(req: Request) {
  try {
    // Extrair o corpo da requisição
    const { peopleId, observation } = await req.json();
    console.log(peopleId, observation)

    // Verificação de dados obrigatórios
    if (!peopleId || !observation) {
      return NextResponse.json(
        { error: "peopleId e observation são obrigatórios" },
        { status: 400 }
      );
    }

    // Verifique se a pessoa existe no banco
    const personExists = await prisma.people.findUnique({
      where: { id: peopleId },
    });

    if (!personExists) {
      return NextResponse.json(
        { error: "Pessoa não encontrada no sistema" },
        { status: 404 }
      );
    }

    // Calcula o início da semana (segunda-feira)
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

    // Verifica se já existe uma observação para a pessoa nesta semana
    const existingObservation = await prisma.weeklyObservation.findFirst({
      where: {
        peopleId,
        weekStart: {
          gte: weekStart, // Garantir que estamos comparando a data de início da semana
          lt: new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000), // A semana vai até 7 dias depois do início
        },
      },
    });

    let result;
    if (existingObservation) {
      // Se já existe uma observação, atualiza
      result = await prisma.weeklyObservation.update({
        where: { id: existingObservation.id },
        data: {
          observation: `${existingObservation.observation} ... ${observation}`, // Concatenar a nova observação
        },
      });
    } else {
      // Se não existe, cria uma nova observação
      result = await prisma.weeklyObservation.create({
        data: {
          peopleId, // Conectar com a pessoa correta
          weekStart,
          observation,
        },
      });
    }

    // Retorna a resposta com a mensagem e os dados
    return NextResponse.json({ message: "Observação salva", data: result }, 
      {status: 200}
    );
  } catch (err) {
    console.error("Erro ao salvar a observação:", err);
    return NextResponse.json(
      { error: "Erro interno ao salvar a observação" },
      { status: 500 }
    );
  }
}
