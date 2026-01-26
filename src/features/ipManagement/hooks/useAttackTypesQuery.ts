import { useQuery } from "@tanstack/react-query";
import { getAttackTypes } from "../api/attackTypesApi";

export const useAttackTypesQuery = () => {
  const {
    data: attackTypes,
    isPending: attackTypesIsPending,
    isError: attackTypesIsError,
    error: attackTypesError,
  } = useQuery({
    queryKey: ["attack-types"],
    queryFn: getAttackTypes,
  });

  return {
    attackTypes,
    attackTypesIsPending,
    attackTypesIsError,
    attackTypesError,
  };
};