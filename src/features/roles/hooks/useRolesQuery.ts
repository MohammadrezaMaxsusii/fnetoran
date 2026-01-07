import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../api";

export const useRolesQuery = () => {
  const {
    data: roles,
    isPending: rolesIsLoading,
    isError: rolesIsError,
    error: rolesError,
  } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  return {
    roles,
    rolesIsLoading,
    rolesIsError,
    rolesError
  };
};
