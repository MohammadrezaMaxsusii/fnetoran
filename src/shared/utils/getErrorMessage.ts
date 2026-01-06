import axios from "axios";

export const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.detail;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return error;
};
