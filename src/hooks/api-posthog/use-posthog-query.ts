// Query Imports
import { useInfiniteQuery } from "@tanstack/react-query";

// API Imports
import { posthog_query } from "@/api/posthog";
import type { Data, PathParams } from "@/api/posthog/posthog_query";

export function usePosthogQuery(
  data: Data,
  pathParams: PathParams,
  token: string
) {
  return useInfiniteQuery({
    queryKey: ["posthog_query", data, pathParams, pathParams.baseURL, token],
    queryFn({ signal, pageParam }) {
      return posthog_query(
        {
          signal,
          data: pageParam,
          baseURL: pathParams.baseURL,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        pathParams
      );
    },

    /**
     * Event field is truth
     * BaseURL is truth
     * Token is truth
     * BaseURL is a string
     * Token is a string
     */
    enabled: [
      data.query.event,
      pathParams.baseURL,
      token,
      typeof pathParams.baseURL === "string",
      typeof token === "string",
    ].every(Boolean),

    initialPageParam: data,
    getNextPageParam(lastPage) {
      if (lastPage.hasMore) {
        const list = lastPage.results;
        const nextBefore = list[list.length - 1][5];

        const nextParam = structuredClone(data);

        nextParam.query.before = nextBefore;

        return nextParam;
      }

      return null;
    },
    getPreviousPageParam() {
      return null;
    },
  });
}
