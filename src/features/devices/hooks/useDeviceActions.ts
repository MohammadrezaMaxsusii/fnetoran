import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createDevice,
  createDeviceCredential,
  deleteDevice,
  registerForFirewall,
} from "../api";

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

  const registerForFirewallAction = useMutation({
    mutationFn: registerForFirewall,
  });

  return {
    deleteDeviceAction,
    createDeviceAction,
    createDeviceCredentialAction,
    registerForFirewallAction,
  };
};
