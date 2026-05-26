import z from "zod";

// code(0006)----------------------
export const verifySchema = z.object({
  code: z.string().length(6, "Verification Code must be 6 digits"),
});
