import { useQuery } from "@tanstack/react-query";
import { getFeeds } from "../api";

export const useFeedsQuery = (filters: Record<string, any> = {}) => {
  const {
    data: feeds,
    isPending: feedsIsPending,
    isError: feedsIsError,
    error: feedsError,
  } = useQuery({
    queryKey: ["feeds", filters],
    queryFn: () => getFeeds(filters),
  });

  return {
    feeds,
    feedsIsPending,
    feedsIsError,
    feedsError,
  };
};
