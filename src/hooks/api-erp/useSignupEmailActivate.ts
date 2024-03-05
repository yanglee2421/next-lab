import { useMutation } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import type { Req, Res } from '@/api/api-erp/signup_email_activate';
import { signup_email_activate } from '@/api/api-erp/signup_email_activate'


export function useSignupEmailActivate() {
  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return signup_email_activate(req)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess() {
      const msg = 'The email has been sent successfully, please check your mailbox'

      toast.success(msg)
    }
  })
}
