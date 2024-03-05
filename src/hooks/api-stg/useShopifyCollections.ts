import { useQuery } from '@tanstack/react-query'

import { connection_shopify_list } from '@/api/api-stg'
import type { Res } from '@/api/api-stg/connection_shopify_list'

export function useShopifyCollections(site_connection_id: number) {
  return useQuery<Res, Error>({
    queryKey: ['connection_shopify_list', site_connection_id],
    queryFn({ signal }) {
      return connection_shopify_list({
        signal,
        params: {
          site_connection_id
        }
      })
    },

    enabled: Boolean(site_connection_id)
  })
}
