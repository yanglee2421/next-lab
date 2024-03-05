import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Res, Req } from '@/api/api-stg/woo_connect';
import { woo_connect  } from '@/api/api-stg/woo_connect'


export function useWooConnect() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return woo_connect(req)
    },
    onError(error) {
      console.error(error)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['connection_my_connections']
      })
    }
  })
}
