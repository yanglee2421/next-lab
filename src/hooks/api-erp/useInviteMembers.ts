import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Req, Res } from '@/api/api-erp/invite_email_activate';
import { invite_email_activate  } from '@/api/api-erp/invite_email_activate'


export function useInviteMembers() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return invite_email_activate(req)
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
