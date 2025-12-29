import { api } from "@/shared/libs/axiosInstance";

export const getUsers = async (params: Record<string, string>) => {
  const { data } = await api.get("/user/admin/list", { params });
  return data;
};
