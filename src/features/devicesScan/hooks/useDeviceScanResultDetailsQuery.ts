import { useQuery } from "@tanstack/react-query";
import { getDevicesScanResultDetails } from "../api";

export const useDeviceScanResultDetailsQuery = (
  id: string,
  filters: Record<string, any> = {},
) => {
  const {
    data: devicesScanResultDetails,
    isLoading: devicesScanResultDetailsIsLoading,
    isError: devicesScanResultDetailsIsError,
    error: devicesScanResultDetailsError,
  } = useQuery({
    queryKey: ["devices-scan-result-details", id, filters],
    queryFn: () => getDevicesScanResultDetails(id, filters),
  });

  return {
    devicesScanResultDetails,
    devicesScanResultDetailsIsLoading,
    devicesScanResultDetailsIsError,
    devicesScanResultDetailsError,
  };
};
