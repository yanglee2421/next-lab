import { useQuery } from '@tanstack/react-query'

import type { Res, Params } from '@/api/api-stg/shopline_product_search';
import { shopline_product_search  } from '@/api/api-stg/shopline_product_search'


export function useShoplineProductSearch(params: Params) {
  return useQuery<Res, Error>({
    queryKey: ['shopline_product_search', params],
    queryFn({ signal }) {
      return shopline_product_search({ signal, params })
    }
  })
}
