import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addToZone,
  fetchAssets,
  fetchCis,
  fetchHistory,
  get,
  loadAssets,
} from "../api";
import { toast } from "sonner";
import { useParams } from "react-router";

export * from "./useUsersFilters";
export * from "./useDevicesQuery";
export * from "./useDeviceActions";
export * from "./useDeviceTypesQuery";
export * from "./useDeviceQuery";

export const useAddToZone = () => {
  return useMutation({
    mutationFn: addToZone,
    onSuccess: () => toast.success("Device added to zone"),
  });
};

export const useLoadAssetsQuery = (deviceId: string) => {
  const { isSuccess, isFetching } = useQuery({
    queryKey: ["load-assets", deviceId],
    queryFn: () => loadAssets(deviceId),
    enabled: !!deviceId,
  });

  return {
    assetsSuccess: isSuccess,
    assetsFetching: isFetching,
  };
};

export const useAssetsQuery = () => {
  const { deviceId } = useParams();

  const { data, isPending } = useQuery({
    queryKey: ["assets", deviceId],
    queryFn: () => fetchAssets(deviceId),
  });

  return {
    assets: data,
    assetsLoading: isPending,
  };
};

export const useCisQuery = () => {
  const { data, isPending } = useQuery({
    queryKey: ["cis"],
    queryFn: fetchCis,
  });

  return {
    cis: data,
    cisLoading: isPending,
  };
};

export const useHistoryQuery = () => {
  const { deviceId } = useParams();

  const { data, isPending } = useQuery({
    queryKey: ["history", deviceId],
    queryFn: () => fetchHistory(deviceId),
  });

  return {
    history: data,
    historyLoading: isPending,
  };
};

export const useDeviceQuery = () => {
  const { deviceId } = useParams();

  const { data, isPending } = useQuery({
    queryKey: ["device", deviceId],
    queryFn: () => get(deviceId),
  });

  return {
    device: data,
    deviceLoading: isPending,
  };
};
