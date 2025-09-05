import { z } from "zod";

export const signupInputs = z.object({
    email: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    name: z.string().trim(),
});

export const signinInputs = z.object({
    email: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const createPostInputs = z.object({
    title: z.string().trim(),
    content: z.string().trim(),
});

export const updatePostInputs = z.object({
    id: z.string(),
    title: z.string().trim(),
    content: z.string().trim(),
});

export type SignupInputs = z.infer<typeof signupInputs>;
export type SigninInputs = z.infer<typeof signinInputs>;
export type CreatePostInputs = z.infer<typeof createPostInputs>;
export type UpdatePostInputs = z.infer<typeof updatePostInputs>;
