import { api } from "@/shared/libs/axiosInstance";
import { z } from "zod";
import type { roleFormSchema } from "../schemas/roleCreateOrUpdateSchema";

export const getSpecificRole = async (params: { id?: string }) => {
  const { data } = await api.get(`/role/info/${params.id}`);
  return data;
};

export const createRole = async (input: z.infer<typeof roleFormSchema>) => {
  const { data } = await api.post("/role/create", input);
  return data;
};

export const updateRole = async (input: z.infer<typeof roleFormSchema>) => {
  const { data } = await api.patch("/role/update", input);
  return data;
};

export const deleteRole = async (input: { roleId: number }) => {
  const { data } = await api.delete("/role/delete", { data: input });
  return data;
};
