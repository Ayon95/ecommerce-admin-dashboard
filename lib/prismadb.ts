import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();

// This is to prevent creating numerous PrismaClient instances in development when app refreshes multiple times
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;
