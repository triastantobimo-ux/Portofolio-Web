import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Log query hanya di development agar tidak berisik di production
export const db =
  globalForPrisma.prisma ??
  new PrismaClient(
    process.env.NODE_ENV === 'production' ? {} : { log: ['query'] }
  )

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
