import { useMutation } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import type { Req } from '@/api/api-erp/reset_password';
import { reset_password } from '@/api/api-erp/reset_password'


export function useResetPassword() {
  return useMutation<void, Error, Req>({
    mutationFn(req) {
      return reset_password(req)
    },
    onSuccess() {
      toast.success('Password reset instructions sent to your email!')
    }
  })
}
