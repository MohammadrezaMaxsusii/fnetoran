import { useMutation } from "@tanstack/react-query";
import { addToZone } from "../api";
import { toast } from "sonner";

export * from "./useUsersFilters";
export * from "./useDevicesQuery";
export * from "./useDeviceActions";
export * from "./useDeviceTypesQuery";

export const useAddToZone = () => {
  return useMutation({
    mutationFn: addToZone,
    onSuccess: () => toast.success('Device added to zone')
  });
};
