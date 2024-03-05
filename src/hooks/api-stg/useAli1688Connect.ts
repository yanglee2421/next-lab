import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ali1688_connect } from '@/api/api-stg/ali1688_connect'
import type { Req, Res } from '@/api/api-stg/ali1688_connect'

export function useAli1688Connect() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return ali1688_connect(req)
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
