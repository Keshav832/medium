import { createMiddleware } from "hono/factory";
import { PrismaClient } from '../generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const prismaMiddleware = createMiddleware<{
    Bindings: {
        DATABASE_URL: string
    },
    Variables: {
        prisma: object
    }
}>( async ( c, next ) => {
    
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    c.set("prisma", prisma);

    await next()

})