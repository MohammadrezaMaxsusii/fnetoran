import { z } from "zod";

export const permissionsOfRoleFormSchema = z.object({
  search: z.string().optional(),
  role_ids: z.array(z.string().or(z.number())),
  permission_ids: z.array(z.number().or(z.string())).min(1, "permission is required."),
});

export const permissionCreateSchema = z.object({
  name: z.string().nonempty("permission name is required."),
  permissionIds: z.array(z.number().or(z.string())).min(1, "permission is required."),
});

export const permissionUpdateSchema = z.object({
  name: z.string().nonempty("permission name is required."),
  permissionIds: z.array(z.number().or(z.string())).min(1, "permission is required."),
});
