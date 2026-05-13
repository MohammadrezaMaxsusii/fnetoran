import { z } from "zod";

export const organizationFormSchema = z.object({
  name: z.string().trim().nonempty("Name is required."),
  code: z.string().nullable().optional(),
  national_id: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.email().nullable().optional(),
  address: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  logo: z.string().nullable().optional(),
});

export const organizationUpdateFormSchema = organizationFormSchema.extend({
  id: z.number()
});