import { api } from "@/shared/libs/axiosInstance";
import { z } from "zod";
import type { backupCreateSchema } from "../schemas";

export const createBackup = async (
  input: z.infer<typeof backupCreateSchema>,
) => {
  const { data } = await api.post("/devices/backup/create", input);
  return data;
};

export const deleteBackup = async (id: string) => {
  const { data } = await api.delete(`/devices/backup/delete/${id}`);
  return data;
};
