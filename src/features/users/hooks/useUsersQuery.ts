import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/features/users/api";

export const useUsersQuery = () => {
  const {
    data: users,
    isLoading: usersIsLoading,
    isError: userIsError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return {
    users,
    usersIsLoading,
    userIsError,
  };
};
