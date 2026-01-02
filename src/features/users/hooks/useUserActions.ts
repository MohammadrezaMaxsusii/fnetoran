import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../api";

export const useUserActions = () => {
  const queryClient = useQueryClient();

  const deleteUserAction = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  return {
    deleteUserAction,
  };
};
