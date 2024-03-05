import { useMutation, useQueryClient } from '@tanstack/react-query'

import { woo_product_create } from '@/api/api-stg/woo_product_create'
import type { Req, Res } from '@/api/api-stg/woo_product_create'

export function useWooProductCreate() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return woo_product_create(req)
    },
    onError(error) {
      console.error(error)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['woo_product_search']
      })
    }
  })
}
