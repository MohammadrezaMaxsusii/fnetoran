import { z } from "zod";
import type { assetFormSchema } from "../schemas";

export type Asset = z.infer<typeof assetFormSchema> & { id: number };

export type AssetType = {
  id: number;
  name: string;
  slug: string;
  category: string;
  icon: string;
  description: string | null;
  form_config: any;
  parentId: number | null;
  order: string | null;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  is_active: boolean;
};
