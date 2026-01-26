import { z } from "zod";

export const addToZoneSchema = z.object({
  device_id: z.string().optional(),
  zone_id: z.coerce.number().optional(),
});
