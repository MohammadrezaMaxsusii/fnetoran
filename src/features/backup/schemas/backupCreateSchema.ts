import { z } from "zod";

export const backupCreateSchema = z.object({
  device_id: z.string().nonempty("device id is required."),
  backup_type: z.enum(["running", "startup"]),
});
