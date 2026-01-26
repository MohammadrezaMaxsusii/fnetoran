import { api } from "@/shared/libs/axiosInstance";
import z from "zod";
import type { userCreateOrUpdateSchema } from "../schemas";

export const getUser = async () => {
  const { data } = await api.get("/user/myself");
  return data;
};

export const getSpecificUser = async (params: { user_id?: string }) => {
  const { data } = await api.get(`/user/admin/info/${params.user_id}`, {
    params,
  });
  return data;
};

export const deleteUser = async (input: Record<string, any>) => {
  const { data } = await api.delete("/user/admin/delete", { data: input });
  return data;
};

export const createUser = async (
  input: z.infer<typeof userCreateOrUpdateSchema>,
) => {
  const { data } = await api.post("/auth/register", input);
  return data;
};

export const updateUser = async (
  input: z.infer<typeof userCreateOrUpdateSchema> & { userId: string },
) => {
  const { data } = await api.patch("/user/admin/update", input);
  return data;
};
