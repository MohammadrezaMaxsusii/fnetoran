import { useQuery } from "@tanstack/react-query";
import { getPermissionsCategory } from "../api";

export const usePermissionsCategoryQuery = () => {
  const {
    data: permissionsCategory,
    isPending: permissionsCategoryIsPending,
    error: permissionsCategoryIsError,
  } = useQuery({
    queryKey: ["permissions-category"],
    queryFn: getPermissionsCategory,
  });

  return {
    permissionsCategory,
    permissionsCategoryIsPending,
    permissionsCategoryIsError,
  };
};
