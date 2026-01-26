import { api } from "@/shared/libs/axiosInstance";

export const getIPs = async (params: Record<string, string>) => {
  const { data } = await api.get("/devices/firewall/ip_block/list", { params });
  return data;
};
