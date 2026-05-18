import { z } from "zod";
import type { assetFormSchema } from "../schemas";

export type Asset = z.infer<typeof assetFormSchema> & { id: number };
