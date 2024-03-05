// Axios Imports
import type { AxiosError } from "axios";
import axios from "axios";

// I18n Imports
import i18next from "i18next";

// Utils Imports
import { addJsonWebToken } from "@/utils";

export const axiosNuwa = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NUWA_HOST,
  timeout: 1000 * 60,
});

axiosNuwa.interceptors.request.use((config) => {
  // ** JWT
  addJsonWebToken(config);

  // ** I18n
  config.headers.set(
    "Accept-Language",
    `${i18next.language.replace("-", "_") || "en_US"}`,
    false
  );

  return config;
});
axiosNuwa.interceptors.response.use(
  (res) => {
    // ** Blob
    if (res.data instanceof Blob) {
      return new File(
        [res.data],
        String(res.headers["content-disposition"])
          .replace('attachment; filename="', "")
          .replace('"', ""),
        { type: res.headers["content-type"] }
      );
    }

    // ** JSON
    if (res.data.status === false) {
      throw new Error(res.data.message);
    }

    if (res.data.data) {
      return res.data.data;
    }

    return res.data;
  },
  (error: AxiosError) => {
    console.error(error);

    if (!error.response) {
      throw new Error(error.message);
    }

    const detail = Reflect.get(Object(error.response.data), "detail");

    if (typeof detail === "string") {
      throw new Error(detail);
    }

    throw new Error(detail.exception);
  }
);
