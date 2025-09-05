import { createMiddleware } from "hono/factory";
import { PrismaClient } from '../generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export type AcceleratedPrisma = ReturnType<typeof prismaFactory>;

function prismaFactory(url: string) {
  return new PrismaClient({ datasourceUrl: url }).$extends(withAccelerate());
}

export const prismaMiddleware = createMiddleware<{
    Bindings: {
        DATABASE_URL: string;
    },
    Variables: {
        prisma: AcceleratedPrisma;
    }
}>( async ( c, next ) => {

    const prisma = prismaFactory(c.env.DATABASE_URL);

    c.set("prisma", prisma);

    await next()

})