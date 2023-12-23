// Zustand Imports
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

// Config Imports
import authConfig from "@/configs/auth";

// React Imports
import React from "react";

export function useAuthStore() {
  const { localToken, setLocalToken } = useAuthLocalStore(
    useShallow((store) => {
      return {
        localToken: store.accessToken,
        setLocalToken: store.setAccessToken,
      };
    })
  );

  const { sessionToken, setSessionToken } = useAuthSessionStore(
    useShallow((store) => {
      return {
        sessionToken: store.accessToken,
        setSessionToken: store.setAccessToken,
      };
    })
  );

  const accessToken = sessionToken || localToken;

  const setAccessToken = React.useCallback(
    (accessToken: string, useLocal?: boolean) => {
      if (!accessToken) {
        setLocalToken("");
        setSessionToken("");
        return;
      }

      if (useLocal) {
        setLocalToken(accessToken);
        return;
      }

      setSessionToken(accessToken);
    },
    [setLocalToken, setSessionToken]
  );

  return [accessToken, setAccessToken] as [
    typeof accessToken,
    typeof setAccessToken
  ];
}

const useAuthLocalStore = create(
  persist<AuthStore>(
    (set, get) => {
      return {
        accessToken: "",
        setAccessToken(accessToken) {
          return set({ accessToken });
        },
      };
    },
    {
      name: authConfig.storageTokenKeyName,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

const useAuthSessionStore = create(
  persist<AuthStore>(
    (set, get) => {
      return {
        accessToken: "",
        setAccessToken(accessToken) {
          return set({ accessToken });
        },
      };
    },
    {
      name: authConfig.storageTokenKeyName,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export interface AuthStore {
  accessToken: string;
  setAccessToken(accessToken: string): void;
}
