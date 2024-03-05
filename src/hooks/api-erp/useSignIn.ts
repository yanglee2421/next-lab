import { useMutation } from '@tanstack/react-query'

import { auth_login } from '@/api/api-erp'
import type { Req, Res } from '@/api/api-erp/auth_login'

export function useSignIn() {
  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return auth_login(req)
    }
  })
}
