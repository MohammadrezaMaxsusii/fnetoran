import { useQuery } from "@tanstack/react-query";
import { getSpecificUser } from "@/features/users/api";

export const useSpecificUserQuery = (params: { user_id?: string }) => {
  const {
    data: specificUser,
    isLoading: specificUserIsLoading,
    isError: specificUserIsError,
    error: specificUserError,
  } = useQuery({
    queryKey: ["specific-user", params.user_id],
    queryFn: () => getSpecificUser(params),
    enabled: !!params.user_id
  });

  return {
    specificUser,
    specificUserIsLoading,
    specificUserIsError,
    specificUserError,
  };
};
