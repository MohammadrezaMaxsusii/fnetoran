import axios from "axios";
import queryString from "query-string";

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
