import { useQuery } from "@tanstack/react-query";
import { getPermissionsOfRole } from "../api";

export const usePermissionsOfRoleQuery = (id: number) => {
  const {
    data: permissionsOfRole,
    isPending: permissionsOfRoleIsPending,
    error: permissionsOfRoleIsError,
  } = useQuery({
    queryKey: ["permissions-of-role", id],
    queryFn: () => getPermissionsOfRole(id),
  });

  return {
    permissionsOfRole,
    permissionsOfRoleIsPending,
    permissionsOfRoleIsError,
  };
};
