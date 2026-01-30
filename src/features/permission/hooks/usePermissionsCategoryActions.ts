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

  const createPremissionsCategoryAction = useMutation({
    mutationFn: createPermissionsCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["permissions"],
      });
    },
  });

  const updatePremissionsCategoryAction = useMutation({
    mutationFn: updatePermissionsCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["permissions"],
      });
    },
  });

  const deletePermissionsCategoryAction = useMutation({
    mutationFn: deletePermissionsCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["permissions"],
      });
    },
  });

  const createPermissionOfPermissionCategoryAction = useMutation({
    mutationFn: createPermissionOfPermissionCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["permissions"],
      });
    },
  });

  const deletePermissionOfPermissionCategoryAction = useMutation({
    mutationFn: deletePermissionOfPermissionCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["permissions"],
      });
    },
  });

  return {
    createPremissionsCategoryAction,
    updatePremissionsCategoryAction,
    deletePermissionsCategoryAction,
    createPermissionOfPermissionCategoryAction,
    deletePermissionOfPermissionCategoryAction,
  };
};
