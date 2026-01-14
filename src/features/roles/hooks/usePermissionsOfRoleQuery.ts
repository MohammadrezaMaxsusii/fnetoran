import { useQuery } from "@tanstack/react-query";
import { getPermissionsOfRole } from "../api";

export const usePermissionsOfRole = (id: string) => {
  const {
    data: premissionsOfRole,
    isPending: premissionsOfRoleIsPending,
    isError: premissionsOfRoleIsError,
  } = useQuery({
    queryKey: ["premissions-of-role", id],
    queryFn: () => getPermissionsOfRole(id),
  });

  return {
    premissionsOfRole,
    premissionsOfRoleIsPending,
    premissionsOfRoleIsError,
  };
};
