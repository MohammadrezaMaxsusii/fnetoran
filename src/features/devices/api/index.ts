import { api } from "@/shared/libs/axiosInstance";

export * from "./deviceApi";
export * from "./devicesApi";

export const addToZone = async (input) => {
  const { data } = await api.post("/device/zone/assign", input);
  return data;
};

export const loadAssets = async (deviceId: string) => {
  const { data } = await api.get(`/devices/fetchAssets/${deviceId}`);
  return data;
};

export const fetchAssets = async (deviceId: string) => {
  const response = await api.get(`/devices/assetList/${deviceId}`);

  return response.data;
};

export const fetchCis = async () => {
  const response = await api.get("/cis/list");

  return response.data.data;
};

export const fetchHistory = async (deviceId) => {
  const response = await api.get(`/hardeningResults/history/${deviceId}`);

  return response.data.data;
};

export const get = async (deviceId) => {
  const response = await api.get(`/devices/info/${deviceId}`);

  return response.data.data;
};
