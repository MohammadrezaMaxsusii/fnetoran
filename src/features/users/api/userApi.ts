import { api } from "@/shared/libs/axiosInstance";

export const getUser = async () => {
  const { data } = await api.get("/user/myself");
  return data;
};

export const deleteUser = async (input: Record<string, any>) => {
  const { data } = await api.delete("/user/admin/delete", { data: input });
  return data;
};
