import { api } from "@/shared/libs/axiosInstance";

export const logout = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};
