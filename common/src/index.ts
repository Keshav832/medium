import z from "Zod";

export const signupInputs = z.object({
    email: z.email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export const signinInputs = z.object({
    email: z.email(),
    password: z.string().min(6),
})

export const createPostInputs = z.object({
    tiltle: z.string(),
    content: z.string()
})

export const updatePostInputs = z.object({
    id: z.string(),
    tiltle: z.string(),
    content: z.string()
})

export type SignupInputs = z.infer<typeof signupInputs>;
export type SigninInputs = z.infer<typeof signinInputs>;

export type CreatePostInputs = z.infer<typeof createPostInputs>
export type UpdatePostInputs = z.infer<typeof updatePostInputs>