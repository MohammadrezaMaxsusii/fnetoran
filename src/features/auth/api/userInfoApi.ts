import { api } from "@/shared/libs/axiosInstance";
import type { UserInfo } from "../types";

export const userInfo = async (input: UserInfo) => {
  const { data } = await api.post("/user/myself/forgotPassword", input);
  return data;
};
