import { api } from "@/shared/libs/axiosInstance";

export const getBackups = async (params: Record<string, string>) => {
  const { data } = await api.get("/devices/backup/list", { params });
  return data;
};
