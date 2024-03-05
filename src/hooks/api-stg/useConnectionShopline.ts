import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Req, Res } from '@/api/api-stg/connection_shopline_connect';
import { connection_shopline_connect  } from '@/api/api-stg/connection_shopline_connect'


export function useConnectionShopline() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return connection_shopline_connect(req)
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
