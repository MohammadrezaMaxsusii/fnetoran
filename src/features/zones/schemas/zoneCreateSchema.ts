import { z } from "zod";

export const zoneCreateSchema = z.object({
  name: z.string().trim().nonempty("Name is required."),
  description: z.string().trim(),
});
