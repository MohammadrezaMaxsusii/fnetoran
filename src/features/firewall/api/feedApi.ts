import { api } from "@/shared/libs/axiosInstance";
import type { feedCreateSchema } from "../schemas";
import { z } from "zod";

export const createFeed = async (input: z.infer<typeof feedCreateSchema>) => {
  const { data } = await api.post("/devices/firewall/feed/create", input);
  return data;
};
