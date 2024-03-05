import { useQuery } from '@tanstack/react-query'

import type { Res, Params } from '@/api/api-stg/shopify_product_search';
import { shopify_product_search  } from '@/api/api-stg/shopify_product_search'


export function useShopifyProductSearch(params: Params) {
  return useQuery<Res, Error>({
    queryKey: ['shopify_product_search', params],
    queryFn({ signal }) {
      return shopify_product_search({ signal, params })
    }
  })
}
