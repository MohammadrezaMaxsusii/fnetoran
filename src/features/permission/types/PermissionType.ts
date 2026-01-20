import type { PermissionsOfRole } from "@/features/roles/types";

export interface Permission {
  name: string;
  isDefault: boolean;
  order: string;
  updatedAt: string;
  id: string;
  ref: string;
  parentId: string;
  createdAt: string;
  deletedAt: string;
  permissions: PermissionsOfRole[];
}
