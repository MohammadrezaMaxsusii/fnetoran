import { useQuery } from "@tanstack/react-query";
import { getBackups } from "../api";

export const useBackupsQuery = (filters: Record<string, any> = {}) => {
  const {
    data: backups,
    isLoading: backupsIsLoading,
    isError: backupsIsError,
    error: backupsError,
  } = useQuery({
    queryKey: ["backups", filters],
    queryFn: () => getBackups(filters),
  });

  return {
    backups,
    backupsIsLoading,
    backupsIsError,
    backupsError,
  };
};
