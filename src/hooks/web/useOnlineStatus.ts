// React Imports
import React from "react";

export function useOnlineStatus() {
  return React.useSyncExternalStore(
    (trigger) => {
      const controller = new AbortController();

      window.addEventListener("online", trigger, {
        signal: controller.signal,
      });
      window.addEventListener("offline", trigger, {
        signal: controller.signal,
      });

      return () => {
        controller.abort();
      };
    },
    () => {
      return navigator.onLine;
    }
  );
}
