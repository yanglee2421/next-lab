import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useThemeStore = create(
  persist<ThemeStore>(
    (set, get) => {
      return {
        mode: ThemeMode.light,
        setMode(mode) {
          return set({
            mode,
          });
        },

        count: 0,
        setCount(count) {
          if (typeof count === "number") {
            set({ count });
          }

          return set({
            count: get().count + 1,
          });
        },
      };
    },
    {
      name: "next-zustand-persister",
      storage: createJSONStorage(() => globalThis.sessionStorage),
    }
  )
);

enum ThemeMode {
  light = "light",
  dark = "dark",
  auto = "auto",
}

interface ThemeStore {
  mode: ThemeMode;
  setMode(mode: ThemeMode): void;
  count: number;
  setCount(count?: number): void;
}
