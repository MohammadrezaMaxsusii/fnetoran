import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFeed } from "../api";
import type z from "zod";
import { api } from "@/shared/libs/axiosInstance";
import type { apiCreateSchema } from "../schemas";

export const useFeedActions = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["feeds"],
    });
  };

  const createFeedAction = useMutation({
    mutationFn: async (input: z.infer<typeof apiCreateSchema>) => {
      const { data } = await api.post("/devices/firewall/ip_block/request", input);
      return data;
    },
    onSuccess,
  });

  const deleteFeedAction = useMutation({
    mutationFn: deleteFeed,
    onSuccess,
  });

  return {
    createFeedAction,
    deleteFeedAction,
  };
};
