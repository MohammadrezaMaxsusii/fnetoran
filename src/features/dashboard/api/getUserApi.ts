import { api } from "@/shared/libs/axiosInstance";

export const getUser = async () => {
  const { data } = await api.get("/user/myself");
  return data;
};
