import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Req, Res } from '@/api/api-stg/shopify_product_update';
import { shopify_product_update  } from '@/api/api-stg/shopify_product_update'


export function useShopifyProductUpdate() {
  const queryClient = useQueryClient()

  
return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return shopify_product_update(req)
    },
    onError(error) {
      console.error(error)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['shopify_product_search']
      })
      queryClient.invalidateQueries({
        queryKey: ['connection_shopify_product_search']
      })
    }
  })
}
