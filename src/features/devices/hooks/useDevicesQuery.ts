import { useQuery } from "@tanstack/react-query";
import { getDevices } from "@/features/devices/api";

export const useDevicesQuery = (filters: Record<string, any> = {}) => {
  const {
    data: devices,
    isLoading: devicesIsLoading,
    isError: devicesIsError,
  } = useQuery({
    queryKey: ["devices", filters],
    queryFn: () => getDevices(filters),
  });

  return {
    devices,
    devicesIsLoading,
    devicesIsError,
  };
};
