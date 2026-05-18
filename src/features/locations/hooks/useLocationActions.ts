import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLocation, updateLocation, deleteLocation } from "../api";

export const useLocationActions = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["locations"],
    });
  };

  const createLocationAction = useMutation({
    mutationFn: createLocation,
    onSuccess,
  });

  const updateLocationAction = useMutation({
    mutationFn: updateLocation,
    onSuccess,
  });

  const deleteLocationAction = useMutation({
    mutationFn: deleteLocation,
    onSuccess,
  });

  return {
    createLocationAction,
    updateLocationAction,
    deleteLocationAction,
  };
};
