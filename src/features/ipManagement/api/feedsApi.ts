import { api } from "@/shared/libs/axiosInstance";

export const getFeeds = async (params: Record<string, string>) => {
  const { data } = await api.get("/devices/firewall/feed/list", { params });
  return data;
};
