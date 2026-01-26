import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { approveIp, getApis, getPendingApis, rejectIp } from "../api";

export * from "./useFeedsFilters";
export * from "./useApisQuery";
export * from "./useAttackTypesQuery";

export const useGetApis = () => {
  const { data, isPending } = useQuery({
    queryKey: ["apis"],
    queryFn: getApis,
  });

  return {
    apis: data,
    apisLoading: isPending,
  };
};

export const useGetPendingApis = () => {
  const { data, isPending } = useQuery({
    queryKey: ["pending-apis"],
    queryFn: getPendingApis,
  });

  return {
    pendingApis: data,
    pendingApisLoading: isPending,
  };
};

export const useApproveIp = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["pending-apis"],
    });
  };

  return useMutation({
    mutationFn: approveIp,
    onSuccess,
  });
};

export const useRejectIp = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["pending-apis"],
    });
  };

  return useMutation({
    mutationFn: rejectIp,
    onSuccess,
  });
};
