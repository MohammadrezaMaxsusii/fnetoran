import { api } from "@/shared/libs/axiosInstance";
import type { Login } from "../types";

export const login = async (input: Login) => {
  const { data } = await api.post("/auth/login", input);
  return data;
};
