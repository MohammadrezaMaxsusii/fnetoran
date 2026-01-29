import { api } from "@/shared/libs/axiosInstance";

export * from "./ipsApi";
export * from "./feedApi";
export * from "./feedsApi";

export const getApis = async () => {
  const response = await api.get("/devices/firewall/ip_block/request-list");
  return response.data;
};

export const getPendingApis = async () => {
  const response = await api.get("/devices/firewall/ip_block/pending-list");
  return response.data;
};

export const getExecuteApis = async () => {
  const response = await api.get("/devices/firewall/ip_block/execute-list");
  return response.data;
};

export const approveIp = async (id: string) => {
  const response = await api.post(`/devices/firewall/ip_block/approve/${id}`);
  return response.data;
};

export const rejectIp = async (id: string) => {
  const response = await api.post(`/devices/firewall/ip_block/reject/${id}`);
  return response.data;
};
