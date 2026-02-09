import { api } from "@/shared/libs/axiosInstance";

export const getDevicesScan = async (params: Record<string, string>) => {
  const { data } = await api.get("/autoDiscovery/list", { params });
  return data;
};
