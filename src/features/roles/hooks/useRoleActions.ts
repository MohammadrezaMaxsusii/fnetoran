import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRole } from "../api";

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

  return {
    createRoleAction,
  };
};
