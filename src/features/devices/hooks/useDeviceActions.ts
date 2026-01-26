import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createDevice,
  createDeviceCredential,
  deleteDevice,
  registerForFirewall,
} from "../api";
import { toast } from "sonner";

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
    onSuccess: () => toast.success('Device added to firewall')
  });

  return {
    deleteDeviceAction,
    createDeviceAction,
    createDeviceCredentialAction,
    registerForFirewallAction,
  };
};
