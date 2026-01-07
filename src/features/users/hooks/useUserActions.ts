import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, deleteUser } from "../api";

export const useUserActions = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["users"],
    });
  };

  const deleteUserAction = useMutation({
    mutationFn: deleteUser,
    onSuccess,
  });

  const createUserAction = useMutation({
    mutationFn: createUser,
    onSuccess,
  });

  return {
    deleteUserAction,
    createUserAction,
  };
};
