import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, deleteUser, updateUser } from "../api";
import { useNavigate } from "react-router";

export const useUserActions = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteUserAction = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const createUserAction = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      navigate("/users");
    },
  });

  const updateUserAction = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      navigate("/users");
    },
  });

  return {
    deleteUserAction,
    createUserAction,
    updateUserAction,
  };
};
