import { z } from "zod";

export const userCreateOrUpdateSchema = z.object({
  roleId: z.string().trim().min(1, "role is required."),
  username: z.string().trim().min(1, "username is required."),
  firstName: z.string().trim().min(1, "first name is required."),
  lastName: z.string().trim().min(1, "last name is required."),
  gender: z.string().trim().optional(),
  nationalId: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^\d{10}$/.test(val), {
      message: "national id must be exactly 10 digits.",
    }),
  education: z.string().trim().optional(),
  cellphone: z
    .string()
    .trim()
    .length(11, "mobile number must be exactly 11 digits."),
  email: z.email(),
  birthday: z.preprocess(
    (val) => (typeof val === "string" && val ? new Date(val) : undefined),
    z.date().optional()
  ),
  password: z
    .string()
    .min(8, "password must be at least 8 characters.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      "password must contain uppercase, lowercase, number, and special character."
    ),
  passwordHistoryCount: z.string().optional(),
  expirePasswordDays: z.number().optional(),
  passwordAdvantageDays: z.number().optional(),
  mustChangePassword: z.boolean().optional(),
  active: z.boolean().optional(),
  deactivedAt: z.preprocess(
    (val) => (typeof val === "string" && val ? new Date(val) : undefined),
    z.date().optional()
  ),
});
