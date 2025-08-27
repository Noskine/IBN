'use server'

import { prisma } from '@/lib/prisma'

export async function deleteAllAttendances() {
  'use server'
  await prisma.attendance.deleteMany()
}
