import axios from "axios";

export const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    if (data?.errors) {
      return Object.values(data.errors).map((item) => ({
        message: item,
      }));
    }

    if (data?.detail) {
      return [{ message: data.detail }];
    }
  }

  if (error instanceof Error) {
    return [{ message: error.message }];
  }

  return [{ message: "An unknown error occurred." }];
};
