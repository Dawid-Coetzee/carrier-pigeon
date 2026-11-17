import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import "server-only";

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient | undefined;
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL must be set to connect to the database.");
}

const createPrismaClient = () =>
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: databaseUrl }),
  });

export const db =
  process.env.NODE_ENV === "production"
    ? createPrismaClient()
    : (global.cachedPrisma ??= createPrismaClient());