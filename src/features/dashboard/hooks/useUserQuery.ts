import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/getUserApi";

export const useUserQuery = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  
  return {
    user,
    isLoading,
  };
};
