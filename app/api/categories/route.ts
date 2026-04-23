import { ExpectedError } from "@/lib/expected-error";
import { prisma } from "@/lib/prisma";
import { Status } from "@/types/status";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    console.log("Categorias encontradas:", categories);

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar categorias" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name } = body;

    if (!name)
      throw new ExpectedError({
        message: "Mal formatação da query!",
        status: Status.InternalServerError,
      });

    const categories = await prisma.category.create({
      data: {
        name: name,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar categorias" },
      { status: 500 }
    );
  }
}
