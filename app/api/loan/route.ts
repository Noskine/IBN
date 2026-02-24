// app/api/loan/route.ts
"use server";

import { prisma } from "@/lib/prisma";
import { ExpectedError } from "@/lib/expected-error";
import { Status } from "@/types/status";
import { NextResponse } from "next/server";

type LoanType = NonNullable<Awaited<ReturnType<typeof prisma.loan.findMany>>>[number];

// Atualiza empréstimos vencidos
async function IsLost() {
  const today = new Date();
  const expiredLoans = await prisma.loan.findMany({
    where: { status: "ACTIVE", dueDate: { lt: today } },
  });

  if (expiredLoans.length > 0) {
    await Promise.all(
      expiredLoans.map((loan: LoanType) =>
        prisma.loan.update({
          where: { id: loan.id },
          data: { status: "OVERDUE" },
        })
      )
    );
  }
}

// ====================== GET ======================
export const GET = async () => {
  try {
    await IsLost();

    const loans = await prisma.loan.findMany({
      select: {
        id: true,
        book: {
          select: {
            id: true,
            title: true,
            author: true,
            category: { select: { name: true } },
          },
        },
        people: {
          select: { id: true, name: true },
        },
        status: true,
        loanDate: true,
        dueDate: true,
        returnDate: true,
      },
      orderBy: { loanDate: "desc" },
    });

    return NextResponse.json(loans);
  } catch (err) {
    console.error("Erro ao buscar empréstimos:", err);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
};

// ====================== POST ======================
export const POST = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const idPeople = searchParams.get("reader");
    const idBook = searchParams.get("book");
    const email = searchParams.get("email");

    if (!idPeople || !idBook || !email)
      throw new ExpectedError({ message: "Query mal formatada!", status: 400 });

    const user = await prisma.user.findUnique({ where: { email }, select: { id: true } });
    if (!user?.id) throw new ExpectedError({ message: "Usuário não existe", status: 400 });

    const activeLoansCount = await prisma.loan.count({ where: { peopleId: idPeople, status: "ACTIVE" } });
    if (activeLoansCount >= 3)
      throw new ExpectedError({
        message:
          "Este leitor já possui 3 empréstimos ativos e não pode realizar outro até devolver um livro.",
        status: 400,
      });

    const book = await prisma.book.findUnique({ where: { id: idBook }, select: { availableCopies: true } });
    if (!book) throw new ExpectedError({ message: "Livro não encontrado", status: 404 });
    if (book.availableCopies <= 0)
      throw new ExpectedError({ message: "Não há cópias disponíveis para empréstimo.", status: 400 });

    const loanDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(loanDate.getDate() + 8);

    const loan = await prisma.loan.create({
      data: {
        people: { connect: { id: idPeople } },
        book: { connect: { id: idBook } },
        loanDate,
        dueDate,
        status: "ACTIVE",
      },
    });

    await prisma.book.update({ where: { id: idBook }, data: { availableCopies: { decrement: 1 } } });

    return NextResponse.json(loan, { status: 201 });
  } catch (err) {
    if (err instanceof ExpectedError) return NextResponse.json(err.json(), { status: err.getStatus() });
    console.error("Erro inesperado no POST /loan:", err);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
};

// ====================== PATCH ======================
// Renova empréstimo ativo (+7 dias)
export const PATCH = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) throw new ExpectedError({ message: "Empréstimo não encontrado (id ausente).", status: 400 });

    const loan = await prisma.loan.findUnique({ where: { id }, select: { dueDate: true, status: true } });
    if (!loan) throw new ExpectedError({ message: "Empréstimo não existe.", status: 404 });
    if (loan.status !== "ACTIVE")
      throw new ExpectedError({ message: "Só é possível renovar empréstimos ativos.", status: 400 });

    const newDueDate = new Date(loan.dueDate);
    newDueDate.setDate(newDueDate.getDate() + 7);

    await prisma.loan.update({ where: { id }, data: { dueDate: newDueDate } });

    return NextResponse.json({ status: Status.OK });
  } catch (err) {
    if (err instanceof ExpectedError) return NextResponse.json(err.json(), { status: err.getStatus() });
    return NextResponse.json({ error: "Erro inesperado ao renovar empréstimo." }, { status: 500 });
  }
};

// ====================== PUT ======================
// Devolver empréstimo
export const PUT = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) throw new ExpectedError({ message: "Mal formatação da query!", status: 400 });

    const date = new Date();

    const loan = await prisma.loan.update({
      where: { id },
      data: { returnDate: date, status: "RETURNED" },
      select: { bookId: true },
    });

    await prisma.book.update({ where: { id: loan.bookId! }, data: { availableCopies: { increment: 1 } } });

    return NextResponse.json({ status: Status.OK });
  } catch (err) {
    if (err instanceof ExpectedError) return NextResponse.json(err.json(), { status: err.getStatus() });
    return NextResponse.json({ error: "Erro inesperado ao devolver empréstimo." }, { status: 500 });
  }
};

// ====================== DELETE ======================
// Marca como perdido
export const DELETE = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) throw new ExpectedError({ message: "Mal formatação da query!", status: 400 });

    const loan = await prisma.loan.update({ where: { id }, data: { status: "LOST" } });
    return NextResponse.json(loan, { status: Status.OK });
  } catch (err) {
    if (err instanceof ExpectedError) return NextResponse.json(err.json(), { status: err.getStatus() });
    return NextResponse.json({ error: "Erro inesperado ao marcar empréstimo como perdido." }, { status: 500 });
  }
};