import { useQuery } from "@tanstack/react-query";
import { getPermissions } from "../api";

export const usePermissionsQuery = (filters: Record<string, any>) => {
  const {
    data: permissions,
    isPending: permissionsIsPending,
    error: permissionsIsError,
  } = useQuery({
    queryKey: ["permissions", filters],
    queryFn: () => getPermissions(filters),
  });

  return {
    permissions,
    permissionsIsPending,
    permissionsIsError,
  };
};
