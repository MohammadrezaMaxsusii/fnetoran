import { api } from "@/shared/libs/axiosInstance";

export * from "./deviceApi";
export * from "./devicesApi";

export const addToZone = async (input) => {
  const { data } = await api.post("/device/zone/assign", input);
  return data;
};
