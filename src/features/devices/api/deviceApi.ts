import { api } from "@/shared/libs/axiosInstance";
import z from "zod";
import type { deviceCreateSchema } from "../schemas";
// import type { userCreateOrUpdateSchema } from "../schemas";

export const deleteDevice = async (id: number) => {
  const { data } = await api.delete(`/devices/delete/${id}`);
  return data;
};

export const createDevice = async (
  input: z.infer<typeof deviceCreateSchema>,
) => {
  const { data } = await api.post("/devices/create", input);
  return data;
};

export const createDeviceCredential = async (
  input: z.infer<typeof deviceCreateSchema>,
) => {
  const { data } = await api.post("/devicesCredential/create", input);
  return data;
};

export const registerForFirewall = async (id: number) => {
  const { data } = await api.post(`/devices/firewall/ip_block/register/${id}`);
  return data;
};
