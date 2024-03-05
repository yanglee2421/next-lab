// Axios Imports
import type { AxiosError } from "axios";
import axios from "axios";

export const axiosPosthog = axios.create({
  timeout: 1000 * 30,
});

axiosPosthog.interceptors.request.use((config) => {
  return config;
});
axiosPosthog.interceptors.response.use(
  (res) => {
    const { data } = res;

    return data;
  },
  (error: AxiosError) => {
    const { message } = error;

    throw new Error(message);
  }
);
