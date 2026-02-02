import { useQuery } from "@tanstack/react-query";
import { getFile } from "../api/fileApi";

export const useFileQuery = (id: string, url: string) => {
  const {
    data: file,
    isLoading: fileIsLoading,
    isError: fileIsError,
  } = useQuery({
    queryKey: [url, id],
    queryFn: () => getFile(id, url),
  });

  return {
    file,
    fileIsLoading,
    fileIsError,
  };
};
