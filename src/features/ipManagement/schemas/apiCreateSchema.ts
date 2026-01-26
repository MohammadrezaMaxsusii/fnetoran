import { z } from "zod";

export const apiCreateSchema = z.object({
  // type: z.enum(["allow", "block"]),
  // removeDate: z.preprocess(
  //   (val) => (typeof val === "string" && val ? new Date(val) : undefined),
  //   z.date().optional()
  // ),
  // source: z.string().trim().nonempty("Reffrence is required."),
  // fileName: z.string().trim().nonempty("Feed is required."),
  // fileType: z.string().trim().optional(),
  //
  ip: z.ipv4(),
  zone_ids: z.string(),
  action: z.string(),
  attack_type: z.string(),
  evidence: z.string().optional(),
  scheduled_at: z.preprocess(
    (val) => (typeof val === "string" && val ? new Date(val) : undefined),
    z.date().optional(),
  ),
});
