import { useMutation } from "@tanstack/react-query";
import { addToZone } from "../api";

export * from "./useUsersFilters";
export * from "./useDevicesQuery";
export * from "./useDeviceActions";
export * from "./useDeviceTypesQuery";

export const useAddToZone = () => {
  return useMutation({
    mutationFn: addToZone,
  });
};
