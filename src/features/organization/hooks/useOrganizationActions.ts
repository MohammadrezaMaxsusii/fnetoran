import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createOrganization,
  deleteOrganization,
  updateOrganization,
} from "../api";

export const useOrganizationActions = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["organizations"],
    });
  };

  const createOrganizationAction = useMutation({
    mutationFn: createOrganization,
    onSuccess,
  });

  const deleteOrganizationAction = useMutation({
    mutationFn: deleteOrganization,
    onSuccess,
  });

  const updateOrganizationAction = useMutation({
    mutationFn: updateOrganization,
    onSuccess,
  });

  return {
    createOrganizationAction,
    deleteOrganizationAction,
    updateOrganizationAction,
  };
};
