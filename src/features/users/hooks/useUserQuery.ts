import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/features/users/api";

export const useUserQuery = () => {
  const {
    data: user,
    isLoading: userIsLoading,
    isError: userIsError,
    error: userError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return {
    user,
    userIsLoading,
    userIsError,
    userError,
  };
};
