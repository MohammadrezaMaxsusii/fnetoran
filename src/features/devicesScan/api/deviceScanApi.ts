import { z } from "zod";
import type { basicScanSchema } from "../schemas";
import { api } from "@/shared/libs/axiosInstance";

export const createDeviceScan = async (
  input: z.infer<typeof basicScanSchema>,
) => {
  const { data } = await api.post("/autoDiscovery/create", input);
  return data;
};
