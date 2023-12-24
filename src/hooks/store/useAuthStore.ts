// React Imports
import React from "react";

// Types Imports
import { Action } from "./types";

// Store Imports
import { useShallow } from "zustand/react/shallow";
import { useAuthLocalStore } from "./useAuthLocalStore";
import { useAuthSessionStore } from "./useAuthSessionStore";

export function useAuthStore() {
  const localStore = useAuthLocalStore(useShallow((store) => store));
  const sessionStore = useAuthSessionStore(useShallow((store) => store));

  return React.useMemo(() => {
    return {
      accessToken: localStore.accessToken || sessionStore.accessToken,
      setAccessToken(action: Action, useLocal?: boolean) {
        const store = useLocal ? localStore : sessionStore;

        store.setAccessToken(action);
      },
      updateAccessToken(action: Action) {
        localStore.updateAccessToken(action);
        sessionStore.updateAccessToken(action);
      },
      clearAccessToken() {
        localStore.clearAccessToken();
        sessionStore.clearAccessToken();
      },
    };
  }, [localStore, sessionStore]);
}
