import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFeed, deleteFeed } from "../api";

export const useFeedActions = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["feeds"],
    });
  };

  const createFeedAction = useMutation({
    mutationFn: createFeed,
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
