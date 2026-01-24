import { api } from "@/shared/libs/axiosInstance";
import { z } from "zod";
import type { roleFormSchema } from "../schemas/roleCreateOrUpdateSchema";

export const createRole = async (input: z.infer<typeof roleFormSchema>) => {
  const { data } = await api.post("/role/create", input);
  return data;
};
