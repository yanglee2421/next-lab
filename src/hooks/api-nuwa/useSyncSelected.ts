import { useMutation } from "@tanstack/react-query";

import type { Req, Res } from "@/api/api-nuwa/sync_selected";
import { sync_selected } from "@/api/api-nuwa/sync_selected";


export function useSyncSelected() {
  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return sync_selected(req);
    },
  });
}
