import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Req, Res } from '@/api/api-stg/connection_shopify_connect';
import { connection_shopify_connect  } from '@/api/api-stg/connection_shopify_connect'


export function useConnectionShopify() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return connection_shopify_connect(req)
    },
    onError(error) {
      console.error(error)
    },
    onSuccess() {
      queryClient.removeQueries({
        queryKey: ['connection_my_connections']
      })
    }
  })
}
