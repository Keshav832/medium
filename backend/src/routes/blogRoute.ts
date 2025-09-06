import { Hono } from "hono";
import { prismaMiddleware, type AcceleratedPrisma } from "../middleware/prismaMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";
import { createPostInputs, updatePostInputs } from "@resok/medium-common";

const blog = new Hono<{
  Bindings: {};
  Variables: {
    prisma: AcceleratedPrisma;
    userId: string;
  };
}>();

blog.post('/', authMiddleware, prismaMiddleware, async(c) => {
    const prisma = c.get("prisma");
    const userID = c.var.userId;

    try {
        const body = await c.req.json() as {
            title: string
            content: string
        };

        const { success } = createPostInputs.safeParse(body);
        if(!success){
            return c.json({ message: "Invalid Inputs" }, 411)
        }

        const createdPost = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                published: true,
                authorId: userID
            },
        })

        return c.json({ id: createdPost.id })
    } catch (error) {
        console.error(error);
        return c.json({ message: 'post creation failed' }, 400);
    }
})

blog.put('/', authMiddleware, prismaMiddleware, async(c) => {
    const prisma = c.get("prisma");
    const userID = c.var.userId;

    try {
        const body = await c.req.json() as {
            id: string
            title: string
            content: string
        };

        const { success } = updatePostInputs.safeParse(body);
        if(!success){
            return c.json({ message: "Invalid Inputs" }, 411)
        }

        const result = await prisma.post.updateMany({
            data: {
                title: body.title,
                content: body.content,
            },
            where: {
                id: body.id,
                authorId: userID,
                deletedAt: null,
            },
        })

        if (result.count === 0) {
            return c.json({ message: "Post not found or unauthorized" }, 404);
        }

        return c.json({ id: body.id })
    } catch (error) {
        console.error(error);
        return c.json({ message: 'post updation failed' }, 400);
    }
})

blog.get('/bulk', prismaMiddleware, async(c) => {
    const prisma = c.get("prisma");

    try {
        const limit = Math.min(parseInt(c.req.query("limit") || "10", 10), 50);
        const offset = parseInt(c.req.query("offset") || "0", 10);

        const total = await prisma.post.count({
            where: { deletedAt: null },
        });
        
        const posts = await prisma.post.findMany({
            where: {
                published: true,
                deletedAt: null,
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                author: {
                    select: { name: true }
                }
            },
            skip: offset,
            take: limit,
            orderBy: { createdAt: "desc" },
        });

        return c.json({
            posts,
            pagination: {
                total,
                limit,
                offset,
                hasMore: offset + limit < total,
            } });
    } catch (error) {
        console.error(error);
        return c.json({ message: "Failed to fetch posts" }, 400);
    }
})

blog.get('/:id', prismaMiddleware, async(c) => {
    const prisma = c.get("prisma");

    try {
        const postId = c.req.param('id')
        const post = await prisma.post.findFirst({
            where: {
                id: postId,
                published: true,
                deletedAt: null,
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                author: {
                    select: { name: true }
                }
            }
        })

        if (!post) {
            return c.json({ message: "Post not found" }, 404);
        }

        return c.json({ post });
    } catch (error) {
        console.error(error);
        return c.json({ message: "Failed to fetch post" }, 400);
    }
})

blog.delete("/:id", authMiddleware, prismaMiddleware, async (c) => {
    const prisma = c.get("prisma");
    const userId = c.var.userId;

    try {
        const postId = c.req.param("id");

        const result = await prisma.post.updateMany({
            data: { 
                deletedAt: new Date() 
            },
            where: {
                id: postId,
                authorId: userId,
                deletedAt: null,
            },
        });

        if (result.count === 0) {
            return c.json({ message: "Post not found or unauthorized" }, 404);
        }

        return c.json({ message: "Post deleted" });
    } catch (error) {
        console.error(error);
        return c.json({ message: "Post deletion failed" }, 400);
    }
});

export default blog