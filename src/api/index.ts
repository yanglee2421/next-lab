import axios from "axios";

import authConfig from "@/configs/auth";

axios.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config;
  }

  const jwt = (() => {
    const sessionToken = getTokenFromStorage(sessionStorage);
    const localToken = getTokenFromStorage(localStorage);

    return sessionToken || localToken;
  })();

  jwt && config.headers.setAuthorization(`Bearer ${jwt}`, false);

  return config;
});

function getTokenFromStorage(storage: Storage): string {
  try {
    const json = storage.getItem(authConfig.storageTokenKeyName);
    return JSON.parse(json || "").state.accessToken;
  } catch (error) {
    console.error(error);

    return "";
  }
}
