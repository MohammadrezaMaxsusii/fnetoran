import { api } from "@/shared/libs/axiosInstance";

export const getDevicesScanResult = async (id: string, params: Record<string, string>) => {
  const { data } = await api.get(`/autoDiscovery/scan-result/${id}`, { params });
  return data;
};
