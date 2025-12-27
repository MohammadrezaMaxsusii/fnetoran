import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api";

export const useUsersQuery = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return {
    users,
    isLoading
  };
};
