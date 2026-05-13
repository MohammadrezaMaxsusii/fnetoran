import { api } from "@/shared/libs/axiosInstance";

export const getOrganizations = async (params: Record<string, string>) => {
  const { data } = await api.get("/organization/list", { params });
  return data;
};
