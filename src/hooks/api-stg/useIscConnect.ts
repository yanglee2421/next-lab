import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Req, Res } from '@/api/api-stg/isc_connect';
import { isc_connect  } from '@/api/api-stg/isc_connect'


export function useIscConnect() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return isc_connect(req)
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
