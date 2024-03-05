// Query Imports
import { useQuery } from "@tanstack/react-query";

import { woo_product_collection } from "@/api/api-stg";
import type { Res } from "@/api/api-stg/woo_product_collection";

export function useWooProductCollection(site_connection_id: number) {
  return useQuery<Res, Error>({
    queryKey: ["woo_product_collection", site_connection_id],
    queryFn({ signal }) {
      return woo_product_collection({
        signal,
        params: {
          site_connection_id,
        },
      });
    },
  });
}
