import { z } from "zod";

export const deviceCreateSchema = z.object({
  deviceId: z.number().optional(),
  ip: z.ipv4().optional(),
  vendor: z.string().min(1, "Vendor is required!").optional(),
  type: z.string().min(1, "Type is required!").optional(),
  subtype: z.string().min(1, "Sub type is required!").optional(),
  authType: z.string().optional(),
  connectType: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  apiKey: z.string().optional(),
});
