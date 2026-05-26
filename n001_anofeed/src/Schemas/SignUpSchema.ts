import { z } from "zod";

// code (0005)-------------------
export const usernameValidation = z
  .string()
  .min(2, "Username should be atleast 2 characters")
  .max(20, "Username should be at most 20 characters")
  .regex(/^[a-zA-Z0-9_]$/, "Username must not contain special character");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid Email address" }),
  password: z
    .string()
    .min(6, { message: "Password should be atleast 6 characters" }),
});
