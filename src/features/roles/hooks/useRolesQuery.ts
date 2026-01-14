import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../api";

export const useRolesQuery = (filters: Record<string, any> = {}) => {
  const {
    data: roles,
    isLoading: rolesIsLoading,
    isError: rolesIsError,
    error: rolesError,
  } = useQuery({
    queryKey: ["roles", filters],
    queryFn: () => getRoles(filters),
  });

  return {
    roles,
    rolesIsLoading,
    rolesIsError,
    rolesError,
  };
};
