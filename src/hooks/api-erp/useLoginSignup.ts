import { useMutation , useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import { set_passwd_by_email_token } from '@/api/api-erp/set_passwd_by_email_token'
import type { Res, Req } from '@/api/api-erp/set_passwd_by_email_token'
import { useAuthLocalStore } from '@/hooks/store/useAuthLocalStore'

import { auth_login } from '@/api/api-erp/auth_login'

export function useLoginSignup() {
  const queryClient = useQueryClient()
  const setAccessToken = useAuthLocalStore(s => s.setAccessToken)

  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return set_passwd_by_email_token(req)
    },
    onError(err) {
      toast.error(err.message)
    },
    async onSuccess(data, req) {
      const email = data.login
      const password = req.data?.password || ''

      const queryData = await queryClient.fetchQuery({
        queryKey: [],
        queryFn() {
          return auth_login({
            data: { email, password }
          })
        }
      })

      setAccessToken(queryData.access_token)

      queryClient.setQueryData(['refresh_token'], queryData)
    }
  })
}
