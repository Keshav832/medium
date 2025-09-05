import { Hono } from "hono";
import { prismaMiddleware } from "../middleware/prismaMiddleware";
import { PrismaClient } from '../generated/prisma/edge'
import { generateSalt, hashPasswordWithSalt } from "../utils/crypto";
import { sign } from "hono/jwt"
import { signinInputs, signupInputs } from "@resok/medium-common";


const user = new Hono<{
  Bindings:{
    JWT_SECRET: string
  }
}>()

user.post('/signup', prismaMiddleware, async(c) => {

    const prisma = c.get("prisma") as PrismaClient;


    try {
        const body = await c.req.json() as {
            email: string
            password: string
            name: string
        };

        const { success } = signupInputs.safeParse(body);

        if(!success){
            return c.json({ message: "Invalid Inputs" }, 411)
        }
    
        const salt = await generateSalt();
        const passwordHash = await hashPasswordWithSalt(body.password, salt);

        const createdUser = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                passwordHash: passwordHash,
                salt: salt,
            },
        });
    
        const token = await sign({ id: createdUser.id }, c.env.JWT_SECRET);
        
        return c.json({
            token: token
        });
    } catch (error) {
        console.error(error);
        return c.json({ message: 'Signup failed' }, 400);
    }
})

user.post('/signin', prismaMiddleware, async(c) => {

    const prisma = c.get("prisma") as PrismaClient;

    try {
        const body = await c.req.json()

        const { success } = signinInputs.safeParse(body);

        if(!success){
            return c.json({ message: "Invalid Inputs" }, 411)
        }

        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });

        if(!user) {
            return c.json({ message: 'User not found' }, 403);
        }

        const hashed = await hashPasswordWithSalt(body.password, user.salt);

        if (hashed !== user.passwordHash) {
        return c.json({ message: 'Invalid password' }, 401);
        }

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.json({
            token: token
        });
    } catch (error) {
        console.error(error)
        return c.json({ message: 'Signin failed' }, 500)
    }
})

export default user