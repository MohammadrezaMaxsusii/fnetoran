import { useQuery } from "@tanstack/react-query";
import { getPermissionsOfPermissionCategory } from "../api";

export const usePermissionsOfPermissionCategoryQuery = (id: string) => {
  const {
    data: permissionsOfPermissionCateogory,
    isPending: permissionsOfPermissionCateogoryIsPending,
    error: permissionsOfPermissionCateogoryError,
  } = useQuery({
    queryKey: ["permissions-of-permission-category", id],
    queryFn: () => getPermissionsOfPermissionCategory(id),
  });

  return {
    permissionsOfPermissionCateogory,
    permissionsOfPermissionCateogoryIsPending,
    permissionsOfPermissionCateogoryError,
  };
};
