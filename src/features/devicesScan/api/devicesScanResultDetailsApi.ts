import { api } from "@/shared/libs/axiosInstance";

export const getDevicesScanResultDetails = async (
  id: string,
  params: Record<string, string>,
) => {
  const { data } = await api.get(`/autoDiscovery/scan-result-detail/${id}`, {
    params,
  });
  return data;
};
