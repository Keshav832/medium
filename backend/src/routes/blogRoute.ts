import { Hono } from "hono";
import { prismaMiddleware } from "../middleware/prismaMiddleware";
import { PrismaClient } from '../generated/prisma/edge'
import { authMiddleware } from "../middleware/authMiddleware";

const blog = new Hono()

blog.post('/', authMiddleware, prismaMiddleware, async(c) => {
    const prisma = c.get("prisma") as PrismaClient;
    const userID = c.var.userId;

    try {
        const body = await c.req.json() as {
            title: string
            content: string
        };
        const createdPost = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userID
            },
        })

        return c.json({
            id: createdPost.id
        })
    } catch (error) {
        console.error(error);
        return c.json({ message: 'post creation failed' }, 400);
    }
})

blog.put('/', authMiddleware, prismaMiddleware, async(c) => {
    const prisma = c.get("prisma") as PrismaClient;
    const userID = c.var.userId;

    try {
        const body = await c.req.json() as {
            id: string
            title: string
            content: string
        };
        const updatedPost = await prisma.post.update({
            data: {
                title: body.title,
                content: body.content,
            },
            where: {
                id: body.id,
                authorId: userID
            },
        })

        return c.json({
            id: updatedPost.id
        })
    } catch (error) {
        console.error(error);
        return c.json({ message: 'post updation failed' }, 400);
    }
})

blog.get('/bulk', authMiddleware, prismaMiddleware, async(c) => {
    const prisma = c.get("prisma") as PrismaClient;
    const userID = c.var.userId;

    try {
        const postId = c.req.param('id')
        const reqPost = await prisma.post.findMany({});

        return c.json(reqPost);
    } catch (error) {
        console.error(error);
        return c.json({ message: 'unsuccessful' }, 400);
    }
})

blog.get('/:id', authMiddleware, prismaMiddleware, async(c) => {
    const prisma = c.get("prisma") as PrismaClient;
    const userID = c.var.userId;

    try {
        const postId = c.req.param('id')
        const reqPost = await prisma.post.findUnique({
            where: {
                id: postId
            }
        })

        return c.json( reqPost )
    } catch (error) {
        console.error(error);
        return c.json({ message: 'unsuccessful' }, 400);
    }
})

export default blog