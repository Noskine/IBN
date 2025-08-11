import { prisma } from "@/lib/prisma";
import { ExpectedError } from "@/lib/expected-error";
import { Status } from "@/types/status";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get("id");

    if (!id)
      throw new ExpectedError({
        message: "Mal formatação da query!",
        status: Status.InternalServerError,
      });

    const book = await prisma.book.findUnique({
      where: {
        id: id,
      },
      include: {
        category: true,
      },
    });

    if (!book)
      throw new ExpectedError({
        message: "Livro não encontrado!",
        status: Status.NotFound,
      });
    return NextResponse.json(book, {
      status: Status.OK,
    });
  } catch (err) {
    if (err instanceof ExpectedError) {
      console.log("entrou aqui");

      return NextResponse.json(err.json(), {
        status: err.getStatus(),
      });
    }
  }
}

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const body = await req.json();

    let book = searchParams.get("id");

    if (!book)
      throw new ExpectedError({
        message: "Mal formatação da query!",
        status: Status.InternalServerError,
      });

    const { id } = body;

    // Validação básica
    if (!id) {
      return NextResponse.json(
        { error: "Dados obrigatórios faltando." },
        { status: 400 }
      );
    }

    await prisma.book.update({
      where: {
        id: book as string,
      },
      data: {
        categoryId: id,
      },
    });

    return NextResponse.json({
      status: Status.OK,
    });
  } catch (err) {
    if (err instanceof ExpectedError) {
      console.log("entrou aqui");

      return NextResponse.json(err.json(), {
        status: err.getStatus(),
      });
    }
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const body = await req.json();
    const id = searchParams.get("id");

    console.log(id);

    if (!id) {
      throw new ExpectedError({
        message: "Mal formatação da query!",
        status: Status.InternalServerError,
      });
    }

    const { title, author, code, categoryId, publisher, quantity } = body;

    // Validação básica
    if (
      !title ||
      !author ||
      !code ||
      !categoryId ||
      !publisher ||
      quantity < 0
    ) {
      return NextResponse.json(
        { error: "Dados obrigatórios faltando." },
        { status: 400 }
      );
    }

    const book = await prisma.book.update({
      where: { id },
      data: {
        title: title,
        author: author,
        availableCopies: quantity,
        barcode: code,
        categoryId,
        publisher,
        totalCopies: quantity,
      },
    });

    console.log(book);

    if (!book) {
      throw new ExpectedError({
        message: "Livro não encontrado!",
        status: Status.NotFound,
      });
    }

    return NextResponse.json({ status: Status.OK });
  } catch (err) {
    if (err instanceof ExpectedError) {
      return NextResponse.json(err.json(), {
        status: err.getStatus(),
      });
    }

    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
