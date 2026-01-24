import { api } from "@/shared/libs/axiosInstance";

export const getZones = async (params: Record<string, string>) => {
  const { data } = await api.get("/device/zone/list", { params });
  return data;
};
