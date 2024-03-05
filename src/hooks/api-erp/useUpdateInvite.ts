import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Req, Res } from '@/api/api-erp/update_invite_accepted';
import { update_invite_accepted  } from '@/api/api-erp/update_invite_accepted'


export function useUpdateInvite() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return update_invite_accepted(req)
    },
    onError(error) {
      console.error(error)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get_invite_accepted']
      })
    }
  })
}
