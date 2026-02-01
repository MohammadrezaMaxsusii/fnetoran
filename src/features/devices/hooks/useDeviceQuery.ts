import { useQuery } from "@tanstack/react-query";
import { getDevice } from "@/features/devices/api";

export const useDeviceQuery = (id: string) => {
  const {
    data: device,
    isLoading: deviceIsLoading,
    isError: deviceIsError,
  } = useQuery({
    queryKey: ["device", id],
    queryFn: () => getDevice(id),
  });

  return {
    device,
    deviceIsLoading,
    deviceIsError,
  };
};
