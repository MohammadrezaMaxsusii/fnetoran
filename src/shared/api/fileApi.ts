import { api } from "../libs/axiosInstance";

export const uploadFile = async (input: FormData) => {
  const { data } = await api.post("/files/upload", input);
  return data;
};
