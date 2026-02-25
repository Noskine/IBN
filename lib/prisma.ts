import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/prisma/generated/client";

declare global {
  // Para evitar múltiplas instâncias em dev
  var prisma: PrismaClient | undefined
  
}
const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });

 const prisma =
  global.prisma ||
  new PrismaClient({
    adapter,
    log: ['query', 'error']
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export { prisma };