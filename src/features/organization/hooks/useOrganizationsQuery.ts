import { useQuery } from "@tanstack/react-query";
import { getOrganizations } from "../api";

export const useOrganizationsQuery = (filters: Record<string, any> = {}) => {
  const {
    data: organizations,
    isLoading: organizationsIsLoading,
    isError: organizationsIsError,
    error: organizationsError,
  } = useQuery({
    queryKey: ["organizations", filters],
    queryFn: () => getOrganizations(filters),
  });

  return {
    organizations,
    organizationsIsLoading,
    organizationsIsError,
    organizationsError,
  };
};
