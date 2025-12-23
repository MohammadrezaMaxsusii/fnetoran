import { z } from "zod";

export const userInfoSchema = z.object({
  forgetPasswordField: z.string().min(1, "username or email or phone is required.").trim(),
});
