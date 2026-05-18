import { api } from "@/shared/libs/axiosInstance";
import type { assetFormSchema } from "../schemas";
import { z } from "zod";

export const createAsset = async (input: z.infer<typeof assetFormSchema>) => {
  const { data } = await api.post("/assets/assets/create", input);
  return data;
};

export const updateAsset = async (input: z.infer<typeof assetFormSchema>) => {
  const { data } = await api.post("/assets/assets/update", input);
  return data;
};

export const deleteAsset = async (id: number) => {
  const { data } = await api.delete(`/assets/assets/delete/${id}`);
  return data;
};
