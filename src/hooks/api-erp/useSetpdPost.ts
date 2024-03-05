import { useMutation } from '@tanstack/react-query'

import { reset_new_password } from '@/api/api-erp/reset_new_password'
import type { Res, Req } from '@/api/api-erp/reset_new_password'

export function useSetpdPost() {
  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return reset_new_password(req)
    },
    onError(error) {
      console.error(error.message)
    }
  })
}

// const msg = 'Reset new password success, Please login with new password'
