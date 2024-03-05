// Axios Imports
import type { AxiosError } from "axios";
import axios from "axios";

// I18n Imports
import i18next from "i18next";

// Utils Imports
import { addJsonWebToken } from "@/utils";

export const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVICE,
  timeout: 1000 * 60,
});

request.interceptors.request.use((config) => {
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
request.interceptors.response.use(
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
    if (res.data.status !== true) {
      throw new Error(res.data.message);
    }

    if (res.data.data) {
      return res.data.data;
    }
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
