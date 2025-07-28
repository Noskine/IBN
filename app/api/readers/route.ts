import { prisma } from "@/lib/prisma";
import { ExpectedError } from "@/lib/expected-error";
import { Status } from "@/types/status";

import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const loans = await prisma.people.findMany({
      select: {
        id: true,
        name: true,
        status: true,
        course: {
          select: {
            name: true,
            year: true,
          },
        },
      },
    });

    if (loans.length <= 0)
      throw new ExpectedError({
        message: "Consultas ou Emprestimos não encontrados!",
        status: Status.NotFound,
      });

    return NextResponse.json(loans);
  } catch (err) {
    if (err instanceof ExpectedError) {
      return NextResponse.json(err.json(), {
        status: err.getStatus(),
      });
    }
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name, status, courseId } = body;

    if (!name || !status || !courseId) {
      throw new ExpectedError({
        message: "Campos obrigatórios ausentes: name, status ou courseId.",
        status: Status.BadRequest,
      });
    }

    const newReader = await prisma.people.create({
      data: {
        name,
        status,
        courseId,
      },
    });

    return NextResponse.json(newReader, {
      status: Status.Created,
    });
  } catch (err) {
    if (err instanceof ExpectedError) {
      return NextResponse.json(err.json(), {
        status: err.getStatus(),
      });
    }

    console.error("Erro inesperado ao criar leitor:", err);
    return NextResponse.json(
      { message: "Erro interno ao criar leitor." },
      { status: 500 }
    );
  }
};

