// Query Imports
import { useQuery } from "@tanstack/react-query";

// API Imports
import { insights_trend } from "@/api/posthog";
import type { Res, PathParams, Params } from "@/api/posthog/insights_trend";

export function useInsightsTrend(
  params: Params,
  pathParams: PathParams,
  token: string
) {
  return useQuery<Res, Error>({
    queryKey: ["insights_trend", params, pathParams, token],
    queryFn({ signal }) {
      return insights_trend(
        {
          signal,
          params,
          baseURL: pathParams.baseURL,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        pathParams
      );
    },

    /**
     * BaseURL is truth
     * Token is truth
     * BaseURL is a string
     * Token is a string
     */
    enabled: [
      pathParams.baseURL,
      token,
      typeof pathParams.baseURL === "string",
      typeof token === "string",
    ].every(Boolean),
  });
}
