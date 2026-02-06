import { api } from "../libs/axiosInstance";

export const uploadFile = async (input: FormData) => {
  const { data } = await api.post("/files/upload", input);
  return data;
};

export const getFile = async (id: string) => {
  const { data } = await api.get(`/files/${id}`, {
    responseType: "blob",
  });
  return data;
};
