import { useMutation, useQueryClient } from '@tanstack/react-query'

import { payment_token_delete } from '@/api/api-erp/payment_token_delete'
import type { Res } from '@/api/api-erp/payment_token_delete'

export function usePayTokenDel() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error, number>({
    mutationFn(payment_token_id) {
      return payment_token_delete({ data: { payment_token_id } })
    },
    onError(error) {
      console.error(error)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get_payment_token']
      })
    }
  })
}
