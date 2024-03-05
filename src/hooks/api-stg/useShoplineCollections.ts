// Query Imports
import { useQuery } from "@tanstack/react-query";

// API Imports
import { connection_shopline_collection_listing } from "@/api/api-stg";
import type { Res } from "@/api/api-stg/connection_shopline_collection_listing";

export function useShoplineCollections(site_connection_id: number) {
  return useQuery<Res, Error>({
    queryKey: ["connection_shopline_collection_listing", site_connection_id],
    queryFn({ signal }) {
      return connection_shopline_collection_listing({
        signal,
        params: {
          site_connection_id,
        },
      });
    },

    enabled: Boolean(site_connection_id),
  });
}
