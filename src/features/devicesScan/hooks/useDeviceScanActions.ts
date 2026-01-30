import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDeviceScan, updateDeviceScan, deleteDeviceScan } from "../api";

export const useDeviceScanActions = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["devices-scan"],
    });
  };

  const createDeviceScanAction = useMutation({
    mutationFn: createDeviceScan,
    onSuccess,
  });

  const updateDeviceScanAction = useMutation({
    mutationFn: updateDeviceScan,
    onSuccess,
  });

  const deleteDeviceScanAction = useMutation({
    mutationFn: deleteDeviceScan,
    onSuccess,
  });

  return {
    createDeviceScanAction,
    updateDeviceScanAction,
    deleteDeviceScanAction,
  };
};