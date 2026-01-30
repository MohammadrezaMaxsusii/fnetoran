import { useQuery } from "@tanstack/react-query";
import { getDevicesScan } from "../api";


export const useDevicesScanQuery = (filters: Record<string, any> = {}) => {
  const {
    data: devicesScan,
    isLoading: devicesScanIsLoading,
    isError: devicesScanIsError,
    error: devicesScanError,
  } = useQuery({
    queryKey: ["devices-scan", filters],
    queryFn: () => getDevicesScan(filters),
  });

  return {
    devicesScan,
    devicesScanIsLoading,
    devicesScanIsError,
    devicesScanError,
  };
};
