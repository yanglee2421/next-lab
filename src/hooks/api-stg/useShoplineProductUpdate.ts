import { useMutation, useQueryClient } from '@tanstack/react-query'

import { shopline_product_update } from '@/api/api-stg/shopline_product_update'
import type { Res, Req } from '@/api/api-stg/shopify_product_update'

export function useShoplineProductUpdate() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return shopline_product_update(req)
    },
    onError(error) {
      console.error(error)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['shopline_product_search']
      })
      queryClient.invalidateQueries({
        queryKey: ['connection_shopline_product_search']
      })
    }
  })
}
