import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    })
    return NextResponse.json(courses)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar cursos" }, { status: 500 })
  }
}
