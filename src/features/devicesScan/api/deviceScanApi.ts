import { z } from "zod";
import type { basicScanSchema } from "../schemas";
import { api } from "@/shared/libs/axiosInstance";

export const createBasicDeviceScan = async (
  input: z.infer<typeof basicScanSchema>,
) => {
  const { data } = await api.post("/autoDiscovery/create", input);
  return data;
};

// This backend endpoint currently has issues; functionality may not work as expected.
export const deleteBasicDeviceScan = async (id: string) => {
  const { data } = await api.delete(`/autoDiscovery/delete-scan/${id}`);
  return data;
};

export const createBasicDeviceScanStart = async (id: string) => {
  const { data } = await api.post(`/autoDiscovery/start/${id}`);
  return data;
};
