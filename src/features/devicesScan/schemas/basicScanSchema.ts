import { z } from "zod";

export const basicScanSchema = z.object({
  name: z.string().nonempty("name is required."),
  range: z.string().nonempty("range is required."),
  type: z.string().optional(),
  description: z.string().optional(),
  schedule_time: z.string().optional(),
});
