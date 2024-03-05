import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Req, Res } from '@/api/api-stg/connection_update';
import { connection_update  } from '@/api/api-stg/connection_update'


export function useConnectionUpdate() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return connection_update(req)
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
