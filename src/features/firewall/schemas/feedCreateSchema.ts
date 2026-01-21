import { z } from "zod";

export const feedCreateSchema = z.object({
  type: z.enum(["allow", "block"]),
  removeDate: z.preprocess(
    (val) => (typeof val === "string" && val ? new Date(val) : undefined),
    z.date().optional()
  ),
  source: z.string().trim(),
  fileName: z.string().trim(),
  fileType: z.string().trim().optional(),
  item: z.ipv4(),
});
