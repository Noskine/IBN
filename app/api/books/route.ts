import { prisma } from "@/lib/prisma";
import { ExpectedError } from "@/lib/expected-error";
import { Status } from "@/types/status";

import { NextRequest, NextResponse } from "next/server";

// 🔹 GET - listar livros
export async function GET() {
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

    if (!books.length) {
      throw new ExpectedError({
        message: "Livros não encontrados!",
        status: Status.NotFound,
      });
    }

    return NextResponse.json(books, {
      status: Status.OK,
    });
  } catch (err) {
    if (err instanceof ExpectedError) {
      return NextResponse.json(err.json(), {
        status: err.getStatus(),
      });
    }

    console.error("GET /book error:", err);

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// 🔹 POST - criar livro
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { title, author, publisher, categoryId, quantity } = body;

    // 🔸 Validação
    if (!title || !author || !categoryId || !quantity) {
      return NextResponse.json(
        { error: "Dados obrigatórios faltando." },
        { status: 400 }
      );
    }

    if (typeof quantity !== "number" || quantity <= 0) {
      return NextResponse.json(
        { error: "Quantidade inválida." },
        { status: 400 }
      );
    }

    // 🔸 Verifica se categoria existe
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Categoria não encontrada." },
        { status: 404 }
      );
    }

    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        publisher: publisher || null,
        totalCopies: quantity,
        availableCopies: quantity,
        category: {
          connect: { id: categoryId },
        },
      },
    });

    return NextResponse.json(newBook, {
      status: 201,
    });
  } catch (err) {
    if (err instanceof ExpectedError) {
      return NextResponse.json(err.json(), {
        status: err.getStatus(),
      });
    }

    console.error("POST /book error:", err);

    return NextResponse.json(
      { error: "Erro ao criar livro" },
      { status: 500 }
    );
  }
}