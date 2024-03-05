import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Res} from '@/api/api-erp/pre_add_payment_token';
import { pre_add_payment_token } from '@/api/api-erp/pre_add_payment_token'

export function usePreAddPayment() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error>({
    mutationFn() {
      const url = new URL(window.location.pathname, window.location.origin)
      const return_url = url.toString()

      return pre_add_payment_token({
        data: { return_url }
      })
    },
    onError(err) {
      console.error(err)
    },
    onSuccess(data) {
      queryClient.removeQueries({
        queryKey: ['get_payment_token']
      })

      window.open(data.rendering_context.session_url, '_parent')
    }
  })
}
