import { z } from "zod";

export const locationFormSchema = z.object({
  id: z.number().nullish(),
  name: z.string().nonempty("Name is required."),
  location_type: z.string().nonempty("Location type is required."),
  parent_id: z.number().nullish(),
  slug: z.string().nullish(),
  address: z.string().nullish(),
  room_number: z.string().nullish(),
  capacity: z.coerce.number().nullish(),
  is_active: z.stringbool().nullish(),
  description: z.string().nullish(),
  createdAt: z.string().nullish(),
});
