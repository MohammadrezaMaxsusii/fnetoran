import { useQuery } from "@tanstack/react-query";
import { getSpecificRole } from "../api";

export const useSpecificRoleQuery = (params: { id?: string }) => {
  const {
    data: specificRole,
    isLoading: specificRoleIsLoading,
    isError: specificRoleIsError,
    error: specificRoleError,
  } = useQuery({
    queryKey: ["specific-role", params.id],
    queryFn: () => getSpecificRole(params),
    enabled: !!params.id
  });

  return {
    specificRole,
    specificRoleIsLoading,
    specificRoleIsError,
    specificRoleError,
  };
};
