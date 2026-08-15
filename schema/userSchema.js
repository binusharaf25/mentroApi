import { z } from "zod";

export const createUserSchema =  z.object({
  username: z.string().min(2, "Username required"),
  email: z.string().email("email must be valid"),
  password: z
    .string()
    .min(6, "password must be at least 6 character")
    .max(20, "password must be at most 20 character"),
});
