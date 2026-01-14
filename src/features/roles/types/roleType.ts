import type { Method } from "@/shared/types";

export interface Role {
  active: boolean;
  createdAt: string;
  deletedAt: string;
  id: number;
  maxRequestPerMinute: number;
  name: string;
  order: string;
  parentId: string;
  updatedAt: string;
  workingDayLimit: number[];
  workingTimeLimit: string;
}

export interface PermissionsOfRole {
  createdAt: string;
  deletedAt: string;
  id: string;
  isBuiltin: true;
  isPublic: false;
  method: Method;
  order: string;
  parentId: string;
  text: string;
  updatedAt: string;
  url: string;
}

export interface CategoryOfRole {
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
