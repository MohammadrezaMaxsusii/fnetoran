import { useQuery } from "@tanstack/react-query";
import { getFile } from "../api/fileApi";

export const useFileQuery = (id: string) => {
  const {
    data: file,
    isLoading: fileIsLoading,
    isError: fileIsError,
  } = useQuery({
    queryKey: ["file", id],
    queryFn: () => getFile(id),
  });

  return {
    file,
    fileIsLoading,
    fileIsError,
  };
};
