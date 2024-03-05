import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Res, Data } from '@/api/api-erp/new_subscription_make'
import { new_subscription_make } from '@/api/api-erp/new_subscription_make'

export function useNewSubscriptionMake() {
  const queryClient = useQueryClient()

  return useMutation<Res, Error, Data>({
    mutationFn(data) {
      return new_subscription_make({ data })
    },
    onError(err) {
      console.error(err)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['my_current_plan']
      })
      queryClient.invalidateQueries({
        queryKey: ['get_all_plans']
      })
      queryClient.invalidateQueries({
        queryKey: ['get_my_invoice_list']
      })
    },

    retry: 3
  })
}
