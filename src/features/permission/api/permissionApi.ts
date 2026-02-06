import { api } from "@/shared/libs/axiosInstance";
import { z } from "zod";
import type { permissionsOfRoleFormSchema } from "../schemas/permissionCreateOrUpdateSchema";

export const getPermissions = async (params: Record<string, any>) => {
  const { data } = await api.get("/permissionCategory/list", { params });
  return data;
};

export const getPermissionsCategory = async () => {
  const { data } = await api.get("/permissionCategory/list-with-permissions");
  return data;
};

export const getPermissionsOfRole = async (id: number) => {
  const { data } = await api.get(
    `/rolePermission/roleCategoryPermissions/${id}`,
  );
  return data;
};

export const getCategoryPermissionsOfRole = async (id: string) => {
  const { data } = await api.get(
    `/rolePermission/roleCategoryPermissions/${id}`,
  );
  return data;
};

export const createPermissionsCategory = async (input: { name: string }) => {
  const { data } = await api.post("/permissionCategory/create", input);
  return data;
};

export const deletePermissionsCategory = async (input: { id: string }) => {
  const { data } = await api.delete("/permissionCategory/delete", {
    data: input,
  });
  return data;
};

export const updatePermissionsCategory = async (input: {
  id: string;
  name: string;
}) => {
  const { data } = await api.patch("/permissionCategory/update", input);
  return data;
};

export const getPermissionsOfPermissionCategory = async (id: string) => {
  const { data } = await api.get(
    `/permissionCategory/permissions-under-categories/${id}`,
  );
  return data;
};

export const createPermissionOfPermissionCategory = async (input: {
  categoryId: string;
  permissionIds: string[];
}) => {
  const { data } = await api.post("/permission/addToCategory", input);
  return data;
};

export const deletePermissionOfPermissionCategory = async (input: {
  categoryId: string;
  permissionIds: string[];
}) => {
  const { data } = await api.post("/permission/deleteFromCategory", input);
  return data;
};

export const createPermissionsOfRole = async (
  input: z.infer<typeof permissionsOfRoleFormSchema>,
) => {
  const { data } = await api.post("/rolePermission/add", input);
  return data;
};

export const deletePermissionsOfRole = async (input: {
  role_ids: number[];
  permission_ids: string[];
}) => {
  const { data } = await api.delete("/rolePermission/remove", { data: input });
  return data;
};
