import { useMutation, useQueryClient } from '@tanstack/react-query'

import { woo_product_update } from '@/api/api-stg/woo_product_update'
import type { Req, Res } from '@/api/api-stg/woo_product_update'

export function useWooProductUpdate() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return woo_product_update(req)
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
