import { useQuery } from "@tanstack/react-query";
import { getDeviceTypes} from "../api";

export const useDeviceTypesQuery = () => {
  const {
    data: deviceTypes,
    isPending: deviceTypesIsPending,
    isError: deviceTypesIsError,
    error: deviceTypesError,
  } = useQuery({
    queryKey: ["device-types"],
    queryFn: getDeviceTypes,
  });

  return {
    deviceTypes,
    deviceTypesIsPending,
    deviceTypesIsError,
    deviceTypesError,
  };
};
