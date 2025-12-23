import { api } from "@/shared/libs/axiosInstance";
import type { Recovery } from "../types";

export const recovery = async (input: Recovery) => {
  const { data } = await api.post("/user/myself/verifyForgotPassword", input);
  return data;
};
