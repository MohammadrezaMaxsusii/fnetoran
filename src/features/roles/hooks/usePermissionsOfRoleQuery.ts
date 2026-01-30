import { useQuery } from "@tanstack/react-query";
import { getCategoryPermissionsOfRole } from "@/features/permission/api";

export const useCategoryPermissionsOfRoleQuery = (id: string) => {
  const {
    data: premissionsOfRole,
    isPending: premissionsOfRoleIsPending,
    isError: premissionsOfRoleIsError,
  } = useQuery({
    queryKey: ["category-premissions-of-role", id],
    queryFn: () => getCategoryPermissionsOfRole(id),
  });

  return {
    premissionsOfRole,
    premissionsOfRoleIsPending,
    premissionsOfRoleIsError,
  };
};
