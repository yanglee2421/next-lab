import { useQuery } from '@tanstack/react-query'

import type { Res } from '@/api/api-stg/woo_product_search';
import { woo_product_search  } from '@/api/api-stg/woo_product_search'


export function useWooProductSearch(params: Params) {
  return useQuery<Res, Error>({
    queryKey: ['woo_product_search', params],
    queryFn({ signal }) {
      return woo_product_search({
        signal,
        params: {
          site_connection_id: params.site_connection_id,
          title: params.title || void 0,
          collection_id: params.collection_id || void 0,
          page_limit: params.page_limit
        }
      })
    }
  })
}

export interface Params {
  site_connection_id: number

  page: number
  page_limit: number

  title: string
  collection_id?: number
}
