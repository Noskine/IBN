import { prisma } from "@/lib/prisma";
import { ExpectedError } from "@/lib/expected-error";
import { Status } from "@/types/status";

import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    
    // @ts-expect-error
    const email: string = searchParams.get("id")
  

    const id = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      }
    });

    if (!id) throw new ExpectedError({
      message: "Não é um admin",
      status: Status.Forbidden,
    })

    return NextResponse.json(id, {
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
