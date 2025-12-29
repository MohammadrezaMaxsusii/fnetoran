import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/features/users/api";

export const useUsersQuery = (filters: Record<string, string> = {}) => {
  const {
    data: users,
    isLoading: usersIsLoading,
    isError: usersIsError,
  } = useQuery({
    queryKey: ["users", filters],
    queryFn: () => getUsers(filters),
  });

  return {
    users,
    usersIsLoading,
    usersIsError,
  };
};
