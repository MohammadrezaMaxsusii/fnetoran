import { useQuery } from "@tanstack/react-query";
import { getZones } from "../api";

export const useZonesQuery = (filters: Record<string, any> = {}) => {
  const {
    data: zones,
    isPending: zonesIsPending,
    isError: zonesIsError,
    error: zonesError,
  } = useQuery({
    queryKey: ["zones", filters],
    queryFn: () => getZones(filters),
  });

  return {
    zones,
    zonesIsPending,
    zonesIsError,
    zonesError,
  };
};
