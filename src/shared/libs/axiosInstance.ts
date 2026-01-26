import axios from "axios";
import queryString from "query-string";
import { getErrorMessage } from "../utils";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  paramsSerializer: {
    serialize: (param) => {
      return queryString.stringify(param, {
        skipNull: true,
        skipEmptyString: true,
      });
    },
  },
});

api.interceptors.request.use((config) => {
  config.headers["Accept-language"] = "en";
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }

    const normalizedError = getErrorMessage(error);
    return Promise.reject(normalizedError);
  },
);
