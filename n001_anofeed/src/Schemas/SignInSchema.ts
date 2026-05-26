import z from "zod";

// code(0007)----------------------
export const SignInSchema = z.object({
    identifier: z.string(),
    password:z.string()
});
