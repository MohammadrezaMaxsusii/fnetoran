import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../api/fileApi";

export const useFileActions = () => {
  const uploadFileAction = useMutation({
    mutationFn: uploadFile,
  });

  return {
    uploadFileAction,
  };
};
