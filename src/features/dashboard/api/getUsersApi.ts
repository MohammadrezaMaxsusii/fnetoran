import { api } from "@/shared/libs/axiosInstance";

export const getUsers = async () => {
  const { data } = await api.get("/user/admin/list?list_limit=3");
  return data;
};
