import { useMutation } from "@tanstack/react-query";
import { createDeviceScan } from "../api";
import { useNavigate } from "react-router";

export const useDeviceScanActions = () => {
  const navigate = useNavigate();

  const createBasicDeviceScanAction = useMutation({
    mutationFn: createDeviceScan,
    onSuccess: () => {
      navigate("/devices/scan")
    },
  });

  return {
    createBasicDeviceScanAction,
  };
};
