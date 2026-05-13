import { z } from "zod";
import type { organizationFormSchema } from "../schemas";

export type Organization = z.infer<typeof organizationFormSchema> & { id: number };
