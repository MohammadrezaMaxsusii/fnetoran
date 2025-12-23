import { z } from "zod";

export const recoverySchema = z
  .object({
    newPassword: z.string().min(1, "new password is required.").trim(),
    repeatNewPassword: z
      .string()
      .min(1, "repeat new password is required.")
      .trim(),
    otp: z.string().min(1, "code is required.").trim(),
    uuid: z.string(),
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    message: "Passwords do not match",
    path: ["repeatNewPassword"],
  });
