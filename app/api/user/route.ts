import { prisma } from "@/lib/prisma";
import { ExpectedError } from "@/lib/expected-error";
import { Status } from "@/types/status";
import { z } from "zod";

import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";

const LivroSchema = z.object({
  email: z.email("O tipo não é email"),
  password: z.string().min(6, "Mínimo de 6 caracteres no password"),
  url: z.url("O tipo não é um link"),
  name: z.string(),
  isAdm: z.any(),
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()

    const data = LivroSchema.parse(body);


    await prisma.user.create({
      data: {
        email: data.email,
        password: await hash(data.password, 10),
        image: data.url,
        name: data.name,
        isAdm: data.isAdm,
      },
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
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        //@ts-ignore
        { message: "Erro de validação", erros: err.errors },
        { status: Status.BadRequest }
      );
    }
  }
};
