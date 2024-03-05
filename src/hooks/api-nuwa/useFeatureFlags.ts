// Query Imports
import { useQuery } from "@tanstack/react-query";

import { feature_flags } from "@/api/api-nuwa";
import type { Res, Params } from "@/api/api-nuwa/feature_flags";

export function useFeatureFlags(
  siteConnectionId: string | number,
  params: Params
) {
  return useQuery<Res>({
    queryKey: ["feature_flags", siteConnectionId, params],
    queryFn({ signal }) {
      return feature_flags({
        signal,
        params,
        headers: {
          "site-connection-id": siteConnectionId,
        },
      });
    },
  });
}
