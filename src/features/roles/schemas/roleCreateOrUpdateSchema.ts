import { z } from "zod";

export const roleFormSchema = z.object({
  name: z.string().trim().min(1, "role is required."),
  maxRequestPerMinute: z.coerce
    .number()
    .min(10, "min request in per minutes must be at least 10.")
    .max(1000, "max request in per minutes must be less than 1000.")
    .optional(),
  workingDayLimit: z.array(z.string()).optional(),
  workingTimeLimitStart: z.string().trim().optional(),
  workingTimeLimitEnd: z.string().trim().optional(),
});
