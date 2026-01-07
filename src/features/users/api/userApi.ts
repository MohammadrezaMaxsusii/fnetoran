import { api } from "@/shared/libs/axiosInstance";
import z from "zod";
import type { userCreateOrUpdateSchema } from "../schemas";

export const getUser = async () => {
  const { data } = await api.get("/user/myself");
  return data;
};

export const deleteUser = async (input: Record<string, any>) => {
  const { data } = await api.delete("/user/admin/delete", { data: input });
  return data;
};

export const createUser = async (
  input: z.infer<typeof userCreateOrUpdateSchema>
) => {
  const { data } = await api.post("/auth/register", input);
  return data;
};
