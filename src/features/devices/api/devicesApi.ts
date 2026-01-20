import { api } from "@/shared/libs/axiosInstance";

export const getDeviceTypes = async () => {
  const { data } = await api.get("/devices/types");
  return data;
};
