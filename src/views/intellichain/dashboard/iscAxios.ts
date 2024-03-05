// Axios Imports
import type { AxiosError } from "axios";
import axios from "axios";

export const iscAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WOOLWORLDS_HOST,
  timeout: 1000 * 60,
});

iscAxios.interceptors.request.use((config) => {
  config.headers.set(
    "X-API-Key",
    process.env.NEXT_PUBLIC_WOOLWORLDS_APIKEY,
    false
  );

  return config;
});

iscAxios.interceptors.response.use(
  (res) => {
    if (!res.data.error) {
      return res.data.data;
    }

    throw new Error(res.data.error);
  },
  (error: AxiosError) => {
    throw new Error(error.message);
  }
);
