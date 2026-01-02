import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../api";

export const useRolesQuery = () => {
  const {
    data: roles,
    isLoading: rolesIsLoading,
    isError: rolesIsError,
  } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  return {
    roles,
    rolesIsLoading,
    rolesIsError,
  };
};
