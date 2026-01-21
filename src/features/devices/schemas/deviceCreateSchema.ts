import { z } from "zod";

export const deviceCreateSchema = z.object({
  // type: z.enum(["allow", "block"]),
  // removeDate: z.preprocess(
  //   (val) => (typeof val === "string" && val ? new Date(val) : undefined),
  //   z.date().optional()
  // ),
  // source: z.string().trim(),
  // fileName: z.string().trim(),
  // fileType: z.string().trim().optional(),
  // item: z.ipv4(),

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
