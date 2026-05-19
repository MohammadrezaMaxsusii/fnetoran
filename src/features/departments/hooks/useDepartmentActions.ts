import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDepartment, updateDepartment, deleteDepartment } from "../api";

export const useDepartmentActions = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["departments"],
    });
  };

  const createDepartmentAction = useMutation({
    mutationFn: createDepartment,
    onSuccess,
  });

  const updateDepartmentAction = useMutation({
    mutationFn: updateDepartment,
    onSuccess,
  });

  const deleteDepartmentAction = useMutation({
    mutationFn: deleteDepartment,
    onSuccess,
  });

  return {
    createDepartmentAction,
    updateDepartmentAction,
    deleteDepartmentAction,
  };
};
