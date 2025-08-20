import { prisma } from "@/lib/prisma";
import { ExpectedError } from "@/lib/expected-error";
import { Status } from "@/types/status";

import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await IsLost();

    const loans = await prisma.loan.findMany({
      select: {
        id: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        book: {
          select: {
            id: true,
            title: true,
            author: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        people: {
          select: {
            id: true,
            name: true,
          },
        },
        status: true,
        loanDate: true,
        dueDate: true,
        returnDate: true,
      },
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
    const { searchParams } = new URL(req.url);
    const idPeople = searchParams.get("reader");
    const idBook = searchParams.get("book");
    const email = searchParams.get("email");

    if (!idPeople || !idBook || !email) {
      throw new ExpectedError({
        message: "Mal formatação da query!",
        status: Status.BadRequest,
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user?.id) {
      throw new ExpectedError({
        message: "Usuário não existe",
        status: Status.BadRequest,
      });
    }

    // 🔎 Verifica quantos empréstimos ativos a pessoa já tem
    const activeLoansCount = await prisma.loan.count({
      where: {
        peopleId: idPeople,
        status: "ACTIVE",
      },
    });

    if (activeLoansCount >= 3) {
      throw new ExpectedError({
        message:
          "Este leitor já possui 3 empréstimos ativos e não pode realizar outro até devolver um livro.",
        status: Status.BadRequest,
      });
    }

    const book = await prisma.book.findUnique({
      where: { id: idBook },
      select: { availableCopies: true },
    });

    if (!book) {
      throw new ExpectedError({
        message: "Livro não encontrado",
        status: Status.NotFound,
      });
    }

    if (book.availableCopies <= 0) {
      throw new ExpectedError({
        message: "Não há cópias disponíveis para empréstimo.",
        status: Status.BadRequest,
      });
    }

    const loanDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(loanDate.getDate() + 7);

    const loan = await prisma.loan.create({
      data: {
        user: { connect: { id: user.id } },
        people: { connect: { id: idPeople } },
        book: { connect: { id: idBook } },
        loanDate,
        dueDate,
        status: "ACTIVE",
      },
    });

    await prisma.book.update({
      where: { id: idBook },
      data: { availableCopies: { decrement: 1 } },
    });

    return NextResponse.json(loan, { status: Status.Created });
  } catch (err) {
    if (err instanceof ExpectedError) {
      return NextResponse.json(err.json(), {
        status: err.getStatus(),
      });
    }

    console.error("Erro inesperado:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: Status.InternalServerError }
    );
  }
};

export const PATCH = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      throw new ExpectedError({
        message: "Empréstimo não encontrado (id ausente).",
        status: Status.BadRequest,
      });

    const loan = await prisma.loan.findUnique({
      where: { id },
      select: {
        dueDate: true,
        status: true,
      },
    });

    if (!loan)
      throw new ExpectedError({
        message: "Empréstimo não existe.",
        status: Status.NotFound,
      });

    if (loan.status !== "ACTIVE")
      throw new ExpectedError({
        message: "Só é possível renovar empréstimos ativos.",
        status: Status.BadRequest,
      });

    const newDueDate = new Date(loan.dueDate);
    newDueDate.setDate(newDueDate.getDate() + 7);

    const renewedLoan = await prisma.loan.update({
      where: { id },
      data: { dueDate: newDueDate },
    });

    return NextResponse.json({
      status: Status.OK,
    });
  } catch (err) {
    if (err instanceof ExpectedError) {
      return NextResponse.json(err.json(), {
        status: err.getStatus(),
      });
    }

    return NextResponse.json(
      {
        message: "Erro inesperado ao renovar o empréstimo.",
      },
      { status: Status.InternalServerError }
    );
  }
};

export const PUT = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      throw new ExpectedError({
        message: "Mal formatação da query!",
        status: Status.BadRequest,
      });

    const date = new Date();

    const loan = await prisma.loan.update({
      where: { id: id },
      data: {
        returnDate: date,
        status: "RETURNED",
      },
      select: {
        bookId: true,
      },
    });

    await prisma.book.update({
      where: { id: loan.bookId! },
      data: {
        availableCopies: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ status: Status.OK });
  } catch (err) {
    if (err instanceof ExpectedError) {
      return NextResponse.json(err.json(), {
        status: err.getStatus(),
      });
    }
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      throw new ExpectedError({
        message: "Mal formatação da query!",
        status: Status.BadRequest,
      });

    const loan = await prisma.loan.update({
      where: { id },
      data: {
        status: "LOST",
      },
    });

    return NextResponse.json(loan, { status: Status.OK });
  } catch (err) {
    if (err instanceof ExpectedError) {
      return NextResponse.json(err.json(), {
        status: err.getStatus(),
      });
    }
  }
};

type Loan = NonNullable<Awaited<ReturnType<typeof prisma.loan.findMany>>>[number];

async function IsLost() {
  const today = new Date();

  const expiredLoans = await prisma.loan.findMany({
    where: {
      status: "ACTIVE",
      dueDate: {
        lt: today,
      },
    },
  });

  if (expiredLoans.length > 0) {
    const updatePromises = expiredLoans.map((loan: Loan) =>
      prisma.loan.update({
        where: { id: loan.id },
        data: { status: "LATE" },
      })
    );
    await Promise.all(updatePromises);
  }
}
