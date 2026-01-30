import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRole, updateRole, deleteRole } from "../api";

export const useRoleActions = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["roles"],
    });
  };

  const createRoleAction = useMutation({
    mutationFn: createRole,
    onSuccess,
  });

  const updateRoleAction = useMutation({
    mutationFn: updateRole,
    onSuccess,
  });

  const deleteRoleAction = useMutation({
    mutationFn: deleteRole,
    onSuccess,
  });

  return {
    createRoleAction,
    updateRoleAction,
    deleteRoleAction,
  };
};
