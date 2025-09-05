import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

export const authMiddleware = createMiddleware<{
    Bindings: {
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>(
    async ( c, next ) => {
        // 1. Read Authorization Header
        const authHeader = c.req.header('Authorization');

        // 2. If no header => unauthorized
        if (!authHeader) {
            return c.json({ error: "Unauthorized: No token provided." }, 401);
        }

        // 3. Extract Bearer token
        if (!authHeader.startsWith("Bearer ")) {
            return c.json({ error: "Unauthorized: Malformed token" }, 401)
        }
        const token = authHeader.split(" ")[1]

        // 4. Verify JWT
        let rawPayload;
        try {
            rawPayload = await verify(token, c.env.JWT_SECRET);
        } catch (err) {
            return c.json({ error: "Unauthorized: Invalid token." }, 401);
        }

        // 5. Check if id exists AND it's a string
        if (!rawPayload || typeof (rawPayload as any).id !== "string") {
            return c.json({ error: "Unauthorized: Invalid payload" }, 401);
        }

        const payload = rawPayload as { id: string };

        // 6. Set userId in context
        c.set("userId", payload.id);

        // 7. Continue
        await next();
    }
)