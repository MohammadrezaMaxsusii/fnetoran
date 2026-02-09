import { useQuery } from "@tanstack/react-query";
import { getDevicesScanResult } from "../api";

export const useDevicesScanResultQuery = (
  id: string,
  filters: Record<string, any> = {},
) => {
  const {
    data: devicesScanResult,
    isLoading: devicesScanResultIsLoading,
    isError: devicesScanResultIsError,
    error: devicesScanResultError,
  } = useQuery({
    queryKey: ["devices-scan-result", id, filters],
    queryFn: () => getDevicesScanResult(id, filters),
  });

  return {
    devicesScanResult,
    devicesScanResultIsLoading,
    devicesScanResultIsError,
    devicesScanResultError,
  };
};
