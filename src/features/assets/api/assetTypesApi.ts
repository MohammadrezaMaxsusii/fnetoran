import { api } from "@/shared/libs/axiosInstance";

export const getAssetTypes = async (params: Record<string, any>) => {
  const { data } = await api.get("/asset-types/list", { params });
  return data;
};
