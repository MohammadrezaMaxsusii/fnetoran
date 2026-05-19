import { api } from "@/shared/libs/axiosInstance";
import { z } from "zod";
import {
  organizationFormSchema,
  organizationUpdateFormSchema,
} from "../schemas";

export const getOrganization = async (id: number) => {
  const { data } = await api.get(`organization/info/${id}`);
  return data;
};

export const createOrganization = async (
  input: z.infer<typeof organizationFormSchema>,
) => {
  const { data } = await api.post("organization/create", input);
  return data;
};

export const updateOrganization = async (
  input: Partial<z.infer<typeof organizationUpdateFormSchema>>,
) => {
  const { data } = await api.post("organization/update", input);
  return data;
};

export const deleteOrganization = async (id: number) => {
  const { data } = await api.delete(`organization/delete/${id}`);
  return data;
};
