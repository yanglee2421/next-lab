// Zustand Imports
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Config Imports
import authConfig from "@/configs/auth";

// Types Imports
import { AuthStore } from "./types";

export const useAuthSessionStore = create(
  persist<AuthStore>(
    (set, get) => {
      return {
        accessToken: "",
        setAccessToken(action) {
          const accessToken = (() => {
            if (typeof action === "function") {
              return action(get().accessToken);
            }

            return action;
          })();

          return set({ accessToken });
        },
        updateAccessToken(action) {
          const prev = get().accessToken;

          if (!prev) {
            return;
          }

          const accessToken = (() => {
            if (typeof action === "function") {
              return action(prev);
            }

            return action;
          })();

          if (!accessToken) return;

          return set({ accessToken });
        },
        clearAccessToken() {
          return set({ accessToken: "" });
        },
      };
    },
    {
      name: authConfig.storageTokenKeyName,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
