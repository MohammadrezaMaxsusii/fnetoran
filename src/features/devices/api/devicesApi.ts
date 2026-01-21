import { api } from "@/shared/libs/axiosInstance";

export const getDeviceTypes = async () => {
  const { data } = await api.get("/devices/types");
  return data;
};

export const getDevices = async (params: Record<string, string>) => {
  const { data } = await api.get("/devices/list", { params });
  return data;
};
