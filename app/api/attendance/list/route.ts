// /app/api/attendance/exit/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const now = new Date();

  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  const updated = await prisma.attendance.findMany({
    where: {
      entryAt: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
    include: {
      people: true, // se quiser incluir o nome da pessoa
    },
    orderBy: {
      entryAt: "desc", // ordena do mais recente para o mais antigo
    },
  });

  return NextResponse.json(updated);
}
