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

export interface CategoryOfPermissions {
  createdAt: string;
  deletedAt: string;
  id: string;
  isDefault: boolean;
  name: string;
  parentId: string;
  permissions: PermissionsOfRole[];
  ref: string;
  updatedAt: string;
}
