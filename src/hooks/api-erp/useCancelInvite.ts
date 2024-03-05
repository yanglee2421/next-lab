import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Req, Res } from '@/api/api-erp/cancel_invite';
import { cancel_invite  } from '@/api/api-erp/cancel_invite'


export function useCancelInvite() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return cancel_invite(req)
    },
    onError(error) {
      console.error(error)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get_invite_unaccepted']
      })
    }
  })
}
