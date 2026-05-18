import { api } from "@/shared/libs/axiosInstance";

export const getLocations = async (params: Record<string, string | number | boolean>) => {
  const { data } = await api.get("/locations/list", { params });
  return data;
};
