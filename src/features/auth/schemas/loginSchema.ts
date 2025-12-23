import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "username is required.").trim(),
  password: z.string().min(1, "password is required.").trim(),
});
