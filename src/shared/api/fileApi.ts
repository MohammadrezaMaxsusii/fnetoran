import { api } from "../libs/axiosInstance";

export const uploadFile = async (input: FormData) => {
  const { data } = await api.post("/files/upload", input);
  return data;
};

export const getFile = async (id: string, url: string) => {
  const { data } = await api.get(url, {
    responseType: "blob",
  });
  return data;
};
