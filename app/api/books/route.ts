import { prisma } from "@/lib/prisma";
import { ExpectedError } from "@/lib/expected-error";
import { Status } from "@/types/status";

import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const books = await prisma.book.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        publisher: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        totalCopies: true,
        availableCopies: true,
        barcode: true,
      },
    });

    if (books.length <= 0)
      throw new ExpectedError({
        message: "Livros não encontrados!",
        status: Status.NotFound,
      });

    return NextResponse.json(books, {
      status: Status.OK,
    });
  } catch (err) {
    if (err instanceof ExpectedError) {
      return NextResponse.json(err.json(), {
        status: err.getStatus(),
      });
    }
  }
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, author, publisher, categoryId, quantity } = body;

    // Validação básica
    if (!title || !author || !categoryId || !quantity) {
      return NextResponse.json(
        { error: "Dados obrigatórios faltando." },
        { status: 400 }
      );
    }

    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        publisher: publisher || null,
        availableCopies: quantity,
        totalCopies: quantity,
        category: {
          connect: { id: categoryId },
        },
      },
    });

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar livro:", error);
    return NextResponse.json(
      { error: "Erro interno ao criar livro." },
      { status: 500 }
    );
  }
}
