import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBasicDeviceScan,
  createBasicDeviceScanStart,
  deleteBasicDeviceScan,
} from "../api";
import { useNavigate } from "react-router";

export const useDeviceScanActions = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["devices-scan"],
    });
  };

  const createBasicDeviceScanAction = useMutation({
    mutationFn: createBasicDeviceScan,
    onSuccess: () => {
      navigate("/devices/scan");
    },
  });

  const createBasicScanStartAction = useMutation({
    mutationFn: createBasicDeviceScanStart,
    onSuccess,
  });

  const deleteBasicDeviceScanAction = useMutation({
    mutationFn: deleteBasicDeviceScan,
    onSuccess,
  });

  return {
    createBasicDeviceScanAction,
    deleteBasicDeviceScanAction,
    createBasicScanStartAction,
  };
};
