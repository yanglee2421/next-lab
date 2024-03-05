import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Res, Req } from '@/api/api-stg/connection_update_status';
import { connection_update_status  } from '@/api/api-stg/connection_update_status'


export function useConnectionUpdateStatus() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return connection_update_status(req)
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
