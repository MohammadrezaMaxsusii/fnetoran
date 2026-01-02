import { api } from "@/shared/libs/axiosInstance";

export const getRoles = async () => {
  const { data } = await api.get("/role/list");
  return data;
};
