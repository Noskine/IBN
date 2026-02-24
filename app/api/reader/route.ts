import { prisma } from "@/lib/prisma";
import { ExpectedError } from "@/lib/expected-error";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  // @ts-expect-error
  const id: strnig = searchParams.get('id')

  try {
    const loans = await prisma.people.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        status: true,

        loans: {
          select: {
            book: {
              select: {
                title: true,
                author: true,
                publisher: true,
                barcode: true,
              }
            },
            loanDate: true,
            dueDate: true,
            returnDate: true,
            status: true,
          }

        }
      }
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