import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBackup, deleteBackup } from "../api";

export const useBackupActions = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["backups"],
    });
  };

  const createBackupAction = useMutation({
    mutationFn: createBackup,
    onSuccess,
  });

  const deleteBackupAction = useMutation({
    mutationFn: deleteBackup,
    onSuccess,
  });

  return {
    createBackupAction,
    deleteBackupAction,
  };
};
