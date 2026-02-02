import type { Device } from "@/features/devices/types";

export interface Backup {
  backupType: string;
  createdAt: string;
  deletedAt: string;
  device: Device;
  errorMessage: string;
  fileId: string;
  id: string;
  order: string;
  parentId: string;
  status: string;
  updatedAt: string;
}
