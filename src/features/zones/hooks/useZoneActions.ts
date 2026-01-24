import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createZone, deleteZone, updateZone } from "../api";

export const useZoneActions = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["zones"],
    });
  };

  const createZoneAction = useMutation({
    mutationFn: createZone,
    onSuccess,
  });

  const deleteZoneAction = useMutation({
    mutationFn: deleteZone,
    onSuccess,
  });

  const updateZoneAction = useMutation({
    mutationFn: updateZone,
    onSuccess,
  });

  return {
    createZoneAction,
    deleteZoneAction,
    updateZoneAction
  };
};
