// Query Imports
import { useQuery } from "@tanstack/react-query";

import { feature_flags_by_time } from "@/api/api-nuwa";
import type { Res, Params } from "@/api/api-nuwa/feature_flags_by_time";

export function useFeatureFlagsByTime(
  siteConnectionId: string | number,
  params: Params
) {
  return useQuery<Res>({
    queryKey: ["feature_flags_by_time", siteConnectionId, params],
    queryFn({ signal }) {
      return feature_flags_by_time({
        signal,
        params,
        headers: {
          "site-connection-id": siteConnectionId,
        },
      });
    },
  });
}
