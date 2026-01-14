import { api } from "@/shared/libs/axiosInstance";

export const getRoles = async (params: Record<string, string>) => {
  const { data } = await api.get("/role/list", { params });
  return data;
};

export const getPermissionsOfRole = async (id: string) => {
  const { data } = await api.get(`/rolePermission/roleCategoryPermissions/${id}`);
  return data;
};
