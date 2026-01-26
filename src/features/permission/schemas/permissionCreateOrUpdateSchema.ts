import { z } from "zod";

export const permissionsOfRoleFormSchema = z.object({
  search: z.string().optional(),
  role_ids: z.array(z.string()),
  permission_ids: z.array(z.number().or(z.string())),
});

export const permissionCreateSchema = z.object({
  name: z.string().min(1, "permission name is required."),
  permission_ids: z.array(z.number().or(z.string())).min(1, "permission is required."),
});
