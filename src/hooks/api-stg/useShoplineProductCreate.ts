import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Req, Res } from '@/api/api-stg/shopline_product_create';
import { shopline_product_create  } from '@/api/api-stg/shopline_product_create'


export function useShoplineProductCreate() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return shopline_product_create(req)
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
