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

    if (!id) {
      throw new ExpectedError({
        message: "Mal formatação da query!",
        status: Status.InternalServerError,
      });
    }

    const { title, author, code, categoryId, publisher, availableCopies, quantity } = body;

    if (!title || !author || !categoryId) {
      throw new ExpectedError({
        message: "Dados obrigatórios faltando.",
        status: Status.BadRequest,
      });
    }

    // Só define barcode se não for vazio
    const bookData: Parameters<typeof prisma.book.update>[0]["data"] = {
      title,
      author,
      availableCopies,
      categoryId,
      publisher,
      totalCopies: quantity,
    };

    if (code && code.trim() !== "") {
      bookData.barcode = code;
    }

    const book = await prisma.book.update({
      where: { id },
      data: bookData,
    });

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
      // @ts-expect-error
      { error: err.message || "Erro interno do servidor." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    throw new ExpectedError({
      message: "Mal formatação da query!",
      status: Status.InternalServerError,
    });
  }

  await prisma.book.delete({
    where: { id },
  })
  return NextResponse.json("ok")
}