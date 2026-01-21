import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDevice, createDeviceCredential, deleteDevice } from "../api";

export const useDeviceActions = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["devices"],
    });
  };

  const deleteDeviceAction = useMutation({
    mutationFn: deleteDevice,
    onSuccess,
  });

  const createDeviceAction = useMutation({
    mutationFn: createDevice,
    onSuccess,
  });

  const createDeviceCredentialAction = useMutation({
    mutationFn: createDeviceCredential,
    // onSuccess,
  });

  return {
    deleteDeviceAction,
    createDeviceAction,
    createDeviceCredentialAction,
  };
};
