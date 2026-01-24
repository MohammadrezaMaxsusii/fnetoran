import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPermissionsOfRole } from "../api";

export const usePremissionsOfRoleActions = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["roles"],
    });
  };

  const createPremissionsOfRoleAction = useMutation({
    mutationFn: createPermissionsOfRole,
    onSuccess,
  });

  return {
    createPremissionsOfRoleAction,
  };
};
