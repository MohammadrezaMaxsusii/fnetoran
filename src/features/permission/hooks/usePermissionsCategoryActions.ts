import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPermissionOfPermissionCategory, createPermissionsCategory } from "../api";

export const usePermissionsCategoryActions = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["permissions-category"],
    });
  };

  const createPremissionsCategoryAction = useMutation({
    mutationFn: createPermissionsCategory,
    onSuccess,
  });

  const createPermissionOfPermissionCategoryAction = useMutation({
    mutationFn: createPermissionOfPermissionCategory,
  })

  return {
    createPremissionsCategoryAction,
    createPermissionOfPermissionCategoryAction
  };
};
