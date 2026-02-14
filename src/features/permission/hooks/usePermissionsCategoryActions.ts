import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPermissionOfPermissionCategory,
  createPermissionsCategory,
  updatePermissionsCategory,
  deletePermissionsCategory,
  deletePermissionOfPermissionCategory,
} from "../api";

export const usePermissionsCategoryActions = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["permissions"],
    });
  };

  const createPremissionsCategoryAction = useMutation({
    mutationFn: createPermissionsCategory,
    onSuccess,
  });

  const updatePremissionsCategoryAction = useMutation({
    mutationFn: updatePermissionsCategory,
    onSuccess,
  });

  const deletePermissionsCategoryAction = useMutation({
    mutationFn: deletePermissionsCategory,
    onSuccess,
  });

  const createPermissionOfPermissionCategoryAction = useMutation({
    mutationFn: createPermissionOfPermissionCategory,
    onSuccess,
  });

  const deletePermissionOfPermissionCategoryAction = useMutation({
    mutationFn: deletePermissionOfPermissionCategory,
    onSuccess,
  });

  return {
    createPremissionsCategoryAction,
    updatePremissionsCategoryAction,
    deletePermissionsCategoryAction,
    createPermissionOfPermissionCategoryAction,
    deletePermissionOfPermissionCategoryAction,
  };
};
