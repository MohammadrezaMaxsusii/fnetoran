import { api } from "@/shared/libs/axiosInstance";

export const getAssets = async (params: Record<string, any>) => {
  const { data } = await api.get("/assets/assets/list", { params });
  return data;
};
