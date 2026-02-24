import { prisma } from "@/lib/prisma";
import { ExpectedError } from "@/lib/expected-error";
import { Status } from "@/types/status";

import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url)
    // @ts-expect-error
    const id: string = searchParams.get('id');

    const loans = await prisma.loan.findUnique({
      where: {
        id: id,
      }, include: {
        book: {
          select: {
            id: true,
            title: true,
            author: true,
            publisher: true,
            category: {
              select: {
                name: true,
              }
            },
            totalCopies: true,
            availableCopies: true,
            barcode: true,
          }
        },
        people: {
          select: {
            name: true,
            status: true,
            course: true,
          }
        },
      }
    });

    if (!loans) throw new ExpectedError({
      message: "comprovante não existe!",
      status: Status.Forbidden,
    })

    return NextResponse.json(loans);
  } catch (err) {
    if (err instanceof ExpectedError) {
      return NextResponse.json(err.json(), {
        status: err.getStatus(),
      });
    }
  }
};


