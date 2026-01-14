import { api } from "@/shared/libs/axiosInstance";

export const getPermissions = async (params: Record<string, any>) => {
  const { data } = await api.get("/permissionCategory/list", { params });
  return data;
};

export const getPermissionsOfPermissionCategory = async (id: string) => {
  const { data } = await api.get(`/permissionCategory/permissions-under-categories/${id}`);
  return data;
};
