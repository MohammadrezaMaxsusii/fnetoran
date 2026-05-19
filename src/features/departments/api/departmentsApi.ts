import { api } from "@/shared/libs/axiosInstance";

export const getDepartments = async (params: Record<string, string | number | boolean>) => {
  const { data } = await api.get("/departments/list", { params });
  return data;
};
