import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPermissionsOfRole, deletePermissionsOfRole } from "../api";

export const usePremissionsOfRoleActions = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["roles"],
    });
  };

  const createPermissionsOfRoleAction = useMutation({
    mutationFn: createPermissionsOfRole,
    onSuccess,
  });

  const deletePermissionsOfRoleAction = useMutation({
    mutationFn: deletePermissionsOfRole,
    onSuccess,
  });

  return {
    createPermissionsOfRoleAction,
    deletePermissionsOfRoleAction,
  };
};
